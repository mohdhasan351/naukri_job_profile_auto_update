import 'dotenv/config'
export const login = async (page) => {
    await page.getByRole('link', { name: 'Login', exact: true }).click();

    const emailInput = page.getByRole('textbox', { name: 'Enter your active Email ID /' });
    const passwordInput = page.getByRole('textbox', { name: 'Enter your password' });
    const loginButton = page.getByRole('button', { name: 'Login', exact: true });

    await emailInput.fill(process.env.EMAIL);
    await passwordInput.fill(process.env.PASSWORD)
    await loginButton.click();
    // logged-in pages live under /mnjuser/ — wait for the redirect,
    // otherwise storageState saves pre-login cookies
    await page.waitForURL('**/mnjuser/**', { timeout: 30000 });
}

export const isLoggedIn = async (page) => {
    // logged-out homepage shows the header "Login" link; logged-in users
    // are redirected to /mnjuser/. Race the two signals.
    // const loginLink = page.getByRole('link', { name: 'Login', exact: true });
    // try {
    //     await Promise.race([
    //         loginLink.waitFor({ state: 'visible', timeout: 15000 }),
    //         page.waitForURL('**/mnjuser/**', { timeout: 15000 }),
    //     ]);
    // } catch { /* neither showed up — treat as logged out */ }
    // return page.url().includes('/mnjuser/');

    // return await page.getByRole('button', { name: 'View profile', exact: true }).isVisible();

    try {
        await page.waitForURL("**/mnjuser/**", { timeout: 15*1000 });
        return true
    } catch (err) {
        console.log(err);
        return false
    }
}

export const ensureLoggedIn = async (page, context) => {
    if (!await isLoggedIn(page)) {
        await login(page); // it perform login
        await context.storageState({ path: 'state.json' }) //it saves the session 
    }
    else {
        console.log("Already logged in.");
    }
}