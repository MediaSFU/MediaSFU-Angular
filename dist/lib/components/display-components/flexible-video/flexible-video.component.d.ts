import { OnChanges, OnInit, SimpleChanges, Injector } from '@angular/core';
import { CustomMediaComponent } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface FlexibleVideoOptions {
    customWidth: number;
    customHeight: number;
    rows: number;
    columns: number;
    componentsToRender: CustomMediaComponent[];
    showAspect?: boolean;
    backgroundColor?: string;
    Screenboard?: CustomMediaComponent;
    annotateScreenStream?: boolean;
    localStreamScreen: MediaStream | null;
}
export type FlexibleVideoType = (options: FlexibleVideoOptions) => HTMLElement;
/**
 * Component for displaying a flexible video grid.
 *
 * @component
 * @selector app-flexible-video
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * <div>
 *   <!-- Dynamic styles and layout for video grid -->
 *   <div *ngFor="let rowComponents of grid; let rowIndex = index">
 *     <div *ngFor="let component of rowComponents; let colIndex = index">
 *       <ng-container *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"></ng-container>
 *     </div>
 *   </div>
 *   <div *ngIf="Screenboard && Screenboard.component">
 *     <ng-container *ngComponentOutlet="Screenboard.component; injector: createInjector(Screenboard.inputs)"></ng-container>
 *   </div>
 * </div>
 *
 * @class FlexibleVideo
 * @implements OnInit, OnChanges
 *
 * @property {number} customWidth - Custom width for the video grid.
 * @property {number} customHeight - Custom height for the video grid.
 * @property {number} rows - Number of rows in the video grid.
 * @property {number} columns - Number of columns in the video grid.
 * @property {Array<{ component: ComponentType<any>, inputs: any }>} componentsToRender - Components to render in the grid.
 * @property {boolean} showAspect - Flag to show or hide the aspect ratio.
 * @property {string} [backgroundColor='transparent'] - Background color for the video grid.
 * @property {{ component: ComponentType<any>, inputs: any }} [Screenboard] - Screenboard component to overlay on the grid.
 * @property {boolean} [annotateScreenStream=false] - Flag to annotate the screen stream.
 * @property {MediaStream} [localStreamScreen] - Local media stream for the screen.
 *
 * @property {number} key - Key for tracking changes.
 * @property {number} cardWidth - Width of each card in the grid.
 * @property {number} cardHeight - Height of each card in the grid.
 * @property {number} cardTop - Top position of each card in the grid.
 * @property {number} cardLeft - Left position of each card in the grid.
 * @property {number} canvasLeft - Left position of the canvas.
 * @property {any[][]} grid - Grid structure for the components.
 *
 * @constructor
 * @param {Injector} injector - Angular injector for dependency injection.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method generateGrid - Generates the grid structure based on rows and columns.
 * @method createInjector - Creates an injector for the given inputs.
 * @param {any} inputs - Inputs for the component.
 * @returns {Injector} - The created injector.
 */
export declare class FlexibleVideo implements OnInit, OnChanges {
    private injector;
    customWidth: number;
    customHeight: number;
    rows: number;
    columns: number;
    componentsToRender: CustomMediaComponent[];
    showAspect: boolean;
    backgroundColor?: string;
    Screenboard?: CustomMediaComponent;
    annotateScreenStream?: boolean;
    localStreamScreen?: MediaStream;
    key: number;
    cardWidth: number;
    cardHeight: number;
    cardTop: number;
    cardLeft: number;
    canvasLeft: number;
    grid: any[][];
    private injectorCache;
    constructor(injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    generateGrid(): void;
    createInjector(inputs: any): Injector;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexibleVideo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FlexibleVideo, "app-flexible-video", never, { "customWidth": { "alias": "customWidth"; "required": false; }; "customHeight": { "alias": "customHeight"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "componentsToRender": { "alias": "componentsToRender"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "Screenboard": { "alias": "Screenboard"; "required": false; }; "annotateScreenStream": { "alias": "annotateScreenStream"; "required": false; }; "localStreamScreen": { "alias": "localStreamScreen"; "required": false; }; }, {}, never, never, true, never>;
}
