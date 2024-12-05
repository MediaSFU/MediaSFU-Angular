import { Socket } from 'socket.io-client';
import { Device, Transport } from 'mediasoup-client/lib/types';
import { ConnectSendTransportParameters, ConnectSendTransportType } from '../@types/types';
import * as i0 from "@angular/core";
export interface CreateSendTransportParameters extends ConnectSendTransportParameters {
    islevel: string;
    member: string;
    socket: Socket;
    localSocket?: Socket;
    device: Device | null;
    producerTransport: Transport | null;
    localProducerTransport?: Transport | null;
    transportCreated: boolean;
    localTransportCreated?: boolean;
    updateProducerTransport: (producerTransport: Transport | null) => void;
    updateLocalProducerTransport?: (localTransport: Transport | null) => void;
    updateTransportCreated: (transportCreated: boolean) => void;
    updateLocalTransportCreated?: (localTransportCreated: boolean) => void;
    connectSendTransport: ConnectSendTransportType;
    getUpdatedAllParams: () => CreateSendTransportParameters;
    [key: string]: any;
}
export interface CreateSendTransportOptions {
    option: "audio" | "video" | "screen" | "all";
    parameters: CreateSendTransportParameters;
}
export type CreateSendTransportType = (options: CreateSendTransportOptions) => Promise<void>;
/**
 * Creates a WebRTC send transport and sets up event handlers for the transport.
 * Supports both primary and local transports with modular handling.
 * @param {CreateSendTransportOptions} options - The options for creating the send transport.
 * @param {string} options.option - The type of transport to create.
 * @param {CreateSendTransportParameters} options.parameters - The parameters required for creating the transport.
 * @param {string} options.parameters.islevel - The level of the transport.
 * @param {string} options.parameters.member - The member name for the transport.
 * @param {Socket} options.parameters.socket - The primary socket instance.
 * @param {Device} options.parameters.device - The device instance.
 * @param {Transport | null} options.parameters.producerTransport - The primary producer transport object.
 * @param {boolean} options.parameters.transportCreated - The state of the primary transport creation.
 * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the primary transport object.
 * @param {(state: boolean) => void} options.parameters.updateTransportCreated - The function to update the primary transport creation state.
 * @param {Function} options.parameters.connectSendTransport - The function to connect the send transport.
 * @param {Function} options.parameters.getUpdatedAllParams - The function to get updated parameters.
 * @param {Socket} [options.parameters.localSocket] - The local socket instance.
 * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport object.
 * @param {boolean} [options.parameters.localTransportCreated] - The state of the local transport creation.
 * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local transport object.
 * @param {(state: boolean) => void} [options.parameters.updateLocalTransportCreated] - The function to update the local transport creation state.
 * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
 * @throws Will throw an error if there is an issue creating the send transport.
 * @example
 * const options = {
 *  option: 'video',
 * parameters: {
 * islevel: '1',
 * member: 'John Doe',
 * socket: socketInstance,
 * localSocket: localSocketInstance,
 * device: deviceInstance,
 * producerTransport: null,
 * localProducerTransport: null,
 * transportCreated: false,
 * localTransportCreated: false,
 * updateProducerTransport: (transport) => console.log('Primary transport updated:', transport),
 * updateLocalProducerTransport: (transport) => console.log('Local transport updated:', transport),
 * updateTransportCreated: (state) => console.log('Primary transport created:', state),
 * updateLocalTransportCreated: (state) => console.log('Local transport created:', state),
 * },
 * };
 * createSendTransport(options)
 * .then(() => console.log('Send transport created successfully'))
 * .catch((error) => console.error('Error creating send transport:', error));
 *
 */
