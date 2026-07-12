import 'dotenv/config'
export const openProfile = async (page) => {
    const viewProfileButton = page.getByRole('link', { name: 'View profile', exact: false });
    await viewProfileButton.click();
    await page.waitForURL("**/profile")
    //console.log('completed');
}//  await page.getByRole('link', { name: 'View profile' }).click();

export const getProfileLastUpdated = async (page) => {
    const lastUpdate = page.getByText('Profile last updated -')
    const text = await lastUpdate.textContent();
    if (!text) return null;
    return text.split('-')[1].trim().toLowerCase() || null;
}

export const updatePersonalDetails = async (page) => {
    await page.locator('#lazyPersonalDetail').evaluate(e => {
        e.scrollIntoView();
    })
    await page.locator('#lazyPersonalDetail').getByText('editOneTheme').click();
    const hometown = page.getByRole('textbox', { name: 'Enter your hometown' })
    const currentValue = await hometown.inputValue();
    if (currentValue === process.env.HOMETOWN) {
        await hometown.fill('')
    } else {
        await hometown.fill(process.env.HOMETOWN)
    }
    await page.getByRole('button', { name: 'Save' }).click();
}