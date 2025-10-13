import { Component, Input, OnInit, SimpleChanges, OnChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ConfirmExit,
  ConfirmExitOptions,
} from '../../../methods/exit-methods/confirm-exit.service';
import { Socket } from 'socket.io-client';

export interface ConfirmExitModalOptions {
  isConfirmExitModalVisible: boolean;
  onConfirmExitClose: () => void;
  position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  backgroundColor?: string;
  exitEventOnConfirm?: (options: ConfirmExitOptions) => void;
  member: string;
  ban?: boolean;
  roomName: string;
  socket: Socket;
  islevel: string;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type ConfirmExitModalType = (options: ConfirmExitModalOptions) => HTMLElement;

/**
 * ConfirmExitModal - Confirmation dialog for leaving or being removed from a session
 * 
 * @component
 * @description
 * Displays a confirmation modal when a user attempts to leave a room or session.
 * Supports optional ban action for host/admin users.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with custom callbacks and member info
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Exit confirmation with cancel option
 * - Optional ban functionality for hosts
 * - Socket-based room exit handling
 * - Configurable positioning
 * - Custom styling support
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-confirm-exit-modal
 *   [isConfirmExitModalVisible]="showExitModal"
 *   [member]="currentMember"
 *   [roomName]="roomName"
 *   [socket]="socketInstance"
 *   [islevel]="userLevel"
 *   [exitEventOnConfirm]="handleConfirmExit"
 *   [onConfirmExitClose]="closeExitModal">
 * </app-confirm-exit-modal>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-confirm-exit-modal
 *   [isConfirmExitModalVisible]="showExitModal"
 *   [member]="currentMember"
 *   [roomName]="roomName"
 *   [socket]="socketInstance"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.8)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#2c3e50',
 *     borderRadius: '12px',
 *     border: '2px solid #e74c3c'
 *   }"
 *   [position]="'center'"
 *   [exitEventOnConfirm]="handleConfirmExit"
 *   [onConfirmExitClose]="closeExitModal">
 * </app-confirm-exit-modal>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-confirm-exit-modal
 *   [isConfirmExitModalVisible]="showExitModal"
 *   [customTemplate]="customExitTemplate"
 *   [onConfirmExitClose]="closeExitModal">
 * </app-confirm-exit-modal>
 * 
 * <ng-template #customExitTemplate let-member="member" let-ban="ban" let-handleConfirmExit="handleConfirmExit">
 *   <div class="custom-exit-dialog">
 *     <h3>Confirm {{ ban ? 'Ban & Exit' : 'Exit' }}</h3>
 *     <p>Are you sure you want to {{ ban ? 'ban and remove' : 'remove' }} {{ member }}?</p>
 *     <div class="actions">
 *       <button (click)="handleConfirmExit()">Confirm</button>
 *       <button (click)="closeExitModal()">Cancel</button>
 *     </div>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-confirm-exit-modal
 * @standalone true
 * @imports CommonModule, FormsModule, FontAwesomeModule
 * 
 * @input isConfirmExitModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onConfirmExitClose - Callback function to close the modal. Default: `() => {}`
 * @input position - Modal position on screen ('topRight', 'topLeft', 'bottomRight', 'bottomLeft'). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input exitEventOnConfirm - Callback invoked when exit is confirmed. Default: `undefined`
 * @input member - Name/ID of the member being removed or leaving. Default: `''`
 * @input ban - Whether to ban the member (in addition to removing). Default: `false`
 * @input roomName - Name of the room/session being exited. Default: `''`
 * @input socket - Socket.io client instance for real-time communication. Default: `undefined`
 * @input islevel - User level/role (e.g., '0' for host, '2' for participant). Default: `'2'`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes default modal content styles
 * @method ngOnChanges - Updates visibility state and modal styles when inputs change
 * @method handleConfirmExit - Executes exit confirmation logic and closes modal
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 */

@Component({
    selector: 'app-confirm-exit-modal',
    templateUrl: './confirm-exit-modal.component.html',
    styleUrls: ['./confirm-exit-modal.component.css'],
    imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class ConfirmExitModal implements OnInit, OnChanges {
  @Input() isConfirmExitModalVisible = false;
  @Input() onConfirmExitClose!: () => void;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() exitEventOnConfirm!: (options: ConfirmExitOptions) => void;
  @Input() member = '';
  @Input() ban = false;
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() islevel = '';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  faTimes = faTimes;

  modalContentStyle: any;

  constructor(private confirmExitService: ConfirmExit) {}

  getCombinedContentStyle() {
    return {
      ...this.modalContentStyle,
      ...(this.contentStyle || {})
    };
  }

  ngOnInit() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.8 * screenWidth;
    if (modalWidth > 350) {
      modalWidth = 350;
    }

    this.modalContentStyle = {
      backgroundColor: this.backgroundColor,
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
      width: `${modalWidth}px`,
    };

    if (!this.exitEventOnConfirm) {
      this.exitEventOnConfirm = this.confirmExitService.confirmExit.bind(this.confirmExitService);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isConfirmExitModalVisible'] && changes['islevel']) {
      this.islevel = changes['islevel'].currentValue;
    }
  }

  handleConfirmExit() {
    this.exitEventOnConfirm({
      socket: this.socket,
      member: this.member,
      roomName: this.roomName,
      ban: this.ban,
    });
    this.onConfirmExitClose();
  }
}
