# FocusQuest Chrome Extension

FocusQuest is a Chrome Extension prototype that gamifies studying.

## Features

- Gains XP while focused on educational sites
- Loses HP when distracted
- Levels up from XP (`level = floor(xp / 100) + 1`)
- 10-second game loop in background service worker
- React + TypeScript popup dashboard with progress bars and status
- Reset button and monitoring toggle
- Data stored locally in `chrome.storage.local`

## Tech Stack

- Chrome Extension Manifest V3
- Background Service Worker + Tabs API + Storage API
- React + TypeScript + Vite
- TailwindCSS with shadcn-style UI primitives

## Project Structure

- `extension/manifest.json`
- `extension/background.ts` (builds to `extension/background.js`)
- `popup/` React project

## Build

From `focusquest-extension/`:

```bash
npm install
npm --prefix popup install
npm run build
```

This builds:

- Popup bundle into `extension/popup/`
- Background bundle into `extension/background.js`

## Load in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `focusquest-extension/extension` folder

## Privacy

- Only active tab URL is checked in memory for focus detection
- No browsing history is persisted
- Game data is stored only in `chrome.storage.local`
