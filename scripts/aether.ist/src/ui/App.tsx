/* eslint-disable */
// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { appState } from '../core/state';
import { saveSettings } from '../core/settings';
import {
  LAUNCHER_IDLE_HIDE_MS,
  PLAYER_PATH_PATTERN,
  SCRIPT_ID,
  UI_ROOT_ID,
} from '../config/constants';
import { SettingToggle } from './components/SettingToggle';
import { subscribeUi } from './events';

function SkipIntroIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 6.5v11l8-5.5-8-5.5zm8 0v11l8-5.5-8-5.5z" />
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

// On the player the launcher sits over the video, so it fades out with the site's own controls.
function useLauncherIdle() {
  const [isIdle, setIsIdle] = useState(false);
  const idleTimer = useRef(0);

  useEffect(() => {
    function markActive() {
      window.clearTimeout(idleTimer.current);
      setIsIdle(false);

      if (PLAYER_PATH_PATTERN.test(location.pathname)) {
        idleTimer.current = window.setTimeout(() => setIsIdle(true), LAUNCHER_IDLE_HIDE_MS);
      }
    }

    markActive();
    window.addEventListener('mousemove', markActive, { passive: true });
    window.addEventListener('pointerdown', markActive, { passive: true });
    window.addEventListener('keydown', markActive);
    return () => {
      window.clearTimeout(idleTimer.current);
      window.removeEventListener('mousemove', markActive);
      window.removeEventListener('pointerdown', markActive);
      window.removeEventListener('keydown', markActive);
    };
  }, []);

  return isIdle;
}

function useIsFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);

  useEffect(() => {
    function syncFullscreen() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  return isFullscreen;
}

export function AetherToolsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const closeQuickSettingsTimer = useRef(0);
  const [, setRevision] = useState(0);
  const isIdle = useLauncherIdle();
  const isFullscreen = useIsFullscreen();

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

  useEffect(
    () => () => {
      window.clearTimeout(closeQuickSettingsTimer.current);
    },
    []
  );

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

  const isLauncherHidden = isFullscreen || (isIdle && !isQuickSettingsOpen && !isOpen);

  return (
    <>
      <div
        id={`${UI_ROOT_ID}-launcher`}
        data-hidden={isLauncherHidden ? 'true' : 'false'}
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
          aria-label="Open Aether Enhancer"
          aria-haspopup="dialog"
          aria-expanded={isOpen ? 'true' : 'false'}
          title="Open enhancer"
          onClick={() => setIsOpen((open) => !open)}
        >
          <EnhancerIcon />
        </button>
        <div
          id={`${UI_ROOT_ID}-quick-settings`}
          role="toolbar"
          aria-label="Quick playback settings"
        >
          <button
            className={`${SCRIPT_ID}-quick-setting`}
            type="button"
            aria-label="Toggle auto skip intro"
            title="Toggle auto skip intro"
            data-enabled={appState.settings.autoSkipIntro ? 'true' : 'false'}
            onClick={(event) => {
              event.stopPropagation();
              toggleSetting('autoSkipIntro');
            }}
          >
            <SkipIntroIcon />
          </button>
        </div>
      </div>
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
              <h2 id={`${UI_ROOT_ID}-title`}>Aether Enhancer</h2>
              <p id={`${UI_ROOT_ID}-subtitle`}>Playback helpers for the Aether player.</p>
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
                  settingKey="autoSkipIntro"
                  title="Auto skip intro"
                  copy="Skips the intro when the episode has intro timestamps. Cold opens before the intro still play."
                  icon={<SkipIntroIcon />}
                />
              </div>
              <div id={`${UI_ROOT_ID}-footer`}>
                Settings are saved in Tampermonkey storage on this browser.
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
