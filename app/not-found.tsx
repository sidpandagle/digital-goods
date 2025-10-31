'use client';

import Link from 'next/link';
import Header from './components/Header';
import { Home, Search, ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 gradient-mesh-bg opacity-40 pointer-events-none" />
      <div className="fixed inset-0 bg-[hsl(var(--background))] opacity-90 pointer-events-none" />

      {/* Animated gradient orbs for depth */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-96 h-96 bg-[hsl(var(--secondary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        <Header />

        {/* Error Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center animate-slide-up">
            {/* Error Icon */}
            <div className="relative inline-flex mb-8">
              <div className="absolute inset-0 bg-[hsl(var(--primary))]/20 rounded-full blur-3xl animate-pulse-slow" />
              <div className="relative w-32 h-32 rounded-full bg-[hsl(var(--surface))] border-2 border-[hsl(var(--border))] flex items-center justify-center">
                <FileQuestion className="w-16 h-16 text-[hsl(var(--primary))]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Error Code */}
            <div className="mb-6">
              <h1 className="text-8xl sm:text-9xl font-bold text-gradient mb-2">
                404
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-sm font-medium">
                Page Not Found
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
              Oops! Page not found
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto mb-10">
              The page you're looking for doesn't exist or has been moved.
              Don't worry, let's get you back on track.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/"
                className="btn-primary flex items-center gap-2 px-8"
              >
                <Home className="w-5 h-5" strokeWidth={2} />
                Back to Home
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] font-medium hover:bg-[hsl(var(--muted))] transition-all duration-200 flex items-center gap-2"
              >
                <Search className="w-5 h-5" strokeWidth={2} />
                Visit FAQ
              </Link>
            </div>

            {/* Quick Links */}
            <div className="card-elevated p-8 max-w-2xl mx-auto">
              <h3 className="font-semibold text-[hsl(var(--foreground))] mb-6 text-lg">
                Popular Pages
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/"
                  className="p-4 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] transition-all group text-left"
                >
                  <h4 className="font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors mb-1">
                    Browse Bundles
                  </h4>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Explore our collection
                  </p>
                </Link>
                <Link
                  href="/my-purchases"
                  className="p-4 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] transition-all group text-left"
                >
                  <h4 className="font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors mb-1">
                    My Purchases
                  </h4>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    View your bundles
                  </p>
                </Link>
                <Link
                  href="/contact"
                  className="p-4 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] transition-all group text-left"
                >
                  <h4 className="font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors mb-1">
                    Contact Us
                  </h4>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Get help
                  </p>
                </Link>
                <Link
                  href="/faq"
                  className="p-4 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] transition-all group text-left"
                >
                  <h4 className="font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors mb-1">
                    FAQ
                  </h4>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Find answers
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
