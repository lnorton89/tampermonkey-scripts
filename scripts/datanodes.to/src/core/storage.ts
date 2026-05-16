import { ACTIVE_KEY, LOG_KEY, LOG_PREFIX, MAX_LOG_ENTRIES, QUEUE_KEY } from '../config/constants';

export function readJsonValue<T>(key: string, fallback: T): T {
  const rawValue = GM_getValue(key, JSON.stringify(fallback));

  if (typeof rawValue !== 'string') {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function getQueue(): string[] {
  return readJsonValue<string[]>(QUEUE_KEY, []);
}

export function setQueue(queue: string[]): void {
  GM_setValue(QUEUE_KEY, JSON.stringify(queue));
}

export function getActive(): string {
  return GM_getValue(ACTIVE_KEY, '');
}

export function setActive(url: string): void {
  GM_setValue(ACTIVE_KEY, url);
}

export function getLog(): string[] {
  return readJsonValue<string[]>(LOG_KEY, []);
}

export function addLog(message: string): void {
  const log = getLog();

  log.push(`[${new Date().toLocaleTimeString()}] ${message}`);

  while (log.length > MAX_LOG_ENTRIES) {
    log.shift();
  }

  GM_setValue(LOG_KEY, JSON.stringify(log));
  console.info(LOG_PREFIX, message);
}

export function nextInQueue(): string | null {
  const queue = getQueue();

  if (queue.length === 0) {
    return null;
  }

  const next = queue.shift();
  setQueue(queue);

  return next ?? null;
}
