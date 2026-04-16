/* ==UserScript==
// @name         Example Site Tweaks
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.0.0
// @description  Quality of life tweaks for example.com
// @author       lnorton89
// @match        https://example.com/*
// @match        https://www.example.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-idle
// ==UserScript== */


"use strict";
(() => {
  // scripts/example-site/src/utils.ts
  function waitForElement(selector, timeout = 5e3) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(selector);
      if (existing) {
        resolve(existing);
        return;
      }
      const timer = setTimeout(() => {
        observer.disconnect();
        reject(new Error(`waitForElement: "${selector}" not found within ${String(timeout)}ms`));
      }, timeout);
      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          clearTimeout(timer);
          observer.disconnect();
          resolve(el);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
  function addStyles(css) {
    if (typeof GM_addStyle !== "undefined") {
      GM_addStyle(css);
      return;
    }
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }
  var log = {
    info: (...args) => {
      console.warn("[example-site]", ...args);
    },
    warn: (...args) => {
      console.warn("[example-site]", ...args);
    },
    error: (...args) => {
      console.error("[example-site]", ...args);
    }
  };

  // scripts/example-site/src/index.ts
  var STYLES = `
  .tm-hidden-ad {
    display: none !important;
  }
  .tm-highlight {
    background: rgba(255, 200, 0, 0.2);
    border-left: 3px solid gold;
    padding-left: 8px;
  }
`;
  function hideAds() {
    document.querySelectorAll('[class*="ad-"], [id*="ad-"]').forEach((el) => {
      el.classList.add("tm-hidden-ad");
    });
  }
  async function tweakMainContent() {
    try {
      const main = await waitForElement("main, #content, .main-content");
      main.classList.add("tm-highlight");
      log.info("Main content found and tweaked");
    } catch (err) {
      log.warn("Main content not found:", err);
    }
  }
  function init() {
    log.info("Script loaded");
    addStyles(STYLES);
    hideAds();
    void tweakMainContent();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
