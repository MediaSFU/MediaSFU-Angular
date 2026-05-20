import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faCheck, faSearch, faSyncAlt, faPlay, faSave, faUser } from '@fortawesome/free-solid-svg-icons';
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
import { ModernRenderMode, isEmbeddedRenderMode } from '../../../modern/utils/render-mode.utils';

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
  whiteboardUsers: WhiteboardUser[];
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
  isDarkMode?: boolean;
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
  @Input() isDarkMode?: boolean;
  @Input() onConfigureWhiteboardClose!: () => void;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  faTimes = faTimes;
  faCheck = faCheck;
  faSearch = faSearch;
  faSyncAlt = faSyncAlt;
  faPlay = faPlay;
  faSave = faSave;
  faUser = faUser;

  participantsCopy: Participant[] = [];
  whiteboardLimit!: number;
  isEditing = false;
  canStartWhiteboard = false;
  assignedParticipants: any[] = [];
  unassignedParticipants: any[] = [];
  whiteboardStarted = false;
  whiteboardEnded = false;
  participantSearchTerm = '';

  private socket: Socket = {} as Socket;

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  private resolveParameters(): ConfigureWhiteboardModalParameters {
    if (this.parameters?.getUpdatedAllParams) {
      return this.parameters.getUpdatedAllParams();
    }

    return this.parameters;
  }

  private applyResolvedParameters(params: ConfigureWhiteboardModalParameters) {
    this.whiteboardLimit = params.itemPageLimit;
    this.whiteboardStarted = params.whiteboardStarted;
    this.whiteboardEnded = params.whiteboardEnded;

    this.syncParticipantsCopy(
      (params.participants ?? []).filter((participant: Participant) => participant.islevel != '2'),
      params.whiteboardUsers ?? [],
    );
    this.checkCanStartWhiteboard();
  }

  private syncParticipantsCopy(participants: Participant[], whiteboardUsers: WhiteboardUser[] = []) {
    const selectedUsers = new Map(
      (whiteboardUsers ?? []).map((user) => [user.name, !!user.useBoard]),
    );

    this.participantsCopy = participants.map((participant) => ({
      ...participant,
      useBoard: selectedUsers.get(participant.name) ?? !!participant.useBoard,
    }));
    this.updateParticipantsLists();
  }

  isVisibleState(): boolean {
    return this.isEmbedded() || this.isVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  ngOnInit() {
    if (this.parameters) {
      this.applyResolvedParameters(this.resolveParameters());
      this.socket = this.parameters.socket;
      if (this.socket) {
        this.setupSocketListeners();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['parameters'] && this.parameters) || (changes['isVisible'] && this.isVisibleState())) {
      this.applyResolvedParameters(this.resolveParameters());
    }

    if (changes['parameters'] && this.parameters) {
      this.socket = this.parameters.socket;
      if (this.socket) {
        this.setupSocketListeners();
      }
    }
  }

  setupSocketListeners = () => {
    if (this.socket && this.socket instanceof Socket) {
      this.socket.on('whiteboardUpdated', async (data: WhiteboardUpdatedData) => {
        if (this.parameters.islevel == '2' && data.members) {
          const filteredParticipants = data.members.filter(
            (participant: any) => !participant.isBanned && participant.islevel != '2',
          );
          this.syncParticipantsCopy(filteredParticipants, data.whiteboardUsers ?? []);
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
    this.isEditing = !this.isEmbedded();
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
    this.checkCanStartWhiteboard();
  };

  handleParticipantSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.participantSearchTerm = input.value || '';
  }

  filteredParticipants() {
    const searchTerm = this.participantSearchTerm.trim().toLowerCase();
    if (!searchTerm) {
      return this.participantsCopy;
    }

    return this.participantsCopy.filter((participant) =>
      participant.name?.toLowerCase().includes(searchTerm),
    );
  }

  isParticipantAssigned(participant: Participant): boolean {
    return !!participant.useBoard;
  }

  whiteboardStatusCopy(): string {
    return this.whiteboardStarted && !this.whiteboardEnded
      ? '✓ Whiteboard is active'
      : 'Select participants who can use the whiteboard';
  }

  whiteboardEmptyCopy(): string {
    return this.participantSearchTerm.trim()
      ? 'No participants match your search'
      : 'No other participants available yet. The host can still start whiteboard alone.';
  }

  whiteboardAdditionalParticipantLimit(): number {
    return Math.max(this.whiteboardLimit - 1, 0);
  }

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
            this.parameters.updateWhiteboardUsers(filteredWhiteboardUsers);
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
    return this.isEmbedded()
      ? {
          position: 'static',
          top: 'auto',
          left: 'auto',
          width: '100%',
          height: '100%',
          minHeight: 0,
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          display: 'block',
          padding: '0',
          zIndex: 'auto',
        }
      : {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: this.resolvedIsDarkMode ? 'rgba(2, 6, 23, 0.62)' : 'rgba(15, 23, 42, 0.18)',
          backdropFilter: 'blur(10px)',
          display: this.isVisible ? 'flex' : 'none',
          alignItems: this.position.includes('top') ? 'flex-start' : this.position.includes('bottom') ? 'flex-end' : 'center',
          justifyContent: this.position.includes('Left') ? 'flex-start' : this.position.includes('Right') ? 'flex-end' : 'center',
          padding: '18px',
          zIndex: 999,
        };
  }

  modalContentStyle() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.7 * screenWidth;
    if (modalWidth > 400) {
      modalWidth = 400;
    }
    const isDarkMode = this.resolvedIsDarkMode;
    return this.isEmbedded()
      ? {
          background: 'transparent',
          borderRadius: '0',
          border: 'none',
          boxShadow: 'none',
          padding: '0',
          width: '100%',
          maxWidth: 'none',
          height: '100%',
          maxHeight: 'none',
          overflowY: 'auto',
          overflowX: 'hidden',
          color: isDarkMode ? '#e2e8f0' : '#0f172a',
        }
      : {
          background: typeof this.isDarkMode === 'boolean'
            ? isDarkMode
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.96) 100%)'
            : this.backgroundColor,
          borderRadius: '24px',
          border: isDarkMode
            ? '1px solid rgba(148, 163, 184, 0.18)'
            : '1px solid rgba(148, 163, 184, 0.22)',
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.18)',
          padding: '20px',
          width: modalWidth + 'px',
          maxWidth: modalWidth + 'px',
          maxHeight: '84vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          color: isDarkMode ? '#e2e8f0' : '#0f172a',
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
