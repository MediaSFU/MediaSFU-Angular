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

export interface BreakoutRoomsModalParameters {
  participants: Participant[];
  showAlert?: ShowAlert;
  socket: Socket;
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
  onBreakoutRoomsClose: () => void;
}

/**
 * BreakoutRoomsModal component manages the creation, modification, and assignment of breakout rooms.
 *
 * @selector app-breakout-rooms-modal
 * @inputs
 * - `isVisible` (boolean): Controls the visibility of the breakout rooms modal. Default is false.
 * - `parameters` (BreakoutRoomsModalParameters): Parameters for managing breakout room settings and behavior.
 * - `position` (string): Position of the modal on the screen. Default is 'topRight'.
 * - `backgroundColor` (string): Background color of the modal. Default is '#83c0e9'.
 * - `onBreakoutRoomsClose` (function): Callback function triggered when the modal is closed.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook to initialize modal width and breakout rooms.
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook called when any data-bound input properties change.
 * - `calculateModalWidth()`: Dynamically calculates and sets modal width based on screen width.
 * - `modalContainerStyle()`: Returns style object for modal container.
 * - `modalContentStyle()`: Returns style object for modal content.
 * - `initializeBreakoutRooms()`: Initializes the breakout rooms based on the current participants and parameters.
 * - `handleRandomAssign()`: Randomly assigns participants to breakout rooms.
 * - `handleManualAssign()`: Initializes manual room assignment by setting empty breakout rooms.
 * - `handleAddRoom()`: Adds a new breakout room.
 * - `handleSaveRooms()`: Validates and saves breakout room configurations.
 * - `validateRooms()`: Validates room configurations and participants' uniqueness and quantity.
 * - `checkCanStartBreakout()`: Checks conditions to enable the start of breakout rooms.
 * - `handleStartBreakout()`: Starts the breakout session if conditions are met.
 * - `handleStopBreakout()`: Stops the breakout session and reverts to the initial meeting display type.
 * - `handleEditRoom(roomIndex: number)`: Opens the modal to edit the specified breakout room.
 * - `handleDeleteRoom(roomIndex: number)`: Deletes a breakout room and updates participants' room assignments.
 * - `handleAddParticipant(event)`: Adds a participant to a specified breakout room.
 * - `handleRemoveParticipant(event)`: Removes a participant from a specified breakout room.
 *
 * @dependencies
 * - `CommonModule`: Angular's common directives.
 * - `FormsModule`: Angular's forms module for form handling.
 * - `FontAwesomeModule`: Font Awesome icons for UI elements.
 * - `RoomListComponent`: Component for listing rooms.
 * - `EditRoomModalComponent`: Component for editing room participants.
 *
 * @example
 * ```html
 * <app-breakout-rooms-modal
 *  [isVisible]="isBreakoutRoomsModalVisible"
 * [parameters]="breakoutRoomsParams"
 * [position]="modalPosition"
 * [backgroundColor]="modalBgColor"
 * [onBreakoutRoomsClose]="onCloseBreakoutRooms">
 * </app-breakout-rooms-modal>
 * ```
 *
 **/
@Component({
  selector: 'app-breakout-rooms-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RoomListComponent,
    EditRoomModalComponent,
  ],
  templateUrl: './breakout-rooms-modal.component.html',
  styleUrls: ['./breakout-rooms-modal.component.css'],
})


export class BreakoutRoomsModal implements OnChanges, OnInit {
  @Input() isVisible = false;
  @Input() parameters!: BreakoutRoomsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() onBreakoutRoomsClose: () => void = () => {
    console.log('Breakout rooms closed');
  };
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

