import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./check-pause-state.service";
import * as i2 from "./check-resume-state.service";
import * as i3 from "./record-pause-timer.service";
import * as i4 from "./record-resume-timer.service";
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
export class UpdateRecording {
    CheckPauseStateService;
    CheckResumeStateService;
    RecordPauseTimerService;
    RecordResumeTimerService;
    constructor(CheckPauseStateService, CheckResumeStateService, RecordPauseTimerService, RecordResumeTimerService) {
        this.CheckPauseStateService = CheckPauseStateService;
        this.CheckResumeStateService = CheckResumeStateService;
        this.RecordPauseTimerService = RecordPauseTimerService;
        this.RecordResumeTimerService = RecordResumeTimerService;
    }
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
    updateRecording = async ({ parameters }) => {
        parameters = parameters.getUpdatedAllParams();
        let { roomName, userRecordingParams, socket, updateIsRecordingModalVisible, confirmedToRecord, showAlert, recordingMediaOptions, videoAlreadyOn, audioAlreadyOn, recordStarted, recordPaused, recordResumed, recordStopped, recordChangeSeconds, pauseRecordCount, startReport, endReport, canRecord, updateCanPauseResume, updatePauseRecordCount, updateClearedToRecord, updateRecordPaused, updateRecordResumed, updateStartReport, updateEndReport, updateCanRecord, 
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
                await new Promise((resolve) => {
                    socket.emit(action, { roomName }, async ({ success, reason, recordState, pauseCount, }) => {
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
                        }
                        else {
                            let reasonMessage = `Recording Pause Failed: ${reason}; the current state is: ${recordState}`;
                            showAlert?.({
                                message: reasonMessage,
                                type: 'danger',
                                duration: 3000,
                            });
                        }
                        resolve();
                    });
                });
            }
        }
        else if (recordStarted && recordPaused && !recordStopped) {
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
                }
                else {
                    action = 'startRecord';
                }
                action = 'resumeRecord';
                await new Promise((resolve) => {
                    socket.emit(action, { roomName, userRecordingParams }, async ({ success, reason, }) => {
                        if (success) {
                            recordPaused = false;
                            recordResumed = true;
                            updateRecordPaused(recordPaused);
                            updateRecordResumed(recordResumed);
                            if (action === 'startRecord') {
                                await rePort({ parameters });
                            }
                            else {
                                recordResumed = true;
                                await rePort({ restart: true, parameters });
                            }
                        }
                        else {
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
                    });
                });
                // Set isRecordingModalVisible to false
                updateIsRecordingModalVisible(false);
                setTimeout(() => {
                    updateCanPauseResume(true);
                }, recordChangeSeconds);
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateRecording, deps: [{ token: i1.CheckPauseState }, { token: i2.CheckResumeState }, { token: i3.RecordPauseTimer }, { token: i4.RecordResumeTimer }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.CheckPauseState }, { type: i2.CheckResumeState }, { type: i3.RecordPauseTimer }, { type: i4.RecordResumeTimer }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJlY29yZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvdXBkYXRlLXJlY29yZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQW1EM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0NHO0FBS0gsTUFBTSxPQUFPLGVBQWU7SUFFaEI7SUFDQTtJQUNBO0lBQ0E7SUFKVixZQUNVLHNCQUF1QyxFQUN2Qyx1QkFBeUMsRUFDekMsdUJBQXlDLEVBQ3pDLHdCQUEyQztRQUgzQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQWlCO1FBQ3ZDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBa0I7UUFDekMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFrQjtRQUN6Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO0lBQ2xELENBQUM7SUFFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtDRztJQUVILGVBQWUsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQTBCLEVBQWlCLEVBQUU7UUFDaEYsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTlDLElBQUksRUFDRixRQUFRLEVBQ1IsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTiw2QkFBNkIsRUFDN0IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxxQkFBcUIsRUFDckIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFF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QUFDOzZCQUFNLENBQUM7NEJBQ04sU0FBUyxFQUFFLENBQUM7Z0NBQ1YsT0FBTyxFQUFFLCtCQUErQixNQUFNLEVBQUU7Z0NBQ2hELElBQUksRUFBRSxRQUFRO2dDQUNkLFFBQVEsRUFBRSxJQUFJOzZCQUNmLENBQUMsQ0FBQzs0QkFFSCxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUNqQixXQUFXLEdBQUcsS0FBSyxDQUFDOzRCQUNwQixTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUVqQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzNCLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUMvQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzdCLENBQUM7d0JBRUQsT0FBTyxFQUFFLENBQUM7b0JBQ1osQ0FBQyxDQUNGLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBRUgsdUNBQXVDO2dCQUN2Qyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFckMsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7dUdBM1JTLGVBQWU7MkdBQWYsZUFBZSxjQUZkLE1BQU07OzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hlY2tQYXVzZVN0YXRlIH0gZnJvbSAnLi9jaGVjay1wYXVzZS1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrUmVzdW1lU3RhdGUgfSBmcm9tICcuL2NoZWNrLXJlc3VtZS1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY29yZFBhdXNlVGltZXIgfSBmcm9tICcuL3JlY29yZC1wYXVzZS10aW1lci5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY29yZFJlc3VtZVRpbWVyLCBSZWNvcmRSZXN1bWVUaW1lclBhcmFtZXRlcnMgfSBmcm9tICcuL3JlY29yZC1yZXN1bWUtdGltZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSZVBvcnRQYXJhbWV0ZXJzLCBSZVBvcnRUeXBlLCBTaG93QWxlcnQsIFVzZXJSZWNvcmRpbmdQYXJhbXMgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUmVjb3JkaW5nUGFyYW1ldGVycyBleHRlbmRzIFJlY29yZFJlc3VtZVRpbWVyUGFyYW1ldGVycywgUmVQb3J0UGFyYW1ldGVycyB7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVzZXJSZWNvcmRpbmdQYXJhbXM6IFVzZXJSZWNvcmRpbmdQYXJhbXM7XG4gIHNvY2tldDogU29ja2V0O1xuICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGNvbmZpcm1lZFRvUmVjb3JkOiBib29sZWFuO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nO1xuICB2aWRlb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgYXVkaW9BbHJlYWR5T246IGJvb2xlYW47XG4gIHJlY29yZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkUmVzdW1lZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcmVjb3JkQ2hhbmdlU2Vjb25kczogbnVtYmVyO1xuICBwYXVzZVJlY29yZENvdW50OiBudW1iZXI7XG4gIHN0YXJ0UmVwb3J0OiBib29sZWFuO1xuICBlbmRSZXBvcnQ6IGJvb2xlYW47XG4gIGNhblJlY29yZDogYm9vbGVhbjtcbiAgY2FuUGF1c2VSZXN1bWU6IGJvb2xlYW47XG4gIHVwZGF0ZUNhblBhdXNlUmVzdW1lOiAoY2FuUGF1c2VSZXN1bWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQ6IChjb3VudDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IChjbGVhcmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRQYXVzZWQ6IChwYXVzZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZFJlc3VtZWQ6IChyZXN1bWVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTdGFydFJlcG9ydDogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVFbmRSZXBvcnQ6IChlbmQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUNhblJlY29yZDogKGNhblJlY29yZDogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBNZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVQb3J0OiBSZVBvcnRUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFVwZGF0ZVJlY29yZGluZ1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVSZWNvcmRpbmdPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogVXBkYXRlUmVjb3JkaW5nUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgVXBkYXRlUmVjb3JkaW5nVHlwZSA9IChvcHRpb25zOiBVcGRhdGVSZWNvcmRpbmdPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHJlY29yZGluZyBzdGF0ZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1VwZGF0ZVJlY29yZGluZ09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdXBkYXRpbmcgdGhlIHJlY29yZGluZyBzdGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgdXBkYXRpbmcgdGhlIHJlY29yZGluZyBzdGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB3aGVyZSB0aGUgcmVjb3JkaW5nIGlzIHRha2luZyBwbGFjZS5cbiAqIEBwYXJhbSB7VXNlclJlY29yZGluZ1BhcmFtc30gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJSZWNvcmRpbmdQYXJhbXMgLSBVc2VyLXNwZWNpZmljIHJlY29yZGluZyBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMucGFyYW1ldGVycy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSByZWNvcmRpbmcgbW9kYWwuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5jb25maXJtZWRUb1JlY29yZCAtIEluZGljYXRlcyBpZiB0aGUgdXNlciBoYXMgY29uZmlybWVkIHRvIHN0YXJ0IHJlY29yZGluZy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nTWVkaWFPcHRpb25zIC0gVGhlIG1lZGlhIG9wdGlvbnMgZm9yIHJlY29yZGluZyAoZS5nLiwgXCJ2aWRlb1wiLCBcImF1ZGlvXCIpLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgdHVybmVkIG9uLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIGF1ZGlvIGlzIGFscmVhZHkgdHVybmVkIG9uLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGhhcyBzdGFydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUGF1c2VkIC0gSW5kaWNhdGVzIGlmIHRoZSByZWNvcmRpbmcgaXMgcGF1c2VkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGhhcyByZXN1bWVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RvcHBlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGhhcyBzdG9wcGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRDaGFuZ2VTZWNvbmRzIC0gVGhlIGludGVydmFsIGluIHNlY29uZHMgZm9yIGNoYW5naW5nIHRoZSByZWNvcmRpbmcgc3RhdGUuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhdXNlUmVjb3JkQ291bnQgLSBUaGUgY291bnQgb2YgcGF1c2VzIGR1cmluZyB0aGUgcmVjb3JkaW5nLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc3RhcnRSZXBvcnQgLSBJbmRpY2F0ZXMgaWYgdGhlIHN0YXJ0IHJlcG9ydCBpcyBhY3RpdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5lbmRSZXBvcnQgLSBJbmRpY2F0ZXMgaWYgdGhlIGVuZCByZXBvcnQgaXMgYWN0aXZlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FuUmVjb3JkIC0gSW5kaWNhdGVzIGlmIHJlY29yZGluZyBpcyBhbGxvd2VkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FuUGF1c2VSZXN1bWUgLSBJbmRpY2F0ZXMgaWYgcGF1c2luZyBhbmQgcmVzdW1pbmcgdGhlIHJlY29yZGluZyBpcyBhbGxvd2VkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUNhblBhdXNlUmVzdW1lIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwYXVzZS9yZXN1bWUgc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUGF1c2VSZWNvcmRDb3VudCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcGF1c2UgcmVjb3JkIGNvdW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUNsZWFyZWRUb1JlY29yZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY2xlYXJlZC10by1yZWNvcmQgc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkUGF1c2VkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmQgcGF1c2VkIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFJlc3VtZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZCByZXN1bWVkIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVN0YXJ0UmVwb3J0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzdGFydCByZXBvcnQgc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRW5kUmVwb3J0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBlbmQgcmVwb3J0IHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUNhblJlY29yZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY2FuIHJlY29yZCBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byBoYW5kbGUgcmVwb3J0aW5nLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZWNvcmRpbmcgc3RhdGUgaGFzIGJlZW4gdXBkYXRlZC5cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBtZXRob2QgaGFuZGxlcyB0aGUgcmVjb3JkaW5nIHN0YXRlIHVwZGF0ZXMsIGluY2x1ZGluZyBzdGFydGluZywgcGF1c2luZywgcmVzdW1pbmcsIGFuZCBzdG9wcGluZyB0aGUgcmVjb3JkaW5nLlxuICogSXQgYWxzbyBwZXJmb3JtcyBuZWNlc3NhcnkgY2hlY2tzIHRvIGVuc3VyZSB0aGF0IHRoZSB1c2VyIGNhbiBwZXJmb3JtIHRoZSByZXF1ZXN0ZWQgYWN0aW9ucyBiYXNlZCBvbiB0aGVpciBjdXJyZW50IHN0YXRlLlxuICogQWxlcnRzIGFyZSBkaXNwbGF5ZWQgZm9yIGFueSBpc3N1ZXMgZW5jb3VudGVyZWQgZHVyaW5nIHRoZSBwcm9jZXNzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBVcGRhdGVSZWNvcmRpbmdPcHRpb25zID0geyBwYXJhbWV0ZXJzOiBzb21lUGFyYW1ldGVycyB9O1xuICogYXdhaXQgdXBkYXRlUmVjb3JkaW5nKG9wdGlvbnMpO1xuICogY29uc29sZS5sb2coJ1JlY29yZGluZyBzdGF0ZSB1cGRhdGVkIHN1Y2Nlc3NmdWxseS4nKTtcbiAqIGBgYFxuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVcGRhdGVSZWNvcmRpbmcge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIENoZWNrUGF1c2VTdGF0ZVNlcnZpY2U6IENoZWNrUGF1c2VTdGF0ZSxcbiAgICBwcml2YXRlIENoZWNrUmVzdW1lU3RhdGVTZXJ2aWNlOiBDaGVja1Jlc3VtZVN0YXRlLFxuICAgIHByaXZhdGUgUmVjb3JkUGF1c2VUaW1lclNlcnZpY2U6IFJlY29yZFBhdXNlVGltZXIsXG4gICAgcHJpdmF0ZSBSZWNvcmRSZXN1bWVUaW1lclNlcnZpY2U6IFJlY29yZFJlc3VtZVRpbWVyLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHJlY29yZGluZyBzdGF0ZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtVcGRhdGVSZWNvcmRpbmdPcHRpb25zfSBwYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHVwZGF0aW5nIHRoZSByZWNvcmRpbmcgc3RhdGUuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZWNvcmRpbmcgc3RhdGUgaGFzIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IHJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gd2hlcmUgdGhlIHJlY29yZGluZyBpcyB0YWtpbmcgcGxhY2UuXG4gICAqIEBwcm9wZXJ0eSB7YW55fSB1c2VyUmVjb3JkaW5nUGFyYW1zIC0gUGFyYW1ldGVycyByZWxhdGVkIHRvIHRoZSB1c2VyJ3MgcmVjb3JkaW5nIHNldHRpbmdzLlxuICAgKiBAcHJvcGVydHkge2FueX0gc29ja2V0IC0gVGhlIHNvY2tldCBjb25uZWN0aW9uIHVzZWQgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSByZWNvcmRpbmcgbW9kYWwuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gY29uZmlybWVkVG9SZWNvcmQgLSBJbmRpY2F0ZXMgaWYgdGhlIHVzZXIgaGFzIGNvbmZpcm1lZCB0byBzdGFydCByZWNvcmRpbmcuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYWxlcnQgbWVzc2FnZXMuXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUaGUgbWVkaWEgb3B0aW9ucyBmb3IgcmVjb3JkaW5nIChlLmcuLCBcInZpZGVvXCIsIFwiYXVkaW9cIikuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgdHVybmVkIG9uLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGF1ZGlvQWxyZWFkeU9uIC0gSW5kaWNhdGVzIGlmIHRoZSBhdWRpbyBpcyBhbHJlYWR5IHR1cm5lZCBvbi5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSByZWNvcmRTdGFydGVkIC0gSW5kaWNhdGVzIGlmIHRoZSByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVjb3JkUGF1c2VkIC0gSW5kaWNhdGVzIGlmIHRoZSByZWNvcmRpbmcgaXMgcGF1c2VkLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlY29yZFJlc3VtZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHJlY29yZGluZyBoYXMgcmVzdW1lZC5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSByZWNvcmRTdG9wcGVkIC0gSW5kaWNhdGVzIGlmIHRoZSByZWNvcmRpbmcgaGFzIHN0b3BwZWQuXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByZWNvcmRDaGFuZ2VTZWNvbmRzIC0gVGhlIGludGVydmFsIGluIHNlY29uZHMgZm9yIGNoYW5naW5nIHRoZSByZWNvcmRpbmcgc3RhdGUuXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwYXVzZVJlY29yZENvdW50IC0gVGhlIGNvdW50IG9mIHBhdXNlcyBkdXJpbmcgdGhlIHJlY29yZGluZy5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBzdGFydFJlcG9ydCAtIEluZGljYXRlcyBpZiB0aGUgc3RhcnQgcmVwb3J0IGlzIGFjdGl2ZS5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBlbmRSZXBvcnQgLSBJbmRpY2F0ZXMgaWYgdGhlIGVuZCByZXBvcnQgaXMgYWN0aXZlLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGNhblJlY29yZCAtIEluZGljYXRlcyBpZiByZWNvcmRpbmcgaXMgYWxsb3dlZC5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBjYW5QYXVzZVJlc3VtZSAtIEluZGljYXRlcyBpZiBwYXVzaW5nIGFuZCByZXN1bWluZyB0aGUgcmVjb3JkaW5nIGlzIGFsbG93ZWQuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUNhblBhdXNlUmVzdW1lIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwYXVzZS9yZXN1bWUgc3RhdGUuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHBhdXNlIHJlY29yZCBjb3VudC5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlQ2xlYXJlZFRvUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjbGVhcmVkLXRvLXJlY29yZCBzdGF0ZS5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlUmVjb3JkUGF1c2VkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmQgcGF1c2VkIHN0YXRlLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVSZWNvcmRSZXN1bWVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmQgcmVzdW1lZCBzdGF0ZS5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlU3RhcnRSZXBvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHN0YXJ0IHJlcG9ydCBzdGF0ZS5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlRW5kUmVwb3J0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBlbmQgcmVwb3J0IHN0YXRlLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVDYW5SZWNvcmQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNhbiByZWNvcmQgc3RhdGUuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHJlUG9ydCAtIEZ1bmN0aW9uIHRvIGhhbmRsZSByZXBvcnRpbmcuXG4gICAqL1xuXG4gIHVwZGF0ZVJlY29yZGluZyA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogVXBkYXRlUmVjb3JkaW5nT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICByb29tTmFtZSxcbiAgICAgIHVzZXJSZWNvcmRpbmdQYXJhbXMsXG4gICAgICBzb2NrZXQsXG4gICAgICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZSxcbiAgICAgIGNvbmZpcm1lZFRvUmVjb3JkLFxuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICBhdWRpb0FscmVhZHlPbixcbiAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRSZXN1bWVkLFxuICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgIHJlY29yZENoYW5nZVNlY29uZHMsXG4gICAgICBwYXVzZVJlY29yZENvdW50LFxuICAgICAgc3RhcnRSZXBvcnQsXG4gICAgICBlbmRSZXBvcnQsXG4gICAgICBjYW5SZWNvcmQsXG5cbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lLFxuICAgICAgdXBkYXRlUGF1c2VSZWNvcmRDb3VudCxcbiAgICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZCxcbiAgICAgIHVwZGF0ZVJlY29yZFBhdXNlZCxcbiAgICAgIHVwZGF0ZVJlY29yZFJlc3VtZWQsXG4gICAgICB1cGRhdGVTdGFydFJlcG9ydCxcbiAgICAgIHVwZGF0ZUVuZFJlcG9ydCxcbiAgICAgIHVwZGF0ZUNhblJlY29yZCxcblxuICAgICAgLy9tZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIC8vIGNoZWNrUGF1c2VTdGF0ZSxcbiAgICAgIC8vIGNoZWNrUmVzdW1lU3RhdGUsXG4gICAgICByZVBvcnQsXG4gICAgICAvLyByZWNvcmRQYXVzZVRpbWVyLFxuICAgICAgLy8gcmVjb3JkUmVzdW1lVGltZXIsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBDaGVjayBpZiByZWNvcmRpbmcgaXMgY29uZmlybWVkIGJlZm9yZSBzdGFydGluZ1xuICAgIGlmIChyZWNvcmRTdG9wcGVkKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdSZWNvcmRpbmcgaGFzIGFscmVhZHkgc3RvcHBlZCcsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciByZWNvcmRpbmdNZWRpYU9wdGlvbnMgZm9yIHZpZGVvXG4gICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PT0gJ3ZpZGVvJyAmJiAhdmlkZW9BbHJlYWR5T24pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBtdXN0IHR1cm4gb24geW91ciB2aWRlbyBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciByZWNvcmRpbmdNZWRpYU9wdGlvbnMgZm9yIGF1ZGlvXG4gICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PT0gJ2F1ZGlvJyAmJiAhYXVkaW9BbHJlYWR5T24pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBtdXN0IHR1cm4gb24geW91ciBhdWRpbyBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZWNvcmRTdGFydGVkICYmICFyZWNvcmRQYXVzZWQgJiYgIXJlY29yZFN0b3BwZWQpIHtcbiAgICAgIGxldCBwcm9jZWVkID0gZmFsc2U7XG5cbiAgICAgIHByb2NlZWQgPSBhd2FpdCB0aGlzLkNoZWNrUGF1c2VTdGF0ZVNlcnZpY2UuY2hlY2tQYXVzZVN0YXRlKHtcbiAgICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgICAgICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0OiBwYXJhbWV0ZXJzWydyZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0J10sXG4gICAgICAgIHJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ6IHBhcmFtZXRlcnNbJ3JlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQnXSxcbiAgICAgICAgcGF1c2VSZWNvcmRDb3VudCxcbiAgICAgICAgc2hvd0FsZXJ0LFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcHJvY2VlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCByZWNvcmQgPSB0aGlzLlJlY29yZFBhdXNlVGltZXJTZXJ2aWNlLnJlY29yZFBhdXNlVGltZXIoe1xuICAgICAgICBzdG9wOiBmYWxzZSxcbiAgICAgICAgaXNUaW1lclJ1bm5pbmc6IHBhcmFtZXRlcnMuaXNUaW1lclJ1bm5pbmcsXG4gICAgICAgIGNhblBhdXNlUmVzdW1lOiBwYXJhbWV0ZXJzLmNhblBhdXNlUmVzdW1lLFxuICAgICAgICBzaG93QWxlcnQsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlY29yZCkge1xuICAgICAgICBsZXQgYWN0aW9uID0gJ3BhdXNlUmVjb3JkJztcblxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgIHNvY2tldC5lbWl0KFxuICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgeyByb29tTmFtZSB9LFxuICAgICAgICAgICAgYXN5bmMgKHtcbiAgICAgICAgICAgICAgc3VjY2VzcyxcbiAgICAgICAgICAgICAgcmVhc29uLFxuICAgICAgICAgICAgICByZWNvcmRTdGF0ZSxcbiAgICAgICAgICAgICAgcGF1c2VDb3VudCxcbiAgICAgICAgICAgIH06IHtcbiAgICAgICAgICAgICAgc3VjY2VzczogYm9vbGVhbjtcbiAgICAgICAgICAgICAgcmVhc29uOiBzdHJpbmc7XG4gICAgICAgICAgICAgIHJlY29yZFN0YXRlOiBzdHJpbmc7XG4gICAgICAgICAgICAgIHBhdXNlQ291bnQ6IG51bWJlcjtcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgcGF1c2VSZWNvcmRDb3VudCA9IHBhdXNlQ291bnQ7XG4gICAgICAgICAgICAgIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQocGF1c2VSZWNvcmRDb3VudCk7XG5cbiAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBzdGFydFJlcG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVuZFJlcG9ydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVjb3JkUGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGFydFJlcG9ydChzdGFydFJlcG9ydCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlRW5kUmVwb3J0KGVuZFJlcG9ydCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkKHJlY29yZFBhdXNlZCk7XG5cbiAgICAgICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnUmVjb3JkaW5nIHBhdXNlZCcsXG4gICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFNldCBpc1JlY29yZGluZ01vZGFsVmlzaWJsZSB0byBmYWxzZVxuICAgICAgICAgICAgICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lKHRydWUpO1xuICAgICAgICAgICAgICAgIH0sIHJlY29yZENoYW5nZVNlY29uZHMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCByZWFzb25NZXNzYWdlID0gYFJlY29yZGluZyBQYXVzZSBGYWlsZWQ6ICR7cmVhc29ufTsgdGhlIGN1cnJlbnQgc3RhdGUgaXM6ICR7cmVjb3JkU3RhdGV9YDtcblxuICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlYXNvbk1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlY29yZFN0YXJ0ZWQgJiYgcmVjb3JkUGF1c2VkICYmICFyZWNvcmRTdG9wcGVkKSB7XG4gICAgICBpZiAoIWNvbmZpcm1lZFRvUmVjb3JkKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnWW91IG11c3QgY2xpY2sgY29uZmlybSBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBwcm9jZWVkID0gZmFsc2U7XG5cbiAgICAgIHByb2NlZWQgPSBhd2FpdCB0aGlzLkNoZWNrUmVzdW1lU3RhdGVTZXJ2aWNlLmNoZWNrUmVzdW1lU3RhdGUoe1xuICAgICAgICByZWNvcmRpbmdNZWRpYU9wdGlvbnMsXG4gICAgICAgIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IHBhcmFtZXRlcnNbJ3JlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQnXSxcbiAgICAgICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogcGFyYW1ldGVyc1sncmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCddLFxuICAgICAgICBwYXVzZVJlY29yZENvdW50LFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcHJvY2VlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCByZXN1bWUgPSBhd2FpdCB0aGlzLlJlY29yZFJlc3VtZVRpbWVyU2VydmljZS5yZWNvcmRSZXN1bWVUaW1lcih7IHBhcmFtZXRlcnMgfSk7XG4gICAgICBpZiAocmVzdW1lKSB7XG4gICAgICAgIC8vIFNldCBjbGVhcmVkVG9SZWNvcmQgdG8gdHJ1ZVxuICAgICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQodHJ1ZSk7XG5cbiAgICAgICAgbGV0IGFjdGlvbiA9ICdzdGFydFJlY29yZCc7XG4gICAgICAgIGlmIChyZWNvcmRTdGFydGVkICYmIHJlY29yZFBhdXNlZCAmJiAhcmVjb3JkUmVzdW1lZCAmJiAhcmVjb3JkU3RvcHBlZCkge1xuICAgICAgICAgIGFjdGlvbiA9ICdyZXN1bWVSZWNvcmQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGlvbiA9ICdzdGFydFJlY29yZCc7XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9uID0gJ3Jlc3VtZVJlY29yZCc7XG5cbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIHsgcm9vbU5hbWUsIHVzZXJSZWNvcmRpbmdQYXJhbXMgfSxcbiAgICAgICAgICAgIGFzeW5jICh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MsXG4gICAgICAgICAgICAgIHJlYXNvbixcbiAgICAgICAgICAgIH06IHtcbiAgICAgICAgICAgICAgc3VjY2VzczogYm9vbGVhbjtcbiAgICAgICAgICAgICAgcmVhc29uOiBzdHJpbmc7XG4gICAgICAgICAgICAgIHJlY29yZFN0YXRlOiBzdHJpbmc7XG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkUGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmVjb3JkUmVzdW1lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkKHJlY29yZFBhdXNlZCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlUmVjb3JkUmVzdW1lZChyZWNvcmRSZXN1bWVkKTtcblxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdzdGFydFJlY29yZCcpIHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHJlUG9ydCh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJlY29yZFJlc3VtZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgYXdhaXQgcmVQb3J0KHsgcmVzdGFydDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYFJlY29yZGluZyBjb3VsZCBub3Qgc3RhcnQgLSAke3JlYXNvbn1gLFxuICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNhblJlY29yZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3RhcnRSZXBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbmRSZXBvcnQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlQ2FuUmVjb3JkKGNhblJlY29yZCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhcnRSZXBvcnQoc3RhcnRSZXBvcnQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUVuZFJlcG9ydChlbmRSZXBvcnQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTZXQgaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgdG8gZmFsc2VcbiAgICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lKHRydWUpO1xuICAgICAgICB9LCByZWNvcmRDaGFuZ2VTZWNvbmRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=