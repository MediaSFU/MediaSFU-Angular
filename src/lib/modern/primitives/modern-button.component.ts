import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modern-button',
  imports: [CommonModule],
  template: `
    <button
      class="ms-modern-button"
      [class.ms-modern-button--primary]="variant === 'primary'"
      [class.ms-modern-button--secondary]="variant === 'secondary'"
      [class.ms-modern-button--ghost]="variant === 'ghost'"
      [class.ms-modern-button--md]="size === 'md'"
      [class.ms-modern-button--lg]="size === 'lg'"
      [class.ms-modern-button--block]="block"
      [type]="type"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      :host(.ms-modern-button-host--block) {
        display: flex;
      }

      .ms-modern-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ms-modern-spacing-sm);
        border-radius: var(--ms-modern-radius-pill);
        border: 1px solid transparent;
        font-family: var(--ms-modern-font-family);
        font-size: var(--ms-modern-font-body);
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
        transition:
          transform var(--ms-modern-motion-fast) var(--ms-modern-motion-easing),
          background var(--ms-modern-motion-base) var(--ms-modern-motion-easing),
          border-color var(--ms-modern-motion-base) var(--ms-modern-motion-easing),
          box-shadow var(--ms-modern-motion-base) var(--ms-modern-motion-easing);
      }

      .ms-modern-button:hover:not(:disabled) {
        transform: translateY(-1px);
      }

      .ms-modern-button:focus-visible {
        outline: none;
        box-shadow: var(--ms-modern-focus-ring);
      }

      .ms-modern-button:disabled {
        opacity: 0.62;
        cursor: not-allowed;
      }

      .ms-modern-button--primary {
        color: #ffffff;
        background: linear-gradient(135deg, var(--ms-modern-accent), var(--ms-modern-accent-strong));
        box-shadow: 0 14px 30px rgba(20, 118, 210, 0.24);
      }

      .ms-modern-button--secondary {
        color: var(--ms-modern-text-primary);
        background: color-mix(in srgb, var(--ms-modern-accent) 10%, transparent);
        border-color: color-mix(in srgb, var(--ms-modern-accent) 22%, transparent);
      }

      .ms-modern-button--ghost {
        color: var(--ms-modern-text-secondary);
        background: color-mix(in srgb, var(--ms-modern-panel-surface) 68%, transparent);
        border-color: var(--ms-modern-border-subtle);
      }

      .ms-modern-button--md {
        min-height: 46px;
        padding: 0 20px;
      }

      .ms-modern-button--lg {
        min-height: 54px;
        padding: 0 24px;
      }

      .ms-modern-button--block {
        width: 100%;
      }
    `,
  ],
})
export class ModernButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() size: 'md' | 'lg' = 'md';
  @Input() block = false;
  @Input() disabled = false;
}