-- ============================================================================
-- MIGRATION: Add Multiple Images Support to Bundles
-- ============================================================================
-- This script migrates from single preview_image_url to multiple image_urls
-- Run this script on your Supabase SQL Editor
-- ============================================================================

-- Step 1: Add new image_urls column (JSONB array)
ALTER TABLE bundles ADD COLUMN IF NOT EXISTS image_urls JSONB DEFAULT '[]'::jsonb;

-- Step 2: Migrate existing preview_image_url data to image_urls array
-- This converts the single preview image to the first element of the array
UPDATE bundles
SET image_urls =
  CASE
    WHEN preview_image_url IS NOT NULL AND preview_image_url != ''
    THEN jsonb_build_array(preview_image_url)
    ELSE '[]'::jsonb
  END
WHERE image_urls = '[]'::jsonb OR image_urls IS NULL;

-- Step 3: Create index for better query performance on image_urls
CREATE INDEX IF NOT EXISTS idx_bundles_image_urls ON bundles USING GIN (image_urls);

-- Step 4: Add comment to document the column
COMMENT ON COLUMN bundles.image_urls IS 'Array of image URLs. First image is used as preview/thumbnail.';
COMMENT ON COLUMN bundles.preview_image_url IS 'DEPRECATED: Use image_urls array instead. Kept for backward compatibility.';

-- Step 5: Verify migration (optional - run separately to check results)
-- SELECT
--   id,
--   title,
--   preview_image_url,
--   image_urls,
--   jsonb_array_length(image_urls) as image_count_from_urls
-- FROM bundles
-- LIMIT 10;

-- ============================================================================
-- ROLLBACK INSTRUCTIONS (if needed)
-- ============================================================================
-- If you need to rollback this migration, run:
--
-- DROP INDEX IF EXISTS idx_bundles_image_urls;
-- ALTER TABLE bundles DROP COLUMN IF EXISTS image_urls;
--
-- Note: This will remove the image_urls column and all multi-image data
-- ============================================================================

-- ============================================================================
-- CLEANUP STEP (Run after frontend is fully updated)
-- ============================================================================
-- Once you've confirmed the new image_urls column is working properly
-- and you've updated all your frontend code, you can optionally remove
-- the old preview_image_url column:
--
-- ALTER TABLE bundles DROP COLUMN IF EXISTS preview_image_url;
--
-- WARNING: Only run this after ensuring all code uses image_urls!
-- ============================================================================
