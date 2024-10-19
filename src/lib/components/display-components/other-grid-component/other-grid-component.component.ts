import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingProgressTimer } from '../meeting-progress-timer/meeting-progress-timer.component';

export interface OtherGridComponentOptions {
  backgroundColor?: string;
  width?: number;
  height?: number;
  showAspect?: boolean;
  timeBackgroundColor?: string;
  showTimer?: boolean;
  meetingProgressTime?: string;
}

export type OtherGridComponentType = (options: OtherGridComponentOptions) => HTMLElement;

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
@Component({
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
})
export class OtherGridComponent {
  @Input() backgroundColor = 'transparent';
  @Input() width = 0;
  @Input() height = 0;
  @Input() showAspect = true;
  @Input() timeBackgroundColor = 'green';
  @Input() showTimer = false;
  @Input() meetingProgressTime = '00:00:00';
}
