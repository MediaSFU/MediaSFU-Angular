import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface ReInitiateRecordingOptions {
    roomName: string;
    member: string;
    socket: Socket;
    adminRestrictSetting: boolean;
}
export type ReInitiateRecordingType = (options: ReInitiateRecordingOptions) => Promise<void>;
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
