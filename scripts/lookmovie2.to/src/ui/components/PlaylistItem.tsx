/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../../config/constants';
import { formatEpisodeLabel } from '../../domain/episodes';
import { buildShowPlayUrl } from '../../features/pages';
import { removeFromPlaylist, startPlaylistPlayback } from '../../features/playlist';

export function PlaylistItem({ entry, viewMode, isActive }) {
  const openHref = buildShowPlayUrl(entry.slug, entry.episode);
  const episodeCopy = formatEpisodeLabel(entry.episode);
  const addedCopy = entry.addedAt ? `Queued ${new Date(entry.addedAt).toLocaleDateString()}` : '';
  const summaryPieces = [episodeCopy];

  if (addedCopy) {
    summaryPieces.push(addedCopy);
  }

  return (
    <article
      className={`${SCRIPT_ID}-watch-item`}
      data-state="new"
      data-view={viewMode}
      data-playlist-active={isActive ? 'true' : 'false'}
    >
      <div className={`${SCRIPT_ID}-watch-item-poster`}>
        <a
          className={`${SCRIPT_ID}-watch-poster-link`}
          href={openHref}
          aria-label={`Open ${entry.title} ${episodeCopy}`}
          onClick={(event) => {
            event.preventDefault();
            startPlaylistPlayback(entry.key);
          }}
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
          aria-label={`Remove ${entry.title} ${episodeCopy} from playlist`}
          title="Done"
          onClick={() => removeFromPlaylist(entry.key)}
        >
          âœ“
        </button>
        <button
          className={`${SCRIPT_ID}-poster-icon-button ${SCRIPT_ID}-poster-remove-button`}
          type="button"
          aria-label={`Remove ${entry.title}`}
          title="Remove"
          onClick={() => removeFromPlaylist(entry.key)}
        >
          Ã—
        </button>
        <div className={`${SCRIPT_ID}-watch-item-poster-overlay`}>
          <span className={`${SCRIPT_ID}-watch-badge`} data-state="new">
            {isActive ? 'Playing' : 'Queued'}
          </span>
        </div>
      </div>
      <div className={`${SCRIPT_ID}-watch-item-body`}>
        <div>
          <a
            className={`${SCRIPT_ID}-watch-item-title`}
            href={openHref}
            onClick={(event) => {
              event.preventDefault();
              startPlaylistPlayback(entry.key);
            }}
          >
            {entry.title}
            {entry.year ? ` (${entry.year})` : ''}
          </a>
          <p className={`${SCRIPT_ID}-watch-item-copy`}>{summaryPieces.join(' | ')}</p>
        </div>
      </div>
    </article>
  );
}
