import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail, sendContactFormAutoReply } from '@/lib/email/emailService';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Get admin email from environment variable
    const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'admin@pixelforgestudio.com';

    // Send email to admin (non-blocking)
    const emailPromises = [
      sendContactFormEmail({
        to: adminEmail,
        name,
        email,
        subject,
        message,
      }),
      // Send auto-reply to customer
      sendContactFormAutoReply(email, name),
    ];

    // Wait for both emails to be sent
    const results = await Promise.allSettled(emailPromises);

    // Check if at least the admin email was sent successfully
    const adminEmailResult = results[0];
    if (adminEmailResult.status === 'rejected') {
      console.error('Failed to send admin email:', adminEmailResult.reason);
      // Continue anyway - don't fail the request
    }

    // Log auto-reply result
    const autoReplyResult = results[1];
    if (autoReplyResult.status === 'rejected') {
      console.error('Failed to send auto-reply:', autoReplyResult.reason);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully. We will get back to you soon!'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
