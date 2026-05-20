import { Socket } from 'socket.io-client';
import { Participant, ShowAlert } from '../../@types/types';
import { PermissionLevel } from './update-participant-permission.service';
import * as i0 from "@angular/core";
export interface BulkUpdateParticipantPermissionsOptions {
    socket: Socket;
    participants: Participant[];
    newLevel: PermissionLevel;
    member: string;
    islevel: string;
    roomName: string;
    showAlert?: ShowAlert;
    maxBatchSize?: number;
}
export type BulkUpdateParticipantPermissionsType = (options: BulkUpdateParticipantPermissionsOptions) => Promise<void>;
export declare class BulkUpdateParticipantPermissions {
    bulkUpdateParticipantPermissions(options: BulkUpdateParticipantPermissionsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BulkUpdateParticipantPermissions, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BulkUpdateParticipantPermissions>;
}
