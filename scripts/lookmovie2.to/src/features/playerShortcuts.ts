import { skipIntroNow } from './introSkip';
import { playNextShowEpisode } from './player';
import { stepPlaybackRate, togglePictureInPicture } from './playerMenu';

function isShowPlayPage(): boolean {
  return location.pathname.startsWith('/shows/play/');
}

function isTypingTarget(target: EventTarget | null): boolean {
  // The target can also be the document, which has neither property.
  const element = target as Partial<HTMLElement> | null;
  return (
    !!element &&
    (!!element.isContentEditable || /^(input|textarea|select)$/i.test(element.tagName || ''))
  );
}

// N next episode, S skip intro, Shift+> / Shift+< speed, P picture-in-picture. The site's own
// hotkeys (space, arrows, F, M) are left alone.
function handleKeydown(event: KeyboardEvent): void {
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
      void togglePictureInPicture();
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
function handleNextEpisodeButton(event: MouseEvent): void {
  const target = event.target as Partial<Element> | null;
  const button =
    target && typeof target.closest === 'function'
      ? target.closest('.vjs-next-episode-button')
      : null;
  if (!button || !isShowPlayPage()) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  playNextShowEpisode();
}

export function installPlayerShortcuts(): void {
  document.addEventListener('keydown', handleKeydown, true);
  document.addEventListener('click', handleNextEpisodeButton, true);
}
