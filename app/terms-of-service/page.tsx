import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Pixel Forge Studio',
  description: 'Terms of Service for Pixel Forge Studio',
};

export default function TermsOfService() {
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
              <FileText className="w-4 h-4" />
              Legal Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(var(--foreground))]">
              Terms of Service
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Terms of Service Content */}
          <div className="card-elevated p-8 mb-12 animate-slide-up">
            <div className="prose prose-lg max-w-none space-y-8 text-[hsl(var(--foreground))]">
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  By accessing and using Pixel Forge Studio, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. By creating an account and making purchases, you confirm that you are at least 13 years old and have the legal capacity to enter into this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  2. Account Registration and Security
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  To purchase and access digital art bundles, you must create an account:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized access to your account</li>
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>One account per user - sharing or transferring accounts is prohibited</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  3. Digital Products and Purchases
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Pixel Forge Studio offers digital art bundles for purchase:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li><strong className="text-[hsl(var(--foreground))]">Product Description:</strong> We strive to display accurate images and descriptions. However, colors and details may vary slightly from what appears on your screen.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Pricing:</strong> All prices are listed in Indian Rupees (INR) and are subject to change without notice. The price displayed at checkout is the final price.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Payment:</strong> Payments are processed securely through Razorpay. By making a purchase, you authorize us to charge your selected payment method.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Digital Delivery:</strong> Upon successful payment, you will receive access to download your purchased bundle through a secure download token.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  4. License and Usage Rights
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  When you purchase a digital art bundle, you receive the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li><strong className="text-[hsl(var(--foreground))]">Personal and Commercial Use:</strong> You may use the purchased digital art for both personal and commercial projects.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Modification:</strong> You may modify, edit, and incorporate the art into your own creative works.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Prohibited Uses:</strong> You may NOT:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Resell, redistribute, or share the original files</li>
                      <li>Claim the artwork as your own original creation</li>
                      <li>Use the artwork in any way that is illegal, defamatory, or obscene</li>
                      <li>Create competing digital products or bundles for sale</li>
                      <li>Share your download links or tokens with others</li>
                    </ul>
                  </li>
                  <li><strong className="text-[hsl(var(--foreground))]">Copyright:</strong> Pixel Forge Studio retains all copyright and intellectual property rights to the original artwork.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  5. Download Access and Tokens
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Access to purchased bundles is managed through secure download tokens:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>Download tokens are unique to your account and should not be shared</li>
                  <li>Tokens may have access limits or expiration dates for security purposes</li>
                  <li>We recommend downloading your purchases immediately and keeping backups</li>
                  <li>While we strive to maintain download access, we cannot guarantee indefinite availability</li>
                  <li>We reserve the right to revoke access if we detect abuse or terms violations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  6. Refund and Cancellation Policy
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Due to the nature of digital products:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li><strong className="text-[hsl(var(--foreground))]">No Refunds:</strong> All sales are final. Once you have accessed or downloaded a bundle, no refunds will be provided.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Exceptions:</strong> Refunds may be considered in cases of technical errors, duplicate charges, or if the product is significantly different from its description. Contact us within 48 hours of purchase.</li>
                  <li><strong className="text-[hsl(var(--foreground))]">Payment Issues:</strong> If a payment fails or is cancelled before completion, no charges will be applied.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  7. User Conduct and Prohibited Activities
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>Use any automated systems or software to extract data from the platform</li>
                  <li>Attempt to gain unauthorized access to any part of the platform or other users' accounts</li>
                  <li>Interfere with or disrupt the platform's security or functionality</li>
                  <li>Use the platform for any illegal or fraudulent purpose</li>
                  <li>Upload or transmit viruses, malware, or other harmful code</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  8. Intellectual Property
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  All content on Pixel Forge Studio, including but not limited to digital artwork, logos, text, graphics, and software, is the property of Pixel Forge Studio and is protected by copyright, trademark, and other intellectual property laws. The license granted to you upon purchase applies only to the specific digital art bundle you purchased, not to any other platform content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  9. Disclaimers and Warranties
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  The platform and all content are provided "as is" without warranties of any kind:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>We do not guarantee that the platform will be uninterrupted, secure, or error-free</li>
                  <li>We make no warranties regarding the accuracy, reliability, or completeness of content</li>
                  <li>We do not warrant that the digital files will be compatible with all software or devices</li>
                  <li>It is your responsibility to ensure the artwork meets your project requirements before purchase</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  10. Limitation of Liability
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  To the maximum extent permitted by law, Pixel Forge Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from: (a) your use or inability to use the platform; (b) any unauthorized access to or use of our servers; (c) any interruption or cessation of transmission to or from the platform; (d) any bugs, viruses, or similar issues transmitted to or through the platform; or (e) any errors or omissions in content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  11. Indemnification
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  You agree to indemnify and hold harmless Pixel Forge Studio, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from: (a) your use of the platform; (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) your use of purchased digital art in violation of the license terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  12. Account Termination
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>Suspend or terminate your account at any time for violations of these Terms</li>
                  <li>Remove or disable access to any content that violates these Terms</li>
                  <li>Take appropriate legal action for any illegal or unauthorized use</li>
                  <li>You may request account deletion at any time, but access to previously purchased content may be revoked</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  13. Changes to Terms
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the platform after changes are posted constitutes your acceptance of the modified Terms. We encourage you to review these Terms periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  14. Governing Law and Disputes
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the platform shall be subject to the exclusive jurisdiction of the courts located in India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  15. Severability
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  16. Contact Information
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
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
              Questions about our terms of service?
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
              If you have any questions or concerns about these terms, please contact us.
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
