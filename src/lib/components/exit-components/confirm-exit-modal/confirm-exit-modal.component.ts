import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ConfirmExit,
  ConfirmExitOptions,
} from '../../../methods/exit-methods/confirm-exit.service';
import { Socket } from 'socket.io-client';

export interface ConfirmExitModalOptions {
  isConfirmExitModalVisible: boolean;
  onConfirmExitClose: () => void;
  position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  backgroundColor?: string;
  exitEventOnConfirm?: (options: ConfirmExitOptions) => void;
  member: string;
  ban?: boolean;
  roomName: string;
  socket: Socket;
  islevel: string;
}

export type ConfirmExitModalType = (options: ConfirmExitModalOptions) => HTMLElement;

/**
 * ConfirmExitModal component renders a modal view for exit confirmation,
 * allowing users to confirm or cancel an exit event from a session or room.
 *
 * @component
 * @selector app-confirm-exit-modal
 * @standalone true
 * @imports [CommonModule, FormsModule, FontAwesomeModule]
 *
 * @example
 * ```html
 * <app-confirm-exit-modal
 *   [isConfirmExitModalVisible]="true"
 *   [onConfirmExitClose]="closeModal"
 *   [exitEventOnConfirm]="confirmExit"
 *   [member]="memberName"
 *   [ban]="false"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [islevel]="userLevel">
 * </app-confirm-exit-modal>
 * ```
 *
 * @input {boolean} isConfirmExitModalVisible - Determines the visibility of the modal.
 * @input {() => void} onConfirmExitClose - Callback to close the modal.
 * @input {string} position - Position on the screen (default: 'topRight').
 * @input {string} backgroundColor - Background color of the modal (default: '#83c0e9').
 * @input {(options: ConfirmExitOptions) => void} exitEventOnConfirm - Callback function to handle exit confirmation.
 * @input {string} member - Identifies the member for whom the exit is confirmed.
 * @input {boolean} ban - Indicates if the exit action includes a ban.
 * @input {string} roomName - Name of the room involved in the exit action.
 * @input {Socket} socket - Socket instance for real-time interaction.
 * @input {string} islevel - User level information.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 * @property {any} modalContentStyle - Object defining the style for modal content.
 *
 * @constructor
 * @param {ConfirmExit} confirmExitService - Service to handle the exit confirmation.
 *
 * @method ngOnInit - Initializes component properties and default styles for the modal content.
 * @method ngOnChanges - Updates component state upon changes in input properties.
 * @param {SimpleChanges} changes - Object containing the current and previous property values.
 *
 * @method handleConfirmExit - Handles the exit confirmation event, triggering the provided `exitEventOnConfirm` function and then closing the modal.
 */

@Component({
  selector: 'app-confirm-exit-modal',
  templateUrl: './confirm-exit-modal.component.html',
  styleUrls: ['./confirm-exit-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class ConfirmExitModal implements OnInit, OnChanges {
  @Input() isConfirmExitModalVisible = false;
  @Input() onConfirmExitClose!: () => void;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() exitEventOnConfirm!: (options: ConfirmExitOptions) => void;
  @Input() member = '';
  @Input() ban = false;
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() islevel = '';

  faTimes = faTimes;

  modalContentStyle: any;

  constructor(private confirmExitService: ConfirmExit) {}

  ngOnInit() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.8 * screenWidth;
    if (modalWidth > 350) {
      modalWidth = 350;
    }

    this.modalContentStyle = {
      backgroundColor: this.backgroundColor,
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
      width: `${modalWidth}px`,
    };

    if (!this.exitEventOnConfirm) {
      this.exitEventOnConfirm = this.confirmExitService.confirmExit.bind(this.confirmExitService);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isConfirmExitModalVisible'] && changes['islevel']) {
      this.islevel = changes['islevel'].currentValue;
    }
  }

  handleConfirmExit() {
    this.exitEventOnConfirm({
      socket: this.socket,
      member: this.member,
      roomName: this.roomName,
      ban: this.ban,
    });
    this.onConfirmExitClose();
  }
}
