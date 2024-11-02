/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { WaitingRoomParticipant } from '../../@types/types';
import {
  RespondToWaiting,
  RespondToWaitingOptions,
  RespondToWaitingType,
} from '../../methods/waiting-methods/respond-to-waiting.service';
import { Socket } from 'socket.io-client';

export interface WaitingRoomModalParameters {
  filteredWaitingRoomList: WaitingRoomParticipant[];

  // mediasfu functions
  getUpdatedAllParams: () => WaitingRoomModalParameters;
  [key: string]: any;
}

export interface WaitingRoomModalOptions {
  isWaitingModalVisible: boolean;
  onWaitingRoomClose: () => void;
  waitingRoomCounter: number;
  onWaitingRoomFilterChange: (filter: string) => void;
  waitingRoomList: WaitingRoomParticipant[];
  updateWaitingList: (updatedList: WaitingRoomParticipant[]) => void;
  roomName: string;
  socket: Socket;
  position?: string;
  backgroundColor?: string;
  parameters: WaitingRoomModalParameters;

  // mediasfu functions
  onWaitingRoomItemPress?: RespondToWaitingType;
}

export type WaitingRoomModalType = (options: WaitingRoomModalOptions) => HTMLElement;

/**
 * Component representing a modal for managing participants in a waiting room.
 *
 * @component
 * @selector app-waiting-room-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * @templateUrl ./waiting-room-modal.component.html
 * @styleUrls ['./waiting-room-modal.component.css']
 *
 * @property {boolean} isWaitingModalVisible - Visibility state of the modal.
 * @property {number} waitingRoomCounter - Counter for the number of participants in the waiting room.
 * @property {WaitingRoomParticipant[]} waitingRoomList - List of participants in the waiting room.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance for communication.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {WaitingRoomModalParameters} parameters - Parameters for the waiting room modal.
 * @property {function} onWaitingRoomClose - Function to call when the modal is closed.
 * @property {function} onWaitingRoomFilterChange - Function to call when the filter value changes.
 * @property {function} updateWaitingList - Function to update the waiting list.
 * @property {function} onWaitingRoomItemPress - Function to call when an item in the waiting room is pressed.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 * @property {IconDefinition} faCheck - FontAwesome icon for the check button.
 * @property {WaitingRoomParticipant[]} waitingRoomList_s - Filtered list of participants in the waiting room.
 * @property {number} waitingRoomCounter_s - Counter for the filtered list of participants in the waiting room.
 * @property {boolean} reRender - Flag to trigger re-rendering of the component.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @method updateParameters - Updates the parameters for the waiting room modal.
 * @method handleModalClose - Handles the closing of the modal.
 * @method handleFilterChange - Handles the change in the filter input.
 * @method handleItemPress - Handles the pressing of an item in the waiting room.
 *
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
 * @getter inputStyle - Returns the style object for the input field.
 *
 * @example
 * ```html
 * <app-waiting-room-modal
 *  [isWaitingModalVisible]="true"
 * [waitingRoomCounter]="waitingRoomCounter"
 * [waitingRoomList]="waitingRoomList"
 * [roomName]="roomName"
 * [socket]="socket"
 * [position]="'topRight'"
 * [backgroundColor]="'#83c0e9'"
 * [parameters]="waitingRoomModalParams"
 * [onWaitingRoomClose]="closeWaitingRoomModal"
 * [onWaitingRoomFilterChange]="filterWaitingRoom"
 * [updateWaitingList]="updateWaitingList"
 * [onWaitingRoomItemPress]="handleWaitingRoomItemPress"
 * ></app-waiting-room-modal>
 * ```
 *
 */
@Component({
  selector: 'app-waiting-room-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './waiting-room-modal.component.html',
  styleUrls: ['./waiting-room-modal.component.css'],
})
export class WaitingRoomModal implements OnChanges, OnInit {
  constructor(private respondToWaitingService: RespondToWaiting) {}

  @Input() isWaitingModalVisible = false;
  @Input() waitingRoomCounter = 0;
  @Input() waitingRoomList: WaitingRoomParticipant[] = [];
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() parameters: WaitingRoomModalParameters = {} as WaitingRoomModalParameters;
  @Input() onWaitingRoomClose: () => void = () => {};
  @Input() onWaitingRoomFilterChange: (value: string) => void = () => {};
  @Input() updateWaitingList: (data: WaitingRoomParticipant[]) => void = () => {};
  @Input() onWaitingRoomItemPress!: (data: RespondToWaitingOptions) => void;

  faTimes = faTimes;
  faCheck = faCheck;
  waitingRoomList_s: WaitingRoomParticipant[] = [];
  waitingRoomCounter_s = 0;
  reRender = false;

  ngOnInit() {
    if (!this.onWaitingRoomItemPress) {
      this.onWaitingRoomItemPress = (data: any) =>
        this.respondToWaitingService.respondToWaiting(data);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['waitingRoomList'] || changes['reRender']) {
      this.updateParameters();
    }
  }

  updateParameters() {
    let { getUpdatedAllParams } = this.parameters;
    this.parameters = getUpdatedAllParams();

    this.waitingRoomList_s = this.parameters.filteredWaitingRoomList;
    this.waitingRoomCounter_s = this.parameters.filteredWaitingRoomList.length;
  }

  handleModalClose() {
    this.onWaitingRoomClose();
  }

  handleFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.onWaitingRoomFilterChange(value);
    this.reRender = !this.reRender;
  }

  handleItemPress(participant: WaitingRoomParticipant, type: boolean) {
    this.onWaitingRoomItemPress({
      participantId: participant.id,
      participantName: participant.name,
      updateWaitingList: this.updateWaitingList,
      waitingList: this.waitingRoomList,
      roomName: this.roomName,
      type: type, // true for accepted, false for rejected
      socket: this.socket,
    });
  }

  get modalContainerStyle() {
    return {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: this.isWaitingModalVisible ? 'block' : 'none',
      zIndex: '999',
    };
  }

  get modalContentStyle() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.8 * screenWidth;
    if (modalWidth > 350) {
      modalWidth = 350;
    }
    return {
      position: 'fixed',
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: `${modalWidth}px`,
      maxHeight: '65%',
      overflowY: 'auto',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
    };
  }

  get inputStyle() {
    return {
      width: '90%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #000',
      fontSize: '16px',
      marginBottom: '10px',
    };
  }
}
