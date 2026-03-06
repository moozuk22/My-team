# Test Data Reference

This document lists all the test data created by the seed script.

## Club

- **ФК Вихър Войводиново** (slug: `vihar`)

## Players by Team Group

### Team Group 2014 (U10) - 4 players

| NFC Tag ID | Name | Jersey | Status | Last Payment |
|------------|------|--------|--------|--------------|
| `vihar-2014-1` | Александър Иванов | №1 | paid | Today |
| `vihar-2014-7` | Николай Петров | №7 | paid | Today |
| `vihar-2014-10` | Димитър Георгиев | №10 | warning | 32 days ago |
| `vihar-2014-9` | Мартин Стоянов | №9 | overdue | 68 days ago |

### Team Group 2015 (U9) - 4 players

| NFC Tag ID | Name | Jersey | Status | Last Payment |
|------------|------|--------|--------|--------------|
| `vihar-2015-7` | Мария Георгиева | №7 | overdue | 65 days ago |
| `vihar-2015-11` | Виктория Димитрова | №11 | paid | Today |
| `vihar-2015-5` | Теодор Николов | №5 | warning | 28 days ago |
| `vihar-2015-3` | Калин Андреев | №3 | paid | Today |

### Team Group 2016 (U8) - 5 players

| NFC Tag ID | Name | Jersey | Status | Last Payment |
|------------|------|--------|--------|--------------|
| `vihar_01` | Демо Играч | №14 | paid | Today |
| `vihar-2016-10` | Иван Петров | №10 | warning | 35 days ago |
| `vihar-2016-9` | Анна Димитрова | №9 | warning | 30 days ago |
| `vihar-2016-6` | Радослав Тодоров | №6 | paid | Today |
| `vihar-2016-4` | Борислав Стефанов | №4 | overdue | 70 days ago |

### Team Group 2017 (U7) - 4 players

| NFC Tag ID | Name | Jersey | Status | Last Payment |
|------------|------|--------|--------|--------------|
| `vihar-2017-5` | Георги Стоянов | №5 | paid | Today |
| `vihar-2017-8` | Стефан Василев | №8 | paid | Today |
| `vihar-2017-2` | Янко Кръстев | №2 | warning | 33 days ago |
| `vihar-2017-12` | Любомир Павлов | №12 | overdue | 62 days ago |

### Team Group 2018 (U6) - 2 players

| NFC Tag ID | Name | Jersey | Status | Last Payment |
|------------|------|--------|--------|--------------|
| `vihar-2018-1` | Даниел Милев | №1 | paid | Today |
| `vihar-2018-13` | Емил Цветанов | №13 | warning | 29 days ago |

## Summary

- **Total Players:** 19
- **Paid:** 9 players
- **Warning:** 6 players
- **Overdue:** 4 players
- **Team Groups:** 2014, 2015, 2016, 2017, 2018

## Quick Test URLs

### Player Profiles
- http://localhost:3000/p/vihar_01 (Demo player - paid, full history)
- http://localhost:3000/p/vihar-2016-10 (Warning status)
- http://localhost:3000/p/vihar-2015-7 (Overdue status)
- http://localhost:3000/p/vihar-2014-1 (Paid, multiple months)
- http://localhost:3000/p/vihar-2017-12 (Overdue)

### Admin Dashboard
- http://localhost:3000/admin/players (Full list with search/filter)

## Payment History

Players have payment logs for various months:
- Some players have full payment history (6-7 months)
- Some have partial history (2-3 months)
- Overdue players are missing recent payments
- Warning players are missing current month payment

## Testing Scenarios

### Test Payment Status Updates
1. Go to `/admin/players`
2. Search for a player with "warning" status
3. Click "Платено" button
4. Status should update to "paid" in real-time
5. Payment log should be created

### Test Search & Filter
1. Go to `/admin/players`
2. Click team group buttons (2014, 2015, etc.)
3. Use search to find players by name
4. Test combination of filters

### Test Reports
1. Go to `/admin/players`
2. Click "Център за отчети"
3. Select different months/years
4. Filter by team group
5. Generate monthly/annual reports

### Test Real-time Updates
1. Open player profile: `/p/vihar-2016-10`
2. In another tab, go to admin and mark player as paid
3. Watch the profile update in real-time

### Test Payment History
1. Open player profile with payment history: `/p/vihar_01`
2. Expand "История на плащанията"
3. Click "Разписка" to view receipt
4. Test print functionality
