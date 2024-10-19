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
