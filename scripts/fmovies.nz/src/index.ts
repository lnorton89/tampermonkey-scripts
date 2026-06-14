import './meta';

const SCRIPT_ID = 'fmovies-subtitle-position-fix';
const STYLE_ID = `${SCRIPT_ID}-styles`;
const ROUTE_SCAN_MS = 750;
const SUBTITLE_SCAN_MS = 250;
const SUBTITLE_BOTTOM_REM = 6.5;

const STYLES = `
  .bottom-14:has(> .cineby-cue),
  .bottom-40:has(> .cineby-cue),
  div[class*="SubtitleVideoCaption_mobileSubtitleContainer"]:has(> .cineby-cue),
  .${SCRIPT_ID}-subtitle-container {
    bottom: ${String(SUBTITLE_BOTTOM_REM)}rem !important;
    top: auto !important;
    z-index: 2147483646 !important;
    max-height: calc(100% - 112px) !important;
    overflow: visible !important;
  }

  .${SCRIPT_ID}-subtitle-container .cineby-cue {
    display: inline-block !important;
  }
`;

let lastHref = location.href;
let routeTimer = 0;
let subtitleTimer = 0;
let observer: MutationObserver | null = null;

function installStyles(): void {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = STYLES;
  document.head.appendChild(style);
}

function fixFmoviesSubtitles(): void {
  document.querySelectorAll<HTMLElement>('.cineby-cue').forEach((cue) => {
    const container = cue.parentElement;
    if (!container) return;

    container.classList.add(`${SCRIPT_ID}-subtitle-container`);
    container.style.setProperty('bottom', `${String(SUBTITLE_BOTTOM_REM)}rem`, 'important');
    container.style.setProperty('top', 'auto', 'important');
    container.style.setProperty('z-index', '2147483646', 'important');
  });
}

function startObservers(): void {
  window.clearInterval(subtitleTimer);
  subtitleTimer = window.setInterval(fixFmoviesSubtitles, SUBTITLE_SCAN_MS);

  window.clearInterval(routeTimer);
  routeTimer = window.setInterval(() => {
    if (location.href === lastHref) return;

    lastHref = location.href;
    installStyles();
    fixFmoviesSubtitles();
  }, ROUTE_SCAN_MS);

  observer?.disconnect();

  observer = new MutationObserver(fixFmoviesSubtitles);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

function bootstrap(): void {
  installStyles();
  fixFmoviesSubtitles();
  startObservers();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
