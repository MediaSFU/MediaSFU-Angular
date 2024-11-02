import { Injectable } from '@angular/core';
export interface CheckResumeStateOptions {
  recordingMediaOptions: string; // 'video' or 'audio'
  recordingVideoPausesLimit: number;
  recordingAudioPausesLimit: number;
  pauseRecordCount: number;
}

// Export the type definition for the function
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


@Injectable({
  providedIn: 'root',
})
export class CheckResumeState {
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

  checkResumeState = async ({
    recordingMediaOptions,
    recordingVideoPausesLimit,
    recordingAudioPausesLimit,
    pauseRecordCount,
  }: CheckResumeStateOptions): Promise<boolean> => {
    // function to check if the user can resume recording
    let ref_limit = 0;
    if (recordingMediaOptions == 'video') {
      ref_limit = recordingVideoPausesLimit;
    } else {
      ref_limit = recordingAudioPausesLimit;
    }

    return pauseRecordCount <= ref_limit;
  };
}
