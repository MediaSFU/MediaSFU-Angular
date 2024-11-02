import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * RecordTimerWidget displays the current recording progress time.
 *
 * @selector app-record-timer-widget
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `recordingProgressTime` (string): The time to display as recording progress.
 *
 * @example
 * ```html
 * <app-record-timer-widget [recordingProgressTime]="'00:05:23'"></app-record-timer-widget>
 * ```
 **/
export class RecordTimerWidget {
    recordingProgressTime = '';
    constructor(recordingProgressTime) {
        this.recordingProgressTime = recordingProgressTime;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordTimerWidget, deps: [{ token: 'recordingProgressTime' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: RecordTimerWidget, isStandalone: true, selector: "app-record-timer-widget", ngImport: i0, template: `
    <div style="background-color: transparent; border-width: 0; padding: 0; margin: 2;">
      <span style="background-color: transparent; border-width: 0; padding: 0; margin: 0;">
        {{ recordingProgressTime }}
      </span>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordTimerWidget, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-record-timer-widget',
                    standalone: true,
                    template: `
    <div style="background-color: transparent; border-width: 0; padding: 0; margin: 2;">
      <span style="background-color: transparent; border-width: 0; padding: 0; margin: 0;">
        {{ recordingProgressTime }}
      </span>
    </div>
  `,
                    imports: [CommonModule],
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['recordingProgressTime']
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXRpbWVyLXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL3JlY29yZC10aW1lci13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFL0M7Ozs7Ozs7Ozs7Ozs7O0lBY0k7QUFlSixNQUFNLE9BQU8saUJBQWlCO0lBQzVCLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztJQUUzQixZQUE2QyxxQkFBNkI7UUFDeEUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO0lBQ3JELENBQUM7dUdBTFUsaUJBQWlCLGtCQUdSLHVCQUF1QjsyRkFIaEMsaUJBQWlCLG1GQVRsQjs7Ozs7O0dBTVQsMkRBQ1MsWUFBWTs7MkZBRVgsaUJBQWlCO2tCQVo3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUU7Ozs7OztHQU1UO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDeEI7OzBCQUljLE1BQU07MkJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogUmVjb3JkVGltZXJXaWRnZXQgZGlzcGxheXMgdGhlIGN1cnJlbnQgcmVjb3JkaW5nIHByb2dyZXNzIHRpbWUuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1yZWNvcmQtdGltZXItd2lkZ2V0XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGByZWNvcmRpbmdQcm9ncmVzc1RpbWVgIChzdHJpbmcpOiBUaGUgdGltZSB0byBkaXNwbGF5IGFzIHJlY29yZGluZyBwcm9ncmVzcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1yZWNvcmQtdGltZXItd2lkZ2V0IFtyZWNvcmRpbmdQcm9ncmVzc1RpbWVdPVwiJzAwOjA1OjIzJ1wiPjwvYXBwLXJlY29yZC10aW1lci13aWRnZXQ+XG4gKiBgYGBcbiAqKi9cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcmVjb3JkLXRpbWVyLXdpZGdldCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyBib3JkZXItd2lkdGg6IDA7IHBhZGRpbmc6IDA7IG1hcmdpbjogMjtcIj5cbiAgICAgIDxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IGJvcmRlci13aWR0aDogMDsgcGFkZGluZzogMDsgbWFyZ2luOiAwO1wiPlxuICAgICAgICB7eyByZWNvcmRpbmdQcm9ncmVzc1RpbWUgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFJlY29yZFRpbWVyV2lkZ2V0IHtcbiAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lID0gJyc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgncmVjb3JkaW5nUHJvZ3Jlc3NUaW1lJykgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZSA9IHJlY29yZGluZ1Byb2dyZXNzVGltZTtcbiAgfVxufVxuIl19