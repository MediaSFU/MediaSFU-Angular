/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModifyCoHostSettings } from '../../../methods/co-host-methods/modify-co-host-settings.service';
import {
  Participant,
  CoHostResponsibility,
  ModifyCoHostSettingsOptions,
  ShowAlert,
} from '../../../@types/types';
import { Socket } from 'socket.io-client';

export interface CoHostModalOptions {
  isCoHostModalVisible: boolean;
  currentCohost?: string;
  participants: Participant[];
  coHostResponsibility: CoHostResponsibility[];
  position?: string;
  backgroundColor?: string;
  roomName: string;
  showAlert?: ShowAlert;
  updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void;
  updateCoHost: (coHost: string) => void;
  updateIsCoHostModalVisible: (isCoHostModalVisible: boolean) => void;
  socket: Socket;
  onCoHostClose: () => void;
  onModifyEventSettings?: (settings: ModifyCoHostSettingsOptions) => void;
}

export type CoHostModalType = (options: CoHostModalOptions) => HTMLElement;

/**
 * CoHostModal component allows managing co-host settings for an event.
 *
 * @selector app-co-host-modal
 * @inputs
 * - `isCoHostModalVisible` (boolean): A boolean value that determines whether the modal is visible. Default is false.
 * - `currentCohost` (string): The current co-host for the event. Default is 'No coHost'.
 * - `participants` (Participant[]): An array of participants in the event.
 * - `coHostResponsibility` (CoHostResponsibility[]): An array of co-host responsibilities.
 * - `position` (string): The position of the modal. Default is 'topRight'.
 * - `backgroundColor` (string): The background color of the modal. Default is '#83c0e9'.
 * - `roomName` (string): The name of the room.
 * - `showAlert` (ShowAlert): A function to show alerts.
 *
 * @outputs
 * - `updateCoHostResponsibility` (coHostResponsibility: CoHostResponsibility[]): A function to update co-host responsibilities.
 * - `updateCoHost` (coHost: string): A function to update the co-host.
 * - `updateIsCoHostModalVisible` (isCoHostModalVisible: boolean): A function to update the visibility of the modal.
 * - `socket` (Socket): The socket object.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook that is called after the component is initialized. It sets the default value for `onModifyCoHost` if not provided.
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook that is called when any data-bound property of the component changes. It initializes the responsibilities and calculates the modal width.
 * - `initializeResponsibilities()`: Initializes the responsibilities.
 * - `get filteredParticipants()`: Returns the filtered participants.
 * - `handleToggleSwitch(key: string)`: Handles the toggle switch for the given key.
 * - `handleSave()`: Handles the save action.
 * - `handleClose()`: Handles the close action.
 * - `calculateModalWidth()`: Calculates the modal width.
 * - `modalContainerStyle()`: Returns the modal container style.
 * - `modalContentStyle()`: Returns the modal content style.
 *
 * @dependencies
 * - `CommonModule`: Angular's common module is imported for common directives.
 * - `FontAwesomeModule`: Angular's font awesome module is imported for icons.
 * - `FormsModule`: Angular's forms module is imported for form-related directives.
 * - `ModifyCoHostSettings`: The ModifyCoHostSettings service is used to modify co-host settings.
 *
 * @styles
 * - `.container`: The container style.
 *
 * @example
 * ```html
 * <app-co-host-modal
 *  [isCoHostModalVisible]="isCoHostModalVisible"
 * [currentCohost]="currentCohost"
 * [participants]="participants"
 * [coHostResponsibility]="coHostResponsibility"
 * [position]="position"
 * [backgroundColor]="backgroundColor"
 * [roomName]="roomName"
 * [showAlert]="showAlert"
 * [updateCoHostResponsibility]="updateCoHostResponsibility"
 * [updateCoHost]="updateCoHost"
 * [updateIsCoHostModalVisible]="updateIsCoHostModalVisible"
 * [socket]="socket"
 * [onCoHostClose]="onCoHostClose"
 * [onModifyCoHost]="onModifyCoHost">
 * </app-co-host-modal>
 * ```
 *
 **/

@Component({
  selector: 'app-co-host-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './co-host-modal.component.html',
  styleUrls: ['./co-host-modal.component.css'],
})


export class CoHostModal implements OnChanges, OnInit {
  @Input() isCoHostModalVisible = false;
  @Input() currentCohost = 'No coHost';
  @Input() participants: Participant[] = [];
  @Input() coHostResponsibility: CoHostResponsibility[] = [];
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() roomName = '';
  @Input() showAlert: ShowAlert = () => {};
  @Input() updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void =
    () => {};
  @Input() updateCoHost: (coHost: string) => void = () => {};
  @Input() updateIsCoHostModalVisible: (isCoHostModalVisible: boolean) => void = () => {};
  @Input() socket: Socket = {} as Socket;
  @Input()
  onCoHostClose!: () => void;
  @Input()
  onModifyCoHost!: (settings: ModifyCoHostSettingsOptions) => void;

