/* eslint-disable */
// @ts-nocheck
import { loadSettings } from './storage';

export const appState = {
  settings: loadSettings(),
  domBootstrapped: false,
  skipEpisodeKey: '',
  skipLastEpisode: '',
  skipStaleEpisode: '',
  skippedSegments: {},
  skipSeekAttempts: {},
  skipIntroStartTime: null,
  skipIntroControlsNudged: false,
};
