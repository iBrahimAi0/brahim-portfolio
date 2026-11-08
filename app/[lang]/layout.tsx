import type { Metadata, Viewport } from 'next';
import { fontClass, arClass } from '@/lib/fonts';
import { LANGS, T, isLang } from '@/lib/i18n';
import '../globals.css';

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));
export const viewport: Viewport = { viewportFit: 'cover', themeColor: '#080A06' };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = T[isLang(lang) ? lang : 'en'];
  return {
    title: `Brahim Ait Ihia — ${t.job}`, description: t.meta,
    alternates: { languages: { en: '/en', fr: '/fr', ar: '/ar' } },
    openGraph: { title: `Brahim Ait Ihia — ${t.job}`, description: t.meta, type: 'website' },
  };
}

// Runs before first paint: restores the saved theme and enables the reveal animations.
const boot = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add('js')`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} data-theme="dark" className={`${fontClass} ${lang === 'ar' ? arClass : ''}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: boot }} /></head>
      <body>{children}</body>
    </html>
  );
}
