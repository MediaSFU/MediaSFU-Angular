import { OnChanges, SimpleChanges, ElementRef, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Participant, ShowAlert, BreakoutParticipant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface BreakoutRoomsModalParameters {
    participants: Participant[];
    showAlert?: ShowAlert;
    socket: Socket;
    itemPageLimit: number;
    meetingDisplayType: string;
    prevMeetingDisplayType: string;
    roomName: string;
    shareScreenStarted: boolean;
    shared: boolean;
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    isBreakoutRoomsModalVisible: boolean;
    currentRoomIndex: number | null;
    canStartBreakout: boolean;
    breakoutRooms: BreakoutParticipant[][];
    updateBreakOutRoomStarted: (started: boolean) => void;
    updateBreakOutRoomEnded: (ended: boolean) => void;
    updateCurrentRoomIndex: (roomIndex: number) => void;
    updateCanStartBreakout: (canStart: boolean) => void;
    updateBreakoutRooms: (breakoutRooms: BreakoutParticipant[][]) => void;
    updateMeetingDisplayType: (displayType: string) => void;
    getUpdatedAllParams: () => BreakoutRoomsModalParameters;
    [key: string]: any;
}
export type BreakoutRoomsModalType = (options: BreakoutRoomsModalOptions) => HTMLElement;
export interface BreakoutRoomsModalOptions {
    isVisible: boolean;
    parameters: BreakoutRoomsModalParameters;
    position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
    backgroundColor?: string;
    onBreakoutRoomsClose: () => void;
}
/**
 * BreakoutRoomsModal component manages the creation, modification, and assignment of breakout rooms.
 *
 * @selector app-breakout-rooms-modal
 * @inputs
 * - `isVisible` (boolean): Controls the visibility of the breakout rooms modal. Default is false.
 * - `parameters` (BreakoutRoomsModalParameters): Parameters for managing breakout room settings and behavior.
 * - `position` (string): Position of the modal on the screen. Default is 'topRight'.
 * - `backgroundColor` (string): Background color of the modal. Default is '#83c0e9'.
 * - `onBreakoutRoomsClose` (function): Callback function triggered when the modal is closed.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook to initialize modal width and breakout rooms.
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook called when any data-bound input properties change.
 * - `calculateModalWidth()`: Dynamically calculates and sets modal width based on screen width.
 * - `modalContainerStyle()`: Returns style object for modal container.
 * - `modalContentStyle()`: Returns style object for modal content.
 * - `initializeBreakoutRooms()`: Initializes the breakout rooms based on the current participants and parameters.
 * - `handleRandomAssign()`: Randomly assigns participants to breakout rooms.
 * - `handleManualAssign()`: Initializes manual room assignment by setting empty breakout rooms.
 * - `handleAddRoom()`: Adds a new breakout room.
 * - `handleSaveRooms()`: Validates and saves breakout room configurations.
 * - `validateRooms()`: Validates room configurations and participants' uniqueness and quantity.
 * - `checkCanStartBreakout()`: Checks conditions to enable the start of breakout rooms.
 * - `handleStartBreakout()`: Starts the breakout session if conditions are met.
 * - `handleStopBreakout()`: Stops the breakout session and reverts to the initial meeting display type.
 * - `handleEditRoom(roomIndex: number)`: Opens the modal to edit the specified breakout room.
 * - `handleDeleteRoom(roomIndex: number)`: Deletes a breakout room and updates participants' room assignments.
 * - `handleAddParticipant(event)`: Adds a participant to a specified breakout room.
 * - `handleRemoveParticipant(event)`: Removes a participant from a specified breakout room.
 *
 * @dependencies
 * - `CommonModule`: Angular's common directives.
 * - `FormsModule`: Angular's forms module for form handling.
 * - `FontAwesomeModule`: Font Awesome icons for UI elements.
 * - `RoomListComponent`: Component for listing rooms.
 * - `EditRoomModalComponent`: Component for editing room participants.
 *
 * @example
 * ```html
 * <app-breakout-rooms-modal
 *  [isVisible]="isBreakoutRoomsModalVisible"
 * [parameters]="breakoutRoomsParams"
 * [position]="modalPosition"
 * [backgroundColor]="modalBgColor"
 * [onBreakoutRoomsClose]="onCloseBreakoutRooms">
 * </app-breakout-rooms-modal>
 * ```
 *
 **/
export declare class BreakoutRoomsModal implements OnChanges, OnInit {
    isVisible: boolean;
    parameters: BreakoutRoomsModalParameters;
    position: string;
    backgroundColor: string;
    onBreakoutRoomsClose: () => void;
    roomsContainerRef: ElementRef;
    faDoorOpen: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faRandom: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faHandPointer: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPlus: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSave: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPlay: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSyncAlt: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faStop: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faUsers: import("@fortawesome/fontawesome-common-types").IconDefinition;
    participantsRef: Participant[];
    breakoutRoomsRef: BreakoutParticipant[][];
    numRooms: string;
    newParticipantAction: string;
    currentRoom: BreakoutParticipant[] | null;
    editRoomModalVisible: boolean;
    startBreakoutButtonVisible: boolean;
    stopBreakoutButtonVisible: boolean;
    modalWidth: number;
    calculateModalWidth(): void;
    modalContainerStyle(): {
        display: string;
        position: string;
        top: string;
        left: string;
        width: string;
        height: string;
        backgroundColor: string;
        zIndex: string;
    };
    modalContentStyle(): {
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowX: string;
        overflowY: string;
        position: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    initializeBreakoutRooms: () => void;
    handleRandomAssign(): void;
    handleManualAssign(): void;
    handleAddRoom(): void;
    handleSaveRooms(): void;
    validateRooms(): boolean;
    checkCanStartBreakout: () => void;
    handleStartBreakout: () => void;
    handleStopBreakout(): void;
    handleEditRoom(roomIndex: number): void;
    handleDeleteRoom(roomIndex: number): void;
    handleAddParticipant(event: {
        roomIndex: number;
        participant: BreakoutParticipant;
    }): void;
    handleRemoveParticipant(event: {
        roomIndex: number;
        participant: BreakoutParticipant;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreakoutRoomsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreakoutRoomsModal, "app-breakout-rooms-modal", never, { "isVisible": { "alias": "isVisible"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "onBreakoutRoomsClose": { "alias": "onBreakoutRoomsClose"; "required": false; }; }, {}, never, never, true, never>;
}
