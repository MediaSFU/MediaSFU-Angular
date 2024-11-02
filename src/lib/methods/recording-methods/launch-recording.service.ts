import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';

export interface LaunchRecordingOptions {
  updateIsRecordingModalVisible: (visible: boolean) => void;
  isRecordingModalVisible: boolean;
  showAlert?: ShowAlert;
  stopLaunchRecord: boolean;
  canLaunchRecord: boolean;
  recordingAudioSupport: boolean;
  recordingVideoSupport: boolean;
  updateCanRecord: (canRecord: boolean) => void;
  updateClearedToRecord: (cleared: boolean) => void;
  recordStarted: boolean;
  recordPaused: boolean;
  localUIMode: boolean;

  [key: string]: any;
}

// Export the type definition for the function
export type LaunchRecordingType = (options: LaunchRecordingOptions) => void;

/**
 * Launches the recording process based on various conditions and updates the UI accordingly.
 *
 * @param {LaunchRecordingOptions} options - The options for launching the recording.
 * @param {Function} options.updateIsRecordingModalVisible - Function to update the visibility of the recording modal.
 * @param {boolean} options.isRecordingModalVisible - Indicates if the recording modal is currently visible.
 * @param {Function} [options.showAlert] - Optional function to show an alert message.
 * @param {boolean} options.stopLaunchRecord - Indicates if the recording launch should be stopped.
 * @param {boolean} options.canLaunchRecord - Indicates if the recording can be launched.
 * @param {boolean} options.recordingAudioSupport - Indicates if audio recording is supported.
 * @param {boolean} options.recordingVideoSupport - Indicates if video recording is supported.
 * @param {Function} options.updateCanRecord - Function to update the recording capability.
 * @param {Function} options.updateClearedToRecord - Function to update the cleared-to-record status.
 * @param {boolean} options.recordStarted - Indicates if the recording has started.
 * @param {boolean} options.recordPaused - Indicates if the recording is paused.
 * @param {boolean} options.localUIMode - Indicates if the local UI mode is active.
 *
 * @returns {void}
 *
 * @throws Will show an alert if:
 * - The recording has already ended or the user is not allowed to record.
 * - The recording initiation is not allowed due to insufficient permissions.
 * - The recording is currently running and cannot be reconfigured unless paused.
 *
 * @example
 * ```typescript
 * const options: LaunchRecordingOptions = {
 *   updateIsRecordingModalVisible: (visible) => { /* update visibility logic *\/ },
 *   isRecordingModalVisible: false,
 *   showAlert: (alert) => { /* show alert logic *\/ },
 *   stopLaunchRecord: false,
 *   canLaunchRecord: true,
 *   recordingAudioSupport: true,
 *   recordingVideoSupport: true,
 *   updateCanRecord: (canRecord) => { /* update record capability *\/ },
 *   updateClearedToRecord: (cleared) => { /* update cleared status *\/ },
 *   recordStarted: false,
 *   recordPaused: false,
 *   localUIMode: false,
 * };
 * launchRecording(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class LaunchRecording {
  /**
   * Launches the recording process based on various conditions and updates the UI accordingly.
   *
   * @param {Object} options - The options for launching the recording.
   * @param {Function} options.updateIsRecordingModalVisible - Function to update the visibility of the recording modal.
   * @param {boolean} options.isRecordingModalVisible - Indicates if the recording modal is currently visible.
   * @param {Function} options.showAlert - Function to show an alert message.
   * @param {boolean} options.stopLaunchRecord - Indicates if the recording launch should be stopped.
   * @param {boolean} options.canLaunchRecord - Indicates if the recording can be launched.
   * @param {boolean} options.recordingAudioSupport - Indicates if audio recording is supported.
   * @param {boolean} options.recordingVideoSupport - Indicates if video recording is supported.
   * @param {Function} options.updateCanRecord - Function to update the recording capability.
   * @param {Function} options.updateClearedToRecord - Function to update the cleared-to-record status.
   * @param {boolean} options.recordStarted - Indicates if the recording has started.
   * @param {boolean} options.recordPaused - Indicates if the recording is paused.
   * @param {boolean} options.localUIMode - Indicates if the local UI mode is active.
   *
   * @returns {void}
   */

  launchRecording({
    updateIsRecordingModalVisible,
    isRecordingModalVisible,
    showAlert,
    stopLaunchRecord,
    canLaunchRecord,
    recordingAudioSupport,
    recordingVideoSupport,
    updateCanRecord,
    updateClearedToRecord,
    recordStarted,
    recordPaused,
    localUIMode,
  }: LaunchRecordingOptions): void {
    // Check if recording is already launched
    if (!isRecordingModalVisible && stopLaunchRecord && !localUIMode) {
      showAlert?.({
        message: 'Recording has already ended or you are not allowed to record',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    // Check if recording initiation is allowed
    if (!isRecordingModalVisible && canLaunchRecord && !localUIMode) {
      // Check if both audio and video recording are not allowed
      if (!recordingAudioSupport && !recordingVideoSupport) {
        showAlert?.({
          message: 'You are not allowed to record',
          type: 'danger',
          duration: 3000,
        });

        return;
      }

      // update clearedToRecord to false
      updateClearedToRecord(false);
      // update canRecord to false
      updateCanRecord(false);
    }

    if (!isRecordingModalVisible && recordStarted) {
      if (!recordPaused) {
        showAlert?.({
          message: 'You can only re-configure recording after pausing it',
          type: 'danger',
          duration: 3000,
        });

        return;
      }
    }

    if (
      !isRecordingModalVisible &&
      !recordingAudioSupport &&
      !recordingVideoSupport &&
      !localUIMode
    ) {
      showAlert?.({
        message: 'You are not allowed to record',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    // Update the visibility of the recording modal
    updateIsRecordingModalVisible(!isRecordingModalVisible);
  }
}
