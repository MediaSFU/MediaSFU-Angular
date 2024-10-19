import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingProgressTimer } from '../meeting-progress-timer/meeting-progress-timer.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MainGridComponent is a standalone Angular component that displays a grid container
 * with optional meeting progress timer and customizable styles.
 *
 * @selector app-main-grid-component
 * @standalone true
 * @imports CommonModule, MeetingProgressTimer
 *
 * @template
 * <div [ngStyle]="maingridContainerStyle">
 *   <app-meeting-progress-timer
 *     *ngIf="showTimer"
 *     [meetingProgressTime]="meetingProgressTime"
 *     [initialBackgroundColor]="timeBackgroundColor"
 *   ></app-meeting-progress-timer>
 *   <ng-content></ng-content>
 * </div>
 *
 * @Inputs
 * @property {string} backgroundColor - The background color of the grid container.
 * @property {number} mainSize - The main size of the grid container.
 * @property {number} height - The height of the grid container in pixels.
 * @property {number} width - The width of the grid container in pixels.
 * @property {boolean} showAspect - Determines if the grid container should be displayed as flex.
 * @property {string} timeBackgroundColor - The background color of the meeting progress timer.
 * @property {boolean} showTimer - Determines if the meeting progress timer should be displayed.
 * @property {string} meetingProgressTime - The progress time to be displayed in the meeting progress timer.
 *
 * @getter maingridContainerStyle - Returns the style object for the grid container.
 * @returns {Object} The style object for the grid container.
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1ncmlkLWNvbXBvbmVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWFpbi1ncmlkLWNvbXBvbmVudC9tYWluLWdyaWQtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNERBQTRELENBQUM7OztBQWVsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBZ0JILE1BQU0sT0FBTyxpQkFBaUI7SUFDbkIsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUNyQixRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNYLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDVixVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLG1CQUFtQixHQUFHLE9BQU8sQ0FBQztJQUM5QixTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztJQUVuQyxJQUFJLHNCQUFzQjtRQUN4QixPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUMxQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSTtZQUMxQixLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJO1lBQ3hCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLFdBQVcsRUFBRSxNQUFNO1lBQ25CLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUM7SUFDSixDQUFDO3VHQXZCVSxpQkFBaUI7MkZBQWpCLGlCQUFpQixxVUFYbEI7Ozs7Ozs7OztHQVNULDJEQVZTLFlBQVksd05BQUUsb0JBQW9COzsyRkFZakMsaUJBQWlCO2tCQWY3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7b0JBQzdDLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7aUJBQ0Y7OEJBRVUsZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWVldGluZ1Byb2dyZXNzVGltZXIgfSBmcm9tICcuLi9tZWV0aW5nLXByb2dyZXNzLXRpbWVyL21lZXRpbmctcHJvZ3Jlc3MtdGltZXIuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBNYWluR3JpZENvbXBvbmVudE9wdGlvbnMge1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIG1haW5TaXplPzogbnVtYmVyO1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIHdpZHRoPzogbnVtYmVyO1xuICBzaG93QXNwZWN0PzogYm9vbGVhbjtcbiAgdGltZUJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgc2hvd1RpbWVyPzogYm9vbGVhbjtcbiAgbWVldGluZ1Byb2dyZXNzVGltZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbkdyaWRDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE1haW5HcmlkQ29tcG9uZW50T3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogTWFpbkdyaWRDb21wb25lbnQgaXMgYSBzdGFuZGFsb25lIEFuZ3VsYXIgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBncmlkIGNvbnRhaW5lclxuICogd2l0aCBvcHRpb25hbCBtZWV0aW5nIHByb2dyZXNzIHRpbWVyIGFuZCBjdXN0b21pemFibGUgc3R5bGVzLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWFpbi1ncmlkLWNvbXBvbmVudFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlLCBNZWV0aW5nUHJvZ3Jlc3NUaW1lclxuICpcbiAqIEB0ZW1wbGF0ZVxuICogPGRpdiBbbmdTdHlsZV09XCJtYWluZ3JpZENvbnRhaW5lclN0eWxlXCI+XG4gKiAgIDxhcHAtbWVldGluZy1wcm9ncmVzcy10aW1lclxuICogICAgICpuZ0lmPVwic2hvd1RpbWVyXCJcbiAqICAgICBbbWVldGluZ1Byb2dyZXNzVGltZV09XCJtZWV0aW5nUHJvZ3Jlc3NUaW1lXCJcbiAqICAgICBbaW5pdGlhbEJhY2tncm91bmRDb2xvcl09XCJ0aW1lQmFja2dyb3VuZENvbG9yXCJcbiAqICAgPjwvYXBwLW1lZXRpbmctcHJvZ3Jlc3MtdGltZXI+XG4gKiAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAqIDwvZGl2PlxuICpcbiAqIEBJbnB1dHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBUaGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgZ3JpZCBjb250YWluZXIuXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWFpblNpemUgLSBUaGUgbWFpbiBzaXplIG9mIHRoZSBncmlkIGNvbnRhaW5lci5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0IG9mIHRoZSBncmlkIGNvbnRhaW5lciBpbiBwaXhlbHMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggLSBUaGUgd2lkdGggb2YgdGhlIGdyaWQgY29udGFpbmVyIGluIHBpeGVscy5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvd0FzcGVjdCAtIERldGVybWluZXMgaWYgdGhlIGdyaWQgY29udGFpbmVyIHNob3VsZCBiZSBkaXNwbGF5ZWQgYXMgZmxleC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aW1lQmFja2dyb3VuZENvbG9yIC0gVGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZXIuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3dUaW1lciAtIERldGVybWluZXMgaWYgdGhlIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZXIgc2hvdWxkIGJlIGRpc3BsYXllZC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZWV0aW5nUHJvZ3Jlc3NUaW1lIC0gVGhlIHByb2dyZXNzIHRpbWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBtZWV0aW5nIHByb2dyZXNzIHRpbWVyLlxuICpcbiAqIEBnZXR0ZXIgbWFpbmdyaWRDb250YWluZXJTdHlsZSAtIFJldHVybnMgdGhlIHN0eWxlIG9iamVjdCBmb3IgdGhlIGdyaWQgY29udGFpbmVyLlxuICogQHJldHVybnMge09iamVjdH0gVGhlIHN0eWxlIG9iamVjdCBmb3IgdGhlIGdyaWQgY29udGFpbmVyLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWFpbi1ncmlkLWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1lZXRpbmdQcm9ncmVzc1RpbWVyXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtuZ1N0eWxlXT1cIm1haW5ncmlkQ29udGFpbmVyU3R5bGVcIj5cbiAgICAgIDxhcHAtbWVldGluZy1wcm9ncmVzcy10aW1lclxuICAgICAgICAqbmdJZj1cInNob3dUaW1lclwiXG4gICAgICAgIFttZWV0aW5nUHJvZ3Jlc3NUaW1lXT1cIm1lZXRpbmdQcm9ncmVzc1RpbWVcIlxuICAgICAgICBbaW5pdGlhbEJhY2tncm91bmRDb2xvcl09XCJ0aW1lQmFja2dyb3VuZENvbG9yXCJcbiAgICAgID48L2FwcC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBNYWluR3JpZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcnO1xuICBASW5wdXQoKSBtYWluU2l6ZSA9IDA7XG4gIEBJbnB1dCgpIGhlaWdodCA9IDA7XG4gIEBJbnB1dCgpIHdpZHRoID0gMDtcbiAgQElucHV0KCkgc2hvd0FzcGVjdCA9IHRydWU7XG4gIEBJbnB1dCgpIHRpbWVCYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nO1xuICBASW5wdXQoKSBzaG93VGltZXIgPSB0cnVlO1xuICBASW5wdXQoKSBtZWV0aW5nUHJvZ3Jlc3NUaW1lID0gJzAnO1xuXG4gIGdldCBtYWluZ3JpZENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiB0aGlzLnNob3dBc3BlY3QgPyAnZmxleCcgOiAnbm9uZScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgaGVpZ2h0OiBgJHt0aGlzLmhlaWdodH1weGAsXG4gICAgICB3aWR0aDogYCR7dGhpcy53aWR0aH1weGAsXG4gICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgYm9yZGVyU3R5bGU6ICdzb2xpZCcsXG4gICAgICBib3JkZXJDb2xvcjogJyMwMDAnLFxuICAgICAgYm9yZGVyV2lkdGg6ICc0cHgnLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==