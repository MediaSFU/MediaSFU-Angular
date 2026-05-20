import { Injectable } from '@angular/core';
import { checkPauseState as sharedCheckPauseState } from 'mediasfu-shared';
import { ShowAlert } from '../../@types/types';

export interface CheckPauseStateOptions {
  recordingMediaOptions: string; // "video" | "audio"
  recordingVideoPausesLimit: number;
  recordingAudioPausesLimit: number;
  pauseRecordCount: number;
  showAlert?: ShowAlert;
}

// Export the type definition for the function
export type CheckPauseStateType = (options: CheckPauseStateOptions) => Promise<boolean>;


/**
 * Checks if the recording can be paused based on the current pause count and the allowed pause limits.
 *
 * @param {CheckPauseStateOptions} options - The options for checking the pause state.
 * @param {string} options.recordingMediaOptions - The type of media being recorded ("video" or "audio").
 * @param {number} options.recordingVideoPausesLimit - The maximum number of pauses allowed for video recordings.
 * @param {number} options.recordingAudioPausesLimit - The maximum number of pauses allowed for audio recordings.
 * @param {number} options.pauseRecordCount - The current count of pauses that have been made.
 * @param {Function} [options.showAlert] - A function to show an alert message if the pause limit is reached.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the recording can be paused, otherwise `false`.
 *
 * @example
 * ```typescript
 * const checkPauseStateService = new CheckPauseState();
 * const canPause = await checkPauseStateService.checkPauseState({
 *   recordingMediaOptions: 'video',
 *   recordingVideoPausesLimit: 3,
 *   recordingAudioPausesLimit: 5,
 *   pauseRecordCount: 2,
 *   showAlert: (alert) => console.log(alert.message),
 * });
 * console.log('Can pause recording:', canPause);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class CheckPauseState {
  checkPauseState = async (options: CheckPauseStateOptions): Promise<boolean> => {
    return sharedCheckPauseState(options);
  };
}
