import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus, faUsers, faPen } from '@fortawesome/free-solid-svg-icons';
import { BreakoutParticipant, Participant } from '../../../@types/types';

/**
 * EditRoomModal - Sub-modal for editing individual breakout room participants
 * 
 * @component
 * @description
 * Allows host to add/remove participants for a specific breakout room.
 * Used within the BreakoutRoomsModal workflow for detailed room management.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with assigned/unassigned participant lists
 * 2. **Style Customization**: Override modal appearance with inline styles
 * 3. **Full Override**: Replace entire modal with custom implementation
 * 
 * Key Features:
 * - View current room participants
 * - Add participants from unassigned pool
 * - Remove participants from room
 * - Responsive modal sizing
 * - Room index tracking
 * 
 * @selector app-edit-room-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 * 
 * @input editRoomModalVisible - Whether the modal is currently visible. Default: `false`
 * @input currentRoom - Array of participants currently in the room being edited. Default: `[]`
 * @input participantsRef - Array of all available participants. Default: `[]`
 * @input currentRoomIndex - Index of the room being edited. Default: `0`
 * @input position - Modal position on screen ('center', etc.). Default: `'center'`
 * @input backgroundColor - Background color of the modal content. Default: `'#fff'`
 * 
 * @output setEditRoomModalVisible - EventEmitter to toggle modal visibility. Emits: `boolean`
 * @output addParticipant - EventEmitter to add participant to room. Emits: `{ roomIndex: number; participant: Participant | BreakoutParticipant }`
 * @output removeParticipant - EventEmitter to remove participant from room. Emits: `{ roomIndex: number; participant: Participant | BreakoutParticipant }`
 * 
 * @method ngOnInit - Initializes modal width and resize listener
 * @method ngOnDestroy - Removes resize event listener
 * @method calculateModalWidth - Dynamically sets modal width based on screen size
 * @method handleAddParticipant - Emits event to add participant to current room
 * @method handleRemoveParticipant - Emits event to remove participant from current room
 * @method closeModal - Closes modal by emitting visibility change
 * @method unassignedParticipants - Returns filtered list of participants not assigned to any room
 * @method modalContainerStyle - Returns computed overlay styles
 * @method modalContentStyle - Returns computed content styles
 */

@Component({
    selector: 'app-edit-room-modal',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './edit-room-modal.component.html',
    styleUrls: ['./edit-room-modal.component.css']
})

export class EditRoomModalComponent implements OnInit {
  @Input() editRoomModalVisible = false;
  @Input() currentRoom: BreakoutParticipant[] = [];
  @Input() participantsRef: Participant[] = [];
  @Input() currentRoomIndex = -1;
  @Input() position = 'center';
  @Input() backgroundColor = '#fff';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

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
