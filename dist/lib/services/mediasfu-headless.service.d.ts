import { Observable } from 'rxjs';
import { type HeadlessParameters, type ProducerKind } from 'mediasfu-shared';
import * as i0 from "@angular/core";
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
export declare class MediasfuHeadlessService {
    /** Bind to the component's `[sourceParameters]`. Stable for the lifetime. */
    readonly sourceParameters: HeadlessParameters;
    private readonly parameters$$;
    private readonly sourceChanged$$;
    /** The latest bag. Read it; do not hold it across publications. */
    readonly parameters$: Observable<HeadlessParameters>;
    /** Increments on every publication. */
    readonly sourceChanged$: Observable<number>;
    readonly readiness$: Observable<import("mediasfu-shared").RoomReadiness>;
    readonly ready$: Observable<boolean>;
    readonly localVideo$: Observable<MediaStream>;
    readonly localAudio$: Observable<MediaStream>;
    readonly remoteVideos$: Observable<import("mediasfu-shared").ResolvedMedia[]>;
    readonly screenShare$: Observable<import("mediasfu-shared").ScreenShareState>;
    /** Render all of these (hidden is fine) or participants will be inaudible. */
    readonly audioComponents$: Observable<any[]>;
    readonly participants$: Observable<import("mediasfu-shared").ParticipantMediaState[]>;
    readonly micOn$: Observable<boolean>;
    readonly cameraOn$: Observable<boolean>;
    readonly permissions$: Observable<import("mediasfu-shared").ModerationPermissions>;
    readonly recording$: Observable<import("mediasfu-shared").RecordingState>;
    readonly whiteboard$: Observable<import("mediasfu-shared").WhiteboardState>;
    readonly polls$: Observable<import("mediasfu-shared").PollState>;
    readonly breakout$: Observable<import("mediasfu-shared").BreakoutState>;
    /**
     * Bind to the component's `[updateSourceParameters]`.
     *
     * An arrow property, not a method: it is handed to the component as a value
     * and would otherwise lose `this`.
     */
    readonly updateSourceParameters: (next: HeadlessParameters) => void;
    /** Bind to the component's `(mediaChanged)`. Removes any need to poll. */
    readonly onMediaChanged: (info: {
        reasons: string[];
        parameters: HeadlessParameters;
    }) => void;
    /** Read the newest bag at call time so actions never use a stale one. */
    private live;
    readonly controls: {
        toggleMic: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        toggleCamera: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        toggleScreenShare: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        selectMic: (deviceId: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        selectCamera: (deviceId: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        flipCamera: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        sendChat: (message: string, options?: {
            receivers?: string[];
            group?: boolean;
        }) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        leave: (ban?: boolean, endRoomOnHostExit?: boolean) => Promise<import("mediasfu-shared").HeadlessActionResult>;
    };
    readonly moderation: {
        muteParticipant: (name: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        disableParticipantVideo: (name: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        stopParticipantScreenShare: (name: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        setParticipantMedia: (name: string, kind: "audio" | "video" | "screenshare" | "all") => Promise<import("mediasfu-shared").HeadlessActionResult>;
        muteEveryone: (kind?: "audio" | "video" | "screenshare" | "all") => Promise<import("mediasfu-shared").HeadlessActionResult>;
        removeParticipant: (name: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        admitWaiting: (nameOrId: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        denyWaiting: (nameOrId: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        approveRequest: (requestId: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        rejectRequest: (requestId: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        setCoHost: (name: string, areas?: any[]) => Promise<import("mediasfu-shared").HeadlessActionResult>;
    };
    readonly session: {
        startRecording: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        pauseRecording: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        resumeRecording: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        stopRecording: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        startWhiteboard: (users?: any[]) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        stopWhiteboard: () => Promise<import("mediasfu-shared").HeadlessActionResult>;
        createPoll: (question: string, options: string[]) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        votePoll: (pollId: string, optionIndex: number) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        endPoll: (pollId: string) => Promise<import("mediasfu-shared").HeadlessActionResult>;
    };
    readonly produce: {
        media: (stream: MediaStream, kind: ProducerKind) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        canvas: (canvas: HTMLCanvasElement, frameRate?: number) => Promise<import("mediasfu-shared").HeadlessActionResult & {
            stream: MediaStream | null;
        }>;
        element: (element: HTMLMediaElement) => Promise<import("mediasfu-shared").HeadlessActionResult & {
            stream: MediaStream | null;
        }>;
        display: (withAudio?: boolean) => Promise<import("mediasfu-shared").HeadlessActionResult & {
            stream: MediaStream | null;
        }>;
        replaceTrack: (track: MediaStreamTrack) => Promise<import("mediasfu-shared").HeadlessActionResult>;
        stop: (kind: ProducerKind) => Promise<import("mediasfu-shared").HeadlessActionResult>;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<MediasfuHeadlessService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MediasfuHeadlessService>;
}
