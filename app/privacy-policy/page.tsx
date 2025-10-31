import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Pixel Forge Studio',
  description: 'Privacy Policy for Pixel Forge Studio',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 gradient-mesh-bg opacity-40 pointer-events-none" />
      <div className="fixed inset-0 bg-[hsl(var(--background))] opacity-90 pointer-events-none" />

      {/* Animated gradient orbs for depth */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-96 h-96 bg-[hsl(var(--secondary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        <Header />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Legal Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(var(--foreground))]">
              Privacy Policy
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="card-elevated p-8 mb-12 animate-slide-up">
            <div className="prose prose-lg max-w-none space-y-8 text-[hsl(var(--foreground))]">
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  We collect information that you provide directly to us when using Pixel Forge Studio:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li><strong className="text-[hsl(var(--foreground))]">Account Information:</strong> When you create an account, we collect your full name, email address, and password (stored securely via Supabase Auth).</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Payment Information:</strong> When you make a purchase, payment details are processed through Razorpay. We store transaction IDs, order amounts, and payment status but never store your full credit card details.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Purchase History:</strong> We maintain records of your bundle purchases, including order details, download tokens, and access counts.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Usage Data:</strong> We collect information about how you interact with our platform, including download activity and access timestamps.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>Process and fulfill your orders for digital art bundles</li>
                  <li>Provide access to purchased content through secure download tokens</li>
                  <li>Send you transactional emails about your purchases and downloads</li>
                  <li>Maintain your account and authenticate your identity</li>
                  <li>Prevent fraud and ensure platform security</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  3. Data Storage and Security
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  We take data security seriously and implement industry-standard measures to protect your information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li><strong className="text-[hsl(var(--foreground))]">Secure Storage:</strong> Your data is stored securely using Supabase with Row Level Security (RLS) policies to ensure you can only access your own information.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Authentication:</strong> Passwords are hashed and never stored in plain text. We use Supabase Auth for secure authentication.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Payment Processing:</strong> All payments are processed through Razorpay, a PCI DSS compliant payment gateway. We do not store your complete payment card information.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Download Tokens:</strong> Access to purchased content is managed through time-limited, secure download tokens.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Encryption:</strong> Data is transmitted using SSL/TLS encryption.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  4. Information Sharing
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  We do not sell, rent, or trade your personal information. We only share your information in the following limited circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li><strong className="text-[hsl(var(--foreground))]">Payment Processing:</strong> Your payment information is shared with Razorpay to process transactions.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Service Providers:</strong> We use Supabase for database and authentication services, who may have access to your data to provide their services.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Legal Requirements:</strong> We may disclose information if required by law or to protect our rights.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  5. Your Rights and Choices
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li><strong className="text-[hsl(var(--foreground))]">Access:</strong> You can view your account information and purchase history in your dashboard.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Update:</strong> You can update your account information at any time.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Delete:</strong> You can request deletion of your account by contacting us. Note that some information may be retained for legal and business purposes.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Downloaded Content:</strong> Once you download a bundle, you retain access to those files. However, we may revoke download token access for security reasons.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  6. Cookies and Tracking
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  We use essential cookies to maintain your session and authentication state. These cookies are necessary for the platform to function properly and cannot be disabled. We do not use third-party tracking or advertising cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  7. Data Retention
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  We retain your personal information for as long as your account is active or as needed to provide you services. Purchase records and transaction history are retained for accounting and legal compliance purposes. Download tokens may expire after a certain period for security reasons.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  8. Children's Privacy
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  9. Changes to This Policy
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  We may update this privacy policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this policy. Your continued use of the platform after changes are posted constitutes your acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  10. Contact Us
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  If you have any questions, concerns, or requests regarding this privacy policy or your personal information, please contact us at:
                </p>
                <p className="text-[hsl(var(--foreground))]">
                  <strong>Email:</strong> <a href="mailto:support@pixelforgestudio.in" className="text-[hsl(var(--primary))] hover:underline">support@pixelforgestudio.in</a>
                </p>
              </section>
            </div>
          </div>

          {/* Contact section */}
          <div className="card-elevated p-6 bg-[hsl(var(--primary-light))] border-[hsl(var(--primary))]/20 animate-slide-up">
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
              Questions about our privacy practices?
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
              If you have any questions or concerns about this privacy policy, please contact us.
            </p>
            <a
              href="mailto:support@pixelforgestudio.in"
              className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] transition-colors font-medium text-sm"
            >
              support@pixelforgestudio.in
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
