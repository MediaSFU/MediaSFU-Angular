import { types } from 'mediasoup-client';
import { ConnectSendTransportScreenType, CreateSendTransportType, DisconnectSendTransportScreenType, SleepType, CreateSendTransportParameters, DisconnectSendTransportScreenParameters, ConnectSendTransportScreenParameters } from '../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
type Producer = types.Producer;
export interface CaptureCanvasStreamParameters extends CreateSendTransportParameters, DisconnectSendTransportScreenParameters, ConnectSendTransportScreenParameters {
    canvasWhiteboard: HTMLCanvasElement | null;
    canvasStream: MediaStream | null;
    updateCanvasStream: (stream: MediaStream | null) => void;
    screenProducer: Producer | null;
    localScreenProducer?: Producer | null;
    transportCreated: boolean;
    localTransportCreated?: boolean;
    localSocket?: Socket;
    updateScreenProducer: (producer: Producer | null) => void;
    updateLocalScreenProducer?: (localProducer: Producer | null) => void;
    sleep: SleepType;
    createSendTransport: CreateSendTransportType;
    connectSendTransportScreen: ConnectSendTransportScreenType;
    disconnectSendTransportScreen: DisconnectSendTransportScreenType;
    getUpdatedAllParams: () => CaptureCanvasStreamParameters;
    [key: string]: any;
}
export interface CaptureCanvasStreamOptions {
    parameters: CaptureCanvasStreamParameters;
    start?: boolean;
}
export type CaptureCanvasStreamType = (options: CaptureCanvasStreamOptions) => Promise<void>;
/**
 * Captures the canvas stream and handles the transport connection for screen sharing.
 *
 * @param {CaptureCanvasStreamOptions} options - The options for capturing the canvas stream.
 * @param {Object} options.parameters - The parameters required for capturing and managing the canvas stream.
 * @param {HTMLCanvasElement} options.parameters.canvasWhiteboard - The canvas element to capture the stream from.
 * @param {MediaStream} [options.parameters.canvasStream] - The current canvas stream, if any.
 * @param {Function} options.parameters.updateCanvasStream - Function to update the canvas stream state.
 * @param {Producer | null} [options.parameters.screenProducer] - The current screen producer, if any.
 * @param {Producer | null} [options.parameters.localScreenProducer] - The current local screen producer, if any.
 * @param {boolean} [options.parameters.transportCreated] - Flag indicating if the transport has been created.
 * @param {boolean} [options.parameters.localTransportCreated] - Flag indicating if the local transport has been created.
 * @param {Socket} [options.parameters.localSocket] - The local socket instance used for communication.
 * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer state.
 * @param {Function} options.parameters.updateLocalScreenProducer - Function to update the local screen producer state.
 * @param {Function} options.parameters.sleep - Function to pause execution for a specified duration.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for the screen.
 * @param {Function} options.parameters.connectSendTransportScreen - Function to connect the send transport for the screen.
 * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport for the screen.
 * @param {boolean} [start=true] - Flag indicating whether to start or stop the canvas stream.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @example
 * ```typescript
 * const canvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
 * const options = {
 *   parameters: {
 *     canvasWhiteboard: canvasElement,
 *     updateCanvasStream: (stream) => console.log("Canvas Stream Updated:", stream),
 *     updateScreenProducer: (producer) => console.log("Screen Producer Updated:", producer),
 *     updateLocalScreenProducer: (localProducer) => console.log("Local Screen Producer Updated:", localProducer),
 *     createSendTransport: async (params) => console.log("Transport created with", params),
 *     connectSendTransportScreen: async (options) => console.log("Transport connected with", options),
 *     disconnectSendTransportScreen: async (params) => console.log("Transport disconnected with", params),
 *     sleep: ({ ms }) => new Promise(resolve => setTimeout(resolve, ms)),
 *   },
 *   start: true,
 * };
 * await captureCanvasStream(options);
 * ```
 */
export declare class CaptureCanvasStream {
    /**
     * Capture the canvas stream.
     * @param {Object} parameters - The parameters object.
     * @param {boolean} [start=true] - Indicates whether to start capturing the stream.
     * @returns {Promise<void>} - A promise that resolves when the canvas stream is captured.
     */
    captureCanvasStream: ({ parameters, start, }: CaptureCanvasStreamOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaptureCanvasStream, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaptureCanvasStream>;
}
export {};
