import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

type TimerTone = 'success' | 'warning' | 'danger' | 'recording';

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
    imports: [CommonModule, FontAwesomeModule],
    template: `
    <div *ngIf="showTimer" [ngStyle]="positionStyle" class="badge-container">
      <div
        [ngStyle]="badgeStyle"
        [attr.title]="badgeTitle"
        [attr.aria-label]="ariaLabel"
        class="progress-timer"
      >
        <span class="progress-timer-icon" [ngClass]="iconToneClass">
          <span *ngIf="isRecordingState(); else timerClock" class="progress-timer-dot"></span>
          <ng-template #timerClock>
            <fa-icon [icon]="faClock"></fa-icon>
          </ng-template>
        </span>
        <span [ngStyle]="textStyle" class="progress-timer-text">{{ meetingProgressTime }}</span>
        <span *ngIf="isRecordingState()" class="progress-timer-status">REC</span>
      </div>
    </div>
  `,
    styles: [
        `
      .badge-container {
        position: relative;
        z-index: 1000;
      }

      .progress-timer {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid var(--timer-border, rgba(148, 163, 184, 0.28));
        backdrop-filter: blur(12px);
        box-shadow:
          0 18px 34px rgba(15, 23, 42, 0.18),
          0 0 0 1px var(--timer-outline, rgba(255, 255, 255, 0.04));
        color: white;
        animation: progress-timer-enter 180ms ease-out;
      }

      .progress-timer-icon {
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--timer-icon-background, rgba(255, 255, 255, 0.18));
        color: var(--timer-icon-color, #ffffff);
        flex-shrink: 0;
      }

      .progress-timer-icon--warning {
        color: #f59e0b;
      }

      .progress-timer-icon--danger,
      .progress-timer-icon--recording {
        color: #ef4444;
      }

      .progress-timer-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: currentColor;
        animation: progress-timer-pulse 1s ease-in-out infinite;
      }

      .progress-timer-text {
        color: #ffffff;
        font-family: var(--ms-modern-mono-font-family, 'Consolas', 'Cascadia Code', 'Aptos Mono', monospace);
        font-size: 0.92rem;
        font-weight: 700;
        letter-spacing: 0.06em;
      }

      .progress-timer-status {
        color: #fca5a5;
        font-family: var(--ms-modern-font-family, 'Segoe UI', 'Aptos', 'Trebuchet MS', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.16em;
      }

      @keyframes progress-timer-enter {
        from {
          opacity: 0;
          transform: translateY(-6px) scale(0.96);
        }

        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes progress-timer-pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }

        50% {
          opacity: 0.42;
          transform: scale(1.24);
        }
      }
    `,
    ]
})
export class MeetingProgressTimer {
  @Input()
  meetingProgressTime!: string;
  @Input() initialBackgroundColor = 'green';
  @Input() position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topLeft';
  @Input() textStyle: { [key: string]: string | number } = {};
  @Input() showTimer = true;

  readonly faClock = faClock;

  get positionStyle(): { [key: string]: string } {
    const positions = {
      topLeft: { position: 'absolute', top: '10px', left: '10px' },
      topRight: { position: 'absolute', top: '10px', right: '10px' },
      bottomLeft: { position: 'absolute', bottom: '10px', left: '10px' },
      bottomRight: { position: 'absolute', bottom: '10px', right: '10px' },
    };

    return positions[this.position];
  }

  get badgeStyle(): { [key: string]: string } {
    const accentColor = this.getAccentColor();

    return {
      background: this.getResolvedBackground(),
      '--timer-border': this.isCustomBackground()
        ? 'rgba(255, 255, 255, 0.18)'
        : this.withAlpha(accentColor, 0.32),
      '--timer-outline': this.withAlpha(accentColor, 0.16),
      '--timer-icon-background': this.withAlpha(accentColor, 0.2),
      '--timer-icon-color': accentColor,
    };
  }

  get iconToneClass(): string {
    return `progress-timer-icon--${this.resolvedTone}`;
  }

  get badgeTitle(): string {
    return this.isRecordingState() ? 'Recording in progress' : 'Meeting duration';
  }

  get ariaLabel(): string {
    return this.isRecordingState()
      ? `Recording in progress ${this.meetingProgressTime}`
      : `Meeting duration ${this.meetingProgressTime}`;
  }

  isRecordingState(): boolean {
    return this.resolvedTone === 'recording';
  }

  private get resolvedTone(): TimerTone {
    const normalizedColor = this.normalizeColor(this.initialBackgroundColor);

    if (normalizedColor === 'red') {
      return 'recording';
    }

    const elapsedSeconds = this.parseTimeInSeconds(this.meetingProgressTime);

    if (elapsedSeconds > 55 * 60) {
      return 'danger';
    }

    if (elapsedSeconds > 45 * 60) {
      return 'warning';
    }

    if (normalizedColor === 'yellow') {
      return 'warning';
    }

    return 'success';
  }

  private getAccentColor(): string {
    if (this.isCustomBackground() && this.resolvedTone === 'success') {
      return '#ffffff';
    }

    switch (this.resolvedTone) {
      case 'recording':
      case 'danger':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'success':
      default:
        return '#22c55e';
    }
  }

  private getResolvedBackground(): string {
    if (this.isCustomBackground() && this.resolvedTone === 'success') {
      return this.initialBackgroundColor;
    }

    return 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.86) 100%)';
  }

  private isCustomBackground(): boolean {
    return !!this.initialBackgroundColor && !this.normalizeColor(this.initialBackgroundColor);
  }

  private parseTimeInSeconds(value: string): number {
    const parts = value
      .split(':')
      .map((part) => Number(part))
      .filter((part) => Number.isFinite(part));

    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }

    return 0;
  }

  private normalizeColor(value?: string): string | null {
    if (!value) {
      return null;
    }

    const normalized = value.trim().toLowerCase();

    if (['red', '#ff0000', '#ef4444', 'rgb(255, 0, 0)'].includes(normalized)) {
      return 'red';
    }

    if (['yellow', '#ffff00', '#f59e0b', 'rgb(255, 255, 0)'].includes(normalized)) {
      return 'yellow';
    }

    if (['green', '#008000', '#22c55e', 'rgb(0, 128, 0)'].includes(normalized)) {
      return 'green';
    }

    return null;
  }

  private withAlpha(hexColor: string, alpha: number): string {
    const normalizedHex = hexColor.replace('#', '');
    const hex = normalizedHex.length === 3
      ? normalizedHex
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalizedHex;

    const red = Number.parseInt(hex.slice(0, 2), 16);
    const green = Number.parseInt(hex.slice(2, 4), 16);
    const blue = Number.parseInt(hex.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
}
