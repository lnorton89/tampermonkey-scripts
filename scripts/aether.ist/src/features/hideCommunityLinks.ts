import { onDomChange } from '@userscripts/core';

const COMMUNITY_LINK_SELECTOR = 'a[href*="discord.gg"], a[href*="oxapay.com"]';
const DISCORD_TIP_TEXT = 'Tip: Join the Discord!';

// `hidden` makes Tailwind's space-x spacing skip the element; the inline display is still needed
// because utility classes like `inline-flex` outrank the attribute's display rule.
function hideElement(element: HTMLElement): void {
  element.hidden = true;
  element.style.setProperty('display', 'none', 'important');
}

function hideCommunityLinks(): void {
  document.querySelectorAll<HTMLElement>(COMMUNITY_LINK_SELECTOR).forEach(hideElement);

  document.querySelectorAll<HTMLElement>('p.text-type-secondary').forEach((paragraph) => {
    if ((paragraph.textContent ?? '').trim() === DISCORD_TIP_TEXT) {
      hideElement(paragraph);
    }
  });
}

export function watchCommunityLinks(): void {
  onDomChange(hideCommunityLinks);
}
