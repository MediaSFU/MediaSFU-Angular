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
@Component({
  selector: 'app-meeting-progress-timer',
  standalone: true,
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
  ],
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
