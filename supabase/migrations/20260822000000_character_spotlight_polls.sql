-- [Zapia] Claude AI — reusable Character Spotlight polls, 2026-08-22
-- Apply in Supabase SQL editor or CLI before enabling the browser client.
create extension if not exists pgcrypto;

create table if not exists public.character_spotlight_polls (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  character_slug text not null,
  question text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) between 2 and 12),
  status text not null default 'open' check (status in ('draft','open','closed')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.character_spotlight_poll_votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.character_spotlight_polls(id) on delete cascade,
  voter_key text not null check (length(voter_key) between 16 and 128),
  option_key text not null check (length(option_key) between 1 and 64),
  created_at timestamptz not null default timezone('utc', now()),
  unique (poll_id, voter_key)
);

create index if not exists character_spotlight_poll_votes_poll_idx
  on public.character_spotlight_poll_votes (poll_id);

create or replace function public.set_character_spotlight_poll_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = timezone('utc', now()); return new; end; $$;
drop trigger if exists character_spotlight_polls_updated_at on public.character_spotlight_polls;
create trigger character_spotlight_polls_updated_at before update on public.character_spotlight_polls
for each row execute function public.set_character_spotlight_poll_updated_at();

create or replace view public.character_spotlight_poll_results as
select p.slug, p.character_slug, p.question, p.options, p.status,
       coalesce(jsonb_object_agg(coalesce(v.option_key, ''), v.vote_count) filter (where v.option_key is not null), '{}'::jsonb) as counts,
       count(v.id)::integer as total_votes
from public.character_spotlight_polls p
left join (select poll_id, option_key, count(*)::integer as vote_count
           from public.character_spotlight_poll_votes group by poll_id, option_key) v on v.poll_id = p.id
group by p.id, p.slug, p.character_slug, p.question, p.options, p.status;

alter table public.character_spotlight_polls enable row level security;
alter table public.character_spotlight_poll_votes enable row level security;

drop policy if exists "public can read open spotlight polls" on public.character_spotlight_polls;
create policy "public can read open spotlight polls" on public.character_spotlight_polls for select to anon, authenticated using (status = 'open');
-- Votes are never directly readable or writable by the browser role.
drop policy if exists "public can read spotlight results" on public.character_spotlight_poll_votes;

create or replace function public.cast_character_spotlight_vote(poll_slug text, selected_option text, browser_voter_key text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare p character_spotlight_polls%rowtype; inserted boolean;
begin
  if browser_voter_key is null or length(browser_voter_key) < 16 or length(browser_voter_key) > 128 then raise exception 'invalid voter key'; end if;
  select * into p from character_spotlight_polls where slug = poll_slug and status = 'open';
  if not found then raise exception 'poll unavailable'; end if;
  if not exists (select 1 from jsonb_array_elements(p.options) o where o->>'key' = selected_option) then raise exception 'invalid option'; end if;
  insert into character_spotlight_poll_votes(poll_id, voter_key, option_key) values (p.id, browser_voter_key, selected_option)
    on conflict (poll_id, voter_key) do update set option_key = excluded.option_key, created_at = timezone('utc', now());
  return jsonb_build_object('slug', p.slug, 'saved', true);
end; $$;
revoke all on function public.cast_character_spotlight_vote(text,text,text) from public;
grant execute on function public.cast_character_spotlight_vote(text,text,text) to anon, authenticated;
grant select on public.character_spotlight_poll_results to anon, authenticated;

insert into public.character_spotlight_polls(slug, character_slug, question, options)
values ('loki-one-piece-role', 'loki-one-piece', 'How should Loki’s role develop?', '[{"key":"A","label":"Ally of the Straw Hats"},{"key":"B","label":"Independent Elbaf force"},{"key":"C","label":"Too early to call"}]'::jsonb)
on conflict (slug) do nothing;
