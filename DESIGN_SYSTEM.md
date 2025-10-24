# 🎨 Pixel Forge Studio - Modern Design System (2025)

## Overview

This document outlines the comprehensive design system for the Pixel Forge Studio platform, featuring a clean, elegant, and modern aesthetic aligned with 2025 UI/UX trends.

---

## 🎯 Design Philosophy

### Core Principles
1. **Minimalism** - Clean layouts with purposeful whitespace
2. **Fluidity** - Smooth transitions and spring animations
3. **Depth** - Layered effects using glass morphism and subtle shadows
4. **Accessibility** - High contrast, readable typography, keyboard navigation
5. **Responsiveness** - Mobile-first, adaptive layouts

### Visual Direction
- **Style Keywords**: Modern, clean, elegant, glassy, gradient, vibrant, soft shadows, balanced whitespace
- **Inspiration**: iOS/macOS design language, Vercel, Linear, Stripe

---

## 🎨 Color System

### Light Theme
```css
/* Primary Colors */
--primary: 221.2 83.2% 53.3%          /* Vibrant Blue #3b82f6 */
--secondary: 262.1 83.3% 57.8%        /* Sophisticated Purple #8b5cf6 */
--accent: 280 100% 70%                /* Energetic Magenta */

/* Neutral Tones */
--background: 0 0% 100%               /* Pure White */
--foreground: 240 10% 3.9%            /* Near Black */
--surface: 0 0% 98%                   /* Off White */
--muted: 240 4.8% 95.9%               /* Light Gray */

/* Semantic Colors */
--success: 142 76% 36%                /* Green */
--warning: 38 92% 50%                 /* Amber */
--error: 0 84% 60%                    /* Red */
--info: 199 89% 48%                   /* Cyan */
```

### Dark Theme
```css
/* Primary Colors */
--primary: 221.2 83.2% 58%            /* Brighter Blue for dark bg */
--secondary: 262.1 83.3% 62%          /* Brighter Purple */

/* Neutral Tones */
--background: 240 10% 3.9%            /* Rich Dark */
--foreground: 0 0% 98%                /* Off White Text */
--surface: 240 10% 6%                 /* Elevated Dark */
--muted: 240 3.7% 15.9%               /* Dark Gray */
```

### Gradient Palette
- **Primary**: Blue → Indigo → Purple (`#3b82f6` → `#6366f1` → `#8b5cf6`)
- **Secondary**: Pink → Purple (`#ec4899` → `#8b5cf6`)
- **Warm**: Amber → Red (`#f59e0b` → `#ef4444`)
- **Cool**: Cyan → Blue (`#06b6d4` → `#3b82f6`)
- **Mesh**: Radial overlays for atmospheric backgrounds

---

## ✍️ Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue',
             sans-serif;
