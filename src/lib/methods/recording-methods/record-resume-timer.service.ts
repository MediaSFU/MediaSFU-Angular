import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
import { RecordUpdateTimer } from './record-update-timer.service';
export interface RecordResumeTimerParameters {
  isTimerRunning: boolean;
  canPauseResume: boolean;
  recordElapsedTime: number;
  recordStartTime: number;
  recordTimerInterval?: NodeJS.Timeout | null;
  showAlert?: ShowAlert;
  updateRecordStartTime: (time: number) => void;
  updateRecordTimerInterval: (interval: NodeJS.Timeout | null) => void;
  updateIsTimerRunning: (isRunning: boolean) => void;
  updateCanPauseResume: (canPause: boolean) => void;

  getUpdatedAllParams: () => RecordResumeTimerParameters;
  [key: string]: any;
}

export interface RecordResumeTimerOptions {
  parameters: RecordResumeTimerParameters;
}

// Export the type definition for the function
export type RecordResumeTimerType = (options: RecordResumeTimerOptions) => Promise<boolean>;

/**
 * Resumes the recording timer if it is not already running and can be paused/resumed.
 *
 * @param {RecordResumeTimerOptions} options - The options for resuming the recording timer.
 * @param {Object} options.parameters - The parameters for the recording timer.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {boolean} options.parameters.isTimerRunning - Indicates if the timer is currently running.
 * @param {boolean} options.parameters.canPauseResume - Indicates if the timer can be paused/resumed.
 * @param {number} options.parameters.recordElapsedTime - The elapsed recording time in seconds.
 * @param {number} options.parameters.recordStartTime - The start time of the recording.
 * @param {NodeJS.Timeout | null} options.parameters.recordTimerInterval - The interval ID for the recording timer.
 * @param {Function} options.parameters.showAlert - Function to show an alert message.
 * @param {Function} options.parameters.updateRecordStartTime - Function to update the recording start time.
 * @param {Function} options.parameters.updateRecordTimerInterval - Function to update the recording timer interval.
 * @param {Function} options.parameters.updateIsTimerRunning - Function to update the timer running status.
 * @param {Function} options.parameters.updateCanPauseResume - Function to update the pause/resume status.
 *
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the timer was successfully resumed, otherwise false.
 *
 * @throws Will show an alert if the timer cannot be resumed due to conditions not being met.
 *
 * @example
 * ```typescript
 * const options: RecordResumeTimerOptions = {
 *   parameters: {
 *     isTimerRunning: false,
 *     canPauseResume: true,
 *     recordElapsedTime: 10,
 *     recordStartTime: Date.now(),
 *     recordTimerInterval: null,
 *     showAlert: (alert) => { },
 *     updateRecordStartTime: (time) => { },
 *     updateRecordTimerInterval: (interval) => { },
 *     updateIsTimerRunning: (isRunning) => { },
 *     updateCanPauseResume: (canPause) => {  },
 *     getUpdatedAllParams: () => ({  }),
 *   },
 * };
 * const canResume = await recordResumeTimer(options);
 * if (canResume) {
 *   // proceed with the resumed recording
 * }
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class RecordResumeTimer {
  constructor(private RecordUpdateTimerService: RecordUpdateTimer) {}

  /**
   * Resumes the recording timer if it is not already running and can be paused/resumed.
   *
   * @param {RecordResumeTimerOptions} options - The options for resuming the recording timer.
   * @param {Object} options.parameters - The parameters for the recording timer.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {boolean} options.parameters.isTimerRunning - Indicates if the timer is currently running.
   * @param {boolean} options.parameters.canPauseResume - Indicates if the timer can be paused/resumed.
   * @param {number} options.parameters.recordElapsedTime - The elapsed recording time in seconds.
   * @param {number} options.parameters.recordStartTime - The start time of the recording.
   * @param {number | null} options.parameters.recordTimerInterval - The interval ID for the recording timer.
   * @param {Function} options.parameters.showAlert - Function to show an alert message.
   * @param {Function} options.parameters.updateRecordStartTime - Function to update the recording start time.
   * @param {Function} options.parameters.updateRecordTimerInterval - Function to update the recording timer interval.
   * @param {Function} options.parameters.updateIsTimerRunning - Function to update the timer running status.
   * @param {Function} options.parameters.updateCanPauseResume - Function to update the pause/resume status.
   *
   * @returns {Promise<boolean>} - Returns a promise that resolves to true if the timer was successfully resumed, otherwise false.
   */

  recordResumeTimer = async ({ parameters }: RecordResumeTimerOptions): Promise<boolean> => {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      isTimerRunning,
      canPauseResume,
      recordElapsedTime,
      recordStartTime,
      recordTimerInterval,
      showAlert,
      updateRecordStartTime,
      updateRecordTimerInterval,
      updateIsTimerRunning,
      updateCanPauseResume,

      //mediasfu Functions
      // recordUpdateTimer,
    } = parameters;

    if (!isTimerRunning && canPauseResume) {
      recordStartTime = new Date().getTime() - recordElapsedTime * 1000; // Calculate the starting time based on elapsed time
      updateRecordStartTime(recordStartTime);
      recordTimerInterval = setInterval(() => {
        // Update the timer every second (1000 milliseconds)
        this.RecordUpdateTimerService.recordUpdateTimer({
          recordElapsedTime: recordElapsedTime,
          recordStartTime: recordStartTime,
          updateRecordElapsedTime: parameters['updateRecordElapsedTime'],
          updateRecordingProgressTime: parameters['updateRecordingProgressTime'],
        });

        parameters = getUpdatedAllParams();

        // Check if recording is paused or stopped, and close the interval if needed
        if (
          parameters['recordPaused'] ||
          parameters['recordStopped'] ||
          parameters['roomName'] == '' ||
          parameters['roomName'] == null
        ) {
          if (recordTimerInterval != null) {
            clearInterval(recordTimerInterval);
          }
          updateRecordTimerInterval(null);
          isTimerRunning = false;
          updateIsTimerRunning(isTimerRunning);
          canPauseResume = false;
          updateCanPauseResume(canPauseResume);
        }
      }, 1000);
      updateRecordTimerInterval(recordTimerInterval);
      isTimerRunning = true;
      updateIsTimerRunning(isTimerRunning);
      canPauseResume = false; // Disable pause/resume actions until paused again
      updateCanPauseResume(canPauseResume);
      return true;
    } else {
      showAlert?.({
        type: 'danger',
        message:
          'Can only pause or resume after 15 seconds of starting or pausing or resuming recording',
      });
      return false;
    }
  };
}
