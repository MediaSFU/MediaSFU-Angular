import { Producer } from 'mediasoup-client/lib/types';
import { ConnectSendTransportScreenType, CreateSendTransportType, DisconnectSendTransportScreenType, SleepType, CreateSendTransportParameters, DisconnectSendTransportScreenParameters, ConnectSendTransportScreenParameters } from '../../@types/types';
import * as i0 from "@angular/core";
export interface CaptureCanvasStreamParameters extends CreateSendTransportParameters, DisconnectSendTransportScreenParameters, ConnectSendTransportScreenParameters {
    canvasWhiteboard: HTMLCanvasElement | null;
    canvasStream: MediaStream | null;
    updateCanvasStream: (stream: MediaStream | null) => void;
    screenProducer: Producer | null;
    transportCreated: boolean;
    updateScreenProducer: (producer: Producer | null) => void;
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
 * Manages capturing and streaming from a canvas element.
 *
 * @param {CaptureCanvasStreamOptions} options - Options to control canvas streaming.
 * @param {CaptureCanvasStreamParameters} options.parameters - Object containing media settings and state management functions.
 * @param {boolean} [options.start=true] - If `true`, initiates canvas capture; if `false`, stops the capture.
 * @returns {Promise<void>} A promise that resolves once the canvas stream has started or stopped.
 *
 * The function first checks the availability of `canvasWhiteboard` to capture the canvas stream. If unavailable, it attempts multiple times until a timeout. If successful:
 * - It starts the canvas capture, creating or reconnecting the transport for streaming.
 * - If stopping, it disconnects the transport and halts the stream.
 *
 * @example
 * ```typescript
 * const captureService = new CaptureCanvasStream();
 * captureService.captureCanvasStream({
 *   parameters: {
 *     canvasWhiteboard: document.getElementById('myCanvas') as HTMLCanvasElement,
 *     updateCanvasStream: (stream) => console.log('Canvas Stream:', stream),
 *     screenProducer: null,
 *     transportCreated: false,
 *     // other required parameters...
 *   },
 *   start: true
 * });
 * ```
 *
 * This example initiates a capture of `myCanvas`, updating the canvas stream upon successful connection.
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
