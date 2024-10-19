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
