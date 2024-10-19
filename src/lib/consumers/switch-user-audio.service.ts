import { Injectable } from '@angular/core';
import {
  ShowAlert,
  StreamSuccessAudioSwitchType,
  RequestPermissionAudioType,
  StreamSuccessAudioSwitchParameters,
} from '../@types/types';

export interface SwitchUserAudioParameters extends StreamSuccessAudioSwitchParameters {
  userDefaultAudioInputDevice: string;
  prevAudioInputDevice: string;
  showAlert?: ShowAlert;
  hasAudioPermission: boolean;
  updateUserDefaultAudioInputDevice: (deviceId: string) => void;

  // mediasfu functions
  streamSuccessAudioSwitch: StreamSuccessAudioSwitchType;
  requestPermissionAudio: RequestPermissionAudioType;
  checkMediaPermission: boolean;

  [key: string]: any;
}

export interface SwitchUserAudioOptions {
  audioPreference: string;
  parameters: SwitchUserAudioParameters;
}

// Export the type definition for the function
export type SwitchUserAudioType = (options: SwitchUserAudioOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class SwitchUserAudio {
  /**
   * Switches the user's audio input device based on the provided audio preference.
   *
   * @param {SwitchUserAudioOptions} options - The options for switching the user's audio input device.
   * @param {string} options.audioPreference - The preferred audio input device ID.
   * @param {Object} options.parameters - Additional parameters required for switching the audio input device.
   * @param {string} options.parameters.prevAudioInputDevice - The previous audio input device ID.
   * @param {Function} options.parameters.showAlert - Function to show alert messages.
   * @param {boolean} options.parameters.hasAudioPermission - Flag indicating if the user has granted audio permission.
   * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user's default audio input device.
   * @param {Function} options.parameters.streamSuccessAudioSwitch - Function to handle successful audio stream switch.
   * @param {Function} options.parameters.requestPermissionAudio - Function to request audio permission from the user.
   * @param {Function} options.parameters.checkMediaPermission - Function to check if media permission is granted.
   *
   * @returns {Promise<void>} A promise that resolves when the audio input device has been successfully switched.
   *
   * @throws Will throw an error if the audio input device cannot be accessed or if there is an unexpected error.
   */
  async switchUserAudio({ audioPreference, parameters }: SwitchUserAudioOptions): Promise<void> {
    let {
      userDefaultAudioInputDevice,
      prevAudioInputDevice,
      showAlert,
      hasAudioPermission,
      updateUserDefaultAudioInputDevice,

      // media functions
      streamSuccessAudioSwitch,
      requestPermissionAudio,
      checkMediaPermission,
    } = parameters;

    try {
      // Check if audio permission is granted
      if (!hasAudioPermission) {
        if (checkMediaPermission) {
          let statusMic = await requestPermissionAudio();
          if (statusMic !== 'granted') {
            showAlert?.({
              message:
                'Allow access to your microphone or check if your microphone is not being used by another application.',
              type: 'danger',
              duration: 3000,
            });

            return;
          }
        }
      }

      let mediaConstraints: MediaStreamConstraints = {
        audio: {
          deviceId: { exact: audioPreference },
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
        video: false,
      };

      // Get user media with the defined audio constraints
      await navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(async (stream: MediaStream) => {
          await streamSuccessAudioSwitch({ stream, parameters });
        })
        .catch(() => {
          // Handle errors and revert to the previous audio input device
          userDefaultAudioInputDevice = prevAudioInputDevice;
          updateUserDefaultAudioInputDevice(userDefaultAudioInputDevice);

          showAlert?.({
            message: 'Error switching; the specified microphone could not be accessed.',
            type: 'danger',
            duration: 3000,
          });
        });
    } catch (error) {
      // Handle unexpected errors and revert to the previous audio input device
      userDefaultAudioInputDevice = prevAudioInputDevice;
      updateUserDefaultAudioInputDevice(userDefaultAudioInputDevice);

      showAlert?.({
        message: 'Error switching; the specified microphone could not be accessed.',
        type: 'danger',
        duration: 3000,
      });
    }
  }
}
