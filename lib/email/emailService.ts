import * as React from 'react';
import { render } from '@react-email/render';
import { resend, FROM_EMAIL, FROM_NAME } from './resend';
import { WelcomeEmail } from './templates/welcome';
import { OrderConfirmationEmail } from './templates/order-confirmation';
import { PasswordResetEmail } from './templates/password-reset';
import { ContactFormEmail } from './templates/contact-form';

// Email service types
interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface WelcomeEmailData {
  to: string;
  userName: string;
  userEmail: string;
}

interface OrderConfirmationEmailData {
  to: string;
  userName: string;
  orderId: string;
  bundleName: string;
  bundlePrice: number;
  orderDate: string;
  downloadUrl: string;
}

interface PasswordResetEmailData {
  to: string;
  userName: string;
  resetUrl: string;
}

interface ContactFormEmailData {
  to: string; // Admin email
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Email logging function
const logEmail = (type: string, recipient: string, success: boolean, error?: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] Email ${type} to ${recipient}: ${success ? 'SUCCESS' : 'FAILED'}`;

  if (error) {
    console.error(`${logMessage} - Error: ${error}`);
  } else {
    console.log(logMessage);
  }
};

// Welcome Email
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailResponse> {
  try {
    const emailHtml = await render(WelcomeEmail({
      userName: data.userName,
      userEmail: data.userEmail,
    }) as React.ReactElement);

    const result = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.to,
      subject: 'Welcome to Pixel Forge Studio! 🎨',
      html: emailHtml,
    });

    logEmail('WELCOME', data.to, true);
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error occurred';
    logEmail('WELCOME', data.to, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

// Order Confirmation Email
export async function sendOrderConfirmationEmail(data: OrderConfirmationEmailData): Promise<EmailResponse> {
  try {
    const emailHtml = await render(OrderConfirmationEmail({
      userName: data.userName,
      orderId: data.orderId,
      bundleName: data.bundleName,
      bundlePrice: data.bundlePrice,
      orderDate: data.orderDate,
      downloadUrl: data.downloadUrl,
    }) as React.ReactElement);

    const result = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.to,
      subject: `Order Confirmed - ${data.bundleName} #${data.orderId}`,
      html: emailHtml,
    });

    logEmail('ORDER_CONFIRMATION', data.to, true);
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error occurred';
    logEmail('ORDER_CONFIRMATION', data.to, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

// Password Reset Email
export async function sendPasswordResetEmail(data: PasswordResetEmailData): Promise<EmailResponse> {
  try {
    const emailHtml = await render(PasswordResetEmail({
      userName: data.userName,
      resetUrl: data.resetUrl,
    }) as React.ReactElement);

    const result = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.to,
      subject: 'Reset Your Password - Pixel Forge Studio',
      html: emailHtml,
    });

    logEmail('PASSWORD_RESET', data.to, true);
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error occurred';
    logEmail('PASSWORD_RESET', data.to, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

// Contact Form Email (to admin)
export async function sendContactFormEmail(data: ContactFormEmailData): Promise<EmailResponse> {
  try {
    const emailHtml = await render(ContactFormEmail({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    }) as React.ReactElement);

    const result = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.to,
      replyTo: data.email, // Allow easy reply to customer
      subject: `Contact Form: ${data.subject}`,
      html: emailHtml,
    });

    logEmail('CONTACT_FORM', data.to, true);
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error occurred';
    logEmail('CONTACT_FORM', data.to, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

// Contact Form Auto-Reply (to customer)
export async function sendContactFormAutoReply(customerEmail: string, customerName: string): Promise<EmailResponse> {
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
            <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #6366f1;">
              <h1 style="color: #6366f1; margin: 0; font-size: 28px;">Pixel Forge Studio</h1>
            </div>
            <div style="padding: 40px 20px;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">We've Received Your Message</h2>
              <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
                Hi ${customerName},
              </p>
              <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
                Thank you for contacting Pixel Forge Studio! We've received your message and our support team will review it shortly.
              </p>
              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="color: #1e293b; margin: 0; font-weight: bold;">⏰ Expected Response Time:</p>
                <p style="color: #475569; margin: 10px 0 0 0;">We typically respond within 24-48 hours during business days.</p>
              </div>
              <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
                In the meantime, you might find answers to common questions in our <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/faq" style="color: #6366f1;">FAQ section</a>.
              </p>
            </div>
            <div style="border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Pixel Forge Studio. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: customerEmail,
      subject: 'We\'ve Received Your Message - Pixel Forge Studio',
      html: emailHtml,
    });

    logEmail('CONTACT_AUTO_REPLY', customerEmail, true);
    return { success: true, messageId: result.data?.id };
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error occurred';
    logEmail('CONTACT_AUTO_REPLY', customerEmail, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

export type {
  EmailResponse,
  WelcomeEmailData,
  OrderConfirmationEmailData,
  PasswordResetEmailData,
  ContactFormEmailData,
};
