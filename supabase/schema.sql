-- =========================================================
-- NK Bibinje — članarine i donacije (Supabase / PostgreSQL)
-- Pokrenuti jednom: Supabase → SQL Editor → zalijepiti cijelu datoteku → Run.
-- Pravila pristupa (RLS):
--   * administratori kluba (tablica admins) vide i uređuju sve
--   * roditelj vidi samo djecu uz koju je upisan njegov e-mail i njihove uplate
-- =========================================================

create extension if not exists pgcrypto;

-- Administratori (tajnik, blagajnik…) — upisuju se e-mail adrese
create table if not exists public.admins (
  email text primary key check (email = lower(email))
);

-- Članovi (djeca i igrači). member_no je dio poziva na broj (npr. 245-202611).
create sequence if not exists public.member_no_seq start 101;
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  member_no integer not null unique default nextval('public.member_no_seq'),
  team_key text not null check (team_key in ('seniori','pioniri','mladji-pioniri','tici','papaline')),
  first_name text not null,
  last_name text not null,
  birth_year integer,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Roditelji/skrbnici: e-mail s kojim se prijavljuju u aplikaciju
create table if not exists public.member_guardians (
  member_id uuid not null references public.members(id) on delete cascade,
  email text not null check (email = lower(email)),
  primary key (member_id, email)
);

-- Uplate članarine: jedan red = jedan mjesec jednog člana
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  period text not null check (period ~ '^\d{4}-(0[1-9]|1[0-2])$'),
  amount numeric(10,2) not null,
  paid_on date not null,
  source text not null check (source in ('izvod','rucno')),
  note text,
  import_key text unique,
  created_at timestamptz not null default now(),
  unique (member_id, period)
);

-- Donacije
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  amount numeric(10,2) not null,
  paid_on date not null,
  payer text,
  note text,
  source text not null check (source in ('izvod','rucno')),
  import_key text unique,
  created_at timestamptz not null default now()
);

-- Pomoćne funkcije (security definer: rade i kad RLS skriva tablice)
create or replace function public.current_email() returns text
language sql stable as $$ select lower(coalesce(auth.jwt() ->> 'email', '')) $$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where email = public.current_email())
$$;

create or replace function public.is_guardian_of(m uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.member_guardians g where g.member_id = m and g.email = public.current_email())
$$;

alter table public.admins enable row level security;
alter table public.members enable row level security;
alter table public.member_guardians enable row level security;
alter table public.payments enable row level security;
alter table public.donations enable row level security;

drop policy if exists admins_self on public.admins;
create policy admins_self on public.admins for select using (email = public.current_email() or public.is_admin());

drop policy if exists members_admin on public.members;
create policy members_admin on public.members for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists members_guardian on public.members;
create policy members_guardian on public.members for select using (public.is_guardian_of(id));

drop policy if exists guardians_admin on public.member_guardians;
create policy guardians_admin on public.member_guardians for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists guardians_self on public.member_guardians;
create policy guardians_self on public.member_guardians for select using (email = public.current_email());

drop policy if exists payments_admin on public.payments;
create policy payments_admin on public.payments for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists payments_guardian on public.payments;
create policy payments_guardian on public.payments for select using (public.is_guardian_of(member_id));

drop policy if exists donations_admin on public.donations;
create policy donations_admin on public.donations for all using (public.is_admin()) with check (public.is_admin());

-- Zahtjevi roditelja za upis djeteta: vidi 02-zahtjevi.sql (pokrenuti i nju)

-- Prvi administrator (zamijeniti e-mailom tajnika/blagajnika i pokrenuti):
-- insert into public.admins (email) values ('tajnik@primjer.hr');
