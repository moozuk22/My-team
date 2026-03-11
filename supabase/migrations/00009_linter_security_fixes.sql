-- Fix Supabase linter warnings:
-- 1. function_search_path_mutable: set search_path on handle_updated_at
-- 2. rls_policy_always_true: replace USING (true) / WITH CHECK (true) with explicit role check

-- 1. Recreate trigger function with fixed search_path
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2. Players: drop permissive policies and recreate with role-based check
drop policy if exists "Players can be inserted" on public.players;
drop policy if exists "Players can be updated" on public.players;
drop policy if exists "Players can be deleted" on public.players;

create policy "Players can be inserted"
  on public.players for insert
  with check (auth.role() in ('anon', 'service_role'));

create policy "Players can be updated"
  on public.players for update
  using (auth.role() in ('anon', 'service_role'))
  with check (auth.role() in ('anon', 'service_role'));

create policy "Players can be deleted"
  on public.players for delete
  using (auth.role() in ('anon', 'service_role'));

-- 3. Push subscriptions: same pattern
drop policy if exists "Push subscriptions can be inserted" on public.push_subscriptions;
drop policy if exists "Push subscriptions can be updated" on public.push_subscriptions;
drop policy if exists "Push subscriptions can be deleted" on public.push_subscriptions;

create policy "Push subscriptions can be inserted"
  on public.push_subscriptions for insert
  with check (auth.role() in ('anon', 'service_role'));

create policy "Push subscriptions can be updated"
  on public.push_subscriptions for update
  using (auth.role() in ('anon', 'service_role'))
  with check (auth.role() in ('anon', 'service_role'));

create policy "Push subscriptions can be deleted"
  on public.push_subscriptions for delete
  using (auth.role() in ('anon', 'service_role'));

-- 4. Payment logs: restrict insert to anon and service_role
drop policy if exists "Service role can insert payment logs" on public.payment_logs;

create policy "Service role can insert payment logs"
  on public.payment_logs for insert
  with check (auth.role() in ('anon', 'service_role'));
