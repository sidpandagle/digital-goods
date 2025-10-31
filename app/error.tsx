'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import { Home, RefreshCw, Mail, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

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
              <div className="absolute inset-0 bg-[hsl(var(--destructive))]/20 rounded-full blur-3xl animate-pulse-slow" />
              <div className="relative w-32 h-32 rounded-full bg-[hsl(var(--surface))] border-2 border-[hsl(var(--border))] flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-[hsl(var(--destructive))]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Error Code */}
            <div className="mb-6">
              <h1 className="text-8xl sm:text-9xl font-bold text-gradient mb-2">
                500
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))] text-sm font-medium">
                Internal Server Error
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
              Something went wrong
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto mb-10">
              We're experiencing technical difficulties. Our team has been notified and is working on a fix.
              Please try again in a moment.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={reset}
                className="btn-primary flex items-center gap-2 px-8"
              >
                <RefreshCw className="w-5 h-5" strokeWidth={2} />
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] font-medium hover:bg-[hsl(var(--muted))] transition-all duration-200 flex items-center gap-2"
              >
                <Home className="w-5 h-5" strokeWidth={2} />
                Back to Home
              </Link>
            </div>

            {/* Error Details Card (for development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="card-elevated p-6 max-w-2xl mx-auto mb-8 text-left">
                <h3 className="font-semibold text-[hsl(var(--destructive))] mb-3 text-lg">
                  Error Details (Development Only)
                </h3>
                <div className="bg-[hsl(var(--background))] rounded-[var(--radius-md)] p-4 border border-[hsl(var(--border))]">
                  <p className="font-mono text-sm text-[hsl(var(--foreground))] break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="font-mono text-xs text-[hsl(var(--muted-foreground))] mt-2">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Support Card */}
            <div className="card-elevated p-8 max-w-2xl mx-auto bg-[hsl(var(--primary-light))] border-[hsl(var(--primary))]/20">
              <Mail className="w-12 h-12 text-[hsl(var(--primary))] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 text-xl">
                Need Help?
              </h3>
              <p className="text-[hsl(var(--muted-foreground))] mb-6">
                If this problem persists, please contact our support team.
                We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn-primary px-8"
                >
                  Contact Support
                </Link>
                <a
                  href="mailto:support@pixelforgestudio.in"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] transition-colors font-medium"
                >
                  support@pixelforgestudio.in
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
