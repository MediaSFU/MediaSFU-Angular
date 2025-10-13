import { Component, Input, TemplateRef } from '@angular/core';
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
  containerStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type MainGridComponentType = (options: MainGridComponentOptions) => HTMLElement;

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

@Component({
    selector: 'app-main-grid-component',
    imports: [CommonModule, MeetingProgressTimer],
    template: `
    <div *ngIf="customTemplate; else defaultTemplate" [ngStyle]="maingridContainerStyle">
      <ng-container *ngTemplateOutlet="customTemplate; context: {
        $implicit: {
          backgroundColor,
          mainSize,
          height,
          width,
          showAspect,
          timeBackgroundColor,
          showTimer,
          meetingProgressTime
        }
      }"></ng-container>
    </div>
    <ng-template #defaultTemplate>
      <div [ngStyle]="maingridContainerStyle">
        <app-meeting-progress-timer
          *ngIf="showTimer"
          [meetingProgressTime]="meetingProgressTime"
          [initialBackgroundColor]="timeBackgroundColor"
        ></app-meeting-progress-timer>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `
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
  @Input() containerStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  get maingridContainerStyle() {
    const baseStyles = {
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
    return {
      ...baseStyles,
      ...(this.containerStyle as any),
    };
  }
}
