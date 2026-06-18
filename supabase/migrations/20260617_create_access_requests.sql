create table if not exists public.access_requests (
  id           bigserial primary key,
  name         text not null,
  email        text not null,
  company      text not null,
  role         text not null,
  aum_range    text not null,
  interest     text,
  submitted_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  constraint access_requests_email_unique unique (email)
);

create index if not exists access_requests_email_idx on public.access_requests (email);
create index if not exists access_requests_submitted_idx on public.access_requests (submitted_at desc);

alter table public.access_requests enable row level security;

create policy "service role only" on public.access_requests
  using (auth.role() = 'service_role');
