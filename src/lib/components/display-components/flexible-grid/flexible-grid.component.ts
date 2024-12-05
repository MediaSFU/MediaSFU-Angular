import { Component, Input, OnInit, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FlexibleGridOptions {
  customWidth: number;
  customHeight: number;
  rows: number;
  columns: number;
  componentsToRender: { component: any; inputs?: any }[];
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

@Component({
    selector: 'app-flexible-grid',
    imports: [CommonModule],
    template: `
    <div style="padding: 0;">
      <div
        *ngFor="let rowComponents of grid; let rowIndex = index"
        style="display: flex; flex-direction: row;"
      >
        <div
          *ngFor="let component of rowComponents; let colIndex = index"
          [ngStyle]="getGridItemStyle()"
        >
          <ng-container
            *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"
          ></ng-container>
        </div>
      </div>
    </div>
  `
})
export class FlexibleGrid implements OnInit, OnChanges {
  @Input() customWidth = 0;
  @Input() customHeight = 0;
  @Input() rows = 0;
  @Input() columns = 0;
  @Input() componentsToRender: { component: any; inputs?: any }[] = [];
  @Input() backgroundColor = 'transparent';

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

  getGridItemStyle() {
    return {
      flex: 1,
      width: this.customWidth + 'px',
      height: this.customHeight + 'px',
      backgroundColor: this.backgroundColor,
      margin: '1px',
      padding: 0,
      borderRadius: '8px',
    };
  }

  createInjector(inputs: any) {
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
