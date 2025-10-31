import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
  name,
  email,
  subject,
  message
}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
    </head>
    <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '2px solid #6366f1' }}>
          <h1 style={{ color: '#6366f1', margin: 0, fontSize: '24px' }}>📬 New Contact Form Submission</h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Pixel Forge Studio</p>
        </div>

        {/* Main Content */}
        <div style={{ padding: '30px 20px' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '20px', fontSize: '20px' }}>Contact Details</h2>

          <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tr>
                <td style={{ padding: '10px 0', color: '#64748b', fontWeight: 'bold', width: '100px' }}>From:</td>
                <td style={{ padding: '10px 0', color: '#1e293b' }}>{name}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 0', color: '#64748b', fontWeight: 'bold' }}>Email:</td>
                <td style={{ padding: '10px 0', color: '#6366f1' }}>
                  <a href={`mailto:${email}`} style={{ color: '#6366f1', textDecoration: 'none' }}>{email}</a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px 0', color: '#64748b', fontWeight: 'bold' }}>Subject:</td>
                <td style={{ padding: '10px 0', color: '#1e293b', fontWeight: 'bold' }}>{subject}</td>
              </tr>
            </table>
          </div>

          <h3 style={{ color: '#1e293b', marginBottom: '15px', fontSize: '18px' }}>Message</h3>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', color: '#475569', lineHeight: '1.6' }}>
            {message.split('\n').map((paragraph, index) => (
              <p key={index} style={{ margin: '0 0 10px 0' }}>{paragraph}</p>
            ))}
          </div>

          <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
            <p style={{ color: '#92400e', margin: 0, fontSize: '14px' }}>
              <strong>⏰ Response Time:</strong> Please respond within 24-48 hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e2e8f0', padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
          <p style={{ margin: 0 }}>
            This email was sent from the Pixel Forge Studio contact form
          </p>
          <p style={{ margin: '5px 0 0 0' }}>
            © {new Date().getFullYear()} Pixel Forge Studio
          </p>
        </div>
      </div>
    </body>
  </html>
);
