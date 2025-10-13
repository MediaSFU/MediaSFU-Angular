import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faCheck, faSyncAlt, faPlay, faSave } from '@fortawesome/free-solid-svg-icons';
import {
  CaptureCanvasStreamParameters,
  CaptureCanvasStreamType,
  EventType,
  OnScreenChangesParameters,
  OnScreenChangesType,
  Participant,
  PrepopulateUserMediaParameters,
  PrepopulateUserMediaType,
  RePortParameters,
  RePortType,
  ShowAlert,
  WhiteboardUpdatedData,
  WhiteboardUser,
} from '../../../@types/types';
import { Socket } from 'socket.io-client';

export interface ConfigureWhiteboardModalParameters
  extends OnScreenChangesParameters,
    CaptureCanvasStreamParameters,
    PrepopulateUserMediaParameters,
    RePortParameters {
  participants: Participant[];
  showAlert?: ShowAlert;
  socket: Socket;
  itemPageLimit: number;
  islevel: string;
  roomName: string;
  eventType: EventType;
  shareScreenStarted: boolean;
  shared: boolean;
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  recordStarted: boolean;
  recordResumed: boolean;
  recordPaused: boolean;
  recordStopped: boolean;
  recordingMediaOptions: string;
  canStartWhiteboard: boolean;
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  hostLabel: string;
  updateWhiteboardStarted: (started: boolean) => void;
  updateWhiteboardEnded: (ended: boolean) => void;
  updateWhiteboardUsers: (users: WhiteboardUser[]) => void;
  updateCanStartWhiteboard: (canStart: boolean) => void;
  updateIsConfigureWhiteboardModalVisible: (isVisible: boolean) => void;

  // mediasfu functions
  onScreenChanges: OnScreenChangesType;
  captureCanvasStream: CaptureCanvasStreamType;
  prepopulateUserMedia: PrepopulateUserMediaType;
  rePort: RePortType;

  getUpdatedAllParams: () => ConfigureWhiteboardModalParameters;
  [key: string]: any;
}

export interface ConfigureWhiteboardModalOptions {
  isConfigureWhiteboardModalVisible: boolean;
  onClose: () => void;
  position?: string;
  backgroundColor?: string;
  parameters: ConfigureWhiteboardModalParameters;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type ConfigureWhiteboardModalType = (
  options: ConfigureWhiteboardModalOptions,
) => HTMLElement;

/**
 * ConfigureWhiteboardModal - Modal for configuring collaborative whiteboard settings
 * 
 * @component
 * @description
 * Allows host to configure whiteboard participants and settings before launching the whiteboard feature.
 * Manages who can annotate and presenter selection.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with participant list and whiteboard controls
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Select whiteboard participants
 * - Set whiteboard presenter
 * - Configure annotation permissions
 * - Start/launch whiteboard
 * - Canvas stream management
 * 
 * @selector app-configure-whiteboard-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 * 
 * @input isConfigureWhiteboardModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onClose - Callback function to close the modal. Default: `() => {}`
 * @input position - Modal position on screen ('topRight', 'center', etc.). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input parameters - Object containing whiteboard settings, participants, and update functions. Default: `{}`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 */


@Component({
    selector: 'app-configure-whiteboard-modal',
    templateUrl: './configure-whiteboard-modal.component.html',
    styleUrls: ['./configure-whiteboard-modal.component.css'],
    imports: [CommonModule, FontAwesomeModule]
})
export class ConfigureWhiteboardModal implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Input() parameters: ConfigureWhiteboardModalParameters =
    {} as ConfigureWhiteboardModalParameters;
  @Input() backgroundColor = '#83c0e9';
  @Input() position = 'topRight';
  @Input() onConfigureWhiteboardClose!: () => void;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  faTimes = faTimes;
  faCheck = faCheck;
  faSyncAlt = faSyncAlt;
  faPlay = faPlay;
  faSave = faSave;

  participantsCopy: Participant[] = [];
  whiteboardLimit!: number;
  isEditing = false;
  canStartWhiteboard = false;
  assignedParticipants: any[] = [];
  unassignedParticipants: any[] = [];
  whiteboardStarted = false;
  whiteboardEnded = false;

  private socket: Socket = {} as Socket;

