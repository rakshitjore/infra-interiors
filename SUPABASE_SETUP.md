# Supabase Setup Instructions

## Quick Start

### 1. Install Dependencies

```bash
cd frontend/nakshatra-vision-creation-main
npm install @supabase/supabase-js
```

### 2. Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Create a new project
3. Wait for it to be created (~2 minutes)

### 3. Create Database Tables

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

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contacts (for contact form)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated reads (for admin panel)
-- Note: For admin panel, you'll need to either:
-- Option A: Use service role key (server-side only, not recommended for client)
-- Option B: Set up Supabase Auth and authenticate users
-- Option C: Temporarily disable RLS for admin (not recommended for production)
-- For now, we'll use a workaround with service role key in a serverless function
```

### 4. Get API Keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (for client-side)

### 5. Set Environment Variables

Create `.env` file in `frontend/nakshatra-vision-creation-main/`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=your-secure-password-here
```

### 6. For Admin Panel Access

**Important**: The admin panel needs to read contacts. You have two options:

#### Option A: Use Service Role Key (Quick but less secure)

1. Get **service_role key** from Supabase Settings → API
2. Create a serverless function or use it in a backend (not recommended to expose in frontend)
3. Or temporarily allow public reads for testing:

```sql
CREATE POLICY "Allow public reads" ON contacts
  FOR SELECT
  TO anon
  USING (true);
```

#### Option B: Use Supabase Auth (Recommended for production)

1. Enable Supabase Auth
2. Create admin user
3. Update AdminPanel.tsx to use Supabase Auth instead of password

### 7. Test

1. Start your dev server: `npm run dev`
2. Submit a contact form
3. Visit `/infra-interior` to see admin panel
4. Login with your password

## What's Changed

✅ Contact form now submits to Supabase  
✅ Admin panel is now a React component at `/infra-interior`  
✅ No Flask backend needed  
✅ View data in Supabase dashboard or React admin panel  

## Next Steps

- Remove any remaining legacy Flask references (if migrating from an older version)
- Update deployment to only deploy frontend
- Set up Supabase Auth for better admin security
- Use Supabase Storage for image uploads if needed

