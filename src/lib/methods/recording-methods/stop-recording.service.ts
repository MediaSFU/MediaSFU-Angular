import { Injectable } from '@angular/core';
import { RecordPauseTimer } from './record-pause-timer.service';
import { ShowAlert } from '../../@types/types';

export interface StopRecordingParameters {
  roomName: string;
  socket: any;
  showAlert?: ShowAlert;
  startReport: boolean;
  endReport: boolean;
  recordStarted: boolean;
  recordPaused: boolean;
  recordStopped: boolean;
  updateRecordPaused: (paused: boolean) => void;
  updateRecordStopped: (stopped: boolean) => void;
  updateStartReport: (startReport: boolean) => void;
  updateEndReport: (endReport: boolean) => void;
  updateShowRecordButtons: (show: boolean) => void;
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  recordingMediaOptions: string;

  // mediasfu functions
  captureCanvasStream: (options: { parameters: any; start?: boolean }) => void;

  [key: string]: any;
}

export interface StopRecordingOptions {
  parameters: StopRecordingParameters;
}

// Export the type definition for the function
export type StopRecordingType = (options: StopRecordingOptions) => Promise<void>;

/**
 * Stops the recording process based on the provided parameters.
 *
 * @param {StopRecordingOptions} options - The options for stopping the recording.
 * @param {Object} options.parameters - The parameters required for stopping the recording.
 * @param {string} options.parameters.roomName - The name of the room where the recording is being stopped.
 * @param {Socket} options.parameters.socket - The socket instance for communication.
 * @param {Function} options.parameters.showAlert - Function to show alerts.
 * @param {boolean} options.parameters.startReport - Flag indicating if the start report is active.
 * @param {boolean} options.parameters.endReport - Flag indicating if the end report is active.
 * @param {boolean} options.parameters.recordStarted - Flag indicating if the recording has started.
 * @param {boolean} options.parameters.recordPaused - Flag indicating if the recording is paused.
 * @param {boolean} options.parameters.recordStopped - Flag indicating if the recording is stopped.
 * @param {Function} options.parameters.updateRecordPaused - Function to update the record paused status.
 * @param {Function} options.parameters.updateRecordStopped - Function to update the record stopped status.
 * @param {Function} options.parameters.updateStartReport - Function to update the start report status.
 * @param {Function} options.parameters.updateEndReport - Function to update the end report status.
 * @param {Function} options.parameters.updateShowRecordButtons - Function to update the visibility of recording buttons.
 * @param {boolean} options.parameters.whiteboardStarted - Flag indicating if the whiteboard has started.
 * @param {boolean} options.parameters.whiteboardEnded - Flag indicating if the whiteboard has ended.
 * @param {string} options.parameters.recordingMediaOptions - The media options for recording (e.g., "video", "audio").
 * @param {Function} options.parameters.captureCanvasStream - Function to capture the canvas stream.
 *
 * @returns {Promise<void>} - A promise that resolves when the recording is stopped.
 *
 * @remarks
 * This method checks if the recording has started and is not already stopped.
 * It pauses the timer and emits a stop recording event via socket communication.
 * If successful, it updates the recording state and alerts the user.
 * Additionally, if the whiteboard feature is active, it captures the canvas stream.
 *
 * @example
 * ```typescript
 * const options: StopRecordingOptions = { parameters: someParameters };
 * await stopRecording(options);
 * console.log('Recording stopped successfully.');
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class StopRecording {
  constructor(private RecordPauseTimerService: RecordPauseTimer) {}

  async stopRecording({ parameters }: StopRecordingOptions): Promise<void> {
    let {
      roomName,
      socket,
      showAlert,
      startReport,
      endReport,
      recordStarted,
      recordPaused,
      recordStopped,
      updateRecordPaused,
      updateRecordStopped,
      updateStartReport,
      updateEndReport,
      updateShowRecordButtons,

      whiteboardStarted,
      whiteboardEnded,
      recordingMediaOptions,

      //mediasfu functions
      captureCanvasStream,
    } = parameters;

    let recAttempt;

    if (recordStarted && !recordStopped) {
      let stop = await this.RecordPauseTimerService.recordPauseTimer({
        stop: true,
        isTimerRunning: parameters['isTimerRunning'],
        canPauseResume: parameters['canPauseResume'],
        showAlert: parameters.showAlert,
      });

      if (stop) {
        let action = 'stopRecord';

        await new Promise<void>((resolve) => {
          socket.emit(
            action,
            { roomName },
            ({
              success,
              reason,
              recordState,
            }: {
              success: boolean;
              reason: string;
              recordState: string;
            }) => {
              if (success) {
                startReport = false;
                endReport = true;
                recordPaused = false;
                recordStopped = true;
                recAttempt = true;

                updateStartReport(startReport);
                updateEndReport(endReport);
                updateRecordPaused(recordPaused);
                updateRecordStopped(recordStopped);
                showAlert?.({ message: 'Recording Stopped', type: 'success' });
                updateShowRecordButtons(false);
              } else {
                let reasonMessage = `Recording Stop Failed: ${reason}; the recording is currently ${recordState}`;
                showAlert?.({ message: reasonMessage, type: 'danger' });
                recAttempt = false;
              }

              resolve();
            },
          );
        });

        try {
          if (recAttempt && whiteboardStarted && !whiteboardEnded) {
            if (recordingMediaOptions === 'video') {
              captureCanvasStream({ parameters, start: false });
            }
          }
        } catch (error) {
          console.log('Error capturing canvas stream:', error);
        }
      } else {
        return;
      }
    } else {
      showAlert?.({ message: 'Recording is not started yet or already stopped', type: 'danger' });
    }
  }
}
