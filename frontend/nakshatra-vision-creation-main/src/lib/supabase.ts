import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabaseClient: SupabaseClient | null = null

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Missing environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.',
  )
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = supabaseClient
export const isSupabaseConfigured = Boolean(supabaseClient)

// Database types
export interface Contact {
  id?: number
  name: string
  phone: string
  email: string
  service?: string
  message: string
  created_at?: string
}

export interface Project {
  id?: number
  title: string
  category: string
  description: string
  image?: string
  created_at?: string
}

