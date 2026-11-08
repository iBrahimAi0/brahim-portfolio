import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Fx from '@/components/Fx';
import ContactForm from '@/components/ContactForm';
import ShowMore from '@/components/ShowMore';
import { SITE, EDUCATION, SKILLS, NAV, cvFor } from '@/lib/content';
import { LOGOS } from '@/lib/logos';
import { getProjects } from '@/lib/projects';
import { LANGS, T, isLang } from '@/lib/i18n';

export const revalidate = 3600; // static pages, refreshed hourly (picks up Supabase edits)
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

const v = (o: Record<string, string | number>) => o as CSSProperties;
const A = ({ p, cls = 'it' }: { p: [string, string, string]; cls?: string }) => <>{p[0]}<span className={cls}>{p[1]}</span>{p[2]}</>;
const Tags = ({ items }: { items: string[] }) => (
  <div className="tags">{items.map((x, i) => <span className="tag" key={x} style={v({ '--i': i })}>{x}</span>)}</div>
);
const Head = ({ n, eyebrow, children }: { n?: string; eyebrow: string; children: ReactNode }) => (
  <div className="sh">
    {n && <div className="num" data-p=".12" aria-hidden="true">{n}</div>}
    <div className="eb rv">{eyebrow}</div>
    <h2 className="rv">{children}</h2>
  </div>
);

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLang(l)) notFound();
  const lang = l, t = T[lang];
  const projects = await getProjects(lang);

  const logos = LOGOS.flatMap(([n, s], i) => [
    <span key={n}><svg className="lg" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s }} />{n}</span>,
    <b key={'s' + i}>/</b>,
  ]);
  const ribbon = t.ribbon.flatMap((w, i) => [<span key={w}>{w}</span>, <span key={'x' + i}>✦</span>]);

  return (
    <>
      <div id="bar" />
      <Fx />
      <Nav lang={lang} t={t} />
      <main id="top">
        <div className="wrap">
          <section className="hero">
            <div className="eb c fu" style={v({ '--d': 100 })}>{t.eyebrow}</div>
            <h1>{t.hero.map((w, i) => (
              <span key={i}><span className="w"><span style={v({ '--i': i })}>{i === t.hl ? <span className="hl">{w}</span> : w}</span></span>{' '}</span>
            ))}</h1>
            <p className="intro fu" style={v({ '--d': 900 })}>{t.intro}</p>
            <div className="btns fu" style={v({ '--d': 1050 })}>
              <a href="#projects" className="btn pri">{t.view}</a>
              <a href={cvFor(lang)} className="btn ghost" download>{t.cv}</a>
            </div>
          </section>
        </div>

        <div className="mqw" aria-hidden="true"><div className="mq"><div>{logos}</div><div>{logos}</div></div></div>

        <div className="wrap">
          <section id="about">
            <Head eyebrow={t.about.e}><A p={t.about.h} /></Head>
            <div className="bento">
              <div className="card rv s2"><div className="mg">BA</div><h3 className="big"><A p={t.about.role} /></h3><p className="mt">{t.about.p}</p></div>
              <div className="card rv s2"><div className="lb ac">{t.about.status}</div><div className="av"><i className="pd" /><span>{t.about.avail}</span></div><p className="mt">{t.about.loc}</p></div>
              <div className="card rv s2"><h3 className="big"><A p={t.about.stack} /></h3><Tags items={['React', 'Next.js', 'Laravel', 'MySQL']} /></div>
              <a className="card cta rv s2" href="#contact"><div className="lb up">{t.about.ask}</div><h3 className="big"><A p={t.about.talk} /></h3></a>
            </div>
          </section>

          <section id="education">
            <Head n="01" eyebrow={t.edu.e}><A p={t.edu.h} /></Head>
            <div className="tl" id="tl"><div className="fill" id="fill" />
              {EDUCATION.map((e, i) => (
                <div className={`ti rv ${i % 2 ? 'r' : 'l'}`} key={e.years}><div className="d mono">{e.years}</div><h3>{e.title[lang]}</h3><p>{e.school[lang]}</p></div>
              ))}
            </div>
          </section>

          <section id="skills">
            <Head n="02" eyebrow={t.sk.e}><A p={t.sk.h} /></Head>
            <div className="grid" id="sk">
              {SKILLS.map((g, i) => (
                <div className="card rv" key={g.tags[0]}><div className="sk-h"><span className="mono">0{i + 1}</span><h3>{g.title[lang]}</h3></div><Tags items={g.tags} /></div>
              ))}
            </div>
          </section>

          <div className="rib" aria-hidden="true"><div className="rt">{[0, 1, 2, 3].map((k) => <div className="rc" key={k}>{ribbon}</div>)}</div></div>

          <section id="projects">
            <Head n="03" eyebrow={t.pr.e}><A p={t.pr.h} /></Head>
            <div className="pg" id="pg">
              {projects.map((p, i) => (
                <article className={`pc rv ${i % 2 ? 'r' : 'l'}${i >= 4 ? ' extra' : ''}`} key={p.title}>
                  <div className={`ph mono${p.image ? ' im' : ''}`} style={{ background: p.color }}>
                    {p.image && <Image src={p.image} alt={p.title} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />}
                    <span>{p.caption}</span>
                  </div>
                  <div className="pb">
                    <h3>{p.title}</h3><Tags items={p.tags} />
                    <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                    <div className="lk">
                      {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">{t.pr.live}</a>}
                      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {projects.length > 4 && <div className="more"><ShowMore more={`${t.pr.more} (${projects.length - 4})`} less={t.pr.less} /></div>}
          </section>

          <section id="contact">
            <div className="sh"><div className="num" data-p=".12" aria-hidden="true">04</div></div>
            <div className="cg">
              <div>
                <div className="eb rv">{t.ct.e}</div>
                <h2 className="rv"><A p={t.ct.h} cls="hl" /></h2>
                <p className="rv" style={{ color: 'var(--mut)' }}>{t.ct.p}</p>
                <div className="card ci rv"><span className="lb">{t.ct.email}</span><a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a></div>
                <div className="card ci rv"><span className="lb">{t.ct.phone}</span><a href={`tel:${SITE.phone.replace(/\s/g, '')}`} dir="ltr">{SITE.phone}</a></div>
                <div className="card ci rv"><span className="lb">{t.ct.loc}</span><span>{t.about.loc}</span></div>
              </div>
              <ContactForm lang={lang} t={t.ct} />
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="fr"><strong className="logo">{SITE.name}</strong>
            <nav aria-label="Footer">{NAV.slice(1).map((id) => <a key={id} href={`#${id}`}>{t.nav[id]}</a>)}</nav>
          </div>
          <p className="cp mono">© {new Date().getFullYear()} {SITE.name}</p>
        </div>
        <div className="wm" aria-hidden="true">{[...'BRAHIM AIT IHIA'].map((c, i) => <i key={i} style={v({ '--i': i })}>{c === ' ' ? '\u00a0' : c}</i>)}</div>
      </footer>
    </>
  );
}
