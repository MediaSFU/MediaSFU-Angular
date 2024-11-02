import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface StartRecordsOptions {
    roomName: string;
    member: string;
    socket: Socket;
}
export type StartRecordsType = (options: StartRecordsOptions) => Promise<void>;
/**
 * Service to initiate recording for a specified room.
 *
 * @class
 * @name StartRecords
 * @description Sends a request to the server to begin recording a room, using socket communication.
 *
 * @method
 * startRecords
 *
 * @param {StartRecordsOptions} options - Options required to start the recording:
 *   - `roomName` {string}: The name of the room to record.
 *   - `member` {string}: The identifier of the member initiating the recording.
 *   - `socket` {Socket}: The socket instance for server communication.
 *
 * @returns {Promise<void>} Resolves when the server confirms the recording start request.
 *
 * @example
 * const options = {
 *   roomName: 'Room101',
 *   member: 'user123',
 *   socket: io('http://localhost:3000')
 * };
 * startRecordsService.startRecords(options);
 */
export declare class StartRecords {
    /**
     * Starts recording the room.
     *
     * @param {Object} options - The options for starting the recording.
     * @param {string} options.roomName - The name of the room to start recording.
     * @param {string} options.member - The member starting the recording.
     * @param {Socket} options.socket - The socket instance for communication.
     *
     * @returns {Promise<void>} A promise that resolves when the recording is started.
     */
    startRecords: ({ roomName, member, socket }: StartRecordsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StartRecords, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StartRecords>;
}
