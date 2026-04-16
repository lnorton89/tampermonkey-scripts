import { waitForElement, addStyles, log } from './utils';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const STYLES = `
  .tm-hidden-ad {
    display: none !important;
  }
  .tm-highlight {
    background: rgba(255, 200, 0, 0.2);
    border-left: 3px solid gold;
    padding-left: 8px;
  }
`;

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

function hideAds(): void {
  document.querySelectorAll<HTMLElement>('[class*="ad-"], [id*="ad-"]').forEach((el) => {
    el.classList.add('tm-hidden-ad');
  });
}

async function tweakMainContent(): Promise<void> {
  try {
    const main = await waitForElement<HTMLElement>('main, #content, .main-content');
    main.classList.add('tm-highlight');
    log.info('Main content found and tweaked');
  } catch (err) {
    log.warn('Main content not found:', err);
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

function init(): void {
  log.info('Script loaded');
  addStyles(STYLES);
  hideAds();
  void tweakMainContent();
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
