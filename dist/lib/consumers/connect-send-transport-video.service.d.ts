import { Device, Producer, ProducerOptions, Transport } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface ConnectSendTransportVideoParameters {
    videoProducer: Producer | null;
    device: Device | null;
    producerTransport: Transport | null;
    islevel: string;
    updateMainWindow: boolean;
    updateVideoProducer: (producer: Producer | null) => void;
    updateProducerTransport: (transport: Transport | null) => void;
    updateUpdateMainWindow: (state: boolean) => void;
    [key: string]: any;
}
export interface ConnectSendTransportVideoOptions {
    videoParams: ProducerOptions;
    parameters: ConnectSendTransportVideoParameters;
}
export type ConnectSendTransportVideoType = (options: ConnectSendTransportVideoOptions) => Promise<void>;
export declare class ConnectSendTransportVideo {
    /**
     * Connects the send transport for video by producing video data and updates the relevant states.
     *
     * @param {ConnectSendTransportVideoOptions} options - The options for connecting the send transport for video.
     * @param {Object} options.videoParams - The parameters for producing video data.
     * @param {Object} options.parameters - The parameters for updating the state.
     * @param {Producer} options.parameters.videoProducer - The video producer instance.
     * @param {Transport} options.parameters.producerTransport - The transport instance used for producing video.
     * @param {string} options.parameters.islevel - The connection level.
     * @param {boolean} options.parameters.updateMainWindow - The state of the main window update.
     * @param {Function} options.parameters.updateVideoProducer - Function to update the video producer.
     * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
     *
     * @returns {Promise<void>} A promise that resolves when the send transport for video is connected.
     *
     * @throws Will throw an error if the connection fails.
     */
    connectSendTransportVideo: ({ videoParams, parameters, }: ConnectSendTransportVideoOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectSendTransportVideo, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConnectSendTransportVideo>;
}
