import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus, faUsers, faPen } from '@fortawesome/free-solid-svg-icons';
import { BreakoutParticipant, Participant } from '../../../@types/types';

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
