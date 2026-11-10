# Članarine i donacije — postavljanje

Dok ništa od ovoga nije upisano, aplikacija radi u **demo načinu** (probni podaci, spremaju se samo u pregledniku),
a barkodovi za plaćanje su isključeni.

## 1. Podaci računa i iznosi — `src/data/payments.ts`

- `RECIPIENT` — naziv, adresa i **IBAN** kluba točno kako pišu na uplatnici.
- `MONTHLY_FEE` — mjesečna članarina po ekipi u eurima (`null` = nije određeno, barkod se ne prikazuje).
- `SIBLING_DISCOUNT` — popust za drugo i svako sljedeće dijete iste obitelji (npr. `0.2` = 20 %).
- `SEASON_MONTHS` — mjeseci za koje se plaća članarina.

Za testiranje s vlastitim računom (bez upisivanja u kod) napravi datoteku `.env.local` u korijenu projekta:

```
VITE_PAYMENT_IBAN=HR...
VITE_PAYMENT_NAME=Ime Prezime
VITE_PAYMENT_STREET=Ulica 1
VITE_PAYMENT_CITY=23205 Bibinje
```

`.env.local` se ne šalje na GitHub. Za pravu objavu podatke kluba upiši u `payments.ts`.

## 2. Supabase (baza i prijava)

1. Na [supabase.com](https://supabase.com) napravi projekt, regija **Frankfurt (eu-central-1)**.
2. **SQL Editor** → zalijepi cijeli `supabase/schema.sql` → **Run**.
3. U istom editoru dodaj administratore kluba:
   `insert into public.admins (email) values ('tajnik@primjer.hr'), ('blagajnik@primjer.hr');`
4. **Authentication → URL Configuration**: *Site URL* = adresa stranice
   (npr. `https://procesor.com.hr/lisica/nk_bibinje/`), u *Redirect URLs* dodaj istu adresu i `http://localhost:5173/`.
5. **Project Settings → API**: kopiraj *Project URL* i *anon public* ključ u `.env.local`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Anon ključ smije biti u stranici — podatke štite pravila (RLS) iz `schema.sql`.

## 3. Kako radi

- **Roditelj** se prijavi e-mailom (stigne mu poveznica, bez lozinke). Vidi samo djecu uz koju je klub upisao
  njegov e-mail i za svaki mjesec dobije barkod s iznosom i pozivom na broj `HR00 {broj člana}-{GGGGMM}`.
- **Klub** (e-mail u tablici `admins`) na stranici `/klub` upisuje članove i e-mailove roditelja,
  vidi tko je platio koji mjesec, ručno označava gotovinske uplate i **učitava izvod iz banke**
  (camt.053 XML ili CSV) — uplate se same upare po pozivu na broj, donacije po opisu.
