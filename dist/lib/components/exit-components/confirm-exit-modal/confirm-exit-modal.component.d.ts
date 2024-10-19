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
 * Component for displaying a confirmation modal when exiting.
 *
 * @selector app-confirm-exit-modal
 * @templateUrl ./confirm-exit-modal.component.html
 * @styleUrls ./confirm-exit-modal.component.css
 * @standalone true
 * @imports [CommonModule, FormsModule, FontAwesomeModule]
 *
 * @class ConfirmExitModal
 * @implements OnInit, OnChanges
 *
 * @property {boolean} isConfirmExitModalVisible - Visibility state of the confirmation modal.
 * @property {() => void} onConfirmExitClose - Callback function to close the modal.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {(options: ConfirmExitOptions) => void} exitEventOnConfirm - Event triggered on confirming exit.
 * @property {string} member - Member information.
 * @property {boolean} ban - Ban status.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance.
 * @property {string} islevel - Level information.
 * @property {IconDefinition} faTimes - FontAwesome icon for close button.
 * @property {any} modalContentStyle - Style object for modal content.
 *
 * @constructor
 * @param {ConfirmExit} confirmExitService - Service for handling exit confirmation.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @param {SimpleChanges} changes - Object of current and previous property values.
 * @method handleConfirmExit - Handles the exit confirmation event.
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
