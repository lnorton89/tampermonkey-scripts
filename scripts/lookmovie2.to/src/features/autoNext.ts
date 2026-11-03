/* eslint-disable */
// @ts-nocheck
import { AUTO_NEXT_COUNTDOWN_SECONDS, SCRIPT_ID } from '../config/constants';
import { appState } from '../core/state';
import { formatEpisodeLabel } from '../domain/episodes';
import { playNextShowEpisode } from './player';
import { findNextShowEpisode } from './watchlist';

const OVERLAY_CLASS = `${SCRIPT_ID}-autonext`;

let countdownTimer = 0;
let overlay = null;

export function cancelAutoNextCountdown() {
  window.clearInterval(countdownTimer);
  countdownTimer = 0;
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}

function playNextNow(nextEpisode) {
  cancelAutoNextCountdown();
  playNextShowEpisode(nextEpisode);
}

function buildOverlay(nextEpisode) {
  const element = document.createElement('div');
  element.className = OVERLAY_CLASS;
  element.setAttribute('role', 'status');

  const label = document.createElement('p');
  label.append('Up next: ');
  const episodeLabel = document.createElement('strong');
  episodeLabel.textContent = formatEpisodeLabel(nextEpisode);
  label.append(episodeLabel, ' in ');
  const seconds = document.createElement('span');
  seconds.className = `${OVERLAY_CLASS}-seconds`;
  label.append(seconds, 's');

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = `${OVERLAY_CLASS}-play`;
  playButton.textContent = 'Play now';
  playButton.addEventListener('click', (event) => {
    event.stopPropagation();
    playNextNow(nextEpisode);
  });

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', (event) => {
    event.stopPropagation();
    cancelAutoNextCountdown();
  });

  element.append(label, playButton, cancelButton);
  return element;
}

// Shown inside the player so it also appears in fullscreen. Only used outside playlist mode.
export async function startAutoNextCountdown() {
  if (!appState.settings.autoNextEpisode || !location.pathname.startsWith('/shows/play/')) {
    return false;
  }

  const startedOnHash = location.hash;
  let nextEpisode = null;
  try {
    nextEpisode = await findNextShowEpisode();
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Could not look up the next episode.`, error);
  }

  const playerContainer = document.getElementById('video_player');
  if (!nextEpisode || !playerContainer || location.hash !== startedOnHash) {
    return false;
  }

  cancelAutoNextCountdown();
  overlay = buildOverlay(nextEpisode);
  playerContainer.appendChild(overlay);

  let remaining = AUTO_NEXT_COUNTDOWN_SECONDS;
  const secondsNode = overlay.querySelector(`.${OVERLAY_CLASS}-seconds`);
  secondsNode.textContent = String(remaining);
  countdownTimer = window.setInterval(() => {
    remaining -= 1;
    if (location.hash !== startedOnHash) {
      cancelAutoNextCountdown();
    } else if (remaining <= 0) {
      playNextNow(nextEpisode);
    } else {
      secondsNode.textContent = String(remaining);
    }
  }, 1000);

  return true;
}
