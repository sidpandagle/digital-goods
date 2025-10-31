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
    image_urls: string[];
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
          bundle:bundles(id, title, description, image_urls, image_count, category),
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
      
      console.log('Fetched purchases:', formattedPurchases);
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
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[hsl(var(--surface))]/80 border-b border-[hsl(var(--border))] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
                  My Purchases
                </h1>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Welcome back, {profile.full_name || profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group px-5 py-2.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" strokeWidth={2} />
                Browse Catalog
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] font-medium transition-colors"
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
            <Loader2 className="animate-spin h-12 w-12 text-[hsl(var(--primary))]" />
          </div>
        ) : purchases.length === 0 ? (
          <div className="bg-[hsl(var(--surface))] rounded-2xl shadow-xl p-16 text-center border border-[hsl(var(--border))]">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center">
              <ShoppingBag
                className="w-12 h-12 text-[hsl(var(--muted-foreground))]"
                strokeWidth={2}
              />
            </div>
            <h3 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-3">
              No Purchases Yet
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 text-lg max-w-md mx-auto">
              You haven&apos;t purchased any bundles yet. Browse our catalog to get started!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold"
            >
              <ImageIcon className="w-5 h-5" strokeWidth={2} />
              Browse Bundles
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[hsl(var(--foreground))]">
                Your Collection
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] mt-1 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-sm font-semibold">
                  {purchases.length}
                </span>
                bundle{purchases.length !== 1 ? 's' : ''} purchased
              </p>
            </div>

            {purchases.map((purchase, index) => (
              <div
                key={purchase.id}
                className="bg-[hsl(var(--surface))] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[hsl(var(--border))] group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="lg:flex">
                  {/* Preview Image */}
                  <div className="lg:w-1/3 relative overflow-hidden">
                    {purchase.bundle.image_urls && purchase.bundle.image_urls.length > 0 ? (
                      <>
                        <img
                          src={purchase.bundle.image_urls[0]}
                          alt={purchase.bundle.title}
                          className="w-full h-56 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-56 lg:h-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center relative">
                        <ImageIcon
                          className="w-16 h-16 text-white/70 relative z-10"
                          strokeWidth={2}
                        />
                      </div>
                    )}
                    {purchase.bundle.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-[hsl(var(--surface))]/95 backdrop-blur-sm text-[hsl(var(--primary))] text-xs font-bold rounded-full shadow-lg">
                          {purchase.bundle.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Purchase Details */}
                  <div className="lg:w-2/3 p-8">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
                        {purchase.bundle.title}
                      </h3>
                      {/* {purchase.bundle.description && (
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed whitespace-break-spaces">
                          {purchase.bundle.description}
                        </p>
                      )} */}
                    </div>

                    <div className="grid grid-cols-2 gap-5 mb-6">
                      <div className="bg-[hsl(var(--primary-light))] rounded-xl p-4">
                        <div className="text-xs text-[hsl(var(--primary))] font-semibold uppercase mb-1">Purchased</div>
                        <div className="font-bold text-[hsl(var(--foreground))]">{formatDate(purchase.created_at)}</div>
                      </div>
                      <div className="bg-[hsl(var(--secondary-light))] rounded-xl p-4">
                        <div className="text-xs text-[hsl(var(--secondary))] font-semibold uppercase mb-1">Images</div>
                        <div className="font-bold text-[hsl(var(--foreground))]">{purchase.bundle.image_count} files</div>
                      </div>
                      <div className="bg-[hsl(var(--accent-light))] rounded-xl p-4">
                        <div className="text-xs text-[hsl(var(--accent))] font-semibold uppercase mb-1">Amount Paid</div>
                        <div className="font-bold text-[hsl(var(--foreground))]">₹{purchase.amount}</div>
                      </div>
                      {purchase.download_token && (
                        <div className="bg-[hsl(var(--success-light))] rounded-xl p-4">
                          <div className="text-xs text-[hsl(var(--success))] font-semibold uppercase mb-1">Downloads</div>
                          <div className="font-bold text-[hsl(var(--foreground))]">{purchase.download_token.accessed_count} times</div>
                        </div>
                      )}
                    </div>

                    {purchase.download_token && (
                      <a
                        href={`/api/download/${purchase.download_token.token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold"
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
