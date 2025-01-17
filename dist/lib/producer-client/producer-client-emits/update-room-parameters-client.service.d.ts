import { VideoCaptureConstraints } from '../../methods/utils/producer/video-capture-constraints.service';
import { HParams, HParamsType } from '../../methods/utils/producer/h-params.service';
import { VParams, VParamsType } from '../../methods/utils/producer/v-params.service';
import { ScreenParams } from '../../methods/utils/producer/screen-params.service';
import { AParams } from '../../methods/utils/producer/a-params.service';
import { RtpCapabilities } from 'mediasoup-client/lib/types';
import { EventType, ShowAlert, ResponseJoinRoom, ScreenParamsType, AParamsType, MeetingRoomParams } from '../../@types/types';
import * as i0 from "@angular/core";
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
export declare class UpdateRoomParametersClient {
    private videoCaptureConstraints;
    private hParams;
    private vParams;
    private screenParams;
    private aParams;
    constructor(videoCaptureConstraints: VideoCaptureConstraints, hParams: HParams, vParams: VParams, screenParams: ScreenParams, aParams: AParams);
    /**
     * Update Room Parameters Client after the user has joined the room and the room parameters have been received from the server.
     * @param {Object} parameters - An object containing various parameters and update functions.
     */
    updateRoomParametersClient: ({ parameters }: UpdateRoomParametersClientOptions) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateRoomParametersClient, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateRoomParametersClient>;
}
