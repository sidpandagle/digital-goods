'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

/**
 * ThemeToggle Component
 *
 * Animated toggle button for switching between light and dark themes
 * Features smooth transitions and icon animations
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-[var(--radius-md)] bg-[hsl(var(--surface))] hover:bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center transition-all duration-300 hover:shadow-md group"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon (Light Mode) */}
      <Sun
        className={`absolute w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--warning))] transition-all duration-300 ${
          theme === 'light'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-0'
        }`}
        strokeWidth={2}
      />

      {/* Moon Icon (Dark Mode) */}
      <Moon
        className={`absolute w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--primary))] transition-all duration-300 ${
          theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-90 scale-0'
        }`}
        strokeWidth={2}
      />

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-[var(--radius-md)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10" />
    </button>
  );
}
