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

/**
 * Updates the recording state based on the provided parameters.
 *
 * @param {UpdateRecordingOptions} options - The options for updating the recording state.
 * @param {Object} options.parameters - The parameters required for updating the recording state.
 * @param {string} options.parameters.roomName - The name of the room where the recording is taking place.
 * @param {UserRecordingParams} options.parameters.userRecordingParams - User-specific recording parameters.
 * @param {Socket} options.parameters.socket - The socket instance for communication.
 * @param {Function} options.parameters.updateIsRecordingModalVisible - Function to update the visibility of the recording modal.
 * @param {boolean} options.parameters.confirmedToRecord - Indicates if the user has confirmed to start recording.
 * @param {Function} options.parameters.showAlert - Function to show alerts.
 * @param {string} options.parameters.recordingMediaOptions - The media options for recording (e.g., "video", "audio").
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already turned on.
 * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already turned on.
 * @param {boolean} options.parameters.recordStarted - Indicates if the recording has started.
 * @param {boolean} options.parameters.recordPaused - Indicates if the recording is paused.
 * @param {boolean} options.parameters.recordResumed - Indicates if the recording has resumed.
 * @param {boolean} options.parameters.recordStopped - Indicates if the recording has stopped.
 * @param {number} options.parameters.recordChangeSeconds - The interval in seconds for changing the recording state.
 * @param {number} options.parameters.pauseRecordCount - The count of pauses during the recording.
 * @param {boolean} options.parameters.startReport - Indicates if the start report is active.
 * @param {boolean} options.parameters.endReport - Indicates if the end report is active.
 * @param {boolean} options.parameters.canRecord - Indicates if recording is allowed.
 * @param {boolean} options.parameters.canPauseResume - Indicates if pausing and resuming the recording is allowed.
 * @param {Function} options.parameters.updateCanPauseResume - Function to update the pause/resume state.
 * @param {Function} options.parameters.updatePauseRecordCount - Function to update the pause record count.
 * @param {Function} options.parameters.updateClearedToRecord - Function to update the cleared-to-record state.
 * @param {Function} options.parameters.updateRecordPaused - Function to update the record paused state.
 * @param {Function} options.parameters.updateRecordResumed - Function to update the record resumed state.
 * @param {Function} options.parameters.updateStartReport - Function to update the start report state.
 * @param {Function} options.parameters.updateEndReport - Function to update the end report state.
 * @param {Function} options.parameters.updateCanRecord - Function to update the can record state.
 * @param {Function} options.parameters.rePort - Function to handle reporting.
 *
 * @returns {Promise<void>} A promise that resolves when the recording state has been updated.
 *
 * @remarks
 * This method handles the recording state updates, including starting, pausing, resuming, and stopping the recording.
 * It also performs necessary checks to ensure that the user can perform the requested actions based on their current state.
 * Alerts are displayed for any issues encountered during the process.
 *
 * @example
 * ```typescript
 * const options: UpdateRecordingOptions = { parameters: someParameters };
 * await updateRecording(options);
 * console.log('Recording state updated successfully.');
 * ```
 */

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