```

### Type Scale
| Size | Usage | Example |
|------|-------|---------|
| `text-7xl` (72px) | Hero titles | Main landing headlines |
| `text-5xl` (48px) | Page titles | Section headers |
| `text-4xl` (36px) | Section titles | Card headers |
| `text-2xl` (24px) | Subsections | Card content |
| `text-xl` (20px) | Large body | Hero descriptions |
| `text-base` (16px) | Body text | Paragraphs |
| `text-sm` (14px) | Small text | Metadata, captions |
| `text-xs` (12px) | Micro text | Labels, badges |

### Font Weights
- `font-normal` (400) - Body text
- `font-medium` (500) - Emphasized text
- `font-semibold` (600) - Subheadings
- `font-bold` (700) - Headings

### Advanced Features
```css
font-feature-settings: 'cv11', 'ss01';  /* Inter stylistic sets */
font-variation-settings: 'opsz' 32;     /* Optical sizing */
```

---

## 📐 Spacing System

### Scale (Tailwind Default)
```
0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px),
6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px),
20 (80px), 24 (96px)
```

### Common Patterns
- **Card padding**: `p-6` (24px)
- **Section spacing**: `py-12` or `py-16` (48-64px)
- **Element gaps**: `gap-4` to `gap-8` (16-32px)
- **Container max-width**: `max-w-7xl` (1280px)

---

## 🔲 Border Radius

### Radius Variables
```css
--radius-sm: 0.5rem   (8px)   /* Small elements */
--radius-md: 0.75rem  (12px)  /* Buttons, inputs */
--radius-lg: 1rem     (16px)  /* Cards */
--radius-xl: 1.5rem   (24px)  /* Large cards */
--radius-2xl: 2rem    (32px)  /* Hero sections */
--radius-full: 9999px         /* Pills, circles */
```

### Usage
- Buttons: `rounded-[var(--radius-lg)]`
- Cards: `rounded-[var(--radius-xl)]`
- Input fields: `rounded-[var(--radius-md)]`
- Badges: `rounded-full`

---

## 🌑 Shadows & Elevation

### Shadow System
```css
--shadow-xs: 0 1px 2px rgb(0 0 0 / 0.05)                    /* Subtle */
--shadow-sm: 0 1px 3px rgb(0 0 0 / 0.1)                     /* Small */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)                /* Medium */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)              /* Large */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)              /* Extra large */
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)           /* Maximum */
--shadow-colored: 0 10px 40px -10px rgba(59, 130, 246, 0.3) /* Colored glow */
```

### Elevation Layers
1. **Base** (0) - Page background
2. **Surface** (1) - Cards, surfaces (`shadow-sm`)
3. **Raised** (2) - Elevated cards (`shadow-md`)
4. **Overlay** (3) - Modals, dropdowns (`shadow-lg`)
5. **Modal** (4) - High-priority overlays (`shadow-2xl`)

---

## ✨ Effects & Visual Elements

### Glass Morphism
```css
.glass {
  background: rgba(255, 255, 255, 0.75);  /* Light theme */
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
}
```

**Usage**: Navigation bars, modal overlays, floating elements

### Gradient Utilities
- `.gradient-primary` - Blue → Indigo → Purple
- `.gradient-secondary` - Pink → Purple
- `.text-gradient` - Gradient text effect
- `.gradient-mesh-bg` - Atmospheric background mesh

### Hover Effects
- `.hover-lift` - Translate Y + enhanced shadow
- `.hover-glow` - Glowing shadow on hover
- `.hover-gradient` - Gradient overlay on hover

---

## 🎬 Animation System

### Keyframe Animations
| Animation | Duration | Easing | Purpose |
|-----------|----------|--------|---------|
| `fadeIn` | 0.5s | ease-in | Entrance |
| `slideUp` | 0.6s | spring (cubic-bezier) | Element entrance |
| `slideDown` | 0.6s | spring | Dropdown animations |
| `scaleIn` | 0.5s | spring | Modal entrance |
| `float` | 3s | ease-in-out (infinite) | Decorative motion |
| `shimmer` | 2s | linear (infinite) | Loading skeletons |
| `gradientShift` | 15s | ease (infinite) | Animated backgrounds |

### Transition Classes
```css
.transition-smooth  /* 0.3s cubic-bezier(0.4, 0, 0.2, 1) */
.transition-spring  /* 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) */
```

### Animation Utilities
- `.animate-in` - Fade in
- `.animate-slide-up` - Slide up with bounce
- `.animate-scale` - Scale in
- `.animate-float` - Floating effect
- `.animate-pulse-slow` - Slow pulsing

### Staggered Animations
```jsx
style={{ animationDelay: `${index * 80}ms` }}
```

---

## 🧩 Component Patterns

### Buttons

#### Primary Button
```jsx
<button className="btn-primary">
  Click Me
</button>
```
**Features**: Gradient background, shadow on hover, slight lift

#### Secondary Button
```jsx
<button className="btn-secondary">
  Cancel
</button>
```
**Features**: Muted background, subtle hover state

#### Glass Button
```jsx
<button className="btn-glass">
  Transparent
</button>
```
**Features**: Glass morphism, transparent bg

### Cards

#### Standard Card
```jsx
<div className="card">
  <!-- Content -->
</div>
```
**Features**: Border, subtle shadow, hover lift

#### Elevated Card
```jsx
<div className="card-elevated">
  <!-- Content -->
</div>
```
**Features**: Enhanced shadow, pronounced hover

#### Glass Card
```jsx
<div className="glass-card">
  <!-- Content -->
</div>
```
**Features**: Glass effect, backdrop blur

### Input Fields
```jsx
<input className="input" placeholder="Enter text..." />
```
**Features**: Border, focus ring, smooth transitions

---

## 🎭 Component Examples

### Hero Section
```jsx
<div className="text-center">
  <h1 className="text-7xl font-bold text-gradient mb-6">
    Your Headline
  </h1>
  <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
    Your description
  </p>
</div>
```

### Feature Badge
```jsx
<div className="px-4 py-2 rounded-full bg-[hsl(var(--primary-light))]
                text-[hsl(var(--primary))] text-sm font-medium">
  New Feature
