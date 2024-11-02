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
/**
 * Resumes or pauses audio streams based on the provided options.
 *
 * This method checks the current state of participants in breakout rooms and
 * updates the audio streams accordingly. It can add or remove audio streams
 * based on the participant's current status (in a breakout room or not)
 * and the event type (e.g., conference, webinar).
 *
 * @param {ResumePauseAudioStreamsOptions} options - The options for resuming or pausing audio streams.
 * @param {number} [options.breakRoom=-1] - The ID of the break room. Defaults to -1 if not specified.
 * @param {boolean} [options.inBreakRoom=false] - Indicates if the participant is in a break room. Defaults to false.
 * @param {ResumePauseAudioStreamsParameters} options.parameters - The parameters required for processing audio streams.
 * @param {Array<BreakoutParticipant[]>} options.parameters.breakoutRooms - Array of breakout rooms.
 * @param {Array<Participant>} options.parameters.ref_participants - Array of reference participants.
 * @param {Array<Stream | Participant>} options.parameters.allAudioStreams - Array of all audio streams.
 * @param {Array<Participant>} options.parameters.participants - Array of participants.
 * @param {string} options.parameters.islevel - The level of the participant.
 * @param {EventType} options.parameters.eventType - The type of event (e.g., conference, webinar).
 * @param {Array<Transport>} options.parameters.consumerTransports - Array of consumer transports.
 * @param {Array<BreakoutParticipant>} options.parameters.limitedBreakRoom - Array of participants in the limited break room.
 * @param {number} options.parameters.hostNewRoom - The ID of the host's new room.
 * @param {string} options.parameters.member - The name of the member.
 * @param {Function} options.parameters.updateLimitedBreakRoom - Function to update the limited break room.
 * @param {Function} options.parameters.processConsumerTransportsAudio - Function to process audio transports.
 *
 * @returns {Promise<void>} A promise that resolves when the audio streams have been processed.
 *
 * @throws Will log an error message if there is an issue processing the audio streams.
 *
 * @example
 * ```typescript
 * await resumePauseAudioStreams({
 *   breakRoom: 1,
 *   inBreakRoom: true,
 *   parameters: {
 *     breakoutRooms: [],
 *     ref_participants: [],
 *     allAudioStreams: [],
 *     participants: [],
 *     islevel: '1',
 *     eventType: 'conference',
 *     consumerTransports: [],
 *     limitedBreakRoom: [],
 *     hostNewRoom: 2,
 *     member: 'JohnDoe',
 *     updateLimitedBreakRoom: myUpdateFunction,
 *     processConsumerTransportsAudio: myProcessFunction,
 *   },
 * });
 * ```
 */
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
