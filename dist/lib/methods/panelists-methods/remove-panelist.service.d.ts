import { Socket } from 'socket.io-client';
import { Participant, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface RemovePanelistOptions {
    socket: Socket;
    participant: Participant;
    roomName: string;
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
}
export type RemovePanelistType = (options: RemovePanelistOptions) => Promise<void>;
export declare class RemovePanelist {
    removePanelist(options: RemovePanelistOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RemovePanelist, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RemovePanelist>;
}
