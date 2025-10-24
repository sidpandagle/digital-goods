import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth/utils';

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please login to view your purchases.' },
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

    const supabase = await createClient();

    // Fetch orders for authenticated user's email only
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(
        `
        id,
        bundle_id,
        amount,
        created_at,
        bundles (
          id,
          title,
          description,
          preview_image_url,
          image_count,
          category
        )
      `
      )
      .eq('email', email)
      .eq('status', 'paid')
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Error fetching orders:', ordersError);
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      );
    }

    // Fetch download tokens for these orders
    const orderIds = orders?.map((order) => order.id) || [];

    let downloadTokens: any[] = [];
    if (orderIds.length > 0) {
      const { data: tokens, error: tokensError } = await supabase
        .from('download_tokens')
        .select('order_id, token, accessed_count, last_accessed_at')
        .in('order_id', orderIds);

      if (!tokensError && tokens) {
        downloadTokens = tokens;
      }
    }

    // Combine orders with their download tokens
    const purchases = orders?.map((order) => {
      const downloadToken = downloadTokens.find(
        (token) => token.order_id === order.id
      );

      return {
        ...order,
        download_token: downloadToken || null,
      };
    });

    return NextResponse.json({
      purchases: purchases || [],
      count: purchases?.length || 0,
    });
  } catch (error) {
    console.error('Purchases API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
