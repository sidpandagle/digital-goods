'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, HelpCircle, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

const faqCategories = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Pixel Forge Studio?',
        a: 'Pixel Forge Studio is a premium digital marketplace offering high-quality AI-generated art bundles. We curate stunning digital art collections perfect for creators, designers, and enthusiasts looking for unique visual content.'
      },
      {
        q: 'What file formats are included in the bundles?',
        a: 'Our bundles typically include high-resolution PNG and JPG files. Each bundle description specifies the exact formats, resolutions, and dimensions included. All images are optimized for both web and print use.'
      },
      {
        q: 'Can I use these for commercial projects?',
        a: 'Yes! All our bundles come with a commercial license. You can use the images in personal and commercial projects, including client work, products for sale, websites, social media, and more. Please refer to our Terms of Service for complete usage rights.'
      },
      {
        q: 'How long do I have access to my purchased bundles?',
        a: 'Once you purchase a bundle, you have lifetime access to download it from your account. We recommend downloading and saving your files in a secure location as a backup.'
      }
    ]
  },
  {
    category: 'Purchasing',
    questions: [
      {
        q: 'How do I purchase a bundle?',
        a: 'Simply browse our collection, click on a bundle you like, and click the "Buy Now" button. You\'ll need to create an account or sign in, then complete the payment through our secure Razorpay payment gateway.'
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept all major payment methods through Razorpay, including credit cards, debit cards, UPI, net banking, and popular digital wallets. All payments are processed securely with industry-standard encryption.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely! We use Razorpay, a PCI DSS compliant payment gateway. We never store your complete payment card information on our servers. All transactions are encrypted and processed securely.'
      },
      {
        q: 'Do you offer bulk or bundle discounts?',
        a: 'Currently, each bundle is priced individually. However, we occasionally run special promotions and discount codes. Subscribe to our newsletter to stay updated on special offers!'
      }
    ]
  },
  {
    category: 'Downloads',
    questions: [
      {
        q: 'How do I download my purchased bundles?',
        a: 'After a successful purchase, you\'ll be redirected to your "My Purchases" dashboard where you can instantly download your bundle. You\'ll also receive an email with download instructions. Simply click the "Download" button to get your files.'
      },
      {
        q: 'What if I lose my download link?',
        a: 'No worries! Just log in to your account and go to "My Purchases" dashboard. All your purchased bundles are stored there with download buttons. You can re-download them anytime.'
      },
      {
        q: 'Is there a download limit?',
        a: 'You can download your purchased bundles multiple times from your account. However, download links are secured with tokens for your protection. If you experience any issues, please contact our support team.'
      },
      {
        q: 'What file size should I expect?',
        a: 'Bundle sizes vary depending on the image count and resolution. Most bundles range from 50MB to 500MB. High-resolution bundles with many images may be larger. File sizes are typically mentioned in bundle descriptions.'
      }
    ]
  },
  {
    category: 'Licensing & Usage',
    questions: [
      {
        q: 'What can I do with the images?',
        a: 'You can use the images in personal and commercial projects, including websites, social media, marketing materials, products for resale (with modifications), client projects, and more. You cannot resell or redistribute the original files as-is.'
      },
      {
        q: 'Can I modify the images?',
        a: 'Yes! You\'re free to edit, modify, crop, and customize the images to fit your needs. This includes changing colors, adding text, combining with other elements, and any other creative modifications.'
      },
      {
        q: 'Can I share the files with my team?',
        a: 'The license is per-user, meaning only you (the purchaser) have the rights to use the files. If team members need access, they should purchase their own license. However, using the images in collaborative projects where you create the deliverables is perfectly fine.'
      },
      {
        q: 'Do I need to give credit?',
        a: 'Attribution is not required but always appreciated! You\'re free to use our images without crediting Pixel Forge Studio, but we\'d love it if you could mention us when possible.'
      }
    ]
  },
  {
    category: 'Refunds & Support',
    questions: [
      {
        q: 'Can I get a refund?',
        a: 'Due to the digital nature of our products, we generally cannot offer refunds once a bundle has been downloaded. However, if you experience technical issues or receive a defective product, please contact us immediately at support@pixelforgestudio.in and we\'ll work to resolve the issue.'
      },
      {
        q: 'What if there\'s a problem with my download?',
        a: 'If you experience any technical issues with downloading or accessing your files, please contact our support team at support@pixelforgestudio.in. We typically respond within 24 hours and will help resolve any issues quickly.'
      },
      {
        q: 'How do I contact support?',
        a: 'You can reach our support team by emailing support@pixelforgestudio.in. We aim to respond to all inquiries within 24 hours during business days. Please include your order details if you\'re asking about a specific purchase.'
      },
      {
        q: 'What if I have a question not listed here?',
        a: 'We\'re here to help! Please visit our Contact page or email us at support@pixelforgestudio.in with any questions. We love hearing from our customers and are happy to assist with any inquiries.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Filter FAQ based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <HelpCircle className="w-4 h-4" />
              Help Center
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(var(--foreground))]">
              Frequently Asked Questions
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg">
              Find answers to common questions about Pixel Forge Studio
            </p>
          </div>

          {/* Search Box */}
          <div className="mb-8 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          {filteredCategories.length > 0 ? (
            <div className="space-y-8">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={category.category} className="animate-slide-up" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                  <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                    {category.category}
                  </h2>
                  <div className="space-y-3">
                    {category.questions.map((item, index) => {
                      const itemId = `${category.category}-${index}`;
                      const isOpen = openItems.includes(itemId);

                      return (
                        <div
                          key={itemId}
                          className="card-elevated overflow-hidden transition-all duration-200 hover:shadow-lg"
                        >
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left group"
                          >
                            <span className="font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                              {item.q}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-[hsl(var(--muted-foreground))] flex-shrink-0 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                              strokeWidth={2}
                            />
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-200 ${
                              isOpen ? 'max-h-96' : 'max-h-0'
                            }`}
                          >
                            <div className="px-6 pb-4 text-[hsl(var(--muted-foreground))] leading-relaxed border-t border-[hsl(var(--border))] pt-4">
                              {item.a}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-elevated p-12 text-center">
              <Search className="w-16 h-16 text-[hsl(var(--muted-foreground))] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
                No results found
              </h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Try different keywords or browse all questions above
              </p>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-12 card-elevated p-8 bg-[hsl(var(--primary-light))] border-[hsl(var(--primary))]/20 animate-slide-up text-center">
            <h3 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-3">
              Still have questions?
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary px-8"
              >
                Contact Support
              </Link>
              <a
                href="mailto:support@pixelforgestudio.in"
                className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] transition-colors font-medium"
              >
                support@pixelforgestudio.in
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
