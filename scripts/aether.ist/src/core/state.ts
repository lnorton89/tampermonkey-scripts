import type { Settings, SkipSegment } from '../config/constants';
import { loadSettings } from './storage';

export interface AppState {
  settings: Settings;
  domBootstrapped: boolean;
  skipEpisodeKey: string;
  skipLastEpisode: string;
  skipStaleEpisode: string;
  skippedSegments: Partial<Record<SkipSegment, boolean>>;
  skipSeekAttempts: Partial<Record<SkipSegment, number>>;
  skipIntroStartTime: number | null;
  skipIntroControlsNudged: boolean;
}

export const appState: AppState = {
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
