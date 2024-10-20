import { Socket } from 'socket.io-client';
import { GetPipedProducersAltType, GetPipedProducersAltParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface ReceiveAllPipedTransportsParameters extends GetPipedProducersAltParameters {
    roomName: string;
    member: string;
    getPipedProducersAlt: GetPipedProducersAltType;
    [key: string]: any;
}
export interface ReceiveAllPipedTransportsOptions {
    nsock: Socket;
    parameters: ReceiveAllPipedTransportsParameters;
}
export type ReceiveAllPipedTransportsType = (options: ReceiveAllPipedTransportsOptions) => Promise<void>;
export declare class ReceiveAllPipedTransports {
    /**
     * Receives all piped transports by emitting an event to the server and processing the response.
     *
     * @param {ReceiveAllPipedTransportsOptions} options - The options for receiving all piped transports.
     * @param {any} options.nsock - The socket instance used for communication.
     * @param {Object} options.parameters - The parameters for the operation.
     * @param {string} options.parameters.roomName - The name of the room.
     * @param {string} options.parameters.member - The member identifier.
     * @param {Function} options.parameters.getPipedProducersAlt - The function to get piped producers for a given level.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     *
     * @throws Will log an error message if the operation fails.
     */
    receiveAllPipedTransports: ({ nsock, parameters, }: ReceiveAllPipedTransportsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReceiveAllPipedTransports, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReceiveAllPipedTransports>;
}
