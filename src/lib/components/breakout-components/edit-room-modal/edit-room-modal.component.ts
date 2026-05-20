import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus, faUsers, faPen } from '@fortawesome/free-solid-svg-icons';
import { BreakoutParticipant, Participant } from '../../../@types/types';
import { ModernRenderMode, isEmbeddedRenderMode } from '../../../modern/utils/render-mode.utils';

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

export class EditRoomModalComponent implements OnInit, OnDestroy {
  @Input() editRoomModalVisible = false;
  @Input() currentRoom: BreakoutParticipant[] = [];
  @Input() participantsRef: Participant[] = [];
  @Input() currentRoomIndex = -1;
  @Input() position = 'center';
  @Input() backgroundColor = '#fff';
  @Input() isDarkMode?: boolean;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;
  @Input() renderMode: ModernRenderMode = 'modal';

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
  private readonly resizeHandler = () => this.calculateModalWidth();

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  ngOnInit() {
    this.calculateModalWidth();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  calculateModalWidth() {
    const screenWidth = window.innerWidth;
    this.modalWidth = screenWidth > 500 ? 400 : screenWidth * 0.8;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  modalContainerStyle() {
    return this.isEmbedded()
      ? {
          position: 'static',
          top: 'auto',
          left: 'auto',
          width: '100%',
          height: 'auto',
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          zIndex: 'auto',
          display: 'block',
          padding: '16px 0 0',
        }
      : {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: this.resolvedIsDarkMode ? 'rgba(2, 6, 23, 0.62)' : 'rgba(15, 23, 42, 0.18)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '18px',
        };
  }

  modalContentStyle() {
    const isDarkMode = this.resolvedIsDarkMode;
    return {
      background: typeof this.isDarkMode === 'boolean'
        ? isDarkMode
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.96) 100%)'
        : this.backgroundColor,
      borderRadius: this.isEmbedded() ? '20px' : '24px',
      border: isDarkMode
        ? '1px solid rgba(148, 163, 184, 0.18)'
        : '1px solid rgba(148, 163, 184, 0.22)',
      boxShadow: this.isEmbedded()
        ? '0 18px 36px rgba(15, 23, 42, 0.14)'
        : '0 24px 48px rgba(15, 23, 42, 0.18)',
      padding: this.isEmbedded() ? '18px' : '20px',
      width: this.isEmbedded() ? '100%' : `${this.modalWidth}px`,
      maxWidth: '100%',
      maxHeight: this.isEmbedded() ? 'none' : '80%',
      overflowY: 'auto',
      color: isDarkMode ? '#e2e8f0' : '#0f172a',
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
