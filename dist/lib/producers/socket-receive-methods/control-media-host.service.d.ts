import { OnScreenChangesType, StopShareScreenType, DisconnectSendTransportVideoType, DisconnectSendTransportAudioType, DisconnectSendTransportScreenType, OnScreenChangesParameters, StopShareScreenParameters, DisconnectSendTransportVideoParameters, DisconnectSendTransportAudioParameters, DisconnectSendTransportScreenParameters } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ControlMediaHostParameters extends OnScreenChangesParameters, StopShareScreenParameters, DisconnectSendTransportVideoParameters, DisconnectSendTransportAudioParameters, DisconnectSendTransportScreenParameters {
    updateAdminRestrictSetting: (value: boolean) => void;
    localStream: MediaStream | null;
    updateLocalStream: (stream: MediaStream | null) => void;
    updateAudioAlreadyOn: (value: boolean) => void;
    localStreamScreen: MediaStream | null;
    updateLocalStreamScreen: (stream: MediaStream | null) => void;
    localStreamVideo: MediaStream | null;
    updateLocalStreamVideo: (stream: MediaStream | null) => void;
    updateScreenAlreadyOn: (value: boolean) => void;
    updateVideoAlreadyOn: (value: boolean) => void;
    updateChatAlreadyOn: (value: boolean) => void;
    onScreenChanges: OnScreenChangesType;
    stopShareScreen: StopShareScreenType;
    disconnectSendTransportVideo: DisconnectSendTransportVideoType;
    disconnectSendTransportAudio: DisconnectSendTransportAudioType;
    disconnectSendTransportScreen: DisconnectSendTransportScreenType;
    getUpdatedAllParams: () => ControlMediaHostParameters;
    [key: string]: any;
}
export interface ControlMediaHostOptions {
    type: 'audio' | 'video' | 'screenshare' | 'chat' | 'all';
    parameters: ControlMediaHostParameters;
}
export type ControlMediaHostType = (options: ControlMediaHostOptions) => Promise<void>;
/**
 * Service for controlling participant media in a session, with options to manage audio, video, screenshare, and chat functionalities.
 *
 * @class
 * @name ControlMediaHost
 * @description This service provides the host with control over a participant's media (audio, video, screenshare, chat), with options to enable or disable these functionalities individually or all at once.
 *
 * @method
 * controlMediaHost
 * @async
 * @param {ControlMediaHostOptions} options - Options to specify which media type to control and provide necessary parameters.
 * @param {string} options.type - The media type to control ('audio', 'video', 'screenshare', 'chat', 'all').
 * @param {ControlMediaHostParameters} options.parameters - Additional parameters, functions, and media streams necessary to perform the media control operations.
 *
 * @returns {Promise<void>} - A promise that resolves when the media control operation is complete.
 *
 * @example
 * ```typescript
 * const controlMediaHostService = new ControlMediaHost();
 * await controlMediaHostService.controlMediaHost({
 *   type: 'audio',
 *   parameters: {
 *     updateAdminRestrictSetting: (value) => console.log(value),
 *     localStream: myLocalStream,
 *     updateLocalStream: (stream) => console.log(stream),
 *     updateAudioAlreadyOn: (value) => console.log(value),
 *     onScreenChanges: async () => { },
 *     disconnectSendTransportAudio: async () => { },
 *     getUpdatedAllParams: () => ({ }),
 *   }
 * });
 * ```
 *
 * @remarks
 * - This function handles the control of audio, video, screenshare, or chat for a participant based on the specified type.
 * - For `all` type, it sequentially controls each media type to ensure all are turned off.
 */
export declare class ControlMediaHost {
    /**
     * Controls the media (audio, video, screenshare, chat) of a participant as a host.
     *
     * @param {object} options - The function parameters.
     * @param {string} options.type - The type of media to control ('audio', 'video', 'screenshare', 'chat', 'all').
     * @param {object} options.parameters - Additional parameters needed for the function.
     * @param {boolean} options.parameters.adminRestrictSetting - The setting to restrict host control.
     * @param {function} options.parameters.updateAdminRestrictSetting - Function to update the adminRestrictSetting.
     * @param {MediaStream} options.parameters.localStream - The local audio and video stream.
     * @param {function} options.parameters.updateLocalStream - Function to update the local audio and video stream.
     * @param {boolean} options.parameters.audioAlreadyOn - Indicates whether audio is currently on.
     * @param {function} options.parameters.updateAudioAlreadyOn - Function to update the audioAlreadyOn status.
     * @param {MediaStream} options.parameters.localStreamScreen - The local screenshare stream.
     * @param {function} options.parameters.updateLocalStreamScreen - Function to update the local screenshare stream.
     * @param {MediaStream} options.parameters.localStreamVideo - The local video stream.
     * @param {function} options.parameters.updateLocalStreamVideo - Function to update the local video stream.
     * @param {boolean} options.parameters.screenAlreadyOn - Indicates whether screenshare is currently on.
     * @param {function} options.parameters.updateScreenAlreadyOn - Function to update the screenAlreadyOn status.
     * @param {boolean} options.parameters.videoAlreadyOn - Indicates whether video is currently on.
     * @param {function} options.parameters.updateVideoAlreadyOn - Function to update the videoAlreadyOn status.
     * @param {boolean} options.parameters.chatAlreadyOn - Indicates whether chat is currently on.
     * @param {function} options.parameters.updateChatAlreadyOn - Function to update the chatAlreadyOn status.
     * @param {function} options.parameters.onScreenChanges - Function to handle changes in screen status.
     * @param {function} options.parameters.stopShareScreen - Function to stop sharing the screen.
     * @param {function} options.parameters.disconnectSendTransportVideo - Function to disconnect video send transport.
     * @param {function} options.parameters.disconnectSendTransportAudio - Function to disconnect audio send transport.
     * @param {function} options.parameters.disconnectSendTransportScreen - Function to disconnect screenshare send transport.
     */
    controlMediaHost: ({ type, parameters }: ControlMediaHostOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlMediaHost, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ControlMediaHost>;
}
