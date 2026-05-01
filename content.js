let spamConfig = null;
let running = false;
let timeoutId = null;
let remaining = 0;

/**
 * Dispatches keydown and keyup events for the given key.
 * Handles common single-character keys (letters, digits).
 */
function simulateKeyPress(key) {
  const keyLower = key.trim().toLowerCase();
  let keyCode = 0;
  let code = '';

  if (keyLower.length === 1) {
    if (/[a-z]/.test(keyLower)) {
      // letters: keyCode = uppercase ASCII code
      code = 'Key' + keyLower.toUpperCase();
      keyCode = keyLower.toUpperCase().charCodeAt(0);
    } else if (/[0-9]/.test(keyLower)) {
      code = 'Digit' + keyLower;
      keyCode = keyLower.charCodeAt(0);
    } else {
      keyCode = keyLower.charCodeAt(0) || 0;
    }
  }

  const eventInit = {
    key: keyLower,
    code: code,
    keyCode: keyCode,
    which: keyCode,
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window
  };

  document.documentElement.dispatchEvent(new KeyboardEvent('keydown', eventInit));
  // Brief delay before keyup for realism
  setTimeout(() => {
    document.documentElement.dispatchEvent(new KeyboardEvent('keyup', eventInit));
  }, 10);
}

function scheduleNext() {
  if (!running || remaining <= 0) {
    if (running && remaining <= 0) stopSpam();
    return;
  }
  simulateKeyPress(spamConfig.key);
  remaining--;
  sendStatus('running');
  timeoutId = setTimeout(scheduleNext, spamConfig.delay);
}

function startSpam(config) {
  if (running) return;
  if (!config.count || config.count <= 0) return;

  if (config.urlFilter) {
    if (!window.location.href.includes(config.urlFilter)) {
      sendStatus('URL mismatch');
      return;
    }
  }

  spamConfig = config;
  remaining = config.count;
  running = true;
  sendStatus('running');
  scheduleNext();
}

function stopSpam() {
  running = false;
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  sendStatus('stopped');
}

function sendStatus(statusOverride) {
  const status = statusOverride || (running ? 'running' : 'stopped');
  chrome.runtime.sendMessage({
    action: 'status',
    status: status,
    running: running,
    remaining: remaining
  }).catch(() => {}); // popup might be closed
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') {
    startSpam(message.config);
    sendResponse({ result: 'started' });
  } else if (message.action === 'stop') {
    stopSpam();
    sendResponse({ result: 'stopped' });
  } else if (message.action === 'getStatus') {
    sendResponse({
      running: running,
      remaining: remaining,
      status: running ? 'running' : 'stopped'
    });
  }
});