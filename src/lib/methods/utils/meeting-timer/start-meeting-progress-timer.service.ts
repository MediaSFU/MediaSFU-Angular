// start-meeting-progress-timer.service.ts
import { Injectable } from '@angular/core';
export interface StartMeetingProgressTimerParameters {
  updateMeetingProgressTime: (formattedTime: string) => void;
  validated: boolean;
  roomName: string;

  // mediasfu functions
  getUpdatedAllParams: () => StartMeetingProgressTimerParameters;
  [key: string]: any;
}

export interface StartMeetingProgressTimerOptions {
  startTime: number;
  parameters: StartMeetingProgressTimerParameters;
}

// Export the type definition for the function
export type StartMeetingProgressTimerType = (options: StartMeetingProgressTimerOptions) => void;

/**
 * Starts a timer to track the progress of a meeting.
 *
 * @param {StartMeetingProgressTimerOptions} options - The options for starting the meeting progress timer.
 * @param {number} options.startTime - The custom start time for the meeting progress timer in seconds since epoch.
 * @param {StartMeetingProgressTimerParameters} options.parameters - The parameters required for updating the meeting progress.
 * @param {Function} options.parameters.updateMeetingProgressTime - Function to update the formatted meeting progress time.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 *
 * @returns {void}
 *
 * @remarks
 * This function calculates the elapsed time since the meeting started and updates the meeting progress every second.
 * The timer will stop if the validated flag is set to false or if the room name is not valid.
 *
 * The time is formatted in HH:MM:SS format, and the update function is called with the formatted time.
 *
 * @example
 * ```typescript
 * const options: StartMeetingProgressTimerOptions = {
 *   startTime: Math.floor(Date.now() / 1000), // Current time in seconds
 *   parameters: {
 *     updateMeetingProgressTime: (formattedTime) => console.log(`Meeting Progress: ${formattedTime}`),
 *     validated: true,
 *     roomName: 'Room123',
 *     getUpdatedAllParams: () => ({
 *       validated: true,
 *       roomName: 'Room123',
 *       updateMeetingProgressTime: options.parameters.updateMeetingProgressTime,
 *     }),
 *   },
 * };
 *
 * const timerService = new StartMeetingProgressTimer();
 * timerService.startMeetingProgressTimer(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class StartMeetingProgressTimer {
  private timeProgress: any;

  /**
   * Starts a timer to track the progress of a meeting.
   *
   * @param {Object} options - The options for starting the meeting progress timer.
   * @param {number} options.startTime - The custom start time for the meeting progress timer.
   * @param {Object} options.parameters - The parameters required for updating the meeting progress.
   * @param {Function} options.parameters.updateMeetingProgressTime - Function to update the meeting progress time.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   *
   * @returns {void}
   */

  startMeetingProgressTimer = ({
    startTime,
    parameters,
  }: StartMeetingProgressTimerOptions): void => {
    let { updateMeetingProgressTime, getUpdatedAllParams } = parameters;

    const calculateElapsedTime = (startTime: number): number => {
      const currentTime = Math.floor(new Date().getTime() / 1000);
      return currentTime - startTime;
    };

    const padNumber = (number: number): string => {
      return number.toString().padStart(2, '0');
    };

    const formatTime = (time: number): string => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = (time % 60).toFixed(0).padStart(2, '0');
      return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(Number(seconds))}`;
    };

    let elapsedTime = calculateElapsedTime(startTime);

    this.timeProgress = setInterval(async () => {
      elapsedTime++;
      const formattedTime = formatTime(elapsedTime);
      updateMeetingProgressTime(formattedTime);

      parameters = getUpdatedAllParams();

      if (!parameters.validated || !parameters.roomName) {
        clearInterval(this.timeProgress);
        this.timeProgress = null;
      }
    }, 1000);
  };

  stopMeetingProgressTimer = (): void => {
    if (this.timeProgress) {
      clearInterval(this.timeProgress);
      this.timeProgress = null;
    }
  };
}
