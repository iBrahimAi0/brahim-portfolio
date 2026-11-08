'use client';
import { useActionState } from 'react';
import { sendMessage, type State } from '@/app/actions';
import type { Dict, Lang } from '@/lib/i18n';

export default function ContactForm({ lang, t }: { lang: Lang; t: Dict['ct'] }) {
  const [s, action, pending] = useActionState<State, FormData>(sendMessage, {});
  const f = (name: string, label: string, field: React.ReactNode) => (
    <label>{label}{field}<span className={`er${s.errors?.[name] ? ' x' : ''}`}>{s.errors?.[name]}</span></label>
  );
  return (
    <form className="card rv" action={action} noValidate>
      <input type="hidden" name="lang" value={lang} />
      {f('name', t.name, <input name="name" autoComplete="name" defaultValue={s.values?.name} />)}
      {f('email', t.email, <input name="email" type="email" dir="ltr" autoComplete="email" defaultValue={s.values?.email} />)}
      {f('subject', t.subject, <input name="subject" defaultValue={s.values?.subject} />)}
      {f('message', t.message, <textarea name="message" defaultValue={s.values?.message} />)}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <button className="btn pri" type="submit" disabled={pending} style={{ justifySelf: 'start' }}>{pending ? t.sending : t.send}</button>
      <div className={`er${s.error ? ' x' : ''}`} role="status">{s.ok ? t.ok : s.error}</div>
    </form>
  );
}
