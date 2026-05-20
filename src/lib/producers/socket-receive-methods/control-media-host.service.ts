import { Injectable } from '@angular/core';
import {
  OnScreenChangesType,
  StopShareScreenType,
  DisconnectSendTransportVideoType,
  DisconnectSendTransportAudioType,
  DisconnectSendTransportScreenType,
  OnScreenChangesParameters,
  StopShareScreenParameters,
  DisconnectSendTransportVideoParameters,
  DisconnectSendTransportAudioParameters,
  DisconnectSendTransportScreenParameters,
} from '../../@types/types';
import { controlMediaHost as sharedControlMediaHost } from 'mediasfu-shared';

export interface ControlMediaHostParameters
  extends OnScreenChangesParameters,
    StopShareScreenParameters,
    DisconnectSendTransportVideoParameters,
    DisconnectSendTransportAudioParameters,
    DisconnectSendTransportScreenParameters {
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

@Injectable({
  providedIn: 'root',
})
export class ControlMediaHost {
  controlMediaHost = async (options: ControlMediaHostOptions): Promise<void> => {
    return sharedControlMediaHost(options);
  };
}
