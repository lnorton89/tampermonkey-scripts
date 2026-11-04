const domListeners = new Set<() => void>();
let domObserver: MutationObserver | null = null;
let domScheduled = false;

function runDomListeners(): void {
  domScheduled = false;
  domListeners.forEach((listener) => {
    listener();
  });
}

/**
 * Calls `listener` now and after DOM changes, at most once per animation frame. Every caller
 * shares one body observer. Returns a function that removes the listener.
 */
export function onDomChange(listener: () => void): () => void {
  domListeners.add(listener);
  listener();

  if (!domObserver) {
    const observer = new MutationObserver(() => {
      if (domScheduled) {
        return;
      }

      domScheduled = true;
      window.requestAnimationFrame(runDomListeners);
    });
    domObserver = observer;
    waitForBody((body) => {
      observer.observe(body, { childList: true, subtree: true });
    });
  }

  return () => {
    domListeners.delete(listener);
  };
}

/** Runs `callback` once `document.body` exists, which it may not at `document-start`. */
export function waitForBody(callback: (body: HTMLElement) => void): void {
  // `document.body` is typed non-null but is null before the parser reaches <body>.
  const body = document.body as HTMLElement | null;
  if (body) {
    callback(body);
    return;
  }

  const timer = window.setInterval(() => {
    const current = document.body as HTMLElement | null;
    if (!current) {
      return;
    }

    window.clearInterval(timer);
    callback(current);
  }, 50);
}

/** True when the element takes up space on the page. */
export function hasLayoutBox(element: Element | null | undefined): element is HTMLElement {
  if (!element || typeof element.getBoundingClientRect !== 'function') {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

/** True when the element takes up space and isn't hidden by CSS. */
export function isVisibleElement(element: Element | null | undefined): element is HTMLElement {
  if (!hasLayoutBox(element)) {
    return false;
  }

  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

/** The text, aria-label and title of a control, with whitespace collapsed. */
export function getControlText(element: Element): string {
  const parts = [
    element.textContent ?? '',
    element.getAttribute('aria-label') ?? '',
    element.getAttribute('title') ?? '',
  ];
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

/** Clicks the first visible control whose text matches `pattern`. */
export function clickControlByLabel(pattern: RegExp, root: ParentNode = document): boolean {
  const control = Array.from(
    root.querySelectorAll<HTMLElement>('button, a, [role="button"], [aria-label], [title]')
  ).find((element) => isVisibleElement(element) && pattern.test(getControlText(element)));

  if (!control) {
    return false;
  }

  control.click();
  return true;
}

/** Adds a `<style>` element with `id` once. Returns the existing element on later calls. */
export function ensureStyle(id: string, css: string): HTMLStyleElement {
  const existing = document.getElementById(id);
  if (existing instanceof HTMLStyleElement) {
    return existing;
  }

  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  ((document.head as HTMLHeadElement | null) ?? document.documentElement).appendChild(style);
  return style;
}

/**
 * Calls `callback` whenever the URL changes, including client-side navigation by the site's
 * router. Returns a function that stops watching.
 */
export function onUrlChange(callback: (url: string) => void, pollMs = 500): () => void {
  let lastUrl = location.href;

  const check = (): void => {
    if (location.href === lastUrl) {
      return;
    }

    lastUrl = location.href;
    callback(lastUrl);
  };

  const timer = window.setInterval(check, pollMs);
  window.addEventListener('popstate', check);

  return () => {
    window.clearInterval(timer);
    window.removeEventListener('popstate', check);
  };
}
