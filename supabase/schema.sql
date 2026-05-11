-- Form Identity — Supabase schema
-- Run this in the Supabase SQL editor to create the required tables.
--
-- Note: RLS should be enabled on both tables once you confirm service-role inserts work.
-- All writes come from server-side API routes using the service role key, so RLS
-- can safely be set to deny all public access (policy: deny by default, service role bypasses).

-- ─── quiz_results ─────────────────────────────────────────────────────────────
-- One row per completed quiz submission. result_slug is the shareable identifier.

create table if not exists quiz_results (
  id             uuid        primary key default gen_random_uuid(),
  result_slug    text        unique not null,
  brand_type_code text       not null,
  industry       text,
  answers        jsonb,
  axis_scores    jsonb,
  created_at     timestamptz default now()
);

create index if not exists quiz_results_brand_type_code_idx on quiz_results (brand_type_code);
create index if not exists quiz_results_industry_idx         on quiz_results (industry);
create index if not exists quiz_results_created_at_idx       on quiz_results (created_at);
create index if not exists quiz_results_result_slug_idx      on quiz_results (result_slug);

-- ─── email_captures ───────────────────────────────────────────────────────────
-- One row per email capture submission. Links back to quiz_results via result_slug.

create table if not exists email_captures (
  id             uuid        primary key default gen_random_uuid(),
  email          text        not null,
  brand_type_code text       not null,
  industry       text,
  result_slug    text,
  answers        jsonb,
  source         text        default 'result_page',
  created_at     timestamptz default now()
);

create index if not exists email_captures_brand_type_code_idx on email_captures (brand_type_code);
create index if not exists email_captures_industry_idx         on email_captures (industry);
create index if not exists email_captures_created_at_idx       on email_captures (created_at);
create index if not exists email_captures_result_slug_idx      on email_captures (result_slug);

-- ─── Enable RLS (run after confirming inserts work) ───────────────────────────
-- alter table quiz_results    enable row level security;
-- alter table email_captures  enable row level security;
-- By default this denies all public access. Service role key bypasses RLS.
