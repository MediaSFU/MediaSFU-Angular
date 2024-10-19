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
 * MainContainerComponent is a standalone Angular component that dynamically adjusts its styles
 * based on the provided input properties and window size changes.
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
 * @class MainContainerComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the container.
 * @property {number} containerWidthFraction - The fraction of the window width the container should occupy.
 * @property {number} containerHeightFraction - The fraction of the window height the container should occupy.
 * @property {number} marginLeft - The left margin of the container in pixels.
 * @property {number} marginRight - The right margin of the container in pixels.
 * @property {number} marginTop - The top margin of the container in pixels.
 * @property {number} marginBottom - The bottom margin of the container in pixels.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized. Sets up event listeners for window resize and orientation change.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes. Updates the container styles accordingly.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed. Removes event listeners for window resize and orientation change.
 * @method updateContainerStyles - Updates the container styles based on the current input properties and window size.
 */
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
