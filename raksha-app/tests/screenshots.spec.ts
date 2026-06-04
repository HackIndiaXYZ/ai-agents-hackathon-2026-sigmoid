import { test, expect } from '@playwright/test';

test.describe('Raksha AI V2 - Screenshots & E2E', () => {
  // Increase timeout because Next.js dev server might be slow on first load
  test.setTimeout(120000);
  test.use({ viewport: { width: 1280, height: 800 } });

  test('Capture Home Page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Wait for the app to be interactive
    await page.waitForSelector('text=Get Emergency Briefing', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000); // let animations settle
    await page.screenshot({ path: 'screenshots/home.png', fullPage: true });

    // Click 'Generate Survival Plan'
    const btn = page.locator('text=Generate Survival Plan');
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForSelector('text=Recommended Shelter', { state: 'visible', timeout: 15000 }); 
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'screenshots/home_briefing.png', fullPage: true });
    }
  });

  test('Capture Disaster Map', async ({ page }) => {
    await page.goto('http://localhost:3000/map');
    await page.waitForSelector('text=Disaster Map', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/map.png', fullPage: true });
    
    // Toggle route
    const routeBtn = page.getByRole('button', { name: /Safe Route AI/i });
    if (await routeBtn.isVisible()) {
      await routeBtn.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: 'screenshots/map_route.png', fullPage: true });
    }
  });

  test('Capture Alerts', async ({ page }) => {
    await page.goto('http://localhost:3000/alerts');
    await page.waitForSelector('text=Live Disaster Intelligence', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/alerts.png', fullPage: true });
  });

  test('Capture Resources', async ({ page }) => {
    await page.goto('http://localhost:3000/resources');
    await page.waitForSelector('text=Emergency Resources', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/resources.png', fullPage: true });
  });

  test('Capture Family & SOS', async ({ page }) => {
    await page.goto('http://localhost:3000/family');
    await page.waitForSelector('text=Family & Safety Center', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/family_idle.png', fullPage: true });

    // Trigger SOS
    const sosBtn = page.getByRole('button', { name: /SOS/i });
    if (await sosBtn.isVisible()) {
      await sosBtn.click();
      await page.waitForSelector('text=SOS ACTIVE', { state: 'visible', timeout: 15000 });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'screenshots/family_sos_triggered.png', fullPage: true });
    }
  });

  test('Capture Community', async ({ page }) => {
    await page.goto('http://localhost:3000/community');
    await page.waitForSelector('text=Nearby Helpers Network', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/community.png', fullPage: true });
  });

  test('Capture Survival Guide', async ({ page }) => {
    await page.goto('http://localhost:3000/survival');
    await page.waitForSelector('text=Offline Survival Guide', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/survival.png', fullPage: true });
  });

  test('Capture Emergency Assistant', async ({ page }) => {
    await page.goto('http://localhost:3000/assistant');
    await page.waitForSelector('text=Tap to speak', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/assistant_idle.png', fullPage: true });

    // Tap to speak
    await page.getByRole('button').click(); 
    await page.waitForSelector('text=Tap to stop', { state: 'visible', timeout: 15000 });
    await page.waitForTimeout(2500); // wait for transcript
    await page.screenshot({ path: 'screenshots/assistant_response.png', fullPage: true });
  });

  test('Capture Impact Page', async ({ page }) => {
    await page.goto('http://localhost:3000/impact');
    await page.waitForSelector('text=Hackathon Mission', { state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/impact.png', fullPage: true });
  });
});
