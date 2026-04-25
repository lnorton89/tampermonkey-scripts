# LookMovie2 Enhancer

Script-local React/TypeScript workspace for the LookMovie2 Tampermonkey enhancer.

This script runs on `*.lookmovie2.to` and adds a small floating `LM Tools` overlay plus page-level
helpers for show tracking and playback quality of life.

## Features

- Playback helpers:
  - Auto-clicks the playback resume/start prompt when enabled.
  - Attempts the site's Video.js fullscreen control after playback starts.
  - Applies a windowed fullscreen fallback when browser fullscreen is not available.
- Personal watchlist:
  - Adds show watch buttons to the `/shows` latest-episodes page.
  - Adds a show watch button to individual `/shows/view/...` pages.
  - Adds movie watch buttons to movie listing/detail pages when movie links are detected.
  - Splits the overlay watchlist into `TV Shows` and `Movies` tabs.
  - Stores watchlist data locally in browser `localStorage`.
  - Fetches latest episode metadata from LookMovie's episode API.
  - Tracks whether the latest episode is watched or new.
  - Tracks movie watched/unwatched state separately from TV progress.
  - Updates watched progress when playback is opened for a tracked show.
- React overlay:
  - Floating launcher with a badge for shows with unwatched latest episodes.
  - Settings panel for playback options.
  - Scrollable watchlist grid with poster cards, latest/watched status, open links, and actions.

## Runtime Model

The generated userscript is still a single bundled `.user.js` file. React is compiled into the
bundle by esbuild, so Tampermonkey does not need to load React from a CDN at runtime.

The script keeps two localStorage records:

```text
lookmovie2-enhancer:settings
lookmovie2-enhancer:watchlist
lookmovie2-enhancer:movie-watchlist
```

State is kept in `src/core/state.ts`. Most feature code mutates that shared state, persists where
needed, and then calls the UI bridge in `src/ui/events.ts` so the React overlay re-renders.

## Commands

Run these from `scripts/lookmovie2.to`:

```sh
npm run build
npm run build:watch
npm run build:debug
npm run typecheck
npm run lint
npm run format
```

The generated Tampermonkey bundle is written to `dist/lookmovie2.to.user.js`.

From the repo root, `npm run build` still builds every script. The root build script also supports:

```sh
node build.js --script lookmovie2.to
node build.js --script lookmovie2.to --watch
node build.js --script lookmovie2.to --debug
```

## Source Layout

```text
src/
  app/              bootstrapping and route polling
  config/           script constants and storage keys
  core/             app state, settings, storage, shared utilities
  domain/           domain helpers such as episode parsing/comparison
  features/
    pages.ts        DOM integration for movie/show list and detail pages
    movies.ts       movie watchlist CRUD and watched state
    player.ts       autoplay, fullscreen fallback, video observer
    watchlist.ts    TV watchlist CRUD, refresh, latest/watched state
  ui/               React overlay, components, styles, UI event bridge
  index.ts          userscript entrypoint
  meta.ts           Tampermonkey metadata banner
```

## Important Files

- `src/index.ts`: userscript entrypoint. Imports metadata and starts bootstrapping.
- `src/meta.ts`: Tampermonkey metadata banner. Build prepends this to the bundled script.
- `src/app/bootstrap.ts`: waits for DOM readiness, starts video/page observers, and reacts to URL changes.
- `src/core/storage.ts`: localStorage parsing, normalization, and persistence helpers.
- `src/features/watchlist.ts`: main TV watchlist service. Handles add/remove, refresh, watched state, and playback progress updates.
- `src/features/movies.ts`: movie watchlist service. Handles add/remove and watched state for movie entries.
- `src/features/pages.ts`: injects watchlist buttons into LookMovie pages and keeps their labels in sync.
- `src/features/player.ts`: attaches video listeners and fullscreen/autoplay behavior.
- `src/ui/App.tsx`: React overlay shell.
- `src/ui/components/`: focused React components for settings and watchlist cards.
- `src/ui/styles.ts`: CSS injected into the page by the userscript.
- `src/ui/events.ts`: tiny event bridge used by non-React code to request React re-renders.

## Data Flow

1. `bootstrapDomFeatures()` starts video observation, route polling, and UI mounting.
2. Page helpers add buttons to LookMovie cards or show pages.
3. Button clicks call watchlist service functions.
4. Watchlist service functions mutate `appState.watchlistStore`, persist to localStorage, and notify the UI.
5. React components read from `appState` on render and display the latest state.

## Build Notes

- The repo root is an npm workspace and includes this script package.
- The script package has its own `package.json` so local commands are focused on LookMovie only.
- Root `tsconfig.json` supports `.tsx`; the script-local `tsconfig.json` extends it.
- React increases the generated bundle size, but keeps the overlay easier to maintain.
