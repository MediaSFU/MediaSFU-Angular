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
export declare class ControlMediaHost {
    controlMediaHost: (options: ControlMediaHostOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlMediaHost, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ControlMediaHost>;
}
