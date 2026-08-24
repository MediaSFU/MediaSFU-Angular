# Headless MediaSFU Angular Guide

This guide shows how to use `mediasfu-angular` as the room engine under an Angular-owned interface. The current contract is `returnUI=false` plus `sourceParameters` and `updateSourceParameters`; it is not a separate headless-controller export.

## Architecture

```text
Your Angular route and components
        | intents: join, mute, camera, share, leave
        v
app-mediasfu-generic with returnUI=false
        | publishes current helpers and room state
        v
updateSourceParameters -> latest framework-owned snapshot
        | render participants, video and all remote audio
        v
Your Angular room shell
```

The SDK owns signaling, transports, producers, consumers, room state, and helper coordination. Your Angular app owns navigation, layout, visible controls, accessibility, and cleanup of its own subscriptions and media elements.

## 1. Keep the latest publication

```ts
let sourceParameters: Record<string, any> = {};
let runtimeReady = false;

const updateSourceParameters = (next: Record<string, any>) => {
  sourceParameters = next;
  runtimeReady = Boolean(next?.socket || next?.participants);
};
```

Always replace the stored reference. Do not copy a few fields once and assume they remain current.

## 2. Mount the hidden runtime

```html
<app-mediasfu-generic
  [returnUI]="false"
  [noUIPreJoinOptions]="headlessJoin"
  [sourceParameters]="sourceParameters"
  [updateSourceParameters]="updateSourceParameters"
  [createMediaSFURoom]="createMediaSFURoom"
  [joinMediaSFURoom]="joinMediaSFURoom"
></app-mediasfu-generic>
```

Use an `action: 'create'` object with `duration`, `capacity`, and `userName`, or an `action: 'join'` object with `meetingID` and `userName`.

## 3. Keep production credentials on your backend

Your browser sends only the room intent to your own authenticated endpoint. Your server validates that payload, adds credentials from environment variables, and forwards create or join to the configured MediaSFU rooms URL. The SDK-injected functions must normalize the response to `{ data, success }`.

For local-only prototyping, short-lived credentials may be loaded from an ignored environment file. Remove them before building public artifacts. Follow the [secure proxy guide](https://mediasfu.com/docs/usage/secure-backend-proxy/).

## 4. Produce local media

Use the latest published parameters for every action:

```ts
async function toggleMicrophone() {
  const p = sourceParameters;
  await p.clickAudio?.({ parameters: p });
}

async function toggleCamera() {
  const p = sourceParameters;
  await p.clickVideo?.({ parameters: p });
}

async function toggleScreenShare() {
  const p = sourceParameters;
  await p.clickScreenShare?.({ parameters: p });
}
```

These helpers coordinate permission checks, producer state, button state, and transport lifecycle. Avoid creating a second unsynchronized producer path unless you are deliberately working at the lower shared-core layer.

## 5. Resolve and render participant media

```ts
async function resolveVideo(participant: any) {
  const p = sourceParameters;
  return p.getParticipantMedia?.({
    id: participant.videoID,
    name: participant.name,
    kind: 'video',
  });
}
```

Use stable media IDs first. A robust visual resolver keeps these cases separate:

1. active screen-share producer
2. remote participant camera producer
3. local camera preview
4. avatar or audio-only fallback

Re-resolve when participants, streams, producer IDs, or screen-share state change. A `MediaStream` object can remain non-null after its tracks have ended, so also inspect track readiness and producer-close events.

## 6. Play every remote audio stream

Video pagination is a visual concern. Audio must not disappear when a participant card moves off-page.

- Build a dedicated, visually hidden audio host from the latest `allAudioStreams` collection.
- Key players by stable producer or stream ID.
- Keep one player per live audio source and remove it when the producer closes.
- Do not mute remote audio merely because the corresponding video card is hidden.
- Respect browser autoplay policy: unlock playback from a user gesture and expose a clear retry state when required.

## 7. Custom components versus fully headless

Use `uiOverrides`, custom cards, or `customMainComponent` when only selected surfaces differ. Use `returnUI=false` when Angular must own the complete visible workspace, navigation, and lifecycle presentation. Starting with the lighter option reduces the amount of state your app must render correctly.

## 8. Cleanup

On component destruction:

- invoke the current MediaSFU leave/disconnect helper exposed by the runtime
- remove Angular subscriptions and event listeners
- detach app-owned media elements
- stop only tracks your app created itself
- clear queued audio and retry timers
- discard the stored parameter snapshot

## 9. Acceptance checklist

- Install the published SDK version from npm and confirm a clean dependency resolution before performing release acceptance.
- Create through the backend proxy; no key appears in browser source or logs.
- Join the same real room with a second participant.
- Produce and consume microphone and camera media in both directions.
- Start and stop screen sharing.
- Verify off-page participants remain audible.
- Verify camera-to-screen-to-camera rendering transitions.
- Exercise mute, device change, reconnect, participant leave, and room leave.
- Run the Angular production build and inspect the final bundle for credentials.

## References

- [Package quick start](README.md)
- [Detailed Angular manual](README_DETAILED.md)
- [MediaSFU Angular SDK guide](https://mediasfu.com/docs/sdks/angular/)
- [MediaSFU API reference](https://mediasfu.com/docs/api-reference/)
- [MediaSFU Open](https://github.com/MediaSFU/MediaSFUOpen)
- [MediaSFU Sandbox](https://mediasfu.com/sandbox)
