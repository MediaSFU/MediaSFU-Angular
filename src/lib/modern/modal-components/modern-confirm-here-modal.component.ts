import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-confirm-here-modal',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <ng-container *ngIf="isConfirmHereModalVisible && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isConfirmHereModalVisible: isConfirmHereModalVisible,
              position: position,
              backgroundColor: backgroundColor,
              displayColor: displayColor,
              counter: counter,
              handleConfirmHere: handleConfirmHere.bind(this),
              onConfirmHereClose: onConfirmHereClose,
              onSuppressConfirmHere: onSuppressConfirmHere,
              doNotShowAgain: doNotShowAgain
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isConfirmHereModalVisible && !customTemplate"
      class="ms-modern-confirm-here-overlay"
      [class.ms-modern-confirm-here-overlay--dark]="resolvedIsDarkMode"
      [class.ms-modern-confirm-here-overlay--light]="!resolvedIsDarkMode"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleConfirmHere()"
    >
      <section
        class="ms-modern-confirm-here"
        [class.ms-modern-confirm-here--dark]="resolvedIsDarkMode"
        [class.ms-modern-confirm-here--light]="!resolvedIsDarkMode"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <div class="ms-modern-confirm-here__spinner-wrap" [ngStyle]="{ color: resolvedAccentColor }">
          <div class="ms-modern-confirm-here__spinner-ring"></div>
          <fa-icon [icon]="faSpinner" class="ms-modern-confirm-here__spinner-icon"></fa-icon>
          <span class="ms-modern-confirm-here__count">{{ counter }}</span>
        </div>

        <h2 class="ms-modern-confirm-here__title">Are You Still Here?</h2>
        <p class="ms-modern-confirm-here__message">
          Please confirm your presence to stay connected to the meeting.
        </p>
        <p class="ms-modern-confirm-here__timer">
          Time remaining: <strong [ngStyle]="{ color: resolvedAccentColor }">{{ counter }}</strong>
        </p>

        <label
          *ngIf="onSuppressConfirmHere"
          class="ms-modern-confirm-here__toggle"
        >
          <input
            type="checkbox"
            class="ms-modern-confirm-here__toggle-input"
            [checked]="doNotShowAgain"
            (click)="$event.stopPropagation()"
            (change)="updateSuppressConfirmHere($event)"
          />
          <span>Don't show again this session</span>
        </label>

        <button
          type="button"
          class="ms-modern-confirm-here__action"
          (click)="handleConfirmHere()"
        >
          Yes, I'm here
        </button>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-confirm-here-overlay {
        position: fixed;
        inset: 0;
        display: block;
        backdrop-filter: blur(10px);
        z-index: 1000;
      }

      .ms-modern-confirm-here-overlay--dark {
        background: rgba(2, 8, 23, 0.78);
      }

      .ms-modern-confirm-here-overlay--light {
        background: rgba(15, 23, 42, 0.42);
      }

      .ms-modern-confirm-here {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: min(420px, calc(100vw - 32px));
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        padding: 28px 24px;
        border-radius: 28px;
        text-align: center;
      }

      .ms-modern-confirm-here--dark {
        border: 1px solid rgba(148, 163, 184, 0.18);
        background: linear-gradient(180deg, rgba(15, 27, 49, 0.96) 0%, rgba(10, 18, 33, 0.94) 100%);
        box-shadow: 0 28px 70px rgba(2, 8, 23, 0.46);
        color: #f8fafc;
      }

      .ms-modern-confirm-here--light {
        border: 1px solid rgba(120, 143, 173, 0.22);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(241, 245, 249, 0.95) 100%);
        box-shadow: 0 28px 70px rgba(15, 23, 42, 0.24);
        color: #10233f;
      }

      .ms-modern-confirm-here__spinner-wrap {
        position: relative;
        width: 92px;
        height: 92px;
        display: grid;
        place-items: center;
      }

      .ms-modern-confirm-here__spinner-ring {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        border: 6px solid color-mix(in srgb, currentColor 20%, transparent);
        border-top-color: currentColor;
        animation: ms-confirm-here-spin 1.2s linear infinite;
      }

      .ms-modern-confirm-here__spinner-icon {
        position: absolute;
        top: 18px;
        font-size: 1rem;
        opacity: 0.75;
      }

      .ms-modern-confirm-here__count {
        position: relative;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.9rem;
        font-weight: 800;
      }

      .ms-modern-confirm-here__title {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.4rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .ms-modern-confirm-here__message {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.94rem;
        line-height: 1.55;
      }

      .ms-modern-confirm-here--dark .ms-modern-confirm-here__message,
      .ms-modern-confirm-here--dark .ms-modern-confirm-here__timer,
      .ms-modern-confirm-here--dark .ms-modern-confirm-here__toggle {
        color: rgba(226, 232, 240, 0.82);
      }

      .ms-modern-confirm-here--light .ms-modern-confirm-here__message,
      .ms-modern-confirm-here--light .ms-modern-confirm-here__timer,
      .ms-modern-confirm-here--light .ms-modern-confirm-here__toggle {
        color: rgba(16, 35, 63, 0.78);
      }

      .ms-modern-confirm-here__timer {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
      }

      .ms-modern-confirm-here__toggle {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        line-height: 1.4;
        cursor: pointer;
      }

      .ms-modern-confirm-here__toggle-input {
        width: 16px;
        height: 16px;
        margin: 0;
        cursor: pointer;
      }

      .ms-modern-confirm-here--dark .ms-modern-confirm-here__toggle-input {
        accent-color: #8bdbff;
      }

      .ms-modern-confirm-here--light .ms-modern-confirm-here__toggle-input {
        accent-color: #2563eb;
      }

      .ms-modern-confirm-here__action {
        min-width: 180px;
        min-height: 48px;
        border: none;
        border-radius: 999px;
        padding: 0 20px;
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        color: #fff;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.95rem;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 18px 34px rgba(34, 197, 94, 0.22);
        transition: transform 140ms ease, box-shadow 140ms ease;
      }

      .ms-modern-confirm-here__action:hover,
      .ms-modern-confirm-here__action:focus-visible {
        transform: translateY(-1px);
        box-shadow: 0 22px 40px rgba(34, 197, 94, 0.28);
      }

      .ms-modern-confirm-here__action:focus-visible {
        outline: 2px solid rgba(59, 130, 246, 0.4);
        outline-offset: 2px;
      }

      @keyframes ms-confirm-here-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 640px) {
        .ms-modern-confirm-here {
          padding-left: 18px;
          padding-right: 18px;
        }
      }
    `,
  ],
})
export class ModernConfirmHereModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isConfirmHereModalVisible = false;
  @Input() position = 'center';
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';
  @Input() displayColor = '';
  @Input() isDarkMode = false;
  @Input() onConfirmHereClose = () => {};
  @Input() onSuppressConfirmHere?: () => void;
  @Input() socket = {} as Socket;
  @Input() localSocket?: Socket;
  @Input() roomName = '';
  @Input() member = '';
  @Input() countdownDuration = 120;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;

  readonly faSpinner = faSpinner;

  counter = 120;
  doNotShowAgain = false;
  private countdownInterval?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.counter = this.countdownDuration || 120;

    if (this.isConfirmHereModalVisible) {
      this.startCountdown();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isConfirmHereModalVisible']?.currentValue) {
      this.counter = this.countdownDuration || 120;
      this.startCountdown();
      return;
    }

    if (changes['isConfirmHereModalVisible']) {
      this.clearCountdown();
    }
  }

  ngOnDestroy() {
    this.clearCountdown();
  }

  get resolvedIsDarkMode(): boolean {
    return !!this.isDarkMode;
  }

  get resolvedAccentColor(): string {
    if (this.displayColor) {
      return this.displayColor;
    }

    if (this.counter <= 30) {
      return '#ef4444';
    }

    if (this.counter <= 60) {
      return '#f59e0b';
    }

    return this.resolvedIsDarkMode ? '#8bdbff' : '#2563eb';
  }

  handleConfirmHere() {
    this.clearCountdown();

    if (this.doNotShowAgain) {
      this.onSuppressConfirmHere?.();
    }

    this.onConfirmHereClose();
  }

  updateSuppressConfirmHere(event: Event) {
    this.doNotShowAgain = !!(event.target as HTMLInputElement | null)?.checked;
  }

  resolvedOverlayStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = {
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      background: this.resolvedIsDarkMode ? 'rgba(2, 8, 23, 0.78)' : 'rgba(15, 23, 42, 0.42)',
      zIndex: 1000,
    };

    return { ...baseStyle, ...this.normalizeStyle(this.overlayStyle) };
  }

  resolvedContentStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = {
      position: 'fixed',
      width: 'min(420px, calc(100vw - 32px))',
      background: this.backgroundColor || undefined,
      ...this.resolvePositionStyle(),
    };

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private startCountdown() {
    this.clearCountdown();

    this.countdownInterval = setInterval(() => {
      this.counter -= 1;

      if (this.counter <= 0) {
        this.clearCountdown();
        this.socket.emit('disconnectUser', {
          member: this.member,
          roomName: this.roomName,
          ban: false,
        });

        if (this.localSocket?.id) {
          try {
            this.localSocket.emit('disconnectUser', {
              member: this.member,
              roomName: this.roomName,
              ban: false,
            });
          } catch (error) {
            console.error('Error emitting disconnect to localSocket:', error);
          }
        }

        this.onConfirmHereClose();
      }
    }, 1000);
  }

  private clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = undefined;
    }
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