-- submitted_at duplicates created_at (DB-set default) — drop it from both tables
alter table public.waitlist drop column if exists submitted_at;
alter table public.access_requests drop column if exists submitted_at;

-- Recreate the sort index on created_at (was on submitted_at)
drop index if exists access_requests_submitted_idx;
create index if not exists access_requests_created_at_idx on public.access_requests (created_at desc);