export declare const createLocalSendTransport: ({ option, parameters, }: CreateSendTransportOptions) => Promise<void>;
/**
 * Creates a WebRTC send transport and sets up event handlers for the transport.
 *
 * Supports both primary and local transports with modular handling.
 *
 * @param {CreateSendTransportOptions} options - The options for creating the send transport.
 * @param {string} options.option - The type of transport to create.
 * @param {CreateSendTransportParameters} options.parameters - The parameters required for creating the transport.
 * @param {string} options.parameters.islevel - The level of the transport.
 * @param {string} options.parameters.member - The member name for the transport.
 * @param {Socket} options.parameters.socket - The primary socket instance.
 * @param {Device} options.parameters.device - The device instance.
 * @param {Transport | null} options.parameters.producerTransport - The primary producer transport object.
 * @param {boolean} options.parameters.transportCreated - The state of the primary transport creation.
 * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the primary transport object.
 * @param {(state: boolean) => void} options.parameters.updateTransportCreated - The function to update the primary transport creation state.
 * @param {Function} options.parameters.connectSendTransport - The function to connect the send transport.
 * @param {Function} options.parameters.getUpdatedAllParams - The function to get updated parameters.
 * @param {Socket} [options.parameters.localSocket] - The local socket instance.
 * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport object.
 * @param {boolean} [options.parameters.localTransportCreated] - The state of the local transport creation.
 * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local transport object.
 * @param {(state: boolean) => void} [options.parameters.updateLocalTransportCreated] - The function to update the local transport creation state.
 * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
 *
 * @throws Will throw an error if there is an issue creating the send transport.
 *
 * @example
 * const options = {
 *   option: 'video',
 *   parameters: {
 *     islevel: '1',
 *     member: 'John Doe',
 *     socket: socketInstance,
 *     localSocket: localSocketInstance,
 *     device: deviceInstance,
 *     producerTransport: null,
 *     localProducerTransport: null,
 *     transportCreated: false,
 *     localTransportCreated: false,
 *     updateProducerTransport: (transport) => console.log('Primary transport updated:', transport),
 *     updateLocalProducerTransport: (transport) => console.log('Local transport updated:', transport),
 *     updateTransportCreated: (state) => console.log('Primary transport created:', state),
 *     updateLocalTransportCreated: (state) => console.log('Local transport created:', state),
 *   },
 * };
 *
 * createSendTransport(options)
 *   .then(() => console.log('Send transport created successfully'))
 *   .catch((error) => console.error('Error creating send transport:', error));
 */
export declare class CreateSendTransport {
    /**
     * Creates a WebRTC send transport and sets up event handlers for the transport.
     *
     * Supports both primary and local transports with modular handling.
     *
     * @param {CreateSendTransportOptions} options - The options for creating the send transport.
     * @param {string} options.option - The type of transport to create.
     * @param {CreateSendTransportParameters} options.parameters - The parameters required for creating the transport.
     * @param {string} options.parameters.islevel - The level of the transport.
     * @param {string} options.parameters.member - The member name for the transport.
     * @param {Socket} options.parameters.socket - The primary socket instance.
     * @param {Device} options.parameters.device - The device instance.
     * @param {Transport | null} options.parameters.producerTransport - The primary producer transport object.
     * @param {boolean} options.parameters.transportCreated - The state of the primary transport creation.
     * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the primary transport object.
     * @param {(state: boolean) => void} options.parameters.updateTransportCreated - The function to update the primary transport creation state.
     * @param {Function} options.parameters.connectSendTransport - The function to connect the send transport.
     * @param {Function} options.parameters.getUpdatedAllParams - The function to get updated parameters.
     * @param {Socket} [options.parameters.localSocket] - The local socket instance.
     * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport object.
     * @param {boolean} [options.parameters.localTransportCreated] - The state of the local transport creation.
     * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local transport object.
     * @param {(state: boolean) => void} [options.parameters.updateLocalTransportCreated] - The function to update the local transport creation state.
     * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
     *
     * @throws Will throw an error if there is an issue creating the send transport.
     *
     * @example
     * const options = {
     *   option: 'video',
     *   parameters: {
     *     islevel: '1',
     *     member: 'John Doe',
     *     socket: socketInstance,
     *     localSocket: localSocketInstance,
     *     device: deviceInstance,
     *     producerTransport: null,
     *     localProducerTransport: null,
     *     transportCreated: false,
     *     localTransportCreated: false,
     *     updateProducerTransport: (transport) => console.log('Primary transport updated:', transport),
     *     updateLocalProducerTransport: (transport) => console.log('Local transport updated:', transport),
     *     updateTransportCreated: (state) => console.log('Primary transport created:', state),
     *     updateLocalTransportCreated: (state) => console.log('Local transport created:', state),
     *   },
     * };
     *
     * createSendTransport(options)
     *   .then(() => console.log('Send transport created successfully'))
     *   .catch((error) => console.error('Error creating send transport:', error));
     */
    createSendTransport({ option, parameters }: CreateSendTransportOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateSendTransport, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CreateSendTransport>;
}
