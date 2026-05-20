import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLink,
  faShareNodes,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { EventType } from '../../@types/types';
import { MeetingIdComponent } from '../../components/menu-components/meeting-id-component/meeting-id-component.component';
import { MeetingPasscodeComponent } from '../../components/menu-components/meeting-passcode-component/meeting-passcode-component.component';
import { ShareButtonsComponent } from '../../components/menu-components/share-buttons-component/share-buttons-component.component';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

@Component({
  selector: 'app-share-event-modal',
  imports: [
    CommonModule,
    FontAwesomeModule,
    MeetingIdComponent,
    MeetingPasscodeComponent,
    ShareButtonsComponent,
  ],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isShareEventModalVisible: isShareEventModalVisible,
              backgroundColor: backgroundColor,
              position: position,
              roomName: roomName,
              adminPasscode: adminPasscode,
              islevel: islevel,
              shareButtons: shareButtons,
              eventType: eventType,
              localLink: localLink,
              handleClose: handleClose.bind(this),
              onShareEventClose: onShareEventClose
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-share-event-overlay"
      [class.ms-modern-share-event-overlay--embedded]="isEmbedded()"
      [class.ms-modern-share-event-overlay--dark]="resolvedIsDarkMode"
      [class.ms-modern-share-event-overlay--light]="!resolvedIsDarkMode"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleOverlayClick()"
    >
      <section
        class="ms-modern-share-event"
        [class.ms-modern-share-event--embedded]="isEmbedded()"
        [class.ms-modern-share-event--headerless]="!showHeader"
        [class.ms-modern-share-event--dark]="resolvedIsDarkMode"
        [class.ms-modern-share-event--light]="!resolvedIsDarkMode"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <header *ngIf="showHeader" class="ms-modern-share-event__header">
          <div class="ms-modern-share-event__heading">
            <span class="ms-modern-share-event__eyebrow">Invite</span>
            <h2 class="ms-modern-share-event__title">
              <fa-icon [icon]="faShareNodes"></fa-icon>
              <span>Share event</span>
            </h2>
            <p class="ms-modern-share-event__subtitle">
              Send the room details and access link without leaving the active workflow.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-share-event__close"
            aria-label="Close share event"
            (click)="handleClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-share-event__body">
          <div class="ms-modern-share-event__summary">
            <div class="ms-modern-share-event__summary-icon">
              <fa-icon [icon]="faLink"></fa-icon>
            </div>

            <div class="ms-modern-share-event__summary-copy">
              <strong>{{ roomName }}</strong>
              <span>{{ resolvedSummary() }}</span>
            </div>
          </div>

          <div class="ms-modern-share-event__panel" *ngIf="islevel === '2'">
            <span class="ms-modern-share-event__panel-label">Host passcode</span>
            <app-meeting-passcode-component [meetingPasscode]="adminPasscode" [isDarkMode]="resolvedIsDarkMode"></app-meeting-passcode-component>
          </div>

          <div class="ms-modern-share-event__panel">
            <span class="ms-modern-share-event__panel-label">Meeting ID</span>
            <app-meeting-id-component [meetingID]="roomName" [isDarkMode]="resolvedIsDarkMode"></app-meeting-id-component>
          </div>

          <div class="ms-modern-share-event__panel" *ngIf="shareButtons">
            <span class="ms-modern-share-event__panel-label">Share actions</span>
            <app-share-buttons-component
              [meetingID]="roomName"
              [eventType]="eventType"
              [isDarkMode]="resolvedIsDarkMode"
              [localLink]="localLink"
            ></app-share-buttons-component>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-share-event-overlay {
        position: fixed;
        inset: 0;
        display: block;
        background: rgba(2, 8, 23, 0.66);
        backdrop-filter: blur(10px);
        z-index: 999;
      }

      .ms-modern-share-event-overlay--embedded {
        background: transparent;
        backdrop-filter: none;
      }

      .ms-modern-share-event {
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
        backdrop-filter: blur(20px);
      }

      .ms-modern-share-event--embedded {
        height: 100%;
        max-height: none;
        border-radius: 24px;
      }

      .ms-modern-share-event__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 16px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
      }

      .ms-modern-share-event__heading {
        min-width: 0;
      }

      .ms-modern-share-event__eyebrow {
        display: block;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-share-event__title {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 6px 0 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.34rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .ms-modern-share-event__subtitle {
        margin: 8px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .ms-modern-share-event__close {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-share-event--dark {
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%);
        color: #e2e8f0;
      }

      .ms-modern-share-event--dark .ms-modern-share-event__eyebrow,
      .ms-modern-share-event--dark .ms-modern-share-event__panel-label {
        color: rgba(226, 232, 240, 0.68);
      }

      .ms-modern-share-event--dark .ms-modern-share-event__subtitle,
      .ms-modern-share-event--dark .ms-modern-share-event__summary-copy span {
        color: rgba(226, 232, 240, 0.76);
      }

      .ms-modern-share-event--dark .ms-modern-share-event__header {
        border-bottom-color: rgba(148, 163, 184, 0.18);
      }

      .ms-modern-share-event--dark .ms-modern-share-event__close {
        border-color: rgba(148, 163, 184, 0.18);
        background: rgba(15, 23, 42, 0.54);
        color: #e2e8f0;
      }

      .ms-modern-share-event--dark .ms-modern-share-event__summary {
        border-color: rgba(99, 102, 241, 0.18);
        background: rgba(79, 70, 229, 0.12);
      }

      .ms-modern-share-event--dark .ms-modern-share-event__panel {
        border-color: rgba(148, 163, 184, 0.18);
        background: rgba(15, 23, 42, 0.46);
      }

      .ms-modern-share-event--light {
        background: linear-gradient(
          180deg,
          var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96)) 0%,
          var(--ms-modern-panel-surface, rgba(248, 250, 252, 0.95)) 100%
        );
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-share-event__body {
        display: grid;
        flex: 1;
        gap: 14px;
        min-height: 0;
        overflow-y: auto;
        padding: 18px 22px 22px;
      }

      .ms-modern-share-event--headerless .ms-modern-share-event__body {
        padding-top: 22px;
      }

      .ms-modern-share-event__summary {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 14px;
        padding: 16px;
        border-radius: 20px;
        border: 1px solid rgba(79, 70, 229, 0.12);
        background: rgba(79, 70, 229, 0.06);
        align-items: center;
      }

      .ms-modern-share-event__summary-icon {
        width: 46px;
        height: 46px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        background: linear-gradient(135deg, rgba(79, 70, 229, 0.18), rgba(20, 184, 166, 0.16));
        color: var(--ms-modern-brand-primary, #4f46e5);
        font-size: 1.1rem;
      }

      .ms-modern-share-event__summary-copy {
        min-width: 0;
        display: grid;
        gap: 4px;
      }

      .ms-modern-share-event__summary-copy strong {
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.98rem;
        font-weight: 800;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .ms-modern-share-event__summary-copy span {
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.84rem;
        line-height: 1.45;
      }

      .ms-modern-share-event__panel {
        display: grid;
        gap: 10px;
        padding: 16px;
        border-radius: 20px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.7);
      }

      .ms-modern-share-event__panel-label {
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      @media (max-width: 640px) {
        .ms-modern-share-event__header,
        .ms-modern-share-event__body {
          padding-left: 18px;
          padding-right: 18px;
        }

        .ms-modern-share-event__summary {
          grid-template-columns: 1fr;
          justify-items: start;
        }
      }
    `,
  ],
})
export class ModernShareEventModalComponent {
  private readonly defaultBackgroundColor =
    'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';

  @Input() backgroundColor = this.defaultBackgroundColor;
  @Input() isShareEventModalVisible = false;
  @Input() onShareEventClose = () => {};
  @Input() shareButtons = true;
  @Input() position = 'topRight';
  @Input() roomName = '';
  @Input() adminPasscode = '';
  @Input() islevel = '';
  @Input() eventType = 'webinar' as EventType;
  @Input() localLink = '';
  @Input() isDarkMode?: boolean;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  readonly faLink = faLink;
  readonly faShareNodes = faShareNodes;
  readonly faTimes = faTimes;

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isShareEventModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  handleClose() {
    this.onShareEventClose();
  }

  handleOverlayClick() {
    if (!this.isEmbedded()) {
      this.handleClose();
    }
  }

  resolvedSummary(): string {
    if (this.localLink?.trim()) {
      return 'Your custom event link is ready to copy and share.';
    }

    switch (this.eventType) {
      case 'broadcast':
        return 'Share this broadcast entry link with viewers or co-hosts.';
      case 'conference':
        return 'Share this collaboration room with invited participants.';
      case 'chat':
        return 'Share this room link so participants can join the conversation.';
      case 'webinar':
      default:
        return 'Share this webinar invite with attendees and speakers.';
    }
  }

  resolvedOverlayStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'static',
          inset: 'auto',
          width: '100%',
          height: '100%',
          minHeight: 0,
          display: 'block',
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
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const modalWidth = Math.min(430, Math.round(0.82 * screenWidth));

    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'relative',
          inset: 'auto',
          width: '100%',
          maxWidth: 'none',
          height: '100%',
          maxHeight: 'none',
          margin: 0,
          background: this.resolvedBackground(),
        }
      : {
          position: 'fixed',
          width: `${modalWidth}px`,
          maxHeight: 'min(78vh, 720px)',
          background: this.resolvedBackground(),
          ...this.resolvePositionStyle(),
        };

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
    if (this.backgroundColor && this.backgroundColor !== this.defaultBackgroundColor) {
      return this.backgroundColor;
    }

    return this.resolvedIsDarkMode
      ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.95) 100%)';
  }
}