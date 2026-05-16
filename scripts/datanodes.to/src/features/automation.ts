import {
  DOWNLOAD_POLL_MS,
  DOWNLOAD_TIMEOUT_MS,
  NEXT_DOWNLOAD_DELAY_MS,
  POST_CLICK_NEXT_DELAY_MS,
} from '../config/constants';
import { getPathLabel } from '../core/dom';
import { addLog, nextInQueue, setActive } from '../core/storage';
import { updateUI } from '../ui/panel';

type DownloadButton = HTMLButtonElement | HTMLInputElement;
type ActionButtonKind = 'free' | 'start';

interface ActionButton {
  button: DownloadButton;
  kind: ActionButtonKind;
}

function notifyQueueComplete(): void {
  try {
    GM_notification({
      text: 'Queue complete!',
      title: 'Datanodes Auto-DL',
      timeout: 5000,
    });
  } catch {
    // Some userscript managers expose notification conditionally.
  }
}

export function goToNext(): void {
  const next = nextInQueue();

  if (next) {
    addLog(`-> next: ${getPathLabel(next, Number.POSITIVE_INFINITY)}`);
    setActive(next);
    window.setTimeout(() => {
      window.location.href = next;
    }, NEXT_DOWNLOAD_DELAY_MS);
  } else {
    addLog('All done!');
    setActive('');
    notifyQueueComplete();
  }

  updateUI();
}

function logFormState(): void {
  const form = document.querySelector<HTMLFormElement>('#downloadForm');

  if (!form) {
    return;
  }

  const inputs = Array.from(form.querySelectorAll<HTMLInputElement>('input'));
  const state = inputs.map((input) => `${input.name}=${input.value}`).join(', ');
  addLog(`Form state: ${state}`);

  const buttons = Array.from(
    form.querySelectorAll<HTMLButtonElement | HTMLInputElement>('button, input[type=submit]')
  );
  buttons.forEach((button) => {
    const text = button.textContent.trim().substring(0, 30);
    addLog(
      `Button: id=${button.id} class=${button.className} text=${text} disabled=${String(button.disabled)}`
    );
  });
}

function isDownloadButton(button: DownloadButton): boolean {
  const text = button.textContent.toLowerCase();
  const className = button.className.toLowerCase();
  return (
    text.includes('download') ||
    text.includes('slow') ||
    className.includes('download') ||
    button.type === 'submit'
  );
}

function isVisible(element: HTMLElement): boolean {
  const styles = window.getComputedStyle(element);
  return (
    element.getClientRects().length > 0 &&
    styles.display !== 'none' &&
    styles.visibility !== 'hidden' &&
    styles.opacity !== '0'
  );
}

function isButtonDisabled(button: DownloadButton): boolean {
  return button.disabled || button.getAttribute('aria-disabled') === 'true';
}

function getMethodFreeButton(): DownloadButton | null {
  const button = document.querySelector<DownloadButton>('#method_free');

  if (!button || isButtonDisabled(button) || !isVisible(button)) {
    return null;
  }

  return button;
}

function getActionDownloadButton(): ActionButton | null {
  const buttons = Array.from(
    document.querySelectorAll<DownloadButton>('button, input[type=button], input[type=submit]')
  );
  const button = buttons.find((candidate) => {
    const label = getNormalizedButtonLabel(candidate);
    return (
      isVisible(candidate) &&
      !isButtonDisabled(candidate) &&
      (label.includes('free download') || label.includes('start download'))
    );
  });

  if (!button) {
    return null;
  }

  return {
    button,
    kind: getNormalizedButtonLabel(button).includes('start download') ? 'start' : 'free',
  };
}

function getButtonLabel(button: DownloadButton): string {
  return button.textContent.trim().substring(0, 40) || button.value || button.id;
}

function getNormalizedButtonLabel(button: DownloadButton): string {
  return getButtonLabel(button).toLowerCase().replace(/\s+/g, ' ');
}

function trustedClick(button: DownloadButton): void {
  button.scrollIntoView({ block: 'center', inline: 'center' });
  button.focus();

  for (const eventType of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) {
    try {
      button.dispatchEvent(
        new MouseEvent(eventType, {
          bubbles: true,
          cancelable: true,
        })
      );
    } catch {
      button.click();
      return;
    }
  }
}

