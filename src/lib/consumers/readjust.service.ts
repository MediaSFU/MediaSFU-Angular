import { Injectable } from '@angular/core';
import {
  PrepopulateUserMediaType,
  PrepopulateUserMediaParameters,
  EventType,
} from '../@types/types';
export interface ReadjustParameters extends PrepopulateUserMediaParameters {
  eventType: EventType;
  shareScreenStarted: boolean;
  shared: boolean;
  mainHeightWidth: number;
  prevMainHeightWidth: number;
  hostLabel: string;
  first_round: boolean;
  lock_screen: boolean;
  updateMainHeightWidth: (value: number) => void;

  // mediasfu functions
  prepopulateUserMedia: PrepopulateUserMediaType;
  getUpdatedAllParams: () => ReadjustParameters;
  [key: string]: any;
}

export interface ReadjustOptions {
  n: number;
  state: number;
  parameters: ReadjustParameters;
}

// Export the type definition for the function
export type ReadjustType = (options: ReadjustOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class Readjust {
  /**
   * Adjusts the layout parameters based on the provided options.
   *
   * @param {ReadjustOptions} options - The options for readjusting the layout.
   * @param {number} options.n - The number of participants or elements.
   * @param {number} options.state - The current state of the layout.
   * @param {object} options.parameters - The parameters for the layout adjustment.
   * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
   * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
   * @param {boolean} options.parameters.shared - Indicates if content is being shared.
   * @param {number} options.parameters.mainHeightWidth - The main height and width value.
   * @param {number} options.parameters.prevMainHeightWidth - The previous main height and width value.
   * @param {string} options.parameters.hostLabel - The label for the host.
   * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
   * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
   * @param {function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
   * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
   * @returns {Promise<void>} A promise that resolves when the layout adjustment is complete.
   * @throws {Error} Throws an error if there is an issue updating the grid sizes.
   */
  readjust = async ({ n, state, parameters }: ReadjustOptions): Promise<void> => {
    let { getUpdatedAllParams, prepopulateUserMedia } = parameters;
    parameters = getUpdatedAllParams();

    try {
      // Destructure parameters
      let {
        eventType,
        shareScreenStarted,
        shared,
        mainHeightWidth,
        prevMainHeightWidth,
        hostLabel,
        first_round,
        lock_screen,
        updateMainHeightWidth,
      } = parameters;

      if (state == 0) {
        prevMainHeightWidth = mainHeightWidth;
      }

      let val1 = 6;
      let val2 = 12 - val1;
      let cal1 = Math.floor((val1 / 12) * 100);
      let cal2 = 100 - cal1;

      if (eventType == 'broadcast') {
        val1 = 0;
        val2 = 12 - val1;

        if (n == 0) {
          val1 = 0;
          val2 = 12 - val1;
        }
      } else if (
        eventType == 'chat' ||
        (eventType == 'conference' && !(shareScreenStarted || shared))
      ) {
        val1 = 12;
        val2 = 12 - val1;
      } else {
        if (shareScreenStarted || shared) {
          val2 = 10;
          val1 = 12 - val2;
        } else {
          if (n == 0) {
            val1 = 1;
            val2 = 12 - val1;
          } else if (n >= 1 && n < 4) {
            val1 = 4;
            val2 = 12 - val1;
          } else if (n >= 4 && n < 6) {
            val1 = 6;
            val2 = 12 - val1;
          } else if (n >= 6 && n < 9) {
            val1 = 6;
            val2 = 12 - val1;
          } else if (n >= 9 && n < 12) {
            val1 = 6;
            val2 = 12 - val1;
          } else if (n >= 12 && n < 20) {
            val1 = 8;
            val2 = 12 - val1;
          } else if (n >= 20 && n < 50) {
            val1 = 8;
            val2 = 12 - val1;
          } else {
            val1 = 10;
            val2 = 12 - val1;
          }
        }
      }

      if (state == 0) {
        mainHeightWidth = val2;
      }

      cal1 = Math.floor((val1 / 12) * 100);
      cal2 = 100 - cal1;

      updateMainHeightWidth(cal2);

      if (prevMainHeightWidth != mainHeightWidth) {
        if (!lock_screen && !shared) {
          await prepopulateUserMedia({ name: hostLabel, parameters });
        } else {
          if (!first_round) {
            await prepopulateUserMedia({ name: hostLabel, parameters });
          }
        }
      }
    } catch (error: any) {
      // Handle errors during the process of updating grid sizes
      console.log('Error updating grid sizes:', error.message);
      // throw error;
    }
  };
}
