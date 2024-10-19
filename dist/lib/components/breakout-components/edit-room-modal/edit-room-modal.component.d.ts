import { EventEmitter, OnInit } from '@angular/core';
import { BreakoutParticipant, Participant } from '../../../@types/types';
import * as i0 from "@angular/core";
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
