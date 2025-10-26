'use client';

import { useState, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { X, Loader2, GripVertical, Upload } from 'lucide-react';
import Modal from '@/app/components/Modal';

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

interface BundleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle?: Bundle | null;
  onSuccess: () => void;
}

const CATEGORIES = [
  'Poster',
  'Digital Print',
  'Wall Art',
  'Sticker Design',
  'Card Design',
  'Pattern',
  'Illustration',
  'Stock Photo',
  'Social Media',
  'Other',
] as const;

export default function BundleFormModal({ isOpen, onClose, bundle, onSuccess }: BundleFormModalProps) {
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_count: '',
    pdf_url: '',
    category: '',
  });

  // Initialize form when bundle changes
  useEffect(() => {
    if (bundle) {
      setFormData({
        title: bundle.title,
        description: bundle.description || '',
        price: bundle.price.toString(),
        image_count: bundle.image_count.toString(),
        pdf_url: bundle.pdf_url,
        category: bundle.category || '',
      });
      setImageUrls(bundle.image_urls || []);
    } else {
      resetForm();
    }
  }, [bundle, isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate files
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not a valid image file`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      // Upload files one by one
      for (const file of validFiles) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed for ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      // Add uploaded URLs to existing image URLs
      setImageUrls(prev => [...prev, ...uploadedUrls]);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload some images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImageUrls = [...imageUrls];
    const draggedItem = newImageUrls[draggedIndex];
    newImageUrls.splice(draggedIndex, 1);
    newImageUrls.splice(index, 0, draggedItem);

    setImageUrls(newImageUrls);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleAddManualUrl = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setImageUrls(prev => [...prev, url.trim()]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const supabase = createClient();

    try {
      if (bundle) {
        // Update existing bundle
        const { error } = await supabase
          .from('bundles')
          .update({
            title: formData.title,
            description: formData.description || null,
            image_urls: imageUrls,
            price: parseFloat(formData.price),
            image_count: parseInt(formData.image_count),
            pdf_url: formData.pdf_url,
            category: formData.category || null,
          })
          .eq('id', bundle.id);

        if (error) throw error;
      } else {
        // Create new bundle
        const { error } = await supabase.from('bundles').insert({
          title: formData.title,
          description: formData.description || null,
          image_urls: imageUrls,
          price: parseFloat(formData.price),
          image_count: parseInt(formData.image_count),
          pdf_url: formData.pdf_url,
          category: formData.category || null,
        });

        if (error) throw error;
      }

      // Success - close modal and refresh list
      onSuccess();
      onClose();
    } catch (error: any) {
      alert('Error saving bundle: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setImageUrls([]);
    setFormData({
      title: '',
      description: '',
      price: '',
      image_count: '',
      pdf_url: '',
      category: '',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    if (!submitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={bundle ? 'Edit Bundle' : 'Add New Bundle'}
      size="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              disabled={submitting}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image Count *
            </label>
            <input
              type="number"
              value={formData.image_count}
              onChange={(e) => setFormData({ ...formData, image_count: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              disabled={submitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={16}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Images {imageUrls.length > 0 && <span className="text-blue-600">({imageUrls.length} images - First is preview)</span>}
          </label>

          {/* Image Grid with Drag-and-Drop */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  draggable={!submitting}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`relative group cursor-move border-2 rounded-lg overflow-hidden ${
                    index === 0 ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold">
                      Preview
                    </div>
                  )}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      disabled={submitting}
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      <X className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 text-white p-1 rounded">
                      <GripVertical className="w-4 h-4" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Buttons */}
          <div className="flex gap-3">
            <label className="flex-1 cursor-pointer">
              <div className={`px-4 py-3 border-2 border-dashed rounded-xl text-center transition-all ${
                uploading || submitting ? 'border-gray-300 bg-gray-50 cursor-not-allowed' : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
              }`}>
                {uploading ? (
                  <span className="text-gray-500 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="text-blue-600 font-medium flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" strokeWidth={2} />
                    Upload Images
                  </span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploading || submitting}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={handleAddManualUrl}
              disabled={submitting}
              className="px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add URL
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Tip: Drag images to reorder. First image will be used as preview thumbnail.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            PDF URL *
          </label>
          <input
            type="url"
            value={formData.pdf_url}
            onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
            disabled={submitting}
          />
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={submitting || uploading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {bundle ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              bundle ? 'Update Bundle' : 'Create Bundle'
            )}
          </button>
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
