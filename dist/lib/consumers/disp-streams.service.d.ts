import { Stream, Participant, Transport, PrepopulateUserMediaParameters, PrepopulateUserMediaType, RePortParameters, RePortType, ProcessConsumerTransportsParameters, ProcessConsumerTransportsType, ResumePauseStreamsParameters, ResumePauseStreamsType, ReadjustParameters, ReadjustType, AddVideosGridType, AddVideosGridParameters, GetEstimateType, CheckGridType, ResumePauseAudioStreamsParameters, ResumePauseAudioStreamsType, GetEstimateParameters, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface DispStreamsParameters extends PrepopulateUserMediaParameters, RePortParameters, ProcessConsumerTransportsParameters, ResumePauseStreamsParameters, ReadjustParameters, ResumePauseAudioStreamsParameters, GetEstimateParameters, AddVideosGridParameters {
    consumerTransports: Transport[];
    streamNames: Stream[];
    audStreamNames: Stream[];
    participants: Participant[];
    ref_participants: Participant[];
    recordingDisplayType: 'video' | 'media' | 'all';
    recordingVideoOptimized: boolean;
    meetingDisplayType: string;
    meetingVideoOptimized: boolean;
    currentUserPage: number;
    hostLabel: string;
    mainHeightWidth: number;
    prevMainHeightWidth: number;
    prevDoPaginate: boolean;
    doPaginate: boolean;
    firstAll: boolean;
    shared: boolean;
    shareScreenStarted: boolean;
    shareEnded: boolean;
    oldAllStreams: (Stream | Participant)[];
    updateMainWindow: boolean;
    remoteProducerId?: string;
    activeNames: string[];
    dispActiveNames: string[];
    p_dispActiveNames: string[];
    nForReadjustRecord: number;
    first_round: boolean;
    lock_screen: boolean;
    chatRefStreams: (Stream | Participant)[];
    eventType: EventType;
    islevel: string;
    localStreamVideo: MediaStream | null;
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    keepBackground: boolean;
    virtualStream: MediaStream | null;
    updateActiveNames: (names: string[]) => void;
    updateDispActiveNames: (names: string[]) => void;
    updateLStreams: (streams: (Stream | Participant)[]) => void;
    updateChatRefStreams: (streams: (Stream | Participant)[]) => void;
    updateNForReadjustRecord: (n: number) => void;
    updateUpdateMainWindow: (value: boolean) => void;
    updateShowMiniView: (value: boolean) => void;
    prepopulateUserMedia: PrepopulateUserMediaType;
    rePort: RePortType;
    processConsumerTransports: ProcessConsumerTransportsType;
    resumePauseStreams: ResumePauseStreamsType;
    readjust: ReadjustType;
    addVideosGrid: AddVideosGridType;
    getEstimate: GetEstimateType;
    checkGrid: CheckGridType;
    resumePauseAudioStreams: ResumePauseAudioStreamsType;
    getUpdatedAllParams: () => DispStreamsParameters;
    [key: string]: any;
}
export interface DispStreamsOptions {
    lStreams: (Stream | Participant)[];
    ind: number;
    auto?: boolean;
    ChatSkip?: boolean;
    forChatCard?: any;
    forChatID?: any;
    parameters: DispStreamsParameters;
    breakRoom?: number;
    inBreakRoom?: boolean;
}
export type DispStreamsType = (options: DispStreamsOptions) => Promise<void>;
export declare class DispStreams {
    /**
     * Function to display streams based on various parameters and conditions.
     *
     * @param {Object} options - The options object.
     * @param {Array} options.lStreams - List of streams.
     * @param {number} options.ind - Index of the current stream.
     * @param {boolean} [options.auto=false] - Flag to indicate if the function should run automatically.
     * @param {boolean} [options.ChatSkip=false] - Flag to indicate if chat should be skipped.
     * @param {string|null} [options.forChatID=null] - ID for chat reference.
     * @param {Object} options.parameters - Parameters object containing various settings and functions.
     * @param {number} [options.breakRoom=-1] - Break room number.
     * @param {boolean} [options.inBreakRoom=false] - Flag to indicate if in break room.
     *
     * @returns {Promise<void>} - A promise that resolves when the function completes.
     *
     * @async
     */
    dispStreams: ({ lStreams, ind, auto, ChatSkip, forChatID, parameters, breakRoom, inBreakRoom, }: DispStreamsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DispStreams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DispStreams>;
}
