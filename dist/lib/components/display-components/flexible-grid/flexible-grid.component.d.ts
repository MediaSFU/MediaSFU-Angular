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
 * @component FlexibleGrid
 *
 * A flexible grid component that dynamically renders a grid of components based on the provided inputs.
 *
 * @selector app-flexible-grid
 *
 * @inputs
 * - `customWidth` (number): The custom width for each grid item in pixels. Default is 0.
 * - `customHeight` (number): The custom height for each grid item in pixels. Default is 0.
 * - `rows` (number): The number of rows in the grid. Default is 0.
 * - `columns` (number): The number of columns in the grid. Default is 0.
 * - `componentsToRender` ({ component: any, inputs?: any }[]): An array of components to render in the grid, each with optional inputs.
 * - `backgroundColor` (string): The background color for each grid item. Default is 'transparent'.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook that is called after the component is initialized. It generates the grid.
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook that is called when any data-bound property of the component changes. It regenerates the grid if `columns`, `componentsToRender`, or `rows` change.
 * - `generateGrid()`: Generates the grid based on the number of rows and columns, and the components to render.
 * - `getGridItemStyle()`: Returns the style object for each grid item, including custom width, height, background color, margin, padding, and border radius.
 * - `createInjector(inputs: any)`: Creates and caches an injector for the given inputs to be used with `ngComponentOutlet`.
 *
 * @dependencies
 * - `CommonModule`: Angular's common module is imported for common directives.
 * - `Injector`: Angular's dependency injection system is used to create injectors for dynamic components.
 */
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
