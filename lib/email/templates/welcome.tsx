import * as React from 'react';

interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName, userEmail }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
    </head>
    <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '2px solid #6366f1' }}>
          <h1 style={{ color: '#6366f1', margin: 0, fontSize: '28px' }}>Pixel Forge Studio</h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Premium Digital Assets</p>
        </div>

        {/* Main Content */}
        <div style={{ padding: '40px 20px' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Welcome to Pixel Forge Studio! 🎨</h2>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            Hi {userName},
          </p>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            Thank you for joining Pixel Forge Studio! We're thrilled to have you as part of our creative community.
          </p>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            Your account has been successfully created with the email: <strong>{userEmail}</strong>
          </p>

          <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ color: '#1e293b', marginTop: 0 }}>What's Next?</h3>
            <ul style={{ color: '#475569', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Browse our collection of premium digital asset bundles</li>
              <li>Download high-quality resources for your projects</li>
              <li>Access all your purchases from your dashboard</li>
              <li>Get updates on new releases and exclusive offers</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                padding: '12px 30px',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              Browse Bundles
            </a>
          </div>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            If you have any questions or need assistance, feel free to reach out to our support team.
          </p>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e2e8f0', padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          <p style={{ margin: '0 0 10px 0' }}>
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/contact`} style={{ color: '#6366f1', textDecoration: 'none' }}>Contact Us</a> |
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/faq`} style={{ color: '#6366f1', textDecoration: 'none', marginLeft: '10px' }}>FAQ</a> |
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/privacy-policy`} style={{ color: '#6366f1', textDecoration: 'none', marginLeft: '10px' }}>Privacy Policy</a>
          </p>
          <p style={{ margin: '10px 0 0 0' }}>
            © {new Date().getFullYear()} Pixel Forge Studio. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
);
