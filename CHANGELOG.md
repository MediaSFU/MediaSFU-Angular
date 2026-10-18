# Changelog

## 2.5.2 — 2026-10-18

- **Readable names on camera-off tiles.** Grid tiles for members with no camera or microphone (mini cards) now show the member's `displayName`, like video and audio cards already do, falling back to the member name. A room creator who set a display name no longer appears to others as their user name.

## 2.5.1 — 2026-10-14

- Requires `mediasfu-shared` 1.3.2 or later.
- **Unmute in audio-only rooms.** The microphone could not be turned on in rooms created with `mediaType: "audio"` (it showed a camera message). Audio-only rooms now only block cameras.
- **Readable names.** Video and audio cards, participant lists and the join notice show a member's `displayName` when the room has one, falling back to the member name.
- **Waiting rooms for API rooms** through `mediasfu-shared`'s `joinRoomOnMediaSFU`: a guest waits until the host lets them in.
- New room-create options: `region` (`asia`, `europe`, `us`, `general`), `regionStrict` (refuse instead of placing the room in another region) and `waitRoom`. Servers that do not support them ignore them.

## 2.5.0 — 2026-10-09

- **Screen-share audio.** Sharing a tab or screen in a Chromium desktop browser now offers **Screen + audio** or **Screen only**. The audio is published as its own track, pauses and stops with the share, and never marks the sharer as speaking. Listeners hear it with a "*name* · Screen audio" card they can mute for themselves. Configure with the `screenAudioMode` (`ask`, `always`, `never`), `screenAudioEnabled` and `screenAudioPrompt` inputs on every room component, or `updateScreenAudioMode` / `updateScreenAudioEnabled` on the room parameters; new exports include `ScreenAudioPromptComponent`, `ScreenAudioPromptService`, `ScreenAudioPlayer`, `connectSendTransportScreenAudio`, `toggleScreenAudio` and `setScreenAudioVolume`. Media servers without screen-audio support keep video-only sharing.
- **Consumer backup preference.** When a busy consuming node has a connected backup, new streams are taken from the backup when it announces them within 1.5 seconds; otherwise from the busy node as before.
- **Clear connection errors.** Join pages explain why a room could not be joined (credentials refused, no meeting minutes, offline, server unreachable) instead of a generic message. `connectSocket` rejects with `MediaSocketConnectError` (`phase`, `elapsedMs`, `online`, `reason`, `stage`, `retryable`), and `describeMediaSocketError` returns a user-facing sentence. A refused credential is not retried in a loop, and network failures no longer count toward the join attempt limit.
- **No more silent microphones from a send-transport race.** When the microphone and camera start together (or a toggle overlaps a rejoin), only one send transport is created per connection; later requests wait for it and send their media on it. Previously the second request replaced the first on the media server and that participant's audio could be lost. Two produces of the same kind at the same moment now share one producer.
- Audio-only players are removed when their producer closes, so a rejoin never leaves a second player behind.
- Requires `mediasfu-shared` 1.3.0 or later.
- **A refused reconnect is final.** When a media server refuses a reconnect for good (the room ended, the credentials were replaced, no meeting minutes), the SDK closes that socket instead of letting Socket.IO retry it for as long as the page stays open. Temporary refusals still retry.

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
