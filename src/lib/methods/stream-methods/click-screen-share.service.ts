// screen-share.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import {
  CheckPermissionType,
  CheckScreenShareParameters,
  CheckScreenShareType,
  ShowAlert,
  StopShareScreenParameters,
  StopShareScreenType,
} from '../../@types/types';

export interface ClickScreenShareParameters
  extends CheckScreenShareParameters,
    StopShareScreenParameters {
  showAlert?: ShowAlert;
  roomName: string;
  member: string;
  socket: Socket;
  islevel: string;
  youAreCoHost: boolean;
  adminRestrictSetting: boolean;
  audioSetting: string;
  videoSetting: string;
  screenshareSetting: string;
  chatSetting: string;
  screenAction: boolean;
  screenAlreadyOn: boolean;
  screenRequestState: string | null;
  screenRequestTime: number;
  audioOnlyRoom: boolean;
  updateRequestIntervalSeconds: number;
  updateScreenRequestState: (state: string | null) => void;
  updateScreenAlreadyOn: (status: boolean) => void;

  // mediasfu functions
  checkPermission: CheckPermissionType;
  checkScreenShare: CheckScreenShareType;
  stopShareScreen: StopShareScreenType;

  getUpdatedAllParams: () => ClickScreenShareParameters;
  [key: string]: any;
}

export interface ClickScreenShareOptions {
  parameters: ClickScreenShareParameters;
}

// Export the type definition for the function
export type ClickScreenShareType = (options: ClickScreenShareOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ClickScreenShare {
  /**
   * Handles the action for the screen button, including starting and stopping screen sharing.
   *
   * @param {ClickScreenShareParams} options - Options for handling the screen button action.
   * @returns {Promise<void>}
   */
  clickScreenShare = async ({ parameters }: ClickScreenShareOptions): Promise<void> => {
    parameters = { ...parameters, ...parameters.getUpdatedAllParams() };
    let {
      showAlert,
      roomName,
      member,
      socket,
      islevel,
      youAreCoHost,
      adminRestrictSetting,
      audioSetting,
      videoSetting,
      screenshareSetting,
      chatSetting,
      screenAction,
      screenAlreadyOn,
      screenRequestState,
      screenRequestTime,
      audioOnlyRoom,
      updateRequestIntervalSeconds,
      updateScreenRequestState,
      updateScreenAlreadyOn,
      checkPermission,
      checkScreenShare,
      stopShareScreen,
    } = parameters;

    if (audioOnlyRoom) {
      showAlert?.({
        message: 'You cannot turn on your camera in an audio-only event.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    if (roomName.startsWith('d')) {
      showAlert?.({
        message: 'You cannot start screen share in a demo room.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    if (screenAlreadyOn) {
      screenAlreadyOn = false;
      updateScreenAlreadyOn(screenAlreadyOn);
      await stopShareScreen({ parameters });
    } else {
      if (adminRestrictSetting) {
        showAlert?.({
          message: 'You cannot start screen share. Access denied by host.',
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      let response = 2;
      if (!screenAction && islevel != '2' && !youAreCoHost) {
        response = await checkPermission({
          permissionType: 'screenshareSetting',
          audioSetting,
          videoSetting,
          screenshareSetting,
          chatSetting,
        });
      } else {
        response = 0;
      }

      switch (response) {
        case 0:
          checkScreenShare({ parameters });
          break;
        case 1: {
          if (screenRequestState === 'pending') {
            showAlert?.({
              message: 'A request is already pending. Please wait for the host to respond.',
              type: 'danger',
              duration: 3000,
            });
            return;
          }

          if (
            screenRequestState === 'rejected' &&
            Date.now() - screenRequestTime < updateRequestIntervalSeconds
          ) {
            showAlert?.({
              message: 'You cannot send another request at this time.',
              type: 'danger',
              duration: 3000,
            });

            return;
          }

          showAlert?.({
            message: 'Your request has been sent to the host.',
            type: 'success',
            duration: 3000,
          });

          screenRequestState = 'pending';
          updateScreenRequestState(screenRequestState);

          let userRequest = { id: socket.id, name: member, icon: 'fa-desktop' };
          socket.emit('participantRequest', { userRequest, roomName });
          break;
        }
        case 2:
          showAlert?.({
            message: 'You are not allowed to start screen share.',
            type: 'danger',
            duration: 3000,
          });

          break;
        default:
      }
    }
  };
}
