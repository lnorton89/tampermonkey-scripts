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

export function WatchlistItem({ entry }) {
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
  const toggleLabel = isLatestWatched(entry) ? 'Unwatch latest' : 'Mark latest watched';
  const summaryPieces = [latestCopy, watchedCopy];

  if (errorCopy) {
    summaryPieces.push(errorCopy);
  }

  return (
    <article className={`${SCRIPT_ID}-watch-item`} data-state={state}>
      <div className={`${SCRIPT_ID}-watch-item-poster`}>
        {entry.poster ? (
          <img src={entry.poster} alt={entry.title} loading="lazy" />
        ) : (
          <div className={`${SCRIPT_ID}-watch-item-poster-placeholder`}>TV</div>
        )}
        <div className={`${SCRIPT_ID}-watch-item-poster-overlay`}>
          <a className={`${SCRIPT_ID}-link-button ${SCRIPT_ID}-open-link`} href={openHref}>
            Open
          </a>
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
        <div className={`${SCRIPT_ID}-watch-actions`}>
          <button
            className={`${SCRIPT_ID}-button`}
            type="button"
            disabled={!entry.latestEpisode}
            onClick={() => toggleLatestEpisodeWatched(entry.slug)}
          >
            {toggleLabel}
          </button>
          <button
            className={`${SCRIPT_ID}-button ${SCRIPT_ID}-danger-button`}
            type="button"
            onClick={() => removeShowFromWatchlist(entry.slug)}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
