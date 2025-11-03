# Testi aruanne

Selle aruande eesmärk on kirjeldada Pitsa 24/7 veebirakenduse E2E testide tulemusi ja esile tuua nii positiivsed kui negatiivsed küljed. Testid on kirjutatud Playwright'iga ning neid saab käivitada skriptiga `npm run e2e`. Raporti koostamisel on kasutatud automaatselt salvestatud ekraanipilte ja logisid.

## Mis töötab

1. **Kasutaja registreerimine** – Registreerimisvorm aktsepteerib uusi kasutajanimesid ja paroole. Pärast edukat registreerimist kuvatakse roheline teade ning kasutaja suunatakse sisselogimislehele.
2. **Sisselogimine** – Kasutaja saab pärast registreerimist oma tunnustega sisse logida. Avalehel kuvatakse tekst „Sisse logitud kui &lt;kasutajanimi&gt;” ja menüüs ilmub link „Logi välja”.
3. **Valideerimine registreerimisel** – Kui sisestatud paroolid ei kattu, näidatakse punast veateadet „Paroolid ei kattu”. Samuti kontrollitakse, et kasutajanimi oleks unikaalne; duplikaadi korral ilmub teade „Selline kasutajanimi on juba olemas!”.
4. **Loginiviga** – Vale kasutajanime või parooli korral jääb kasutaja sisselogimislehele ja kuvatakse punane teade „Vale kasutajanimi või parool”, mis näitab korrektset veakäsitlust.
5. **Otsing ja filtrid** – Pitsade otsingulehel toimivad nii otsinguvälja kui ka restoranivaliku filtrid. Otsing „Hawaii” tagastab ainult vastava pitsa ning rippmenüüst „Opera Pizza” valimine kuvab ainult selle restorani pitsad.
6. **Väljalogimine** – Link „Logi välja” lõpetab kasutaja sessiooni. Pärast väljalogimist kaovad sisselogitud kasutaja elemente näitav riba ning avalehel kuvatakse taas lingid „Logi sisse” ja „Registreeri”.

## Mis ei tööta / probleemid

1. **Pitsade tellimise nupud** – Avalehel on populaarsete pitsade juures nupud, mis näivad esmapilgul klõpsatavad, kuid need ei tööta. Klõpsamisel ei avane tellimisvorm ega pitsa detailid. HTML-i uurimisel selgub, et nupud ei ole seotud ühegi toiminguga.
2. **Restoranide leht on staatiline** – Restoranide leht kuvab poodide aadresse, kontaktandmeid ja menüü loendeid, kuid puuduvad lingid pitsa tellimiseks või detailinfo vaatamiseks. Menüüelementide `<td>` elemendid ei sisalda anchor‑silte, mistõttu kasutaja ei saa neist edasi liikuda.
3. **Taaskäivitatavuse puudused** – Mõned funktsioonid, nagu registreeritud kasutajate eemaldamine andmebaasist, puuduvad, mistõttu testide korduv käivitamine võib täita andmebaasi suure hulga kasutajatega. Testide lahendamisel kasutame unikaalseid nimesid, kuid puudub mehhanism, mis vanu kontosid kustutaks.
4. **Autoriseerimisrollid** – Rakenduses ei ole adminiliidest ega eraldi rollipõhiseid õigusi. Kõik kasutajad näevad samu lehti ja neil pole võimalust hallata menüüd. See piirab süsteemi funktsionaalsust ja testimise mahtu.
5. **Vigased lingid** – Mõned navigeerimise nupud (nt navbaari pitsade otsingu ja restoranide lehed) kasutavad staatilisi ankruid, mis viivad erinevate failide juurde, kuid on kerge oht 404 vigadele, kui failinimed muutuvad. Puudub serveripoolne suunamine või vigade käsitlus.
6. **Otsingu kasutajaülene isolatsioon** – Otsingulehe tulemused salvestatakse serveri sessioonis. Kui kaks kasutajat teevad samal ajal otsingut, võib see viia ebatäpsete tulemuste jagamiseni. Testide kontekstis ei ilmnenud konflikte, kuid potentsiaalne probleem jääb.

## Ekraanipildid

Playwright salvestab ekraanipildid ja videod kõikidest ebaõnnestunud testidest kataloogi `test-results/`. Kuna kõik planeeritud testid õnnestusid, ei ole käesolevas aruandes lisatud linke konkreetsetele tõrkeekraanidele. Kui mõni test peaks tulevikus ebaõnnestuma, saab ekraanipilte sirvida HTML‑raportis `playwright-report/index.html`.