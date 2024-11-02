import { Injectable } from '@angular/core';
import { ShowAlert, SwitchUserVideoAltType, SwitchUserVideoParameters } from '../../@types/types';

export interface SwitchVideoAltParameters extends SwitchUserVideoParameters {
  recordStarted: boolean;
  recordResumed: boolean;
  recordStopped: boolean;
  recordPaused: boolean;
  recordingMediaOptions: string;
  videoAlreadyOn: boolean;
  currentFacingMode: string;
  prevFacingMode: string;
  allowed: boolean;
  audioOnlyRoom: boolean;
  updateCurrentFacingMode: (mode: string) => void;
  updatePrevFacingMode: (mode: string) => void;
  updateIsMediaSettingsModalVisible: (isVisible: boolean) => void;
  showAlert?: ShowAlert;

  // mediasfu functions
  switchUserVideoAlt: SwitchUserVideoAltType;

  getUpdatedAllParams: () => SwitchVideoAltParameters;
  // [key: string]: any;
}

export interface SwitchVideoAltOptions {
  parameters: SwitchVideoAltParameters;
}

// Export the type definition for the function
export type SwitchVideoAltType = (options: SwitchVideoAltOptions) => Promise<void>;

/**
 * Switches the video input based on user preference and current state.
 *
 * @param {SwitchVideoAltOptions} options - The options for switching the video input.
 * @param {SwitchVideoAltParameters} options.parameters - The parameters required for switching the video input.
 * @param {boolean} options.parameters.recordStarted - Indicates if recording has started.
 * @param {boolean} options.parameters.recordResumed - Indicates if recording has resumed.
 * @param {boolean} options.parameters.recordStopped - Indicates if recording has stopped.
 * @param {boolean} options.parameters.recordPaused - Indicates if recording is paused.
 * @param {string} options.parameters.recordingMediaOptions - The current media options (e.g., "video").
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is currently on.
 * @param {string} options.parameters.currentFacingMode - The current facing mode of the camera (e.g., "environment").
 * @param {boolean} options.parameters.allowed - Indicates if the user is allowed to switch video.
 * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the current room is audio-only.
 * @param {Function} options.parameters.updateCurrentFacingMode - Function to update the current facing mode.
 * @param {Function} options.parameters.updateIsMediaSettingsModalVisible - Function to update the visibility of the media settings modal.
 * @param {Function} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {Function} options.parameters.switchUserVideoAlt - Function to switch the user's video input.
 *
 * @returns {Promise<void>} A promise that resolves when the video input has been switched.
 *
 * @remarks
 * This function checks if the user is allowed to switch the video input based on the current state,
 * and it shows alerts if there are any issues. If the video is already on, it cannot be switched until
 * it is turned off, and vice versa. The facing mode of the camera is toggled between "user" and "environment".
 *
 * @example
 * ```typescript
 * const options: SwitchVideoAltOptions = {
 *   parameters: {
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordStopped: false,
 *     recordPaused: false,
 *     recordingMediaOptions: 'video',
 *     videoAlreadyOn: true,
 *     currentFacingMode: 'user',
 *     allowed: true,
 *     audioOnlyRoom: false,
 *     updateCurrentFacingMode: (mode) => console.log(`Facing mode updated to: ${mode}`),
 *     updateIsMediaSettingsModalVisible: (isVisible) => console.log(`Media settings modal is now ${isVisible ? 'visible' : 'hidden'}`),
 *     switchUserVideoAlt: async ({ videoPreference }) => console.log(`Switched video to: ${videoPreference}`),
 *     getUpdatedAllParams: () => ({ }),
 *   },
 * };
 *
 * const switchVideoService = new SwitchVideoAlt();
 * await switchVideoService.switchVideoAlt(options);
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class SwitchVideoAlt {
  async switchVideoAlt({ parameters }: SwitchVideoAltOptions): Promise<void> {
    let {
      recordStarted,
      recordResumed,
      recordStopped,
      recordPaused,
      recordingMediaOptions,
      videoAlreadyOn,
      currentFacingMode,
      allowed,
      audioOnlyRoom,
      updateCurrentFacingMode,
      updateIsMediaSettingsModalVisible,

      showAlert,

      //media functions
      switchUserVideoAlt,
    } = parameters;

    if (audioOnlyRoom) {
      showAlert?.({
        message: 'You cannot turn on your camera in an audio-only event.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    let checkoff = false;
    if (
      (recordStarted || recordResumed) &&
      !recordStopped &&
      !recordPaused &&
      recordingMediaOptions === 'video'
    ) {
      checkoff = true;
    }

    if (!allowed) {
      showAlert?.({
        message: 'Allow access to your camera by starting it for the first time.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    if (checkoff) {
      if (videoAlreadyOn) {
        showAlert?.({
          message: 'Please turn off your video before switching.',
          type: 'danger',
          duration: 3000,
        });
        return;
      }
    } else {
      if (!videoAlreadyOn) {
        showAlert?.({
          message: 'Please turn on your video before switching.',
          type: 'danger',
          duration: 3000,
        });
        return;
      }
    }

    // Camera switching logic here
    let newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';

    updateCurrentFacingMode(newFacingMode);
    updateIsMediaSettingsModalVisible(false);

    await switchUserVideoAlt({ videoPreference: newFacingMode, checkoff, parameters });
  }
}
