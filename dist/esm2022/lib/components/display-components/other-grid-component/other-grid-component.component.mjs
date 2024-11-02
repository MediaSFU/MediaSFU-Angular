import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingProgressTimer } from '../meeting-progress-timer/meeting-progress-timer.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * OtherGridComponent represents a customizable grid container with optional meeting progress timer.
 *
 * @selector app-other-grid-component
 * @standalone true
 * @imports CommonModule, MeetingProgressTimer
 *
 * @template
 * - The template consists of:
 *   - A grid container styled with specified dimensions, background color, and border.
 *   - An optional `MeetingProgressTimer` component displayed within the grid if `showTimer` is true.
 *
 * @styles
 * - Default border, padding, and display styles for the grid container.
 *
 * @inputs
 * - `backgroundColor` (string): Background color of the grid container. Default is `'transparent'`.
 * - `width` (number): Width of the grid in pixels. Default is `0`.
 * - `height` (number): Height of the grid in pixels. Default is `0`.
 * - `showAspect` (boolean): Controls visibility of the grid container. Default is `true`.
 * - `timeBackgroundColor` (string): Background color of the timer. Default is `'green'`.
 * - `showTimer` (boolean): Determines if the timer should be displayed. Default is `false`.
 * - `meetingProgressTime` (string): Time to display in the timer. Default is `'00:00:00'`.
 *
 * @class OtherGridComponent
 * @example
 * ```html
 * <app-other-grid-component
 *   [backgroundColor]="'lightgray'"
 *   [width]="300"
 *   [height]="200"
 *   [showAspect]="true"
 *   [timeBackgroundColor]="'blue'"
 *   [showTimer]="true"
 *   [meetingProgressTime]="'00:05:32'"
 * ></app-other-grid-component>
 * ```
 */
