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
    <div class="record-timer-widget" [attr.aria-label]="ariaLabel">
      <span class="record-timer-widget__dot" aria-hidden="true"></span>
      <span class="record-timer-widget__label">REC</span>
      <span class="record-timer-widget__value">{{ displayTime }}</span>
    </div>
  `,
    styles: [
        `
      .record-timer-widget {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-height: 26px;
        padding: 0 10px;
        margin: 0;
        border-radius: 999px;
        background: linear-gradient(135deg, rgba(127, 29, 29, 0.16) 0%, rgba(220, 38, 38, 0.18) 100%);
        border: 1px solid rgba(248, 113, 113, 0.28);
        box-shadow: 0 10px 20px rgba(127, 29, 29, 0.18);
        color: #991b1b;
        line-height: 1;
        backdrop-filter: blur(10px);
      }

      .record-timer-widget__dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: linear-gradient(135deg, #fb7185 0%, #ef4444 60%, #dc2626 100%);
        box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.12);
      }

      .record-timer-widget__label,
      .record-timer-widget__value {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.04em;
      }

      .record-timer-widget__label {
        color: #b91c1c;
      }
    `,
    ],
    imports: [CommonModule]
})
export class RecordTimerWidget {
  recordingProgressTime = '';

  constructor(@Inject('recordingProgressTime') recordingProgressTime: string) {
    this.recordingProgressTime = recordingProgressTime;
  }

  get displayTime(): string {
    return (this.recordingProgressTime || '00:00:00').trim() || '00:00:00';
  }

  get ariaLabel(): string {
    return `Recording timer ${this.displayTime}`;
  }
}
