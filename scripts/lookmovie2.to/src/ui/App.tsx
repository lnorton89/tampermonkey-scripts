/* eslint-disable */
// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { appState } from '../core/state';
import { saveSettings } from '../core/settings';
import { SCRIPT_ID, UI_ROOT_ID } from '../config/constants';
import { SettingToggle } from './components/SettingToggle';
import { WatchlistPanel } from './components/WatchlistPanel';
import { subscribeUi } from './events';

function isVisible(element) {
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function getControlText(element) {
  return `${element.textContent || ''} ${element.getAttribute('aria-label') || ''} ${
    element.getAttribute('title') || ''
  }`.trim();
}

function findVisibleControl(pattern) {
  return Array.from(document.querySelectorAll('a, button')).find((control) => {
    if (!isVisible(control)) {
      return false;
    }

    return pattern.test(getControlText(control));
  });
}

function findTopBarHostTarget() {
  const signupControl = findVisibleControl(/\bsign\s*up\b|\bsignup\b|\bregister\b/i);

  if (signupControl) {
    const signupItem = signupControl.closest('li');

    if (signupItem && signupItem.parentElement) {
      return {
        parent: signupItem.parentElement,
        before: signupItem.nextSibling,
        sourceItem: signupItem,
      };
    }

    return {
      parent: signupControl.parentElement,
      before: signupControl.nextSibling,
      sourceItem: null,
    };
  }

  const header = document.querySelector('header, nav, .navbar, .main-header, .header');
  return header ? { parent: header, before: null, sourceItem: null } : null;
}

function usesPinnedPosition(element) {
  for (let node = element; node && node !== document.body; node = node.parentElement) {
    const position = getComputedStyle(node).position;
    if (position === 'fixed' || position === 'sticky') {
      return true;
    }
  }

  return false;
}

function ensureLauncherHost() {
  const target = findTopBarHostTarget();

  if (!target || !target.parent) {
    return null;
  }

  if (usesPinnedPosition(target.parent)) {
    return null;
  }

  let host = document.getElementById(`${UI_ROOT_ID}-launcher-host`);

  if (host && host.tagName !== 'LI') {
    host.remove();
    host = null;
  }

  if (!host) {
    host = document.createElement('li');
    host.id = `${UI_ROOT_ID}-launcher-host`;
  }

  if (target.sourceItem && host.className !== target.sourceItem.className) {
    host.className = target.sourceItem.className;
  }

  if (
    target.before !== host &&
    (host.parentElement !== target.parent || host.nextSibling !== target.before)
  ) {
    target.parent.insertBefore(host, target.before);
  }

  return host;
}

function AutoplayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 6.5v11l8.5-5.5L8 6.5z" />
      <path d="M16.5 4.5a7.5 7.5 0 0 1 3.2 9.4l1.6.7A9.3 9.3 0 0 0 17.2 3l-.7 1.5zM7.5 19.5a7.5 7.5 0 0 1-3.2-9.4l-1.6-.7A9.3 9.3 0 0 0 6.8 21l.7-1.5z" />
      <path d="M19.4 15.2 22 15l-1.5 2.2-1.1-2zM4.6 8.8 2 9l1.5-2.2 1.1 2z" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 10V5h5v2H7v3H5zm9-5h5v5h-2V7h-3V5zM7 14v3h3v2H5v-5h2zm10 0h2v5h-5v-2h3v-3z" />
    </svg>
  );
}

function RemoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.1 14.9a7 7 0 0 1 9.8 0l-1.4 1.4a5 5 0 0 0-7 0l-1.4-1.4zm-3.5-3.5a12 12 0 0 1 16.8 0L19 12.8a10 10 0 0 0-14 0l-1.4-1.4zm7 7a2 2 0 0 1 2.8 0L12 19.8l-1.4-1.4zM8 4h8v2H8V4z" />
    </svg>
  );
}

function EnhancerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2.8 14.3 8l5.7.6-4.3 3.8 1.2 5.6-4.9-2.9L7.1 18l1.2-5.6L4 8.6 9.7 8 12 2.8z" />
    </svg>
  );
}

