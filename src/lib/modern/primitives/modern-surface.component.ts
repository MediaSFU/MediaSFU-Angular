import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modern-surface',
  imports: [CommonModule],
  template: `
    <div
      class="ms-modern-surface"
      [class.ms-modern-surface--elevated]="tone === 'elevated'"
      [class.ms-modern-surface--interactive]="interactive"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .ms-modern-surface {
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0)),
          var(--ms-modern-panel-surface);
        border: 1px solid var(--ms-modern-border-subtle);
        border-radius: var(--ms-modern-radius-lg);
        box-shadow: var(--ms-modern-shadow-panel);
        backdrop-filter: blur(18px);
      }

      .ms-modern-surface--elevated {
        background:
          linear-gradient(180deg, rgba(20, 118, 210, 0.08), rgba(255, 255, 255, 0)),
          var(--ms-modern-panel-surface-elevated);
        border-color: var(--ms-modern-border-strong);
      }

      .ms-modern-surface--interactive {
        transition:
          transform var(--ms-modern-motion-base) var(--ms-modern-motion-easing),
          border-color var(--ms-modern-motion-base) var(--ms-modern-motion-easing),
          box-shadow var(--ms-modern-motion-base) var(--ms-modern-motion-easing);
      }

      .ms-modern-surface--interactive:hover {
        transform: translateY(-2px);
      }
    `,
  ],
})
export class ModernSurfaceComponent {
  @Input() tone: 'base' | 'elevated' = 'base';
  @Input() interactive = false;
}