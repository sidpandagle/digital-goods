import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    // Use service client for all operations (bypasses RLS)
    // This allows both authenticated and guest users to download their purchased files
    const serviceClient = createServiceClient();

    // Fetch download token
    const { data: downloadToken, error } = await serviceClient
      .from('download_tokens')
      .select('*, bundles(*)')
      .eq('token', token)
      .single();

    if (error || !downloadToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    // Check if token has expired
    if (
      downloadToken.expires_at &&
      new Date(downloadToken.expires_at) < new Date()
    ) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 403 });
    }

    // Update access count
    await serviceClient
      .from('download_tokens')
      .update({
        accessed_count: downloadToken.accessed_count + 1,
        last_accessed_at: new Date().toISOString(),
      })
      .eq('id', downloadToken.id);

    // Redirect to PDF URL
    if (downloadToken.pdf_url) {
      return NextResponse.redirect(downloadToken.pdf_url);
    }

    return NextResponse.json({
      bundle: downloadToken.bundles,
      pdfUrl: downloadToken.pdf_url,
      message: 'Access granted',
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}
