import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

import {
  type AlertPosition,
  type AlertTone,
} from '../../components/display-components/alert-component/alert.component.component';

export interface ModernAlertComponentOptions {
  visible: boolean;
  message: string;
  type: AlertTone;
  duration?: number;
  onHide?: () => void;
  textColor?: string;
  position?: AlertPosition;
  isDarkMode?: boolean;
  alertStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'app-modern-alert-component',
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="visible && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              visible,
              message,
              type: alertType,
              textColor,
              handlePress: handlePress.bind(this)
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="visible && !customTemplate"
      class="ms-modern-alert-shell"
      [class.ms-modern-alert-shell--dark]="resolvedIsDarkMode"
      [class.ms-modern-alert-shell--light]="!resolvedIsDarkMode"
      [ngStyle]="shellStyle"
    >
      <div
        (click)="handlePress()"
        class="ms-modern-alert-card"
        [class.ms-modern-alert-card--success]="alertType === 'success'"
        [class.ms-modern-alert-card--danger]="alertType === 'danger'"
        [class.ms-modern-alert-card--info]="alertType === 'info'"
        [class.ms-modern-alert-card--warning]="alertType === 'warning'"
        [ngStyle]="alertStyle"
        [attr.role]="alertRole"
        [attr.aria-live]="alertRole === 'alert' ? 'assertive' : 'polite'"
      >
        <div class="ms-modern-alert-accent" aria-hidden="true"></div>
        <div class="ms-modern-alert-icon" aria-hidden="true">{{ alertIcon }}</div>
        <div class="ms-modern-alert-copy">
          <p [ngStyle]="textColor ? { color: textColor } : null" class="ms-modern-alert-message">
            {{ message }}
          </p>
        </div>
        <button
          type="button"
          class="ms-modern-alert-close"
          aria-label="Dismiss notification"
          (click)="handlePress(); $event.stopPropagation()"
        >
          ×
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .ms-modern-alert-shell {
        display: flex;
        position: fixed;
        inset: 0;
        padding: 16px;
        pointer-events: none;
        z-index: 1100;
      }

