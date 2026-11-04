# tampermonkey-scripts

Userscripts for a handful of sites, written in TypeScript and bundled with esbuild. Each site has its own folder; shared code lives in `packages/core`.

| Script | What it does |
| --- | --- |
| [`lookmovie2.to`](scripts/lookmovie2.to) | Watchlist, playlist, resume points, intro skip, auto-next, ntfy remote |
| [`aether.ist`](scripts/aether.ist) | Ad blocking, auto skip intro/recap/credits, playback menu tweaks |
| [`cineby.sc`](scripts/cineby.sc) | Auto-next episode, ntfy remote |
| [`fmovies.nz`](scripts/fmovies.nz) | Keeps subtitles clear of the player controls |
| [`datanodes.to`](scripts/datanodes.to) | Queue of datanodes.to downloads, one at a time |

## Installing

Pick **one** of these per script. Installing both runs the script twice.

- **Direct (recommended):** open `scripts/<site>/dist/<site>.user.js` on GitHub, click **Raw**, and let Tampermonkey install it. Each build stamps a new `@version` (`<version>.<YYYYMMDDHHmm>`), and the header has `@updateURL`, so Tampermonkey picks up new builds on its normal update check (or right away from **Check for userscript updates**).
- **Loader:** install `scripts/<site>/tampermonkey-loader.user.js` instead. It fetches the newest build from GitHub on every page load, so a push is live within about a minute. In exchange, every page load waits on two network requests, it can hit GitHub's anonymous API limit (60 requests an hour), and whatever is on `main` runs right away.

## Layout

```
packages/core/src/      shared helpers, imported as '@userscripts/core'
  storage.ts            GM storage with a localStorage mirror and migration
  settings.ts           typed settings store with normalization
  dom.ts                shared throttled DOM observer, URL-change watcher, visibility helpers
  video.ts              find the active <video>, basic playback controls
  ntfy.ts               ntfy.sh remote control: commands, tab ownership, subscription
scripts/<site>/
  src/meta.ts           the ==UserScript== header (comment only)
  src/index.ts          entry point
  dist/<site>.user.js   built script (committed)
  tampermonkey-loader.user.js   generated loader (committed)
templates/script/       starting point for `npm run new`
tests/                  vitest tests
```

## Development

```bash
npm install
npm run new -- example.com   # scaffold scripts/example.com from the template
npm run build                # build every script (only changed ones are rewritten)
npm run build:watch          # rebuild on save
npm run check                # typecheck, lint, test, and confirm dist/ is up to date
```

Build options: `node build.js --script <site>` builds one script; `--watch` rebuilds on save; `--check` fails if a committed build is stale.

### Trying changes locally without pushing

```bash
node build.js --script <site> --debug --watch
```

This writes an unminified build with source maps to `scripts/<site>/dist-debug/` (gitignored), plus `<site>.dev.user.js`. Install that dev script in Tampermonkey once. It `@require`s the local build, so each rebuild shows up on the next page reload. Turn on **Allow access to file URLs** for the Tampermonkey extension in your browser's extension settings, and disable the regular copy of the script while you test.

### Header

Write the header in `src/meta.ts`. The build copies it into the output and adds `@version` (your version plus a build stamp), `@updateURL` and `@downloadURL`. Bump `@version` in `meta.ts` for real releases. The stamp alone is enough for Tampermonkey to update.

## Checks

- **Pre-commit hook:** typechecks, lints and formats staged files, then builds and stages `dist/` and the loaders.
- **CI** (`.github/workflows/build.yml`): runs on every push and PR. It typechecks, lints, checks formatting, runs the tests, and fails if the committed `dist/` doesn't match a fresh build. CI never commits.
