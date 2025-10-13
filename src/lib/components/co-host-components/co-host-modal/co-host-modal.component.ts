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
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type CoHostModalType = (options: CoHostModalOptions) => HTMLElement;

/**
 * CoHostModal - Modal for designating and configuring co-host permissions
 * 
 * @component
 * @description
 * Allows host to select a co-host and configure their specific permissions/responsibilities.
 * Co-hosts can assist with managing the session with delegated authority.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with co-host selector and responsibility toggles
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Select co-host from participant list
 * - Configure co-host responsibilities (manage participants, media, chat, etc.)
 * - Save co-host settings to room
 * - Remove co-host designation
 * - Socket-based permission sync
 * 
 * @selector app-co-host-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * 
 * @input isCoHostModalVisible - Whether the modal is currently visible. Default: `false`
 * @input currentCohost - Name/ID of current co-host. Default: `'No coHost'`
 * @input participants - Array of participant objects. Default: `[]`
 * @input coHostResponsibility - Array of co-host responsibility objects with toggles. Default: `[]`
 * @input position - Modal position on screen ('topRight', 'center', etc.). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input roomName - Name of the room/session. Default: `''`
 * @input showAlert - Optional alert function for displaying messages. Default: `undefined`
 * @input updateCoHostResponsibility - Function to update co-host responsibilities. Default: `() => {}`
 * @input updateCoHost - Function to update co-host selection. Default: `() => {}`
 * @input updateIsCoHostModalVisible - Function to update modal visibility. Default: `() => {}`
 * @input socket - Socket.io client instance for real-time communication. Default: `undefined`
 * @input onCoHostClose - Callback function to close the modal. Default: `() => {}`
 * @input onModifyCoHost - Callback to save co-host settings. Default: `modifyCoHostSettingsService.modifyCoHostSettings`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes component and sets default co-host modification handler
 * @method ngOnChanges - Updates responsibilities and modal width when inputs change
 * @method initializeResponsibilities - Sets up initial responsibility toggles
 * @method handleToggleSwitch - Toggles specific co-host responsibility
 * @method handleSave - Saves co-host selection and responsibilities
 * @method handleClose - Closes modal via onCoHostClose callback
 * @method calculateModalWidth - Dynamically sets modal width based on screen size
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 * @method modalContainerStyle - Returns computed overlay styles
 * @method modalContentStyle - Returns computed content styles
 * @getter filteredParticipants - Returns participants excluding current co-host
 */

@Component({
    selector: 'app-co-host-modal',
    imports: [CommonModule, FontAwesomeModule, FormsModule],
    templateUrl: './co-host-modal.component.html',
    styleUrls: ['./co-host-modal.component.css']
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
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

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

  getCombinedOverlayStyle() {
    return {
      ...this.modalContainerStyle(),
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      ...this.modalContentStyle(),
      ...(this.contentStyle || {})
    };
  }
}
