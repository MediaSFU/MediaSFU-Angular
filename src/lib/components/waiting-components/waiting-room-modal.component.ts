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
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;

  // mediasfu functions
  onWaitingRoomItemPress?: RespondToWaitingType;
}

export type WaitingRoomModalType = (options: WaitingRoomModalOptions) => HTMLElement;

/**
 * WaitingRoomModal - Modal for managing participants waiting to join the session
 * 
 * @component
 * @description
 * Displays participants in the waiting room and allows host to admit or reject them.
 * Provides filtering and batch admission capabilities.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with waiting participant list and admit/reject actions
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Waiting participant list with names
 * - Admit/reject individual participants
 * - Participant filtering by name
 * - Real-time counter badge
 * - Socket-based admission handling
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-waiting-room-modal
 *   [isWaitingModalVisible]="showWaitingRoom"
 *   [waitingRoomCounter]="waitingCount"
 *   [waitingRoomList]="waitingParticipants"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [parameters]="waitingRoomParams"
 *   [onWaitingRoomClose]="closeWaitingRoom"
 *   [onWaitingRoomFilterChange]="filterWaiting"
 *   [updateWaitingList]="updateWaiting">
 * </app-waiting-room-modal>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-waiting-room-modal
 *   [isWaitingModalVisible]="showWaitingRoom"
 *   [waitingRoomCounter]="waitingCount"
 *   [waitingRoomList]="waitingParticipants"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.9)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#1e1e1e',
 *     borderRadius: '10px',
 *     border: '1px solid #4a90e2'
 *   }"
 *   [backgroundColor]="'#2c3e50'"
 *   [position]="'center'"
 *   [onWaitingRoomClose]="closeWaitingRoom"
 *   [updateWaitingList]="updateWaiting">
 * </app-waiting-room-modal>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-waiting-room-modal
 *   [isWaitingModalVisible]="showWaitingRoom"
 *   [customTemplate]="customWaitingTemplate"
 *   [onWaitingRoomClose]="closeWaitingRoom">
 * </app-waiting-room-modal>
 * 
 * <ng-template #customWaitingTemplate let-waitingList="waitingRoomList" let-onAdmit="onAdmit" let-onReject="onReject">
 *   <div class="custom-waiting-room">
 *     <h3>Waiting to Join ({{ waitingList.length }})</h3>
 *     <div *ngFor="let participant of waitingList" class="waiting-participant">
 *       <img [src]="participant.avatar" alt="avatar">
 *       <span>{{ participant.name }}</span>
 *       <button (click)="onAdmit(participant)" class="admit">Admit</button>
 *       <button (click)="onReject(participant)" class="reject">Reject</button>
 *     </div>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-waiting-room-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * 
 * @input isWaitingModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onWaitingRoomClose - Callback function to close the modal. Default: `() => {}`
 * @input waitingRoomCounter - Number of participants in waiting room (for badge). Default: `0`
 * @input onWaitingRoomFilterChange - Callback when filter input changes. Default: `() => {}`
 * @input waitingRoomList - Array of waiting participant objects. Default: `[]`
 * @input updateWaitingList - Function to update the waiting list state. Default: `() => {}`
 * @input roomName - Name of the room/session. Default: `''`
 * @input socket - Socket.io client instance for real-time communication. Default: `undefined`
 * @input position - Modal position on screen ('topRight', 'center', etc.). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input parameters - Additional parameters including filtered waiting list. Default: `{}`
 * @input onWaitingRoomItemPress - Callback when admit/reject action is pressed. Default: `respondToWaitingService.respondToWaiting`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes component and default styles
 * @method ngOnChanges - Updates waiting list when inputs change
 * @method updateParameters - Refreshes filtered waiting list from parameters
 * @method handleModalClose - Closes modal via onWaitingRoomClose callback
 * @method handleFilterChange - Filters waiting list based on search input
 * @method handleItemPress - Handles admit/reject actions for waiting participants
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 * @getter modalContainerStyle - Returns computed overlay styles
 * @getter modalContentStyle - Returns computed content styles
 * @getter inputStyle - Returns filter input field styles
 */
@Component({
    selector: 'app-waiting-room-modal',
    imports: [CommonModule, FontAwesomeModule, FormsModule],
    templateUrl: './waiting-room-modal.component.html',
    styleUrls: ['./waiting-room-modal.component.css']
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
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;
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
}
