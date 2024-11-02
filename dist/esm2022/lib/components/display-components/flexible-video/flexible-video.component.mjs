import { Component, Input, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * FlexibleVideo component displays a customizable video grid, supporting dynamic layout and optional screenboard overlay.
 *
 * @selector app-flexible-video
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `customWidth` (number): The custom width for each video grid item in pixels. Default is 0.
 * - `customHeight` (number): The custom height for each video grid item in pixels. Default is 0.
 * - `rows` (number): Number of rows in the video grid. Default is 0.
 * - `columns` (number): Number of columns in the video grid. Default is 0.
 * - `componentsToRender` (CustomMediaComponent[]): Array of components to render in the grid.
 * - `showAspect` (boolean): Flag to control aspect ratio display. Default is false.
 * - `backgroundColor` (string): Background color for the video grid. Default is 'transparent'.
 * - `Screenboard` (CustomMediaComponent): Optional screenboard component to overlay on the grid.
 * - `annotateScreenStream` (boolean): Flag to annotate the screen stream. Default is false.
 * - `localStreamScreen` (MediaStream): Local screen stream for video.
 *
 * @methods
 * - `ngOnInit()`: Initializes and generates the grid on component load if `showAspect` is true.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates grid layout and dimensions if properties change.
 * - `generateGrid()`: Generates grid structure based on rows, columns, and `componentsToRender`.
 * - `createInjector(inputs: any)`: Creates and caches an injector for component inputs.
 *
 * @example
 * ```html
 * <app-flexible-video
 *   [customWidth]="300"
 *   [customHeight]="200"
 *   [rows]="2"
 *   [columns]="3"
 *   [componentsToRender]="[{ component: VideoComponent, inputs: { stream: videoStream } }]"
 *   showAspect="true"
 *   [Screenboard]="{ component: ScreenOverlayComponent, inputs: { overlayData: data } }"
 * ></app-flexible-video>
 * ```
 **/
export class FlexibleVideo {
    injector;
    customWidth = 0;
    customHeight = 0;
    rows = 0;
    columns = 0;
    componentsToRender = [];
    showAspect = false;
    backgroundColor = 'transparent';
    Screenboard;
    annotateScreenStream = false;
    localStreamScreen;
    key = 0;
    cardWidth = 0;
    cardHeight = 0;
    cardTop = 0;
    cardLeft = 0;
    canvasLeft = 0;
    grid = [];
    injectorCache = new WeakMap();
    constructor(injector) {
        this.injector = injector;
    }
    ngOnInit() {
        if (this.showAspect) {
            this.generateGrid();
        }
    }
    ngOnChanges(changes) {
        if (changes['columns'] ||
            changes['rows'] ||
            changes['componentsToRender'] ||
            changes['customWidth'] ||
            changes['customHeight']) {
            if (this.showAspect) {
                this.key++;
                this.generateGrid();
            }
        }
        if (this.annotateScreenStream && this.localStreamScreen) {
            const videoHeight = this.localStreamScreen.getVideoTracks()[0].getSettings().height || 0;
            const videoWidth = this.localStreamScreen.getVideoTracks()[0].getSettings().width || 0;
            this.cardWidth = videoWidth;
            this.cardHeight = videoHeight;
            this.cardTop = Math.floor((this.customHeight - videoHeight) / 2);
            this.cardLeft = Math.floor((this.customWidth - videoWidth) / 2);
            this.canvasLeft = this.cardLeft < 0 ? this.cardLeft : 0;
        }
        else {
            this.cardWidth = this.customWidth;
            this.cardHeight = this.customHeight;
            this.cardTop = 0;
            this.cardLeft = 0;
            this.canvasLeft = 0;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: FlexibleVideo, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: FlexibleVideo, isStandalone: true, selector: "app-flexible-video", inputs: { customWidth: "customWidth", customHeight: "customHeight", rows: "rows", columns: "columns", componentsToRender: "componentsToRender", showAspect: "showAspect", backgroundColor: "backgroundColor", Screenboard: "Screenboard", annotateScreenStream: "annotateScreenStream", localStreamScreen: "localStreamScreen" }, usesOnChanges: true, ngImport: i0, template: `
    <div
      style="padding: 0; flex: 1; margin: 0; position: relative; display: {{
        showAspect ? 'flex' : 'none'
      }};
             max-width: {{ customWidth }}px; overflow-x: hidden; overflow-y: auto; left: {{
        cardLeft > 0 ? cardLeft : 0
      }}px;"
    >
      <div
        *ngFor="let rowComponents of grid; let rowIndex = index"
        style="display: flex; flex-direction: row;"
      >
        <div
          *ngFor="let component of rowComponents; let colIndex = index"
          [ngStyle]="{
            flex: 1,
            width: cardWidth + 'px',
            height: cardHeight + 'px',
            backgroundColor: backgroundColor,
            margin: '1px',
            padding: 0,
            borderRadius: '0px',
            left: cardLeft + 'px'
          }"
        >
          <ng-container
            *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"
          ></ng-container>
        </div>
      </div>
      <div
        *ngIf="Screenboard && Screenboard.component"
        [ngStyle]="{
          position: 'absolute',
          top: '0',
          left: canvasLeft + 'px',
          width: cardWidth + 'px',
          height: cardHeight + 'px',
          backgroundColor: 'rgba(0, 0, 0, 0.005)',
          zIndex: '2'
        }"
      >
        <ng-container
          *ngComponentOutlet="Screenboard.component; injector: createInjector(Screenboard.inputs)"
        ></ng-container>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: FlexibleVideo, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-flexible-video',
                    standalone: true,
                    imports: [CommonModule],
                    template: `
    <div
      style="padding: 0; flex: 1; margin: 0; position: relative; display: {{
        showAspect ? 'flex' : 'none'
      }};
             max-width: {{ customWidth }}px; overflow-x: hidden; overflow-y: auto; left: {{
        cardLeft > 0 ? cardLeft : 0
      }}px;"
    >
      <div
        *ngFor="let rowComponents of grid; let rowIndex = index"
        style="display: flex; flex-direction: row;"
      >
        <div
          *ngFor="let component of rowComponents; let colIndex = index"
          [ngStyle]="{
            flex: 1,
            width: cardWidth + 'px',
            height: cardHeight + 'px',
            backgroundColor: backgroundColor,
            margin: '1px',
            padding: 0,
            borderRadius: '0px',
            left: cardLeft + 'px'
          }"
        >
          <ng-container
            *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"
          ></ng-container>
        </div>
      </div>
      <div
        *ngIf="Screenboard && Screenboard.component"
        [ngStyle]="{
          position: 'absolute',
          top: '0',
          left: canvasLeft + 'px',
          width: cardWidth + 'px',
          height: cardHeight + 'px',
          backgroundColor: 'rgba(0, 0, 0, 0.005)',
          zIndex: '2'
        }"
      >
        <ng-container
          *ngComponentOutlet="Screenboard.component; injector: createInjector(Screenboard.inputs)"
        ></ng-container>
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
            }], showAspect: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], Screenboard: [{
                type: Input
            }], annotateScreenStream: [{
                type: Input
            }], localStreamScreen: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtdmlkZW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL2ZsZXhpYmxlLXZpZGVvL2ZsZXhpYmxlLXZpZGVvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBaUIvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFDSTtBQXlESixNQUFNLE9BQU8sYUFBYTtJQXNCSjtJQXJCWCxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNULE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDWixrQkFBa0IsR0FBMkIsRUFBRSxDQUFDO0lBQ2hELFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsZUFBZSxHQUFZLGFBQWEsQ0FBQztJQUN6QyxXQUFXLENBQXdCO0lBQ25DLG9CQUFvQixHQUFhLEtBQUssQ0FBQztJQUN2QyxpQkFBaUIsQ0FBZTtJQUV6QyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1IsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNkLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDZixPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ1osUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNiLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDZixJQUFJLEdBQVksRUFBRSxDQUFDO0lBRVgsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO0lBRXJELFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEs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QUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcywgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDdXN0b21NZWRpYUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIEZsZXhpYmxlVmlkZW9PcHRpb25zIHtcbiAgY3VzdG9tV2lkdGg6IG51bWJlcjtcbiAgY3VzdG9tSGVpZ2h0OiBudW1iZXI7XG4gIHJvd3M6IG51bWJlcjtcbiAgY29sdW1uczogbnVtYmVyO1xuICBjb21wb25lbnRzVG9SZW5kZXI6IEN1c3RvbU1lZGlhQ29tcG9uZW50W107XG4gIHNob3dBc3BlY3Q/OiBib29sZWFuO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIFNjcmVlbmJvYXJkPzogQ3VzdG9tTWVkaWFDb21wb25lbnQ7XG4gIGFubm90YXRlU2NyZWVuU3RyZWFtPzogYm9vbGVhbjtcbiAgbG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbDtcbn1cblxuZXhwb3J0IHR5cGUgRmxleGlibGVWaWRlb1R5cGUgPSAob3B0aW9uczogRmxleGlibGVWaWRlb09wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEZsZXhpYmxlVmlkZW8gY29tcG9uZW50IGRpc3BsYXlzIGEgY3VzdG9taXphYmxlIHZpZGVvIGdyaWQsIHN1cHBvcnRpbmcgZHluYW1pYyBsYXlvdXQgYW5kIG9wdGlvbmFsIHNjcmVlbmJvYXJkIG92ZXJsYXkuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1mbGV4aWJsZS12aWRlb1xuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlXG4gKlxuICogQGlucHV0c1xuICogLSBgY3VzdG9tV2lkdGhgIChudW1iZXIpOiBUaGUgY3VzdG9tIHdpZHRoIGZvciBlYWNoIHZpZGVvIGdyaWQgaXRlbSBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMC5cbiAqIC0gYGN1c3RvbUhlaWdodGAgKG51bWJlcik6IFRoZSBjdXN0b20gaGVpZ2h0IGZvciBlYWNoIHZpZGVvIGdyaWQgaXRlbSBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMC5cbiAqIC0gYHJvd3NgIChudW1iZXIpOiBOdW1iZXIgb2Ygcm93cyBpbiB0aGUgdmlkZW8gZ3JpZC4gRGVmYXVsdCBpcyAwLlxuICogLSBgY29sdW1uc2AgKG51bWJlcik6IE51bWJlciBvZiBjb2x1bW5zIGluIHRoZSB2aWRlbyBncmlkLiBEZWZhdWx0IGlzIDAuXG4gKiAtIGBjb21wb25lbnRzVG9SZW5kZXJgIChDdXN0b21NZWRpYUNvbXBvbmVudFtdKTogQXJyYXkgb2YgY29tcG9uZW50cyB0byByZW5kZXIgaW4gdGhlIGdyaWQuXG4gKiAtIGBzaG93QXNwZWN0YCAoYm9vbGVhbik6IEZsYWcgdG8gY29udHJvbCBhc3BlY3QgcmF0aW8gZGlzcGxheS4gRGVmYXVsdCBpcyBmYWxzZS5cbiAqIC0gYGJhY2tncm91bmRDb2xvcmAgKHN0cmluZyk6IEJhY2tncm91bmQgY29sb3IgZm9yIHRoZSB2aWRlbyBncmlkLiBEZWZhdWx0IGlzICd0cmFuc3BhcmVudCcuXG4gKiAtIGBTY3JlZW5ib2FyZGAgKEN1c3RvbU1lZGlhQ29tcG9uZW50KTogT3B0aW9uYWwgc2NyZWVuYm9hcmQgY29tcG9uZW50IHRvIG92ZXJsYXkgb24gdGhlIGdyaWQuXG4gKiAtIGBhbm5vdGF0ZVNjcmVlblN0cmVhbWAgKGJvb2xlYW4pOiBGbGFnIHRvIGFubm90YXRlIHRoZSBzY3JlZW4gc3RyZWFtLiBEZWZhdWx0IGlzIGZhbHNlLlxuICogLSBgbG9jYWxTdHJlYW1TY3JlZW5gIChNZWRpYVN0cmVhbSk6IExvY2FsIHNjcmVlbiBzdHJlYW0gZm9yIHZpZGVvLlxuICpcbiAqIEBtZXRob2RzXG4gKiAtIGBuZ09uSW5pdCgpYDogSW5pdGlhbGl6ZXMgYW5kIGdlbmVyYXRlcyB0aGUgZ3JpZCBvbiBjb21wb25lbnQgbG9hZCBpZiBgc2hvd0FzcGVjdGAgaXMgdHJ1ZS5cbiAqIC0gYG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpYDogVXBkYXRlcyBncmlkIGxheW91dCBhbmQgZGltZW5zaW9ucyBpZiBwcm9wZXJ0aWVzIGNoYW5nZS5cbiAqIC0gYGdlbmVyYXRlR3JpZCgpYDogR2VuZXJhdGVzIGdyaWQgc3RydWN0dXJlIGJhc2VkIG9uIHJvd3MsIGNvbHVtbnMsIGFuZCBgY29tcG9uZW50c1RvUmVuZGVyYC5cbiAqIC0gYGNyZWF0ZUluamVjdG9yKGlucHV0czogYW55KWA6IENyZWF0ZXMgYW5kIGNhY2hlcyBhbiBpbmplY3RvciBmb3IgY29tcG9uZW50IGlucHV0cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1mbGV4aWJsZS12aWRlb1xuICogICBbY3VzdG9tV2lkdGhdPVwiMzAwXCJcbiAqICAgW2N1c3RvbUhlaWdodF09XCIyMDBcIlxuICogICBbcm93c109XCIyXCJcbiAqICAgW2NvbHVtbnNdPVwiM1wiXG4gKiAgIFtjb21wb25lbnRzVG9SZW5kZXJdPVwiW3sgY29tcG9uZW50OiBWaWRlb0NvbXBvbmVudCwgaW5wdXRzOiB7IHN0cmVhbTogdmlkZW9TdHJlYW0gfSB9XVwiXG4gKiAgIHNob3dBc3BlY3Q9XCJ0cnVlXCJcbiAqICAgW1NjcmVlbmJvYXJkXT1cInsgY29tcG9uZW50OiBTY3JlZW5PdmVybGF5Q29tcG9uZW50LCBpbnB1dHM6IHsgb3ZlcmxheURhdGE6IGRhdGEgfSB9XCJcbiAqID48L2FwcC1mbGV4aWJsZS12aWRlbz5cbiAqIGBgYFxuICoqL1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1mbGV4aWJsZS12aWRlbycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPVwicGFkZGluZzogMDsgZmxleDogMTsgbWFyZ2luOiAwOyBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IHt7XG4gICAgICAgIHNob3dBc3BlY3QgPyAnZmxleCcgOiAnbm9uZSdcbiAgICAgIH19O1xuICAgICAgICAgICAgIG1heC13aWR0aDoge3sgY3VzdG9tV2lkdGggfX1weDsgb3ZlcmZsb3cteDogaGlkZGVuOyBvdmVyZmxvdy15OiBhdXRvOyBsZWZ0OiB7e1xuICAgICAgICBjYXJkTGVmdCA+IDAgPyBjYXJkTGVmdCA6IDBcbiAgICAgIH19cHg7XCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0Zvcj1cImxldCByb3dDb21wb25lbnRzIG9mIGdyaWQ7IGxldCByb3dJbmRleCA9IGluZGV4XCJcbiAgICAgICAgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogcm93O1wiXG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29tcG9uZW50IG9mIHJvd0NvbXBvbmVudHM7IGxldCBjb2xJbmRleCA9IGluZGV4XCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICAgICAgd2lkdGg6IGNhcmRXaWR0aCArICdweCcsXG4gICAgICAgICAgICBoZWlnaHQ6IGNhcmRIZWlnaHQgKyAncHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICBtYXJnaW46ICcxcHgnLFxuICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzBweCcsXG4gICAgICAgICAgICBsZWZ0OiBjYXJkTGVmdCArICdweCdcbiAgICAgICAgICB9XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cImNvbXBvbmVudC5jb21wb25lbnQ7IGluamVjdG9yOiBjcmVhdGVJbmplY3Rvcihjb21wb25lbnQuaW5wdXRzKVwiXG4gICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICAqbmdJZj1cIlNjcmVlbmJvYXJkICYmIFNjcmVlbmJvYXJkLmNvbXBvbmVudFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICBsZWZ0OiBjYW52YXNMZWZ0ICsgJ3B4JyxcbiAgICAgICAgICB3aWR0aDogY2FyZFdpZHRoICsgJ3B4JyxcbiAgICAgICAgICBoZWlnaHQ6IGNhcmRIZWlnaHQgKyAncHgnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC4wMDUpJyxcbiAgICAgICAgICB6SW5kZXg6ICcyJ1xuICAgICAgICB9XCJcbiAgICAgID5cbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cIlNjcmVlbmJvYXJkLmNvbXBvbmVudDsgaW5qZWN0b3I6IGNyZWF0ZUluamVjdG9yKFNjcmVlbmJvYXJkLmlucHV0cylcIlxuICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRmxleGlibGVWaWRlbyBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY3VzdG9tV2lkdGggPSAwO1xuICBASW5wdXQoKSBjdXN0b21IZWlnaHQgPSAwO1xuICBASW5wdXQoKSByb3dzID0gMDtcbiAgQElucHV0KCkgY29sdW1ucyA9IDA7XG4gIEBJbnB1dCgpIGNvbXBvbmVudHNUb1JlbmRlcjogQ3VzdG9tTWVkaWFDb21wb25lbnRbXSA9IFtdO1xuICBASW5wdXQoKSBzaG93QXNwZWN0ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvcj86IHN0cmluZyA9ICd0cmFuc3BhcmVudCc7XG4gIEBJbnB1dCgpIFNjcmVlbmJvYXJkPzogQ3VzdG9tTWVkaWFDb21wb25lbnQ7XG4gIEBJbnB1dCgpIGFubm90YXRlU2NyZWVuU3RyZWFtPzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbFN0cmVhbVNjcmVlbj86IE1lZGlhU3RyZWFtO1xuXG4gIGtleSA9IDA7XG4gIGNhcmRXaWR0aCA9IDA7XG4gIGNhcmRIZWlnaHQgPSAwO1xuICBjYXJkVG9wID0gMDtcbiAgY2FyZExlZnQgPSAwO1xuICBjYW52YXNMZWZ0ID0gMDtcbiAgZ3JpZDogYW55W11bXSA9IFtdO1xuXG4gIHByaXZhdGUgaW5qZWN0b3JDYWNoZSA9IG5ldyBXZWFrTWFwPGFueSwgSW5qZWN0b3I+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2hvd0FzcGVjdCkge1xuICAgICAgdGhpcy5nZW5lcmF0ZUdyaWQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1snY29sdW1ucyddIHx8XG4gICAgICBjaGFuZ2VzWydyb3dzJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2NvbXBvbmVudHNUb1JlbmRlciddIHx8XG4gICAgICBjaGFuZ2VzWydjdXN0b21XaWR0aCddIHx8XG4gICAgICBjaGFuZ2VzWydjdXN0b21IZWlnaHQnXVxuICAgICkge1xuICAgICAgaWYgKHRoaXMuc2hvd0FzcGVjdCkge1xuICAgICAgICB0aGlzLmtleSsrO1xuICAgICAgICB0aGlzLmdlbmVyYXRlR3JpZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmFubm90YXRlU2NyZWVuU3RyZWFtICYmIHRoaXMubG9jYWxTdHJlYW1TY3JlZW4pIHtcbiAgICAgIGNvbnN0IHZpZGVvSGVpZ2h0ID0gdGhpcy5sb2NhbFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCkuaGVpZ2h0IHx8IDA7XG4gICAgICBjb25zdCB2aWRlb1dpZHRoID0gdGhpcy5sb2NhbFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCkud2lkdGggfHwgMDtcbiAgICAgIHRoaXMuY2FyZFdpZHRoID0gdmlkZW9XaWR0aDtcbiAgICAgIHRoaXMuY2FyZEhlaWdodCA9IHZpZGVvSGVpZ2h0O1xuICAgICAgdGhpcy5jYXJkVG9wID0gTWF0aC5mbG9vcigodGhpcy5jdXN0b21IZWlnaHQgLSB2aWRlb0hlaWdodCkgLyAyKTtcbiAgICAgIHRoaXMuY2FyZExlZnQgPSBNYXRoLmZsb29yKCh0aGlzLmN1c3RvbVdpZHRoIC0gdmlkZW9XaWR0aCkgLyAyKTtcbiAgICAgIHRoaXMuY2FudmFzTGVmdCA9IHRoaXMuY2FyZExlZnQgPCAwID8gdGhpcy5jYXJkTGVmdCA6IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FyZFdpZHRoID0gdGhpcy5jdXN0b21XaWR0aDtcbiAgICAgIHRoaXMuY2FyZEhlaWdodCA9IHRoaXMuY3VzdG9tSGVpZ2h0O1xuICAgICAgdGhpcy5jYXJkVG9wID0gMDtcbiAgICAgIHRoaXMuY2FyZExlZnQgPSAwO1xuICAgICAgdGhpcy5jYW52YXNMZWZ0ID0gMDtcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZUdyaWQoKSB7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5yb3dzOyByb3crKykge1xuICAgICAgY29uc3Qgcm93Q29tcG9uZW50cyA9IFtdO1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5jb2x1bW5zOyBjb2wrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHJvdyAqIHRoaXMuY29sdW1ucyArIGNvbDtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzVG9SZW5kZXJbaW5kZXhdO1xuICAgICAgICByb3dDb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ3JpZC5wdXNoKHJvd0NvbXBvbmVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUluamVjdG9yKGlucHV0czogYW55KSB7XG4gICAgaWYgKCF0aGlzLmluamVjdG9yQ2FjaGUuaGFzKGlucHV0cykpIHtcbiAgICAgIGNvbnN0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBPYmplY3Qua2V5cyhpbnB1dHMpLm1hcCgoa2V5KSA9PiAoeyBwcm92aWRlOiBrZXksIHVzZVZhbHVlOiBpbnB1dHNba2V5XSB9KSksXG4gICAgICAgIHBhcmVudDogdGhpcy5pbmplY3RvcixcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbmplY3RvckNhY2hlLnNldChpbnB1dHMsIGluamVjdG9yKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICByZXR1cm4gdGhpcy5pbmplY3RvckNhY2hlLmdldChpbnB1dHMpITtcbiAgfVxufVxuIl19