import { OnInit, OnChanges, SimpleChanges, QueryList, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { ComponentSizes } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface MainScreenComponentOptions {
    mainSize?: number;
    doStack?: boolean;
    containerWidthFraction?: number;
    containerHeightFraction?: number;
    defaultFraction?: number;
    showControls?: boolean;
    updateComponentSizes: (sizes: ComponentSizes) => void;
}
export type MainScreenComponentType = (options: MainScreenComponentOptions) => HTMLElement;
/**
 * MainScreenComponent is responsible for displaying a main screen with dynamic dimensions
 * and layout based on the input properties and screen size.
 *
 * @selector app-main-screen-component
 * @standalone true
 * @imports CommonModule
 *
 * @property {number} mainSize - The size of the main component as a percentage.
 * @property {boolean} doStack - Determines if the components should be stacked.
 * @property {number} containerWidthFraction - Fraction of the container width.
 * @property {number} containerHeightFraction - Fraction of the container height.
 * @property {number} defaultFraction - Default fraction for height calculation.
 * @property {boolean} showControls - Flag to show or hide controls.
 * @property {(sizes: ComponentSizes) => void} updateComponentSizes - Callback to update component sizes.
 *
 * @ContentChildren('child') children - Query list of child elements.
 *
 * @property {number} parentWidth - The width of the parent container.
 * @property {number} parentHeight - The height of the parent container.
 * @property {boolean} isWideScreen - Flag to determine if the screen is wide.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnDestroy - Lifecycle hook that is called when the component is destroyed.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngAfterViewInit - Lifecycle hook that is called after the component's view has been fully initialized.
 * @method computeDimensions - Computes the dimensions of the main and other components based on the input properties.
 * @method updateDimensions - Updates the dimensions of the parent container and child components.
 * @method get containerStyle - Returns the style object for the container.
 * @method applyChildStyles - Applies the computed styles to the child components.
 */
export declare class MainScreenComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    private renderer;
    mainSize: number;
    doStack: boolean;
    containerWidthFraction: number;
    containerHeightFraction: number;
    defaultFraction: number;
    showControls: boolean;
    updateComponentSizes: (sizes: ComponentSizes) => void;
    children: QueryList<ElementRef>;
    parentWidth: number;
    parentHeight: number;
    isWideScreen: boolean;
    constructor(renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    computeDimensions(): {
        mainHeight: number;
        otherHeight: number;
        mainWidth: number;
        otherWidth: number;
    };
    updateDimensions: () => void;
    get containerStyle(): {
        display: string;
        flex: number;
        flexDirection: string;
        width: string;
        height: string;
        padding: number;
        margin: number;
    };
    applyChildStyles(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MainScreenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MainScreenComponent, "app-main-screen-component", never, { "mainSize": { "alias": "mainSize"; "required": false; }; "doStack": { "alias": "doStack"; "required": false; }; "containerWidthFraction": { "alias": "containerWidthFraction"; "required": false; }; "containerHeightFraction": { "alias": "containerHeightFraction"; "required": false; }; "defaultFraction": { "alias": "defaultFraction"; "required": false; }; "showControls": { "alias": "showControls"; "required": false; }; "updateComponentSizes": { "alias": "updateComponentSizes"; "required": false; }; }, {}, ["children"], ["*"], true, never>;
}
