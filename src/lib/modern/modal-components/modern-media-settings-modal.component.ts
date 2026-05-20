import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCamera,
  faCheck,
  faMicrophone,
  faPhotoFilm,
  faSyncAlt,
  faTimes,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

import {
  SwitchAudio,
  SwitchAudioOptions,
} from '../../methods/stream-methods/switch-audio.service';
import {
  SwitchVideo,
  SwitchVideoOptions,
} from '../../methods/stream-methods/switch-video.service';
import {
  SwitchVideoAlt,
  SwitchVideoAltOptions,
} from '../../methods/stream-methods/switch-video-alt.service';
import type { MediaSettingsModalParameters } from '../../components/media-settings-components/media-settings-modal/media-settings-modal.component';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

@Component({
  selector: 'app-media-settings-modal',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isMediaSettingsModalVisible: isMediaSettingsModalVisible,
              position: position,
              backgroundColor: backgroundColor,
              parameters: liveParameters,
              selectedVideoInput: selectedVideoInput,
              selectedAudioInput: selectedAudioInput,
              renderMode: renderMode,
              handleModalClose: handleModalClose.bind(this),
              handleSwitchCamera: handleSwitchCamera.bind(this),
              handleVideoSwitch: handleVideoSwitch.bind(this),
              handleAudioSwitch: handleAudioSwitch.bind(this),
              showVirtual: showVirtual.bind(this),
              onMediaSettingsClose: onMediaSettingsClose
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-media-settings-overlay"
      [class.ms-modern-media-settings-overlay--embedded]="isEmbedded()"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleOverlayClick()"
    >
      <section
        class="ms-modern-media-settings"
        [class.ms-modern-media-settings--embedded]="isEmbedded()"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <header *ngIf="showHeader" class="ms-modern-media-settings__header">
          <div class="ms-modern-media-settings__heading">
            <span class="ms-modern-media-settings__eyebrow">Devices</span>
            <h2 class="ms-modern-media-settings__title">
              <fa-icon [icon]="faVideo"></fa-icon>
              <span>Media settings</span>
            </h2>
            <p class="ms-modern-media-settings__subtitle">
              Choose active camera and microphone inputs, then open advanced background controls.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-media-settings__close"
            aria-label="Close media settings"
            (click)="handleModalClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-media-settings__body">
          <div *ngIf="showCameraHint() && isEmbedded()" class="ms-modern-media-settings__hint">
            <fa-icon [icon]="faCamera"></fa-icon>
            <div>
              <strong>Camera is currently off</strong>
              <span>
                You can still choose a background now! It will be applied automatically when you turn on your camera.
              </span>
            </div>
          </div>

          <div
            class="ms-modern-media-settings__actions"
            [class.ms-modern-media-settings__actions--embedded]="isEmbedded()"
          >
            <button
              type="button"
              class="ms-modern-media-settings__action ms-modern-media-settings__action--secondary"
              (click)="handleSwitchCamera()"
            >
              <fa-icon [icon]="faSyncAlt"></fa-icon>
              <span>Switch Camera</span>
            </button>

            <button
              type="button"
              class="ms-modern-media-settings__action ms-modern-media-settings__action--primary"
              (click)="showVirtual()"
            >
              <fa-icon [icon]="faPhotoFilm"></fa-icon>
              <span>Virtual Background</span>
            </button>
          </div>

          <div *ngIf="showCameraHint() && !isEmbedded()" class="ms-modern-media-settings__hint">
            <fa-icon [icon]="faCamera"></fa-icon>
            <div>
              <strong>Camera is currently off</strong>
              <span>
                You can still choose a background now! It will be applied automatically when you turn on your camera.
              </span>
            </div>
          </div>

          <div
            class="ms-modern-media-settings__tabs"
            [class.ms-modern-media-settings__tabs--embedded]="isEmbedded()"
            role="tablist"
            aria-label="Media settings sections"
          >
            <button
              type="button"
              class="ms-modern-media-settings__tab"
              [class.ms-modern-media-settings__tab--active]="activeSection === 'video'"
              [attr.aria-pressed]="activeSection === 'video'"
              (click)="activeSection = 'video'"
            >
              <fa-icon [icon]="faCamera"></fa-icon>
              <span>Video</span>
              <small *ngIf="!isEmbedded()">{{ liveParameters.videoInputs.length }}</small>
            </button>

            <button
              type="button"
              class="ms-modern-media-settings__tab"
              [class.ms-modern-media-settings__tab--active]="activeSection === 'audio'"
              [attr.aria-pressed]="activeSection === 'audio'"
              (click)="activeSection = 'audio'"
            >
              <fa-icon [icon]="faMicrophone"></fa-icon>
              <span>Audio</span>
              <small *ngIf="!isEmbedded()">{{ liveParameters.audioInputs.length }}</small>
            </button>
          </div>

          <section *ngIf="activeSection === 'video'" class="ms-modern-media-settings__section">
            <div class="ms-modern-media-settings__section-heading">
              <div class="ms-modern-media-settings__section-title">
                <fa-icon [icon]="faCamera"></fa-icon>
                <span>Video Input</span>
              </div>
              <p class="ms-modern-media-settings__section-description">
                {{ getSectionDescription('video') }}
              </p>
            </div>

            <div *ngIf="liveParameters.videoInputs.length > 0; else emptyVideoState" class="ms-modern-media-settings__device-list">
              <button
                *ngFor="let input of liveParameters.videoInputs; let index = index"
                type="button"
                class="ms-modern-media-settings__device"
                [class.ms-modern-media-settings__device--active]="input.deviceId === selectedVideoInput"
                (click)="handleVideoSwitch(input.deviceId)"
              >
                <span class="ms-modern-media-settings__device-name">
                  {{ getDeviceLabel(input, 'Camera', index) }}
                </span>
                <fa-icon *ngIf="input.deviceId === selectedVideoInput" [icon]="faCheck"></fa-icon>
              </button>
            </div>
          </section>

          <section *ngIf="activeSection === 'audio'" class="ms-modern-media-settings__section">
            <div class="ms-modern-media-settings__section-heading">
              <div class="ms-modern-media-settings__section-title">
                <fa-icon [icon]="faMicrophone"></fa-icon>
                <span>Audio Input</span>
              </div>
              <p class="ms-modern-media-settings__section-description">
                {{ getSectionDescription('audio') }}
              </p>
            </div>

            <div *ngIf="liveParameters.audioInputs.length > 0; else emptyAudioState" class="ms-modern-media-settings__device-list">
              <button
                *ngFor="let input of liveParameters.audioInputs; let index = index"
                type="button"
                class="ms-modern-media-settings__device"
                [class.ms-modern-media-settings__device--active]="input.deviceId === selectedAudioInput"
                (click)="handleAudioSwitch(input.deviceId)"
              >
                <span class="ms-modern-media-settings__device-name">
                  {{ getDeviceLabel(input, 'Microphone', index) }}
                </span>
                <fa-icon *ngIf="input.deviceId === selectedAudioInput" [icon]="faCheck"></fa-icon>
              </button>
            </div>
          </section>
        </div>
      </section>
    </div>

    <ng-template #emptyVideoState>
      <div class="ms-modern-media-settings__empty">
        <strong>No cameras detected</strong>
        <span>Grant camera permission or connect a camera, then reopen media settings.</span>
      </div>
    </ng-template>

    <ng-template #emptyAudioState>
      <div class="ms-modern-media-settings__empty">
        <strong>No microphones detected</strong>
        <span>Grant microphone permission or connect an input device, then reopen media settings.</span>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .ms-modern-media-settings-overlay {
        display: block;
      }

      .ms-modern-media-settings {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-height: 0;
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
        backdrop-filter: blur(24px);
      }

      .ms-modern-media-settings * {
        box-sizing: border-box;
      }

      .ms-modern-media-settings--embedded {
        height: 100%;
        border-radius: 24px;
      }

      .ms-modern-media-settings__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 16px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.36), transparent);
      }

      .ms-modern-media-settings__heading {
        min-width: 0;
      }

      .ms-modern-media-settings__eyebrow {
        display: block;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-media-settings__title {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 6px 0 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.38rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .ms-modern-media-settings__subtitle {
        margin: 8px 0 0;
        max-width: 32rem;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .ms-modern-media-settings__close {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.42);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-media-settings__body {
        display: flex;
        flex: 1;
        min-height: 0;
        flex-direction: column;
        gap: 14px;
        padding: 18px 22px 22px;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .ms-modern-media-settings__actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .ms-modern-media-settings__actions--embedded {
        display: flex;
        flex-direction: column;
      }

      .ms-modern-media-settings__action {
        min-height: 46px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        width: 100%;
        border-radius: 999px;
        padding: 0 16px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 700;
        cursor: pointer;
      }

      .ms-modern-media-settings__action--primary {
        border: none;
        background: linear-gradient(
          135deg,
          var(--ms-modern-brand-primary, #4f46e5) 0%,
          var(--ms-modern-brand-secondary, #14b8a6) 58%,
          var(--ms-modern-accent, #f59e0b) 100%
        );
        color: #fff;
        box-shadow: 0 20px 40px rgba(79, 70, 229, 0.22);
      }

      .ms-modern-media-settings__action--secondary {
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.6);
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-media-settings__hint {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 12px;
        align-items: flex-start;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid rgba(59, 130, 246, 0.18);
        background: rgba(59, 130, 246, 0.08);
        color: #1d4ed8;
      }

      .ms-modern-media-settings__hint strong,
      .ms-modern-media-settings__hint span {
        display: block;
      }

      .ms-modern-media-settings__hint strong {
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 700;
      }

      .ms-modern-media-settings__hint span {
        margin-top: 4px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        line-height: 1.45;
      }

      .ms-modern-media-settings__tabs {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        padding: 4px;
        border-radius: 18px;
        background: rgba(148, 163, 184, 0.1);
      }

      .ms-modern-media-settings__tabs--embedded {
        padding: 3px;
        border-radius: 14px;
        background: rgba(15, 23, 42, 0.08);
        box-shadow: inset 0 1px 3px rgba(15, 23, 42, 0.12);
      }

      .ms-modern-media-settings__tab {
        min-height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: none;
        border-radius: 14px;
        background: transparent;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        cursor: pointer;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        font-weight: 700;
      }

      .ms-modern-media-settings__tab small {
        min-width: 24px;
        padding: 2px 8px;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.18);
        font-size: 0.74rem;
      }

      .ms-modern-media-settings__tab--active {
        background: rgba(255, 255, 255, 0.86);
        color: var(--ms-modern-text-primary, #10233f);
        box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
      }

      .ms-modern-media-settings__section {
        display: grid;
        gap: 12px;
      }

      .ms-modern-media-settings__section-heading {
        display: grid;
        gap: 4px;
      }

      .ms-modern-media-settings__section-title {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1rem;
        font-weight: 700;
      }

      .ms-modern-media-settings__section-description {
        margin: 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.84rem;
        line-height: 1.45;
      }

      .ms-modern-media-settings__device-list {
        display: grid;
        gap: 10px;
      }

      .ms-modern-media-settings__device {
        min-height: 50px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        padding: 0 16px;
        border-radius: 18px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.74);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
        text-align: left;
      }

      .ms-modern-media-settings__device--active {
        border-color: rgba(79, 70, 229, 0.34);
        background: rgba(79, 70, 229, 0.08);
        box-shadow: inset 0 0 0 1px rgba(79, 70, 229, 0.08);
      }

      .ms-modern-media-settings__device-name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        font-weight: 600;
      }

      .ms-modern-media-settings__empty {
        display: grid;
        gap: 4px;
        padding: 20px 16px;
        border-radius: 18px;
        border: 1px dashed var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        text-align: center;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
      }

      .ms-modern-media-settings__empty strong {
        color: var(--ms-modern-text-primary, #10233f);
        font-size: 0.92rem;
      }

      .ms-modern-media-settings__empty span {
        font-size: 0.82rem;
        line-height: 1.45;
      }

      @media (max-width: 640px) {
        .ms-modern-media-settings__header,
        .ms-modern-media-settings__body {
          padding-left: 18px;
          padding-right: 18px;
        }

        .ms-modern-media-settings__actions {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ModernMediaSettingsModalComponent implements OnInit, OnChanges, DoCheck {
  @Input() isMediaSettingsModalVisible = false;
  @Input() onMediaSettingsClose = () => {};
  @Input() switchCameraOnPress?: (options: SwitchVideoAltOptions) => Promise<void>;
  @Input() switchVideoOnPress?: (options: SwitchVideoOptions) => Promise<void>;
  @Input() switchAudioOnPress?: (options: SwitchAudioOptions) => Promise<void>;
  @Input() parameters: MediaSettingsModalParameters = {} as MediaSettingsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor =
    'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;
  @Input() onOpenBackgroundSidebar?: () => void;

  readonly faCamera = faCamera;
  readonly faCheck = faCheck;
  readonly faMicrophone = faMicrophone;
  readonly faPhotoFilm = faPhotoFilm;
  readonly faSyncAlt = faSyncAlt;
  readonly faTimes = faTimes;
  readonly faVideo = faVideo;

  activeSection: 'video' | 'audio' = 'video';
  liveParameters: MediaSettingsModalParameters = {} as MediaSettingsModalParameters;
  selectedVideoInput = '';
  selectedAudioInput = '';
  prevSelectedVideoInput = '';
  prevSelectedAudioInput = '';
  private lastResolvedSignature = '';

  constructor(
    private readonly switchAudioService: SwitchAudio,
    private readonly switchVideoService: SwitchVideo,
    private readonly switchVideoAltService: SwitchVideoAlt,
  ) {}

  ngOnInit() {
    this.setupDefaultServices();
    this.refreshState();
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.setupDefaultServices();
    this.refreshState();
  }

  ngDoCheck() {
    if (!this.isVisible()) {
      return;
    }

    this.syncLiveParameters();
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isMediaSettingsModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  handleOverlayClick() {
    if (!this.isEmbedded()) {
      this.handleModalClose();
    }
  }

  async handleSwitchCamera() {
    await this.resolvedCameraHandler()({ parameters: this.resolveParameters() });
    this.refreshState();
  }

  async handleVideoSwitch(eventOrDeviceId: Event | string) {
    const deviceId = this.extractDeviceId(eventOrDeviceId);

    if (!deviceId || deviceId === this.prevSelectedVideoInput) {
      return;
    }

    this.selectedVideoInput = deviceId;
    this.prevSelectedVideoInput = deviceId;
    await this.resolvedVideoHandler()({
      videoPreference: deviceId,
      parameters: this.resolveParameters(),
    });
    this.refreshState();
  }

  async handleAudioSwitch(eventOrDeviceId: Event | string) {
    const deviceId = this.extractDeviceId(eventOrDeviceId);

    if (!deviceId || deviceId === this.prevSelectedAudioInput) {
      return;
    }

    this.selectedAudioInput = deviceId;
    this.prevSelectedAudioInput = deviceId;
    await this.resolvedAudioHandler()({
      audioPreference: deviceId,
      parameters: this.resolveParameters(),
    });
    this.refreshState();
  }

  handleModalClose() {
    this.onMediaSettingsClose();
  }

  showVirtual() {
    if (this.isEmbedded() && this.onOpenBackgroundSidebar) {
      this.onOpenBackgroundSidebar();
      return;
    }

    const parameters = this.resolveParameters();
    parameters.updateIsBackgroundModalVisible?.(!parameters.isBackgroundModalVisible);
    this.refreshState();
  }

  showCameraHint(): boolean {
    return this.liveParameters.videoAlreadyOn === false;
  }

  getDeviceLabel(device: MediaDeviceInfo, fallback: string, index: number): string {
    const label = device.label?.trim();

    if (label) {
      return label;
    }

    if (device.deviceId?.trim()) {
      return `${fallback} ${index + 1}`;
    }

    return `${fallback} ${index + 1}`;
  }

  getSectionDescription(section: 'video' | 'audio'): string {
    const inputs = section === 'video' ? this.liveParameters.videoInputs : this.liveParameters.audioInputs;
    const baseDescription =
      section === 'video'
        ? 'Select the camera used for this room.'
        : 'Select the microphone used for this room.';

    if (inputs.length > 0 && inputs.every((device) => !device.label?.trim())) {
      return `${baseDescription} Device names appear after camera and microphone access is granted.`;
    }

    return baseDescription;
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
          background: 'rgba(2, 8, 23, 0.68)',
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
          background: this.backgroundColor,
        }
      : {
          position: 'fixed',
          width: 'min(480px, calc(100vw - 32px))',
          maxHeight: 'min(760px, calc(100vh - 32px))',
          background: this.backgroundColor,
          ...this.resolvePositionStyle(),
        };

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private setupDefaultServices() {
    if (!this.switchCameraOnPress) {
      this.switchCameraOnPress = this.switchVideoAltService.switchVideoAlt.bind(
        this.switchVideoAltService,
      );
    }

    if (!this.switchVideoOnPress) {
      this.switchVideoOnPress = this.switchVideoService.switchVideo.bind(this.switchVideoService);
    }

    if (!this.switchAudioOnPress) {
      this.switchAudioOnPress = this.switchAudioService.switchAudio.bind(this.switchAudioService);
    }
  }

  private refreshState() {
    this.syncLiveParameters(true);

    this.ensureDefaultSelections();
  }

  private syncLiveParameters(force = false) {
    const resolvedParameters = this.resolveParameters();
    const signature = this.createParameterSignature(resolvedParameters);

    if (!force && signature === this.lastResolvedSignature) {
      return;
    }

    this.liveParameters = resolvedParameters;
    this.lastResolvedSignature = signature;

    const videoInputs = resolvedParameters.videoInputs ?? [];
    const audioInputs = resolvedParameters.audioInputs ?? [];

    this.selectedVideoInput = this.resolveSelectedDevice(
      this.selectedVideoInput,
      resolvedParameters.userDefaultVideoInputDevice,
      videoInputs,
    );
    this.selectedAudioInput = this.resolveSelectedDevice(
      this.selectedAudioInput,
      resolvedParameters.userDefaultAudioInputDevice,
      audioInputs,
    );
    this.prevSelectedVideoInput = this.selectedVideoInput;
    this.prevSelectedAudioInput = this.selectedAudioInput;

    if (this.activeSection === 'video' && videoInputs.length === 0 && audioInputs.length > 0) {
      this.activeSection = 'audio';
    }

    if (this.activeSection === 'audio' && audioInputs.length === 0 && videoInputs.length > 0) {
      this.activeSection = 'video';
    }
  }

  private ensureDefaultSelections() {
    const videoInputs = this.liveParameters.videoInputs ?? [];
    const audioInputs = this.liveParameters.audioInputs ?? [];

    if (!this.liveParameters.userDefaultVideoInputDevice && videoInputs.length > 0) {
      this.selectedVideoInput = videoInputs[0].deviceId;
      this.prevSelectedVideoInput = '';
      void this.handleVideoSwitch(this.selectedVideoInput);
    }

    if (!this.liveParameters.userDefaultAudioInputDevice && audioInputs.length > 0) {
      this.selectedAudioInput = audioInputs[0].deviceId;
      this.prevSelectedAudioInput = '';
      void this.handleAudioSwitch(this.selectedAudioInput);
    }
  }

  private resolveParameters(): MediaSettingsModalParameters {
    const freshParameters = this.parameters?.getUpdatedAllParams
      ? this.parameters.getUpdatedAllParams()
      : this.parameters;

    return {
      ...(freshParameters ?? {}),
      videoInputs: freshParameters?.videoInputs ?? [],
      audioInputs: freshParameters?.audioInputs ?? [],
      userDefaultVideoInputDevice:
        freshParameters?.userDefaultVideoInputDevice ?? freshParameters?.videoInputs?.[0]?.deviceId ?? '',
      userDefaultAudioInputDevice:
        freshParameters?.userDefaultAudioInputDevice ?? freshParameters?.audioInputs?.[0]?.deviceId ?? '',
      isBackgroundModalVisible: freshParameters?.isBackgroundModalVisible ?? false,
      updateIsBackgroundModalVisible:
        freshParameters?.updateIsBackgroundModalVisible ?? (() => {}),
    } as MediaSettingsModalParameters;
  }

  private createParameterSignature(parameters: MediaSettingsModalParameters): string {
    const videoSignature = (parameters.videoInputs ?? [])
      .map((device) => `${device.deviceId}:${device.label}:${device.kind}`)
      .join('|');
    const audioSignature = (parameters.audioInputs ?? [])
      .map((device) => `${device.deviceId}:${device.label}:${device.kind}`)
      .join('|');

    return [
      parameters.userDefaultVideoInputDevice ?? '',
      parameters.userDefaultAudioInputDevice ?? '',
      videoSignature,
      audioSignature,
      parameters.videoAlreadyOn ? '1' : '0',
      parameters.isBackgroundModalVisible ? '1' : '0',
    ].join('::');
  }

  private resolveSelectedDevice(
    currentSelection: string,
    resolvedSelection: string | undefined,
    inputs: MediaDeviceInfo[],
  ): string {
    if (resolvedSelection) {
      return resolvedSelection;
    }

    if (currentSelection && inputs.some((input) => input.deviceId === currentSelection)) {
      return currentSelection;
    }

    return inputs[0]?.deviceId ?? '';
  }

  private resolvedCameraHandler(): (options: SwitchVideoAltOptions) => Promise<void> {
    return (
      this.switchCameraOnPress ??
      this.switchVideoAltService.switchVideoAlt.bind(this.switchVideoAltService)
    );
  }

  private resolvedVideoHandler(): (options: SwitchVideoOptions) => Promise<void> {
    return this.switchVideoOnPress ?? this.switchVideoService.switchVideo.bind(this.switchVideoService);
  }

  private resolvedAudioHandler(): (options: SwitchAudioOptions) => Promise<void> {
    return this.switchAudioOnPress ?? this.switchAudioService.switchAudio.bind(this.switchAudioService);
  }

  private extractDeviceId(eventOrDeviceId: Event | string): string {
    if (typeof eventOrDeviceId === 'string') {
      return eventOrDeviceId;
    }

    return (eventOrDeviceId.target as HTMLSelectElement | null)?.value ?? '';
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