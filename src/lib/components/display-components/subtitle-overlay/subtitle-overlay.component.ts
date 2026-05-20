import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="subtitle" class="subtitle-overlay">
      <div class="subtitle-overlay__shell">
        <span class="subtitle-overlay__text">{{ subtitle }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .subtitle-overlay {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 12px;
        display: flex;
        justify-content: center;
        z-index: 3;
        pointer-events: none;
      }

      .subtitle-overlay__shell {
        max-width: 90%;
        padding: 8px 12px;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px;
      }

      .subtitle-overlay__text {
        color: #ffffff;
        font-size: 13px;
        font-weight: 500;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        text-align: center;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    `,
  ],
})
export class SubtitleOverlayComponent {
  @Input() subtitle: string | null = null;
}