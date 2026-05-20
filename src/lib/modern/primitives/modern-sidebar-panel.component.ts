import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modern-sidebar-panel',
  imports: [CommonModule, FontAwesomeModule],
  host: {
    '[style.width.px]': 'visible ? width : 0',
    '[style.flex]': "visible ? '0 0 ' + width + 'px' : '0 0 0px'",
    '[style.height.px]': 'height',
    '[style.pointer-events]': "visible ? 'auto' : 'none'",
  },
  template: `
    <div
      class="ms-modern-sidebar-panel__rail"
    >
      <section *ngIf="visible" class="ms-modern-sidebar-panel">
        <header class="ms-modern-sidebar-panel__header">
          <div *ngIf="canNavigateBack; else titleHeader" class="ms-modern-sidebar-panel__header-main">
            <button
              type="button"
              class="ms-modern-sidebar-panel__back-button"
              (click)="navigateBack.emit()"
              [attr.aria-label]="backLabel"
            >
              <fa-icon [icon]="faArrowLeft"></fa-icon>
              <span>{{ backLabel }}</span>
            </button>
          </div>

          <ng-template #titleHeader>
            <div class="ms-modern-sidebar-panel__header-main">
            <h2 class="ms-modern-sidebar-panel__title">{{ title }}</h2>

            <span *ngIf="badgeText !== null && badgeText !== undefined" class="ms-modern-sidebar-panel__badge">
              {{ badgeText }}
            </span>
            </div>
          </ng-template>

          <button
            type="button"
            class="ms-modern-sidebar-panel__icon-button"
            (click)="close.emit()"
            aria-label="Close sidebar"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div #contentContainer class="ms-modern-sidebar-panel__content">
          <ng-content></ng-content>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
        contain: layout paint;
        transition:
          width 220ms cubic-bezier(0.22, 1, 0.36, 1),
          flex-basis 220ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      .ms-modern-sidebar-panel__rail {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .ms-modern-sidebar-panel {
        box-sizing: border-box;
        height: 100%;
        display: flex;
        flex-direction: column;
        color: var(--ms-modern-text-primary, #e2e8f0);
        background:
          linear-gradient(180deg, rgba(20, 118, 210, 0.08), rgba(255, 255, 255, 0)),
          var(--ms-modern-panel-surface-elevated, rgba(15, 27, 49, 0.9));
        border-left: 1px solid var(--ms-modern-border-strong, rgba(59, 130, 246, 0.22));
        border-radius: 0;
        box-shadow: -18px 0 42px rgba(14, 30, 53, 0.14);
        backdrop-filter: blur(18px);
        overflow: hidden;
      }

      .ms-modern-sidebar-panel__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        min-height: 64px;
        padding: 14px 18px 12px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.18));
      }

      .ms-modern-sidebar-panel__header-main {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .ms-modern-sidebar-panel__title {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.96rem;
        font-weight: 800;
        line-height: 1.2;
      }

      .ms-modern-sidebar-panel__badge {
        min-width: 28px;
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 9px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--ms-modern-accent) 18%, transparent);
        border: 1px solid color-mix(in srgb, var(--ms-modern-accent) 24%, transparent);
        color: var(--ms-modern-text-primary, #e2e8f0);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.72rem;
        font-weight: 700;
      }

      .ms-modern-sidebar-panel__icon-button {
        flex: 0 0 auto;
        width: 36px;
        height: 36px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.18));
        background: color-mix(in srgb, var(--ms-modern-panel-surface) 84%, transparent);
        color: var(--ms-modern-text-secondary, rgba(226, 232, 240, 0.78));
        cursor: pointer;
        transition:
          border-color var(--ms-modern-motion-fast, 160ms) ease,
          background-color var(--ms-modern-motion-fast, 160ms) ease,
          color var(--ms-modern-motion-fast, 160ms) ease;
      }

      .ms-modern-sidebar-panel__icon-button:hover {
        border-color: var(--ms-modern-border-strong, rgba(59, 130, 246, 0.28));
        background: color-mix(in srgb, var(--ms-modern-accent) 12%, transparent);
        color: var(--ms-modern-text-primary, #e2e8f0);
      }

      .ms-modern-sidebar-panel__back-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 34px;
        padding: 6px 10px;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: #22c55e;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.88rem;
        font-weight: 600;
        cursor: pointer;
        transition:
          background-color var(--ms-modern-motion-fast, 160ms) ease,
          color var(--ms-modern-motion-fast, 160ms) ease;
      }

      .ms-modern-sidebar-panel__back-button:hover {
        background: color-mix(in srgb, var(--ms-modern-accent) 10%, transparent);
      }

      .ms-modern-sidebar-panel__content {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 16px 18px 18px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
    `,
  ],
})
export class ModernSidebarPanelComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() visible = false;
  @Input() width = 0;
  @Input() height = 0;
  @Input() title = '';
  @Input() badgeText: string | number | null = null;
  @Input() backLabel = 'Back';
  @Input() canNavigateBack = false;
  @Input() contentKey = '';

  @Output() navigateBack = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('contentContainer') private contentContainer?: ElementRef<HTMLDivElement>;

  private scrollResetTimer: number | null = null;

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faTimes = faTimes;

  ngAfterViewInit() {
    this.scheduleScrollReset();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] || changes['contentKey']) {
      this.scheduleScrollReset();
    }
  }

  ngOnDestroy() {
    if (this.scrollResetTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.scrollResetTimer);
      this.scrollResetTimer = null;
    }
  }

  private scheduleScrollReset() {
    if (!this.visible || typeof window === 'undefined') {
      return;
    }

    if (this.scrollResetTimer !== null) {
      window.clearTimeout(this.scrollResetTimer);
    }

    this.scrollResetTimer = window.setTimeout(() => {
      this.scrollResetTimer = null;

      if (this.contentContainer?.nativeElement) {
        this.contentContainer.nativeElement.scrollTop = 0;
      }
    }, 0);
  }
}