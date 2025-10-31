import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { razorpay } from '@/lib/razorpay/client';
import { getCurrentUser } from '@/lib/auth/utils';

export async function POST(request: NextRequest) {
  try {
    const { bundleId } = await request.json();

    if (!bundleId) {
      return NextResponse.json(
        { error: 'Bundle ID is required' },
        { status: 400 }
      );
    }

    // Require authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please login to make a purchase.' },
        { status: 401 }
      );
    }

    // Get email from authenticated user
    const email = user.email;
    if (!email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      );
    }

    // Use regular client for reading public data (bundles)
    const supabase = await createClient();

    // Fetch bundle details
    const { data: bundle, error: bundleError } = await supabase
      .from('bundles')
      .select('*')
      .eq('id', bundleId)
      .single();

    if (bundleError || !bundle) {
      return NextResponse.json({ error: 'Bundle not found' }, { status: 404 });
    }

    // Create Razorpay order
    // Generate a short receipt ID (max 40 chars for payment processors)
    const timestamp = Date.now().toString().slice(-8); // Last 8 digits
    const shortBundleId = bundleId.slice(0, 8); // First 8 chars of bundle ID
    const receipt = `b${shortBundleId}_${timestamp}`.slice(0, 40);

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(bundle.price * 100), // Convert to paise
      currency: 'INR',
      receipt: receipt,
      notes: {
        bundleId: bundleId,
        email: email,
      },
    });

    // Use service client for creating orders (bypasses RLS)
    const serviceClient = createServiceClient();

    // Verify user profile exists for authenticated user
    // This prevents foreign key constraint violations
    const { data: userProfile } = await serviceClient
      .from('user_profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!userProfile) {
      // User is authenticated but profile doesn't exist - create it
      const { data: newProfile, error: profileError } = await serviceClient
        .from('user_profiles')
        .insert({
          id: user.id,
          email: email,
          full_name: user.user_metadata?.full_name || '',
          role: 'customer',
        })
        .select('id')
        .single();

      if (profileError) {
        console.error('Could not create user profile:', profileError);
        return NextResponse.json(
          { error: 'Failed to create user profile' },
          { status: 500 }
        );
      }
    }

    // Create order record in database
    const { data: order, error: orderError } = await serviceClient
      .from('orders')
      .insert({
        user_id: user.id,
        bundle_id: bundleId,
        razorpay_order_id: razorpayOrder.id,
        amount: bundle.price,
        currency: 'INR',
        status: 'created',
        email: email,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order', details: orderError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      bundle: bundle,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
