'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bundle } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Image as ImageIcon, Eye, ChevronRight, Search, Filter, X, SlidersHorizontal } from 'lucide-react';

export default function BrowseCollections() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [filteredBundles, setFilteredBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high' | 'name'>('newest');
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchBundles();
  }, []);

  useEffect(() => {
    filterAndSortBundles();
  }, [bundles, searchQuery, selectedCategory, sortBy]);

  const fetchBundles = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bundles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bundles:', error);
        return;
      }

      setBundles(data || []);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data?.map(bundle => bundle.category).filter(Boolean) as string[])
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching bundles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBundles = () => {
    let result = [...bundles];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        bundle =>
          bundle.title.toLowerCase().includes(query) ||
          bundle.description?.toLowerCase().includes(query) ||
          bundle.category?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(bundle => bundle.category === selectedCategory);
    }

    // Sort bundles
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredBundles(result);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('newest');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || sortBy !== 'newest';

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 gradient-mesh-bg opacity-40 pointer-events-none" />
      <div className="fixed inset-0 bg-[hsl(var(--background))] opacity-90 pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-96 h-96 bg-[hsl(var(--secondary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        <Header />

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
          <div className="text-center animate-slide-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Browse Collections
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              Explore our complete collection of premium AI-generated digital art bundles
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Search and Filter Bar */}
          <div className="mb-8 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all"
                />
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden btn-secondary flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full" />
                )}
              </button>

              {/* Desktop Filters */}
              <div className="hidden sm:flex gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all cursor-pointer min-w-[150px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all cursor-pointer min-w-[150px]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showFilters && (
              <div className="sm:hidden space-y-4 p-4 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-sm">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:bg-[hsl(var(--primary))]/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-sm">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="hover:bg-[hsl(var(--primary))]/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {sortBy !== 'newest' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-sm">
                    Sort: {sortBy}
                    <button
                      onClick={() => setSortBy('newest')}
                      className="hover:bg-[hsl(var(--primary))]/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">
              {loading ? (
                'Loading...'
              ) : (
                <>
                  Showing <span className="font-semibold text-[hsl(var(--foreground))]">{filteredBundles.length}</span> of{' '}
                  <span className="font-semibold text-[hsl(var(--foreground))]">{bundles.length}</span> collection{bundles.length !== 1 ? 's' : ''}
                </>
              )}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-elevated overflow-hidden animate-pulse">
                  <div className="aspect-video bg-[hsl(var(--muted))]" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-[hsl(var(--muted))] rounded" />
                    <div className="h-4 bg-[hsl(var(--muted))] rounded w-3/4" />
                    <div className="h-8 bg-[hsl(var(--muted))] rounded mt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredBundles.length === 0 && (
            <div className="text-center py-24 animate-in">
              <div className="relative inline-flex mb-8">
                <div className="absolute inset-0 bg-[hsl(var(--primary))]/20 rounded-full blur-2xl animate-pulse-slow" />
                <div className="relative w-28 h-28 rounded-full bg-[hsl(var(--surface))] border-2 border-[hsl(var(--border))] flex items-center justify-center">
                  <Filter className="w-14 h-14 text-[hsl(var(--muted-foreground))]" strokeWidth={2} />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                No collections found
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-md mx-auto mb-8">
                {hasActiveFilters
                  ? 'Try adjusting your filters or search query'
                  : 'Check back soon for amazing AI art collections!'}
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Bundles Grid */}
          {!loading && filteredBundles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredBundles.map((bundle, index) => (
                <Link
                  key={bundle.id}
                  href={`/bundle/${bundle.id}`}
                  className="group card-elevated overflow-hidden hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Preview Image */}
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

                  {/* Bundle Info */}
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
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
