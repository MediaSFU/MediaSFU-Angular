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

export interface SwitchUserVideoAltParameters
  extends StreamSuccessVideoParameters,
    ClickVideoParameters {
  audioOnlyRoom: boolean;
  frameRate: number;
  vidCons: VidCons;
  showAlert?: ShowAlert;
  hasCameraPermission: boolean;
  updateVideoSwitching: (state: boolean) => void;
  updateCurrentFacingMode: (mode: string) => void;

  // mediasfu functions
  requestPermissionCamera: RequestPermissionCameraType;
  streamSuccessVideo: StreamSuccessVideoType;
  sleep: SleepType;
  checkMediaPermission: boolean;
  getUpdatedAllParams: () => SwitchUserVideoAltParameters;

  [key: string]: any;
}

export interface SwitchUserVideoAltOptions {
  videoPreference: string;
  checkoff: boolean;
  parameters: SwitchUserVideoAltParameters;
}

// Export the type definition for the function
export type SwitchUserVideoAltType = (options: SwitchUserVideoAltOptions) => Promise<void>;

/**
 * Switches the user's video stream based on the provided video preference and other parameters.
 *
 * This method manages the process of switching the user's video input device,
 * checking permissions, and updating the relevant application state.
 * If the specified device is not accessible, it attempts to find an alternative.
 *
 * @param {SwitchUserVideoAltOptions} options - The options for switching the user's video.
 * @param {string} options.videoPreference - The preferred video input device ID.
 * @param {boolean} options.checkoff - A flag indicating whether to turn off the video before switching.
 * @param {SwitchUserVideoAltParameters} options.parameters - The parameters required for switching the video.
 * @param {Function} options.parameters.showAlert - Function to show alert messages to the user.
 * @param {boolean} options.parameters.hasCameraPermission - Flag indicating if the user has granted camera permission.
 * @param {Function} options.parameters.updateVideoSwitching - Function to update the video switching state.
 * @param {Function} options.parameters.requestPermissionCamera - Function to request camera permission from the user.
 * @param {Function} options.parameters.checkMediaPermission - Function to check if media permissions are granted.
 *
 * @returns {Promise<void>} A promise that resolves when the video switching is complete.
 *
 * @throws Will throw an error if the audio input device cannot be accessed or if there is an unexpected error.
 *
 * @example
 * await switchUserVideoAlt({
 *   videoPreference: 'user',
 *   checkoff: false,
 *   parameters: {
 *     hasCameraPermission: true,
 *     updateVideoSwitching: (state) => { /* update state *\/ },
 *     // other parameters...
 *   },
 * });
 */


@Injectable({
  providedIn: 'root',
})
export class SwitchUserVideoAlt {
  constructor(private ClickVideoService: ClickVideo) {}

  /**
   * Switches the user's video stream based on the provided video preference and other parameters.
   *
   * @param {Object} options - The options for switching the user's video.
   * @param {string} options.videoPreference - The preferred video facing mode (e.g., "user" or "environment").
   * @param {boolean} options.checkoff - A flag indicating whether to turn off the video before switching.
   * @param {SwitchUserVideoAltOptions} options.parameters - The parameters required for switching the video.
   *
   * @returns {Promise<void>} A promise that resolves when the video switching is complete.
   *
   * @throws Will throw an error if there is an issue with switching the video.
   */

