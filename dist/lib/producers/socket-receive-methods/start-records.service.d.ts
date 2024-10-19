import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface StartRecordsOptions {
    roomName: string;
    member: string;
    socket: Socket;
}
export type StartRecordsType = (options: StartRecordsOptions) => Promise<void>;
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
