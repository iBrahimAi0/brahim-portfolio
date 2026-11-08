-- Run in Supabase: SQL Editor -> New query -> paste -> Run
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,          -- order on the page (1, 2, 3...)
  color text default '#BEF264',
  image text,                               -- /images/file.png or an https URL
  live_url text,
  github_url text,
  tags text[] default '{}',
  title_en text not null, title_fr text, title_ar text,
  caption_en text, caption_fr text, caption_ar text,
  points_en text[] default '{}', points_fr text[] default '{}', points_ar text[] default '{}',
  created_at timestamptz default now()
);
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, subject text not null, message text not null,
  created_at timestamptz default now()
);
alter table projects enable row level security;
alter table contact_messages enable row level security;
create policy "public can read projects" on projects for select using (true);
create policy "anyone can send a message" on contact_messages for insert with check (true);

insert into projects (position,color,image,live_url,github_url,tags,title_en,title_fr,title_ar,caption_en,caption_fr,caption_ar,points_en,points_fr,points_ar) values
(1,'#BEF264','/images/school.svg','#','#',array['Next.js','Laravel','MySQL','Tailwind CSS','shadcn/ui'],
 'School Management Platform','Plateforme de gestion scolaire','منصة تدبير المؤسسة التعليمية',
 'Admin · Teacher · Student · Parent','Admin · Enseignant · Élève · Parent','مدير · أستاذ · تلميذ · ولي أمر',
 array['REST API with Laravel Sanctum authentication','Role-based access (Admin, Teacher, Student, Parent)','Relational data model linking students, parents and users','Responsive UI with Tailwind CSS and shadcn/ui; forms validated with React Hook Form and Zod'],
 array['REST API avec authentification Laravel Sanctum','Accès par rôles (Admin, Enseignant, Élève, Parent)','Modèle de données relationnel reliant élèves, parents et utilisateurs','Interface responsive avec Tailwind CSS et shadcn/ui ; formulaires validés avec React Hook Form et Zod'],
 array['REST API مع مصادقة Laravel Sanctum','صلاحيات حسب الدور (مدير، أستاذ، تلميذ، ولي أمر)','نموذج بيانات علائقي يربط التلاميذ وأولياء الأمور والمستخدمين','واجهة متجاوبة بـ Tailwind CSS وshadcn/ui مع نماذج يتم التحقق منها بـ React Hook Form وZod']),
(2,'#FDE047','/images/trainee.svg','#','#',array['Laravel','PHP','MySQL','Eloquent ORM'],
 'Trainee Management Application','Application de gestion des stagiaires','تطبيق تدبير المتدربين',
 'MVC · CRUD · Eloquent','MVC · CRUD · Eloquent','MVC · CRUD · Eloquent',
 array['MVC architecture with complete CRUD operations','Strict data validation','Relational data handled with Eloquent ORM','Secure routing system'],
 array['Architecture MVC avec opérations CRUD complètes','Validation stricte des données','Données relationnelles gérées avec Eloquent ORM','Système de routage sécurisé'],
 array['معمارية MVC مع عمليات CRUD كاملة','تحقق صارم من البيانات','إدارة البيانات العلائقية عبر Eloquent ORM','نظام توجيه آمن']);
