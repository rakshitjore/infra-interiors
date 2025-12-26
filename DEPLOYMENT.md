# 🚀 Deployment Guide (No Docker)

This guide shows you how to deploy your React app without Docker to various platforms.

## 📋 Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **npm** or **yarn** package manager
3. **Supabase account** - [Sign up](https://supabase.com)

## 🔧 Setup Steps

### 1. Install Dependencies

```bash
cd frontend/nakshatra-vision-creation-main
npm install
```

### 2. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3. Configure Environment Variables

Create a `.env` file in `frontend/nakshatra-vision-creation-main/`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=your-secure-password-here
```

**Get your Supabase keys:**
1. Go to https://supabase.com
2. Open your project
3. Go to **Settings** → **API**
4. Copy **Project URL** and **anon/public key**

### 4. Set Up Supabase Database

1. Go to Supabase Dashboard → **SQL Editor**
2. Run this SQL:

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

-- Allow public reads (for admin panel - you can restrict this later)
CREATE POLICY "Allow public reads" ON contacts
  FOR SELECT
  TO anon
  USING (true);
```

### 5. Build the App

```bash
npm run build
```

This creates a `dist/` folder with your production-ready app.

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

**Best for:** Quick deployment, automatic SSL, CDN

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend/nakshatra-vision-creation-main
   vercel
   ```

3. **Add Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_ADMIN_PASSWORD`

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

**Your app will be live at:** `https://your-project.vercel.app`

---

### Option 2: Netlify (Free & Easy)

**Best for:** Simple static hosting, form handling

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy:**
   ```bash
   cd frontend/nakshatra-vision-creation-main
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Add Environment Variables:**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add your Supabase variables

**Your app will be live at:** `https://your-site.netlify.app`

---

### Option 3: GitHub Pages

**Best for:** Free hosting for public repos

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

**Note:** Environment variables need to be set at build time. Use GitHub Actions or build locally.

---

### Option 4: Traditional Web Server (Apache/Nginx)

**Best for:** Your own server, VPS, or shared hosting

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your web server

3. **Configure your web server:**

   **For Nginx:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/nakshatra/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

   **For Apache (.htaccess in dist/):**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

### Option 5: Cloudflare Pages (Free)

**Best for:** Fast CDN, free SSL, easy setup

1. **Connect your GitHub repo** to Cloudflare Pages
2. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **Add environment variables** in Cloudflare Dashboard
4. **Deploy automatically** on every git push

---

## 🧪 Local Testing

Before deploying, test locally:

```bash
# Development mode
npm run dev

# Production build preview
npm run build
npm run preview
```

Visit:
- Development: http://localhost:8080
- Preview: http://localhost:4173

---

## 🔒 Security Notes

1. **Environment Variables:**
   - Never commit `.env` file to git
   - Add `.env` to `.gitignore`
   - Set variables in your hosting platform

2. **Admin Panel:**
   - Change `VITE_ADMIN_PASSWORD` to a strong password
   - Consider using Supabase Auth for better security

3. **Supabase:**
   - Use Row Level Security (RLS) policies
   - Restrict admin panel access if needed

---

## 📝 Quick Start Checklist

- [ ] Install Node.js and npm
- [ ] Run `npm install` and `npm install @supabase/supabase-js`
- [ ] Create Supabase project
- [ ] Set up database tables (run SQL)
- [ ] Create `.env` file with Supabase keys
- [ ] Test locally with `npm run dev`
- [ ] Build with `npm run build`
- [ ] Deploy to your chosen platform
- [ ] Set environment variables in hosting platform
- [ ] Test your live site!

---

## 🆘 Troubleshooting

**Build fails:**
- Check Node.js version (need v18+)
- Delete `node_modules` and `package-lock.json`, then `npm install` again

**Environment variables not working:**
- Make sure they start with `VITE_`
- Restart dev server after adding variables
- In production, set them in hosting platform

**Supabase connection issues:**
- Check your Supabase URL and keys
- Verify RLS policies allow inserts
- Check browser console for errors

**Admin panel not loading:**
- Check `VITE_ADMIN_PASSWORD` is set
- Verify Supabase RLS allows SELECT queries

---

## 🎉 You're Done!

Your app is now deployed and ready to use! 🚀

**Access your site:**
- Main site: Your deployment URL
- Admin panel: Your deployment URL + `/infra-interior`

