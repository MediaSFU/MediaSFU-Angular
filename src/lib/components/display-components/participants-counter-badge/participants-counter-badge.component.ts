import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export type BadgePosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

@Component({
  selector: 'app-participants-counter-badge',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div *ngIf="showBadge" class="participants-badge" [ngStyle]="containerStyle">
      <div
        class="participants-badge__pill"
        [class.participants-badge__pill--dark]="isDarkMode"
        [class.participants-badge__pill--light]="!isDarkMode"
        [ngStyle]="badgeStyle"
      >
        <fa-icon class="participants-badge__icon" [icon]="faUsers"></fa-icon>
        <span class="participants-badge__count">{{ participantsCount }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .participants-badge {
        position: absolute;
        z-index: 4;
        pointer-events: none;
      }

      .participants-badge__pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow:
          0 14px 28px rgba(15, 23, 42, 0.18),
          inset 0 1px 0 rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.12);
      }

      .participants-badge__pill--dark {
        background: rgba(15, 23, 42, 0.78);
        color: #ffffff;
      }

      .participants-badge__pill--light {
        background: rgba(255, 255, 255, 0.9);
        color: #0f172a;
        border-color: rgba(15, 23, 42, 0.08);
        box-shadow:
          0 14px 28px rgba(148, 163, 184, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.5);
      }

      .participants-badge__icon {
        font-size: 0.88rem;
        opacity: 0.9;
      }

      .participants-badge__count {
        font-family: var(--ms-modern-font-family, 'Segoe UI', 'Aptos', 'Trebuchet MS', sans-serif);
        font-size: 0.88rem;
        font-weight: 700;
        letter-spacing: 0.04em;
      }
    `,
  ],
})
export class ParticipantsCounterBadgeComponent {
  @Input() participantsCount = 0;
  @Input() position: BadgePosition = 'bottomLeft';
  @Input() showBadge = true;
  @Input() backgroundColor?: string;
  @Input() textColor?: string;
  @Input() isDarkMode = true;
  @Input() customStyle: Record<string, string | number> = {};

  readonly faUsers = faUsers;

  get containerStyle(): Record<string, string | number> {
    const offset = 16;
    const positions: Record<BadgePosition, Record<string, string | number>> = {
      topLeft: { top: offset, left: offset },
      topRight: { top: offset, right: offset },
      bottomLeft: { bottom: offset, left: offset },
      bottomRight: { bottom: offset, right: offset },
    };

    return {
      ...positions[this.position],
      ...this.customStyle,
    };
  }

  get badgeStyle(): Record<string, string> {
    const style: Record<string, string> = {};

    if (this.backgroundColor) {
      style['background'] = this.backgroundColor;
    }

    if (this.textColor) {
      style['color'] = this.textColor;
    }

    return style;
  }
}