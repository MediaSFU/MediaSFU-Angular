import { Component, Input, OnInit, OnChanges, SimpleChanges, Injector, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FlexibleGridOptions {
  customWidth: number;
  customHeight: number;
  rows: number;
  columns: number;
  componentsToRender: { component: any; inputs?: any }[];
  backgroundColor?: string;
  containerStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
  isDarkMode?: boolean;
  enableGlassmorphism?: boolean;
  cellBorderRadius?: number;
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

@Component({
    selector: 'app-flexible-grid',
    imports: [CommonModule],
    template: `
    <div *ngIf="customTemplate; else defaultTemplate" class="flexible-grid flexible-grid--custom">
      <ng-container *ngTemplateOutlet="customTemplate; context: {
        $implicit: {
          customWidth,
          customHeight,
          rows,
          columns,
          componentsToRender,
          backgroundColor,
          grid
        }
      }"></ng-container>
    </div>
    <ng-template #defaultTemplate>
      <div class="flexible-grid" [ngStyle]="getGridWrapperStyle()">
        <div
          *ngFor="let rowComponents of grid; let rowIndex = index"
          class="flexible-grid__row"
        >
          <div
            *ngFor="let component of rowComponents; let colIndex = index"
            class="flexible-grid__cell"
            [ngStyle]="getGridItemStyle(component)"
          >
            <ng-container *ngIf="component?.component; else emptyCell">
              <ng-container
                *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"
              ></ng-container>
            </ng-container>
            <ng-template #emptyCell>
              <div class="flexible-grid__placeholder">
                <span class="flexible-grid__placeholder-core"></span>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  `,
    styles: [
        `
      .flexible-grid {
        padding: 0;
        display: flex;
        flex-direction: column;
      }

      .flexible-grid__row {
        display: flex;
        flex-direction: row;
      }

      .flexible-grid__cell {
        position: relative;
      }

      .flexible-grid__placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .flexible-grid__placeholder-core {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(148, 163, 184, 0.16) 0%, rgba(20, 184, 166, 0.16) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
      }
    `,
    ]
})
export class FlexibleGrid implements OnInit, OnChanges {
  @Input() customWidth = 0;
  @Input() customHeight = 0;
  @Input() rows = 0;
  @Input() columns = 0;
  @Input() componentsToRender: { component: any; inputs?: any }[] = [];
  @Input() backgroundColor = 'transparent';
  @Input() containerStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;
  @Input() isDarkMode = true;
  @Input() enableGlassmorphism = true;
  @Input() cellBorderRadius = 8;

  grid: any[][] = [];

  private injectorCache = new WeakMap<any, Injector>();

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.generateGrid();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns'] || changes['componentsToRender'] || changes['rows']) {
      this.generateGrid();
    }
  }

  generateGrid() {
    this.grid = [];
    for (let row = 0; row < this.rows; row++) {
      const rowComponents = [];
      for (let col = 0; col < this.columns; col++) {
        const index = row * this.columns + col;
        const component = this.componentsToRender[index];
        rowComponents.push(component);
      }
      this.grid.push(rowComponents);
    }
  }

  getGridWrapperStyle() {
    return {
      ...(this.containerStyle ?? {}),
    };
  }

  getGridItemStyle(component?: { component: any; inputs?: any }) {
    const hasContent = !!component?.component;
    const emptyBackground = this.enableGlassmorphism
      ? this.isDarkMode
        ? 'rgba(255, 255, 255, 0.03)'
        : 'rgba(0, 0, 0, 0.02)'
      : this.backgroundColor;
    const borderColor = this.enableGlassmorphism
      ? this.isDarkMode
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(0, 0, 0, 0.04)'
      : 'transparent';

    const baseStyles = {
      flex: 1,
      width: this.customWidth + 'px',
      height: this.customHeight + 'px',
      background: hasContent ? this.backgroundColor : emptyBackground,
      margin: '1px',
      padding: 0,
      borderRadius: `${Math.max(this.cellBorderRadius, 0)}px`,
      border: !hasContent && this.enableGlassmorphism ? `1px solid ${borderColor}` : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return baseStyles;
  }

  createInjector(inputs: any) {
    if (!inputs || typeof inputs !== 'object') {
      return this.injector;
    }

    if (!this.injectorCache.has(inputs)) {
      const injector = Injector.create({
        providers: Object.keys(inputs).map((key) => ({ provide: key, useValue: inputs[key] })),
        parent: this.injector,
      });
      this.injectorCache.set(inputs, injector);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.injectorCache.get(inputs)!;
  }
}
