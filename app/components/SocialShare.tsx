'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const link = shareLinks[platform];
    if (platform === 'email') {
      window.location.href = link;
    } else {
      window.open(link, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400 font-medium">Share:</span>

      <button
        onClick={() => handleShare('facebook')}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" strokeWidth={2} />
      </button>

      <button
        onClick={() => handleShare('twitter')}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-sky-500 border border-white/10 hover:border-sky-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" strokeWidth={2} />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-700 border border-white/10 hover:border-blue-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" strokeWidth={2} />
      </button>

      <button
        onClick={() => handleShare('email')}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-purple-600 border border-white/10 hover:border-purple-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group"
        aria-label="Share via Email"
      >
        <Mail className="w-4 h-4" strokeWidth={2} />
      </button>

      <button
        onClick={copyToClipboard}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group relative"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" strokeWidth={2} />
        ) : (
          <LinkIcon className="w-4 h-4" strokeWidth={2} />
        )}
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-xs rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
