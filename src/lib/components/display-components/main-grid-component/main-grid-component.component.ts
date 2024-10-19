import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingProgressTimer } from '../meeting-progress-timer/meeting-progress-timer.component';

export interface MainGridComponentOptions {
  backgroundColor?: string;
  mainSize?: number;
  height?: number;
  width?: number;
  showAspect?: boolean;
  timeBackgroundColor?: string;
  showTimer?: boolean;
  meetingProgressTime?: string;
}

export type MainGridComponentType = (options: MainGridComponentOptions) => HTMLElement;

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
@Component({
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
})
export class MainGridComponent {
  @Input() backgroundColor = '';
  @Input() mainSize = 0;
  @Input() height = 0;
  @Input() width = 0;
  @Input() showAspect = true;
  @Input() timeBackgroundColor = 'green';
  @Input() showTimer = true;
  @Input() meetingProgressTime = '0';

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
}
