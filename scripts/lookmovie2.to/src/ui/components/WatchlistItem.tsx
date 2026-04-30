/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../../config/constants';
import { formatEpisodeLabel } from '../../domain/episodes';
import { buildShowViewUrl } from '../../features/pages';
import {
  isLatestWatched,
  removeShowFromWatchlist,
  toggleLatestEpisodeWatched,
} from '../../features/watchlist';

export function WatchlistItem({ entry, viewMode }) {
  const state = entry.latestEpisode ? (isLatestWatched(entry) ? 'watched' : 'new') : 'pending';
  const latestCopy = entry.latestEpisode
    ? `Latest ${formatEpisodeLabel(entry.latestEpisode)}`
    : 'Latest episode not synced yet';
  const watchedCopy = entry.lastWatched
    ? `Watched through ${formatEpisodeLabel(entry.lastWatched)}`
    : 'Nothing marked watched yet';
  const errorCopy = entry.lastSyncError ? `Sync issue: ${entry.lastSyncError}` : '';
  const statusLabel =
    state === 'new' ? 'New episode' : state === 'watched' ? 'Up to date' : 'Pending sync';
  const openHref = buildShowViewUrl(entry.slug, entry.latestEpisode);
  const toggleLabel = isLatestWatched(entry) ? 'Mark latest unwatched' : 'Mark latest watched';
  const summaryPieces = entry.lastWatched ? [latestCopy, watchedCopy] : [latestCopy];

  if (errorCopy) {
    summaryPieces.push(errorCopy);
  }

  return (
    <article className={`${SCRIPT_ID}-watch-item`} data-state={state} data-view={viewMode}>
      <div className={`${SCRIPT_ID}-watch-item-poster`}>
        <a
          className={`${SCRIPT_ID}-watch-poster-link`}
          href={openHref}
          aria-label={`Open ${entry.title}`}
        >
          {entry.poster ? (
            <img src={entry.poster} alt={entry.title} loading="lazy" />
          ) : (
            <div className={`${SCRIPT_ID}-watch-item-poster-placeholder`}>TV</div>
          )}
        </a>
        <button
          className={`${SCRIPT_ID}-poster-icon-button ${SCRIPT_ID}-poster-check-button`}
          type="button"
          disabled={!entry.latestEpisode}
          aria-label={toggleLabel}
          title={toggleLabel}
          onClick={() => toggleLatestEpisodeWatched(entry.slug)}
        >
          ✓
        </button>
        <button
          className={`${SCRIPT_ID}-poster-icon-button ${SCRIPT_ID}-poster-remove-button`}
          type="button"
          aria-label={`Remove ${entry.title}`}
          title="Remove"
          onClick={() => removeShowFromWatchlist(entry.slug)}
        >
          ×
        </button>
        <div className={`${SCRIPT_ID}-watch-item-poster-overlay`}>
          <span className={`${SCRIPT_ID}-watch-badge`} data-state={state}>
            {statusLabel}
          </span>
        </div>
      </div>
      <div className={`${SCRIPT_ID}-watch-item-body`}>
        <div>
          <a className={`${SCRIPT_ID}-watch-item-title`} href={openHref}>
            {entry.title}
            {entry.year ? ` (${entry.year})` : ''}
          </a>
          <p className={`${SCRIPT_ID}-watch-item-copy`}>{summaryPieces.join(' | ')}</p>
        </div>
      </div>
    </article>
  );
}
