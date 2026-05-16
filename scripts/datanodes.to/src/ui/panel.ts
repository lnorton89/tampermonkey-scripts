import { PANEL_ID, UI_REFRESH_MS } from '../config/constants';
import { escapeHtml, getPathLabel } from '../core/dom';
import {
  addLog,
  getActive,
  getLog,
  getQueue,
  nextInQueue,
  setActive,
  setQueue,
} from '../core/storage';
import { buttonStyle, panelStyle } from './styles';

function parseDatanodesUrls(value: string): string[] {
  return value
    .trim()
    .split('\n')
    .map((url) => url.trim())
    .filter((url) => url.startsWith('https://datanodes.to/'));
}

function queryRequiredElement(root: ParentNode, selector: string): Element {
  const element = root.querySelector(selector);

  if (!element) {
    throw new Error(`Missing expected element: ${selector}`);
  }

  return element;
}

export function updateUI(): void {
  const panel = document.getElementById(PANEL_ID);

  if (!panel) {
    return;
  }

  (queryRequiredElement(panel, '#dn-count') as HTMLElement).textContent = String(getQueue().length);

  const activeUrl = getActive();
  (queryRequiredElement(panel, '#dn-active-lbl') as HTMLElement).textContent = activeUrl
    ? getPathLabel(activeUrl)
    : '-';

  (queryRequiredElement(panel, '#dn-log') as HTMLElement).innerHTML = getLog()
    .slice(-30)
    .reverse()
    .map((entry) => `<div>${escapeHtml(entry)}</div>`)
    .join('');
}

export function buildUI(): void {
  if (document.getElementById(PANEL_ID)) {
    return;
  }

  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.style.cssText = panelStyle;
  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <b style="color:#7eb8f7">Datanodes Auto-DL</b>
      <span id="dn-toggle" style="cursor:pointer;opacity:.6">^</span>
    </div>
    <div id="dn-body">
      <textarea id="dn-input" style="width:100%;height:80px;margin-bottom:6px;background:#0d0d1a;color:#ccc;border:1px solid #444;border-radius:4px;padding:4px;font-size:11px;resize:vertical" placeholder="https://datanodes.to/abc123/file.rar&#10;https://datanodes.to/xyz789/file.rar"></textarea>
      <div style="display:flex;gap:6px;margin-bottom:8px">
        <button id="dn-add" style="${buttonStyle('#2d6a4f')}">Add</button>
        <button id="dn-start" style="${buttonStyle('#1d4e89')}">Start</button>
        <button id="dn-clear" style="${buttonStyle('#6b2d2d')}">Clear</button>
      </div>
      <div style="margin-bottom:6px;font-size:11px">
        Queue: <b id="dn-count">0</b> | Active: <b id="dn-active-lbl">-</b>
      </div>
      <div id="dn-log" style="background:#0d0d1a;border:1px solid #333;border-radius:4px;padding:6px;height:100px;overflow-y:auto;font-size:10px;color:#aaa"></div>
    </div>
  `;
  document.body.appendChild(panel);

  let isMinimized = false;
  const body = queryRequiredElement(panel, '#dn-body') as HTMLElement;
  const toggle = queryRequiredElement(panel, '#dn-toggle') as HTMLElement;

  toggle.addEventListener('click', () => {
    isMinimized = !isMinimized;
    body.style.display = isMinimized ? 'none' : 'block';
    toggle.textContent = isMinimized ? 'v' : '^';
  });

  (queryRequiredElement(panel, '#dn-add') as HTMLButtonElement).addEventListener('click', () => {
    const input = queryRequiredElement(panel, '#dn-input') as HTMLTextAreaElement;
    const urls = parseDatanodesUrls(input.value);

    if (urls.length === 0) {
      alert('No valid datanodes.to URLs found.');
      return;
    }

    setQueue([...getQueue(), ...urls]);
    input.value = '';
    addLog(`Added ${String(urls.length)} URL(s)`);
    updateUI();
  });

  (queryRequiredElement(panel, '#dn-start') as HTMLButtonElement).addEventListener('click', () => {
    const next = nextInQueue();

    if (!next) {
      addLog('Queue empty');
      return;
    }

    setActive(next);
    updateUI();
    addLog(`-> ${getPathLabel(next, Number.POSITIVE_INFINITY)}`);
    window.location.href = next;
  });

  (queryRequiredElement(panel, '#dn-clear') as HTMLButtonElement).addEventListener('click', () => {
    setQueue([]);
    setActive('');
    addLog('Cleared');
    updateUI();
  });

  updateUI();
  window.setInterval(updateUI, UI_REFRESH_MS);
}
