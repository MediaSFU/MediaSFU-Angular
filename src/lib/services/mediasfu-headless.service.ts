import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  createRoomPoll,
  disableParticipantVideo,
  endRoomPoll,
  flipCamera,
  getAudioGridComponents,
  getBreakoutState,
  getLocalAudioStream,
  getLocalVideoStream,
  getModerationPermissions,
  getPollState,
  getRecordingState,
  getRemoteVideoStreams,
  getRoomReadiness,
  getScreenShareStream,
  getWhiteboardState,
  leaveRoom,
  listParticipantMediaStates,
  muteEveryone,
  muteParticipant,
  pauseRoomRecording,
  produceCanvas,
  produceDisplay,
  produceElement,
  produceMedia,
  removeParticipant,
  replaceProducerTrack,
  respondToParticipantRequest,
  respondToWaitingParticipant,
  resumeRoomRecording,
  runMediaControl,
  sendChatMessage,
  setCoHost,
  setParticipantMedia,
  startRoomRecording,
  startWhiteboard,
  stopParticipantScreenShare,
  stopProducing,
  stopRoomRecording,
  stopWhiteboard,
  switchCamera,
  switchMicrophone,
  voteInRoomPoll,
  type HeadlessParameters,
  type ProducerKind,
} from 'mediasfu-shared';

