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
    roomName: string;
    member: string;
    countdownDuration?: number;
}
export type ConfirmHereModalType = (options: ConfirmHereModalOptions) => void;
/**
 * Component representing a confirmation modal with a countdown timer.
 *
 * @selector app-confirm-here-modal
 * @templateUrl ./confirm-here-modal.component.html
 * @styleUrls ./confirm-here-modal.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @styles
 * - .spinner: Styles for the loading spinner.
 * - @keyframes spin: Keyframes for spinner animation.
 * - .modal-content: Styles for the modal content container.
 * - .loading-text: Styles for the loading text.
 *
 * @class ConfirmHereModal
 * @implements OnInit, OnDestroy
 *
 * @property {boolean} isConfirmHereModalVisible - Determines if the modal is visible.
 * @property {string} position - Position of the modal.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} displayColor - Display color of the modal.
 * @property {Function} onConfirmHereClose - Callback function to execute when the modal is closed.
 * @property {number} [countdownDuration=120] - Duration of the countdown in seconds.
 * @property {Socket} socket - Socket instance for communication.
 * @property {string} roomName - Name of the room for socket communication.
 * @property {string} member - Member identifier for socket communication.
 * @property {IconDefinition} faSpinner - FontAwesome spinner icon.
 * @property {number} counter - Countdown counter.
 * @property {any} countdownInterval - Interval ID for the countdown timer.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 * @method startCountdown - Starts the countdown timer.
 * @method clearCountdown - Clears the countdown timer.
 * @method handleConfirmHere - Handles the confirmation action and closes the modal.
 *
 * @getter spinnerContainerStyle - Returns the style object for the spinner container.
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
 */
export declare class ConfirmHereModal implements OnInit, OnDestroy {
    isConfirmHereModalVisible: boolean;
    position: string;
    backgroundColor: string;
    displayColor: string;
    onConfirmHereClose: () => void;
    countdownDuration?: number;
    socket: Socket;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmHereModal, "app-confirm-here-modal", never, { "isConfirmHereModalVisible": { "alias": "isConfirmHereModalVisible"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "displayColor": { "alias": "displayColor"; "required": false; }; "onConfirmHereClose": { "alias": "onConfirmHereClose"; "required": false; }; "countdownDuration": { "alias": "countdownDuration"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "member": { "alias": "member"; "required": false; }; }, {}, never, never, true, never>;
}
