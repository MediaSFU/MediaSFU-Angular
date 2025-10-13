import { types } from 'mediasoup-client';
import { Socket } from 'socket.io-client';
import { ReorderStreamsType, ReorderStreamsParameters } from '../@types/types';
import * as i0 from "@angular/core";
type Producer = types.Producer;
export interface DisconnectSendTransportVideoParameters extends ReorderStreamsParameters {
    videoProducer: Producer | null;
    localVideoProducer?: Producer | null;
    socket: Socket;
    localSocket?: Socket;
    islevel: string;
    roomName: string;
    lock_screen: boolean;
    updateMainWindow: boolean;
    updateUpdateMainWindow: (state: boolean) => void;
    updateVideoProducer: (producer: Producer | null) => void;
    updateLocalVideoProducer?: (producer: Producer | null) => void;
    reorderStreams: ReorderStreamsType;
    [key: string]: any;
}
export interface DisconnectSendTransportVideoOptions {
    parameters: DisconnectSendTransportVideoParameters;
}
export type DisconnectSendTransportVideoType = (options: DisconnectSendTransportVideoOptions) => Promise<void>;
export declare const disconnectLocalSendTransportVideo: ({ parameters, }: DisconnectSendTransportVideoOptions) => Promise<void>;
/**
 * Disconnects the send transport for video, closes the video producer, and updates the state.
 *
 * This function supports both a primary and a local video producer, delegating local handling to a separate function.
 *
 * @param {DisconnectSendTransportVideoOptions} options - The options for disconnecting the send transport.
 * @param {DisconnectSendTransportVideoParameters} options.parameters - The parameters required for disconnecting the send transport.
 * @param {Producer | null} options.parameters.videoProducer - The primary video producer object.
 * @param {Producer | null} [options.parameters.localVideoProducer] - The local video producer object (optional).
 * @param {Socket} options.parameters.socket - The primary socket object.
 * @param {Socket} [options.parameters.localSocket] - The local socket object (optional).
 * @param {string} options.parameters.islevel - The participant's level.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {boolean} options.parameters.updateMainWindow - The flag to update the main window.
 * @param {boolean} options.parameters.lock_screen - The flag to lock the screen.
 * @param {Function} options.parameters.updateUpdateMainWindow - The function to update the main window state.
 * @param {Function} options.parameters.updateVideoProducer - The function to update the video producer state.
 * @param {Function} [options.parameters.updateLocalVideoProducer] - The function to update the local video producer state (optional).
 * @param {ReorderStreamsType} options.parameters.reorderStreams - The function to reorder streams.
 * @param {Function} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport state (optional).
 * @param {Function} [options.parameters.updateProducerTransport] - The function to update the producer transport state (optional).
 *
 * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
 *
 * @throws {Error} Throws an error if the disconnection process fails.
 *
 * @example
 * const options = {
 *   parameters: {
 *     videoProducer: videoProducerInstance,
 *     localVideoProducer: localVideoProducerInstance,
 *     socket: socketInstance,
 *     localSocket: localSocketInstance,
 *     islevel: '2',
 *     roomName: 'Room A',
 *     updateMainWindow: false,
 *     lock_screen: false,
 *     updateUpdateMainWindow: (state) => console.log('Main window updated:', state),
 *     updateVideoProducer: (producer) => console.log('Video producer updated:', producer),
 *     updateLocalVideoProducer: (producer) => console.log('Local video producer updated:', producer),
 *     reorderStreams: reorderStreamsFunction,
 *   },
 * };
 *
 * disconnectSendTransportVideo(options)
 *   .then(() => console.log('Video send transport disconnected successfully'))
 *   .catch((error) => console.error('Error disconnecting video send transport:', error));
 */
export declare class DisconnectSendTransportVideo {
    /**
      * Disconnects the send transport for video, closes the video producer, and updates the state.
      *
      * This function supports both a primary and a local video producer, delegating local handling to a separate function.
      *
      * @param {DisconnectSendTransportVideoOptions} options - The options for disconnecting the send transport.
      * @param {DisconnectSendTransportVideoParameters} options.parameters - The parameters required for disconnecting the send transport.
      * @param {Producer | null} options.parameters.videoProducer - The primary video producer object.
      * @param {Producer | null} [options.parameters.localVideoProducer] - The local video producer object (optional).
      * @param {Socket} options.parameters.socket - The primary socket object.
      * @param {Socket} [options.parameters.localSocket] - The local socket object (optional).
      * @param {string} options.parameters.islevel - The participant's level.
      * @param {string} options.parameters.roomName - The name of the room.
      * @param {boolean} options.parameters.updateMainWindow - The flag to update the main window.
      * @param {boolean} options.parameters.lock_screen - The flag to lock the screen.
      * @param {Function} options.parameters.updateUpdateMainWindow - The function to update the main window state.
      * @param {Function} options.parameters.updateVideoProducer - The function to update the video producer state.
      * @param {Function} [options.parameters.updateLocalVideoProducer] - The function to update the local video producer state (optional).
      * @param {ReorderStreamsType} options.parameters.reorderStreams - The function to reorder streams.
      * @param {Function} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport state (optional).
      * @param {Function} [options.parameters.updateProducerTransport] - The function to update the producer transport state (optional).
      *
      * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
      *
      * @throws {Error} Throws an error if the disconnection process fails.
      *
      * @example
      * const options = {
      *   parameters: {
      *     videoProducer: videoProducerInstance,
      *     localVideoProducer: localVideoProducerInstance,
      *     socket: socketInstance,
      *     localSocket: localSocketInstance,
      *     islevel: '2',
      *     roomName: 'Room A',
      *     updateMainWindow: false,
      *     lock_screen: false,
      *     updateUpdateMainWindow: (state) => console.log('Main window updated:', state),
      *     updateVideoProducer: (producer) => console.log('Video producer updated:', producer),
      *     updateLocalVideoProducer: (producer) => console.log('Local video producer updated:', producer),
      *     reorderStreams: reorderStreamsFunction,
      *   },
      * };
      *
      * disconnectSendTransportVideo(options)
      *   .then(() => console.log('Video send transport disconnected successfully'))
      *   .catch((error) => console.error('Error disconnecting video send transport:', error));
      */
    disconnectSendTransportVideo({ parameters, }: DisconnectSendTransportVideoOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisconnectSendTransportVideo, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisconnectSendTransportVideo>;
}
export {};
