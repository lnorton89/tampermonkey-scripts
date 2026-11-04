import { ensureStyle } from '@userscripts/core';
import { SCRIPT_ID } from '../config/constants';

export function injectStyles(): void {
  ensureStyle(
    `${SCRIPT_ID}-style`,
    `
      #${SCRIPT_ID}-panel {
        position: fixed;
        right: 16px;
        top: 68px;
        z-index: 2147483647;
        width: min(330px, calc(100vw - 32px));
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 8px;
        background: rgba(9, 12, 18, 0.92);
        color: #f8fafc;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
        font: 13px/1.35 Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        backdrop-filter: blur(18px);
      }
  
      #${SCRIPT_ID}-launcher {
        position: fixed;
        top: 18px;
        right: 22px;
        z-index: 2147483647;
        display: grid;
        place-items: center;
        width: 38px;
        height: 38px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: rgba(255, 255, 255, 0.92);
        cursor: pointer;
        padding: 0;
      }
  
      #${SCRIPT_ID}-launcher:hover,
      #${SCRIPT_ID}-launcher:focus-visible {
        background: rgba(255, 255, 255, 0.1);
        outline: none;
      }
  
      #${SCRIPT_ID}-launcher svg {
        width: 26px;
        height: 26px;
        display: block;
        stroke-width: 2.2;
      }
  
      #${SCRIPT_ID}-panel button,
      #${SCRIPT_ID}-panel input {
        font: inherit;
      }
  
      .${SCRIPT_ID}-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
  
      .${SCRIPT_ID}-title {
        margin: 0;
        font-weight: 750;
        font-size: 13px;
      }
  
      .${SCRIPT_ID}-body {
        display: grid;
        gap: 10px;
        padding: 12px;
      }
  
      .${SCRIPT_ID}-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
  
      .${SCRIPT_ID}-label {
        display: grid;
        gap: 3px;
        min-width: 0;
      }
  
      .${SCRIPT_ID}-label strong {
        font-size: 12px;
      }
  
      .${SCRIPT_ID}-label span,
      .${SCRIPT_ID}-status {
        color: #aeb7c8;
        font-size: 11px;
      }
  
      .${SCRIPT_ID}-input {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 6px;
        padding: 7px 8px;
        background: rgba(255, 255, 255, 0.06);
        color: #f8fafc;
        outline: none;
      }
  
      .${SCRIPT_ID}-input:focus {
        border-color: rgba(96, 165, 250, 0.75);
      }
  
      .${SCRIPT_ID}-button {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 6px;
        padding: 7px 9px;
        background: rgba(255, 255, 255, 0.07);
        color: #f8fafc;
        cursor: pointer;
      }
  
      .${SCRIPT_ID}-button:hover {
        background: rgba(255, 255, 255, 0.12);
      }
  
      .${SCRIPT_ID}-icon-button {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        padding: 0;
      }
  
      .${SCRIPT_ID}-icon-button svg {
        width: 18px;
        height: 18px;
        display: block;
      }
  
      .${SCRIPT_ID}-switch {
        position: relative;
        width: 40px;
        height: 22px;
        flex: 0 0 auto;
      }
  
      .${SCRIPT_ID}-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
  
      .${SCRIPT_ID}-slider {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.28);
        cursor: pointer;
        transition: background 0.15s ease;
      }
  
      .${SCRIPT_ID}-slider::before {
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        left: 2px;
        top: 2px;
        border-radius: 999px;
        background: #fff;
        transition: transform 0.15s ease;
      }
  
      .${SCRIPT_ID}-switch input:checked + .${SCRIPT_ID}-slider {
        background: #2563eb;
      }
  
      .${SCRIPT_ID}-switch input:checked + .${SCRIPT_ID}-slider::before {
        transform: translateX(18px);
      }
    `
  );
}
