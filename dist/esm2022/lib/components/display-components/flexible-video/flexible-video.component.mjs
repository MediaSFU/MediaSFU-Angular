import { Component, Input, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Component for displaying a flexible video grid.
 *
 * @component
 * @selector app-flexible-video
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * <div>
 *   <!-- Dynamic styles and layout for video grid -->
 *   <div *ngFor="let rowComponents of grid; let rowIndex = index">
 *     <div *ngFor="let component of rowComponents; let colIndex = index">
 *       <ng-container *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"></ng-container>
 *     </div>
 *   </div>
 *   <div *ngIf="Screenboard && Screenboard.component">
 *     <ng-container *ngComponentOutlet="Screenboard.component; injector: createInjector(Screenboard.inputs)"></ng-container>
 *   </div>
 * </div>
 *
 * @class FlexibleVideo
 * @implements OnInit, OnChanges
 *
 * @property {number} customWidth - Custom width for the video grid.
 * @property {number} customHeight - Custom height for the video grid.
 * @property {number} rows - Number of rows in the video grid.
 * @property {number} columns - Number of columns in the video grid.
 * @property {Array<{ component: ComponentType<any>, inputs: any }>} componentsToRender - Components to render in the grid.
 * @property {boolean} showAspect - Flag to show or hide the aspect ratio.
 * @property {string} [backgroundColor='transparent'] - Background color for the video grid.
 * @property {{ component: ComponentType<any>, inputs: any }} [Screenboard] - Screenboard component to overlay on the grid.
 * @property {boolean} [annotateScreenStream=false] - Flag to annotate the screen stream.
 * @property {MediaStream} [localStreamScreen] - Local media stream for the screen.
 *
 * @property {number} key - Key for tracking changes.
 * @property {number} cardWidth - Width of each card in the grid.
 * @property {number} cardHeight - Height of each card in the grid.
 * @property {number} cardTop - Top position of each card in the grid.
 * @property {number} cardLeft - Left position of each card in the grid.
 * @property {number} canvasLeft - Left position of the canvas.
 * @property {any[][]} grid - Grid structure for the components.
 *
 * @constructor
 * @param {Injector} injector - Angular injector for dependency injection.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method generateGrid - Generates the grid structure based on rows and columns.
 * @method createInjector - Creates an injector for the given inputs.
 * @param {any} inputs - Inputs for the component.
 * @returns {Injector} - The created injector.
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtdmlkZW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL2ZsZXhpYmxlLXZpZGVvL2ZsZXhpYmxlLXZpZGVvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBaUIvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9ERztBQXVESCxNQUFNLE9BQU8sYUFBYTtJQXNCSjtJQXJCWCxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNULE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDWixrQkFBa0IsR0FBMkIsRUFBRSxDQUFDO0lBQ2hELFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsZUFBZSxHQUFZLGFBQWEsQ0FBQztJQUN6QyxXQUFXLENBQXdCO0lBQ25DLG9CQUFvQixHQUFhLEtBQUssQ0FBQztJQUN2QyxpQkFBaUIsQ0FBZTtJQUV6QyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1IsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNkLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDZixPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ1osUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNiLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDZixJQUFJLEdBQVksRUFBRSxDQUFDO0lBRVgsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO0lBRXJELFlBQW9CLFFB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LFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcywgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDdXN0b21NZWRpYUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIEZsZXhpYmxlVmlkZW9PcHRpb25zIHtcbiAgY3VzdG9tV2lkdGg6IG51bWJlcjtcbiAgY3VzdG9tSGVpZ2h0OiBudW1iZXI7XG4gIHJvd3M6IG51bWJlcjtcbiAgY29sdW1uczogbnVtYmVyO1xuICBjb21wb25lbnRzVG9SZW5kZXI6IEN1c3RvbU1lZGlhQ29tcG9uZW50W107XG4gIHNob3dBc3BlY3Q/OiBib29sZWFuO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIFNjcmVlbmJvYXJkPzogQ3VzdG9tTWVkaWFDb21wb25lbnQ7XG4gIGFubm90YXRlU2NyZWVuU3RyZWFtPzogYm9vbGVhbjtcbiAgbG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbDtcbn1cblxuZXhwb3J0IHR5cGUgRmxleGlibGVWaWRlb1R5cGUgPSAob3B0aW9uczogRmxleGlibGVWaWRlb09wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgZGlzcGxheWluZyBhIGZsZXhpYmxlIHZpZGVvIGdyaWQuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1mbGV4aWJsZS12aWRlb1xuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlXG4gKlxuICogQHRlbXBsYXRlXG4gKiA8ZGl2PlxuICogICA8IS0tIER5bmFtaWMgc3R5bGVzIGFuZCBsYXlvdXQgZm9yIHZpZGVvIGdyaWQgLS0+XG4gKiAgIDxkaXYgKm5nRm9yPVwibGV0IHJvd0NvbXBvbmVudHMgb2YgZ3JpZDsgbGV0IHJvd0luZGV4ID0gaW5kZXhcIj5cbiAqICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjb21wb25lbnQgb2Ygcm93Q29tcG9uZW50czsgbGV0IGNvbEluZGV4ID0gaW5kZXhcIj5cbiAqICAgICAgIDxuZy1jb250YWluZXIgKm5nQ29tcG9uZW50T3V0bGV0PVwiY29tcG9uZW50LmNvbXBvbmVudDsgaW5qZWN0b3I6IGNyZWF0ZUluamVjdG9yKGNvbXBvbmVudC5pbnB1dHMpXCI+PC9uZy1jb250YWluZXI+XG4gKiAgICAgPC9kaXY+XG4gKiAgIDwvZGl2PlxuICogICA8ZGl2ICpuZ0lmPVwiU2NyZWVuYm9hcmQgJiYgU2NyZWVuYm9hcmQuY29tcG9uZW50XCI+XG4gKiAgICAgPG5nLWNvbnRhaW5lciAqbmdDb21wb25lbnRPdXRsZXQ9XCJTY3JlZW5ib2FyZC5jb21wb25lbnQ7IGluamVjdG9yOiBjcmVhdGVJbmplY3RvcihTY3JlZW5ib2FyZC5pbnB1dHMpXCI+PC9uZy1jb250YWluZXI+XG4gKiAgIDwvZGl2PlxuICogPC9kaXY+XG4gKlxuICogQGNsYXNzIEZsZXhpYmxlVmlkZW9cbiAqIEBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzXG4gKlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGN1c3RvbVdpZHRoIC0gQ3VzdG9tIHdpZHRoIGZvciB0aGUgdmlkZW8gZ3JpZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjdXN0b21IZWlnaHQgLSBDdXN0b20gaGVpZ2h0IGZvciB0aGUgdmlkZW8gZ3JpZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByb3dzIC0gTnVtYmVyIG9mIHJvd3MgaW4gdGhlIHZpZGVvIGdyaWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY29sdW1ucyAtIE51bWJlciBvZiBjb2x1bW5zIGluIHRoZSB2aWRlbyBncmlkLlxuICogQHByb3BlcnR5IHtBcnJheTx7IGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+LCBpbnB1dHM6IGFueSB9Pn0gY29tcG9uZW50c1RvUmVuZGVyIC0gQ29tcG9uZW50cyB0byByZW5kZXIgaW4gdGhlIGdyaWQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3dBc3BlY3QgLSBGbGFnIHRvIHNob3cgb3IgaGlkZSB0aGUgYXNwZWN0IHJhdGlvLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtiYWNrZ3JvdW5kQ29sb3I9J3RyYW5zcGFyZW50J10gLSBCYWNrZ3JvdW5kIGNvbG9yIGZvciB0aGUgdmlkZW8gZ3JpZC5cbiAqIEBwcm9wZXJ0eSB7eyBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PiwgaW5wdXRzOiBhbnkgfX0gW1NjcmVlbmJvYXJkXSAtIFNjcmVlbmJvYXJkIGNvbXBvbmVudCB0byBvdmVybGF5IG9uIHRoZSBncmlkLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbYW5ub3RhdGVTY3JlZW5TdHJlYW09ZmFsc2VdIC0gRmxhZyB0byBhbm5vdGF0ZSB0aGUgc2NyZWVuIHN0cmVhbS5cbiAqIEBwcm9wZXJ0eSB7TWVkaWFTdHJlYW19IFtsb2NhbFN0cmVhbVNjcmVlbl0gLSBMb2NhbCBtZWRpYSBzdHJlYW0gZm9yIHRoZSBzY3JlZW4uXG4gKlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGtleSAtIEtleSBmb3IgdHJhY2tpbmcgY2hhbmdlcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjYXJkV2lkdGggLSBXaWR0aCBvZiBlYWNoIGNhcmQgaW4gdGhlIGdyaWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY2FyZEhlaWdodCAtIEhlaWdodCBvZiBlYWNoIGNhcmQgaW4gdGhlIGdyaWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY2FyZFRvcCAtIFRvcCBwb3NpdGlvbiBvZiBlYWNoIGNhcmQgaW4gdGhlIGdyaWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY2FyZExlZnQgLSBMZWZ0IHBvc2l0aW9uIG9mIGVhY2ggY2FyZCBpbiB0aGUgZ3JpZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjYW52YXNMZWZ0IC0gTGVmdCBwb3NpdGlvbiBvZiB0aGUgY2FudmFzLlxuICogQHByb3BlcnR5IHthbnlbXVtdfSBncmlkIC0gR3JpZCBzdHJ1Y3R1cmUgZm9yIHRoZSBjb21wb25lbnRzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtJbmplY3Rvcn0gaW5qZWN0b3IgLSBBbmd1bGFyIGluamVjdG9yIGZvciBkZXBlbmRlbmN5IGluamVjdGlvbi5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGFyZSBpbml0aWFsaXplZC5cbiAqIEBtZXRob2QgbmdPbkNoYW5nZXMgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IGNoYW5nZXMuXG4gKiBAbWV0aG9kIGdlbmVyYXRlR3JpZCAtIEdlbmVyYXRlcyB0aGUgZ3JpZCBzdHJ1Y3R1cmUgYmFzZWQgb24gcm93cyBhbmQgY29sdW1ucy5cbiAqIEBtZXRob2QgY3JlYXRlSW5qZWN0b3IgLSBDcmVhdGVzIGFuIGluamVjdG9yIGZvciB0aGUgZ2l2ZW4gaW5wdXRzLlxuICogQHBhcmFtIHthbnl9IGlucHV0cyAtIElucHV0cyBmb3IgdGhlIGNvbXBvbmVudC5cbiAqIEByZXR1cm5zIHtJbmplY3Rvcn0gLSBUaGUgY3JlYXRlZCBpbmplY3Rvci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWZsZXhpYmxlLXZpZGVvJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgc3R5bGU9XCJwYWRkaW5nOiAwOyBmbGV4OiAxOyBtYXJnaW46IDA7IHBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheToge3tcbiAgICAgICAgc2hvd0FzcGVjdCA/ICdmbGV4JyA6ICdub25lJ1xuICAgICAgfX07XG4gICAgICAgICAgICAgbWF4LXdpZHRoOiB7eyBjdXN0b21XaWR0aCB9fXB4OyBvdmVyZmxvdy14OiBoaWRkZW47IG92ZXJmbG93LXk6IGF1dG87IGxlZnQ6IHt7XG4gICAgICAgIGNhcmRMZWZ0ID4gMCA/IGNhcmRMZWZ0IDogMFxuICAgICAgfX1weDtcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nRm9yPVwibGV0IHJvd0NvbXBvbmVudHMgb2YgZ3JpZDsgbGV0IHJvd0luZGV4ID0gaW5kZXhcIlxuICAgICAgICBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiByb3c7XCJcbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBjb21wb25lbnQgb2Ygcm93Q29tcG9uZW50czsgbGV0IGNvbEluZGV4ID0gaW5kZXhcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICB3aWR0aDogY2FyZFdpZHRoICsgJ3B4JyxcbiAgICAgICAgICAgIGhlaWdodDogY2FyZEhlaWdodCArICdweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcixcbiAgICAgICAgICAgIG1hcmdpbjogJzFweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMHB4JyxcbiAgICAgICAgICAgIGxlZnQ6IGNhcmRMZWZ0ICsgJ3B4J1xuICAgICAgICAgIH1cIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiY29tcG9uZW50LmNvbXBvbmVudDsgaW5qZWN0b3I6IGNyZWF0ZUluamVjdG9yKGNvbXBvbmVudC5pbnB1dHMpXCJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0lmPVwiU2NyZWVuYm9hcmQgJiYgU2NyZWVuYm9hcmQuY29tcG9uZW50XCJcbiAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgIGxlZnQ6IGNhbnZhc0xlZnQgKyAncHgnLFxuICAgICAgICAgIHdpZHRoOiBjYXJkV2lkdGggKyAncHgnLFxuICAgICAgICAgIGhlaWdodDogY2FyZEhlaWdodCArICdweCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjAwNSknLFxuICAgICAgICAgIHpJbmRleDogJzInXG4gICAgICAgIH1cIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiU2NyZWVuYm9hcmQuY29tcG9uZW50OyBpbmplY3RvcjogY3JlYXRlSW5qZWN0b3IoU2NyZWVuYm9hcmQuaW5wdXRzKVwiXG4gICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVZpZGVvIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjdXN0b21XaWR0aCA9IDA7XG4gIEBJbnB1dCgpIGN1c3RvbUhlaWdodCA9IDA7XG4gIEBJbnB1dCgpIHJvd3MgPSAwO1xuICBASW5wdXQoKSBjb2x1bW5zID0gMDtcbiAgQElucHV0KCkgY29tcG9uZW50c1RvUmVuZGVyOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdID0gW107XG4gIEBJbnB1dCgpIHNob3dBc3BlY3QgPSBmYWxzZTtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nID0gJ3RyYW5zcGFyZW50JztcbiAgQElucHV0KCkgU2NyZWVuYm9hcmQ/OiBDdXN0b21NZWRpYUNvbXBvbmVudDtcbiAgQElucHV0KCkgYW5ub3RhdGVTY3JlZW5TdHJlYW0/OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxvY2FsU3RyZWFtU2NyZWVuPzogTWVkaWFTdHJlYW07XG5cbiAga2V5ID0gMDtcbiAgY2FyZFdpZHRoID0gMDtcbiAgY2FyZEhlaWdodCA9IDA7XG4gIGNhcmRUb3AgPSAwO1xuICBjYXJkTGVmdCA9IDA7XG4gIGNhbnZhc0xlZnQgPSAwO1xuICBncmlkOiBhbnlbXVtdID0gW107XG5cbiAgcHJpdmF0ZSBpbmplY3RvckNhY2hlID0gbmV3IFdlYWtNYXA8YW55LCBJbmplY3Rvcj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zaG93QXNwZWN0KSB7XG4gICAgICB0aGlzLmdlbmVyYXRlR3JpZCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydjb2x1bW5zJ10gfHxcbiAgICAgIGNoYW5nZXNbJ3Jvd3MnXSB8fFxuICAgICAgY2hhbmdlc1snY29tcG9uZW50c1RvUmVuZGVyJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2N1c3RvbVdpZHRoJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2N1c3RvbUhlaWdodCddXG4gICAgKSB7XG4gICAgICBpZiAodGhpcy5zaG93QXNwZWN0KSB7XG4gICAgICAgIHRoaXMua2V5Kys7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVHcmlkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYW5ub3RhdGVTY3JlZW5TdHJlYW0gJiYgdGhpcy5sb2NhbFN0cmVhbVNjcmVlbikge1xuICAgICAgY29uc3QgdmlkZW9IZWlnaHQgPSB0aGlzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS5oZWlnaHQgfHwgMDtcbiAgICAgIGNvbnN0IHZpZGVvV2lkdGggPSB0aGlzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS53aWR0aCB8fCAwO1xuICAgICAgdGhpcy5jYXJkV2lkdGggPSB2aWRlb1dpZHRoO1xuICAgICAgdGhpcy5jYXJkSGVpZ2h0ID0gdmlkZW9IZWlnaHQ7XG4gICAgICB0aGlzLmNhcmRUb3AgPSBNYXRoLmZsb29yKCh0aGlzLmN1c3RvbUhlaWdodCAtIHZpZGVvSGVpZ2h0KSAvIDIpO1xuICAgICAgdGhpcy5jYXJkTGVmdCA9IE1hdGguZmxvb3IoKHRoaXMuY3VzdG9tV2lkdGggLSB2aWRlb1dpZHRoKSAvIDIpO1xuICAgICAgdGhpcy5jYW52YXNMZWZ0ID0gdGhpcy5jYXJkTGVmdCA8IDAgPyB0aGlzLmNhcmRMZWZ0IDogMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYXJkV2lkdGggPSB0aGlzLmN1c3RvbVdpZHRoO1xuICAgICAgdGhpcy5jYXJkSGVpZ2h0ID0gdGhpcy5jdXN0b21IZWlnaHQ7XG4gICAgICB0aGlzLmNhcmRUb3AgPSAwO1xuICAgICAgdGhpcy5jYXJkTGVmdCA9IDA7XG4gICAgICB0aGlzLmNhbnZhc0xlZnQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlR3JpZCgpIHtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnJvd3M7IHJvdysrKSB7XG4gICAgICBjb25zdCByb3dDb21wb25lbnRzID0gW107XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmNvbHVtbnM7IGNvbCsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcm93ICogdGhpcy5jb2x1bW5zICsgY29sO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHNUb1JlbmRlcltpbmRleF07XG4gICAgICAgIHJvd0NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5ncmlkLnB1c2gocm93Q29tcG9uZW50cyk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuaW5qZWN0b3JDYWNoZS5oYXMoaW5wdXRzKSkge1xuICAgICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IE9iamVjdC5rZXlzKGlucHV0cykubWFwKChrZXkpID0+ICh7IHByb3ZpZGU6IGtleSwgdXNlVmFsdWU6IGlucHV0c1trZXldIH0pKSxcbiAgICAgICAgcGFyZW50OiB0aGlzLmluamVjdG9yLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmluamVjdG9yQ2FjaGUuc2V0KGlucHV0cywgaW5qZWN0b3IpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIHJldHVybiB0aGlzLmluamVjdG9yQ2FjaGUuZ2V0KGlucHV0cykhO1xuICB9XG59XG4iXX0=