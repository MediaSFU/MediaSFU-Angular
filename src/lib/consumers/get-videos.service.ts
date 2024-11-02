import { Injectable } from '@angular/core';
import { Stream, Participant } from '../@types/types';
export interface GetVideosOptions {
  participants: Participant[];
  allVideoStreams: (Stream | Participant)[];
  oldAllStreams: (Stream | Participant)[];
  adminVidID?: string;
  updateAllVideoStreams: (streams: (Stream | Participant)[]) => void;
  updateOldAllStreams: (streams: (Stream | Participant)[]) => void;
}

// Export the type definition for the function
export type GetVideosType = (options: GetVideosOptions) => Promise<void>;

/**
 * Asynchronously processes and updates video streams by filtering out the admin's video stream.
 *
 * @param {GetVideosOptions} options - The options for getting videos.
 * @param {Participant[]} options.participants - The list of participants.
 * @param {Stream[]} options.allVideoStreams - The list of all video streams.
 * @param {(Stream | Participant)[]} options.oldAllStreams - The list of old video streams.
 * @param {string} [options.adminVidID] - The ID of the admin's video stream.
 * @param {Function} options.updateAllVideoStreams - Function to update the state variable for all video streams.
 * @param {Function} options.updateOldAllStreams - Function to update the state variable for old video streams.
 * @returns {Promise<void>} A promise that resolves when the video streams have been processed and updated.
 *
 * @throws {Error} If an error occurs during the process of updating video streams.
 *
 * @example
 * ```typescript
 * const options = {
 *   participants: participantList,
 *   allVideoStreams: currentVideoStreams,
 *   oldAllStreams: previousVideoStreams,
 *   updateAllVideoStreams: (streams) => {
 *     console.log('Updated all video streams:', streams);
 *   },
 *   updateOldAllStreams: (streams) => {
 *     console.log('Updated old video streams:', streams);
 *   },
 * };
 *
 * const getVideosService = new GetVideos();
 * await getVideosService.getVideos(options);
 * console.log('Video streams processed successfully.');
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class GetVideos {
  /**
   * Asynchronously processes and updates video streams by filtering out the admin's video stream.
   *
   * @param {GetVideosOptions} options - The options for getting videos.
   * @param {Participant[]} options.participants - The list of participants.
   * @param {Stream[]} options.allVideoStreams - The list of all video streams.
   * @param {(Stream | Participant)[]} options.oldAllStreams - The list of old video streams.
   * @param {string} options.adminVidID - The ID of the admin's video stream.
   * @param {Function} options.updateAllVideoStreams - Function to update the state variable for all video streams.
   * @param {Function} options.updateOldAllStreams - Function to update the state variable for old video streams.
   * @returns {Promise<void>} A promise that resolves when the video streams have been processed and updated.
   */

  async getVideos({
    participants,
    allVideoStreams,
    oldAllStreams,
    adminVidID,
    updateAllVideoStreams,
    updateOldAllStreams,
  }: GetVideosOptions): Promise<void> {
    try {
      // Filter out the admin's video stream and update state variables
      let admin = participants.filter((participant: any) => participant.islevel === '2');

      if (admin.length > 0) {
        adminVidID = admin[0].videoID;

        if (adminVidID != null && adminVidID !== '') {
          let oldAllStreams_: any[] = [];

          // Check if the length of oldAllStreams is greater than 0
          if (oldAllStreams.length > 0) {
            oldAllStreams_ = oldAllStreams;
          }

          // Filter out admin's video stream from oldAllStreams
          oldAllStreams = allVideoStreams.filter(
            (streame: any) => streame.producerId === adminVidID,
          );

          // If no admin's video stream found, revert to the previous state
          if (oldAllStreams.length < 1) {
            oldAllStreams = oldAllStreams_;
          }

          // Update the state variable for old video streams
          updateOldAllStreams(oldAllStreams);

          // Filter out admin's video stream from allVideoStreams
          allVideoStreams = allVideoStreams.filter(
            (streame: any) => streame.producerId !== adminVidID,
          );

          // Update the state variable for all video streams
          updateAllVideoStreams(allVideoStreams);
        }
      }
    } catch (error: any) {
      // Handle errors during the process of updating video streams
      console.log('Error updating video streams:', error.message);
      // throw error;
    }
  }
}
