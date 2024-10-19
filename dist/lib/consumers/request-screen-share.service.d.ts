import { Socket } from 'socket.io-client';
import { ShowAlert, StartShareScreenType, StartShareScreenParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface RequestScreenShareParameters extends StartShareScreenParameters {
    socket: Socket;
    showAlert?: ShowAlert;
    localUIMode: boolean;
    targetResolution?: string;
    targetResolutionHost?: string;
    startShareScreen: StartShareScreenType;
    getUpdatedAllParams: () => RequestScreenShareParameters;
    [key: string]: any;
}
export interface RequestScreenShareOptions {
    parameters: RequestScreenShareParameters;
}
export type RequestScreenShareType = (options: RequestScreenShareOptions) => Promise<void>;
export declare class RequestScreenShare {
    /**
     * Requests to start screen sharing.
     *
     * @param {RequestScreenShareOptions} options - The options for requesting screen share.
     * @param {Object} options.parameters - The parameters for the screen share request.
     * @param {Socket} options.parameters.socket - The socket instance to communicate with the server.
     * @param {Function} [options.parameters.showAlert] - Optional function to show alerts to the user.
     * @param {boolean} options.parameters.localUIMode - Indicates if the user is in local UI mode.
     * @param {string} [options.parameters.targetResolution] - The target resolution for screen sharing.
     * @param {string} [options.parameters.targetResolutionHost] - The target resolution for the host screen.
     * @param {Function} options.parameters.startShareScreen - Function to start screen sharing.
     *
     * @returns {Promise<void>} A promise that resolves when the screen share request is processed.
     *
     * @throws {Error} Throws an error if there is an issue during the screen share request process.
     */
    requestScreenShare: ({ parameters }: RequestScreenShareOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequestScreenShare, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RequestScreenShare>;
}
