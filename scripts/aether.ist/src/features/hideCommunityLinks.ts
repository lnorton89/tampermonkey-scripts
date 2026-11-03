/* eslint-disable */
// @ts-nocheck
import { onDomChange } from '../core/domWatcher';

const COMMUNITY_LINK_SELECTOR = 'a[href*="discord.gg"], a[href*="oxapay.com"]';
const DISCORD_TIP_TEXT = 'Tip: Join the Discord!';

// `hidden` makes Tailwind's space-x spacing skip the element; the inline display is still needed
// because utility classes like `inline-flex` outrank the attribute's display rule.
function hideElement(element) {
  element.hidden = true;
  element.style.setProperty('display', 'none', 'important');
}

function hideCommunityLinks() {
  document.querySelectorAll(COMMUNITY_LINK_SELECTOR).forEach(hideElement);

  document.querySelectorAll('p.text-type-secondary').forEach((paragraph) => {
    if (paragraph.textContent.trim() === DISCORD_TIP_TEXT) {
      hideElement(paragraph);
    }
  });
}

export function watchCommunityLinks() {
  onDomChange(hideCommunityLinks);
}
