import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { BreakoutParticipant, Participant } from '../../../@types/types';

@Component({
    selector: 'app-room-list',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {
  @Input()
  rooms: BreakoutParticipant[][] = [];
  @Input() isDarkMode?: boolean;
  @Input() editingRoomIndex: number | null = null;
  @Output() editRoom = new EventEmitter<number>();
  @Output() deleteRoom = new EventEmitter<number>();
  @Output() removeParticipant = new EventEmitter<{
    roomIndex: number;
    participant: BreakoutParticipant | Participant;
  }>();

  faPen = faPen;
  faTimes = faTimes;
  faUsers = faUsers;

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  handleEditRoom(roomIndex: number) {
    this.editRoom.emit(roomIndex);
  }

  handleDeleteRoom(roomIndex: number) {
    this.deleteRoom.emit(roomIndex);
  }

  handleRemoveParticipant(roomIndex: number, participant: BreakoutParticipant | Participant) {
    this.removeParticipant.emit({ roomIndex, participant });
  }

  isEditingRoom(roomIndex: number): boolean {
    return this.editingRoomIndex === roomIndex;
  }
}
