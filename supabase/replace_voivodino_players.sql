-- Replace all players for ФК Вихър Войводиново (club Voivodino) with the 31 players from the list.
-- Club ID: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
-- Run in Supabase SQL Editor or via: psql / supabase db execute

-- 1. Remove all existing players of this club (cascades to payment_logs and push_subscriptions)
DELETE FROM public.players
WHERE club_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

-- 2. Insert the 31 new players (name, team_group/year from your table)
-- nfc_tag_id format: vihar-{year}-{seq} for uniqueness
INSERT INTO public.players (club_id, full_name, nfc_tag_id, status, team_group, last_payment_date)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Стоян Иванов',           'vihar-2012-1', 'paid', 2012, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Стоян Воденичаров',      'vihar-2012-2', 'paid', 2012, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Петьо Асърджийски',      'vihar-2012-3', 'paid', 2012, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Мартин Христев',         'vihar-2012-4', 'paid', 2012, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Андрей Андреев',         'vihar-2013-1', 'paid', 2013, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Димитър Найденов',       'vihar-2014-1', 'paid', 2014, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Николай Добринов',       'vihar-2014-2', 'paid', 2014, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Николай Митев',          'vihar-2014-3', 'paid', 2014, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Димитър Ефтимов',        'vihar-2014-4', 'paid', 2014, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Емануел Кисьов',         'vihar-2014-5', 'paid', 2014, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Димитър Колев',          'vihar-2015-1', 'paid', 2015, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Георги Тодовичин',       'vihar-2015-2', 'paid', 2015, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Михаил Ковашки',         'vihar-2016-1', 'paid', 2016, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Петко Димитров',         'vihar-2016-2', 'paid', 2016, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Алекс Гърдев',           'vihar-2017-1', 'paid', 2017, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Божидар Нечев',           'vihar-2017-2', 'paid', 2017, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Георги Видков',          'vihar-2017-3', 'paid', 2017, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Йоан Митев',             'vihar-2018-1', 'paid', 2018, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Данимир Спасов',         'vihar-2018-2', 'paid', 2018, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Емил Йорданов',          'vihar-2018-3', 'paid', 2018, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Божидар Арбов',          'vihar-2019-1', 'paid', 2019, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Димитър Бофиров',        'vihar-2019-2', 'paid', 2019, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Теодор Димов',           'vihar-2019-3', 'paid', 2019, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Петко Делов',            'vihar-2020-1', 'paid', 2020, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ивайло Чокойски',        'vihar-2020-2', 'paid', 2020, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Кристиан Каламов',       'vihar-2020-3', 'paid', 2020, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Захари Господинов',      'vihar-2020-4', 'paid', 2020, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Пламен Политов',         'vihar-2020-5', 'paid', 2020, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Костадин Танев',         'vihar-2021-1', 'paid', 2021, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Лъчезар Русев',          'vihar-2021-2', 'paid', 2021, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Матео Чакракчиев',       'vihar-2021-3', 'paid', 2021, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Александър Вълчев',       'vihar-2021-4', 'paid', 2021, now());
