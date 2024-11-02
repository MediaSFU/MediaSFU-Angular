import { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export interface MainContainerComponentOptions {
    backgroundColor?: string;
    containerWidthFraction?: number;
    containerHeightFraction?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    padding?: number;
}
export type MainContainerComponentType = (options: MainContainerComponentOptions) => HTMLElement;
/**
 * MainContainerComponent dynamically adjusts its styles based on input properties and window size,
 * providing a responsive container for content.
 *
 * @selector app-main-container-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="containerStyles">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @inputs
 * - `backgroundColor` (string): Background color of the container.
 * - `containerWidthFraction` (number): Fraction of the window width the container should occupy. Default is 1.
 * - `containerHeightFraction` (number): Fraction of the window height the container should occupy. Default is 1.
 * - `marginLeft` (number): Left margin of the container in pixels.
 * - `marginRight` (number): Right margin of the container in pixels.
 * - `marginTop` (number): Top margin of the container in pixels.
 * - `marginBottom` (number): Bottom margin of the container in pixels.
 * - `padding` (number): Padding inside the container in pixels.
 *
 * @methods
 * - `ngOnInit()`: Initializes the component, sets up event listeners for resize and orientation changes, and updates container styles.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates container styles when input properties change.
 * - `ngOnDestroy()`: Removes event listeners to avoid memory leaks.
 * - `updateContainerStyles()`: Computes and applies styles to the container based on current window size and input properties.
 *
 * @example
 * ```html
 * <app-main-container-component
 *   [backgroundColor]="'lightgrey'"
 *   [containerWidthFraction]="0.8"
 *   [containerHeightFraction]="0.9"
 *   [marginLeft]="10"
 *   [marginTop]="15"
 *   [padding]="5"
 * ></app-main-container-component>
 * ```
 **/
export declare class MainContainerComponent implements OnInit, OnDestroy, OnChanges {
    backgroundColor: string;
    containerWidthFraction: number;
    containerHeightFraction: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    padding: number;
    containerStyles: {
        [key: string]: any;
    };
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    updateContainerStyles: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MainContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MainContainerComponent, "app-main-container-component", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "containerWidthFraction": { "alias": "containerWidthFraction"; "required": false; }; "containerHeightFraction": { "alias": "containerHeightFraction"; "required": false; }; "marginLeft": { "alias": "marginLeft"; "required": false; }; "marginRight": { "alias": "marginRight"; "required": false; }; "marginTop": { "alias": "marginTop"; "required": false; }; "marginBottom": { "alias": "marginBottom"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; }, {}, never, ["*"], true, never>;
}
