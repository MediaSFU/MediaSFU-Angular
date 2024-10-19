import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXRpbWVyLXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL3JlY29yZC10aW1lci13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFjL0MsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixxQkFBcUIsR0FBRyxFQUFFLENBQUM7SUFFM0IsWUFBNkMscUJBQTZCO1FBQ3hFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztJQUNyRCxDQUFDO3VHQUxVLGlCQUFpQixrQkFHUix1QkFBdUI7MkZBSGhDLGlCQUFpQixtRkFUbEI7Ozs7OztHQU1ULDJEQUNTLFlBQVk7OzJGQUVYLGlCQUFpQjtrQkFaN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFOzs7Ozs7R0FNVDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQ3hCOzswQkFJYyxNQUFNOzJCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcmVjb3JkLXRpbWVyLXdpZGdldCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyBib3JkZXItd2lkdGg6IDA7IHBhZGRpbmc6IDA7IG1hcmdpbjogMjtcIj5cbiAgICAgIDxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IGJvcmRlci13aWR0aDogMDsgcGFkZGluZzogMDsgbWFyZ2luOiAwO1wiPlxuICAgICAgICB7eyByZWNvcmRpbmdQcm9ncmVzc1RpbWUgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFJlY29yZFRpbWVyV2lkZ2V0IHtcbiAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lID0gJyc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgncmVjb3JkaW5nUHJvZ3Jlc3NUaW1lJykgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZSA9IHJlY29yZGluZ1Byb2dyZXNzVGltZTtcbiAgfVxufVxuIl19