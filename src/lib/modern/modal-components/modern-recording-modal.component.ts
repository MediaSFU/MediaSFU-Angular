import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faCog, faPlay, faTimes, faVideo } from '@fortawesome/free-solid-svg-icons';

import {
  ConfirmRecordingOptions,
  StartRecordingOptions,
} from '../../@types/types';
import { AdvancedPanelComponent } from '../../components/recording-components/advanced-panel-component/advanced-panel-components.component';
import {
  RecordingModalParameters,
} from '../../components/recording-components/recording-modal/recording-modal.component';
import { StandardPanelComponent } from '../../components/recording-components/standard-panel-component/standard-panel-component.component';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

type RecordingDisplayAdviceParameters = {
  meetingDisplayType?: string;
  breakOutRoomStarted?: boolean;
  breakOutRoomEnded?: boolean;
  recordingVideoParticipantsFullRoomSupport?: boolean;
  recordingVideoOptions?: string;
  recordingMediaOptions?: string;
};

const getRecordingDisplayAdvice = (parameters?: RecordingDisplayAdviceParameters) => {
  if (!parameters) {
    return null;
  }

  const normalizedRecordingMediaOptions =
    parameters.recordingMediaOptions === 'all' ? 'video' : parameters.recordingMediaOptions;

  if (
    !parameters.recordingVideoParticipantsFullRoomSupport &&
    parameters.recordingVideoOptions === 'all' &&
    normalizedRecordingMediaOptions === 'video' &&
    parameters.meetingDisplayType === 'all' &&
    !(parameters.breakOutRoomStarted && !parameters.breakOutRoomEnded)
  ) {
    return 'Meeting display is set to All, so this recording may be blocked. To fix it, go back to the main menu, open Display, choose Media, then return here and confirm.';
  }

  return null;
};

