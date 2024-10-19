import { Injectable } from '@angular/core';
import { Stream, Transport, Participant, SleepType } from '../@types/types';

export interface ProcessConsumerTransportsAudioParameters {
  // mediasfu functions
  sleep: SleepType;
  [key: string]: any;
}

export interface ProcessConsumerTransportsAudioOptions {
  consumerTransports: Transport[];
  lStreams: (Stream | Participant)[];
  parameters: ProcessConsumerTransportsAudioParameters;
}

// Export the type definition for the function
export type ProcessConsumerTransportsAudioType = (
  options: ProcessConsumerTransportsAudioOptions,
) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ProcessConsumerTransportsAudio {
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
  processConsumerTransportsAudio = async ({
    consumerTransports,
    lStreams,
    parameters,
  }: ProcessConsumerTransportsAudioOptions): Promise<void> => {
    try {
      const { sleep } = parameters;

      // Function to check if the producerId is valid
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

      // Get paused consumer transports that are audio
      const consumerTransportsToResume = consumerTransports.filter(
        (transport) =>
          isValidProducerId(transport.producerId, lStreams) &&
          transport.consumer?.paused === true &&
          transport.consumer.kind === 'audio',
      );

      // Get unpaused consumer transports that are audio
      const consumerTransportsToPause = consumerTransports.filter(
        (transport) =>
          transport.producerId &&
          transport.producerId !== null &&
          transport.producerId !== '' &&
          !lStreams.some((stream) => stream.producerId === transport.producerId) &&
          transport.consumer &&
          transport.consumer.kind &&
          transport.consumer.paused !== true &&
          transport.consumer.kind === 'audio',
      );

      await sleep({ ms: 100 });

      // Emit consumer.pause() for each transport to pause
      for (const transport of consumerTransportsToPause) {
        transport.consumer.pause();
        transport.socket_.emit(
          'consumer-pause',
          { serverConsumerId: transport.serverConsumerTransportId },
          async () => {
            // Do something after the consumer is paused
          },
        );
      }

      // Emit consumer.resume() for each transport to resume
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
      console.log(`Error in processConsumerTransportsAudio: ${error.message}`);
    }
  };
}
