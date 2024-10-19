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
