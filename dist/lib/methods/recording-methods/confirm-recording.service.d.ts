import { ShowAlert, EventType, UserRecordingParams } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ConfirmRecordingParameters {
    showAlert?: ShowAlert;
    recordingMediaOptions: string;
    recordingAudioOptions: string;
    recordingVideoOptions: string;
    recordingVideoType: string;
    recordingDisplayType: 'video' | 'media' | 'all';
    recordingNameTags: boolean;
    recordingBackgroundColor: string;
    recordingNameTagsColor: string;
    recordingOrientationVideo: string;
    recordingAddHLS: boolean;
    recordingAddText: boolean;
    recordingCustomText: string;
    recordingCustomTextPosition: string;
    recordingCustomTextColor: string;
    meetingDisplayType: string;
    recordingVideoParticipantsFullRoomSupport: boolean;
    recordingAllParticipantsSupport: boolean;
    recordingVideoParticipantsSupport: boolean;
    recordingSupportForOtherOrientation: boolean;
    recordingPreferredOrientation: string;
    recordingMultiFormatsSupport: boolean;
    recordingVideoOptimized: boolean;
    recordingAllParticipantsFullRoomSupport: boolean;
    meetingVideoOptimized: boolean;
    eventType: EventType;
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    updateRecordingDisplayType: (value: 'video' | 'media' | 'all') => void;
    updateRecordingVideoOptimized: (value: boolean) => void;
    updateUserRecordingParams: (params: UserRecordingParams) => void;
    updateConfirmedToRecord: (value: boolean) => void;
    getUpdatedAllParams: () => ConfirmRecordingParameters;
    [key: string]: any;
}
export interface ConfirmRecordingOptions {
    parameters: ConfirmRecordingParameters;
}
export type ConfirmRecordingType = (options: ConfirmRecordingOptions) => Promise<void>;
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
export declare class ConfirmRecording {
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
    confirmRecording: ({ parameters }: ConfirmRecordingOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmRecording>;
}
