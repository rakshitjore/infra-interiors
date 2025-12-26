# Migration Guide: Flask to Supabase (React-Only)

This guide will help you migrate from Flask backend to a React-only solution using Supabase.

## Why Supabase?

- ✅ **PostgreSQL Database** (same as your current setup)
- ✅ **Automatic REST API** - No backend code needed
- ✅ **Built-in Admin Dashboard** - View data in Supabase dashboard
- ✅ **Real-time capabilities** - Optional for future features
- ✅ **Free tier** - Generous free plan
- ✅ **Simple setup** - Just API keys, no server management

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Login
3. Click "New Project"
4. Fill in:
   - **Name**: Nakshatra INFRA & INTERIORS
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to you
5. Wait for project to be created (~2 minutes)

## Step 2: Create Database Tables

In Supabase Dashboard → SQL Editor, run:

```sql
-- Contact table
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Project table (if you need it)
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security (RLS) - Allow public inserts for contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contacts
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read (for admin panel)
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);
```

## Step 3: Get API Keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (for client-side access)

## Step 4: Install Supabase Client

```bash
cd frontend/nakshatra-vision-creation-main
npm install @supabase/supabase-js
```

## Step 5: Create Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 6: Update Environment Variables

Create `.env` in `frontend/nakshatra-vision-creation-main/`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 7: Update Contact Form

The contact form will be updated to use Supabase instead of Flask API.

## Step 8: Create React Admin Panel

A new admin panel component will be created in React to view submissions.

## Benefits After Migration

✅ **No Flask server** - Simpler deployment
✅ **No Docker backend** - Just frontend container
✅ **Built-in admin** - Supabase dashboard
✅ **Automatic API** - No backend code
✅ **Scalable** - Supabase handles scaling
✅ **Free tier** - 500MB database, 2GB bandwidth

## What You'll Lose

❌ Custom email notifications (can use Supabase Edge Functions)
❌ File uploads to server (can use Supabase Storage)
❌ Custom admin UI (but Supabase dashboard is great)

## Next Steps

After migration, you can:
- Use Supabase Storage for image uploads
- Use Supabase Edge Functions for email notifications
- Use Supabase Auth for admin login
- Add real-time updates to admin panel

