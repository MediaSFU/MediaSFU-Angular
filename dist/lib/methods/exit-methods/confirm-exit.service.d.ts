import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface ConfirmExitOptions {
    socket: Socket;
    member: string;
    roomName: string;
    ban?: boolean;
}
export type ConfirmExitType = (options: ConfirmExitOptions) => Promise<void>;
export declare class ConfirmExit {
    /**
     * Confirms the exit of a member from a room and optionally bans them.
     *
     * @param {Object} options - The options for confirming the exit.
     * @param {Socket} options.socket - The socket instance to emit the event.
     * @param {string} options.member - The member who is exiting.
     * @param {string} options.roomName - The name of the room the member is exiting from.
     * @param {boolean} [options.ban=false] - Whether to ban the member from the room.
     * @returns {Promise<void>} A promise that resolves when the exit is confirmed.
     */
    confirmExit({ socket, member, roomName, ban }: ConfirmExitOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmExit, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmExit>;
}
