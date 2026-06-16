create table if not exists public.waitlist (
  id          bigserial primary key,
  email       text not null,
  submitted_at timestamptz not null default now(),
  created_at  timestamptz not null default now(),
  constraint waitlist_email_unique unique (email)
);

-- Index for fast lookups by email
create index if not exists waitlist_email_idx on public.waitlist (email);

-- Row-level security
alter table public.waitlist enable row level security;

-- Only the service role can read/write
create policy "service role only" on public.waitlist
  using (auth.role() = 'service_role');
