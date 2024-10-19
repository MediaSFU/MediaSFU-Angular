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
