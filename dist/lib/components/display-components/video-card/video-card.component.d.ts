import { OnInit, OnDestroy } from '@angular/core';
import { ControlMedia } from '../../../consumers/control-media.service';
import { Participant, AudioDecibels, CoHostResponsibility, ShowAlert, EventType, CustomComponent } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface VideoCardParameters {
    socket: Socket;
    roomName: string;
    coHostResponsibility: CoHostResponsibility[];
    showAlert?: ShowAlert;
    coHost: string;
    participants: Participant[];
    member: string;
    islevel: string;
    audioDecibels: AudioDecibels[];
    getUpdatedAllParams: () => VideoCardParameters;
}
export interface VideoCardOptions {
    customStyle?: Partial<CSSStyleDeclaration>;
    name: string;
    barColor?: string;
    textColor?: string;
    imageSource: string;
    roundedImage?: boolean;
    imageStyle?: Partial<CSSStyleDeclaration>;
    remoteProducerId: string;
    eventType: EventType;
    forceFullDisplay?: boolean;
    videoStream: MediaStream | null;
    showControls?: boolean;
    showInfo?: boolean;
    videoInfoComponent?: HTMLElement | CustomComponent;
    videoControlsComponent?: HTMLElement | CustomComponent;
    controlsPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    infoPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    participant: Participant;
    backgroundColor: string;
    audioDecibels: AudioDecibels[];
    doMirror?: boolean;
    parameters: VideoCardParameters;
}
export type VideoCardType = (options: VideoCardOptions) => HTMLElement;
/**
 * VideoCard component represents a customizable video display card with participant controls for toggling audio and video.
 * It also animates an audio waveform if sound is detected in the participant's audio stream.
 *
 * @selector app-video-card
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, CardVideoDisplay]
 *
 * @example
 * ```html
 * <app-video-card
 *   [name]="participant.name"
 *   [videoStream]="videoStream"
 *   [audioDecibels]="audioDecibels"
 *   [participant]="participant"
 *   [parameters]="videoCardParameters"
 * ></app-video-card>
 * ```
 *
 * @input {Partial<CSSStyleDeclaration>} customStyle - Styles for the card container.
 * @input {string} name - Name of the participant displayed on the card.
 * @input {string} barColor - Color of the waveform bars. Default is 'red'.
 * @input {string} textColor - Color of the name text. Default is 'white'.
 * @input {string} imageSource - Source URL of the participant's image.
 * @input {boolean} roundedImage - Whether the image should have rounded corners.
 * @input {Partial<CSSStyleDeclaration>} imageStyle - Additional styles for the image.
 * @input {string} remoteProducerId - ID of the remote media producer.
 * @input {EventType} eventType - Type of event (used for internal logic).
 * @input {boolean} forceFullDisplay - Forces full display if true.
 * @input {MediaStream | null} videoStream - Stream of the video to be displayed.
 * @input {boolean} showControls - Determines if the controls are displayed. Default is true.
 * @input {boolean} showInfo - Determines if info (e.g., participant name) is shown. Default is true.
 * @input {HTMLElement | CustomComponent} videoInfoComponent - Custom component for video info display.
 * @input {HTMLElement | CustomComponent} videoControlsComponent - Custom component for video controls.
 * @input {'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'} controlsPosition - Position of controls overlay.
 * @input {'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'} infoPosition - Position of info overlay.
 * @input {Participant} participant - Participant data object.
 * @input {string} backgroundColor - Background color of the video card.
 * @input {AudioDecibels[]} audioDecibels - Audio decibel data for animating waveform.
 * @input {boolean} doMirror - If true, mirrors the video display.
 * @input {VideoCardParameters} parameters - Additional parameters including socket and alert configuration.
 *
 * @property {number[]} waveformAnimations - Array representing animation states for waveform bars.
 * @property {boolean} showWaveform - Flag to toggle waveform animation. Default is true.
 * @property {any} interval - Interval reference for audio decibel checks.
 * @property {IconDefinition} faMicrophone - FontAwesome icon for microphone.
 * @property {IconDefinition} faMicrophoneSlash - FontAwesome icon for muted microphone.
 * @property {IconDefinition} faVideo - FontAwesome icon for video.
 * @property {IconDefinition} faVideoSlash - FontAwesome icon for video off.
 *
 * @method ngOnInit - Lifecycle hook to initialize audio decibel interval check.
 * @method ngOnDestroy - Lifecycle hook to clear intervals.
 * @method animateWaveform - Starts audio waveform animation.
 * @method resetWaveform - Resets waveform animations.
 * @method getAnimationDuration - Returns animation duration for given bar index.
 * @method toggleAudio - Toggles participant's audio status.
 * @method toggleVideo - Toggles participant's video status.
 * @method renderControls - Renders the control buttons (audio and video) based on participant status.
 * @method getOverlayPosition - Returns overlay position styles based on the input position string.
 * @method isCustomComponent - Checks if a component is a custom component.
 * @method isFunctionComponent - Checks if a component is a function component.
 */
