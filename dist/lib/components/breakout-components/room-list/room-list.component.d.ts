import { EventEmitter } from '@angular/core';
import { BreakoutParticipant, Participant } from '../../../@types/types';
import * as i0 from "@angular/core";
export declare class RoomListComponent {
    rooms: BreakoutParticipant[][];
    editRoom: EventEmitter<number>;
    deleteRoom: EventEmitter<number>;
    removeParticipant: EventEmitter<{
        roomIndex: number;
        participant: BreakoutParticipant | Participant;
    }>;
    faPen: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faUsers: import("@fortawesome/fontawesome-common-types").IconDefinition;
    handleEditRoom(roomIndex: number): void;
    handleDeleteRoom(roomIndex: number): void;
    handleRemoveParticipant(roomIndex: number, participant: BreakoutParticipant | Participant): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoomListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RoomListComponent, "app-room-list", never, { "rooms": { "alias": "rooms"; "required": false; }; }, { "editRoom": "editRoom"; "deleteRoom": "deleteRoom"; "removeParticipant": "removeParticipant"; }, never, never, true, never>;
}
