/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../../config/constants';
import { removeMovieFromWatchlist, toggleMovieWatched } from '../../features/movies';
import { buildMovieViewUrl } from '../../features/pages';

export function MovieWatchlistItem({ entry, viewMode }) {
  const state = entry.watched ? 'watched' : 'new';
  const openHref = entry.href || buildMovieViewUrl(entry.slug);
  const addedCopy = entry.addedAt ? `Added ${new Date(entry.addedAt).toLocaleDateString()}` : '';
  const summaryPieces = [];

  if (addedCopy) {
    summaryPieces.push(addedCopy);
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
            <div className={`${SCRIPT_ID}-watch-item-poster-placeholder`}>MOVIE</div>
          )}
        </a>
        <button
          className={`${SCRIPT_ID}-poster-icon-button ${SCRIPT_ID}-poster-check-button`}
          type="button"
          aria-label={
            entry.watched ? `Mark ${entry.title} unwatched` : `Mark ${entry.title} watched`
          }
          title={entry.watched ? 'Mark unwatched' : 'Mark watched'}
          onClick={() => toggleMovieWatched(entry.slug)}
        >
          ✓
        </button>
        <button
          className={`${SCRIPT_ID}-poster-icon-button ${SCRIPT_ID}-poster-remove-button`}
          type="button"
          aria-label={`Remove ${entry.title}`}
          title="Remove"
          onClick={() => removeMovieFromWatchlist(entry.slug)}
        >
          ×
        </button>
        <div className={`${SCRIPT_ID}-watch-item-poster-overlay`}>
          <span className={`${SCRIPT_ID}-watch-badge`} data-state={state}>
            {entry.watched ? 'Watched' : 'To watch'}
          </span>
        </div>
      </div>
      <div className={`${SCRIPT_ID}-watch-item-body`}>
        <div>
          <a className={`${SCRIPT_ID}-watch-item-title`} href={openHref}>
            {entry.title}
            {entry.year ? ` (${entry.year})` : ''}
          </a>
          {summaryPieces.length ? (
            <p className={`${SCRIPT_ID}-watch-item-copy`}>{summaryPieces.join(' | ')}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
