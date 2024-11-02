import * as i0 from "@angular/core";
export interface RecordParams {
    recordingAudioPausesLimit: number;
    recordingAudioPausesCount: number;
    recordingAudioSupport: boolean;
    recordingAudioPeopleLimit: number;
    recordingAudioParticipantsTimeLimit: number;
    recordingVideoPausesCount: number;
    recordingVideoPausesLimit: number;
    recordingVideoSupport: boolean;
    recordingVideoPeopleLimit: number;
    recordingVideoParticipantsTimeLimit: number;
    recordingAllParticipantsSupport: boolean;
    recordingVideoParticipantsSupport: boolean;
    recordingAllParticipantsFullRoomSupport: boolean;
    recordingVideoParticipantsFullRoomSupport: boolean;
    recordingPreferredOrientation: string;
    recordingSupportForOtherOrientation: boolean;
    recordingMultiFormatsSupport: boolean;
}
export interface RoomRecordParamsParameters {
    updateRecordingAudioPausesLimit: (value: number) => void;
    updateRecordingAudioPausesCount: (value: number) => void;
    updateRecordingAudioSupport: (value: boolean) => void;
    updateRecordingAudioPeopleLimit: (value: number) => void;
    updateRecordingAudioParticipantsTimeLimit: (value: number) => void;
    updateRecordingVideoPausesCount: (value: number) => void;
    updateRecordingVideoPausesLimit: (value: number) => void;
    updateRecordingVideoSupport: (value: boolean) => void;
    updateRecordingVideoPeopleLimit: (value: number) => void;
    updateRecordingVideoParticipantsTimeLimit: (value: number) => void;
    updateRecordingAllParticipantsSupport: (value: boolean) => void;
    updateRecordingVideoParticipantsSupport: (value: boolean) => void;
    updateRecordingAllParticipantsFullRoomSupport: (value: boolean) => void;
    updateRecordingVideoParticipantsFullRoomSupport: (value: boolean) => void;
    updateRecordingPreferredOrientation: (value: string) => void;
    updateRecordingSupportForOtherOrientation: (value: boolean) => void;
    updateRecordingMultiFormatsSupport: (value: boolean) => void;
    [key: string]: any;
}
export interface RoomRecordParamsOptions {
    recordParams: RecordParams;
    parameters: RoomRecordParamsParameters;
}
export type RoomRecordParamsType = ({ recordParams, parameters, }: RoomRecordParamsOptions) => Promise<void>;
/**
 * Service to update recording parameters for a room.
 *
 * @class
 * @name RoomRecordParams
 * @description Updates multiple recording parameters at once, using provided functions for each specific setting.
 *
 * @method
 * roomRecordParams
 *
 * @param {RoomRecordParamsOptions} options - The options for updating recording parameters:
 *   - `recordParams` {RecordParams}: The new recording parameters to apply.
 *   - `parameters` {RoomRecordParamsParameters}: The update functions for each recording parameter.
 *     - `updateRecordingAudioPausesLimit` {Function}: Updates the audio pauses limit.
 *     - `updateRecordingAudioPausesCount` {Function}: Updates the audio pauses count.
 *     - `updateRecordingAudioSupport` {Function}: Updates the audio support status.
 *     - `updateRecordingAudioPeopleLimit` {Function}: Updates the audio people limit.
 *     - `updateRecordingAudioParticipantsTimeLimit` {Function}: Updates the audio participants time limit.
 *     - `updateRecordingVideoPausesCount` {Function}: Updates the video pauses count.
 *     - `updateRecordingVideoPausesLimit` {Function}: Updates the video pauses limit.
 *     - `updateRecordingVideoSupport` {Function}: Updates the video support status.
 *     - `updateRecordingVideoPeopleLimit` {Function}: Updates the video people limit.
 *     - `updateRecordingVideoParticipantsTimeLimit` {Function}: Updates the video participants time limit.
 *     - `updateRecordingAllParticipantsSupport` {Function}: Updates support for all participants.
 *     - `updateRecordingVideoParticipantsSupport` {Function}: Updates video participants support.
 *     - `updateRecordingAllParticipantsFullRoomSupport` {Function}: Updates full room support for all participants.
 *     - `updateRecordingVideoParticipantsFullRoomSupport` {Function}: Updates full room support for video participants.
 *     - `updateRecordingPreferredOrientation` {Function}: Updates the preferred recording orientation.
 *     - `updateRecordingSupportForOtherOrientation` {Function}: Updates support for other orientations.
 *     - `updateRecordingMultiFormatsSupport` {Function}: Updates support for multiple formats.
 *
 * @returns {Promise<void>} A promise that resolves after all parameters are updated.
 *
 * @example
 * const recordParams = {
 *   recordingAudioPausesLimit: 5,
 *   recordingAudioPausesCount: 2,
 *   recordingAudioSupport: true,
 *   recordingAudioPeopleLimit: 10,
 *   recordingAudioParticipantsTimeLimit: 60,
 *   recordingVideoPausesCount: 1,
 *   recordingVideoPausesLimit: 3,
 *   recordingVideoSupport: true,
 *   recordingVideoPeopleLimit: 8,
 *   recordingVideoParticipantsTimeLimit: 90,
 *   recordingAllParticipantsSupport: true,
 *   recordingVideoParticipantsSupport: true,
 *   recordingAllParticipantsFullRoomSupport: false,
 *   recordingVideoParticipantsFullRoomSupport: true,
 *   recordingPreferredOrientation: 'landscape',
 *   recordingSupportForOtherOrientation: false,
 *   recordingMultiFormatsSupport: true,
 * };
 *
 * const parameters = {
 *   updateRecordingAudioPausesLimit: (value) => console.log(`Audio pauses limit: ${value}`),
 *   updateRecordingAudioPausesCount: (value) => console.log(`Audio pauses count: ${value}`),
 *   // Define other update functions similarly
 * };
 *
 * roomRecordParamsService.roomRecordParams({ recordParams, parameters });
 */
