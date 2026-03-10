-- Sample data for testing: clubs (teams) + players + payment logs
-- Run in Supabase SQL Editor after apply_full_schema.sql
-- Safe to run multiple times (uses ON CONFLICT / DO NOTHING where possible)

-- ========== CLUBS (TEAMS) ==========
INSERT INTO public.clubs (id, name, slug, emblem_url)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'ФК Вихър Войводиново', 'vihar', null),
  ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'ФК Левски София', 'levski', null),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'ФК ЦСКА София', 'cska', null),
  ('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'ФК Славия София', 'slavia', null),
  ('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'ФК Лудогорец Разград', 'ludogorets', null)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug;

-- ========== PLAYERS – ФК Вихър (demo + 20 test) ==========
INSERT INTO public.players (id, club_id, full_name, nfc_tag_id, status, jersey_number, birth_date, team_group, last_payment_date, avatar_url)
VALUES
  -- Demo player (from schema seed)
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Демо Играч', 'vihar_01', 'paid', '№14', '2016-08-18', 2016, now(), null),
  -- Набор 2018
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Иван Иванов', 'test_01', 'paid', '№7', '2018-03-12', 2018, now(), null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Георги Петров', 'test_02', 'warning', '№3', '2018-07-25', 2018, now() - interval '25 days', null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Димитър Стоянов', 'test_03', 'overdue', '№11', '2018-01-08', 2018, now() - interval '50 days', null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Александър Николов', 'test_04', 'paid', '№1', '2018-11-30', 2018, now(), null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Стефан Тодоров', 'test_05', 'warning', '№9', '2018-05-14', 2018, now() - interval '20 days', null),
  -- Набор 2016
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Николай Георгиев', 'test_06', 'paid', '№10', '2016-02-19', 2016, now(), null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Красимир Димитров', 'test_07', 'overdue', '№5', '2016-09-03', 2016, now() - interval '45 days', null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Петър Василев', 'test_08', 'paid', '№22', '2016-06-11', 2016, now(), null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Мартин Колев', 'test_09', 'warning', '№8', '2016-12-28', 2016, now() - interval '18 days', null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Христо Марков', 'test_10', 'paid', '№4', '2016-04-07', 2016, now(), null),
  -- Набор 2014
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Борис Атанасов', 'test_11', 'overdue', '№17', '2014-08-22', 2014, now() - interval '60 days', null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Тодор Костов', 'test_12', 'paid', '№6', '2014-01-15', 2014, now(), null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Васил Христов', 'test_13', 'warning', '№23', '2014-10-09', 2014, now() - interval '22 days', null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Емил Борисов', 'test_14', 'paid', '№2', '2014-05-31', 2014, now(), null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Калоян Методиев', 'test_15', 'overdue', '№19', '2014-03-17', 2014, now() - interval '40 days', null),
  -- Набор 2012
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Радослав Павлов', 'test_16', 'paid', '№13', '2012-07-04', 2012, now(), null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Даниел Кирилов', 'test_17', 'warning', '№33', '2012-11-21', 2012, now() - interval '28 days', null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Момчил Стефанов', 'test_18', 'paid', '№77', '2012-02-14', 2012, now(), null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Пламен Захариев', 'test_19', 'overdue', '№15', '2012-09-08', 2012, now() - interval '55 days', null),
  (gen_random_uuid(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Светослав Младенов', 'test_20', 'paid', '№99', '2012-06-26', 2012, now(), null)
ON CONFLICT (nfc_tag_id) DO NOTHING;

-- ========== PLAYERS – other clubs (Левски, ЦСКА, Славия) ==========
INSERT INTO public.players (club_id, full_name, nfc_tag_id, status, jersey_number, birth_date, team_group, last_payment_date)
VALUES
  ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Кирил Десподов', 'levski_01', 'paid', '№9', '2003-11-11', 2003, now()),
  ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Илиян Илиев', 'levski_02', 'paid', '№10', '2004-02-02', 2004, now()),
  ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Марин Петков', 'levski_03', 'warning', '№7', '2005-05-15', 2005, now() - interval '26 days'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Георги Миланов', 'cska_01', 'paid', '№14', '2002-08-20', 2002, now()),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Тобиас Хайнце', 'cska_02', 'paid', '№5', '2003-01-10', 2003, now()),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Дуду', 'cska_03', 'overdue', '№11', '2004-07-07', 2004, now() - interval '35 days'),
  ('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Галярин Иванов', 'slavia_01', 'paid', '№17', '2001-04-12', 2001, now()),
  ('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Мартин Рангелов', 'slavia_02', 'paid', '№8', '2002-11-30', 2002, now()),
  ('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Бернард Текпетей', 'ludogorets_01', 'paid', '№10', '2000-09-03', 2000, now()),
  ('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Киръл Десподов', 'ludogorets_02', 'paid', '№9', '2003-11-11', 2003, now())
ON CONFLICT (nfc_tag_id) DO NOTHING;

-- ========== PAYMENT LOGS (sample history for testing) ==========
INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Декември 2024', now() - interval '90 days', 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'vihar_01';

INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Януари 2025', now() - interval '60 days', 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'vihar_01';

INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Февруари 2025', now() - interval '30 days', 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'vihar_01';

INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Март 2025', now(), 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'vihar_01';

INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Януари 2025', now() - interval '60 days', 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'test_01';

INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Февруари 2025', now() - interval '30 days', 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'test_01';

INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Март 2025', now(), 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'test_01';

INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Февруари 2025', now() - interval '25 days', 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'test_02';

INSERT INTO public.payment_logs (player_id, paid_for, paid_at, recorded_by)
SELECT p.id, 'Януари 2025', now() - interval '55 days', 'admin'
FROM public.players p WHERE p.nfc_tag_id = 'test_03';
