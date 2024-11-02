import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingProgressTimer } from '../meeting-progress-timer/meeting-progress-timer.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MainGridComponent displays a customizable grid container with an optional meeting progress timer.
 *
 * @selector app-main-grid-component
 * @standalone true
 * @imports CommonModule, MeetingProgressTimer
 *
 * @template
 * ```html
 * <div [ngStyle]="maingridContainerStyle">
 *   <app-meeting-progress-timer
 *     *ngIf="showTimer"
 *     [meetingProgressTime]="meetingProgressTime"
 *     [initialBackgroundColor]="timeBackgroundColor"
 *   ></app-meeting-progress-timer>
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @inputs
 * - `backgroundColor` (string): Background color of the grid container. Default is an empty string.
 * - `mainSize` (number): Main size of the grid container, used for layout adjustments.
 * - `height` (number): Height of the grid container in pixels.
 * - `width` (number): Width of the grid container in pixels.
 * - `showAspect` (boolean): If true, displays the grid container in flex layout. Default is true.
 * - `timeBackgroundColor` (string): Background color of the meeting progress timer. Default is 'green'.
 * - `showTimer` (boolean): If true, displays the meeting progress timer. Default is true.
 * - `meetingProgressTime` (string): Time displayed in the meeting progress timer.
 *
 * @getter
 * - `maingridContainerStyle`: Returns a style object for the grid container, including display, color, dimensions, and border styling.
 *
 * @example
 * ```html
 * <app-main-grid-component
 *   [backgroundColor]="'lightgrey'"
 *   [height]="500"
 *   [width]="500"
 *   [showAspect]="true"
 *   [timeBackgroundColor]="'blue'"
 *   [showTimer]="true"
 *   [meetingProgressTime]="'10:45'"
 * ></app-main-grid-component>
 * ```
 **/
export class MainGridComponent {
    backgroundColor = '';
    mainSize = 0;
    height = 0;
    width = 0;
    showAspect = true;
    timeBackgroundColor = 'green';
    showTimer = true;
    meetingProgressTime = '0';
    get maingridContainerStyle() {
        return {
            display: this.showAspect ? 'flex' : 'none',
            backgroundColor: this.backgroundColor,
            height: `${this.height}px`,
            width: `${this.width}px`,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderStyle: 'solid',
            borderColor: '#000',
            borderWidth: '4px',
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MainGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MainGridComponent, isStandalone: true, selector: "app-main-grid-component", inputs: { backgroundColor: "backgroundColor", mainSize: "mainSize", height: "height", width: "width", showAspect: "showAspect", timeBackgroundColor: "timeBackgroundColor", showTimer: "showTimer", meetingProgressTime: "meetingProgressTime" }, ngImport: i0, template: `
    <div [ngStyle]="maingridContainerStyle">
      <app-meeting-progress-timer
        *ngIf="showTimer"
        [meetingProgressTime]="meetingProgressTime"
        [initialBackgroundColor]="timeBackgroundColor"
      ></app-meeting-progress-timer>
      <ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: MeetingProgressTimer, selector: "app-meeting-progress-timer", inputs: ["meetingProgressTime", "initialBackgroundColor", "position", "textStyle", "showTimer"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MainGridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-main-grid-component',
                    standalone: true,
                    imports: [CommonModule, MeetingProgressTimer],
                    template: `
    <div [ngStyle]="maingridContainerStyle">
      <app-meeting-progress-timer
        *ngIf="showTimer"
        [meetingProgressTime]="meetingProgressTime"
        [initialBackgroundColor]="timeBackgroundColor"
      ></app-meeting-progress-timer>
      <ng-content></ng-content>
    </div>
  `,
                }]
        }], propDecorators: { backgroundColor: [{
                type: Input
            }], mainSize: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1ncmlkLWNvbXBvbmVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWFpbi1ncmlkLWNvbXBvbmVudC9tYWluLWdyaWQtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNERBQTRELENBQUM7OztBQWVsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0Q0k7QUFpQkosTUFBTSxPQUFPLGlCQUFpQjtJQUNuQixlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDYixNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNWLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDbEIsbUJBQW1CLEdBQUcsT0FBTyxDQUFDO0lBQzlCLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDakIsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO0lBRW5DLElBQUksc0JBQXNCO1FBQ3hCLE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQzFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJO1lBQzFCLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUk7WUFDeEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsY0FBYyxFQUFFLFFBQVE7WUFDeEIsVUFBVSxFQUFFLFFBQVE7WUFDcEIsV0FBVyxFQUFFLE9BQU87WUFDcEIsV0FBVyxFQUFFLE1BQU07WUFDbkIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztJQUNKLENBQUM7dUdBdkJVLGlCQUFpQjsyRkFBakIsaUJBQWlCLHFVQVhsQjs7Ozs7Ozs7O0dBU1QsMkRBVlMsWUFBWSx3TkFBRSxvQkFBb0I7OzJGQVlqQyxpQkFBaUI7a0JBZjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztvQkFDN0MsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtpQkFDRjs4QkFFVSxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNZWV0aW5nUHJvZ3Jlc3NUaW1lciB9IGZyb20gJy4uL21lZXRpbmctcHJvZ3Jlc3MtdGltZXIvbWVldGluZy1wcm9ncmVzcy10aW1lci5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1haW5HcmlkQ29tcG9uZW50T3B0aW9ucyB7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgbWFpblNpemU/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIHNob3dBc3BlY3Q/OiBib29sZWFuO1xuICB0aW1lQmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBzaG93VGltZXI/OiBib29sZWFuO1xuICBtZWV0aW5nUHJvZ3Jlc3NUaW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNYWluR3JpZENvbXBvbmVudFR5cGUgPSAob3B0aW9uczogTWFpbkdyaWRDb21wb25lbnRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBNYWluR3JpZENvbXBvbmVudCBkaXNwbGF5cyBhIGN1c3RvbWl6YWJsZSBncmlkIGNvbnRhaW5lciB3aXRoIGFuIG9wdGlvbmFsIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZXIuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1tYWluLWdyaWQtY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIE1lZXRpbmdQcm9ncmVzc1RpbWVyXG4gKlxuICogQHRlbXBsYXRlXG4gKiBgYGBodG1sXG4gKiA8ZGl2IFtuZ1N0eWxlXT1cIm1haW5ncmlkQ29udGFpbmVyU3R5bGVcIj5cbiAqICAgPGFwcC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyXG4gKiAgICAgKm5nSWY9XCJzaG93VGltZXJcIlxuICogICAgIFttZWV0aW5nUHJvZ3Jlc3NUaW1lXT1cIm1lZXRpbmdQcm9ncmVzc1RpbWVcIlxuICogICAgIFtpbml0aWFsQmFja2dyb3VuZENvbG9yXT1cInRpbWVCYWNrZ3JvdW5kQ29sb3JcIlxuICogICA+PC9hcHAtbWVldGluZy1wcm9ncmVzcy10aW1lcj5cbiAqICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGBiYWNrZ3JvdW5kQ29sb3JgIChzdHJpbmcpOiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBncmlkIGNvbnRhaW5lci4gRGVmYXVsdCBpcyBhbiBlbXB0eSBzdHJpbmcuXG4gKiAtIGBtYWluU2l6ZWAgKG51bWJlcik6IE1haW4gc2l6ZSBvZiB0aGUgZ3JpZCBjb250YWluZXIsIHVzZWQgZm9yIGxheW91dCBhZGp1c3RtZW50cy5cbiAqIC0gYGhlaWdodGAgKG51bWJlcik6IEhlaWdodCBvZiB0aGUgZ3JpZCBjb250YWluZXIgaW4gcGl4ZWxzLlxuICogLSBgd2lkdGhgIChudW1iZXIpOiBXaWR0aCBvZiB0aGUgZ3JpZCBjb250YWluZXIgaW4gcGl4ZWxzLlxuICogLSBgc2hvd0FzcGVjdGAgKGJvb2xlYW4pOiBJZiB0cnVlLCBkaXNwbGF5cyB0aGUgZ3JpZCBjb250YWluZXIgaW4gZmxleCBsYXlvdXQuIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIC0gYHRpbWVCYWNrZ3JvdW5kQ29sb3JgIChzdHJpbmcpOiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtZWV0aW5nIHByb2dyZXNzIHRpbWVyLiBEZWZhdWx0IGlzICdncmVlbicuXG4gKiAtIGBzaG93VGltZXJgIChib29sZWFuKTogSWYgdHJ1ZSwgZGlzcGxheXMgdGhlIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZXIuIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIC0gYG1lZXRpbmdQcm9ncmVzc1RpbWVgIChzdHJpbmcpOiBUaW1lIGRpc3BsYXllZCBpbiB0aGUgbWVldGluZyBwcm9ncmVzcyB0aW1lci5cbiAqXG4gKiBAZ2V0dGVyXG4gKiAtIGBtYWluZ3JpZENvbnRhaW5lclN0eWxlYDogUmV0dXJucyBhIHN0eWxlIG9iamVjdCBmb3IgdGhlIGdyaWQgY29udGFpbmVyLCBpbmNsdWRpbmcgZGlzcGxheSwgY29sb3IsIGRpbWVuc2lvbnMsIGFuZCBib3JkZXIgc3R5bGluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1tYWluLWdyaWQtY29tcG9uZW50XG4gKiAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ2xpZ2h0Z3JleSdcIlxuICogICBbaGVpZ2h0XT1cIjUwMFwiXG4gKiAgIFt3aWR0aF09XCI1MDBcIlxuICogICBbc2hvd0FzcGVjdF09XCJ0cnVlXCJcbiAqICAgW3RpbWVCYWNrZ3JvdW5kQ29sb3JdPVwiJ2JsdWUnXCJcbiAqICAgW3Nob3dUaW1lcl09XCJ0cnVlXCJcbiAqICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwiJzEwOjQ1J1wiXG4gKiA+PC9hcHAtbWFpbi1ncmlkLWNvbXBvbmVudD5cbiAqIGBgYFxuICoqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWFpbi1ncmlkLWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1lZXRpbmdQcm9ncmVzc1RpbWVyXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtuZ1N0eWxlXT1cIm1haW5ncmlkQ29udGFpbmVyU3R5bGVcIj5cbiAgICAgIDxhcHAtbWVldGluZy1wcm9ncmVzcy10aW1lclxuICAgICAgICAqbmdJZj1cInNob3dUaW1lclwiXG4gICAgICAgIFttZWV0aW5nUHJvZ3Jlc3NUaW1lXT1cIm1lZXRpbmdQcm9ncmVzc1RpbWVcIlxuICAgICAgICBbaW5pdGlhbEJhY2tncm91bmRDb2xvcl09XCJ0aW1lQmFja2dyb3VuZENvbG9yXCJcbiAgICAgID48L2FwcC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBNYWluR3JpZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcnO1xuICBASW5wdXQoKSBtYWluU2l6ZSA9IDA7XG4gIEBJbnB1dCgpIGhlaWdodCA9IDA7XG4gIEBJbnB1dCgpIHdpZHRoID0gMDtcbiAgQElucHV0KCkgc2hvd0FzcGVjdCA9IHRydWU7XG4gIEBJbnB1dCgpIHRpbWVCYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nO1xuICBASW5wdXQoKSBzaG93VGltZXIgPSB0cnVlO1xuICBASW5wdXQoKSBtZWV0aW5nUHJvZ3Jlc3NUaW1lID0gJzAnO1xuXG4gIGdldCBtYWluZ3JpZENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiB0aGlzLnNob3dBc3BlY3QgPyAnZmxleCcgOiAnbm9uZScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgaGVpZ2h0OiBgJHt0aGlzLmhlaWdodH1weGAsXG4gICAgICB3aWR0aDogYCR7dGhpcy53aWR0aH1weGAsXG4gICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgYm9yZGVyU3R5bGU6ICdzb2xpZCcsXG4gICAgICBib3JkZXJDb2xvcjogJyMwMDAnLFxuICAgICAgYm9yZGVyV2lkdGg6ICc0cHgnLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==