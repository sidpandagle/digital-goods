import * as React from 'react';

interface OrderConfirmationEmailProps {
  userName: string;
  orderId: string;
  bundleName: string;
  bundlePrice: number;
  orderDate: string;
  downloadUrl: string;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  userName,
  orderId,
  bundleName,
  bundlePrice,
  orderDate,
  downloadUrl
}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
    </head>
    <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '2px solid #10b981' }}>
          <h1 style={{ color: '#10b981', margin: 0, fontSize: '28px' }}>✓ Order Confirmed</h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Pixel Forge Studio</p>
        </div>

        {/* Main Content */}
        <div style={{ padding: '40px 20px' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Thank You for Your Purchase! 🎉</h2>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            Hi {userName},
          </p>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            Your order has been confirmed and is ready for download!
          </p>

          {/* Order Details */}
          <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ color: '#1e293b', marginTop: 0 }}>Order Details</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tr>
                <td style={{ padding: '8px 0', color: '#64748b' }}>Order ID:</td>
                <td style={{ padding: '8px 0', color: '#1e293b', fontWeight: 'bold', textAlign: 'right' }}>#{orderId}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#64748b' }}>Date:</td>
                <td style={{ padding: '8px 0', color: '#1e293b', textAlign: 'right' }}>{orderDate}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#64748b', borderTop: '1px solid #cbd5e1', paddingTop: '15px' }}>Bundle:</td>
                <td style={{ padding: '8px 0', color: '#1e293b', fontWeight: 'bold', textAlign: 'right', borderTop: '1px solid #cbd5e1', paddingTop: '15px' }}>{bundleName}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#64748b' }}>Amount Paid:</td>
                <td style={{ padding: '8px 0', color: '#10b981', fontWeight: 'bold', fontSize: '18px', textAlign: 'right' }}>₹{bundlePrice.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          {/* Download Button */}
          <div style={{ backgroundColor: '#ecfdf5', border: '2px solid #10b981', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
            <p style={{ color: '#065f46', margin: '0 0 15px 0', fontWeight: 'bold' }}>
              Your bundle is ready to download!
            </p>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '14px 40px',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              Download Now
            </a>
            <p style={{ color: '#64748b', fontSize: '12px', margin: '15px 0 0 0' }}>
              This download link will remain active indefinitely
            </p>
          </div>

          <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ color: '#92400e', margin: 0, fontSize: '14px' }}>
              <strong>💡 Tip:</strong> Save this email for future access to your download link. You can also find it in your
              <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`} style={{ color: '#b45309', textDecoration: 'underline' }}> Dashboard</a>.
            </p>
          </div>

          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '15px' }}>
            Thank you for choosing Pixel Forge Studio! We hope you create something amazing with your new assets.
          </p>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e2e8f0', padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          <p style={{ margin: '0 0 10px 0' }}>
            Need help? <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/contact`} style={{ color: '#6366f1', textDecoration: 'none' }}>Contact Support</a> |
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
