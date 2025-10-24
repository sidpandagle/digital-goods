'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bundle } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { AlertTriangle, ArrowLeft, Loader2, ShoppingCart, Check, Info, Mail, Image as ImageIcon, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
            Back to Catalog
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-gray-100">
          <div className="lg:flex lg:items-start ">
            {/* Left Column: Image Gallery + What's Included */}
            <div className="lg:w-1/2 relative lg:flex lg:flex-col lg:sticky lg:top-24 lg:h-fit">
              {(() => {
                const images = bundle.image_urls && bundle.image_urls.length > 0
                  ? bundle.image_urls
                  : bundle.preview_image_url
                    ? [bundle.preview_image_url]
                    : [];

                if (images.length === 0) {
                  return (
                    <div className="w-full aspect-square bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                      <ImageIcon className="w-32 h-32 text-white/70 relative z-10" strokeWidth={1.5} />
                    </div>
                  );
                }

                return (
                  <div className="relative lg:flex-1 lg:flex lg:flex-col">
                    {/* Main Image Display */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square group shadow-lg">
                      <img
                        src={images[selectedImageIndex]}
                        alt={`${bundle.title} - Image ${selectedImageIndex + 1}`}
                        className="w-full h-full object-contain p-4 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

                      {/* Navigation Arrows (only if multiple images) */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
                            aria-label="Previous image"
                          >
                            <ArrowLeft className="w-6 h-6 text-gray-900" strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
                            aria-label="Next image"
                          >
                            <ArrowRight className="w-6 h-6 text-gray-900" strokeWidth={2} />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold z-20">
                          {selectedImageIndex + 1} / {images.length}
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Gallery (only if multiple images) */}
                    {images.length > 1 && (
                      <div className="p-4 overflow-x-auto border-t border-gray-200">
                        <div className="flex gap-3 justify-center">
                          {images.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImageIndex === index
                                  ? 'border-blue-600 ring-2 ring-blue-200 scale-105'
                                  : 'border-gray-200 hover:border-blue-400 opacity-70 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    {bundle.category && (
                      <div className="absolute top-6 right-6 z-20">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-blue-600 text-sm font-bold rounded-full shadow-xl border border-blue-100">
                          {bundle.category}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Bundle Details */}
            <div className="lg:w-1/2 p-8 lg:p-12 lg:pl-10">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{bundle.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5 text-blue-500" strokeWidth={2} />
                  <span className="text-sm">Premium AI-Generated Collection</span>
                </div>
              </div>

              {bundle.description && (
                <p className="text-gray-700 mb-10 leading-relaxed text-lg">{bundle.description}</p>
              )}

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6 text-blue-600" strokeWidth={2} />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium">{bundle.image_count} high-quality AI-generated images</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" strokeWidth={2} />
                    </div>
                    <span className="font-medium">Google Drive links for easy viewing</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" strokeWidth={2} />
                    </div>
                    <span className="font-medium">Instant download after purchase</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" strokeWidth={2} />
                    </div>
                    <span className="font-medium">Lifetime access to your purchase</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Total Price</p>
                    <p className="text-5xl font-bold">₹{bundle.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">One-time payment</p>
                    <p className="text-white text-sm font-medium">No subscription needed</p>
                  </div>
                </div>
              </div>

              {/* Purchase Form */}
              <div className="space-y-5">
                {user && email ? (
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" strokeWidth={2} />
                      Purchasing As
                    </label>
                    <div className="w-full px-5 py-3.5 border-2 border-green-200 bg-green-50 rounded-xl text-lg flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" strokeWidth={2} />
                      <span className="font-medium text-gray-900">{email}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                      <Info className="w-4 h-4" strokeWidth={2} />
                      Download link will be sent to this email
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <div>
                        <p className="font-bold text-gray-900 mb-1">Login Required for Purchase</p>
                        <p className="text-sm text-gray-700">You'll be prompted to log in when you click "Complete Purchase"</p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium flex items-start gap-3 animate-in">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    {error}
                  </div>
                )}

                <button
                  onClick={handlePurchase}
                  disabled={processing}
                  className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {processing ? (
                      <>
                        <Loader2 className="animate-spin h-6 w-6 text-white" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" strokeWidth={2} />
                        Complete Purchase
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                      </>
                    )}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ShieldCheck className="w-5 h-5 text-green-600" strokeWidth={2} />
                  <span className="font-medium">Secure payment powered by Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
