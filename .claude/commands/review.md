---
description: Pregled trenutnih izmena (git diff) pre commit-a
argument-hint: [opciono: fajl ili oblast na koju se fokusirati]
allowed-tools: Bash(git status:*), Bash(git diff:*)
---

Pregledaj trenutne izmene u repou pre commit-a.

Kontekst:
- Status: !`git status --short`
- Izmene: !`git diff HEAD`

Fokus (ako je naveden): $ARGUMENTS

Ovo je statični sajt (HTML, CSS, JS) na nemačkom za švajcarsko tržište. Proveri:
- **Greške** — pokvareni linkovi, nezatvoreni tagovi, JS greške, pogrešne putanje.
- **Konzistentnost** — navigacija, header/footer i stil isti na svim stranicama.
- **Tekst** — pravopis i ton na nemačkom (švajcarski: „ss“ umesto „ß“).
- **SEO i pristupačnost** — title, meta description, alt tekst, hijerarhija naslova.
- **Mobilni prikaz** — da li izmena kvari responsive layout.

Za svaki nalaz: fajl:linija, problem, predlog ispravke. Ako nema problema, reci to kratko.
Odgovaraj na jeziku na kom je korisnik pisao. Ništa ne menjaj bez pitanja.