</div>
```

### Product Card
```jsx
<Link href="/product" className="card-elevated hover-lift group">
  <div className="aspect-video overflow-hidden">
    <img className="group-hover:scale-110 transition-all duration-700" />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-bold group-hover:text-[hsl(var(--primary))]">
      Product Name
    </h3>
  </div>
</Link>
```

---

## 🎨 Using Theme Colors

Always use HSL CSS variables for consistent theming:
```jsx
className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
```

---

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Responsive Patterns
```jsx
// Typography
className="text-5xl md:text-6xl lg:text-7xl"

// Layout
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Spacing
className="px-4 sm:px-6 lg:px-8"

// Visibility
className="hidden sm:inline"
```

---

## ♿ Accessibility

### Focus States
```css
*:focus-visible {
  outline: none;
  ring: 2px solid hsl(var(--ring));
  ring-offset: 2px;
}
```

### Color Contrast
- **Light theme**: 4.5:1 minimum for body text
- **Dark theme**: Enhanced contrast for readability
- **Interactive elements**: Clear hover/focus states

### Keyboard Navigation
- All interactive elements focusable
- Visible focus indicators
- Logical tab order

### Screen Reader Support
- Semantic HTML
- ARIA labels where needed
- Descriptive alt text

---

## 🛠️ Utility Classes Reference

### Layout
- `.container` - Max-width container
- `.grid` - CSS Grid
- `.flex` - Flexbox

### Glass Effects
- `.glass` - Standard glass morphism
- `.glass-strong` - Enhanced glass effect
- `.glass-card` - Glass card with hover

### Gradients
- `.gradient-primary`, `.gradient-secondary`
- `.gradient-warm`, `.gradient-cool`
- `.text-gradient` - Gradient text

### Animations
- `.animate-in`, `.animate-slide-up`
- `.animate-scale`, `.animate-float`
- `.shimmer` - Loading skeleton

### Interactions
- `.hover-lift` - Lift on hover
- `.hover-glow` - Glow on hover
- `.transition-smooth`, `.transition-spring`

---

## 📦 Component Library

### Pre-built Components
1. **Header** - Navigation with glass effect
2. **Hero** - Landing hero section
3. **ProductCard** - Bundle display card
4. **Footer** - Site footer

### Component Features
- Fully typed with TypeScript
- Responsive by default
- Accessibility built-in

---

## 🎯 Best Practices

### Do's ✅
- Use HSL color variables for consistency
- Apply utility classes for consistency
- Leverage pre-built components
- Add micro-interactions for delight
- Ensure keyboard navigation works

### Don'ts ❌
- Don't use hardcoded colors
- Avoid inline styles (use Tailwind classes)
- Don't skip accessibility attributes
- Avoid complex animations on mobile
- Don't override global styles carelessly

---

## 🚀 Usage Examples

### Creating a New Page
```jsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative">
      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh-bg opacity-40 pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Your content */}
        </main>

        <Footer />
      </div>
    </div>
  );
}
```

### Adding a CTA Section
```jsx
<section className="py-20 relative overflow-hidden">
  <div className="absolute inset-0 gradient-primary opacity-5" />

  <div className="max-w-3xl mx-auto text-center relative z-10">
    <h2 className="text-4xl font-bold text-gradient mb-6">
      Ready to Get Started?
    </h2>
    <p className="text-xl text-[hsl(var(--muted-foreground))] mb-8">
      Join thousands of creators today
    </p>
    <button className="btn-primary text-lg px-8 py-4">
      Get Started Free
    </button>
  </div>
</section>
```

---

## 📚 Resources

### Fonts
- **Inter** - Google Fonts (Variable font recommended)
  - Weights: 400, 500, 600, 700
  - Features: CV11, SS01

### Inspiration
- [Linear](https://linear.app) - Clean SaaS UI
- [Vercel](https://vercel.com) - Modern web design
- [Stripe](https://stripe.com) - Elegant gradients
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Tools
- [Realtime Colors](https://realtimecolors.com) - Color palette tester
- [Tailwind CSS](https://tailwindcss.com) - Utility framework
- [Radix Colors](https://www.radix-ui.com/colors) - Accessible color system

---

## 🔄 Changelog

### Version 1.0 (Current)
- ✅ Complete design system with light theme
- ✅ Glass morphism effects
- ✅ Comprehensive animation library
- ✅ Modern header with scroll effects
- ✅ Enhanced homepage design
- ✅ Responsive card components
- ✅ Elegant footer design

---

**Last Updated**: 2025
**Maintained By**: Pixel Forge Studio Team
**Framework**: Next.js 16 + Tailwind CSS 4
