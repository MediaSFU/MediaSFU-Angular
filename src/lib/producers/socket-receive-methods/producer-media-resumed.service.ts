import { Injectable } from '@angular/core';
import {
  Participant,
  PrepopulateUserMediaParameters,
  PrepopulateUserMediaType,
  ReorderStreamsParameters,
  ReorderStreamsType,
} from '../../@types/types';

export interface ProducerMediaResumedParameters
  extends PrepopulateUserMediaParameters,
    ReorderStreamsParameters {
  meetingDisplayType: string;
  participants: Participant[];
  shared: boolean;
  shareScreenStarted: boolean;
  mainScreenFilled: boolean;
  hostLabel: string;
  updateUpdateMainWindow: (updateMainWindow: boolean) => void;

  // mediasfu functions
  reorderStreams: ReorderStreamsType;
  prepopulateUserMedia: PrepopulateUserMediaType;

  getUpdatedAllParams: () => ProducerMediaResumedParameters;
  [key: string]: any;
}

export interface ProducerMediaResumedOptions {
  name: string;
  kind: 'audio';
  parameters: ProducerMediaResumedParameters;
}

// Export the type definition for the function
export type ProducerMediaResumedType = (options: ProducerMediaResumedOptions) => Promise<void>;

/**
 * Service to handle resuming media for a specific participant in a meeting.
 *
 * @class
 * @name ProducerMediaResumed
 * @description Resumes media (audio only) for a participant and updates the meeting display based on the meeting layout and participant status.
 *
 * @method
 * producerMediaResumed
 *
 * @param {ProducerMediaResumedOptions} options - Options to control media resumption:
 *   - `name` {string}: Name of the participant whose media is to be resumed.
 *   - `parameters` {ProducerMediaResumedParameters}: Meeting and participant-specific configurations.
 *      - `meetingDisplayType` {string}: Type of meeting display (e.g., "media").
 *      - `participants` {Participant[]}: List of participants in the meeting.
 *      - `shared` {boolean}: Indicates if the screen is currently shared.
 *      - `shareScreenStarted` {boolean}: Indicates if screen sharing has started.
 *      - `mainScreenFilled` {boolean}: Indicates if the main screen is filled.
 *      - `hostLabel` {string}: Label or name of the host.
 *      - `updateUpdateMainWindow` {Function}: Function to update the main window display.
 *      - `reorderStreams` {Function}: Function to manage stream ordering when display changes.
 *      - `prepopulateUserMedia` {Function}: Function to preload user media for the main screen.
 *
 * @returns {Promise<void>} Resolves when media for the specified participant has resumed.
 *
 * @example
 * const options = {
 *   name: 'Participant A',
 *   parameters: {
 *     meetingDisplayType: 'media',
 *     participants: [...],
 *     shared: false,
 *     shareScreenStarted: false,
 *     mainScreenFilled: false,
 *     hostLabel: 'Host',
 *     updateUpdateMainWindow: (updateMainWindow) => { ... },
 *     reorderStreams: ({ add, screenChanged, parameters }) => { ... },
 *     prepopulateUserMedia: ({ name, parameters }) => { ... }
 *   }
 * };
 *
 * producerMediaResumedService.producerMediaResumed(options)
 *   .then(() => console.log('Media resumed'))
 *   .catch(error => console.error('Error:', error));
 */


@Injectable({
  providedIn: 'root',
})
export class ProducerMediaResumed {
  /**
   * Resumes media for a specific participant in a meeting.
   *
   * @param {ProducerMediaResumedOptions} options - The options for resuming media.
   * @param {string} options.name - The name of the participant whose media is to be resumed.
   * @param {Object} options.parameters - The parameters related to the meeting and participants.
   * @param {string} options.parameters.meetingDisplayType - The type of meeting display.
   * @param {Array} options.parameters.participants - The list of participants in the meeting.
   * @param {boolean} options.parameters.shared - Indicates if the screen is being shared.
   * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
   * @param {boolean} options.parameters.mainScreenFilled - Indicates if the main screen is filled.
   * @param {string} options.parameters.hostLabel - The label of the host.
   * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
   * @param {Function} options.parameters.reorderStreams - Function to reorder the streams.
   * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
   *
   * @returns {Promise<void>} A promise that resolves when the media has been resumed.
   */
  producerMediaResumed = async ({
    name,
    parameters,
  }: ProducerMediaResumedOptions): Promise<void> => {
    parameters = parameters.getUpdatedAllParams();

    let {
      meetingDisplayType,
      participants,
      shared,
      shareScreenStarted,
      updateMainWindow,
      mainScreenFilled,
      hostLabel,
      updateUpdateMainWindow,
      reorderStreams,
      prepopulateUserMedia,
    } = parameters;

    // Update to resume the audio only of a participant
    // name is the name of the participant
    // kind is the kind of media (always audio)

    // Operations to update UI to optimize interest levels
    const participant = participants.find((obj: any) => obj.name == name);

    if (!mainScreenFilled && participant?.islevel == '2') {
      updateMainWindow = true;
      updateUpdateMainWindow(updateMainWindow);
      await prepopulateUserMedia({ name: hostLabel, parameters });
      updateMainWindow = false;
      updateUpdateMainWindow(updateMainWindow);
    }

    let checker;
    if (meetingDisplayType == 'media') {
      checker = participant?.videoID != null && participant.videoID !== '';

      if (!checker && !(shareScreenStarted || shared)) {
        await reorderStreams({ add: false, screenChanged: true, parameters });
      }
    }
  };
}
