'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ShoppingBag, LogOut } from 'lucide-react';

interface UserProfile {
  role: 'customer' | 'admin';
  full_name: string | null;
  email: string;
}

/**
 * Header Component
 *
 * Modern navigation bar with:
 * - Glass morphism effect
 * - Smooth animations and transitions
 * - Role-based navigation
 * - Responsive design
 */

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    // Add scroll effect for enhanced glass morphism
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkUser = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      const { data } = await supabase
        .from('user_profiles')
        .select('role, full_name, email')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.refresh();
  };

  return (
    <header
      className={`sticky top-0 z-50 glass border-b transition-all duration-300 ${
        scrolled
          ? 'border-[hsl(var(--border-medium))] shadow-lg'
          : 'border-[hsl(var(--border))]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section - Enhanced with gradient and animation */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 p-1.5">
                <Image
                  src="/logo.png"
                  alt="Pixel Forge Studio Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                Pixel Forge Studio
              </h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Premium Digital Art
              </p>
            </div>
          </Link>

          {/* Navigation Section - Modern button styling */}
          <nav className="flex items-center gap-3">
            {loading ? (
              <div className="w-32 h-10 shimmer rounded-[var(--radius-lg)]" />
            ) : user && profile ? (
              <>
                {/* Admin Link - Only visible to admins */}
                {profile.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="group px-4 py-2.5 text-[hsl(var(--secondary))] font-medium hover:text-[hsl(var(--secondary-hover))] transition-all duration-200 flex items-center gap-2 rounded-[var(--radius-md)] hover:bg-[hsl(var(--secondary-light))]"
                  >
                    <ShieldCheck className="w-4 h-4 transition-transform group-hover:scale-110" strokeWidth={2} />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}

                {/* My Purchases Button */}
                <Link
                  href="/my-purchases"
                  className="btn-primary flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={2} />
                  <span className="hidden sm:inline">My Purchases</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 text-[hsl(var(--foreground))] hover:text-[hsl(var(--muted-foreground))] font-medium transition-all duration-200 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))]"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <LogOut className="w-5 h-5 sm:hidden" strokeWidth={2} />
                </button>
              </>
            ) : (
              <>
                {/* Sign In Link */}
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-[hsl(var(--primary))] font-medium hover:text-[hsl(var(--primary-hover))] transition-all duration-200 rounded-[var(--radius-md)] hover:bg-[hsl(var(--primary-light))]"
                >
                  Sign In
                </Link>

                {/* Sign Up Button */}
                <Link
                  href="/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

