import { Socket } from 'socket.io-client';
import { Device, Transport } from 'mediasoup-client/lib/types';
import { ConnectSendTransportParameters, ConnectSendTransportType } from '../@types/types';
import * as i0 from "@angular/core";
export interface CreateSendTransportParameters extends ConnectSendTransportParameters {
    islevel: string;
    member: string;
    socket: Socket;
    device: Device | null;
    transportCreated: boolean;
    producerTransport: Transport | null;
    updateProducerTransport: (producerTransport: Transport | null) => void;
    updateTransportCreated: (transportCreated: boolean) => void;
    connectSendTransport: ConnectSendTransportType;
    getUpdatedAllParams: () => CreateSendTransportParameters;
    [key: string]: any;
}
export interface CreateSendTransportOptions {
    option: 'audio' | 'video' | 'screen' | 'all';
    parameters: CreateSendTransportParameters;
}
export type CreateSendTransportType = (options: CreateSendTransportOptions) => Promise<void>;
export declare class CreateSendTransport {
    /**
     * Creates a WebRTC send transport and sets up event handlers for the transport.
     *
     * @param {CreateSendTransportOptions} options - The options for creating the send transport.
     * @param {Object} options.option - Additional options for the transport creation.
     * @param {Object} options.parameters - The parameters required for creating the transport.
     * @param {boolean} options.parameters.islevel - Indicates the level of the transport.
     * @param {string} options.parameters.member - The member name associated with the transport.
     * @param {Socket} options.parameters.socket - The socket instance for communication.
     * @param {Device} options.parameters.device - The WebRTC device instance.
     * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is created.
     * @param {Transport} options.parameters.producerTransport - The producer transport instance.
     * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
     * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
     * @param {Function} options.parameters.connectSendTransport - Function to connect the send transport.
     * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
     *
     * @throws Will throw an error if there is an issue creating the send transport.
     */
    createSendTransport({ option, parameters }: CreateSendTransportOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateSendTransport, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CreateSendTransport>;
}
