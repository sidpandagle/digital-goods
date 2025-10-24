import { createClient } from '@supabase/supabase-js'

/**
 * Service role client - BYPASSES Row Level Security (RLS)
 * Use ONLY for trusted backend operations like:
 * - Creating orders
 * - Creating download tokens
 * - Admin operations
 *
 * NEVER expose this client to the frontend or use with user input without validation
 */
export function createServiceClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
