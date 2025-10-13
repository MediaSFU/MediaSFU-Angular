/* eslint-disable @typescript-eslint/no-non-null-assertion */
// room.service.ts
import { Injectable } from '@angular/core';
import { VideoCaptureConstraints } from '../../methods/utils/producer/video-capture-constraints.service';
import { HParams, HParamsType } from '../../methods/utils/producer/h-params.service';
import { VParams, VParamsType } from '../../methods/utils/producer/v-params.service';
import { ScreenParams } from '../../methods/utils/producer/screen-params.service';
import { AParams } from '../../methods/utils/producer/a-params.service';
import { types } from 'mediasoup-client';
type RtpCapabilities = types.RtpCapabilities;
import {
  EventType,
  ShowAlert,
  VidCons,
  ResponseJoinRoom,
  ScreenParamsType,
  AParamsType,
  MeetingRoomParams,
} from '../../@types/types';

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
  vidCons: any;
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

  // update functions
  updateRtpCapabilities: (rtpCapabilities: RtpCapabilities | null) => void;
  updateRoomRecvIPs: (roomRecvIPs: string[]) => void;
  updateMeetingRoomParams: (params: MeetingRoomParams | null) => void;
  updateItemPageLimit: (limit: number) => void;
  updateAudioOnlyRoom: (isAudioOnly: boolean) => void;
  updateAddForBasic: (addForBasic: boolean) => void;
  updateScreenPageLimit: (limit: number) => void;
  updateVidCons: (cons: any) => void;
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

  // Recording-related update functions
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

// Export the type definition for the function
export type UpdateRoomParametersClientType = (options: UpdateRoomParametersClientOptions) => void;

/**
 * Updates room parameters for the client after joining a room and receiving server-provided parameters.
 *
 * @param {UpdateRoomParametersClientOptions} options - An object containing:
 *  - various room settings and parameters,
 *  - functions to update those parameters.
 *
 * - **Screen/Page Settings:** Adjusts screen and item page limits, meeting room parameters, and video constraints based on server data.
 * - **Recording and Media Settings:** Applies bitrate and frame rate adjustments, based on the target resolution and media options.
 * - **Role-Specific Settings:** Configures admin, host, and co-host settings for permissions, orientations, and resolutions.
 * - **Alerting**: Uses `showAlert` to notify the client on issues or permissions restrictions.
 *
 * @example
 * ```typescript
 * const options = {
 *   parameters: {
 *     rtpCapabilities: myRtpCapabilities,
 *     roomRecvIPs: ['192.168.1.1'],
 *     meetingRoomParams: myMeetingParams,
 *     itemPageLimit: 3,
 *     audioOnlyRoom: false,
 *     addForBasic: true,
 *     screenPageLimit: 2,
 *     shareScreenStarted: false,
 *     shared: true,
 *     targetOrientation: 'landscape',
 *     recordingVideoSupport: true,
 *     frameRate: 15,
 *     adminPasscode: 'admin123',
 *     eventType: 'conference',
 *     youAreCoHost: false,
 *     updateRtpCapabilities: (rtp) => console.log('Updating RTP:', rtp),
 *     updateRoomRecvIPs: (ips) => console.log('Updating IPs:', ips),
 *     updateMeetingRoomParams: (params) => console.log('Updating room params:', params),
 *     // Additional parameters...
 *   },
 * };
 *
 * const updateRoomParametersClient = new UpdateRoomParametersClient(videoCaptureConstraints, hParams, vParams, screenParams, aParams);
 * updateRoomParametersClient.updateRoomParametersClient(options);
 * ```
 *
 * This example demonstrates setting up room parameters for a conference-type room with recording support and custom update functions.
 */

@Injectable({
  providedIn: 'root',
})
export class UpdateRoomParametersClient {
  constructor(
    private videoCaptureConstraints: VideoCaptureConstraints,
    private hParams: HParams,
    private vParams: VParams,
    private screenParams: ScreenParams,
    private aParams: AParams,
  ) {}

