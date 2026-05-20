import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faDisplay,
  faExpand,
  faGaugeHigh,
  faTimes,
  faVideo,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons';

import {
  ModifyDisplaySettings,
  ModifyDisplaySettingsOptions,
  ModifyDisplaySettingsParameters,
} from '../../methods/display-settings-methods/modify-display-settings.service';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

export interface ModernDisplaySettingsModalParameters extends ModifyDisplaySettingsParameters {
  meetingDisplayType: string;
  autoWave: boolean;
  forceFullDisplay: boolean;
  meetingVideoOptimized: boolean;
  showSubtitlesOnCards?: boolean;
}

@Component({
  selector: 'app-display-settings-modal',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              meetingDisplayType: meetingDisplayTypeState,
              autoWave: autoWaveState,
              forceFullDisplay: forceFullDisplayState,
              showSubtitlesOnCards: showSubtitlesOnCardsState,
              meetingVideoOptimized: meetingVideoOptimizedState,
              onSave: handleSaveSettings.bind(this),
              onClose: onDisplaySettingsClose
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-display-settings-overlay"
      [class.ms-modern-display-settings-overlay--embedded]="isEmbedded()"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleOverlayClick()"
    >
      <section
        class="ms-modern-display-settings"
        [class.ms-modern-display-settings--embedded]="isEmbedded()"
        [ngStyle]="resolvedContentStyle()"
        [style.--ms-local-accent]="resolvedAccentColor()"
        (click)="$event.stopPropagation()"
      >
        <header *ngIf="showHeader" class="ms-modern-display-settings__header">
          <div>
            <p class="ms-modern-display-settings__eyebrow">Room Layout</p>
            <h2 class="ms-modern-display-settings__title">Display Settings</h2>
          </div>
          <button
            type="button"
            class="ms-modern-display-settings__close"
            aria-label="Close display settings"
            (click)="onDisplaySettingsClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-display-settings__content">
          <section class="ms-modern-display-settings__section">
            <label class="ms-modern-display-settings__section-label">Display Type</label>
            <div
              class="ms-modern-display-settings__option-grid"
              [class.ms-modern-display-settings__option-grid--embedded]="isEmbedded()"
            >
              <button
                *ngFor="let option of displayOptions"
                type="button"
                class="ms-modern-display-settings__option"
                [class.ms-modern-display-settings__option--embedded]="isEmbedded()"
                [class.is-active]="meetingDisplayTypeState === option.value"
                [attr.aria-pressed]="meetingDisplayTypeState === option.value"
                (click)="meetingDisplayTypeState = option.value"
              >
                <span
                  *ngIf="isEmbedded() && meetingDisplayTypeState === option.value"
                  class="ms-modern-display-settings__option-active"
                >
                  <fa-icon [icon]="faCheck"></fa-icon>
                  <span>Active</span>
                </span>
                <fa-icon
                  *ngIf="isEmbedded()"
                  class="ms-modern-display-settings__option-icon"
                  [icon]="option.icon"
                ></fa-icon>
                <span class="ms-modern-display-settings__option-title">{{ option.label }}</span>
                <span *ngIf="!isEmbedded()" class="ms-modern-display-settings__option-copy">
                  {{ option.description }}
                </span>
              </button>
            </div>
          </section>

          <section class="ms-modern-display-settings__section">
            <label class="ms-modern-display-settings__section-label">Display Options</label>

            <button
              type="button"
              class="ms-modern-display-settings__toggle-row"
              [class.ms-modern-display-settings__toggle-row--embedded]="isEmbedded()"
              (click)="autoWaveState = !autoWaveState"
            >
              <span>
                <span class="ms-modern-display-settings__toggle-heading">
                  <fa-icon *ngIf="isEmbedded()" [icon]="faWaveSquare"></fa-icon>
                  <span class="ms-modern-display-settings__toggle-label">Audio Visualization</span>
                </span>
                <span *ngIf="!isEmbedded()" class="ms-modern-display-settings__toggle-copy">
                  Show audiograph activity across participant cards.
                </span>
              </span>
              <span class="ms-modern-display-settings__switch" [class.is-on]="autoWaveState">
                <span class="ms-modern-display-settings__switch-knob"></span>
              </span>
            </button>

            <button
              type="button"
              class="ms-modern-display-settings__toggle-row"
              [class.ms-modern-display-settings__toggle-row--embedded]="isEmbedded()"
              (click)="forceFullDisplayState = !forceFullDisplayState"
            >
              <span>
                <span class="ms-modern-display-settings__toggle-heading">
                  <fa-icon *ngIf="isEmbedded()" [icon]="faExpand"></fa-icon>
                  <span class="ms-modern-display-settings__toggle-label">Force Full Display</span>
                </span>
                <span *ngIf="!isEmbedded()" class="ms-modern-display-settings__toggle-copy">
                  Keep all participants visible instead of following the active speaker.
                </span>
              </span>
              <span class="ms-modern-display-settings__switch" [class.is-on]="forceFullDisplayState">
                <span class="ms-modern-display-settings__switch-knob"></span>
              </span>
            </button>

            <button
              type="button"
              class="ms-modern-display-settings__toggle-row"
              [class.ms-modern-display-settings__toggle-row--embedded]="isEmbedded()"
              (click)="meetingVideoOptimizedState = !meetingVideoOptimizedState"
            >
              <span>
                <span class="ms-modern-display-settings__toggle-heading">
                  <fa-icon *ngIf="isEmbedded()" [icon]="faGaugeHigh"></fa-icon>
                  <span class="ms-modern-display-settings__toggle-label">
                    {{ isEmbedded() ? 'Video Optimization' : 'Prioritize Video Participants' }}
                  </span>
                </span>
                <span *ngIf="!isEmbedded()" class="ms-modern-display-settings__toggle-copy">
                  Bias the layout toward camera-enabled participants.
                </span>
              </span>
              <span
                class="ms-modern-display-settings__switch"
                [class.is-on]="meetingVideoOptimizedState"
              >
                <span class="ms-modern-display-settings__switch-knob"></span>
              </span>
            </button>

            <button
              *ngIf="!isEmbedded()"
              type="button"
              class="ms-modern-display-settings__toggle-row"
              (click)="showSubtitlesOnCardsState = !showSubtitlesOnCardsState"
            >
              <span>
                <span class="ms-modern-display-settings__toggle-label">Show Subtitles on Cards</span>
                <span class="ms-modern-display-settings__toggle-copy">
                  Keep transcript snippets visible on participant cards.
                </span>
              </span>
              <span
                class="ms-modern-display-settings__switch"
                [class.is-on]="showSubtitlesOnCardsState"
              >
                <span class="ms-modern-display-settings__switch-knob"></span>
              </span>
            </button>
          </section>
        </div>

        <footer class="ms-modern-display-settings__footer">
          <button
            type="button"
            class="ms-modern-display-settings__save"
            (click)="handleSaveSettings()"
          >
            Apply Settings
          </button>
        </footer>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-display-settings-overlay {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(2, 8, 23, 0.62);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .ms-modern-display-settings-overlay--embedded {
        position: static;
        inset: auto;
        width: 100%;
        height: 100%;
        min-height: 0;
        background: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        z-index: auto;
      }

      .ms-modern-display-settings {
        box-sizing: border-box;
        position: fixed;
        width: min(392px, calc(100vw - 32px));
        max-height: min(560px, calc(100vh - 32px));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 28px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background:
          linear-gradient(
            180deg,
            var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 0%,
            var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82)) 100%
          );
        color: var(--ms-modern-text-primary, #10233f);
        box-shadow: var(--ms-modern-shadow-panel, 0 24px 64px rgba(14, 30, 53, 0.16));
      }

      .ms-modern-display-settings * {
        box-sizing: border-box;
      }

      .ms-modern-display-settings--embedded {
        position: relative;
        width: 100%;
        max-width: none;
        max-height: none;
        height: 100%;
        border-radius: 24px;
      }

      .ms-modern-display-settings__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 18px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
      }

      .ms-modern-display-settings__eyebrow {
        margin: 0 0 8px;
        color: var(--ms-modern-text-muted, rgba(58, 77, 105, 0.68));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-display-settings__title {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.18rem;
        font-weight: 700;
      }

      .ms-modern-display-settings__close {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid var(--ms-modern-border-strong, rgba(46, 108, 188, 0.34));
        background: var(--ms-modern-field-background, rgba(248, 250, 252, 0.92));
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-display-settings__content {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding: 22px;
      }

      .ms-modern-display-settings__section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .ms-modern-display-settings__section-label {
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .ms-modern-display-settings__option-grid {
        display: grid;
        gap: 10px;
      }

      .ms-modern-display-settings__option-grid--embedded {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .ms-modern-display-settings__option {
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82));
        color: inherit;
        cursor: pointer;
        transition:
          border-color 160ms ease,
          box-shadow 160ms ease,
          transform 160ms ease;
      }

      .ms-modern-display-settings__option--embedded {
        min-height: 92px;
        position: relative;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 8px;
        padding: 16px 10px;
      }

      .ms-modern-display-settings__option.is-active {
        border-color: var(--ms-local-accent, var(--ms-modern-accent, #1476d2));
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)) 16%, rgba(255, 255, 255, 0.96)) 0%,
          color-mix(in srgb, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)) 8%, rgba(255, 255, 255, 0.88)) 100%
        );
        box-shadow:
          0 14px 28px color-mix(in srgb, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)) 18%, transparent),
          0 0 0 3px color-mix(in srgb, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)) 20%, transparent);
      }

      .ms-modern-display-settings__option.is-active .ms-modern-display-settings__option-title {
        color: var(--ms-local-accent, var(--ms-modern-accent, #1476d2));
      }

      .ms-modern-display-settings__option.is-active .ms-modern-display-settings__option-copy {
        color: color-mix(in srgb, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)) 54%, var(--ms-modern-text-primary, #10233f));
      }

      .ms-modern-display-settings__option-active {
        position: absolute;
        top: 8px;
        right: 8px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 7px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)) 18%, rgba(255, 255, 255, 0.96));
        color: var(--ms-local-accent, var(--ms-modern-accent, #1476d2));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.62rem;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        box-shadow: 0 10px 18px color-mix(in srgb, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)) 14%, transparent);
      }

      .ms-modern-display-settings__option-icon {
        font-size: 1.1rem;
      }

      .ms-modern-display-settings__option:hover {
        transform: translateY(-1px);
      }

      .ms-modern-display-settings__option-title {
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.95rem;
        font-weight: 700;
      }

      .ms-modern-display-settings__option-copy {
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.86rem;
        line-height: 1.55;
      }

      .ms-modern-display-settings__toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 14px 16px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        border-radius: 18px;
        background: var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82));
        color: inherit;
        text-align: left;
        cursor: pointer;
      }

      .ms-modern-display-settings__toggle-row--embedded {
        border-radius: 14px;
      }

      .ms-modern-display-settings__toggle-heading {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }

      .ms-modern-display-settings__toggle-label {
        display: block;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.94rem;
        font-weight: 700;
      }

      .ms-modern-display-settings__toggle-copy {
        display: block;
        margin-top: 4px;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.84rem;
        line-height: 1.55;
      }

      .ms-modern-display-settings__switch {
        flex: 0 0 auto;
        width: 48px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        padding: 3px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--ms-modern-text-muted, rgba(58, 77, 105, 0.68)) 36%, transparent);
        transition: background 160ms ease;
      }

      .ms-modern-display-settings__switch.is-on {
        background: linear-gradient(135deg, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)), var(--ms-modern-accent-strong, #0d5ca8));
      }

      .ms-modern-display-settings__switch-knob {
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: #ffffff;
        transform: translateX(0);
        transition: transform 160ms ease;
      }

      .ms-modern-display-settings__switch.is-on .ms-modern-display-settings__switch-knob {
        transform: translateX(20px);
      }

      .ms-modern-display-settings__footer {
        padding: 0 22px 22px;
      }

      .ms-modern-display-settings__save {
        width: 100%;
        min-height: 48px;
        border: none;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--ms-local-accent, var(--ms-modern-accent, #1476d2)), var(--ms-modern-accent-strong, #0d5ca8));
        color: #ffffff;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
      }

      @media (max-width: 575px) {
        .ms-modern-display-settings__header,
        .ms-modern-display-settings__content,
        .ms-modern-display-settings__footer {
          padding-left: 18px;
          padding-right: 18px;
        }

        .ms-modern-display-settings__footer {
          padding-bottom: 18px;
        }
      }
    `,
  ],
})
export class ModernDisplaySettingsModalComponent implements OnInit, OnChanges {
  @Input() isDisplaySettingsModalVisible = false;
  @Input() onDisplaySettingsClose = () => {};
  @Input() onModifyDisplaySettings?: (options: ModifyDisplaySettingsOptions) => Promise<void> | void;
  @Input() parameters: ModernDisplaySettingsModalParameters = {} as ModernDisplaySettingsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor = 'var(--ms-modern-accent, #1476d2)';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  faCheck = faCheck;
  faDisplay = faDisplay;
  faExpand = faExpand;
  faGaugeHigh = faGaugeHigh;
  faTimes = faTimes;
  faVideo = faVideo;
  faWaveSquare = faWaveSquare;

  meetingDisplayTypeState = 'media';
  autoWaveState = false;
  forceFullDisplayState = false;
  showSubtitlesOnCardsState = true;
  meetingVideoOptimizedState = false;

  readonly displayOptions = [
    {
      value: 'video',
      label: 'Video Only',
      description: 'Focus on participants with active camera feeds.',
      icon: faVideo,
    },
    {
      value: 'media',
      label: 'Media',
      description: 'Balance audio and video participants together.',
      icon: faDisplay,
    },
    {
      value: 'all',
      label: 'All Participants',
      description: 'Keep every participant eligible for the layout.',
      icon: faExpand,
    },
  ];

  constructor(private readonly modifyDisplaySettingsService: ModifyDisplaySettings) {}

  ngOnInit() {
    this.ensureHandler();
    this.syncFromParameters();
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.ensureHandler();
    this.syncFromParameters();
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isDisplaySettingsModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  handleOverlayClick() {
    if (!this.isEmbedded()) {
      this.onDisplaySettingsClose();
    }
  }

  async handleSaveSettings() {
    await Promise.resolve(
      this.resolvedModifyHandler()({
        parameters: {
          ...this.parameters,
          meetingDisplayType: this.meetingDisplayTypeState,
          autoWave: this.autoWaveState,
          forceFullDisplay: this.forceFullDisplayState,
          showSubtitlesOnCards: this.showSubtitlesOnCardsState,
          meetingVideoOptimized: this.meetingVideoOptimizedState,
        },
      }),
    );
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
          background: 'rgba(2, 8, 23, 0.62)',
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
        }
      : {
          position: 'fixed',
          top: this.position.includes('top') ? '16px' : 'auto',
          bottom: this.position.includes('bottom') ? '16px' : 'auto',
          left: this.position.includes('Left') ? '16px' : 'auto',
          right: this.position.includes('Right') ? '16px' : 'auto',
        };

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  resolvedAccentColor(): string {
    const normalizedBackground = this.backgroundColor.trim().toLowerCase();
    if (
      !normalizedBackground ||
      normalizedBackground === 'transparent' ||
      normalizedBackground === 'rgba(0, 0, 0, 0)'
    ) {
      return 'var(--ms-modern-accent-strong, #1476d2)';
    }

    return this.backgroundColor;
  }

  private ensureHandler() {
    if (!this.onModifyDisplaySettings) {
      this.onModifyDisplaySettings = this.modifyDisplaySettingsService.modifyDisplaySettings.bind(
        this.modifyDisplaySettingsService,
      );
    }
  }

  private resolvedModifyHandler() {
    return (
      this.onModifyDisplaySettings ??
      this.modifyDisplaySettingsService.modifyDisplaySettings.bind(this.modifyDisplaySettingsService)
    );
  }

  private syncFromParameters() {
    if (!this.parameters) {
      return;
    }

    this.meetingDisplayTypeState = this.parameters.meetingDisplayType ?? 'media';
    this.autoWaveState = this.parameters.autoWave ?? false;
    this.forceFullDisplayState = this.parameters.forceFullDisplay ?? false;
    this.showSubtitlesOnCardsState = this.parameters.showSubtitlesOnCards ?? true;
    this.meetingVideoOptimizedState = this.parameters.meetingVideoOptimized ?? false;
  }

  private normalizeStyle(
    style?: Partial<CSSStyleDeclaration>,
  ): Record<string, string | number> {
    return style ? ({ ...style } as Record<string, string | number>) : {};
  }
}