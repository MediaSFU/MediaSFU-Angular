import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Component to display a meeting progress timer.
 *s
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
 * ```css
 * .badge-container {
 *   padding: 5px;
 *   position: relative;
 *   z-index: 1000;
 * }
 * .progress-timer {
 *   background-color: green;
 *   padding: 5px;
 *   border-radius: 5px;
 *   color: white;
 * }
 * .progress-timer-text {
 *   color: black;
 * }
 * ```
 *
 * @class MeetingProgressTimer
 * @implements OnInit, OnChanges
 *
 * @property {string} meetingProgressTime - The time to be displayed in the timer.
 * @property {string} [initialBackgroundColor='green'] - The initial background color of the timer.
 * @property {'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'} [position='topLeft'] - The position of the timer on the screen.
 * @property {{ [key: string]: string | number }} [textStyle={}] - The style to be applied to the timer text.
 * @property {boolean} [showTimer=true] - Flag to show or hide the timer.
 *
 * @property {{ [key: string]: { position: string, top?: string, bottom?: string, left?: string, right?: string } }} positions - The possible positions for the timer.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @param {SimpleChanges} changes - The changed properties.
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1wcm9ncmVzcy10aW1lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWVldGluZy1wcm9ncmVzcy10aW1lci9tZWV0aW5nLXByb2dyZXNzLXRpbWVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFXL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQXFDSCxNQUFNLE9BQU8sb0JBQW9CO0lBRS9CLG1CQUFtQixDQUFVO0lBQ3BCLHNCQUFzQixHQUFHLE9BQU8sQ0FBQztJQUNqQyxRQUFRLEdBQTBELFNBQVMsQ0FBQztJQUM1RSxTQUFTLEdBQXVDLEVBQUUsQ0FBQztJQUNuRCxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRTFCLFNBQVMsR0FRTDtRQUNGLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ3RELFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1FBQ3hELFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQzVELFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO0tBQy9ELENBQUM7SUFFRixXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHO2dCQUNmLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN0RCxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDeEQsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQzVELFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2FBQy9ELENBQUM7UUFDSixDQUFDO1FBRUQsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFDckQsQ0FBQztJQUNILENBQUM7dUdBcENVLG9CQUFvQjsyRkFBcEIsb0JBQW9CLDJSQWhDckI7Ozs7Ozs7Ozs7OztHQVlULHVQQWJTLFlBQVk7OzJGQWlDWCxvQkFBb0I7a0JBcENoQyxTQUFTOytCQUNFLDRCQUE0QixjQUMxQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYjs7Ozs7Ozs7Ozs7O0dBWVQ7OEJBc0JELG1CQUFtQjtzQkFEbEIsS0FBSztnQkFFRyxzQkFBc0I7c0JBQTlCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5leHBvcnQgaW50ZXJmYWNlIE1lZXRpbmdQcm9ncmVzc1RpbWVyT3B0aW9ucyB7XG4gIG1lZXRpbmdQcm9ncmVzc1RpbWU6IHN0cmluZztcbiAgaW5pdGlhbEJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgcG9zaXRpb24/OiAndG9wTGVmdCcgfCAndG9wUmlnaHQnIHwgJ2JvdHRvbUxlZnQnIHwgJ2JvdHRvbVJpZ2h0JztcbiAgdGV4dFN0eWxlPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfTtcbiAgc2hvd1RpbWVyPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgTWVldGluZ1Byb2dyZXNzVGltZXJUeXBlID0gKG9wdGlvbnM6IE1lZXRpbmdQcm9ncmVzc1RpbWVyT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogQ29tcG9uZW50IHRvIGRpc3BsYXkgYSBtZWV0aW5nIHByb2dyZXNzIHRpbWVyLlxuICpzXG4gKiBAc2VsZWN0b3IgYXBwLW1lZXRpbmctcHJvZ3Jlc3MtdGltZXJcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICpcbiAqIEB0ZW1wbGF0ZVxuICogYGBgaHRtbFxuICogPGRpdiBbbmdTdHlsZV09XCJwb3NpdGlvbnNbcG9zaXRpb25dXCIgY2xhc3M9XCJiYWRnZS1jb250YWluZXJcIj5cbiAqICAgPGRpdiBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogaW5pdGlhbEJhY2tncm91bmRDb2xvciwgZGlzcGxheTogc2hvd1RpbWVyID8gJ2Jsb2NrJyA6ICdub25lJyB9XCIgY2xhc3M9XCJwcm9ncmVzcy10aW1lclwiPlxuICogICAgIDxzcGFuIFtuZ1N0eWxlXT1cInRleHRTdHlsZVwiIGNsYXNzPVwicHJvZ3Jlc3MtdGltZXItdGV4dFwiPnt7IG1lZXRpbmdQcm9ncmVzc1RpbWUgfX08L3NwYW4+XG4gKiAgIDwvZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAc3R5bGVzXG4gKiBgYGBjc3NcbiAqIC5iYWRnZS1jb250YWluZXIge1xuICogICBwYWRkaW5nOiA1cHg7XG4gKiAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAqICAgei1pbmRleDogMTAwMDtcbiAqIH1cbiAqIC5wcm9ncmVzcy10aW1lciB7XG4gKiAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICogICBwYWRkaW5nOiA1cHg7XG4gKiAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAqICAgY29sb3I6IHdoaXRlO1xuICogfVxuICogLnByb2dyZXNzLXRpbWVyLXRleHQge1xuICogICBjb2xvcjogYmxhY2s7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAY2xhc3MgTWVldGluZ1Byb2dyZXNzVGltZXJcbiAqIEBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lZXRpbmdQcm9ncmVzc1RpbWUgLSBUaGUgdGltZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRpbWVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtpbml0aWFsQmFja2dyb3VuZENvbG9yPSdncmVlbiddIC0gVGhlIGluaXRpYWwgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgdGltZXIuXG4gKiBAcHJvcGVydHkgeyd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnfSBbcG9zaXRpb249J3RvcExlZnQnXSAtIFRoZSBwb3NpdGlvbiBvZiB0aGUgdGltZXIgb24gdGhlIHNjcmVlbi5cbiAqIEBwcm9wZXJ0eSB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfX0gW3RleHRTdHlsZT17fV0gLSBUaGUgc3R5bGUgdG8gYmUgYXBwbGllZCB0byB0aGUgdGltZXIgdGV4dC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3Nob3dUaW1lcj10cnVlXSAtIEZsYWcgdG8gc2hvdyBvciBoaWRlIHRoZSB0aW1lci5cbiAqXG4gKiBAcHJvcGVydHkge3sgW2tleTogc3RyaW5nXTogeyBwb3NpdGlvbjogc3RyaW5nLCB0b3A/OiBzdHJpbmcsIGJvdHRvbT86IHN0cmluZywgbGVmdD86IHN0cmluZywgcmlnaHQ/OiBzdHJpbmcgfSB9fSBwb3NpdGlvbnMgLSBUaGUgcG9zc2libGUgcG9zaXRpb25zIGZvciB0aGUgdGltZXIuXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmQgcHJvcGVydGllcyBhcmUgaW5pdGlhbGl6ZWQuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzLlxuICogQHBhcmFtIHtTaW1wbGVDaGFuZ2VzfSBjaGFuZ2VzIC0gVGhlIGNoYW5nZWQgcHJvcGVydGllcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lZXRpbmctcHJvZ3Jlc3MtdGltZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtuZ1N0eWxlXT1cInBvc2l0aW9uc1twb3NpdGlvbl1cIiBjbGFzcz1cImJhZGdlLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbml0aWFsQmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgIGRpc3BsYXk6IHNob3dUaW1lciA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgfVwiXG4gICAgICAgIGNsYXNzPVwicHJvZ3Jlc3MtdGltZXJcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBbbmdTdHlsZV09XCJ0ZXh0U3R5bGVcIiBjbGFzcz1cInByb2dyZXNzLXRpbWVyLXRleHRcIj57eyBtZWV0aW5nUHJvZ3Jlc3NUaW1lIH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5iYWRnZS1jb250YWluZXIge1xuICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgIH1cbiAgICAgIC5wcm9ncmVzcy10aW1lciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgfVxuICAgICAgLnByb2dyZXNzLXRpbWVyLXRleHQge1xuICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVldGluZ1Byb2dyZXNzVGltZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICBtZWV0aW5nUHJvZ3Jlc3NUaW1lITogc3RyaW5nO1xuICBASW5wdXQoKSBpbml0aWFsQmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJztcbiAgQElucHV0KCkgcG9zaXRpb246ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnID0gJ3RvcExlZnQnO1xuICBASW5wdXQoKSB0ZXh0U3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH0gPSB7fTtcbiAgQElucHV0KCkgc2hvd1RpbWVyID0gdHJ1ZTtcblxuICBwb3NpdGlvbnM6IHtcbiAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICBwb3NpdGlvbjogc3RyaW5nO1xuICAgICAgdG9wPzogc3RyaW5nO1xuICAgICAgYm90dG9tPzogc3RyaW5nO1xuICAgICAgbGVmdD86IHN0cmluZztcbiAgICAgIHJpZ2h0Pzogc3RyaW5nO1xuICAgIH07XG4gIH0gPSB7XG4gICAgdG9wTGVmdDogeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnMCcsIGxlZnQ6ICcwJyB9LFxuICAgIHRvcFJpZ2h0OiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcwJywgcmlnaHQ6ICcwJyB9LFxuICAgIGJvdHRvbUxlZnQ6IHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGJvdHRvbTogJzAnLCBsZWZ0OiAnMCcgfSxcbiAgICBib3R0b21SaWdodDogeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAnMCcsIHJpZ2h0OiAnMCcgfSxcbiAgfTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ3Bvc2l0aW9uJ10pIHtcbiAgICAgIHRoaXMucG9zaXRpb25zID0ge1xuICAgICAgICB0b3BMZWZ0OiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcwJywgbGVmdDogJzAnIH0sXG4gICAgICAgIHRvcFJpZ2h0OiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcwJywgcmlnaHQ6ICcwJyB9LFxuICAgICAgICBib3R0b21MZWZ0OiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBib3R0b206ICcwJywgbGVmdDogJzAnIH0sXG4gICAgICAgIGJvdHRvbVJpZ2h0OiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBib3R0b206ICcwJywgcmlnaHQ6ICcwJyB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snc2hvd1RpbWVyJ10pIHtcbiAgICAgIHRoaXMuc2hvd1RpbWVyID0gY2hhbmdlc1snc2hvd1RpbWVyJ10uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19