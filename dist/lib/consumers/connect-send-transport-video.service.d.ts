import { types } from 'mediasoup-client';
import * as i0 from "@angular/core";
type Device = types.Device;
type Producer = types.Producer;
type ProducerOptions = types.ProducerOptions;
type Transport = types.Transport;
export interface ConnectSendTransportVideoParameters {
    videoProducer: Producer | null;
    localVideoProducer?: Producer | null;
    device: Device | null;
    producerTransport: Transport | null;
    localProducerTransport?: Transport | null;
    islevel: string;
    updateMainWindow: boolean;
    updateVideoProducer: (producer: Producer | null) => void;
    updateLocalVideoProducer?: (localProducer: Producer | null) => void;
    updateProducerTransport: (transport: Transport | null) => void;
    updateLocalProducerTransport?: (localTransport: Transport | null) => void;
    updateUpdateMainWindow: (state: boolean) => void;
    [key: string]: any;
}
export interface ConnectSendTransportVideoOptions {
    videoParams: ProducerOptions;
    parameters: ConnectSendTransportVideoParameters;
    targetOption?: "all" | "local" | "remote";
}
export type ConnectSendTransportVideoType = (options: ConnectSendTransportVideoOptions) => Promise<void>;
export declare const connectLocalSendTransportVideo: ({ videoParams, parameters, }: ConnectSendTransportVideoOptions) => Promise<void>;
/**
 * Connects the send transport for video by producing video data and updates the relevant states.
 *
 * This function supports both a primary and a local video producer, delegating local handling to a separate function.
 *
 * @param {ConnectSendTransportVideoOptions} options - The options for connecting the send transport for video.
 * @param {ProducerOptions} options.videoParams - The parameters for the video producer.
 * @param {"all" | "local" | "remote"} [options.targetOption] - The target option for the video transport connection.
 * @param {ConnectSendTransportVideoParameters} options.parameters - The parameters for the video transport connection.
 * @param {Producer | null} options.parameters.videoProducer - The primary video producer.
 * @param {Producer | null} [options.parameters.localVideoProducer] - The local video producer.
 * @param {Device | null} options.parameters.device - The device information.
 * @param {Transport | null} options.parameters.producerTransport - The primary producer transport.
 * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport.
 * @param {string} options.parameters.islevel - The connection level for the video transport.
 * @param {boolean} options.parameters.updateMainWindow - The flag to update the main window state.
 * @param {(producer: Producer | null) => void} options.parameters.updateVideoProducer - The function to update the video producer state.
 * @param {(localProducer: Producer | null) => void} [options.parameters.updateLocalVideoProducer] - The function to update the local video producer state.
 * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the producer transport state.
 * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport state.
 * @param {(state: boolean) => void} options.parameters.updateUpdateMainWindow - The function to update the main window state.
 * @param {any} [options.parameters] - Additional parameters for future use.
 * @returns {Promise<void>} A promise that resolves when the send transport for video is connected.
 *
 * @throws Will throw an error if the connection fails.
 *
 * @example
 * const options = {
 *   videoParams: {
 *     // video producer options (e.g., codec, bitrate)
 *   },
 *   targetOption: "all",
 *   parameters: {
 *     videoProducer: null,
 *     localVideoProducer: null,
 *     producerTransport: transport,
 *     localProducerTransport: localTransport,
 *     islevel: '2',
 *     updateMainWindow: false,
 *     updateVideoProducer: (producer) => console.log("Updated producer"),
 *     updateLocalVideoProducer: (localProducer) => console.log("Updated local producer"),
 *     updateProducerTransport: (transport) => console.log("Updated transport"),
 *     updateLocalProducerTransport: (localTransport) => console.log("Updated local transport"),
 *     updateUpdateMainWindow: (state) => console.log("Updated main window:", state),
 *   },
 * };
 *
 * connectSendTransportVideo(options)
 *   .then(() => console.log("Video transport connected successfully"))
 *   .catch((error) => console.error("Error connecting video transport:", error));
 */
export declare class ConnectSendTransportVideo {
    /**
     * Connects the send transport for video by producing video data and updates the relevant states.
     *
     * This function supports both a primary and a local video producer, delegating local handling to a separate function.
     *
     * @param {ConnectSendTransportVideoOptions} options - The options for connecting the send transport for video.
     * @param {ProducerOptions} options.videoParams - The parameters for the video producer.
     * @param {"all" | "local" | "remote"} [options.targetOption] - The target option for the video transport connection.
     * @param {ConnectSendTransportVideoParameters} options.parameters - The parameters for the video transport connection.
     * @param {Producer | null} options.parameters.videoProducer - The primary video producer.
     * @param {Producer | null} [options.parameters.localVideoProducer] - The local video producer.
     * @param {Device | null} options.parameters.device - The device information.
     * @param {Transport | null} options.parameters.producerTransport - The primary producer transport.
     * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport.
     * @param {string} options.parameters.islevel - The connection level for the video transport.
     * @param {boolean} options.parameters.updateMainWindow - The flag to update the main window state.
     * @param {(producer: Producer | null) => void} options.parameters.updateVideoProducer - The function to update the video producer state.
     * @param {(localProducer: Producer | null) => void} [options.parameters.updateLocalVideoProducer] - The function to update the local video producer state.
     * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the producer transport state.
     * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport state.
     * @param {(state: boolean) => void} options.parameters.updateUpdateMainWindow - The function to update the main window state.
     * @param {any} [options.parameters] - Additional parameters for future use.
     * @returns {Promise<void>} A promise that resolves when the send transport for video is connected.
     *
     * @throws Will throw an error if the connection fails.
     *
     * @example
     * const options = {
     *   videoParams: {
     *     // video producer options (e.g., codec, bitrate)
     *   },
     *   targetOption: "all",
     *   parameters: {
     *     videoProducer: null,
     *     localVideoProducer: null,
     *     producerTransport: transport,
     *     localProducerTransport: localTransport,
     *     islevel: '2',
     *     updateMainWindow: false,
     *     updateVideoProducer: (producer) => console.log("Updated producer"),
     *     updateLocalVideoProducer: (localProducer) => console.log("Updated local producer"),
     *     updateProducerTransport: (transport) => console.log("Updated transport"),
     *     updateLocalProducerTransport: (localTransport) => console.log("Updated local transport"),
     *     updateUpdateMainWindow: (state) => console.log("Updated main window:", state),
     *   },
     * };
     *
     * connectSendTransportVideo(options)
     *   .then(() => console.log("Video transport connected successfully"))
     *   .catch((error) => console.error("Error connecting video transport:", error));
     */
    connectSendTransportVideo: ({ videoParams, parameters, targetOption, }: ConnectSendTransportVideoOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectSendTransportVideo, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConnectSendTransportVideo>;
}
export {};
