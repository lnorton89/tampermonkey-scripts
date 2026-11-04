import { hasLayoutBox } from './dom';

/**
 * Picks the video the user is most likely watching: a playing one first, then one with data, then
 * any visible one. Videos inside `preferredRoot` are considered before the rest of the page.
 */
export function findActiveVideo(preferredRoot?: ParentNode | null): HTMLVideoElement | null {
  const preferred = preferredRoot ? Array.from(preferredRoot.querySelectorAll('video')) : [];
  const all = Array.from(document.querySelectorAll('video'));
  const videos = [...new Set([...preferred, ...all])].filter((video) => hasLayoutBox(video));

  return (
    videos.find((video) => !video.paused && !video.ended) ??
    videos.find((video) => video.readyState > 0) ??
    videos[0] ??
    null
  );
}

export interface VideoControls {
  play(): boolean;
  pause(): boolean;
  toggle(): boolean;
  seekBy(seconds: number): boolean;
  setVolume(percent: number): boolean;
  setMuted(muted: boolean): boolean;
}

function startPlayback(video: HTMLVideoElement): void {
  // Autoplay policies reject play() without a user gesture; there's nothing useful to do then.
  video.play().catch(() => undefined);
}

/** Basic playback controls that act on whatever `getVideo` returns at call time. */
export function createVideoControls(getVideo: () => HTMLVideoElement | null): VideoControls {
  return {
    play(): boolean {
      const video = getVideo();
      if (!video) return false;
      startPlayback(video);
      return true;
    },
    pause(): boolean {
      const video = getVideo();
      if (!video) return false;
      video.pause();
      return true;
    },
    toggle(): boolean {
      const video = getVideo();
      if (!video) return false;
      if (video.paused) {
        startPlayback(video);
      } else {
        video.pause();
      }
      return true;
    },
    seekBy(seconds: number): boolean {
      const video = getVideo();
      if (!video || !Number.isFinite(seconds)) return false;
      const duration = Number.isFinite(video.duration) ? video.duration : Number.MAX_SAFE_INTEGER;
      video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
      return true;
    },
    setVolume(percent: number): boolean {
      const video = getVideo();
      if (!video || !Number.isFinite(percent)) return false;
      video.volume = Math.max(0, Math.min(1, percent / 100));
      video.muted = false;
      return true;
    },
    setMuted(muted: boolean): boolean {
      const video = getVideo();
      if (!video) return false;
      video.muted = muted;
      return true;
    },
  };
}
