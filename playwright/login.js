import 'dotenv/config'
export const login = async (page) => {
    await page.goto(process.env.URL);
    await page.getByRole('link', { name: 'Login', exact: true }).click();

    const emailInput = page.getByRole('textbox', { name: 'Enter your active Email ID /' });
    const passwordInput = page.getByRole('textbox', { name: 'Enter your password' });
    const loginButton = page.getByRole('button', { name: 'Login', exact: true });

    await emailInput.fill(process.env.EMAIL);
    await passwordInput.fill(process.env.PASSWORD)
    await loginButton.click();
}