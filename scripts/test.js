import { launchBroswer } from "../playwright/browser.js";
const browser = await launchBroswer();
const page = await browser.newPage();
await page.goto('https://www.google.com')
await page.getByTitle('Search').fill('Playwright')
await page.getByTitle('search').press('Enter')
await page.waitForTimeout(5000)
await browser.close();