export declare class VideoCard implements OnInit, OnDestroy {
    private controlMediaService;
    customStyle: Partial<CSSStyleDeclaration>;
    name: string;
    barColor: string;
    textColor: string;
    imageSource: string;
    roundedImage: boolean;
    imageStyle: Partial<CSSStyleDeclaration>;
    remoteProducerId: string;
    eventType: EventType;
    forceFullDisplay: boolean;
    videoStream: MediaStream | null;
    showControls: boolean;
    showInfo: boolean;
    videoInfoComponent?: HTMLElement | CustomComponent;
    videoControlsComponent?: HTMLElement | CustomComponent;
    controlsPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    infoPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    participant: Participant;
    backgroundColor: string;
    audioDecibels: AudioDecibels[];
    doMirror: boolean;
    parameters: VideoCardParameters;
    waveformAnimations: number[];
    showWaveform: boolean;
    interval: any;
    faMicrophone: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faMicrophoneSlash: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faVideo: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faVideoSlash: import("@fortawesome/fontawesome-common-types").IconDefinition;
    constructor(controlMediaService: ControlMedia, injectedCustomStyle: Partial<CSSStyleDeclaration>, injectedName: string, injectedBarColor: string, injectedTextColor: string, injectedImageSource: string, injectedRoundedImage: boolean, injectedImageStyle: Partial<CSSStyleDeclaration>, injectedRemoteProducerId: string, injectedEventType: EventType, injectedForceFullDisplay: boolean, injectedVideoStream: MediaStream | null, injectedShowControls: boolean, injectedShowInfo: boolean, injectedVideoInfoComponent: HTMLElement, injectedVideoControlsComponent: HTMLElement, injectedControlsPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight', injectedInfoPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight', injectedParticipant: Participant, injectedBackgroundColor: string, injectedAudioDecibels: AudioDecibels[], injectedDoMirror: boolean, injectedParameters: VideoCardParameters);
    ngOnInit(): void;
    ngOnDestroy(): void;
    animateWaveform(): void;
    animateBar(index: number): void;
    resetWaveform(): void;
    getAnimationDuration(index: number): number;
    toggleAudio(): Promise<void>;
    toggleVideo(): Promise<void>;
    renderControls(): HTMLElement | CustomComponent | "\n      <div class=\"overlayControls\">\n        <button class=\"controlButton\" (click)=\"toggleAudio()\">\n          <fa-icon [icon]=\"participant?.muted ? faMicrophoneSlash : faMicrophone\" [style.color]=\"participant?.muted ? 'red' : 'green'\"></fa-icon>\n        </button>\n        <button class=\"controlButton\" (click)=\"toggleVideo()\">\n          <fa-icon [icon]=\"participant?.videoOn ? faVideo : faVideoSlash\" [style.color]=\"participant?.videoOn ? 'green' : 'red'\"></fa-icon>\n        </button>\n      </div>\n    " | null;
    getOverlayPosition(position: string): import("../../../@types/types").OverlayPositionStyle;
    isCustomComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is CustomComponent;
    isFunctionComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is () => HTMLElement | CustomComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<VideoCard, [null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VideoCard, "app-video-card", never, { "customStyle": { "alias": "customStyle"; "required": false; }; "name": { "alias": "name"; "required": false; }; "barColor": { "alias": "barColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "imageSource": { "alias": "imageSource"; "required": false; }; "roundedImage": { "alias": "roundedImage"; "required": false; }; "imageStyle": { "alias": "imageStyle"; "required": false; }; "remoteProducerId": { "alias": "remoteProducerId"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "forceFullDisplay": { "alias": "forceFullDisplay"; "required": false; }; "videoStream": { "alias": "videoStream"; "required": false; }; "showControls": { "alias": "showControls"; "required": false; }; "showInfo": { "alias": "showInfo"; "required": false; }; "videoInfoComponent": { "alias": "videoInfoComponent"; "required": false; }; "videoControlsComponent": { "alias": "videoControlsComponent"; "required": false; }; "controlsPosition": { "alias": "controlsPosition"; "required": false; }; "infoPosition": { "alias": "infoPosition"; "required": false; }; "participant": { "alias": "participant"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "audioDecibels": { "alias": "audioDecibels"; "required": false; }; "doMirror": { "alias": "doMirror"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; }, {}, never, never, true, never>;
}