@Component({
  selector: 'app-recording-modal',
  imports: [CommonModule, FontAwesomeModule, StandardPanelComponent, AdvancedPanelComponent],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isRecordingModalVisible: isRecordingModalVisible,
              backgroundColor: backgroundColor,
              parameters: resolvedParameters,
              onClose: onClose,
              confirm: confirm.bind(this),
              start: start.bind(this)
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-recording-overlay"
      [ngStyle]="resolvedOverlayStyle()"
    >
      <section class="ms-modern-recording" [ngStyle]="resolvedContentStyle()">
        <header *ngIf="showHeader" class="ms-modern-recording__header">
          <div class="ms-modern-recording__heading">
            <span class="ms-modern-recording__eyebrow">Capture controls</span>
            <h2 class="ms-modern-recording__title">Recording Settings</h2>
            <p class="ms-modern-recording__subtitle">
              Configure your layout, overlays, and output options before you start or confirm recording.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-recording__close"
            aria-label="Close recording settings"
            (click)="onClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div
          class="ms-modern-recording__body"
          [class.ms-modern-recording__body--embedded]="isEmbedded()"
        >
          <div
            *ngIf="isEmbedded()"
            class="ms-modern-recording__tabs"
            role="tablist"
            aria-label="Recording settings panels"
          >
            <button
              type="button"
              class="ms-modern-recording__tab"
              [class.ms-modern-recording__tab--active]="activePanel === 'standard'"
              [attr.aria-selected]="activePanel === 'standard'"
              (click)="activePanel = 'standard'"
            >
              <fa-icon [icon]="faVideo"></fa-icon>
              <span>Standard</span>
            </button>

            <button
              type="button"
              class="ms-modern-recording__tab"
              [class.ms-modern-recording__tab--active]="activePanel === 'advanced'"
              [attr.aria-selected]="activePanel === 'advanced'"
              (click)="activePanel = 'advanced'"
            >
              <fa-icon [icon]="faCog"></fa-icon>
              <span>Advanced</span>
            </button>
          </div>

          <ng-container *ngIf="isEmbedded(); else modalRecordingPanels">
            <section class="ms-modern-recording__panel-shell ms-modern-recording__panel-shell--embedded">
              <app-standard-panel-component
                *ngIf="activePanel === 'standard'"
                [parameters]="resolvedParameters"
              ></app-standard-panel-component>

              <app-advanced-panel-component
                *ngIf="activePanel === 'advanced'"
                [parameters]="resolvedParameters"
              ></app-advanced-panel-component>
            </section>
          </ng-container>

          <ng-template #modalRecordingPanels>
            <section class="ms-modern-recording__panel-shell">
              <app-standard-panel-component
                [parameters]="resolvedParameters"
              ></app-standard-panel-component>
            </section>

            <section class="ms-modern-recording__panel-shell">
              <app-advanced-panel-component
                [parameters]="resolvedParameters"
              ></app-advanced-panel-component>
            </section>
          </ng-template>
        </div>

        <footer class="ms-modern-recording__footer">
          <div
            *ngIf="recordingDisplayAdvice as advice"
            class="ms-modern-recording__advice"
          >
            <span class="ms-modern-recording__advice-label">Fix before confirming</span>
            <span>{{ advice }}</span>
          </div>
          <button
            type="button"
            class="ms-modern-recording__action ms-modern-recording__action--confirm"
            (click)="confirm()"
          >
            <fa-icon [icon]="faCheck"></fa-icon>
            Confirm
          </button>

          <button
            *ngIf="!resolvedParameters.recordPaused"
            type="button"
            class="ms-modern-recording__action ms-modern-recording__action--start"
            (click)="start()"
          >
            <fa-icon [icon]="faPlay"></fa-icon>
            Start
          </button>
        </footer>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-recording-overlay {
        position: fixed;
        inset: 0;
        background: rgba(2, 8, 23, 0.66);
        backdrop-filter: blur(10px);
        z-index: 999;
      }

      .ms-modern-recording {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 28px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: linear-gradient(
          180deg,
          var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96)) 0%,
          var(--ms-modern-panel-surface, rgba(248, 250, 252, 0.95)) 100%
        );
        box-shadow: 0 28px 70px rgba(15, 23, 42, 0.28);
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-recording * {
        box-sizing: border-box;
      }

      .ms-modern-recording__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 16px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
      }

      .ms-modern-recording__eyebrow {
        display: block;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-recording__title {
        margin: 6px 0 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.34rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .ms-modern-recording__subtitle {
        margin: 8px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .ms-modern-recording__close {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-recording__body {
        display: grid;
        gap: 16px;
        padding: 18px 22px;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .ms-modern-recording__body--embedded {
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;
      }

      .ms-modern-recording__tabs {
        display: flex;
        gap: 6px;
        padding: 3px;
        border-radius: 16px;
        background: rgba(15, 23, 42, 0.08);
      }

      .ms-modern-recording__tab {
        flex: 1;
        min-height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: none;
        border-radius: 13px;
        background: transparent;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.84rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 160ms ease, color 160ms ease, box-shadow 160ms ease;
      }

      .ms-modern-recording__tab--active {
        background: rgba(255, 255, 255, 0.88);
        color: var(--ms-modern-text-primary, #10233f);
        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.12);
      }

      .ms-modern-recording__panel-shell {
        border-radius: 22px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.72);
        padding: 14px;
      }

      .ms-modern-recording__panel-shell--embedded {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .ms-modern-recording__footer {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        padding: 0 22px 22px;
      }

      .ms-modern-recording__advice {
        display: grid;
        gap: 4px;
        grid-column: 1 / -1;
        padding: 12px 14px;
        border-radius: 16px;
        border: 1px solid rgba(245, 158, 11, 0.28);
        background: rgba(245, 158, 11, 0.14);
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        font-weight: 600;
        line-height: 1.5;
      }

      .ms-modern-recording__advice-label {
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #b45309;
      }

      .ms-modern-recording__action {
        min-height: 46px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 999px;
        padding: 0 16px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 700;
        cursor: pointer;
      }

      .ms-modern-recording__action--confirm {
        border: none;
        background: linear-gradient(135deg, #14b8a6 0%, #22c55e 100%);
        color: #fff;
      }

      .ms-modern-recording__action--start {
        border: none;
        background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
        color: #fff;
      }

      :host-context(.ms-modern-dark),
      :host-context([data-theme='dark']) {
        .ms-modern-recording__tabs {
          background: rgba(255, 255, 255, 0.08);
        }

        .ms-modern-recording__tab {
          color: rgba(226, 232, 240, 0.72);
        }

        .ms-modern-recording__tab--active {
          background: rgba(255, 255, 255, 0.12);
          color: #f8fafc;
          box-shadow: 0 1px 4px rgba(2, 8, 23, 0.28);
        }

        .ms-modern-recording__advice-label {
          color: #fbbf24;
        }
      }

      @media (max-width: 640px) {
        .ms-modern-recording__footer {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ModernRecordingModalComponent implements OnChanges {
  @Input() isRecordingModalVisible = false;
  @Input() onClose: () => void = () => {};
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';
  @Input() position = 'bottomRight';
  @Input() confirmRecording: (options: ConfirmRecordingOptions) => void = () => {};
  @Input() startRecording: (options: StartRecordingOptions) => void = () => {};
  @Input() parameters: RecordingModalParameters = {} as RecordingModalParameters;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  readonly faCheck = faCheck;
  readonly faCog = faCog;
  readonly faPlay = faPlay;
  readonly faTimes = faTimes;
  readonly faVideo = faVideo;

  resolvedParameters: RecordingModalParameters = {} as RecordingModalParameters;
  activePanel: 'standard' | 'advanced' = 'standard';

  get recordingDisplayAdvice(): string | null {
    return getRecordingDisplayAdvice(this.resolvedParameters);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.isVisible() &&
      (changes['isRecordingModalVisible'] || changes['parameters'])
    ) {
      if (changes['isRecordingModalVisible']) {
        this.activePanel = 'standard';
      }

      this.refreshParameters();
    }
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isRecordingModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  confirm() {
    this.confirmRecording({
      parameters: { ...this.resolvedParameters },
    });
  }

  start() {
    this.startRecording({
      parameters: { ...this.resolvedParameters },
    });
  }

  resolvedOverlayStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'static',
          inset: 'auto',
          width: '100%',
          height: '100%',
          minHeight: 0,
          background: 'transparent',
          zIndex: 'auto',
        }
      : {
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(2, 8, 23, 0.66)',
          zIndex: 999,
        };

    return { ...baseStyle, ...this.normalizeStyle(this.overlayStyle) };
  }

  resolvedContentStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'relative',
          inset: 'auto',
          width: '100%',
          maxWidth: 'none',
          height: '100%',
          maxHeight: 'none',
          margin: 0,
          overflowY: 'auto',
          background: this.backgroundColor,
        }
      : (() => {
          const screenWidth = window.innerWidth;
          let modalWidth = 0.84 * screenWidth;
          if (modalWidth > 420) {
            modalWidth = 420;
          }

          return {
            position: 'fixed',
            width: `${modalWidth}px`,
            maxHeight: 'min(86vh, 900px)',
            overflowY: 'auto',
            background: this.backgroundColor,
            ...this.resolvePositionStyle(),
          };
        })();

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private refreshParameters() {
    this.resolvedParameters = this.parameters?.getUpdatedAllParams
      ? this.parameters.getUpdatedAllParams()
      : this.parameters;
  }

  private resolvePositionStyle(): Record<string, string> {
    const normalizedPosition = this.position.toLowerCase();

    if (normalizedPosition.includes('center')) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    return {
      top: this.position.includes('top') ? '16px' : 'auto',
      bottom: this.position.includes('bottom') ? '16px' : 'auto',
      left: this.position.includes('Left') ? '16px' : 'auto',
      right: this.position.includes('Right') ? '16px' : 'auto',
    };
  }

  private normalizeStyle(style?: Partial<CSSStyleDeclaration>): Record<string, string | number> {
    return style ? ({ ...style } as Record<string, string | number>) : {};
  }
}