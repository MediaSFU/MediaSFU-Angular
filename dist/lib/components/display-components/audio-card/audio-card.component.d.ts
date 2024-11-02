import { OnInit, OnDestroy, NgZone } from '@angular/core';
import { ControlMedia } from '../../../consumers/control-media.service';
import { Participant, ControlsPosition, InfoPosition, AudioDecibels, ControlMediaOptions, ShowAlert, CoHostResponsibility, CustomComponent } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface AudioCardParameters {
    audioDecibels: AudioDecibels[];
    participants: Participant[];
    socket: Socket;
    coHostResponsibility: CoHostResponsibility[];
    roomName: string;
    showAlert?: ShowAlert;
    coHost: string;
    islevel: string;
    member: string;
    eventType: string;
    getUpdatedAllParams(): AudioCardParameters;
}
export interface AudioCardOptions {
    controlUserMedia?: (options: ControlMediaOptions) => Promise<void>;
    customStyle?: Partial<CSSStyleDeclaration>;
    name: string;
    barColor?: string;
    textColor?: string;
    imageSource?: string;
    roundedImage?: boolean;
    imageStyle?: Partial<CSSStyleDeclaration>;
    showControls?: boolean;
    showInfo?: boolean;
    videoInfoComponent?: HTMLElement | CustomComponent;
    videoControlsComponent?: HTMLElement | CustomComponent;
    controlsPosition?: ControlsPosition;
    infoPosition?: InfoPosition;
    participant: Participant;
    backgroundColor?: string;
    audioDecibels?: AudioDecibels;
    parameters: AudioCardParameters;
}
export type AudioCardType = (options: AudioCardOptions) => HTMLElement;
/**
 * AudioCard component renders an audio card for participants with customizable options and media controls.
 * It shows audio waveform animations, video/audio toggle buttons, and additional info based on injected or passed properties.
 *
 * @selector app-audio-card
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, MiniCard
 *
 * @inputs
 * - `controlUserMedia` (function): Optional function to control media actions for a participant.
 * - `customStyle` (Partial<CSSStyleDeclaration>): Custom CSS styles for the audio card.
 * - `name` (string): Name of the participant.
 * - `barColor` (string): Color for the audio bar. Default is 'red'.
 * - `textColor` (string): Text color. Default is 'white'.
 * - `imageSource` (string): Image source URL for participant.
 * - `roundedImage` (boolean): Toggle for rounded image style.
 * - `imageStyle` (Partial<CSSStyleDeclaration>): Custom styles for the image.
 * - `showControls` (boolean): Toggle for displaying media controls. Default is true.
 * - `showInfo` (boolean): Toggle for displaying info section. Default is true.
 * - `videoInfoComponent` (HTMLElement | CustomComponent): Custom component for participant info.
 * - `videoControlsComponent` (HTMLElement | CustomComponent): Custom component for video controls.
 * - `controlsPosition` (ControlsPosition): Position for controls on the card. Default is 'topLeft'.
 * - `infoPosition` (InfoPosition): Position for the info section. Default is 'topRight'.
 * - `participant` (Participant | null): Participant object reference.
 * - `backgroundColor` (string): Background color for the card.
 * - `audioDecibels` (AudioDecibels): Optional audio decibel levels for the participant.
 * - `parameters` (AudioCardParameters): Required object with configuration parameters.
 *
 * @methods
 * - `ngOnInit()`: Initializes the component, sets default media control behavior, and activates audio waveform animations.
 * - `ngOnDestroy()`: Clears the animation interval.
 * - `animateBar(index: number)`: Animates the audio bar at a specified index.
 * - `animateWaveform()`: Triggers animations across the waveform bars.
 * - `resetWaveform()`: Resets waveform animations to default.
 * - `getAnimationDuration(index: number)`: Retrieves the animation duration for a bar by index.
 * - `toggleAudio()`: Toggles audio for the participant if media control function is defined.
 * - `toggleVideo()`: Toggles video for the participant if media control function is defined.
 * - `renderControls()`: Returns `showControls` to render or hide media controls.
 * - `combineStyles(baseStyle: any, additionalStyles: any)`: Combines base and additional styles for inline styling.
 * - `getOverlayPosition(position: string)`: Retrieves calculated overlay position for elements.
 * - `isCustomComponent(comp: HTMLElement | CustomComponent)`: Type guard for identifying custom components.
 * - `isFunctionComponent(comp: HTMLElement | CustomComponent)`: Type guard for identifying function components.
 *
 * @example
 * ```html
 * <app-audio-card
 *  [controlUserMedia]="controlMediaFunction"
 * [name]="participantName"
 * [barColor]="'blue'"
 * [textColor]="'black'"
 * [imageSource]="participantImageURL"
 * [roundedImage]="true"
 * [showControls]="true"
 * [participant]="participant"
 * [parameters]="audioCardParameters">
 * </app-audio-card>
 * ```
 *
 **/
