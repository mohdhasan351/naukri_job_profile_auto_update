# Naukri Profile Updater

Keeps your [Naukri](https://www.naukri.com/) profile fresh automatically. Recruiter searches rank recently-updated profiles higher, so this script makes a tiny edit to your profile once a day — toggling your **hometown** on and off — which bumps your "Profile last updated" date to today and pushes you toward the top of recruiter search results.

It runs headless-free via [Playwright](https://playwright.dev/), reuses a saved login session, and only updates if the profile hasn't already been touched today.

## How it works

1. Launch Chromium and load a saved session (`state.json`) if one exists.
2. Log in with your credentials (only when the saved session is missing/expired) and re-save the session.
3. Open your profile and read the **"Profile last updated"** date.
4. If it's **not** already `today`, edit Personal Details:
   - If hometown is currently set → clear it.
   - If hometown is empty → set it back to your `HOMETOWN` value.
5. Save. This flip counts as a profile update and resets the date to today.

Because it flips the value each run, the profile alternates set ↔ empty day to day, and either way registers as an update.

## Setup

Requires [Node.js](https://nodejs.org/) (v18+).

```bash
git clone https://github.com/YOUR_USERNAME/naukri-profile-updater.git
cd naukri-profile-updater
npm install
npx playwright install chromium
```

## Configuration

Create a `.env` file in the project root (it is gitignored — never commit it):

```env
URL=https://www.naukri.com/
EMAIL=your-naukri-email@example.com
PASSWORD=your-naukri-password
HOMETOWN=Your City
```

| Variable   | Description                                             |
|------------|---------------------------------------------------------|
| `URL`      | Naukri homepage URL                                     |
| `EMAIL`    | Your Naukri login email                                 |
| `PASSWORD` | Your Naukri login password                              |
| `HOMETOWN` | The hometown value to toggle on/off in Personal Details |

## Usage

```bash
node scripts/loginTest.js
```

On first run it logs in and saves your session to `state.json` so later runs skip the login step.

## Schedule it (daily at 9 AM)

### Windows — Task Scheduler

Run once in PowerShell (adjust paths if yours differ):

```powershell
mkdir "C:\Users\Hasan\Desktop\naukri-profile-updater\logs" -Force
schtasks /create /tn "NaukriProfileUpdater" /tr "cmd /c cd /d \"C:\Users\Hasan\Desktop\naukri-profile-updater\" && \"C:\Program Files\nodejs\node.exe\" scripts\loginTest.js >> logs\loginTest.log 2>&1" /sc daily /st 09:00 /f
```

- Run it now to test: `schtasks /run /tn "NaukriProfileUpdater"`
- Check status: `schtasks /query /tn "NaukriProfileUpdater" /v`
- Remove it: `schtasks /delete /tn "NaukriProfileUpdater" /f`

> The browser runs visibly (`headless: false`), so the task needs you to be **logged into Windows** at 9 AM. If the machine is asleep, the task runs when it next wakes.

### Linux / macOS — cron

```cron
0 9 * * * cd /path/to/naukri-profile-updater && /usr/bin/node scripts/loginTest.js >> logs/loginTest.log 2>&1
```

## Project structure

```
scripts/loginTest.js     Entry point — orchestrates the daily run
playwright/browser.js    Launches Chromium
playwright/session.js    Loads/saves the login session (state.json)
playwright/login.js      Login + "already logged in?" check
playwright/profile.js    Opens profile, reads last-updated, toggles hometown
```

## Notes

- `.env`, `state.json`, and `node_modules/` are gitignored — your credentials and session never leave your machine.
- If Naukri changes its page layout, the selectors in `login.js` / `profile.js` may need updating.
- This automates *your own* profile on *your own* account. Use responsibly and within Naukri's terms of service.
