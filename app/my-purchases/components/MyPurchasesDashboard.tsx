'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserProfile } from '@/lib/auth/utils';
import { Download, ShoppingBag, Image as ImageIcon, Loader2 } from 'lucide-react';

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
    image_count: number;
    category: string | null;
  };
  download_token: {
    token: string;
    accessed_count: number;
    last_accessed_at: string | null;
  } | null;
}

interface MyPurchasesDashboardProps {
  user: any;
  profile: UserProfile;
}

export default function MyPurchasesDashboard({ user, profile }: MyPurchasesDashboardProps) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      // Get user's orders with bundle and download token info
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          bundle_id,
          amount,
          created_at,
          bundle:bundles(id, title, description, preview_image_url, image_count, category),
          download_tokens(token, accessed_count, last_accessed_at)
        `)
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match our interface
      const formattedPurchases = (data || []).map((order: any) => ({
        id: order.id,
        bundle_id: order.bundle_id,
        amount: order.amount,
        created_at: order.created_at,
        bundle: order.bundle,
        download_token: order.download_tokens?.[0] || null,
      }));

      setPurchases(formattedPurchases);
    } catch (error) {
      console.error('Error loading purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
                <p className="text-xs text-gray-600">Welcome back, {profile.full_name || profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" strokeWidth={2} />
                Browse Catalog
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
          </div>
        ) : purchases.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <ShoppingBag
                className="w-12 h-12 text-gray-400"
                strokeWidth={2}
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              No Purchases Yet
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              You haven&apos;t purchased any bundles yet. Browse our catalog to get started!
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
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Your Collection
              </h2>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                  {purchases.length}
                </span>
                bundle{purchases.length !== 1 ? 's' : ''} purchased
              </p>
            </div>

            {purchases.map((purchase, index) => (
              <div
                key={purchase.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="lg:flex">
                  {/* Preview Image */}
                  <div className="lg:w-1/3 relative overflow-hidden">
                    {purchase.bundle.preview_image_url ? (
                      <>
                        <img
                          src={purchase.bundle.preview_image_url}
                          alt={purchase.bundle.title}
                          className="w-full h-56 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-56 lg:h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center relative">
                        <ImageIcon
                          className="w-16 h-16 text-white/70 relative z-10"
                          strokeWidth={2}
                        />
                      </div>
                    )}
                    {purchase.bundle.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-bold rounded-full shadow-lg">
                          {purchase.bundle.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Purchase Details */}
                  <div className="lg:w-2/3 p-8">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {purchase.bundle.title}
                      </h3>
                      {purchase.bundle.description && (
                        <p className="text-gray-600 leading-relaxed">
                          {purchase.bundle.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-5 mb-6">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="text-xs text-blue-600 font-semibold uppercase mb-1">Purchased</div>
                        <div className="font-bold text-gray-900">{formatDate(purchase.created_at)}</div>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-4">
                        <div className="text-xs text-indigo-600 font-semibold uppercase mb-1">Images</div>
                        <div className="font-bold text-gray-900">{purchase.bundle.image_count} files</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4">
                        <div className="text-xs text-purple-600 font-semibold uppercase mb-1">Amount Paid</div>
                        <div className="font-bold text-gray-900">₹{purchase.amount / 100}</div>
                      </div>
                      {purchase.download_token && (
                        <div className="bg-green-50 rounded-xl p-4">
                          <div className="text-xs text-green-600 font-semibold uppercase mb-1">Downloads</div>
                          <div className="font-bold text-gray-900">{purchase.download_token.accessed_count} times</div>
                        </div>
                      )}
                    </div>

                    {purchase.download_token && (
                      <a
                        href={`/api/download/${purchase.download_token.token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold"
                      >
                        <Download className="w-6 h-6 mr-2 group-hover:animate-bounce" strokeWidth={2} />
                        Download Bundle
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
