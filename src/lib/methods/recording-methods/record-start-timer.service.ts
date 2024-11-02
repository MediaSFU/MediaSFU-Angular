import { Injectable } from '@angular/core';
import { RecordUpdateTimer } from './record-update-timer.service';

export interface RecordStartTimerParameters {
  recordStartTime: number;
  recordTimerInterval?: NodeJS.Timeout | null;
  isTimerRunning: boolean;
  canPauseResume: boolean;
  recordChangeSeconds: number;
  recordPaused: boolean;
  recordStopped: boolean;
  roomName: string | null;
  updateRecordStartTime: (time: number) => void;
  updateRecordTimerInterval: (interval: NodeJS.Timeout | null) => void;
  updateIsTimerRunning: (isRunning: boolean) => void;
  updateCanPauseResume: (canPause: boolean) => void;

  // Mediasfu functions
  getUpdatedAllParams: () => RecordStartTimerParameters;
  [key: string]: any;
}

export interface RecordStartTimerOptions {
  parameters: RecordStartTimerParameters;
}

// Export the type definition for the function
export type RecordStartTimerType = (options: RecordStartTimerOptions) => Promise<void>;

/**
 * Starts the recording timer and manages its state.
 *
 * @param {RecordStartTimerOptions} options - The options for starting the recording timer.
 * @param {Object} options.parameters - The parameters for the recording timer.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {number} options.parameters.recordStartTime - The start time of the recording.
 * @param {NodeJS.Timeout | null} options.parameters.recordTimerInterval - The interval ID for the recording timer.
 * @param {boolean} options.parameters.isTimerRunning - Flag indicating if the timer is currently running.
 * @param {boolean} options.parameters.canPauseResume - Flag indicating if pause/resume actions are enabled.
 * @param {number} options.parameters.recordChangeSeconds - The time after which pause/resume actions are enabled.
 * @param {Function} options.parameters.updateRecordStartTime - Function to update the recording start time.
 * @param {Function} options.parameters.updateRecordTimerInterval - Function to update the recording timer interval.
 * @param {Function} options.parameters.updateIsTimerRunning - Function to update the timer running state.
 * @param {Function} options.parameters.updateCanPauseResume - Function to update the pause/resume state.
 *
 * @returns {Promise<void>} A promise that resolves when the timer is started.
 *
 * @remarks
 * This function initializes the recording start time and sets up an interval to update the timer every second.
 * It also manages the state of the timer, including enabling and disabling pause/resume actions.
 * The timer is stopped if the recording is paused, stopped, or if the room name is invalid.
 *
 * @example
 * ```typescript
 * const options: RecordStartTimerOptions = {
 *   parameters: {
 *     recordStartTime: Date.now(),
 *     recordTimerInterval: null,
 *     isTimerRunning: false,
 *     canPauseResume: false,
 *     recordChangeSeconds: 15,
 *     recordPaused: false,
 *     recordStopped: false,
 *     roomName: 'room1',
 *     updateRecordStartTime: (time) => {  },
 *     updateRecordTimerInterval: (interval) => {  },
 *     updateIsTimerRunning: (isRunning) => { },
 *     updateCanPauseResume: (canPause) => {},
 *     getUpdatedAllParams: () => { },
 *   },
 * };
 * await recordStartTimer(options);
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class RecordStartTimer {
  constructor(private RecordUpdateTimerService: RecordUpdateTimer) {}

  /**
   * Starts the recording timer.
   * @function
   * @param {RecordStartTimerOptions} options - The options object containing necessary variables and functions.
   */
  /**
   * Starts a recording timer and manages its state.
   *
   * @param {RecordStartTimerOptions} options - The options for starting the recording timer.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {number} options.parameters.recordStartTime - The start time of the recording.
   * @param {number | null} options.parameters.recordTimerInterval - The interval ID for the recording timer.
   * @param {boolean} options.parameters.isTimerRunning - Flag indicating if the timer is running.
   * @param {boolean} options.parameters.canPauseResume - Flag indicating if pause/resume actions are enabled.
   * @param {number} options.parameters.recordChangeSeconds - The time after which pause/resume actions are enabled.
   * @param {Function} options.parameters.updateRecordStartTime - Function to update the recording start time.
   * @param {Function} options.parameters.updateRecordTimerInterval - Function to update the recording timer interval.
   * @param {Function} options.parameters.updateIsTimerRunning - Function to update the timer running state.
   * @param {Function} options.parameters.updateCanPauseResume - Function to update the pause/resume state.
   *
   * @returns {Promise<void>} A promise that resolves when the timer is started.
   *
   * @remarks
   * This function initializes the recording start time and sets up an interval to update the timer every second.
   * It also manages the state of the timer, including enabling and disabling pause/resume actions.
   * The timer is stopped if the recording is paused, stopped, or if the room name is invalid.
   */

  recordStartTimer = async ({ parameters }: { parameters: any }): Promise<void> => {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      recordStartTime,
      recordTimerInterval,
      isTimerRunning,
      canPauseResume,
      recordChangeSeconds,

      updateRecordStartTime,
      updateRecordTimerInterval,
      updateIsTimerRunning,
      updateCanPauseResume,
    } = parameters;

    /**
     * Utility function to enable pause/resume actions after a specified time.
     */
    function enablePauseResume() {
      canPauseResume = true;
      updateCanPauseResume(canPauseResume);
    }

    if (!isTimerRunning) {
      recordStartTime = new Date().getTime(); // Get the current timestamp
      updateRecordStartTime(recordStartTime);
      recordTimerInterval = setInterval(() => {
        // Update the timer every second (1000 milliseconds)
        this.RecordUpdateTimerService.recordUpdateTimer({
          recordElapsedTime: parameters.recordElapsedTime,
          recordStartTime: recordStartTime,
          updateRecordElapsedTime: parameters.updateRecordElapsedTime,
          updateRecordingProgressTime: parameters.updateRecordingProgressTime,
        });

        parameters = getUpdatedAllParams();

        // Check if recording is paused or stopped, and close the interval if needed
        if (
          parameters.recordPaused ||
          parameters.recordStopped ||
          parameters.roomName == '' ||
          parameters.roomName == null
        ) {
          clearInterval(recordTimerInterval);
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
      canPauseResume = false; // Disable pause/resume actions initially
      updateCanPauseResume(canPauseResume);
      setTimeout(enablePauseResume, recordChangeSeconds); // Enable pause/resume actions after specified time
    }
  };
}
