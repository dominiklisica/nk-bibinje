# Što je još ostalo (stanje 10. 11. 2026.)

## 1. Slanje e-maila za prijavu — ✅ gotovo (11. 11. 2026.)
Brevo SMTP spojen u Supabase (limit 30 e-mailova/sat), e-mailovi za prijavu na hrvatskom.
- [ ] kasnije: zamijeniti privremenog pošiljatelja (osobni Gmail) adresom kluba
- [ ] kasnije: Web3Forms ključ (kontakt obrazac + obavijest o prijavi roditelja) zasad šalje na osobni e-mail — prebaciti na e-mail kluba (novi ključ na web3forms.com → `src/data/contact.ts`)

## Zahtjevi roditelja za upis — ✅ gotovo (11. 11. 2026.)
Roditelj se prijavi s imenom djeteta, klub potvrdi u /klub → Zahtjevi (tablica `join_requests`, supabase/02-zahtjevi.sql pokrenut).

## 2. Podaci kluba za uplate → `src/data/payments.ts`
- [ ] naziv, adresa i IBAN kluba (točno kako idu na uplatnicu)
- [ ] mjesečna članarina po uzrastu: seniori, pioniri, mlađi pioniri, limači 7+1, limači 6+1
- [ ] popust za braću i sestre (da/ne, koliko)
- [ ] mjeseci sezone (zasad rujan – lipanj)

## 3. Izvod iz banke
- [ ] koja je banka kluba i u kojem formatu se izvod preuzima (XML camt.053 ili CSV)
- [ ] primjer izvoda (iznosi mogu biti izbrisani) za provjeru uparivanja

## 4. Test s pravom bazom — ✅ gotovo (11. 11. 2026.)
Probno dijete dodano, roditelj vidi samo svoje dijete, ručna uplata se prikazuje roditelju.
`.env.local` očišćen (ostale samo Supabase postavke).
- [ ] obrisati člana „Probno Dijete” (i eventualnog člana br. 101) u /klub → Članovi

## 5. Administratori
- [ ] e-mailovi tajnika i blagajnika → `insert into public.admins ...` u Supabase SQL editoru

## Po potrebi
- [ ] novi rezultati (`npm run sync`) — od 11. 11. 2026. HNS Semafor traži Cloudflare provjeru („Potvrdite da ste osoba”), skripta dobiva 403
- [x] izjava o privatnosti (/privatnost) — klub neka pregleda tekst

## Objava na hosting (procesor.com.hr/lisica/nk_bibinje)
Build bez `.env.local` (u njoj su osobni probni podaci), samo sa Supabase varijablama:
`BASE_PATH=/lisica/nk_bibinje/`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` →
`npm run build` → kopirati `deploy/web.config` u `dist/` → zip sadržaja `dist/` →
prijenos u Plesk i "Extract Files" uz "Replace existing files".
