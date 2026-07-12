import { launchBroswer } from "../playwright/browser.js";
import { ensureLoggedIn } from "../playwright/login.js";
import { getProfileLastUpdated, openProfile, updatePersonalDetails } from "../playwright/profile.js";
import { createContext } from "../playwright/session.js";
const browser = await launchBroswer();
const context = await createContext(browser)
const page = await context.newPage();
await page.goto(process.env.URL);
await ensureLoggedIn(page, context);
await openProfile(page);
const lastUpdate = await getProfileLastUpdated(page);
if (lastUpdate && 'today' !== lastUpdate) {
    await updatePersonalDetails(page);
    console.log(lastUpdate)
    await browser.close()
} else {
    await browser.close()
}
//await page.waitForTimeout(10 * 1000)
