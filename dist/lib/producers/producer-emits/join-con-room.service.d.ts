import { Socket } from 'socket.io-client';
import { ValidateAlphanumeric } from '../../methods/utils/validate-alphanumeric.service';
import { RtpCapabilities } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface JoinConRoomOptions {
    socket: Socket;
    roomName: string;
    islevel: string;
    member: string;
    sec: string;
    apiUserName: string;
}
export interface JoinConRoomResponse {
    success: boolean;
    rtpCapabilities: RtpCapabilities | null;
    reason?: string;
    banned?: boolean;
    suspended?: boolean;
    noAdmin?: boolean;
    [key: string]: any;
}
export type JoinConRoomType = (options: JoinConRoomOptions) => Promise<JoinConRoomResponse>;
export declare class JoinConRoom {
    private validateAlphanumeric;
    constructor(validateAlphanumeric: ValidateAlphanumeric);
    /**
     * Joins a conference room using the provided options.
     *
     * @param {JoinConRoomOptions} options - The options for joining the conference room.
     * @param {Socket} options.socket - The socket instance to use for communication.
     * @param {string} options.roomName - The name of the room to join.
     * @param {string} options.islevel - The level of the user.
     * @param {string} options.member - The member identifier.
     * @param {string} options.sec - The security token.
     * @param {string} options.apiUserName - The API username.
     * @returns {Promise<JoinConRoomResponse>} A promise that resolves with the response of the join operation.
     *
     * @throws {Error} If any of the required parameters are missing or invalid.
     * @throws {Error} If the user is banned, suspended, or if the host has not joined the room yet.
     */
    joinConRoom({ socket, roomName, islevel, member, sec, apiUserName, }: JoinConRoomOptions): Promise<object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JoinConRoom, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JoinConRoom>;
}
