# SML Veículos - Car Dealership Website

## Overview

This is a car dealership website for SML Veículos, a used car dealer based in São Paulo, Brazil. The application provides a public-facing website showcasing available vehicles, along with an admin panel for managing vehicle inventory. The site includes features for vehicle browsing, financing inquiries, selling cars, and contact forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 16** with App Router architecture
- **React Server Components (RSC)** for optimal performance and SEO
- TypeScript for type safety throughout the codebase

### UI Components
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS v4** with custom CSS variables for theming
- Custom color scheme using OKLCH color space for consistent branding
- Responsive design with mobile-first approach

### Authentication & Authorization
- **Supabase Auth** for user authentication
- Email/password login for admin users
- Middleware-based route protection for `/admin/*` routes
- Server-side session management with cookie-based tokens

### Database
- **Supabase (PostgreSQL)** as the backend database
- Tables include: `vehicles`, `car_brands`, `vehicle_features`, `contact_leads`
- SQL migration scripts provided in `/scripts` directory for database setup

### Route Structure
- `/` - Public homepage with vehicle showcase
- `/auth/login` - Admin login page
- `/admin` - Vehicle management dashboard (protected)
- `/admin/vehicles/new` - Add new vehicle form
- `/admin/vehicles/[id]` - Edit existing vehicle

### Key Design Patterns
- Server Components for data fetching (vehicles, brands)
- Client Components for interactive forms and state management
- Supabase client separation: `server.ts` for RSC, `client.ts` for browser, `middleware.ts` for route protection

## External Dependencies

### Supabase Integration
- **Purpose**: Database, authentication, and backend services
- **Environment Variables Required**:
  - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public key
- **Packages**: `@supabase/supabase-js`, `@supabase/ssr`

### Vercel Analytics
- **Purpose**: Website analytics and performance monitoring
- **Package**: `@vercel/analytics`

### WhatsApp Integration
- Floating WhatsApp button for customer contact
- Hardcoded phone number: `5511958042257`
- Opens WhatsApp web/app directly

### Deployment
- Primary deployment target: **Replit** (migrated from Vercel)
- Deployment configured for autoscale with `npm run build` and `npm run start`
- Development server runs on port 5000 with host binding 0.0.0.0

## Recent Changes

### January 19, 2026 - Replit Migration
- Migrated project from Vercel to Replit environment
- Updated package.json scripts to use port 5000 and bind to 0.0.0.0
- Added `allowedDevOrigins` to next.config.mjs for Replit compatibility
- Configured environment variables for Supabase
- Set up deployment configuration for Replit autoscale