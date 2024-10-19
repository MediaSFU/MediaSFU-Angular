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
 * @fileoverview SubAspectComponent is an Angular component that displays a sub-aspect of a media element.
 * It adjusts its size and visibility based on input properties and window events.
 *
 * @component
 * @selector app-sub-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * <div *ngIf="showControls" [ngStyle]="{ position: 'absolute', bottom: '0', margin: '0', backgroundColor: backgroundColor, height: aspectStyles.height + 'px', width: aspectStyles.width + 'px' }">
 *   <ng-content></ng-content>
 * </div>
 *
 * @styles []
 *
 * @class SubAspectComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the component. Default is 'transparent'.
 * @property {boolean} showControls - Determines whether the controls are shown. Default is true.
 * @property {number} containerWidthFraction - The fraction of the container's width. Default is 1.
 * @property {number} containerHeightFraction - The fraction of the container's height. Default is 1.
 * @property {number} defaultFractionSub - The default fraction for the sub-aspect. Default is 0.0.
 * @property {object} aspectStyles - The styles for the aspect, including height and width.
 * @property {number} aspectStyles.height - The height of the aspect.
 * @property {number} aspectStyles.width - The width of the aspect.
 * @property {number} subAspectFraction - The fraction of the sub-aspect.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized. Adds event listeners for window resize and orientation change.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes. Updates aspect styles if relevant properties change.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed. Removes event listeners for window resize and orientation change.
 * @method updateAspectStyles - Updates the aspect styles based on the current window size and input properties.
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
