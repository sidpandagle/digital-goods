# Pixel Forge Studio Store

A Next.js 15 application for selling AI-generated digital art bundles with secure Google Drive delivery.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payment**: Razorpay
- **File Delivery**: Google Drive API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. Supabase account
3. Razorpay account
4. Google Cloud project with Drive API enabled

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env.local` and fill in your credentials:
```bash
cp .env.example .env.local
```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql` in the SQL editor
   - Copy your project URL and anon key to `.env.local`

5. Set up Razorpay:
   - Get your API keys from Razorpay Dashboard
   - Add them to `.env.local`

6. Set up Google Drive API:
   - Enable Google Drive API in Google Cloud Console
   - Create OAuth 2.0 credentials
   - Generate a refresh token using OAuth Playground
   - Add credentials to `.env.local`

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── bundles/      # Fetch bundles
│   │   ├── create-order/ # Create Razorpay order
│   │   ├── verify-payment/ # Verify payment
│   │   └── download/     # Download token handler
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── lib/
│   ├── supabase/         # Supabase client utilities
│   ├── razorpay/         # Razorpay client
│   └── google-drive/     # Google Drive API client
├── types/
│   └── database.ts       # TypeScript types
├── supabase/
│   └── schema.sql        # Database schema
└── .env.local            # Environment variables
```

## Core Features

### Payment Flow
1. User selects bundle → API creates Razorpay order
2. User completes payment via Razorpay checkout
3. Backend verifies payment signature
4. System generates download token and Google Drive share link
5. User receives email with lifetime access link

### Security
- Razorpay signature verification
- Token-based file access
- Row-Level Security (RLS) in Supabase
- Private Google Drive files with user-specific permissions

## API Endpoints

- `GET /api/bundles` - Fetch all bundles
- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment and issue download token
- `GET /api/download/[token]` - Access file via token

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Next Steps

- [ ] Add user authentication pages
- [ ] Build minimal catalog UI
- [ ] Implement dashboard for purchased items
- [ ] Add email notifications
- [ ] Test payment flow end-to-end
- [ ] Add admin panel for managing bundles

## License

ISC
