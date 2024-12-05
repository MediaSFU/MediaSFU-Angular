import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface MeetingProgressTimerOptions {
  meetingProgressTime: string;
  initialBackgroundColor?: string;
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  textStyle?: { [key: string]: string | number };
  showTimer?: boolean;
}

export type MeetingProgressTimerType = (options: MeetingProgressTimerOptions) => HTMLElement;

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

@Component({
    selector: 'app-meeting-progress-timer',
    imports: [CommonModule],
    template: `
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
  `,
    styles: [
        `
      .badge-container {
        padding: 5px;
        position: relative;
        z-index: 1000;
      }
      .progress-timer {
        background-color: green;
        padding: 5px;
        border-radius: 5px;
        color: white;
      }
      .progress-timer-text {
        color: black;
      }
    `,
    ]
})
export class MeetingProgressTimer implements OnChanges {
  @Input()
  meetingProgressTime!: string;
  @Input() initialBackgroundColor = 'green';
  @Input() position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topLeft';
  @Input() textStyle: { [key: string]: string | number } = {};
  @Input() showTimer = true;

  positions: {
    [key: string]: {
      position: string;
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
  } = {
    topLeft: { position: 'absolute', top: '0', left: '0' },
    topRight: { position: 'absolute', top: '0', right: '0' },
    bottomLeft: { position: 'absolute', bottom: '0', left: '0' },
    bottomRight: { position: 'absolute', bottom: '0', right: '0' },
  };

  ngOnChanges(changes: SimpleChanges) {
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
}
