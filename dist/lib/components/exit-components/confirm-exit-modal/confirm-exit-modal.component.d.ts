import { OnInit, SimpleChanges, OnChanges, TemplateRef } from '@angular/core';
import { ConfirmExit, ConfirmExitOptions } from '../../../methods/exit-methods/confirm-exit.service';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
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
export declare class ConfirmExitModal implements OnInit, OnChanges {
    private confirmExitService;
    isConfirmExitModalVisible: boolean;
    onConfirmExitClose: () => void;
    position: string;
    backgroundColor: string;
    exitEventOnConfirm: (options: ConfirmExitOptions) => void;
    member: string;
    ban: boolean;
    roomName: string;
    socket: Socket;
    islevel: string;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    modalContentStyle: any;
    constructor(confirmExitService: ConfirmExit);
    getCombinedContentStyle(): any;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    handleConfirmExit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmExitModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmExitModal, "app-confirm-exit-modal", never, { "isConfirmExitModalVisible": { "alias": "isConfirmExitModalVisible"; "required": false; }; "onConfirmExitClose": { "alias": "onConfirmExitClose"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "exitEventOnConfirm": { "alias": "exitEventOnConfirm"; "required": false; }; "member": { "alias": "member"; "required": false; }; "ban": { "alias": "ban"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "overlayStyle": { "alias": "overlayStyle"; "required": false; }; "contentStyle": { "alias": "contentStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
