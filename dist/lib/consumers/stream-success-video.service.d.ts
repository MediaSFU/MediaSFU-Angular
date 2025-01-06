import { Device, ProducerOptions, Producer } from 'mediasoup-client/lib/types';
import { Socket } from 'socket.io-client';
import { ConnectSendTransportVideoParameters, Participant, ShowAlert, CreateSendTransportParameters, ReorderStreamsParameters, SleepType, CreateSendTransportType, ConnectSendTransportVideoType, ReorderStreamsType, VParamsType, HParamsType } from '../@types/types';
import * as i0 from "@angular/core";
export interface StreamSuccessVideoParameters extends CreateSendTransportParameters, ConnectSendTransportVideoParameters, ReorderStreamsParameters {
    socket: Socket;
    participants: Participant[];
    localStream: MediaStream | null;
    transportCreated: boolean;
    transportCreatedVideo: boolean;
    videoAlreadyOn: boolean;
    videoAction: boolean;
    videoParams: ProducerOptions;
    localStreamVideo: MediaStream | null;
    defVideoID: string;
    userDefaultVideoInputDevice: string;
    params: ProducerOptions;
    videoParamse?: ProducerOptions;
    islevel: string;
    member: string;
    updateMainWindow: boolean;
    lock_screen: boolean;
    shared: boolean;
    shareScreenStarted: boolean;
    vParams: VParamsType;
    hParams: HParamsType;
    allowed: boolean;
    currentFacingMode: string;
    device: Device | null;
    keepBackground: boolean;
    appliedBackground: boolean;
    videoProducer: Producer | null;
    updateTransportCreated: (created: boolean) => void;
    updateTransportCreatedVideo: (created: boolean) => void;
    updateVideoAlreadyOn: (videoOn: boolean) => void;
    updateVideoAction: (videoAction: boolean) => void;
    updateLocalStream: (stream: MediaStream | null) => void;
    updateLocalStreamVideo: (stream: MediaStream | null) => void;
    updateUserDefaultVideoInputDevice: (device: string) => void;
    updateCurrentFacingMode: (mode: string) => void;
    updateDefVideoID: (id: string) => void;
    updateAllowed: (allowed: boolean) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    updateParticipants: (participants: Participant[]) => void;
    updateVideoParams: (params: ProducerOptions) => void;
    updateIsBackgroundModalVisible: (isVisible: boolean) => void;
    updateAutoClickBackground: (autoClick: boolean) => void;
    showAlert?: ShowAlert;
    createSendTransport: CreateSendTransportType;
    connectSendTransportVideo: ConnectSendTransportVideoType;
    reorderStreams: ReorderStreamsType;
    sleep: SleepType;
    getUpdatedAllParams: () => StreamSuccessVideoParameters;
    [key: string]: any;
}
export interface StreamSuccessVideoOptions {
    stream: MediaStream;
    parameters: StreamSuccessVideoParameters;
}
export type StreamSuccessVideoType = (options: StreamSuccessVideoOptions) => Promise<void>;
/**
 * Streams a video successfully by managing the local stream, updating parameters, and handling video transport.
 *
 * This method initiates the video streaming process by updating the local video stream with the new stream,
 * creating or connecting to the video transport, and notifying participants of the streaming status.
 *
 * @param {StreamSuccessVideoOptions} options - The options for streaming the video.
 * @param {MediaStream} options.stream - The media stream to be used for the video.
 * @param {StreamSuccessVideoParameters} options.parameters - The parameters required for streaming.
 * @param {Socket} options.parameters.socket - The socket instance for real-time communication.
 * @param {Participant[]} options.parameters.participants - The list of participants in the session.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream.
 * @param {boolean} options.parameters.transportCreated - Indicates if the transport has already been created.
 * @param {boolean} options.parameters.transportCreatedVideo - Indicates if the video transport has been created.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {boolean} options.parameters.videoAction - Indicates if a video action is being performed.
 * @param {ProducerOptions} options.parameters.videoParams - The parameters for the video producer.
 * @param {MediaStream | null} options.parameters.localStreamVideo - The local video stream.
 * @param {string} options.parameters.defVideoID - The default video device ID.
 * @param {string} options.parameters.userDefaultVideoInputDevice - The user's default video input device.
 * @param {ProducerOptions} options.parameters.params - Additional parameters for the producer.
 * @param {ProducerOptions} options.parameters.videoParamse - Additional parameters for the video.
 * @param {string} options.parameters.islevel - The level of the user (e.g., host, participant).
 * @param {string} options.parameters.member - The member's name in the session.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window should be updated.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {Function} options.parameters.showAlert - Function to show alert messages.
 * @param {Function} options.parameters.updateParticipants - Function to update the participants list.
 * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
 * @param {Function} options.parameters.updateTransportCreatedVideo - Function to update the transport creation state.
 * @param {Function} options.parameters.updateVideoAlreadyOn - Function to update the video status.
 * @param {Function} options.parameters.updateVideoAction - Function to update the video action state.
 * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
 * @param {Function} options.parameters.updateLocalStreamVideo - Function to update the local video stream.
 * @param {Function} options.parameters.updateUserDefaultVideoInputDevice - Function to update the default video input device.
 * @param {Function} options.parameters.updateCurrentFacingMode - Function to update the current facing mode.
 * @param {Function} options.parameters.updateDefVideoID - Function to update the default video device ID.
 * @param {Function} options.parameters.updateAllowed - Function to update the allowed state.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for video.
 * @param {Function} options.parameters.connectSendTransportVideo - Function to connect the send transport for video.
 * @param {Function} options.parameters.resumeSendTransportAudio - Function to resume audio transport.
 *
 * @returns {Promise<void>} A promise that resolves when the video has been successfully streamed.
 *
 * @throws {Error} Throws an error if there is an issue with streaming the video.
 *
 * @example
 * await streamSuccessVideo({
 *   stream: newVideoStream,
 *   parameters: {
 *     socket: socketInstance,
 *     localStream: null,
 *     // other parameters...
 *   },
 * });
 */
export declare class StreamSuccessVideo {
    /**
     * Streams a video successfully by managing the local stream, updating parameters, and handling video transport.
     *
     * @param {StreamSuccessVideoOptions} options - The options for streaming the video.
     * @param {MediaStream} options.stream - The media stream to be used for the video.
     * @param {Object} options.parameters - The parameters required for streaming.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     *
     * @returns {Promise<void>} A promise that resolves when the video has been successfully streamed.
     *
     * @throws Will throw an error if there is an issue with streaming the video.
     */
    streamSuccessVideo: ({ stream, parameters }: StreamSuccessVideoOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StreamSuccessVideo, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StreamSuccessVideo>;
}