/**
 * The Angular equivalent of the React SDK's `useMediasfuHeadless`.
 *
 * Field names deliberately mirror the hook one-for-one, so every recipe in
 * HEADLESS_GUIDE.md reads the same here — only the reactivity idiom changes
 * (observables instead of hook state).
 *
 * Two rules are baked in, and they are where most headless integrations go
 * wrong:
 *
 *  - **Take every publication.** Each field on the bag is a snapshot of an
 *    internal ref the SDK reassigns, so a bag you hold is stale the moment a
 *    producer changes. De-duplicating (`distinctUntilChanged`) or deep-comparing
 *    publications freezes your view on whatever it rendered first — do not add
 *    it to these streams.
 *  - **Keep `sourceParameters` stable.** The object handed to the component is a
 *    seed it writes through; a fresh object per change-detection pass makes the
 *    SDK re-render and can loop. This service keeps one seed.
 *
 * Provided in root, but you can also provide it per-component to scope one
 * instance to one call surface.
 *
 * @example
 * ```ts
 * export class CallComponent {
 *   constructor(public room: MediasfuHeadlessService) {}
 * }
 * ```
 * ```html
 * <app-mediasfu-generic
 *   [sourceParameters]="room.sourceParameters"
 *   [updateSourceParameters]="room.updateSourceParameters"
 *   [returnUI]="false"
 *   (mediaChanged)="room.onMediaChanged($event)">
 * </app-mediasfu-generic>
 * <video [srcObject]="room.localVideo$ | async" autoplay muted playsinline></video>
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MediasfuHeadlessService {
  /** Bind to the component's `[sourceParameters]`. Stable for the lifetime. */
  readonly sourceParameters: HeadlessParameters = {};

  private readonly parameters$$ = new BehaviorSubject<HeadlessParameters>(this.sourceParameters);
  private readonly sourceChanged$$ = new BehaviorSubject<number>(0);

  /** The latest bag. Read it; do not hold it across publications. */
  readonly parameters$: Observable<HeadlessParameters> = this.parameters$$.asObservable();
  /** Increments on every publication. */
  readonly sourceChanged$: Observable<number> = this.sourceChanged$$.asObservable();

  readonly readiness$ = this.parameters$.pipe(
    map((parameters) => getRoomReadiness({ parameters }))
  );
  readonly ready$ = this.readiness$.pipe(map((readiness) => readiness.ready));

  readonly localVideo$ = this.parameters$.pipe(
    map((parameters) => getLocalVideoStream({ parameters }))
  );
  readonly localAudio$ = this.parameters$.pipe(
    map((parameters) => getLocalAudioStream({ parameters }))
  );
  readonly remoteVideos$ = this.parameters$.pipe(
    map((parameters) => getRemoteVideoStreams({ parameters }))
  );
  readonly screenShare$ = this.parameters$.pipe(
    map((parameters) => getScreenShareStream({ parameters }))
  );
  /** Render all of these (hidden is fine) or participants will be inaudible. */
  readonly audioComponents$ = this.parameters$.pipe(
    map((parameters) => getAudioGridComponents({ parameters }))
  );
  readonly participants$ = this.parameters$.pipe(
    map((parameters) => listParticipantMediaStates({ parameters }))
  );

  readonly micOn$ = this.parameters$.pipe(map((p) => Boolean(p.audioAlreadyOn)));
  readonly cameraOn$ = this.parameters$.pipe(map((p) => Boolean(p.videoAlreadyOn)));

  readonly permissions$ = this.parameters$.pipe(
    map((parameters) => getModerationPermissions({ parameters }))
  );
  readonly recording$ = this.parameters$.pipe(
    map((parameters) => getRecordingState({ parameters }))
  );
  readonly whiteboard$ = this.parameters$.pipe(
    map((parameters) => getWhiteboardState({ parameters }))
  );
  readonly polls$ = this.parameters$.pipe(map((parameters) => getPollState({ parameters })));
  readonly breakout$ = this.parameters$.pipe(
    map((parameters) => getBreakoutState({ parameters }))
  );

  /**
   * Bind to the component's `[updateSourceParameters]`.
   *
   * An arrow property, not a method: it is handed to the component as a value
   * and would otherwise lose `this`.
   */
  readonly updateSourceParameters = (next: HeadlessParameters): void => {
    this.parameters$$.next(next || {});
    this.sourceChanged$$.next(this.sourceChanged$$.value + 1);
  };

  /** Bind to the component's `(mediaChanged)`. Removes any need to poll. */
  readonly onMediaChanged = (info: { reasons: string[]; parameters: HeadlessParameters }): void => {
    if (info?.parameters) this.updateSourceParameters(info.parameters);
    else this.sourceChanged$$.next(this.sourceChanged$$.value + 1);
  };

  /** Read the newest bag at call time so actions never use a stale one. */
  private live(): HeadlessParameters {
    return this.parameters$$.value;
  }

  // --- controls ---------------------------------------------------------
  readonly controls = {
    toggleMic: () => runMediaControl({ parameters: this.live(), control: 'clickAudio' }),
    toggleCamera: () => runMediaControl({ parameters: this.live(), control: 'clickVideo' }),
    toggleScreenShare: () =>
      runMediaControl({ parameters: this.live(), control: 'clickScreenShare' }),
    // Not runMediaControl: switchAudio/switchVideo are never published on the
    // parameter bag, so routing through it always failed.
    selectMic: (deviceId: string) => switchMicrophone({ parameters: this.live(), deviceId }),
    selectCamera: (deviceId: string) => switchCamera({ parameters: this.live(), deviceId }),
    flipCamera: () => flipCamera({ parameters: this.live() }),
    sendChat: (message: string, options: { receivers?: string[]; group?: boolean } = {}) =>
      sendChatMessage({
        parameters: this.live(),
        message,
        receivers: options.receivers,
        group: options.group,
      }),
    leave: (ban = false, endRoomOnHostExit = true) =>
      leaveRoom({ parameters: this.live(), ban, endRoomOnHostExit }),
  };

  // --- moderation -------------------------------------------------------
  readonly moderation = {
    muteParticipant: (name: string) => muteParticipant({ parameters: this.live(), name }),
    disableParticipantVideo: (name: string) =>
      disableParticipantVideo({ parameters: this.live(), name }),
    stopParticipantScreenShare: (name: string) =>
      stopParticipantScreenShare({ parameters: this.live(), name }),
    setParticipantMedia: (name: string, kind: 'audio' | 'video' | 'screenshare' | 'all') =>
      setParticipantMedia({ parameters: this.live(), name, kind }),
    muteEveryone: (kind: 'audio' | 'video' | 'screenshare' | 'all' = 'audio') =>
      muteEveryone({ parameters: this.live(), kind }),
    removeParticipant: (name: string) => removeParticipant({ parameters: this.live(), name }),
    admitWaiting: (nameOrId: string) =>
      respondToWaitingParticipant({ parameters: this.live(), id: nameOrId, name: nameOrId, admit: true }),
    denyWaiting: (nameOrId: string) =>
      respondToWaitingParticipant({ parameters: this.live(), id: nameOrId, name: nameOrId, admit: false }),
    approveRequest: (requestId: string) =>
      respondToParticipantRequest({ parameters: this.live(), requestId, approve: true }),
    rejectRequest: (requestId: string) =>
      respondToParticipantRequest({ parameters: this.live(), requestId, approve: false }),
    setCoHost: (name: string, areas?: any[]) =>
      setCoHost({ parameters: this.live(), name, areas }),
  };

  // --- session ----------------------------------------------------------
  readonly session = {
    startRecording: () => startRoomRecording({ parameters: this.live() }),
    pauseRecording: () => pauseRoomRecording({ parameters: this.live() }),
    resumeRecording: () => resumeRoomRecording({ parameters: this.live() }),
    stopRecording: () => stopRoomRecording({ parameters: this.live() }),
    startWhiteboard: (users?: any[]) => startWhiteboard({ parameters: this.live(), users }),
    stopWhiteboard: () => stopWhiteboard({ parameters: this.live() }),
    createPoll: (question: string, options: string[]) =>
      createRoomPoll({ parameters: this.live(), question, options }),
    votePoll: (pollId: string, optionIndex: number) =>
      voteInRoomPoll({ parameters: this.live(), pollId, optionIndex }),
    endPoll: (pollId: string) => endRoomPoll({ parameters: this.live(), pollId }),
  };

  // --- production -------------------------------------------------------
  readonly produce = {
    media: (stream: MediaStream, kind: ProducerKind) =>
      produceMedia({ parameters: this.live(), stream, kind }),
    canvas: (canvas: HTMLCanvasElement, frameRate?: number) =>
      produceCanvas({ parameters: this.live(), canvas, frameRate }),
    element: (element: HTMLMediaElement) =>
      produceElement({ parameters: this.live(), element }),
    display: (withAudio = false) => produceDisplay({ parameters: this.live(), withAudio }),
    replaceTrack: (track: MediaStreamTrack) =>
      replaceProducerTrack({ parameters: this.live(), track }),
    stop: (kind: ProducerKind) => stopProducing({ parameters: this.live(), kind }),
  };
}
