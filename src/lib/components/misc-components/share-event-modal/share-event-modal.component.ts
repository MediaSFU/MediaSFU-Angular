import { Component, Input, TemplateRef } from '@angular/core';
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
  localLink?: string;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type ShareEventModalType = (options: ShareEventModalOptions) => void;

/**
 * ShareEventModal - Modal for sharing room/event access details
 * 
 * @component
 * @description
 * Displays a modal with meeting ID, passcode, and share options for inviting participants.
 * Includes social sharing buttons and copy-to-clipboard functionality.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with room details and share buttons
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Meeting ID display with copy functionality
 * - Admin passcode display (for hosts)
 * - Social media share buttons (optional)
 * - Support for custom/local server links
 * - Event type-specific sharing
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-share-event-modal
 *   [isShareEventModalVisible]="showShareModal"
 *   [roomName]="currentRoom"
 *   [adminPasscode]="hostPasscode"
 *   [islevel]="'0'"
 *   [eventType]="'webinar'"
 *   [shareButtons]="true"
 *   [onShareEventClose]="closeShareModal">
 * </app-share-event-modal>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-share-event-modal
 *   [isShareEventModalVisible]="showShareModal"
 *   [roomName]="currentRoom"
 *   [adminPasscode]="hostPasscode"
 *   [eventType]="'conference'"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.75)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#ffffff',
 *     borderRadius: '16px',
 *     padding: '30px',
 *     maxWidth: '500px'
 *   }"
 *   [position]="'center'"
 *   [shareButtons]="true"
 *   [onShareEventClose]="closeShareModal">
 * </app-share-event-modal>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-share-event-modal
 *   [isShareEventModalVisible]="showShareModal"
 *   [customTemplate]="customShareTemplate"
 *   [onShareEventClose]="closeShareModal">
 * </app-share-event-modal>
 * 
 * <ng-template #customShareTemplate let-roomName="roomName" let-adminPasscode="adminPasscode">
 *   <div class="custom-share-dialog">
 *     <h3>Invite Participants</h3>
 *     <div class="share-item">
 *       <label>Meeting ID:</label>
 *       <code>{{ roomName }}</code>
 *       <button (click)="copyToClipboard(roomName)">Copy</button>
 *     </div>
 *     <div class="share-item" *ngIf="adminPasscode">
 *       <label>Host Code:</label>
 *       <code>{{ adminPasscode }}</code>
 *       <button (click)="copyToClipboard(adminPasscode)">Copy</button>
 *     </div>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-share-event-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, MeetingIdComponent, MeetingPasscodeComponent, ShareButtonsComponent
 * 
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input isShareEventModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onShareEventClose - Callback function to close the modal. Default: `() => {}`
 * @input shareButtons - Whether to display social media share buttons. Default: `true`
 * @input position - Modal position on screen (e.g., 'topRight', 'center'). Default: `'topRight'`
 * @input roomName - Room/meeting ID to be shared. Default: `''`
 * @input adminPasscode - Admin/host passcode (shown only to hosts). Default: `undefined`
 * @input islevel - User level/role ('0' for host, '2' for participant). Default: `'2'`
 * @input eventType - Type of event ('chat', 'broadcast', 'webinar', 'conference'). Default: `'webinar'`
 * @input localLink - Custom server link for community edition deployments. Default: `undefined`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method handleClose - Closes the modal by invoking onShareEventClose callback
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 * @getter modalContainerStyle - Returns computed overlay styles
 * @getter modalContentStyle - Returns computed content styles
 */
@Component({
    selector: 'app-share-event-modal',
    templateUrl: './share-event-modal.component.html',
    styleUrls: ['./share-event-modal.component.css'],
    imports: [
        CommonModule,
        FontAwesomeModule,
        MeetingIdComponent,
        MeetingPasscodeComponent,
        ShareButtonsComponent,
    ]
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
  @Input() localLink: string = '';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  faTimes = faTimes;

  handleClose() {
    this.onShareEventClose();
  }

  getCombinedOverlayStyle() {
    return {
      ...this.modalContainerStyle,
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      ...this.modalContentStyle,
      ...(this.contentStyle || {})
    };
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
