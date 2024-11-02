import { Socket } from 'socket.io-client';
import { SignalNewConsumerTransportParameters, SignalNewConsumerTransportType } from '../@types/types';
import * as i0 from "@angular/core";
export interface GetPipedProducersAltParameters extends SignalNewConsumerTransportParameters {
    member: string;
    signalNewConsumerTransport: SignalNewConsumerTransportType;
    [key: string]: any;
}
export interface GetPipedProducersAltOptions {
    nsock: Socket;
    islevel: string;
    parameters: GetPipedProducersAltParameters;
}
export type GetPipedProducersAltType = (options: GetPipedProducersAltOptions) => Promise<void>;
/**
 * Retrieves piped producers and signals new consumer transport for each retrieved producer.
 *
 * @param {GetPipedProducersAltOptions} options - The options for retrieving piped producers.
 * @param {Socket} options.nsock - The WebSocket instance used for communication.
 * @param {string} options.islevel - A flag indicating the level of the request.
 * @param {GetPipedProducersAltParameters} options.parameters - Additional parameters for the request.
 * @param {string} options.parameters.member - The member identifier.
 * @param {SignalNewConsumerTransportType} options.parameters.signalNewConsumerTransport - A function to signal new consumer transport.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @throws {Error} If an error occurs during the process of retrieving producers.
 *
 * @example
 * ```typescript
 * const options = {
 *   nsock: socketInstance,
 *   islevel: '2',
 *   parameters: {
 *     member: 'user123',
 *     signalNewConsumerTransport: async ({ nsock, remoteProducerId, islevel, parameters }) => {
 *       // Implementation to signal new consumer transport
 *       console.log(`Signaling new consumer transport for producer: ${remoteProducerId}`);
 *     },
 *   },
 * };
 *
 * const getPipedProducersService = new GetPipedProducersAlt();
 * await getPipedProducersService.getPipedProducersAlt(options);
 * console.log('Piped producers retrieved successfully.');
 * ```
 */
export declare class GetPipedProducersAlt {
    /**
     * Retrieves piped producers and signals new consumer transport for each retrieved producer.
     *
     * @param {Object} options - The options for retrieving piped producers.
     * @param {WebSocket} options.nsock - The WebSocket instance used for communication.
     * @param {boolean} options.islevel - A flag indicating the level of the request.
     * @param {Object} options.parameters - Additional parameters for the request.
     * @param {string} options.parameters.member - The member identifier.
     * @param {Function} options.parameters.signalNewConsumerTransport - A function to signal new consumer transport.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     *
     * @throws {Error} If an error occurs during the process of retrieving producers.
     */
    getPipedProducersAlt({ nsock, islevel, parameters, }: GetPipedProducersAltOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetPipedProducersAlt, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GetPipedProducersAlt>;
}
