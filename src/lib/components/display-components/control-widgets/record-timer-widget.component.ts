import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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


@Component({
    selector: 'app-record-timer-widget',
    template: `
    <div style="background-color: transparent; border-width: 0; padding: 0; margin: 2;">
      <span style="background-color: transparent; border-width: 0; padding: 0; margin: 0;">
        {{ recordingProgressTime }}
      </span>
    </div>
  `,
    imports: [CommonModule]
})
export class RecordTimerWidget {
  recordingProgressTime = '';

  constructor(@Inject('recordingProgressTime') recordingProgressTime: string) {
    this.recordingProgressTime = recordingProgressTime;
  }
}
