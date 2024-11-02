import { Injectable } from '@angular/core';
import { StreamSuccessScreenType, StreamSuccessScreenParameters, ShowAlert } from '../@types/types';
export interface StartShareScreenParameters extends StreamSuccessScreenParameters {
  shared: boolean;
  showAlert?: ShowAlert;
  updateShared: (shared: boolean) => void;
  onWeb: boolean;
  targetWidth?: number;
  targetHeight?: number;

  // mediasfu functions
  streamSuccessScreen: StreamSuccessScreenType;
  [key: string]: any;
}

export interface StartShareScreenOptions {
  parameters: StartShareScreenParameters;
}

// Export the type definition for the function
export type StartShareScreenType = (options: StartShareScreenOptions) => Promise<void>;
/**
 * StartShareScreen - Service to initiate screen sharing with configurable options for different environments.
 *
 * This service initiates the screen sharing process, handling both successful and failed attempts
 * and updating the shared state accordingly.
 *
 * @class
 * @name StartShareScreen
 * @example
 * ```typescript
 * const startShareScreenService = new StartShareScreen();
 * await startShareScreenService.startShareScreen({
 *   parameters: {
 *     shared: false,
 *     showAlert: (alert) => console.log(alert.message),
 *     updateShared: (shared) => console.log('Shared state:', shared),
 *     onWeb: true,
 *     targetWidth: 1920,
 *     targetHeight: 1080,
 *     streamSuccessScreen: async ({ stream }) => {
 *       // Handle the successful stream here
 *       console.log('Stream started:', stream);
 *     },
 *   },
 * });
 * ```
 *
 * @param {StartShareScreenOptions} options - The options for starting screen sharing.
 * @param {Object} options.parameters - The parameters controlling screen sharing behavior.
 * @param {boolean} options.parameters.shared - Indicates if the screen is currently shared.
 * @param {Function} options.parameters.showAlert - Function to display alerts.
 * @param {Function} options.parameters.updateShared - Function to update the shared state.
 * @param {boolean} options.parameters.onWeb - Indicates if the app is running in a web environment.
 * @param {number} [options.parameters.targetWidth=1280] - Optional width setting for shared screen resolution.
 * @param {number} [options.parameters.targetHeight=720] - Optional height setting for shared screen resolution.
 * @param {Function} options.parameters.streamSuccessScreen - Function to handle successful screen sharing.
 *
 * @method startShareScreen - Initiates the screen sharing process based on the provided parameters.
 * @returns {Promise<void>} Resolves when the screen sharing process is complete or fails.
 */


@Injectable({
  providedIn: 'root',
})
export class StartShareScreen {
  /**
   * Starts the screen sharing process.
   *
   * @param {StartShareScreenOptions} options - The options for starting screen sharing.
   * @param {Object} options.parameters - The parameters for screen sharing.
   * @param {boolean} options.parameters.shared - Indicates if the screen is currently being shared.
   * @param {Function} options.parameters.showAlert - Function to show alert messages.
   * @param {Function} options.parameters.updateShared - Function to update the shared state.
   * @param {boolean} options.parameters.onWeb - Indicates if the application is running on a web platform.
   * @param {number} [options.parameters.targetWidth] - The target width for screen sharing.
   * @param {number} [options.parameters.targetHeight] - The target height for screen sharing.
   * @param {Function} options.parameters.streamSuccessScreen - Function to handle successful screen sharing.
   *
   * @returns {Promise<void>} A promise that resolves when the screen sharing process is complete.
   *
   * @throws Will log an error message if there is an issue starting the screen share.
   */
  startShareScreen = async ({ parameters }: StartShareScreenOptions): Promise<void> => {
    // start screen share function
    // attempt to start screen share and return true if successful

    let {
      shared,
      showAlert,
      updateShared,
      onWeb,
      targetWidth = 1280,
      targetHeight = 720,
      streamSuccessScreen,
    } = parameters;

    try {
      if (!onWeb) {
        showAlert?.({
          message: 'You cannot share screen while on mobile',
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        shared = true;
        await navigator.mediaDevices
          .getDisplayMedia({
            video: {
              width: targetWidth,
              height: targetHeight,
              frameRate: 30,
            },
            audio: false,
          })
          .then(async (stream: MediaStream) => {
            await streamSuccessScreen({ stream, parameters });
          })
          .catch(async () => {
            shared = false;
            showAlert?.({
              message: 'Could not share screen, check and retry',
              type: 'danger',
              duration: 3000,
            });
          });
      } else {
        showAlert?.({
          message: 'Could not share screen, check and retry',
          type: 'danger',
          duration: 3000,
        });
      }

      // update the shared variable
      updateShared(shared);
    } catch (error) {
      console.log('Error starting screen share', error);
    }
  };
}
