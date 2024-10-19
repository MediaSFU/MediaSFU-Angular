import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
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
})
export class RecordTimerWidget {
  recordingProgressTime = '';

  constructor(@Inject('recordingProgressTime') recordingProgressTime: string) {
    this.recordingProgressTime = recordingProgressTime;
  }
}
