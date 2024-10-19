import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingProgressTimer } from '../meeting-progress-timer/meeting-progress-timer.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Component representing a customizable grid with an optional timer.
 *
 * @selector app-other-grid-component
 * @standalone true
 * @imports CommonModule, MeetingProgressTimer
 *
 * @template
 * <div [ngStyle]="{...}">
 *   <app-meeting-progress-timer *ngIf="showTimer" [meetingProgressTime]="meetingProgressTime" [initialBackgroundColor]="timeBackgroundColor" [showTimer]="showTimer"></app-meeting-progress-timer>
 *   <ng-content></ng-content>
 * </div>
 *
 * @class OtherGridComponent
 *
 * @property {string} backgroundColor - The background color of the grid. Default is 'transparent'.
 * @property {number} width - The width of the grid in pixels. Default is 0.
 * @property {number} height - The height of the grid in pixels. Default is 0.
 * @property {boolean} showAspect - Flag to show or hide the grid. Default is true.
 * @property {string} timeBackgroundColor - The background color of the timer. Default is 'green'.
 * @property {boolean} showTimer - Flag to show or hide the timer. Default is false.
 * @property {string} meetingProgressTime - The meeting progress time to be displayed in the timer. Default is '00:00:00'.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXItZ3JpZC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL290aGVyLWdyaWQtY29tcG9uZW50L290aGVyLWdyaWQtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNERBQTRELENBQUM7OztBQWNsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQStCSCxNQUFNLE9BQU8sa0JBQWtCO0lBQ3BCLGVBQWUsR0FBRyxhQUFhLENBQUM7SUFDaEMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNWLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDWCxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLG1CQUFtQixHQUFHLE9BQU8sQ0FBQztJQUM5QixTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLG1CQUFtQixHQUFHLFVBQVUsQ0FBQzt1R0FQL0Isa0JBQWtCOzJGQUFsQixrQkFBa0IsZ1RBMUJuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JULDJEQXpCUyxZQUFZLHdOQUFFLG9CQUFvQjs7MkZBMkJqQyxrQkFBa0I7a0JBOUI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7b0JBQzdDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JUO2lCQUNGOzhCQUVVLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNZWV0aW5nUHJvZ3Jlc3NUaW1lciB9IGZyb20gJy4uL21lZXRpbmctcHJvZ3Jlc3MtdGltZXIvbWVldGluZy1wcm9ncmVzcy10aW1lci5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE90aGVyR3JpZENvbXBvbmVudE9wdGlvbnMge1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIHdpZHRoPzogbnVtYmVyO1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIHNob3dBc3BlY3Q/OiBib29sZWFuO1xuICB0aW1lQmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBzaG93VGltZXI/OiBib29sZWFuO1xuICBtZWV0aW5nUHJvZ3Jlc3NUaW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBPdGhlckdyaWRDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE90aGVyR3JpZENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCByZXByZXNlbnRpbmcgYSBjdXN0b21pemFibGUgZ3JpZCB3aXRoIGFuIG9wdGlvbmFsIHRpbWVyLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtb3RoZXItZ3JpZC1jb21wb25lbnRcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZSwgTWVldGluZ1Byb2dyZXNzVGltZXJcbiAqXG4gKiBAdGVtcGxhdGVcbiAqIDxkaXYgW25nU3R5bGVdPVwiey4uLn1cIj5cbiAqICAgPGFwcC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyICpuZ0lmPVwic2hvd1RpbWVyXCIgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZVwiIFtpbml0aWFsQmFja2dyb3VuZENvbG9yXT1cInRpbWVCYWNrZ3JvdW5kQ29sb3JcIiBbc2hvd1RpbWVyXT1cInNob3dUaW1lclwiPjwvYXBwLW1lZXRpbmctcHJvZ3Jlc3MtdGltZXI+XG4gKiAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAqIDwvZGl2PlxuICpcbiAqIEBjbGFzcyBPdGhlckdyaWRDb21wb25lbnRcbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gVGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGdyaWQuIERlZmF1bHQgaXMgJ3RyYW5zcGFyZW50Jy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aCBvZiB0aGUgZ3JpZCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0IG9mIHRoZSBncmlkIGluIHBpeGVscy4gRGVmYXVsdCBpcyAwLlxuICogQHByb3BlcnR5IHtib29sZWFufSBzaG93QXNwZWN0IC0gRmxhZyB0byBzaG93IG9yIGhpZGUgdGhlIGdyaWQuIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aW1lQmFja2dyb3VuZENvbG9yIC0gVGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIHRpbWVyLiBEZWZhdWx0IGlzICdncmVlbicuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3dUaW1lciAtIEZsYWcgdG8gc2hvdyBvciBoaWRlIHRoZSB0aW1lci4gRGVmYXVsdCBpcyBmYWxzZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZWV0aW5nUHJvZ3Jlc3NUaW1lIC0gVGhlIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRpbWVyLiBEZWZhdWx0IGlzICcwMDowMDowMCcuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1vdGhlci1ncmlkLWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1lZXRpbmdQcm9ncmVzc1RpbWVyXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFja2dyb3VuZENvbG9yLFxuICAgICAgICB3aWR0aDogd2lkdGggKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCArICdweCcsXG4gICAgICAgIGRpc3BsYXk6IHNob3dBc3BlY3QgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICdib3JkZXItc3R5bGUnOiAnc29saWQnLFxuICAgICAgICAnYm9yZGVyLWNvbG9yJzogJ2JsYWNrJyxcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6ICcycHgnLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICcwJyxcbiAgICAgICAgbWFyZ2luOiAnMCcsXG4gICAgICAgIHBhZGRpbmc6ICcwJ1xuICAgICAgfVwiXG4gICAgPlxuICAgICAgPGFwcC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyXG4gICAgICAgICpuZ0lmPVwic2hvd1RpbWVyXCJcbiAgICAgICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZVwiXG4gICAgICAgIFtpbml0aWFsQmFja2dyb3VuZENvbG9yXT1cInRpbWVCYWNrZ3JvdW5kQ29sb3JcIlxuICAgICAgICBbc2hvd1RpbWVyXT1cInNob3dUaW1lclwiXG4gICAgICA+PC9hcHAtbWVldGluZy1wcm9ncmVzcy10aW1lcj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgT3RoZXJHcmlkQ29tcG9uZW50IHtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgQElucHV0KCkgd2lkdGggPSAwO1xuICBASW5wdXQoKSBoZWlnaHQgPSAwO1xuICBASW5wdXQoKSBzaG93QXNwZWN0ID0gdHJ1ZTtcbiAgQElucHV0KCkgdGltZUJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gIEBJbnB1dCgpIHNob3dUaW1lciA9IGZhbHNlO1xuICBASW5wdXQoKSBtZWV0aW5nUHJvZ3Jlc3NUaW1lID0gJzAwOjAwOjAwJztcbn1cbiJdfQ==