import { Participant, Transport, Stream } from '../@types/types';
import * as i0 from "@angular/core";
export interface ResumePauseStreamsParameters {
    participants: Participant[];
    dispActiveNames: string[];
    remoteScreenStream: Stream[];
    consumerTransports: Transport[];
    screenId?: string;
    islevel: string;
    getUpdatedAllParams: () => ResumePauseStreamsParameters;
    [key: string]: any;
}
export interface ResumePauseStreamsOptions {
    parameters: ResumePauseStreamsParameters;
}
export type ResumePauseStreamsType = (options: ResumePauseStreamsOptions) => Promise<void>;
export declare class ResumePauseStreams {
    /**
     * Resumes or pauses streams based on the provided parameters.
     *
     * @param {ResumePauseStreamsOptions} options - The options for resuming or pausing streams.
     * @param {Object} options.parameters - The parameters for the function.
     * @param {Array} options.parameters.participants - The list of participants.
     * @param {Array} options.parameters.dispActiveNames - The list of active display names.
     * @param {Array} options.parameters.consumerTransports - The list of consumer transports.
     * @param {string} options.parameters.screenId - The screen producer ID.
     * @param {string} options.parameters.islevel - The level of the user.
     *
     * @returns {Promise<void>} A promise that resolves when the streams have been resumed or paused.
     *
     * @throws Will throw an error if there is an issue during the process of resuming or pausing streams.
     */
    resumePauseStreams: ({ parameters }: ResumePauseStreamsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResumePauseStreams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResumePauseStreams>;
}
