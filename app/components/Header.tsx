'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ShoppingBag,
  LogOut,
  ChevronDown,
  User,
  FileText,
  Mail,
  HelpCircle,
  Info,
  Package,
  Menu,
  X,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

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
 * - Responsive design with mobile menu
 * - Dropdown menus for user and resources
 */

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkUser();

    // Add scroll effect for enhanced glass morphism
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target as Node)) {
        setResourcesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    setUserDropdownOpen(false);
    router.refresh();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 glass border-b transition-all duration-300 ${
        scrolled
          ? 'border-[hsl(var(--border-medium))] shadow-lg'
          : 'border-[hsl(var(--border))]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section - Enhanced with gradient and animation */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 p-1.5">
                <Image
                  src="/logo.png"
                  alt="Pixel Forge Studio Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-gradient">
                Pixel Forge Studio
              </h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))] hidden lg:block">
                Premium Digital Art
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center px-8">
            <Link
              href="/browse-collections"
              className="px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-200 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))]"
            >
              Browse Collections
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-200 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))]"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-200 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))]"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-200 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))]"
            >
              Contact
            </Link>

            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesDropdownRef}>
              <button
                onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
                className="px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-200 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))] flex items-center gap-1"
              >
                Resources
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    resourcesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 glass border border-[hsl(var(--border))] rounded-[var(--radius-lg)] shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2">
                    <Link
                      href="/privacy-policy"
                      onClick={() => setResourcesDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors duration-150"
                    >
                      <FileText className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms-of-service"
                      onClick={() => setResourcesDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors duration-150"
                    >
                      <FileText className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                      Terms of Service
                    </Link>
                    <Link
                      href="/refund-policy"
                      onClick={() => setResourcesDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors duration-150"
                    >
                      <FileText className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                      Refund Policy
                    </Link>
                    <Link
                      href="/cookie-policy"
                      onClick={() => setResourcesDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors duration-150"
                    >
                      <FileText className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle - Always visible */}
            <ThemeToggle />

            {loading ? (
              <div className="w-24 sm:w-32 h-10 shimmer rounded-[var(--radius-lg)]" />
            ) : user && profile ? (
              <>
                {/* User Dropdown */}
                <div className="relative hidden lg:block" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))] transition-all duration-200 border border-[hsl(var(--border))]"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium text-[hsl(var(--foreground))] max-w-[120px] truncate">
                      {profile.full_name || 'Account'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        userDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 glass border border-[hsl(var(--border))] rounded-[var(--radius-lg)] shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-[hsl(var(--border))]">
                        <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                          {profile.full_name || 'User'}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                          {profile.email}
                        </p>
                      </div>
                      <div className="py-2">
                        {profile.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary-light))] transition-colors duration-150"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          href="/my-purchases"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors duration-150"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          My Purchases
                        </Link>
                        <Link
                          href="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors duration-150"
                        >
                          <Package className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </div>
                      <div className="border-t border-[hsl(var(--border))] py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[hsl(var(--error))] hover:bg-[hsl(var(--error-light))] transition-colors duration-150"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile User Icon */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))] transition-colors duration-200"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" strokeWidth={2} />
                  ) : (
                    <Menu className="w-6 h-6" strokeWidth={2} />
                  )}
                </button>
              </>
            ) : (
              <>
                {/* Sign In Link */}
                <Link
                  href="/login"
                  className="px-3 sm:px-5 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-200 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))]"
                >
                  Sign In
                </Link>

                {/* Sign Up Button */}
                <Link
                  href="/signup"
                  className="btn-primary text-sm px-4 sm:px-6 py-2"
                >
                  Sign Up
                </Link>

                {/* Mobile Menu Toggle for non-authenticated users */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-[var(--radius-md)] hover:bg-[hsl(var(--muted))] transition-colors duration-200"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" strokeWidth={2} />
                  ) : (
                    <Menu className="w-6 h-6" strokeWidth={2} />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[hsl(var(--border))] py-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1">
              <Link
                href="/browse-collections"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
              >
                <Package className="w-4 h-4" />
                Browse Collections
              </Link>
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link
                href="/faq"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
              >
                <HelpCircle className="w-4 h-4" />
                FAQ
              </Link>
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>

              {user && profile && (
                <>
                  <div className="h-px bg-[hsl(var(--border))] my-2" />
                  {profile.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary-light))] rounded-[var(--radius-md)] transition-colors duration-150"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/my-purchases"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    My Purchases
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
                  >
                    <Package className="w-4 h-4" />
                    Dashboard
                  </Link>
                </>
              )}

              <div className="h-px bg-[hsl(var(--border))] my-2" />

              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2">
                  Resources
                </p>
              </div>

              <Link
                href="/privacy-policy"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
              >
                <FileText className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
              >
                <FileText className="w-4 h-4" />
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
              >
                <FileText className="w-4 h-4" />
                Refund Policy
              </Link>
              <Link
                href="/cookie-policy"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-[var(--radius-md)] transition-colors duration-150"
              >
                <FileText className="w-4 h-4" />
                Cookie Policy
              </Link>

              {user && profile && (
                <>
                  <div className="h-px bg-[hsl(var(--border))] my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-[hsl(var(--error))] hover:bg-[hsl(var(--error-light))] rounded-[var(--radius-md)] transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

