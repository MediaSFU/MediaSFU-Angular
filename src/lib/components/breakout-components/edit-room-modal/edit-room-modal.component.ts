import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus, faUsers, faPen } from '@fortawesome/free-solid-svg-icons';
import { BreakoutParticipant, Participant } from '../../../@types/types';

/**
 * EditRoomModalComponent allows managing participants within a breakout room for an event.
 *
 * @selector app-edit-room-modal
 * @inputs
 * - `editRoomModalVisible` (boolean): Controls the visibility of the edit room modal. Default is false.
 * - `currentRoom` (BreakoutParticipant[]): List of participants currently assigned to the room.
 * - `participantsRef` (Participant[]): Reference list of all participants.
 * - `currentRoomIndex` (number): Index of the room being edited.
 * - `position` (string): Position of the modal on the screen. Default is 'center'.
 * - `backgroundColor` (string): Background color of the modal. Default is '#fff'.
 *
 * @outputs
 * - `setEditRoomModalVisible` (EventEmitter<boolean>): Emits a boolean to toggle the visibility of the modal.
 * - `addParticipant` (EventEmitter<{ roomIndex: number; participant: Participant | BreakoutParticipant; }>): Emits data for adding a participant to the room.
 * - `removeParticipant` (EventEmitter<{ roomIndex: number; participant: Participant | BreakoutParticipant; }>): Emits data for removing a participant from the room.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook to initialize modal width and attach resize event listener.
 * - `ngOnDestroy()`: Lifecycle hook to remove the resize event listener.
 * - `calculateModalWidth()`: Dynamically calculates and sets modal width based on screen width.
 * - `modalContainerStyle()`: Returns style object for modal container.
 * - `modalContentStyle()`: Returns style object for modal content.
 * - `handleAddParticipant(roomIndex: number, participant: BreakoutParticipant)`: Emits event to add participant to specified room.
 * - `handleRemoveParticipant(roomIndex: number, participant: BreakoutParticipant)`: Emits event to remove participant from specified room.
 * - `closeModal()`: Closes the modal by emitting a visibility change.
 * - `unassignedParticipants()`: Filters and returns a list of unassigned participants.
 *
 * @dependencies
 * - `CommonModule`: Provides Angular's common directives.
 * - `FontAwesomeModule`: Allows usage of Font Awesome icons.
 *
 * @example
 * ```html
 * <app-edit-room-modal
 *  [editRoomModalVisible]="editRoomModalVisible"
 * [currentRoom]="currentRoom"
 * [participantsRef]="participantsRef"
 * [currentRoomIndex]="currentRoomIndex"
 * [position]="position"
 * [backgroundColor]="backgroundColor"
 * (setEditRoomModalVisible)="setEditRoomModalVisible($event)"
 * (addParticipant)="addParticipant($event)"
 * (removeParticipant)="removeParticipant($event)">
 * </app-edit-room-modal>
 * ```
 *
 **/

@Component({
  selector: 'app-edit-room-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './edit-room-modal.component.html',
  styleUrls: ['./edit-room-modal.component.css'],
})

export class EditRoomModalComponent implements OnInit {
  @Input() editRoomModalVisible = false;
  @Input() currentRoom: BreakoutParticipant[] = [];
  @Input() participantsRef: Participant[] = [];
  @Input() currentRoomIndex = -1;
  @Input() position = 'center';
  @Input() backgroundColor = '#fff';

  @Output() setEditRoomModalVisible = new EventEmitter<boolean>();
  @Output() addParticipant = new EventEmitter<{
    roomIndex: number;
    participant: Participant | BreakoutParticipant;
  }>();
  @Output() removeParticipant = new EventEmitter<{
    roomIndex: number;
    participant: Participant | BreakoutParticipant;
  }>();

  faTimes = faTimes;
  faPlus = faPlus;
  faUsers = faUsers;
  faPen = faPen;

  modalWidth = 400;

  ngOnInit() {
    this.calculateModalWidth();
    window.addEventListener('resize', this.calculateModalWidth.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.calculateModalWidth.bind(this));
  }

  calculateModalWidth() {
    const screenWidth = window.innerWidth;
    this.modalWidth = screenWidth > 500 ? 400 : screenWidth * 0.8;
  }

  modalContainerStyle() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }

  modalContentStyle() {
    return {
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '20px',
      width: `${this.modalWidth}px`,
      maxHeight: '80%',
      overflowY: 'auto',
    };
  }

  handleAddParticipant(roomIndex: number, participant: BreakoutParticipant) {
    this.addParticipant.emit({ roomIndex, participant });
  }

  handleRemoveParticipant(roomIndex: number, participant: BreakoutParticipant) {
    this.removeParticipant.emit({ roomIndex, participant });
  }

  closeModal() {
    this.setEditRoomModalVisible.emit(false);
  }

  unassignedParticipants(): Participant[] {
    return this.participantsRef.filter((participant) => participant['breakRoom'] == null);
  }
}
