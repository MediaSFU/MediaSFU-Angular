import { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export interface MainAspectComponentOptions {
    backgroundColor?: string;
    showControls?: boolean;
    containerWidthFraction?: number;
    containerHeightFraction?: number;
    defaultFraction?: number;
    updateIsWideScreen: (isWideScreen: boolean) => void;
    updateIsMediumScreen: (isMediumScreen: boolean) => void;
    updateIsSmallScreen: (isSmallScreen: boolean) => void;
}
export type MainAspectComponentType = (options: MainAspectComponentOptions) => HTMLElement;
/**
 * MainAspectComponent is a standalone Angular component that adjusts its aspect ratio
 * based on the window size and other input properties. It listens to window resize
 * and orientation change events to dynamically update its styles.
 *
 * @selector app-main-aspect-component
 * @standalone true
 * @imports [CommonModule]
 *
 * @template
 * ```html
 * <div [ngStyle]="aspectStyles" [style.backgroundColor]="backgroundColor" class="aspect-container">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @styles
 * ```css
 * .aspect-container {
 *   overflow: hidden;
 * }
 * ```
 *
 * @class MainAspectComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the aspect container.
 * @property {boolean} showControls - Flag to show or hide controls.
 * @property {number} containerWidthFraction - Fraction of the window width for the container.
 * @property {number} containerHeightFraction - Fraction of the window height for the container.
 * @property {number} defaultFraction - Default fraction to adjust the height when controls are shown.
 * @property {(isWideScreen: boolean) => void} updateIsWideScreen - Callback to update wide screen status.
 * @property {(isMediumScreen: boolean) => void} updateIsMediumScreen - Callback to update medium screen status.
 * @property {(isSmallScreen: boolean) => void} updateIsSmallScreen - Callback to update small screen status.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 * @method private updateAspectStyles - Updates the aspect styles based on the window size and input properties.
 */
export declare class MainAspectComponent implements OnInit, OnDestroy, OnChanges {
    backgroundColor: string;
    showControls: boolean;
    containerWidthFraction: number;
    containerHeightFraction: number;
    defaultFraction: number;
    updateIsWideScreen: (isWideScreen: boolean) => void;
    updateIsMediumScreen: (isMediumScreen: boolean) => void;
    updateIsSmallScreen: (isSmallScreen: boolean) => void;
    aspectStyles: {
        [key: string]: any;
    };
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private updateAspectStyles;
    static ɵfac: i0.ɵɵFactoryDeclaration<MainAspectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MainAspectComponent, "app-main-aspect-component", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "showControls": { "alias": "showControls"; "required": false; }; "containerWidthFraction": { "alias": "containerWidthFraction"; "required": false; }; "containerHeightFraction": { "alias": "containerHeightFraction"; "required": false; }; "defaultFraction": { "alias": "defaultFraction"; "required": false; }; "updateIsWideScreen": { "alias": "updateIsWideScreen"; "required": false; }; "updateIsMediumScreen": { "alias": "updateIsMediumScreen"; "required": false; }; "updateIsSmallScreen": { "alias": "updateIsSmallScreen"; "required": false; }; }, {}, never, ["*"], true, never>;
}
