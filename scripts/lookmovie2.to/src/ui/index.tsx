/* eslint-disable */
// @ts-nocheck
import { createRoot } from 'react-dom/client';
import { UI_ROOT_ID, UI_STYLE_ID } from '../config/constants';
import { notifyUiChanged } from './events';
import { getUiStyleText } from './styles';
import { LookMovieToolsApp } from './App';

let reactRoot = null;

export function ensureUiStyle() {
  if (!document.head || document.getElementById(UI_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = UI_STYLE_ID;
  style.textContent = getUiStyleText();

  document.head.appendChild(style);
}

export function ensureUi() {
  ensureUiStyle();

  if (!document.body) {
    return;
  }

  let root = document.getElementById(UI_ROOT_ID);
  if (!root) {
    root = document.createElement('div');
    root.id = UI_ROOT_ID;
    document.body.appendChild(root);
  }

  if (!reactRoot) {
    reactRoot = createRoot(root);
    reactRoot.render(<LookMovieToolsApp />);
  }
}

export function syncLauncherState() {
  notifyUiChanged();
}

export function renderWatchlist() {
  notifyUiChanged();
}

export function syncModalState() {
  notifyUiChanged();
}
