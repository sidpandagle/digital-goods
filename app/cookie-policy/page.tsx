import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, Cookie } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy - Pixel Forge Studio',
  description: 'Learn about how Pixel Forge Studio uses cookies and similar technologies to improve your browsing experience.',
};

export default function CookiePolicyPage() {
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
              <Cookie className="w-4 h-4" />
              Cookie Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(var(--foreground))]">
              Cookie Policy
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">1. Introduction</h2>
            <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">
              This Cookie Policy explains how Pixel Forge Studio ("we", "us", or "our") uses cookies and similar
              technologies when you visit our website at pixelforgestudio.in (the "Website"). This policy describes
              what cookies are, what types of cookies we use, how we use them, and how you can control cookie preferences.
            </p>
          </section>

          {/* What Are Cookies */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">2. What Are Cookies?</h2>
            <p className="leading-relaxed mb-4 text-[hsl(var(--muted-foreground))]">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you
              visit a website. They are widely used to make websites work more efficiently and provide information to
              website owners.
            </p>
            <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">
              Cookies allow websites to remember your actions and preferences (such as login status, language, and other
              display preferences) over a period of time, so you don't have to keep re-entering them whenever you return
              to the site or browse from one page to another.
            </p>
          </section>

          {/* Types of Cookies We Use */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">3. Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--primary))]">3.1 Essential Cookies</h3>
                <p className="leading-relaxed mb-2 text-[hsl(var(--muted-foreground))]">
                  These cookies are strictly necessary for the operation of our Website. They enable core functionality
                  such as security, network management, and accessibility. You cannot opt-out of these cookies.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
                  <li>Authentication cookies (keep you logged in)</li>
                  <li>Security cookies (detect abuse and fraud)</li>
                  <li>Load balancing cookies (distribute traffic efficiently)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--primary))]">3.2 Performance and Analytics Cookies</h3>
                <p className="leading-relaxed mb-2 text-[hsl(var(--muted-foreground))]">
                  These cookies help us understand how visitors interact with our Website by collecting and reporting
                  information anonymously. This helps us improve the Website's performance and user experience.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
                  <li>Google Analytics (visitor statistics and behavior)</li>
                  <li>Page load time measurement</li>
                  <li>Error tracking and debugging</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--primary))]">3.3 Functionality Cookies</h3>
                <p className="leading-relaxed mb-2 text-[hsl(var(--muted-foreground))]">
                  These cookies allow the Website to remember choices you make (such as your username, language, or
                  region) and provide enhanced, more personalized features.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
                  <li>Language preferences</li>
                  <li>Display preferences (theme, layout)</li>
                  <li>Shopping cart persistence</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--primary))]">3.4 Targeting and Advertising Cookies</h3>
                <p className="leading-relaxed mb-2 text-[hsl(var(--muted-foreground))]">
                  These cookies are used to deliver advertisements more relevant to you and your interests. They may
                  also be used to limit the number of times you see an advertisement and help measure the effectiveness
                  of advertising campaigns.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
                  <li>Advertising platform cookies (Google Ads, Facebook Pixel)</li>
                  <li>Retargeting cookies</li>
                  <li>Conversion tracking cookies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">4. How We Use Cookies</h2>
            <p className="leading-relaxed mb-4 text-[hsl(var(--muted-foreground))]">We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
              <li>To enable you to sign in and remain authenticated during your session</li>
              <li>To remember your preferences and settings</li>
              <li>To analyze how you use our Website and improve its functionality</li>
              <li>To personalize content and advertisements</li>
              <li>To protect against fraud and maintain security</li>
              <li>To process payments and fulfill orders</li>
              <li>To provide customer support and respond to inquiries</li>
            </ul>
          </section>

          {/* Third-Party Cookies */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">5. Third-Party Cookies</h2>
            <p className="leading-relaxed mb-4 text-[hsl(var(--muted-foreground))]">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
              deliver advertisements, and provide enhanced functionality:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
              <li><strong className="text-[hsl(var(--foreground))]">Google Analytics:</strong> For website traffic analysis</li>
              <li><strong className="text-[hsl(var(--foreground))]">Payment Processors:</strong> For secure payment processing (Razorpay)</li>
              <li><strong className="text-[hsl(var(--foreground))]">Social Media Platforms:</strong> For social sharing and login features</li>
              <li><strong className="text-[hsl(var(--foreground))]">Advertising Partners:</strong> For targeted advertising (if applicable)</li>
            </ul>
          </section>

          {/* Managing Cookie Preferences */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">6. Managing Your Cookie Preferences</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--primary))]">6.1 Cookie Consent Tool</h3>
                <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">
                  When you first visit our Website, you will be presented with a cookie consent banner. You can choose
                  to accept all cookies or customize your preferences. You can change your cookie preferences at any
                  time by clicking the "Cookie Settings" link in the footer.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--primary))]">6.2 Browser Settings</h3>
                <p className="leading-relaxed mb-2 text-[hsl(var(--muted-foreground))]">
                  Most web browsers allow you to control cookies through their settings. You can set your browser to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
                  <li>Block all cookies</li>
                  <li>Accept only first-party cookies</li>
                  <li>Clear cookies when you close your browser</li>
                  <li>Notify you when a cookie is being set</li>
                </ul>
                <p className="leading-relaxed mt-4 text-[hsl(var(--muted-foreground))]">
                  Please note that blocking or deleting cookies may impact your ability to use certain features of our
                  Website, and some functionality may not work correctly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--primary))]">6.3 Opt-Out of Analytics</h3>
                <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">
                  You can opt-out of Google Analytics by installing the{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Duration */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">7. Cookie Duration</h2>
            <p className="leading-relaxed mb-4 text-[hsl(var(--muted-foreground))]">Cookies can be either session cookies or persistent cookies:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
              <li>
                <strong className="text-[hsl(var(--foreground))]">Session Cookies:</strong> These are temporary cookies that expire when you
                close your browser. They are used primarily for authentication and navigation.
              </li>
              <li>
                <strong className="text-[hsl(var(--foreground))]">Persistent Cookies:</strong> These remain on your device for a set period
                (from days to years) or until you manually delete them. They are used to remember your preferences and
                provide analytics data.
              </li>
            </ul>
          </section>

          {/* Updates to This Policy */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">8. Updates to This Cookie Policy</h2>
            <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal,
              regulatory, or operational reasons. Any changes will be posted on this page with an updated "Last updated"
              date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact Us */}
          <section className="card-elevated p-8 bg-[hsl(var(--primary-light))] border-[hsl(var(--primary))]/20 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">9. Contact Us</h2>
            <p className="leading-relaxed mb-4 text-[hsl(var(--muted-foreground))]">
              If you have any questions about our Cookie Policy or how we use cookies, please contact us:
            </p>
            <div className="space-y-2">
              <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">
                <strong className="text-[hsl(var(--foreground))]">Email:</strong>{' '}
                <a
                  href="mailto:support@pixelforgestudio.in"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))]"
                >
                  support@pixelforgestudio.in
                </a>
              </p>
              <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">
                <strong className="text-[hsl(var(--foreground))]">Website:</strong>{' '}
                <Link href="/" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))]">
                  pixelforgestudio.in
                </Link>
              </p>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="card-elevated p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">10. Additional Resources</h2>
            <p className="leading-relaxed mb-4 text-[hsl(var(--muted-foreground))]">
              For more information about cookies and how to manage them, visit these resources:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-[hsl(var(--muted-foreground))]">
              <li>
                <a
                  href="https://www.allaboutcookies.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] underline"
                >
                  All About Cookies
                </a>
              </li>
              <li>
                <a
                  href="https://www.youronlinechoices.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] underline"
                >
                  Your Online Choices (EU)
                </a>
              </li>
              <li>
                <a
                  href="https://www.networkadvertising.org/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] underline"
                >
                  Network Advertising Initiative
                </a>
              </li>
            </ul>
          </section>

          {/* Related Policies */}
          <div className="card-elevated p-8 bg-[hsl(var(--primary-light))] border-[hsl(var(--primary))]/20 mt-12 animate-slide-up">
            <h3 className="text-xl font-bold mb-4 text-[hsl(var(--foreground))]">Related Policies</h3>
            <p className="text-[hsl(var(--muted-foreground))] mb-4">
              For more information about how we handle your data, please review:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy-policy"
                className="px-6 py-3 bg-[hsl(var(--surface))] hover:bg-[hsl(var(--muted))] rounded-lg transition-colors border border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="px-6 py-3 bg-[hsl(var(--surface))] hover:bg-[hsl(var(--muted))] rounded-lg transition-colors border border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
