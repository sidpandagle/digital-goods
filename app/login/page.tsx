'use client';

import { useState, useEffect, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get redirect URL from query params if present
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // If there's a redirect URL, use it
      if (redirectUrl) {
        router.push(redirectUrl);
        return;
      }

      // Otherwise, check user role and redirect accordingly
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin') {
        router.push('/admin');
      } else {
        // For regular users, check if they have any purchases
        const { count } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', data.user.id);

        // If user has no purchases, redirect to homepage
        // Otherwise, redirect to my-purchases
        if (count === 0) {
          router.push('/');
        } else {
          router.push('/my-purchases');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center shadow-xl mb-4 p-2">
            <Image
              src="/logo.png"
              alt="Pixel Forge Studio"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-[hsl(var(--error-light))] border-2 border-[hsl(var(--error))] text-[hsl(var(--error))] px-4 py-3 rounded-xl text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2} />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-[hsl(var(--background))] border-2 border-[hsl(var(--input-border))] text-[hsl(var(--foreground))] rounded-xl focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--primary))] transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[hsl(var(--background))] border-2 border-[hsl(var(--input-border))] text-[hsl(var(--foreground))] rounded-xl focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--primary))] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[hsl(var(--muted-foreground))]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[hsl(var(--primary))] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-[hsl(var(--muted-foreground))] text-sm hover:text-[hsl(var(--foreground))]">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-[hsl(var(--primary))]" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
