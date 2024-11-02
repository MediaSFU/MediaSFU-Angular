import { Socket } from 'socket.io-client';
import { CheckPermissionType, CheckScreenShareParameters, CheckScreenShareType, ShowAlert, StopShareScreenParameters, StopShareScreenType } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ClickScreenShareParameters extends CheckScreenShareParameters, StopShareScreenParameters {
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
    checkPermission: CheckPermissionType;
    checkScreenShare: CheckScreenShareType;
    stopShareScreen: StopShareScreenType;
    getUpdatedAllParams: () => ClickScreenShareParameters;
    [key: string]: any;
}
export interface ClickScreenShareOptions {
    parameters: ClickScreenShareParameters;
}
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
export declare class ClickScreenShare {
    /**
     * Handles the action for the screen button, including starting and stopping screen sharing.
     *
     * @param {ClickScreenShareParams} options - Options for handling the screen button action.
     * @returns {Promise<void>}
     */
    clickScreenShare: ({ parameters }: ClickScreenShareOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickScreenShare, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClickScreenShare>;
}
