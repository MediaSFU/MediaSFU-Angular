import { Component, Input, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvZmxleGlibGUtZ3JpZC9mbGV4aWJsZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBYS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBdUJILE1BQU0sT0FBTyxZQUFZO0lBWUg7SUFYWCxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNULE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDWixrQkFBa0IsR0FBdUMsRUFBRSxDQUFDO0lBQzVELGVBQWUsR0FBRyxhQUFhLENBQUM7SUFFekMsSUFBSSxHQUFZLEVBQUUsQ0FBQztJQUVYLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztJQUVyRCxZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztJQUUxQyxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDM0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUN6QyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDekIsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsTUFBTSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2dCQUN2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pELGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSTtZQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJO1lBQ2hDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxDQUFDO1lBQ1YsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBVztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUMvQixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUUsQ0FBQztJQUN6QyxDQUFDO3VHQTNEVSxZQUFZOzJGQUFaLFlBQVksd1JBbEJiOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JULDJEQWpCUyxZQUFZOzsyRkFtQlgsWUFBWTtrQkF0QnhCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JUO2lCQUNGOzZFQUVVLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZsZXhpYmxlR3JpZE9wdGlvbnMge1xuICBjdXN0b21XaWR0aDogbnVtYmVyO1xuICBjdXN0b21IZWlnaHQ6IG51bWJlcjtcbiAgcm93czogbnVtYmVyO1xuICBjb2x1bW5zOiBudW1iZXI7XG4gIGNvbXBvbmVudHNUb1JlbmRlcjogeyBjb21wb25lbnQ6IGFueTsgaW5wdXRzPzogYW55IH1bXTtcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBGbGV4aWJsZUdyaWRUeXBlID0gKG9wdGlvbnM6IEZsZXhpYmxlR3JpZE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEBjb21wb25lbnQgRmxleGlibGVHcmlkXG4gKlxuICogQSBmbGV4aWJsZSBncmlkIGNvbXBvbmVudCB0aGF0IGR5bmFtaWNhbGx5IHJlbmRlcnMgYSBncmlkIG9mIGNvbXBvbmVudHMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGlucHV0cy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLWZsZXhpYmxlLWdyaWRcbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGBjdXN0b21XaWR0aGAgKG51bWJlcik6IFRoZSBjdXN0b20gd2lkdGggZm9yIGVhY2ggZ3JpZCBpdGVtIGluIHBpeGVscy4gRGVmYXVsdCBpcyAwLlxuICogLSBgY3VzdG9tSGVpZ2h0YCAobnVtYmVyKTogVGhlIGN1c3RvbSBoZWlnaHQgZm9yIGVhY2ggZ3JpZCBpdGVtIGluIHBpeGVscy4gRGVmYXVsdCBpcyAwLlxuICogLSBgcm93c2AgKG51bWJlcik6IFRoZSBudW1iZXIgb2Ygcm93cyBpbiB0aGUgZ3JpZC4gRGVmYXVsdCBpcyAwLlxuICogLSBgY29sdW1uc2AgKG51bWJlcik6IFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgZ3JpZC4gRGVmYXVsdCBpcyAwLlxuICogLSBgY29tcG9uZW50c1RvUmVuZGVyYCAoeyBjb21wb25lbnQ6IGFueSwgaW5wdXRzPzogYW55IH1bXSk6IEFuIGFycmF5IG9mIGNvbXBvbmVudHMgdG8gcmVuZGVyIGluIHRoZSBncmlkLCBlYWNoIHdpdGggb3B0aW9uYWwgaW5wdXRzLlxuICogLSBgYmFja2dyb3VuZENvbG9yYCAoc3RyaW5nKTogVGhlIGJhY2tncm91bmQgY29sb3IgZm9yIGVhY2ggZ3JpZCBpdGVtLiBEZWZhdWx0IGlzICd0cmFuc3BhcmVudCcuXG4gKlxuICogQG1ldGhvZHNcbiAqIC0gYG5nT25Jbml0KClgOiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkLiBJdCBnZW5lcmF0ZXMgdGhlIGdyaWQuXG4gKiAtIGBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKWA6IExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgdGhlIGNvbXBvbmVudCBjaGFuZ2VzLiBJdCByZWdlbmVyYXRlcyB0aGUgZ3JpZCBpZiBgY29sdW1uc2AsIGBjb21wb25lbnRzVG9SZW5kZXJgLCBvciBgcm93c2AgY2hhbmdlLlxuICogLSBgZ2VuZXJhdGVHcmlkKClgOiBHZW5lcmF0ZXMgdGhlIGdyaWQgYmFzZWQgb24gdGhlIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zLCBhbmQgdGhlIGNvbXBvbmVudHMgdG8gcmVuZGVyLlxuICogLSBgZ2V0R3JpZEl0ZW1TdHlsZSgpYDogUmV0dXJucyB0aGUgc3R5bGUgb2JqZWN0IGZvciBlYWNoIGdyaWQgaXRlbSwgaW5jbHVkaW5nIGN1c3RvbSB3aWR0aCwgaGVpZ2h0LCBiYWNrZ3JvdW5kIGNvbG9yLCBtYXJnaW4sIHBhZGRpbmcsIGFuZCBib3JkZXIgcmFkaXVzLlxuICogLSBgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpYDogQ3JlYXRlcyBhbmQgY2FjaGVzIGFuIGluamVjdG9yIGZvciB0aGUgZ2l2ZW4gaW5wdXRzIHRvIGJlIHVzZWQgd2l0aCBgbmdDb21wb25lbnRPdXRsZXRgLlxuICpcbiAqIEBkZXBlbmRlbmNpZXNcbiAqIC0gYENvbW1vbk1vZHVsZWA6IEFuZ3VsYXIncyBjb21tb24gbW9kdWxlIGlzIGltcG9ydGVkIGZvciBjb21tb24gZGlyZWN0aXZlcy5cbiAqIC0gYEluamVjdG9yYDogQW5ndWxhcidzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHN5c3RlbSBpcyB1c2VkIHRvIGNyZWF0ZSBpbmplY3RvcnMgZm9yIGR5bmFtaWMgY29tcG9uZW50cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWZsZXhpYmxlLWdyaWQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IHN0eWxlPVwicGFkZGluZzogMDtcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nRm9yPVwibGV0IHJvd0NvbXBvbmVudHMgb2YgZ3JpZDsgbGV0IHJvd0luZGV4ID0gaW5kZXhcIlxuICAgICAgICBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiByb3c7XCJcbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBjb21wb25lbnQgb2Ygcm93Q29tcG9uZW50czsgbGV0IGNvbEluZGV4ID0gaW5kZXhcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEdyaWRJdGVtU3R5bGUoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJjb21wb25lbnQuY29tcG9uZW50OyBpbmplY3RvcjogY3JlYXRlSW5qZWN0b3IoY29tcG9uZW50LmlucHV0cylcIlxuICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRmxleGlibGVHcmlkIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjdXN0b21XaWR0aCA9IDA7XG4gIEBJbnB1dCgpIGN1c3RvbUhlaWdodCA9IDA7XG4gIEBJbnB1dCgpIHJvd3MgPSAwO1xuICBASW5wdXQoKSBjb2x1bW5zID0gMDtcbiAgQElucHV0KCkgY29tcG9uZW50c1RvUmVuZGVyOiB7IGNvbXBvbmVudDogYW55OyBpbnB1dHM/OiBhbnkgfVtdID0gW107XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG5cbiAgZ3JpZDogYW55W11bXSA9IFtdO1xuXG4gIHByaXZhdGUgaW5qZWN0b3JDYWNoZSA9IG5ldyBXZWFrTWFwPGFueSwgSW5qZWN0b3I+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZW5lcmF0ZUdyaWQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snY29sdW1ucyddIHx8IGNoYW5nZXNbJ2NvbXBvbmVudHNUb1JlbmRlciddIHx8IGNoYW5nZXNbJ3Jvd3MnXSkge1xuICAgICAgdGhpcy5nZW5lcmF0ZUdyaWQoKTtcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZUdyaWQoKSB7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5yb3dzOyByb3crKykge1xuICAgICAgY29uc3Qgcm93Q29tcG9uZW50cyA9IFtdO1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5jb2x1bW5zOyBjb2wrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHJvdyAqIHRoaXMuY29sdW1ucyArIGNvbDtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzVG9SZW5kZXJbaW5kZXhdO1xuICAgICAgICByb3dDb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ3JpZC5wdXNoKHJvd0NvbXBvbmVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGdldEdyaWRJdGVtU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZsZXg6IDEsXG4gICAgICB3aWR0aDogdGhpcy5jdXN0b21XaWR0aCArICdweCcsXG4gICAgICBoZWlnaHQ6IHRoaXMuY3VzdG9tSGVpZ2h0ICsgJ3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBtYXJnaW46ICcxcHgnLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZUluamVjdG9yKGlucHV0czogYW55KSB7XG4gICAgaWYgKCF0aGlzLmluamVjdG9yQ2FjaGUuaGFzKGlucHV0cykpIHtcbiAgICAgIGNvbnN0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBPYmplY3Qua2V5cyhpbnB1dHMpLm1hcCgoa2V5KSA9PiAoeyBwcm92aWRlOiBrZXksIHVzZVZhbHVlOiBpbnB1dHNba2V5XSB9KSksXG4gICAgICAgIHBhcmVudDogdGhpcy5pbmplY3RvcixcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbmplY3RvckNhY2hlLnNldChpbnB1dHMsIGluamVjdG9yKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICByZXR1cm4gdGhpcy5pbmplY3RvckNhY2hlLmdldChpbnB1dHMpITtcbiAgfVxufVxuIl19