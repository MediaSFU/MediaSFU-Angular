import { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export interface SubAspectComponentOptions {
    backgroundColor?: string;
    showControls?: boolean;
    containerWidthFraction?: number;
    containerHeightFraction?: number;
    defaultFractionSub?: number;
}
export type SubAspectComponentType = (options: SubAspectComponentOptions) => HTMLElement;
/**
 * SubAspectComponent is an Angular component that displays a sub-aspect of a media element with customizable dimensions and background color.
 * The component adapts its size and visibility based on the provided properties and listens for window resize and orientation change events.
 *
 * @selector app-sub-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @example
 * ```html
 * <app-sub-aspect-component [backgroundColor]="'blue'" [showControls]="true" [containerWidthFraction]="0.8"></app-sub-aspect-component>
 * ```
 *
 * @input {string} backgroundColor - The background color of the component. Default is 'transparent'.
 * @input {boolean} showControls - Determines if controls are shown within the component. Default is true.
 * @input {number} containerWidthFraction - Fraction of the window width for the component width. Default is 1.
 * @input {number} containerHeightFraction - Fraction of the window height for the component height. Default is 1.
 * @input {number} defaultFractionSub - The default fraction for the sub-aspect height. Default is 0.0.
 *
 * @property {object} aspectStyles - Contains calculated styles for the component's height and width.
 * @property {number} aspectStyles.height - Calculated height of the component.
 * @property {number} aspectStyles.width - Calculated width of the component.
 *
 * @method ngOnInit - Initializes the component and adds event listeners for responsive adjustments.
 * @method ngOnChanges - Updates the aspect styles when any of the input properties change.
 * @method ngOnDestroy - Removes event listeners when the component is destroyed.
 * @method updateAspectStyles - Calculates and applies updated styles based on the window size and input properties.
 */
export declare class SubAspectComponent implements OnInit, OnDestroy, OnChanges {
    backgroundColor: string;
    showControls: boolean;
    containerWidthFraction: number;
    containerHeightFraction: number;
    defaultFractionSub: number;
    aspectStyles: {
        height: number;
        width: number;
    };
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private updateAspectStyles;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubAspectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubAspectComponent, "app-sub-aspect-component", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "showControls": { "alias": "showControls"; "required": false; }; "containerWidthFraction": { "alias": "containerWidthFraction"; "required": false; }; "containerHeightFraction": { "alias": "containerHeightFraction"; "required": false; }; "defaultFractionSub": { "alias": "defaultFractionSub"; "required": false; }; }, {}, never, ["*"], true, never>;
}
