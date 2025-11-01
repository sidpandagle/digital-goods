import Link from 'next/link';
import Image from 'next/image';
import { Bundle } from '@/types/database';
import { createClient } from '@/lib/supabase/server';
import Header from './components/Header';
import Footer from './components/Footer';
import { Star, CheckCircle, Video, Zap, Image as ImageIcon, Eye, ChevronRight, Download, ShoppingCart, Package, Award, Shield, Sparkles } from 'lucide-react';

async function getRecentBundles(): Promise<Bundle[]> {
  try {
    const supabase = await createClient();
    const { data: bundles, error } = await supabase
      .from('bundles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching bundles:', error);
      return [];
    }

    return bundles || [];
  } catch (error) {
    console.error('Error fetching bundles:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const bundles = await getRecentBundles();

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

        {/* Hero Section - Enhanced with modern gradients and effects */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-in">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
              Premium Digital Collections
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gradient leading-tight px-2">
              Discover Stunning
              <br />
              AI Art
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 text-balance leading-relaxed px-4">
              Explore our curated collection of premium AI-generated digital art bundles,
              carefully crafted for creators and enthusiasts
            </p>

            {/* Stats badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-4 px-4">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] shadow-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--success))]" />
                <span className="text-xs sm:text-sm font-medium text-[hsl(var(--foreground))]">High Quality</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] shadow-sm">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--info))]" />
                <span className="text-xs sm:text-sm font-medium text-[hsl(var(--foreground))]">Instant Download</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] shadow-sm">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--warning))]" />
                <span className="text-xs sm:text-sm font-medium text-[hsl(var(--foreground))]">Commercial License</span>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {bundles.length === 0 ? (
          <div className="text-center py-24 animate-in">
            <div className="relative inline-flex mb-8">
              <div className="absolute inset-0 bg-[hsl(var(--primary))]/20 rounded-full blur-2xl animate-pulse-slow" />
              <div className="relative w-28 h-28 rounded-full bg-[hsl(var(--surface))] border-2 border-[hsl(var(--border))] flex items-center justify-center">
                <ImageIcon className="w-14 h-14 text-[hsl(var(--primary))]" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-[hsl(var(--foreground))] mb-4">No bundles available yet</h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-md mx-auto">Check back soon for amazing AI art collections!</p>
          </div>
        ) : (
          <>
            <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between animate-slide-up gap-2">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-2">Recent Collections</h2>
                <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base md:text-lg">
                  Explore our latest premium digital art bundles
                </p>
              </div>
              <Link
                href="/browse-collections"
                className="btn-primary flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
              >
                View All
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>

            {/* Bundle Grid - Enhanced modern card design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {bundles.map((bundle, index) => (
                <Link
                  key={bundle.id}
                  href={`/bundle/${bundle.id}`}
                  className="group card-elevated overflow-hidden hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Preview Image - Enhanced with modern overlay */}
                  <div className="relative overflow-hidden aspect-video bg-[hsl(var(--muted))]">
                    {(bundle.image_urls?.[0] || bundle.preview_image_url) ? (
                      <>
                        <img
                          src={bundle.image_urls?.[0] || bundle.preview_image_url || ''}
                          alt={bundle.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Hover overlay icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-16 h-16 rounded-full glass-strong flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Eye className="w-8 h-8 text-gray-600" strokeWidth={2} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full gradient-primary flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
                        </div>
                        <ImageIcon
                          className="w-20 h-20 text-white/90 relative z-10 animate-float"
                          strokeWidth={1.5}
                        />
                      </div>
                    )}
                    {bundle.category && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1.5 glass-strong text-[hsl(var(--primary))] text-xs font-semibold rounded-full shadow-md backdrop-blur-md">
                          {bundle.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bundle Info - Modern typography and spacing */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                      {bundle.title}
                    </h3>

                    {bundle.description && (
                      <p className="text-[hsl(var(--muted-foreground))] text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-2 leading-relaxed whitespace-pre-line">
                        {bundle.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between py-3 sm:py-4 border-t border-[hsl(var(--border))]">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[hsl(var(--primary-light))] flex items-center justify-center">
                          <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--primary))]" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">Images</p>
                          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{bundle.image_count}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-0.5">Price</p>
                        <p className="text-xl sm:text-2xl font-bold text-gradient">
                          ₹{bundle.price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-5">
                      <div className="btn-primary w-full flex items-center justify-center gap-2 group/btn text-sm sm:text-base">
                        View Details
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Features Section */}
            <div className="mt-16 sm:mt-20 md:mt-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-slide-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                  Why Choose Pixel Forge Studio?
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                  Premium quality digital art with commercial licensing and instant access
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="card-elevated p-6 sm:p-8 text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3">Premium Quality</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
                    Each artwork is carefully curated and crafted using advanced AI technology to ensure the highest quality standards
                  </p>
                </div>

                <div className="card-elevated p-6 sm:p-8 text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Download className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3">Instant Download</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
                    Get immediate access to your purchased bundles. Download your files anytime, anywhere, with no waiting period
                  </p>
                </div>

                <div className="card-elevated p-6 sm:p-8 text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3">Commercial License</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
                    Use our digital art in your commercial projects with full licensing rights included in every purchase
                  </p>
                </div>

                <div className="card-elevated p-6 sm:p-8 text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Package className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3">Curated Collections</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
                    Carefully organized bundles with multiple high-resolution images, perfect for diverse creative projects
                  </p>
                </div>

                <div className="card-elevated p-6 sm:p-8 text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3">AI-Powered Art</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
                    Cutting-edge AI technology creates unique, stunning visuals that stand out in any creative project
                  </p>
                </div>

                <div className="card-elevated p-6 sm:p-8 text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3">Secure & Trusted</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
                    Safe and secure payment processing with trusted payment gateways for your peace of mind
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="mt-16 sm:mt-20 md:mt-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-slide-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                  How It Works
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                  Get started with premium digital art in three simple steps
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 relative">
                {/* Connection lines for desktop */}
                <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))] to-[hsl(var(--primary))] opacity-20" style={{ top: '4rem', left: '20%', right: '20%' }} />

                <div className="relative text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 bg-[hsl(var(--primary))]/20 rounded-full blur-xl animate-pulse-slow" />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl border-4 border-[hsl(var(--background))]">
                      <span className="text-2xl sm:text-3xl font-bold text-white">1</span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mb-3">Browse Collections</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
                    Explore our curated gallery of premium AI-generated art bundles and find the perfect collection for your project
                  </p>
                </div>

                <div className="relative text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 bg-[hsl(var(--primary))]/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl border-4 border-[hsl(var(--background))]">
                      <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mb-3">Complete Purchase</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
                    Securely purchase your chosen bundle with our trusted payment gateway and receive instant confirmation
                  </p>
                </div>

                <div className="relative text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 bg-[hsl(var(--primary))]/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center shadow-xl border-4 border-[hsl(var(--background))]">
                      <Download className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mb-3">Download & Create</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
                    Get instant access to high-resolution files and start creating amazing projects with your new digital art
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA Section */}
            <div className="mt-16 sm:mt-20 md:mt-24">
              <div className="card-elevated p-8 sm:p-12 md:p-16 text-center relative overflow-hidden animate-slide-up">
                <div className="absolute inset-0 gradient-primary opacity-5" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[hsl(var(--secondary))]/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-sm font-medium mb-6">
                    <Star className="w-4 h-4 fill-current" />
                    Start Your Creative Journey
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-4 sm:mb-6">
                    Ready to Explore More?
                  </h2>

                  <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10">
                    Browse our complete collection of premium digital art bundles and find the perfect assets for your next project
                  </p>

                  <Link
                    href="/browse-collections"
                    className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 inline-flex items-center gap-3 shadow-xl hover:shadow-2xl"
                  >
                    View All Collections
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
      </div>
    </div>
  );
}
