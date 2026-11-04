type UiListener = () => void;

const uiListeners = new Set<UiListener>();

export function subscribeUi(listener: UiListener): () => void {
  uiListeners.add(listener);
  return () => {
    uiListeners.delete(listener);
  };
}

export function notifyUiChanged(): void {
  uiListeners.forEach((listener) => {
    listener();
  });
}
