/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID, UI_ROOT_ID } from '../config/constants';

export function getUiStyleText() {
  return `
        @keyframes ${SCRIPT_ID}-rainbow-border {
            to {
                --${SCRIPT_ID}-rainbow-angle: 360deg;
            }
        }

        @property --${SCRIPT_ID}-rainbow-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
        }

        #${UI_ROOT_ID}-launcher {
            position: fixed;
            top: 50%;
            left: 12px;
            z-index: 2147483647;
            display: inline-flex;
            align-items: center;
            padding-right: 14px;
            margin-right: -14px;
            transform: translateY(-50%);
            transition: opacity 0.25s ease;
        }

        #${UI_ROOT_ID}-launcher[data-hidden="true"] {
            opacity: 0;
            pointer-events: none;
        }

        #${UI_ROOT_ID}-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            position: relative;
            isolation: isolate;
            overflow: hidden;
            border: 0;
            border-radius: 50%;
            padding: 0;
            margin: 0;
            color: #abb7c4;
            background: transparent;
            box-shadow:
                0 10px 26px rgba(0, 0, 0, 0.26),
                0 0 20px rgba(255, 45, 149, 0.26),
                0 0 26px rgba(0, 194, 255, 0.18);
            cursor: pointer;
        }

        #${UI_ROOT_ID}-button::before {
            --${SCRIPT_ID}-rainbow-angle: 0deg;
            content: '';
            position: absolute;
            inset: -70%;
            z-index: -2;
            background: conic-gradient(
                from var(--${SCRIPT_ID}-rainbow-angle),
                #ff2d95,
                #ff7a18,
                #ffd60a,
                #24f2a6,
                #00c2ff,
                #7c3cff,
                #ff2d95
            );
            animation: ${SCRIPT_ID}-rainbow-border 10s linear infinite;
        }

        #${UI_ROOT_ID}-button::after {
            content: '';
            position: absolute;
            inset: 2px;
            z-index: -1;
            border-radius: inherit;
            background: #13283c;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        #${UI_ROOT_ID}-button:hover::before {
            background: #ffffff;
            animation-play-state: paused;
        }

        #${UI_ROOT_ID}-button svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        #${UI_ROOT_ID}-quick-settings {
            position: absolute;
            top: 50%;
            left: calc(100% - 6px);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.96);
            box-shadow: 0 14px 34px rgba(0, 0, 0, 0.36);
            opacity: 0;
            transform: translate(-6px, -50%);
            pointer-events: none;
            transition: opacity 0.18s ease, transform 0.18s ease;
        }

        #${UI_ROOT_ID}-quick-settings::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: -10px;
            width: 10px;
        }

        #${UI_ROOT_ID}-launcher:hover #${UI_ROOT_ID}-quick-settings,
        #${UI_ROOT_ID}-launcher:focus-within #${UI_ROOT_ID}-quick-settings,
        #${UI_ROOT_ID}-launcher[data-quick-open="true"] #${UI_ROOT_ID}-quick-settings {
            opacity: 1;
            transform: translate(0, -50%);
            pointer-events: auto;
        }

        .${SCRIPT_ID}-quick-setting {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 50%;
            padding: 0;
            background: rgba(30, 41, 59, 0.78);
            color: #64748b;
            cursor: pointer;
            transition: border-color 0.14s ease, background 0.14s ease, color 0.14s ease;
        }

        .${SCRIPT_ID}-quick-setting:hover {
            border-color: rgba(226, 232, 240, 0.45);
        }

        .${SCRIPT_ID}-quick-setting[data-enabled="true"] {
            border-color: rgba(186, 230, 253, 0.72);
            background: rgba(14, 116, 144, 0.34);
            color: #bae6fd;
            box-shadow: 0 0 16px rgba(186, 230, 253, 0.16);
        }

        .${SCRIPT_ID}-quick-setting svg {
            width: 17px;
            height: 17px;
            fill: currentColor;
        }

        #${UI_ROOT_ID}-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(5, 10, 20, 0.65);
        }

        #${UI_ROOT_ID}-overlay.${SCRIPT_ID}-open {
            display: flex;
        }

        #${UI_ROOT_ID}-modal {
            width: min(95vw, 440px);
            max-height: 92vh;
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 18px;
            overflow: auto;
            background: #0f172a;
            color: #e5e7eb;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
        }

        #${UI_ROOT_ID}-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            padding: 18px 18px 10px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${UI_ROOT_ID}-title {
            margin: 0;
            color: #f8fafc;
            font-size: 18px;
            font-weight: 700;
        }

        #${UI_ROOT_ID}-subtitle {
            margin: 6px 0 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${UI_ROOT_ID}-close {
            border: 0;
            background: transparent;
            color: #cbd5e1;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
        }

        #${UI_ROOT_ID}-content {
            padding: 20px;
        }

        #${UI_ROOT_ID}-settings-title {
            margin: 0 0 12px;
            color: #f8fafc;
            font-size: 15px;
            font-weight: 700;
        }

        #${UI_ROOT_ID}-settings {
            display: grid;
            gap: 12px;
        }

        .${SCRIPT_ID}-setting {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: center;
            padding: 14px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            background: rgba(15, 23, 42, 0.7);
            cursor: pointer;
        }

        .${SCRIPT_ID}-setting-main {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            min-width: 0;
        }

        .${SCRIPT_ID}-setting-icon {
            display: inline-flex;
            width: 28px;
            height: 28px;
            flex: 0 0 28px;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(56, 189, 248, 0.28);
            border-radius: 8px;
            background: rgba(14, 165, 233, 0.1);
            color: #7dd3fc;
        }

        .${SCRIPT_ID}-setting-icon svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        .${SCRIPT_ID}-setting-title {
            margin: 0;
            color: #f8fafc;
            font-size: 14px;
            font-weight: 700;
        }

        .${SCRIPT_ID}-setting-copy {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 12px;
            line-height: 1.45;
        }

        .${SCRIPT_ID}-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 30px;
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
            background: #334155;
            transition: background 0.18s ease;
        }

        .${SCRIPT_ID}-slider::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
            transition: transform 0.18s ease;
        }

        .${SCRIPT_ID}-switch input:checked + .${SCRIPT_ID}-slider {
            background: #2563eb;
        }

        .${SCRIPT_ID}-switch input:checked + .${SCRIPT_ID}-slider::before {
            transform: translateX(22px);
        }

        #${UI_ROOT_ID}-footer {
            padding-top: 16px;
            color: #94a3b8;
            font: 12px/1.45 Arial, sans-serif;
        }

        @media (max-width: 640px) {
            #${UI_ROOT_ID}-modal {
                width: 100vw;
                max-height: 100vh;
                border-radius: 0;
            }
        }
    `;
}
