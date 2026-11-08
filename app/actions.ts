'use server';
import { z } from 'zod';
import { SITE } from '@/lib/content';
import { T, isLang } from '@/lib/i18n';

export type State = { ok?: boolean; error?: string; errors?: Record<string, string>; values?: Record<string, string> };

export async function sendMessage(_: State, fd: FormData): Promise<State> {
  if (fd.get('company')) return { ok: true }; // honeypot: bots fill this hidden field
  const l = String(fd.get('lang') ?? 'en');
  const t = T[isLang(l) ? l : 'en'].ct;
  const schema = z.object({
    name: z.string().trim().min(2, t.e1), email: z.string().trim().email(t.e2),
    subject: z.string().trim().min(3, t.e3), message: z.string().trim().min(10, t.e4),
  });
  const values = Object.fromEntries(['name', 'email', 'subject', 'message'].map((k) => [k, String(fd.get(k) ?? '')]));
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return { errors, values };
  }
  const d = parsed.data;
  const { SUPABASE_URL: sb, SUPABASE_ANON_KEY: key, RESEND_API_KEY: resend } = process.env;
  if (!(sb && key) && !resend) return { error: t.nocfg, values };

  const jobs: Promise<Response>[] = [];
  if (sb && key) {
    jobs.push(fetch(`${sb}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(d),
    }));
  }
  if (resend) {
    jobs.push(fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resend}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO ?? SITE.email], reply_to: d.email,
        subject: `[Portfolio] ${d.subject}`, text: `From: ${d.name} <${d.email}>\n\n${d.message}`,
      }),
    }));
  }
  const res = await Promise.allSettled(jobs);
  return res.some((r) => r.status === 'fulfilled' && r.value.ok) ? { ok: true } : { error: t.fail, values };
}
