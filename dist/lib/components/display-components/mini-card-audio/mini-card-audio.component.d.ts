import { OnInit, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export interface MiniCardAudioOptions {
    customStyle?: Partial<CSSStyleDeclaration>;
    name?: string;
    showWaveform?: boolean;
    overlayPosition?: string;
    barColor?: string;
    textColor?: string;
    imageSource?: string;
    roundedImage?: boolean;
    imageStyle?: Partial<CSSStyleDeclaration>;
}
export type MiniCardAudioType = (options: MiniCardAudioOptions) => HTMLElement;
/**
 * MiniCardAudio component displays an audio card with optional waveform animation and overlay.
 *
 * @selector app-mini-card-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * - Displays:
 *   - A customizable card with optional image and name.
 *   - Overlay with waveform animation and text.
 *
 * @styles
 * - Customizable card, overlay, and waveform styles.
 *
 * @inputs
 * - `customStyle` (Partial<CSSStyleDeclaration>): Custom CSS styles for the card.
 * - `name` (string): Name displayed on the card.
 * - `showWaveform` (boolean): Controls visibility of waveform animation.
 * - `overlayPosition` (string): Position for the overlay on the card.
 * - `barColor` (string): Color of waveform bars.
 * - `textColor` (string): Color of the name text.
 * - `imageSource` (string): URL for the background image.
 * - `roundedImage` (boolean): Rounds image corners if true.
 * - `imageStyle` (Partial<CSSStyleDeclaration>): Custom styles for the background image.
 *
 * @class MiniCardAudio
 * @implements OnInit, OnDestroy
 *
 * @constructor
 * - Optional injected values for all input properties.
 *
 * @methods
 * - `ngOnInit`: Initializes the component, starts waveform animation if `showWaveform` is true.
 * - `ngOnDestroy`: Cleans up intervals.
 * - `animateWaveform`: Starts animation of the waveform bars.
 * - `resetWaveform`: Resets waveform to initial state.
 * - `clearIntervals`: Clears all active intervals.
 * - `getAnimationDuration`: Returns duration for animation at a given index.
 * - `getImageStyle`: Combines custom image styles with rounded corners if enabled.
 * - `getOverlayPosition`: Uses utility to determine the overlay's position.
 *
 * @example
 * ```html
 * <app-mini-card-audio
 *   [customStyle]="{ backgroundColor: 'blue' }"
 *   name="Audio Name"
 *   [showWaveform]="true"
 *   overlayPosition="bottomRight"
 *   barColor="red"
 *   textColor="white"
 *   imageSource="/path/to/image.jpg"
 *   [roundedImage]="true"
 *   [imageStyle]="{ border: '2px solid black' }"
 * ></app-mini-card-audio>
 * ```
 */
export declare class MiniCardAudio implements OnInit, OnDestroy {
    customStyle: any;
    name: string;
    showWaveform: boolean;
    overlayPosition: string;
    barColor: string;
    textColor: string;
    imageSource: string;
    roundedImage: boolean;
    imageStyle: any;
    waveformAnimations: number[];
    intervals: NodeJS.Timeout[];
    constructor(injectedCustomStyle: Partial<CSSStyleDeclaration>, injectedName: string, injectedShowWaveform: boolean, injectedOverlayPosition: string, injectedBarColor: string, injectedTextColor: string, injectedImageSource: string, injectedRoundedImage: boolean, injectedImageStyle: Partial<CSSStyleDeclaration>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    animateWaveform(): void;
    resetWaveform(): void;
    clearIntervals(): void;
    getAnimationDuration(index: number): number;
    getImageStyle(): any;
    getOverlayPosition(position: string): import("mediasfu-angular").OverlayPositionStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<MiniCardAudio, [{ optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MiniCardAudio, "app-mini-card-audio", never, { "customStyle": { "alias": "customStyle"; "required": false; }; "name": { "alias": "name"; "required": false; }; "showWaveform": { "alias": "showWaveform"; "required": false; }; "overlayPosition": { "alias": "overlayPosition"; "required": false; }; "barColor": { "alias": "barColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "imageSource": { "alias": "imageSource"; "required": false; }; "roundedImage": { "alias": "roundedImage"; "required": false; }; "imageStyle": { "alias": "imageStyle"; "required": false; }; }, {}, never, never, true, never>;
}
