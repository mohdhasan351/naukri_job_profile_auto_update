import { existsSync } from 'fs';

export const createContext = async (browser) => {
    let context;
    if (existsSync('state.json')) {
        context = await browser.newContext({ storageState: 'state.json' }); // load it
        console.log("Found existing session.");
    }
    else {
        context = await browser.newContext();
        console.log('no login detected')
    }
    return context
}