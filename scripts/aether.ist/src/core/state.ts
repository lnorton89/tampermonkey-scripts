/* eslint-disable */
// @ts-nocheck
import { loadSettings } from './storage';

export const appState = {
  settings: loadSettings(),
  domBootstrapped: false,
  skipIntroEpisodeKey: '',
  skipIntroStaleLabel: '',
  skipIntroDone: false,
  skipIntroStartTime: null,
  skipIntroControlsNudged: false,
};
