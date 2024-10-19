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
 * MiniCardAudio component displays an audio card with optional waveform animation.
 *
 * @component
 * @selector app-mini-card-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * The template includes:
 * - A card container with customizable styles.
 * - An optional background image.
 * - An overlay with the name and waveform animation.
 *
 * @styles
 * The styles include:
 * - Card dimensions and background color.
 * - Overlay positioning and grid layout.
 * - Name column styling.
 * - Waveform bar styling.
 * - Background image positioning and optional rounded corners.
 *
 * @inputs
 * @param {any} customStyle - Custom styles for the card.
 * @param {string} name - The name to display on the card.
 * @param {boolean} showWaveform - Flag to show or hide the waveform animation.
 * @param {string} overlayPosition - Position of the overlay on the card.
 * @param {string} barColor - Color of the waveform bars.
 * @param {string} textColor - Color of the name text.
 * @param {string} imageSource - Source URL for the background image.
 * @param {boolean} roundedImage - Flag to apply rounded corners to the background image.
 * @param {any} imageStyle - Custom styles for the background image.
 *
 * @class
 * @implements OnInit, OnDestroy
 *
 * @constructor
 * @param {Partial<CSSStyleDeclaration>} injectedCustomStyle - Injected custom styles for the card.
 * @param {string} injectedName - Injected name to display on the card.
 * @param {boolean} injectedShowWaveform - Injected flag to show or hide the waveform animation.
 * @param {string} injectedOverlayPosition - Injected position of the overlay on the card.
 * @param {string} injectedBarColor - Injected color of the waveform bars.
 * @param {string} injectedTextColor - Injected color of the name text.
 * @param {string} injectedImageSource - Injected source URL for the background image.
 * @param {boolean} injectedRoundedImage - Injected flag to apply rounded corners to the background image.
 * @param {Partial<CSSStyleDeclaration>} injectedImageStyle - Injected custom styles for the background image.
 *
 * @methods
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 * @method animateWaveform - Starts the waveform animation.
 * @method resetWaveform - Resets the waveform animation.
 * @method clearIntervals - Clears all animation intervals.
 * @method getAnimationDuration - Returns the animation duration for a given index.
 * @method getImageStyle - Returns the styles for the background image.
 * @method getOverlayPosition - Returns the styles for the overlay position.
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
    getOverlayPosition(position: string): import("../../../@types/types").OverlayPositionStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<MiniCardAudio, [{ optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MiniCardAudio, "app-mini-card-audio", never, { "customStyle": { "alias": "customStyle"; "required": false; }; "name": { "alias": "name"; "required": false; }; "showWaveform": { "alias": "showWaveform"; "required": false; }; "overlayPosition": { "alias": "overlayPosition"; "required": false; }; "barColor": { "alias": "barColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "imageSource": { "alias": "imageSource"; "required": false; }; "roundedImage": { "alias": "roundedImage"; "required": false; }; "imageStyle": { "alias": "imageStyle"; "required": false; }; }, {}, never, never, true, never>;
}
