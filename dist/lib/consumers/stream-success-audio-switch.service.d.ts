import { types } from 'mediasoup-client';
import { Socket } from 'socket.io-client';
import { PrepopulateUserMediaParameters, PrepopulateUserMediaType, CreateSendTransportParameters, CreateSendTransportType, ConnectSendTransportAudioParameters, ConnectSendTransportAudioType, SleepType } from '../@types/types';
import * as i0 from "@angular/core";
type Producer = types.Producer;
type ProducerCodecOptions = types.ProducerCodecOptions;
type ProducerOptions = types.ProducerOptions;
/**
 * Handles the success of switching audio devices in a streaming context.
 * @async
 * @function
 * @param {Object} parameters - The parameters object containing necessary variables.
 * @param {MediaStream} stream - The new MediaStream with the switched audio device.
 */
export interface StreamSuccessAudioSwitchParameters extends PrepopulateUserMediaParameters, CreateSendTransportParameters, ConnectSendTransportAudioParameters {
    audioProducer: Producer | null;
    localAudioProducer?: Producer | null;
    socket: Socket;
    localSocket?: Socket;
    roomName: string;
    localStream: MediaStream | null;
    localStreamAudio: MediaStream | null;
    audioParams: ProducerOptions;
    audioPaused: boolean;
    audioAlreadyOn: boolean;
    transportCreated: boolean;
    localTransportCreated?: boolean;
    audioParamse?: ProducerCodecOptions;
    defAudioID: string;
    userDefaultAudioInputDevice: string;
    hostLabel: string;
    updateMainWindow: boolean;
    videoAlreadyOn: boolean;
    islevel: string;
    lock_screen: boolean;
    shared: boolean;
    updateAudioProducer: (audioProducer: Producer | null) => void;
    updateLocalAudioProducer?: (localAudioProducer: Producer | null) => void;
    updateLocalStream: (localStream: MediaStream | null) => void;
    updateAudioParams: (audioParams: ProducerOptions) => void;
    updateDefAudioID: (defAudioID: string) => void;
    updateUserDefaultAudioInputDevice: (userDefaultAudioInputDevice: string) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    sleep: SleepType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    createSendTransport: CreateSendTransportType;
    connectSendTransportAudio: ConnectSendTransportAudioType;
    getUpdatedAllParams: () => StreamSuccessAudioSwitchParameters;
    [key: string]: any;
}
export interface StreamSuccessAudioSwitchOptions {
    stream: MediaStream;
    parameters: StreamSuccessAudioSwitchParameters;
}
export type StreamSuccessAudioSwitchType = (options: StreamSuccessAudioSwitchOptions) => Promise<void>;
/**
 * Handles the switching of the audio stream upon successful stream connection.
 *
 * @param {StreamSuccessAudioSwitchOptions} options - The options for the audio stream success switch.
 * @param {MediaStream} options.stream - The new media stream containing the audio track.
 * @param {Object} options.parameters - The parameters required for setting up the audio stream.
 * @param {Producer} options.parameters.audioProducer - The current audio producer.
 * @param {Producer} options.parameters.localAudioProducer - The local audio producer.
 * @param {Socket} options.parameters.socket - The socket connection for communication.
 * @param {Socket} options.parameters.localSocket - The local socket connection for communication.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream.
 * @param {MediaStream | null} options.parameters.localStreamAudio - The local audio stream.
 * @param {ProducerOptions} options.parameters.audioParams - The audio parameters.
 * @param {boolean} options.parameters.audioPaused - Indicates if the audio is paused.
 * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already on.
 * @param {boolean} options.parameters.transportCreated - Indicates if the transport is created.
 * @param {ProducerCodecOptions} options.parameters.audioParamse - Additional audio parameters.
 * @param {string} options.parameters.defAudioID - The default audio device ID.
 * @param {string} options.parameters.userDefaultAudioInputDevice - The user default audio input device.
 * @param {string} options.parameters.hostLabel - The label of the host.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window should be updated.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {string} options.parameters.islevel - The level of the participant.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer.
 * @param {Function} options.parameters.updateLocalAudioProducer - Function to update the local audio producer.
 * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
 * @param {Function} options.parameters.updateAudioParams - Function to update the audio parameters.
 * @param {Function} options.parameters.updateDefAudioID - Function to update the default audio device ID.
 * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user default audio input device.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
 * @param {Function} options.parameters.sleep - Function to pause execution for a specified time.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport.
 * @param {Function} options.parameters.connectSendTransportAudio - Function to connect the send transport for audio.
 *
 * @returns {Promise<void>} A promise that resolves when the audio stream switch is complete.
 *
 * @example
 * const options = {
 *   stream: newAudioStream, // MediaStream object containing the new audio track
 *   parameters: {
 *     audioProducer: currentAudioProducer,
 *     localAudioProducer: localAudioProducerInstance,
 *     localSocket: localSocketInstance,
 *     socket: socketInstance,
 *     roomName: "Room1",
 *     localStream: null,
 *     localStreamAudio: null,
 *     audioParams: audioProducerOptions,
 *     audioPaused: false,
 *     audioAlreadyOn: true,
 *     transportCreated: false,
 *     audioParamse: additionalAudioParams,
 *     defAudioID: "default-audio-device-id",
 *     userDefaultAudioInputDevice: "user-input-device-id",
 *     hostLabel: "Host",
 *     islevel: "1",
 *     videoAlreadyOn: false,
 *     lock_screen: false,
 *     shared: false,
 *     updateAudioProducer: updateAudioProducerFunction,
 *     updateLocalAudioProducer: updateLocalAudioProducerFunction,
 *     updateLocalStream: updateLocalStreamFunction,
 *     updateAudioParams: updateAudioParamsFunction,
 *     updateDefAudioID: updateDefAudioIDFunction,
 *     updateUserDefaultAudioInputDevice: updateUserDefaultAudioInputDeviceFunction,
 *     updateUpdateMainWindow: updateMainWindowFunction,
 *     sleep: sleepFunction,
 *     prepopulateUserMedia: prepopulateUserMediaFunction,
 *     createSendTransport: createSendTransportFunction,
 *     connectSendTransportAudio: connectSendTransportAudioFunction,
 *   },
 * };
 *
 * streamSuccessAudioSwitch(options)
 *   .then(() => {
 *     console.log('Audio stream switched successfully');
 *   })
 *   .catch(error => {
 *     console.error('Error switching audio stream:', error);
 *   });
 */
