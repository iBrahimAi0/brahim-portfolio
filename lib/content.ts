// ===================== EDIT YOUR CONTENT HERE =====================
// Each text has three versions: en / fr / ar. Technical terms stay as they are in every language.
import type { Lang } from './i18n';

export const SITE = { name: 'Brahim Ait Ihia', email: 'ibrahimaitihia81@gmail.com', phone: '+212 653 491 425' };
export const cvFor = (l: Lang) => `/cv/CV_Brahim_Ait_Ihia_${l.toUpperCase()}.pdf`; // files go in /public/cv/

export const NAV = ['about', 'education', 'skills', 'projects', 'contact'] as const;

type L3<T> = { en: T; fr: T; ar: T };

export const EDUCATION: { years: string; title: L3<string>; school: L3<string> }[] = [
  { years: '2025 – 2026',
    title: { en: 'Bachelor’s degree in Engineering Sciences (Computer Engineering)', fr: 'Licence en Sciences de l’Ingénieur (Génie Informatique)', ar: 'إجازة في علوم المهندس (الهندسة المعلوماتية)' },
    school: { en: 'École HIGH-TECH, Rabat', fr: 'École HIGH-TECH, Rabat', ar: 'École HIGH-TECH، الرباط' } },
  { years: '2023 – 2025',
    title: { en: 'Specialized Technician Diploma in Digital Development (Full Stack)', fr: 'Diplôme de Technicien Spécialisé en Développement Digital (option Full Stack)', ar: 'دبلوم تقني متخصص في التطوير الرقمي (Full Stack)' },
    school: { en: 'ISTA Ben Msik, Casablanca', fr: 'ISTA Ben Msik, Casablanca', ar: 'ISTA Ben Msik، الدار البيضاء' } },
  { years: '2022 – 2023',
    title: { en: 'Baccalaureate in Physical Sciences', fr: 'Baccalauréat Sciences Physiques', ar: 'الباكالوريا – العلوم الفيزيائية' },
    school: { en: 'Lycée IBN CHOUHAID, Casablanca', fr: 'Lycée IBN CHOUHAID, Casablanca', ar: 'Lycée IBN CHOUHAID، الدار البيضاء' } },
];

export const SKILLS: { title: L3<string>; tags: string[] }[] = [
  { title: { en: 'Frontend', fr: 'Frontend', ar: 'الواجهة الأمامية' }, tags: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'shadcn/ui', 'React Hook Form', 'Zod'] },
  { title: { en: 'Backend', fr: 'Backend', ar: 'الخلفية' }, tags: ['PHP', 'Laravel', 'Eloquent ORM', 'Laravel Sanctum'] },
  { title: { en: 'Databases', fr: 'Bases de données', ar: 'قواعد البيانات' }, tags: ['MySQL', 'MongoDB'] },
  { title: { en: 'Tools & Practices', fr: 'Outils & pratiques', ar: 'الأدوات والممارسات' }, tags: ['REST APIs', 'MVC', 'Git', 'GitHub', 'Axios'] },
];

export type Project = {
  title: string; caption: string; color: string; image?: string;
  live?: string; github?: string; tags: string[]; points: string[];
};
type ProjectSrc = Omit<Project, 'title' | 'caption' | 'points'> & { title: L3<string>; caption: L3<string>; points: L3<string[]> };

// Used when Supabase is not configured. image: a file in /public/images/ or any https URL.
// Add as many projects as you like: the first 4 show, the rest appear behind a "Show more" button.
const PROJECTS: ProjectSrc[] = [
  { color: '#BEF264', image: '/images/school.svg', live: '#', github: '#', tags: ['Next.js', 'Laravel', 'MySQL', 'Tailwind CSS', 'shadcn/ui'],
    title: { en: 'School Management Platform', fr: 'Plateforme de gestion scolaire', ar: 'منصة تدبير المؤسسة التعليمية' },
    caption: { en: 'Admin · Teacher · Student · Parent', fr: 'Admin · Enseignant · Élève · Parent', ar: 'مدير · أستاذ · تلميذ · ولي أمر' },
    points: {
      en: ['REST API with Laravel Sanctum authentication', 'Role-based access (Admin, Teacher, Student, Parent)', 'Relational data model linking students, parents and users', 'Responsive UI with Tailwind CSS and shadcn/ui; forms validated with React Hook Form and Zod'],
      fr: ['REST API avec authentification Laravel Sanctum', 'Accès par rôles (Admin, Enseignant, Élève, Parent)', 'Modèle de données relationnel reliant élèves, parents et utilisateurs', 'Interface responsive avec Tailwind CSS et shadcn/ui ; formulaires validés avec React Hook Form et Zod'],
      ar: ['REST API مع مصادقة Laravel Sanctum', 'صلاحيات حسب الدور (مدير، أستاذ، تلميذ، ولي أمر)', 'نموذج بيانات علائقي يربط التلاميذ وأولياء الأمور والمستخدمين', 'واجهة متجاوبة بـ Tailwind CSS وshadcn/ui مع نماذج يتم التحقق منها بـ React Hook Form وZod'],
    } },
  { color: '#FDE047', image: '/images/trainee.svg', live: '#', github: '#', tags: ['Laravel', 'PHP', 'MySQL', 'Eloquent ORM'],
    title: { en: 'Trainee Management Application', fr: 'Application de gestion des stagiaires', ar: 'تطبيق تدبير المتدربين' },
    caption: { en: 'MVC · CRUD · Eloquent', fr: 'MVC · CRUD · Eloquent', ar: 'MVC · CRUD · Eloquent' },
    points: {
      en: ['MVC architecture with complete CRUD operations', 'Strict data validation', 'Relational data handled with Eloquent ORM', 'Secure routing system'],
      fr: ['Architecture MVC avec opérations CRUD complètes', 'Validation stricte des données', 'Données relationnelles gérées avec Eloquent ORM', 'Système de routage sécurisé'],
      ar: ['معمارية MVC مع عمليات CRUD كاملة', 'تحقق صارم من البيانات', 'إدارة البيانات العلائقية عبر Eloquent ORM', 'نظام توجيه آمن'],
    } },
];

export const localProjects = (l: Lang): Project[] =>
  PROJECTS.map((p) => ({ ...p, title: p.title[l], caption: p.caption[l], points: p.points[l] }));
