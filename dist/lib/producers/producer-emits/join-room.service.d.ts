import { Socket } from 'socket.io-client';
import { ValidateAlphanumeric } from '../../methods/utils/validate-alphanumeric.service';
import * as i0 from "@angular/core";
export interface JoinRoomOptions {
    socket: Socket;
    roomName: string;
    islevel: string;
    member: string;
    sec: string;
    apiUserName: string;
}
export type JoinRoomType = (socket: Socket, roomName: string, islevel: string, member: string, sec: string, apiUserName: string) => Promise<object>;
export declare class JoinRoom {
    private validateAlphanumeric;
    constructor(validateAlphanumeric: ValidateAlphanumeric);
    /**
     * Joins a user to a specified room via a socket connection.
     *
     * @param {Object} options - The options for joining the room.
     * @param {Socket} options.socket - The socket instance to use for communication.
     * @param {string} options.roomName - The name of the room to join.
     * @param {string} options.islevel - The level of the user.
     * @param {string} options.member - The member identifier.
     * @param {string} options.sec - The security token.
     * @param {string} options.apiUserName - The API username of the user.
     *
     * @returns {Promise<object>} A promise that resolves with the data received from the 'joinRoom' event or rejects with a validation error.
     *
     * @throws {Error} Throws an error if the user is banned, suspended, or if the host has not joined the room yet.
     */
    joinRoom({ socket, roomName, islevel, member, sec, apiUserName, }: JoinRoomOptions): Promise<object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JoinRoom, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JoinRoom>;
}
