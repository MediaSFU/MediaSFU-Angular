import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

import {
  CoHostResponsibility,
  EventType,
  Message,
  Participant,
  ShowAlert,
} from '../../@types/types';
import { MessagePanel } from '../../components/message-components/message-panel/message-panel.component';
import {
  SendMessage,
  SendMessageOptions,
} from '../../methods/message-methods/send-message.service';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

@Component({
  selector: 'app-messages-modal',
  imports: [CommonModule, FontAwesomeModule, MessagePanel],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isMessagesModalVisible: isMessagesModalVisible,
              eventType: eventType,
              activeTab: activeTab,
              messages: messages,
              member: member,
              closeMessagesModal: closeMessagesModal.bind(this)
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-modal-shell"
      [class.ms-modern-modal-shell--embedded]="isEmbedded()"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleOverlayClick()"
    >
      <section
        class="ms-modern-messages-modal"
        [class.ms-modern-messages-modal--embedded]="isEmbedded()"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <header *ngIf="showHeader" class="ms-modern-messages-modal__header">
          <div class="ms-modern-messages-modal__title-wrap">
            <h2 class="ms-modern-messages-modal__title">Messages</h2>
            <p class="ms-modern-messages-modal__subtitle">
              {{
                supportsDirectMessages()
                  ? 'Switch between group updates and direct conversations.'
                  : 'Stay in sync with the room conversation.'
              }}
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-messages-modal__close"
            (click)="closeMessagesModal()"
            aria-label="Close messages"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div *ngIf="supportsDirectMessages()" class="ms-modern-messages-modal__tabs">
          <button
            type="button"
            class="ms-modern-messages-modal__tab"
            [class.ms-modern-messages-modal__tab--active]="activeTab === 'direct'"
            (click)="switchToDirectTab()"
          >
            Direct
          </button>
          <button
            type="button"
            class="ms-modern-messages-modal__tab"
            [class.ms-modern-messages-modal__tab--active]="activeTab === 'group'"
            (click)="switchToGroupTab()"
          >
            Group
          </button>
        </div>

        <div class="ms-modern-messages-modal__body">
          <div
            *ngIf="activeTab === 'direct' && supportsDirectMessages() && !directMessageDetails"
            class="ms-modern-messages-modal__helper"
          >
            Select a participant to start a direct conversation, or switch back to group chat.
          </div>

          <div class="ms-modern-messages-modal__panel">
            <app-message-panel
              *ngIf="activeTab === 'direct' && supportsDirectMessages()"
              [messages]="directMessages"
              [messagesLength]="messages.length"
              type="direct"
              [onSendMessagePress]="resolvedSendMessageHandler()"
              [username]="member"
              [backgroundColor]="'transparent'"
              [focusedInput]="focusedInput"
              [showAlert]="showAlert"
              [eventType]="eventType"
              [member]="member"
              [islevel]="islevel"
              [coHostResponsibility]="coHostResponsibility"
              [coHost]="coHost"
              [directMessageDetails]="directMessageDetails"
              [updateStartDirectMessage]="updateStartDirectMessage"
              [updateDirectMessageDetails]="updateDirectMessageDetails"
              [roomName]="roomName"
              [socket]="socket"
              [chatSetting]="chatSetting"
              [startDirectMessage]="startDirectMessage"
            ></app-message-panel>

            <app-message-panel
              *ngIf="activeTab === 'group' || !supportsDirectMessages()"
              [messages]="groupMessages"
              [messagesLength]="messages.length"
              type="group"
              [onSendMessagePress]="resolvedSendMessageHandler()"
              [username]="member"
              [backgroundColor]="'transparent'"
              [focusedInput]="false"
              [showAlert]="showAlert"
              [eventType]="eventType"
              [member]="member"
              [islevel]="islevel"
              [coHostResponsibility]="coHostResponsibility"
              [coHost]="coHost"
              [directMessageDetails]="directMessageDetails"
              [updateStartDirectMessage]="updateStartDirectMessage"
              [updateDirectMessageDetails]="updateDirectMessageDetails"
              [roomName]="roomName"
              [socket]="socket"
              [chatSetting]="chatSetting"
              [startDirectMessage]="startDirectMessage"
            ></app-message-panel>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-modal-shell {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(5, 9, 20, 0.56);
      }

      .ms-modern-modal-shell--embedded {
        background: transparent;
        z-index: auto;
      }

      .ms-modern-messages-modal {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
        overflow: hidden;
        color: var(--ms-modern-text-primary, #10233f);
        background:
          linear-gradient(
            180deg,
            var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 0%,
            var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82)) 100%
          );
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        border-radius: 28px;
        box-shadow: var(--ms-modern-shadow-panel, 0 24px 64px rgba(14, 30, 53, 0.16));
        backdrop-filter: blur(20px);
      }

      .ms-modern-messages-modal--embedded {
        border-radius: 24px;
      }

      .ms-modern-messages-modal__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 20px 22px 0;
      }

      .ms-modern-messages-modal__title-wrap {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .ms-modern-messages-modal__title {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.2;
      }

      .ms-modern-messages-modal__subtitle {
        margin: 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        line-height: 1.55;
      }

      .ms-modern-messages-modal__close {
        flex: 0 0 auto;
        width: 38px;
        height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid var(--ms-modern-border-strong, rgba(46, 108, 188, 0.34));
        background:
          linear-gradient(
            180deg,
            var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 0%,
            var(--ms-modern-field-background, rgba(248, 250, 252, 0.92)) 100%
          );
        color: var(--ms-modern-text-primary, #10233f);
        box-shadow: 0 12px 28px rgba(14, 30, 53, 0.12);
        cursor: pointer;
      }

      .ms-modern-messages-modal__tabs {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        margin: 0 22px;
        padding: 4px;
        border-radius: 999px;
        background: var(--ms-modern-field-background, rgba(248, 250, 252, 0.92));
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
      }

      .ms-modern-messages-modal__tab {
        min-height: 40px;
        border: 1px solid transparent;
        border-radius: 999px;
        background: transparent;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition:
          background-color 160ms ease,
          color 160ms ease,
          border-color 160ms ease,
          box-shadow 160ms ease;
      }

      .ms-modern-messages-modal__tab--active {
        color: #ffffff;
        background: linear-gradient(135deg, var(--ms-modern-accent, #1476d2), var(--ms-modern-accent-strong, #0d5ca8));
        box-shadow: 0 12px 26px rgba(20, 118, 210, 0.22);
      }

      .ms-modern-messages-modal__body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 0 22px 22px;
      }

      .ms-modern-messages-modal__helper {
        padding: 12px 14px;
        border-radius: 16px;
        border: 1px solid color-mix(in srgb, var(--ms-modern-info, #0f6db5) 24%, transparent);
        background: color-mix(in srgb, var(--ms-modern-info, #0f6db5) 10%, transparent);
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.84rem;
        line-height: 1.6;
      }

      .ms-modern-messages-modal__panel {
        flex: 1;
        min-height: 0;
        padding: 16px;
        border-radius: 20px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82));
        overflow: hidden;
      }

      :host ::ng-deep .message-panel-container,
      :host ::ng-deep .panels-wrapper,
      :host ::ng-deep .group-panel-wrapper,
      :host ::ng-deep .direct-panel-wrapper {
        min-height: 0;
        height: 100%;
      }

      @media (max-width: 575px) {
        .ms-modern-messages-modal__header {
          padding: 18px 18px 0;
        }

        .ms-modern-messages-modal__tabs,
        .ms-modern-messages-modal__body {
          margin-left: 18px;
          margin-right: 18px;
          padding-left: 0;
          padding-right: 0;
          padding-bottom: 18px;
        }
      }
    `,
  ],
})
export class ModernMessagesModalComponent implements OnInit, OnChanges {
  @Input() isMessagesModalVisible = false;
  @Input() onMessagesClose = () => {};
  @Input() onSendMessagePress?: (options: SendMessageOptions) => Promise<void>;
  @Input() messages: Message[] = [];
  @Input() position = 'topRight';
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94))';
  @Input() activeTabBackgroundColor = 'var(--ms-modern-accent, #1476d2)';
  @Input() eventType: EventType = 'webinar';
  @Input() member = '';
  @Input() islevel = '';
  @Input() coHostResponsibility: CoHostResponsibility[] = [];
  @Input() coHost = '';
  @Input() startDirectMessage = false;
  @Input() directMessageDetails: Participant | null = null;
  @Input() updateStartDirectMessage = (_start: boolean) => {};
  @Input() updateDirectMessageDetails = (_participant: Participant | null) => {};
  @Input() showAlert?: ShowAlert;
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() chatSetting = '';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  faTimes = faTimes;
  activeTab: 'group' | 'direct' = 'direct';
  focusedInput = false;
  directMessages: Message[] = [];
  groupMessages: Message[] = [];

  constructor(private readonly sendMessageService: SendMessage) {}

  ngOnInit() {
    this.ensureSendMessageHandler();
    this.syncState();
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.ensureSendMessageHandler();
    this.syncState();
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isMessagesModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  supportsDirectMessages(): boolean {
    return this.eventType === 'webinar' || this.eventType === 'conference';
  }

  switchToDirectTab() {
    this.activeTab = 'direct';
    this.focusedInput = true;
  }

  switchToGroupTab() {
    this.activeTab = 'group';
    this.focusedInput = false;
    this.updateStartDirectMessage(false);
  }

  closeMessagesModal() {
    this.onMessagesClose();
  }

  handleOverlayClick() {
    if (!this.isEmbedded()) {
      this.closeMessagesModal();
    }
  }

  resolvedSendMessageHandler(): (options: SendMessageOptions) => Promise<void> {
    return this.onSendMessagePress ?? this.sendMessageService.sendMessage.bind(this.sendMessageService);
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
          zIndex: 'auto',
        }
      : {
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(5, 9, 20, 0.56)',
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
          top: this.position.includes('top') ? '16px' : 'auto',
          bottom: this.position.includes('bottom') ? '16px' : 'auto',
          left: this.position.includes('Left') ? '16px' : 'auto',
          right: this.position.includes('Right') ? '16px' : 'auto',
          width: 'min(460px, calc(100% - 32px))',
          maxWidth: 'calc(100% - 32px)',
          maxHeight: 'calc(100% - 32px)',
          background: this.backgroundColor,
        };

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private ensureSendMessageHandler() {
    if (!this.onSendMessagePress) {
      this.onSendMessagePress = this.sendMessageService.sendMessage.bind(this.sendMessageService);
    }
  }

  private syncState() {
    if (!this.supportsDirectMessages()) {
      this.activeTab = 'group';
      this.focusedInput = false;
    } else if (this.startDirectMessage && this.directMessageDetails) {
      this.activeTab = 'direct';
      this.focusedInput = true;
    } else if (this.activeTab !== 'direct' && this.activeTab !== 'group') {
      this.activeTab = 'direct';
      this.focusedInput = true;
    }

    this.populateMessages();
  }

  private populateMessages() {
    let chatValue = false;
    try {
      chatValue =
        this.coHostResponsibility.find((item) => item.name === 'chat')?.value || false;
    } catch {
      chatValue = false;
    }

    this.directMessages = (this.messages ?? []).filter(
      (message) =>
        !message.group &&
        (
          message.sender === this.member ||
          message.receivers.includes(this.member) ||
          this.islevel === '2' ||
          (this.coHost === this.member && chatValue === true)
        ),
    );

    this.groupMessages = (this.messages ?? []).filter((message) => message.group);
  }

  private normalizeStyle(
    style?: Partial<CSSStyleDeclaration>,
  ): Record<string, string | number> {
    return style ? ({ ...style } as Record<string, string | number>) : {};
  }
}