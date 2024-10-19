import { Participant, Stream, ProcessConsumerTransportsAudioType, ProcessConsumerTransportsAudioParameters, Transport, BreakoutParticipant, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ResumePauseAudioStreamsParameters extends ProcessConsumerTransportsAudioParameters {
    breakoutRooms: BreakoutParticipant[][];
    ref_participants: Participant[];
    allAudioStreams: (Stream | Participant)[];
    participants: Participant[];
    islevel: string;
    eventType: EventType;
    consumerTransports: Transport[];
    limitedBreakRoom: BreakoutParticipant[];
    hostNewRoom: number;
    member: string;
    updateLimitedBreakRoom: (limitedBreakRoom: BreakoutParticipant[]) => void;
    processConsumerTransportsAudio: ProcessConsumerTransportsAudioType;
    getUpdatedAllParams: () => ResumePauseAudioStreamsParameters;
    [key: string]: any;
}
export interface ResumePauseAudioStreamsOptions {
    breakRoom?: number;
    inBreakRoom?: boolean;
    parameters: ResumePauseAudioStreamsParameters;
}
export type ResumePauseAudioStreamsType = (options: ResumePauseAudioStreamsOptions) => Promise<void>;
export declare class ResumePauseAudioStreams {
    /**
     * Resumes or pauses audio streams based on the provided options.
     *
     * @param {ResumePauseAudioStreamsOptions} options - The options for resuming or pausing audio streams.
     * @param {number} [options.breakRoom=-1] - The ID of the break room.
     * @param {boolean} [options.inBreakRoom=false] - Indicates if the participant is in a break room.
     * @param {Parameters} options.parameters - The parameters required for processing audio streams.
     *
     * @returns {Promise<void>} A promise that resolves when the audio streams have been processed.
     *
     * @throws Will log an error message if there is an issue processing the audio streams.
     */
    resumePauseAudioStreams: ({ breakRoom, inBreakRoom, parameters, }: ResumePauseAudioStreamsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResumePauseAudioStreams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResumePauseAudioStreams>;
}
