import { Socket } from 'socket.io-client';
import { Participant, PrepopulateUserMediaParameters, ShowAlert, CreateSendTransportParameters, ConnectSendTransportAudioParameters, ResumeSendTransportAudioParameters, PrepopulateUserMediaType, CreateSendTransportType, ConnectSendTransportAudioType, ResumeSendTransportAudioType } from '../@types/types';
import { ProducerOptions } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface StreamSuccessAudioParameters extends CreateSendTransportParameters, ConnectSendTransportAudioParameters, ResumeSendTransportAudioParameters, PrepopulateUserMediaParameters {
    socket: Socket;
    participants: Participant[];
    localStream: MediaStream | null;
    transportCreated: boolean;
    transportCreatedAudio: boolean;
    audioAlreadyOn: boolean;
    micAction: boolean;
    audioParams: ProducerOptions;
    localStreamAudio: MediaStream | null;
    defAudioID: string;
    userDefaultAudioInputDevice: string;
    params: ProducerOptions;
    audioParamse?: ProducerOptions;
    aParams: ProducerOptions;
    hostLabel: string;
    islevel: string;
    member: string;
    updateMainWindow: boolean;
    lock_screen: boolean;
    shared: boolean;
    videoAlreadyOn: boolean;
    showAlert?: ShowAlert;
    updateParticipants: (participants: Participant[]) => void;
    updateTransportCreated: (transportCreated: boolean) => void;
    updateTransportCreatedAudio: (transportCreatedAudio: boolean) => void;
    updateAudioAlreadyOn: (audioAlreadyOn: boolean) => void;
    updateMicAction: (micAction: boolean) => void;
    updateAudioParams: (audioParams: ProducerOptions) => void;
    updateLocalStream: (localStream: MediaStream | null) => void;
    updateLocalStreamAudio: (localStreamAudio: MediaStream | null) => void;
    updateDefAudioID: (defAudioID: string) => void;
    updateUserDefaultAudioInputDevice: (userDefaultAudioInputDevice: string) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    createSendTransport: CreateSendTransportType;
    connectSendTransportAudio: ConnectSendTransportAudioType;
    resumeSendTransportAudio: ResumeSendTransportAudioType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    getUpdatedAllParams: () => StreamSuccessAudioParameters;
    [key: string]: any;
}
export interface StreamSuccessAudioOptions {
    stream: MediaStream;
    parameters: StreamSuccessAudioParameters;
}
export type StreamSuccessAudioType = (options: StreamSuccessAudioOptions) => Promise<void>;
/**
 * Handles the successful streaming of audio by setting up the necessary transports and updating the relevant states.
 *
 * This method updates the local media stream with the new audio track, manages the transport connection,
 * and updates the participants' states to reflect changes in audio settings.
 *
 * @param {StreamSuccessAudioOptions} options - The options for streaming success audio.
 * @param {MediaStream} options.stream - The media stream containing the audio track.
 * @param {StreamSuccessAudioParameters} options.parameters - The parameters required for setting up the audio stream.
 * @param {Socket} options.parameters.socket - The socket connection for real-time communication.
 * @param {Participant[]} options.parameters.participants - The list of participants in the session.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream that includes video and audio tracks.
 * @param {boolean} options.parameters.transportCreated - Indicates if the audio transport has been created.
 * @param {boolean} options.parameters.transportCreatedAudio - Indicates if the audio transport has been created.
 * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already active.
 * @param {boolean} options.parameters.micAction - Indicates the microphone action state.
 * @param {ProducerOptions} options.parameters.audioParams - The current audio parameters for the producer.
 * @param {MediaStream | null} options.parameters.localStreamAudio - The local audio stream.
 * @param {string} options.parameters.defAudioID - The default audio device ID for the stream.
 * @param {string} options.parameters.userDefaultAudioInputDevice - The user default audio input device.
 * @param {ProducerOptions} options.parameters.params - Additional parameters for the producer.
 * @param {ProducerOptions} [options.parameters.audioParamse] - Additional audio parameters.
 * @param {ProducerOptions} options.parameters.aParams - Producer parameters for the audio.
 * @param {string} options.parameters.hostLabel - The label of the host for this session.
 * @param {string} options.parameters.islevel - The participant's level (e.g., admin, regular user).
 * @param {string} options.parameters.member - The member name for identification.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window needs to be updated.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked for participants.
 * @param {boolean} options.parameters.shared - Indicates if the screen is currently shared.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video stream is currently active.
 * @param {ShowAlert} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {Function} options.parameters.updateParticipants - Function to update the list of participants.
 * @param {Function} options.parameters.updateTransportCreated - Function to update the audio transport created status.
 * @param {Function} options.parameters.updateTransportCreatedAudio - Function to update the audio transport created status.
 * @param {Function} options.parameters.updateAudioAlreadyOn - Function to update the audio active status.
 * @param {Function} options.parameters.updateMicAction - Function to update the microphone action state.
 * @param {Function} options.parameters.updateAudioParams - Function to update the audio parameters.
 * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
 * @param {Function} options.parameters.updateLocalStreamAudio - Function to update the local audio stream.
 * @param {Function} options.parameters.updateDefAudioID - Function to update the default audio device ID.
 * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the default audio input device.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window status.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for audio.
 * @param {Function} options.parameters.connectSendTransportAudio - Function to connect the send transport for audio.
 * @param {Function} options.parameters.resumeSendTransportAudio - Function to resume the send transport for audio.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media based on current settings.
 *
 * @returns {Promise<void>} A promise that resolves when the audio streaming setup is complete.
 *
 * @throws {Error} Throws an error if there is an issue during the audio stream setup.
 *
 * @example
 * await streamSuccessAudio({
 *   stream: newAudioStream,
 *   parameters: {
 *     socket: socketInstance,
 *     participants: participantList,
 *     // other parameters...
 *   },
 * });
 */