  async switchUserVideoAlt({
    videoPreference,
    checkoff,
    parameters,
  }: SwitchUserVideoAltOptions): Promise<void> {
    let { getUpdatedAllParams } = parameters;
    let parameters_ = getUpdatedAllParams();

    let {
      audioOnlyRoom,
      frameRate,
      vidCons,
      showAlert,
      hasCameraPermission,
      updateVideoSwitching,
      updateCurrentFacingMode,

      // mediasfu functions
      requestPermissionCamera,
      streamSuccessVideo,
      sleep,
      checkMediaPermission,
    } = parameters;

    let { currentFacingMode, prevFacingMode } = parameters_;

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
        updateVideoSwitching(true);
        await sleep({ ms: 500 });
        updateVideoSwitching(false);
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

      // Enumerate video devices
      const videoDevices = await navigator.mediaDevices.enumerateDevices();

      // Define media constraints based on preferences and options
      let mediaConstraints: any = {};

      if (vidCons && vidCons.width && vidCons.height) {
        mediaConstraints = {
          video: {
            facingMode: { exact: videoPreference },
            ...vidCons,
            frameRate: { ideal: frameRate },
          },
          audio: false,
        };
      } else {
        mediaConstraints = {
          video: {
            facingMode: { exact: videoPreference },
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
          let videoDevicesFront = [];

          // Filter video devices based on the preferred facing mode
          if (videoPreference === 'user') {
            videoDevicesFront = videoDevices.filter(
              (device: MediaDeviceInfo) =>
                device.label.includes('front') && device.kind === 'videoinput',
            );
          } else {
            videoDevicesFront = videoDevices.filter(
              (device: MediaDeviceInfo) =>
                device.label.includes('back') && device.kind === 'videoinput',
            );
          }

          if (videoDevicesFront.length > 0) {
            videoDevicesFront.forEach((device: MediaDeviceInfo) => {
              if (device.kind === 'videoinput') {
                let videoDeviceId = device.deviceId;

                // Update media constraints with the specific video device
                if (vidCons && vidCons.width && vidCons.height) {
                  mediaConstraints = {
                    video: {
                      deviceId: { exact: videoDeviceId },
                      ...vidCons,
                      frameRate: { ideal: frameRate },
                    },
                    audio: false,
                  };
                } else {
                  mediaConstraints = {
                    video: {
                      deviceId: { exact: videoDeviceId },
                      frameRate: { ideal: frameRate },
                    },
                    audio: false,
                  };
                }

                // Try to get user media with the new constraints
                navigator.mediaDevices
                  .getUserMedia(mediaConstraints)
                  .then(async (stream: MediaStream) => {
                    await streamSuccessVideo({ stream, parameters });
                  })
                  .catch(() => {
                    // If the current video device is the last one in the list, show the error; otherwise, try the next device
                    if (
                      videoDeviceId === videoDevicesFront[videoDevicesFront.length - 1].deviceId
                    ) {
                      currentFacingMode = prevFacingMode;
                      updateCurrentFacingMode(currentFacingMode);

                      showAlert?.({
                        message:
                          'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
                        type: 'danger',
                        duration: 3000,
                      });
                    }
                  });
              }
            });
          } else {
            // Show error if no compatible video devices are found
            currentFacingMode = prevFacingMode;
            updateCurrentFacingMode(currentFacingMode);

            showAlert?.({
              message:
                'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
              type: 'danger',
              duration: 3000,
            });
          }
        });
    } catch (error) {
      // Handle any unexpected errors
      const videoDevices = await navigator.mediaDevices.enumerateDevices();
      let videoDevicesFront = [];
      if (videoPreference === 'user') {
        videoDevicesFront = videoDevices.filter(
          (device: MediaDeviceInfo) =>
            device.label.includes('front') && device.kind === 'videoinput',
        );
      } else {
        videoDevicesFront = videoDevices.filter(
          (device: MediaDeviceInfo) =>
            device.label.includes('back') && device.kind === 'videoinput',
        );
      }

      let mediaConstraints: any = {};

      if (videoDevicesFront.length > 0) {
        videoDevicesFront.forEach((device: MediaDeviceInfo) => {
          if (device.kind === 'videoinput') {
            let videoDeviceId = device.deviceId;

            if (vidCons && vidCons.width && vidCons.height) {
              mediaConstraints = {
                video: {
                  deviceId: { exact: videoDeviceId },
                  ...vidCons,
                  frameRate: { ideal: frameRate },
                },
                audio: false,
              };
            } else {
              mediaConstraints = {
                video: {
                  deviceId: { exact: videoDeviceId },
                  frameRate: { ideal: frameRate },
                },
                audio: false,
              };
            }

            navigator.mediaDevices
              .getUserMedia(mediaConstraints)
              .then(async (stream: MediaStream) => {
                await streamSuccessVideo({ stream, parameters });
              })
              .catch(() => {
                // If current video device is the last one in the list, show the error; otherwise, try next device
                if (videoDeviceId === videoDevicesFront[videoDevicesFront.length - 1].deviceId) {
                  currentFacingMode = prevFacingMode;
                  updateCurrentFacingMode(currentFacingMode);

                  showAlert?.({
                    message:
                      'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
                    type: 'danger',
                    duration: 3000,
                  });
                }
              });
          }
        });
      } else {
        currentFacingMode = prevFacingMode;
        updateCurrentFacingMode(currentFacingMode);

        showAlert?.({
          message:
            'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
          type: 'danger',
          duration: 3000,
        });
      }
    }
  }
}
