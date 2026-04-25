/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { SCRIPT_ID, UI_ROOT_ID } from '../config/constants';
import { countUnwatchedLatestEpisodes, refreshWatchlistEntries } from '../features/watchlist';
import { SettingToggle } from './components/SettingToggle';
import { WatchlistPanel } from './components/WatchlistPanel';
import { subscribeUi } from './events';

export function LookMovieToolsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setRevision] = useState(0);
  const newCount = countUnwatchedLatestEpisodes();

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

  function openModal() {
    setIsOpen(true);
    refreshWatchlistEntries();
  }

  return (
    <>
      <button
        id={`${UI_ROOT_ID}-button`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen ? 'true' : 'false'}
        data-has-new={newCount > 0 ? 'true' : 'false'}
        onClick={() => (isOpen ? setIsOpen(false) : openModal())}
      >
        <span id={`${UI_ROOT_ID}-button-label`}>LM Tools</span>
        <span id={`${UI_ROOT_ID}-button-badge`} hidden={newCount <= 0}>
          {newCount}
        </span>
      </button>
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