  /**
   * Update Room Parameters Client after the user has joined the room and the room parameters have been received from the server.
   * @param {Object} parameters - An object containing various parameters and update functions.
   */
  updateRoomParametersClient = ({ parameters }: UpdateRoomParametersClientOptions): void => {
    try {
      const {
        screenPageLimit,
        shareScreenStarted,
        shared,

        hParams,
        vParams,
        frameRate,

        islevel,
        showAlert,
        data,

        //updates
        updateRtpCapabilities,
        updateRoomRecvIPs,
        updateMeetingRoomParams,
        updateItemPageLimit,
        updateAudioOnlyRoom,
        updateScreenPageLimit,
        updateVidCons,
        updateFrameRate,
        updateAdminPasscode,
        updateEventType,
        updateYouAreCoHost,
        updateAutoWave,
        updateForceFullDisplay,
        updateChatSetting,
        updateMeetingDisplayType,
        updateAudioSetting,
        updateVideoSetting,
        updateScreenshareSetting,
        updateHParams,
        updateVParams,
        updateScreenParams,
        updateAParams,
        updateTargetResolution,
        updateTargetResolutionHost,

        // Recording updates
        updateRecordingAudioPausesLimit,
        updateRecordingAudioPausesCount,
        updateRecordingAudioSupport,
        updateRecordingAudioPeopleLimit,
        updateRecordingAudioParticipantsTimeLimit,
        updateRecordingVideoPausesCount,
        updateRecordingVideoPausesLimit,
        updateRecordingVideoSupport,
        updateRecordingVideoPeopleLimit,
        updateRecordingVideoParticipantsTimeLimit,
        updateRecordingAllParticipantsSupport,
        updateRecordingVideoParticipantsSupport,
        updateRecordingAllParticipantsFullRoomSupport,
        updateRecordingVideoParticipantsFullRoomSupport,
        updateRecordingPreferredOrientation,
        updateRecordingSupportForOtherOrientation,
        updateRecordingMultiFormatsSupport,
        updateRecordingVideoOptions,
        updateRecordingAudioOptions,
        updateMainHeightWidth,
      } = parameters;

      if (data.rtpCapabilities == null) {
        let reason = data.reason || '';
        showAlert?.({
          message: 'Sorry, you are not allowed to join this room. ' + reason,
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      // Update all values
      updateRtpCapabilities(data.rtpCapabilities);
      updateAdminPasscode(data.secureCode);
      updateRoomRecvIPs(data.roomRecvIPs);
      updateMeetingRoomParams(data.meetingRoomParams);

      // Update recording values
      updateRecordingAudioPausesLimit(data.recordingParams.recordingAudioPausesLimit);
      updateRecordingAudioPausesCount(data.recordingParams.recordingAudioPausesCount!);
      updateRecordingAudioSupport(data.recordingParams.recordingAudioSupport);
      updateRecordingAudioPeopleLimit(data.recordingParams.recordingAudioPeopleLimit);
      updateRecordingAudioParticipantsTimeLimit(
        data.recordingParams.recordingAudioParticipantsTimeLimit,
      );
      updateRecordingVideoPausesCount(data.recordingParams.recordingVideoPausesCount!);
      updateRecordingVideoPausesLimit(data.recordingParams.recordingVideoPausesLimit);
      updateRecordingVideoSupport(data.recordingParams.recordingVideoSupport);
      updateRecordingVideoPeopleLimit(data.recordingParams.recordingVideoPeopleLimit);
      updateRecordingVideoParticipantsTimeLimit(
        data.recordingParams.recordingVideoParticipantsTimeLimit,
      );
      updateRecordingAllParticipantsSupport(data.recordingParams.recordingAllParticipantsSupport);
      updateRecordingVideoParticipantsSupport(
        data.recordingParams.recordingVideoParticipantsSupport,
      );
      updateRecordingAllParticipantsFullRoomSupport(
        data.recordingParams.recordingAllParticipantsFullRoomSupport,
      );
      updateRecordingVideoParticipantsFullRoomSupport(
        data.recordingParams.recordingVideoParticipantsFullRoomSupport,
      );
      updateRecordingPreferredOrientation(data.recordingParams.recordingPreferredOrientation);
      updateRecordingSupportForOtherOrientation(
        data.recordingParams.recordingSupportForOtherOrientation,
      );
      updateRecordingMultiFormatsSupport(data.recordingParams.recordingMultiFormatsSupport);

      // Update other meeting room settings
      updateItemPageLimit(data.meetingRoomParams.itemPageLimit);
      updateEventType(data.meetingRoomParams.type);

      if (data.meetingRoomParams.type == 'chat' && islevel != '2') {
        updateYouAreCoHost(true);
      }

      if (['chat', 'broadcast'].includes(data.meetingRoomParams.type)) {
        updateAutoWave(false);
        updateMeetingDisplayType('all');
        updateForceFullDisplay(true);
        updateChatSetting('allow');
      }

      updateAudioSetting(data.meetingRoomParams.audioSetting);
      updateVideoSetting(data.meetingRoomParams.videoSetting);
      updateScreenshareSetting(data.meetingRoomParams.screenshareSetting);
      updateChatSetting(data.meetingRoomParams.chatSetting);

      updateAudioOnlyRoom(data.meetingRoomParams.mediaType != 'video');

      if (data.meetingRoomParams.type == 'chat' || data.meetingRoomParams.type == 'broadcast') {
        if (data.meetingRoomParams.type == 'broadcast') {
          updateItemPageLimit(1);
          updateRecordingVideoOptions('mainScreen');
          updateRecordingAudioOptions('host');
        } else {
          updateItemPageLimit(2);
        }
      }

      if (data.meetingRoomParams.type == 'conference' && (shared || shareScreenStarted)) {
        updateMainHeightWidth(100);
      } else {
        updateMainHeightWidth(0);
      }

      updateScreenPageLimit(Math.min(data.meetingRoomParams.itemPageLimit, screenPageLimit));

      // Assign media capture constraints based on the user's role and room settings
      let targetOrientation =
        islevel == '2'
          ? data.meetingRoomParams.targetOrientationHost
          : data.meetingRoomParams.targetOrientation;
      let targetResolution =
        islevel == '2'
          ? data.meetingRoomParams.targetResolutionHost
          : data.meetingRoomParams.targetResolution;

      let vidCons: VidCons;
      if (targetOrientation == 'landscape') {
        vidCons =
          targetResolution == 'hd'
            ? this.videoCaptureConstraints.hdCons
            : targetResolution == 'QnHD'
            ? this.videoCaptureConstraints.QnHDCons
            : targetResolution == 'fhd'
            ? this.videoCaptureConstraints.fhdCons
            : targetResolution == 'qhd'
            ? this.videoCaptureConstraints.qhdCons
            : this.videoCaptureConstraints.sdCons;
      } else if (targetOrientation == 'neutral') {
        vidCons =
          targetResolution == 'hd'
            ? this.videoCaptureConstraints.hdConsNeu
            : targetResolution == 'QnHD'
            ? this.videoCaptureConstraints.QnHDConsNeu
            : targetResolution == 'fhd'
            ? this.videoCaptureConstraints.fhdConsNeu
            : targetResolution == 'qhd'
            ? this.videoCaptureConstraints.qhdConsNeu
            : this.videoCaptureConstraints.sdConsNeu;
      } else {
        vidCons =
          targetResolution == 'hd'
            ? this.videoCaptureConstraints.hdConsPort
            : targetResolution == 'QnHD'
            ? this.videoCaptureConstraints.QnHDConsPort
            : targetResolution == 'fhd'
            ? this.videoCaptureConstraints.fhdConsPort
            : targetResolution == 'qhd'
            ? this.videoCaptureConstraints.qhdConsPort
            : this.videoCaptureConstraints.sdConsPort;
      }

      let frameRateValue = frameRate ? frameRate : 10;

      let vParamsValue = { ...vParams };
      let hParamsValue = { ...hParams };
      if (Object.keys(vParamsValue).length === 0) {
        vParamsValue = this.vParams.vParams;
      }
      if (Object.keys(hParamsValue).length === 0) {
        hParamsValue = this.hParams.hParams;
      }

      if (targetResolution == 'hd') {
        frameRateValue = this.videoCaptureConstraints.hdFrameRate;

        vParamsValue.encodings.forEach((encoding: Partial<VParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 4);
        });

        hParamsValue.encodings.forEach((encoding: Partial<HParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 4);
        });
      } else if (targetResolution == 'QnHD') {
        frameRateValue = this.videoCaptureConstraints.QnHDFrameRate;
        vParamsValue.encodings.forEach((encoding: Partial<VParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 0.25);
        });

        hParamsValue.encodings.forEach((encoding: Partial<HParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 0.25);
        });

        hParamsValue.codecOptions!.videoGoogleStartBitrate! *= 0.25;
        vParamsValue.codecOptions!.videoGoogleStartBitrate! *= 0.25;
      } else if (targetResolution == 'fhd') {
        frameRateValue = this.videoCaptureConstraints.fhdFrameRate;
        vParamsValue.encodings.forEach((encoding: Partial<VParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 8);
        });

        hParamsValue.encodings.forEach((encoding: Partial<HParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 8);
        });

