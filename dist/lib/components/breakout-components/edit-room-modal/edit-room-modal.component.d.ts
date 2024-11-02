import { EventEmitter, OnInit } from '@angular/core';
import { BreakoutParticipant, Participant } from '../../../@types/types';
import * as i0 from "@angular/core";
/**
 * EditRoomModalComponent allows managing participants within a breakout room for an event.
 *
 * @selector app-edit-room-modal
 * @inputs
 * - `editRoomModalVisible` (boolean): Controls the visibility of the edit room modal. Default is false.
 * - `currentRoom` (BreakoutParticipant[]): List of participants currently assigned to the room.
 * - `participantsRef` (Participant[]): Reference list of all participants.
 * - `currentRoomIndex` (number): Index of the room being edited.
 * - `position` (string): Position of the modal on the screen. Default is 'center'.
 * - `backgroundColor` (string): Background color of the modal. Default is '#fff'.
 *
 * @outputs
 * - `setEditRoomModalVisible` (EventEmitter<boolean>): Emits a boolean to toggle the visibility of the modal.
 * - `addParticipant` (EventEmitter<{ roomIndex: number; participant: Participant | BreakoutParticipant; }>): Emits data for adding a participant to the room.
 * - `removeParticipant` (EventEmitter<{ roomIndex: number; participant: Participant | BreakoutParticipant; }>): Emits data for removing a participant from the room.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook to initialize modal width and attach resize event listener.
 * - `ngOnDestroy()`: Lifecycle hook to remove the resize event listener.
 * - `calculateModalWidth()`: Dynamically calculates and sets modal width based on screen width.
 * - `modalContainerStyle()`: Returns style object for modal container.
 * - `modalContentStyle()`: Returns style object for modal content.
 * - `handleAddParticipant(roomIndex: number, participant: BreakoutParticipant)`: Emits event to add participant to specified room.
 * - `handleRemoveParticipant(roomIndex: number, participant: BreakoutParticipant)`: Emits event to remove participant from specified room.
 * - `closeModal()`: Closes the modal by emitting a visibility change.
 * - `unassignedParticipants()`: Filters and returns a list of unassigned participants.
 *
 * @dependencies
 * - `CommonModule`: Provides Angular's common directives.
 * - `FontAwesomeModule`: Allows usage of Font Awesome icons.
 *
 * @example
 * ```html
 * <app-edit-room-modal
 *  [editRoomModalVisible]="editRoomModalVisible"
 * [currentRoom]="currentRoom"
 * [participantsRef]="participantsRef"
 * [currentRoomIndex]="currentRoomIndex"
 * [position]="position"
 * [backgroundColor]="backgroundColor"
 * (setEditRoomModalVisible)="setEditRoomModalVisible($event)"
 * (addParticipant)="addParticipant($event)"
 * (removeParticipant)="removeParticipant($event)">
 * </app-edit-room-modal>
 * ```
 *
 **/
export declare class EditRoomModalComponent implements OnInit {
    editRoomModalVisible: boolean;
    currentRoom: BreakoutParticipant[];
    participantsRef: Participant[];
    currentRoomIndex: number;
    position: string;
    backgroundColor: string;
    setEditRoomModalVisible: EventEmitter<boolean>;
    addParticipant: EventEmitter<{
        roomIndex: number;
        participant: Participant | BreakoutParticipant;
    }>;
    removeParticipant: EventEmitter<{
        roomIndex: number;
        participant: Participant | BreakoutParticipant;
    }>;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPlus: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faUsers: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPen: import("@fortawesome/fontawesome-common-types").IconDefinition;
    modalWidth: number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    calculateModalWidth(): void;
    modalContainerStyle(): {
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        zIndex: number;
        display: string;
        justifyContent: string;
        alignItems: string;
    };
    modalContentStyle(): {
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowY: string;
    };
    handleAddParticipant(roomIndex: number, participant: BreakoutParticipant): void;
    handleRemoveParticipant(roomIndex: number, participant: BreakoutParticipant): void;
    closeModal(): void;
    unassignedParticipants(): Participant[];
    static ɵfac: i0.ɵɵFactoryDeclaration<EditRoomModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EditRoomModalComponent, "app-edit-room-modal", never, { "editRoomModalVisible": { "alias": "editRoomModalVisible"; "required": false; }; "currentRoom": { "alias": "currentRoom"; "required": false; }; "participantsRef": { "alias": "participantsRef"; "required": false; }; "currentRoomIndex": { "alias": "currentRoomIndex"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; }, { "setEditRoomModalVisible": "setEditRoomModalVisible"; "addParticipant": "addParticipant"; "removeParticipant": "removeParticipant"; }, never, never, true, never>;
}
