# Aether Enhancer

Playback helpers for aether.ist: audio sync offset, segment auto-skip, ad blocking, and less clutter.

## Audio offset

Open the playback settings and find **Audio offset** directly below **Audio Booster**.

- Adjust from **−1000 to +1000 ms** in 10 ms steps, using the slider or number field.
- **Negative values play audio earlier** relative to the picture. Start at **−200 ms** for Bluetooth lag and adjust by ear.
- Positive values play audio later. **Reset** selects 0 ms.
- Select **Apply & reload** to save the offset and reload the page at your current position. The preference persists across videos and reloads. Playback speed, volume, mute, and paused state are restored; the browser may require a play click after reloading.

This works with HLS/MSE streams that provide separate audio and video buffers. It preserves the site's Audio Booster and does not add a second audio player. Direct MP4, native HLS, and combined audio/video buffers are unsupported; the menu explains when to choose another source. Offsets use the media timeline, so their real-time effect scales with playback speed. A positive offset can skip the short initial gap when starting at time zero.

The [direct userscript](dist/aether.ist.user.js) is recommended so the timing hook runs before the player. If the asynchronous loader arrives after a stream has started, return to Aether's home page and reopen the video; the menu reports this instead of claiming the offset is active.
