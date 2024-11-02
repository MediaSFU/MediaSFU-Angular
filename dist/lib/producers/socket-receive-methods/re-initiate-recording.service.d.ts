import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface ReInitiateRecordingOptions {
    roomName: string;
    member: string;
    socket: Socket;
    adminRestrictSetting: boolean;
}
export type ReInitiateRecordingType = (options: ReInitiateRecordingOptions) => Promise<void>;
/**
 * Service to re-initiate recording in a specific room, considering administrative restrictions.
 *
 * @class
 * @name ReInitiateRecording
 * @description Attempts to re-initiate recording if administrative restrictions permit.
 *
 * @method
 * reInitiateRecording
 *
 * @param {ReInitiateRecordingOptions} options - Configuration options for re-initiating recording:
 *   - `roomName` {string}: The name of the room to start recording in.
 *   - `member` {string}: The name of the member initiating the recording.
 *   - `socket` {Socket}: The socket instance for server communication.
 *   - `adminRestrictSetting` {boolean}: Flag indicating if the admin restrict setting is active, preventing re-initiation.
 *
 * @returns {Promise<void>} Resolves if recording is successfully re-initiated; otherwise, it throws an error if re-initiation fails.
 *
 * @example
 * const options = {
 *   roomName: 'Room101',
 *   member: 'Alice',
 *   socket: mySocketInstance,
 *   adminRestrictSetting: false
 * };
 * reInitiateRecordingService.reInitiateRecording(options)
 *   .then(() => console.log('Recording re-initiated'))
 *   .catch(error => console.error(error.message));
 */
export declare class ReInitiateRecording {
    /**
     * Re-initiates recording based on specific conditions.
     * @async
     * @function
     * @param {ReInitiateRecordingOptions} options - The options for re-initiating recording.
     * @param {string} options.roomName - The name of the room to re-initiate recording.
     * @param {string} options.member - The member re-initiating the recording.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {boolean} options.adminRestrictSetting - Indicates whether the admin restrict setting is enabled.
     * @returns {Promise<void>} A promise that resolves when the recording is re-initiated.
     */
    reInitiateRecording: ({ roomName, member, socket, adminRestrictSetting, }: ReInitiateRecordingOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReInitiateRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReInitiateRecording>;
}
