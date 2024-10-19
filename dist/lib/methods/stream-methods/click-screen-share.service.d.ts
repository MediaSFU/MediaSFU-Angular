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
