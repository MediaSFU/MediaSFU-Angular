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
