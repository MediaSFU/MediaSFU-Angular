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
