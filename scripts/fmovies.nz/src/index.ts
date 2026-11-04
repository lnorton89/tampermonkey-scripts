import './meta';
import { ensureStyle, onDomChange, onUrlChange, waitForBody } from '@userscripts/core';

const SCRIPT_ID = 'fmovies-subtitle-position-fix';
const STYLE_ID = `${SCRIPT_ID}-styles`;
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

function bootstrap(): void {
  ensureStyle(STYLE_ID, STYLES);
  // Childlist changes catch new cues; the interval catches the player rewriting inline styles.
  onDomChange(fixFmoviesSubtitles);
  window.setInterval(fixFmoviesSubtitles, SUBTITLE_SCAN_MS);
  onUrlChange(() => {
    ensureStyle(STYLE_ID, STYLES);
    fixFmoviesSubtitles();
  });
}

waitForBody(bootstrap);
