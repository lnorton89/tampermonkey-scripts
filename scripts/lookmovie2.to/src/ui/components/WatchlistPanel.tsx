/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID, UI_ROOT_ID } from '../../config/constants';
import { appState } from '../../core/state';
import {
  getWatchlistEntries,
  isLatestWatched,
  refreshWatchlistEntries,
  sortWatchlistEntries,
} from '../../features/watchlist';
import { WatchlistItem } from './WatchlistItem';

export function WatchlistPanel() {
  const entries = sortWatchlistEntries(getWatchlistEntries());
  const newCount = entries.filter((entry) => entry.latestEpisode && !isLatestWatched(entry)).length;
  const summary = entries.length
    ? `${entries.length} tracked ${entries.length === 1 ? 'show' : 'shows'}${newCount ? ` | ${newCount} with a newer latest episode` : ''}`
    : 'Add shows from the latest episodes page to start tracking them.';

  return (
    <section id={`${UI_ROOT_ID}-watchlist-panel`}>
      <div id={`${UI_ROOT_ID}-watchlist-toolbar`}>
        <div>
          <h3 id={`${UI_ROOT_ID}-watchlist-title`}>Watchlist</h3>
          <div id={`${UI_ROOT_ID}-watchlist-summary`}>{summary}</div>
        </div>
        <button
          id={`${UI_ROOT_ID}-watchlist-refresh`}
          className={`${SCRIPT_ID}-button`}
          type="button"
          disabled={appState.watchlistBusy}
          onClick={() => refreshWatchlistEntries({ force: true })}
        >
          Refresh
        </button>
      </div>
      <div id={`${UI_ROOT_ID}-watchlist-status`} data-tone={appState.watchlistMessageTone}>
        {appState.watchlistBusy
          ? appState.watchlistMessage || 'Refreshing watchlist...'
          : appState.watchlistMessage || ''}
      </div>
      <div id={`${UI_ROOT_ID}-watchlist-list`}>
        {entries.length ? (
          entries.map((entry) => <WatchlistItem key={entry.slug} entry={entry} />)
        ) : (
          <div className={`${SCRIPT_ID}-watch-empty`}>
            On the /shows page, use the overlay button on any episode card to add that show to your
            personal watchlist.
          </div>
        )}
      </div>
    </section>
  );
}
