'use client';

import { useState, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { X, Loader2, GripVertical, Upload, Sparkles } from 'lucide-react';
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
  const [autofilling, setAutofilling] = useState(false);
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

  const handleAutofill = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a title first');
      return;
    }

    setAutofilling(true);
    try {
      const response = await fetch('/api/autofill-bundle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: formData.title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to autofill');
      }

      const result = await response.json();

      if (result.success && result.data) {
        setFormData({
          ...formData,
          description: result.data.description,
          price: result.data.price,
          image_count: result.data.image_count,
          category: result.data.category,
        });
      } else {
        throw new Error('Invalid response from autofill API');
      }
    } catch (error: any) {
      console.error('Error autofilling:', error);
      alert('Failed to autofill: ' + error.message);
    } finally {
      setAutofilling(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={bundle ? 'Edit Bundle' : 'Add New Bundle'}
      size="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5">
              Title *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="flex-1 px-3 py-2 border-2 border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all text-sm"
                required
                disabled={submitting || autofilling}
              />
              <button
                type="button"
                onClick={handleAutofill}
                disabled={submitting || autofilling || !formData.title.trim()}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 whitespace-nowrap"
              >
                {autofilling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI Filling...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    AI Autofill
                  </>
                )}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-[hsl(var(--muted-foreground))]">
              Enter a title and click AI Autofill to automatically generate description, price, image count, and category
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border-2 border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all text-sm"
              disabled={submitting || autofilling}
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
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5">
              Price (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border-2 border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all text-sm"
              required
              disabled={submitting || autofilling}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5">
              Image Count *
            </label>
            <input
              type="number"
              value={formData.image_count}
              onChange={(e) => setFormData({ ...formData, image_count: e.target.value })}
              className="w-full px-3 py-2 border-2 border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all text-sm"
              required
              disabled={submitting || autofilling}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={8}
            className="w-full px-3 py-2 border-2 border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all text-sm"
            disabled={submitting || autofilling}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5">
            Product Images {imageUrls.length > 0 && <span className="text-[hsl(var(--primary))]">({imageUrls.length} images - First is preview)</span>}
          </label>

          {/* Image Grid with Drag-and-Drop */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  draggable={!submitting}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`relative group cursor-move border-2 rounded-lg overflow-hidden ${
                    index === 0 ? 'border-[hsl(var(--primary))] ring-2 ring-[hsl(var(--primary))]/20' : 'border-[hsl(var(--border))]'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-[hsl(var(--primary))] text-white text-xs px-2 py-1 rounded font-bold">
                      Preview
                    </div>
                  )}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      disabled={submitting}
                      className="bg-[hsl(var(--error))] text-white p-1 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <X className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[hsl(var(--foreground))]/50 text-[hsl(var(--background))] p-1 rounded">
                      <GripVertical className="w-4 h-4" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Buttons */}
          <div className="flex gap-2">
            <label className="flex-1 cursor-pointer">
              <div className={`px-3 py-2 border-2 border-dashed rounded-lg text-center transition-all ${
                uploading || submitting
                  ? 'border-[hsl(var(--border))] bg-[hsl(var(--muted))] cursor-not-allowed'
                  : 'border-[hsl(var(--primary))]/30 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-light))]'
              }`}>
                {uploading ? (
                  <span className="text-[hsl(var(--muted-foreground))] text-sm flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="text-[hsl(var(--primary))] font-medium text-sm flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" strokeWidth={2} />
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
              className="px-3 py-2 border-2 border-dashed border-[hsl(var(--border))] rounded-lg hover:border-[hsl(var(--border-medium))] hover:bg-[hsl(var(--muted))] transition-all text-[hsl(var(--muted-foreground))] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add URL
            </button>
          </div>

          <p className="mt-1.5 text-xs text-[hsl(var(--muted-foreground))]">
            Tip: Drag images to reorder. First image will be used as preview thumbnail.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5">
            Google Drive URL *
          </label>
          <input
            type="url"
            value={formData.pdf_url}
            onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
            className="w-full px-3 py-2 border-2 border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all text-sm"
            required
            disabled={submitting}
          />
        </div>

        <div className="flex gap-3 pt-3 border-t border-[hsl(var(--border))]">
          <button
            type="submit"
            disabled={submitting || uploading}
            className="px-6 py-2.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
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
            className="px-6 py-2.5 bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] rounded-lg hover:bg-[hsl(var(--muted-hover))] transition-all duration-200 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
