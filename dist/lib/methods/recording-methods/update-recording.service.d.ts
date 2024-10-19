import { CheckPauseState } from './check-pause-state.service';
import { CheckResumeState } from './check-resume-state.service';
import { RecordPauseTimer } from './record-pause-timer.service';
import { RecordResumeTimer, RecordResumeTimerParameters } from './record-resume-timer.service';
import { RePortParameters, RePortType, ShowAlert, UserRecordingParams } from '../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
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
    rePort: RePortType;
    getUpdatedAllParams: () => UpdateRecordingParameters;
    [key: string]: any;
}
export interface UpdateRecordingOptions {
    parameters: UpdateRecordingParameters;
}
export type UpdateRecordingType = (options: UpdateRecordingOptions) => Promise<void>;
export declare class UpdateRecording {
    private CheckPauseStateService;
    private CheckResumeStateService;
    private RecordPauseTimerService;
    private RecordResumeTimerService;
    constructor(CheckPauseStateService: CheckPauseState, CheckResumeStateService: CheckResumeState, RecordPauseTimerService: RecordPauseTimer, RecordResumeTimerService: RecordResumeTimer);
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
    updateRecording: ({ parameters }: UpdateRecordingOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateRecording>;
}
