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
 * Component for displaying a confirmation modal when exiting.
 *
 * @selector app-confirm-exit-modal
 * @templateUrl ./confirm-exit-modal.component.html
 * @styleUrls ./confirm-exit-modal.component.css
 * @standalone true
 * @imports [CommonModule, FormsModule, FontAwesomeModule]
 *
 * @class ConfirmExitModal
 * @implements OnInit, OnChanges
 *
 * @property {boolean} isConfirmExitModalVisible - Visibility state of the confirmation modal.
 * @property {() => void} onConfirmExitClose - Callback function to close the modal.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {(options: ConfirmExitOptions) => void} exitEventOnConfirm - Event triggered on confirming exit.
 * @property {string} member - Member information.
 * @property {boolean} ban - Ban status.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance.
 * @property {string} islevel - Level information.
 * @property {IconDefinition} faTimes - FontAwesome icon for close button.
 * @property {any} modalContentStyle - Style object for modal content.
 *
 * @constructor
 * @param {ConfirmExit} confirmExitService - Service for handling exit confirmation.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @param {SimpleChanges} changes - Object of current and previous property values.
 * @method handleConfirmExit - Handles the exit confirmation event.
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