export declare class StreamSuccessAudioSwitch {
    /**
     * Handles the switching of the audio stream upon successful stream connection.
     *
     * @param {StreamSuccessAudioSwitchOptions} options - The options for the audio stream success switch.
     * @param {MediaStream} options.stream - The new media stream containing the audio track.
     * @param {Object} options.parameters - The parameters required for setting up the audio stream.
     * @param {Producer} options.parameters.audioProducer - The current audio producer.
     * @param {Producer} options.parameters.localAudioProducer - The local audio producer.
     * @param {Socket} options.parameters.socket - The socket connection for communication.
     * @param {Socket} options.parameters.localSocket - The local socket connection for communication.
     * @param {string} options.parameters.roomName - The name of the room.
     * @param {MediaStream | null} options.parameters.localStream - The local media stream.
     * @param {MediaStream | null} options.parameters.localStreamAudio - The local audio stream.
     * @param {ProducerOptions} options.parameters.audioParams - The audio parameters.
     * @param {boolean} options.parameters.audioPaused - Indicates if the audio is paused.
     * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already on.
     * @param {boolean} options.parameters.transportCreated - Indicates if the transport is created.
     * @param {ProducerCodecOptions} options.parameters.audioParamse - Additional audio parameters.
     * @param {string} options.parameters.defAudioID - The default audio device ID.
     * @param {string} options.parameters.userDefaultAudioInputDevice - The user default audio input device.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window should be updated.
     * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
     * @param {string} options.parameters.islevel - The level of the participant.
     * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer.
     * @param {Function} options.parameters.updateLocalAudioProducer - Function to update the local audio producer.
     * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
     * @param {Function} options.parameters.updateAudioParams - Function to update the audio parameters.
     * @param {Function} options.parameters.updateDefAudioID - Function to update the default audio device ID.
     * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user default audio input device.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {Function} options.parameters.sleep - Function to pause execution for a specified time.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @param {Function} options.parameters.createSendTransport - Function to create a send transport.
     * @param {Function} options.parameters.connectSendTransportAudio - Function to connect the send transport for audio.
     *
     * @returns {Promise<void>} A promise that resolves when the audio stream switch is complete.
     *
     * @example
     * const options = {
     *   stream: newAudioStream, // MediaStream object containing the new audio track
     *   parameters: {
     *     audioProducer: currentAudioProducer,
     *     localAudioProducer: localAudioProducerInstance,
     *     localSocket: localSocketInstance,
     *     socket: socketInstance,
     *     roomName: "Room1",
     *     localStream: null,
     *     localStreamAudio: null,
     *     audioParams: audioProducerOptions,
     *     audioPaused: false,
     *     audioAlreadyOn: true,
     *     transportCreated: false,
     *     audioParamse: additionalAudioParams,
     *     defAudioID: "default-audio-device-id",
     *     userDefaultAudioInputDevice: "user-input-device-id",
     *     hostLabel: "Host",
     *     islevel: "1",
     *     videoAlreadyOn: false,
     *     lock_screen: false,
     *     shared: false,
     *     updateAudioProducer: updateAudioProducerFunction,
     *     updateLocalAudioProducer: updateLocalAudioProducerFunction,
     *     updateLocalStream: updateLocalStreamFunction,
     *     updateAudioParams: updateAudioParamsFunction,
     *     updateDefAudioID: updateDefAudioIDFunction,
     *     updateUserDefaultAudioInputDevice: updateUserDefaultAudioInputDeviceFunction,
     *     updateUpdateMainWindow: updateMainWindowFunction,
     *     sleep: sleepFunction,
     *     prepopulateUserMedia: prepopulateUserMediaFunction,
     *     createSendTransport: createSendTransportFunction,
     *     connectSendTransportAudio: connectSendTransportAudioFunction,
     *   },
     * };
     *
     * streamSuccessAudioSwitch(options)
     *   .then(() => {
     *     console.log('Audio stream switched successfully');
     *   })
     *   .catch(error => {
     *     console.error('Error switching audio stream:', error);
     *   });
     */
    streamSuccessAudioSwitch({ stream, parameters, }: StreamSuccessAudioSwitchOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StreamSuccessAudioSwitch, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StreamSuccessAudioSwitch>;
}
export {};
