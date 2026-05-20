import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-control-icon-badge-widget',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="control-widget control-widget--modern">
      <span class="control-widget__icon-shell" [style.color]="iconColor">
        <fa-icon [icon]="icon" size="lg"></fa-icon>
      </span>
      <span
        *ngIf="shouldRenderBadge"
        class="control-widget__badge"
        [class.control-widget__badge--dot]="isDotBadge"
      >
        {{ isDotBadge ? '' : normalizedBadgeValue }}
      </span>
    </div>
  `,
  styles: [
    `
      .control-widget {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        line-height: 1;
        isolation: isolate;
      }

      .control-widget__icon-shell {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        height: 24px;
        filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.24));
      }

      .control-widget__badge {
        position: absolute;
        top: -7px;
        right: -10px;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #fb7185 0%, #ef4444 48%, #dc2626 100%);
        color: #ffffff;
        font-size: 10px;
        font-weight: 700;
        line-height: 1;
        letter-spacing: 0.02em;
        box-sizing: border-box;
        border: 1.5px solid rgba(255, 255, 255, 0.94);
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.28);
        pointer-events: none;
      }

      .control-widget__badge--dot {
        top: -3px;
        right: -3px;
        min-width: 10px;
        width: 10px;
        height: 10px;
        padding: 0;
        border-width: 2px;
        box-shadow:
          0 0 0 1px rgba(15, 23, 42, 0.16),
          0 6px 12px rgba(220, 38, 38, 0.3);
      }
    `,
  ],
})
export class ControlIconBadgeWidgetComponent {
  @Input() icon!: IconDefinition;
  @Input() iconColor = 'currentColor';
  @Input() badgeValue!: number | string;
  @Input() showBadge = false;

  get normalizedBadgeValue(): string {
    const rawValue = this.badgeValue == null ? '' : String(this.badgeValue).trim();

    if (!rawValue) {
      return '';
    }

    const numericValue = Number(rawValue);
    if (Number.isFinite(numericValue) && /^\d+$/.test(rawValue)) {
      return numericValue > 99 ? '99+' : rawValue;
    }

    return rawValue;
  }

  get isDotBadge(): boolean {
    return this.normalizedBadgeValue === '*' || this.normalizedBadgeValue === '•';
  }

  get shouldRenderBadge(): boolean {
    return this.showBadge && this.normalizedBadgeValue.length > 0;
  }
}