'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Loader2, Image as ImageIcon, Pencil, Trash2, FileText, Calendar, IndianRupee } from 'lucide-react';
import BundleFormModal from './BundleFormModal';

interface Bundle {
  id: string;
  title: string;
  description: string | null;
  preview_image_url: string | null;
  image_urls: string[];
  price: number;
  image_count: number;
  pdf_url: string;
  category: string | null;
  created_at: string;
}

export default function BundleManager() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);

  useEffect(() => {
    loadBundles();
  }, []);

  const loadBundles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bundles');
      const data = await response.json();
      setBundles(data.bundles || []);
    } catch (error) {
      console.error('Error loading bundles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bundle: Bundle) => {
    setEditingBundle(bundle);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingBundle(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBundle(null);
  };

  const handleModalSuccess = () => {
    loadBundles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bundle?')) return;

    const supabase = createClient();
    try {
      const { error } = await supabase.from('bundles').delete().eq('id', id);
      if (error) throw error;
      loadBundles();
    } catch (error: any) {
      alert('Error deleting bundle: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin h-12 w-12 text-[hsl(var(--primary))]" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bundle Form Modal */}
      <BundleFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        bundle={editingBundle}
        onSuccess={handleModalSuccess}
      />

      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Bundles</h2>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-gradient-to-r from-[hsl(var(--success))] to-[hsl(var(--success))]/90 text-white text-sm rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Add New Bundle
        </button>
      </div>

      {/* Bundles List */}
      <div className="grid gap-4">
        {bundles.length === 0 ? (
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-lg p-12 text-center border border-[hsl(var(--border))]">
            <p className="text-[hsl(var(--muted-foreground))]">No bundles yet. Add your first bundle to get started!</p>
          </div>
        ) : (
          bundles.map((bundle) => {
            const previewUrl = bundle.image_urls?.[0] || bundle.preview_image_url;
            return (
              <div
                key={bundle.id}
                className="bg-[hsl(var(--card))] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[hsl(var(--border))] hover:border-[hsl(var(--border-medium))]"
              >
                <div className="lg:flex">
                  {/* Preview Image */}
                  <div className="lg:w-1/4 relative overflow-hidden">
                    {previewUrl ? (
                      <div className="relative h-full">
                        <img
                          src={previewUrl}
                          alt={bundle.title}
                          className="w-full h-40 lg:h-full object-cover"
                        />
                        {bundle.image_urls && bundle.image_urls.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-[hsl(var(--foreground))]/70 text-[hsl(var(--background))] text-xs px-2 py-1 rounded-full font-semibold">
                            +{bundle.image_urls.length - 1} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-40 lg:h-full bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))] flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-white/70" strokeWidth={2} />
                      </div>
                    )}
                  </div>

                  {/* Bundle Details */}
                  <div className="lg:w-3/4 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-1">{bundle.title}</h3>
                        {bundle.description && (
                          <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 whitespace-pre-line mb-2">
                            {bundle.description}
                          </p>
                        )}
                      </div>
                      {bundle.category && (
                        <span className="px-2.5 py-0.5 bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-xs font-bold rounded-full border border-[hsl(var(--primary))]/20 flex-shrink-0 ml-2">
                          {bundle.category}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                      <div className="bg-[hsl(var(--primary-light))] border border-[hsl(var(--primary))]/20 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 text-xs text-[hsl(var(--primary))] font-semibold uppercase mb-0.5">
                          <IndianRupee className="w-3 h-3" strokeWidth={2} />
                          Price
                        </div>
                        <div className="font-bold text-[hsl(var(--foreground))]">₹{bundle.price}</div>
                      </div>
                      <div className="bg-[hsl(var(--secondary-light))] border border-[hsl(var(--secondary))]/20 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 text-xs text-[hsl(var(--secondary))] font-semibold uppercase mb-0.5">
                          <ImageIcon className="w-3 h-3" strokeWidth={2} />
                          Images
                        </div>
                        <div className="font-bold text-[hsl(var(--foreground))]">{bundle.image_count}</div>
                      </div>
                      <div className="bg-[hsl(var(--accent-light))] border border-[hsl(var(--accent))]/20 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 text-xs text-[hsl(var(--accent))] font-semibold uppercase mb-0.5">
                          <ImageIcon className="w-3 h-3" strokeWidth={2} />
                          Gallery
                        </div>
                        <div className="font-bold text-[hsl(var(--foreground))]">{bundle.image_urls?.length || 0}</div>
                      </div>
                      <div className="bg-[hsl(var(--success-light))] border border-[hsl(var(--success))]/20 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 text-xs text-[hsl(var(--success))] font-semibold uppercase mb-0.5">
                          <FileText className="w-3 h-3" strokeWidth={2} />
                          PDF
                        </div>
                        <div className="font-bold text-[hsl(var(--foreground))] text-xs">
                          {bundle.pdf_url ? 'Available' : 'Missing'}
                        </div>
                      </div>
                      <div className="bg-[hsl(var(--info-light))] border border-[hsl(var(--info))]/20 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 text-xs text-[hsl(var(--info))] font-semibold uppercase mb-0.5">
                          <Calendar className="w-3 h-3" strokeWidth={2} />
                          Created
                        </div>
                        <div className="font-bold text-[hsl(var(--foreground))] text-xs">
                          {new Date(bundle.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    {/* Additional Info Row */}
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-xs text-[hsl(var(--muted-foreground))]">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">ID:</span>
                        <span className="font-mono">{bundle.id.slice(0, 8)}...</span>
                      </div>
                      {bundle.pdf_url && (
                        <a
                          href={bundle.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[hsl(var(--primary))] hover:underline"
                        >
                          <FileText className="w-3 h-3" strokeWidth={2} />
                          View PDF
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(bundle)}
                        className="px-4 py-1.5 bg-[hsl(var(--primary))] text-white text-sm rounded-lg hover:bg-[hsl(var(--primary-hover))] transition-colors font-semibold flex items-center gap-1.5"
                      >
                        <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bundle.id)}
                        className="px-4 py-1.5 bg-[hsl(var(--error))] text-white text-sm rounded-lg hover:opacity-90 transition-opacity font-semibold flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
