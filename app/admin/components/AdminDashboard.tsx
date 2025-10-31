'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { UserProfile } from '@/lib/auth/utils';
import BundleManager from './BundleManager';
import Link from 'next/link';
import { ShieldCheck, Package, BarChart3, LogOut } from 'lucide-react';
import ThemeToggle from '@/app/components/ThemeToggle';

interface AdminDashboardProps {
  profile: UserProfile;
}

export default function AdminDashboard({ profile }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'bundles' | 'analytics'>('bundles');
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Decorative background gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[hsl(var(--card))]/80 border-b border-[hsl(var(--border))] shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Welcome, {profile.full_name || profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/"
                className="px-3 py-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] font-medium transition-colors"
              >
                View Store
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-gradient-to-r from-[hsl(var(--error))] to-[hsl(var(--error))]/90 text-white text-sm rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" strokeWidth={2} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10">
        <div className="bg-[hsl(var(--card))] rounded-lg shadow-sm p-1 inline-flex gap-1 border border-[hsl(var(--border))]">
          <button
            onClick={() => setActiveTab('bundles')}
            className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all ${
              activeTab === 'bundles'
                ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-md'
                : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Package className="w-4 h-4" strokeWidth={2} />
              Bundles
            </span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-md'
                : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" strokeWidth={2} />
              Analytics
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        {activeTab === 'bundles' ? (
          <BundleManager />
        ) : (
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-lg p-6 border border-[hsl(var(--border))]">
            <h2 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">Analytics Coming Soon</h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Sales analytics and revenue tracking will be available here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
