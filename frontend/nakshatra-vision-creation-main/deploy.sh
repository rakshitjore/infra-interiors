#!/bin/bash

# Simple deployment script
echo "🚀 Building Nakshatra INFRA & INTERIORS..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "📝 Please create .env file with:"
    echo "   VITE_SUPABASE_URL=your-url"
    echo "   VITE_SUPABASE_ANON_KEY=your-key"
    echo "   VITE_ADMIN_PASSWORD=your-password"
    exit 1
fi

# Build the app
echo "📦 Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Production files are in the 'dist' folder"
    echo ""
    echo "🌐 Deploy options:"
    echo "   1. Upload 'dist' folder to your web server"
    echo "   2. Use: npm run deploy:vercel (for Vercel)"
    echo "   3. Use: npm run deploy:netlify (for Netlify)"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed!"
    exit 1
fi

