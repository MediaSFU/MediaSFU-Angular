import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDoorOpen,
  faTimes,
  faRandom,
  faHandPointer,
  faPlus,
  faSave,
  faPlay,
  faSyncAlt,
  faStop,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { RoomListComponent } from './room-list/room-list.component';
import { EditRoomModalComponent } from './edit-room-modal/edit-room-modal.component';
import { Socket } from 'socket.io-client';
import { Participant, ShowAlert, BreakoutParticipant } from '../../@types/types';
import { ModernRenderMode, isEmbeddedRenderMode } from '../../modern/utils/render-mode.utils';

export interface BreakoutRoomsModalParameters {
  participants: Participant[];
  showAlert?: ShowAlert;
  socket: Socket;
  localSocket?: Socket;
  itemPageLimit: number;
  meetingDisplayType: string;
  prevMeetingDisplayType: string;
  roomName: string;
  shareScreenStarted: boolean;
  shared: boolean;
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  isBreakoutRoomsModalVisible: boolean;
  currentRoomIndex: number | null;
  canStartBreakout: boolean;
  breakoutRooms: BreakoutParticipant[][];
  updateBreakOutRoomStarted: (started: boolean) => void;
  updateBreakOutRoomEnded: (ended: boolean) => void;
  updateCurrentRoomIndex: (roomIndex: number) => void;
  updateCanStartBreakout: (canStart: boolean) => void;
  updateBreakoutRooms: (breakoutRooms: BreakoutParticipant[][]) => void;
  updateMeetingDisplayType: (displayType: string) => void;

  getUpdatedAllParams: () => BreakoutRoomsModalParameters;
  [key: string]: any;
}

// Export the type definition for the function
export type BreakoutRoomsModalType = (options: BreakoutRoomsModalOptions) => HTMLElement;

export interface BreakoutRoomsModalOptions {
  isVisible: boolean;
  parameters: BreakoutRoomsModalParameters;
  position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  backgroundColor?: string;
  isDarkMode?: boolean;
  onBreakoutRoomsClose: () => void;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

/**
 * BreakoutRoomsModal - Modal for creating and managing breakout rooms
 * 
 * @component
 * @description
 * Allows hosts to create, configure, and manage breakout rooms for splitting participants into smaller groups.
 * Supports random assignment, manual assignment, and room editing.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with room list, assignment controls, and edit room modal
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Create multiple breakout rooms
 * - Random participant assignment
 * - Manual participant assignment with drag-and-drop
 * - Edit room participants
 * - Delete rooms
 * - Start/stop breakout sessions
 * - Room validation and error handling
 * 
 * @selector app-breakout-rooms-modal
 * @standalone true
 * @imports CommonModule, FormsModule, FontAwesomeModule, RoomListComponent, EditRoomModalComponent
 * 
 * @input isVisible - Whether the modal is currently visible. Default: `false`
 * @input parameters - Object containing participants, breakout rooms, and update functions. Default: `{}`
 * @input position - Modal position on screen ('topRight', 'topLeft', 'bottomRight', 'bottomLeft'). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input onBreakoutRoomsClose - Callback function to close the modal. Default: `() => {}`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes modal width and breakout rooms
 * @method ngOnChanges - Updates breakout rooms when inputs change
 * @method calculateModalWidth - Dynamically sets modal width based on screen size
 * @method initializeBreakoutRooms - Sets up initial breakout rooms from parameters
 * @method handleRandomAssign - Randomly distributes participants to rooms
 * @method handleManualAssign - Initializes empty rooms for manual assignment
 * @method handleAddRoom - Adds new breakout room
 * @method handleSaveRooms - Validates and saves room configurations
 * @method validateRooms - Validates room setup and participant assignments
 * @method checkCanStartBreakout - Checks if breakout session can start
 * @method handleStartBreakout - Starts breakout session
 * @method handleStopBreakout - Stops breakout session
 * @method handleEditRoom - Opens edit modal for specific room
 * @method handleDeleteRoom - Removes room and reassigns participants
 * @method handleAddParticipant - Adds participant to room
 * @method handleRemoveParticipant - Removes participant from room
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 * @method modalContainerStyle - Returns computed overlay styles
 * @method modalContentStyle - Returns computed content styles
 */
@Component({
  selector: 'app-breakout-rooms-modal',
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RoomListComponent,
    EditRoomModalComponent,
  ],
  templateUrl: './breakout-rooms-modal.component.html',
  styleUrls: ['./breakout-rooms-modal.component.css']
})


