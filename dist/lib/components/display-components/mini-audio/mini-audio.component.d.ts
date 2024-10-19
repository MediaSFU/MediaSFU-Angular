import { OnInit, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export interface MiniAudioOptions {
    visible?: boolean;
    customStyle?: any;
    name?: string;
    showWaveform?: boolean;
    overlayPosition?: string;
    barColor?: string;
    textColor?: string;
    nameTextStyling?: any;
    imageSource?: string;
    roundedImage?: boolean;
    imageStyle?: any;
}
export type MiniAudioType = (options: MiniAudioOptions) => HTMLElement;
/**
 * MiniAudio component is a standalone Angular component that displays a mini audio player with waveform animations.
 * It supports various customizations including visibility, styles, text, and image properties.
 * The component can be dragged around the screen.
 *
 * @selector app-mini-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * The template includes a modal container with a card that displays an optional background image, name text, and waveform animations.
 *
 * @styles
 * The styles define the appearance of the modal container, card, background image, name text, overlay, waveform, and bars.
 *
 * @class MiniAudio
 * @implements OnInit, OnDestroy
 *
 * @property {boolean} visible - Determines if the component is visible.
 * @property {any} customStyle - Custom styles for the component.
 * @property {string} name - The name text displayed in the component.
 * @property {boolean} showWaveform - Flag to show or hide the waveform animations.
 * @property {string} overlayPosition - Position of the overlay.
 * @property {string} barColor - Color of the waveform bars.
 * @property {string} textColor - Color of the name text.
 * @property {any} nameTextStyling - Additional styles for the name text.
 * @property {string} imageSource - Source URL for the background image.
 * @property {boolean} roundedImage - Flag to apply rounded corners to the background image.
 * @property {any} imageStyle - Custom styles for the background image.
 *
 * @constructor
 * The constructor allows optional dependency injection for all input properties.
 *
 * @method ngOnInit
 * Initializes the component and starts waveform animations if enabled.
 *
 * @method ngOnDestroy
 * Cleans up intervals to prevent memory leaks.
 *
 * @method animateWaveform
 * Starts the waveform animations by setting intervals for each bar.
 *
 * @method animateBar
 * Animates a single bar in the waveform.
 *
 * @method resetWaveform
 * Resets the waveform animations to their initial state.
 *
 * @method clearIntervals
 * Clears all animation intervals.
 *
 * @method getAnimationDuration
 * Returns the animation duration for a given bar index.
 *
 * @method getImageStyle
 * Returns the combined styles for the background image, including optional rounded corners.
 *
 * @method combineStyles
 * Combines base styles with additional styles.
 *
 * @method handleMouseDown
 * Handles the mousedown event to start dragging the component.
 *
 * @method handleMouseMove
 * Handles the mousemove event to update the component's position while dragging.
 *
 * @method handleMouseUp
 * Handles the mouseup event to stop dragging the component.
 *
 * @method getOverlayPosition
 * Returns the position styles for the overlay.
 */
export declare class MiniAudio implements OnInit, OnDestroy {
    visible: boolean;
    customStyle: any;
    name: string;
    showWaveform: boolean;
    overlayPosition: string;
    barColor: string;
    textColor: string;
    nameTextStyling: any;
    imageSource: string;
    roundedImage: boolean;
    imageStyle: any;
    waveformAnimations: number[];
    intervals: NodeJS.Timeout[];
    position: {
        x: number;
        y: number;
    };
    isDragging: boolean;
    dragOffset: {
        x: number;
        y: number;
    };
    constructor(injectedVisible: boolean, injectedCustomStyle: any, injectedName: string, injectedShowWaveform: boolean, injectedOverlayPosition: string, injectedBarColor: string, injectedTextColor: string, injectedNameTextStyling: any, injectedImageSource: string, injectedRoundedImage: boolean, injectedImageStyle: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    animateWaveform(): void;
    animateBar(index: number): void;
    resetWaveform(): void;
    clearIntervals(): void;
    getAnimationDuration(index: number): number;
    getImageStyle(): any;
    combineStyles(baseStyle: any, additionalStyles: any): any;
    handleMouseDown(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseUp(): void;
    getOverlayPosition(position: string): import("../../../@types/types").OverlayPositionStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<MiniAudio, [{ optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MiniAudio, "app-mini-audio", never, { "visible": { "alias": "visible"; "required": false; }; "customStyle": { "alias": "customStyle"; "required": false; }; "name": { "alias": "name"; "required": false; }; "showWaveform": { "alias": "showWaveform"; "required": false; }; "overlayPosition": { "alias": "overlayPosition"; "required": false; }; "barColor": { "alias": "barColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "nameTextStyling": { "alias": "nameTextStyling"; "required": false; }; "imageSource": { "alias": "imageSource"; "required": false; }; "roundedImage": { "alias": "roundedImage"; "required": false; }; "imageStyle": { "alias": "imageStyle"; "required": false; }; }, {}, never, never, true, never>;
}