export function automateDownloadPage(): void {
  addLog('On /download - monitoring DOM for download opportunity...');
  logFormState();

  let done = false;
  let clickedMethodFree = false;
  let freeDownloadClickCount = 0;
  let freeDownloadWasUnavailable = false;
  let lastFreeDownloadClickAt = 0;
  let interval = 0;
  let observer: MutationObserver | null = null;

  const scheduleNext = (): void => {
    window.setTimeout(goToNext, POST_CLICK_NEXT_DELAY_MS);
  };

  const finish = (): void => {
    done = true;
    window.clearInterval(interval);
    observer?.disconnect();
  };

  const tryDownload = (): void => {
    if (done) {
      return;
    }

    const actionButton = getActionDownloadButton();

    if (freeDownloadClickCount === 1 && !actionButton) {
      freeDownloadWasUnavailable = true;
    }

    const methodFreeButton = getMethodFreeButton();

    if (methodFreeButton && !clickedMethodFree) {
      clickedMethodFree = true;
      addLog(`Clicking method_free button: "${getButtonLabel(methodFreeButton)}"`);
      trustedClick(methodFreeButton);
      return;
    }

    if (actionButton) {
      if (actionButton.kind === 'start') {
        freeDownloadClickCount = 2;
        finish();
        addLog(`Clicking start download: "${getButtonLabel(actionButton.button)}"`);
        trustedClick(actionButton.button);
        scheduleNext();
        return;
      }

      if (freeDownloadClickCount === 0) {
        freeDownloadClickCount = 1;
        lastFreeDownloadClickAt = Date.now();
        addLog(`Starting free download timer: "${getButtonLabel(actionButton.button)}"`);
        trustedClick(actionButton.button);
        return;
      }

      if (
        freeDownloadClickCount === 1 &&
        (freeDownloadWasUnavailable || Date.now() - lastFreeDownloadClickAt > 15000)
      ) {
        freeDownloadClickCount = 2;
        finish();
        addLog(`Timer complete, clicking free download: "${getButtonLabel(actionButton.button)}"`);
        trustedClick(actionButton.button);
        scheduleNext();
        return;
      }
    }

    const form = document.querySelector<HTMLFormElement>('#downloadForm');
    const op = form?.querySelector<HTMLInputElement>('input[name="op"]');

    if (op?.value === 'download2' && form) {
      finish();
      addLog('op=download2 detected, submitting form');
      form.submit();
      scheduleNext();
      return;
    }

    const button = Array.from(
      form?.querySelectorAll<HTMLButtonElement | HTMLInputElement>(
        'button:not([disabled]), input[type=submit]:not([disabled])'
      ) ?? []
    ).find(isDownloadButton);

    if (button) {
      finish();
      addLog(`Clicking button: "${getButtonLabel(button)}"`);
      trustedClick(button);
      scheduleNext();
      return;
    }

    const directLink = document.querySelector<HTMLAnchorElement>(
      'a[href*=".rar"], a[href*=".zip"], a[href*=".7z"], a[href*=".mkv"], a[href*=".mp4"], a[href*=".iso"]'
    );

    if (directLink && directLink.href !== window.location.href) {
      finish();
      addLog(`Direct link: ${directLink.href}`);
      directLink.click();
      scheduleNext();
    }
  };

  interval = window.setInterval(tryDownload, DOWNLOAD_POLL_MS);
  observer = new MutationObserver(tryDownload);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
    attributeFilter: ['class', 'disabled', 'style', 'value'],
  });

  window.setTimeout(() => {
    if (done) {
      return;
    }

    finish();
    addLog('Timed out - logging final form state and moving on');
    logFormState();
    goToNext();
  }, DOWNLOAD_TIMEOUT_MS);
}

export function handleFilePage(path: string): void {
  addLog(`File page: ${path}`);

  window.setTimeout(() => {
    if (window.location.pathname !== path) {
      return;
    }

    const methodFreeButton = getMethodFreeButton();

    if (methodFreeButton) {
      addLog(`Clicking method_free button: "${getButtonLabel(methodFreeButton)}"`);
      trustedClick(methodFreeButton);
      return;
    }

    const button = document.querySelector<HTMLElement>(
      'a[href="/download"], button[data-href*="download"], input[data-href*="download"]'
    );

    if (button) {
      addLog('Clicking file page download link');
      button.click();
      return;
    }

    addLog('No redirect detected - navigating to /download manually');
    window.location.href = '/download';
  }, 5000);
}
