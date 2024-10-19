import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface CheckPauseStateOptions {
    recordingMediaOptions: string;
    recordingVideoPausesLimit: number;
    recordingAudioPausesLimit: number;
    pauseRecordCount: number;
    showAlert?: ShowAlert;
}
export type CheckPauseStateType = (options: CheckPauseStateOptions) => Promise<boolean>;
export declare class CheckPauseState {
    /**
     * Checks if the recording can be paused based on the current pause count and the allowed pause limits.
     *
     * @param {Object} options - The options for checking the pause state.
     * @param {string} options.recordingMediaOptions - The type of media being recorded ("video" or "audio").
     * @param {number} options.recordingVideoPausesLimit - The maximum number of pauses allowed for video recordings.
     * @param {number} options.recordingAudioPausesLimit - The maximum number of pauses allowed for audio recordings.
     * @param {number} options.pauseRecordCount - The current count of pauses that have been made.
     * @param {Function} options.showAlert - A function to show an alert message if the pause limit is reached.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the recording can be paused, otherwise `false`.
     */
    checkPauseState: ({ recordingMediaOptions, recordingVideoPausesLimit, recordingAudioPausesLimit, pauseRecordCount, showAlert, }: CheckPauseStateOptions) => Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckPauseState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckPauseState>;
}
