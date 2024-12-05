import { OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface ConfirmHereModalOptions {
    isConfirmHereModalVisible: boolean;
    position: string;
    backgroundColor: string;
    displayColor: string;
    onConfirmHereClose: () => void;
    socket: Socket;
    localSocket?: Socket;
    roomName: string;
    member: string;
    countdownDuration?: number;
}
export type ConfirmHereModalType = (options: ConfirmHereModalOptions) => void;
/**
 * @component ConfirmHereModal
 * @description Displays a confirmation modal with a countdown timer, allowing users to confirm their presence or be automatically disconnected after the timer expires.
 *
 * @selector app-confirm-here-modal
 * @templateUrl ./confirm-here-modal.component.html
 * @styleUrls ./confirm-here-modal.component.css
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @example
 * ```html
 * <app-confirm-here-modal
 *   [isConfirmHereModalVisible]="true"
 *   [position]="'center'"
 *   [backgroundColor]="'#83c0e9'"
 *   [displayColor]="'#000000'"
 *   [onConfirmHereClose]="closeConfirmModal"
 *   [countdownDuration]="120"
 *   [socket]="socketInstance"
 *   [localSocket]="localSocketInstance"
 *   [roomName]="'exampleRoom'"
 *   [member]="'exampleMember'"
 * ></app-confirm-here-modal>
 * ```
 */
export declare class ConfirmHereModal implements OnInit, OnDestroy {
    isConfirmHereModalVisible: boolean;
    position: string;
    backgroundColor: string;
    displayColor: string;
    onConfirmHereClose: () => void;
    countdownDuration?: number;
    socket: Socket;
    localSocket?: Socket;
    roomName: string;
    member: string;
    faSpinner: import("@fortawesome/fontawesome-common-types").IconDefinition;
    counter: number;
    countdownInterval: any;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    startCountdown: () => void;
    clearCountdown: () => void;
    handleConfirmHere(): void;
    get spinnerContainerStyle(): {
        marginBottom: string;
    };
    get modalContainerStyle(): {
        'background-color': string;
        display: string;
    };
    get modalContentStyle(): {
        'background-color': string;
        top: string;
        left: string;
        transform: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmHereModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmHereModal, "app-confirm-here-modal", never, { "isConfirmHereModalVisible": { "alias": "isConfirmHereModalVisible"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "displayColor": { "alias": "displayColor"; "required": false; }; "onConfirmHereClose": { "alias": "onConfirmHereClose"; "required": false; }; "countdownDuration": { "alias": "countdownDuration"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "localSocket": { "alias": "localSocket"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "member": { "alias": "member"; "required": false; }; }, {}, never, never, true, never>;
}