export class BreakoutRoomsModal implements OnChanges, OnInit {
  @Input() isVisible = false;
  @Input() parameters!: BreakoutRoomsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() isDarkMode?: boolean;
  @Input() onBreakoutRoomsClose: () => void = () => {
    console.log('Breakout rooms closed');
  };
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  @ViewChild('roomsContainer') roomsContainerRef!: ElementRef;

  faDoorOpen = faDoorOpen;
  faTimes = faTimes;
  faRandom = faRandom;
  faHandPointer = faHandPointer;
  faPlus = faPlus;
  faSave = faSave;
  faPlay = faPlay;
  faSyncAlt = faSyncAlt;
  faStop = faStop;
  faUsers = faUsers;

  participantsRef: Participant[] = [];
  breakoutRoomsRef: BreakoutParticipant[][] = [];

  numRooms = '';
  newParticipantAction = 'autoAssignNewRoom';
  currentRoom: BreakoutParticipant[] | null = null;
  editRoomModalVisible = false;

  startBreakoutButtonVisible = false;
  stopBreakoutButtonVisible = false;

  modalWidth = 400;

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  private resolveParameters(): BreakoutRoomsModalParameters {
    if (this.parameters?.getUpdatedAllParams) {
      return this.parameters.getUpdatedAllParams();
    }

    return this.parameters;
  }

  isVisibleState(): boolean {
    return this.isEmbedded() || this.isVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  calculateModalWidth() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.85 * screenWidth;
    if (modalWidth > 700) {
      modalWidth = 700;
    }
    this.modalWidth = modalWidth;
  }

  modalContainerStyle() {
    return this.isEmbedded()
      ? {
          display: 'block',
          position: 'static',
          top: 'auto',
          left: 'auto',
          width: '100%',
          height: '100%',
          minHeight: 0,
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          padding: '0',
          zIndex: 'auto',
        }
      : {
          display: this.isVisible ? 'flex' : 'none',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: this.resolvedIsDarkMode ? 'rgba(2, 6, 23, 0.62)' : 'rgba(15, 23, 42, 0.18)',
          backdropFilter: 'blur(10px)',
          alignItems: this.position.includes('top') ? 'flex-start' : this.position.includes('bottom') ? 'flex-end' : 'center',
          justifyContent: this.position.includes('Left') ? 'flex-start' : this.position.includes('Right') ? 'flex-end' : 'center',
          padding: '18px',
          zIndex: '999',
        };
  }

