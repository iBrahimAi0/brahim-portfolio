// All interface text, EN / FR / AR. Technical terms (React, Laravel, REST...) are never translated.
export const LANGS = ['en', 'fr', 'ar'] as const;
export type Lang = (typeof LANGS)[number];
type A3 = [string, string, string]; // [before, accent word, after]

const en = {
  job: 'Full-Stack Developer',
  meta: 'Full-stack developer in Casablanca building scalable web applications with React, Next.js and Laravel.',
  nav: { about: 'About', education: 'Education', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
  cta: 'Let’s talk →', menu: 'Menu', theme: 'Toggle light and dark theme', langLabel: 'Language',
  eyebrow: 'Full Stack Developer // Casablanca',
  hero: ['Building', 'scalable', 'web', 'architectures', 'for', 'modern', 'products'], hl: 1,
  intro: 'Hi, I’m Brahim Ait Ihia. I specialize in React, Next.js and Laravel: responsive applications, REST APIs, and robust authentication & data systems.',
  view: 'View My Work', cv: 'Download CV',
  about: {
    e: '00 / Overview', h: ['At a ', 'glance', ''] as A3, role: ['Brahim Ait Ihia, ', 'full-stack developer', ''] as A3,
    p: 'I turn complex requirements into clean, fast web apps: React and Next.js on the front, Laravel on the back, with authentication and data handled properly.',
    status: 'Status', avail: 'Available for new projects', loc: 'Casablanca, Morocco',
    stack: ['Interfaces that feel ', 'right', ', APIs you can trust.'] as A3, ask: 'Got a project?', talk: ['Let’s ', 'talk', ' →'] as A3,
  },
  edu: { e: '01 / Background', h: ['My ', 'education', ''] as A3 },
  sk: { e: '02 / Toolkit', h: ['Tech ', 'stack', ''] as A3 },
  pr: { e: '03 / Work', h: ['Featured ', 'projects', ''] as A3, live: 'Live demo →', more: 'Show more projects', less: 'Show fewer' },
  ct: {
    e: '04 / Contact', h: ['Let’s build something ', 'scalable', '.'] as A3, p: 'Tell me about your project and I’ll get back to you by email.',
    email: 'Email', phone: 'Phone', loc: 'Location', name: 'Name', subject: 'Subject', message: 'Message',
    send: 'Send message →', sending: 'Sending…', ok: 'Thanks! Your message was sent.',
    e1: 'Please enter your name.', e2: 'Enter a valid email.', e3: 'Add a short subject.', e4: 'Message needs at least 10 characters.',
    fail: 'Something went wrong. Please email me directly.', nocfg: 'The contact service is not configured yet.',
  },
  ribbon: ['User-friendly', 'Responsive', 'Secure auth', 'REST APIs', 'Clean code', 'Scalable'],
};
export type Dict = typeof en;

const fr: Dict = {
  job: 'Développeur Full-Stack',
  meta: 'Développeur full-stack à Casablanca : applications web évolutives avec React, Next.js et Laravel.',
  nav: { about: 'À propos', education: 'Formation', skills: 'Compétences', projects: 'Projets', contact: 'Contact' },
  cta: 'Parlons-en →', menu: 'Menu', theme: 'Basculer entre thème clair et sombre', langLabel: 'Langue',
  eyebrow: 'Développeur Full Stack // Casablanca',
  hero: ['Je', 'conçois', 'des', 'architectures', 'web', 'évolutives', 'pour', 'des', 'produits', 'modernes'], hl: 5,
  intro: 'Bonjour, je suis Brahim Ait Ihia. Je me spécialise en React, Next.js et Laravel : applications responsives, REST APIs, authentification robuste et systèmes de données.',
  view: 'Voir mes projets', cv: 'Télécharger le CV',
  about: {
    e: '00 / Aperçu', h: ['En un ', 'coup d’œil', ''], role: ['Brahim Ait Ihia, ', 'développeur full-stack', ''],
    p: 'Je transforme des besoins complexes en applications web propres et rapides : React et Next.js côté front, Laravel côté back, avec une authentification et une gestion des données solides.',
    status: 'Statut', avail: 'Disponible pour de nouveaux projets', loc: 'Casablanca, Maroc',
    stack: ['Des interfaces ', 'justes', ', des APIs fiables.'], ask: 'Un projet ?', talk: ['Parlons-', 'en', ' →'],
  },
  edu: { e: '01 / Parcours', h: ['Ma ', 'formation', ''] },
  sk: { e: '02 / Outils', h: ['Stack ', 'technique', ''] },
  pr: { e: '03 / Réalisations', h: ['Projets ', 'phares', ''], live: 'Démo en ligne →', more: 'Voir plus de projets', less: 'Voir moins' },
  ct: {
    e: '04 / Contact', h: ['Construisons quelque chose d’', 'évolutif', '.'], p: 'Parlez-moi de votre projet, je vous réponds par e-mail.',
    email: 'E-mail', phone: 'Téléphone', loc: 'Localisation', name: 'Nom', subject: 'Objet', message: 'Message',
    send: 'Envoyer le message →', sending: 'Envoi…', ok: 'Merci ! Votre message a bien été envoyé.',
    e1: 'Veuillez saisir votre nom.', e2: 'Saisissez un e-mail valide.', e3: 'Ajoutez un court objet.', e4: 'Le message doit contenir au moins 10 caractères.',
    fail: 'Une erreur est survenue. Écrivez-moi directement par e-mail.', nocfg: 'Le service de contact n’est pas encore configuré.',
  },
  ribbon: ['Ergonomique', 'Responsive', 'Auth sécurisée', 'REST APIs', 'Code propre', 'Évolutif'],
};

const ar: Dict = {
  job: 'مطوّر Full-Stack',
  meta: 'مطوّر Full-Stack في الدار البيضاء، أبني تطبيقات ويب قابلة للتوسع باستخدام React وNext.js وLaravel.',
  nav: { about: 'نبذة', education: 'التعليم', skills: 'المهارات', projects: 'المشاريع', contact: 'تواصل' },
  cta: 'لنتحدّث ←', menu: 'القائمة', theme: 'التبديل بين الوضع الفاتح والداكن', langLabel: 'اللغة',
  eyebrow: 'مطوّر Full Stack // الدار البيضاء',
  hero: ['أبني', 'بنيات', 'ويب', 'قابلة للتوسع', 'لمنتجات', 'عصرية'], hl: 3,
  intro: 'مرحبًا، أنا Brahim Ait Ihia. أتخصص في React وNext.js وLaravel: تطبيقات متجاوبة، وواجهات REST APIs، ونظم مصادقة وبيانات قوية.',
  view: 'شاهد أعمالي', cv: 'تحميل السيرة الذاتية',
  about: {
    e: '00 / نظرة عامة', h: ['نظرة ', 'سريعة', ''], role: ['Brahim Ait Ihia، ', 'مطوّر Full Stack', ''],
    p: 'أحوّل المتطلبات المعقدة إلى تطبيقات ويب نظيفة وسريعة: React وNext.js في الواجهة، وLaravel في الخلفية، مع مصادقة وإدارة بيانات سليمة.',
    status: 'الحالة', avail: 'متاح لمشاريع جديدة', loc: 'الدار البيضاء، المغرب',
    stack: ['واجهات ', 'مريحة', '، وAPIs يمكنك الوثوق بها.'], ask: 'لديك مشروع؟', talk: ['لنتحدّث ', 'معًا', ' ←'],
  },
  edu: { e: '01 / المسار', h: ['مساري ', 'الدراسي', ''] },
  sk: { e: '02 / الأدوات', h: ['الأدوات ', 'التقنية', ''] },
  pr: { e: '03 / أعمال', h: ['مشاريع ', 'مختارة', ''], live: 'معاينة مباشرة ←', more: 'عرض المزيد من المشاريع', less: 'عرض أقل' },
  ct: {
    e: '04 / تواصل', h: ['لنبنِ شيئًا ', 'قابلًا للتوسع', '.'], p: 'حدّثني عن مشروعك وسأرد عليك عبر البريد الإلكتروني.',
    email: 'البريد الإلكتروني', phone: 'الهاتف', loc: 'الموقع', name: 'الاسم', subject: 'الموضوع', message: 'الرسالة',
    send: 'إرسال الرسالة ←', sending: 'جارٍ الإرسال…', ok: 'شكرًا! تم إرسال رسالتك.',
    e1: 'يرجى إدخال اسمك.', e2: 'أدخل بريدًا إلكترونيًا صحيحًا.', e3: 'أضف موضوعًا قصيرًا.', e4: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل.',
    fail: 'حدث خطأ ما. راسلني مباشرة عبر البريد الإلكتروني.', nocfg: 'خدمة التواصل غير مفعّلة بعد.',
  },
  ribbon: ['سهل الاستخدام', 'متجاوب', 'مصادقة آمنة', 'REST APIs', 'كود نظيف', 'قابل للتوسع'],
};

export const T: Record<Lang, Dict> = { en, fr, ar };
export const isLang = (x: string): x is Lang => (LANGS as readonly string[]).includes(x);