  calculateModalWidth() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.85 * screenWidth;
    if (modalWidth > 700) {
      modalWidth = 700;
    }
    this.modalWidth = modalWidth;
  }

  modalContainerStyle() {
    return {
      display: this.isVisible ? 'block' : 'none',
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
      maxHeight: '75%',
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'fixed',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
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
    this.parameters = this.parameters.getUpdatedAllParams();
    const filteredParticipants = this.parameters.participants.filter(
      (participant: any) => participant.islevel != '2',
    );
    this.participantsRef = filteredParticipants;
    this.breakoutRoomsRef =
      this.parameters.breakoutRooms && this.parameters.breakoutRooms.length > 0
        ? [...this.parameters.breakoutRooms]
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
    this.parameters = this.parameters.getUpdatedAllParams();
    if (this.parameters.canStartBreakout) {
      this.startBreakoutButtonVisible = true;
      this.stopBreakoutButtonVisible =
        this.parameters.breakOutRoomStarted && !this.parameters.breakOutRoomEnded;
    } else {
      this.startBreakoutButtonVisible = false;
      this.stopBreakoutButtonVisible = false;
    }
  };

  handleStartBreakout = () => {
    this.parameters = this.parameters.getUpdatedAllParams();
    if (this.parameters.shareScreenStarted || this.parameters.shared) {
      this.parameters.showAlert?.({
        message: 'You cannot start breakout rooms while screen sharing is active',
        type: 'danger',
      });
      return;
    }

    if (this.parameters.canStartBreakout) {
      const emitName =
        this.parameters.breakOutRoomStarted && !this.parameters.breakOutRoomEnded
          ? 'updateBreakout'
          : 'startBreakout';
      const filteredBreakoutRooms = this.breakoutRoomsRef.map((room) =>
        room.map(({ name, breakRoom }) => ({ name, breakRoom })),
      );
      this.parameters.socket.emit(
        emitName,
        {
          breakoutRooms: filteredBreakoutRooms,
          newParticipantAction: this.newParticipantAction,
          roomName: this.parameters.roomName,
        },
        (response: { success: any; reason: any }) => {
          if (response.success) {
            this.parameters.showAlert?.({ message: 'Breakout rooms active', type: 'success' });
            this.parameters.updateBreakOutRoomStarted(true);
            this.parameters.updateBreakOutRoomEnded(false);

            this.onBreakoutRoomsClose();
            if (this.parameters.meetingDisplayType != 'all') {
              this.parameters.updateMeetingDisplayType('all');
            }
          } else {
            this.parameters.showAlert?.({ message: response.reason, type: 'danger' });
          }
        },
      );
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
  }

  handleEditRoom(roomIndex: number) {
    this.parameters.updateCurrentRoomIndex(roomIndex);
    this.currentRoom = this.breakoutRoomsRef[roomIndex];
    this.editRoomModalVisible = true;
    this.parameters.updateCanStartBreakout(false);
    this.checkCanStartBreakout();
  }

  handleDeleteRoom(roomIndex: number) {
    if (this.breakoutRoomsRef.length > 0) {
      const room = this.breakoutRoomsRef[roomIndex];
      room.forEach((participant) => (participant.breakRoom = null));
      const newBreakoutRooms = [...this.breakoutRoomsRef];
      newBreakoutRooms.splice(roomIndex, 1);

      newBreakoutRooms.forEach((room, index) => {
        room.forEach((participant) => (participant.breakRoom = index));
      });

      this.breakoutRoomsRef = newBreakoutRooms;
      this.checkCanStartBreakout();
    }
  }

  handleAddParticipant(event: { roomIndex: number; participant: BreakoutParticipant }) {
    const { roomIndex, participant } = event;
    if (this.breakoutRoomsRef[roomIndex].length < this.parameters.itemPageLimit) {
      const newBreakoutRooms = [...this.breakoutRoomsRef];
      newBreakoutRooms[roomIndex].push(participant);
      this.breakoutRoomsRef = newBreakoutRooms;
      participant['breakRoom'] = roomIndex;
      if (this.parameters.currentRoomIndex != null) {
        this.handleEditRoom(this.parameters.currentRoomIndex);
      }
    } else {
      this.parameters.showAlert?.({ message: 'Room is full', type: 'danger' });
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
}
