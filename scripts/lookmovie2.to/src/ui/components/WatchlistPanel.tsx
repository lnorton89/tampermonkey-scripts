/* eslint-disable */
// @ts-nocheck
import { useState } from 'react';
import { SCRIPT_ID, UI_ROOT_ID } from '../../config/constants';
import { appState } from '../../core/state';
import { getMovieWatchlistEntries, sortMovieWatchlistEntries } from '../../features/movies';
import {
  getPlaylistEntries,
  getPlaylistSummary,
  startPlaylistPlayback,
  stopPlaylistPlayback,
  sortPlaylistEntries,
} from '../../features/playlist';
import {
  getWatchlistEntries,
  isLatestWatched,
  refreshWatchlistEntries,
  sortWatchlistEntries,
} from '../../features/watchlist';
import { MovieWatchlistItem } from './MovieWatchlistItem';
import { PlaylistItem } from './PlaylistItem';
import { WatchlistItem } from './WatchlistItem';

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 6h3v3H4V6zm5 .5h11v2H9v-2zM4 11h3v3H4v-3zm5 .5h11v2H9v-2zM4 16h3v3H4v-3zm5 .5h11v2H9v-2z" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M17.7 6.3A7.9 7.9 0 0 0 12 4a8 8 0 1 0 7.5 10.7l-1.9-.7A6 6 0 1 1 16.3 7.7L13 11h8V3l-3.3 3.3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 6h12v12H6V6z" />
    </svg>
  );
}

function FoldButton({ id, title, summary, count, isOpen, onClick }) {
  return (
    <button
      id={`${UI_ROOT_ID}-${id}-fold-button`}
      className={`${SCRIPT_ID}-accordion-trigger`}
      type="button"
      aria-expanded={isOpen ? 'true' : 'false'}
      aria-controls={`${UI_ROOT_ID}-${id}-fold-panel`}
      data-open={isOpen ? 'true' : 'false'}
      onClick={onClick}
    >
      <span>
        <strong>{title}</strong>
        <small>{summary}</small>
      </span>
      <em>{count}</em>
    </button>
  );
}

