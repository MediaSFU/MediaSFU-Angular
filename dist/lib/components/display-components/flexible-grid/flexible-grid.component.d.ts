import { OnInit, OnChanges, SimpleChanges, Injector, TemplateRef } from '@angular/core';
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
    containerStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
}
export type FlexibleGridType = (options: FlexibleGridOptions) => HTMLElement;
/**
 * @component FlexibleGrid
 *
 * A dynamic, highly customizable grid component that renders a specified number of rows and columns,
 * with each grid item containing a provided component. Supports full template customization and style overrides.
 *
 * @description
 * FlexibleGrid offers three levels of customization to fit your application's needs:
 *
 * 1. **Basic Usage**: Use the default grid layout with configurable rows, columns, and components
 * 2. **Style Customization**: Apply custom styles via `containerStyle` to modify grid appearance
 * 3. **Full Template Override**: Provide a custom `ng-template` via `customTemplate` for complete control
 *
 * **Key Features:**
 * - Dynamic grid generation based on rows and columns
 * - Flexible component rendering with input injection
 * - Automatic grid recalculation on property changes
 * - Customizable grid item dimensions and background colors
 * - Full template override support for custom layouts
 *
 * @selector app-flexible-grid
 * @standalone true
 * @imports CommonModule
 *
 * @example
 * Basic Usage:
 * ```html
 * <app-flexible-grid
 *   [customWidth]="200"
 *   [customHeight]="150"
 *   [rows]="2"
 *   [columns]="3"
 *   [componentsToRender]="videoComponents"
 *   backgroundColor="#f0f0f0">
 * </app-flexible-grid>
 * ```
 *
 * @example
 * Style Customization:
 * ```html
 * <app-flexible-grid
 *   [customWidth]="250"
 *   [customHeight]="200"
 *   [rows]="3"
 *   [columns]="4"
 *   [componentsToRender]="participantComponents"
 *   [containerStyle]="{
 *     padding: '20px',
 *     borderRadius: '12px',
 *     boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
 *   }"
 *   backgroundColor="white">
 * </app-flexible-grid>
 * ```
 *
 * @example
 * Custom Template Override:
 * ```typescript
 * // In your component
 * @Component({
 *   template: `
 *     <app-flexible-grid
 *       [customWidth]="300"
 *       [customHeight]="200"
 *       [rows]="2"
 *       [columns]="2"
 *       [componentsToRender]="components"
 *       [customTemplate]="customGridTemplate">
 *     </app-flexible-grid>
 *
 *     <ng-template #customGridTemplate let-gridData>
 *       <div class="my-custom-grid">
 *         <h3>Custom Grid Layout</h3>
 *         <div class="grid-container"
 *              [style.grid-template-columns]="'repeat(' + gridData.columns + ', 1fr)'">
 *           <div *ngFor="let row of gridData.grid" class="grid-row">
 *             <div *ngFor="let component of row" class="grid-item">
 *               <ng-container *ngComponentOutlet="component.component"></ng-container>
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *     </ng-template>
 *   `
 * })
 * ```
 *
 * @input customWidth - Width for each grid item in pixels. Default: 0
 * @input customHeight - Height for each grid item in pixels. Default: 0
 * @input rows - Number of rows in the grid. Default: 0
 * @input columns - Number of columns in the grid. Default: 0
 * @input componentsToRender - Array of components to render in the grid, each with optional inputs
 * @input backgroundColor - Background color for each grid item. Default: 'transparent'
 * @input containerStyle - Custom CSS styles for the grid container
 * @input customTemplate - Custom ng-template for complete grid layout override
 *
 * @method ngOnInit - Initializes and generates the grid on component load
 * @method ngOnChanges - Regenerates the grid if columns, componentsToRender, or rows change
 * @method generateGrid - Builds the grid based on the row, column, and component configurations
 * @method getGridItemStyle - Returns a style object for each grid item
 * @method createInjector - Creates a cached injector for each component to support dynamic inputs
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
    containerStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    grid: any[][];
    private injectorCache;
    constructor(injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    generateGrid(): void;
    getGridItemStyle(): any;
    createInjector(inputs: any): Injector;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexibleGrid, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FlexibleGrid, "app-flexible-grid", never, { "customWidth": { "alias": "customWidth"; "required": false; }; "customHeight": { "alias": "customHeight"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "componentsToRender": { "alias": "componentsToRender"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "containerStyle": { "alias": "containerStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
