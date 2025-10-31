import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, RefreshCw } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy | Pixel Forge Studio',
  description: 'Refund Policy for Pixel Forge Studio',
};

export default function RefundPolicy() {
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
              <RefreshCw className="w-4 h-4" />
              Legal Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(var(--foreground))]">
              Refund Policy
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Refund Policy Content */}
          <div className="card-elevated p-8 mb-12 animate-slide-up">
            <div className="prose prose-lg max-w-none space-y-8 text-[hsl(var(--foreground))]">
              {/* Introduction */}
              <section>
                <p className="text-[hsl(var(--muted-foreground))]">
                  At Pixel Forge Studio, we strive to provide high-quality digital art bundles and excellent customer service.
                  Due to the nature of digital products, our refund policy is designed to be fair to both our customers and our business.
                </p>
              </section>

              {/* Digital Nature of Products */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  1. Digital Product Policy
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  All products sold by Pixel Forge Studio are digital goods. Once a bundle is purchased and downloaded,
                  it cannot be "returned" in the traditional sense as you have already received and accessed the digital files.
                </p>
                <p className="text-[hsl(var(--muted-foreground))]">
                  Therefore, <strong className="text-[hsl(var(--foreground))]">we generally do not offer refunds for purchased bundles that have been successfully downloaded</strong>.
                  We encourage all customers to carefully review bundle descriptions, preview images, and specifications before making a purchase.
                </p>
              </section>

              {/* Eligible Refund Circumstances */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  2. Eligible Refund Circumstances
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  While our general policy is no refunds after download, we will consider refund requests in the following exceptional circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[hsl(var(--muted-foreground))]">
                  <li>
                    <strong className="text-[hsl(var(--foreground))]">Technical Issues:</strong> If you experience technical problems
                    downloading or accessing your purchased bundle and our support team is unable to resolve the issue after reasonable attempts.
                  </li>
                  <li>
                    <strong className="text-[hsl(var(--foreground))]">Defective Product:</strong> If the files are corrupted,
                    incomplete, or significantly different from the description and preview images provided on our website.
                  </li>
                  <li>
                    <strong className="text-[hsl(var(--foreground))]">Duplicate Purchase:</strong> If you accidentally purchased
                    the same bundle twice within a short time period (typically within 24 hours).
                  </li>
                  <li>
                    <strong className="text-[hsl(var(--foreground))]">Payment Error:</strong> If you were charged incorrectly
                    or multiple times due to a payment processing error.
                  </li>
                  <li>
                    <strong className="text-[hsl(var(--foreground))]">Non-Download Cases:</strong> If you have not yet downloaded
                    the bundle and contact us within 24 hours of purchase to request a refund.
                  </li>
                </ul>
              </section>

              {/* Refund Timeframe */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  3. Refund Request Timeframe
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Refund requests must be submitted within:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>
                    <strong className="text-[hsl(var(--foreground))]">24 hours</strong> for non-downloaded bundles
                  </li>
                  <li>
                    <strong className="text-[hsl(var(--foreground))]">7 days</strong> for technical issues or defective products
                  </li>
                  <li>
                    <strong className="text-[hsl(var(--foreground))]">48 hours</strong> for duplicate purchases or payment errors
                  </li>
                </ul>
                <p className="text-[hsl(var(--muted-foreground))] mt-4">
                  Requests submitted after these timeframes may not be eligible for a refund, though we will review each case individually.
                </p>
              </section>

              {/* How to Request a Refund */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  4. How to Request a Refund
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-[hsl(var(--muted-foreground))]">
                  <li>
                    Contact our support team at{' '}
                    <a href="mailto:support@pixelforgestudio.in" className="text-[hsl(var(--primary))] hover:underline">
                      support@pixelforgestudio.in
                    </a>
                  </li>
                  <li>Include "Refund Request" in the subject line</li>
                  <li>Provide your order details (order ID, date of purchase, bundle name)</li>
                  <li>Clearly explain the reason for your refund request</li>
                  <li>
                    If applicable, provide evidence such as:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Screenshots of technical errors</li>
                      <li>Description of defects or issues with the files</li>
                      <li>Any relevant documentation supporting your claim</li>
                    </ul>
                  </li>
                </ol>
              </section>

              {/* Refund Process */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  5. Refund Process
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>
                    Our support team will review your request within <strong className="text-[hsl(var(--foreground))]">24-48 hours</strong>
                  </li>
                  <li>
                    We may reach out to you for additional information or to attempt to resolve the issue before processing a refund
                  </li>
                  <li>
                    If your refund is approved, it will be processed through the original payment method
                  </li>
                  <li>
                    Refunds typically appear in your account within <strong className="text-[hsl(var(--foreground))]">5-10 business days</strong>,
                    depending on your payment provider
                  </li>
                  <li>
                    You will receive an email confirmation once the refund has been processed
                  </li>
                </ul>
              </section>

              {/* Non-Refundable Circumstances */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  6. Non-Refundable Circumstances
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Refunds will <strong className="text-[hsl(var(--foreground))]">not</strong> be issued in the following situations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>Change of mind or buyer's remorse after downloading the bundle</li>
                  <li>Purchasing the wrong bundle or not reading the bundle description carefully</li>
                  <li>Incompatibility with your software if standard file formats (PNG, JPG) are provided as described</li>
                  <li>Dissatisfaction with artistic style, colors, or subjective preferences when the bundle matches its description</li>
                  <li>Failure to download the bundle within the specified access period</li>
                  <li>Violation of our Terms of Service or improper use of the purchased materials</li>
                </ul>
              </section>

              {/* Access Revocation */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  7. Access Revocation
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  If a refund is granted, your download access for that bundle will be revoked. You are expected to delete all
                  downloaded files and cease using the content. Continued use of the bundle after receiving a refund is a violation
                  of our Terms of Service and may result in legal action.
                </p>
              </section>

              {/* Alternative Solutions */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  8. Alternative Solutions
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Before requesting a refund, we encourage you to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))]">
                  <li>Contact our support team to troubleshoot any technical issues</li>
                  <li>Review our FAQ page for common questions and solutions</li>
                  <li>Request assistance with downloading or accessing your files</li>
                </ul>
                <p className="text-[hsl(var(--muted-foreground))] mt-4">
                  Many issues can be resolved quickly without the need for a refund. Our team is committed to ensuring you have
                  a positive experience with our products and services.
                </p>
              </section>

              {/* Chargebacks */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  9. Chargebacks and Disputes
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  If you initiate a chargeback or payment dispute without first contacting us, we reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--muted-foreground))] mt-4">
                  <li>Immediately suspend your account access</li>
                  <li>Revoke access to all purchased bundles</li>
                  <li>Pursue the matter legally if fraudulent activity is suspected</li>
                </ul>
                <p className="text-[hsl(var(--muted-foreground))] mt-4">
                  We strongly encourage you to contact us first to resolve any issues before disputing charges with your payment provider.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  10. Changes to This Policy
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                  We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting
                  to our website. The "Last updated" date at the top of this page indicates when the policy was last revised.
                  Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
                </p>
              </section>

              {/* Contact Section */}
              <section>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                  11. Contact Us
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  If you have any questions about our refund policy or need to request a refund, please contact us:
                </p>
                <p className="text-[hsl(var(--foreground))]">
                  <strong>Email:</strong> <a href="mailto:support@pixelforgestudio.in" className="text-[hsl(var(--primary))] hover:underline">support@pixelforgestudio.in</a>
                </p>
                <p className="text-[hsl(var(--muted-foreground))] mt-2">
                  We aim to respond to all refund requests within 24-48 hours during business days.
                </p>
              </section>
            </div>
          </div>

          {/* Contact section */}
          <div className="card-elevated p-6 bg-[hsl(var(--primary-light))] border-[hsl(var(--primary))]/20 animate-slide-up">
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
              Need to request a refund or have questions?
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
              Contact our support team and we'll be happy to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:support@pixelforgestudio.in"
                className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] transition-colors font-medium text-sm"
              >
                support@pixelforgestudio.in
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] transition-colors font-medium text-sm"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
