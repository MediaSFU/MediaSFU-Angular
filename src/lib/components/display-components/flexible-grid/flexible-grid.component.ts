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
@Component({
  selector: 'app-flexible-grid',
  standalone: true,
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
  `,
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
