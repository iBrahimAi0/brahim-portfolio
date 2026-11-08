import { localProjects, type Project } from './content';
import type { Lang } from './i18n';

type Row = Record<string, string | string[] | null> & { tags: string[] | null };

const toUrl = (u: unknown) => {
  if (typeof u !== 'string') return undefined;
  const s = u.trim();
  if (!s || s === '#') return s || undefined;
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

// Reads the `projects` table through Supabase's REST API (cached 1h). Falls back to lib/content.ts.
export async function getProjects(lang: Lang): Promise<Project[]> {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return localProjects(lang);
  try {
    const r = await fetch(`${url}/rest/v1/projects?select=*&order=position.asc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 3600 },
    });
    if (!r.ok) return localProjects(lang);
    const rows: Row[] = await r.json();
    if (!rows.length) return localProjects(lang);
    const s = (p: Row, k: string) => (p[`${k}_${lang}`] ?? p[`${k}_en`] ?? '') as string;
    const a = (p: Row, k: string) => ((p[`${k}_${lang}`] ?? p[`${k}_en`]) as string[] | null) ?? [];
    return rows.map((p) => ({
      title: s(p, 'title'), caption: s(p, 'caption'), points: a(p, 'points'), tags: p.tags ?? [],
      color: (p.color as string) ?? '#BEF264', image: (p.image as string) || undefined,
      live: toUrl(p.live_url), github: toUrl(p.github_url),
    }));
  } catch {
    return localProjects(lang);
  }
}
