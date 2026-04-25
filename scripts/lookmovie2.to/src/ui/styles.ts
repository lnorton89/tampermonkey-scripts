/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID, UI_ROOT_ID } from '../config/constants';

export function getUiStyleText() {
  return `
        @keyframes ${SCRIPT_ID}-rainbow-border {
            0% {
                background-position: 0% 50%;
            }
            100% {
                background-position: 200% 50%;
            }
        }

        #${UI_ROOT_ID}-launcher-host {
            display: inline-flex;
            align-items: center;
            flex: 0 0 auto;
            margin-left: 12px;
            position: relative;
            z-index: 20;
        }

        #${UI_ROOT_ID} > #${UI_ROOT_ID}-launcher {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 2147483647;
        }

        #${UI_ROOT_ID}-launcher-host #${UI_ROOT_ID}-launcher {
            position: relative;
            right: auto;
            bottom: auto;
            z-index: auto;
        }

        #${UI_ROOT_ID}-launcher {
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        #${UI_ROOT_ID}-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0;
            min-height: 31px;
            min-width: 96px;
            border: 2px solid transparent;
            border-radius: 999px;
            padding: 6px 15px;
            color: #ffffff;
            background:
                linear-gradient(#13283c, #13283c) padding-box,
                linear-gradient(
                    90deg,
                    #ffd1dc,
                    #ffe7a6,
                    #c6f6d5,
                    #bde7ff,
                    #d9c7ff,
                    #ffd1dc
                )
                border-box;
            background-size: 100% 100%, 200% 100%;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
            font-family: inherit;
            font-size: 12px;
            font-weight: 700;
            line-height: 1;
            letter-spacing: 0;
            text-transform: uppercase;
            white-space: nowrap;
            cursor: pointer;
            animation: ${SCRIPT_ID}-rainbow-border 2.6s linear infinite;
        }

        #${UI_ROOT_ID}-button-label {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
        }

        #${UI_ROOT_ID}-quick-settings {
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 2147483647;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 8px;
            padding: 6px;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.96);
            box-shadow: 0 14px 34px rgba(0, 0, 0, 0.36);
            opacity: 0;
            transform: translateY(-4px);
            pointer-events: none;
            transition: opacity 0.14s ease, transform 0.14s ease;
        }

        #${UI_ROOT_ID}-quick-settings::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: -10px;
            height: 10px;
        }

        #${UI_ROOT_ID}-launcher:hover #${UI_ROOT_ID}-quick-settings,
        #${UI_ROOT_ID}-launcher:focus-within #${UI_ROOT_ID}-quick-settings {
            opacity: 1;
            transform: translateY(0);
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
            transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease, color 0.14s ease;
        }

        .${SCRIPT_ID}-quick-setting:hover {
            transform: translateY(-1px);
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
            width: min(95vw, 1600px);
            height: min(92vh, 1100px);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 18px;
            overflow: hidden;
            background: #0f172a;
            color: #e5e7eb;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            scrollbar-color: rgba(125, 211, 252, 0.58) rgba(15, 23, 42, 0.72);
            scrollbar-width: thin;
        }

        #${UI_ROOT_ID}-modal * {
            scrollbar-color: rgba(125, 211, 252, 0.58) rgba(15, 23, 42, 0.72);
            scrollbar-width: thin;
        }

        #${UI_ROOT_ID}-modal *::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        #${UI_ROOT_ID}-modal *::-webkit-scrollbar-track {
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.72);
        }

        #${UI_ROOT_ID}-modal *::-webkit-scrollbar-thumb {
            border: 2px solid rgba(15, 23, 42, 0.72);
            border-radius: 999px;
            background:
                linear-gradient(180deg, rgba(216, 180, 254, 0.82), rgba(125, 211, 252, 0.82), rgba(187, 247, 208, 0.82));
            background-clip: padding-box;
        }

        #${UI_ROOT_ID}-modal *::-webkit-scrollbar-thumb:hover {
            background:
                linear-gradient(180deg, rgba(244, 194, 194, 0.95), rgba(125, 211, 252, 0.95), rgba(253, 230, 138, 0.95));
            background-clip: padding-box;
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
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            flex: 1;
            min-height: 0;
            overflow: hidden;
        }

        #${UI_ROOT_ID}-settings-panel {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            padding-bottom: 18px;
        }

        #${UI_ROOT_ID}-watchlist-panel {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            overflow: hidden;
        }

        @media (min-width: 980px) {
            #${UI_ROOT_ID}-content {
                display: grid;
                grid-template-columns: 280px minmax(0, 1fr);
                gap: 24px;
            }

            #${UI_ROOT_ID}-settings-panel {
                border-bottom: none;
                border-right: 1px solid rgba(148, 163, 184, 0.12);
                padding-bottom: 0;
                padding-right: 20px;
            }
        }

        #${UI_ROOT_ID}-settings-title,
        #${UI_ROOT_ID}-watchlist-title {
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

        #${UI_ROOT_ID}-watchlist-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            flex: 0 0 auto;
        }

        #${UI_ROOT_ID}-watchlist-summary {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        .${SCRIPT_ID}-tabs {
            display: inline-flex;
            gap: 4px;
            margin: 0 0 8px;
            padding: 3px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.7);
        }

        .${SCRIPT_ID}-tab {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            border: 0;
            border-radius: 999px;
            padding: 6px 10px;
            background: transparent;
            color: #94a3b8;
            font: 700 12px/1 Arial, sans-serif;
            cursor: pointer;
        }

        .${SCRIPT_ID}-tab[data-active="true"] {
            background: rgba(37, 99, 235, 0.88);
            color: #eff6ff;
        }

        .${SCRIPT_ID}-tab span {
            min-width: 18px;
            padding: 2px 6px;
            border-radius: 999px;
            background: rgba(249, 115, 22, 0.92);
            color: #fff7ed;
            font-size: 10px;
            text-align: center;
        }

        #${UI_ROOT_ID}-watchlist-status {
            min-height: 18px;
            margin-bottom: 10px;
            font-size: 12px;
            line-height: 1.45;
            flex: 0 0 auto;
        }

        #${UI_ROOT_ID}-watchlist-status[data-tone="success"] {
            color: #86efac;
        }

        #${UI_ROOT_ID}-watchlist-status[data-tone="danger"] {
            color: #fda4af;
        }

        #${UI_ROOT_ID}-watchlist-status[data-tone="muted"] {
            color: #94a3b8;
        }

        #${UI_ROOT_ID}-watchlist-list {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-auto-rows: max-content;
            align-items: start;
            align-content: start;
            gap: 14px;
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 8px;
        }

        .${SCRIPT_ID}-watch-empty {
            grid-column: 1 / -1;
            padding: 32px 24px;
            border: 1px dashed rgba(148, 163, 184, 0.2);
            border-radius: 14px;
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.55;
            background: rgba(15, 23, 42, 0.35);
            text-align: center;
            align-self: center;
        }

        .${SCRIPT_ID}-watch-item {
            display: flex;
            flex-direction: column;
            gap: 0;
            min-width: 0;
            border: 1px solid rgba(148, 163, 184, 0.16);
            border-radius: 12px;
            background: rgba(15, 23, 42, 0.85);
            overflow: hidden;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .${SCRIPT_ID}-watch-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .${SCRIPT_ID}-watch-item[data-state="new"] {
            border-color: rgba(249, 115, 22, 0.55);
            box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.18);
        }

        .${SCRIPT_ID}-watch-item[data-state="new"]:hover {
            box-shadow: 0 8px 24px rgba(249, 115, 22, 0.15);
        }

        .${SCRIPT_ID}-watch-item-poster {
            position: relative;
            width: 100%;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
        }

        .${SCRIPT_ID}-watch-item-poster img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .${SCRIPT_ID}-watch-item-poster-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 40px;
            font-weight: 700;
        }

        .${SCRIPT_ID}-watch-item-poster-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 8px 10px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .${SCRIPT_ID}-watch-item-body {
            padding: 11px 10px 10px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
            min-height: 112px;
        }

        .${SCRIPT_ID}-watch-item-title {
            color: #f8fafc;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .${SCRIPT_ID}-watch-item-copy {
            margin: 3px 0 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .${SCRIPT_ID}-watch-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.03em;
            white-space: nowrap;
        }

        .${SCRIPT_ID}-watch-badge[data-state="new"] {
            background: rgba(249, 115, 22, 0.18);
            color: #fdba74;
        }

        .${SCRIPT_ID}-watch-badge[data-state="watched"] {
            background: rgba(34, 197, 94, 0.18);
            color: #86efac;
        }

        .${SCRIPT_ID}-watch-badge[data-state="pending"] {
            background: rgba(148, 163, 184, 0.18);
            color: #cbd5e1;
        }

        .${SCRIPT_ID}-watch-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: auto;
        }

        .${SCRIPT_ID}-button,
        .${SCRIPT_ID}-link-button {
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 999px;
            padding: 5px 10px;
            background: rgba(30, 41, 59, 0.9);
            color: #e2e8f0;
            font: 600 11px/1 Arial, sans-serif;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
        }

        .${SCRIPT_ID}-open-link {
            font-size: 11px;
            padding: 6px 10px;
        }

        .${SCRIPT_ID}-button:hover,
        .${SCRIPT_ID}-link-button:hover {
            border-color: rgba(96, 165, 250, 0.65);
            color: #f8fafc;
        }

        .${SCRIPT_ID}-button[disabled] {
            cursor: wait;
            opacity: 0.65;
        }

        .${SCRIPT_ID}-danger-button:hover {
            border-color: rgba(251, 113, 133, 0.7);
        }

        #${UI_ROOT_ID}-footer {
            margin-top: auto;
            padding-top: 16px;
            color: #94a3b8;
            font: 12px/1.45 Arial, sans-serif;
            overflow-wrap: anywhere;
        }

        .${SCRIPT_ID}-episode-watch-button {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 5;
            border: 0;
            border-radius: 999px;
            padding: 8px 10px;
            background: rgba(15, 23, 42, 0.92);
            color: #e2e8f0;
            font: 700 12px/1 Arial, sans-serif;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
            cursor: pointer;
        }

        .${SCRIPT_ID}-episode-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${SCRIPT_ID}-episode-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${SCRIPT_ID}-episode-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        .${SCRIPT_ID}-show-view-watch-wrap {
            margin-top: 14px;
        }

        .${SCRIPT_ID}-show-view-watch-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 44px;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 999px;
            padding: 10px 16px;
            background: rgba(15, 23, 42, 0.92);
            color: #f8fafc;
            font: 700 13px/1 Arial, sans-serif;
            cursor: pointer;
            transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease;
        }

        .${SCRIPT_ID}-show-view-watch-button:hover {
            transform: translateY(-1px);
            border-color: rgba(96, 165, 250, 0.65);
        }

        .${SCRIPT_ID}-show-view-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${SCRIPT_ID}-show-view-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${SCRIPT_ID}-show-view-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        @media (max-width: 1400px) {
            #${UI_ROOT_ID}-watchlist-list {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (max-width: 1100px) {
            #${UI_ROOT_ID}-watchlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 850px) {
            #${UI_ROOT_ID}-content {
                display: flex;
                flex-direction: column;
            }

            #${UI_ROOT_ID}-settings-panel {
                border-bottom: 1px solid rgba(148, 163, 184, 0.12);
                border-right: none;
                padding-bottom: 16px;
                padding-right: 0;
            }

            #${UI_ROOT_ID}-watchlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 640px) {
            #${UI_ROOT_ID}-watchlist-list {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            #${UI_ROOT_ID}-modal {
                width: 100vw;
                height: 100vh;
                border-radius: 0;
            }
        }
    `;
}
