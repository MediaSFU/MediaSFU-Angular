import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { ShowAlert, StartShareScreenType, StartShareScreenParameters } from '../@types/types';

export interface RequestScreenShareParameters extends StartShareScreenParameters {
  socket: Socket;
  showAlert?: ShowAlert;
  localUIMode: boolean;
  targetResolution?: string;
  targetResolutionHost?: string;

  // mediasfu functions
  startShareScreen: StartShareScreenType;
  getUpdatedAllParams: () => RequestScreenShareParameters;
  [key: string]: any;
}

export interface RequestScreenShareOptions {
  parameters: RequestScreenShareParameters;
}

// Export the type definition for the function
export type RequestScreenShareType = (options: RequestScreenShareOptions) => Promise<void>;

/**
 * Requests to start screen sharing.
 *
 * This method initiates a screen sharing request and handles the response
 * from the server to determine if screen sharing is allowed. It also configures
 * the target resolution for the screen share based on the user's input and
 * parameters.
 *
 * @param {RequestScreenShareOptions} options - The options for requesting screen share.
 * @param {Object} options.parameters - The parameters for the screen share request.
 * @param {Socket} options.parameters.socket - The socket instance to communicate with the server.
 * @param {Function} [options.parameters.showAlert] - Optional function to show alerts to the user.
 * @param {boolean} options.parameters.localUIMode - Indicates if the user is in local UI mode.
 * @param {string} [options.parameters.targetResolution] - The target resolution for screen sharing.
 * @param {string} [options.parameters.targetResolutionHost] - The target resolution for the host screen.
 * @param {Function} options.parameters.startShareScreen - Function to start screen sharing.
 *
 * @returns {Promise<void>} A promise that resolves when the screen share request is processed.
 *
 * @throws {Error} Throws an error if there is an issue during the screen share request process.
 *
 * @example
 * ```typescript
 * await requestScreenShare({
 *   parameters: {
 *     socket: mySocket,
 *     localUIMode: false,
 *     targetResolution: 'fhd',
 *     startShareScreen: myStartShareScreenFunction,
 *     showAlert: myShowAlertFunction,
 *   },
 * });
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class RequestScreenShare {
  /**
   * Requests to start screen sharing.
   *
   * @param {RequestScreenShareOptions} options - The options for requesting screen share.
   * @param {Object} options.parameters - The parameters for the screen share request.
   * @param {Socket} options.parameters.socket - The socket instance to communicate with the server.
   * @param {Function} [options.parameters.showAlert] - Optional function to show alerts to the user.
   * @param {boolean} options.parameters.localUIMode - Indicates if the user is in local UI mode.
   * @param {string} [options.parameters.targetResolution] - The target resolution for screen sharing.
   * @param {string} [options.parameters.targetResolutionHost] - The target resolution for the host screen.
   * @param {Function} options.parameters.startShareScreen - Function to start screen sharing.
   *
   * @returns {Promise<void>} A promise that resolves when the screen share request is processed.
   *
   * @throws {Error} Throws an error if there is an issue during the screen share request process.
   */
  requestScreenShare = async ({ parameters }: RequestScreenShareOptions): Promise<void> => {
    try {
      // Destructure parameters
      const {
        showAlert,
        localUIMode,
        startShareScreen,
        socket,
        targetResolution = 'hd',
        targetResolutionHost = 'hd',
      } = parameters;

      // Check if the user is in local UI mode
      if (localUIMode === true) {
        await startShareScreen({ parameters });
        return;
      }

      let targetWidth = 1280;
      let targetHeight = 720;

      if (targetResolution == 'qhd' || targetResolutionHost == 'qhd') {
        targetWidth = 2560;
        targetHeight = 1440;
      } else if (targetResolution == 'fhd' || targetResolutionHost == 'fhd') {
        targetWidth = 1920;
        targetHeight = 1080;
      }

      socket.emit(
        'requestScreenShare',
        async ({ allowScreenShare }: { allowScreenShare: boolean }) => {
          if (!allowScreenShare) {
            // Send an alert to the user
            showAlert?.({
              message: 'You are not allowed to share screen',
              type: 'danger',
              duration: 3000,
            });
          } else {
            await startShareScreen({ parameters: { ...parameters, targetWidth, targetHeight } });
          }
        },
      );
    } catch (error) {
      // Handle errors during the process of requesting screen share
      console.error('Error during requesting screen share: ', error);
    }
  };
}
