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
