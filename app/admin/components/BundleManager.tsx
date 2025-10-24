'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Loader2, Image as ImageIcon, Pencil, Trash2 } from 'lucide-react';
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
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bundle Form Modal */}
      <BundleFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        bundle={editingBundle}
        onSuccess={handleModalSuccess}
      />

      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Bundles</h2>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
          Add New Bundle
        </button>
      </div>

      {/* Bundles List */}
      <div className="grid gap-6">
        {bundles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-100">
            <p className="text-gray-600 text-lg">No bundles yet. Add your first bundle to get started!</p>
          </div>
        ) : (
          bundles.map((bundle) => {
            const previewUrl = bundle.image_urls?.[0] || bundle.preview_image_url;
            return (
              <div
                key={bundle.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="lg:flex">
                  {/* Preview Image */}
                  <div className="lg:w-1/4 relative overflow-hidden">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt={bundle.title}
                          className="w-full h-48 lg:h-full object-cover"
                        />
                        {bundle.image_urls && bundle.image_urls.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            +{bundle.image_urls.length - 1} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-48 lg:h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-white/70" strokeWidth={2} />
                      </div>
                    )}
                  </div>

                  {/* Bundle Details */}
                  <div className="lg:w-3/4 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{bundle.title}</h3>
                        {bundle.description && (
                          <p className="text-gray-600">{bundle.description}</p>
                        )}
                      </div>
                      {bundle.category && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                          {bundle.category}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-xl p-3">
                        <div className="text-xs text-blue-600 font-semibold uppercase mb-1">Price</div>
                        <div className="font-bold text-gray-900">₹{bundle.price}</div>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-3">
                        <div className="text-xs text-indigo-600 font-semibold uppercase mb-1">Images</div>
                        <div className="font-bold text-gray-900">{bundle.image_count}</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-3">
                        <div className="text-xs text-purple-600 font-semibold uppercase mb-1">Gallery</div>
                        <div className="font-bold text-gray-900">{bundle.image_urls?.length || 0} photos</div>
                      </div>
                      <div className="bg-pink-50 rounded-xl p-3">
                        <div className="text-xs text-pink-600 font-semibold uppercase mb-1">Created</div>
                        <div className="font-bold text-gray-900 text-sm">
                          {new Date(bundle.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(bundle)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        <Pencil className="w-4 h-4" strokeWidth={2} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bundle.id)}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
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