  faTimes = faTimes;

  selectedCohost: string = this.currentCohost;
  CoHostResponsibilityCopy: any[] = [];
  CoHostResponsibilityCopyAlt: any[] = [];
  responsibilities: { [key: string]: boolean } = {};
  responsibilityKeys: { manageKey: string; dedicateKey: string }[] = [];

  modalWidth!: number;

  constructor(private modifyCoHostSettingsService: ModifyCoHostSettings) {}

  ngOnInit() {
    // Set default value for onModifyCoHost if not provided
    if (!this.onModifyCoHost) {
      this.onModifyCoHost = (params: any) =>
        this.modifyCoHostSettingsService.modifyCoHostSettings(params);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isCoHostModalVisible'] && this.isCoHostModalVisible) {
      this.initializeResponsibilities();
      this.calculateModalWidth();
    }
  }

  initializeResponsibilities() {
    this.CoHostResponsibilityCopy = [...this.coHostResponsibility];
    this.CoHostResponsibilityCopyAlt = [...this.coHostResponsibility];
    this.responsibilityKeys = this.coHostResponsibility.map((item) => {
      const manageKey = `manage${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`;
      const dedicateKey = `dedicateToManage${
        item.name.charAt(0).toUpperCase() + item.name.slice(1)
      }`;
      return { manageKey, dedicateKey };
    });

    const initialResponsibilities = this.CoHostResponsibilityCopyAlt.reduce(
      (acc: any, item: any) => {
        const str2 = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        acc[`manage${str2}`] = item.value;
        acc[`dedicateToManage${str2}`] = item.dedicated;
        return acc;
      },
      {},
    );

    this.responsibilities = initialResponsibilities;
  }

  get filteredParticipants() {
    return this.participants.filter(
      (participant) => participant.name !== this.currentCohost && participant.islevel !== '2',
    );
  }

  handleToggleSwitch(key: string) {
    if (key.startsWith('dedicateTo')) {
      const responsibilityName = key.replace('dedicateToManage', '').toLowerCase();
      const manageKey = `manage${
        responsibilityName.charAt(0).toUpperCase() + responsibilityName.slice(1)
      }`;

      // Ensure that the 'dedicated' checkbox can only be toggled if the corresponding 'responsibility' is checked
      if (this.responsibilities[manageKey]) {
        const responsibilityDedicated = this.CoHostResponsibilityCopy.find(
          (item) => item.name === responsibilityName,
        ).dedicated;
        this.responsibilities[key] = !responsibilityDedicated;
        this.CoHostResponsibilityCopy.find((item) => item.name === responsibilityName).dedicated =
          !responsibilityDedicated;
      }
    } else if (key.startsWith('manage')) {
      const responsibilityName = key.replace('manage', '').toLowerCase();
      const responsibilityValue = this.CoHostResponsibilityCopy.find(
        (item) => item.name === responsibilityName,
      ).value;

      // Toggle the 'responsibility' checkbox and ensure the corresponding 'dedicated' checkbox is also disabled if unchecked
      this.responsibilities[key] = !responsibilityValue;
      this.CoHostResponsibilityCopy.find((item) => item.name === responsibilityName).value =
        !responsibilityValue;

      if (!this.responsibilities[key]) {
        const dedicateKey = `dedicateToManage${
          responsibilityName.charAt(0).toUpperCase() + responsibilityName.slice(1)
        }`;
        this.responsibilities[dedicateKey] = false;
        this.CoHostResponsibilityCopy.find((item) => item.name === responsibilityName).dedicated =
          false;
      }
    }
  }

  handleSave() {

    this.onModifyCoHost({
      roomName: this.roomName,
      showAlert: this.showAlert,
      selectedParticipant: this.selectedCohost,
      coHost: this.currentCohost,
      coHostResponsibility: this.CoHostResponsibilityCopy,
      updateCoHostResponsibility: this.updateCoHostResponsibility,
      updateCoHost: this.updateCoHost,
      updateIsCoHostModalVisible: this.updateIsCoHostModalVisible,
      socket: this.socket,
    });
  }

  handleClose() {
    this.onCoHostClose();
  }

  calculateModalWidth() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.8 * screenWidth;
    if (modalWidth > 400) {
      modalWidth = 400;
    }
    this.modalWidth = modalWidth;
  }

  modalContainerStyle() {
    return {
      display: this.isCoHostModalVisible ? 'block' : 'none',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '999',
    };
  }

  modalContentStyle() {
    return {
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: `${this.modalWidth}px`,
      maxHeight: '65%',
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'fixed',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
    };
  }
}
