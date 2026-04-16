/**
 * Waits for an element matching `selector` to appear in the DOM.
 * Resolves with the element or rejects after `timeout` ms.
 */
export function waitForElement<T extends Element>(
  selector: string,
  timeout = 5000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<T>(selector);
    if (existing) {
      resolve(existing);
      return;
    }

    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`waitForElement: "${selector}" not found within ${timeout}ms`));
    }, timeout);

    const observer = new MutationObserver(() => {
      const el = document.querySelector<T>(selector);
      if (el) {
        clearTimeout(timer);
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

/**
 * Adds a stylesheet string to the page via GM_addStyle if available,
 * falling back to a <style> tag injection.
 */
export function addStyles(css: string): void {
  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Simple logger that prefixes messages so they're easy to filter in devtools.
 */
export const log = {
  info: (...args: unknown[]): void => { console.log('[example-site]', ...args); },
  warn: (...args: unknown[]): void => { console.warn('[example-site]', ...args); },
  error: (...args: unknown[]): void => { console.error('[example-site]', ...args); },
};
