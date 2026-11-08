# Brahim Ait Ihia: portfolio (Next.js)

Static, server-rendered Next.js 15 (App Router, TypeScript). No UI library and no animation library: effects are CSS plus one small client file (`components/Fx.tsx`).

## Run
```bash
npm install
cp .env.example .env.local   # fill in later; the site works without it
npm run dev                  # http://localhost:3000
```

## Edit content
Education, skills and fallback projects live in `lib/content.ts`.
Logos: `lib/logos.ts`. Project images: `public/images/`, then `image: '/images/school.png'` (the two included images are placeholders: replace them with real screenshots). More than 4 projects: the rest sit behind a Show more button.

## Projects without touching code (optional)
Run `supabase/schema.sql` in Supabase, add `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env.local` / Vercel. Then add or edit rows in **Table Editor -> projects** (title, caption, image, live_url, github_url, tags, points). The site refreshes within an hour.

## Contact form
Server Action (`app/actions.ts`): validates with Zod, saves to `contact_messages` and emails you through Resend. Set `RESEND_API_KEY` (and optionally `CONTACT_TO`).

## Deploy
Push to GitHub, import on vercel.com (framework: Next.js), add the env vars, deploy.

## Languages
Three static pages: `/en`, `/fr`, `/ar` (Arabic is right-to-left). Interface text: `lib/i18n.ts`. Education, skills and projects: `lib/content.ts`. CVs: `public/cv/CV_Brahim_Ait_Ihia_EN.pdf`, `_FR.pdf`, `_AR.pdf`; the Download CV button picks the one for the page language.
