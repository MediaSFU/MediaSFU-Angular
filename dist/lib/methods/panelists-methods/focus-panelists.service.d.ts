import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface FocusPanelistsOptions {
    socket: Socket;
    roomName: string;
    member: string;
    islevel: string;
    focusEnabled: boolean;
    muteOthersMic?: boolean;
    muteOthersCamera?: boolean;
    showAlert?: ShowAlert;
}
export type FocusPanelistsType = (options: FocusPanelistsOptions) => Promise<void>;
export declare class FocusPanelists {
    focusPanelists(options: FocusPanelistsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FocusPanelists, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FocusPanelists>;
}
