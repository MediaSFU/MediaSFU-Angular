import { Injectable } from '@angular/core';
import { Participant, Transport, Stream } from '../@types/types';

export interface ResumePauseStreamsParameters {
  participants: Participant[];
  dispActiveNames: string[];
  remoteScreenStream: Stream[];
  consumerTransports: Transport[];
  screenId?: string;
  islevel: string;

  // mediasfu functions
  getUpdatedAllParams: () => ResumePauseStreamsParameters;
  [key: string]: any;
}

export interface ResumePauseStreamsOptions {
  parameters: ResumePauseStreamsParameters;
}

// Export the type definition for the function
export type ResumePauseStreamsType = (options: ResumePauseStreamsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ResumePauseStreams {
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
  resumePauseStreams = async ({ parameters }: ResumePauseStreamsOptions): Promise<void> => {
    try {
      // Destructure parameters
      parameters = parameters.getUpdatedAllParams();
      let { participants, dispActiveNames, consumerTransports, screenId, islevel } = parameters;

      // Get the videoID of the host (islevel=2)
      let host = participants.find((obj: any) => obj.islevel === '2');
      let hostVideoID = host ? host.videoID : null;

      // Get videoIDs of participants in dispActiveNames and screenproducerId
      let videosIDs = dispActiveNames.map((name: any) => {
        let participant = participants.find((obj: any) => obj.name === name);
        return participant ? participant.videoID : null;
      });

      // Add screenproducerId to allVideoIDs if it's not null or empty
      if (screenId) {
        videosIDs.push(screenId);
      }

      // Add hostVideoID to allVideoIDs if it's not null or empty (only if the user is not the host)
      if (islevel !== '2' && hostVideoID) {
        videosIDs.push(hostVideoID);
      }

      // Remove null or empty videoIDs
      let allVideoIDs = videosIDs.filter(
        (videoID: string | null) => videoID !== null && videoID !== '',
      );

      if (allVideoIDs.length > 0) {
        // Get consumer transports with producerId in allVideoIDs
        const consumerTransportsToResume = consumerTransports.filter(
          (transport: any) =>
            allVideoIDs.includes(transport.producerId) && transport.consumer.kind !== 'audio',
        );

        // Resume all consumerTransportsToResume
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
      }
    } catch (error) {
      console.log('Error during resuming or pausing streams: ', error);
      // Handle errors during the process of resuming or pausing streams
      // throw new Error(`Error during resuming or pausing streams: ${error.message}`);
    }
  };
}
