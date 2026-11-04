export const SCRIPT_ID = 'cineby-enhancer';
export const STORAGE_KEY = `${SCRIPT_ID}:settings`;
export const ACTIVE_TAB_KEY = `${SCRIPT_ID}:ntfy-active-tab`;
export const ACTIVE_TAB_TTL_MS = 15000;
export const ROUTE_POLL_MS = 750;

export interface Settings {
  autoNext: boolean;
  ntfyRemoteEnabled: boolean;
  ntfyServer: string;
  ntfyTopic: string;
  ntfyControlTopic: string;
  ntfyCommandSecret: string;
}

export type BooleanSettingKey = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never;
}[keyof Settings];
export type StringSettingKey = {
  [K in keyof Settings]: Settings[K] extends string ? K : never;
}[keyof Settings];

export const DEFAULT_SETTINGS: Readonly<Settings> = Object.freeze({
  autoNext: true,
  ntfyRemoteEnabled: false,
  ntfyServer: 'https://ntfy.sh',
  ntfyTopic: '',
  ntfyControlTopic: '',
  ntfyCommandSecret: '',
});
