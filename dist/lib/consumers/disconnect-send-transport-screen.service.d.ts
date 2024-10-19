import { Producer } from 'mediasoup-client/lib/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface DisconnectSendTransportScreenParameters {
    screenProducer: Producer | null;
    socket: Socket;
    roomName: string;
    updateScreenProducer: (screenProducer: Producer | null) => void;
    getUpdatedAllParams: () => DisconnectSendTransportScreenParameters;
    [key: string]: any;
}
export interface DisconnectSendTransportScreenOptions {
    parameters: DisconnectSendTransportScreenParameters;
}
export type DisconnectSendTransportScreenType = (options: DisconnectSendTransportScreenOptions) => Promise<void>;
export declare class DisconnectSendTransportScreen {
    /**
     * Disconnects the send transport for screen sharing.
     *
     * This function closes the screen producer, updates the state, and notifies the server
     * about the closure and pausing of screen sharing.
     *
     * @param {DisconnectSendTransportScreenOptions} options - The options for disconnecting the send transport.
     * @param {Object} options.parameters - The parameters required for disconnection.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {Object} options.parameters.screenProducer - The screen producer to be closed.
     * @param {Object} options.parameters.socket - The socket connection to notify the server.
     * @param {string} options.parameters.roomName - The name of the room.
     * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer state.
     * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
     * @throws {Error} If an error occurs during the disconnection process.
     */
    disconnectSendTransportScreen({ parameters, }: DisconnectSendTransportScreenOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisconnectSendTransportScreen, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisconnectSendTransportScreen>;
}
