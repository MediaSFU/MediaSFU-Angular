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
