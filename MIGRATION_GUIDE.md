# Migration Guide: Single Image → Multiple Images

This guide explains the migration from single `preview_image_url` to multiple `image_urls` array.

## Overview

The system has been updated to support multiple images per bundle instead of a single preview image. The first image in the array is automatically used as the preview/thumbnail throughout the application.

---

## 🚀 Quick Start

### Step 1: Run the Database Migration

1. Open your **Supabase SQL Editor**
2. Copy and paste the contents of `supabase/migration_add_image_urls.sql`
3. Execute the script

This will:
- Add the new `image_urls` column (JSONB array)
- Migrate existing `preview_image_url` data to `image_urls[0]`
- Create performance indexes
- Keep `preview_image_url` for backward compatibility

```sql
-- Quick verification query (run after migration)
SELECT
  id,
  title,
  preview_image_url,
  image_urls,
  jsonb_array_length(image_urls) as image_count_from_urls
FROM bundles
LIMIT 5;
```

---

## 📋 What Changed

### 1. Database Schema
- **New Column**: `image_urls` (JSONB array)
- **Old Column**: `preview_image_url` (TEXT) - kept for backward compatibility
- **Index**: GIN index on `image_urls` for performance

### 2. TypeScript Types
Updated `types/database.ts`:
```typescript
export interface Bundle {
  // ... other fields
  preview_image_url: string | null; // DEPRECATED
  image_urls: string[]; // NEW - Array of image URLs
  // ... other fields
}
```

### 3. Admin Panel (BundleManager)
**New Features**:
- ✅ Multiple file upload support
- ✅ Drag-and-drop image reordering
- ✅ Visual preview grid with thumbnails
- ✅ First image marked as "Preview"
- ✅ Individual image deletion
- ✅ Manual URL addition option
- ✅ Upload progress indicator

**How to Use**:
1. Click "Upload Images" to select multiple files
2. Drag images to reorder (first = preview)
3. Click X on any image to remove it
4. Use "Add URL" to manually add image URLs

### 4. Customer-Facing Pages

#### Home Page ([app/page.tsx](app/page.tsx))
- Displays first image from `image_urls` array
- Falls back to `preview_image_url` if no images in array
- No visual changes for end users

#### Bundle Detail Page ([app/bundle/[id]/page.tsx](app/bundle/[id]/page.tsx))
**New Features**:
- 🖼️ **Image Gallery** with carousel
- ⬅️➡️ **Navigation arrows** (for multiple images)
- 🎯 **Thumbnail strip** below main image
- 📊 **Image counter** (e.g., "2 / 5")
- 👆 **Click thumbnails** to change main image

#### Dashboard Page ([app/dashboard/page.tsx](app/dashboard/page.tsx))
- Displays first image from `image_urls` array
- Falls back to `preview_image_url` if needed
- No visual changes for end users

---

## 🔄 Backward Compatibility

The system maintains **full backward compatibility**:

1. **Existing Data**: Old bundles with only `preview_image_url` still work
2. **Fallback Logic**: Code checks `image_urls[0]` first, then falls back to `preview_image_url`
3. **Migration Script**: Automatically converts old data to new format

Example fallback pattern used throughout:
```typescript
const previewUrl = bundle.image_urls?.[0] || bundle.preview_image_url;
```

---

## 📝 Creating/Editing Bundles

### Adding a New Bundle with Images

1. Go to **Admin Panel** → **Bundles**
2. Click **"Add New Bundle"**
3. Fill in bundle details (title, price, category, etc.)
4. In the **Product Images** section:
   - Click **"Upload Images"** and select multiple files
   - Or click **"Add URL"** to paste image URLs
5. **Reorder images** by dragging (first image = preview)
6. Click **"Create Bundle"**

### Editing Existing Bundles

1. Click **"Edit"** on any bundle
2. Existing images will be loaded in the gallery
3. You can:
   - Add more images
   - Remove images (click X)
   - Reorder images (drag and drop)
4. Click **"Update Bundle"**

---

## 🎨 Image Gallery Features

### For Customers (Bundle Detail Page)

When viewing a bundle with multiple images:
- **Main Image Display**: Large preview of selected image
- **Left/Right Arrows**: Navigate through images
- **Thumbnail Strip**: Click any thumbnail to view
- **Image Counter**: Shows current position (e.g., "3 / 5")
- **Smooth Transitions**: Professional animations

### For Admins (Bundle Manager)

When managing bundles:
- **Grid View**: See all images at once
- **Preview Badge**: First image clearly marked
- **Drag-to-Reorder**: Intuitive drag-and-drop
- **Multi-Upload**: Upload multiple files at once
- **Visual Feedback**: Selected images highlighted

---

## ⚠️ Important Notes

### Image Order Matters
The **first image** in the `image_urls` array is used as:
- Thumbnail on home page
- Preview in bundle listings
- First image in gallery
- Primary bundle representation

Always ensure the best/most representative image is first!

### File Size Limits
- Maximum file size: **5MB per image**
- Supported formats: All standard image formats (JPG, PNG, WebP, etc.)
- Validation happens before upload

### Browser Support
Image gallery features work in all modern browsers:
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

---

## 🗑️ Cleanup (Optional)

Once you've confirmed everything works and all bundles have been updated to use `image_urls`, you can optionally remove the deprecated `preview_image_url` column:

**⚠️ WARNING**: Only do this after thorough testing!

```sql
-- Remove the old preview_image_url column
ALTER TABLE bundles DROP COLUMN IF EXISTS preview_image_url;

-- Verify it's gone
\d bundles
```

**Recommendation**: Wait at least 1-2 weeks before removing the old column to ensure no issues arise.

---

## 🐛 Troubleshooting

### Issue: Images not showing after migration
**Solution**: Run the verification query to check if data was migrated:
```sql
SELECT id, title, image_urls FROM bundles;
```

### Issue: Cannot upload multiple images
**Solution**:
1. Check browser console for errors
2. Verify file sizes are under 5MB
3. Ensure ImageKit API keys are configured

### Issue: Old bundles showing no images
**Solution**: The migration script should handle this automatically. Check if the bundle has either:
- Values in `image_urls` array
- Value in `preview_image_url` field

### Issue: Gallery not working on bundle detail page
**Solution**:
1. Check browser console for JavaScript errors
2. Verify bundle has multiple images in `image_urls`
3. Clear browser cache and reload

---

## 📊 Testing Checklist

After migration, verify:

- [ ] SQL migration script executed successfully
- [ ] Existing bundles display correctly on home page
- [ ] Bundle detail pages show image gallery
- [ ] Admin can upload multiple images
- [ ] Admin can reorder images via drag-and-drop
- [ ] First image is used as preview everywhere
- [ ] Purchase page shows correct images
- [ ] Dashboard shows correct purchase images
- [ ] Mobile view works correctly
- [ ] Image navigation (arrows) works in gallery
- [ ] Thumbnail clicking works in gallery

---

## 📞 Support

If you encounter any issues during migration:

1. Check this guide thoroughly
2. Review the SQL migration script
3. Check browser console for errors
4. Verify Supabase connection and permissions
5. Test with a new bundle first before editing existing ones

---

## 🎉 Success!

You've successfully migrated to the multi-image system! Your bundles can now showcase multiple images, providing a better experience for your customers.

**Next Steps**:
1. Add more images to existing bundles
2. Reorder images to put the best ones first
3. Create new bundles with multiple preview images
4. Monitor customer engagement with the new gallery feature
