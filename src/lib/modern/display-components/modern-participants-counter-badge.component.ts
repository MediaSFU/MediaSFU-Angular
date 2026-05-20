import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export type ModernBadgePosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

@Component({
  selector: 'app-modern-participants-counter-badge',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div *ngIf="showBadge" class="ms-modern-participants-badge" [ngStyle]="containerStyle">
      <div
        class="ms-modern-participants-badge__pill"
        [class.ms-modern-participants-badge__pill--dark]="isDarkMode"
        [class.ms-modern-participants-badge__pill--light]="!isDarkMode"
        [ngStyle]="badgeStyle"
      >
        <fa-icon class="ms-modern-participants-badge__icon" [icon]="faUsers"></fa-icon>
        <span class="ms-modern-participants-badge__count">{{ participantsCount }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .ms-modern-participants-badge {
        position: absolute;
        z-index: 100;
        pointer-events: none;
      }

      .ms-modern-participants-badge__pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }

      .ms-modern-participants-badge__pill--dark {
        background: rgba(45, 52, 54, 0.85);
        color: #ffffff;
        box-shadow:
          0 4px 12px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.15);
      }

      .ms-modern-participants-badge__pill--light {
        background: rgba(255, 255, 255, 0.9);
        color: #1f2937;
        box-shadow:
          0 4px 12px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      .ms-modern-participants-badge__icon {
        font-size: 14px;
        opacity: 0.9;
      }

      .ms-modern-participants-badge__count {
        font-family: var(--ms-modern-font-family, 'Segoe UI', 'Aptos', 'Trebuchet MS', sans-serif);
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
    `,
  ],
})
export class ModernParticipantsCounterBadgeComponent {
  @Input() participantsCount = 0;
  @Input() position: ModernBadgePosition = 'bottomLeft';
  @Input() showBadge = true;
  @Input() backgroundColor?: string;
  @Input() textColor?: string;
  @Input() isDarkMode = true;
  @Input() customStyle: Record<string, string | number> = {};

  readonly faUsers = faUsers;

  get containerStyle(): Record<string, string | number> {
    const offset = 16;
    const positions: Record<ModernBadgePosition, Record<string, string | number>> = {
      topLeft: { top: `${offset}px`, left: `${offset}px` },
      topRight: { top: `${offset}px`, right: `${offset}px` },
      bottomLeft: { bottom: `${offset}px`, left: `${offset}px` },
      bottomRight: { bottom: `${offset}px`, right: `${offset}px` },
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