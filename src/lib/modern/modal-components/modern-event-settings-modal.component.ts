import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDesktop,
  faBan,
  faCheckCircle,
  faLock,
  faMicrophone,
  faMessage,
  faTimes,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

import { ShowAlert } from '../../@types/types';
import {
  ModifySettings,
  ModifySettingsOptions,
} from '../../methods/settings-methods/modify-settings.service';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

type EventSettingValue = 'disallow' | 'allow' | 'approval';
type ChatSettingValue = 'disallow' | 'allow';
type EventSettingSectionKey = 'audio' | 'video' | 'screenshare' | 'chat';

@Component({
  selector: 'app-event-settings-modal',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isEventSettingsModalVisible: isEventSettingsModalVisible,
              position: position,
              backgroundColor: backgroundColor,
              audioState: audioState,
              videoState: videoState,
              screenshareState: screenshareState,
              chatState: chatState,
              closeModal: closeModal.bind(this),
              handleSaveSettings: handleSaveSettings.bind(this),
              onEventSettingsClose: onEventSettingsClose
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-event-settings-overlay"
      [class.ms-modern-event-settings-overlay--dark]="resolvedIsDarkMode"
      [class.ms-modern-event-settings-overlay--light]="!resolvedIsDarkMode"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleOverlayClick()"
    >
      <section
        class="ms-modern-event-settings"
        [class.ms-modern-event-settings--dark]="resolvedIsDarkMode"
        [class.ms-modern-event-settings--light]="!resolvedIsDarkMode"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <header *ngIf="showHeader" class="ms-modern-event-settings__header">
          <div class="ms-modern-event-settings__heading">
            <span class="ms-modern-event-settings__eyebrow">Room policy</span>
            <h2 class="ms-modern-event-settings__title">Event Settings</h2>
            <p class="ms-modern-event-settings__subtitle">
              Control participant permissions for audio, video, screen sharing, and chat.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-event-settings__close"
            aria-label="Close event settings"
            (click)="closeModal()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div
          class="ms-modern-event-settings__body"
          [class.ms-modern-event-settings__body--embedded]="isEmbedded()"
        >
          <section
            *ngFor="let section of settingSections"
            class="ms-modern-event-settings__setting-card"
            [class.ms-modern-event-settings__setting-card--embedded]="isEmbedded()"
          >
            <div
              class="ms-modern-event-settings__setting-heading"
              [class.ms-modern-event-settings__setting-heading--embedded]="isEmbedded()"
            >
              <span class="ms-modern-event-settings__setting-icon">
                <fa-icon [icon]="section.icon"></fa-icon>
              </span>
              <div>
                <strong>{{ isEmbedded() ? section.embeddedTitle : section.title }}</strong>
                <p *ngIf="!isEmbedded()">{{ section.description }}</p>
              </div>
            </div>

            <div
              class="ms-modern-event-settings__segments"
              [class.ms-modern-event-settings__segments--embedded]="isEmbedded()"
              role="group"
              [attr.aria-label]="section.ariaLabel"
            >
              <button
                *ngFor="let option of settingOptions"
                type="button"
                class="ms-modern-event-settings__segment"
                [class.ms-modern-event-settings__segment--embedded]="isEmbedded()"
                [class.ms-modern-event-settings__segment--active]="settingValue(section.key) === option.value"
                (click)="setSettingValue(section.key, option.value)"
              >
                <fa-icon [icon]="option.icon"></fa-icon>
                <span>{{ option.label }}</span>
              </button>
            </div>
          </section>
        </div>

        <footer
          class="ms-modern-event-settings__footer"
          [class.ms-modern-event-settings__footer--embedded]="isEmbedded()"
        >
          <button
            *ngIf="!isEmbedded()"
            type="button"
            class="ms-modern-event-settings__action ms-modern-event-settings__action--secondary"
            (click)="closeModal()"
          >
            Cancel
          </button>
          <button
            type="button"
            class="ms-modern-event-settings__action ms-modern-event-settings__action--primary"
            (click)="handleSaveSettings()"
          >
            Save Settings
          </button>
        </footer>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-event-settings-overlay {
        position: fixed;
        inset: 0;
        display: block;
        background: rgba(2, 8, 23, 0.66);
        backdrop-filter: blur(10px);
        z-index: 999;
      }

      .ms-modern-event-settings {
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
        backdrop-filter: blur(20px);
      }

      .ms-modern-event-settings__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 16px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
      }

      .ms-modern-event-settings__heading {
        min-width: 0;
      }

      .ms-modern-event-settings__eyebrow {
        display: block;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-event-settings__title {
        margin: 6px 0 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.34rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .ms-modern-event-settings__subtitle {
        margin: 8px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .ms-modern-event-settings__close {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-event-settings__body {
        display: grid;
        gap: 14px;
        padding: 18px 22px;
      }

      .ms-modern-event-settings__body--embedded {
        flex: 1;
        align-content: start;
        gap: 12px;
        padding-top: 12px;
      }

      .ms-modern-event-settings__setting-card {
        display: grid;
        gap: 12px;
        padding: 16px;
        border-radius: 20px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.72);
      }

      .ms-modern-event-settings__setting-card--embedded {
        gap: 10px;
        padding: 14px;
        border-radius: 18px;
      }

      .ms-modern-event-settings__setting-heading {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 12px;
        align-items: flex-start;
      }

      .ms-modern-event-settings__setting-heading--embedded {
        align-items: center;
      }

      .ms-modern-event-settings__setting-icon {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        background: rgba(79, 70, 229, 0.08);
        color: var(--ms-modern-brand-primary, #4f46e5);
      }

      .ms-modern-event-settings__setting-heading strong {
        display: block;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.96rem;
        font-weight: 800;
      }

      .ms-modern-event-settings__setting-heading p {
        margin: 4px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.83rem;
        line-height: 1.45;
      }

      .ms-modern-event-settings__select {
        width: 100%;
        min-height: 46px;
        border-radius: 14px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.94);
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 600;
        padding: 0 14px;
        outline: none;
      }

      .ms-modern-event-settings__segments {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }

      .ms-modern-event-settings__segments--embedded {
        gap: 6px;
      }

      .ms-modern-event-settings__segment {
        min-height: 58px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        border-radius: 14px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.58);
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.76rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 160ms ease, border-color 160ms ease, background 160ms ease, color 160ms ease;
      }

      .ms-modern-event-settings__segment--embedded {
        min-height: 54px;
      }

      .ms-modern-event-settings__segment:hover {
        transform: translateY(-1px);
      }

      .ms-modern-event-settings__segment--active {
        border-color: rgba(79, 70, 229, 0.34);
        background: rgba(79, 70, 229, 0.12);
        color: var(--ms-modern-text-primary, #10233f);
        box-shadow: inset 0 0 0 1px rgba(79, 70, 229, 0.08);
      }

      .ms-modern-event-settings__footer {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        padding: 0 22px 22px;
      }

      .ms-modern-event-settings__footer--embedded {
        grid-template-columns: 1fr;
        margin-top: auto;
        padding-top: 12px;
      }

      .ms-modern-event-settings__action {
        min-height: 46px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 16px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 700;
        cursor: pointer;
      }

      .ms-modern-event-settings__action--secondary {
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.64);
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-event-settings__action--primary {
        border: none;
        background: linear-gradient(
          135deg,
          var(--ms-modern-brand-primary, #4f46e5) 0%,
          var(--ms-modern-brand-secondary, #14b8a6) 55%,
          var(--ms-modern-accent, #f59e0b) 100%
        );
        color: #fff;
        box-shadow: 0 18px 34px rgba(79, 70, 229, 0.18);
      }

      .ms-modern-event-settings--dark {
        border-color: rgba(148, 163, 184, 0.18);
        color: #e2e8f0;
      }

      .ms-modern-event-settings--dark .ms-modern-event-settings__header {
        border-bottom-color: rgba(148, 163, 184, 0.18);
      }

      .ms-modern-event-settings--dark .ms-modern-event-settings__eyebrow {
        color: rgba(226, 232, 240, 0.62);
      }

      .ms-modern-event-settings--dark .ms-modern-event-settings__subtitle,
      .ms-modern-event-settings--dark .ms-modern-event-settings__setting-heading p {
        color: rgba(226, 232, 240, 0.74);
      }

      .ms-modern-event-settings--dark .ms-modern-event-settings__close,
      .ms-modern-event-settings--dark .ms-modern-event-settings__action--secondary {
        border-color: rgba(148, 163, 184, 0.18);
        background: rgba(15, 23, 42, 0.48);
        color: #e2e8f0;
      }

      .ms-modern-event-settings--dark .ms-modern-event-settings__setting-card {
        border-color: rgba(148, 163, 184, 0.16);
        background: rgba(15, 23, 42, 0.46);
      }

      .ms-modern-event-settings--dark .ms-modern-event-settings__setting-icon {
        background: rgba(129, 140, 248, 0.14);
        color: #a5b4fc;
      }

      .ms-modern-event-settings--dark .ms-modern-event-settings__segment {
        border-color: rgba(148, 163, 184, 0.18);
        background: rgba(15, 23, 42, 0.44);
        color: rgba(226, 232, 240, 0.72);
      }

      .ms-modern-event-settings--dark .ms-modern-event-settings__segment--active {
        border-color: rgba(129, 140, 248, 0.38);
        background: rgba(129, 140, 248, 0.16);
        color: #f8fafc;
      }

      @media (max-width: 640px) {
        .ms-modern-event-settings__header,
        .ms-modern-event-settings__body,
        .ms-modern-event-settings__footer {
          padding-left: 18px;
          padding-right: 18px;
        }

        .ms-modern-event-settings__footer {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ModernEventSettingsModalComponent implements OnInit, OnChanges {
  @Input() isEventSettingsModalVisible = false;
  @Input() onEventSettingsClose = () => {};
  @Input() onModifyEventSettings?: (options: ModifySettingsOptions) => Promise<void>;
  @Input() position = 'topRight';
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';
  @Input() isDarkMode?: boolean;
  @Input() audioSetting = '';
  @Input() videoSetting = '';
  @Input() screenshareSetting = '';
  @Input() chatSetting = '';
  @Input() updateAudioSetting = (_setting: string) => {};
  @Input() updateVideoSetting = (_setting: string) => {};
  @Input() updateScreenshareSetting = (_setting: string) => {};
  @Input() updateChatSetting = (_setting: string) => {};
  @Input() updateIsSettingsModalVisible = (_isVisible: boolean) => {};
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() showAlert?: ShowAlert;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  readonly faMessage = faMessage;
  readonly faMicrophone = faMicrophone;
  readonly faDesktop = faDesktop;
  readonly faBan = faBan;
  readonly faCheckCircle = faCheckCircle;
  readonly faLock = faLock;
  readonly faTimes = faTimes;
  readonly faVideo = faVideo;

  audioState: EventSettingValue | string = 'allow';
  videoState: EventSettingValue | string = 'allow';
  screenshareState: EventSettingValue | string = 'allow';
  chatState: EventSettingValue | string = 'allow';

  readonly settingOptions: ReadonlyArray<{
    value: EventSettingValue;
    label: string;
    icon: IconDefinition;
  }> = [
    { value: 'allow', label: 'Allow', icon: faCheckCircle },
    { value: 'approval', label: 'Approval', icon: faLock },
    { value: 'disallow', label: 'Disallow', icon: faBan },
  ];

  readonly settingSections: ReadonlyArray<{
    key: EventSettingSectionKey;
    title: string;
    embeddedTitle: string;
    description: string;
    icon: IconDefinition;
    ariaLabel: string;
  }> = [
    {
      key: 'audio',
      title: 'User audio',
      embeddedTitle: 'Audio',
      description: 'Choose whether microphones are allowed freely, blocked, or host-approved.',
      icon: faMicrophone,
      ariaLabel: 'User audio setting',
    },
    {
      key: 'video',
      title: 'User video',
      embeddedTitle: 'Video',
      description: 'Choose whether cameras are allowed freely, blocked, or host-approved.',
      icon: faVideo,
      ariaLabel: 'User video setting',
    },
    {
      key: 'screenshare',
      title: 'User screenshare',
      embeddedTitle: 'Screen Share',
      description: 'Control when participants can publish screens or presentations.',
      icon: faDesktop,
      ariaLabel: 'User screenshare setting',
    },
    {
      key: 'chat',
      title: 'User chat',
      embeddedTitle: 'Chat',
      description: 'Decide whether participant chat is available in the room.',
      icon: faMessage,
      ariaLabel: 'User chat setting',
    },
  ];

  constructor(private readonly modifySettingsService: ModifySettings) {}

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  ngOnInit() {
    if (!this.onModifyEventSettings) {
      this.onModifyEventSettings = this.modifySettingsService.modifySettings.bind(
        this.modifySettingsService,
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.isVisible() &&
      (
        changes['isEventSettingsModalVisible'] ||
        changes['audioSetting'] ||
        changes['videoSetting'] ||
        changes['screenshareSetting'] ||
        changes['chatSetting']
      )
    ) {
      this.updateStatesFromParameters();
    }
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isEventSettingsModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  handleOverlayClick() {
    if (!this.isEmbedded()) {
      this.closeModal();
    }
  }

  updateStatesFromParameters() {
    this.audioState = this.audioSetting;
    this.videoState = this.videoSetting;
    this.screenshareState = this.screenshareSetting;
    this.chatState = this.chatSetting;
  }

  settingValue(section: EventSettingSectionKey): EventSettingValue | string {
    switch (section) {
      case 'audio':
        return this.audioState;
      case 'video':
        return this.videoState;
      case 'screenshare':
        return this.screenshareState;
      case 'chat':
        return this.chatState;
      default:
        return 'allow';
    }
  }

  setSettingValue(section: EventSettingSectionKey, value: EventSettingValue) {
    switch (section) {
      case 'audio':
        this.audioState = value;
        break;
      case 'video':
        this.videoState = value;
        break;
      case 'screenshare':
        this.screenshareState = value;
        break;
      case 'chat':
        this.chatState = value;
        break;
    }
  }

  async handleSaveSettings() {
    await this.onModifyEventSettings?.({
      audioSet: this.audioState,
      videoSet: this.videoState,
      screenshareSet: this.screenshareState,
      chatSet: this.chatState,
      updateAudioSetting: this.updateAudioSetting,
      updateVideoSetting: this.updateVideoSetting,
      updateScreenshareSetting: this.updateScreenshareSetting,
      updateChatSetting: this.updateChatSetting,
      updateIsSettingsModalVisible: this.updateIsSettingsModalVisible,
      roomName: this.roomName,
      socket: this.socket,
      showAlert: this.showAlert,
    });

    if (this.isEmbedded()) {
      this.closeModal();
    }
  }

  closeModal() {
    this.onEventSettingsClose();
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
          backdropFilter: 'none',
          zIndex: 'auto',
        }
      : {
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          background: this.resolvedIsDarkMode ? 'rgba(2, 8, 23, 0.72)' : 'rgba(15, 23, 42, 0.18)',
          backdropFilter: 'blur(12px)',
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
          background: this.resolvedBackground(),
        }
      : (() => {
          const screenWidth = window.innerWidth;
          let modalWidth = 0.84 * screenWidth;
          if (modalWidth > 460) {
            modalWidth = 460;
          }

          return {
            position: 'fixed',
            width: `${modalWidth}px`,
            maxHeight: 'min(82vh, 760px)',
            overflowY: 'auto',
            background: this.resolvedBackground(),
            ...this.resolvePositionStyle(),
          };
        })();

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
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

  private resolvedBackground(): string {
    if (
      this.backgroundColor &&
      this.backgroundColor !== 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))'
    ) {
      return this.backgroundColor;
    }

    return this.resolvedIsDarkMode
      ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.95) 100%)';
  }
}