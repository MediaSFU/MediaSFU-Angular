import { Producer } from 'mediasoup-client/lib/types';
import { Socket } from 'socket.io-client';
import { ReorderStreamsType, ReorderStreamsParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface DisconnectSendTransportVideoParameters extends ReorderStreamsParameters {
    videoProducer: Producer | null;
    socket: Socket;
    islevel: string;
    roomName: string;
    lock_screen: boolean;
    updateMainWindow: boolean;
    updateUpdateMainWindow: (state: boolean) => void;
    updateVideoProducer: (producer: Producer | null) => void;
    reorderStreams: ReorderStreamsType;
    [key: string]: any;
}
export interface DisconnectSendTransportVideoOptions {
    parameters: DisconnectSendTransportVideoParameters;
}
export type DisconnectSendTransportVideoType = (options: DisconnectSendTransportVideoOptions) => Promise<void>;
export declare class DisconnectSendTransportVideo {
    /**
     * Disconnects the send transport for video, closes the video producer, and updates the state.
     *
     * @param {DisconnectSendTransportVideoOptions} parameters - The parameters required for disconnecting the send transport.
     * @param {Producer} parameters.videoProducer - The video producer to be closed.
     * @param {Socket} parameters.socket - The socket instance for communication.
     * @param {string} parameters.islevel - The participant's level.
     * @param {string} parameters.roomName - The name of the room.
     * @param {boolean} parameters.updateMainWindow - Flag to update the main window.
     * @param {boolean} parameters.lock_screen - Flag indicating if the screen is locked.
     * @param {Function} parameters.updateUpdateMainWindow - Function to update the main window state.
     * @param {Function} parameters.updateVideoProducer - Function to update the video producer state.
     * @param {Function} parameters.reorderStreams - Function to reorder streams.
     *
     * @returns {Promise<void>} - A promise that resolves when the disconnection process is complete.
     *
     * @throws {Error} - Throws an error if the disconnection process fails.
     */
    disconnectSendTransportVideo({ parameters, }: DisconnectSendTransportVideoOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisconnectSendTransportVideo, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisconnectSendTransportVideo>;
}
