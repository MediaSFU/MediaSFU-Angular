import { OnInit, SimpleChanges, OnChanges } from '@angular/core';
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
}
export type ConfirmExitModalType = (options: ConfirmExitModalOptions) => HTMLElement;
/**
 * ConfirmExitModal component renders a modal view for exit confirmation,
 * allowing users to confirm or cancel an exit event from a session or room.
 *
 * @component
 * @selector app-confirm-exit-modal
 * @standalone true
 * @imports [CommonModule, FormsModule, FontAwesomeModule]
 *
 * @example
 * ```html
 * <app-confirm-exit-modal
 *   [isConfirmExitModalVisible]="true"
 *   [onConfirmExitClose]="closeModal"
 *   [exitEventOnConfirm]="confirmExit"
 *   [member]="memberName"
 *   [ban]="false"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [islevel]="userLevel">
 * </app-confirm-exit-modal>
 * ```
 *
 * @input {boolean} isConfirmExitModalVisible - Determines the visibility of the modal.
 * @input {() => void} onConfirmExitClose - Callback to close the modal.
 * @input {string} position - Position on the screen (default: 'topRight').
 * @input {string} backgroundColor - Background color of the modal (default: '#83c0e9').
 * @input {(options: ConfirmExitOptions) => void} exitEventOnConfirm - Callback function to handle exit confirmation.
 * @input {string} member - Identifies the member for whom the exit is confirmed.
 * @input {boolean} ban - Indicates if the exit action includes a ban.
 * @input {string} roomName - Name of the room involved in the exit action.
 * @input {Socket} socket - Socket instance for real-time interaction.
 * @input {string} islevel - User level information.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 * @property {any} modalContentStyle - Object defining the style for modal content.
 *
 * @constructor
 * @param {ConfirmExit} confirmExitService - Service to handle the exit confirmation.
 *
 * @method ngOnInit - Initializes component properties and default styles for the modal content.
 * @method ngOnChanges - Updates component state upon changes in input properties.
 * @param {SimpleChanges} changes - Object containing the current and previous property values.
 *
 * @method handleConfirmExit - Handles the exit confirmation event, triggering the provided `exitEventOnConfirm` function and then closing the modal.
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
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    modalContentStyle: any;
    constructor(confirmExitService: ConfirmExit);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    handleConfirmExit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmExitModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmExitModal, "app-confirm-exit-modal", never, { "isConfirmExitModalVisible": { "alias": "isConfirmExitModalVisible"; "required": false; }; "onConfirmExitClose": { "alias": "onConfirmExitClose"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "exitEventOnConfirm": { "alias": "exitEventOnConfirm"; "required": false; }; "member": { "alias": "member"; "required": false; }; "ban": { "alias": "ban"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; }, {}, never, never, true, never>;
}
