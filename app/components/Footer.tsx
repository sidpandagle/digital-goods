import Link from 'next/link';
import Image from 'next/image';
import { Mail, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-20 md:mt-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-5" />
      <div className="absolute inset-0 bg-[hsl(var(--surface))] border-t border-[hsl(var(--border))]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 text-[hsl(var(--foreground))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="absolute inset-0 gradient-primary rounded-lg blur opacity-40" />
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md p-1.5">
                  <Image
                    src="/logo.png"
                    alt="Pixel Forge Studio"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <span className="font-bold text-lg sm:text-xl text-[hsl(var(--foreground))]">Pixel Forge Studio</span>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-xs sm:text-sm leading-relaxed max-w-xs">
              Premium AI-generated digital art bundles for creators and enthusiasts. Discover limitless creativity.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" strokeWidth={2} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" strokeWidth={2} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" strokeWidth={2} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4 sm:mb-5 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/browse-collections" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  Browse Collections
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  My Purchases
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4 sm:mb-5 text-base sm:text-lg">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4 sm:mb-5 text-base sm:text-lg">Support</h3>
            <ul className="space-y-2 sm:space-y-3 mb-4">
              <li>
                <Link href="/faq" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group text-sm sm:text-base">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -ml-5 sm:-ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" strokeWidth={2} />
                  Contact Us
                </Link>
              </li>
            </ul>
            <a
              href="mailto:support@pixelforgestudio.in"
              className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] transition-colors font-medium text-xs sm:text-sm break-all"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={2} />
              <span className="break-all">support@pixelforgestudio.in</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[hsl(var(--border))] pt-6 sm:pt-8 text-center">
          <p className="text-[hsl(var(--muted-foreground))] text-xs sm:text-sm">
            © 2025 Pixel Forge Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
