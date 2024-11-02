import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
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
export declare class LaunchRecording {
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
    launchRecording({ updateIsRecordingModalVisible, isRecordingModalVisible, showAlert, stopLaunchRecord, canLaunchRecord, recordingAudioSupport, recordingVideoSupport, updateCanRecord, updateClearedToRecord, recordStarted, recordPaused, localUIMode, }: LaunchRecordingOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchRecording>;
}
