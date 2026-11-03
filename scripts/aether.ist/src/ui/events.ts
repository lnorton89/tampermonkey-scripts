/* eslint-disable */
// @ts-nocheck
const uiListeners = new Set();

export function subscribeUi(listener) {
  uiListeners.add(listener);
  return () => uiListeners.delete(listener);
}

export function notifyUiChanged() {
  uiListeners.forEach((listener) => listener());
}
