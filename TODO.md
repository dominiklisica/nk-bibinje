# Što je još ostalo (stanje 10. 11. 2026.)

## 1. Slanje e-maila za prijavu — najvažnije
Supabase bez vlastitog SMTP-a šalje samo **2 e-maila na sat**. Spojiti besplatni servis
(**Brevo** — 300/dan, ili **Gmail kluba** s lozinkom za aplikacije) u
Supabase → Authentication → Emails → SMTP Settings, pa podići limit.
- [ ] odlučiti s koje adrese kluba stižu e-mailovi

## 2. Podaci kluba za uplate → `src/data/payments.ts`
- [ ] naziv, adresa i IBAN kluba (točno kako idu na uplatnicu)
- [ ] mjesečna članarina po uzrastu: seniori, pioniri, mlađi pioniri, limači 7+1, limači 6+1
- [ ] popust za braću i sestre (da/ne, koliko)
- [ ] mjeseci sezone (zasad rujan – lipanj)

## 3. Izvod iz banke
- [ ] koja je banka kluba i u kojem formatu se izvod preuzima (XML camt.053 ili CSV)
- [ ] primjer izvoda (iznosi mogu biti izbrisani) za provjeru uparivanja

## 4. Test s pravom bazom
- [ ] dodati probno dijete, prijaviti se kao roditelj, označiti uplatu
- [ ] obrisati probne podatke i probne retke iz `.env.local` (osobni IBAN, `VITE_TEST_MONTHLY_FEE`)

## 5. Administratori
- [ ] e-mailovi tajnika i blagajnika → `insert into public.admins ...` u Supabase SQL editoru

## Po potrebi
- [ ] novi rezultati (`npm run sync`) i vijesti s Facebooka
- [ ] kratka izjava o privatnosti za roditelje (čuvaju se podaci o djeci)

## Objava na hosting (procesor.com.hr/lisica/nk_bibinje)
Build bez `.env.local` (u njoj su osobni probni podaci), samo sa Supabase varijablama:
`BASE_PATH=/lisica/nk_bibinje/`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` →
`npm run build` → kopirati `deploy/web.config` u `dist/` → zip sadržaja `dist/` →
prijenos u Plesk i "Extract Files" uz "Replace existing files".
