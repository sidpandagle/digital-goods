# Email Notification System Setup Guide

This guide will walk you through setting up the email notification system for Pixel Forge Studio using Resend.

## Overview

The email system sends the following notifications:
- **Welcome Email** - When users sign up
- **Order Confirmation** - After successful payment with download link
- **Password Reset** - When users request password reset
- **Contact Form** - Notifies admin of new inquiries
- **Auto-Reply** - Confirms receipt of contact form submissions

## Quick Setup (5 minutes)

### Step 1: Create Resend Account

1. Visit [https://resend.com/signup](https://resend.com/signup)
2. Sign up with your email
3. Verify your email address

### Step 2: Get API Key

1. Log in to your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Name it "Pixel Forge Studio"
5. Copy the API key (save it somewhere safe - you'll only see it once!)

### Step 3: Configure Environment Variables

Open your `.env.local` file and update:

```env
# Resend Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=noreply@pixelforgestudio.com
RESEND_ADMIN_EMAIL=admin@pixelforgestudio.com
```

Replace:
- `re_your_actual_api_key_here` with your actual Resend API key
- Email addresses with your actual domain emails (see Domain Setup below)

### Step 4: Test the Setup

For quick testing without domain verification:

1. Go to Resend Dashboard → **Email Addresses**
2. Add your personal email address
3. Verify it by clicking the link in the email Resend sends you
4. Update the test file:

```bash
# Edit lib/email/test-emails.ts
# Change TEST_EMAIL to your verified email
```

5. Run the test:

```bash
npx tsx lib/email/test-emails.ts
```

6. Check your inbox for test emails!

## Production Setup (Domain Verification)

For production use, you MUST verify your domain to send emails from it.

### Step 1: Add Your Domain to Resend

1. Go to Resend Dashboard → **Domains**
2. Click **Add Domain**
3. Enter your domain: `pixelforgestudio.com` (without www)
4. Click **Add**

### Step 2: Add DNS Records

Resend will provide you with DNS records to add. You need to add these to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

#### Required Records:

1. **SPF Record** (TXT)
   ```
   Name: @ or pixelforgestudio.com
   Type: TXT
   Value: v=spf1 include:amazonses.com ~all
   ```

2. **DKIM Records** (3 CNAME records)
   ```
   Resend will provide you with 3 CNAME records like:

   Name: resend1._domainkey.pixelforgestudio.com
   Type: CNAME
   Value: resend1.pixelforgestudio.com.resend.com

   Name: resend2._domainkey.pixelforgestudio.com
   Type: CNAME
   Value: resend2.pixelforgestudio.com.resend.com

   Name: resend3._domainkey.pixelforgestudio.com
   Type: CNAME
   Value: resend3.pixelforgestudio.com.resend.com
   ```

3. **DMARC Record** (TXT) - Optional but recommended
   ```
   Name: _dmarc.pixelforgestudio.com
   Type: TXT
   Value: v=DMARC1; p=none; rua=mailto:admin@pixelforgestudio.com
   ```

### Step 3: Verify Domain

1. After adding DNS records, wait 5-10 minutes
2. Go back to Resend Dashboard → **Domains**
3. Click **Verify** next to your domain
4. If successful, status will change to **Verified** ✓

**Note:** DNS propagation can take up to 48 hours in some cases.

### Step 4: Update Email Addresses

Once your domain is verified, update `.env.local`:

```env
RESEND_FROM_EMAIL=noreply@pixelforgestudio.com
RESEND_ADMIN_EMAIL=admin@pixelforgestudio.com
```

These emails will now work without individual verification!

## Testing in Development

### Option 1: Use Verified Email Addresses

If domain is not yet verified:

1. Add email addresses in Resend Dashboard → **Email Addresses**
2. Verify each email
3. Only send test emails to these verified addresses

### Option 2: Use Test Script

Run the test script to send all email types:

```bash
# 1. Update TEST_EMAIL in lib/email/test-emails.ts
# 2. Run the script
npx tsx lib/email/test-emails.ts
```

### Option 3: Test During Development

Just use the app normally:
- Sign up → Should receive welcome email
- Make a purchase → Should receive order confirmation
- Submit contact form → Admin gets notification, user gets auto-reply

## Monitoring & Debugging

### View Email Logs

1. Go to Resend Dashboard → **Emails**
2. See all sent emails with status
3. Click on any email to see:
   - Delivery status
   - Opens/clicks (if tracking enabled)
   - Error details (if failed)

### Common Issues

#### Emails Not Sending

**Problem:** No emails are being sent
**Solution:**
- Check `RESEND_API_KEY` is set correctly in `.env.local`
- Verify API key is active in Resend dashboard
- Check console logs for error messages

#### Domain Verification Failing

**Problem:** Domain shows "Pending" or "Failed"
**Solution:**
- Double-check DNS records are added exactly as shown
- Wait 24-48 hours for DNS propagation
- Use DNS checker tools: https://mxtoolbox.com/
- Contact Resend support if issues persist

#### Emails Going to Spam

**Problem:** Emails land in spam folder
**Solution:**
- Ensure all DNS records (SPF, DKIM, DMARC) are added
- Avoid spam trigger words in subject/content
- Ask recipients to whitelist your domain
- Use Resend's email testing tools

#### Rate Limit Errors

**Problem:** Error: "Rate limit exceeded"
**Solution:**
- Free tier: 100 emails/day, 3,000/month
- Upgrade to paid plan for higher limits
- Implement email queuing for bulk sends

## Email Templates

All templates are in `lib/email/templates/`:

- `welcome.tsx` - New user welcome
- `order-confirmation.tsx` - Purchase confirmation with download link
- `password-reset.tsx` - Password reset link
- `contact-form.tsx` - Admin notification of contact form

### Customizing Templates

To modify templates:

1. Edit the `.tsx` file in `lib/email/templates/`
2. Use inline styles (email clients don't support CSS)
3. Test using the test script or React Email preview
4. Keep it simple - complex layouts may break in some email clients

### Preview Templates

Install React Email CLI:

```bash
npm install -g @react-email/cli
cd lib/email
email dev
```

This opens a browser showing all templates with live preview.

## Production Checklist

Before going live:

- [ ] Domain verified in Resend
- [ ] All DNS records (SPF, DKIM, DMARC) added and verified
- [ ] `RESEND_API_KEY` added to production environment variables
- [ ] `RESEND_FROM_EMAIL` uses verified domain
- [ ] `RESEND_ADMIN_EMAIL` set to correct admin email
- [ ] All email flows tested in production
- [ ] Email monitoring set up
- [ ] Team has access to Resend dashboard

## Cost & Limits

### Resend Pricing

**Free Tier:**
- 100 emails per day
- 3,000 emails per month
- 1 domain
- Perfect for getting started!

**Paid Plans:**
- From $20/month for 50,000 emails
- Higher volume discounts available
- Multiple domains
- Dedicated IP addresses (enterprise)

**Current Usage:**
Based on expected traffic, estimate your monthly email volume:
- 100 signups/month → 100 welcome emails
- 500 purchases/month → 500 order confirmations
- 50 contact forms/month → 100 emails (admin + auto-reply)
- **Total: ~700 emails/month** (well within free tier)

## Support

### Resend Resources
- Documentation: https://resend.com/docs
- Support: support@resend.com
- Status: https://resend.com/status

### Internal Resources
- Email service code: `lib/email/emailService.ts`
- Templates: `lib/email/templates/`
- Test script: `lib/email/test-emails.ts`
- Full docs: `lib/email/README.md`

## Next Steps

After basic setup is complete, consider:

1. **Email Verification** - Add email verification for new signups
2. **Email Queue** - Implement queue for reliable delivery at scale
3. **Email Analytics** - Track opens, clicks, conversions
4. **A/B Testing** - Test different email designs
5. **Transactional Emails** - Add more notification types
6. **Newsletter** - Set up bulk email campaigns
7. **Email Preferences** - Let users customize notification settings

## Troubleshooting Commands

```bash
# Test email configuration
npx tsx lib/email/test-emails.ts

# Check environment variables
cat .env.local | grep RESEND

# View email service logs
# Check your application logs for email-related messages

# Test DNS records
nslookup -type=TXT pixelforgestudio.com
nslookup -type=CNAME resend1._domainkey.pixelforgestudio.com
```

## Questions?

If you encounter any issues:

1. Check this guide first
2. Review Resend documentation
3. Check email logs in Resend dashboard
4. Contact Resend support (very responsive!)
5. Review code in `lib/email/`

---

**Happy Emailing! 📧**
