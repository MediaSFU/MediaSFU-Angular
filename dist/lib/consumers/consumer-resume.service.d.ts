import { Socket } from 'socket.io-client';
import { ReorderStreamsType, ReorderStreamsParameters, Participant, PrepopulateUserMediaType, PrepopulateUserMediaParameters, Stream, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ConsumerResumeParameters extends ReorderStreamsParameters, PrepopulateUserMediaParameters {
    nStream: MediaStream | null;
    allAudioStreams: (Stream | Participant)[];
    allVideoStreams: (Stream | Participant)[];
    streamNames: Stream[];
    audStreamNames: Stream[];
    updateMainWindow: boolean;
    shared: boolean;
    shareScreenStarted: boolean;
    screenId?: string;
    participants: Array<Participant>;
    eventType: EventType;
    meetingDisplayType: string;
    mainScreenFilled: boolean;
    first_round: boolean;
    lock_screen: boolean;
    oldAllStreams: (Stream | Participant)[];
    adminVidID?: string;
    mainHeightWidth: number;
    member: string;
    audioOnlyStreams: Array<any>;
    gotAllVids: boolean;
    defer_receive: boolean;
    firstAll: boolean;
    remoteScreenStream: Stream[];
    hostLabel: string;
    whiteboardStarted: boolean;
    whiteboardEnded: boolean;
    updateUpdateMainWindow: (value: boolean) => void;
    updateAllAudioStreams: (value: (Stream | Participant)[]) => void;
    updateAllVideoStreams: (value: (Stream | Participant)[]) => void;
    updateStreamNames: (value: Stream[]) => void;
    updateAudStreamNames: (value: Stream[]) => void;
    updateNStream: (value: MediaStream | null) => void;
    updateMainHeightWidth: (value: number) => void;
    updateLock_screen: (value: boolean) => void;
    updateFirstAll: (value: boolean) => void;
    updateRemoteScreenStream: (value: Stream[]) => void;
    updateOldAllStreams: (value: (Stream | Participant)[]) => void;
    updateAudioOnlyStreams: (value: Array<any>) => void;
    updateShareScreenStarted: (value: boolean) => void;
    updateGotAllVids: (value: boolean) => void;
    updateScreenId: (value: string) => void;
    updateDefer_receive: (value: boolean) => void;
    reorderStreams: ReorderStreamsType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    getUpdatedAllParams: () => ConsumerResumeParameters;
    [key: string]: any;
}
interface ResumeParams {
    id: string;
    producerId: string;
    kind: string;
    rtpParameters: any;
}
export interface ConsumerResumeOptions {
    track: MediaStreamTrack;
    kind: string;
    remoteProducerId: string;
    params: ResumeParams;
    parameters: ConsumerResumeParameters;
    nsock: Socket;
}
export type ConsumerResumeType = (options: ConsumerResumeOptions) => Promise<void>;
/**
 * Resumes a consumer, making it ready for use.
 *
 * @param {ConsumerResumeOptions} options - The options for resuming the consumer.
 * @param {MediaStreamTrack} options.track - The media stream track associated with the resumed consumer.
 * @param {string} options.kind - The type of media ('audio' or 'video') being resumed.
 * @param {string} options.remoteProducerId - The ID of the remote producer associated with the resumed consumer.
 * @param {ResumeParams} options.params - Additional parameters related to the resumed consumer.
 * @param {ConsumerResumeParameters} options.parameters - The parameters object containing various utility functions and state.
 * @param {Socket} options.nsock - The socket associated with the consumer.
 * @throws Will throw an error if an issue occurs during the consumer resumption.
 *
 * @example
 * ```typescript
 * const options = {
 *   track: mediaStreamTrack, // MediaStreamTrack to be resumed
 *   remoteProducerId: 'producer-id', // Remote producer ID
 *   params: {
 *     id: 'consumer-id',
 *     producerId: 'producer-id',
 *     kind: 'audio',
 *     rtpParameters: {},
 *   },
 *   parameters: consumerResumeParameters, // Parameters for the consumer
 *   nsock: socket, // Socket for communication
 * };
 *
 * consumerResume(options)
 *   .then(() => {
 *     console.log('Consumer resumed successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error resuming consumer:', error);
 *   });
 * ```
 */
export declare class ConsumerResume {
    /**
     * Resumes a consumer, making it ready for use.
     *
     * @param {Object} options - The options object.
     * @param {MediaStreamTrack} options.track - The media stream track associated with the resumed consumer.
     * @param {string} options.kind - The type of media ('audio' or 'video') being resumed.
     * @param {string} options.remoteProducerId - The ID of the remote producer associated with the resumed consumer.
     * @param {Object} options.params - Additional parameters related to the resumed consumer.
     * @param {Object} options.parameters - The parameters object containing various utility functions and state.
     * @param {Object} options.nsock - The socket associated with the consumer.
     * @throws Throws an error if an issue occurs during the consumer resumption.
     */
    consumerResume: ({ track, remoteProducerId, params, parameters, nsock, }: ConsumerResumeOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsumerResume, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConsumerResume>;
}
export {};
