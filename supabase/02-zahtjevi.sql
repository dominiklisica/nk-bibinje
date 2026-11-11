-- =========================================================
-- Zahtjevi roditelja za upis djeteta (dodano 11. 11. 2026.)
-- Pokrenuti jednom: Supabase → SQL Editor → zalijepiti → Run.
-- Roditelj nakon prijave (potvrđen e-mail) pošalje zahtjev; klub ga u /klub → Zahtjevi
-- potvrdi (doda dijete u evidenciju) ili odbije.
-- =========================================================

create table if not exists public.join_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null check (email = lower(email)),
  child_name text not null check (char_length(child_name) between 3 and 100),
  parent_name text not null check (char_length(parent_name) between 3 and 100),
  status text not null default 'novo' check (status in ('novo', 'odobreno', 'odbijeno')),
  created_at timestamptz not null default now()
);

-- Isti roditelj ne može dvaput poslati otvoreni zahtjev za isto dijete
create unique index if not exists join_requests_open_unique
  on public.join_requests (email, lower(child_name)) where status = 'novo';

alter table public.join_requests enable row level security;

drop policy if exists join_requests_admin on public.join_requests;
create policy join_requests_admin on public.join_requests
  for all using (public.is_admin()) with check (public.is_admin());

-- Roditelj šalje zahtjev samo sa svojim (potvrđenim) e-mailom i vidi samo svoje zahtjeve
drop policy if exists join_requests_insert_self on public.join_requests;
create policy join_requests_insert_self on public.join_requests
  for insert to authenticated with check (email = public.current_email() and status = 'novo');
drop policy if exists join_requests_select_self on public.join_requests;
create policy join_requests_select_self on public.join_requests
  for select using (email = public.current_email());
