export function buttonStyle(background: string): string {
  return [
    `background:${background}`,
    'color:#fff',
    'border:none',
    'border-radius:4px',
    'padding:4px 8px',
    'cursor:pointer',
    'font-size:11px',
    'flex:1',
  ].join(';');
}

export const panelStyle = [
  'position:fixed',
  'top:10px',
  'right:10px',
  'z-index:999999',
  'background:#1a1a2e',
  'color:#e0e0e0',
  'border:1px solid #444',
  'border-radius:8px',
  'padding:12px',
  'width:320px',
  'font-family:monospace',
  'font-size:12px',
  'box-shadow:0 4px 20px rgba(0,0,0,.5)',
].join(';');
