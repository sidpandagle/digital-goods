import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pixel Forge Studio - Premium Digital Art Bundles",
  description: "Discover and purchase stunning AI-generated digital art bundles. High-quality collections for creatives, designers, and art enthusiasts.",
  keywords: ["AI art", "digital art", "art bundles", "AI-generated", "digital marketplace"],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Pixel Forge Studio - Premium Digital Art Bundles",
    description: "Discover and purchase stunning AI-generated digital art bundles.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
