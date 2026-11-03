/* eslint-disable */
// @ts-nocheck
const domListeners = new Set();
let observer = null;
let scheduled = false;

function runListeners() {
  scheduled = false;
  domListeners.forEach((listener) => listener());
}

// Shares one throttled body observer between the features that patch the site's React DOM.
export function onDomChange(listener) {
  domListeners.add(listener);
  listener();

  if (observer) {
    return;
  }

  observer = new MutationObserver(() => {
    if (scheduled) {
      return;
    }

    scheduled = true;
    window.requestAnimationFrame(runListeners);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
