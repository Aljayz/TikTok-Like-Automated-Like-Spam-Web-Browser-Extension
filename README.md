# Spam Extension – Key Spammer

A Web extension that automatically presses a chosen key repeatedly, with configurable count and delay. Perfect for spamming shortcuts like the TikTok "Like" (press `L`) or any other keyboard-driven action on a webpage.

## Features

- **Customizable key** – any single character (letters, digits).
- **Press count** – set how many times the key should be pressed.
- **Adjustable delay** – milliseconds between each simulated press.
- **URL filter** – only work on pages whose URL contains a specified string (e.g., `tiktok.com`).
- **Start / Stop anytime** – pause and resume without losing progress.
- **Synthetic keyboard events** – dispatches full `keydown` + `keyup`, so it triggers real website shortcuts just like a physical keyboard.

## Installation

1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top‑right corner).
4. Click **Load unpacked** and select the folder containing the extension files (`manifest.json`, etc.).
5. The extension icon will appear in the toolbar.

## Usage

1. Click the extension icon to open the popup.
2. Configure the settings:
   - **Key** – the key you want to spam (e.g., `l`)
   - **Press count** – total number of presses (default: 100)
   - **Delay (ms)** – time between each press (default: 500 ms)
   - **URL filter** – leave empty to work on any page, or enter `tiktok.com` to only spam on TikTok
3. Click **Start** – the spammer begins on the active tab.
4. Click **Stop** at any time to pause. Remaining count is kept, so you can resume later.
5. The status area shows whether it’s running, stopped, or if the current URL doesn’t match the filter.

## How It Works

The extension injects a content script (`content.js`) into every page. That script listens for commands from the popup (`popup.js`) and uses JavaScript's `KeyboardEvent` constructor to fire `keydown` and `keyup` events on the `documentElement`. This triggers the same event listeners that a real key press would, making page‑specific shortcuts (like TikTok’s `L` for like) work.

## File Structure

```
Spam Extension/
├── content.js       # Content script – handles simulated keypresses
├── icon.png         # Extension icon (48×48 PNG)
├── manifest.json    # Extension configuration
├── popup.css        # Popup styles
├── popup.html       # Popup interface
└── popup.js         # Popup logic & communication with content script
```

## Limitations

- Because the events are **synthetic**, `event.isTrusted` is `false`. Some websites (e.g., banking or strict form validations) may ignore them.
- Only single‑character keys are currently supported; modifier keys (Ctrl, Shift, etc.) are not.
- The extension must stay loaded; closing the browser or navigating away stops the spammer.

