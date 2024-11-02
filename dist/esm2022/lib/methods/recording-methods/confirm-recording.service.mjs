import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Confirms the recording settings based on the provided parameters and updates the recording state.
 *
 * @param {ConfirmRecordingOptions} options - The options for confirming the recording.
 * @param {ConfirmRecordingParameters} options.parameters - The parameters for the recording, including:
 *   - {ShowAlert} [options.parameters.showAlert] - Optional function to show alert messages.
 *   - {string} options.parameters.recordingMediaOptions - Type of media being recorded ("video" or "audio").
 *   - {string} options.parameters.recordingAudioOptions - Audio recording options.
 *   - {string} options.parameters.recordingVideoOptions - Video recording options.
 *   - {string} options.parameters.recordingVideoType - Type of video recording.
 *   - {'video' | 'media' | 'all'} options.parameters.recordingDisplayType - The display type for the recording.
 *   - {boolean} options.parameters.recordingNameTags - Flag for including name tags in the recording.
 *   - {string} options.parameters.recordingBackgroundColor - Background color for the recording.
 *   - {string} options.parameters.recordingNameTagsColor - Color for the name tags.
 *   - {string} options.parameters.recordingOrientationVideo - Orientation for video recording.
 *   - {boolean} options.parameters.recordingAddHLS - Flag for adding HLS support.
 *   - {boolean} options.parameters.recordingAddText - Flag for adding custom text.
 *   - {string} options.parameters.recordingCustomText - Custom text for the recording.
 *   - {string} options.parameters.recordingCustomTextPosition - Position of the custom text.
 *   - {string} options.parameters.recordingCustomTextColor - Color of the custom text.
 *   - {string} options.parameters.meetingDisplayType - Current display type of the meeting.
 *   - {boolean} options.parameters.recordingVideoParticipantsFullRoomSupport - Support for video participants in full room.
 *   - {boolean} options.parameters.recordingAllParticipantsSupport - Support for recording all participants.
 *   - {boolean} options.parameters.recordingVideoParticipantsSupport - Support for video participants.
 *   - {boolean} options.parameters.recordingSupportForOtherOrientation - Support for other orientations.
 *   - {string} options.parameters.recordingPreferredOrientation - Preferred orientation for recording.
 *   - {boolean} options.parameters.recordingMultiFormatsSupport - Support for multiple formats.
 *   - {boolean} options.parameters.recordingVideoOptimized - Flag for video optimization.
 *   - {boolean} options.parameters.recordingAllParticipantsFullRoomSupport - Support for recording all participants in full room.
 *   - {boolean} options.parameters.meetingVideoOptimized - Flag for meeting video optimization.
 *   - {EventType} options.parameters.eventType - Type of the event.
 *   - {boolean} options.parameters.breakOutRoomStarted - Indicates if a breakout room has started.
 *   - {boolean} options.parameters.breakOutRoomEnded - Indicates if a breakout room has ended.
 *   - {Function} options.parameters.updateRecordingDisplayType - Function to update the recording display type.
 *   - {Function} options.parameters.updateRecordingVideoOptimized - Function to update video optimization status.
 *   - {Function} options.parameters.updateUserRecordingParams - Function to update user recording parameters.
 *   - {Function} options.parameters.updateConfirmedToRecord - Function to confirm the recording.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1yZWNvcmRpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2NvbmZpcm0tcmVjb3JkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF3RDNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThERztBQU1ILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRztJQUVILGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBMkIsRUFBaUIsRUFBRTtRQUNsRixJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFFbkMsSUFBSSxFQUNGLFNBQVMsRUFDVCxxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLHlCQUF5QixFQUN6QixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDM0Isd0JBQXdCLEVBQ3hCLGtCQUFrQixFQUNsQix5Q0FBeUMsRUFDekMsK0JBQStCLEVBQy9CLGlDQUFpQyxFQUNqQyxtQ0FBbUMsRUFDbkMsNkJBQTZCLEVBQzdCLDRCQUE0QixFQUM1Qix1QkFBdUIsRUFDdkIsdUNBQXVDLEVBQ3ZDLHFCQUFxQixFQUNyQixTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUVqQiwwQkFBMEIsRUFD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akQsNkJBQTZCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN2RCwrQ0FBK0MsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQzNGLHFDQUFxQyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDdkUsdUNBQXVDLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUMzRSx5Q0FBeUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQy9FLG1DQUFtQyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDbkUsa0NBQWtDLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNuRSxDQUFDLENBQUM7dUdBblJTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFNob3dBbGVydCxcbiAgTWFpblNwZWNzLFxuICBEaXNwU3BlY3MsXG4gIFRleHRTcGVjcyxcbiAgRXZlbnRUeXBlLFxuICBVc2VyUmVjb3JkaW5nUGFyYW1zLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1SZWNvcmRpbmdQYXJhbWV0ZXJzIHtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZztcbiAgcmVjb3JkaW5nQXVkaW9PcHRpb25zOiBzdHJpbmc7XG4gIHJlY29yZGluZ1ZpZGVvT3B0aW9uczogc3RyaW5nO1xuICByZWNvcmRpbmdWaWRlb1R5cGU6IHN0cmluZztcbiAgcmVjb3JkaW5nRGlzcGxheVR5cGU6ICd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCc7XG4gIHJlY29yZGluZ05hbWVUYWdzOiBib29sZWFuO1xuICByZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgcmVjb3JkaW5nTmFtZVRhZ3NDb2xvcjogc3RyaW5nO1xuICByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvOiBzdHJpbmc7XG4gIHJlY29yZGluZ0FkZEhMUzogYm9vbGVhbjtcbiAgcmVjb3JkaW5nQWRkVGV4dDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dDogc3RyaW5nO1xuICByZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb246IHN0cmluZztcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yOiBzdHJpbmc7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0OiBib29sZWFuO1xuICByZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbjogYm9vbGVhbjtcbiAgcmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb246IHN0cmluZztcbiAgcmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDogYm9vbGVhbjtcbiAgbWVldGluZ1ZpZGVvT3B0aW1pemVkOiBib29sZWFuO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tRW5kZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlOiAodmFsdWU6ICd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCcpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXM6IChwYXJhbXM6IFVzZXJSZWNvcmRpbmdQYXJhbXMpID0+IHZvaWQ7XG4gIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gTWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENvbmZpcm1SZWNvcmRpbmdQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybVJlY29yZGluZ09wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBDb25maXJtUmVjb3JkaW5nUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29uZmlybVJlY29yZGluZ1R5cGUgPSAob3B0aW9uczogQ29uZmlybVJlY29yZGluZ09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogQ29uZmlybXMgdGhlIHJlY29yZGluZyBzZXR0aW5ncyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgcGFyYW1ldGVycyBhbmQgdXBkYXRlcyB0aGUgcmVjb3JkaW5nIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7Q29uZmlybVJlY29yZGluZ09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29uZmlybWluZyB0aGUgcmVjb3JkaW5nLlxuICogQHBhcmFtIHtDb25maXJtUmVjb3JkaW5nUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSByZWNvcmRpbmcsIGluY2x1ZGluZzpcbiAqICAgLSB7U2hvd0FsZXJ0fSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICogICAtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUeXBlIG9mIG1lZGlhIGJlaW5nIHJlY29yZGVkIChcInZpZGVvXCIgb3IgXCJhdWRpb1wiKS5cbiAqICAgLSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nQXVkaW9PcHRpb25zIC0gQXVkaW8gcmVjb3JkaW5nIG9wdGlvbnMuXG4gKiAgIC0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ1ZpZGVvT3B0aW9ucyAtIFZpZGVvIHJlY29yZGluZyBvcHRpb25zLlxuICogICAtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdWaWRlb1R5cGUgLSBUeXBlIG9mIHZpZGVvIHJlY29yZGluZy5cbiAqICAgLSB7J3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ0Rpc3BsYXlUeXBlIC0gVGhlIGRpc3BsYXkgdHlwZSBmb3IgdGhlIHJlY29yZGluZy5cbiAqICAgLSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ05hbWVUYWdzIC0gRmxhZyBmb3IgaW5jbHVkaW5nIG5hbWUgdGFncyBpbiB0aGUgcmVjb3JkaW5nLlxuICogICAtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IgLSBCYWNrZ3JvdW5kIGNvbG9yIGZvciB0aGUgcmVjb3JkaW5nLlxuICogICAtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdOYW1lVGFnc0NvbG9yIC0gQ29sb3IgZm9yIHRoZSBuYW1lIHRhZ3MuXG4gKiAgIC0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gLSBPcmllbnRhdGlvbiBmb3IgdmlkZW8gcmVjb3JkaW5nLlxuICogICAtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nQWRkSExTIC0gRmxhZyBmb3IgYWRkaW5nIEhMUyBzdXBwb3J0LlxuICogICAtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nQWRkVGV4dCAtIEZsYWcgZm9yIGFkZGluZyBjdXN0b20gdGV4dC5cbiAqICAgLSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nQ3VzdG9tVGV4dCAtIEN1c3RvbSB0ZXh0IGZvciB0aGUgcmVjb3JkaW5nLlxuICogICAtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24gLSBQb3NpdGlvbiBvZiB0aGUgY3VzdG9tIHRleHQuXG4gKiAgIC0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ0N1c3RvbVRleHRDb2xvciAtIENvbG9yIG9mIHRoZSBjdXN0b20gdGV4dC5cbiAqICAgLSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVldGluZ0Rpc3BsYXlUeXBlIC0gQ3VycmVudCBkaXNwbGF5IHR5cGUgb2YgdGhlIG1lZXRpbmcuXG4gKiAgIC0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCAtIFN1cHBvcnQgZm9yIHZpZGVvIHBhcnRpY2lwYW50cyBpbiBmdWxsIHJvb20uXG4gKiAgIC0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0IC0gU3VwcG9ydCBmb3IgcmVjb3JkaW5nIGFsbCBwYXJ0aWNpcGFudHMuXG4gKiAgIC0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQgLSBTdXBwb3J0IGZvciB2aWRlbyBwYXJ0aWNpcGFudHMuXG4gKiAgIC0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbiAtIFN1cHBvcnQgZm9yIG90aGVyIG9yaWVudGF0aW9ucy5cbiAqICAgLSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24gLSBQcmVmZXJyZWQgb3JpZW50YXRpb24gZm9yIHJlY29yZGluZy5cbiAqICAgLSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQgLSBTdXBwb3J0IGZvciBtdWx0aXBsZSBmb3JtYXRzLlxuICogICAtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgLSBGbGFnIGZvciB2aWRlbyBvcHRpbWl6YXRpb24uXG4gKiAgIC0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgLSBTdXBwb3J0IGZvciByZWNvcmRpbmcgYWxsIHBhcnRpY2lwYW50cyBpbiBmdWxsIHJvb20uXG4gKiAgIC0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5tZWV0aW5nVmlkZW9PcHRpbWl6ZWQgLSBGbGFnIGZvciBtZWV0aW5nIHZpZGVvIG9wdGltaXphdGlvbi5cbiAqICAgLSB7RXZlbnRUeXBlfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVHlwZSBvZiB0aGUgZXZlbnQuXG4gKiAgIC0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5icmVha091dFJvb21TdGFydGVkIC0gSW5kaWNhdGVzIGlmIGEgYnJlYWtvdXQgcm9vbSBoYXMgc3RhcnRlZC5cbiAqICAgLSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbUVuZGVkIC0gSW5kaWNhdGVzIGlmIGEgYnJlYWtvdXQgcm9vbSBoYXMgZW5kZWQuXG4gKiAgIC0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZGluZyBkaXNwbGF5IHR5cGUuXG4gKiAgIC0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdmlkZW8gb3B0aW1pemF0aW9uIHN0YXR1cy5cbiAqICAgLSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHVzZXIgcmVjb3JkaW5nIHBhcmFtZXRlcnMuXG4gKiAgIC0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ29uZmlybWVkVG9SZWNvcmQgLSBGdW5jdGlvbiB0byBjb25maXJtIHRoZSByZWNvcmRpbmcuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJlY29yZGluZyBzZXR0aW5ncyBoYXZlIGJlZW4gY29uZmlybWVkLlxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIHNldmVyYWwgY2hlY2tzIHRvIGVuc3VyZSB0aGF0IHRoZSByZWNvcmRpbmcgc2V0dGluZ3MgYXJlIHZhbGlkIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICogSWYgYW55IG9mIHRoZSBjaGVja3MgZmFpbCwgYW4gYWxlcnQgaXMgc2hvd24gYW5kIHRoZSBmdW5jdGlvbiByZXR1cm5zIGVhcmx5IHdpdGhvdXQgdXBkYXRpbmcgdGhlIHJlY29yZGluZyBzdGF0ZS5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gY2hlY2tzIGZvciB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiAtIFdoZXRoZXIgcmVjb3JkaW5nIHZpZGVvcyBvZiBhbGwgcGFydGljaXBhbnRzIGlzIGFsbG93ZWQuXG4gKiAtIFdoZXRoZXIgcmVjb3JkaW5nIGFsbCBwYXJ0aWNpcGFudHMgaXMgYWxsb3dlZC5cbiAqIC0gV2hldGhlciByZWNvcmRpbmcgb3RoZXIgdmlkZW8gcGFydGljaXBhbnRzIGlzIGFsbG93ZWQuXG4gKiAtIFdoZXRoZXIgcmVjb3JkaW5nIGFsbCBvcmllbnRhdGlvbnMgaXMgYWxsb3dlZC5cbiAqIC0gV2hldGhlciByZWNvcmRpbmcgdGhlIHByZWZlcnJlZCBvcmllbnRhdGlvbiBpcyBhbGxvd2VkLlxuICogLSBXaGV0aGVyIHJlY29yZGluZyBhbGwgZm9ybWF0cyBpcyBhbGxvd2VkLlxuICogLSBXaGV0aGVyIHRoZSByZWNvcmRpbmcgZGlzcGxheSB0eXBlIGlzIHZhbGlkIGJhc2VkIG9uIHRoZSBtZWV0aW5nIGRpc3BsYXkgdHlwZS5cbiAqIC0gV2hldGhlciByZWNvcmRpbmcgYWxsIHBhcnRpY2lwYW50cyB3aXRoIG1lZGlhIGlzIGFsbG93ZWQuXG4gKlxuICogSWYgYWxsIGNoZWNrcyBwYXNzLCB0aGUgZnVuY3Rpb24gY29uc3RydWN0cyB0aGUgYG1haW5TcGVjc2AsIGBkaXNwU3BlY3NgLCBhbmQgYHRleHRTcGVjc2Agb2JqZWN0cyBiYXNlZCBvbiB0aGUgc3RhdGUgdmFyaWFibGVzLFxuICogdXBkYXRlcyB0aGUgdXNlciByZWNvcmRpbmcgcGFyYW1ldGVycywgYW5kIGNvbmZpcm1zIHRoZSByZWNvcmRpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1SZWNvcmRpbmdPcHRpb25zID0geyBwYXJhbWV0ZXJzOiBzb21lUGFyYW1ldGVycyB9O1xuICogYXdhaXQgY29uZmlybVJlY29yZGluZyhvcHRpb25zKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1SZWNvcmRpbmcge1xuICAvKipcbiAgICogQ29uZmlybXMgdGhlIHJlY29yZGluZyBzZXR0aW5ncyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgcGFyYW1ldGVycyBhbmQgdXBkYXRlcyB0aGUgcmVjb3JkaW5nIHN0YXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpcm1SZWNvcmRpbmdPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbmZpcm1pbmcgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIHJlY29yZGluZy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJlY29yZGluZyBzZXR0aW5ncyBoYXZlIGJlZW4gY29uZmlybWVkLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIHNldmVyYWwgY2hlY2tzIHRvIGVuc3VyZSB0aGF0IHRoZSByZWNvcmRpbmcgc2V0dGluZ3MgYXJlIHZhbGlkIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICAgKiBJZiBhbnkgb2YgdGhlIGNoZWNrcyBmYWlsLCBhbiBhbGVydCBpcyBzaG93biBhbmQgdGhlIGZ1bmN0aW9uIHJldHVybnMgZWFybHkgd2l0aG91dCB1cGRhdGluZyB0aGUgcmVjb3JkaW5nIHN0YXRlLlxuICAgKlxuICAgKiBUaGUgZnVuY3Rpb24gY2hlY2tzIGZvciB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gICAqIC0gV2hldGhlciByZWNvcmRpbmcgdmlkZW9zIG9mIGFsbCBwYXJ0aWNpcGFudHMgaXMgYWxsb3dlZC5cbiAgICogLSBXaGV0aGVyIHJlY29yZGluZyBhbGwgcGFydGljaXBhbnRzIGlzIGFsbG93ZWQuXG4gICAqIC0gV2hldGhlciByZWNvcmRpbmcgb3RoZXIgdmlkZW8gcGFydGljaXBhbnRzIGlzIGFsbG93ZWQuXG4gICAqIC0gV2hldGhlciByZWNvcmRpbmcgYWxsIG9yaWVudGF0aW9ucyBpcyBhbGxvd2VkLlxuICAgKiAtIFdoZXRoZXIgcmVjb3JkaW5nIHRoZSBwcmVmZXJyZWQgb3JpZW50YXRpb24gaXMgYWxsb3dlZC5cbiAgICogLSBXaGV0aGVyIHJlY29yZGluZyBhbGwgZm9ybWF0cyBpcyBhbGxvd2VkLlxuICAgKiAtIFdoZXRoZXIgdGhlIHJlY29yZGluZyBkaXNwbGF5IHR5cGUgaXMgdmFsaWQgYmFzZWQgb24gdGhlIG1lZXRpbmcgZGlzcGxheSB0eXBlLlxuICAgKiAtIFdoZXRoZXIgcmVjb3JkaW5nIGFsbCBwYXJ0aWNpcGFudHMgd2l0aCBtZWRpYSBpcyBhbGxvd2VkLlxuICAgKlxuICAgKiBJZiBhbGwgY2hlY2tzIHBhc3MsIHRoZSBmdW5jdGlvbiBjb25zdHJ1Y3RzIHRoZSBgbWFpblNwZWNzYCwgYGRpc3BTcGVjc2AsIGFuZCBgdGV4dFNwZWNzYCBvYmplY3RzIGJhc2VkIG9uIHRoZSBzdGF0ZSB2YXJpYWJsZXMsXG4gICAqIHVwZGF0ZXMgdGhlIHVzZXIgcmVjb3JkaW5nIHBhcmFtZXRlcnMsIGFuZCBjb25maXJtcyB0aGUgcmVjb3JkaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1SZWNvcmRpbmdPcHRpb25zID0geyBwYXJhbWV0ZXJzOiBzb21lUGFyYW1ldGVycyB9O1xuICAgKiBhd2FpdCBjb25maXJtUmVjb3JkaW5nKG9wdGlvbnMpO1xuICAgKiBgYGBcbiAgICovXG5cbiAgY29uZmlybVJlY29yZGluZyA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogQ29uZmlybVJlY29yZGluZ09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgICAgcmVjb3JkaW5nQXVkaW9PcHRpb25zLFxuICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpb25zLFxuICAgICAgcmVjb3JkaW5nVmlkZW9UeXBlLFxuICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGUsXG4gICAgICByZWNvcmRpbmdOYW1lVGFncyxcbiAgICAgIHJlY29yZGluZ0JhY2tncm91bmRDb2xvcixcbiAgICAgIHJlY29yZGluZ05hbWVUYWdzQ29sb3IsXG4gICAgICByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLFxuICAgICAgcmVjb3JkaW5nQWRkSExTLFxuICAgICAgcmVjb3JkaW5nQWRkVGV4dCxcbiAgICAgIHJlY29yZGluZ0N1c3RvbVRleHQsXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24sXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCxcbiAgICAgIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQsXG4gICAgICByZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbixcbiAgICAgIHJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLFxuICAgICAgcmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydCxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LFxuICAgICAgbWVldGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgZXZlbnRUeXBlLFxuICAgICAgYnJlYWtPdXRSb29tU3RhcnRlZCxcbiAgICAgIGJyZWFrT3V0Um9vbUVuZGVkLFxuXG4gICAgICB1cGRhdGVSZWNvcmRpbmdEaXNwbGF5VHlwZSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQsXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0LFxuICAgICAgdXBkYXRlUmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24sXG4gICAgICB1cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbixcbiAgICAgIHVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQsXG4gICAgICB1cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zLFxuICAgICAgdXBkYXRlQ29uZmlybWVkVG9SZWNvcmQsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBSZXRyaWV2ZSB0aGUgdmFsdWVzIGZyb20gdGhlIHN0YXRlXG5cbiAgICBjb25zdCBtZWRpYU9wdGlvbnMgPSByZWNvcmRpbmdNZWRpYU9wdGlvbnM7XG5cbiAgICAvLyBPdGhlciB2YXJpYWJsZXMgbm90IHByb3ZpZGVkIGluIHRoZSBndWlkZVxuICAgIGNvbnN0IHNlbGVjdGVkUmVjb3JkT3B0aW9uID0gcmVjb3JkaW5nRGlzcGxheVR5cGU7XG5cbiAgICAvLyBBZGRpdGlvbmFsIGxvZ2ljIHNpbWlsYXIgdG8gdGhlIHByb3ZpZGVkIGd1aWRlXG4gICAgLy8gcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgPSBtaW5pZ3JpZCBhbmQgbWFpbiB2aWRlb1xuICAgIGlmIChldmVudFR5cGUgIT09ICdicm9hZGNhc3QnKSB7XG4gICAgICBpZiAoXG4gICAgICAgICFyZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCAmJlxuICAgICAgICByZWNvcmRpbmdWaWRlb09wdGlvbnMgPT09ICdhbGwnICYmXG4gICAgICAgIG1lZGlhT3B0aW9ucyA9PT0gJ3ZpZGVvJ1xuICAgICAgKSB7XG4gICAgICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgPT0gJ2FsbCcpIHtcbiAgICAgICAgICBpZiAoYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhYnJlYWtPdXRSb29tRW5kZWQpIHtcbiAgICAgICAgICAgIC8vIGJyZWFrb3V0IHJvb21zIGFyZSBzdGFydGVkXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAnWW91IGFyZSBub3QgYWxsb3dlZCB0byByZWNvcmQgdmlkZW9zIG9mIGFsbCBwYXJ0aWNpcGFudHM7IGNoYW5nZSB0aGUgbWVldGluZyBkaXNwbGF5IHR5cGUgdG8gdmlkZW8gb3IgdmlkZW8gb3B0aW1pemVkLicsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgID0gb3RoZXJzIG90aGVyIHRoYW4gaG9zdCBzY3JlZW4gKHZpZGVvICsgYXVkaW8pXG4gICAgICBpZiAoIXJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgJiYgcmVjb3JkaW5nVmlkZW9PcHRpb25zID09PSAnYWxsJykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgb25seSBhbGxvd2VkIHRvIHJlY29yZCB5b3Vyc2VsZi4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydCAobWFpbmdyaWQgKyBub24taG9zdCBzY3JlZW5zaGFyZSBwZXJzb24pXG4gICAgICBpZiAoIXJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydCAmJiByZWNvcmRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gcmVjb3JkIG90aGVyIHZpZGVvIHBhcnRpY2lwYW50cy4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFyZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbiAmJiByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvID09PSAnYWxsJykge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byByZWNvcmQgYWxsIG9yaWVudGF0aW9ucy4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uID09PSAnbGFuZHNjYXBlJyAmJlxuICAgICAgcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyA9PT0gJ3BvcnRyYWl0JyAmJlxuICAgICAgIXJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uXG4gICAgKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHJlY29yZCBwb3J0cmFpdCBvcmllbnRhdGlvbi4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyAmJlxuICAgICAgcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyA9PT0gJ2xhbmRzY2FwZScgJiZcbiAgICAgICFyZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvblxuICAgICkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byByZWNvcmQgbGFuZHNjYXBlIG9yaWVudGF0aW9uLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFyZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0ICYmIHJlY29yZGluZ1ZpZGVvVHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gcmVjb3JkIGFsbCBmb3JtYXRzLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcpIHtcbiAgICAgIGlmIChyZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT09ICd2aWRlbycpIHtcbiAgICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgICAgIGlmIChyZWNvcmRpbmdEaXNwbGF5VHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAnUmVjb3JkaW5nIGRpc3BsYXkgdHlwZSBjYW4gYmUgZWl0aGVyIHZpZGVvLCB2aWRlbyBvcHRpbWl6ZWQsIG9yIG1lZGlhIHdoZW4gbWVldGluZyBkaXNwbGF5IHR5cGUgaXMgbWVkaWEuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlID0gbWVldGluZ0Rpc3BsYXlUeXBlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBpZiAocmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICdhbGwnIHx8IHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgJ1JlY29yZGluZyBkaXNwbGF5IHR5cGUgY2FuIGJlIGVpdGhlciB2aWRlbyBvciB2aWRlbyBvcHRpbWl6ZWQgd2hlbiBtZWV0aW5nIGRpc3BsYXkgdHlwZSBpcyB2aWRlby4nLFxuICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGUgPSBtZWV0aW5nRGlzcGxheVR5cGU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG1lZXRpbmdWaWRlb09wdGltaXplZCAmJiAhcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAnUmVjb3JkaW5nIGRpc3BsYXkgdHlwZSBjYW4gYmUgb25seSB2aWRlbyBvcHRpbWl6ZWQgd2hlbiBtZWV0aW5nIGRpc3BsYXkgdHlwZSBpcyB2aWRlbyBvcHRpbWl6ZWQuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkID0gbWVldGluZ1ZpZGVvT3B0aW1pemVkO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAnYWxsJyB8fCByZWNvcmRpbmdEaXNwbGF5VHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZSA9ICdtZWRpYSc7XG4gICAgICAgIH1cbiAgICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICdhbGwnICYmICFyZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQpIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW4gb25seSByZWNvcmQgYWxsIHBhcnRpY2lwYW50cyB3aXRoIG1lZGlhLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCBtYWluU3BlY3MgYW5kIGRpc3BTcGVjcyBvYmplY3RzIGJhc2VkIG9uIHRoZSBzdGF0ZSB2YXJpYWJsZXNcbiAgICBjb25zdCBtYWluU3BlY3M6IE1haW5TcGVjcyA9IHtcbiAgICAgIG1lZGlhT3B0aW9uczogcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgICAgYXVkaW9PcHRpb25zOiByZWNvcmRpbmdBdWRpb09wdGlvbnMsXG4gICAgICB2aWRlb09wdGlvbnM6IHJlY29yZGluZ1ZpZGVvT3B0aW9ucyxcbiAgICAgIHZpZGVvVHlwZTogcmVjb3JkaW5nVmlkZW9UeXBlLFxuICAgICAgdmlkZW9PcHRpbWl6ZWQ6IHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGU6IHJlY29yZGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgYWRkSExTOiByZWNvcmRpbmdBZGRITFMsXG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3BTcGVjczogRGlzcFNwZWNzID0ge1xuICAgICAgbmFtZVRhZ3M6IHJlY29yZGluZ05hbWVUYWdzLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiByZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBuYW1lVGFnc0NvbG9yOiByZWNvcmRpbmdOYW1lVGFnc0NvbG9yLFxuICAgICAgb3JpZW50YXRpb25WaWRlbzogcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyxcbiAgICB9O1xuXG4gICAgY29uc3QgdGV4dFNwZWNzOiBUZXh0U3BlY3MgPSB7XG4gICAgICBhZGRUZXh0OiByZWNvcmRpbmdBZGRUZXh0LFxuICAgICAgY3VzdG9tVGV4dDogcmVjb3JkaW5nQ3VzdG9tVGV4dCxcbiAgICAgIGN1c3RvbVRleHRQb3NpdGlvbjogcmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLFxuICAgICAgY3VzdG9tVGV4dENvbG9yOiByZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IsXG4gICAgfTtcblxuICAgIC8vIENvbnN0cnVjdCB1c2VyUmVjb3JkaW5nUGFyYW1zIG9iamVjdFxuICAgIGNvbnN0IHVzZXJSZWNvcmRpbmdQYXJhbXMgPSB7IG1haW5TcGVjcywgZGlzcFNwZWNzLCB0ZXh0U3BlY3MgfTtcbiAgICAvLyBVcGRhdGUgc3RhdGUgdmFyaWFibGVzIGJhc2VkIG9uIHRoZSBsb2dpY1xuICAgIHVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXModXNlclJlY29yZGluZ1BhcmFtcyk7XG4gICAgdXBkYXRlQ29uZmlybWVkVG9SZWNvcmQodHJ1ZSk7XG4gICAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUoc2VsZWN0ZWRSZWNvcmRPcHRpb24pO1xuICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkKHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkKTtcbiAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydChyZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCk7XG4gICAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydChyZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0KTtcbiAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQocmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0KTtcbiAgICB1cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbihyZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbik7XG4gICAgdXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24ocmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24pO1xuICAgIHVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQocmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydCk7XG4gIH07XG59XG4iXX0=