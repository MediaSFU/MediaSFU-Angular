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
