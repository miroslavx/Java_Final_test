import type { PlaywrightTestConfig } from '@playwright/test';

/**
 * Playwright'i konfiguratsioon Pitsa end‑to‑end testide jaoks.
 *
 * baseURL viitab juurutatud rakendusele. Kõik testifailid asuvad
 * `tests-e2e` kaustas ja käivituvad järjestikku (workers: 1), et vältida
 * hostingu pakkuja kiiruspiirangute käivitamist. HTML raporteerija on
 * konfigureeritud, kuid see ei avane pärast testi käivitamist automaatselt.
 */

const config: PlaywrightTestConfig = {
  testDir: './tests-e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  retries: 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    // Baas-URL rakenduses navigeerimiseks. Kui kasutatakse page.goto
    // suhtelist teed, lisatakse siia väärtus eesliiteks.
    baseURL: 'https://miroslavburdyga24.thkit.ee/content/PHP/content/Pitsa/',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    navigationTimeout: 20_000,
    trace: 'retain-on-failure'
  },
  workers: 1,
};

export default config;
