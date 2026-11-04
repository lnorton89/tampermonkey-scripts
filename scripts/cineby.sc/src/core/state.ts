import type { NtfyStatus } from '@userscripts/core';
import type { Settings } from '../config/constants';
import { loadSettings } from './storage';

export interface AppState {
  settings: Settings;
  bootstrapped: boolean;
  lastKnownUrl: string;
  lastNotificationAt: number;
  status: NtfyStatus;
  statusMessage: string;
  panelOpen: boolean;
}

export const state: AppState = {
  settings: loadSettings(),
  bootstrapped: false,
  lastKnownUrl: location.href,
  lastNotificationAt: 0,
  status: 'disabled',
  statusMessage: '',
  panelOpen: false,
};
