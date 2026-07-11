import { launchBroswer } from "../playwright/browser.js";
import { login } from "../playwright/login.js";
const browser = await launchBroswer();
const context = await browser.newContext()
const page = await context.newPage();
await login(page);
await context.storageState({path:'state.json'})
await page.waitForTimeout(10*1000)
await browser.close()