# 🚀 Local Setup with Supabase

## Step 1: Set Up Supabase (If Not Done)

### Create Supabase Project:
1. Go to https://supabase.com
2. Sign up/Login (free account)
3. Click **"New Project"**
4. Fill in:
   - **Name:** Nakshatra INFRA & INTERIORS
   - **Database Password:** (choose a strong password - save it!)
   - **Region:** Choose closest to you
5. Wait 2-3 minutes for project creation

### Create Database Table:
1. In Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Run this SQL:

```sql
-- Create contacts table
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

-- Allow public inserts (for contact form)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public reads (for admin panel)
CREATE POLICY "Allow public reads" ON contacts
  FOR SELECT
  TO anon
  USING (true);
```

4. Click **"Run"** (or press Ctrl+Enter)

### Get API Keys:
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string)

---

## Step 2: Create .env File

Create `.env` file in `frontend/nakshatra-vision-creation-main/`:

```bash
cd frontend/nakshatra-vision-creation-main
nano .env
```

Add these lines (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=admin123
```

**Save and exit** (Ctrl+X, then Y, then Enter)

---

## Step 3: Install Dependencies

```bash
cd frontend/nakshatra-vision-creation-main
npm install
```

---

## Step 4: Run the Project

```bash
npm run dev
```

Your site will be available at: **http://localhost:8080**

---

## Step 5: Test

1. **Main Site:** http://localhost:8080
2. **Contact Form:** Fill and submit - check Supabase dashboard to see the data
3. **Admin Panel:** http://localhost:8080/infra-interior
   - Login with password from `.env` file

---

## ✅ Quick Checklist

- [ ] Supabase project created
- [ ] Database table created (contacts)
- [ ] API keys copied
- [ ] `.env` file created with keys
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)

---

## 🔧 Troubleshooting

**"Missing environment variables" warning:**
- Make sure `.env` file is in `frontend/nakshatra-vision-creation-main/`
- Restart dev server after creating `.env`

**Contact form not submitting:**
- Check browser console for errors
- Verify Supabase URL and key are correct
- Check Supabase dashboard → Table Editor → contacts table

**Admin panel not loading data:**
- Verify RLS policies are set correctly
- Check browser console for errors
- Make sure `VITE_ADMIN_PASSWORD` is set

---

## 📝 Environment Variables Reference

```env
# Required
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD=your-password-here
```

**Note:** Never commit `.env` file to git! It's already in `.gitignore`.