export declare class StreamSuccessAudio {
    /**
     * Handles the successful streaming of audio by setting up the necessary transports and updating the relevant states.
     *
     * @param {Object} options - The options for streaming success audio.
     * @param {MediaStream} options.stream - The media stream containing the audio track.
     * @param {Object} options.parameters - The parameters required for setting up the audio stream.
     * @param {Object} options.parameters.socket - The socket connection.
     * @param {Array} options.parameters.participants - The list of participants.
     * @param {MediaStream} options.parameters.localStream - The local media stream.
     * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is created.
     * @param {boolean} options.parameters.transportCreatedAudio - Flag indicating if the audio transport is created.
     * @param {boolean} options.parameters.audioAlreadyOn - Flag indicating if the audio is already on.
     * @param {boolean} options.parameters.micAction - Flag indicating the microphone action.
     * @param {Object} options.parameters.audioParams - The audio parameters.
     * @param {MediaStream} options.parameters.localStreamAudio - The local audio stream.
     * @param {string} options.parameters.defAudioID - The default audio device ID.
     * @param {string} options.parameters.userDefaultAudioInputDevice - The user default audio input device.
     * @param {Object} options.parameters.params - Additional parameters.
     * @param {Object} options.parameters.audioParamse - Additional audio parameters.
     * @param {Object} options.parameters.aParams - Additional parameters for audio.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {string} options.parameters.islevel - The level of the user.
     * @param {string} options.parameters.member - The member name.
     * @param {boolean} options.parameters.updateMainWindow - Flag indicating if the main window should be updated.
     * @param {boolean} options.parameters.lock_screen - Flag indicating if the screen is locked.
     * @param {boolean} options.parameters.shared - Flag indicating if the screen is shared.
     * @param {boolean} options.parameters.videoAlreadyOn - Flag indicating if the video is already on.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {Function} options.parameters.updateParticipants - Function to update participants.
     * @param {Function} options.parameters.updateTransportCreated - Function to update transport created flag.
     * @param {Function} options.parameters.updateTransportCreatedAudio - Function to update audio transport created flag.
     * @param {Function} options.parameters.updateAudioAlreadyOn - Function to update audio already on flag.
     * @param {Function} options.parameters.updateMicAction - Function to update microphone action flag.
     * @param {Function} options.parameters.updateAudioParams - Function to update audio parameters.
     * @param {Function} options.parameters.updateLocalStream - Function to update local stream.
     * @param {Function} options.parameters.updateLocalStreamAudio - Function to update local audio stream.
     * @param {Function} options.parameters.updateDefAudioID - Function to update default audio device ID.
     * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update user default audio input device.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update main window flag.
     * @param {Function} options.parameters.createSendTransport - Function to create send transport.
     * @param {Function} options.parameters.connectSendTransportAudio - Function to connect send transport audio.
     * @param {Function} options.parameters.resumeSendTransportAudio - Function to resume send transport audio.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @returns {Promise<void>} A promise that resolves when the audio streaming setup is complete.
     */
    streamSuccessAudio({ stream, parameters }: StreamSuccessAudioOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StreamSuccessAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StreamSuccessAudio>;
}
