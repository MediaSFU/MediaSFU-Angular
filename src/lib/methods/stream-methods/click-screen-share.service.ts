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

/**
 * Handles the action for the screen button, including starting and stopping screen sharing.
 *
 * @param {ClickScreenShareOptions} options - Options for handling the screen button action.
 * @param {Object} options.parameters - The parameters required for the screen share action.
 * @param {Function} options.parameters.showAlert - Function to show alert messages.
 * @param {string} options.parameters.roomName - The name of the room where the screen share is taking place.
 * @param {string} options.parameters.member - The member initiating the screen share.
 * @param {Socket} options.parameters.socket - The socket connection used for communication.
 * @param {string} options.parameters.islevel - The participant's level.
 * @param {boolean} options.parameters.youAreCoHost - Indicates if the user is a co-host.
 * @param {boolean} options.parameters.adminRestrictSetting - Indicates if there are restrictions set by the admin.
 * @param {string} options.parameters.audioSetting - Current audio setting.
 * @param {string} options.parameters.videoSetting - Current video setting.
 * @param {string} options.parameters.screenshareSetting - Current screen share setting.
 * @param {string} options.parameters.chatSetting - Current chat setting.
 * @param {boolean} options.parameters.screenAction - Indicates if a screen action is currently taking place.
 * @param {boolean} options.parameters.screenAlreadyOn - Indicates if screen sharing is currently active.
 * @param {string | null} options.parameters.screenRequestState - State of the screen share request.
 * @param {number} options.parameters.screenRequestTime - Timestamp of when the screen share request was made.
 * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the room is audio-only.
 * @param {number} options.parameters.updateRequestIntervalSeconds - Interval time for updating request state.
 * @param {Function} options.parameters.updateScreenRequestState - Function to update the screen request state.
 * @param {Function} options.parameters.updateScreenAlreadyOn - Function to update the screen sharing status.
 * @param {Function} options.parameters.checkPermission - Function to check permissions for screen sharing.
 * @param {Function} options.parameters.checkScreenShare - Function to check and initiate screen sharing.
 * @param {Function} options.parameters.stopShareScreen - Function to stop screen sharing.
 *
 * @returns {Promise<void>} A promise that resolves when the screen share action has been handled.
 *
 * @remarks
 * This function checks the current status of screen sharing and handles the logic for starting or stopping screen sharing.
 * It validates permissions and room settings before allowing screen sharing to be activated or deactivated.
 *
 * @example
 * ```typescript
 * const options: ClickScreenShareOptions = {
 *   parameters: {
 *     showAlert: (alert) => console.log(alert.message),
 *     roomName: 'myRoom',
 *     member: 'John Doe',
 *     socket: socketInstance,
 *     islevel: '1',
 *     youAreCoHost: false,
 *     adminRestrictSetting: false,
 *     audioSetting: 'on',
 *     videoSetting: 'on',
 *     screenshareSetting: 'off',
 *     chatSetting: 'allow',
 *     screenAction: false,
 *     screenAlreadyOn: false,
 *     screenRequestState: null,
 *     screenRequestTime: 0,
 *     audioOnlyRoom: false,
 *     updateRequestIntervalSeconds: 30,
 *     updateScreenRequestState: (state) => console.log(`Screen request state: ${state}`),
 *     updateScreenAlreadyOn: (status) => console.log(`Screen already on: ${status}`),
 *     checkPermission: checkPermissionFunction,
 *     checkScreenShare: checkScreenShareFunction,
 *     stopShareScreen: stopShareScreenFunction,
 *     getUpdatedAllParams: () => parameters,
 *   },
 * };
 *
 * const clickScreenShareService = new ClickScreenShare();
 * await clickScreenShareService.clickScreenShare(options);
 * ```
 */

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
