import * as React from 'react';

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({ userName, resetUrl }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
    </head>
    <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '2px solid #f59e0b' }}>
          <h1 style={{ color: '#f59e0b', margin: 0, fontSize: '28px' }}>🔐 Password Reset</h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Pixel Forge Studio</p>
        </div>

        {/* Main Content */}
        <div style={{ padding: '40px 20px' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Reset Your Password</h2>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            Hi {userName},
          </p>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            We received a request to reset your password for your Pixel Forge Studio account.
          </p>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
            Click the button below to create a new password:
          </p>

          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a
              href={resetUrl}
              style={{
                display: 'inline-block',
                backgroundColor: '#f59e0b',
                color: '#ffffff',
                padding: '14px 40px',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              Reset Password
            </a>
          </div>

          <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ color: '#92400e', margin: 0, fontSize: '14px' }}>
              <strong>⚠️ Security Notice:</strong> This password reset link will expire in 1 hour for your security.
            </p>
          </div>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px', fontSize: '14px' }}>
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          <p style={{ color: '#6366f1', fontSize: '12px', wordBreak: 'break-all', backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '4px' }}>
            {resetUrl}
          </p>

          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
            <p style={{ color: '#991b1b', margin: 0, fontSize: '14px' }}>
              <strong>❗ Didn't request this?</strong> If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e2e8f0', padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          <p style={{ margin: '0 0 10px 0' }}>
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/contact`} style={{ color: '#6366f1', textDecoration: 'none' }}>Contact Support</a> |
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/faq`} style={{ color: '#6366f1', textDecoration: 'none', marginLeft: '10px' }}>FAQ</a>
          </p>
          <p style={{ margin: '10px 0 0 0' }}>
            © {new Date().getFullYear()} Pixel Forge Studio. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
);
