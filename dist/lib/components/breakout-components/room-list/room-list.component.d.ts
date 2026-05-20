import { EventEmitter } from '@angular/core';
import { BreakoutParticipant, Participant } from '../../../@types/types';
import * as i0 from "@angular/core";
export declare class RoomListComponent {
    rooms: BreakoutParticipant[][];
    isDarkMode?: boolean;
    editingRoomIndex: number | null;
    editRoom: EventEmitter<number>;
    deleteRoom: EventEmitter<number>;
    removeParticipant: EventEmitter<{
        roomIndex: number;
        participant: BreakoutParticipant | Participant;
    }>;
    faPen: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faUsers: import("@fortawesome/fontawesome-common-types").IconDefinition;
    get resolvedIsDarkMode(): boolean;
    handleEditRoom(roomIndex: number): void;
    handleDeleteRoom(roomIndex: number): void;
    handleRemoveParticipant(roomIndex: number, participant: BreakoutParticipant | Participant): void;
    isEditingRoom(roomIndex: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoomListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RoomListComponent, "app-room-list", never, { "rooms": { "alias": "rooms"; "required": false; }; "isDarkMode": { "alias": "isDarkMode"; "required": false; }; "editingRoomIndex": { "alias": "editingRoomIndex"; "required": false; }; }, { "editRoom": "editRoom"; "deleteRoom": "deleteRoom"; "removeParticipant": "removeParticipant"; }, never, never, true, never>;
}
