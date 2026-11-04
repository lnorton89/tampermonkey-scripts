import type { Settings } from '../config/constants';
import { restartNtfyRemote } from '../features/remote';
import { renderPanel } from '../ui/panel';
import { state } from './state';
import { normalizeSettings, persistSettings } from './storage';

export function saveSettings(nextSettings: Settings): void {
  state.settings = normalizeSettings(nextSettings);
  persistSettings(state.settings);
  renderPanel();
  restartNtfyRemote();
}
