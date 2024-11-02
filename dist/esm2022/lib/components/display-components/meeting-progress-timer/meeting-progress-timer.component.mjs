import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MeetingProgressTimer displays a customizable timer badge to track meeting progress time.
 *
 * @selector app-meeting-progress-timer
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="positions[position]" class="badge-container">
 *   <div [ngStyle]="{ backgroundColor: initialBackgroundColor, display: showTimer ? 'block' : 'none' }" class="progress-timer">
 *     <span [ngStyle]="textStyle" class="progress-timer-text">{{ meetingProgressTime }}</span>
 *   </div>
 * </div>
 * ```
 *
 * @styles
 * - `.badge-container`: General container style with positioning.
 * - `.progress-timer`: Timer badge with default padding, background, and border-radius.
 * - `.progress-timer-text`: Text styling within the timer badge.
 *
 * @inputs
 * - `meetingProgressTime` (string): Time to be displayed in the timer.
 * - `initialBackgroundColor` (string): Background color of the timer badge. Default is 'green'.
 * - `position` ('topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'): Position of the timer on the screen. Default is 'topLeft'.
 * - `textStyle` (object): Custom styles for the timer text.
 * - `showTimer` (boolean): If true, displays the timer. Default is true.
 *
 * @property `positions` (object): Preset styles for timer positioning options.
 *
 * @methods
 * - `ngOnChanges(changes: SimpleChanges)`: Handles changes to input properties and updates styles accordingly.
 *
 * @example
 * ```html
 * <app-meeting-progress-timer
 *   [meetingProgressTime]="'10:30'"
 *   [initialBackgroundColor]="'blue'"
 *   [position]="'bottomRight'"
 *   [textStyle]="{ color: 'white', fontWeight: 'bold' }"
 *   [showTimer]="true"
 * ></app-meeting-progress-timer>
 * ```
 **/
export class MeetingProgressTimer {
    meetingProgressTime;
    initialBackgroundColor = 'green';
    position = 'topLeft';
    textStyle = {};
    showTimer = true;
    positions = {
        topLeft: { position: 'absolute', top: '0', left: '0' },
        topRight: { position: 'absolute', top: '0', right: '0' },
        bottomLeft: { position: 'absolute', bottom: '0', left: '0' },
        bottomRight: { position: 'absolute', bottom: '0', right: '0' },
    };
    ngOnChanges(changes) {
        if (changes['position']) {
            this.positions = {
                topLeft: { position: 'absolute', top: '0', left: '0' },
                topRight: { position: 'absolute', top: '0', right: '0' },
                bottomLeft: { position: 'absolute', bottom: '0', left: '0' },
                bottomRight: { position: 'absolute', bottom: '0', right: '0' },
            };
        }
        if (changes['showTimer']) {
            this.showTimer = changes['showTimer'].currentValue;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingProgressTimer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MeetingProgressTimer, isStandalone: true, selector: "app-meeting-progress-timer", inputs: { meetingProgressTime: "meetingProgressTime", initialBackgroundColor: "initialBackgroundColor", position: "position", textStyle: "textStyle", showTimer: "showTimer" }, usesOnChanges: true, ngImport: i0, template: `
    <div [ngStyle]="positions[position]" class="badge-container">
      <div
        [ngStyle]="{
          backgroundColor: initialBackgroundColor,
          display: showTimer ? 'block' : 'none'
        }"
        class="progress-timer"
      >
        <span [ngStyle]="textStyle" class="progress-timer-text">{{ meetingProgressTime }}</span>
      </div>
    </div>
  `, isInline: true, styles: [".badge-container{padding:5px;position:relative;z-index:1000}.progress-timer{background-color:green;padding:5px;border-radius:5px;color:#fff}.progress-timer-text{color:#000}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingProgressTimer, decorators: [{
            type: Component,
            args: [{ selector: 'app-meeting-progress-timer', standalone: true, imports: [CommonModule], template: `
    <div [ngStyle]="positions[position]" class="badge-container">
      <div
        [ngStyle]="{
          backgroundColor: initialBackgroundColor,
          display: showTimer ? 'block' : 'none'
        }"
        class="progress-timer"
      >
        <span [ngStyle]="textStyle" class="progress-timer-text">{{ meetingProgressTime }}</span>
      </div>
    </div>
  `, styles: [".badge-container{padding:5px;position:relative;z-index:1000}.progress-timer{background-color:green;padding:5px;border-radius:5px;color:#fff}.progress-timer-text{color:#000}\n"] }]
        }], propDecorators: { meetingProgressTime: [{
                type: Input
            }], initialBackgroundColor: [{
                type: Input
            }], position: [{
                type: Input
            }], textStyle: [{
                type: Input
            }], showTimer: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1wcm9ncmVzcy10aW1lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWVldGluZy1wcm9ncmVzcy10aW1lci9tZWV0aW5nLXByb2dyZXNzLXRpbWVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFXL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQ0k7QUFzQ0osTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixtQkFBbUIsQ0FBVTtJQUNwQixzQkFBc0IsR0FBRyxPQUFPLENBQUM7SUFDakMsUUFBUSxHQUEwRCxTQUFTLENBQUM7SUFDNUUsU0FBUyxHQUF1QyxFQUFFLENBQUM7SUFDbkQsU0FBUyxHQUFHLElBQUksQ0FBQztJQUUxQixTQUFTLEdBUUw7UUFDRixPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUN0RCxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtRQUN4RCxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUM1RCxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtLQUMvRCxDQUFDO0lBRUYsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRztnQkFDZixPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDdEQsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ3hELFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUM1RCxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTthQUMvRCxDQUFDO1FBQ0osQ0FBQztRQUVELElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQ3JELENBQUM7SUFDSCxDQUFDO3VHQXBDVSxvQkFBb0I7MkZBQXBCLG9CQUFvQiwyUkFoQ3JCOzs7Ozs7Ozs7Ozs7R0FZVCx1UEFiUyxZQUFZOzsyRkFpQ1gsb0JBQW9CO2tCQXBDaEMsU0FBUzsrQkFDRSw0QkFBNEIsY0FDMUIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLFlBQ2I7Ozs7Ozs7Ozs7OztHQVlUOzhCQXNCRCxtQkFBbUI7c0JBRGxCLEtBQUs7Z0JBRUcsc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuZXhwb3J0IGludGVyZmFjZSBNZWV0aW5nUHJvZ3Jlc3NUaW1lck9wdGlvbnMge1xuICBtZWV0aW5nUHJvZ3Jlc3NUaW1lOiBzdHJpbmc7XG4gIGluaXRpYWxCYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIHBvc2l0aW9uPzogJ3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCc7XG4gIHRleHRTdHlsZT86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH07XG4gIHNob3dUaW1lcj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIE1lZXRpbmdQcm9ncmVzc1RpbWVyVHlwZSA9IChvcHRpb25zOiBNZWV0aW5nUHJvZ3Jlc3NUaW1lck9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIE1lZXRpbmdQcm9ncmVzc1RpbWVyIGRpc3BsYXlzIGEgY3VzdG9taXphYmxlIHRpbWVyIGJhZGdlIHRvIHRyYWNrIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZS5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLW1lZXRpbmctcHJvZ3Jlc3MtdGltZXJcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICpcbiAqIEB0ZW1wbGF0ZVxuICogYGBgaHRtbFxuICogPGRpdiBbbmdTdHlsZV09XCJwb3NpdGlvbnNbcG9zaXRpb25dXCIgY2xhc3M9XCJiYWRnZS1jb250YWluZXJcIj5cbiAqICAgPGRpdiBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogaW5pdGlhbEJhY2tncm91bmRDb2xvciwgZGlzcGxheTogc2hvd1RpbWVyID8gJ2Jsb2NrJyA6ICdub25lJyB9XCIgY2xhc3M9XCJwcm9ncmVzcy10aW1lclwiPlxuICogICAgIDxzcGFuIFtuZ1N0eWxlXT1cInRleHRTdHlsZVwiIGNsYXNzPVwicHJvZ3Jlc3MtdGltZXItdGV4dFwiPnt7IG1lZXRpbmdQcm9ncmVzc1RpbWUgfX08L3NwYW4+XG4gKiAgIDwvZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAc3R5bGVzXG4gKiAtIGAuYmFkZ2UtY29udGFpbmVyYDogR2VuZXJhbCBjb250YWluZXIgc3R5bGUgd2l0aCBwb3NpdGlvbmluZy5cbiAqIC0gYC5wcm9ncmVzcy10aW1lcmA6IFRpbWVyIGJhZGdlIHdpdGggZGVmYXVsdCBwYWRkaW5nLCBiYWNrZ3JvdW5kLCBhbmQgYm9yZGVyLXJhZGl1cy5cbiAqIC0gYC5wcm9ncmVzcy10aW1lci10ZXh0YDogVGV4dCBzdHlsaW5nIHdpdGhpbiB0aGUgdGltZXIgYmFkZ2UuXG4gKlxuICogQGlucHV0c1xuICogLSBgbWVldGluZ1Byb2dyZXNzVGltZWAgKHN0cmluZyk6IFRpbWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB0aW1lci5cbiAqIC0gYGluaXRpYWxCYWNrZ3JvdW5kQ29sb3JgIChzdHJpbmcpOiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSB0aW1lciBiYWRnZS4gRGVmYXVsdCBpcyAnZ3JlZW4nLlxuICogLSBgcG9zaXRpb25gICgndG9wTGVmdCcgfCAndG9wUmlnaHQnIHwgJ2JvdHRvbUxlZnQnIHwgJ2JvdHRvbVJpZ2h0Jyk6IFBvc2l0aW9uIG9mIHRoZSB0aW1lciBvbiB0aGUgc2NyZWVuLiBEZWZhdWx0IGlzICd0b3BMZWZ0Jy5cbiAqIC0gYHRleHRTdHlsZWAgKG9iamVjdCk6IEN1c3RvbSBzdHlsZXMgZm9yIHRoZSB0aW1lciB0ZXh0LlxuICogLSBgc2hvd1RpbWVyYCAoYm9vbGVhbik6IElmIHRydWUsIGRpc3BsYXlzIHRoZSB0aW1lci4gRGVmYXVsdCBpcyB0cnVlLlxuICpcbiAqIEBwcm9wZXJ0eSBgcG9zaXRpb25zYCAob2JqZWN0KTogUHJlc2V0IHN0eWxlcyBmb3IgdGltZXIgcG9zaXRpb25pbmcgb3B0aW9ucy5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcylgOiBIYW5kbGVzIGNoYW5nZXMgdG8gaW5wdXQgcHJvcGVydGllcyBhbmQgdXBkYXRlcyBzdHlsZXMgYWNjb3JkaW5nbHkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtbWVldGluZy1wcm9ncmVzcy10aW1lclxuICogICBbbWVldGluZ1Byb2dyZXNzVGltZV09XCInMTA6MzAnXCJcbiAqICAgW2luaXRpYWxCYWNrZ3JvdW5kQ29sb3JdPVwiJ2JsdWUnXCJcbiAqICAgW3Bvc2l0aW9uXT1cIidib3R0b21SaWdodCdcIlxuICogICBbdGV4dFN0eWxlXT1cInsgY29sb3I6ICd3aGl0ZScsIGZvbnRXZWlnaHQ6ICdib2xkJyB9XCJcbiAqICAgW3Nob3dUaW1lcl09XCJ0cnVlXCJcbiAqID48L2FwcC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyPlxuICogYGBgXG4gKiovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbbmdTdHlsZV09XCJwb3NpdGlvbnNbcG9zaXRpb25dXCIgY2xhc3M9XCJiYWRnZS1jb250YWluZXJcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5pdGlhbEJhY2tncm91bmRDb2xvcixcbiAgICAgICAgICBkaXNwbGF5OiBzaG93VGltZXIgPyAnYmxvY2snIDogJ25vbmUnXG4gICAgICAgIH1cIlxuICAgICAgICBjbGFzcz1cInByb2dyZXNzLXRpbWVyXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gW25nU3R5bGVdPVwidGV4dFN0eWxlXCIgY2xhc3M9XCJwcm9ncmVzcy10aW1lci10ZXh0XCI+e3sgbWVldGluZ1Byb2dyZXNzVGltZSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuYmFkZ2UtY29udGFpbmVyIHtcbiAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICB9XG4gICAgICAucHJvZ3Jlc3MtdGltZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIH1cbiAgICAgIC5wcm9ncmVzcy10aW1lci10ZXh0IHtcbiAgICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1lZXRpbmdQcm9ncmVzc1RpbWVyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgbWVldGluZ1Byb2dyZXNzVGltZSE6IHN0cmluZztcbiAgQElucHV0KCkgaW5pdGlhbEJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiAndG9wTGVmdCcgfCAndG9wUmlnaHQnIHwgJ2JvdHRvbUxlZnQnIHwgJ2JvdHRvbVJpZ2h0JyA9ICd0b3BMZWZ0JztcbiAgQElucHV0KCkgdGV4dFN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB9ID0ge307XG4gIEBJbnB1dCgpIHNob3dUaW1lciA9IHRydWU7XG5cbiAgcG9zaXRpb25zOiB7XG4gICAgW2tleTogc3RyaW5nXToge1xuICAgICAgcG9zaXRpb246IHN0cmluZztcbiAgICAgIHRvcD86IHN0cmluZztcbiAgICAgIGJvdHRvbT86IHN0cmluZztcbiAgICAgIGxlZnQ/OiBzdHJpbmc7XG4gICAgICByaWdodD86IHN0cmluZztcbiAgICB9O1xuICB9ID0ge1xuICAgIHRvcExlZnQ6IHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzAnLCBsZWZ0OiAnMCcgfSxcbiAgICB0b3BSaWdodDogeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnMCcsIHJpZ2h0OiAnMCcgfSxcbiAgICBib3R0b21MZWZ0OiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBib3R0b206ICcwJywgbGVmdDogJzAnIH0sXG4gICAgYm90dG9tUmlnaHQ6IHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGJvdHRvbTogJzAnLCByaWdodDogJzAnIH0sXG4gIH07XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydwb3NpdGlvbiddKSB7XG4gICAgICB0aGlzLnBvc2l0aW9ucyA9IHtcbiAgICAgICAgdG9wTGVmdDogeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnMCcsIGxlZnQ6ICcwJyB9LFxuICAgICAgICB0b3BSaWdodDogeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnMCcsIHJpZ2h0OiAnMCcgfSxcbiAgICAgICAgYm90dG9tTGVmdDogeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAnMCcsIGxlZnQ6ICcwJyB9LFxuICAgICAgICBib3R0b21SaWdodDogeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAnMCcsIHJpZ2h0OiAnMCcgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3Nob3dUaW1lciddKSB7XG4gICAgICB0aGlzLnNob3dUaW1lciA9IGNoYW5nZXNbJ3Nob3dUaW1lciddLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==