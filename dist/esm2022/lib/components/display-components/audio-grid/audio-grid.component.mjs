import { Component, Input, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * AudioGrid component renders a dynamic grid of components with individually provided inputs.
 *
 * @selector app-audio-grid
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `componentsToRender` ({ component: any; inputs?: any }[]): Array of components with optional inputs to render in the grid.
 *
 * @methods
 * - `ngOnChanges(changes: SimpleChanges)`: Clears the injector cache on changes to `componentsToRender`.
 * - `createInjector(inputs: any)`: Creates and caches an injector with specific inputs for each component.
 * - `clearInjectorCache()`: Clears the cache to avoid memory leaks and ensure updated injectors.
 *
 * @example
 * ```html
 * <app-audio-grid [componentsToRender]="[{ component: AudioCard, inputs: { name: 'Participant 1' } }]"></app-audio-grid>
 * ```
 **/
export class AudioGrid {
    injector;
    componentsToRender = [];
    injectorCache = new WeakMap();
    constructor(injector) {
        this.injector = injector;
    }
    ngOnChanges(changes) {
        if (changes['componentsToRender']) {
            this.clearInjectorCache();
        }
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
    clearInjectorCache() {
        this.injectorCache = new WeakMap();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AudioGrid, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: AudioGrid, isStandalone: true, selector: "app-audio-grid", inputs: { componentsToRender: "componentsToRender" }, usesOnChanges: true, ngImport: i0, template: `
    <div style="z-index: 9">
      <ng-container *ngFor="let item of componentsToRender; let i = index">
        <div style="z-index: 9" [attr.key]="i">
          <ng-container
            *ngComponentOutlet="item.component; injector: createInjector(item.inputs)"
          ></ng-container>
        </div>
      </ng-container>
    </div>
  `, isInline: true, styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AudioGrid, decorators: [{
            type: Component,
            args: [{ selector: 'app-audio-grid', standalone: true, imports: [CommonModule], template: `
    <div style="z-index: 9">
      <ng-container *ngFor="let item of componentsToRender; let i = index">
        <div style="z-index: 9" [attr.key]="i">
          <ng-container
            *ngComponentOutlet="item.component; injector: createInjector(item.inputs)"
          ></ng-container>
        </div>
      </ng-container>
    </div>
  ` }]
        }], ctorParameters: () => [{ type: i0.Injector }], propDecorators: { componentsToRender: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvYXVkaW8tZ3JpZC9hdWRpby1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBUy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUJJO0FBcUJKLE1BQU0sT0FBTyxTQUFTO0lBS0E7SUFKWCxrQkFBa0IsR0FBdUMsRUFBRSxDQUFDO0lBRTdELGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztJQUVyRCxZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztJQUUxQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQVc7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDcEMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDL0IsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEYsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3RCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0Qsb0VBQW9FO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFFLENBQUM7SUFDekMsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO0lBQ3BELENBQUM7dUdBM0JVLFNBQVM7MkZBQVQsU0FBUyxxSkFmVjs7Ozs7Ozs7OztHQVVULHlFQVhTLFlBQVk7OzJGQWdCWCxTQUFTO2tCQW5CckIsU0FBUzsrQkFDRSxnQkFBZ0IsY0FDZCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYjs7Ozs7Ozs7OztHQVVUOzZFQU1RLGtCQUFrQjtzQkFBMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdG9yLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXVkaW9HcmlkT3B0aW9ucyB7XG4gIGNvbXBvbmVudHNUb1JlbmRlcjogeyBjb21wb25lbnQ6IGFueTsgaW5wdXRzPzogYW55IH1bXTtcbn1cblxuZXhwb3J0IHR5cGUgQXVkaW9HcmlkVHlwZSA9IChvcHRpb25zOiBBdWRpb0dyaWRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuXG4vKipcbiAqIEF1ZGlvR3JpZCBjb21wb25lbnQgcmVuZGVycyBhIGR5bmFtaWMgZ3JpZCBvZiBjb21wb25lbnRzIHdpdGggaW5kaXZpZHVhbGx5IHByb3ZpZGVkIGlucHV0cy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLWF1ZGlvLWdyaWRcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICpcbiAqIEBpbnB1dHNcbiAqIC0gYGNvbXBvbmVudHNUb1JlbmRlcmAgKHsgY29tcG9uZW50OiBhbnk7IGlucHV0cz86IGFueSB9W10pOiBBcnJheSBvZiBjb21wb25lbnRzIHdpdGggb3B0aW9uYWwgaW5wdXRzIHRvIHJlbmRlciBpbiB0aGUgZ3JpZC5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcylgOiBDbGVhcnMgdGhlIGluamVjdG9yIGNhY2hlIG9uIGNoYW5nZXMgdG8gYGNvbXBvbmVudHNUb1JlbmRlcmAuXG4gKiAtIGBjcmVhdGVJbmplY3RvcihpbnB1dHM6IGFueSlgOiBDcmVhdGVzIGFuZCBjYWNoZXMgYW4gaW5qZWN0b3Igd2l0aCBzcGVjaWZpYyBpbnB1dHMgZm9yIGVhY2ggY29tcG9uZW50LlxuICogLSBgY2xlYXJJbmplY3RvckNhY2hlKClgOiBDbGVhcnMgdGhlIGNhY2hlIHRvIGF2b2lkIG1lbW9yeSBsZWFrcyBhbmQgZW5zdXJlIHVwZGF0ZWQgaW5qZWN0b3JzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLWF1ZGlvLWdyaWQgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJbeyBjb21wb25lbnQ6IEF1ZGlvQ2FyZCwgaW5wdXRzOiB7IG5hbWU6ICdQYXJ0aWNpcGFudCAxJyB9IH1dXCI+PC9hcHAtYXVkaW8tZ3JpZD5cbiAqIGBgYFxuICoqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYXVkaW8tZ3JpZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgc3R5bGU9XCJ6LWluZGV4OiA5XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNvbXBvbmVudHNUb1JlbmRlcjsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiei1pbmRleDogOVwiIFthdHRyLmtleV09XCJpXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiaXRlbS5jb21wb25lbnQ7IGluamVjdG9yOiBjcmVhdGVJbmplY3RvcihpdGVtLmlucHV0cylcIlxuICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vYXVkaW8tZ3JpZC5jb21wb25lbnQuY3NzJ10sXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBBdWRpb0dyaWQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb21wb25lbnRzVG9SZW5kZXI6IHsgY29tcG9uZW50OiBhbnk7IGlucHV0cz86IGFueSB9W10gPSBbXTtcblxuICBwcml2YXRlIGluamVjdG9yQ2FjaGUgPSBuZXcgV2Vha01hcDxhbnksIEluamVjdG9yPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snY29tcG9uZW50c1RvUmVuZGVyJ10pIHtcbiAgICAgIHRoaXMuY2xlYXJJbmplY3RvckNhY2hlKCk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuaW5qZWN0b3JDYWNoZS5oYXMoaW5wdXRzKSkge1xuICAgICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IE9iamVjdC5rZXlzKGlucHV0cykubWFwKChrZXkpID0+ICh7IHByb3ZpZGU6IGtleSwgdXNlVmFsdWU6IGlucHV0c1trZXldIH0pKSxcbiAgICAgICAgcGFyZW50OiB0aGlzLmluamVjdG9yLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmluamVjdG9yQ2FjaGUuc2V0KGlucHV0cywgaW5qZWN0b3IpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIHJldHVybiB0aGlzLmluamVjdG9yQ2FjaGUuZ2V0KGlucHV0cykhO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckluamVjdG9yQ2FjaGUoKSB7XG4gICAgdGhpcy5pbmplY3RvckNhY2hlID0gbmV3IFdlYWtNYXA8YW55LCBJbmplY3Rvcj4oKTtcbiAgfVxufVxuIl19