# Changelog

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
