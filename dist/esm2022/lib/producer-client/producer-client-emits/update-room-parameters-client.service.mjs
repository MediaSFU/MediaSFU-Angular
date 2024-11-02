/* eslint-disable @typescript-eslint/no-non-null-assertion */
// room.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../methods/utils/producer/video-capture-constraints.service";
import * as i2 from "../../methods/utils/producer/h-params.service";
import * as i3 from "../../methods/utils/producer/v-params.service";
import * as i4 from "../../methods/utils/producer/screen-params.service";
import * as i5 from "../../methods/utils/producer/a-params.service";
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
export class UpdateRoomParametersClient {
    videoCaptureConstraints;
    hParams;
    vParams;
    screenParams;
    aParams;
    constructor(videoCaptureConstraints, hParams, vParams, screenParams, aParams) {
        this.videoCaptureConstraints = videoCaptureConstraints;
        this.hParams = hParams;
        this.vParams = vParams;
        this.screenParams = screenParams;
        this.aParams = aParams;
    }
    /**
     * Update Room Parameters Client after the user has joined the room and the room parameters have been received from the server.
     * @param {Object} parameters - An object containing various parameters and update functions.
     */
    updateRoomParametersClient = ({ parameters }) => {
        try {
            const { screenPageLimit, shareScreenStarted, shared, hParams, vParams, frameRate, islevel, showAlert, data, 
            //updates
            updateRtpCapabilities, updateRoomRecvIPs, updateMeetingRoomParams, updateItemPageLimit, updateAudioOnlyRoom, updateScreenPageLimit, updateVidCons, updateFrameRate, updateAdminPasscode, updateEventType, updateYouAreCoHost, updateAutoWave, updateForceFullDisplay, updateChatSetting, updateMeetingDisplayType, updateAudioSetting, updateVideoSetting, updateScreenshareSetting, updateHParams, updateVParams, updateScreenParams, updateAParams, updateTargetResolution, updateTargetResolutionHost, 
            // Recording updates
            updateRecordingAudioPausesLimit, updateRecordingAudioPausesCount, updateRecordingAudioSupport, updateRecordingAudioPeopleLimit, updateRecordingAudioParticipantsTimeLimit, updateRecordingVideoPausesCount, updateRecordingVideoPausesLimit, updateRecordingVideoSupport, updateRecordingVideoPeopleLimit, updateRecordingVideoParticipantsTimeLimit, updateRecordingAllParticipantsSupport, updateRecordingVideoParticipantsSupport, updateRecordingAllParticipantsFullRoomSupport, updateRecordingVideoParticipantsFullRoomSupport, updateRecordingPreferredOrientation, updateRecordingSupportForOtherOrientation, updateRecordingMultiFormatsSupport, updateRecordingVideoOptions, updateRecordingAudioOptions, updateMainHeightWidth, } = parameters;
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
            updateRecordingAudioPausesCount(data.recordingParams.recordingAudioPausesCount);
            updateRecordingAudioSupport(data.recordingParams.recordingAudioSupport);
            updateRecordingAudioPeopleLimit(data.recordingParams.recordingAudioPeopleLimit);
            updateRecordingAudioParticipantsTimeLimit(data.recordingParams.recordingAudioParticipantsTimeLimit);
            updateRecordingVideoPausesCount(data.recordingParams.recordingVideoPausesCount);
            updateRecordingVideoPausesLimit(data.recordingParams.recordingVideoPausesLimit);
            updateRecordingVideoSupport(data.recordingParams.recordingVideoSupport);
            updateRecordingVideoPeopleLimit(data.recordingParams.recordingVideoPeopleLimit);
            updateRecordingVideoParticipantsTimeLimit(data.recordingParams.recordingVideoParticipantsTimeLimit);
            updateRecordingAllParticipantsSupport(data.recordingParams.recordingAllParticipantsSupport);
            updateRecordingVideoParticipantsSupport(data.recordingParams.recordingVideoParticipantsSupport);
            updateRecordingAllParticipantsFullRoomSupport(data.recordingParams.recordingAllParticipantsFullRoomSupport);
            updateRecordingVideoParticipantsFullRoomSupport(data.recordingParams.recordingVideoParticipantsFullRoomSupport);
            updateRecordingPreferredOrientation(data.recordingParams.recordingPreferredOrientation);
            updateRecordingSupportForOtherOrientation(data.recordingParams.recordingSupportForOtherOrientation);
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
                }
                else {
                    updateItemPageLimit(2);
                }
            }
            if (data.meetingRoomParams.type == 'conference' && (shared || shareScreenStarted)) {
                updateMainHeightWidth(100);
            }
            else {
                updateMainHeightWidth(0);
            }
            updateScreenPageLimit(Math.min(data.meetingRoomParams.itemPageLimit, screenPageLimit));
            // Assign media capture constraints based on the user's role and room settings
            let targetOrientation = islevel == '2'
                ? data.meetingRoomParams.targetOrientationHost
                : data.meetingRoomParams.targetOrientation;
            let targetResolution = islevel == '2'
                ? data.meetingRoomParams.targetResolutionHost
                : data.meetingRoomParams.targetResolution;
            let vidCons;
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
            }
            else if (targetOrientation == 'neutral') {
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
            }
            else {
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
                vParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 4);
                });
                hParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 4);
                });
            }
            else if (targetResolution == 'QnHD') {
                frameRateValue = this.videoCaptureConstraints.QnHDFrameRate;
                vParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 0.25);
                });
                hParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 0.25);
                });
                hParamsValue.codecOptions.videoGoogleStartBitrate *= 0.25;
                vParamsValue.codecOptions.videoGoogleStartBitrate *= 0.25;
            }
            else if (targetResolution == 'fhd') {
                frameRateValue = this.videoCaptureConstraints.fhdFrameRate;
                vParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 8);
                });
                hParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 8);
                });
                hParamsValue.codecOptions.videoGoogleStartBitrate *= 8;
                vParamsValue.codecOptions.videoGoogleStartBitrate *= 8;
            }
            else if (targetResolution == 'qhd') {
                frameRateValue = this.videoCaptureConstraints.qhdFrameRate;
                vParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 16);
                });
                hParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 16);
                });
                hParamsValue.codecOptions.videoGoogleStartBitrate *= 16;
                vParamsValue.codecOptions.videoGoogleStartBitrate *= 16;
            }
            if (data.recordingParams.recordingVideoSupport) {
                vParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 1.2);
                });
                hParamsValue.encodings.forEach((encoding) => {
                    encoding.maxBitrate && (encoding.maxBitrate *= 1.2);
                });
                hParamsValue.codecOptions.videoGoogleStartBitrate *= 1.2;
                vParamsValue.codecOptions.videoGoogleStartBitrate *= 1.2;
            }
            updateVidCons(vidCons);
            updateFrameRate(frameRateValue);
            updateHParams(hParamsValue);
            updateVParams(vParamsValue);
            updateScreenParams(this.screenParams.screenParams);
            updateAParams(this.aParams.aParams);
            updateTargetResolution(data.meetingRoomParams.targetResolution);
            updateTargetResolutionHost(data.meetingRoomParams.targetResolutionHost);
        }
        catch (error) {
            console.log('updateRoomParametersClient error', error);
            parameters.showAlert?.({
                message: error.message,
                type: 'danger',
                duration: 3000,
            });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateRoomParametersClient, deps: [{ token: i1.VideoCaptureConstraints }, { token: i2.HParams }, { token: i3.VParams }, { token: i4.ScreenParams }, { token: i5.AParams }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateRoomParametersClient, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateRoomParametersClient, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.VideoCaptureConstraints }, { type: i2.HParams }, { type: i3.VParams }, { type: i4.ScreenParams }, { type: i5.AParams }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJvb20tcGFyYW1ldGVycy1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL3VwZGF0ZS1yb29tLXBhcmFtZXRlcnMtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBQzdELGtCQUFrQjtBQUNsQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBMEczQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUtILE1BQU0sT0FBTywwQkFBMEI7SUFFM0I7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUxWLFlBQ1UsdUJBQWdELEVBQ2hELE9BQWdCLEVBQ2hCLE9BQWdCLEVBQ2hCLFlBQTBCLEVBQzFCLE9BQWdCO1FBSmhCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFDdkIsQ0FBQztJQUVKOzs7T0FHRztJQUNILDBCQUEwQixHQUFHLENBQUMsRUFBRSxVQUFVLEVBQXFDLEVBQVEsRUFBRTtRQUN2RixJQUFJLENBQUM7WUFDSCxNQUFNLEVBQ0osZUFBZSxFQUNmLGtCQUFrQixFQUNsQixNQUFNLEVBRU4sT0FBTyxFQUNQLE9BQU8sRUFDUCxTQUFTLEVBRVQsT0FBTyxFQUNQLFNBQVMsRUFDVCxJQUFJO1lBRUosU0FBUztZQUNULHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIscUJBQXFC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ekIsTUFBTTs7MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbi8vIHJvb20uc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlkZW9DYXB0dXJlQ29uc3RyYWludHMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL3Byb2R1Y2VyL3ZpZGVvLWNhcHR1cmUtY29uc3RyYWludHMuc2VydmljZSc7XG5pbXBvcnQgeyBIUGFyYW1zLCBIUGFyYW1zVHlwZSB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvcHJvZHVjZXIvaC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBWUGFyYW1zLCBWUGFyYW1zVHlwZSB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvcHJvZHVjZXIvdi1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY3JlZW5QYXJhbXMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL3Byb2R1Y2VyL3NjcmVlbi1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBBUGFyYW1zIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9wcm9kdWNlci9hLXBhcmFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJ0cENhcGFiaWxpdGllcyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7XG4gIEV2ZW50VHlwZSxcbiAgU2hvd0FsZXJ0LFxuICBWaWRDb25zLFxuICBSZXNwb25zZUpvaW5Sb29tLFxuICBTY3JlZW5QYXJhbXNUeXBlLFxuICBBUGFyYW1zVHlwZSxcbiAgTWVldGluZ1Jvb21QYXJhbXMsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnRQYXJhbWV0ZXJzIHtcbiAgcnRwQ2FwYWJpbGl0aWVzOiBSdHBDYXBhYmlsaXRpZXMgfCBudWxsO1xuICByb29tUmVjdklQczogc3RyaW5nW107XG4gIG1lZXRpbmdSb29tUGFyYW1zOiBNZWV0aW5nUm9vbVBhcmFtcyB8IG51bGw7XG4gIGl0ZW1QYWdlTGltaXQ6IG51bWJlcjtcbiAgYXVkaW9Pbmx5Um9vbTogYm9vbGVhbjtcbiAgYWRkRm9yQmFzaWM6IGJvb2xlYW47XG4gIHNjcmVlblBhZ2VMaW1pdDogbnVtYmVyO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgdGFyZ2V0T3JpZW50YXRpb246IHN0cmluZztcbiAgdmlkQ29uczogYW55O1xuICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IGJvb2xlYW47XG4gIGZyYW1lUmF0ZTogbnVtYmVyO1xuICBhZG1pblBhc3Njb2RlOiBzdHJpbmc7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICB5b3VBcmVDb0hvc3Q6IGJvb2xlYW47XG4gIGF1dG9XYXZlOiBib29sZWFuO1xuICBmb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuO1xuICBjaGF0U2V0dGluZzogc3RyaW5nO1xuICBtZWV0aW5nRGlzcGxheVR5cGU6IHN0cmluZztcbiAgYXVkaW9TZXR0aW5nOiBzdHJpbmc7XG4gIHZpZGVvU2V0dGluZzogc3RyaW5nO1xuICBzY3JlZW5zaGFyZVNldHRpbmc6IHN0cmluZztcbiAgaFBhcmFtczogSFBhcmFtc1R5cGU7XG4gIHZQYXJhbXM6IFZQYXJhbXNUeXBlO1xuICBzY3JlZW5QYXJhbXM6IFNjcmVlblBhcmFtc1R5cGU7XG4gIGFQYXJhbXM6IEFQYXJhbXNUeXBlO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgZGF0YTogUmVzcG9uc2VKb2luUm9vbTtcblxuICAvLyB1cGRhdGUgZnVuY3Rpb25zXG4gIHVwZGF0ZVJ0cENhcGFiaWxpdGllczogKHJ0cENhcGFiaWxpdGllczogUnRwQ2FwYWJpbGl0aWVzIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlUm9vbVJlY3ZJUHM6IChyb29tUmVjdklQczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZU1lZXRpbmdSb29tUGFyYW1zOiAocGFyYW1zOiBNZWV0aW5nUm9vbVBhcmFtcyB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUl0ZW1QYWdlTGltaXQ6IChsaW1pdDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVBdWRpb09ubHlSb29tOiAoaXNBdWRpb09ubHk6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUFkZEZvckJhc2ljOiAoYWRkRm9yQmFzaWM6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlblBhZ2VMaW1pdDogKGxpbWl0OiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVZpZENvbnM6IChjb25zOiBhbnkpID0+IHZvaWQ7XG4gIHVwZGF0ZUZyYW1lUmF0ZTogKGZyYW1lUmF0ZTogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVBZG1pblBhc3Njb2RlOiAocGFzc2NvZGU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlRXZlbnRUeXBlOiAoZXZlbnRUeXBlOiBFdmVudFR5cGUpID0+IHZvaWQ7XG4gIHVwZGF0ZVlvdUFyZUNvSG9zdDogKGNvSG9zdDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQXV0b1dhdmU6IChhdXRvV2F2ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheTogKGZvcmNlRnVsbDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ2hhdFNldHRpbmc6IChzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZTogKHR5cGU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQXVkaW9TZXR0aW5nOiAoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb1NldHRpbmc6IChzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZzogKHNldHRpbmc6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlSFBhcmFtczogKHBhcmFtczogSFBhcmFtc1R5cGUpID0+IHZvaWQ7XG4gIHVwZGF0ZVZQYXJhbXM6IChwYXJhbXM6IFZQYXJhbXNUeXBlKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5QYXJhbXM6IChwYXJhbXM6IFNjcmVlblBhcmFtc1R5cGUpID0+IHZvaWQ7XG4gIHVwZGF0ZUFQYXJhbXM6IChwYXJhbXM6IEFQYXJhbXNUeXBlKSA9PiB2b2lkO1xuICB1cGRhdGVNYWluSGVpZ2h0V2lkdGg6IChoZWlnaHRXaWR0aDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uOiAocmVzb2x1dGlvbjogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdDogKHJlc29sdXRpb246IHN0cmluZykgPT4gdm9pZDtcblxuICAvLyBSZWNvcmRpbmctcmVsYXRlZCB1cGRhdGUgZnVuY3Rpb25zXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ6IChsaW1pdDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50OiAoY291bnQ6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0OiAoc3VwcG9ydDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdDogKGxpbWl0OiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0OiAobGltaXQ6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudDogKGNvdW50OiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IChsaW1pdDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IChzdXBwb3J0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0OiAobGltaXQ6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6IChsaW1pdDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0OiAoc3VwcG9ydDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0OiAoc3VwcG9ydDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OiAoc3VwcG9ydDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6IChzdXBwb3J0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbjogKG9yaWVudGF0aW9uOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uOiAoc3VwcG9ydDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydDogKHN1cHBvcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9uczogKG9wdGlvbnM6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zOiAob3B0aW9uczogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudE9wdGlvbnMgPSB7XG4gIHBhcmFtZXRlcnM6IFVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50UGFyYW1ldGVycztcbn07XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50VHlwZSA9IChvcHRpb25zOiBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogVXBkYXRlcyByb29tIHBhcmFtZXRlcnMgZm9yIHRoZSBjbGllbnQgYWZ0ZXIgam9pbmluZyBhIHJvb20gYW5kIHJlY2VpdmluZyBzZXJ2ZXItcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1VwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50T3B0aW9uc30gb3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nOlxuICogIC0gdmFyaW91cyByb29tIHNldHRpbmdzIGFuZCBwYXJhbWV0ZXJzLFxuICogIC0gZnVuY3Rpb25zIHRvIHVwZGF0ZSB0aG9zZSBwYXJhbWV0ZXJzLlxuICpcbiAqIC0gKipTY3JlZW4vUGFnZSBTZXR0aW5nczoqKiBBZGp1c3RzIHNjcmVlbiBhbmQgaXRlbSBwYWdlIGxpbWl0cywgbWVldGluZyByb29tIHBhcmFtZXRlcnMsIGFuZCB2aWRlbyBjb25zdHJhaW50cyBiYXNlZCBvbiBzZXJ2ZXIgZGF0YS5cbiAqIC0gKipSZWNvcmRpbmcgYW5kIE1lZGlhIFNldHRpbmdzOioqIEFwcGxpZXMgYml0cmF0ZSBhbmQgZnJhbWUgcmF0ZSBhZGp1c3RtZW50cywgYmFzZWQgb24gdGhlIHRhcmdldCByZXNvbHV0aW9uIGFuZCBtZWRpYSBvcHRpb25zLlxuICogLSAqKlJvbGUtU3BlY2lmaWMgU2V0dGluZ3M6KiogQ29uZmlndXJlcyBhZG1pbiwgaG9zdCwgYW5kIGNvLWhvc3Qgc2V0dGluZ3MgZm9yIHBlcm1pc3Npb25zLCBvcmllbnRhdGlvbnMsIGFuZCByZXNvbHV0aW9ucy5cbiAqIC0gKipBbGVydGluZyoqOiBVc2VzIGBzaG93QWxlcnRgIHRvIG5vdGlmeSB0aGUgY2xpZW50IG9uIGlzc3VlcyBvciBwZXJtaXNzaW9ucyByZXN0cmljdGlvbnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBydHBDYXBhYmlsaXRpZXM6IG15UnRwQ2FwYWJpbGl0aWVzLFxuICogICAgIHJvb21SZWN2SVBzOiBbJzE5Mi4xNjguMS4xJ10sXG4gKiAgICAgbWVldGluZ1Jvb21QYXJhbXM6IG15TWVldGluZ1BhcmFtcyxcbiAqICAgICBpdGVtUGFnZUxpbWl0OiAzLFxuICogICAgIGF1ZGlvT25seVJvb206IGZhbHNlLFxuICogICAgIGFkZEZvckJhc2ljOiB0cnVlLFxuICogICAgIHNjcmVlblBhZ2VMaW1pdDogMixcbiAqICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGZhbHNlLFxuICogICAgIHNoYXJlZDogdHJ1ZSxcbiAqICAgICB0YXJnZXRPcmllbnRhdGlvbjogJ2xhbmRzY2FwZScsXG4gKiAgICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0cnVlLFxuICogICAgIGZyYW1lUmF0ZTogMTUsXG4gKiAgICAgYWRtaW5QYXNzY29kZTogJ2FkbWluMTIzJyxcbiAqICAgICBldmVudFR5cGU6ICdjb25mZXJlbmNlJyxcbiAqICAgICB5b3VBcmVDb0hvc3Q6IGZhbHNlLFxuICogICAgIHVwZGF0ZVJ0cENhcGFiaWxpdGllczogKHJ0cCkgPT4gY29uc29sZS5sb2coJ1VwZGF0aW5nIFJUUDonLCBydHApLFxuICogICAgIHVwZGF0ZVJvb21SZWN2SVBzOiAoaXBzKSA9PiBjb25zb2xlLmxvZygnVXBkYXRpbmcgSVBzOicsIGlwcyksXG4gKiAgICAgdXBkYXRlTWVldGluZ1Jvb21QYXJhbXM6IChwYXJhbXMpID0+IGNvbnNvbGUubG9nKCdVcGRhdGluZyByb29tIHBhcmFtczonLCBwYXJhbXMpLFxuICogICAgIC8vIEFkZGl0aW9uYWwgcGFyYW1ldGVycy4uLlxuICogICB9LFxuICogfTtcbiAqXG4gKiBjb25zdCB1cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCA9IG5ldyBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCh2aWRlb0NhcHR1cmVDb25zdHJhaW50cywgaFBhcmFtcywgdlBhcmFtcywgc2NyZWVuUGFyYW1zLCBhUGFyYW1zKTtcbiAqIHVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50LnVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50KG9wdGlvbnMpO1xuICogYGBgXG4gKlxuICogVGhpcyBleGFtcGxlIGRlbW9uc3RyYXRlcyBzZXR0aW5nIHVwIHJvb20gcGFyYW1ldGVycyBmb3IgYSBjb25mZXJlbmNlLXR5cGUgcm9vbSB3aXRoIHJlY29yZGluZyBzdXBwb3J0IGFuZCBjdXN0b20gdXBkYXRlIGZ1bmN0aW9ucy5cbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzOiBWaWRlb0NhcHR1cmVDb25zdHJhaW50cyxcbiAgICBwcml2YXRlIGhQYXJhbXM6IEhQYXJhbXMsXG4gICAgcHJpdmF0ZSB2UGFyYW1zOiBWUGFyYW1zLFxuICAgIHByaXZhdGUgc2NyZWVuUGFyYW1zOiBTY3JlZW5QYXJhbXMsXG4gICAgcHJpdmF0ZSBhUGFyYW1zOiBBUGFyYW1zLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBSb29tIFBhcmFtZXRlcnMgQ2xpZW50IGFmdGVyIHRoZSB1c2VyIGhhcyBqb2luZWQgdGhlIHJvb20gYW5kIHRoZSByb29tIHBhcmFtZXRlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB2YXJpb3VzIHBhcmFtZXRlcnMgYW5kIHVwZGF0ZSBmdW5jdGlvbnMuXG4gICAqL1xuICB1cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCA9ICh7IHBhcmFtZXRlcnMgfTogVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnRPcHRpb25zKTogdm9pZCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc2NyZWVuUGFnZUxpbWl0LFxuICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgIHNoYXJlZCxcblxuICAgICAgICBoUGFyYW1zLFxuICAgICAgICB2UGFyYW1zLFxuICAgICAgICBmcmFtZVJhdGUsXG5cbiAgICAgICAgaXNsZXZlbCxcbiAgICAgICAgc2hvd0FsZXJ0LFxuICAgICAgICBkYXRhLFxuXG4gICAgICAgIC8vdXBkYXRlc1xuICAgICAgICB1cGRhdGVSdHBDYXBhYmlsaXRpZXMsXG4gICAgICAgIHVwZGF0ZVJvb21SZWN2SVBzLFxuICAgICAgICB1cGRhdGVNZWV0aW5nUm9vbVBhcmFtcyxcbiAgICAgICAgdXBkYXRlSXRlbVBhZ2VMaW1pdCxcbiAgICAgICAgdXBkYXRlQXVkaW9Pbmx5Um9vbSxcbiAgICAgICAgdXBkYXRlU2NyZWVuUGFnZUxpbWl0LFxuICAgICAgICB1cGRhdGVWaWRDb25zLFxuICAgICAgICB1cGRhdGVGcmFtZVJhdGUsXG4gICAgICAgIHVwZGF0ZUFkbWluUGFzc2NvZGUsXG4gICAgICAgIHVwZGF0ZUV2ZW50VHlwZSxcbiAgICAgICAgdXBkYXRlWW91QXJlQ29Ib3N0LFxuICAgICAgICB1cGRhdGVBdXRvV2F2ZSxcbiAgICAgICAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgdXBkYXRlQ2hhdFNldHRpbmcsXG4gICAgICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZSxcbiAgICAgICAgdXBkYXRlQXVkaW9TZXR0aW5nLFxuICAgICAgICB1cGRhdGVWaWRlb1NldHRpbmcsXG4gICAgICAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICAgICAgdXBkYXRlSFBhcmFtcyxcbiAgICAgICAgdXBkYXRlVlBhcmFtcyxcbiAgICAgICAgdXBkYXRlU2NyZWVuUGFyYW1zLFxuICAgICAgICB1cGRhdGVBUGFyYW1zLFxuICAgICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uLFxuICAgICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdCxcblxuICAgICAgICAvLyBSZWNvcmRpbmcgdXBkYXRlc1xuICAgICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0LFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50LFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1N1cHBvcnQsXG4gICAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQsXG4gICAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0LFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50LFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0LFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQsXG4gICAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQsXG4gICAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0LFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQsXG4gICAgICAgIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCxcbiAgICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQsXG4gICAgICAgIHVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbixcbiAgICAgICAgdXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydCxcbiAgICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zLFxuICAgICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnMsXG4gICAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMgPT0gbnVsbCkge1xuICAgICAgICBsZXQgcmVhc29uID0gZGF0YS5yZWFzb24gfHwgJyc7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnU29ycnksIHlvdSBhcmUgbm90IGFsbG93ZWQgdG8gam9pbiB0aGlzIHJvb20uICcgKyByZWFzb24sXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBhbGwgdmFsdWVzXG4gICAgICB1cGRhdGVSdHBDYXBhYmlsaXRpZXMoZGF0YS5ydHBDYXBhYmlsaXRpZXMpO1xuICAgICAgdXBkYXRlQWRtaW5QYXNzY29kZShkYXRhLnNlY3VyZUNvZGUpO1xuICAgICAgdXBkYXRlUm9vbVJlY3ZJUHMoZGF0YS5yb29tUmVjdklQcyk7XG4gICAgICB1cGRhdGVNZWV0aW5nUm9vbVBhcmFtcyhkYXRhLm1lZXRpbmdSb29tUGFyYW1zKTtcblxuICAgICAgLy8gVXBkYXRlIHJlY29yZGluZyB2YWx1ZXNcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQoZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCk7XG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50KGRhdGEucmVjb3JkaW5nUGFyYW1zLnJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQhKTtcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvU3VwcG9ydChkYXRhLnJlY29yZGluZ1BhcmFtcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQpO1xuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdChkYXRhLnJlY29yZGluZ1BhcmFtcy5yZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0KTtcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0KFxuICAgICAgICBkYXRhLnJlY29yZGluZ1BhcmFtcy5yZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdCxcbiAgICAgICk7XG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50KGRhdGEucmVjb3JkaW5nUGFyYW1zLnJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQhKTtcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQoZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdCk7XG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQoZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0KTtcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQoZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdCk7XG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdChcbiAgICAgICAgZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQsXG4gICAgICApO1xuICAgICAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydChkYXRhLnJlY29yZGluZ1BhcmFtcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0KTtcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydChcbiAgICAgICAgZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0LFxuICAgICAgKTtcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydChcbiAgICAgICAgZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LFxuICAgICAgKTtcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0KFxuICAgICAgICBkYXRhLnJlY29yZGluZ1BhcmFtcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCxcbiAgICAgICk7XG4gICAgICB1cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbihkYXRhLnJlY29yZGluZ1BhcmFtcy5yZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbik7XG4gICAgICB1cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbihcbiAgICAgICAgZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24sXG4gICAgICApO1xuICAgICAgdXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydChkYXRhLnJlY29yZGluZ1BhcmFtcy5yZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0KTtcblxuICAgICAgLy8gVXBkYXRlIG90aGVyIG1lZXRpbmcgcm9vbSBzZXR0aW5nc1xuICAgICAgdXBkYXRlSXRlbVBhZ2VMaW1pdChkYXRhLm1lZXRpbmdSb29tUGFyYW1zLml0ZW1QYWdlTGltaXQpO1xuICAgICAgdXBkYXRlRXZlbnRUeXBlKGRhdGEubWVldGluZ1Jvb21QYXJhbXMudHlwZSk7XG5cbiAgICAgIGlmIChkYXRhLm1lZXRpbmdSb29tUGFyYW1zLnR5cGUgPT0gJ2NoYXQnICYmIGlzbGV2ZWwgIT0gJzInKSB7XG4gICAgICAgIHVwZGF0ZVlvdUFyZUNvSG9zdCh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFsnY2hhdCcsICdicm9hZGNhc3QnXS5pbmNsdWRlcyhkYXRhLm1lZXRpbmdSb29tUGFyYW1zLnR5cGUpKSB7XG4gICAgICAgIHVwZGF0ZUF1dG9XYXZlKGZhbHNlKTtcbiAgICAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlKCdhbGwnKTtcbiAgICAgICAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheSh0cnVlKTtcbiAgICAgICAgdXBkYXRlQ2hhdFNldHRpbmcoJ2FsbG93Jyk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZyhkYXRhLm1lZXRpbmdSb29tUGFyYW1zLmF1ZGlvU2V0dGluZyk7XG4gICAgICB1cGRhdGVWaWRlb1NldHRpbmcoZGF0YS5tZWV0aW5nUm9vbVBhcmFtcy52aWRlb1NldHRpbmcpO1xuICAgICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nKGRhdGEubWVldGluZ1Jvb21QYXJhbXMuc2NyZWVuc2hhcmVTZXR0aW5nKTtcbiAgICAgIHVwZGF0ZUNoYXRTZXR0aW5nKGRhdGEubWVldGluZ1Jvb21QYXJhbXMuY2hhdFNldHRpbmcpO1xuXG4gICAgICB1cGRhdGVBdWRpb09ubHlSb29tKGRhdGEubWVldGluZ1Jvb21QYXJhbXMubWVkaWFUeXBlICE9ICd2aWRlbycpO1xuXG4gICAgICBpZiAoZGF0YS5tZWV0aW5nUm9vbVBhcmFtcy50eXBlID09ICdjaGF0JyB8fCBkYXRhLm1lZXRpbmdSb29tUGFyYW1zLnR5cGUgPT0gJ2Jyb2FkY2FzdCcpIHtcbiAgICAgICAgaWYgKGRhdGEubWVldGluZ1Jvb21QYXJhbXMudHlwZSA9PSAnYnJvYWRjYXN0Jykge1xuICAgICAgICAgIHVwZGF0ZUl0ZW1QYWdlTGltaXQoMSk7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zKCdtYWluU2NyZWVuJyk7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zKCdob3N0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlSXRlbVBhZ2VMaW1pdCgyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS5tZWV0aW5nUm9vbVBhcmFtcy50eXBlID09ICdjb25mZXJlbmNlJyAmJiAoc2hhcmVkIHx8IHNoYXJlU2NyZWVuU3RhcnRlZCkpIHtcbiAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoKDEwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgoMCk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZVNjcmVlblBhZ2VMaW1pdChNYXRoLm1pbihkYXRhLm1lZXRpbmdSb29tUGFyYW1zLml0ZW1QYWdlTGltaXQsIHNjcmVlblBhZ2VMaW1pdCkpO1xuXG4gICAgICAvLyBBc3NpZ24gbWVkaWEgY2FwdHVyZSBjb25zdHJhaW50cyBiYXNlZCBvbiB0aGUgdXNlcidzIHJvbGUgYW5kIHJvb20gc2V0dGluZ3NcbiAgICAgIGxldCB0YXJnZXRPcmllbnRhdGlvbiA9XG4gICAgICAgIGlzbGV2ZWwgPT0gJzInXG4gICAgICAgICAgPyBkYXRhLm1lZXRpbmdSb29tUGFyYW1zLnRhcmdldE9yaWVudGF0aW9uSG9zdFxuICAgICAgICAgIDogZGF0YS5tZWV0aW5nUm9vbVBhcmFtcy50YXJnZXRPcmllbnRhdGlvbjtcbiAgICAgIGxldCB0YXJnZXRSZXNvbHV0aW9uID1cbiAgICAgICAgaXNsZXZlbCA9PSAnMidcbiAgICAgICAgICA/IGRhdGEubWVldGluZ1Jvb21QYXJhbXMudGFyZ2V0UmVzb2x1dGlvbkhvc3RcbiAgICAgICAgICA6IGRhdGEubWVldGluZ1Jvb21QYXJhbXMudGFyZ2V0UmVzb2x1dGlvbjtcblxuICAgICAgbGV0IHZpZENvbnM6IFZpZENvbnM7XG4gICAgICBpZiAodGFyZ2V0T3JpZW50YXRpb24gPT0gJ2xhbmRzY2FwZScpIHtcbiAgICAgICAgdmlkQ29ucyA9XG4gICAgICAgICAgdGFyZ2V0UmVzb2x1dGlvbiA9PSAnaGQnXG4gICAgICAgICAgICA/IHRoaXMudmlkZW9DYXB0dXJlQ29uc3RyYWludHMuaGRDb25zXG4gICAgICAgICAgICA6IHRhcmdldFJlc29sdXRpb24gPT0gJ1FuSEQnXG4gICAgICAgICAgICA/IHRoaXMudmlkZW9DYXB0dXJlQ29uc3RyYWludHMuUW5IRENvbnNcbiAgICAgICAgICAgIDogdGFyZ2V0UmVzb2x1dGlvbiA9PSAnZmhkJ1xuICAgICAgICAgICAgPyB0aGlzLnZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzLmZoZENvbnNcbiAgICAgICAgICAgIDogdGFyZ2V0UmVzb2x1dGlvbiA9PSAncWhkJ1xuICAgICAgICAgICAgPyB0aGlzLnZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzLnFoZENvbnNcbiAgICAgICAgICAgIDogdGhpcy52aWRlb0NhcHR1cmVDb25zdHJhaW50cy5zZENvbnM7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldE9yaWVudGF0aW9uID09ICduZXV0cmFsJykge1xuICAgICAgICB2aWRDb25zID1cbiAgICAgICAgICB0YXJnZXRSZXNvbHV0aW9uID09ICdoZCdcbiAgICAgICAgICAgID8gdGhpcy52aWRlb0NhcHR1cmVDb25zdHJhaW50cy5oZENvbnNOZXVcbiAgICAgICAgICAgIDogdGFyZ2V0UmVzb2x1dGlvbiA9PSAnUW5IRCdcbiAgICAgICAgICAgID8gdGhpcy52aWRlb0NhcHR1cmVDb25zdHJhaW50cy5RbkhEQ29uc05ldVxuICAgICAgICAgICAgOiB0YXJnZXRSZXNvbHV0aW9uID09ICdmaGQnXG4gICAgICAgICAgICA/IHRoaXMudmlkZW9DYXB0dXJlQ29uc3RyYWludHMuZmhkQ29uc05ldVxuICAgICAgICAgICAgOiB0YXJnZXRSZXNvbHV0aW9uID09ICdxaGQnXG4gICAgICAgICAgICA/IHRoaXMudmlkZW9DYXB0dXJlQ29uc3RyYWludHMucWhkQ29uc05ldVxuICAgICAgICAgICAgOiB0aGlzLnZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzLnNkQ29uc05ldTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZENvbnMgPVxuICAgICAgICAgIHRhcmdldFJlc29sdXRpb24gPT0gJ2hkJ1xuICAgICAgICAgICAgPyB0aGlzLnZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzLmhkQ29uc1BvcnRcbiAgICAgICAgICAgIDogdGFyZ2V0UmVzb2x1dGlvbiA9PSAnUW5IRCdcbiAgICAgICAgICAgID8gdGhpcy52aWRlb0NhcHR1cmVDb25zdHJhaW50cy5RbkhEQ29uc1BvcnRcbiAgICAgICAgICAgIDogdGFyZ2V0UmVzb2x1dGlvbiA9PSAnZmhkJ1xuICAgICAgICAgICAgPyB0aGlzLnZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzLmZoZENvbnNQb3J0XG4gICAgICAgICAgICA6IHRhcmdldFJlc29sdXRpb24gPT0gJ3FoZCdcbiAgICAgICAgICAgID8gdGhpcy52aWRlb0NhcHR1cmVDb25zdHJhaW50cy5xaGRDb25zUG9ydFxuICAgICAgICAgICAgOiB0aGlzLnZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzLnNkQ29uc1BvcnQ7XG4gICAgICB9XG5cbiAgICAgIGxldCBmcmFtZVJhdGVWYWx1ZSA9IGZyYW1lUmF0ZSA/IGZyYW1lUmF0ZSA6IDEwO1xuXG4gICAgICBsZXQgdlBhcmFtc1ZhbHVlID0geyAuLi52UGFyYW1zIH07XG4gICAgICBsZXQgaFBhcmFtc1ZhbHVlID0geyAuLi5oUGFyYW1zIH07XG4gICAgICBpZiAoT2JqZWN0LmtleXModlBhcmFtc1ZhbHVlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdlBhcmFtc1ZhbHVlID0gdGhpcy52UGFyYW1zLnZQYXJhbXM7XG4gICAgICB9XG4gICAgICBpZiAoT2JqZWN0LmtleXMoaFBhcmFtc1ZhbHVlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaFBhcmFtc1ZhbHVlID0gdGhpcy5oUGFyYW1zLmhQYXJhbXM7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRSZXNvbHV0aW9uID09ICdoZCcpIHtcbiAgICAgICAgZnJhbWVSYXRlVmFsdWUgPSB0aGlzLnZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzLmhkRnJhbWVSYXRlO1xuXG4gICAgICAgIHZQYXJhbXNWYWx1ZS5lbmNvZGluZ3MuZm9yRWFjaCgoZW5jb2Rpbmc6IFBhcnRpYWw8VlBhcmFtc1R5cGVbJ2VuY29kaW5ncyddWzBdPikgPT4ge1xuICAgICAgICAgIGVuY29kaW5nLm1heEJpdHJhdGUgJiYgKGVuY29kaW5nLm1heEJpdHJhdGUgKj0gNCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhQYXJhbXNWYWx1ZS5lbmNvZGluZ3MuZm9yRWFjaCgoZW5jb2Rpbmc6IFBhcnRpYWw8SFBhcmFtc1R5cGVbJ2VuY29kaW5ncyddWzBdPikgPT4ge1xuICAgICAgICAgIGVuY29kaW5nLm1heEJpdHJhdGUgJiYgKGVuY29kaW5nLm1heEJpdHJhdGUgKj0gNCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXRSZXNvbHV0aW9uID09ICdRbkhEJykge1xuICAgICAgICBmcmFtZVJhdGVWYWx1ZSA9IHRoaXMudmlkZW9DYXB0dXJlQ29uc3RyYWludHMuUW5IREZyYW1lUmF0ZTtcbiAgICAgICAgdlBhcmFtc1ZhbHVlLmVuY29kaW5ncy5mb3JFYWNoKChlbmNvZGluZzogUGFydGlhbDxWUGFyYW1zVHlwZVsnZW5jb2RpbmdzJ11bMF0+KSA9PiB7XG4gICAgICAgICAgZW5jb2RpbmcubWF4Qml0cmF0ZSAmJiAoZW5jb2RpbmcubWF4Qml0cmF0ZSAqPSAwLjI1KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaFBhcmFtc1ZhbHVlLmVuY29kaW5ncy5mb3JFYWNoKChlbmNvZGluZzogUGFydGlhbDxIUGFyYW1zVHlwZVsnZW5jb2RpbmdzJ11bMF0+KSA9PiB7XG4gICAgICAgICAgZW5jb2RpbmcubWF4Qml0cmF0ZSAmJiAoZW5jb2RpbmcubWF4Qml0cmF0ZSAqPSAwLjI1KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaFBhcmFtc1ZhbHVlLmNvZGVjT3B0aW9ucyEudmlkZW9Hb29nbGVTdGFydEJpdHJhdGUhICo9IDAuMjU7XG4gICAgICAgIHZQYXJhbXNWYWx1ZS5jb2RlY09wdGlvbnMhLnZpZGVvR29vZ2xlU3RhcnRCaXRyYXRlISAqPSAwLjI1O1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXRSZXNvbHV0aW9uID09ICdmaGQnKSB7XG4gICAgICAgIGZyYW1lUmF0ZVZhbHVlID0gdGhpcy52aWRlb0NhcHR1cmVDb25zdHJhaW50cy5maGRGcmFtZVJhdGU7XG4gICAgICAgIHZQYXJhbXNWYWx1ZS5lbmNvZGluZ3MuZm9yRWFjaCgoZW5jb2Rpbmc6IFBhcnRpYWw8VlBhcmFtc1R5cGVbJ2VuY29kaW5ncyddWzBdPikgPT4ge1xuICAgICAgICAgIGVuY29kaW5nLm1heEJpdHJhdGUgJiYgKGVuY29kaW5nLm1heEJpdHJhdGUgKj0gOCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhQYXJhbXNWYWx1ZS5lbmNvZGluZ3MuZm9yRWFjaCgoZW5jb2Rpbmc6IFBhcnRpYWw8SFBhcmFtc1R5cGVbJ2VuY29kaW5ncyddWzBdPikgPT4ge1xuICAgICAgICAgIGVuY29kaW5nLm1heEJpdHJhdGUgJiYgKGVuY29kaW5nLm1heEJpdHJhdGUgKj0gOCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhQYXJhbXNWYWx1ZS5jb2RlY09wdGlvbnMhLnZpZGVvR29vZ2xlU3RhcnRCaXRyYXRlISAqPSA4O1xuICAgICAgICB2UGFyYW1zVmFsdWUuY29kZWNPcHRpb25zIS52aWRlb0dvb2dsZVN0YXJ0Qml0cmF0ZSEgKj0gODtcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0UmVzb2x1dGlvbiA9PSAncWhkJykge1xuICAgICAgICBmcmFtZVJhdGVWYWx1ZSA9IHRoaXMudmlkZW9DYXB0dXJlQ29uc3RyYWludHMucWhkRnJhbWVSYXRlO1xuICAgICAgICB2UGFyYW1zVmFsdWUuZW5jb2RpbmdzLmZvckVhY2goKGVuY29kaW5nOiBQYXJ0aWFsPFZQYXJhbXNUeXBlWydlbmNvZGluZ3MnXVswXT4pID0+IHtcbiAgICAgICAgICBlbmNvZGluZy5tYXhCaXRyYXRlICYmIChlbmNvZGluZy5tYXhCaXRyYXRlICo9IDE2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaFBhcmFtc1ZhbHVlLmVuY29kaW5ncy5mb3JFYWNoKChlbmNvZGluZzogUGFydGlhbDxIUGFyYW1zVHlwZVsnZW5jb2RpbmdzJ11bMF0+KSA9PiB7XG4gICAgICAgICAgZW5jb2RpbmcubWF4Qml0cmF0ZSAmJiAoZW5jb2RpbmcubWF4Qml0cmF0ZSAqPSAxNik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhQYXJhbXNWYWx1ZS5jb2RlY09wdGlvbnMhLnZpZGVvR29vZ2xlU3RhcnRCaXRyYXRlISAqPSAxNjtcbiAgICAgICAgdlBhcmFtc1ZhbHVlLmNvZGVjT3B0aW9ucyEudmlkZW9Hb29nbGVTdGFydEJpdHJhdGUhICo9IDE2O1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS5yZWNvcmRpbmdQYXJhbXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0KSB7XG4gICAgICAgIHZQYXJhbXNWYWx1ZS5lbmNvZGluZ3MuZm9yRWFjaCgoZW5jb2Rpbmc6IFBhcnRpYWw8VlBhcmFtc1R5cGVbJ2VuY29kaW5ncyddWzBdPikgPT4ge1xuICAgICAgICAgIGVuY29kaW5nLm1heEJpdHJhdGUgJiYgKGVuY29kaW5nLm1heEJpdHJhdGUgKj0gMS4yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaFBhcmFtc1ZhbHVlLmVuY29kaW5ncy5mb3JFYWNoKChlbmNvZGluZzogUGFydGlhbDxIUGFyYW1zVHlwZVsnZW5jb2RpbmdzJ11bMF0+KSA9PiB7XG4gICAgICAgICAgZW5jb2RpbmcubWF4Qml0cmF0ZSAmJiAoZW5jb2RpbmcubWF4Qml0cmF0ZSAqPSAxLjIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBoUGFyYW1zVmFsdWUuY29kZWNPcHRpb25zIS52aWRlb0dvb2dsZVN0YXJ0Qml0cmF0ZSEgKj0gMS4yO1xuICAgICAgICB2UGFyYW1zVmFsdWUuY29kZWNPcHRpb25zIS52aWRlb0dvb2dsZVN0YXJ0Qml0cmF0ZSEgKj0gMS4yO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVWaWRDb25zKHZpZENvbnMpO1xuICAgICAgdXBkYXRlRnJhbWVSYXRlKGZyYW1lUmF0ZVZhbHVlKTtcbiAgICAgIHVwZGF0ZUhQYXJhbXMoaFBhcmFtc1ZhbHVlKTtcbiAgICAgIHVwZGF0ZVZQYXJhbXModlBhcmFtc1ZhbHVlKTtcbiAgICAgIHVwZGF0ZVNjcmVlblBhcmFtcyh0aGlzLnNjcmVlblBhcmFtcy5zY3JlZW5QYXJhbXMpO1xuICAgICAgdXBkYXRlQVBhcmFtcyh0aGlzLmFQYXJhbXMuYVBhcmFtcyk7XG4gICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uKGRhdGEubWVldGluZ1Jvb21QYXJhbXMudGFyZ2V0UmVzb2x1dGlvbik7XG4gICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdChkYXRhLm1lZXRpbmdSb29tUGFyYW1zLnRhcmdldFJlc29sdXRpb25Ib3N0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50IGVycm9yJywgZXJyb3IpO1xuICAgICAgcGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6IChlcnJvciBhcyBFcnJvcikubWVzc2FnZSxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19