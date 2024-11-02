import * as i0 from "@angular/core";
export interface CheckResumeStateOptions {
    recordingMediaOptions: string;
    recordingVideoPausesLimit: number;
    recordingAudioPausesLimit: number;
    pauseRecordCount: number;
}
export type CheckResumeStateType = (options: CheckResumeStateOptions) => Promise<boolean>;
/**
 * Checks if the recording can be resumed based on the media type and pause limits.
 *
 * @param {CheckResumeStateOptions} options - The options for checking resume state.
 * @param {string} options.recordingMediaOptions - The type of media being recorded ("video" or "audio").
 * @param {number} options.recordingVideoPausesLimit - The maximum number of pauses allowed for video recording.
 * @param {number} options.recordingAudioPausesLimit - The maximum number of pauses allowed for audio recording.
 * @param {number} options.pauseRecordCount - The current number of pauses that have occurred.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the recording can be resumed.
 *
 * @example
 * ```typescript
 * const checkResumeStateService = new CheckResumeState();
 * const canResume = await checkResumeStateService.checkResumeState({
 *   recordingMediaOptions: 'audio',
 *   recordingVideoPausesLimit: 3,
 *   recordingAudioPausesLimit: 5,
 *   pauseRecordCount: 2,
 * });
 * console.log('Can resume recording:', canResume);
 * ```
 */
export declare class CheckResumeState {
    /**
     * Checks if the recording can be resumed based on the media type and pause limits.
     *
     * @param {Object} options - The options for checking resume state.
     * @param {string} options.recordingMediaOptions - The type of media being recorded ("video" or "audio").
     * @param {number} options.recordingVideoPausesLimit - The maximum number of pauses allowed for video recording.
     * @param {number} options.recordingAudioPausesLimit - The maximum number of pauses allowed for audio recording.
     * @param {number} options.pauseRecordCount - The current number of pauses that have occurred.
     * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the recording can be resumed.
     */
    checkResumeState: ({ recordingMediaOptions, recordingVideoPausesLimit, recordingAudioPausesLimit, pauseRecordCount, }: CheckResumeStateOptions) => Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckResumeState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckResumeState>;
}
