import { Socket } from 'socket.io-client';
import { Participant, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export type PermissionLevel = '0' | '1' | '2';
export interface UpdateParticipantPermissionOptions {
    socket: Socket;
    participant: Participant;
    newLevel: PermissionLevel;
    member: string;
    islevel: string;
    roomName: string;
    showAlert?: ShowAlert;
}
export type UpdateParticipantPermissionType = (options: UpdateParticipantPermissionOptions) => Promise<void>;
export declare class UpdateParticipantPermission {
    updateParticipantPermission(options: UpdateParticipantPermissionOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateParticipantPermission, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateParticipantPermission>;
}
