'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Zap, Download, Copy, Info, ShoppingBag, Image as ImageIcon, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      // Redirect to home if no token
      router.push('/');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, router]);

  const downloadUrl = token ? `${window.location.origin}/api/download/${token}` : '';

  const copyToClipboard = () => {
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[hsl(var(--muted))] border-t-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--success))]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[hsl(var(--primary))]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[hsl(var(--secondary))]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <div className="bg-[hsl(var(--card))]/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 text-center border border-[hsl(var(--border))] animate-slide-up">
          {/* Success Icon with celebration animation */}
          <div className="mb-8 relative">
            <div className="mx-auto w-24 h-24 bg-linear-to-br from-[hsl(var(--success))] to-[hsl(var(--success))]/80 rounded-full flex items-center justify-center shadow-xl animate-in">
              <Check
                className="w-14 h-14 text-white"
                strokeWidth={3}
              />
            </div>
            {/* Celebration rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-[hsl(var(--success))]/50 animate-ping opacity-75"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center animation-delay-1000">
              <div className="w-32 h-32 rounded-full border-4 border-[hsl(var(--success))]/30 animate-ping opacity-50"></div>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-[hsl(var(--success))] to-[hsl(var(--success))]/80 bg-clip-text text-transparent">
              Payment Successful!
            </span>
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] text-xl mb-10">
            Thank you for your purchase. Your download is ready!
          </p>

          {/* Download Section */}
          <div className="bg-linear-to-br from-[hsl(var(--primary-light))] to-[hsl(var(--secondary-light))] border-2 border-[hsl(var(--primary))]/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Zap className="w-6 h-6 text-[hsl(var(--primary))]" strokeWidth={2} />
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
                Your Download Link
              </h2>
            </div>

            <div className="bg-[hsl(var(--surface))] rounded-xl p-5 mb-6 break-all text-sm text-[hsl(var(--muted-foreground))] font-mono border border-[hsl(var(--border))] shadow-inner">
              {downloadUrl}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-6 h-6 group-hover:animate-bounce" strokeWidth={2} />
                Download Now
              </a>

              <button
                onClick={copyToClipboard}
                className="group px-8 py-4 bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] rounded-xl hover:bg-[hsl(var(--muted))] border-2 border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:scale-105 transition-all duration-200 font-bold flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-6 h-6 text-[hsl(var(--success))]" strokeWidth={2} />
                    <span className="text-[hsl(var(--success))]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-6 h-6" strokeWidth={2} />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-linear-to-br from-[hsl(var(--warning-light))] to-[hsl(var(--warning-light))]/80 border-2 border-[hsl(var(--warning))]/30 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-3 text-lg">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--warning))] flex items-center justify-center">
                <Info className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              Important Information
            </h3>
            <ul className="text-[hsl(var(--muted-foreground))] space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[hsl(var(--warning))] mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span>Save this download link - it has been sent to your email</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[hsl(var(--warning))] mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span>The link is valid for secure access to your purchased content</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[hsl(var(--warning))] mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span>You can access your purchases anytime from your dashboard</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="group px-8 py-4 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] rounded-xl hover:opacity-90 hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={2} />
              View My Purchases
            </Link>
            <Link
              href="/"
              className="group px-8 py-4 bg-[hsl(var(--surface))] border-2 border-[hsl(var(--border))] text-[hsl(var(--foreground))] rounded-xl hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary))] hover:scale-105 transition-all duration-200 font-bold flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-5 h-5" strokeWidth={2} />
              Browse More Bundles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-[hsl(var(--muted-foreground))] bg-[hsl(var(--card))]/50 backdrop-blur-sm rounded-xl py-3 px-6 inline-block">
            Need help? Contact us at{' '}
            <a href="mailto:support@pixelforgestudio.in" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] font-semibold hover:underline">
              support@pixelforgestudio.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--primary))]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