export function WatchlistPanel() {
  const [activeFold, setActiveFold] = useState('watchlist');
  const [activeTab, setActiveTab] = useState('shows');
  const [viewMode, setViewMode] = useState('poster');
  const entries = sortWatchlistEntries(getWatchlistEntries());
  const movieEntries = sortMovieWatchlistEntries(getMovieWatchlistEntries());
  const playlistEntries = sortPlaylistEntries(getPlaylistEntries());
  const newCount = entries.filter((entry) => entry.latestEpisode && !isLatestWatched(entry)).length;
  const unwatchedMovieCount = movieEntries.filter((entry) => !entry.watched).length;
  const isShowsTab = activeTab === 'shows';
  const isWatchlistOpen = activeFold === 'watchlist';
  const isPlaylistOpen = activeFold === 'playlist';
  const watchlistSummary = isShowsTab
    ? entries.length
      ? `${entries.length} tracked ${entries.length === 1 ? 'show' : 'shows'}${newCount ? ` | ${newCount} with a newer latest episode` : ''}`
      : 'Add shows from the latest episodes page to start tracking them.'
    : movieEntries.length
      ? `${movieEntries.length} tracked ${movieEntries.length === 1 ? 'movie' : 'movies'}${unwatchedMovieCount ? ` | ${unwatchedMovieCount} unwatched` : ''}`
      : 'Add movies from the movies page or an individual movie page to start tracking them.';
  const playlistSummary = getPlaylistSummary(playlistEntries);
  const isListView = viewMode === 'list';
  const isPlaylistActive = appState.playlistSession.active;

  return (
    <section id={`${UI_ROOT_ID}-watchlist-panel`}>
      <div className={`${SCRIPT_ID}-accordion`}>
        <FoldButton
          id="watchlist"
          title="Watchlist"
          summary={watchlistSummary}
          count={entries.length + movieEntries.length}
          isOpen={isWatchlistOpen}
          onClick={() => setActiveFold('watchlist')}
        />
        {isWatchlistOpen ? (
          <div
            id={`${UI_ROOT_ID}-watchlist-fold-panel`}
            className={`${SCRIPT_ID}-accordion-panel`}
            role="region"
            aria-labelledby={`${UI_ROOT_ID}-watchlist-fold-button`}
          >
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
              </div>
              <div className={`${SCRIPT_ID}-watchlist-toolbar-actions`}>
                <button
                  className={`${SCRIPT_ID}-button ${SCRIPT_ID}-toolbar-icon-button ${SCRIPT_ID}-view-toggle`}
                  type="button"
                  aria-pressed={isListView ? 'true' : 'false'}
                  aria-label={isListView ? 'Switch to poster view' : 'Switch to list view'}
                  title={isListView ? 'Switch to poster view' : 'Switch to list view'}
                  onClick={() => setViewMode(isListView ? 'poster' : 'list')}
                >
                  {isListView ? <GridIcon /> : <ListIcon />}
                </button>
                {isShowsTab ? (
                  <button
                    id={`${UI_ROOT_ID}-watchlist-refresh`}
                    className={`${SCRIPT_ID}-button ${SCRIPT_ID}-toolbar-icon-button`}
                    type="button"
                    disabled={appState.watchlistBusy}
                    aria-label="Refresh watchlist"
                    title="Refresh watchlist"
                    onClick={() => refreshWatchlistEntries({ force: true })}
                  >
                    <RefreshIcon />
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
          </div>
        ) : null}

        <FoldButton
          id="playlist"
          title="Playlist"
          summary={playlistSummary}
          count={playlistEntries.length}
          isOpen={isPlaylistOpen}
          onClick={() => setActiveFold('playlist')}
        />
        {isPlaylistOpen ? (
          <div
            id={`${UI_ROOT_ID}-playlist-fold-panel`}
            className={`${SCRIPT_ID}-accordion-panel`}
            role="region"
            aria-labelledby={`${UI_ROOT_ID}-playlist-fold-button`}
          >
            <div id={`${UI_ROOT_ID}-playlist-toolbar`}>
              <h3 id={`${UI_ROOT_ID}-playlist-title`}>Playlist</h3>
              <div className={`${SCRIPT_ID}-watchlist-toolbar-actions`}>
                <button
                  className={`${SCRIPT_ID}-button ${SCRIPT_ID}-toolbar-icon-button ${SCRIPT_ID}-playlist-play-button`}
                  type="button"
                  disabled={!playlistEntries.length}
                  aria-label={isPlaylistActive ? 'Stop playlist playback' : 'Play playlist'}
                  title={isPlaylistActive ? 'Stop playlist playback' : 'Play playlist'}
                  data-active={isPlaylistActive ? 'true' : 'false'}
                  onClick={() => {
                    if (isPlaylistActive) {
                      stopPlaylistPlayback();
                    } else {
                      startPlaylistPlayback();
                    }
                  }}
                >
                  {isPlaylistActive ? <StopIcon /> : <PlayIcon />}
                </button>
                <button
                  className={`${SCRIPT_ID}-button ${SCRIPT_ID}-toolbar-icon-button ${SCRIPT_ID}-view-toggle`}
                  type="button"
                  aria-pressed={isListView ? 'true' : 'false'}
                  aria-label={isListView ? 'Switch to poster view' : 'Switch to list view'}
                  title={isListView ? 'Switch to poster view' : 'Switch to list view'}
                  onClick={() => setViewMode(isListView ? 'poster' : 'list')}
                >
                  {isListView ? <GridIcon /> : <ListIcon />}
                </button>
              </div>
            </div>
            <div id={`${UI_ROOT_ID}-playlist-list`} data-view={viewMode}>
              {playlistEntries.length ? (
                playlistEntries.map((entry) => (
                  <PlaylistItem
                    key={entry.key}
                    entry={entry}
                    viewMode={viewMode}
                    isActive={appState.playlistSession.currentKey === entry.key}
                  />
                ))
              ) : (
                <div className={`${SCRIPT_ID}-watch-empty`}>
                  Add a latest show episode from a watchlist poster or list item.
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
