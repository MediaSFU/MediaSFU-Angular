import { Component, Input, TemplateRef } from '@angular/core';
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
  containerStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type OtherGridComponentType = (options: OtherGridComponentOptions) => HTMLElement;

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

@Component({
    selector: 'app-other-grid-component',
    imports: [CommonModule, MeetingProgressTimer],
    template: `
    <div *ngIf="customTemplate; else defaultTemplate" [ngStyle]="otherGridContainerStyle">
      <ng-container *ngTemplateOutlet="customTemplate; context: {
        $implicit: {
          backgroundColor,
          width,
          height,
          showAspect,
          timeBackgroundColor,
          showTimer,
          meetingProgressTime
        }
      }"></ng-container>
    </div>
    <ng-template #defaultTemplate>
      <div [ngStyle]="otherGridContainerStyle">
        <app-meeting-progress-timer
          *ngIf="showTimer"
          [meetingProgressTime]="meetingProgressTime"
          [initialBackgroundColor]="timeBackgroundColor"
          [showTimer]="showTimer"
        ></app-meeting-progress-timer>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `
})
export class OtherGridComponent {
  @Input() backgroundColor = 'transparent';
  @Input() width = 0;
  @Input() height = 0;
  @Input() showAspect = true;
  @Input() timeBackgroundColor = 'green';
  @Input() showTimer = false;
  @Input() meetingProgressTime = '00:00:00';
  @Input() containerStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  get otherGridContainerStyle() {
    const baseStyles = {
      'background-color': this.backgroundColor,
      width: this.width + 'px',
      height: this.height + 'px',
      display: this.showAspect ? 'block' : 'none',
      overflow: 'hidden',
      'border-style': 'solid',
      'border-color': 'black',
      'border-width': '2px',
      'border-radius': '0',
      margin: '0',
      padding: '0'
    };
    return {
      ...baseStyles,
      ...(this.containerStyle as any),
    };
  }
}
