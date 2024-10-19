import { SignalNewConsumerTransport } from '../signal-new-consumer-transport.service';
import { Socket } from 'socket.io-client';
import { ReorderStreamsParameters, ReorderStreamsType, SignalNewConsumerTransportParameters, ConnectRecvTransportParameters, ConnectRecvTransportType, ShowAlert } from '../../@types/types';
import { Device } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
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
