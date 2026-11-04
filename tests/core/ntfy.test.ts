import { describe, expect, it, vi } from 'vitest';
import {
  buildAction,
  buildSubscribeUrl,
  createTabClaimStore,
  getControlTopic,
  getTopicConfigurationError,
  parseCommand,
  runRemoteCommand,
  type NtfyConfig,
  type RemoteCommandHandlers,
} from '@userscripts/core';

const config = (overrides: Partial<NtfyConfig> = {}): NtfyConfig => ({
  enabled: true,
  server: 'https://ntfy.sh/',
  topic: 'my-topic',
  controlTopic: '',
  secret: '',
  ...overrides,
});

describe('topics', () => {
  it('defaults the control topic to <topic>-controls', () => {
    expect(getControlTopic(config())).toBe('my-topic-controls');
    expect(getControlTopic(config({ controlTopic: '/custom/' }))).toBe('custom');
  });

  it('reports invalid topics', () => {
    expect(getTopicConfigurationError(config())).toBe('');
    expect(getTopicConfigurationError(config({ topic: '' }))).toBe('Display topic is required.');
    expect(getTopicConfigurationError(config({ controlTopic: 'bad topic' }))).toMatch(/^Control/);
    expect(getTopicConfigurationError(config({ topic: 'x'.repeat(65) }))).toMatch(/64 characters/);
  });

  it('builds the subscribe URL without a trailing slash on the server', () => {
    const url = buildSubscribeUrl(config(), 1_700_000_000_000);
    expect(url).toBe('https://ntfy.sh/my-topic-controls/sse?since=1700000000');
    expect(buildSubscribeUrl(config({ topic: '' }))).toBe('');
  });

  it('builds action buttons that include the secret', () => {
    expect(buildAction(config({ secret: 's3' }), 'Pause', 'pause')).toEqual({
      action: 'http',
      label: 'Pause',
      url: 'https://ntfy.sh/my-topic-controls',
      method: 'POST',
      body: 's3 pause',
      clear: false,
    });
  });
});

describe('parseCommand', () => {
  it('parses plain-text commands', () => {
    expect(parseCommand('PAUSE', '')).toEqual({ command: 'pause' });
    expect(parseCommand('seek -10', '')).toEqual({ command: 'seek', seconds: -10 });
    expect(parseCommand('volume 40', '')).toEqual({ command: 'volume', percent: 40 });
  });

  it('rejects numeric commands without a number', () => {
    expect(parseCommand('seek ten', '')).toBeNull();
    expect(parseCommand('volume loud', '')).toBeNull();
  });

  it('parses JSON commands', () => {
    expect(parseCommand('{"command":"seek","by":30}', '')).toEqual({
      command: 'seek',
      seconds: 30,
    });
    expect(parseCommand('{"action":"Play"}', '')).toEqual({ command: 'play' });
  });

  it('requires the secret when one is set', () => {
    expect(parseCommand('pause', 'abc')).toBeNull();
    expect(parseCommand('abc pause', 'abc')).toEqual({ command: 'pause' });
    expect(parseCommand('abcpause', 'abc')).toBeNull();
    expect(parseCommand('{"command":"pause"}', 'abc')).toBeNull();
    expect(parseCommand('{"command":"pause","secret":"abc"}', 'abc')).toEqual({ command: 'pause' });
  });

  it('ignores empty messages', () => {
    expect(parseCommand('   ', '')).toBeNull();
    expect(parseCommand(undefined, '')).toBeNull();
  });
});

describe('runRemoteCommand', () => {
  const handlers = (): RemoteCommandHandlers => ({
    play: vi.fn(() => true),
    pause: vi.fn(() => true),
    toggle: vi.fn(() => true),
    seekBy: vi.fn(() => true),
    fullscreen: vi.fn(() => true),
    next: vi.fn(() => true),
    setMuted: vi.fn(() => true),
    setVolume: vi.fn(() => true),
  });

  it('dispatches commands and aliases', () => {
    const h = handlers();
    expect(runRemoteCommand({ command: 'play-pause' }, h)).toBe(true);
    expect(h.toggle).toHaveBeenCalled();
    runRemoteCommand({ command: 'fs' }, h);
    expect(h.fullscreen).toHaveBeenCalled();
    runRemoteCommand({ command: 'unmute' }, h);
    expect(h.setMuted).toHaveBeenCalledWith(false);
    runRemoteCommand({ command: 'seek', seconds: 5 }, h);
    expect(h.seekBy).toHaveBeenCalledWith(5);
  });

  it('returns false for unknown commands', () => {
    expect(runRemoteCommand({ command: 'dance' }, handlers())).toBe(false);
  });
});

describe('createTabClaimStore', () => {
  it('lets the first tab claim and blocks others until the claim expires', () => {
    const a = createTabClaimStore('claim', 1000, 'a');
    const b = createTabClaimStore('claim', 1000, 'b');

    expect(b.isCurrent()).toBe(true);
    a.write('Show');
    expect(a.isCurrent()).toBe(true);
    expect(b.isCurrent()).toBe(false);
    expect(b.isCurrent(Date.now() + 2000)).toBe(true);
  });

  it('only clears its own claim', () => {
    const a = createTabClaimStore('claim', 1000, 'a');
    const b = createTabClaimStore('claim', 1000, 'b');
    a.write('Show');
    b.clear();
    expect(a.read()?.tabId).toBe('a');
    a.clear();
    expect(a.read()).toBeNull();
  });
});
