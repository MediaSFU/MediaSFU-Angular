import { Injectable } from '@angular/core';
import { Stream, Participant, Transport, SleepType } from '../@types/types';

export interface ProcessConsumerTransportsParameters {
  remoteScreenStream: Stream[];
  oldAllStreams: (Stream | Participant)[];
  newLimitedStreams: (Stream | Participant)[];

  // mediasfu functions
  sleep: SleepType;
  getUpdatedAllParams: () => ProcessConsumerTransportsParameters;
  [key: string]: any;
}

export interface ProcessConsumerTransportsOptions {
  consumerTransports: Transport[];
  lStreams_: (Stream | Participant)[];
  parameters: ProcessConsumerTransportsParameters;
}

// Export the type definition for the function
export type ProcessConsumerTransportsType = (
  options: ProcessConsumerTransportsOptions,
) => Promise<void>;

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

@Injectable({
  providedIn: 'root',
})
export class ProcessConsumerTransports {
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
  processConsumerTransports = async ({
    consumerTransports,
    lStreams_,
    parameters,
  }: ProcessConsumerTransportsOptions): Promise<void> => {
    try {
      // Destructure parameters
      let { getUpdatedAllParams } = parameters;
      parameters = getUpdatedAllParams();

      const {
        remoteScreenStream,
        oldAllStreams,
        newLimitedStreams,
        // mediasfu functions
        sleep,
      } = parameters;

      // Function to check if the producerId is valid in the given stream arrays
      const isValidProducerId = (
        producerId: string,
        ...streamArrays: (Stream | Participant)[][]
      ): boolean => {
        return (
          producerId !== null &&
          producerId !== '' &&
          streamArrays.some((streamArray) => {
            return (
              streamArray.length > 0 &&
              streamArray.some((stream) => stream?.producerId === producerId)
            );
          })
        );
      };

      // Get paused consumer transports that are not audio
      const consumerTransportsToResume = consumerTransports.filter(
        (transport) =>
          isValidProducerId(
            transport.producerId,
            lStreams_,
            remoteScreenStream,
            oldAllStreams,
            newLimitedStreams,
          ) &&
          transport.consumer?.paused === true &&
          transport.consumer.kind !== 'audio',
      );

      // Get unpaused consumer transports that are not audio
      const consumerTransportsToPause = consumerTransports.filter(
        (transport) =>
          transport.producerId &&
          transport.producerId !== null &&
          transport.producerId !== '' &&
          !lStreams_.some((stream) => stream.producerId === transport.producerId) &&
          transport.consumer &&
          transport.consumer.kind &&
          transport.consumer.paused !== true &&
          transport.consumer.kind !== 'audio' &&
          !remoteScreenStream.some((stream: any) => stream.producerId === transport.producerId) &&
          !oldAllStreams.some((stream: any) => stream.producerId === transport.producerId) &&
          !newLimitedStreams.some((stream: any) => stream.producerId === transport.producerId),
      );

      // Pause consumer transports after a short delay
      await sleep({ ms: 100 });

      // Emit consumer.pause() for each filtered transport (not audio)
      for (const transport of consumerTransportsToPause) {
        transport.consumer.pause();
        transport.socket_.emit(
          'consumer-pause',
          { serverConsumerId: transport.serverConsumerTransportId },
          async () => {
            // Handle the response if needed
          },
        );
      }

      // Emit consumer.resume() for each filtered transport (not audio)
      for (const transport of consumerTransportsToResume) {
        transport.socket_.emit(
          'consumer-resume',
          { serverConsumerId: transport.serverConsumerTransportId },
          async ({ resumed }: { resumed: boolean }) => {
            if (resumed) {
              transport.consumer.resume();
            }
          },
        );
      }
    } catch (error: any) {
      // Handle errors during the process of pausing or resuming consumer transports
      console.log(`Error processing consumer transports: ${error.message}`);
      // throw new Error(`Error processing consumer transports: ${error.message}`);
    }
  };
}
