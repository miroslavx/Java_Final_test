# Testiplaan

## Ülevaade

E2E testid kontrollivad kasutaja registreerimist, sisselogimist, vigade käsitlemist ja otsingufunktsionaalsust Pitsa 24/7 rakenduses. Iga stsenaarium on iseseisev: vajalikud andmed luuakse testi alguses ja eemaldatakse lõpus, et tagada korduvkäidavus. Testid on suunatud kahele olekule: registreerimata kasutaja ja tavakasutaja (sisselogitud kasutaja).

### Stsenaarium 1 – Edukas registreerimine ja sisselogimine

- **Algseis:** Brauser on rakenduse registreerimislehel ja ühtegi kasutajat ei ole sisse logitud.
- **Tegevus:** Kasutaja täidab vormi unikaalse kasutajanime ja tugevate paroolidega ning esitab selle. Pärast seda logib ta sisse äsja loodud tunnustega.
- **Oodatav tulemus:** Leht kuvab teate edukast registreerimisest. Pärast sisselogimist suunatakse kasutaja avalehele, kus kuvatakse riba tekstiga „Sisse logitud kui &lt;kasutajanimi&gt;” ning menüüs on olemas link „Logi välja”.

### Stsenaarium 2 – Topeltkasutajanime registreerimine

- **Algseis:** Andmebaasis ei ole veel kasutajat nimega &lt;kasutajanimi&gt; ning brauser on registreerimislehel.
- **Tegevus:** Kasutaja registreerib end uue kasutajanimega, misjärel avab uuesti registreerimislehe ja proovib sama nime teist korda registreerida.
- **Oodatav tulemus:** Esimene registreerimine õnnestub ja kuvatakse edu‑teade. Teise katse korral kuvatakse punane veateade „Selline kasutajanimi on juba olemas!” ning kasutajat ei lisata uuesti.

### Stsenaarium 3 – Vigane sisselogimine

- **Algseis:** Brauser on sisselogimislehel ja kasutaja ei ole sisse logitud.
- **Tegevus:** Sisestatakse olematu kasutajanimi ja vale parool ning klõpsatakse nupule „Logi sisse”.
- **Oodatav tulemus:** Leht jääb sisselogimislehele ning kuvatakse punane veateade „Vale kasutajanimi või parool”. Sisse logimist ei toimu.

### Stsenaarium 4 – Pitsade otsing ja filtrid

- **Algseis:** Kasutaja asub otsingulehel ja kõik pitsad on nähtavad.
- **Tegevus:** Otsinguväljale sisestatakse „Hawaii” ja klõpsatakse nupule „Otsi pitsasid”. Seejärel tühjendatakse otsinguväli, valitakse rippmenüüst restoran „Opera Pizza” ja esitatakse filter uuesti.
- **Oodatav tulemus:** Esimese otsingu korral kuvatakse ainult üks rida pitsaga „Hawaii”. Filtri rakendamisel kuvatakse mitu rida, kus iga pitsa restoraniks on „Opera Pizza”.

### Stsenaarium 5 – Väljalogimine

- **Algseis:** Kasutaja on edukalt sisseloginud ja asub avalehel, menüüs on link „Logi välja”.
- **Tegevus:** Kasutaja klõpsab lingil „Logi välja”.
- **Oodatav tulemus:** Kasutaja suunatakse tagasi avalehele, kus menüüs kuvatakse lingid „Logi sisse” ja „Registreeri” ning riba „Sisse logitud kui …” kaob. See kinnitab, et kasutaja sessioon on lõppenud.