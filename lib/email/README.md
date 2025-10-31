# Email Notification System

This directory contains the email notification system for Pixel Forge Studio using [Resend](https://resend.com).

## Features

- Welcome emails for new user signups
- Order confirmation emails with download links
- Password reset emails
- Contact form notifications to admin
- Auto-reply emails for contact form submissions
- Comprehensive error handling and logging
- TypeScript support with type safety

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com) and sign up for a free account
2. Verify your email address
3. Navigate to the API Keys section in your dashboard

### 2. Get Your API Key

1. Click "Create API Key" in the Resend dashboard
2. Give it a name (e.g., "Pixel Forge Studio Production")
3. Set the permission level (Full Access for production, or specific permissions)
4. Copy the API key (you'll only see it once!)

### 3. Configure Domain (Important!)

For production use, you need to verify your domain:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `pixelforgestudio.com`)
4. Add the required DNS records to your domain provider:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
5. Wait for verification (usually takes a few minutes)

**Note:** For development, Resend provides a test domain, but emails will only be sent to verified email addresses.

### 4. Update Environment Variables

Add the following to your `.env.local` file:

```env
# Resend Email Configuration
RESEND_API_KEY=re_123456789abcdef  # Your actual API key
RESEND_FROM_EMAIL=noreply@yourdomain.com  # Must be from verified domain
RESEND_ADMIN_EMAIL=admin@yourdomain.com   # Where contact forms are sent
```

### 5. Verify Email Addresses (Development Only)

If you're testing without a verified domain:

1. Go to Resend dashboard → "Email Addresses"
2. Add and verify the email addresses you want to test with
3. Resend will send verification emails to those addresses

## Email Templates

All email templates are located in `lib/email/templates/` and are built with React components:

- `welcome.tsx` - Sent when a new user signs up
- `order-confirmation.tsx` - Sent after successful payment with download link
- `password-reset.tsx` - Sent when user requests password reset
- `contact-form.tsx` - Sent to admin when contact form is submitted

## Usage Examples

### Send Welcome Email

```typescript
import { sendWelcomeEmail } from '@/lib/email/emailService';

await sendWelcomeEmail({
  to: 'user@example.com',
  userName: 'John Doe',
  userEmail: 'user@example.com',
});
```

### Send Order Confirmation

```typescript
import { sendOrderConfirmationEmail } from '@/lib/email/emailService';

await sendOrderConfirmationEmail({
  to: 'customer@example.com',
  userName: 'Jane Smith',
  orderId: 'ORD-12345',
  bundleName: 'Premium Icon Pack',
  bundlePrice: 1999,
  orderDate: 'January 15, 2025',
  downloadUrl: 'https://example.com/download/token123',
});
```

### Send Password Reset

```typescript
import { sendPasswordResetEmail } from '@/lib/email/emailService';

await sendPasswordResetEmail({
  to: 'user@example.com',
  userName: 'John Doe',
  resetUrl: 'https://example.com/reset-password?token=abc123',
});
```

### Send Contact Form Email

```typescript
import { sendContactFormEmail, sendContactFormAutoReply } from '@/lib/email/emailService';

// Send to admin
await sendContactFormEmail({
  to: 'admin@example.com',
  name: 'Customer Name',
  email: 'customer@example.com',
  subject: 'Product Question',
  message: 'I have a question about...',
});

// Send auto-reply to customer
await sendContactFormAutoReply('customer@example.com', 'Customer Name');
```

## Error Handling

All email functions return an `EmailResponse` object:

```typescript
interface EmailResponse {
  success: boolean;
  messageId?: string;  // Resend message ID if successful
  error?: string;      // Error message if failed
}
```

Example with error handling:

```typescript
const result = await sendWelcomeEmail({ ... });

if (!result.success) {
  console.error('Email failed:', result.error);
  // Handle error (log to monitoring service, retry, etc.)
} else {
  console.log('Email sent successfully:', result.messageId);
}
```

## Logging

All email sends are automatically logged with:
- Timestamp
- Email type (WELCOME, ORDER_CONFIRMATION, etc.)
- Recipient
- Success/failure status
- Error details (if failed)

Logs are output to console and can be integrated with your monitoring service.

## Testing

### Development Testing

1. Ensure `RESEND_API_KEY` is set in `.env.local`
2. Use verified email addresses (if domain not verified)
3. Check Resend dashboard → "Logs" to see email delivery status

### Email Preview

You can test email templates by creating preview files:

```bash
# Install React Email CLI (optional)
npm install -g @react-email/cli

# Start preview server
email dev
```

This will open a browser showing all your email templates.

## Production Checklist

Before deploying to production:

- [ ] Verify your domain in Resend
- [ ] Add all required DNS records (SPF, DKIM, DMARC)
- [ ] Update `RESEND_FROM_EMAIL` to use your verified domain
- [ ] Update `RESEND_ADMIN_EMAIL` to your support email
- [ ] Test all email flows in production environment
- [ ] Set up email monitoring/alerts
- [ ] Configure email sending limits if needed

## Rate Limits

Resend free tier limits:
- 100 emails per day
- 3,000 emails per month

For higher volume, upgrade to a paid plan.

## Troubleshooting

### Emails not being sent

1. Check API key is correct in `.env.local`
2. Verify domain is verified in Resend dashboard
3. Check email logs in Resend dashboard
4. Ensure recipient email is valid
5. Check spam folder

### Domain verification failing

1. Ensure DNS records are added correctly
2. Wait 24-48 hours for DNS propagation
3. Use online DNS checkers to verify records
4. Contact Resend support if issues persist

### Emails going to spam

1. Add DMARC record
2. Warm up your sending domain gradually
3. Ensure SPF and DKIM are properly configured
4. Avoid spam trigger words in subject/content
5. Ask recipients to whitelist your domain

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- React Email: https://react.email

## Future Enhancements

Planned features:
- Email templates for password change notifications
- Email verification for new signups
- Purchase receipt/invoice emails
- Bulk email sending for newsletters
- Email queue system for reliability
- Email analytics and tracking
- A/B testing for email templates
