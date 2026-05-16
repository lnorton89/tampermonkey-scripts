export function escapeHtml(value: string): string {
  const escapeContainer = document.createElement('div');
  escapeContainer.textContent = value;
  return escapeContainer.innerHTML;
}

export function getPathLabel(url: string, maxLength = 22): string {
  const label = url.split('/').pop() ?? url;
  return label.substring(0, maxLength);
}
