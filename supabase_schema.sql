-- ==============================================================================
-- UPES HYPERVISION PRODUCTION SUPABASE SCHEMA
-- Tables: events, family_members
-- Configured for high-speed read/write via Supabase REST API & Vercel deployment.
-- ==============================================================================

-- 1. DROP EXISTING TABLES IF RE-CREATING (OPTIONAL)
-- drop table if exists public.events cascade;
-- drop table if exists public.family_members cascade;

-- ==============================================================================
-- 2. CREATE `events` TABLE
-- ==============================================================================
create table if not exists public.events (
  id text primary key,
  title text not null,
  subtitle text default '',
  category text not null default 'hackathon',
  date text not null,
  month text not null,
  day text default '',
  year text not null,
  location text default 'MAC Auditorium, UPES Bidholi',
  teams_or_attendees text default '',
  description text default '',
  is_upcoming boolean default false,
  link text default '',
  image text not null default '/events/code_hustle.webp',
  gallery_images text[] default '{}',
  highlights text[] default '{}',
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 3. CREATE `family_members` TABLE
-- ==============================================================================
create table if not exists public.family_members (
  id text primary key,
  name text not null,
  role text not null,
  category text not null default 'technical', -- 'faculty', 'executive', 'technical', 'design', 'operations', 'outreach'
  department text default '',
  image text default '',
  initials text default '',
  linkedin text default '',
  github text default '',
  quote text default '',
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.events enable row level security;
alter table public.family_members enable row level security;

-- Public read access (Allows live website on Vercel to read events & board roster)
create policy "Public read access for events"
  on public.events
  for select
  using (true);

create policy "Public read access for family_members"
  on public.family_members
  for select
  using (true);

-- Full access for Admin Studio via anon key & authenticated users
create policy "Allow insert, update, delete for events"
  on public.events
  for all
  using (true)
  with check (true);

create policy "Allow insert, update, delete for family_members"
  on public.family_members
  for all
  using (true)
  with check (true);

-- ==============================================================================
-- 5. INITIAL SEED DATA FOR `events`
-- ==============================================================================
insert into public.events (id, title, subtitle, category, date, month, day, year, location, teams_or_attendees, description, is_upcoming, link, image, highlights, order_index)
values
  (
    'code-hustle-flagship',
    'Code Hustle 24-Hour Hackathon',
    'Annual Flagship 24-Hour Software Marathon',
    'hackathon',
    'November 14, 2026',
    'NOV',
    '14',
    '2026',
    'MAC Auditorium, UPES Bidholi',
    '60+ Finalist Teams',
    'The premier 24-hour hackathon hosted by UPES Hypervision. Teams build intensive full-stack, AI, and cybersecurity prototypes evaluated continuously with live leaderboard ranking.',
    true,
    'https://code-hustle-11.vercel.app/',
    '/events/code_hustle.webp',
    array['24-Hour Live Sprint', 'Automated Rubric Arbitration', 'MAC Auditorium'],
    0
  ),
  (
    'sih-internal-round',
    'Internal Smart India Hackathon (UPES Round)',
    'Official National Qualifier',
    'hackathon',
    'September 2025',
    'SEP',
    '20',
    '2025',
    'School of Computer Science, UPES',
    '330+ Competing Teams',
    'The Internal Smart India Hackathon organized by Hypervision serves as the official UPES round for the national-level Smart India Hackathon. Over 330 teams brainstorm and prototype under time-bound conditions.',
    false,
    '',
    '/events/sih_poster.webp',
    array['330+ Competing Teams', 'Official National Qualifier', 'Multi-Jury Matrix'],
    1
  ),
  (
    'drone-tech-bootcamp',
    'Drone Tech Bootcamp (With NIT Kurukshetra)',
    'Under MeitY''s SwaYaan Initiative',
    'bootcamp',
    'April 2025',
    'APR',
    '15',
    '2025',
    'Avionics Research Lab, UPES Bidholi',
    '120+ Student Engineers',
    'A multi-day hands-on technical program conducted in collaboration with NIT Kurukshetra under MeitY’s SwaYaan initiative. Practical exposure through flight sessions and dedicated hardware kits.',
    false,
    '',
    '/events/drone_tech.webp',
    array['NIT Kurukshetra Partnership', 'MeitY SwaYaan Program', 'Hands-on Flight Testbed'],
    2
  ),
  (
    'pehchaan-tech-fest',
    'Pehchaan - Annual Tech & Career Fest',
    'Job Battle, Dragons'' Den & Expert Panels',
    'symposium',
    'February 2025',
    'FEB',
    '28',
    '2025',
    'Auditorium Complex, UPES Dehradun',
    '450+ Attendees',
    'Pehchaan is Hypervision''s annual tech and career fest blending technology, creativity, and professional exposure. Activities include Job Battle, Dragons’ Den, and competitive coding.',
    false,
    '',
    '/events/pehchaan.webp',
    array['Dragons'' Den Pitches', 'Mock Corporate Placements', '450+ Attendees'],
    3
  ),
  (
    'avritti-connect',
    'Avritti - Alumni Connect',
    'Career Mentorship & Industry Insights',
    'workshop',
    'November 2024',
    'NOV',
    '18',
    '2024',
    'School of Computer Science, UPES',
    '250+ Participants',
    'Avritti strengthens the bond between current students and former members. Alumni share their professional journeys, tech talks, and internship guidance.',
    false,
    '',
    '/events/avritti_1.webp',
    array['Alumni Network', 'Career Advisory', '250+ Attendees'],
    4
  ),
  (
    'code-connect-series',
    'Code Connect & Code Arcade',
    'Hands-on AI/ML, DSA & Software Tracks',
    'workshop',
    'August 2024',
    'AUG',
    '10',
    '2024',
    'Computer Labs 3 & 4, UPES Bidholi',
    '180+ Developers',
    'Code Connect and Code Arcade are learning-focused initiatives designed to enhance students’ skills across AI, Machine Learning, and Data Structures.',
    false,
    '',
    '/events/code_connect.webp',
    array['Hands-on Lab Tracks', 'Algorithms & Systems', '180+ Developers'],
    5
  )
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  category = excluded.category,
  date = excluded.date,
  month = excluded.month,
  day = excluded.day,
  year = excluded.year,
  location = excluded.location,
  teams_or_attendees = excluded.teams_or_attendees,
  description = excluded.description,
  is_upcoming = excluded.is_upcoming,
  link = excluded.link,
  image = excluded.image,
  highlights = excluded.highlights,
  order_index = excluded.order_index;

-- ==============================================================================
-- 6. INITIAL SEED DATA FOR `family_members`
-- ==============================================================================
insert into public.family_members (id, name, role, category, department, image, initials, linkedin, github, quote, order_index)
values
  ('dr-virender-kadyan', 'Dr. Virender Kadyan', 'Faculty Advisor', 'faculty', 'School of Computer Science, UPES Dehradun', '/team/virender_kadyan.webp', 'VK', 'https://www.linkedin.com/in/virender-kadyan-b9bb161a4/', null, 'Innovation without execution is hallucination. Ship real code.', 0),
  ('dr-bhavana-kaushik', 'Dr. Bhavana Kaushik', 'Faculty Coordinator', 'faculty', 'School of Computer Science, UPES Dehradun', '/team/bhavana_kaushik.webp', 'BK', 'https://www.linkedin.com/in/bhavana-kaushik-1788b523/', null, 'Nurturing student engineers into industry-ready leaders.', 1),
  ('purva', 'Purva', 'President', 'executive', 'Apex Executive Council', '/team/purva.webp', 'P', 'https://www.linkedin.com/in/purva-sachan-b65792243/', null, 'Make the work impossible to ignore.', 2),
  ('priya-mehta', 'Priya Mehta', 'Vice-President', 'executive', 'Apex Executive Council', '', 'PM', 'https://www.linkedin.com/in/priya-mehta-97a159265/', null, 'The best ideas become real when people build together.', 3),
  ('divyanshu-gaur', 'Divyanshu Gaur', 'General Secretary', 'executive', 'Organizational Affairs', '/team/divyanshu_gaur.webp', 'DG', 'https://www.linkedin.com/in/divyanshu-gaur-29b19b28b/', null, 'Stay curious. Ship often. Keep the bar high.', 4),
  ('praanjal-jain', 'Praanjal Jain', 'Treasurer', 'executive', 'Finance & Resource Management', '/team/praanjal_jain.webp', 'PJ', 'https://www.linkedin.com/in/praanjal-jain-673327291/', null, 'Resource allocation that enables fearless experimentation.', 5),
  ('harsh-kamboj', 'Harsh Kamboj', 'Workflow Supervisor', 'executive', 'Operational Integrity', '/team/harsh_kamboj.webp', 'HK', 'https://www.linkedin.com/in/harsh-kamboj-49959628a/', null, 'Smooth pipelines create unstoppable teams.', 6),
  ('manan-arora', 'Manan Arora', 'Strategic Branding Head', 'executive', 'Brand & Community Identity', '/team/manan_arora.webp', 'MA', 'https://www.linkedin.com/in/manan-arora-06406927a/', null, 'Every touchpoint tells the story of what we build.', 7),
  ('yash-gupta', 'Yash Gupta', 'Tech Visionary', 'technical', 'Software & Distributed Systems', '/team/yash_gupta.webp', 'YG', 'https://www.linkedin.com/in/yash-gupta-2b7405230/', 'https://github.com/upes-hypervision', 'Zero slide decks. If you can''t demo it live, it doesn''t exist.', 8),
  ('om-agarwal', 'Om Agarwal', 'Technical Head', 'technical', 'Platform Infrastructure', '/team/om_agarwal.webp', 'OA', 'https://www.linkedin.com/in/om-agarwal-0046b8290/', 'https://github.com/upes-hypervision', 'High uptime under real competition traffic is the only metric.', 9),
  ('atharv-pandey', 'Atharv Pandey', 'Technical Head', 'technical', 'Autonomous Avionics & Robotics', '/team/atharv_pandey.webp', 'AP', 'https://www.linkedin.com/in/atharv-pandey-881b21260/', 'https://github.com/upes-hypervision', 'Firmware on the edge with NIT Kurukshetra and MeitY.', 10),
  ('tanish-khandelwal', 'Tanish Khandelwal', 'Associate Technical Head', 'technical', 'Systems Engineering', '/team/tanish_khandelwal.webp', 'TK', 'https://www.linkedin.com/in/tanish-khandelwal-86a074288/', 'https://github.com/upes-hypervision', 'Building fast, testing hard, learning relentlessly.', 11),
  ('saksham-srivastava', 'Saksham Srivastava', 'Associate Technical Head', 'technical', 'Full-Stack Architecture', '/team/saksham_srivastava.webp', 'SS', 'https://www.linkedin.com/in/saksham-srivastava-b2354728b/', 'https://github.com/upes-hypervision', 'Clean architecture speeds up everything downstream.', 12),
  ('akshat-agarwal', 'Akshat Agarwal', 'Design Head', 'design', 'Visual & Interface Engineering', '/team/akshat_agarwal.webp', 'AA', 'https://www.linkedin.com/in/akshat-agarwal-166258284/', null, 'Interfaces should feel physical, tactile, and alive.', 13),
  ('misha', 'Misha', 'Associate Design Head', 'design', 'Brand Assets & Illustration', '/team/misha.webp', 'M', 'https://www.linkedin.com/in/misha-srivastava-153494291/', null, 'Detail is not the decoration, it is the product.', 14),
  ('jahnavi-sengar', 'Jahanvi Sengar', 'Associate Editorial Head', 'design', 'Editorial & Communications', '', 'JS', 'https://www.linkedin.com/in/jahanvi-sengar-625892289/', null, 'Clarity of thought precedes clarity of code.', 15),
  ('pramansh-praveen', 'Pramansh Praveen', 'Social Media Manager', 'design', 'Digital Media', '', 'PP', 'https://www.linkedin.com/in/pramansh-praveen-5b692028b/', null, 'Show the work as it happens, unpolished and real.', 16),
  ('manasvi-soni', 'Manasvi Soni', 'Associate Social Media Manager', 'design', 'Public Communications', '/team/manasvi_soni.webp', 'MS', 'https://www.linkedin.com/in/manasvi-soni-935105327/', null, 'Stay curious. Ship often. Keep the bar high.', 17),
  ('priyal-sharma', 'Priyal Sharma', 'PR Head', 'operations', 'Public Relations & Outreach', '/team/priyal_sharma.webp', 'PS', 'https://www.linkedin.com/in/priyal-sharma-6878b6289/', null, 'Connecting student engineering with industry opportunities.', 18),
  ('abhay-sachan', 'Abhay Sachan', 'Associate PR Head', 'operations', 'Community Outreach', '/team/abhay_sachan.webp', 'AS', 'https://www.linkedin.com/in/abhay-sachan-7080b0289/', null, 'Bringing builders into the arena.', 19),
  ('preksha-grover', 'Preksha Grover', 'Associate PR Head', 'operations', 'Media & Partner Relations', '/team/preksha.webp', 'PG', 'https://www.linkedin.com/in/preksha-grover-227495291/', null, 'Partnerships that actually fuel student projects.', 20),
  ('pranav-r-nair', 'Pranav R Nair', 'Associate Events Head', 'operations', 'Hackathon Operations', '/team/pranav_r_nair.webp', 'PN', 'https://www.linkedin.com/in/pranav-r-nair-5b206728b/', null, 'Running 24-hour sprints with zero downtime.', 21),
  ('namami-pandey', 'Namami Pandey', 'Associate Events Head', 'operations', 'Stage & Venue Production', '/team/namami_pandey.webp', 'NP', 'https://www.linkedin.com/in/namami-pandey-882208287/', null, 'The arena where builders present to the world.', 22),
  ('siddhant-gupta', 'Siddhant Gupta', 'Events Head', 'operations', 'Logistics & Execution', '', 'SG', 'https://www.linkedin.com/in/siddhant-gupta-224495287/', null, 'Executing high-throughput university competitions.', 23)
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  category = excluded.category,
  department = excluded.department,
  image = excluded.image,
  initials = excluded.initials,
  linkedin = excluded.linkedin,
  github = excluded.github,
  quote = excluded.quote,
  order_index = excluded.order_index;
