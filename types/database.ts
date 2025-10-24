export interface Bundle {
  id: string;
  title: string;
  description: string | null;
  preview_image_url: string | null; // DEPRECATED: Use image_urls instead
  image_urls: string[]; // Array of image URLs, first is preview
  price: number;
  image_count: number;
  pdf_url: string; // Single PDF file URL for the bundle
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  bundle_id: string | null;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  email: string;
  created_at: string;
  updated_at: string;
}

export interface DownloadToken {
  id: string;
  user_id: string | null;
  order_id: string;
  bundle_id: string;
  token: string;
  pdf_url: string | null; // URL to the PDF file (copied from bundle)
  email: string;
  expires_at: string | null;
  accessed_count: number;
  last_accessed_at: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      bundles: {
        Row: Bundle;
        Insert: Omit<Bundle, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Bundle, 'id' | 'created_at' | 'updated_at'>>;
      };
      user_profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>;
      };
      download_tokens: {
        Row: DownloadToken;
        Insert: Omit<DownloadToken, 'id' | 'created_at'>;
        Update: Partial<Omit<DownloadToken, 'id' | 'created_at'>>;
      };
    };
  };
}
