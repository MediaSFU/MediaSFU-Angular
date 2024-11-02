import { Socket } from 'socket.io-client';
import { PrepopulateUserMediaType, PrepopulateUserMediaParameters } from '../@types/types';
import { Producer } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface DisconnectSendTransportAudioParameters extends PrepopulateUserMediaParameters {
    audioProducer: Producer | null;
    socket: Socket;
    videoAlreadyOn: boolean;
    islevel: string;
    lock_screen: boolean;
    shared: boolean;
    updateMainWindow: boolean;
    hostLabel: string;
    roomName: string;
    updateAudioProducer: (audioProducer: Producer | null) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    prepopulateUserMedia: PrepopulateUserMediaType;
    [key: string]: any;
}
export interface DisconnectSendTransportAudioOptions {
    parameters: DisconnectSendTransportAudioParameters;
}
export type DisconnectSendTransportAudioType = (options: DisconnectSendTransportAudioOptions) => Promise<void>;
/**
 * Disconnects the send transport for audio by pausing the audio producer and updating the UI accordingly.
 *
 * @param {DisconnectSendTransportAudioOptions} options - The options required to disconnect the send transport for audio.
 * @param {Object} options.parameters - The parameters required for the disconnection.
 * @param {Producer | null} options.parameters.audioProducer - The audio producer to be paused.
 * @param {Socket} options.parameters.socket - The socket connection to notify the server.
 * @param {boolean} options.parameters.videoAlreadyOn - Flag indicating if the video is already on.
 * @param {string} options.parameters.islevel - The level of the user.
 * @param {boolean} options.parameters.lock_screen - Flag indicating if the screen is locked.
 * @param {boolean} options.parameters.shared - Flag indicating if the screen is shared.
 * @param {Function} options.parameters.updateMainWindow - Function to update the main window state.
 * @param {string} options.parameters.hostLabel - The label of the host.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer state.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update state.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 *
 * @returns {Promise<void>} A promise that resolves when the send transport for audio is disconnected.
 *
 * @throws Will throw an error if the operation fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   parameters: {
 *     audioProducer,
 *     socket,
 *     videoAlreadyOn: false,
 *     islevel: '1',
 *     lock_screen: false,
 *     shared: false,
 *     updateMainWindow: false,
 *     hostLabel: 'Host',
 *     roomName: 'Room 101',
 *     updateAudioProducer: (producer) => { console.log(updated) },
 *     updateUpdateMainWindow: (state) => { console.log(updated) },
 *     prepopulateUserMedia: async ({ name, parameters }) => { },
 *   },
 * };
 *
 * disconnectSendTransportAudioService.disconnectSendTransportAudio(options)
 *   .then(() => {
 *     console.log('Audio transport disconnected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error disconnecting audio transport:', error);
 *   });
 * ```
 */
export declare class DisconnectSendTransportAudio {
    /**
     * Disconnects the send transport for audio by pausing the audio producer and updating the UI accordingly.
     *
     * @param {DisconnectSendTransportAudioOptions} parameters - The parameters required to disconnect the send transport for audio.
     * @param {Object} parameters.audioProducer - The audio producer to be paused.
     * @param {Object} parameters.socket - The socket connection to notify the server.
     * @param {boolean} parameters.videoAlreadyOn - Flag indicating if the video is already on.
     * @param {string} parameters.islevel - The level of the user.
     * @param {boolean} parameters.lock_screen - Flag indicating if the screen is locked.
     * @param {boolean} parameters.shared - Flag indicating if the screen is shared.
     * @param {Function} parameters.updateMainWindow - Function to update the main window state.
     * @param {string} parameters.hostLabel - The label of the host.
     * @param {string} parameters.roomName - The name of the room.
     * @param {Function} parameters.updateAudioProducer - Function to update the audio producer state.
     * @param {Function} parameters.updateUpdateMainWindow - Function to update the main window update state.
     * @param {Function} parameters.prepopulateUserMedia - Function to prepopulate user media.
     *
     * @returns {Promise<void>} A promise that resolves when the send transport for audio is disconnected.
     *
     * @throws Will throw an error if the operation fails.
     */
    disconnectSendTransportAudio({ parameters, }: DisconnectSendTransportAudioOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisconnectSendTransportAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisconnectSendTransportAudio>;
}
