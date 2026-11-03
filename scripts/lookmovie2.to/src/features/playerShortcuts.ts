/* eslint-disable */
// @ts-nocheck
import { skipIntroNow } from './introSkip';
import { playNextShowEpisode } from './player';
import { stepPlaybackRate, togglePictureInPicture } from './playerMenu';

function isShowPlayPage() {
  return location.pathname.startsWith('/shows/play/');
}

function isTypingTarget(target) {
  return (
    !!target &&
    (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName || ''))
  );
}

// N next episode, S skip intro, Shift+> / Shift+< speed, P picture-in-picture. The site's own
// hotkeys (space, arrows, F, M) are left alone.
function handleKeydown(event) {
  if (
    !document.getElementById('video_player') ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    isTypingTarget(event.target)
  ) {
    return;
  }

  let handled = false;
  switch (event.key) {
    case 'n':
    case 'N':
      handled = isShowPlayPage() && playNextShowEpisode();
      break;
    case 's':
    case 'S':
      handled = skipIntroNow();
      break;
    case '>':
      stepPlaybackRate(1);
      handled = true;
      break;
    case '<':
      stepPlaybackRate(-1);
      handled = true;
      break;
    case 'p':
    case 'P':
      togglePictureInPicture();
      handled = true;
      break;
    default:
      break;
  }

  if (handled) {
    event.preventDefault();
    event.stopPropagation();
  }
}

// The control bar's Next Episode button relies on the same stale index as the site's
// switch-next-episode event, so it goes through the exact next episode instead.
function handleNextEpisodeButton(event) {
  const target = event.target;
  const button = target && target.closest ? target.closest('.vjs-next-episode-button') : null;
  if (!button || !isShowPlayPage()) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  playNextShowEpisode();
}

export function installPlayerShortcuts() {
  document.addEventListener('keydown', handleKeydown, true);
  document.addEventListener('click', handleNextEpisodeButton, true);
}
