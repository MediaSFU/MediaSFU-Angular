import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faExclamationTriangle,
  faSignOutAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

import {
  ConfirmExit,
  ConfirmExitOptions,
} from '../../methods/exit-methods/confirm-exit.service';

@Component({
  selector: 'app-confirm-exit-modal',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <ng-container *ngIf="isConfirmExitModalVisible && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isConfirmExitModalVisible: isConfirmExitModalVisible,
              onConfirmExitClose: onConfirmExitClose,
              position: position,
              backgroundColor: backgroundColor,
              member: member,
              ban: ban,
              roomName: roomName,
              socket: socket,
              islevel: islevel,
              title: resolvedTitle(),
              message: resolvedMessage(),
              confirmLabel: resolvedConfirmLabel(),
              leaveLabel: resolvedLeaveLabel(),
              cancelLabel: resolvedCancelLabel(),
              handleConfirmExit: handleConfirmExit.bind(this),
              leaveWithoutEnding: handleConfirmExit.bind(this, false)
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isConfirmExitModalVisible && !customTemplate"
      class="ms-modern-confirm-exit-overlay"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="onConfirmExitClose()"
    >
      <section
        class="ms-modern-confirm-exit"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <header class="ms-modern-confirm-exit__header">
          <div>
            <span class="ms-modern-confirm-exit__eyebrow">Confirmation</span>
            <h2 class="ms-modern-confirm-exit__title">
              <fa-icon [icon]="faSignOutAlt"></fa-icon>
              {{ resolvedTitle() }}
            </h2>
          </div>

          <button
            type="button"
            class="ms-modern-confirm-exit__close"
            aria-label="Close confirm exit"
            (click)="onConfirmExitClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-confirm-exit__body">
          <div class="ms-modern-confirm-exit__icon-wrap">
            <fa-icon [icon]="faExclamationTriangle"></fa-icon>
          </div>

          <p class="ms-modern-confirm-exit__message">
            {{ resolvedMessage() }}
          </p>
        </div>

        <footer class="ms-modern-confirm-exit__footer">
          <button
            type="button"
            class="ms-modern-confirm-exit__action ms-modern-confirm-exit__action--secondary"
            (click)="onConfirmExitClose()"
          >
            {{ resolvedCancelLabel() }}
          </button>

          <button
            *ngIf="isHostExit()"
            type="button"
            class="ms-modern-confirm-exit__action ms-modern-confirm-exit__action--secondary"
            (click)="handleConfirmExit(false)"
          >
            {{ resolvedLeaveLabel() }}
          </button>

          <button
            type="button"
            class="ms-modern-confirm-exit__action ms-modern-confirm-exit__action--primary"
            (click)="handleConfirmExit(true)"
          >
            {{ resolvedConfirmLabel() }}
          </button>
        </footer>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-confirm-exit-overlay {
        position: fixed;
        inset: 0;
        display: block;
        background: rgba(2, 8, 23, 0.66);
        backdrop-filter: blur(10px);
        z-index: 1000;
      }

      .ms-modern-confirm-exit {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 26px;
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

      .ms-modern-confirm-exit__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 16px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
      }

      .ms-modern-confirm-exit__eyebrow {
        display: block;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-confirm-exit__title {
        margin: 6px 0 0;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.24rem;
        font-weight: 800;
        line-height: 1.15;
        color: #dc2626;
      }

      .ms-modern-confirm-exit__close {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-confirm-exit__body {
        display: grid;
        gap: 16px;
        padding: 24px 22px;
        text-align: center;
      }

      .ms-modern-confirm-exit__icon-wrap {
        width: 68px;
        height: 68px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border-radius: 999px;
        background: rgba(239, 68, 68, 0.12);
        color: #dc2626;
        font-size: 1.7rem;
      }

      .ms-modern-confirm-exit__message {
        margin: 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.96rem;
        font-weight: 500;
        line-height: 1.6;
      }

      .ms-modern-confirm-exit__footer {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        padding: 0 22px 22px;
      }

      .ms-modern-confirm-exit__action {
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

      .ms-modern-confirm-exit__action--secondary {
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.64);
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-confirm-exit__action--primary {
        border: none;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: #fff;
        box-shadow: 0 16px 32px rgba(220, 38, 38, 0.2);
      }

      @media (max-width: 640px) {
        .ms-modern-confirm-exit__header,
        .ms-modern-confirm-exit__body,
        .ms-modern-confirm-exit__footer {
          padding-left: 18px;
          padding-right: 18px;
        }

        .ms-modern-confirm-exit__footer {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ModernConfirmExitModalComponent implements OnInit {
  @Input() isConfirmExitModalVisible = false;
  @Input() onConfirmExitClose = () => {};
  @Input() position = 'center';
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';
  @Input() exitEventOnConfirm?: (options: ConfirmExitOptions) => void;
  @Input() member = '';
  @Input() ban = false;
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() islevel = '';
  @Input() title?: string;
  @Input() confirmLabel?: string;
  @Input() leaveLabel?: string;
  @Input() cancelLabel?: string;
  @Input() message?: string | ((context: { islevel: string }) => string);
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;

  readonly faExclamationTriangle = faExclamationTriangle;
  readonly faSignOutAlt = faSignOutAlt;
  readonly faTimes = faTimes;

  constructor(private readonly confirmExitService: ConfirmExit) {}

  ngOnInit() {
    if (!this.exitEventOnConfirm) {
      this.exitEventOnConfirm = this.confirmExitService.confirmExit.bind(this.confirmExitService);
    }
  }

  isHostExit(): boolean {
    return this.islevel === '2' && !this.ban;
  }

  handleConfirmExit(endRoomOnHostExit = true) {
    this.exitEventOnConfirm?.({
      socket: this.socket,
      member: this.member,
      roomName: this.roomName,
      ban: this.ban,
      endRoomOnHostExit,
    });
    this.onConfirmExitClose();
  }

  resolvedTitle(): string {
    if (this.title) {
      return this.title;
    }

    if (this.ban) {
      return 'Ban participant';
    }

    return this.isHostExit() ? 'Leave or end meeting' : 'Leave Meeting';
  }

  resolvedMessage(): string {
    if (typeof this.message === 'function') {
      return this.message({ islevel: this.islevel });
    }

    if (typeof this.message === 'string' && this.message.trim().length) {
      return this.message;
    }

    if (this.ban) {
      return `Are you sure you want to remove ${this.member || 'this participant'} and block re-entry?`;
    }

    return this.isHostExit()
      ? 'Leave room keeps the meeting active for everyone else and lets you rejoin. End for everyone closes it for all participants.'
      : 'Are you sure you want to leave the meeting?';
  }

  resolvedConfirmLabel(): string {
    if (this.confirmLabel) {
      return this.confirmLabel;
    }

    if (this.ban) {
      return 'Ban & Exit';
    }

    return this.isHostExit() ? 'End for everyone' : 'Leave';
  }

  resolvedLeaveLabel(): string {
    return this.leaveLabel || 'Leave room';
  }

  resolvedCancelLabel(): string {
    return this.cancelLabel || 'Cancel';
  }

  resolvedOverlayStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = {
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(2, 8, 23, 0.66)',
      zIndex: 1000,
    };

    return { ...baseStyle, ...this.normalizeStyle(this.overlayStyle) };
  }

  resolvedContentStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = {
      position: 'fixed',
      width: 'min(400px, calc(100vw - 32px))',
      background: this.backgroundColor,
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
}
