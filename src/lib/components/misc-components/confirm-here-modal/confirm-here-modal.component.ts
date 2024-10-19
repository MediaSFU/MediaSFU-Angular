import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
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
  roomName: string;
  member: string;
  countdownDuration?: number;
}

export type ConfirmHereModalType = (options: ConfirmHereModalOptions) => void;

/**
 * Component representing a confirmation modal with a countdown timer.
 *
 * @selector app-confirm-here-modal
 * @templateUrl ./confirm-here-modal.component.html
 * @styleUrls ./confirm-here-modal.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @styles
 * - .spinner: Styles for the loading spinner.
 * - @keyframes spin: Keyframes for spinner animation.
 * - .modal-content: Styles for the modal content container.
 * - .loading-text: Styles for the loading text.
 *
 * @class ConfirmHereModal
 * @implements OnInit, OnDestroy
 *
 * @property {boolean} isConfirmHereModalVisible - Determines if the modal is visible.
 * @property {string} position - Position of the modal.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} displayColor - Display color of the modal.
 * @property {Function} onConfirmHereClose - Callback function to execute when the modal is closed.
 * @property {number} [countdownDuration=120] - Duration of the countdown in seconds.
 * @property {Socket} socket - Socket instance for communication.
 * @property {string} roomName - Name of the room for socket communication.
 * @property {string} member - Member identifier for socket communication.
 * @property {IconDefinition} faSpinner - FontAwesome spinner icon.
 * @property {number} counter - Countdown counter.
 * @property {any} countdownInterval - Interval ID for the countdown timer.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 * @method startCountdown - Starts the countdown timer.
 * @method clearCountdown - Clears the countdown timer.
 * @method handleConfirmHere - Handles the confirmation action and closes the modal.
 *
 * @getter spinnerContainerStyle - Returns the style object for the spinner container.
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
 */
@Component({
  selector: 'app-confirm-here-modal',
  templateUrl: './confirm-here-modal.component.html',
  styleUrls: ['./confirm-here-modal.component.css'],
  standalone: true,
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
  @Input() roomName!: string;
  @Input() member!: string;

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
