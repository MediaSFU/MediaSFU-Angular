import { Component, Input, OnInit, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Socket } from 'socket.io-client';

export interface ConfirmHereModalOptions {
  isConfirmHereModalVisible: boolean;
  position: string;
  backgroundColor: string;
  displayColor: string;
  onConfirmHereClose: () => void;
  socket: Socket;
  localSocket?: Socket;
  roomName: string;
  member: string;
  countdownDuration?: number;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type ConfirmHereModalType = (options: ConfirmHereModalOptions) => void;

/**
 * ConfirmHereModal - Presence confirmation modal with countdown timer
 * 
 * @component
 * @description
 * Displays an "Are you still here?" modal with countdown timer to confirm user presence.
 * Automatically disconnects user if they don't respond within the countdown duration.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with custom countdown and callbacks
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Countdown timer with visual feedback
 * - Automatic disconnect on timeout
 * - Socket-based presence confirmation
 * - "Yes, I'm here" confirmation button
 * - Configurable duration and styling
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-confirm-here-modal
 *   [isConfirmHereModalVisible]="showPresenceCheck"
 *   [socket]="socketInstance"
 *   [roomName]="currentRoom"
 *   [member]="currentMember"
 *   [countdownDuration]="120"
 *   [onConfirmHereClose]="handlePresenceConfirmed">
 * </app-confirm-here-modal>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-confirm-here-modal
 *   [isConfirmHereModalVisible]="showPresenceCheck"
 *   [socket]="socketInstance"
 *   [roomName]="currentRoom"
 *   [member]="currentMember"
 *   [countdownDuration]="90"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.9)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#1e1e1e',
 *     border: '3px solid #ff6b6b',
 *     borderRadius: '15px',
 *     padding: '30px'
 *   }"
 *   [displayColor]="'#ff6b6b'"
 *   [onConfirmHereClose]="handlePresenceConfirmed">
 * </app-confirm-here-modal>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-confirm-here-modal
 *   [isConfirmHereModalVisible]="showPresenceCheck"
 *   [customTemplate]="customPresenceTemplate"
 *   [onConfirmHereClose]="handlePresenceConfirmed">
 * </app-confirm-here-modal>
 * 
 * <ng-template #customPresenceTemplate let-counter="counter" let-onConfirm="onConfirm">
 *   <div class="custom-presence-check">
 *     <div class="countdown-circle">{{ counter }}</div>
 *     <h3>Still there?</h3>
 *     <p>You'll be disconnected in {{ counter }} seconds</p>
 *     <button (click)="onConfirm()" class="confirm-btn">I'm here!</button>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-confirm-here-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 * 
 * @input isConfirmHereModalVisible - Whether the modal is currently visible. Default: `false`
 * @input position - Modal position on screen (e.g., 'center', 'topCenter'). Default: `'center'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input displayColor - Color of the countdown timer text. Default: `'#000000'`
 * @input onConfirmHereClose - Callback function when user confirms presence or modal closes. Default: `() => {}`
 * @input socket - Socket.io client instance for real-time communication. Default: `undefined`
 * @input localSocket - Optional local socket instance for community edition. Default: `undefined`
 * @input roomName - Name of the room/session for presence confirmation. Default: `''`
 * @input member - Name/ID of the member confirming presence. Default: `''`
 * @input countdownDuration - Countdown duration in seconds before auto-disconnect. Default: `120`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes countdown timer and socket listeners
 * @method ngOnDestroy - Cleans up timers and socket listeners
 * @method startCountdown - Begins countdown timer
 * @method stopCountdown - Stops countdown timer
 * @method handleConfirmHere - Handles user confirmation and sends socket event
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 */

@Component({
  selector: 'app-confirm-here-modal',
  templateUrl: './confirm-here-modal.component.html',
  styleUrls: ['./confirm-here-modal.component.css'],
  imports: [CommonModule, FontAwesomeModule],
  styles: [
    `
      .spinner {
        border: 12px solid #f3f3f3; /* Light grey */
        border-top: 12px solid black; /* Black */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .loading-text {
        margin-top: 10px;
      }
    `,
  ],
})
export class ConfirmHereModal implements OnInit, OnDestroy {
  @Input() isConfirmHereModalVisible = false;
  @Input() position = 'center';
  @Input() backgroundColor = '#83c0e9';
  @Input() displayColor = '#000000';
  @Input() onConfirmHereClose!: () => void;
  @Input() countdownDuration?: number = 120;
  @Input() socket!: Socket;
  @Input() localSocket?: Socket; // Added localSocket input
  @Input() roomName!: string;
  @Input() member!: string;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  faSpinner = faSpinner;
  counter!: number;
  countdownInterval: any;

  ngOnInit() {
    this.counter = this.countdownDuration ? this.countdownDuration : 120;
    if (this.isConfirmHereModalVisible) {
      this.startCountdown();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isConfirmHereModalVisible'] && changes['isConfirmHereModalVisible'].currentValue) {
      this.counter = this.countdownDuration ? this.countdownDuration : 120;
      this.startCountdown();
    } else {
      this.clearCountdown();
    }
  }

  ngOnDestroy() {
    this.clearCountdown();
  }

  getCombinedOverlayStyle() {
    return {
      ...this.modalContainerStyle,
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      ...this.modalContentStyle,
      ...(this.contentStyle || {})
    };
  }

  startCountdown = () => {
    this.countdownInterval = setInterval(() => {
      this.counter--;
      if (this.counter <= 0) {
        this.clearCountdown();
        this.socket.emit('disconnectUser', {
          member: this.member,
          roomName: this.roomName,
          ban: false,
        });

        // Emit to localSocket if available
        if (this.localSocket && this.localSocket.id) {
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
  };

  clearCountdown = () => {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  };

  handleConfirmHere() {
    this.clearCountdown();
    this.onConfirmHereClose();
  }

  get spinnerContainerStyle() {
    return {
      marginBottom: '20px',
    };
  }

  get modalContainerStyle() {
    return {
      'background-color': this.backgroundColor || 'rgba(0, 0, 0, 0.5)',
      display: this.isConfirmHereModalVisible ? 'block' : 'none',
    };
  }

  get modalContentStyle() {
    return {
      'background-color': this.backgroundColor,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }
}
