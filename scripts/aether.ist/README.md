# Aether Enhancer

Playback helpers for aether.ist: live audio sync offset, periodic subtitle re-sync, segment auto-skip, ad blocking, and less clutter.

## Audio offset

Open the playback settings and find **Audio offset** directly below **Audio Booster**.

- Adjust from **−1000 to +1000 ms** in 10 ms steps, using the slider or number field.
- **Negative values play audio earlier** relative to the picture. Start at **−200 ms** for Bluetooth lag and adjust by ear.
- Positive values play audio later. **Reset** selects 0 ms.
- Release the slider or finish editing the number to apply the offset **without reloading the page**. Aether briefly refreshes the stream at your current position. The setting persists across videos; playback speed, volume, mute, audio language, subtitles, and paused/playing state are preserved.
- If the script cannot connect to Aether's player controls, **Apply & reload** remains available as a fallback.

This works with HLS/MSE streams that provide separate audio and video buffers. It preserves the site's Audio Booster and does not add a second audio player. Direct MP4, native HLS, and combined audio/video buffers are unsupported; the menu explains when to choose another source. Offsets use the media timeline, so their real-time effect scales with playback speed. A positive offset can skip the short initial gap when starting at time zero.

The [direct userscript](dist/aether.ist.user.js) is recommended so the timing hook runs before the player. If the asynchronous loader arrives after a stream has started, adjusting the offset refreshes the stream with the hook installed. If the player connection is unavailable, return to Aether's home page and reopen the video instead.

## Periodic subtitle re-sync

In **Custom subtitles**, **Re-sync every minute** appears below **Auto-sync with audio**. It defaults to on and becomes active when the site's auto-sync is enabled. You can turn it off independently; that preference is saved.

Every minute of actual playback, it restarts Aether's audio/subtitle matching analysis with fresh samples. It preserves the selected captions and their current delay while Aether looks for a better match. Pauses and buffering do not count toward the interval. Seeking, changing sources/subtitles, or a subtitle delay correction starts the interval over. It continues working with the menu closed and stops when auto-sync is disabled. Native/cast captions are excluded because Aether's matcher does not support them.

Aether's built-in matcher already runs continuously; the periodic reset clears its retained match history and retry backoff when a match has drifted. Quiet scenes or subtitles that don't match the audio can still prevent an accurate result.
