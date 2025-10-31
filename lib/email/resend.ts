import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender email (you'll need to verify this domain in Resend)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@pixelforgestudio.com';
const FROM_NAME = 'Pixel Forge Studio';

export { resend, FROM_EMAIL, FROM_NAME };
