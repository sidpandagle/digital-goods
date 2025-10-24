import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { verifyPaymentSignature } from '@/lib/razorpay/client';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get current user (for associating with authenticated users)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Use service client for database operations (bypasses RLS)
    const serviceClient = createServiceClient();

    // Update order status
    const { data: order, error: orderError } = await serviceClient
      .from('orders')
      .update({
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        status: 'paid',
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select('*, bundles(*)')
      .single();

    if (orderError || !order) {
      console.error('Order update error:', orderError);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Generate unique download token
    const downloadToken = randomBytes(32).toString('hex');

    // Get bundle PDF URL
    const bundle = order.bundles as any;

    // Create download token record
    const { data: token, error: tokenError } = await serviceClient
      .from('download_tokens')
      .insert({
        user_id: user?.id || null,
        order_id: order.id,
        bundle_id: order.bundle_id!,
        token: downloadToken,
        pdf_url: bundle.pdf_url,
        email: order.email,
        expires_at: null, // Lifetime access
        accessed_count: 0,
      })
      .select()
      .single();

    if (tokenError) {
      console.error('Token creation error:', tokenError);
      return NextResponse.json(
        { error: 'Failed to create download token' },
        { status: 500 }
      );
    }

    // TODO: Send email with download link
    // const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/download/${downloadToken}`;

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      downloadToken: downloadToken,
      order: order,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
