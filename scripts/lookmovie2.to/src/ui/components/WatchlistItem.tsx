import type { JSX } from 'react';
import { SCRIPT_ID } from '../../config/constants';
import type { UpcomingEpisodes, WatchlistEntry } from '../../core/storage';
import { formatEpisodeLabel, isLatestWatched } from '../../domain/episodes';
import { buildShowPlayUrl, buildShowViewUrl } from '../../features/pages';
import { addLatestEpisodeToPlaylist, isEpisodeInPlaylist } from '../../features/playlist';
import {
  episodeResumeKey,
  formatTimeLeft,
  getPartialResumePoint,
} from '../../features/resumePoints';
import {
  getUpcomingEpisodes,
  removeShowFromWatchlist,
  toggleLatestEpisodeWatched,
} from '../../features/watchlist';
import type { ViewMode } from './WatchlistPanel';

interface PrimaryAction {
  href: string;
  label: string;
  detail: string;
}

interface WatchlistItemProps {
  entry: WatchlistEntry;
  viewMode: ViewMode;
}

// Continue the episode in progress, otherwise play the first unwatched one.
function getPrimaryAction(
  entry: WatchlistEntry,
  upcoming: UpcomingEpisodes | null
): PrimaryAction | null {
  const { lastWatched } = entry;
  const inProgress = lastWatched
    ? getPartialResumePoint(episodeResumeKey(lastWatched.idEpisode))
    : null;
  if (lastWatched && inProgress) {
    return {
      href: buildShowPlayUrl(entry.slug, lastWatched),
      label: `Continue ${formatEpisodeLabel(lastWatched)}`,
      detail: formatTimeLeft(inProgress),
    };
  }

  const next = upcoming?.episodes[0];
  return next
    ? {
        href: buildShowPlayUrl(entry.slug, next),
        label: `Play ${formatEpisodeLabel(next)}`,
        detail: '',
      }
    : null;
}

export function WatchlistItem({ entry, viewMode }: WatchlistItemProps): JSX.Element {
  const upcoming = getUpcomingEpisodes(entry);
  const unwatchedCount = upcoming ? upcoming.total : null;
  const action = getPrimaryAction(entry, upcoming);
  const state =
    unwatchedCount !== null
      ? unwatchedCount > 0
        ? 'new'
        : 'watched'
      : entry.latestEpisode
        ? isLatestWatched(entry)
          ? 'watched'
          : 'new'
        : 'pending';
  const latestCopy = entry.latestEpisode
    ? `Latest ${formatEpisodeLabel(entry.latestEpisode)}`
    : 'Latest episode not synced yet';
  const watchedCopy = entry.lastWatched
    ? `Watched through ${formatEpisodeLabel(entry.lastWatched)}`
    : 'Nothing marked watched yet';
  const errorCopy = entry.lastSyncError ? `Sync issue: ${entry.lastSyncError}` : '';
  const statusLabel =
    state === 'new'
      ? unwatchedCount
        ? `${unwatchedCount > 99 ? '99+' : unwatchedCount} unwatched`
        : 'New episode'
      : state === 'watched'
        ? 'Up to date'
        : 'Pending sync';
  const openHref = buildShowViewUrl(entry.slug, entry.latestEpisode);
  const toggleLabel = isLatestWatched(entry) ? 'Mark latest unwatched' : 'Mark latest watched';
  const inPlaylist = isEpisodeInPlaylist(entry.slug, entry.latestEpisode);
  const playlistLabel = inPlaylist
    ? `${entry.title} latest episode is already in your playlist`
    : `Add ${entry.title} latest episode to playlist`;
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
          onClick={() => {
            toggleLatestEpisodeWatched(entry.slug);
          }}
        >
          ✓
        </button>
        <button
          className={`${SCRIPT_ID}-poster-icon-button ${SCRIPT_ID}-poster-playlist-button`}
          type="button"
          disabled={!entry.latestEpisode || inPlaylist}
          aria-label={playlistLabel}
          title={playlistLabel}
          onClick={() => {
            addLatestEpisodeToPlaylist(entry);
          }}
        >
          +
        </button>
        <button
          className={`${SCRIPT_ID}-poster-icon-button ${SCRIPT_ID}-poster-remove-button`}
          type="button"
          aria-label={`Remove ${entry.title}`}
          title="Remove"
          onClick={() => {
            removeShowFromWatchlist(entry.slug);
          }}
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
        {action ? (
          <a className={`${SCRIPT_ID}-watch-action`} href={action.href}>
            <span aria-hidden="true">▶</span> {action.label}
            {action.detail ? <small>{action.detail}</small> : null}
          </a>
        ) : null}
      </div>
    </article>
  );
}
