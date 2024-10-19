import { Injectable } from '@angular/core';
import { CheckPauseState } from './check-pause-state.service';
import { CheckResumeState } from './check-resume-state.service';
import { RecordPauseTimer } from './record-pause-timer.service';
import { RecordResumeTimer, RecordResumeTimerParameters } from './record-resume-timer.service';
import { RePortParameters, RePortType, ShowAlert, UserRecordingParams } from '../../@types/types';
import { Socket } from 'socket.io-client';

export interface UpdateRecordingParameters extends RecordResumeTimerParameters, RePortParameters {
  roomName: string;
  userRecordingParams: UserRecordingParams;
  socket: Socket;
  updateIsRecordingModalVisible: (visible: boolean) => void;
  confirmedToRecord: boolean;
  showAlert?: ShowAlert;
  recordingMediaOptions: string;
  videoAlreadyOn: boolean;
  audioAlreadyOn: boolean;
  recordStarted: boolean;
  recordPaused: boolean;
  recordResumed: boolean;
  recordStopped: boolean;
  recordChangeSeconds: number;
  pauseRecordCount: number;
  startReport: boolean;
  endReport: boolean;
  canRecord: boolean;
  canPauseResume: boolean;
  updateCanPauseResume: (canPauseResume: boolean) => void;
  updatePauseRecordCount: (count: number) => void;
  updateClearedToRecord: (cleared: boolean) => void;
  updateRecordPaused: (paused: boolean) => void;
  updateRecordResumed: (resumed: boolean) => void;
  updateStartReport: (start: boolean) => void;
  updateEndReport: (end: boolean) => void;
  updateCanRecord: (canRecord: boolean) => void;

  // Mediasfu functions
  rePort: RePortType;

  getUpdatedAllParams: () => UpdateRecordingParameters;
  [key: string]: any;
}

export interface UpdateRecordingOptions {
  parameters: UpdateRecordingParameters;
}

