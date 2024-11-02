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
 * FlexibleVideo component displays a customizable video grid, supporting dynamic layout and optional screenboard overlay.
 *
 * @selector app-flexible-video
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `customWidth` (number): The custom width for each video grid item in pixels. Default is 0.
 * - `customHeight` (number): The custom height for each video grid item in pixels. Default is 0.
 * - `rows` (number): Number of rows in the video grid. Default is 0.
 * - `columns` (number): Number of columns in the video grid. Default is 0.
 * - `componentsToRender` (CustomMediaComponent[]): Array of components to render in the grid.
 * - `showAspect` (boolean): Flag to control aspect ratio display. Default is false.
 * - `backgroundColor` (string): Background color for the video grid. Default is 'transparent'.
 * - `Screenboard` (CustomMediaComponent): Optional screenboard component to overlay on the grid.
 * - `annotateScreenStream` (boolean): Flag to annotate the screen stream. Default is false.
 * - `localStreamScreen` (MediaStream): Local screen stream for video.
 *
 * @methods
 * - `ngOnInit()`: Initializes and generates the grid on component load if `showAspect` is true.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates grid layout and dimensions if properties change.
 * - `generateGrid()`: Generates grid structure based on rows, columns, and `componentsToRender`.
 * - `createInjector(inputs: any)`: Creates and caches an injector for component inputs.
 *
 * @example
 * ```html
 * <app-flexible-video
 *   [customWidth]="300"
 *   [customHeight]="200"
 *   [rows]="2"
 *   [columns]="3"
 *   [componentsToRender]="[{ component: VideoComponent, inputs: { stream: videoStream } }]"
 *   showAspect="true"
 *   [Screenboard]="{ component: ScreenOverlayComponent, inputs: { overlayData: data } }"
 * ></app-flexible-video>
 * ```
 **/
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
