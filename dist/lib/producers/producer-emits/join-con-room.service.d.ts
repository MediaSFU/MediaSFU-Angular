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
/**
 * Joins a conference room with the provided options and performs validation checks.
 *
 * @param {JoinConRoomOptions} options - Contains:
 *   - socket: Socket instance for communication.
 *   - roomName: Name of the room to join.
 *   - islevel: User level within the room.
 *   - member: Member identifier.
 *   - sec: Security token.
 *   - apiUserName: API username for authentication.
 *
 * - **Validation**:
 *   - Checks that `roomName`, `apiUserName`, and `member` are alphanumeric.
 *   - Ensures `roomName` starts with 's' or 'p' and meets length requirements.
 *   - Verifies `sec`, `islevel`, and `apiUserName` comply with length and format expectations.
 *
 * - **Response Handling**:
 *   - Resolves to the server's response data upon a successful join.
 *   - Rejects with specific reasons if the user is banned, suspended, or if the room host is not present.
 *
 * @returns {Promise<JoinConRoomResponse>} Resolves with the join response data, or rejects with error details.
 * @throws {Error} Throws validation errors or issues encountered while joining the room.
 *
 * @example
 * ```typescript
 * const joinOptions = {
 *   socket: mySocket,
 *   roomName: 'sMyRoom',
 *   islevel: '1',
 *   member: 'participant123',
 *   sec: '64-character-long-secret-key-here...',
 *   apiUserName: 'apiUser123',
 * };
 * joinConRoom(joinOptions)
 *   .then(response => console.log('Joined room:', response))
 *   .catch(error => console.error('Failed to join room:', error));
 * ```
 */
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
