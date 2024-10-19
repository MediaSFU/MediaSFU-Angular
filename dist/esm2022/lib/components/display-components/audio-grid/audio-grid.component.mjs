import { Component, Input, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvYXVkaW8tZ3JpZC9hdWRpby1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBeUIvQyxNQUFNLE9BQU8sU0FBUztJQUtBO0lBSlgsa0JBQWtCLEdBQXVDLEVBQUUsQ0FBQztJQUU3RCxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7SUFFckQsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7SUFFMUMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFXO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RGLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUTthQUN0QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELG9FQUFvRTtRQUNwRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztJQUNwRCxDQUFDO3VHQTNCVSxTQUFTOzJGQUFULFNBQVMscUpBYlY7Ozs7Ozs7Ozs7R0FVVCx5RUFYUyxZQUFZOzsyRkFjWCxTQUFTO2tCQWpCckIsU0FBUzsrQkFDRSxnQkFBZ0IsY0FDZCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYjs7Ozs7Ozs7OztHQVVUOzZFQUlRLGtCQUFrQjtzQkFBMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdG9yLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXVkaW9HcmlkT3B0aW9ucyB7XG4gIGNvbXBvbmVudHNUb1JlbmRlcjogeyBjb21wb25lbnQ6IGFueTsgaW5wdXRzPzogYW55IH1bXTtcbn1cblxuZXhwb3J0IHR5cGUgQXVkaW9HcmlkVHlwZSA9IChvcHRpb25zOiBBdWRpb0dyaWRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWF1ZGlvLWdyaWQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IHN0eWxlPVwiei1pbmRleDogOVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjb21wb25lbnRzVG9SZW5kZXI7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cInotaW5kZXg6IDlcIiBbYXR0ci5rZXldPVwiaVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cIml0ZW0uY29tcG9uZW50OyBpbmplY3RvcjogY3JlYXRlSW5qZWN0b3IoaXRlbS5pbnB1dHMpXCJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL2F1ZGlvLWdyaWQuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBBdWRpb0dyaWQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb21wb25lbnRzVG9SZW5kZXI6IHsgY29tcG9uZW50OiBhbnk7IGlucHV0cz86IGFueSB9W10gPSBbXTtcblxuICBwcml2YXRlIGluamVjdG9yQ2FjaGUgPSBuZXcgV2Vha01hcDxhbnksIEluamVjdG9yPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snY29tcG9uZW50c1RvUmVuZGVyJ10pIHtcbiAgICAgIHRoaXMuY2xlYXJJbmplY3RvckNhY2hlKCk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuaW5qZWN0b3JDYWNoZS5oYXMoaW5wdXRzKSkge1xuICAgICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IE9iamVjdC5rZXlzKGlucHV0cykubWFwKChrZXkpID0+ICh7IHByb3ZpZGU6IGtleSwgdXNlVmFsdWU6IGlucHV0c1trZXldIH0pKSxcbiAgICAgICAgcGFyZW50OiB0aGlzLmluamVjdG9yLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmluamVjdG9yQ2FjaGUuc2V0KGlucHV0cywgaW5qZWN0b3IpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIHJldHVybiB0aGlzLmluamVjdG9yQ2FjaGUuZ2V0KGlucHV0cykhO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckluamVjdG9yQ2FjaGUoKSB7XG4gICAgdGhpcy5pbmplY3RvckNhY2hlID0gbmV3IFdlYWtNYXA8YW55LCBJbmplY3Rvcj4oKTtcbiAgfVxufVxuIl19