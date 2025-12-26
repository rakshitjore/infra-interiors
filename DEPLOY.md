# 🚀 Deployment Guide

## Quick Deploy to Vercel (FREE)

### Step 1: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/Login with **GitHub**
3. Click **"Add New Project"**
4. Import repository: `rakshitjore/infra-interiors`
5. **Configure:**
   - **Root Directory:** `frontend/nakshatra-vision-creation-main`
   - **Build Command:** `npm run build` (auto)
   - **Output Directory:** `dist` (auto)
6. **Add Environment Variables:**
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - `VITE_ADMIN_PASSWORD` = your admin password
7. Click **"Deploy"**

**Your site will be live at:** `https://your-project.vercel.app`

---

## Connect GoDaddy Domain

### Step 1: Add Domain in Vercel

1. In Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Enter your GoDaddy domain (e.g., `yourdomain.com`)
3. Click **"Add"**

### Step 2: Update DNS in GoDaddy

**Option A: Use Vercel Nameservers (Easier)**

1. In GoDaddy: **My Products** → **DNS** → **Nameservers** → **Change**
2. Select **"Custom"**
3. Enter Vercel's nameservers (shown in Vercel dashboard):
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Save

**Option B: Add DNS Records (Keep GoDaddy Nameservers)**

1. In GoDaddy: **My Products** → **DNS** → **Records**
2. Add **A record:**
   - Type: A
   - Name: @
   - Value: `76.76.21.21` (check Vercel for current IP)
3. Add **CNAME record:**
   - Type: CNAME
   - Name: www
   - Value: `cname.vercel-dns.com`
4. Save

### Step 3: Wait for DNS

- DNS propagation: 1-24 hours (usually 1-2 hours)
- SSL certificate: Auto-issued by Vercel (5-10 minutes)

---

## Setup Supabase (If Not Done)

1. Go to https://supabase.com → Create project
2. In **SQL Editor**, run:
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
3. Get API keys: **Settings** → **API**
   - Copy **Project URL** and **anon/public key**

---

## After Deployment

- **Main Site:** `https://yourdomain.com`
- **Admin Panel:** `https://yourdomain.com/infra-interior`

## Updates

Just push to GitHub - Vercel auto-deploys!

```bash
git add .
git commit -m "Update"
git push
```

---

## ✅ What You Get (FREE)

- ✅ Free hosting
- ✅ Free SSL/HTTPS
- ✅ Global CDN
- ✅ Custom domain
- ✅ Auto-deploy on git push
- ✅ Unlimited deployments

