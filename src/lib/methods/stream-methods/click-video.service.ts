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
              .catch(() => {
                showAlert?.({
                  message:
                    'Allow access to your camera or check if your camera is not being used by another application.',
                  type: 'danger',
                  duration: 3000,
                });
              });
          });
      }
    }
  };
}
