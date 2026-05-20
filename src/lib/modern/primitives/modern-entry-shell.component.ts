import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ModernSurfaceComponent } from './modern-surface.component';

@Component({
  selector: 'app-modern-entry-shell',
  imports: [CommonModule, ModernSurfaceComponent],
  styleUrls: ['../theme/modern-tokens.css'],
  template: `
    <div class="ms-modern-entry-shell">
      <div class="ms-modern-entry-shell__background"></div>

      <div
        class="ms-modern-entry-shell__content"
        [class.ms-modern-entry-shell__content--compact]="compact"
      >
        <app-modern-surface class="ms-modern-entry-shell__panel" tone="elevated">
          <div class="ms-modern-entry-shell__panel-content">
            <div class="ms-modern-entry-shell__header">
              <ng-content select="[msEntryEyebrow]"></ng-content>
              <ng-content select="[msEntryTitle]"></ng-content>
              <ng-content select="[msEntryDescription]"></ng-content>
            </div>

            <div class="ms-modern-entry-shell__body">
              <ng-content></ng-content>
            </div>

            <div class="ms-modern-entry-shell__footer">
              <ng-content select="[msEntryFooter]"></ng-content>
            </div>
          </div>
        </app-modern-surface>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .ms-modern-entry-shell {
        position: relative;
        width: 100%;
        min-height: 100vh;
        min-height: 100dvh;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        background:
          radial-gradient(circle at top left, rgba(20, 118, 210, 0.14), transparent 34%),
          radial-gradient(circle at bottom right, rgba(20, 125, 100, 0.12), transparent 30%),
          linear-gradient(180deg, var(--ms-modern-page-background), var(--ms-modern-page-background-accent));
      }

      .ms-modern-entry-shell__background {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(120, 143, 173, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(120, 143, 173, 0.08) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.8), transparent 85%);
      }

      .ms-modern-entry-shell__content {
        position: relative;
        z-index: 1;
        width: min(calc(100% - 48px), var(--ms-modern-onboarding-card-max-width));
        min-height: 100vh;
        min-height: 100dvh;
        margin: 0 auto;
        padding: clamp(24px, 5vh, 52px) 0;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }

      .ms-modern-entry-shell__content--compact {
        align-items: center;
      }

      .ms-modern-entry-shell__panel {
        width: min(100%, var(--ms-modern-onboarding-card-max-width));
      }

      .ms-modern-entry-shell__panel-content {
        padding: var(--ms-modern-spacing-xl);
      }

      .ms-modern-entry-shell__header,
      .ms-modern-entry-shell__body,
      .ms-modern-entry-shell__footer {
        display: flex;
        flex-direction: column;
      }

      .ms-modern-entry-shell__header {
        gap: var(--ms-modern-spacing-md);
        align-items: center;
        text-align: center;
        color: var(--ms-modern-text-primary);
        margin-bottom: var(--ms-modern-spacing-xl);
      }

      .ms-modern-entry-shell__body {
        gap: var(--ms-modern-spacing-lg);
      }

      .ms-modern-entry-shell__footer:empty {
        display: none;
      }

      @media (max-width: 640px) {
        .ms-modern-entry-shell__content {
          width: min(calc(100% - 28px), var(--ms-modern-onboarding-card-max-width));
          padding: 16px 0 24px;
        }

        .ms-modern-entry-shell__content--compact {
          align-items: center;
        }

        .ms-modern-entry-shell__panel-content {
          padding: var(--ms-modern-spacing-lg);
        }
      }

      @media (max-height: 900px) {
        .ms-modern-entry-shell__content {
          padding: 18px 0 28px;
        }

        .ms-modern-entry-shell__content--compact {
          align-items: center;
        }

        .ms-modern-entry-shell__panel-content {
          padding: var(--ms-modern-spacing-lg);
        }
      }
    `,
  ],
})
export class ModernEntryShellComponent {
  @Input() compact = false;
}