// Export the type definition for the function
export type UpdateRecordingType = (options: UpdateRecordingOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class UpdateRecording {
  constructor(
    private CheckPauseStateService: CheckPauseState,
    private CheckResumeStateService: CheckResumeState,
    private RecordPauseTimerService: RecordPauseTimer,
    private RecordResumeTimerService: RecordResumeTimer,
  ) {}

  /**
   * Updates the recording state based on the provided parameters.
   *
   * @param {UpdateRecordingOptions} parameters - The parameters for updating the recording state.
   * @returns {Promise<void>} A promise that resolves when the recording state has been updated.
   *
   * @property {string} roomName - The name of the room where the recording is taking place.
   * @property {any} userRecordingParams - Parameters related to the user's recording settings.
   * @property {any} socket - The socket connection used for communication.
   * @property {Function} updateIsRecordingModalVisible - Function to update the visibility of the recording modal.
   * @property {boolean} confirmedToRecord - Indicates if the user has confirmed to start recording.
   * @property {Function} showAlert - Function to show alert messages.
   * @property {string} recordingMediaOptions - The media options for recording (e.g., "video", "audio").
   * @property {boolean} videoAlreadyOn - Indicates if the video is already turned on.
   * @property {boolean} audioAlreadyOn - Indicates if the audio is already turned on.
   * @property {boolean} recordStarted - Indicates if the recording has started.
   * @property {boolean} recordPaused - Indicates if the recording is paused.
   * @property {boolean} recordResumed - Indicates if the recording has resumed.
   * @property {boolean} recordStopped - Indicates if the recording has stopped.
   * @property {number} recordChangeSeconds - The interval in seconds for changing the recording state.
   * @property {number} pauseRecordCount - The count of pauses during the recording.
   * @property {boolean} startReport - Indicates if the start report is active.
   * @property {boolean} endReport - Indicates if the end report is active.
   * @property {boolean} canRecord - Indicates if recording is allowed.
   * @property {boolean} canPauseResume - Indicates if pausing and resuming the recording is allowed.
   * @property {Function} updateCanPauseResume - Function to update the pause/resume state.
   * @property {Function} updatePauseRecordCount - Function to update the pause record count.
   * @property {Function} updateClearedToRecord - Function to update the cleared-to-record state.
   * @property {Function} updateRecordPaused - Function to update the record paused state.
   * @property {Function} updateRecordResumed - Function to update the record resumed state.
   * @property {Function} updateStartReport - Function to update the start report state.
   * @property {Function} updateEndReport - Function to update the end report state.
   * @property {Function} updateCanRecord - Function to update the can record state.
   * @property {Function} rePort - Function to handle reporting.
   */

  updateRecording = async ({ parameters }: UpdateRecordingOptions): Promise<void> => {
    parameters = parameters.getUpdatedAllParams();

    let {
      roomName,
      userRecordingParams,
      socket,
      updateIsRecordingModalVisible,
      confirmedToRecord,
      showAlert,
      recordingMediaOptions,
      videoAlreadyOn,
      audioAlreadyOn,
      recordStarted,
      recordPaused,
      recordResumed,
      recordStopped,
      recordChangeSeconds,
      pauseRecordCount,
      startReport,
      endReport,
      canRecord,

      updateCanPauseResume,
      updatePauseRecordCount,
      updateClearedToRecord,
      updateRecordPaused,
      updateRecordResumed,
      updateStartReport,
      updateEndReport,
      updateCanRecord,

      //mediasfu functions
      // checkPauseState,
      // checkResumeState,
      rePort,
      // recordPauseTimer,
      // recordResumeTimer,
    } = parameters;

    // Check if recording is confirmed before starting
    if (recordStopped) {
      showAlert?.({
        message: 'Recording has already stopped',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    // Check for recordingMediaOptions for video
    if (recordingMediaOptions === 'video' && !videoAlreadyOn) {
      showAlert?.({
        message: 'You must turn on your video before you can start recording',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    // Check for recordingMediaOptions for audio
    if (recordingMediaOptions === 'audio' && !audioAlreadyOn) {
      showAlert?.({
        message: 'You must turn on your audio before you can start recording',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    if (recordStarted && !recordPaused && !recordStopped) {
      let proceed = false;

      proceed = await this.CheckPauseStateService.checkPauseState({
        recordingMediaOptions,
        recordingVideoPausesLimit: parameters['recordingVideoPausesLimit'],
        recordingAudioPausesLimit: parameters['recordingAudioPausesLimit'],
        pauseRecordCount,
        showAlert,
      });

      if (!proceed) {
        return;
      }

      let record = this.RecordPauseTimerService.recordPauseTimer({
        stop: false,
        isTimerRunning: parameters.isTimerRunning,
        canPauseResume: parameters.canPauseResume,
        showAlert,
      });

      if (record) {
        let action = 'pauseRecord';

        await new Promise<void>((resolve) => {
          socket.emit(
            action,
            { roomName },
            async ({
              success,
              reason,
              recordState,
              pauseCount,
            }: {
              success: boolean;
              reason: string;
              recordState: string;
              pauseCount: number;
            }) => {
              pauseRecordCount = pauseCount;
              updatePauseRecordCount(pauseRecordCount);

              if (success) {
                startReport = false;
                endReport = true;
                recordPaused = true;
                updateStartReport(startReport);
                updateEndReport(endReport);
                updateRecordPaused(recordPaused);

                showAlert?.({
                  message: 'Recording paused',
                  type: 'success',
                  duration: 3000,
                });

                // Set isRecordingModalVisible to false
                updateIsRecordingModalVisible(false);
                setTimeout(() => {
                  updateCanPauseResume(true);
                }, recordChangeSeconds);
              } else {
                let reasonMessage = `Recording Pause Failed: ${reason}; the current state is: ${recordState}`;

                showAlert?.({
                  message: reasonMessage,
                  type: 'danger',
                  duration: 3000,
                });
              }

              resolve();
            },
          );
        });
      }
    } else if (recordStarted && recordPaused && !recordStopped) {
      if (!confirmedToRecord) {
        showAlert?.({
          message: 'You must click confirm before you can start recording',
          type: 'danger',
          duration: 3000,
        });

        return;
      }

      let proceed = false;

      proceed = await this.CheckResumeStateService.checkResumeState({
        recordingMediaOptions,
        recordingVideoPausesLimit: parameters['recordingVideoPausesLimit'],
        recordingAudioPausesLimit: parameters['recordingAudioPausesLimit'],
        pauseRecordCount,
      });

      if (!proceed) {
        return;
      }

      let resume = await this.RecordResumeTimerService.recordResumeTimer({ parameters });
      if (resume) {
        // Set clearedToRecord to true
        updateClearedToRecord(true);

        let action = 'startRecord';
        if (recordStarted && recordPaused && !recordResumed && !recordStopped) {
          action = 'resumeRecord';
        } else {
          action = 'startRecord';
        }
        action = 'resumeRecord';

        await new Promise<void>((resolve) => {
          socket.emit(
            action,
            { roomName, userRecordingParams },
            async ({
              success,
              reason,
            }: {
              success: boolean;
              reason: string;
              recordState: string;
            }) => {
              if (success) {
                recordPaused = false;
                recordResumed = true;
                updateRecordPaused(recordPaused);
                updateRecordResumed(recordResumed);

                if (action === 'startRecord') {
                  await rePort({ parameters });
                } else {
                  recordResumed = true;
                  await rePort({ restart: true, parameters });
                }
              } else {
                showAlert?.({
                  message: `Recording could not start - ${reason}`,
                  type: 'danger',
                  duration: 3000,
                });

                canRecord = true;
                startReport = false;
                endReport = true;

                updateCanRecord(canRecord);
                updateStartReport(startReport);
                updateEndReport(endReport);
              }

              resolve();
            },
          );
        });

        // Set isRecordingModalVisible to false
        updateIsRecordingModalVisible(false);

        setTimeout(() => {
          updateCanPauseResume(true);
        }, recordChangeSeconds);
      }
    }
  };
}
