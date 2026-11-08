'use client';
import { useEffect } from 'react';

const q = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Background light + every scroll/pointer effect. Renders only the background layer: all page content stays server-rendered. */
export default function Fx() {
  /* scroll reveals, progress bar, timeline, parallax numbers, card border spotlight */
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
    );
    q('.rv,.wm').forEach((e) => io.observe(e));
    q('.card.rv').forEach((e, i) => { e.style.transitionDelay = (i % 3) * 90 + 'ms'; });

    const bar = document.getElementById('bar'), fill = document.getElementById('fill'), tl = document.getElementById('tl');
    const items = q('.ti'), par = q('[data-p]');
    let t = 0;
    const upd = () => {
      t = 0;
      const y = scrollY, h = innerHeight;
      if (bar) bar.style.transform = `scaleX(${Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - h))})`;
      if (tl && fill) {
        const r = tl.getBoundingClientRect();
        fill.style.transform = `scaleY(${clamp((h * 0.65 - r.top) / r.height, 0, 1)})`;
        items.forEach((i) => i.classList.toggle('on', i.getBoundingClientRect().top < h * 0.65));
      }
      par.forEach((e) => { const r = e.parentElement!.getBoundingClientRect(); e.style.transform = `translateY(${(r.top - h / 2) * -Number(e.dataset.p)}px)`; });
    };
    const onScroll = () => { if (!t) t = requestAnimationFrame(upd); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    upd();

    const cards = q('.card,.pc');
    let r2 = 0, px = 0, py = 0;
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      if (r2) return;
      r2 = requestAnimationFrame(() => {
        r2 = 0;
        for (const c of cards) {
          const r = c.getBoundingClientRect();
          if (r.bottom < 0 || r.top > innerHeight) continue;
          c.style.setProperty('--mx', px - r.left + 'px');
          c.style.setProperty('--my', py - r.top + 'px');
        }
      });
    };
    addEventListener('pointermove', move, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); removeEventListener('pointermove', move); };
  }, []);

  /* hero text: drag it, throw it, it bounces inside the hero and floats home after 5s idle */
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero');
    if (!hero) return;
    type B = { el: HTMLElement; x: number; y: number; vx: number; vy: number; tx: number; ty: number; m: number; gx: number; gy: number };
    const bodies: B[] = q('.hero .eb,.hero .intro,.hero h1 .w').map((el) => ({ el, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, m: 0, gx: 0, gy: 0 }));
    let run = false, idle = 0;
    const put = (o: B) => { o.el.style.transform = `translate3d(${o.x}px,${o.y}px,0) rotate(${clamp(o.vx * 0.5, -9, 9)}deg)`; };
    const wake = () => { if (!run) { run = true; requestAnimationFrame(tick); } };
    function tick() {
      const hb = hero!.getBoundingClientRect();
      let busy = false;
      for (const o of bodies) {
        if (!o.m) continue;
        busy = true;
        const r = o.el.getBoundingClientRect(), bx = r.left - o.x, by = r.top - o.y;
        const vw = document.documentElement.clientWidth, x0 = -bx, x1 = vw - bx - r.width, y0 = hb.top - by, y1 = hb.bottom - by - r.height;
        if (o.m === 1) {
          const px = o.x, py = o.y;
          o.x += (clamp(o.tx, x0, x1) - o.x) * 0.35; o.y += (clamp(o.ty, y0, y1) - o.y) * 0.35;
          o.vx = o.vx * 0.5 + (o.x - px) * 0.5; o.vy = o.vy * 0.5 + (o.y - py) * 0.5;
        } else if (o.m === 2) {
          o.x += o.vx; o.y += o.vy; o.vx *= 0.955; o.vy *= 0.955;
          if (o.x < x0) { o.x = x0; o.vx *= -0.6; } else if (o.x > x1) { o.x = x1; o.vx *= -0.6; }
          if (o.y < y0) { o.y = y0; o.vy *= -0.6; } else if (o.y > y1) { o.y = y1; o.vy *= -0.6; }
          if (Math.hypot(o.vx, o.vy) < 0.15) { o.vx = o.vy = 0; o.m = 0; }
        } else {
          o.x += -o.x * 0.09; o.y += -o.y * 0.09; o.vx = -o.x * 0.05; o.vy = 0;
          if (Math.abs(o.x) < 0.3 && Math.abs(o.y) < 0.3) { o.x = o.y = o.vx = 0; o.m = 0; }
        }
        put(o);
      }
      if (busy) requestAnimationFrame(tick); else run = false;
    }
    const goHome = () => { bodies.forEach((o) => { if (o.m !== 1 && (o.x || o.y)) { o.m = 3; o.vx = o.vy = 0; } }); wake(); };
    const free = window.setTimeout(() => hero.classList.add('free'), 2600);
    for (const o of bodies) {
      const el = o.el;
      el.classList.add('dg');
      el.onpointerdown = (ev) => {
        if (ev.button) return;
        ev.preventDefault(); clearTimeout(idle); hero.classList.add('free');
        el.setPointerCapture(ev.pointerId); el.classList.add('drag');
        o.m = 1; o.gx = ev.clientX - o.x; o.gy = ev.clientY - o.y; o.tx = o.x; o.ty = o.y; o.vx = o.vy = 0; wake();
      };
      el.onpointermove = (e) => { if (o.m === 1) { o.tx = e.clientX - o.gx; o.ty = e.clientY - o.gy; } };
      const up = () => {
        if (o.m !== 1) return;
        el.classList.remove('drag');
        const sp = Math.hypot(o.vx, o.vy);
        if (sp > 1.5) { const k = Math.min(1, 26 / sp) * 1.15; o.vx *= k; o.vy *= k; o.m = 2; } else { o.vx = o.vy = 0; o.m = 0; }
        clearTimeout(idle); idle = window.setTimeout(goHome, 5000); wake();
      };
      el.onpointerup = up; el.onpointercancel = up;
    }
    return () => { clearTimeout(free); clearTimeout(idle); bodies.forEach((o) => { o.el.onpointerdown = o.el.onpointermove = o.el.onpointerup = o.el.onpointercancel = null; }); };
  }, []);

  /* liquid light: low-res canvas, only animates (and only costs anything) while the pointer is moving */
  useEffect(() => {
    const c = document.getElementById('liq') as HTMLCanvasElement | null;
    if (!c || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const x = c.getContext('2d');
    if (!x) return;
    const K = 0.4;
    let W = 0, H = 0, mx = -999, my = -999, lx = -999, ly = -999, raf = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; l: number; d: number; c: number; ph: number };
    const ps: P[] = [], sp: Record<string, HTMLCanvasElement> = {};
    const size = () => { W = Math.ceil(innerWidth * K); H = Math.ceil(innerHeight * K); c.width = W; c.height = H; };
    size();
    const spr = (rgb: string) => sp[rgb] || (sp[rgb] = (() => {
      const s = document.createElement('canvas'); s.width = s.height = 128;
      const g = s.getContext('2d')!, r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      r.addColorStop(0, `rgba(${rgb},1)`); r.addColorStop(0.45, `rgba(${rgb},.35)`); r.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = r; g.fillRect(0, 0, 128, 128); return s;
    })());
    const emit = (px: number, py: number, vx: number, vy: number) => {
      if (ps.length > 260) ps.shift();
      ps.push({ x: px * K, y: py * K, vx: vx * K, vy: vy * K, r: (46 + Math.random() * 52) * K, l: 1, d: 0.007 + Math.random() * 0.006, c: Math.random() < 0.22 ? 1 : 0, ph: Math.random() * 6 });
    };
    const loop = () => {
      raf = 0;
      const light = document.documentElement.dataset.theme === 'light';
      const cols = light ? ['132,204,22', '250,204,21'] : ['190,242,100', '250,204,21'];
      const t = performance.now() / 1000;
      if (mx > -900) {
        if (lx < -900) { lx = mx; ly = my; }
        const dx = mx - lx, dy = my - ly, d = Math.hypot(dx, dy);
        if (d > 1) { const n = Math.min(5, Math.ceil(d / 14)); for (let i = 1; i <= n; i++) emit(lx + dx * i / n, ly + dy * i / n, dx * 0.12 + (Math.random() - 0.5) * 2, dy * 0.12 + (Math.random() - 0.5) * 2); }
        lx = mx; ly = my;
      }
      x.clearRect(0, 0, W, H);
      x.globalCompositeOperation = light ? 'source-over' : 'lighter';
      for (let i = ps.length; i--;) {
        const p = ps[i];
        p.l -= p.d;
        if (p.l <= 0) { ps.splice(i, 1); continue; }
        p.vx += Math.sin(p.y * 0.045 + t * 3 + p.ph) * 0.05; p.vy += Math.cos(p.x * 0.045 + t * 2.4 + p.ph) * 0.05;
        p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy *= 0.95; p.r *= 1.004;
        x.globalAlpha = Math.min(1, p.l * (light ? 0.3 : 0.08));
        const s = p.r * 2;
        x.drawImage(spr(cols[p.c]), p.x - p.r, p.y - p.r, s, s);
      }
      x.globalAlpha = 1;
      if (ps.length) raf = requestAnimationFrame(loop);
    };
    const mv = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(loop); };
    const lv = () => { mx = my = lx = ly = -999; };
    addEventListener('pointermove', mv, { passive: true });
    document.addEventListener('pointerleave', lv);
    addEventListener('resize', size);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', lv); removeEventListener('resize', size); };
  }, []);

  return (
    <div className="fx" aria-hidden="true">
      <i className="b b1" /><i className="b b2" /><i className="b b3" />
      <canvas id="liq" />
    </div>
  );
}
