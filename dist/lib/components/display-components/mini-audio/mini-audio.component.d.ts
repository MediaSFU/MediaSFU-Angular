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
 * MiniAudio component is a draggable, customizable mini audio player with optional waveform animations.
 *
 * @selector app-mini-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div *ngIf="visible" class="modal-container" [ngStyle]="{ transform: 'translate(' + position.x + 'px, ' + position.y + 'px)' }" (mousedown)="handleMouseDown($event)">
 *   <div class="card" [ngStyle]="customStyle">
 *     <ng-container *ngIf="imageSource">
 *       <img [src]="imageSource" [ngStyle]="getImageStyle()" alt="Background" class="background-image" />
 *     </ng-container>
 *     <div class="name-text" [ngStyle]="combineStyles({ color: textColor }, nameTextStyling)">
 *       {{ name }}
 *     </div>
 *     <div [ngStyle]="getOverlayPosition(overlayPosition)" class="overlay-web">
 *       <div class="waveform-web">
 *         <div *ngFor="let animation of waveformAnimations; let i = index"
 *              [ngStyle]="{ height: animation == 0 ? '1px' : '30px', width: '10px', backgroundColor: barColor }"
 *              class="bar">
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * @styles
 * - `.modal-container`: Positioning and drag area.
 * - `.card`: The main container styling.
 * - `.background-image`: Styling for an optional background image.
 * - `.name-text`: Styling for name text with customizable color.
 * - `.overlay-web` and `.waveform-web`: Contains and styles the waveform animation bars.
 *
 * @inputs
 * - `visible` (boolean): Show/hide the component.
 * - `customStyle` (object): Custom styles for the component.
 * - `name` (string): Text to display as the name.
 * - `showWaveform` (boolean): Show/hide waveform animations.
 * - `overlayPosition` (string): Position of the overlay.
 * - `barColor` (string): Color of waveform bars.
 * - `textColor` (string): Color of name text.
 * - `nameTextStyling` (object): Additional styles for the name text.
 * - `imageSource` (string): URL of the background image.
 * - `roundedImage` (boolean): If true, applies rounded corners to the image.
 * - `imageStyle` (object): Custom styles for the image.
 *
 * @property `waveformAnimations` (array): Tracks animation states for each waveform bar.
 * @property `position` (object): Tracks x and y positioning for dragging.
 *
 * @methods
 * - `ngOnInit()`: Starts waveform animations if `showWaveform` is true.
 * - `ngOnDestroy()`: Clears waveform animation intervals.
 * - `animateWaveform()`: Sets intervals for each bar's animation.
 * - `handleMouseDown(event: MouseEvent)`: Starts dragging on mousedown.
 * - `handleMouseMove(event: MouseEvent)`: Updates position during drag.
 * - `handleMouseUp()`: Ends dragging on mouseup.
 *
 * @example
 * ```html
 * <app-mini-audio [visible]="true" [name]="'Audio Player'" [barColor]="'blue'" [imageSource]="'/path/to/image.png'"></app-mini-audio>
 * ```
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
