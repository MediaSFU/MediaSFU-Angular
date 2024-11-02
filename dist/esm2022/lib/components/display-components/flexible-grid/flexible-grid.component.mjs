import { Component, Input, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
export class FlexibleGrid {
    injector;
    customWidth = 0;
    customHeight = 0;
    rows = 0;
    columns = 0;
    componentsToRender = [];
    backgroundColor = 'transparent';
    grid = [];
    injectorCache = new WeakMap();
    constructor(injector) {
        this.injector = injector;
    }
    ngOnInit() {
        this.generateGrid();
    }
    ngOnChanges(changes) {
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
    createInjector(inputs) {
        if (!this.injectorCache.has(inputs)) {
            const injector = Injector.create({
                providers: Object.keys(inputs).map((key) => ({ provide: key, useValue: inputs[key] })),
                parent: this.injector,
            });
            this.injectorCache.set(inputs, injector);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.injectorCache.get(inputs);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: FlexibleGrid, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: FlexibleGrid, isStandalone: true, selector: "app-flexible-grid", inputs: { customWidth: "customWidth", customHeight: "customHeight", rows: "rows", columns: "columns", componentsToRender: "componentsToRender", backgroundColor: "backgroundColor" }, usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: FlexibleGrid, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], ctorParameters: () => [{ type: i0.Injector }], propDecorators: { customWidth: [{
                type: Input
            }], customHeight: [{
                type: Input
            }], rows: [{
                type: Input
            }], columns: [{
                type: Input
            }], componentsToRender: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvZmxleGlibGUtZ3JpZC9mbGV4aWJsZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBYS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0NJO0FBd0JKLE1BQU0sT0FBTyxZQUFZO0lBWUg7SUFYWCxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNULE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDWixrQkFBa0IsR0FBdUMsRUFBRSxDQUFDO0lBQzVELGVBQWUsR0FBRyxhQUFhLENBQUM7SUFFekMsSUFBSSxHQUFZLEVBQUUsQ0FBQztJQUVYLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztJQUVyRCxZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztJQUUxQyxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDM0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUN6QyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDekIsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsTUFBTSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2dCQUN2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pELGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSTtZQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJO1lBQ2hDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxDQUFDO1lBQ1YsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBVztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUMvQixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUUsQ0FBQztJQUN6QyxDQUFDO3VHQTNEVSxZQUFZOzJGQUFaLFlBQVksd1JBbEJiOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JULDJEQWpCUyxZQUFZOzsyRkFtQlgsWUFBWTtrQkF0QnhCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JUO2lCQUNGOzZFQUVVLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZsZXhpYmxlR3JpZE9wdGlvbnMge1xuICBjdXN0b21XaWR0aDogbnVtYmVyO1xuICBjdXN0b21IZWlnaHQ6IG51bWJlcjtcbiAgcm93czogbnVtYmVyO1xuICBjb2x1bW5zOiBudW1iZXI7XG4gIGNvbXBvbmVudHNUb1JlbmRlcjogeyBjb21wb25lbnQ6IGFueTsgaW5wdXRzPzogYW55IH1bXTtcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBGbGV4aWJsZUdyaWRUeXBlID0gKG9wdGlvbnM6IEZsZXhpYmxlR3JpZE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEZsZXhpYmxlR3JpZCBpcyBhIGR5bmFtaWMsIGN1c3RvbWl6YWJsZSBncmlkIGNvbXBvbmVudCB0aGF0IHJlbmRlcnMgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMsXG4gKiB3aXRoIGVhY2ggZ3JpZCBpdGVtIGNvbnRhaW5pbmcgYSBwcm92aWRlZCBjb21wb25lbnQuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1mbGV4aWJsZS1ncmlkXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGBjdXN0b21XaWR0aGAgKG51bWJlcik6IFRoZSB3aWR0aCBmb3IgZWFjaCBncmlkIGl0ZW0gaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDAuXG4gKiAtIGBjdXN0b21IZWlnaHRgIChudW1iZXIpOiBUaGUgaGVpZ2h0IGZvciBlYWNoIGdyaWQgaXRlbSBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMC5cbiAqIC0gYHJvd3NgIChudW1iZXIpOiBOdW1iZXIgb2Ygcm93cyBpbiB0aGUgZ3JpZC4gRGVmYXVsdCBpcyAwLlxuICogLSBgY29sdW1uc2AgKG51bWJlcik6IE51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBncmlkLiBEZWZhdWx0IGlzIDAuXG4gKiAtIGBjb21wb25lbnRzVG9SZW5kZXJgICh7IGNvbXBvbmVudDogYW55LCBpbnB1dHM/OiBhbnkgfVtdKTogQXJyYXkgb2YgY29tcG9uZW50cyB0byByZW5kZXIgaW4gdGhlIGdyaWQsIGVhY2ggd2l0aCBvcHRpb25hbCBpbnB1dHMuXG4gKiAtIGBiYWNrZ3JvdW5kQ29sb3JgIChzdHJpbmcpOiBCYWNrZ3JvdW5kIGNvbG9yIGZvciBlYWNoIGdyaWQgaXRlbS4gRGVmYXVsdCBpcyAndHJhbnNwYXJlbnQnLlxuICpcbiAqIEBtZXRob2RzXG4gKiAtIGBuZ09uSW5pdCgpYDogSW5pdGlhbGl6ZXMgYW5kIGdlbmVyYXRlcyB0aGUgZ3JpZCBvbiBjb21wb25lbnQgbG9hZC5cbiAqIC0gYG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpYDogUmVnZW5lcmF0ZXMgdGhlIGdyaWQgaWYgYGNvbHVtbnNgLCBgY29tcG9uZW50c1RvUmVuZGVyYCwgb3IgYHJvd3NgIGNoYW5nZS5cbiAqIC0gYGdlbmVyYXRlR3JpZCgpYDogQnVpbGRzIHRoZSBncmlkIGJhc2VkIG9uIHRoZSByb3csIGNvbHVtbiwgYW5kIGNvbXBvbmVudCBjb25maWd1cmF0aW9ucy5cbiAqIC0gYGdldEdyaWRJdGVtU3R5bGUoKWA6IFJldHVybnMgYSBzdHlsZSBvYmplY3QgZm9yIGVhY2ggZ3JpZCBpdGVtLCBpbmNsdWRpbmcgY3VzdG9tIHdpZHRoLCBoZWlnaHQsIGFuZCBiYWNrZ3JvdW5kIGNvbG9yLlxuICogLSBgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpYDogQ3JlYXRlcyBhIGNhY2hlZCBpbmplY3RvciBmb3IgZWFjaCBjb21wb25lbnQgdG8gc3VwcG9ydCBkeW5hbWljIGNvbXBvbmVudCBpbnB1dHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtZmxleGlibGUtZ3JpZFxuICogICBbY3VzdG9tV2lkdGhdPVwiMTAwXCJcbiAqICAgW2N1c3RvbUhlaWdodF09XCIxMDBcIlxuICogICBbcm93c109XCIyXCJcbiAqICAgW2NvbHVtbnNdPVwiM1wiXG4gKiAgIFtjb21wb25lbnRzVG9SZW5kZXJdPVwiW3sgY29tcG9uZW50OiBNeUNvbXBvbmVudCwgaW5wdXRzOiB7IHByb3A6ICd2YWx1ZScgfSB9XVwiXG4gKiAgIGJhY2tncm91bmRDb2xvcj1cImxpZ2h0Z3JleVwiXG4gKiA+PC9hcHAtZmxleGlibGUtZ3JpZD5cbiAqIGBgYFxuICoqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZmxleGlibGUtZ3JpZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAwO1wiPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdGb3I9XCJsZXQgcm93Q29tcG9uZW50cyBvZiBncmlkOyBsZXQgcm93SW5kZXggPSBpbmRleFwiXG4gICAgICAgIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IHJvdztcIlxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNvbXBvbmVudCBvZiByb3dDb21wb25lbnRzOyBsZXQgY29sSW5kZXggPSBpbmRleFwiXG4gICAgICAgICAgW25nU3R5bGVdPVwiZ2V0R3JpZEl0ZW1TdHlsZSgpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cImNvbXBvbmVudC5jb21wb25lbnQ7IGluamVjdG9yOiBjcmVhdGVJbmplY3Rvcihjb21wb25lbnQuaW5wdXRzKVwiXG4gICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUdyaWQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGN1c3RvbVdpZHRoID0gMDtcbiAgQElucHV0KCkgY3VzdG9tSGVpZ2h0ID0gMDtcbiAgQElucHV0KCkgcm93cyA9IDA7XG4gIEBJbnB1dCgpIGNvbHVtbnMgPSAwO1xuICBASW5wdXQoKSBjb21wb25lbnRzVG9SZW5kZXI6IHsgY29tcG9uZW50OiBhbnk7IGlucHV0cz86IGFueSB9W10gPSBbXTtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcblxuICBncmlkOiBhbnlbXVtdID0gW107XG5cbiAgcHJpdmF0ZSBpbmplY3RvckNhY2hlID0gbmV3IFdlYWtNYXA8YW55LCBJbmplY3Rvcj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdlbmVyYXRlR3JpZCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydjb2x1bW5zJ10gfHwgY2hhbmdlc1snY29tcG9uZW50c1RvUmVuZGVyJ10gfHwgY2hhbmdlc1sncm93cyddKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlR3JpZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlR3JpZCgpIHtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnJvd3M7IHJvdysrKSB7XG4gICAgICBjb25zdCByb3dDb21wb25lbnRzID0gW107XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmNvbHVtbnM7IGNvbCsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcm93ICogdGhpcy5jb2x1bW5zICsgY29sO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHNUb1JlbmRlcltpbmRleF07XG4gICAgICAgIHJvd0NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5ncmlkLnB1c2gocm93Q29tcG9uZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0R3JpZEl0ZW1TdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmxleDogMSxcbiAgICAgIHdpZHRoOiB0aGlzLmN1c3RvbVdpZHRoICsgJ3B4JyxcbiAgICAgIGhlaWdodDogdGhpcy5jdXN0b21IZWlnaHQgKyAncHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIG1hcmdpbjogJzFweCcsXG4gICAgICBwYWRkaW5nOiAwLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuaW5qZWN0b3JDYWNoZS5oYXMoaW5wdXRzKSkge1xuICAgICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IE9iamVjdC5rZXlzKGlucHV0cykubWFwKChrZXkpID0+ICh7IHByb3ZpZGU6IGtleSwgdXNlVmFsdWU6IGlucHV0c1trZXldIH0pKSxcbiAgICAgICAgcGFyZW50OiB0aGlzLmluamVjdG9yLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmluamVjdG9yQ2FjaGUuc2V0KGlucHV0cywgaW5qZWN0b3IpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIHJldHVybiB0aGlzLmluamVjdG9yQ2FjaGUuZ2V0KGlucHV0cykhO1xuICB9XG59XG4iXX0=