import { createRoot, type Root } from 'react-dom/client';
import { UI_ROOT_ID, UI_STYLE_ID } from '../config/constants';
import { notifyUiChanged } from './events';
import { getUiStyleText } from './styles';
import { LookMovieToolsApp } from './App';

let reactRoot: Root | null = null;

export function ensureUiStyle(): void {
  if (!document.head || document.getElementById(UI_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = UI_STYLE_ID;
  style.textContent = getUiStyleText();

  document.head.appendChild(style);
}

export function ensureUi(): void {
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

export function syncLauncherState(): void {
  notifyUiChanged();
}

export function renderWatchlist(): void {
  notifyUiChanged();
}

export function syncModalState(): void {
  notifyUiChanged();
}
