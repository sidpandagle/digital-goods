/**
 * Email Testing Utility
 *
 * This script allows you to test email templates before deploying to production.
 * Run with: npx tsx lib/email/test-emails.ts
 *
 * Make sure to:
 * 1. Set RESEND_API_KEY in .env.local
 * 2. Use a verified email address for testing
 */

import {
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendPasswordResetEmail,
  sendContactFormEmail,
  sendContactFormAutoReply,
} from './emailService';

const TEST_EMAIL = 'your-test-email@example.com'; // Replace with your email

async function testWelcomeEmail() {
  console.log('\n=== Testing Welcome Email ===');
  const result = await sendWelcomeEmail({
    to: TEST_EMAIL,
    userName: 'Test User',
    userEmail: TEST_EMAIL,
  });

  if (result.success) {
    console.log('✅ Welcome email sent successfully!');
    console.log('Message ID:', result.messageId);
  } else {
    console.error('❌ Failed to send welcome email');
    console.error('Error:', result.error);
  }
}

async function testOrderConfirmationEmail() {
  console.log('\n=== Testing Order Confirmation Email ===');
  const result = await sendOrderConfirmationEmail({
    to: TEST_EMAIL,
    userName: 'Test Customer',
    orderId: 'TEST-12345',
    bundleName: 'Premium Icon Pack - 500 Icons',
    bundlePrice: 1999,
    orderDate: new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    downloadUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/download/test-token-123`,
  });

  if (result.success) {
    console.log('✅ Order confirmation email sent successfully!');
    console.log('Message ID:', result.messageId);
  } else {
    console.error('❌ Failed to send order confirmation email');
    console.error('Error:', result.error);
  }
}

async function testPasswordResetEmail() {
  console.log('\n=== Testing Password Reset Email ===');
  const result = await sendPasswordResetEmail({
    to: TEST_EMAIL,
    userName: 'Test User',
    resetUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=test-token-456`,
  });

  if (result.success) {
    console.log('✅ Password reset email sent successfully!');
    console.log('Message ID:', result.messageId);
  } else {
    console.error('❌ Failed to send password reset email');
    console.error('Error:', result.error);
  }
}

async function testContactFormEmail() {
  console.log('\n=== Testing Contact Form Email (to admin) ===');
  const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'admin@pixelforgestudio.com';

  const result = await sendContactFormEmail({
    to: adminEmail,
    name: 'Test Customer',
    email: TEST_EMAIL,
    subject: 'Product Question',
    message: 'This is a test message from the contact form.\n\nI would like to know more about your premium bundles.\n\nThank you!',
  });

  if (result.success) {
    console.log('✅ Contact form email sent successfully!');
    console.log('Message ID:', result.messageId);
  } else {
    console.error('❌ Failed to send contact form email');
    console.error('Error:', result.error);
  }
}

async function testContactFormAutoReply() {
  console.log('\n=== Testing Contact Form Auto-Reply ===');
  const result = await sendContactFormAutoReply(TEST_EMAIL, 'Test Customer');

  if (result.success) {
    console.log('✅ Contact form auto-reply sent successfully!');
    console.log('Message ID:', result.messageId);
  } else {
    console.error('❌ Failed to send contact form auto-reply');
    console.error('Error:', result.error);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Email Tests...');
  console.log('Test email:', TEST_EMAIL);
  console.log('Make sure RESEND_API_KEY is set in .env.local!');
  console.log('='.repeat(50));

  if (TEST_EMAIL === 'your-test-email@example.com') {
    console.error('\n❌ ERROR: Please update TEST_EMAIL in this file with your actual email address!');
    process.exit(1);
  }

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
    console.error('\n❌ ERROR: RESEND_API_KEY not configured in .env.local!');
    process.exit(1);
  }

  try {
    await testWelcomeEmail();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between emails

    await testOrderConfirmationEmail();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await testPasswordResetEmail();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await testContactFormEmail();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await testContactFormAutoReply();

    console.log('\n' + '='.repeat(50));
    console.log('✅ All email tests completed!');
    console.log('Check your inbox:', TEST_EMAIL);
    console.log('Check Resend dashboard for delivery status: https://resend.com/emails');
  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    process.exit(1);
  }
}

// Run tests
runAllTests();
