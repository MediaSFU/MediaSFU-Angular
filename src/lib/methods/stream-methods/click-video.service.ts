// click-video.service.ts
import { Injectable } from '@angular/core';
import {
  CheckPermissionType,
  DisconnectSendTransportVideoParameters,
  DisconnectSendTransportVideoType,
  RequestPermissionCameraType,
  ShowAlert,
  StreamSuccessVideoParameters,
  StreamSuccessVideoType,
  VidCons,
} from '../../@types/types';
import { Socket } from 'socket.io-client';

export interface ClickVideoParameters
  extends DisconnectSendTransportVideoParameters,
  StreamSuccessVideoParameters {
  checkMediaPermission: boolean;
  hasCameraPermission: boolean;
  videoAlreadyOn: boolean;
  audioOnlyRoom: boolean;
  recordStarted: boolean;
  recordResumed: boolean;
  recordPaused: boolean;
  recordStopped: boolean;
  recordingMediaOptions: string;
  islevel: string;
  youAreCoHost: boolean;
  adminRestrictSetting: boolean;
  videoRequestState: string | null;
  videoRequestTime: number;
  member: string;
  socket: Socket;
  roomName: string;
  userDefaultVideoInputDevice: string;
  currentFacingMode: string;
  vidCons: VidCons;
  frameRate: number;
  videoAction: boolean;
  localStream: MediaStream | null;
  audioSetting: string;
  videoSetting: string;
  screenshareSetting: string;
  chatSetting: string;
  updateRequestIntervalSeconds: number;

  showAlert?: ShowAlert;
  updateVideoAlreadyOn: (value: boolean) => void;
  updateVideoRequestState: (state: string) => void;
  updateLocalStream: (stream: MediaStream | null) => void;

  streamSuccessVideo: StreamSuccessVideoType;
  disconnectSendTransportVideo: DisconnectSendTransportVideoType;
  requestPermissionCamera: RequestPermissionCameraType;
  checkPermission: CheckPermissionType;

  getUpdatedAllParams: () => ClickVideoParameters;
  [key: string]: any;
}

export interface ClickVideoOptions {
  parameters: ClickVideoParameters;
}

// Export the type definition for the function
export type ClickVideoType = (options: ClickVideoOptions) => Promise<void>;

