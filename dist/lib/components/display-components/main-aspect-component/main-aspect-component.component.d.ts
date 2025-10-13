import { OnInit, OnDestroy, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
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
    containerStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
}
export type MainAspectComponentType = (options: MainAspectComponentOptions) => HTMLElement;
/**
 * MainAspectComponent dynamically adjusts its aspect ratio based on window size, providing an adaptable container for content.
 * It listens for window resize and orientation changes to update its layout, making it suitable for responsive applications.
 *
 * @selector app-main-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="aspectStyles" [style.backgroundColor]="backgroundColor" class="aspect-container">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @styles
 * - `.aspect-container`: Styles for overflow handling.
 *
 * @inputs
 * - `backgroundColor` (string): The background color of the aspect container.
 * - `showControls` (boolean): Toggles control display, adjusting the container height. Default is true.
 * - `containerWidthFraction` (number): Fraction of window width for container width. Default is 1.
 * - `containerHeightFraction` (number): Fraction of window height for container height. Default is 1.
 * - `defaultFraction` (number): Height adjustment factor when controls are shown. Default is 0.94.
 * - `updateIsWideScreen` (function): Callback to set wide screen status.
 * - `updateIsMediumScreen` (function): Callback to set medium screen status.
 * - `updateIsSmallScreen` (function): Callback to set small screen status.
 *
 * @methods
 * - `ngOnInit()`: Initializes component and sets up resize and orientation listeners.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates layout when relevant inputs change.
 * - `ngOnDestroy()`: Removes event listeners to prevent memory leaks.
 * - `updateAspectStyles()`: Calculates and applies styles based on current window dimensions and component inputs.
 *
 * @example
 * ```html
 * <app-main-aspect-component
 *   [backgroundColor]="'lightblue'"
 *   [showControls]="true"
 *   [containerWidthFraction]="0.9"
 *   [containerHeightFraction]="0.8"
 *   [defaultFraction]="0.95"
 *   [updateIsWideScreen]="onWideScreenUpdate"
 *   [updateIsMediumScreen]="onMediumScreenUpdate"
 *   [updateIsSmallScreen]="onSmallScreenUpdate"
 * ></app-main-aspect-component>
 * ```
 **/
export declare class MainAspectComponent implements OnInit, OnDestroy, OnChanges {
    backgroundColor: string;
    showControls: boolean;
    containerWidthFraction: number;
    containerHeightFraction: number;
    defaultFraction: number;
    updateIsWideScreen: (isWideScreen: boolean) => void;
    updateIsMediumScreen: (isMediumScreen: boolean) => void;
    updateIsSmallScreen: (isSmallScreen: boolean) => void;
    containerStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    aspectStyles: {
        [key: string]: any;
    };
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private updateAspectStyles;
    static ɵfac: i0.ɵɵFactoryDeclaration<MainAspectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MainAspectComponent, "app-main-aspect-component", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "showControls": { "alias": "showControls"; "required": false; }; "containerWidthFraction": { "alias": "containerWidthFraction"; "required": false; }; "containerHeightFraction": { "alias": "containerHeightFraction"; "required": false; }; "defaultFraction": { "alias": "defaultFraction"; "required": false; }; "updateIsWideScreen": { "alias": "updateIsWideScreen"; "required": false; }; "updateIsMediumScreen": { "alias": "updateIsMediumScreen"; "required": false; }; "updateIsSmallScreen": { "alias": "updateIsSmallScreen"; "required": false; }; "containerStyle": { "alias": "containerStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, ["*"], true, never>;
}
