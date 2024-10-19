import { Injectable } from '@angular/core';
import { ClickVideo, ClickVideoParameters } from '../methods/stream-methods/click-video.service';
import {
  ShowAlert,
  VidCons,
  RequestPermissionCameraType,
  StreamSuccessVideoType,
  SleepType,
  StreamSuccessVideoParameters,
} from '../@types/types';

export interface SwitchUserVideoParameters
  extends StreamSuccessVideoParameters,
    ClickVideoParameters {
  audioOnlyRoom: boolean;
  frameRate: number;
  vidCons: VidCons;
  prevVideoInputDevice: string;
  userDefaultVideoInputDevice: string;
  showAlert?: ShowAlert;
  hasCameraPermission: boolean;
  updateVideoSwitching: (state: boolean) => void;
  updateUserDefaultVideoInputDevice: (deviceId: string) => void;

  // media functions
  requestPermissionCamera: RequestPermissionCameraType;
  streamSuccessVideo: StreamSuccessVideoType;
  sleep: SleepType;
  checkMediaPermission: boolean;

  getUpdatedAllParams: () => SwitchUserVideoParameters;
  [key: string]: any;
}

export interface SwitchUserVideoOptions {
  videoPreference: string;
  checkoff: boolean;
  parameters: SwitchUserVideoParameters;
}

// Export the type definition for the function
export type SwitchUserVideoType = (options: SwitchUserVideoOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class SwitchUserVideo {
  constructor(private ClickVideoService: ClickVideo) {}

  /**
   * Switches the user's video input device based on the provided options.
   *
   * @param {SwitchUserVideoOptions} options - The options for switching the user's video.
   * @param {string} options.videoPreference - The preferred video input device ID.
   * @param {boolean} options.checkoff - Flag indicating whether to turn off the video.
   * @param {Object} options.parameters - Additional parameters required for switching the video.
   * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the room is audio-only.
   * @param {number} options.parameters.frameRate - The desired frame rate for the video.
   * @param {Object} options.parameters.vidCons - Video constraints such as width and height.
   * @param {string} options.parameters.prevVideoInputDevice - The previous video input device ID.
   * @param {Function} options.parameters.showAlert - Function to show alerts to the user.
   * @param {boolean} options.parameters.hasCameraPermission - Indicates if the user has camera permission.
   * @param {Function} options.parameters.updateVideoSwitching - Function to update video switching state.
   * @param {Function} options.parameters.updateUserDefaultVideoInputDevice - Function to update the default video input device.
   * @param {Function} options.parameters.requestPermissionCamera - Function to request camera permission.
   * @param {Function} options.parameters.streamSuccessVideo - Function to handle successful video stream.
   * @param {Function} options.parameters.sleep - Function to pause execution for a specified duration.
   * @param {Function} options.parameters.checkMediaPermission - Function to check media permissions.
   *
   * @returns {Promise<void>} A promise that resolves when the video input device has been switched.
   *
   * @throws Will throw an error if switching the video input device fails.
   */
  switchUserVideo = async ({
    videoPreference,
    checkoff,
    parameters,
  }: {
    videoPreference: string;
    checkoff: boolean;
    parameters: any;
  }): Promise<void> => {
    let {
      audioOnlyRoom,
      frameRate,
      vidCons,
      prevVideoInputDevice,
      userDefaultVideoInputDevice,
      showAlert,
      hasCameraPermission,
      updateVideoSwitching,
      updateUserDefaultVideoInputDevice,

      // mediasfu functions
      requestPermissionCamera,
      streamSuccessVideo,
      sleep,
      checkMediaPermission,
    } = parameters;

    try {
      // Check if it's an audio-only room
      if (audioOnlyRoom) {
        showAlert?.({
          message: 'You cannot turn on your camera in an audio-only event.',
          type: 'danger',
          duration: 3000,
        });

        return;
      }

      // If checkoff is not true, trigger a click on the video button to turn off the video
      if (!checkoff) {
        await this.ClickVideoService.clickVideo({ parameters });
        await updateVideoSwitching(true);
        await sleep(500);
        await updateVideoSwitching(false);
      }

      // Check camera permission
      if (!hasCameraPermission) {
        if (checkMediaPermission) {
          let statusCamera = await requestPermissionCamera();
          if (statusCamera !== 'granted') {
            showAlert?.({
              message:
                'Allow access to your camera or check if your camera is not being used by another application.',
              type: 'danger',
              duration: 3000,
            });

            return;
          }
        }
      }

      let mediaConstraints: any = {};

      if (vidCons && vidCons.width && vidCons.height) {
        mediaConstraints = {
          video: {
            deviceId: { exact: videoPreference },
            ...vidCons,
            frameRate: { ideal: frameRate },
          },
          audio: false,
        };
      } else {
        mediaConstraints = {
          video: {
            deviceId: { exact: videoPreference },
            frameRate: { ideal: frameRate },
          },
          audio: false,
        };
      }

      // Get user media with the defined constraints
      await navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(async (stream: MediaStream) => {
          await streamSuccessVideo({ stream, parameters });
        })
        .catch(async () => {
          // Handle errors and revert to the previous video input device
          userDefaultVideoInputDevice = prevVideoInputDevice;
          updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);

          showAlert?.({
            message:
              'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
            type: 'danger',
            duration: 3000,
          });
        });
    } catch (error) {
      // Handle unexpected errors and revert to the previous video input device
      userDefaultVideoInputDevice = prevVideoInputDevice;
      updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);

      showAlert?.({
        message:
          'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
        type: 'danger',
        duration: 3000,
      });
    }
  };
}
