# Nakshatra INFRA & INTERIORS - Vision to Creation

A modern React + Supabase application for an interior design company featuring a premium marketing site, portfolio, and lead capture workflow.

## Project Structure

```
infra-interiors/
├── frontend/
│   └── nakshatra-vision-creation-main/
│       ├── src/                # React source code
│       ├── public/             # Static assets
│       ├── package.json        # Node dependencies
│       └── vite.config.ts      # Vite configuration
├── DEPLOY.md                   # Deployment guide
└── README.md                   # This file
```

## Features

### Frontend (React + TypeScript + Vite)
- Modern, responsive design with Tailwind CSS
- Interactive portfolio showcase
- Contact form with validation
- Smooth scrolling navigation
- Mobile-responsive layout
- Professional UI components using shadcn/ui

### Backend (Supabase)
- Managed PostgreSQL database
- Auto-generated REST API
- Row Level Security (RLS) support
- Built-in dashboard for viewing data

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd INFRA&INTERIORS
   ```

2. **Install dependencies**
   ```bash
   cd frontend/nakshatra-vision-creation-main
   npm install
   ```

3. **Configure Supabase**
   - Create a Supabase project at https://supabase.com
   - Create `.env` file in `frontend/nakshatra-vision-creation-main/`
   - Add: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`

4. **Run the app**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Admin Dashboard: http://localhost:5173/infra-interior (password set via `VITE_ADMIN_PASSWORD`)

## Deployment

**See `DEPLOY.md` for complete deployment instructions including GoDaddy domain setup.**

### Quick Deploy Options:

1. **Vercel** (Recommended - Free):
   ```bash
   npm install -g vercel
   cd frontend/nakshatra-vision-creation-main
   vercel
   ```

2. **Netlify** (Free):
   ```bash
   npm install -g netlify-cli
   cd frontend/nakshatra-vision-creation-main
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Traditional Server**: Build and upload `dist/` folder to your web server

**Note:** Set environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`) in your hosting platform.

### Security Considerations

- Store Supabase keys in environment variables
- Configure Row Level Security (RLS) policies in Supabase
- Use Supabase Auth for admin panel access in production
- Restrict access to Supabase service role keys

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- React Hook Form
- TanStack Query

### Infrastructure
- Supabase (PostgreSQL + Auth + API)
- Vercel (hosting - free tier)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Nakshatra INFRA & INTERIORS.

## Support

For support and inquiries, contact:
- Email: info@nakshatra-interiors.com
- Phone: +91 98765 43210