        hParamsValue.codecOptions!.videoGoogleStartBitrate! *= 8;
        vParamsValue.codecOptions!.videoGoogleStartBitrate! *= 8;
      } else if (targetResolution == 'qhd') {
        frameRateValue = this.videoCaptureConstraints.qhdFrameRate;
        vParamsValue.encodings.forEach((encoding: Partial<VParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 16);
        });

        hParamsValue.encodings.forEach((encoding: Partial<HParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 16);
        });

        hParamsValue.codecOptions!.videoGoogleStartBitrate! *= 16;
        vParamsValue.codecOptions!.videoGoogleStartBitrate! *= 16;
      }

      if (data.recordingParams.recordingVideoSupport) {
        vParamsValue.encodings.forEach((encoding: Partial<VParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 1.2);
        });

        hParamsValue.encodings.forEach((encoding: Partial<HParamsType['encodings'][0]>) => {
          encoding.maxBitrate && (encoding.maxBitrate *= 1.2);
        });

        hParamsValue.codecOptions!.videoGoogleStartBitrate! *= 1.2;
        vParamsValue.codecOptions!.videoGoogleStartBitrate! *= 1.2;
      }

      updateVidCons(vidCons);
      updateFrameRate(frameRateValue);
      updateHParams(hParamsValue);
      updateVParams(vParamsValue);
      updateScreenParams(this.screenParams.screenParams);
      updateAParams(this.aParams.aParams);
      updateTargetResolution(data.meetingRoomParams.targetResolution);
      updateTargetResolutionHost(data.meetingRoomParams.targetResolutionHost);
    } catch (error) {
      console.log('updateRoomParametersClient error', error);
      parameters.showAlert?.({
        message: (error as Error).message,
        type: 'danger',
        duration: 3000,
      });
    }
  };
}
