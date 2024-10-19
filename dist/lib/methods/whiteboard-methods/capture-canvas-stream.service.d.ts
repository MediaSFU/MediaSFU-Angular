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