      .ms-modern-alert-card {
        --alert-border: rgba(20, 125, 100, 0.24);
        --alert-glow: rgba(20, 125, 100, 0.16);
        --alert-icon-bg: rgba(20, 125, 100, 0.14);
        --alert-icon-color: var(--ms-modern-success, #147d64);
        --alert-accent: linear-gradient(180deg, var(--ms-modern-success, #147d64) 0%, rgba(56, 211, 159, 0.9) 100%);
        min-width: min(448px, calc(100vw - 32px));
        max-width: min(448px, calc(100vw - 32px));
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: 16px;
        align-items: center;
        padding: 18px 20px 18px 22px;
        border-radius: var(--ms-modern-radius-lg, 28px);
        border: 1px solid var(--alert-border);
        box-shadow: var(--ms-modern-shadow-panel, 0 24px 64px rgba(14, 30, 53, 0.16)), 0 0 32px var(--alert-glow);
        backdrop-filter: blur(22px);
        pointer-events: auto;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        animation: ms-modern-alert-enter var(--ms-modern-motion-base, 220ms) var(--ms-modern-motion-easing, cubic-bezier(0.22, 1, 0.36, 1));
      }

      .ms-modern-alert-shell--dark .ms-modern-alert-card {
        background: linear-gradient(
          135deg,
          rgba(15, 23, 42, 0.96) 0%,
          var(--ms-modern-panel-surface-elevated, rgba(15, 27, 49, 0.9)) 100%
        );
      }

      .ms-modern-alert-shell--light .ms-modern-alert-card {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.98) 0%,
          var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.92)) 100%
        );
      }

      .ms-modern-alert-card--danger {
        --alert-border: rgba(217, 72, 95, 0.28);
        --alert-glow: rgba(217, 72, 95, 0.14);
        --alert-icon-bg: rgba(217, 72, 95, 0.14);
        --alert-icon-color: var(--ms-modern-danger, #d9485f);
        --alert-accent: linear-gradient(180deg, var(--ms-modern-danger, #d9485f) 0%, rgba(248, 113, 113, 0.86) 100%);
      }

      .ms-modern-alert-card--info {
        --alert-border: rgba(15, 109, 181, 0.28);
        --alert-glow: rgba(15, 109, 181, 0.14);
        --alert-icon-bg: rgba(15, 109, 181, 0.14);
        --alert-icon-color: var(--ms-modern-info, #0f6db5);
        --alert-accent: linear-gradient(180deg, var(--ms-modern-info, #0f6db5) 0%, rgba(100, 182, 255, 0.86) 100%);
      }

      .ms-modern-alert-card--warning {
        --alert-border: rgba(183, 121, 31, 0.28);
        --alert-glow: rgba(183, 121, 31, 0.14);
        --alert-icon-bg: rgba(183, 121, 31, 0.14);
        --alert-icon-color: var(--ms-modern-warning, #b7791f);
        --alert-accent: linear-gradient(180deg, var(--ms-modern-warning, #b7791f) 0%, rgba(247, 191, 77, 0.88) 100%);
      }

      .ms-modern-alert-accent {
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: 8px;
        width: 4px;
        border-radius: var(--ms-modern-radius-pill, 999px);
        background: var(--alert-accent);
      }

      .ms-modern-alert-icon {
        width: 42px;
        height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 1rem;
        font-weight: 800;
        background: var(--alert-icon-bg);
        color: var(--alert-icon-color);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
      }

      .ms-modern-alert-copy {
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .ms-modern-alert-shell--dark .ms-modern-alert-close {
        color: var(--ms-modern-text-primary, #f8fafc);
      }

      .ms-modern-alert-shell--light .ms-modern-alert-close {
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-alert-message {
        margin: 0;
        font-size: var(--ms-modern-font-body, 0.98rem);
        line-height: 1.5;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
      }

      .ms-modern-alert-shell--dark .ms-modern-alert-message {
        color: var(--ms-modern-text-primary, #f8fafc);
      }

      .ms-modern-alert-shell--light .ms-modern-alert-message {
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-alert-close {
        width: 34px;
        height: 34px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        border-radius: 50%;
        background: transparent;
        font-size: 1.1rem;
        cursor: pointer;
        transition:
          transform var(--ms-modern-motion-fast, 160ms) ease,
          background-color var(--ms-modern-motion-fast, 160ms) ease,
          border-color var(--ms-modern-motion-fast, 160ms) ease;
      }

      .ms-modern-alert-shell--dark .ms-modern-alert-close {
        background: rgba(255, 255, 255, 0.05);
      }

      .ms-modern-alert-shell--light .ms-modern-alert-close {
        background: rgba(255, 255, 255, 0.58);
      }

      .ms-modern-alert-close:hover {
        transform: translateY(-1px);
      }

      .ms-modern-alert-shell--dark .ms-modern-alert-close:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(148, 163, 184, 0.28);
      }

      .ms-modern-alert-shell--light .ms-modern-alert-close:hover {
        background: rgba(255, 255, 255, 0.8);
        border-color: rgba(148, 163, 184, 0.3);
      }

      @keyframes ms-modern-alert-enter {
        from {
          opacity: 0;
          transform: translateY(-10px) scale(0.98);
        }

        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @media (max-width: 640px) {
        .ms-modern-alert-shell {
          padding: 12px;
        }

        .ms-modern-alert-card {
          min-width: min(100vw - 24px, 100%);
          max-width: min(100vw - 24px, 100%);
          gap: 14px;
          padding: 16px 18px 16px 20px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ms-modern-alert-card,
        .ms-modern-alert-close {
          animation: none;
          transition: none;
        }
      }
    `,
  ],
})
export class ModernAlertComponent implements OnChanges, OnDestroy {
  @Input() visible = false;
  @Input() message = '';
  @Input() type: AlertTone = 'success';
  @Input() duration = 4000;
  @Input() textColor = '';
  @Input() position: AlertPosition = 'top';
  @Input() isDarkMode?: boolean;
  @Input() onHide?: () => void;
  @Input() alertStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  alertType: AlertTone = 'success';

  private hideTimeout?: ReturnType<typeof setTimeout>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.alertType = this.type;
    }

    if (changes['visible']) {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = undefined;
      }

      if (this.visible) {
        this.hideTimeout = setTimeout(() => {
          this.onHide?.();
          this.hideTimeout = undefined;
        }, this.duration);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  handlePress(): void {
    this.onHide?.();
  }

  get alertLabel(): string {
    switch (this.alertType) {
      case 'danger':
        return 'Attention';
      case 'info':
        return 'Update';
      case 'warning':
        return 'Warning';
      default:
        return 'Success';
    }
  }

  get alertMeta(): string {
    switch (this.alertType) {
      case 'danger':
        return 'Action needed';
      case 'info':
        return 'Room update';
      case 'warning':
        return 'Review needed';
      default:
        return 'Completed';
    }
  }

  get alertIcon(): string {
    switch (this.alertType) {
      case 'danger':
        return '!';
      case 'info':
        return 'i';
      case 'warning':
        return '!';
      default:
        return '✓';
    }
  }

  get alertRole(): 'alert' | 'status' {
    return this.alertType === 'danger' || this.alertType === 'warning' ? 'alert' : 'status';
  }

  get shellStyle(): Record<string, string> {
    const positionStyles: Record<AlertPosition, { justifyContent: string; alignItems: string }> = {
      top: { justifyContent: 'center', alignItems: 'flex-start' },
      bottom: { justifyContent: 'center', alignItems: 'flex-end' },
      'top-right': { justifyContent: 'flex-end', alignItems: 'flex-start' },
      'top-left': { justifyContent: 'flex-start', alignItems: 'flex-start' },
      'bottom-right': { justifyContent: 'flex-end', alignItems: 'flex-end' },
      'bottom-left': { justifyContent: 'flex-start', alignItems: 'flex-end' },
      center: { justifyContent: 'center', alignItems: 'center' },
    };

    return positionStyles[this.position] || positionStyles.top;
  }

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }
}