  ngOnInit() {
    if (this.parameters && this.isVisible) {
      try {
        this.parameters = this.parameters.getUpdatedAllParams();
      } catch {
        /* handle error */
      }
      this.whiteboardLimit = this.parameters.itemPageLimit;
      this.whiteboardStarted = this.parameters.whiteboardStarted;
      this.whiteboardEnded = this.parameters.whiteboardEnded;
      this.checkCanStartWhiteboard();
    }

    if (this.parameters) {
      this.socket = this.parameters.socket;
      if (this.socket) {
        this.setupSocketListeners();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parameters'] && this.parameters) {
      if (this.parameters && this.isVisible) {
        this.whiteboardLimit = this.parameters.itemPageLimit;
        this.whiteboardStarted = this.parameters.whiteboardStarted;
        this.whiteboardEnded = this.parameters.whiteboardEnded;
        this.checkCanStartWhiteboard();
      }

      this.socket = this.parameters.socket;
      if (this.socket) {
        this.setupSocketListeners();
      }
    }

    if (changes['isVisible'] && this.isVisible) {
      this.parameters = this.parameters.getUpdatedAllParams();
      if (!this.participantsCopy.length) {
        const filteredParticipants = this.parameters.participants.filter(
          (participant: Participant) => participant.islevel != '2',
        );
        this.participantsCopy = filteredParticipants;
        this.updateParticipantsLists();
      }
      this.checkCanStartWhiteboard();
    }
  }

  setupSocketListeners = () => {
    if (this.socket && this.socket instanceof Socket) {
      this.socket.on('whiteboardUpdated', async (data: WhiteboardUpdatedData) => {
        if (this.parameters.islevel == '2' && data.members) {
          const filteredParticipants = data.members.filter(
            (participant: any) => !participant.isBanned,
          );
          this.participantsCopy = filteredParticipants;
          this.updateParticipantsLists();
        }

        this.parameters.updateWhiteboardUsers(data.whiteboardUsers);

        if (data.status == 'started') {
          this.whiteboardStarted = true;
          this.whiteboardEnded = false;
          this.parameters.updateWhiteboardStarted(true);
          this.parameters.updateWhiteboardEnded(false);

          if (this.parameters.islevel != '2') {
            this.parameters.shareScreenStarted = true;
            await this.parameters.onScreenChanges({ changed: true, parameters: this.parameters });
          }
        } else if (data.status == 'ended') {
          this.whiteboardEnded = true;
          this.whiteboardStarted = false;
          this.parameters.updateWhiteboardStarted(false);
          this.parameters.updateWhiteboardEnded(true);

          this.parameters.shareScreenStarted = false;
          await this.parameters.onScreenChanges({ changed: true, parameters: this.parameters });
          await this.parameters.prepopulateUserMedia({
            name: this.parameters.hostLabel,
            parameters: this.parameters,
          });
          await this.parameters.rePort({ restart: true, parameters: this.parameters });
        }
      });
    }
  };

  toggleParticipant = (participant: any, add: boolean) => {
    this.isEditing = true;
    const selectedParticipants = this.participantsCopy.filter((p) => p.useBoard);
    if (add && selectedParticipants.length >= this.whiteboardLimit - 1) {
      this.parameters.showAlert?.({
        message: `Participant limit exceeded - you can only add ${
          this.whiteboardLimit - 1
        } other participants`,
        type: 'danger',
      });
      return;
    }

    this.participantsCopy = this.participantsCopy.map((p) =>
      p.name === participant.name ? { ...p, useBoard: add } : p,
    );
    this.updateParticipantsLists();
  };

  validateWhiteboard() {
    const selectedParticipants = this.participantsCopy.filter(
      (participant) => participant.useBoard,
    );
    if (selectedParticipants.length > this.whiteboardLimit) {
      this.parameters.showAlert?.({ message: 'Participant limit exceeded', type: 'danger' });
      return false;
    }
    return true;
  }

  checkCanStartWhiteboard() {
    const isValid = this.validateWhiteboard();
    this.canStartWhiteboard = isValid;
    this.parameters.updateCanStartWhiteboard(isValid);
  }

  handleSaveWhiteboard() {
    if (this.validateWhiteboard()) {
      this.isEditing = false;
      this.canStartWhiteboard = true;
      this.parameters.updateCanStartWhiteboard(true);
      this.checkCanStartWhiteboard();
      this.parameters.showAlert?.({ message: 'Whiteboard saved successfully', type: 'success' });
    } else {
      this.parameters.showAlert?.({ message: 'Whiteboard validation failed', type: 'danger' });
    }
  }

  async handleStartWhiteboard() {
    const {
      shareScreenStarted,
      shared,
      breakOutRoomStarted,
      breakOutRoomEnded,
      roomName,
      socket,
      recordStarted,
      recordResumed,
      recordPaused,
      recordStopped,
      recordingMediaOptions,
      onScreenChanges,
      captureCanvasStream,
      showAlert,
    } = this.parameters;

    if ((shareScreenStarted || shared) && !this.whiteboardStarted) {
      showAlert?.({
        message: 'You cannot start whiteboard while screen sharing is active',
        type: 'danger',
      });
      return;
    }

    if (breakOutRoomStarted && !breakOutRoomEnded) {
      showAlert?.({
        message: 'You cannot start whiteboard while breakout rooms are active',
        type: 'danger',
      });
      return;
    }

    if (this.canStartWhiteboard) {
      const emitName =
        this.whiteboardStarted && !this.whiteboardEnded ? 'updateWhiteboard' : 'startWhiteboard';
      const filteredWhiteboardUsers = this.participantsCopy
        .filter((participant) => participant.useBoard)
        .map(({ name, useBoard }) => ({ name, useBoard }));
      socket.emit(
        emitName,
        { whiteboardUsers: filteredWhiteboardUsers, roomName },
        async (response: any) => {
          if (response.success) {
            showAlert?.({ message: 'Whiteboard active', type: 'success' });
            this.parameters.whiteboardStarted = true;
            this.parameters.whiteboardEnded = false;
            this.parameters.updateWhiteboardStarted(true);
            this.parameters.updateWhiteboardEnded(false);
            this.parameters.updateIsConfigureWhiteboardModalVisible(false);

            if (this.parameters.islevel != '2') {
              this.parameters.shareScreenStarted = true;
              await onScreenChanges({ changed: true, parameters: this.parameters });
            }

            if (this.parameters.islevel == '2' && (recordStarted || recordResumed)) {
              if (!(recordPaused || recordStopped) && recordingMediaOptions == 'video') {
                await captureCanvasStream({ parameters: this.parameters });
              }
            }
          } else {
            showAlert?.({ message: response.reason, type: 'danger' });
          }
        },
      );
    }
  }

  async handleStopWhiteboard() {
    const {
      roomName,
      socket,
      showAlert,
      updateWhiteboardStarted,
      updateWhiteboardEnded,
      updateIsConfigureWhiteboardModalVisible,
      onScreenChanges,
      prepopulateUserMedia,
      rePort,
      hostLabel,
    } = this.parameters;
    socket.emit('stopWhiteboard', { roomName }, async (response: any) => {
      if (response.success) {
        showAlert?.({ message: 'Whiteboard stopped', type: 'success' });
        this.parameters.whiteboardEnded = true;
        this.parameters.whiteboardStarted = false;
        updateWhiteboardStarted(false);
        updateWhiteboardEnded(true);
        updateIsConfigureWhiteboardModalVisible(false);

        this.parameters.shareScreenStarted = false;
        await onScreenChanges({ changed: true, parameters: this.parameters });
        await prepopulateUserMedia({ name: hostLabel, parameters: this.parameters });
        await rePort({ restart: true, parameters: this.parameters });
      } else {
        showAlert?.({ message: response.reason, type: 'danger' });
      }
    });
  }

  modalContainerStyle() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: this.isVisible ? 'block' : 'none',
      zIndex: 999,
    };
  }

  modalContentStyle() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.7 * screenWidth;
    if (modalWidth > 400) {
      modalWidth = 400;
    }
    return {
      position: 'fixed',
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: modalWidth + 'px',
      maxWidth: modalWidth + 'px',
      maxHeight: '75%',
      overflowY: 'auto',
      overflowX: 'hidden',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
    };
  }

  updateParticipantsLists = () => {
    this.assignedParticipants = this.participantsCopy.filter((p) => p.useBoard);
    this.unassignedParticipants = this.participantsCopy.filter((p) => !p.useBoard);
  };

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
