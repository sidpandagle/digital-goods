# 🧾 PRD / REQUIREMENT / PLAN

## 🪙 Project Title
**Pixel Forge Studio Store**  
Sell AI-generated digital poster bundles as downloadable PDFs with secure Google Drive delivery after purchase.

---

## 🎯 Vision
To build a lightweight, visually appealing platform where users can purchase and instantly access high-quality AI-generated art bundles (motivational, historical, abstract, fantasy, etc.).  
The focus is on simplicity, automation, and scalability — enabling creators to continuously upload new art and buyers to securely access their digital downloads for life.

---

## 🏗️ Tech Stack Overview

| Layer | Tech | Notes |
|-------|------|-------|
| Frontend | **Next.js 15**, **TailwindCSS**, **shadcn/ui** | Fast, SEO-friendly, modern design |
| Backend | **Supabase** (PostgreSQL, Auth, Storage, Edge Functions) | Handles authentication, user database, secure token validation |
| Payment | **Razorpay** | Integrated checkout flow, post-payment webhook triggers secure link creation |
| Hosting | **Vercel** | Auto-deploy from GitHub |
| File Delivery | **Google Drive API** | Files stored privately; token-based sharing via backend |
| Automation | **GitHub Actions** | Auto-update product catalog from Markdown or CSV |
| Email / Notification | **Resend** or **Supabase Functions** | Send receipt + access link post-purchase |

---

## 🧠 Core Flow (User Journey)

1. User visits website → views art catalog with thumbnails.  
2. Clicks on a **bundle** → sees details, preview images, and price.  
3. Clicks **Buy Now (Razorpay)** → payment processed.  
4. After successful payment:  
   - Backend triggers secure token generation (Supabase Edge Function).  
   - Token grants access to associated Google Drive PDF(s).  
   - User receives confirmation email + permanent download link.  
5. User can log in anytime to view/download previously purchased items.

---

## 🖼️ Product Catalog Format

Each catalog entry represents a **bundle of AI art (50–1000 images)** exported as PDF(s).

### 🎨 Catalog Template
| Preview | Title | Description | Google Drive Link | Price |
|----------|--------|--------------|------------------|--------|
| ![preview](preview-url) | Historical Legends Bundle | 100 Posters of Great Indian Leaders | [Access](https://drive.google.com/...) | ₹249 |
| ![preview](preview-url) | Space Dreams Bundle | 300 High-res AI Wallpapers | [Access](https://drive.google.com/...) | ₹499 |
| ![preview](preview-url) | Fantasy Realms Vol. 1 | 500 AI Fantasy Artworks | [Access](https://drive.google.com/...) | ₹799 |

---

## 🔒 Secure File Access Logic

1. **Private Storage:** All Drive files are restricted (not publicly shared).  
2. **Token-Based Sharing:** When a purchase is confirmed, backend:
   - Creates a one-time token for that user.  
   - Fetches the Google Drive file(s) via API.  
   - Generates a **user-specific share link** (stored in Supabase).  
3. **Lifetime Access:** Token does not expire unless revoked.  
4. **Access Dashboard:** Users can view all their purchased bundles and re-download anytime.

---

## 💳 Pricing Model

- Bundles priced based on volume & theme:
  - Small Bundle (≤100 images): ₹99–₹199  
  - Medium Bundle (≤500 images): ₹299–₹499  
  - Large Bundle (≤1000+ images): ₹599–₹999  
- Seasonal or category-wise discounts supported via Razorpay Coupons.

---

## ⚙️ Automation Plan

- Add new bundle → commit Markdown entry to `catalog.md`  
- GitHub Action triggers → updates Supabase DB with new bundles  
- Site auto-updates via rebuild on Vercel  
- Webhook from Razorpay → calls backend function to issue link  

---

## 📅 Roadmap & Milestones

**Note:** Focus on **core functionality first**, minimal UI. Extensive UI/UX improvements come last.

| Phase | Goal | ETA | Status |
|-------|------|-----|--------|
| Phase 1 | Initialize Next.js 15 project + setup Supabase & Razorpay | Week 1 | 🔄 In Progress |
| Phase 2 | Create database schema + core API routes | Week 1 | ☐ |
| Phase 3 | Implement payment flow + webhook handler | Week 2 | ☐ |
| Phase 4 | Integrate Google Drive API for secure file delivery | Week 2 | ☐ |
| Phase 5 | Build minimal UI (catalog list, payment, dashboard) | Week 3 | ☐ |
| Phase 6 | Test end-to-end purchase flow + Deploy MVP to Vercel | Week 3 | ☐ |
| Phase 7 | UI/UX enhancements + styling improvements | Week 4 | ☐ |
| Phase 8 | Launch with 10+ art bundles | Week 5 | ☐ |

---

## ✅ Task Checklist

### Backend
- [ ] Setup Supabase Project + Tables (`users`, `orders`, `bundles`)
- [ ] Create Razorpay webhook handler
- [ ] Integrate Google Drive API for file fetch & tokenized links
- [ ] Implement secure file delivery route `/api/download/:token`
- [ ] Create lifetime access validation function

### Frontend
- [ ] Build **minimal** home/catalog pages (basic list, no fancy styling)
- [ ] Simple bundle detail page with Razorpay payment button
- [ ] Basic dashboard: list purchased bundles + download links
- [ ] Admin panel for uploading bundle metadata (later phase)

### Automation / DevOps
- [ ] Setup GitHub Action to auto-update catalog
- [ ] Configure Supabase Edge Function for webhook
- [ ] Setup deployment pipeline to Vercel

### Marketing / Business
- [ ] Prepare 10 demo bundles for launch
- [ ] Create social media preview images
- [ ] Write SEO-optimized product descriptions
- [ ] Plan launch email + early-bird offer

---

## 📈 Future Enhancements
- Bundle ratings & reviews  
- Personalized art recommendations  
- User-uploaded custom AI requests  
- NFT minting for exclusive artworks  
- Analytics dashboard (Supabase + Vercel Analytics)

---

## 📎 Notes & References
- [Razorpay Docs](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/)  
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)  
- [Google Drive API](https://developers.google.com/drive/api/v3/reference)  
- [Next.js Docs](https://nextjs.org/docs)  
- [TailwindCSS](https://tailwindcss.com/docs)  

---

> **Author:** Sidhant Pandagle  
> **Created:** 2025-10-23  
> **Repo:** `ai-art-catalog`  
> **Version:** 1.0.0
