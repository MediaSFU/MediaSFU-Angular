import { Injectable } from '@angular/core';
import { ShowAlert, SwitchUserVideoParameters, SwitchUserVideoType } from '../../@types/types';

export interface SwitchVideoParameters extends SwitchUserVideoParameters {
  recordStarted: boolean;
  recordResumed: boolean;
  recordStopped: boolean;
  recordPaused: boolean;
  recordingMediaOptions: string;
  videoAlreadyOn: boolean;
  userDefaultVideoInputDevice: string;
  defVideoID: string;
  allowed: boolean;
  updateDefVideoID: (deviceId: string) => void;
  updatePrevVideoInputDevice: (deviceId: string) => void;
  updateUserDefaultVideoInputDevice: (deviceId: string) => void;
  updateIsMediaSettingsModalVisible: (isVisible: boolean) => void;
  showAlert?: ShowAlert;

  // Mediasfu functions
  switchUserVideo: SwitchUserVideoType;

  [key: string]: any;
}

export interface SwitchVideoOptions {
  videoPreference: string;
  parameters: SwitchVideoParameters;
}

// Export the type definition for the function
export type SwitchVideoType = (options: SwitchVideoOptions) => Promise<void>;

/**
 * Switches the user's video device based on the provided video preference.
 *
 * @param {SwitchVideoOptions} options - The options for switching the video input.
 * @param {string} options.videoPreference - The preferred video device to switch to.
 * @param {SwitchVideoParameters} options.parameters - The parameters required for switching the video input.
 * @param {boolean} options.parameters.recordStarted - Indicates if recording has started.
 * @param {boolean} options.parameters.recordResumed - Indicates if recording has resumed.
 * @param {boolean} options.parameters.recordStopped - Indicates if recording has stopped.
 * @param {boolean} options.parameters.recordPaused - Indicates if recording is paused.
 * @param {string} options.parameters.recordingMediaOptions - The current media options (e.g., "video").
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is currently on.
 * @param {string} options.parameters.userDefaultVideoInputDevice - The default video input device for the user.
 * @param {string} options.parameters.defVideoID - The default video ID for the input device.
 * @param {boolean} options.parameters.allowed - Indicates if the user is allowed to switch video.
 * @param {Function} options.parameters.updateDefVideoID - Function to update the default video ID.
 * @param {Function} options.parameters.updatePrevVideoInputDevice - Function to update the previous video input device.
 * @param {Function} options.parameters.updateUserDefaultVideoInputDevice - Function to update the user’s default video input device.
 * @param {Function} options.parameters.updateIsMediaSettingsModalVisible - Function to update the visibility of the media settings modal.
 * @param {Function} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {Function} options.parameters.switchUserVideo - Function to switch the user's video input.
 *
 * @returns {Promise<void>} A promise that resolves when the video input has been switched.
 *
 * @remarks
 * This function checks if the user is allowed to switch the video input based on the current state,
 * and it shows alerts if there are any issues. If the video is already on, it cannot be switched until
 * it is turned off, and vice versa. The default video input device is updated if necessary.
 *
 * @example
 * ```typescript
 * const options: SwitchVideoOptions = {
 *   videoPreference: 'newDeviceId',
 *   parameters: {
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordStopped: false,
 *     recordPaused: false,
 *     recordingMediaOptions: 'video',
 *     videoAlreadyOn: true,
 *     userDefaultVideoInputDevice: 'currentDeviceId',
 *     defVideoID: 'defaultDeviceId',
 *     allowed: true,
 *     updateDefVideoID: (deviceId) => console.log(`Default video ID updated to: ${deviceId}`),
 *     updatePrevVideoInputDevice: (deviceId) => console.log(`Previous video input device updated to: ${deviceId}`),
 *     updateUserDefaultVideoInputDevice: (deviceId) => console.log(`User default video input device updated to: ${deviceId}`),
 *     updateIsMediaSettingsModalVisible: (isVisible) => console.log(`Media settings modal is now ${isVisible ? 'visible' : 'hidden'}`),
 *     switchUserVideo: async ({ videoPreference }) => console.log(`Switched video to: ${videoPreference}`),
 *     getUpdatedAllParams: () => ({ }),
 *   },
 * };
 *
 * const switchVideoService = new SwitchVideo();
 * await switchVideoService.switchVideo(options);
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class SwitchVideo {
  /**
   * Switches the user's video device based on the provided video preference.
   *
   * @param {SwitchVideoParams} options - The function parameters.
   */

  async switchVideo({ videoPreference, parameters }: SwitchVideoOptions): Promise<void> {
    let {
      recordStarted,
      recordResumed,
      recordStopped,
      recordPaused,
      recordingMediaOptions,
      videoAlreadyOn,
      userDefaultVideoInputDevice,
      defVideoID,
      allowed,
      updateDefVideoID,
      updatePrevVideoInputDevice,
      updateUserDefaultVideoInputDevice,
      updateIsMediaSettingsModalVisible,

      //mediasfu functions
      showAlert,
      switchUserVideo,
    } = parameters;

    // Check if recording is in progress and whether the selected video device is the default one
    let checkoff = false;
    if ((recordStarted || recordResumed) && !recordStopped && !recordPaused) {
      if (recordingMediaOptions === 'video') {
        checkoff = true;
      }
    }

    // Check camera access permission
    if (!allowed) {
      showAlert?.({
        message: 'Allow access to your camera by starting it for the first time.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    // Check video state and display appropriate alert messages
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

    // Set default video ID if not already set
    if (!defVideoID) {
      defVideoID = userDefaultVideoInputDevice ?? 'default';
      updateDefVideoID(defVideoID);
    }

    // Switch video only if the selected video device is different from the default
    if (videoPreference !== defVideoID) {
      const prevVideoInputDevice = userDefaultVideoInputDevice;
      updatePrevVideoInputDevice(prevVideoInputDevice);

      userDefaultVideoInputDevice = videoPreference;
      updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);

      if (defVideoID) {
        updateIsMediaSettingsModalVisible(false);
        await switchUserVideo({ videoPreference, checkoff, parameters });
      }
    }
  }
}
