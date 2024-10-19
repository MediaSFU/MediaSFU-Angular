import { Socket } from 'socket.io-client';
import { ReorderStreamsParameters, ReorderStreamsType, ConnectRecvTransportType, ConnectRecvTransportParameters } from '../@types/types';
import { Device } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface SignalNewConsumerTransportParameters extends ReorderStreamsParameters, ConnectRecvTransportParameters {
    device: Device | null;
    consumingTransports: string[];
    lock_screen: boolean;
    updateConsumingTransports: (transports: string[]) => void;
    connectRecvTransport: ConnectRecvTransportType;
    reorderStreams: ReorderStreamsType;
    getUpdatedAllParams: () => SignalNewConsumerTransportParameters;
    [key: string]: any;
}
export interface SignalNewConsumerTransportOptions {
    remoteProducerId: string;
    islevel: string;
    nsock: Socket;
    parameters: SignalNewConsumerTransportParameters;
}
export type SignalNewConsumerTransportType = (options: SignalNewConsumerTransportOptions) => Promise<string[] | void>;
export declare class SignalNewConsumerTransport {
    /**
     * Signals the creation of a new consumer transport.
     *
     * @param {Object} options - The options for signaling a new consumer transport.
     * @param {string} options.remoteProducerId - The ID of the remote producer.
     * @param {boolean} options.islevel - Indicates the level of the consumer.
     * @param {any} options.nsock - The socket instance for communication.
     * @param {SignalNewConsumerTransportOptions} options.parameters - The parameters for the transport.
     *
     * @returns {Promise<string[] | void>} A promise that resolves to an array of consuming transports or void.
     *
     * @throws Will throw an error if the signaling process fails.
     *
     * @example
     * const options = {
     *   remoteProducerId: 'producer-id',
     *   islevel: true,
     *   nsock: socketInstance,
     *   parameters: {
     *     device: mediaDevice,
     *     consumingTransports: [],
     *     lock_screen: false,
     *     updateConsumingTransports: updateFunction,
     *     connectRecvTransport: connectFunction,
     *     reorderStreams: reorderFunction,
     *     getUpdatedAllParams: getUpdatedParamsFunction,
     *   },
     * };
     *
     * signalNewConsumerTransport(options)
     *   .then(consumingTransports => {
     *     console.log('Consuming Transports:', consumingTransports);
     *   })
     *   .catch(error => {
     *     console.error('Error signaling new consumer transport:', error);
     *   });
     */
    signalNewConsumerTransport: ({ remoteProducerId, islevel, nsock, parameters, }: SignalNewConsumerTransportOptions) => Promise<string[] | void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalNewConsumerTransport, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SignalNewConsumerTransport>;
}
