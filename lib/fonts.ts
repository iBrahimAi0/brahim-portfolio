import { Space_Grotesk, Inter, JetBrains_Mono, Instrument_Serif, Cairo } from 'next/font/google';

const head = Space_Grotesk({ subsets: ['latin'], weight: '700', variable: '--f-head', display: 'swap' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--f-serif', display: 'swap' });
// Arabic font: only attached to /ar, so English and French visitors never download it.
const ar = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'], variable: '--f-ar', display: 'swap', preload: false });

export const fontClass = [head, body, mono, serif].map((f) => f.variable).join(' ');
export const arClass = ar.variable;