/**
 * Handles the click event to toggle the participant's video on/off and manages video permission requests.
 *
 * @param {ClickVideoOptions} options - The options for handling the video click event.
 * @param {ClickVideoParameters} options.parameters - The parameters required for the video action.
 * @param {boolean} options.parameters.checkMediaPermission - Indicates if media permission needs to be checked.
 * @param {boolean} options.parameters.hasCameraPermission - Indicates if camera permission has been granted.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is currently active.
 * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the current room is audio-only.
 * @param {boolean} options.parameters.recordStarted - Indicates if recording has started.
 * @param {boolean} options.parameters.recordResumed - Indicates if recording has resumed.
 * @param {boolean} options.parameters.recordPaused - Indicates if recording is paused.
 * @param {boolean} options.parameters.recordStopped - Indicates if recording is stopped.
 * @param {string} options.parameters.recordingMediaOptions - The media options for recording (e.g., "video", "audio").
 * @param {string} options.parameters.islevel - The participant's level.
 * @param {boolean} options.parameters.youAreCoHost - Indicates if the user is a co-host.
 * @param {boolean} options.parameters.adminRestrictSetting - Indicates if there are admin restrictions on video.
 * @param {string | null} options.parameters.videoRequestState - State of the video request.
 * @param {number} options.parameters.videoRequestTime - Timestamp of the video request.
 * @param {string} options.parameters.member - The participant's name.
 * @param {Socket} options.parameters.socket - The socket connection used for communication.
 * @param {string} options.parameters.roomName - The name of the room where the video is being toggled.
 * @param {string} options.parameters.userDefaultVideoInputDevice - The default video input device.
 * @param {string} options.parameters.currentFacingMode - The current facing mode of the camera.
 * @param {VidCons} options.parameters.vidCons - Video constraints for the stream.
 * @param {number} options.parameters.frameRate - Desired frame rate for the video.
 * @param {boolean} options.parameters.videoAction - Indicates if a video action is currently taking place.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream.
 * @param {string} options.parameters.audioSetting - The current audio setting.
 * @param {string} options.parameters.videoSetting - The current video setting.
 * @param {string} options.parameters.screenshareSetting - The current screenshare setting.
 * @param {string} options.parameters.chatSetting - The current chat setting.
 * @param {number} options.parameters.updateRequestIntervalSeconds - Interval time for updating request state.
 *
 * @returns {Promise<void>} A promise that resolves when the video action has been handled.
 *
 * @remarks
 * This function checks the current status of the video and handles the logic for starting or stopping the video stream.
 * It validates permissions and room settings before allowing the video to be activated or deactivated.
 *
 * @example
 * ```typescript
 * const options: ClickVideoOptions = {
 *   parameters: {
 *     checkMediaPermission: true,
 *     hasCameraPermission: false,
 *     videoAlreadyOn: false,
 *     audioOnlyRoom: false,
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordPaused: false,
 *     recordStopped: false,
 *     recordingMediaOptions: 'video',
 *     islevel: '1',
 *     youAreCoHost: false,
 *     adminRestrictSetting: false,
 *     videoRequestState: null,
 *     videoRequestTime: 0,
 *     member: 'John Doe',
 *     socket: socketInstance,
 *     roomName: 'myRoom',
 *     userDefaultVideoInputDevice: '',
 *     currentFacingMode: 'user',
 *     vidCons: { width: 1280, height: 720 },
 *     frameRate: 30,
 *     videoAction: false,
 *     localStream: null,
 *     audioSetting: 'on',
 *     videoSetting: 'on',
 *     screenshareSetting: 'off',
 *     chatSetting: 'allow',
 *     updateRequestIntervalSeconds: 30,
 *     showAlert: (alert) => console.log(alert.message),
 *     updateVideoAlreadyOn: (status) => console.log(`Video already on: ${status}`),
 *     updateVideoRequestState: (state) => console.log(`Video request state: ${state}`),
 *     updateLocalStream: (stream) => console.log('Local stream updated'),
 *     streamSuccessVideo: streamSuccessFunction,
 *     disconnectSendTransportVideo: disconnectFunction,
 *     requestPermissionCamera: requestPermissionFunction,
 *     checkPermission: checkPermissionFunction,
 *     getUpdatedAllParams: () => parameters,
 *   },
 * };
 *
 * const clickVideoService = new ClickVideo();
 * await clickVideoService.clickVideo(options);
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class ClickVideo {
  /**
   * Handles the click event to toggle the participant's video on/off and manages video permission requests.
   *
   * @param {ClickVideoParams} options - The function parameters.
   * @returns {Promise<void>}
   */

  clickVideo = async ({ parameters }: ClickVideoOptions): Promise<void> => {
    let {
      checkMediaPermission,
      hasCameraPermission,
      videoAlreadyOn,
      audioOnlyRoom,
      recordStarted,
      recordResumed,
      recordPaused,
      recordStopped,
      recordingMediaOptions,
      islevel,
      youAreCoHost,
      adminRestrictSetting,
      videoRequestState,
      videoRequestTime,
      member,
      socket,
      roomName,
      userDefaultVideoInputDevice,
      currentFacingMode,
      vidCons,
      frameRate,
      videoAction,
      localStream,
      audioSetting,
      videoSetting,
      screenshareSetting,
      chatSetting,
      updateRequestIntervalSeconds,
      streamSuccessVideo,
      showAlert,
      updateVideoAlreadyOn,
      updateVideoRequestState,
      updateLocalStream,
      disconnectSendTransportVideo,
      requestPermissionCamera,
      checkPermission,
    } = parameters;

    if (audioOnlyRoom) {
      showAlert?.({
        message: 'You cannot turn on your camera in an audio only event.',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    if (videoAlreadyOn) {
      if (islevel === '2' && (recordStarted || recordResumed)) {
        if (!(recordPaused || recordStopped) && recordingMediaOptions === 'video') {
          showAlert?.({
            message:
              'You cannot turn off your camera while recording video, please pause or stop recording first.',
            type: 'danger',
            duration: 3000,
          });

          return;
        }
      }

      videoAlreadyOn = false;
      updateVideoAlreadyOn(videoAlreadyOn);
      if (localStream) {
        localStream.getVideoTracks()[0].enabled = false;
      }
      updateLocalStream(localStream);
      await disconnectSendTransportVideo({ parameters });
    } else {
      if (adminRestrictSetting) {
        showAlert?.({
          message: 'You cannot turn on your camera. Access denied by host.',
          type: 'danger',
          duration: 3000,
        });

        return;
      }

      let response = 2;

      if (!videoAction && islevel !== '2' && !youAreCoHost) {
        response = await checkPermission({
          permissionType: 'videoSetting',
          audioSetting,
          videoSetting,
          screenshareSetting,
          chatSetting,
        });
      } else {
        response = 0;
      }

      if (response === 1) {
        if (videoRequestState === 'pending') {
          showAlert?.({
            message: 'A request is pending. Please wait for the host to respond.',
            type: 'danger',
            duration: 3000,
          });

          return;
        }

        if (
          videoRequestState === 'rejected' &&
          Date.now() - videoRequestTime < updateRequestIntervalSeconds
        ) {
          showAlert?.({
            message: `A request was rejected. Please wait for ${updateRequestIntervalSeconds} seconds before sending another request.`,
            type: 'danger',
            duration: 3000,
          });

          return;
        }

        showAlert?.({
          message: 'Request sent to host.',
          type: 'success',
          duration: 3000,
        });

        videoRequestState = 'pending';
        updateVideoRequestState(videoRequestState);

        let userRequest = { id: socket.id, name: member, icon: 'fa-video' };
        socket.emit('participantRequest', { userRequest, roomName });
      } else if (response === 2) {
        showAlert?.({
          message: 'You cannot turn on your camera. Access denied by host.',
          type: 'danger',
          duration: 3000,
        });
      } else {
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

        let mediaConstraints = {};
        let altMediaConstraints = {};
        if (userDefaultVideoInputDevice) {
          if (vidCons && vidCons.width && vidCons.height) {
            mediaConstraints = {
              video: {
                deviceId: userDefaultVideoInputDevice,
                facingMode: currentFacingMode,
                ...vidCons,
                frameRate: { ideal: frameRate },
              },
              audio: false,
            };
            altMediaConstraints = {
              video: { ...vidCons, frameRate: { ideal: frameRate } },
              audio: false,
            };
          } else {
            mediaConstraints = {
              video: { ...vidCons, frameRate: { ideal: frameRate } },
              audio: false,
            };
            altMediaConstraints = { video: { frameRate: { ideal: frameRate } }, audio: false };
          }
        } else {
          if (vidCons && vidCons.width && vidCons.height) {
            mediaConstraints = {
              video: { ...vidCons, frameRate: { ideal: frameRate } },
              audio: false,
            };
            altMediaConstraints = {
              video: { ...vidCons, frameRate: { ideal: frameRate } },
              audio: false,
            };
          } else {
            mediaConstraints = { video: { frameRate: { ideal: frameRate } }, audio: false };
          }
        }

        await navigator.mediaDevices
          .getUserMedia(mediaConstraints)
          .then(async (stream: MediaStream) => {
            await streamSuccessVideo({ stream, parameters });
          })
          .catch(async () => {
            await navigator.mediaDevices
              .getUserMedia(altMediaConstraints)
              .then(async (stream: MediaStream) => {
                await streamSuccessVideo({ stream, parameters });
              })
              .catch(async () => {
                //remove frameRate from constraints
                altMediaConstraints = {
                  video: { ...vidCons },
                  audio: false,
                };
                await navigator.mediaDevices
                  .getUserMedia(altMediaConstraints)
                  .then(async (stream) => {
                    await streamSuccessVideo({ stream, parameters });
                  }).catch(() => {
                    showAlert?.({
                      message:
                        'Allow access to your camera or check if your camera is not being used by another application.',
                      type: 'danger',
                      duration: 3000,
                    });
                  });
              });
          });
      }
    }
  };
}
