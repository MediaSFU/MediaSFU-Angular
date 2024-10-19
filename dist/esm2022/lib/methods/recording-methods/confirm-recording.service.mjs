import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConfirmRecording {
    /**
     * Confirms the recording settings based on the provided parameters and updates the recording state.
     *
     * @param {ConfirmRecordingOptions} options - The options for confirming the recording.
     * @param {Parameters} options.parameters - The parameters for the recording.
     *
     * @returns {Promise<void>} A promise that resolves when the recording settings have been confirmed.
     *
     * @remarks
     * This function performs several checks to ensure that the recording settings are valid based on the provided parameters.
     * If any of the checks fail, an alert is shown and the function returns early without updating the recording state.
     *
     * The function checks for the following conditions:
     * - Whether recording videos of all participants is allowed.
     * - Whether recording all participants is allowed.
     * - Whether recording other video participants is allowed.
     * - Whether recording all orientations is allowed.
     * - Whether recording the preferred orientation is allowed.
     * - Whether recording all formats is allowed.
     * - Whether the recording display type is valid based on the meeting display type.
     * - Whether recording all participants with media is allowed.
     *
     * If all checks pass, the function constructs the `mainSpecs`, `dispSpecs`, and `textSpecs` objects based on the state variables,
     * updates the user recording parameters, and confirms the recording.
     *
     * @example
     * ```typescript
     * const options: ConfirmRecordingOptions = { parameters: someParameters };
     * await confirmRecording(options);
     * ```
     */
    confirmRecording = async ({ parameters }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { showAlert, recordingMediaOptions, recordingAudioOptions, recordingVideoOptions, recordingVideoType, recordingDisplayType, recordingNameTags, recordingBackgroundColor, recordingNameTagsColor, recordingOrientationVideo, recordingAddHLS, recordingAddText, recordingCustomText, recordingCustomTextPosition, recordingCustomTextColor, meetingDisplayType, recordingVideoParticipantsFullRoomSupport, recordingAllParticipantsSupport, recordingVideoParticipantsSupport, recordingSupportForOtherOrientation, recordingPreferredOrientation, recordingMultiFormatsSupport, recordingVideoOptimized, recordingAllParticipantsFullRoomSupport, meetingVideoOptimized, eventType, breakOutRoomStarted, breakOutRoomEnded, updateRecordingDisplayType, updateRecordingVideoOptimized, updateRecordingVideoParticipantsFullRoomSupport, updateRecordingAllParticipantsSupport, updateRecordingVideoParticipantsSupport, updateRecordingSupportForOtherOrientation, updateRecordingPreferredOrientation, updateRecordingMultiFormatsSupport, updateUserRecordingParams, updateConfirmedToRecord, } = parameters;
        // Retrieve the values from the state
        const mediaOptions = recordingMediaOptions;
        // Other variables not provided in the guide
        const selectedRecordOption = recordingDisplayType;
        // Additional logic similar to the provided guide
        // recordingVideoParticipantsFullRoomSupport = minigrid and main video
        if (eventType !== 'broadcast') {
            if (!recordingVideoParticipantsFullRoomSupport &&
                recordingVideoOptions === 'all' &&
                mediaOptions === 'video') {
                if (meetingDisplayType == 'all') {
                    if (breakOutRoomStarted && !breakOutRoomEnded) {
                        // breakout rooms are started
                    }
                    else {
                        showAlert?.({
                            message: 'You are not allowed to record videos of all participants; change the meeting display type to video or video optimized.',
                            type: 'danger',
                            duration: 3000,
                        });
                        return;
                    }
                }
            }
            // recordingAllParticipantsSupport  = others other than host screen (video + audio)
            if (!recordingAllParticipantsSupport && recordingVideoOptions === 'all') {
                showAlert?.({
                    message: 'You are only allowed to record yourself.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
            // recordingVideoParticipantsSupport (maingrid + non-host screenshare person)
            if (!recordingVideoParticipantsSupport && recordingDisplayType === 'video') {
                showAlert?.({
                    message: 'You are not allowed to record other video participants.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        if (!recordingSupportForOtherOrientation && recordingOrientationVideo === 'all') {
            showAlert?.({
                message: 'You are not allowed to record all orientations.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        if (recordingPreferredOrientation === 'landscape' &&
            recordingOrientationVideo === 'portrait' &&
            !recordingSupportForOtherOrientation) {
            showAlert?.({
                message: 'You are not allowed to record portrait orientation.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        else if (recordingPreferredOrientation === 'portrait' &&
            recordingOrientationVideo === 'landscape' &&
            !recordingSupportForOtherOrientation) {
            showAlert?.({
                message: 'You are not allowed to record landscape orientation.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        if (!recordingMultiFormatsSupport && recordingVideoType === 'all') {
            showAlert?.({
                message: 'You are not allowed to record all formats.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        if (eventType !== 'broadcast') {
            if (recordingMediaOptions === 'video') {
                if (meetingDisplayType === 'media') {
                    if (recordingDisplayType === 'all') {
                        showAlert?.({
                            message: 'Recording display type can be either video, video optimized, or media when meeting display type is media.',
                            type: 'danger',
                            duration: 3000,
                        });
                        recordingDisplayType = meetingDisplayType;
                        return;
                    }
                }
                else if (meetingDisplayType === 'video') {
                    if (recordingDisplayType === 'all' || recordingDisplayType === 'media') {
                        showAlert?.({
                            message: 'Recording display type can be either video or video optimized when meeting display type is video.',
                            type: 'danger',
                            duration: 3000,
                        });
                        recordingDisplayType = meetingDisplayType;
                        return;
                    }
                    if (meetingVideoOptimized && !recordingVideoOptimized) {
                        showAlert?.({
                            message: 'Recording display type can be only video optimized when meeting display type is video optimized.',
                            type: 'danger',
                            duration: 3000,
                        });
                        recordingVideoOptimized = meetingVideoOptimized;
                        return;
                    }
                }
            }
            else {
                if (recordingDisplayType === 'all' || recordingDisplayType === 'media') {
                    // do nothing
                }
                else {
                    recordingDisplayType = 'media';
                }
                recordingVideoOptimized = false;
            }
        }
        if (recordingDisplayType === 'all' && !recordingAllParticipantsFullRoomSupport) {
            showAlert?.({
                message: 'You can only record all participants with media.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        // Construct mainSpecs and dispSpecs objects based on the state variables
        const mainSpecs = {
            mediaOptions: recordingMediaOptions,
            audioOptions: recordingAudioOptions,
            videoOptions: recordingVideoOptions,
            videoType: recordingVideoType,
            videoOptimized: recordingVideoOptimized,
            recordingDisplayType: recordingDisplayType,
            addHLS: recordingAddHLS,
        };
        const dispSpecs = {
            nameTags: recordingNameTags,
            backgroundColor: recordingBackgroundColor,
            nameTagsColor: recordingNameTagsColor,
            orientationVideo: recordingOrientationVideo,
        };
        const textSpecs = {
            addText: recordingAddText,
            customText: recordingCustomText,
            customTextPosition: recordingCustomTextPosition,
            customTextColor: recordingCustomTextColor,
        };
        // Construct userRecordingParams object
        const userRecordingParams = { mainSpecs, dispSpecs, textSpecs };
        // Update state variables based on the logic
        updateUserRecordingParams(userRecordingParams);
        updateConfirmedToRecord(true);
        updateRecordingDisplayType(selectedRecordOption);
        updateRecordingVideoOptimized(recordingVideoOptimized);
        updateRecordingVideoParticipantsFullRoomSupport(recordingVideoParticipantsFullRoomSupport);
        updateRecordingAllParticipantsSupport(recordingAllParticipantsSupport);
        updateRecordingVideoParticipantsSupport(recordingVideoParticipantsSupport);
        updateRecordingSupportForOtherOrientation(recordingSupportForOtherOrientation);
        updateRecordingPreferredOrientation(recordingPreferredOrientation);
        updateRecordingMultiFormatsSupport(recordingMultiFormatsSupport);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmRecording, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1yZWNvcmRpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2NvbmZpcm0tcmVjb3JkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEyRDNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRztJQUVILGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBMkIsRUFBaUIsRUFBRTtRQUNsRixJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFFbkMsSUFBSSxFQUNGLFNBQVMsRUFDVCxxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLHlCQUF5QixFQUN6QixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDM0Isd0JBQXdCLEVBQ3hCLGtCQUFrQixFQUNsQix5Q0FBeUMsRUFDekMsK0JBQStCLEVBQy9CLGlDQUFpQyxFQUNqQyxtQ0FBbUMsRUFDbkMsNkJBQTZCLEVBQzdCLDRCQUE0QixFQUM1Qix1QkFBdUIsRUFDdkIsdUNBQXVDLEVBQ3ZDLHFCQUFxQixFQUNyQixTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUVqQiwwQkFBMEIsRUFDMUIsNkJBQTZCLEVBQzdCLCtDQUErQyxFQUMvQyxxQ0FBcUMsRUFDckMsdUNBQXVDLEVBQ3ZDLHlDQUF5QyxFQUN6QyxtQ0FB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LHFDQUFxQyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDdkUsdUNBQXVDLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUMzRSx5Q0FBeUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQy9FLG1DQUFtQyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDbkUsa0NBQWtDLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNuRSxDQUFDLENBQUM7dUdBblJTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFNob3dBbGVydCxcbiAgTWFpblNwZWNzLFxuICBEaXNwU3BlY3MsXG4gIFRleHRTcGVjcyxcbiAgRXZlbnRUeXBlLFxuICBVc2VyUmVjb3JkaW5nUGFyYW1zLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1SZWNvcmRpbmdQYXJhbWV0ZXJzIHtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZztcbiAgcmVjb3JkaW5nQXVkaW9PcHRpb25zOiBzdHJpbmc7XG4gIHJlY29yZGluZ1ZpZGVvT3B0aW9uczogc3RyaW5nO1xuICByZWNvcmRpbmdWaWRlb1R5cGU6IHN0cmluZztcbiAgcmVjb3JkaW5nRGlzcGxheVR5cGU6ICd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCc7XG4gIHJlY29yZGluZ05hbWVUYWdzOiBib29sZWFuO1xuICByZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgcmVjb3JkaW5nTmFtZVRhZ3NDb2xvcjogc3RyaW5nO1xuICByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvOiBzdHJpbmc7XG4gIHJlY29yZGluZ0FkZEhMUzogYm9vbGVhbjtcbiAgcmVjb3JkaW5nQWRkVGV4dDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dDogc3RyaW5nO1xuICByZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb246IHN0cmluZztcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yOiBzdHJpbmc7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0OiBib29sZWFuO1xuICByZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbjogYm9vbGVhbjtcbiAgcmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb246IHN0cmluZztcbiAgcmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDogYm9vbGVhbjtcbiAgbWVldGluZ1ZpZGVvT3B0aW1pemVkOiBib29sZWFuO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tRW5kZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlOiAodmFsdWU6ICd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCcpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXM6IChwYXJhbXM6IFVzZXJSZWNvcmRpbmdQYXJhbXMpID0+IHZvaWQ7XG4gIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gTWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENvbmZpcm1SZWNvcmRpbmdQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybVJlY29yZGluZ09wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBDb25maXJtUmVjb3JkaW5nUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29uZmlybVJlY29yZGluZ1R5cGUgPSAob3B0aW9uczogQ29uZmlybVJlY29yZGluZ09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtUmVjb3JkaW5nIHtcbiAgLyoqXG4gICAqIENvbmZpcm1zIHRoZSByZWNvcmRpbmcgc2V0dGluZ3MgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMgYW5kIHVwZGF0ZXMgdGhlIHJlY29yZGluZyBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maXJtUmVjb3JkaW5nT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjb25maXJtaW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7UGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSByZWNvcmRpbmcuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZWNvcmRpbmcgc2V0dGluZ3MgaGF2ZSBiZWVuIGNvbmZpcm1lZC5cbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogVGhpcyBmdW5jdGlvbiBwZXJmb3JtcyBzZXZlcmFsIGNoZWNrcyB0byBlbnN1cmUgdGhhdCB0aGUgcmVjb3JkaW5nIHNldHRpbmdzIGFyZSB2YWxpZCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAgICogSWYgYW55IG9mIHRoZSBjaGVja3MgZmFpbCwgYW4gYWxlcnQgaXMgc2hvd24gYW5kIHRoZSBmdW5jdGlvbiByZXR1cm5zIGVhcmx5IHdpdGhvdXQgdXBkYXRpbmcgdGhlIHJlY29yZGluZyBzdGF0ZS5cbiAgICpcbiAgICogVGhlIGZ1bmN0aW9uIGNoZWNrcyBmb3IgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgKiAtIFdoZXRoZXIgcmVjb3JkaW5nIHZpZGVvcyBvZiBhbGwgcGFydGljaXBhbnRzIGlzIGFsbG93ZWQuXG4gICAqIC0gV2hldGhlciByZWNvcmRpbmcgYWxsIHBhcnRpY2lwYW50cyBpcyBhbGxvd2VkLlxuICAgKiAtIFdoZXRoZXIgcmVjb3JkaW5nIG90aGVyIHZpZGVvIHBhcnRpY2lwYW50cyBpcyBhbGxvd2VkLlxuICAgKiAtIFdoZXRoZXIgcmVjb3JkaW5nIGFsbCBvcmllbnRhdGlvbnMgaXMgYWxsb3dlZC5cbiAgICogLSBXaGV0aGVyIHJlY29yZGluZyB0aGUgcHJlZmVycmVkIG9yaWVudGF0aW9uIGlzIGFsbG93ZWQuXG4gICAqIC0gV2hldGhlciByZWNvcmRpbmcgYWxsIGZvcm1hdHMgaXMgYWxsb3dlZC5cbiAgICogLSBXaGV0aGVyIHRoZSByZWNvcmRpbmcgZGlzcGxheSB0eXBlIGlzIHZhbGlkIGJhc2VkIG9uIHRoZSBtZWV0aW5nIGRpc3BsYXkgdHlwZS5cbiAgICogLSBXaGV0aGVyIHJlY29yZGluZyBhbGwgcGFydGljaXBhbnRzIHdpdGggbWVkaWEgaXMgYWxsb3dlZC5cbiAgICpcbiAgICogSWYgYWxsIGNoZWNrcyBwYXNzLCB0aGUgZnVuY3Rpb24gY29uc3RydWN0cyB0aGUgYG1haW5TcGVjc2AsIGBkaXNwU3BlY3NgLCBhbmQgYHRleHRTcGVjc2Agb2JqZWN0cyBiYXNlZCBvbiB0aGUgc3RhdGUgdmFyaWFibGVzLFxuICAgKiB1cGRhdGVzIHRoZSB1c2VyIHJlY29yZGluZyBwYXJhbWV0ZXJzLCBhbmQgY29uZmlybXMgdGhlIHJlY29yZGluZy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBvcHRpb25zOiBDb25maXJtUmVjb3JkaW5nT3B0aW9ucyA9IHsgcGFyYW1ldGVyczogc29tZVBhcmFtZXRlcnMgfTtcbiAgICogYXdhaXQgY29uZmlybVJlY29yZGluZyhvcHRpb25zKTtcbiAgICogYGBgXG4gICAqL1xuXG4gIGNvbmZpcm1SZWNvcmRpbmcgPSBhc3luYyAoeyBwYXJhbWV0ZXJzIH06IENvbmZpcm1SZWNvcmRpbmdPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIHJlY29yZGluZ0F1ZGlvT3B0aW9ucyxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW9ucyxcbiAgICAgIHJlY29yZGluZ1ZpZGVvVHlwZSxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgcmVjb3JkaW5nTmFtZVRhZ3MsXG4gICAgICByZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IsXG4gICAgICByZWNvcmRpbmdOYW1lVGFnc0NvbG9yLFxuICAgICAgcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyxcbiAgICAgIHJlY29yZGluZ0FkZEhMUyxcbiAgICAgIHJlY29yZGluZ0FkZFRleHQsXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0LFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yLFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQsXG4gICAgICByZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0LFxuICAgICAgcmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24sXG4gICAgICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbixcbiAgICAgIHJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCxcbiAgICAgIG1lZXRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIGV2ZW50VHlwZSxcbiAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQsXG4gICAgICBicmVha091dFJvb21FbmRlZCxcblxuICAgICAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUsXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydCxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydCxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24sXG4gICAgICB1cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0LFxuICAgICAgdXBkYXRlVXNlclJlY29yZGluZ1BhcmFtcyxcbiAgICAgIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBmcm9tIHRoZSBzdGF0ZVxuXG4gICAgY29uc3QgbWVkaWFPcHRpb25zID0gcmVjb3JkaW5nTWVkaWFPcHRpb25zO1xuXG4gICAgLy8gT3RoZXIgdmFyaWFibGVzIG5vdCBwcm92aWRlZCBpbiB0aGUgZ3VpZGVcbiAgICBjb25zdCBzZWxlY3RlZFJlY29yZE9wdGlvbiA9IHJlY29yZGluZ0Rpc3BsYXlUeXBlO1xuXG4gICAgLy8gQWRkaXRpb25hbCBsb2dpYyBzaW1pbGFyIHRvIHRoZSBwcm92aWRlZCBndWlkZVxuICAgIC8vIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gbWluaWdyaWQgYW5kIG1haW4gdmlkZW9cbiAgICBpZiAoZXZlbnRUeXBlICE9PSAnYnJvYWRjYXN0Jykge1xuICAgICAgaWYgKFxuICAgICAgICAhcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgJiZcbiAgICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpb25zID09PSAnYWxsJyAmJlxuICAgICAgICBtZWRpYU9wdGlvbnMgPT09ICd2aWRlbydcbiAgICAgICkge1xuICAgICAgICBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09ICdhbGwnKSB7XG4gICAgICAgICAgaWYgKGJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgIWJyZWFrT3V0Um9vbUVuZGVkKSB7XG4gICAgICAgICAgICAvLyBicmVha291dCByb29tcyBhcmUgc3RhcnRlZFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gcmVjb3JkIHZpZGVvcyBvZiBhbGwgcGFydGljaXBhbnRzOyBjaGFuZ2UgdGhlIG1lZXRpbmcgZGlzcGxheSB0eXBlIHRvIHZpZGVvIG9yIHZpZGVvIG9wdGltaXplZC4nLFxuICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0ICA9IG90aGVycyBvdGhlciB0aGFuIGhvc3Qgc2NyZWVuICh2aWRlbyArIGF1ZGlvKVxuICAgICAgaWYgKCFyZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0ICYmIHJlY29yZGluZ1ZpZGVvT3B0aW9ucyA9PT0gJ2FsbCcpIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG9ubHkgYWxsb3dlZCB0byByZWNvcmQgeW91cnNlbGYuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQgKG1haW5ncmlkICsgbm9uLWhvc3Qgc2NyZWVuc2hhcmUgcGVyc29uKVxuICAgICAgaWYgKCFyZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQgJiYgcmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHJlY29yZCBvdGhlciB2aWRlbyBwYXJ0aWNpcGFudHMuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24gJiYgcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyA9PT0gJ2FsbCcpIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gcmVjb3JkIGFsbCBvcmllbnRhdGlvbnMuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZScgJiZcbiAgICAgIHJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gPT09ICdwb3J0cmFpdCcgJiZcbiAgICAgICFyZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvblxuICAgICkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byByZWNvcmQgcG9ydHJhaXQgb3JpZW50YXRpb24uJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgJiZcbiAgICAgIHJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gPT09ICdsYW5kc2NhcGUnICYmXG4gICAgICAhcmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb25cbiAgICApIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gcmVjb3JkIGxhbmRzY2FwZSBvcmllbnRhdGlvbi4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghcmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydCAmJiByZWNvcmRpbmdWaWRlb1R5cGUgPT09ICdhbGwnKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHJlY29yZCBhbGwgZm9ybWF0cy4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudFR5cGUgIT09ICdicm9hZGNhc3QnKSB7XG4gICAgICBpZiAocmVjb3JkaW5nTWVkaWFPcHRpb25zID09PSAndmlkZW8nKSB7XG4gICAgICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgPT09ICdtZWRpYScpIHtcbiAgICAgICAgICBpZiAocmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgJ1JlY29yZGluZyBkaXNwbGF5IHR5cGUgY2FuIGJlIGVpdGhlciB2aWRlbywgdmlkZW8gb3B0aW1pemVkLCBvciBtZWRpYSB3aGVuIG1lZXRpbmcgZGlzcGxheSB0eXBlIGlzIG1lZGlhLicsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZSA9IG1lZXRpbmdEaXNwbGF5VHlwZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgaWYgKHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAnYWxsJyB8fCByZWNvcmRpbmdEaXNwbGF5VHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICdSZWNvcmRpbmcgZGlzcGxheSB0eXBlIGNhbiBiZSBlaXRoZXIgdmlkZW8gb3IgdmlkZW8gb3B0aW1pemVkIHdoZW4gbWVldGluZyBkaXNwbGF5IHR5cGUgaXMgdmlkZW8uJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlID0gbWVldGluZ0Rpc3BsYXlUeXBlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtZWV0aW5nVmlkZW9PcHRpbWl6ZWQgJiYgIXJlY29yZGluZ1ZpZGVvT3B0aW1pemVkKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgJ1JlY29yZGluZyBkaXNwbGF5IHR5cGUgY2FuIGJlIG9ubHkgdmlkZW8gb3B0aW1pemVkIHdoZW4gbWVldGluZyBkaXNwbGF5IHR5cGUgaXMgdmlkZW8gb3B0aW1pemVkLicsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZCA9IG1lZXRpbmdWaWRlb09wdGltaXplZDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZWNvcmRpbmdEaXNwbGF5VHlwZSA9PT0gJ2FsbCcgfHwgcmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICdtZWRpYScpIHtcbiAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGUgPSAnbWVkaWEnO1xuICAgICAgICB9XG4gICAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAnYWxsJyAmJiAhcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0KSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgY2FuIG9ubHkgcmVjb3JkIGFsbCBwYXJ0aWNpcGFudHMgd2l0aCBtZWRpYS4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDb25zdHJ1Y3QgbWFpblNwZWNzIGFuZCBkaXNwU3BlY3Mgb2JqZWN0cyBiYXNlZCBvbiB0aGUgc3RhdGUgdmFyaWFibGVzXG4gICAgY29uc3QgbWFpblNwZWNzOiBNYWluU3BlY3MgPSB7XG4gICAgICBtZWRpYU9wdGlvbnM6IHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIGF1ZGlvT3B0aW9uczogcmVjb3JkaW5nQXVkaW9PcHRpb25zLFxuICAgICAgdmlkZW9PcHRpb25zOiByZWNvcmRpbmdWaWRlb09wdGlvbnMsXG4gICAgICB2aWRlb1R5cGU6IHJlY29yZGluZ1ZpZGVvVHlwZSxcbiAgICAgIHZpZGVvT3B0aW1pemVkOiByZWNvcmRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiByZWNvcmRpbmdEaXNwbGF5VHlwZSxcbiAgICAgIGFkZEhMUzogcmVjb3JkaW5nQWRkSExTLFxuICAgIH07XG5cbiAgICBjb25zdCBkaXNwU3BlY3M6IERpc3BTcGVjcyA9IHtcbiAgICAgIG5hbWVUYWdzOiByZWNvcmRpbmdOYW1lVGFncyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogcmVjb3JkaW5nQmFja2dyb3VuZENvbG9yLFxuICAgICAgbmFtZVRhZ3NDb2xvcjogcmVjb3JkaW5nTmFtZVRhZ3NDb2xvcixcbiAgICAgIG9yaWVudGF0aW9uVmlkZW86IHJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8sXG4gICAgfTtcblxuICAgIGNvbnN0IHRleHRTcGVjczogVGV4dFNwZWNzID0ge1xuICAgICAgYWRkVGV4dDogcmVjb3JkaW5nQWRkVGV4dCxcbiAgICAgIGN1c3RvbVRleHQ6IHJlY29yZGluZ0N1c3RvbVRleHQsXG4gICAgICBjdXN0b21UZXh0UG9zaXRpb246IHJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbixcbiAgICAgIGN1c3RvbVRleHRDb2xvcjogcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yLFxuICAgIH07XG5cbiAgICAvLyBDb25zdHJ1Y3QgdXNlclJlY29yZGluZ1BhcmFtcyBvYmplY3RcbiAgICBjb25zdCB1c2VyUmVjb3JkaW5nUGFyYW1zID0geyBtYWluU3BlY3MsIGRpc3BTcGVjcywgdGV4dFNwZWNzIH07XG4gICAgLy8gVXBkYXRlIHN0YXRlIHZhcmlhYmxlcyBiYXNlZCBvbiB0aGUgbG9naWNcbiAgICB1cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zKHVzZXJSZWNvcmRpbmdQYXJhbXMpO1xuICAgIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkKHRydWUpO1xuICAgIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlKHNlbGVjdGVkUmVjb3JkT3B0aW9uKTtcbiAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZChyZWNvcmRpbmdWaWRlb09wdGltaXplZCk7XG4gICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQocmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQpO1xuICAgIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQocmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydCk7XG4gICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0KHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydCk7XG4gICAgdXBkYXRlUmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24ocmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24pO1xuICAgIHVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uKHJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uKTtcbiAgICB1cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0KHJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQpO1xuICB9O1xufVxuIl19