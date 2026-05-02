<p align="center">
  <img src="super-enhanced-icon.png" width="120" alt="Key Spammer Logo" />
</p>

<p align="center">
  <strong>TikTok Live Tap-Tap Spammer</strong><br>
</p>

A lightweight browser extension that automatically presses a key of your choice over and over again.  
Perfect for spamming the TikTok “Like” shortcut (`L` key) or any other keyboard‑driven action on a website.

## Features

- **Choose any single key** – letters, digits, even punctuation (one character).
- **Set how many times** it should press (default: **1000** times).
- **Pick the pause between presses** – minimum **230 ms** (default: 230 ms).
- **URL filter** – only activate on pages whose address contains a certain word (e.g., `tiktok.com`). Leave empty to work everywhere.
- **Start / Stop anytime** – the remaining count is saved, so you can pause and resume later.
- **Realistic keyboard events** – sends both `keydown` and `keyup` events, just like a physical key press. This means the website’s own shortcuts work, including the TikTok like button.

## What you need

- **Google Chrome** (or any browser built on Chromium, like Microsoft Edge, Brave, or Opera).  
- No other software, libraries, or dependencies – the extension contains everything it needs.

## Installation

1. **Download the extension folder** – if you got it as a ZIP file, extract (unzip) it somewhere on your computer. Keep all the files together.
2. **Open Chrome** and type `chrome://extensions` into the address bar, then press Enter.
3. **Turn on “Developer mode”** – look for a small toggle switch in the top‑right corner of the page and click it so it turns blue.
4. **Click the “Load unpacked” button** – it will appear after you enable Developer mode.
5. **Select the extension folder** – a file browser window will open. Navigate to the folder that contains the files (`manifest.json`, `popup.html`, etc.) and click “Select Folder” (or “Open”).
6. That’s it! The extension icon will now appear in the top‑right toolbar of Chrome (you might see a puzzle‑piece icon first – click it and pin the extension for quick access).

## Is it safe?

**Yes – this extension is completely safe to use.** Here’s why:

- **No data leaves your computer** – it doesn’t collect, send, or share anything. There are no analytics, no trackers, and no hidden servers.
- **100% local** – everything happens inside your browser, on your own machine. It never connects to the internet.
- **Only sees the active tab when you click Start** – it doesn’t read your passwords, browsing history, or any other tabs. The only thing it looks at is the current page URL (to check the filter), and that stays in the extension itself.
- **Open source by nature** – when you load an unpacked extension, you can see every line of code with your own eyes. No obfuscated or minified secrets.
- **Respects the website’s normal rules** – it mimics actual keyboard presses, so it doesn’t bypass the site’s security. It just automates what you could do with your fingers.

**One thing to keep in mind:** Some websites might consider automated key pressing against their terms of service (like TikTok’s). While the tool itself is harmless, repetitive or very fast usage could be flagged as “bot-like”. Use it responsibly and at your own discretion.

## How to use

1. Open the website you want to spam on (e.g., TikTok).
2. Click the **extension icon** in the Chrome toolbar – a small popup window will open.
3. Configure the settings inside the popup:
   - **Key** – the letter or digit you want to press (e.g., `L`).
   - **Press count** – total number of presses (e.g., 1000).
   - **Delay (ms)** – milliseconds between each press (minimum 230). 230 ms is about 4 presses per second.
   - **Only on URL containing** – if you only want it to work on a specific site, type a part of the site’s address here (like `tiktok.com`). You can also click “Use URL” to automatically fill in the current page address.
4. Click **Start** – the key spammer begins immediately on the active tab. The status area will show “Running” and the remaining presses.
5. To pause, click **Stop**. The remaining count is kept, so you can click **Start** again to continue later.
6. If the current page’s address doesn’t match your URL filter, the status will show “URL does not match filter” and nothing will happen – just change the filter or clear it.

## How it works

The extension injects a tiny program into every web page. When you press “Start”, that program creates keyboard events – `keydown` and `keyup` – and sends them directly to the page. This tricks the website into thinking you’re actually pressing keys on your keyboard. There’s no automation tool required, and it works inside any normal Chrome window.

## File overview
```
Spam Extension/
├── content.js ← The on‑page script that really presses the keys
├── manifest.json ← Tells Chrome what the extension can do and where its files are
├── popup.html ← The small window that opens when you click the icon
├── popup.js ← The brains of the popup – saves your settings and communicates
├── popup.css ← The popup’s dark colour styling
├── super-enhanced-icon.png ← The extension’s icon (shown in the toolbar)
└── README.md ← This file – instructions and info about the extension
```

## Notes & limitations

- The keyboard events are **synthetic** – `event.isTrusted` is `false`. Most websites (including TikTok) accept them, but some heavily secured pages (like online banking login fields) might ignore them. For everyday liking and voting, it works perfectly.
- Only **single‑character keys** are supported. Modifier keys like Ctrl, Shift, or Alt cannot be used.
- The extension must stay loaded – closing the browser or navigating to a page where the content script isn’t running will stop the spammer. If you change tabs, it continues on the original tab.
- The minimum delay is 230 ms; slower internet might need a slightly higher delay for reliable presses.

## Troubleshooting

**“Cannot connect to page”** – The current tab might need a refresh. Right‑click the page, choose “Reload”, then try again.  
**Nothing happens after Start** – Make sure the URL filter either matches the current page or is empty. Also check that the “Key” field is not empty.  
**Still stuck?** Open Chrome’s developer console on the page (F12 → Console) and look for any red error messages. If you find one, double‑check that you loaded the extension’s folder correctly.

---

Enjoy effortless spamming! If you find this useful, feel free to share it with friends (but remember to use it responsibly 😄).