export class OtherGridComponent {
    backgroundColor = 'transparent';
    width = 0;
    height = 0;
    showAspect = true;
    timeBackgroundColor = 'green';
    showTimer = false;
    meetingProgressTime = '00:00:00';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: OtherGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: OtherGridComponent, isStandalone: true, selector: "app-other-grid-component", inputs: { backgroundColor: "backgroundColor", width: "width", height: "height", showAspect: "showAspect", timeBackgroundColor: "timeBackgroundColor", showTimer: "showTimer", meetingProgressTime: "meetingProgressTime" }, ngImport: i0, template: `
    <div
      [ngStyle]="{
        'background-color': backgroundColor,
        width: width + 'px',
        height: height + 'px',
        display: showAspect ? 'block' : 'none',
        overflow: 'hidden',
        'border-style': 'solid',
        'border-color': 'black',
        'border-width': '2px',
        'border-radius': '0',
        margin: '0',
        padding: '0'
      }"
    >
      <app-meeting-progress-timer
        *ngIf="showTimer"
        [meetingProgressTime]="meetingProgressTime"
        [initialBackgroundColor]="timeBackgroundColor"
        [showTimer]="showTimer"
      ></app-meeting-progress-timer>
      <ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: MeetingProgressTimer, selector: "app-meeting-progress-timer", inputs: ["meetingProgressTime", "initialBackgroundColor", "position", "textStyle", "showTimer"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: OtherGridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-other-grid-component',
                    standalone: true,
                    imports: [CommonModule, MeetingProgressTimer],
                    template: `
    <div
      [ngStyle]="{
        'background-color': backgroundColor,
        width: width + 'px',
        height: height + 'px',
        display: showAspect ? 'block' : 'none',
        overflow: 'hidden',
        'border-style': 'solid',
        'border-color': 'black',
        'border-width': '2px',
        'border-radius': '0',
        margin: '0',
        padding: '0'
      }"
    >
      <app-meeting-progress-timer
        *ngIf="showTimer"
        [meetingProgressTime]="meetingProgressTime"
        [initialBackgroundColor]="timeBackgroundColor"
        [showTimer]="showTimer"
      ></app-meeting-progress-timer>
      <ng-content></ng-content>
    </div>
  `,
                }]
        }], propDecorators: { backgroundColor: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], showAspect: [{
                type: Input
            }], timeBackgroundColor: [{
                type: Input
            }], showTimer: [{
                type: Input
            }], meetingProgressTime: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXItZ3JpZC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL290aGVyLWdyaWQtY29tcG9uZW50L290aGVyLWdyaWQtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNERBQTRELENBQUM7OztBQWNsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQWdDSCxNQUFNLE9BQU8sa0JBQWtCO0lBQ3BCLGVBQWUsR0FBRyxhQUFhLENBQUM7SUFDaEMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNWLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDWCxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLG1CQUFtQixHQUFHLE9BQU8sQ0FBQztJQUM5QixTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLG1CQUFtQixHQUFHLFVBQVUsQ0FBQzt1R0FQL0Isa0JBQWtCOzJGQUFsQixrQkFBa0IsZ1RBMUJuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JULDJEQXpCUyxZQUFZLHdOQUFFLG9CQUFvQjs7MkZBMkJqQyxrQkFBa0I7a0JBOUI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7b0JBQzdDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JUO2lCQUNGOzhCQUVVLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNZWV0aW5nUHJvZ3Jlc3NUaW1lciB9IGZyb20gJy4uL21lZXRpbmctcHJvZ3Jlc3MtdGltZXIvbWVldGluZy1wcm9ncmVzcy10aW1lci5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE90aGVyR3JpZENvbXBvbmVudE9wdGlvbnMge1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIHdpZHRoPzogbnVtYmVyO1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIHNob3dBc3BlY3Q/OiBib29sZWFuO1xuICB0aW1lQmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBzaG93VGltZXI/OiBib29sZWFuO1xuICBtZWV0aW5nUHJvZ3Jlc3NUaW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBPdGhlckdyaWRDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE90aGVyR3JpZENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIE90aGVyR3JpZENvbXBvbmVudCByZXByZXNlbnRzIGEgY3VzdG9taXphYmxlIGdyaWQgY29udGFpbmVyIHdpdGggb3B0aW9uYWwgbWVldGluZyBwcm9ncmVzcyB0aW1lci5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLW90aGVyLWdyaWQtY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIE1lZXRpbmdQcm9ncmVzc1RpbWVyXG4gKlxuICogQHRlbXBsYXRlXG4gKiAtIFRoZSB0ZW1wbGF0ZSBjb25zaXN0cyBvZjpcbiAqICAgLSBBIGdyaWQgY29udGFpbmVyIHN0eWxlZCB3aXRoIHNwZWNpZmllZCBkaW1lbnNpb25zLCBiYWNrZ3JvdW5kIGNvbG9yLCBhbmQgYm9yZGVyLlxuICogICAtIEFuIG9wdGlvbmFsIGBNZWV0aW5nUHJvZ3Jlc3NUaW1lcmAgY29tcG9uZW50IGRpc3BsYXllZCB3aXRoaW4gdGhlIGdyaWQgaWYgYHNob3dUaW1lcmAgaXMgdHJ1ZS5cbiAqXG4gKiBAc3R5bGVzXG4gKiAtIERlZmF1bHQgYm9yZGVyLCBwYWRkaW5nLCBhbmQgZGlzcGxheSBzdHlsZXMgZm9yIHRoZSBncmlkIGNvbnRhaW5lci5cbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGBiYWNrZ3JvdW5kQ29sb3JgIChzdHJpbmcpOiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBncmlkIGNvbnRhaW5lci4gRGVmYXVsdCBpcyBgJ3RyYW5zcGFyZW50J2AuXG4gKiAtIGB3aWR0aGAgKG51bWJlcik6IFdpZHRoIG9mIHRoZSBncmlkIGluIHBpeGVscy4gRGVmYXVsdCBpcyBgMGAuXG4gKiAtIGBoZWlnaHRgIChudW1iZXIpOiBIZWlnaHQgb2YgdGhlIGdyaWQgaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIGAwYC5cbiAqIC0gYHNob3dBc3BlY3RgIChib29sZWFuKTogQ29udHJvbHMgdmlzaWJpbGl0eSBvZiB0aGUgZ3JpZCBjb250YWluZXIuIERlZmF1bHQgaXMgYHRydWVgLlxuICogLSBgdGltZUJhY2tncm91bmRDb2xvcmAgKHN0cmluZyk6IEJhY2tncm91bmQgY29sb3Igb2YgdGhlIHRpbWVyLiBEZWZhdWx0IGlzIGAnZ3JlZW4nYC5cbiAqIC0gYHNob3dUaW1lcmAgKGJvb2xlYW4pOiBEZXRlcm1pbmVzIGlmIHRoZSB0aW1lciBzaG91bGQgYmUgZGlzcGxheWVkLiBEZWZhdWx0IGlzIGBmYWxzZWAuXG4gKiAtIGBtZWV0aW5nUHJvZ3Jlc3NUaW1lYCAoc3RyaW5nKTogVGltZSB0byBkaXNwbGF5IGluIHRoZSB0aW1lci4gRGVmYXVsdCBpcyBgJzAwOjAwOjAwJ2AuXG4gKlxuICogQGNsYXNzIE90aGVyR3JpZENvbXBvbmVudFxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtb3RoZXItZ3JpZC1jb21wb25lbnRcbiAqICAgW2JhY2tncm91bmRDb2xvcl09XCInbGlnaHRncmF5J1wiXG4gKiAgIFt3aWR0aF09XCIzMDBcIlxuICogICBbaGVpZ2h0XT1cIjIwMFwiXG4gKiAgIFtzaG93QXNwZWN0XT1cInRydWVcIlxuICogICBbdGltZUJhY2tncm91bmRDb2xvcl09XCInYmx1ZSdcIlxuICogICBbc2hvd1RpbWVyXT1cInRydWVcIlxuICogICBbbWVldGluZ1Byb2dyZXNzVGltZV09XCInMDA6MDU6MzInXCJcbiAqID48L2FwcC1vdGhlci1ncmlkLWNvbXBvbmVudD5cbiAqIGBgYFxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1vdGhlci1ncmlkLWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1lZXRpbmdQcm9ncmVzc1RpbWVyXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFja2dyb3VuZENvbG9yLFxuICAgICAgICB3aWR0aDogd2lkdGggKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCArICdweCcsXG4gICAgICAgIGRpc3BsYXk6IHNob3dBc3BlY3QgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICdib3JkZXItc3R5bGUnOiAnc29saWQnLFxuICAgICAgICAnYm9yZGVyLWNvbG9yJzogJ2JsYWNrJyxcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6ICcycHgnLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICcwJyxcbiAgICAgICAgbWFyZ2luOiAnMCcsXG4gICAgICAgIHBhZGRpbmc6ICcwJ1xuICAgICAgfVwiXG4gICAgPlxuICAgICAgPGFwcC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyXG4gICAgICAgICpuZ0lmPVwic2hvd1RpbWVyXCJcbiAgICAgICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZVwiXG4gICAgICAgIFtpbml0aWFsQmFja2dyb3VuZENvbG9yXT1cInRpbWVCYWNrZ3JvdW5kQ29sb3JcIlxuICAgICAgICBbc2hvd1RpbWVyXT1cInNob3dUaW1lclwiXG4gICAgICA+PC9hcHAtbWVldGluZy1wcm9ncmVzcy10aW1lcj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgT3RoZXJHcmlkQ29tcG9uZW50IHtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgQElucHV0KCkgd2lkdGggPSAwO1xuICBASW5wdXQoKSBoZWlnaHQgPSAwO1xuICBASW5wdXQoKSBzaG93QXNwZWN0ID0gdHJ1ZTtcbiAgQElucHV0KCkgdGltZUJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gIEBJbnB1dCgpIHNob3dUaW1lciA9IGZhbHNlO1xuICBASW5wdXQoKSBtZWV0aW5nUHJvZ3Jlc3NUaW1lID0gJzAwOjAwOjAwJztcbn1cbiJdfQ==