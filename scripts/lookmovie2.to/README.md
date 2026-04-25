# LookMovie2 Enhancer

Script-local React/TypeScript workspace for the LookMovie2 Tampermonkey enhancer.

## Commands

```sh
npm run build
npm run build:watch
npm run build:debug
npm run typecheck
npm run lint
npm run format
```

The generated Tampermonkey bundle is written to `dist/lookmovie2.to.user.js`.

## Source Layout

```text
src/
  app/              bootstrapping and route polling
  config/           script constants and storage keys
  core/             app state, settings, storage, shared utilities
  domain/           domain helpers such as episode parsing/comparison
  features/         page helpers, player automation, watchlist logic
  ui/               React overlay, components, styles, UI event bridge
  index.ts          userscript entrypoint
  meta.ts           Tampermonkey metadata banner
```
