'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { NAV } from '@/lib/content';
import { LANGS, type Dict, type Lang } from '@/lib/i18n';

export default function Nav({ lang, t }: { lang: Lang; t: Dict }) {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [dark, setDark] = useState(true);
  const [ind, setInd] = useState({ x: 0, w: 0, on: false });
  const mid = useRef<HTMLElement>(null);

  useEffect(() => setDark(document.documentElement.dataset.theme !== 'light'), []);

  // scroll-spy: highlight the section in the middle of the screen; hide the bar while scrolling down
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    let last = 0;
    const onScroll = () => {
      const y = scrollY, d = y - last;
      if (y < 250) setActive('');
      if (Math.abs(d) > 4) { setHide(y > 220 && d > 0); last = y; }
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); };
  }, []);

  // slide the lime pill under the active link
  useEffect(() => {
    const a = mid.current?.querySelector<HTMLElement>('a.on');
    setInd(a ? { x: a.offsetLeft, w: a.offsetWidth, on: true } : { x: 0, w: 0, on: false });
  }, [active, lang]);

  const toggle = () => {
    const n = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = n;
    try { localStorage.setItem('theme', n); } catch {}
    setDark(!dark);
  };

  return (
    <header className={`nv${hide ? ' hide' : ''}`}>
      <a href="#top" className="nv-logo" aria-label="Brahim Ait Ihia"><i className="mk">BA</i><span>Brahim Ait Ihia</span></a>
      <nav className="nv-mid" ref={mid} aria-label="Main">
        <i className="nv-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.on ? 1 : 0 }} />
        {NAV.map((id) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{t.nav[id]}</a>)}
      </nav>
      <div className="nv-r">
        <div className="lg3" role="group" aria-label={t.langLabel}>
          {LANGS.map((l) => <Link key={l} href={`/${l}`} hrefLang={l} lang={l} className={l === lang ? 'on' : ''} aria-current={l === lang ? 'true' : undefined}>{l.toUpperCase()}</Link>)}
        </div>
        <button className="ic" onClick={toggle} aria-label={t.theme}>{dark ? '☾' : '☀'}</button>
        <a href="#contact" className="btn pri nv-cta">{t.cta}</a>
        <button className="ic nv-burger" aria-expanded={open} aria-label={t.menu} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <nav className="nv-panel" aria-label={t.menu}>
          {NAV.map((id) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{t.nav[id]}</a>)}
        </nav>
      )}
    </header>
  );
}
