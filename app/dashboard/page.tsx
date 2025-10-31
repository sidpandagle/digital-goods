'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { AlertTriangle, Search, Mail, Loader2, ShoppingBag, ArrowRight, Info, Download, Image as ImageIcon } from 'lucide-react';

interface Purchase {
  id: string;
  bundle_id: string;
  amount: number;
  created_at: string;
  bundle: {
    id: string;
    title: string;
    description: string | null;
    preview_image_url: string | null;
    image_urls: string[] | null;
    image_count: number;
    category: string | null;
  };
  download_token: {
    token: string;
    accessed_count: number;
    last_accessed_at: string | null;
  } | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  const checkAuthAndRedirect = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Redirect authenticated users to the proper my-purchases page
      router.push('/my-purchases');
      return;
    }

    setAuthChecking(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setPurchases([]);

    try {
      const response = await fetch(`/api/user/purchases?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch purchases');
      }

      const data = await response.json();
      setPurchases(data.purchases || []);
      setSearched(true);
    } catch (err) {
      console.error('Error fetching purchases:', err);
      setError('Failed to load purchases. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Show loading while checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 bg-blue-100 opacity-20 animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-700 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Deprecation Notice */}
      <div className="bg-yellow-50 border-b-2 border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 text-yellow-800">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
            <p className="text-sm font-medium">
              <strong>Legacy Access:</strong> This page is for guest purchases only. For the best experience, please{' '}
              <Link href="/login" className="underline hover:text-yellow-900">sign in</Link> to view your purchases.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  My Purchases
                </h1>
                <p className="text-xs text-gray-600">Access your digital art</p>
              </div>
            </div>
            <Link
              href="/"
              className="group px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" strokeWidth={2} />
              Browse Catalog
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Email Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 border border-gray-100 animate-slide-up">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Find Your Purchases
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">Enter your email to view all your bundles</p>
            </div>
          </div>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" strokeWidth={2} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base md:text-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm sm:text-base min-w-[120px] sm:min-w-[140px]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  <span className="hidden xs:inline">Searching...</span>
                </>
              ) : (
                <>
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium flex items-start gap-3 animate-in">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2} />
              {error}
            </div>
          )}
        </div>

        {/* Purchases List */}
        {searched && (
          <>
            {purchases.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-100 animate-in">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  No Purchases Found
                </h3>
                <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                  We couldn&apos;t find any purchases associated with this email address.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold"
                >
                  <ImageIcon className="w-5 h-5" strokeWidth={2} />
                  Browse Bundles
                </Link>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6 animate-in">
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Your Purchases
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                        {purchases.length}
                      </span>
                      bundle{purchases.length !== 1 ? 's' : ''} in your collection
                    </p>
                  </div>
                </div>

                {purchases.map((purchase, index) => (
                  <div
                    key={purchase.id}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Preview Image */}
                      <div className="w-full lg:w-1/3 relative overflow-hidden">
                        {(purchase.bundle.image_urls?.[0] || purchase.bundle.preview_image_url) ? (
                          <>
                            <img
                              src={purchase.bundle.image_urls?.[0] || purchase.bundle.preview_image_url || ''}
                              alt={purchase.bundle.title}
                              className="w-full h-48 sm:h-56 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          </>
                        ) : (
                          <div className="w-full h-48 sm:h-56 lg:h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                            <ImageIcon
                              className="w-12 h-12 sm:w-16 sm:h-16 text-white/70 relative z-10"
                              strokeWidth={2}
                            />
                          </div>
                        )}
                        {purchase.bundle.category && (
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-bold rounded-full shadow-lg">
                              {purchase.bundle.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Purchase Details */}
                      <div className="w-full lg:w-2/3 p-4 sm:p-6 md:p-8">
                        <div className="mb-4 sm:mb-5">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {purchase.bundle.title}
                          </h3>
                          {purchase.bundle.description && (
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2">
                              {purchase.bundle.description}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6">
                          <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="text-xs text-blue-600 font-semibold uppercase mb-1">Purchased</div>
                            <div className="font-bold text-gray-900 text-xs sm:text-sm">{formatDate(purchase.created_at)}</div>
                          </div>
                          <div className="bg-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="text-xs text-indigo-600 font-semibold uppercase mb-1">Images</div>
                            <div className="font-bold text-gray-900 text-xs sm:text-sm">{purchase.bundle.image_count} files</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="text-xs text-purple-600 font-semibold uppercase mb-1">Amount Paid</div>
                            <div className="font-bold text-gray-900 text-xs sm:text-sm">₹{purchase.amount / 100}</div>
                          </div>
                          {purchase.download_token && (
                            <div className="bg-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                              <div className="text-xs text-green-600 font-semibold uppercase mb-1">Downloads</div>
                              <div className="font-bold text-gray-900 text-xs sm:text-sm">{purchase.download_token.accessed_count} times</div>
                            </div>
                          )}
                        </div>

                        {purchase.download_token && (
                          <a
                            href={`/api/download/${purchase.download_token.token}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold text-sm sm:text-base w-full sm:w-auto"
                          >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download Bundle
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Info Box */}
        {!searched && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 animate-in">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Info className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              How it works
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <span className="pt-1">Enter the email address you used to make your purchase</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <span className="pt-1">We&apos;ll show you all bundles purchased with that email</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <span className="pt-1">Click the download button to access your files anytime</span>
              </li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
