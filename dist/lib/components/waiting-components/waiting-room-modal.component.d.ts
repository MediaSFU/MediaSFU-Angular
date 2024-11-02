import { OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { WaitingRoomParticipant } from '../../@types/types';
import { RespondToWaiting, RespondToWaitingOptions, RespondToWaitingType } from '../../methods/waiting-methods/respond-to-waiting.service';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface WaitingRoomModalParameters {
    filteredWaitingRoomList: WaitingRoomParticipant[];
    getUpdatedAllParams: () => WaitingRoomModalParameters;
    [key: string]: any;
}
export interface WaitingRoomModalOptions {
    isWaitingModalVisible: boolean;
    onWaitingRoomClose: () => void;
    waitingRoomCounter: number;
    onWaitingRoomFilterChange: (filter: string) => void;
    waitingRoomList: WaitingRoomParticipant[];
    updateWaitingList: (updatedList: WaitingRoomParticipant[]) => void;
    roomName: string;
    socket: Socket;
    position?: string;
    backgroundColor?: string;
    parameters: WaitingRoomModalParameters;
    onWaitingRoomItemPress?: RespondToWaitingType;
}
export type WaitingRoomModalType = (options: WaitingRoomModalOptions) => HTMLElement;
/**
 * Component representing a modal for managing participants in a waiting room.
 *
 * @component
 * @selector app-waiting-room-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * @templateUrl ./waiting-room-modal.component.html
 * @styleUrls ['./waiting-room-modal.component.css']
 *
 * @property {boolean} isWaitingModalVisible - Visibility state of the modal.
 * @property {number} waitingRoomCounter - Counter for the number of participants in the waiting room.
 * @property {WaitingRoomParticipant[]} waitingRoomList - List of participants in the waiting room.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance for communication.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {WaitingRoomModalParameters} parameters - Parameters for the waiting room modal.
 * @property {function} onWaitingRoomClose - Function to call when the modal is closed.
 * @property {function} onWaitingRoomFilterChange - Function to call when the filter value changes.
 * @property {function} updateWaitingList - Function to update the waiting list.
 * @property {function} onWaitingRoomItemPress - Function to call when an item in the waiting room is pressed.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 * @property {IconDefinition} faCheck - FontAwesome icon for the check button.
 * @property {WaitingRoomParticipant[]} waitingRoomList_s - Filtered list of participants in the waiting room.
 * @property {number} waitingRoomCounter_s - Counter for the filtered list of participants in the waiting room.
 * @property {boolean} reRender - Flag to trigger re-rendering of the component.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @method updateParameters - Updates the parameters for the waiting room modal.
 * @method handleModalClose - Handles the closing of the modal.
 * @method handleFilterChange - Handles the change in the filter input.
 * @method handleItemPress - Handles the pressing of an item in the waiting room.
 *
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
 * @getter inputStyle - Returns the style object for the input field.
 *
 * @example
 * ```html
 * <app-waiting-room-modal
 *  [isWaitingModalVisible]="true"
 * [waitingRoomCounter]="waitingRoomCounter"
 * [waitingRoomList]="waitingRoomList"
 * [roomName]="roomName"
 * [socket]="socket"
 * [position]="'topRight'"
 * [backgroundColor]="'#83c0e9'"
 * [parameters]="waitingRoomModalParams"
 * [onWaitingRoomClose]="closeWaitingRoomModal"
 * [onWaitingRoomFilterChange]="filterWaitingRoom"
 * [updateWaitingList]="updateWaitingList"
 * [onWaitingRoomItemPress]="handleWaitingRoomItemPress"
 * ></app-waiting-room-modal>
 * ```
 *
 */
export declare class WaitingRoomModal implements OnChanges, OnInit {
    private respondToWaitingService;
    constructor(respondToWaitingService: RespondToWaiting);
    isWaitingModalVisible: boolean;
    waitingRoomCounter: number;
    waitingRoomList: WaitingRoomParticipant[];
    roomName: string;
    socket: Socket;
    position: string;
    backgroundColor: string;
    parameters: WaitingRoomModalParameters;
    onWaitingRoomClose: () => void;
    onWaitingRoomFilterChange: (value: string) => void;
    updateWaitingList: (data: WaitingRoomParticipant[]) => void;
    onWaitingRoomItemPress: (data: RespondToWaitingOptions) => void;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faCheck: import("@fortawesome/fontawesome-common-types").IconDefinition;
    waitingRoomList_s: WaitingRoomParticipant[];
    waitingRoomCounter_s: number;
    reRender: boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateParameters(): void;
    handleModalClose(): void;
    handleFilterChange(event: Event): void;
    handleItemPress(participant: WaitingRoomParticipant, type: boolean): void;
    get modalContainerStyle(): {
        position: string;
        top: string;
        left: string;
        width: string;
        height: string;
        backgroundColor: string;
        display: string;
        zIndex: string;
    };
    get modalContentStyle(): {
        position: string;
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowY: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    get inputStyle(): {
        width: string;
        padding: string;
        borderRadius: string;
        border: string;
        fontSize: string;
        marginBottom: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<WaitingRoomModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaitingRoomModal, "app-waiting-room-modal", never, { "isWaitingModalVisible": { "alias": "isWaitingModalVisible"; "required": false; }; "waitingRoomCounter": { "alias": "waitingRoomCounter"; "required": false; }; "waitingRoomList": { "alias": "waitingRoomList"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "onWaitingRoomClose": { "alias": "onWaitingRoomClose"; "required": false; }; "onWaitingRoomFilterChange": { "alias": "onWaitingRoomFilterChange"; "required": false; }; "updateWaitingList": { "alias": "updateWaitingList"; "required": false; }; "onWaitingRoomItemPress": { "alias": "onWaitingRoomItemPress"; "required": false; }; }, {}, never, never, true, never>;
}
