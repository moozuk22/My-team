-- Smart Club: Full schema
-- Combines migrations 00001–00008 for a fresh project.

-- 1. Enum and core tables (00001)
create type player_status as enum ('paid', 'warning', 'overdue');

create table public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.players (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  full_name text not null,
  nfc_tag_id text not null unique,
  status player_status not null default 'paid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_players_nfc_tag_id on public.players(nfc_tag_id);
create index idx_players_club_id on public.players(club_id);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_players_updated
  before update on public.players
  for each row
  execute function public.handle_updated_at();

alter table public.clubs enable row level security;
alter table public.players enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.players for select using (true);
create policy "Clubs are viewable by everyone"
  on public.clubs for select using (true);
create policy "Players can be inserted" on public.players for insert with check (true);
create policy "Players can be updated" on public.players for update using (true);
create policy "Players can be deleted" on public.players for delete using (true);

alter publication supabase_realtime add table public.players;

-- Seed (optional)
insert into public.clubs (id, name, slug)
values ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'ФК Вихър Войводиново', 'vihar')
on conflict (id) do nothing;

insert into public.players (id, club_id, full_name, nfc_tag_id, status)
values (
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Демо Играч',
  'vihar_01',
  'paid'
)
on conflict (id) do nothing;

-- 2. Push subscriptions (00002)
create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);
create index idx_push_subscriptions_player_id on public.push_subscriptions(player_id);
alter table public.push_subscriptions enable row level security;
create policy "Push subscriptions are viewable by everyone" on public.push_subscriptions for select using (true);
create policy "Push subscriptions can be inserted" on public.push_subscriptions for insert with check (true);
create policy "Push subscriptions can be updated" on public.push_subscriptions for update using (true);
create policy "Push subscriptions can be deleted" on public.push_subscriptions for delete using (true);

-- 3. Player card fields (00003) — add as integer for team_group to avoid extra migration
alter table public.players
  add column if not exists jersey_number text,
  add column if not exists birth_date date,
  add column if not exists team_group integer,
  add column if not exists last_payment_date timestamptz;

-- 4. Player avatar (00004)
alter table public.players add column if not exists avatar_url text;

-- 5. Club emblem (00005)
alter table public.clubs add column if not exists emblem_url text;

-- 6. payment_logs (00008)
create table if not exists public.payment_logs (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  paid_for text not null,
  paid_at timestamptz not null default now(),
  recorded_by text not null default 'admin'
);
alter table public.payment_logs enable row level security;
create policy "Payment logs are publicly readable" on public.payment_logs for select using (true);
create policy "Service role can insert payment logs" on public.payment_logs for insert with check (true);

-- 7. Storage avatars bucket (00007)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible"
  on storage.objects for select using (bucket_id = 'avatars');
create policy "Anyone can upload avatars"
  on storage.objects for insert with check (bucket_id = 'avatars');
create policy "Anyone can update avatars"
  on storage.objects for update using (bucket_id = 'avatars');

-- Update seed player with card fields (00003 seed)
update public.players
set
  jersey_number = '№14',
  birth_date = '2016-08-18',
  team_group = 2016,
  last_payment_date = now()
where id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22';
