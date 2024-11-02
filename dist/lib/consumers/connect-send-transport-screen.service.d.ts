import { Transport, Producer, Device, ProducerOptions } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface ConnectSendTransportScreenParameters {
    screenProducer: Producer | null;
    device: Device | null;
    screenParams: ProducerOptions;
    producerTransport: Transport | null;
    params: ProducerOptions;
    updateScreenProducer: (producer: Producer | null) => void;
    updateProducerTransport: (transport: Transport | null) => void;
    getUpdatedAllParams: () => ConnectSendTransportScreenParameters;
    [key: string]: any;
}
export interface ConnectSendTransportScreenOptions {
    stream: MediaStream | null;
    parameters: ConnectSendTransportScreenParameters;
}
export type ConnectSendTransportScreenType = (options: ConnectSendTransportScreenOptions) => Promise<void>;
/**
 * Connects and sets up the screen sharing transport for sending video streams.
 *
 * @param {ConnectSendTransportScreenOptions} options - The options for connecting the screen transport.
 * @param {MediaStream} options.stream - The media stream containing the screen video track.
 * @param {ConnectSendTransportScreenParameters} options.parameters - The parameters required for setting up the transport.
 * @param {Producer} options.parameters.screenProducer - The screen producer object.
 * @param {Device} options.parameters.device - The device object containing RTP capabilities.
 * @param {ProducerOptions} options.parameters.screenParams - The parameters for producing the screen share.
 * @param {Transport} options.parameters.producerTransport - The transport object used for producing the screen share.
 * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer object.
 * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport object.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to fetch updated device information.
 *
 * @returns {Promise<void>} A promise that resolves when the screen transport is successfully connected and set up.
 *
 * @throws Will throw an error if the connection or setup process fails.
 *
 * @example
 * ```typescript
 * const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
 * const parameters = {
 *   screenProducer: null,
 *   device: device, // Assume 'device' is initialized and ready
 *   screenParams: { codec: 'vp9' },
 *   producerTransport: transport, // Assume 'transport' is initialized
 *   updateScreenProducer: (producer) => { console.log(updated) },
 *   updateProducerTransport: (transport) => { console.log(updated) },
 *   getUpdatedAllParams: () => {  },
 * };
 *
 * connectSendTransportScreen({ stream, parameters })
 *   .then(() => {
 *     console.log('Screen transport connected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error connecting screen transport:', error);
 *   });
 * ```
 */
export declare class ConnectSendTransportScreen {
    /**
     * Connects and sets up the screen sharing transport for sending video streams.
     *
     * @param {Object} options - The options for connecting the screen transport.
     * @param {MediaStream} options.stream - The media stream containing the screen video track.
     * @param {ConnectSendTransportScreenOptions} options.parameters - The parameters required for setting up the transport.
     * @param {Producer} options.parameters.screenProducer - The screen producer object.
     * @param {Device} options.parameters.device - The device object containing RTP capabilities.
     * @param {Promise<ScreenParams>} options.parameters.screenParams - A promise resolving to screen share parameters.
     * @param {Transport} options.parameters.producerTransport - The transport object used for producing the screen share.
     * @param {Params} options.parameters.params - The parameters for producing the screen share.
     * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer object.
     * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport object.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to fetch updated device information.
     *
     * @returns {Promise<void>} A promise that resolves when the screen transport is successfully connected and set up.
     *
     * @throws Will throw an error if the connection or setup process fails.
     */
    connectSendTransportScreen({ stream, parameters, }: ConnectSendTransportScreenOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectSendTransportScreen, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConnectSendTransportScreen>;
}
