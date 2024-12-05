import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface DisconnectUserSelfOptions {
    member: string;
    roomName: string;
    socket: Socket;
    localSocket?: Socket;
}
export type DisconnectUserSelfType = (options: DisconnectUserSelfOptions) => Promise<void>;
/**
 * Service to handle self-disconnection and banning of a user from a room.
 *
 * @class
 * @name DisconnectUserSelf
 * @description This service manages the disconnection of a user from a specified room and initiates a ban on the user.
 *
 * @method
 * disconnectUserSelf
 * @async
 * @param {DisconnectUserSelfOptions} options - The options required to disconnect the user.
 * @param {string} options.member - The identifier of the member to be disconnected.
 * @param {string} options.roomName - The name of the room from which the user will be disconnected.
 * @param {Socket} options.socket - The socket instance used to emit the disconnection and ban request.
 * @param {Socket} [options.localSocket] - The local socket instance used to emit the disconnection request.
 * @returns {Promise<void>} A promise that resolves when the disconnection request is sent to the server.
 *
 * @example
 * const disconnectUserSelfOptions = {
 *   member: 'user123',
 *   roomName: 'room456',
 *   socket: mySocketInstance
 *   localSocket: myLocalSocketInstance
 * };
 * await disconnectUserSelfService.disconnectUserSelf(disconnectUserSelfOptions);
 */
export declare class DisconnectUserSelf {
    /**
     * Disconnects the user from the specified room and bans them.
     *
     * @param {DisconnectUserSelfOptions} options - The options for disconnecting the user.
     * @param {Object} options.member - The member object representing the user to disconnect.
     * @param {string} options.roomName - The name of the room from which the user will be disconnected.
     * @param {Socket} options.socket - The socket instance used to emit the disconnection request.
     * @param {Socket} [options.localSocket] - The local socket instance used to emit the disconnection request.
     * @returns {Promise<void>} A promise that resolves when the disconnection request has been emitted.
     */
    disconnectUserSelf: ({ member, roomName, socket, localSocket, }: DisconnectUserSelfOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisconnectUserSelf, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisconnectUserSelf>;
}
