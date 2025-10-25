'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bundle } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { AlertTriangle, ArrowLeft, Loader2, ShoppingCart, Check, Info, Mail, Image as ImageIcon, Clock, ShieldCheck, ArrowRight, Download, FileText, Palette, Printer, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

type TabType = 'description' | 'included' | 'themes' | 'print' | 'download';

export default function BundleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!authLoading) {
      // Allow viewing bundle details without authentication
      fetchBundle();
    }
  }, [authLoading, params.id]);

  const checkAuth = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user?.email) {
      setEmail(user.email);
    }
    setAuthLoading(false);
  };

  const fetchBundle = async () => {
    try {
      const res = await fetch('/api/bundles');
      if (!res.ok) throw new Error('Failed to fetch bundles');

      const data = await res.json();
      const bundles: Bundle[] = data.bundles || data;
      const foundBundle = bundles.find((b: Bundle) => b.id === params.id);

      if (!foundBundle) {
        setError('Bundle not found');
      } else {
        setBundle(foundBundle);
      }
    } catch (err) {
      setError('Failed to load bundle');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!bundle) return;

    // Check if user is authenticated before proceeding
    if (!user) {
      router.push(`/login?redirect=/bundle/${params.id}`);
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Create Razorpay order
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundleId: bundle.id,
        }),
      });

      if (!orderRes.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderRes.json();

      // Initialize Razorpay checkout (script loaded globally)
      if (!window.Razorpay) {
        setError('Payment gateway not loaded. Please refresh the page.');
        setProcessing(false);
        return;
      }

      const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Pixel Forge Studio Store',
          description: bundle.title,
          order_id: orderData.orderId,
          prefill: {
            email: email,
          },
          theme: {
            color: '#2563eb',
          },
          handler: async function (response: any) {
            // Verify payment
            try {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              if (!verifyRes.ok) {
                throw new Error('Payment verification failed');
              }

              const verifyData = await verifyRes.json();

              // Redirect to success page with token
              router.push(`/success?token=${verifyData.downloadToken}`);
            } catch (err) {
              console.error('Verification error:', err);
              router.push('/failure');
            }
          },
          modal: {
            ondismiss: function () {
              setProcessing(false);
              setError('Payment cancelled. Please try again when ready.');
            },
          },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description || 'Please try again'}`);
        setProcessing(false);
      });
    } catch (err) {
      console.error('Purchase error:', err);
      setError('Failed to initiate purchase. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 bg-blue-100 opacity-20 animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-700 font-medium">Loading bundle details...</p>
        </div>
      </div>
    );
  }

  if (error && !bundle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md animate-slide-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" strokeWidth={2} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Bundle Not Found</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  if (!bundle) return null;

  const images = bundle.image_urls && bundle.image_urls.length > 0
    ? bundle.image_urls
    : bundle.preview_image_url
      ? [bundle.preview_image_url]
      : [];

  const tabs = [
    { id: 'description' as TabType, label: 'Description', icon: FileText },
    { id: 'included' as TabType, label: 'What\'s Included', icon: Check },
    { id: 'themes' as TabType, label: 'Themes', icon: Palette },
    { id: 'print' as TabType, label: 'Print Info', icon: Printer },
    { id: 'download' as TabType, label: 'Download', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 gradient-mesh-bg opacity-40 pointer-events-none" />
      <div className="fixed inset-0 bg-[hsl(var(--background))] opacity-90 pointer-events-none" />

      {/* Animated gradient orbs for depth */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-96 h-96 bg-[hsl(var(--secondary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[hsl(var(--surface))]/80 border-b border-[hsl(var(--border))] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              Back to Catalog
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Hero Section - Image Carousel + Product Info */}
          <div className="card-elevated overflow-hidden animate-slide-up">
            <div className="grid lg:grid-cols-2">
              {/* Left: Hero Image Carousel */}
              <div className="relative bg-[hsl(var(--muted))] flex items-center">
                {images.length === 0 ? (
                  <div className="w-full aspect-square flex items-center justify-center">
                    <ImageIcon className="w-32 h-32 text-[hsl(var(--muted-foreground))]/30" strokeWidth={1.5} />
                  </div>
                ) : (
                  <div className="relative aspect-square">
                    <img
                      src={images[selectedImageIndex]}
                      alt={`${bundle.title} - Image ${selectedImageIndex + 1}`}
                      className="w-full h-full object-contain p-8"
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full shadow-lg transition-all hover:scale-110"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-6 h-6 text-[hsl(var(--foreground))]" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full shadow-lg transition-all hover:scale-110"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-6 h-6 text-[hsl(var(--foreground))]" strokeWidth={2} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                          {selectedImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}

                    {/* Category Badge */}
                    {bundle.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 glass-strong text-[hsl(var(--primary))] text-xs font-semibold rounded-full shadow-md backdrop-blur-md">
                          {bundle.category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="p-8 lg:p-10">
                <h1 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--foreground))] mb-6 leading-tight">{bundle.title}</h1>

                <div className="border-t border-[hsl(var(--border))] pt-6 mb-6">
                  {/* Key Features */}
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-[hsl(var(--foreground))]">
                      <Check className="w-5 h-5 text-[hsl(var(--success))] mr-3 flex-shrink-0" strokeWidth={2} />
                      <span className="font-medium">{bundle.image_count} HD Images</span>
                    </li>
                    <li className="flex items-center text-[hsl(var(--foreground))]">
                      <Check className="w-5 h-5 text-[hsl(var(--success))] mr-3 flex-shrink-0" strokeWidth={2} />
                      <span className="font-medium">Printable Quality</span>
                    </li>
                    <li className="flex items-center text-[hsl(var(--foreground))]">
                      <Check className="w-5 h-5 text-[hsl(var(--success))] mr-3 flex-shrink-0" strokeWidth={2} />
                      <span className="font-medium">AI-Generated Art</span>
                    </li>
                  </ul>

                  {/* Price */}
                  <div className="gradient-primary rounded-[var(--radius-lg)] p-6 mb-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10" />
                    <div className="flex justify-between items-center relative z-10">
                      <div>
                        <p className="text-white/70 text-sm mb-1">Total Price</p>
                        <p className="text-4xl font-bold">₹{bundle.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/70 text-sm">One-time</p>
                        <p className="text-white text-sm font-medium">payment</p>
                      </div>
                    </div>
                  </div>



                  {error && (
                    <div className="mt-4 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-[var(--radius-lg)] text-sm font-medium flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      {error}
                    </div>
                  )}

                  {!user && (
                    <div className="mb-4 bg-[hsl(var(--info-light))] border-2 border-[hsl(var(--info))] rounded-[var(--radius-lg)] p-4">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-[hsl(var(--info))] flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <div>
                          <p className="font-bold text-[hsl(var(--foreground))] text-sm mb-1">Login Required</p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">You'll be prompted to log in to complete purchase</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <button
                    onClick={handlePurchase}
                    disabled={processing}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" strokeWidth={2} />
                        BUY NOW
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          {images.length > 0 && (
            <div className="card-elevated p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">Gallery Preview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.slice(0, 8).map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-[var(--radius-lg)] overflow-hidden border-2 border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-all cursor-pointer group"
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {hoveredImage === index && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                        <ZoomIn className="w-10 h-10 text-white" strokeWidth={2} />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded text-center font-medium backdrop-blur-sm">
                      Image {index + 1}
                    </div>
                  </div>
                ))}
              </div>
              {images.length > 8 && (
                <p className="text-center text-[hsl(var(--muted-foreground))] text-sm">
                  +{images.length - 8} more images included in this collection
                </p>
              )}
            </div>
          )}

          {/* Tabs Section */}
          <div className="card-elevated overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
            {/* Tab Navigation */}
            <div className="border-b border-[hsl(var(--border))]">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))] bg-[hsl(var(--primary-light))]'
                          : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">About This Collection</h3>
                  {bundle.description ? (
                    <p className="text-[hsl(var(--foreground))] leading-relaxed whitespace-pre-line">{bundle.description}</p>
                  ) : (
                    <p className="text-[hsl(var(--foreground))] leading-relaxed">
                      This stunning collection features {bundle.image_count} high-quality AI-generated images.
                      Each image has been carefully crafted to capture the essence and beauty of the theme,
                      perfect for your creative projects.
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'included' && (
                <div>
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))] ">What You'll Get</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--success-light))] flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-[hsl(var(--success))]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-bold text-[hsl(var(--foreground))]">{bundle.image_count} High-Resolution Images</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">Premium quality AI-generated art</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--success-light))] flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-[hsl(var(--success))]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-bold text-[hsl(var(--foreground))]">PDF Document</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">All images in a convenient PDF format</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--success-light))] flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-[hsl(var(--success))]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-bold text-[hsl(var(--foreground))]">Instant Download</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">Get immediate access after purchase completion</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--success-light))] flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-[hsl(var(--success))]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-bold text-[hsl(var(--foreground))]">Lifetime Access</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">Download and use forever, no expiration</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'themes' && (
                <div>
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-6">Design Themes</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[hsl(var(--primary-light))] rounded-[var(--radius-lg)] p-6 border border-[hsl(var(--border))]">
                      <Palette className="w-8 h-8 text-[hsl(var(--primary))] mb-3" strokeWidth={2} />
                      <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Creative Design</h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        Carefully designed with attention to detail and aesthetic appeal
                      </p>
                    </div>
                    <div className="bg-[hsl(var(--secondary-light))] rounded-[var(--radius-lg)] p-6 border border-[hsl(var(--border))]">
                      <ImageIcon className="w-8 h-8 text-[hsl(var(--secondary))] mb-3" strokeWidth={2} />
                      <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">AI-Generated Art</h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        Unique designs created with advanced AI technology
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'print' && (
                <div>
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-6">Printing Information</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
                        <Printer className="w-5 h-5 text-[hsl(var(--primary))]" />
                        Print Quality
                      </h4>
                      <p className="text-[hsl(var(--muted-foreground))]">
                        These images are high-resolution and suitable for printing.
                        For best results, use high-quality photo paper.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Print Quality Tips</h4>
                      <ul className="list-disc list-inside text-[hsl(var(--muted-foreground))] space-y-2">
                        <li>Use premium photo paper for vibrant colors</li>
                        <li>Set printer to highest quality settings</li>
                        <li>Ensure color calibration for accurate reproduction</li>
                        <li>Frame with UV-protective glass to prevent fading</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'download' && (
                <div>
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-6">Download Instructions</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-bold text-[hsl(var(--foreground))]">Complete Your Purchase</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">Secure payment via Razorpay</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-bold text-[hsl(var(--foreground))]">Check Your Email</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">You'll receive a download link instantly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-bold text-[hsl(var(--foreground))]">Download Your Files</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">Access all {bundle.image_count} images in PDF format</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="card-elevated p-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">License</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Personal & Commercial use allowed. Cannot resell or redistribute as-is.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">Contact</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Questions? Email us at support@pixelforgestudio.in
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">Pixel Forge Studio</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Premium AI-generated digital art collections
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
