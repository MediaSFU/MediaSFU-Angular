# Changelog

## 2.5.0 — 2026-10-09

- **Screen-share audio.** Sharing a tab or screen in a Chromium desktop browser now offers **Screen + audio** or **Screen only**. The audio is published as its own track, pauses and stops with the share, and never marks the sharer as speaking. Listeners hear it with a "*name* · Screen audio" card they can mute for themselves. Configure with the `screenAudioMode` (`ask`, `always`, `never`), `screenAudioEnabled` and `screenAudioPrompt` inputs on every room component, or `updateScreenAudioMode` / `updateScreenAudioEnabled` on the room parameters; new exports include `ScreenAudioPromptComponent`, `ScreenAudioPromptService`, `ScreenAudioPlayer`, `connectSendTransportScreenAudio`, `toggleScreenAudio` and `setScreenAudioVolume`. Media servers without screen-audio support keep video-only sharing.
- **Consumer backup preference.** When a busy consuming node has a connected backup, new streams are taken from the backup when it announces them within 1.5 seconds; otherwise from the busy node as before.
- **Clear connection errors.** Join pages explain why a room could not be joined (credentials refused, no meeting minutes, offline, server unreachable) instead of a generic message. `connectSocket` rejects with `MediaSocketConnectError` (`phase`, `elapsedMs`, `online`, `reason`, `stage`, `retryable`), and `describeMediaSocketError` returns a user-facing sentence. A refused credential is not retried in a loop, and network failures no longer count toward the join attempt limit.
- Audio-only players are removed when their producer closes, so a rejoin never leaves a second player behind.
- Requires `mediasfu-shared` 1.3.0 or later.

## 2.4.2 — 2026-09-30

- Include the compiled library, declarations, changelog, and public guides when publishing the Angular distributable.
- Disable camera simulcast automatically for chat and capacity-two rooms, with an explicit `simulcastOff` opt-out for larger rooms and an optional `roomCapacity` hint.
- Preserve full-resolution encoder limits in single-encoding mode and restore the original preset for later room updates.
- Remove the recording-only 20% camera bitrate and initial-bitrate uplift; screen-sharing and audio presets are unchanged.


## 2.4.0 — 2026-09-21

- Added person-aware background blur to the background modal.
- Uses the shared compositor and stable `"blur"` state so modal, hybrid, and headless integrations follow one virtual-background contract.
- Requires `mediasfu-shared` 1.2.3 or later for blur helpers and consume-socket lifecycle cleanup.

## 2.3.3 — 2026-09-16

- Requires `mediasfu-shared` 1.2.2 or later. That release reports the room layout to the recording service as soon as a recording starts, instead of waiting for the next participant or screen change.
