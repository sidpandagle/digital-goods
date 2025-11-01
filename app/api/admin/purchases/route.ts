import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserProfile } from '@/lib/auth/utils';

export async function GET(request: NextRequest) {
  try {
    const profile = await getUserProfile();

    // Check if user is admin
    if (!profile || profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const supabase = await createClient();

    // Fetch all purchases with related data
    const { data: purchases, error } = await supabase
      .from('orders')
      .select(`
        id,
        user_id,
        bundle_id,
        razorpay_order_id,
        razorpay_payment_id,
        amount,
        currency,
        status,
        email,
        created_at,
        updated_at,
        bundles (
          id,
          title,
          description,
          preview_image_url,
          image_count,
          category,
          price
        ),
        user_profiles (
          id,
          email,
          full_name
        ),
        download_tokens (
          token,
          accessed_count,
          last_accessed_at,
          expires_at
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching purchases:', error);
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      );
    }

    return NextResponse.json({ purchases });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
