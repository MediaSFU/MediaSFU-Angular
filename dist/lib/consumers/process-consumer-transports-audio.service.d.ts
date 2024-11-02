import { Stream, Transport, Participant, SleepType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ProcessConsumerTransportsAudioParameters {
    sleep: SleepType;
    [key: string]: any;
}
export interface ProcessConsumerTransportsAudioOptions {
    consumerTransports: Transport[];
    lStreams: (Stream | Participant)[];
    parameters: ProcessConsumerTransportsAudioParameters;
}
export type ProcessConsumerTransportsAudioType = (options: ProcessConsumerTransportsAudioOptions) => Promise<void>;
/**
 * Processes consumer transports for audio streams by pausing and resuming them based on their current state and the provided streams.
 *
 * This method checks the state of each audio consumer transport and either pauses or resumes it depending on the presence of its producer ID in the provided list of streams.
 * It uses a sleep function to introduce a delay between the pause and resume operations to ensure smooth transitions.
 *
 * @param {ProcessConsumerTransportsAudioOptions} options - The options for processing consumer transports.
 * @param {Array<Transport>} options.consumerTransports - The list of consumer transports to process.
 * @param {Array<(Stream | Participant)>} options.lStreams - The list of local streams to check against.
 * @param {ProcessConsumerTransportsAudioParameters} options.parameters - Additional parameters for processing.
 * @param {Function} options.parameters.sleep - A function to pause execution for a specified duration.
 *
 * @returns {Promise<void>} A promise that resolves when the processing is complete.
 *
 * @throws {Error} Will throw an error if there is an issue processing the consumer transports.
 *
 * @example
 * ```typescript
 * const options = {
 *   consumerTransports: [,
 *   lStreams: [],
 *   parameters: {
 *     sleep: async ({ ms }) => new Promise(resolve => setTimeout(resolve, ms)),
 *   },
 * };
 *
 * await processConsumerTransportsAudio(options);
 * ```
 */
export declare class ProcessConsumerTransportsAudio {
    /**
     * Processes consumer transports for audio streams by pausing and resuming them based on their current state and the provided streams.
     *
     * @param {Object} options - The options for processing consumer transports.
     * @param {Array} options.consumerTransports - The list of consumer transports to process.
     * @param {Array} options.lStreams - The list of local streams to check against.
     * @param {Object} options.parameters - Additional parameters for processing.
     * @param {Function} options.parameters.sleep - A function to pause execution for a specified duration.
     *
     * @returns {Promise<void>} A promise that resolves when the processing is complete.
     *
     * @throws Will throw an error if there is an issue processing the consumer transports.
     */
    processConsumerTransportsAudio: ({ consumerTransports, lStreams, parameters, }: ProcessConsumerTransportsAudioOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessConsumerTransportsAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProcessConsumerTransportsAudio>;
}
