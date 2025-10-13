import { SignalNewConsumerTransport } from '../signal-new-consumer-transport.service';
import { Socket } from 'socket.io-client';
import { ReorderStreamsParameters, ReorderStreamsType, SignalNewConsumerTransportParameters, ConnectRecvTransportParameters, ConnectRecvTransportType, ShowAlert } from '../../@types/types';
import { types } from 'mediasoup-client';
import * as i0 from "@angular/core";
type Device = types.Device;
export interface NewPipeProducerParameters extends ReorderStreamsParameters, SignalNewConsumerTransportParameters, ConnectRecvTransportParameters {
    first_round: boolean;
    shareScreenStarted: boolean;
    shared: boolean;
    landScaped: boolean;
    showAlert?: ShowAlert;
    isWideScreen: boolean;
    updateFirst_round: (firstRound: boolean) => void;
    updateLandScaped: (landScaped: boolean) => void;
    device: Device | null;
    consumingTransports: string[];
    lock_screen: boolean;
    updateConsumingTransports: (transports: string[]) => void;
    connectRecvTransport: ConnectRecvTransportType;
    reorderStreams: ReorderStreamsType;
    getUpdatedAllParams: () => NewPipeProducerParameters;
    [key: string]: any;
}
export interface NewPipeProducerOptions {
    producerId: string;
    islevel: string;
    nsock: Socket;
    parameters: NewPipeProducerParameters;
}
export type NewPipeProducerType = (options: NewPipeProducerOptions) => Promise<void>;
/**
 * @service NewPipeProducer
 * @description Service to manage new pipe producer events, update state, and handle screen orientation for optimal experience.
 *
 * @method newPipeProducer
 * Handles the setup of a new pipe producer and manages user notifications or orientation changes as needed.
 *
 * @param {NewPipeProducerOptions} options - Options for setting up a new pipe producer.
 * @param {string} options.producerId - Unique ID for the new producer.
 * @param {string} options.islevel - Level designation for the producer.
 * @param {Socket} options.nsock - The socket used for communication.
 * @param {NewPipeProducerParameters} options.parameters - Parameters to configure the new pipe producer.
 *
 * @returns {Promise<void>} A promise that completes when the new pipe producer is set up.
 *
 * @example
 * ```typescript
 * await newPipeProducerService.newPipeProducer({
 *   producerId: 'producer123',
 *   islevel: '2',
 *   nsock: mySocket,
 *   parameters: {
 *     first_round: true,
 *     shareScreenStarted: false,
 *     shared: false,
 *     landScaped: false,
 *     showAlert: alertFunction,
 *     isWideScreen: true,
 *     updateFirst_round: updateFirstRoundFunction,
 *     updateLandScaped: updateLandScapedFunction,
 *     device: myDevice,
 *     consumingTransports: [],
 *     connectRecvTransport: connectRecvTransportFunction,
 *     reorderStreams: reorderStreamsFunction,
 *     getUpdatedAllParams: getUpdatedParamsFunction,
 *   }
 * });
 * ```
 */
export declare class NewPipeProducer {
    private signalNewConsumerTransportService;
    constructor(signalNewConsumerTransportService: SignalNewConsumerTransport);
    /**
     * Handles new pipe producer events and updates relevant states.
     * @param {Object} options - The options object containing necessary variables.
     * @param {string} options.producerId - The ID of the producer.
     * @param {string} options.islevel - The level of the producer.
     * @param {any} options.nsock - The socket object.
     * @param {any} options.parameters - Additional parameters required for the function.
     * @returns {Promise<void>}
     */
    newPipeProducer: ({ producerId, islevel, nsock, parameters, }: NewPipeProducerOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NewPipeProducer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NewPipeProducer>;
}
export {};
