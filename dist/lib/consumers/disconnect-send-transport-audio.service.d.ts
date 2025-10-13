import { Socket } from 'socket.io-client';
import { PrepopulateUserMediaType, PrepopulateUserMediaParameters } from '../@types/types';
import { types } from 'mediasoup-client';
import * as i0 from "@angular/core";
type Producer = types.Producer;
export interface DisconnectSendTransportAudioParameters extends PrepopulateUserMediaParameters {
    audioProducer: Producer | null;
    localAudioProducer?: Producer | null;
    socket: Socket;
    localSocket?: Socket;
    videoAlreadyOn: boolean;
    islevel: string;
    lock_screen: boolean;
    shared: boolean;
    updateMainWindow: boolean;
    hostLabel: string;
    roomName: string;
    updateAudioProducer: (audioProducer: Producer | null) => void;
    updateLocalAudioProducer?: (localAudioProducer: Producer | null) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    prepopulateUserMedia: PrepopulateUserMediaType;
    [key: string]: any;
}
export interface DisconnectSendTransportAudioOptions {
    parameters: DisconnectSendTransportAudioParameters;
}
export type DisconnectSendTransportAudioType = (options: DisconnectSendTransportAudioOptions) => Promise<void>;
export declare const disconnectLocalSendTransportAudio: ({ parameters, }: DisconnectSendTransportAudioOptions) => Promise<void>;
/**
 * Disconnects the send transport for audio by pausing the audio producer and updating the UI accordingly.
 *
 * This function supports both a primary and a local audio producer, delegating local handling to a separate function.
 *
 * @param {DisconnectSendTransportAudioOptions} options - The options for disconnecting the send transport for audio.
 * @param {DisconnectSendTransportAudioParameters} options.parameters - The parameters for disconnecting the send transport for audio.
 * @param {Producer} options.parameters.audioProducer - The primary audio producer to disconnect.
 * @param {Producer} [options.parameters.localAudioProducer] - The local audio producer to disconnect.
 * @param {Socket} options.parameters.socket - The socket instance to use for communication.
 * @param {Socket} [options.parameters.localSocket] - The local socket instance to use for communication.
 * @param {boolean} options.parameters.videoAlreadyOn - Flag indicating if video is already on.
 * @param {string} options.parameters.islevel - The level of the user.
 * @param {boolean} options.parameters.lock_screen - Flag indicating if the screen is locked.
 * @param {boolean} options.parameters.shared - Flag indicating if the screen is shared.
 * @param {boolean} options.parameters.updateMainWindow - Flag to update the main window.
 * @param {string} options.parameters.hostLabel - The label for the host user.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {function} options.parameters.updateAudioProducer - Function to update the audio producer.
 * @param {function} [options.parameters.updateLocalAudioProducer] - Function to update the local audio producer (optional).
 * @param {function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 * @param {object} options.parameters - The parameters required for disconnecting the send transport for audio.
 * @returns {Promise<void>} A promise that resolves when the send transport for audio is disconnected.
 *
 * @throws Will throw an error if the operation fails.
 *
 * @example
 * const options = {
 *   parameters: {
 *     audioProducer: audioProducerInstance,
 *     localAudioProducer: localAudioProducerInstance,
 *     socket: socketInstance,
 *     localSocket: localSocketInstance,
 *     videoAlreadyOn: false,
 *     islevel: '1',
 *     lock_screen: false,
 *     shared: false,
 *     updateMainWindow: true,
 *     hostLabel: 'Host',
 *     roomName: 'Room 1',
 *     updateAudioProducer: (producer) => console.log('Updated audio producer:', producer),
 *     updateLocalAudioProducer: (producer) => console.log('Updated local audio producer:', producer),
 *     updateUpdateMainWindow: (state) => console.log('Main window state updated:', state),
 *     prepopulateUserMedia: async ({ name, parameters }) => console.log('Prepopulating user media for', name),
 *   },
 * };
 *
 * disconnectSendTransportAudio(options)
 *   .then(() => console.log("Audio send transport disconnected successfully"))
 *   .catch((error) => console.log("Error disconnecting audio send transport:", error));
 */
export declare class DisconnectSendTransportAudio {
    /**
     * Disconnects the send transport for audio by pausing the audio producer and updating the UI accordingly.
     *
     * This function supports both a primary and a local audio producer, delegating local handling to a separate function.
     *
     * @param {DisconnectSendTransportAudioOptions} options - The options for disconnecting the send transport for audio.
     * @param {DisconnectSendTransportAudioParameters} options.parameters - The parameters for disconnecting the send transport for audio.
     * @param {Producer} options.parameters.audioProducer - The primary audio producer to disconnect.
     * @param {Producer} [options.parameters.localAudioProducer] - The local audio producer to disconnect.
     * @param {Socket} options.parameters.socket - The socket instance to use for communication.
     * @param {Socket} [options.parameters.localSocket] - The local socket instance to use for communication.
     * @param {boolean} options.parameters.videoAlreadyOn - Flag indicating if video is already on.
     * @param {string} options.parameters.islevel - The level of the user.
     * @param {boolean} options.parameters.lock_screen - Flag indicating if the screen is locked.
     * @param {boolean} options.parameters.shared - Flag indicating if the screen is shared.
     * @param {boolean} options.parameters.updateMainWindow - Flag to update the main window.
     * @param {string} options.parameters.hostLabel - The label for the host user.
     * @param {string} options.parameters.roomName - The name of the room.
     * @param {function} options.parameters.updateAudioProducer - Function to update the audio producer.
     * @param {function} [options.parameters.updateLocalAudioProducer] - Function to update the local audio producer (optional).
     * @param {function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
     * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @param {object} options.parameters - The parameters required for disconnecting the send transport for audio.
     * @returns {Promise<void>} A promise that resolves when the send transport for audio is disconnected.
     *
     * @throws Will throw an error if the operation fails.
     *
     * @example
     * const options = {
     *   parameters: {
     *     audioProducer: audioProducerInstance,
     *     localAudioProducer: localAudioProducerInstance,
     *     socket: socketInstance,
     *     localSocket: localSocketInstance,
     *     videoAlreadyOn: false,
     *     islevel: '1',
     *     lock_screen: false,
     *     shared: false,
     *     updateMainWindow: true,
     *     hostLabel: 'Host',
     *     roomName: 'Room 1',
     *     updateAudioProducer: (producer) => console.log('Updated audio producer:', producer),
     *     updateLocalAudioProducer: (producer) => console.log('Updated local audio producer:', producer),
     *     updateUpdateMainWindow: (state) => console.log('Main window state updated:', state),
     *     prepopulateUserMedia: async ({ name, parameters }) => console.log('Prepopulating user media for', name),
     *   },
     * };
     *
     * disconnectSendTransportAudio(options)
     *   .then(() => console.log("Audio send transport disconnected successfully"))
     *   .catch((error) => console.log("Error disconnecting audio send transport:", error));
     */
    disconnectSendTransportAudio({ parameters, }: DisconnectSendTransportAudioOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisconnectSendTransportAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisconnectSendTransportAudio>;
}
export {};
