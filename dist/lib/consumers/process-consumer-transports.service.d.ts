import { Stream, Participant, Transport, SleepType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ProcessConsumerTransportsParameters {
    remoteScreenStream: Stream[];
    oldAllStreams: (Stream | Participant)[];
    newLimitedStreams: (Stream | Participant)[];
    sleep: SleepType;
    getUpdatedAllParams: () => ProcessConsumerTransportsParameters;
    [key: string]: any;
}
export interface ProcessConsumerTransportsOptions {
    consumerTransports: Transport[];
    lStreams_: (Stream | Participant)[];
    parameters: ProcessConsumerTransportsParameters;
}
export type ProcessConsumerTransportsType = (options: ProcessConsumerTransportsOptions) => Promise<void>;
/**
 * Processes consumer transports by pausing and resuming them based on certain conditions.
 *
 * This method checks the state of each consumer transport and determines whether to pause or resume
 * based on the validity of the producer ID in relation to the provided streams.
 * It utilizes a sleep function to introduce a delay before pausing the transports.
 *
 * @param {ProcessConsumerTransportsOptions} options - The options for processing consumer transports.
 * @param {Array<Transport>} options.consumerTransports - The list of consumer transports to process.
 * @param {Array<Stream | Participant>} options.lStreams_ - The list of local streams.
 * @param {ProcessConsumerTransportsParameters} options.parameters - The parameters for processing, including:
 *   - {Array<Stream>} options.parameters.remoteScreenStream - The list of remote screen streams.
 *   - {Array<Stream | Participant>} options.parameters.oldAllStreams - The list of old streams.
 *   - {Array<Stream | Participant>} options.parameters.newLimitedStreams - The list of new limited streams.
 *   - {Function} options.parameters.sleep - A function to pause execution for a specified duration.
 *   - {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 *
 * @returns {Promise<void>} A promise that resolves when the processing is complete.
 *
 * @throws {Error} Will throw an error if there is an issue processing consumer transports.
 *
 * @example
 * ```typescript
 * const options = {
 *   consumerTransports: [],
 *   lStreams_: [],
 *   parameters: {
 *     remoteScreenStream: [],
 *     oldAllStreams: [],
 *     newLimitedStreams: [],
 *     sleep: async ({ ms }) => new Promise(resolve => setTimeout(resolve, ms)),
 *   },
 * };
 *
 * await processConsumerTransports(options);
 * ```
 */
export declare class ProcessConsumerTransports {
    /**
     * Processes consumer transports by pausing and resuming them based on certain conditions.
     *
     * @param {Object} options - The options for processing consumer transports.
     * @param {Array} options.consumerTransports - The list of consumer transports to process.
     * @param {Array} options.lStreams_ - The list of local streams.
     * @param {Object} options.parameters - The parameters object containing various stream arrays and utility functions.
     *
     * @returns {Promise<void>} - A promise that resolves when the processing is complete.
     *
     * @throws {Error} - Throws an error if there is an issue processing consumer transports.
     *
     * The function performs the following steps:
     * 1. Destructures and updates the parameters.
     * 2. Defines a helper function to check if a producerId is valid in given stream arrays.
     * 3. Filters consumer transports to resume based on certain conditions.
     * 4. Filters consumer transports to pause based on certain conditions.
     * 5. Pauses consumer transports after a short delay.
     * 6. Emits `consumer-pause` event for each filtered transport (not audio).
     * 7. Emits `consumer-resume` event for each filtered transport (not audio).
     */
    processConsumerTransports: ({ consumerTransports, lStreams_, parameters, }: ProcessConsumerTransportsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessConsumerTransports, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProcessConsumerTransports>;
}
