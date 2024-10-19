import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
export interface RecordPauseTimerOptions {
  stop?: boolean;
  isTimerRunning: boolean;
  canPauseResume: boolean;
  showAlert?: ShowAlert;
}

// export the type definition for the function
export type RecordPauseTimerType = (options: RecordPauseTimerOptions) => boolean;

@Injectable({
  providedIn: 'root',
})
export class RecordPauseTimer {
  /**
   * Controls the pause and resume functionality of a recording timer.
   *
   * @param {Object} options - The options for controlling the timer.
   * @param {boolean} [options.stop=false] - Indicates whether to stop the timer.
   * @param {Object} options.parameters - The parameters for the timer control.
   * @param {boolean} options.parameters.isTimerRunning - Indicates if the timer is currently running.
   * @param {boolean} options.parameters.canPauseResume - Indicates if the timer can be paused or resumed.
   * @param {Function} [options.parameters.showAlert] - Optional function to show an alert message.
   * @returns {boolean} - Returns true if the timer can be paused or resumed, otherwise false.
   */

  recordPauseTimer = ({
    stop = false,
    isTimerRunning,
    canPauseResume,
    showAlert,
  }: RecordPauseTimerOptions): boolean => {
    // Ensure the timer is running and pause/resume actions are allowed
    if (isTimerRunning && canPauseResume) {
      return true;
    } else {
      const message = stop
        ? 'Can only stop after 15 seconds of starting or pausing or resuming recording'
        : 'Can only pause or resume after 15 seconds of starting or pausing or resuming recording';
      showAlert?.({
        message,
        type: 'danger',
      });
      return false;
    }
  };
}
