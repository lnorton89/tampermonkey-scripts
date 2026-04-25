/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { appState } from '../core/state';
import { saveSettings } from '../core/settings';
import { SCRIPT_ID, UI_ROOT_ID } from '../config/constants';
import { refreshWatchlistEntries } from '../features/watchlist';
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
    return {
      parent: signupControl.parentElement,
      before: signupControl.nextSibling,
    };
  }

  const header = document.querySelector('header, nav, .navbar, .main-header, .header');
  return header ? { parent: header, before: null } : null;
}

function ensureLauncherHost() {
  const target = findTopBarHostTarget();

  if (!target || !target.parent) {
    return null;
  }

  let host = document.getElementById(`${UI_ROOT_ID}-launcher-host`);

  if (!host) {
    host = document.createElement('div');
    host.id = `${UI_ROOT_ID}-launcher-host`;
  }

  if (host.parentElement !== target.parent || host.nextSibling !== target.before) {
    target.parent.insertBefore(host, target.before);
  }

  return host;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5.8v12.4L18.5 12 8 5.8z" />
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

export function LookMovieToolsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [launcherHost, setLauncherHost] = useState(null);
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
    function syncHost() {
      const nextHost = ensureLauncherHost();
      if (nextHost) {
        setLauncherHost((currentHost) => (currentHost === nextHost ? currentHost : nextHost));
      }
    }

    syncHost();
    const intervalId = window.setInterval(syncHost, 500);
    return () => window.clearInterval(intervalId);
  }, []);

  function openModal() {
    setIsOpen(true);
    refreshWatchlistEntries();
  }

  function toggleSetting(settingKey) {
    saveSettings({
      ...appState.settings,
      [settingKey]: !appState.settings[settingKey],
    });
  }

  const launcher = (
    <div id={`${UI_ROOT_ID}-launcher`}>
      <button
        id={`${UI_ROOT_ID}-button`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={() => (isOpen ? setIsOpen(false) : openModal())}
      >
        <span id={`${UI_ROOT_ID}-button-label`}>LM Tools</span>
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
          <PlayIcon />
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
      </div>
    </div>
  );

  return (
    <>
      {launcherHost ? createPortal(launcher, launcherHost) : launcher}
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
                />
                <SettingToggle
                  settingKey="autoFullscreen"
                  title="Auto fullscreen"
                  copy="Clicks fullscreen and applies the fullscreen fallback after playback starts."
                />
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
