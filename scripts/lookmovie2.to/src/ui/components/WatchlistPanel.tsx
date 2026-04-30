/* eslint-disable */
// @ts-nocheck
import { useState } from 'react';
import { SCRIPT_ID, UI_ROOT_ID } from '../../config/constants';
import { appState } from '../../core/state';
import { getMovieWatchlistEntries, sortMovieWatchlistEntries } from '../../features/movies';
import {
  getWatchlistEntries,
  isLatestWatched,
  refreshWatchlistEntries,
  sortWatchlistEntries,
} from '../../features/watchlist';
import { MovieWatchlistItem } from './MovieWatchlistItem';
import { WatchlistItem } from './WatchlistItem';

export function WatchlistPanel() {
  const [activeTab, setActiveTab] = useState('shows');
  const [viewMode, setViewMode] = useState('poster');
  const entries = sortWatchlistEntries(getWatchlistEntries());
  const movieEntries = sortMovieWatchlistEntries(getMovieWatchlistEntries());
  const newCount = entries.filter((entry) => entry.latestEpisode && !isLatestWatched(entry)).length;
  const unwatchedMovieCount = movieEntries.filter((entry) => !entry.watched).length;
  const isShowsTab = activeTab === 'shows';
  const summary = isShowsTab
    ? entries.length
      ? `${entries.length} tracked ${entries.length === 1 ? 'show' : 'shows'}${newCount ? ` | ${newCount} with a newer latest episode` : ''}`
      : 'Add shows from the latest episodes page to start tracking them.'
    : movieEntries.length
      ? `${movieEntries.length} tracked ${movieEntries.length === 1 ? 'movie' : 'movies'}${unwatchedMovieCount ? ` | ${unwatchedMovieCount} not watched yet` : ''}`
      : 'Add movies from the movies page or an individual movie page to start tracking them.';
  const isListView = viewMode === 'list';

  return (
    <section id={`${UI_ROOT_ID}-watchlist-panel`}>
      <div id={`${UI_ROOT_ID}-watchlist-toolbar`}>
        <div>
          <h3 id={`${UI_ROOT_ID}-watchlist-title`}>Watchlist</h3>
          <div className={`${SCRIPT_ID}-tabs`} role="tablist" aria-label="Watchlist type">
            <button
              className={`${SCRIPT_ID}-tab`}
              type="button"
              role="tab"
              aria-selected={isShowsTab ? 'true' : 'false'}
              data-active={isShowsTab ? 'true' : 'false'}
              onClick={() => setActiveTab('shows')}
            >
              TV Shows
              {newCount > 0 ? <span>{newCount}</span> : null}
            </button>
            <button
              className={`${SCRIPT_ID}-tab`}
              type="button"
              role="tab"
              aria-selected={!isShowsTab ? 'true' : 'false'}
              data-active={!isShowsTab ? 'true' : 'false'}
              onClick={() => setActiveTab('movies')}
            >
              Movies
              {unwatchedMovieCount > 0 ? <span>{unwatchedMovieCount}</span> : null}
            </button>
          </div>
          <div id={`${UI_ROOT_ID}-watchlist-summary`}>{summary}</div>
        </div>
        <div className={`${SCRIPT_ID}-watchlist-toolbar-actions`}>
          <button
            className={`${SCRIPT_ID}-button ${SCRIPT_ID}-view-toggle`}
            type="button"
            aria-pressed={isListView ? 'true' : 'false'}
            title={isListView ? 'Switch to poster view' : 'Switch to list view'}
            onClick={() => setViewMode(isListView ? 'poster' : 'list')}
          >
            {isListView ? 'Poster View' : 'List View'}
          </button>
          {isShowsTab ? (
            <button
              id={`${UI_ROOT_ID}-watchlist-refresh`}
              className={`${SCRIPT_ID}-button`}
              type="button"
              disabled={appState.watchlistBusy}
              onClick={() => refreshWatchlistEntries({ force: true })}
            >
              Refresh
            </button>
          ) : null}
        </div>
      </div>
      {isShowsTab ? (
        <div id={`${UI_ROOT_ID}-watchlist-status`} data-tone={appState.watchlistMessageTone}>
          {appState.watchlistBusy
            ? appState.watchlistMessage || 'Refreshing watchlist...'
            : appState.watchlistMessage || ''}
        </div>
      ) : null}
      <div id={`${UI_ROOT_ID}-watchlist-list`} data-view={viewMode}>
        {isShowsTab && entries.length ? (
          entries.map((entry) => (
            <WatchlistItem key={entry.slug} entry={entry} viewMode={viewMode} />
          ))
        ) : !isShowsTab && movieEntries.length ? (
          movieEntries.map((entry) => (
            <MovieWatchlistItem key={entry.slug} entry={entry} viewMode={viewMode} />
          ))
        ) : (
          <div className={`${SCRIPT_ID}-watch-empty`}>
            {isShowsTab
              ? 'On the /shows page or an individual show page, use the watchlist button to add that show here.'
              : 'On the /movies page or an individual movie page, use the movie watchlist button to add a movie here.'}
          </div>
        )}
      </div>
    </section>
  );
}