export declare class RoomRecordParams {
    /**
     * Updates various recording parameters based on the provided `recordParams`.
     *
     * @param {Object} params - The parameters object.
     * @param {RecordParams} params.recordParams - The recording parameters to update.
     * @param {Parameters} params.parameters - The functions to update each recording parameter.
     * @param {Function} params.parameters.updateRecordingAudioPausesLimit - Function to update the audio pauses limit.
     * @param {Function} params.parameters.updateRecordingAudioPausesCount - Function to update the audio pauses count.
     * @param {Function} params.parameters.updateRecordingAudioSupport - Function to update the audio support.
     * @param {Function} params.parameters.updateRecordingAudioPeopleLimit - Function to update the audio people limit.
     * @param {Function} params.parameters.updateRecordingAudioParticipantsTimeLimit - Function to update the audio participants time limit.
     * @param {Function} params.parameters.updateRecordingVideoPausesCount - Function to update the video pauses count.
     * @param {Function} params.parameters.updateRecordingVideoPausesLimit - Function to update the video pauses limit.
     * @param {Function} params.parameters.updateRecordingVideoSupport - Function to update the video support.
     * @param {Function} params.parameters.updateRecordingVideoPeopleLimit - Function to update the video people limit.
     * @param {Function} params.parameters.updateRecordingVideoParticipantsTimeLimit - Function to update the video participants time limit.
     * @param {Function} params.parameters.updateRecordingAllParticipantsSupport - Function to update the all participants support.
     * @param {Function} params.parameters.updateRecordingVideoParticipantsSupport - Function to update the video participants support.
     * @param {Function} params.parameters.updateRecordingAllParticipantsFullRoomSupport - Function to update the all participants full room support.
     * @param {Function} params.parameters.updateRecordingVideoParticipantsFullRoomSupport - Function to update the video participants full room support.
     * @param {Function} params.parameters.updateRecordingPreferredOrientation - Function to update the preferred orientation.
     * @param {Function} params.parameters.updateRecordingSupportForOtherOrientation - Function to update the support for other orientation.
     * @param {Function} params.parameters.updateRecordingMultiFormatsSupport - Function to update the multi-formats support.
     * @returns {Promise<void>} A promise that resolves when all parameters have been updated.
     */
    roomRecordParams: ({ recordParams, parameters }: RoomRecordParamsOptions) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoomRecordParams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RoomRecordParams>;
}
