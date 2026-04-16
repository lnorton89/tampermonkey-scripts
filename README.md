# tampermonkey-scripts

Monorepo for userscripts. Each site gets its own folder with clean TypeScript source. On every push to `main`, GitHub Actions lints, typechecks, and builds — then commits the compiled `.user.js` files back so they're always available via `raw.githubusercontent.com`.

## Structure

```
scripts/
  <site-name>/
    src/
      meta.ts        ← @userscript header block (comment only)
      index.ts       ← entry point
      utils.ts       ← helpers, split as needed
    dist/
      <site-name>.user.js   ← compiled output (committed by CI)
    tampermonkey-loader.user.js  ← install this in Tampermonkey once
```

## Adding a new script

1. Copy the `example-site` folder:
   ```bash
   cp -r scripts/example-site scripts/my-new-site
   ```
2. Update `meta.ts` with the correct `@match` URLs and script name.
3. Write your code in `src/`. Split into as many files as you like — esbuild bundles it all.
4. Update `tampermonkey-loader.user.js` with the new raw URL.
5. Install the loader in Tampermonkey. Done.

## Local development

```bash
npm install
npm run build          # build all scripts once
npm run build:watch    # rebuild on save
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
```

The `dist/` files are committed locally too, so you can point the loader at your local dev server or just let CI handle it.

## How the loader works

The `tampermonkey-loader.user.js` file is the only thing you install in Tampermonkey. It fetches the compiled `dist/*.user.js` from this repo's raw GitHub URL and `eval()`s it at runtime. This means:

- You never have to touch Tampermonkey again after the initial install
- Iterate freely in `src/`, commit, CI builds it, the loader picks it up automatically
- Cache-busting via `?_=<timestamp>` prevents stale CDN responses during active dev

## CI / GitHub Actions

The workflow (`.github/workflows/build.yml`):

1. Runs on push to `main` when `src/` files change
2. Lints and typechecks
3. Builds all scripts
4. Commits any changed `dist/` files back with `[skip ci]` to prevent loops
