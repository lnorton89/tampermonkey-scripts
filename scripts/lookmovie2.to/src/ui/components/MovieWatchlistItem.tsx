/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../../config/constants';
import { removeMovieFromWatchlist, toggleMovieWatched } from '../../features/movies';
import { buildMovieViewUrl } from '../../features/pages';

export function MovieWatchlistItem({ entry }) {
  const state = entry.watched ? 'watched' : 'new';
  const openHref = entry.href || buildMovieViewUrl(entry.slug);
  const watchedCopy = entry.watched ? 'Watched' : 'Not watched yet';
  const addedCopy = entry.addedAt ? `Added ${new Date(entry.addedAt).toLocaleDateString()}` : '';
  const summaryPieces = [watchedCopy];

  if (addedCopy) {
    summaryPieces.push(addedCopy);
  }

  return (
    <article className={`${SCRIPT_ID}-watch-item`} data-state={state}>
      <div className={`${SCRIPT_ID}-watch-item-poster`}>
        {entry.poster ? (
          <img src={entry.poster} alt={entry.title} loading="lazy" />
        ) : (
          <div className={`${SCRIPT_ID}-watch-item-poster-placeholder`}>MOVIE</div>
        )}
        <div className={`${SCRIPT_ID}-watch-item-poster-overlay`}>
          <a className={`${SCRIPT_ID}-link-button ${SCRIPT_ID}-open-link`} href={openHref}>
            Open
          </a>
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
          <p className={`${SCRIPT_ID}-watch-item-copy`}>{summaryPieces.join(' | ')}</p>
        </div>
        <div className={`${SCRIPT_ID}-watch-actions`}>
          <button
            className={`${SCRIPT_ID}-button`}
            type="button"
            onClick={() => toggleMovieWatched(entry.slug)}
          >
            {entry.watched ? 'Mark unwatched' : 'Mark watched'}
          </button>
          <button
            className={`${SCRIPT_ID}-button ${SCRIPT_ID}-danger-button`}
            type="button"
            onClick={() => removeMovieFromWatchlist(entry.slug)}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
