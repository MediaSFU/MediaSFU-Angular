import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface DisconnectUserSelfOptions {
    member: string;
    roomName: string;
    socket: Socket;
}
export type DisconnectUserSelfType = (options: DisconnectUserSelfOptions) => Promise<void>;
export declare class DisconnectUserSelf {
    /**
     * Disconnects the user from the specified room and bans them.
     *
     * @param {DisconnectUserSelfOptions} options - The options for disconnecting the user.
     * @param {Object} options.member - The member object representing the user to disconnect.
     * @param {string} options.roomName - The name of the room from which the user will be disconnected.
     * @param {Socket} options.socket - The socket instance used to emit the disconnection request.
     * @returns {Promise<void>} A promise that resolves when the disconnection request has been emitted.
     */
    disconnectUserSelf: ({ member, roomName, socket, }: DisconnectUserSelfOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisconnectUserSelf, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisconnectUserSelf>;
}
