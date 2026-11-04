import { HIDE_BANNER_STYLE_ID } from '../config/constants';

// Hides the blue info banner ("Bookmark rentry.co/aetherdomains...") above the site. The red
// offline banner uses a different background and stays visible. Hiding the wrapper the site
// measures lets its layout offset collapse to zero.
export function installBannerHider(): void {
  if (document.getElementById(HIDE_BANNER_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = HIDE_BANNER_STYLE_ID;
  style.textContent = `
    div:has(> div.bg-\\[\\#126FD3\\] > span[aria-label="Dismiss banner"]) {
      display: none !important;
    }
  `;

  ((document.head as HTMLHeadElement | null) || document.documentElement).appendChild(style);
}
