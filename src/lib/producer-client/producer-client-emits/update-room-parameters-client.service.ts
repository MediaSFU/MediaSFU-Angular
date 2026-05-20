import { Injectable } from '@angular/core';
import { HParamsType } from '../../methods/utils/producer/h-params.service';
import { VParamsType } from '../../methods/utils/producer/v-params.service';
import { types } from 'mediasoup-client';
import {
  EventType,
  ShowAlert,
  VidCons,
  ResponseJoinRoom,
  ScreenParamsType,
  AParamsType,
  MeetingRoomParams,
} from '../../@types/types';
import { updateRoomParametersClient as sharedUpdateRoomParametersClient } from 'mediasfu-shared';

type RtpCapabilities = types.RtpCapabilities;

export interface UpdateRoomParametersClientParameters {
  rtpCapabilities: RtpCapabilities | null;
  roomRecvIPs: string[];
  meetingRoomParams: MeetingRoomParams | null;
  itemPageLimit: number;
  audioOnlyRoom: boolean;
  addForBasic: boolean;
  screenPageLimit: number;
  shareScreenStarted: boolean;
  shared: boolean;
  targetOrientation: string;
  vidCons: VidCons;
  recordingVideoSupport: boolean;
  frameRate: number;
  adminPasscode: string;
  eventType: EventType;
  youAreCoHost: boolean;
  autoWave: boolean;
  forceFullDisplay: boolean;
  chatSetting: string;
  meetingDisplayType: string;
  audioSetting: string;
  videoSetting: string;
  screenshareSetting: string;
  hParams: HParamsType;
  vParams: VParamsType;
  screenParams: ScreenParamsType;
  aParams: AParamsType;
  islevel: string;
  showAlert?: ShowAlert;
  data: ResponseJoinRoom;
  updateRtpCapabilities: (rtpCapabilities: RtpCapabilities | null) => void;
  updateRoomRecvIPs: (roomRecvIPs: string[]) => void;
  updateMeetingRoomParams: (params: MeetingRoomParams | null) => void;
  updateItemPageLimit: (limit: number) => void;
  updateAudioOnlyRoom: (isAudioOnly: boolean) => void;
  updateAddForBasic: (addForBasic: boolean) => void;
  updateScreenPageLimit: (limit: number) => void;
  updateVidCons: (cons: VidCons) => void;
  updateFrameRate: (frameRate: number) => void;
  updateAdminPasscode: (passcode: string) => void;
  updateEventType: (eventType: EventType) => void;
  updateYouAreCoHost: (coHost: boolean) => void;
  updateAutoWave: (autoWave: boolean) => void;
  updateForceFullDisplay: (forceFull: boolean) => void;
  updateChatSetting: (setting: string) => void;
  updateMeetingDisplayType: (type: string) => void;
  updateAudioSetting: (setting: string) => void;
  updateVideoSetting: (setting: string) => void;
  updateScreenshareSetting: (setting: string) => void;
  updateHParams: (params: HParamsType) => void;
  updateVParams: (params: VParamsType) => void;
  updateScreenParams: (params: ScreenParamsType) => void;
  updateAParams: (params: AParamsType) => void;
  updateMainHeightWidth: (heightWidth: number) => void;
  updateTargetResolution: (resolution: string) => void;
  updateTargetResolutionHost: (resolution: string) => void;
  updateRecordingAudioPausesLimit: (limit: number) => void;
  updateRecordingAudioPausesCount: (count: number) => void;
  updateRecordingAudioSupport: (support: boolean) => void;
  updateRecordingAudioPeopleLimit: (limit: number) => void;
  updateRecordingAudioParticipantsTimeLimit: (limit: number) => void;
  updateRecordingVideoPausesCount: (count: number) => void;
  updateRecordingVideoPausesLimit: (limit: number) => void;
  updateRecordingVideoSupport: (support: boolean) => void;
  updateRecordingVideoPeopleLimit: (limit: number) => void;
  updateRecordingVideoParticipantsTimeLimit: (limit: number) => void;
  updateRecordingAllParticipantsSupport: (support: boolean) => void;
  updateRecordingVideoParticipantsSupport: (support: boolean) => void;
  updateRecordingAllParticipantsFullRoomSupport: (support: boolean) => void;
  updateRecordingVideoParticipantsFullRoomSupport: (support: boolean) => void;
  updateRecordingPreferredOrientation: (orientation: string) => void;
  updateRecordingSupportForOtherOrientation: (support: boolean) => void;
  updateRecordingMultiFormatsSupport: (support: boolean) => void;
  updateRecordingVideoOptions: (options: string) => void;
  updateRecordingAudioOptions: (options: string) => void;
}

export type UpdateRoomParametersClientOptions = {
  parameters: UpdateRoomParametersClientParameters;
};

export type UpdateRoomParametersClientType = (options: UpdateRoomParametersClientOptions) => void;

@Injectable({
  providedIn: 'root',
})
export class UpdateRoomParametersClient {
  updateRoomParametersClient = ({ parameters }: UpdateRoomParametersClientOptions): void => {
    sharedUpdateRoomParametersClient(
      { parameters } as unknown as Parameters<typeof sharedUpdateRoomParametersClient>[0],
    );
  };
}
