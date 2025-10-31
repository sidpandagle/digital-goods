import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'About Us - Pixel Forge Studio | Premium Digital Asset Marketplace',
  description: 'Learn about Pixel Forge Studio, our mission to empower creators with high-quality digital assets, and our commitment to excellence in the digital marketplace.',
  openGraph: {
    title: 'About Us - Pixel Forge Studio',
    description: 'Learn about Pixel Forge Studio and our mission to empower creators worldwide.',
    type: 'website',
  },
};

export default function AboutPage() {
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

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] animate-fade-in">
            About Pixel Forge Studio
          </h1>
          <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
            Empowering creators with premium digital assets since 2025
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[hsl(var(--card))] backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-[hsl(var(--foreground))]">Our Story</h2>
            <div className="space-y-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
              <p>
                Pixel Forge Studio was born from a simple observation: creators deserve access to high-quality
                digital assets without the hassle of subscription fees or licensing confusion. We believe that
                great design should be accessible to everyone, from hobbyists to professional studios.
              </p>
              <p>
                What started as a small collection of curated image bundles has grown into a comprehensive
                marketplace serving thousands of creators worldwide. Every asset in our collection is carefully
                selected or created to meet the highest standards of quality and usability.
              </p>
              <p>
                We're not just a marketplace – we're a community of creators, designers, and visionaries who
                believe in the power of visual storytelling. Our mission is to provide you with the tools you
                need to bring your creative vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--muted))]/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-linear-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 backdrop-blur-sm rounded-2xl p-8 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 shadow-md">
              <div className="w-16 h-16 bg-[hsl(var(--primary))]/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[hsl(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">Our Mission</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                To democratize access to premium digital assets by providing creators with affordable,
                high-quality resources that inspire creativity and accelerate project development. We believe
                every creator deserves professional-grade tools to bring their vision to life.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-linear-to-br from-[hsl(var(--secondary))]/10 to-[hsl(var(--primary))]/10 backdrop-blur-sm rounded-2xl p-8 border border-[hsl(var(--border))] hover:border-[hsl(var(--secondary))]/50 transition-all duration-300 shadow-md">
              <div className="w-16 h-16 bg-[hsl(var(--secondary))]/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[hsl(var(--secondary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]">Our Vision</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                To become the go-to marketplace for digital creators worldwide, known for our curated collection,
                exceptional quality, and customer-first approach. We envision a future where every creator has
                instant access to the assets they need to transform their ideas into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[hsl(var(--foreground))]">What Makes Us Different</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quality First */}
            <div className="bg-[hsl(var(--card))] backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm">
              <div className="w-12 h-12 bg-[hsl(var(--primary))]/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[hsl(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--foreground))]">Quality First</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Every asset is carefully curated and tested to ensure it meets our high standards of quality and usability.
              </p>
            </div>

            {/* Simple Licensing */}
            <div className="bg-[hsl(var(--card))] backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm">
              <div className="w-12 h-12 bg-[hsl(var(--primary))]/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[hsl(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--foreground))]">Simple Licensing</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                No confusing terms or restrictions. Use our assets in your personal and commercial projects with confidence.
              </p>
            </div>

            {/* Instant Access */}
            <div className="bg-[hsl(var(--card))] backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm">
              <div className="w-12 h-12 bg-[hsl(var(--primary))]/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[hsl(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--foreground))]">Instant Access</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Download your purchases immediately and access them forever. No waiting, no subscriptions, no limits.
              </p>
            </div>

            {/* Affordable Pricing */}
            <div className="bg-[hsl(var(--card))] backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm">
              <div className="w-12 h-12 bg-[hsl(var(--primary))]/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[hsl(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--foreground))]">Affordable Pricing</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Premium quality doesn't have to mean premium prices. We keep our bundles affordable for creators at all levels.
              </p>
            </div>

            {/* Customer Support */}
            <div className="bg-[hsl(var(--card))] backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm">
              <div className="w-12 h-12 bg-[hsl(var(--primary))]/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[hsl(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--foreground))]">Dedicated Support</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Our team is here to help. Get quick responses to your questions and assistance when you need it.
              </p>
            </div>

            {/* Regular Updates */}
            <div className="bg-[hsl(var(--card))] backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm">
              <div className="w-12 h-12 bg-[hsl(var(--primary))]/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[hsl(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--foreground))]">Regular Updates</h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Fresh content added regularly. Stay ahead with the latest trends and styles in digital design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--muted))]/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] mb-2">
                10,000+
              </div>
              <div className="text-[hsl(var(--muted-foreground))]">Digital Assets</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] mb-2">
                5,000+
              </div>
              <div className="text-[hsl(var(--muted-foreground))]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] mb-2">
                50+
              </div>
              <div className="text-[hsl(var(--muted-foreground))]">Premium Bundles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] mb-2">
                24/7
              </div>
              <div className="text-[hsl(var(--muted-foreground))]">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[hsl(var(--foreground))]">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
            Join thousands of creators who trust Pixel Forge Studio for their digital asset needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-lg font-semibold hover:opacity-90 transition-all duration-200 text-white shadow-lg hover:shadow-xl hover:transform hover:scale-105"
            >
              Browse Bundles
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-[hsl(var(--card))] backdrop-blur-sm rounded-lg font-semibold hover:bg-[hsl(var(--card-hover))] transition-all duration-200 text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
