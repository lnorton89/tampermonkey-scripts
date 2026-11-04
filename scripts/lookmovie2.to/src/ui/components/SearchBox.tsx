import { useEffect, useRef, useState, type JSX } from 'react';
import { SCRIPT_ID, SEARCH_DEBOUNCE_MS } from '../../config/constants';
import { addMovieToWatchlist, getMovieWatchlistEntry } from '../../features/movies';
import { searchSiteTitles, type SearchResult, type SearchType } from '../../features/search';
import { addShowToWatchlist, getWatchlistEntry } from '../../features/watchlist';

interface SearchBoxProps {
  type: SearchType;
}

export function SearchBox({ type }: SearchBoxProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState('');
  const requestId = useRef(0);
  const isShows = type === 'shows';

  useEffect(() => {
    setResults([]);
    setStatus('');
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      return undefined;
    }

    const currentRequest = ++requestId.current;
    const runSearch = async (): Promise<void> => {
      setStatus('Searching...');
      try {
        const found = await searchSiteTitles(type, trimmed);
        if (currentRequest === requestId.current) {
          setResults(found);
          setStatus(found.length ? '' : 'No matches.');
        }
      } catch {
        if (currentRequest === requestId.current) {
          setStatus('Search failed. Try again.');
        }
      }
    };
    const timer = window.setTimeout(() => {
      void runSearch();
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query, type]);

  function addResult(result: SearchResult): void {
    if (isShows) {
      void addShowToWatchlist({ ...result });
    } else {
      addMovieToWatchlist({ ...result, href: `/movies/view/${result.slug}` });
    }
  }

  return (
    <div className={`${SCRIPT_ID}-search`}>
      <input
        type="search"
        value={query}
        placeholder={isShows ? 'Search TV shows to add' : 'Search movies to add'}
        aria-label={isShows ? 'Search TV shows to add' : 'Search movies to add'}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            setQuery('');
          }
        }}
      />
      {status ? <p className={`${SCRIPT_ID}-search-status`}>{status}</p> : null}
      {results.length ? (
        <ul className={`${SCRIPT_ID}-search-results`}>
          {results.map((result) => {
            const added = isShows
              ? !!getWatchlistEntry(result.slug)
              : !!getMovieWatchlistEntry(result.slug);
            return (
              <li key={result.slug}>
                {result.poster ? <img src={result.poster} alt="" loading="lazy" /> : <span />}
                <div>
                  <strong>{result.title}</strong>
                  <small>
                    {[result.year, result.rating ? `IMDb ${result.rating}` : '']
                      .filter(Boolean)
                      .join(' · ')}
                  </small>
                </div>
                <button
                  className={`${SCRIPT_ID}-button`}
                  type="button"
                  disabled={added}
                  onClick={() => {
                    addResult(result);
                  }}
                >
                  {added ? 'Added' : 'Add'}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
