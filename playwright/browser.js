import { chromium } from "playwright";

export const launchBroswer = async ()=>{
    const browser = await chromium.launch({
        headless:false,
    })
    return browser;
}