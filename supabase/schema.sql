-- Run this in Supabase SQL Editor before adding VITE_SUPABASE_URL and
-- VITE_SUPABASE_ANON_KEY to your local .env file.

create table if not exists public.events (
  id text primary key,
  title text not null,
  subtitle text default '',
  category text default 'workshop',
  date text default '',
  month text default '',
  day text default '',
  year text default '',
  location text default '',
  teams_or_attendees text default '',
  description text default '',
  is_upcoming boolean default false,
  link text default '',
  image text default '',
  gallery_images jsonb default '[]'::jsonb,
  highlights jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.family_members (
  id text primary key,
  name text not null,
  role text default '',
  category text default 'technical',
  department text default '',
  image text default '',
  initials text default '',
  linkedin text,
  github text,
  quote text default '',
  created_at timestamptz default now()
);

alter table public.events enable row level security;
alter table public.family_members enable row level security;

create policy "public can read events" on public.events for select using (true);
create policy "public can read family" on public.family_members for select using (true);
-- Add authenticated-only insert/update/delete policies when Supabase Auth is enabled.
