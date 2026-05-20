import { Socket } from 'socket.io-client';
import { Participant, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface AddPanelistOptions {
    socket: Socket;
    participant: Participant;
    currentPanelists: Participant[];
    maxPanelists: number;
    roomName: string;
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
}
export type AddPanelistType = (options: AddPanelistOptions) => Promise<boolean>;
export declare class AddPanelist {
    addPanelist(options: AddPanelistOptions): Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddPanelist, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddPanelist>;
}