export declare class AudioCard implements OnInit, OnDestroy {
    private ngZone;
    private controlMediaService;
    controlUserMedia?: (options: ControlMediaOptions) => Promise<void>;
    customStyle: Partial<CSSStyleDeclaration>;
    name: string;
    barColor: string;
    textColor: string;
    imageSource: string;
    roundedImage: boolean;
    imageStyle: Partial<CSSStyleDeclaration>;
    showControls: boolean;
    showInfo: boolean;
    videoInfoComponent?: HTMLElement | CustomComponent;
    videoControlsComponent?: HTMLElement | CustomComponent;
    controlsPosition: string;
    infoPosition: string;
    participant: Participant | null;
    backgroundColor: string;
    audioDecibels: any;
    parameters: AudioCardParameters;
    faVideo: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faVideoSlash: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faMicrophone: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faMicrophoneSlash: import("@fortawesome/fontawesome-common-types").IconDefinition;
    waveformAnimations: number[];
    showWaveform: boolean;
    interval: any;
    constructor(ngZone: NgZone, controlMediaService: ControlMedia, injectedControlUserMedia: (options: ControlMediaOptions) => Promise<void>, injectedCustomStyle: Partial<CSSStyleDeclaration>, injectedName: string, injectedBarColor: string, injectedTextColor: string, injectedImageSource: string, injectedRoundedImage: boolean, injectedImageStyle: Partial<CSSStyleDeclaration>, injectedShowControls: boolean, injectedShowInfo: boolean, injectedVideoInfoComponent: HTMLElement | CustomComponent, injectedVideoControlsComponent: HTMLElement | CustomComponent, injectedControlsPosition: ControlsPosition, injectedInfoPosition: InfoPosition, injectedParticipant: Participant | null, injectedBackgroundColor: string, injectedAudioDecibels: AudioDecibels, injectedParameters: AudioCardParameters);
    ngOnInit(): void;
    ngOnDestroy(): void;
    animateBar(index: number): void;
    animateWaveform(): void;
    resetWaveform(): void;
    getAnimationDuration(index: number): number;
    toggleAudio(): Promise<void>;
    toggleVideo(): Promise<void>;
    renderControls(): boolean;
    combineStyles(baseStyle: any, additionalStyles: any): any;
    getOverlayPosition(position: string): import("../../../@types/types").OverlayPositionStyle;
    isCustomComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is CustomComponent;
    isFunctionComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is () => HTMLElement | CustomComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<AudioCard, [null, null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AudioCard, "app-audio-card", never, { "controlUserMedia": { "alias": "controlUserMedia"; "required": false; }; "customStyle": { "alias": "customStyle"; "required": false; }; "name": { "alias": "name"; "required": false; }; "barColor": { "alias": "barColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "imageSource": { "alias": "imageSource"; "required": false; }; "roundedImage": { "alias": "roundedImage"; "required": false; }; "imageStyle": { "alias": "imageStyle"; "required": false; }; "showControls": { "alias": "showControls"; "required": false; }; "showInfo": { "alias": "showInfo"; "required": false; }; "videoInfoComponent": { "alias": "videoInfoComponent"; "required": false; }; "videoControlsComponent": { "alias": "videoControlsComponent"; "required": false; }; "controlsPosition": { "alias": "controlsPosition"; "required": false; }; "infoPosition": { "alias": "infoPosition"; "required": false; }; "participant": { "alias": "participant"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "audioDecibels": { "alias": "audioDecibels"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; }, {}, never, never, true, never>;
}
