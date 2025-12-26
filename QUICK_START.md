# ⚡ Quick Start Guide

Get your app running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd frontend/nakshatra-vision-creation-main
npm install
npm install @supabase/supabase-js
```

## Step 2: Set Up Supabase

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **SQL Editor** and run:

```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public reads" ON contacts
  FOR SELECT TO anon USING (true);
```

4. Go to **Settings** → **API** and copy:
   - Project URL
   - anon/public key

## Step 3: Create .env File

Create `.env` in `frontend/nakshatra-vision-creation-main/`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=admin123
```

## Step 4: Run the App

```bash
npm run dev
```

Visit: http://localhost:8080

## Step 5: Build for Production

```bash
npm run build
```

The `dist/` folder contains your production-ready app!

## Deploy

See `DEPLOYMENT.md` for deployment options (Vercel, Netlify, etc.)

---

**That's it!** 🎉 Your app is ready to use!

