-- Step 2: Consolidate waitlist + access_requests into a single leads table
create table if not exists public.leads (
  id         bigserial primary key,
  email      text not null unique,
  type       text not null check (type in ('waitlist', 'access_request')),
  name       text,
  company    text,
  role       text,
  aum_range  text,
  interest   text,
  created_at timestamptz not null default now()
);

create index if not exists leads_email_idx      on public.leads (email);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_type_idx       on public.leads (type);

alter table public.leads enable row level security;

create policy "service role only" on public.leads
  using (auth.role() = 'service_role');

-- Migrate existing waitlist entries
insert into public.leads (email, type, created_at)
select email, 'waitlist', created_at
from public.waitlist
on conflict (email) do nothing;

-- Migrate access_requests — overrides waitlist entry for same email
insert into public.leads (email, type, name, company, role, aum_range, interest, created_at)
select email, 'access_request', name, company, role, aum_range, interest, created_at
from public.access_requests
on conflict (email) do update set
  type      = excluded.type,
  name      = excluded.name,
  company   = excluded.company,
  role      = excluded.role,
  aum_range = excluded.aum_range,
  interest  = excluded.interest;

-- Drop old tables (data is now in leads)
drop table if exists public.access_requests;
drop table if exists public.waitlist;