  modalContentStyle() {
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
          overflowX: 'hidden',
          overflowY: 'auto',
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
          width: `${this.modalWidth}px`,
          maxHeight: '84vh',
          overflowX: 'hidden',
          overflowY: 'auto',
          color: isDarkMode ? '#e2e8f0' : '#0f172a',
        };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && this.isVisible) {
      this.initializeBreakoutRooms();
    }
  }

  ngOnInit() {
    this.calculateModalWidth();
  }

  initializeBreakoutRooms = () => {
    const params = this.resolveParameters();
    const filteredParticipants = params.participants.filter(
      (participant: any) => participant.islevel != '2',
    );
    this.participantsRef = filteredParticipants;
    this.breakoutRoomsRef =
      params.breakoutRooms && params.breakoutRooms.length > 0
        ? [...params.breakoutRooms]
        : [];
    this.checkCanStartBreakout();
  };

  handleRandomAssign() {
    const numRoomsInt = parseInt(this.numRooms);
    if (!numRoomsInt || numRoomsInt <= 0) {
      this.parameters.showAlert?.({
        message: 'Please enter a valid number of rooms',
        type: 'danger',
      });
      return;
    }

    const newBreakoutRooms: BreakoutParticipant[][] = Array.from({ length: numRoomsInt }, () => []);

    const shuffledParticipants = [...this.participantsRef].sort(() => 0.5 - Math.random());

    shuffledParticipants.forEach((participant, index) => {
      const roomIndex = index % numRoomsInt;
      if (newBreakoutRooms[roomIndex].length < this.parameters.itemPageLimit) {
        const participant_: BreakoutParticipant = { name: participant.name, breakRoom: roomIndex };
        newBreakoutRooms[roomIndex].push(participant_);
        participant['breakRoom'] = roomIndex;
      } else {
        for (let i = 0; i < numRoomsInt; i++) {
          if (newBreakoutRooms[i].length < this.parameters.itemPageLimit) {
            newBreakoutRooms[i].push(participant);
            participant['breakRoom'] = i;
            break;
          }
        }
      }
    });
    this.breakoutRoomsRef = newBreakoutRooms;
    this.checkCanStartBreakout();
  }

  handleManualAssign() {
    const numRoomsInt = parseInt(this.numRooms);
    if (!numRoomsInt || numRoomsInt <= 0) {
      this.parameters.showAlert?.({
        message: 'Please enter a valid number of rooms',
        type: 'danger',
      });
      return;
    }

    this.breakoutRoomsRef = Array.from({ length: numRoomsInt }, () => []);
    this.parameters.updateCanStartBreakout(false);
    this.checkCanStartBreakout();
  }

  handleAddRoom() {
    this.breakoutRoomsRef = [...this.breakoutRoomsRef, []];
    this.parameters.updateCanStartBreakout(false);
    this.checkCanStartBreakout();
  }

  handleSaveRooms() {
    if (this.validateRooms()) {
      this.parameters.updateBreakoutRooms(this.breakoutRoomsRef);
      this.parameters.updateCanStartBreakout(true);
      this.checkCanStartBreakout();
      this.parameters.showAlert?.({ message: 'Rooms saved successfully', type: 'success' });
    } else {
      this.parameters.showAlert?.({ message: 'Rooms validation failed', type: 'danger' });
    }
  }

  validateRooms() {
    if (this.breakoutRoomsRef.length == 0) {
      this.parameters.showAlert?.({ message: 'There must be at least one room', type: 'danger' });
      return false;
    }

    for (let room of this.breakoutRoomsRef) {
      if (room.length == 0) {
        this.parameters.showAlert?.({ message: 'Rooms must not be empty', type: 'danger' });
        return false;
      }

      const participantNames = room.map((p) => p.name);
      const uniqueNames = new Set(participantNames);
      if (participantNames.length != uniqueNames.size) {
        this.parameters.showAlert?.({
          message: 'Duplicate participant names in a room',
          type: 'danger',
        });
        return false;
      }

      if (room.length > this.parameters.itemPageLimit) {
        this.parameters.showAlert?.({
          message: 'A room exceeds the participant limit',
          type: 'danger',
        });
        return false;
      }
    }

    return true;
  }

  checkCanStartBreakout = () => {
    const params = this.resolveParameters();
    if (params.canStartBreakout) {
      this.startBreakoutButtonVisible = true;
      this.stopBreakoutButtonVisible =
        params.breakOutRoomStarted && !params.breakOutRoomEnded;
    } else {
      this.startBreakoutButtonVisible = false;
      this.stopBreakoutButtonVisible = false;
    }
  };

  handleStartBreakout = () => {
    const params = this.resolveParameters();
    if (params.shareScreenStarted || params.shared) {
      params.showAlert?.({
        message: 'You cannot start breakout rooms while screen sharing is active',
        type: 'danger',
      });
      return;
    }

    if (params.canStartBreakout) {
      const emitName =
        params.breakOutRoomStarted && !params.breakOutRoomEnded
          ? 'updateBreakout'
          : 'startBreakout';
      const filteredBreakoutRooms = this.breakoutRoomsRef.map((room) =>
        room.map(({ name, breakRoom }) => ({ name, breakRoom })),
      );
      params.socket.emit(
        emitName,
        {
          breakoutRooms: filteredBreakoutRooms,
          newParticipantAction: this.newParticipantAction,
          roomName: params.roomName,
        },
        (response: { success: any; reason: any }) => {
          if (response.success) {
            params.showAlert?.({ message: 'Breakout rooms active', type: 'success' });
            params.updateBreakOutRoomStarted(true);
            params.updateBreakOutRoomEnded(false);

            this.onBreakoutRoomsClose();
            if (params.meetingDisplayType != 'all') {
              params.updateMeetingDisplayType('all');
            }
          } else {
            params.showAlert?.({ message: response.reason, type: 'danger' });
          }
        },
      );

      if (params.localSocket && params.localSocket.id) {
        try {
          params.localSocket.emit(
            emitName,
            {
              breakoutRooms: filteredBreakoutRooms,
              newParticipantAction: this.newParticipantAction,
              roomName: params.roomName,
            },
            (response: { success: any; reason: any }) => {
              if (response.success) {
                // do nothing
              }
            },
          );
        } catch (error) {
          console.log('Error starting local breakout rooms:');
        }
      }
    }
  };

  handleStopBreakout() {
    this.parameters.socket.emit(
      'stopBreakout',
      { roomName: this.parameters.roomName },
      (response: { success: any; reason: any }) => {
        if (response.success) {
          this.parameters.showAlert?.({ message: 'Breakout rooms stopped', type: 'success' });
          this.parameters.updateBreakOutRoomStarted(false);
          this.parameters.updateBreakOutRoomEnded(true);

          this.onBreakoutRoomsClose();
          if (this.parameters.meetingDisplayType != this.parameters.prevMeetingDisplayType) {
            this.parameters.updateMeetingDisplayType(this.parameters.prevMeetingDisplayType);
          }
        } else {
          this.parameters.showAlert?.({ message: response.reason, type: 'danger' });
        }
      },
    );

    if (this.parameters.localSocket && this.parameters.localSocket.id) {
      try {
        this.parameters.localSocket.emit(
          'stopBreakout',
          { roomName: this.parameters.roomName },
          (response: { success: any; reason: any }) => {
            if (response.success) {
              // do nothing
            }
          },
        );
      } catch (error) {
        console.log('Error starting local breakout rooms:');
      }

    }
  }

  handleEditRoom(roomIndex: number) {
    if (this.editRoomModalVisible && this.parameters.currentRoomIndex === roomIndex) {
      this.editRoomModalVisible = false;
      this.currentRoom = null;
      return;
    }

    this.parameters.updateCurrentRoomIndex(roomIndex);
    this.currentRoom = this.breakoutRoomsRef[roomIndex];
    this.editRoomModalVisible = true;
    this.parameters.updateCanStartBreakout(false);
    this.checkCanStartBreakout();
  }

  handleDeleteRoom(roomIndex: number) {
    if (this.breakoutRoomsRef.length > 0) {
      const activeRoomIndex = this.parameters.currentRoomIndex;
      const room = this.breakoutRoomsRef[roomIndex];
      room.forEach((participant) => (participant.breakRoom = null));
      const newBreakoutRooms = [...this.breakoutRoomsRef];
      newBreakoutRooms.splice(roomIndex, 1);

      newBreakoutRooms.forEach((room, index) => {
        room.forEach((participant) => (participant.breakRoom = index));
      });

      this.breakoutRoomsRef = newBreakoutRooms;

      if (this.editRoomModalVisible && activeRoomIndex != null) {
        if (activeRoomIndex === roomIndex) {
          this.editRoomModalVisible = false;
          this.currentRoom = null;
        } else if (activeRoomIndex > roomIndex) {
          const nextRoomIndex = activeRoomIndex - 1;
          this.parameters.updateCurrentRoomIndex(nextRoomIndex);
          this.currentRoom = this.breakoutRoomsRef[nextRoomIndex] ?? null;
        } else {
          this.currentRoom = this.breakoutRoomsRef[activeRoomIndex] ?? null;
        }
      }

      this.checkCanStartBreakout();
    }
  }

  handleAddParticipant(event: { roomIndex: number; participant: BreakoutParticipant }) {
    const { roomIndex, participant } = event;
    const params = this.resolveParameters();
    if (this.breakoutRoomsRef[roomIndex].length < params.itemPageLimit) {
      const newBreakoutRooms = [...this.breakoutRoomsRef];
      newBreakoutRooms[roomIndex].push(participant);
      this.breakoutRoomsRef = newBreakoutRooms;
      participant['breakRoom'] = roomIndex;
      if (params.currentRoomIndex != null) {
        this.handleEditRoom(params.currentRoomIndex);
      }
    } else {
      params.showAlert?.({ message: 'Room is full', type: 'danger' });
    }
  }

  handleRemoveParticipant(event: { roomIndex: number; participant: BreakoutParticipant }) {
    const { roomIndex, participant } = event;
    const newBreakoutRooms = [...this.breakoutRoomsRef];
    newBreakoutRooms[roomIndex] = newBreakoutRooms[roomIndex].filter((p) => p != participant);
    this.breakoutRoomsRef = newBreakoutRooms;
    participant['breakRoom'] = null;
    if (this.parameters.currentRoomIndex != null) {
      this.handleEditRoom(this.parameters.currentRoomIndex);
    }
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
