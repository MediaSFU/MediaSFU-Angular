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
 * MainScreenComponent dynamically displays a main screen area with responsive dimensions, adjustable layout, and stacking options based on the screen size and input properties.
 *
 * @selector app-main-screen-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="containerStyle">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @inputs
 * - `mainSize` (number): Percentage size of the main component. Default is 40.
 * - `doStack` (boolean): Determines if components should be stacked. Default is true.
 * - `containerWidthFraction` (number): Fraction of the container width to use. Default is 1.
 * - `containerHeightFraction` (number): Fraction of the container height to use. Default is 1.
 * - `defaultFraction` (number): Default height fraction for the container when controls are shown. Default is 0.94.
 * - `showControls` (boolean): If true, shows control elements, affecting container height. Default is true.
 * - `updateComponentSizes` (function): Callback for updating component sizes.
 *
 * @ContentChildren('child') children - Query list of child elements within the component.
 *
 * @properties
 * - `containerStyle`: Returns a style object for the container based on dimensions and layout options.
 *
 * @methods
 * - `ngOnInit()`: Initializes the component and sets up event listeners for window resize and orientation changes.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates dimensions and layout if any relevant inputs change.
 * - `ngOnDestroy()`: Removes event listeners to prevent memory leaks.
 * - `ngAfterViewInit()`: Applies computed styles to child elements after view initialization.
 * - `computeDimensions()`: Calculates the dimensions for main and secondary components based on current layout settings.
 * - `updateDimensions()`: Updates component dimensions based on window size and input properties.
 * - `applyChildStyles()`: Applies computed styles to child components.
 *
 * @example
 * ```html
 * <app-main-screen-component
 *   [mainSize]="60"
 *   [doStack]="false"
 *   [containerWidthFraction]="0.8"
 *   [containerHeightFraction]="0.9"
 *   [defaultFraction]="0.9"
 *   [showControls]="true"
 *   [updateComponentSizes]="onUpdateSizes"
 * >
 *   <div #child>Child Component</div>
 * </app-main-screen-component>
 * ```
 **/
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
