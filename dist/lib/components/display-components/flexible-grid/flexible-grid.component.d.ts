import { OnInit, OnChanges, SimpleChanges, Injector } from '@angular/core';
import * as i0 from "@angular/core";
export interface FlexibleGridOptions {
    customWidth: number;
    customHeight: number;
    rows: number;
    columns: number;
    componentsToRender: {
        component: any;
        inputs?: any;
    }[];
    backgroundColor?: string;
}
export type FlexibleGridType = (options: FlexibleGridOptions) => HTMLElement;
/**
 * FlexibleGrid is a dynamic, customizable grid component that renders a specified number of rows and columns,
 * with each grid item containing a provided component.
 *
 * @selector app-flexible-grid
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `customWidth` (number): The width for each grid item in pixels. Default is 0.
 * - `customHeight` (number): The height for each grid item in pixels. Default is 0.
 * - `rows` (number): Number of rows in the grid. Default is 0.
 * - `columns` (number): Number of columns in the grid. Default is 0.
 * - `componentsToRender` ({ component: any, inputs?: any }[]): Array of components to render in the grid, each with optional inputs.
 * - `backgroundColor` (string): Background color for each grid item. Default is 'transparent'.
 *
 * @methods
 * - `ngOnInit()`: Initializes and generates the grid on component load.
 * - `ngOnChanges(changes: SimpleChanges)`: Regenerates the grid if `columns`, `componentsToRender`, or `rows` change.
 * - `generateGrid()`: Builds the grid based on the row, column, and component configurations.
 * - `getGridItemStyle()`: Returns a style object for each grid item, including custom width, height, and background color.
 * - `createInjector(inputs: any)`: Creates a cached injector for each component to support dynamic component inputs.
 *
 * @example
 * ```html
 * <app-flexible-grid
 *   [customWidth]="100"
 *   [customHeight]="100"
 *   [rows]="2"
 *   [columns]="3"
 *   [componentsToRender]="[{ component: MyComponent, inputs: { prop: 'value' } }]"
 *   backgroundColor="lightgrey"
 * ></app-flexible-grid>
 * ```
 **/
export declare class FlexibleGrid implements OnInit, OnChanges {
    private injector;
    customWidth: number;
    customHeight: number;
    rows: number;
    columns: number;
    componentsToRender: {
        component: any;
        inputs?: any;
    }[];
    backgroundColor: string;
    grid: any[][];
    private injectorCache;
    constructor(injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    generateGrid(): void;
    getGridItemStyle(): {
        flex: number;
        width: string;
        height: string;
        backgroundColor: string;
        margin: string;
        padding: number;
        borderRadius: string;
    };
    createInjector(inputs: any): Injector;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexibleGrid, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FlexibleGrid, "app-flexible-grid", never, { "customWidth": { "alias": "customWidth"; "required": false; }; "customHeight": { "alias": "customHeight"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "componentsToRender": { "alias": "componentsToRender"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; }, {}, never, never, true, never>;
}
