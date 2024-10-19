import { Socket } from 'socket.io-client';
import { SignalNewConsumerTransportParameters, SignalNewConsumerTransportType } from '../@types/types';
import * as i0 from "@angular/core";
export interface GetProducersPipedParameters extends SignalNewConsumerTransportParameters {
    member: string;
    signalNewConsumerTransport: SignalNewConsumerTransportType;
    [key: string]: any;
}
export interface GetProducersPipedOptions {
    nsock: Socket;
    islevel: string;
    parameters: GetProducersPipedParameters;
}
export type GetProducersPipedType = (options: GetProducersPipedOptions) => Promise<void>;
export declare class GetProducersPiped {
    /**
     * Retrieves piped producers and signals new consumer transport for each retrieved producer.
     *
     * @param {Object} options - The options for getting piped producers.
     * @param {WebSocket} options.nsock - The WebSocket instance used for communication.
     * @param {boolean} options.islevel - A flag indicating the level of the operation.
     * @param {Object} options.parameters - Additional parameters for the operation.
     * @param {string} options.parameters.member - The member identifier.
     * @param {Function} options.parameters.signalNewConsumerTransport - The function to signal new consumer transport.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     *
     * @throws {Error} If an error occurs during the process of retrieving producers.
     */
    getProducersPiped({ nsock, islevel, parameters }: GetProducersPipedOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetProducersPiped, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GetProducersPiped>;
}
