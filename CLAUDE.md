# Swiss Agents – sajt

Marketinški sajt za **Swiss Agents**, švajcarsku agenciju koja pravi KI-agente za firme
(telefon, termini, podrška, backoffice, lead-ovi). Cilj sajta: **posetilac bukira demo**
(`kontakt.html#contactForm`).

## Tehnika

- Čist statični sajt: HTML + `styles.css` + `script.js`. Nema build-a, frameworka ni npm-a.
- Pregled: otvoriti HTML direktno ili `python3 -m http.server` u root-u repoa.
- Nema zajedničkih šablona: **navigacija, footer i floating CTA su kopirani u svaku stranicu**.
  Kad menjaš jedan od njih, promeni ga u svih 10 HTML fajlova.
- Fontovi: Google Fonts (Space Grotesk za naslove, Inter za tekst).
- Animacije i interakcije su u `script.js` (čestice, parallax, `animate-on-scroll`, 3D kartice).
  Nova sekcija dobija klasu `animate-on-scroll` kao postojeće.

## Stranice

| Fajl | Sadržaj |
|---|---|
| `index.html` | Početna |
| `leistungen.html` | Pregled sva 4 agenta |
| `communication-agent-schweiz.html` | Voice agent / telefon, termini, podrška |
| `operations-agent-schweiz.html` | Backoffice, podaci, ponavljajući procesi |
| `executive-agent-schweiz.html` | Asistent za rukovodioce: inbox, prioriteti, brifinzi |
| `sales-agent-schweiz.html` | Lead generisanje, outreach, follow-up |
| `ablauf.html` | Proces: spremno za 7–10 dana |
| `ueber-uns.html` | O firmi |
| `faq.html` | Česta pitanja |
| `kontakt.html` | Forma za demo |

## Jezik i ton (sav sadržaj sajta je na nemačkom)

- **Švajcarski standardni nemački: uvek „ss“, nikad „ß“** (schliesst, anstossen, gross).
- Klijenta oslovljavamo sa **„Sie“**, nikad „du“.
- Ton: jednostavan, konkretan, bez tehničkog žargona. Publika su vlasnici i menadžeri
  švajcarskih MSP, ne programeri. Naglasak na uštedi vremena i rasterećenju tima.
- Ključne poruke koje se ponavljaju: einsatzbereit in 7–10 Tagen, kein technisches Wissen nötig,
  Schweizer Unternehmen, unverbindliche Demo.
- Ne izmišljati brojke, reference klijenata, sertifikate ni cene. Ako nedostaju – pitati.

## SEO

- Svaka stranica ima jedinstven `<title>` i `<meta name="description">`, oba na nemačkom.
- Format naslova: `<Tema> Schweiz | Swiss Agents`.
- Ključne reči: KI-Agent Schweiz, KI Voice Agent, KI-Telefonassistent, KI-Automatisierung.
- Jedan `<h1>` po stranici.

## Dizajn

- Tamna tema sa neon akcentima. Boje koristi isključivo kroz CSS varijable iz `:root`
  u `styles.css` (`--bg`, `--text`, `--neon-blue` #00d4ff, `--neon-purple` #8b5cf6,
  `--neon-teal`, `--neon-pink`) – bez novih hardkodovanih boja.
- Logo gradient: plava → ljubičasta. Istaknuti deo naslova ide u `<span class="gradient-text">`.
- Svaka izmena mora da radi i na mobilnom (hamburger meni `navToggle`).

## Pravila rada

- Pre veće izmene napravi plan (`/plan`), pre commit-a pregledaj izmene (`/review`).
- Posle izmene proveri stranicu u browseru (desktop i mobilna širina).
- Ne menjati cene, obećanja („7–10 Tagen“) ni pravne tekstove bez pitanja.
- Commit i push samo na granu, nikad direktno na `main`.

## Poznati problemi

- **Kontakt forma ne šalje ništa.** `script.js` (`initContactForm`) samo prikaže „Gesendet!“
  i obriše formu – upiti od posetilaca se gube. Treba povezati sa servisom (npr. Formspree,
  Vercel funkcija ili e-mail).
- Nema stranica **Impressum** i **Datenschutzerklärung**, koje se u Švajcarskoj očekuju
  za firmu koja nudi usluge online i prikuplja lične podatke kroz formu.
- `executive-agent-schweiz.html`: „anstoßen“ treba da bude „anstossen“.
