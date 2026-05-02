const defaults = {
  key: 'L',       
  count: 1000,
  delay: 230,
  urlFilter: ''
};

// Load saved settings and enforce constraints
document.addEventListener('DOMContentLoaded', async () => {
  const stored = await chrome.storage.local.get('spammerConfig');
  const config = stored.spammerConfig || defaults;

  const keyInput = document.getElementById('key');
  const countInput = document.getElementById('count');
  const delayInput = document.getElementById('delay');
  const urlFilterInput = document.getElementById('urlFilter');

  // Display key always in uppercase
  keyInput.value = (config.key || 'L').toUpperCase();
  countInput.value = config.count;
  delayInput.value = Math.max(230, config.delay);
  urlFilterInput.value = config.urlFilter || '';

  // Force uppercase on any input (letters become uppercase, other chars unchanged)
  keyInput.addEventListener('input', function() {
    this.value = this.value.toUpperCase();
    saveConfig();
  });

  // Save other inputs automatically
  [countInput, delayInput, urlFilterInput].forEach(input => {
    input.addEventListener('change', saveConfig);
    input.addEventListener('input', saveConfig);
  });

  // Auto‑correct delay if below 230
  delayInput.addEventListener('input', () => {
    let val = parseInt(delayInput.value, 10);
    if (isNaN(val) || val < 230) {
      delayInput.value = 230;
    }
  });

  document.getElementById('startBtn').addEventListener('click', start);
  document.getElementById('stopBtn').addEventListener('click', stop);

  document.getElementById('useUrlBtn').addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.url) {
        urlFilterInput.value = tab.url;
        await saveConfig();
      }
    } catch (err) {
      console.error('Could not get tab URL:', err);
    }
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === 'status') {
      updateUI(message);
    }
  });

  requestStatus();
});

async function saveConfig() {
  // Always store uppercase version of the key
  const key = document.getElementById('key').value.trim().toUpperCase() || 'L';
  const count = Math.max(1, parseInt(document.getElementById('count').value, 10) || 1000);
  const delay = Math.max(230, parseInt(document.getElementById('delay').value, 10) || 230);
  const urlFilter = document.getElementById('urlFilter').value.trim();

  const config = { key, count, delay, urlFilter };
  await chrome.storage.local.set({ spammerConfig: config });
}

async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.id;
}

async function start() {
  const tabId = await getActiveTabId();
  if (!tabId) return;

  const key = document.getElementById('key').value.trim().toUpperCase() || 'L';
  const count = Math.max(1, parseInt(document.getElementById('count').value, 10) || 1000);
  const delay = Math.max(230, parseInt(document.getElementById('delay').value, 10) || 230);
  const urlFilter = document.getElementById('urlFilter').value.trim();

  const config = { key, count, delay, urlFilter };
  await chrome.storage.local.set({ spammerConfig: config });

  chrome.tabs.sendMessage(tabId, { action: 'start', config })
    .catch(() => setError('Could not start – reload the page?'));
}

async function stop() {
  const tabId = await getActiveTabId();
  if (!tabId) return;
  chrome.tabs.sendMessage(tabId, { action: 'stop' })
    .catch(() => setError('Could not stop'));
}

async function requestStatus() {
  const tabId = await getActiveTabId();
  if (!tabId) return;
  chrome.tabs.sendMessage(tabId, { action: 'getStatus' })
    .then(response => {
      if (response) updateUI(response);
    })
    .catch(() => setError('Cannot connect to page'));
}

function updateUI(data) {
  const statusDiv = document.getElementById('status');
  const remainDiv = document.getElementById('remaining');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');

  statusDiv.className = 'status';

  if (data.status === 'URL mismatch') {
    statusDiv.textContent = 'URL does not match filter';
    statusDiv.classList.add('error');
    startBtn.disabled = false;
    stopBtn.disabled = true;
    remainDiv.textContent = '';
    return;
  }

  if (data.running) {
    statusDiv.textContent = 'Running';
    statusDiv.classList.add('running');
    startBtn.disabled = true;
    stopBtn.disabled = false;
    remainDiv.textContent = `Remaining: ${data.remaining}`;
  } else {
    statusDiv.textContent = 'Stopped';
    statusDiv.classList.add('stopped');
    startBtn.disabled = false;
    stopBtn.disabled = true;
    if (data.remaining !== undefined && data.remaining > 0) {
      remainDiv.textContent = `Remaining: ${data.remaining} (paused)`;
    } else {
      remainDiv.textContent = '';
    }
  }
}

function setError(msg) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = msg;
  statusDiv.className = 'status error';
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
}