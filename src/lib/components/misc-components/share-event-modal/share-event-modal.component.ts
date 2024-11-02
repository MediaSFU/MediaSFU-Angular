import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MeetingIdComponent } from '../../menu-components/meeting-id-component/meeting-id-component.component';
import { MeetingPasscodeComponent } from '../../menu-components/meeting-passcode-component/meeting-passcode-component.component';
import { ShareButtonsComponent } from '../../menu-components/share-buttons-component/share-buttons-component.component';
import { EventType } from '../../../@types/types';

export interface ShareEventModalOptions {
  backgroundColor?: string;
  isShareEventModalVisible: boolean;
  onShareEventClose: () => void;
  shareButtons?: boolean;
  position?: string;
  roomName: string;
  adminPasscode?: string;
  islevel?: string;
  eventType: EventType;
}

export type ShareEventModalType = (options: ShareEventModalOptions) => void;

/**
 * Component for displaying a modal to share event details.
 *
 * @component
 * @selector app-share-event-modal
 * @templateUrl ./share-event-modal.component.html
 * @styleUrls ./share-event-modal.component.css
 *
 * @imports CommonModule, FontAwesomeModule, MeetingIdComponent, MeetingPasscodeComponent, ShareButtonsComponent
 *
 * @property {string} backgroundColor - Background color of the modal content.
 * @property {boolean} isShareEventModalVisible - Visibility state of the share event modal.
 * @property {Function} onShareEventClose - Callback function to handle modal close event.
 * @property {string} roomName - Name of the room to be shared.
 * @property {string} adminPasscode - Admin passcode for the room.
 * @property {string} islevel - Level of the event (e.g., admin, user).
 * @property {string} position - Position of the modal on the screen (e.g., topRight, bottomLeft).
 * @property {boolean} shareButtons - Flag to display share buttons in the modal.
 * @property {EventType} eventType - Type of event (e.g., chat, broadcast, webinar).
 *
 * @method handleClose - Closes the share event modal by invoking the onShareEventClose callback.
 *
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
 * @example
 * ```html
 * <app-share-event-modal
 *   [backgroundColor]="'rgba(255, 255, 255, 0.25)'"
 *   [isShareEventModalVisible]="isModalVisible"
 *   [onShareEventClose]="handleModalClose"
 *   [roomName]="roomName"
 *   [adminPasscode]="adminPasscode"
 *   [islevel]="userLevel"
 *   [position]="'topRight'"
 *   [shareButtons]="true"
 *   [eventType]="eventType"
 * ></app-share-event-modal>
 * ```
 */
@Component({
  selector: 'app-share-event-modal',
  templateUrl: './share-event-modal.component.html',
  styleUrls: ['./share-event-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MeetingIdComponent,
    MeetingPasscodeComponent,
    ShareButtonsComponent,
  ],
})
export class ShareEventModal {
  @Input() backgroundColor = 'rgba(255, 255, 255, 0.25)';
  @Input() isShareEventModalVisible = false;
  @Input() onShareEventClose!: () => void;
  @Input() roomName!: string;
  @Input() adminPasscode!: string;
  @Input() islevel!: string;
  @Input() position = 'topRight';
  @Input() shareButtons = true;
  @Input() eventType!: EventType;

  faTimes = faTimes;

  handleClose() {
    this.onShareEventClose();
  }

  get modalContainerStyle() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: this.isShareEventModalVisible ? 'block' : 'none',
      zIndex: 999,
    };
  }

  get modalContentStyle() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.8 * screenWidth;
    if (modalWidth > 350) {
      modalWidth = 350;
    }

    return {
      position: 'fixed',
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: `${modalWidth}px`,
      maxHeight: '60%',
      overflowY: 'auto',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
    };
  }
}