export function LookMovieToolsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [launcherHost, setLauncherHost] = useState(null);
  const [isPageScrolled, setIsPageScrolled] = useState(() => window.scrollY > 120);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const closeQuickSettingsTimer = useRef(0);
  const [, setRevision] = useState(0);

  useEffect(() => subscribeUi(() => setRevision((revision) => revision + 1)), []);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    let attempts = 0;
    function syncHost() {
      const nextHost = ensureLauncherHost();
      setLauncherHost((currentHost) => (currentHost === nextHost ? currentHost : nextHost));

      attempts += 1;
      if (nextHost || attempts > 40) {
        window.clearInterval(intervalId);
      }
    }

    const intervalId = window.setInterval(syncHost, 500);
    syncHost();
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function syncScrollState() {
      setIsPageScrolled(window.scrollY > 120);
    }

    syncScrollState();
    window.addEventListener('scroll', syncScrollState, { passive: true });
    return () => window.removeEventListener('scroll', syncScrollState);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(closeQuickSettingsTimer.current);
    },
    []
  );

  function openModal() {
    setIsOpen(true);
  }

  function openQuickSettings() {
    window.clearTimeout(closeQuickSettingsTimer.current);
    setIsQuickSettingsOpen(true);
  }

  function closeQuickSettingsSoon() {
    window.clearTimeout(closeQuickSettingsTimer.current);
    closeQuickSettingsTimer.current = window.setTimeout(() => {
      setIsQuickSettingsOpen(false);
    }, 240);
  }

  function toggleSetting(settingKey) {
    saveSettings({
      ...appState.settings,
      [settingKey]: !appState.settings[settingKey],
    });
  }

  function updateSetting(settingKey, value) {
    saveSettings({
      ...appState.settings,
      [settingKey]: value,
    });
  }

  const activeLauncherHost = isPageScrolled ? null : launcherHost;
  const launcher = (
    <div
      id={`${UI_ROOT_ID}-launcher`}
      data-hosted={activeLauncherHost ? 'true' : 'false'}
      data-scrolled={isPageScrolled ? 'true' : 'false'}
      data-quick-open={isQuickSettingsOpen ? 'true' : 'false'}
      onMouseEnter={openQuickSettings}
      onMouseLeave={closeQuickSettingsSoon}
      onFocus={openQuickSettings}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeQuickSettingsSoon();
        }
      }}
    >
      <button
        id={`${UI_ROOT_ID}-button`}
        type="button"
        aria-label="Open LookMovie2 Enhancer"
        aria-haspopup="dialog"
        aria-expanded={isOpen ? 'true' : 'false'}
        title="Open enhancer"
        onClick={() => (isOpen ? setIsOpen(false) : openModal())}
      >
        <span id={`${UI_ROOT_ID}-button-icon`}>
          <EnhancerIcon />
        </span>
        <span id={`${UI_ROOT_ID}-button-label`}>Enhancer</span>
      </button>
      <div id={`${UI_ROOT_ID}-quick-settings`} role="toolbar" aria-label="Quick playback settings">
        <button
          className={`${SCRIPT_ID}-quick-setting`}
          type="button"
          aria-label="Toggle auto play"
          title="Toggle auto play"
          data-enabled={appState.settings.autoPlay ? 'true' : 'false'}
          onClick={(event) => {
            event.stopPropagation();
            toggleSetting('autoPlay');
          }}
        >
          <AutoplayIcon />
        </button>
        <button
          className={`${SCRIPT_ID}-quick-setting`}
          type="button"
          aria-label="Toggle auto fullscreen"
          title="Toggle auto fullscreen"
          data-enabled={appState.settings.autoFullscreen ? 'true' : 'false'}
          onClick={(event) => {
            event.stopPropagation();
            toggleSetting('autoFullscreen');
          }}
        >
          <FullscreenIcon />
        </button>
        <button
          className={`${SCRIPT_ID}-quick-setting`}
          type="button"
          aria-label="Toggle ntfy remote"
          title="Toggle ntfy remote"
          data-enabled={appState.settings.ntfyRemoteEnabled ? 'true' : 'false'}
          onClick={(event) => {
            event.stopPropagation();
            toggleSetting('ntfyRemoteEnabled');
          }}
        >
          <RemoteIcon />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {activeLauncherHost ? createPortal(launcher, activeLauncherHost) : launcher}
      <div
        id={`${UI_ROOT_ID}-overlay`}
        aria-hidden={isOpen ? 'false' : 'true'}
        className={isOpen ? `${SCRIPT_ID}-open` : ''}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        <div
          id={`${UI_ROOT_ID}-modal`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${UI_ROOT_ID}-title`}
        >
          <div id={`${UI_ROOT_ID}-header`}>
            <div>
              <h2 id={`${UI_ROOT_ID}-title`}>LookMovie2 Enhancer</h2>
              <p id={`${UI_ROOT_ID}-subtitle`}>
                Playback helpers plus a personal show watchlist with latest episode tracking.
              </p>
            </div>
            <button
              id={`${UI_ROOT_ID}-close`}
              type="button"
              aria-label="Close settings"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <div id={`${UI_ROOT_ID}-content`}>
            <section id={`${UI_ROOT_ID}-settings-panel`}>
              <h3 id={`${UI_ROOT_ID}-settings-title`}>Playback Tools</h3>
              <div id={`${UI_ROOT_ID}-settings`}>
                <SettingToggle
                  settingKey="autoPlay"
                  title="Auto play"
                  copy="Clicks the resume or start button when the playback modal appears."
                  icon={<AutoplayIcon />}
                />
                <SettingToggle
                  settingKey="autoFullscreen"
                  title="Auto fullscreen"
                  copy="Clicks fullscreen and applies the fullscreen fallback after playback starts."
                  icon={<FullscreenIcon />}
                />
                <SettingToggle
                  settingKey="ntfyRemoteEnabled"
                  title="Android remote"
                  copy="Publishes a player notification to ntfy with Android action buttons."
                  icon={<RemoteIcon />}
                />
                <div className={`${SCRIPT_ID}-setting ${SCRIPT_ID}-setting-stack`}>
                  <div>
                    <p className={`${SCRIPT_ID}-setting-title`}>ntfy topics</p>
                    <p className={`${SCRIPT_ID}-setting-copy`}>
                      The phone subscribes to the display topic; the browser listens on the control
                      topic. Use only letters, numbers, hyphens, and underscores.
                    </p>
                  </div>
                  <label className={`${SCRIPT_ID}-field`}>
                    <span>Server</span>
                    <input
                      type="url"
                      value={appState.settings.ntfyServer}
                      placeholder="https://ntfy.sh"
                      onChange={(event) => updateSetting('ntfyServer', event.currentTarget.value)}
                    />
                  </label>
                  <label className={`${SCRIPT_ID}-field`}>
                    <span>Display topic</span>
                    <input
                      type="text"
                      value={appState.settings.ntfyTopic}
                      maxLength={64}
                      pattern="[A-Za-z0-9_-]{1,64}"
                      placeholder="random-private-topic"
                      onChange={(event) => updateSetting('ntfyTopic', event.currentTarget.value)}
                    />
                  </label>
                  <label className={`${SCRIPT_ID}-field`}>
                    <span>Control topic</span>
                    <input
                      type="text"
                      value={appState.settings.ntfyControlTopic}
                      maxLength={64}
                      pattern="[A-Za-z0-9_-]{1,64}"
                      placeholder="display-topic-controls"
                      onChange={(event) =>
                        updateSetting('ntfyControlTopic', event.currentTarget.value)
                      }
                    />
                  </label>
                  <label className={`${SCRIPT_ID}-field`}>
                    <span>Command secret</span>
                    <input
                      type="password"
                      value={appState.settings.ntfyCommandSecret}
                      placeholder="optional shared command prefix"
                      onChange={(event) =>
                        updateSetting('ntfyCommandSecret', event.currentTarget.value)
                      }
                    />
                  </label>
                  <p className={`${SCRIPT_ID}-ntfy-status`} data-status={appState.ntfyRemoteStatus}>
                    {appState.ntfyRemoteMessage || `Remote status: ${appState.ntfyRemoteStatus}`}
                  </p>
                </div>
              </div>
              <div id={`${UI_ROOT_ID}-footer`}>
                Settings and watchlist data are saved locally in your browser.
              </div>
            </section>
            <WatchlistPanel />
          </div>
        </div>
      </div>
    </>
  );
}
