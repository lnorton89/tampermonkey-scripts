/* eslint-disable */
// @ts-nocheck
import { loadSettings } from './storage';

export const appState = {
  settings: loadSettings(),
  domBootstrapped: false,
  skipEpisodeKey: '',
  skipStaleLabel: '',
  skippedSegments: {},
  skipIntroStartTime: null,
  skipIntroControlsNudged: false,
};
