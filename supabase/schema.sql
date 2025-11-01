-- Drop existing triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_bundles_updated_at ON bundles;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

-- Drop existing functions
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop existing tables (in reverse dependency order)
DROP TABLE IF EXISTS download_tokens CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS bundles CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bundles table (product catalog)
CREATE TABLE bundles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_count INTEGER NOT NULL,
  pdf_url TEXT NOT NULL, -- Google Drive folder link containing bundle of digital prints
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table (purchase records)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  bundle_id UUID REFERENCES bundles(id) ON DELETE SET NULL,
  razorpay_order_id TEXT UNIQUE NOT NULL,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'created', -- created, paid, failed
  email TEXT NOT NULL, -- for guest purchases
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Download tokens table (secure file access)
CREATE TABLE download_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  bundle_id UUID REFERENCES bundles(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  pdf_url TEXT, -- Google Drive folder link (copied from bundle)
  email TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE, -- NULL for lifetime access
  accessed_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_download_tokens_user_id ON download_tokens(user_id);
CREATE INDEX idx_download_tokens_token ON download_tokens(token);
CREATE INDEX idx_download_tokens_email ON download_tokens(email);
CREATE INDEX idx_bundles_category ON bundles(category);

-- Row Level Security (RLS) policies
ALTER TABLE bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;

-- Bundles: Public read access
CREATE POLICY "Bundles are viewable by everyone"
  ON bundles FOR SELECT
  USING (true);

-- Bundles: Admin can insert, update, delete
CREATE POLICY "Admins can insert bundles"
  ON bundles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update bundles"
  ON bundles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete bundles"
  ON bundles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User profiles: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- CRITICAL: Allow trigger function to insert new user profiles
-- Without this policy, the handle_new_user() trigger will fail
-- even though it uses SECURITY DEFINER
CREATE POLICY "Enable insert for authenticated users during signup"
  ON user_profiles FOR INSERT
  WITH CHECK (true);

-- Orders: Users can view their own orders, admins can view all
-- Allow viewing orders by matching user_id OR email (for both authenticated and guest users)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (
    auth.uid() = user_id
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Orders: Allow anyone (authenticated or not) to create orders
-- This is critical for guest checkout functionality
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Orders: Allow updating orders (for payment status updates)
-- Can be updated by the order owner or admin
CREATE POLICY "Orders can be updated"
  ON orders FOR UPDATE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Download tokens: Users can view their own tokens by user_id or email
CREATE POLICY "Users can view own download tokens"
  ON download_tokens FOR SELECT
  USING (
    auth.uid() = user_id
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Download tokens: Allow anyone to create tokens (generated after successful payment)
-- This is needed for both authenticated and guest checkouts
CREATE POLICY "Anyone can create download tokens"
  ON download_tokens FOR INSERT
  WITH CHECK (true);

-- Download tokens: Allow updating token metadata (like access count)
CREATE POLICY "Tokens can be updated"
  ON download_tokens FOR UPDATE
  USING (true);

-- Function to create user profile on signup
-- SECURITY DEFINER allows the function to bypass RLS policies
-- Error handling ensures user creation doesn't fail silently
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert user profile with normalized email (lowercase)
  -- ON CONFLICT DO NOTHING prevents duplicate email errors
  INSERT INTO user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    LOWER(NEW.email), -- Normalize email to lowercase
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  )
  ON CONFLICT (email) DO UPDATE
  SET
    id = EXCLUDED.id,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    updated_at = NOW();

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE WARNING 'Error creating user profile for %: %', NEW.email, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_bundles_updated_at BEFORE UPDATE ON bundles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- Sample data for bundles table
-- This script adds sample bundles to the database

-- ============================================================================
-- ADMIN USER SETUP INSTRUCTIONS
-- ============================================================================
-- After running this schema, you need to create an admin user manually:
--
-- METHOD 1: Using Supabase Dashboard
-- 1. Go to Authentication > Users in Supabase Dashboard
-- 2. Add a new user with email and password
-- 3. After user is created, run this SQL in the SQL Editor:
--
--    UPDATE user_profiles
--    SET role = 'admin'
--    WHERE email = 'your-admin-email@example.com';
--
-- METHOD 2: Using SQL directly (after first signup)
-- 1. Sign up normally through your app
-- 2. Run this SQL in the SQL Editor:
--
--    UPDATE user_profiles
--    SET role = 'admin'
--    WHERE email = 'your-admin-email@example.com';
--
-- METHOD 3: Programmatic (for development only)
-- Create user via Supabase admin API with custom metadata:
--   metadata: { role: 'admin' }
--
-- ============================================================================

INSERT INTO bundles (title, description, preview_image_url, price, image_count, pdf_url, category) VALUES
(
  'Modern UI/UX Design Bundle',
  'A comprehensive collection of modern UI/UX design templates and components for web and mobile applications.',
  'https://example.com/previews/modern-ui-bundle.jpg',
  29.99,
  50,
  'https://example.com/pdfs/modern-ui-bundle.pdf',
  'UI/UX'
),
(
  'Marketing Graphics Pack',
  'Professional marketing graphics including social media templates, banners, and promotional materials.',
  'https://example.com/previews/marketing-graphics.jpg',
  19.99,
  75,
  'https://example.com/pdfs/marketing-graphics.pdf',
  'Marketing'
),
(
  'Logo Design Templates',
  'Versatile logo design templates suitable for various industries and business types.',
  'https://example.com/previews/logo-templates.jpg',
  24.99,
  100,
  'https://example.com/pdfs/logo-templates.pdf',
  'Branding'
),
(
  'Photography Presets Collection',
  'Professional photography presets for landscape, portrait, and product photography.',
  'https://example.com/previews/photo-presets.jpg',
  34.99,
  60,
  'https://example.com/pdfs/photo-presets.pdf',
  'Photography'
),
(
  'E-commerce Product Mockups',
  'High-quality product mockups for e-commerce websites and online stores.',
  'https://example.com/previews/product-mockups.jpg',
  39.99,
  120,
  'https://example.com/pdfs/product-mockups.pdf',
  'E-commerce'
),
(
  'Social Media Templates Bundle',
  'Complete social media templates for Instagram, Facebook, Twitter, and LinkedIn.',
  'https://example.com/previews/social-media-bundle.jpg',
  27.99,
  150,
  'https://example.com/pdfs/social-media-bundle.pdf',
  'Social Media'
),
(
  'Presentation Design Kit',
  'Professional presentation templates and design elements for business and creative projects.',
  'https://example.com/previews/presentation-kit.jpg',
  32.99,
  80,
  'https://example.com/pdfs/presentation-kit.pdf',
  'Presentation'
),
(
  'Icon Set Mega Pack',
  'Massive collection of icons in various styles for web and mobile applications.',
  'https://example.com/previews/icon-mega-pack.jpg',
  44.99,
  500,
  'https://example.com/pdfs/icon-mega-pack.pdf',
  'Icons'
),
(
  'Vintage Design Elements',
  'Curated collection of vintage and retro design elements, badges, and ornaments.',
  'https://example.com/previews/vintage-elements.jpg',
  22.99,
  90,
  'https://example.com/pdfs/vintage-elements.pdf',
  'Vintage'
),
(
  'Minimalist Web Templates',
  'Clean and minimalist web design templates for portfolios and landing pages.',
  'https://example.com/previews/minimalist-web.jpg',
  49.99,
  40,
  'https://example.com/pdfs/minimalist-web.pdf',
  'Web Design'
);
