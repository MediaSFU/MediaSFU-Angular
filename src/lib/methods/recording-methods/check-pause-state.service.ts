import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class CheckPauseState {
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

  checkPauseState = async ({
    recordingMediaOptions,
    recordingVideoPausesLimit,
    recordingAudioPausesLimit,
    pauseRecordCount,
    showAlert,
  }: CheckPauseStateOptions): Promise<boolean> => {
    // function to check if the user can pause recording
    let ref_limit = 0;
    if (recordingMediaOptions == 'video') {
      ref_limit = recordingVideoPausesLimit;
    } else {
      ref_limit = recordingAudioPausesLimit;
    }

    if (pauseRecordCount < ref_limit) {
      return true;
    } else {
      showAlert?.({
        message: 'You have reached the limit of pauses - you can choose to stop recording.',
        type: 'danger',
        duration: 3000,
      });

      return false;
    }
  };
}
