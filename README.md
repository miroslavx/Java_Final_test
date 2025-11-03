# Pitsa 24/7 E2E Testid

See reposiit sisaldab Playwright'i põhiseid end‑to‑end (E2E) teste Pitsa 24/7 veebirakenduse jaoks. Testid kontrollivad kasutaja registreerimist, sisselogimist, otsingufunktsiooni ja väljalogimist. Rakendus asub avalikus pilves ning testide käivitamiseks ei ole vaja lokaalset PHP serverit või andmebaasi.

## Rakenduse ligipääs

Rakendust saab kasutada aadressil:

<https://miroslavburdyga24.thkit.ee/content/PHP/content/Pitsa/>

Kõik testid on suunatud ülaltoodud baas‑URL‑i suhtes (määratud `playwright.config.ts` failis).

## Süsteeminõuded

- Operatsioonisüsteem: Windows, macOS või Linux
- Node.js versioon 18 või uuem
- NPM (tuleb Node.js paketiga)
- Playwright laadib vajalikud brauserid automaatselt alla

## Samm‑sammult juhend testide käivitamiseks

1. **Klooni repositoorium ja liigu sellesse kausta**

   ```sh
   git clone https://github.com/miroslavx/Java_Final_test
   cd Java_Final_test
   ```

2. **Paigalda Node.js sõltuvused**

   ```sh
   npm install
   ```

3. **Laadi alla Playwright'i brauserid**

   ```sh
   npx playwright install
   ```

4. **Käivita kõik E2E testid**

   ```sh
   npm run e2e
   ```

   Testid jooksevad järjestikku (`workers: 1`), et vähendada Zone.ee hostingu DDOS kaitse riskide tõttu võimalikke tõrkeid.

5. **(Valikuline) Käivita testid UI režiimis**

   UI režiim võimaldab teste samm‑sammult jälgida.

   ```sh
   npm run e2e-ui
   ```

6. **Vaata raportit**

   Pärast testide lõppu leiad HTML‑raporti kataloogist `playwright-report/index.html`. Kui mõni test ebaõnnestub, salvestatakse ekraanipildid ja videod kataloogi `test-results/`.

## Keskkonnamuutujad

Repo juures on näidisfail `.env.example`, mis näitab, milliseid keskkonnamuutujaid võib kasutada. Käesolevad testid ei vaja hetkel paroole ega teisi saladusi, kuid faili saab kopeerida `.env` nime all ja väärtused vastavalt muuta.

```ini
# .env.example
# BASE_URL=https://miroslavburdyga24.thkit.ee/content/PHP/content/Pitsa/
# ADMIN_USER=admin
# ADMIN_PASS=admin_password
```

### Täiendav teave

- Testid kasutavad igas jooksus unikaalseid kasutajanimesid, seega ei sega need üksteist ega jää andmebaasi alles.
- Kui vajad pikemat ajakulu teatud toimingu tegemiseks, kasuta Playwright'i ooteid (nt `waitForNavigation`), mitte kunstlikke ajalisi pause. See tagab testide töökindluse.