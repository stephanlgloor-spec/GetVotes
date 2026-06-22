# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> shows progress bar while loading and renders filtered Zurich row
- Location: e2e/app.spec.ts:23:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('mat-progress-bar')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('mat-progress-bar')

```

```yaml
- text: GetVotes Zürich
- heading "Abstimmungsresultate in Stadt und Kanton Zürich im Jahre 2026." [level=3]
- table:
  - rowgroup:
    - row "# Abstimmung Kanton Ja Nein":
      - columnheader "#"
      - columnheader "Abstimmung"
      - columnheader "Kanton"
      - columnheader "Ja"
      - columnheader "Nein"
  - rowgroup:
    - row "1 Volksinitiative «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)» Kanton Zürich 312037 589809":
      - cell "1"
      - cell "Volksinitiative «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)»"
      - cell "Kanton Zürich"
      - cell "312037"
      - cell "589809"
    - row "2 Änderung des Bundesgesetzes über den zivilen Ersatzdienst (Zivildienstgesetz, ZDG) Kanton Zürich 392839 482723":
      - cell "2"
      - cell "Änderung des Bundesgesetzes über den zivilen Ersatzdienst (Zivildienstgesetz, ZDG)"
      - cell "Kanton Zürich"
      - cell "392839"
      - cell "482723"
    - row "3 A. Kantonale Volksinitiative für mehr günstige und gemeinnützige Wohnungen («Wohnungsinitiative») Kanton Zürich 367599 435795":
      - cell "3"
      - cell "A. Kantonale Volksinitiative für mehr günstige und gemeinnützige Wohnungen («Wohnungsinitiative»)"
      - cell "Kanton Zürich"
      - cell "367599"
      - cell "435795"
    - row "4 A. Kantonale Volksinitiative «Bezahlbare Wohnungen schützen. Leerkündigungen stoppen (Wohnschutz-Initiative)» Kanton Zürich 385398 415242":
      - cell "4"
      - cell "A. Kantonale Volksinitiative «Bezahlbare Wohnungen schützen. Leerkündigungen stoppen (Wohnschutz-Initiative)»"
      - cell "Kanton Zürich"
      - cell "385398"
      - cell "415242"
    - row "5 B. Gegenvorschlag des Kantonsrates Kanton Zürich 394890 374717":
      - cell "5"
      - cell "B. Gegenvorschlag des Kantonsrates"
      - cell "Kanton Zürich"
      - cell "394890"
      - cell "374717"
    - row "6 B. Gegenvorschlag des Kantonsrates vom 17. November 2025 Kanton Zürich 425321 350664":
      - cell "6"
      - cell "B. Gegenvorschlag des Kantonsrates vom 17. November 2025"
      - cell "Kanton Zürich"
      - cell "425321"
      - cell "350664"
    - 'row "7 C. Stichfrage: Welche der beiden Vorlagen soll in Kraft treten, falls sowohl die kantonale Volksinitiative als auch der Gegenvorschlag des Kantonsrates angenommen werden? Kanton Zürich 686277 823354"':
      - cell "7"
      - 'cell "C. Stichfrage: Welche der beiden Vorlagen soll in Kraft treten, falls sowohl die kantonale Volksinitiative als auch der Gegenvorschlag des Kantonsrates angenommen werden?"'
      - cell "Kanton Zürich"
      - cell "686277"
      - cell "823354"
    - 'row "8 Kantonale Volksinitiative «Stopp Prämien-Schock: Für eine automatische Entlastung bei den Krankenkassenprämien» Kanton Zürich 396226 394779"':
      - cell "8"
      - 'cell "Kantonale Volksinitiative «Stopp Prämien-Schock: Für eine automatische Entlastung bei den Krankenkassenprämien»"'
      - cell "Kanton Zürich"
      - cell "396226"
      - cell "394779"
    - row "9 Kantonale Volksinitiative «Wohneigentum wieder ermöglichen (Wohneigentums-Initiative)» Kanton Zürich 180854 615491":
      - cell "9"
      - cell "Kantonale Volksinitiative «Wohneigentum wieder ermöglichen (Wohneigentums-Initiative)»"
      - cell "Kanton Zürich"
      - cell "180854"
      - cell "615491"
    - row "10 Verfassung des Kantons Zürich (Änderung vom 15. September 2025; Vertretung von Kantonsratsmitgliedern) Kanton Zürich 521600 247334":
      - cell "10"
      - cell "Verfassung des Kantons Zürich (Änderung vom 15. September 2025; Vertretung von Kantonsratsmitgliedern)"
      - cell "Kanton Zürich"
      - cell "521600"
      - cell "247334"
    - row "11 Ersatzneubau Schulanlage Utogrund und Instandsetzung Sportanlage Utogrund, Ausgaben von 138 Millionen Franken Stadt Zürich 216494 59946":
      - cell "11"
      - cell "Ersatzneubau Schulanlage Utogrund und Instandsetzung Sportanlage Utogrund, Ausgaben von 138 Millionen Franken"
      - cell "Stadt Zürich"
      - cell "216494"
      - cell "59946"
    - row "12 Festlegung der Taxen in den Gesundheitszentren für das Alter, Änderung der Verordnung über städtische Einrichtungen für ältere unterstützungsbedürftige oder pflegebedürftige Personen (VsEP) Stadt Zürich 140338 126008":
      - cell "12"
      - cell "Festlegung der Taxen in den Gesundheitszentren für das Alter, Änderung der Verordnung über städtische Einrichtungen für ältere unterstützungsbedürftige oder pflegebedürftige Personen (VsEP)"
      - cell "Stadt Zürich"
      - cell "140338"
      - cell "126008"
    - row "13 Neubau Recyclingzentrum Juch-Areal, Ausgaben von insgesamt 33,1 Millionen Franken Stadt Zürich 242960 36818":
      - cell "13"
      - cell "Neubau Recyclingzentrum Juch-Areal, Ausgaben von insgesamt 33,1 Millionen Franken"
      - cell "Stadt Zürich"
      - cell "242960"
      - cell "36818"
    - row "14 Neubau Schulanlage Höckler, Ausgaben von 141 Millionen Franken Stadt Zürich 150916 120294":
      - cell "14"
      - cell "Neubau Schulanlage Höckler, Ausgaben von 141 Millionen Franken"
      - cell "Stadt Zürich"
      - cell "150916"
      - cell "120294"
    - row "15 Neuerlass der Verordnung über die Umsetzung von § 49 b Planungs- und Baugesetz (UmV § 49 b PBG) Stadt Zürich 151434 113602":
      - cell "15"
      - cell "Neuerlass der Verordnung über die Umsetzung von § 49 b Planungs- und Baugesetz (UmV § 49 b PBG)"
      - cell "Stadt Zürich"
      - cell "151434"
      - cell "113602"
    - row "16 Rahmenkredit von 2,26 Milliarden Franken für thermische Netze Stadt Zürich 221682 53026":
      - cell "16"
      - cell "Rahmenkredit von 2,26 Milliarden Franken für thermische Netze"
      - cell "Stadt Zürich"
      - cell "221682"
      - cell "53026"
    - row "17 Rahmenkredit von 40 Millionen Franken für den Jugendwohnkredit Stadt Zürich 223316 57068":
      - cell "17"
      - cell "Rahmenkredit von 40 Millionen Franken für den Jugendwohnkredit"
      - cell "Stadt Zürich"
      - cell "223316"
      - cell "57068"
    - row "18 Rahmenkredit von 69 Millionen Franken für ökologische Ersatzmassnahmen im Stadtzürcher Seebecken Stadt Zürich 182812 94868":
      - cell "18"
      - cell "Rahmenkredit von 69 Millionen Franken für ökologische Ersatzmassnahmen im Stadtzürcher Seebecken"
      - cell "Stadt Zürich"
      - cell "182812"
      - cell "94868"
    - row "19 Tram Affoltern, Ausgaben von rund 159,1 Millionen Franken Stadt Zürich 186878 87872":
      - cell "19"
      - cell "Tram Affoltern, Ausgaben von rund 159,1 Millionen Franken"
      - cell "Stadt Zürich"
      - cell "186878"
      - cell "87872"
    - row "20 Verlängerung der Zwischennutzung des Areals Zentralwäscherei, Ausgaben von rund 7,98 Millionen Franken Stadt Zürich 195866 80478":
      - cell "20"
      - cell "Verlängerung der Zwischennutzung des Areals Zentralwäscherei, Ausgaben von rund 7,98 Millionen Franken"
      - cell "Stadt Zürich"
      - cell "195866"
      - cell "80478"
    - row "21 Volksinitiative «Parkplatz-Kompromiss JA» Stadt Zürich 115788 168370":
      - cell "21"
      - cell "Volksinitiative «Parkplatz-Kompromiss JA»"
      - cell "Stadt Zürich"
      - cell "115788"
      - cell "168370"
    - row "22 Volksinitiative «ewz-Bonus für alle – 80 Millionen Franken Volksdividende» Stadt Zürich 78486 204452":
      - cell "22"
      - cell "Volksinitiative «ewz-Bonus für alle – 80 Millionen Franken Volksdividende»"
      - cell "Stadt Zürich"
      - cell "78486"
      - cell "204452"
    - row "23 Übertrag des städtischen Grundstücks am Heidi-Abel-Weg vom Finanz- ins Verwaltungsvermögen, Objektkredit von rund 20,96 Millionen Franken Stadt Zürich 231838 27356":
      - cell "23"
      - cell "Übertrag des städtischen Grundstücks am Heidi-Abel-Weg vom Finanz- ins Verwaltungsvermögen, Objektkredit von rund 20,96 Millionen Franken"
      - cell "Stadt Zürich"
      - cell "231838"
      - cell "27356"
    - 'row "24 Bargeldinitiative und Gegenvorschlag: Stichfrage Kanton Zürich 245835 580093"':
      - cell "24"
      - 'cell "Bargeldinitiative und Gegenvorschlag: Stichfrage"'
      - cell "Kanton Zürich"
      - cell "245835"
      - cell "580093"
    - row "25 Bundesbeschluss über die schweizerische Währung und die Bargeldversorgung (Gegenvorschlag zur Bargeldinitiative) Kanton Zürich 642189 183802":
      - cell "25"
      - cell "Bundesbeschluss über die schweizerische Währung und die Bargeldversorgung (Gegenvorschlag zur Bargeldinitiative)"
      - cell "Kanton Zürich"
      - cell "642189"
      - cell "183802"
    - row "26 Bundesgesetz über die Individualbesteuerung Kanton Zürich 548027 303957":
      - cell "26"
      - cell "Bundesgesetz über die Individualbesteuerung"
      - cell "Kanton Zürich"
      - cell "548027"
      - cell "303957"
    - row "27 Volksinitiative «200 Franken sind genug! (SRG-Initiative)» Kanton Zürich 280398 587460":
      - cell "27"
      - cell "Volksinitiative «200 Franken sind genug! (SRG-Initiative)»"
      - cell "Kanton Zürich"
      - cell "280398"
      - cell "587460"
    - 'row "28 Volksinitiative «Für eine gerechte Energie- und Klimapolitik: Investieren für Wohlstand, Arbeit und Umwelt (Klimafonds-Initiative)» Kanton Zürich 325496 524664"':
      - cell "28"
      - 'cell "Volksinitiative «Für eine gerechte Energie- und Klimapolitik: Investieren für Wohlstand, Arbeit und Umwelt (Klimafonds-Initiative)»"'
      - cell "Kanton Zürich"
      - cell "325496"
      - cell "524664"
    - row "29 Volksinitiative «Ja zu einer unabhängigen, freien Schweizer Währung mit Münzen oder Banknoten (Bargeld ist Freiheit)» Kanton Zürich 322487 519919":
      - cell "29"
      - cell "Volksinitiative «Ja zu einer unabhängigen, freien Schweizer Währung mit Münzen oder Banknoten (Bargeld ist Freiheit)»"
      - cell "Kanton Zürich"
      - cell "322487"
      - cell "519919"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const csv = `Abstimmungs_Text,Ja_Absolut,Nein_Absolut,Kanton
  4  | Testvorlage 1,100,50,Zürich
  5  | Testvorlage 1,20,10,Schaffhausen
  6  | Andere Vorlage,5,2,Bern`;
  7  | 
  8  | test('GetVotes app renders Zurich aggregated results table', async ({ page }) => {
  9  |   await page.goto('/');
  10 | 
  11 |   await expect(page.getByText('GetVotes Zürich')).toBeVisible();
  12 | 
  13 |   const table = page.getByRole('table');
  14 |   await expect(table).toHaveCount(1);
  15 |   await expect(table.getByRole('columnheader', { name: 'Abstimmung' })).toBeVisible();
  16 |   await expect(table.getByRole('columnheader', { name: 'Ja' })).toBeVisible();
  17 |   await expect(table.getByRole('columnheader', { name: 'Nein' })).toBeVisible();
  18 | 
  19 |   const rows = table.getByRole('row');
  20 |   await expect(rows.nth(1)).toBeVisible();
  21 | });
  22 | 
  23 | test('shows progress bar while loading and renders filtered Zurich row', async ({ page }) => {
  24 |   await page.route('**/assets/daten/abstimmungen_seit1933.csv', async route => {
  25 |     await new Promise(resolve => setTimeout(resolve, 150));
  26 |     await route.fulfill({
  27 |       status: 200,
  28 |       contentType: 'text/csv',
  29 |       body: csv
  30 |     });
  31 |   });
  32 | 
  33 |   await page.goto('/');
> 34 |   await expect(page.locator('mat-progress-bar')).toBeVisible();
     |                                                  ^ Error: expect(locator).toBeVisible() failed
  35 | 
  36 |   const table = page.locator('table.voting-table');
  37 |   await expect(table).toBeVisible();
  38 |   await expect(table.getByRole('row')).toHaveCount(2);
  39 |   await expect(table.getByText('Testvorlage 1')).toBeVisible();
  40 |   await expect(table.getByText('100')).toBeVisible();
  41 |   await expect(table.getByText('50')).toBeVisible();
  42 |   await expect(page.getByText('Schaffhausen')).toHaveCount(0);
  43 | });
  44 | 
```