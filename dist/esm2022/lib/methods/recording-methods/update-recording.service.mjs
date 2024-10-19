import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./check-pause-state.service";
import * as i2 from "./check-resume-state.service";
import * as i3 from "./record-pause-timer.service";
import * as i4 from "./record-resume-timer.service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJlY29yZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvdXBkYXRlLXJlY29yZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQXNEM0MsTUFBTSxPQUFPLGVBQWU7SUFFaEI7SUFDQTtJQUNBO0lBQ0E7SUFKVixZQUNVLHNCQUF1QyxFQUN2Qyx1QkFBeUMsRUFDekMsdUJBQXlDLEVBQ3pDLHdCQUEyQztRQUgzQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQWlCO1FBQ3ZDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBa0I7UUFDekMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFrQjtRQUN6Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO0lBQ2xELENBQUM7SUFFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtDRztJQUVILGVBQWUsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQTBCLEVBQWlCLEVBQUU7UUFDaEYsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTlDLElBQUksRUFDRixRQUFRLEVBQ1IsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTiw2QkFBNkIsRUFDN0IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxxQkFBcUIsRUFDckIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFFVCxvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsbUJB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QixNQUFNLEVBQUU7Z0NBQ2hELElBQUksRUFBRSxRQUFRO2dDQUNkLFFBQVEsRUFBRSxJQUFJOzZCQUNmLENBQUMsQ0FBQzs0QkFFSCxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUNqQixXQUFXLEdBQUcsS0FBSyxDQUFDOzRCQUNwQixTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUVqQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzNCLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUMvQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzdCLENBQUM7d0JBRUQsT0FBTyxFQUFFLENBQUM7b0JBQ1osQ0FBQyxDQUNGLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBRUgsdUNBQXVDO2dCQUN2Qyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFckMsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7dUdBM1JTLGVBQWU7MkdBQWYsZUFBZSxjQUZkLE1BQU07OzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hlY2tQYXVzZVN0YXRlIH0gZnJvbSAnLi9jaGVjay1wYXVzZS1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrUmVzdW1lU3RhdGUgfSBmcm9tICcuL2NoZWNrLXJlc3VtZS1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY29yZFBhdXNlVGltZXIgfSBmcm9tICcuL3JlY29yZC1wYXVzZS10aW1lci5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY29yZFJlc3VtZVRpbWVyLCBSZWNvcmRSZXN1bWVUaW1lclBhcmFtZXRlcnMgfSBmcm9tICcuL3JlY29yZC1yZXN1bWUtdGltZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSZVBvcnRQYXJhbWV0ZXJzLCBSZVBvcnRUeXBlLCBTaG93QWxlcnQsIFVzZXJSZWNvcmRpbmdQYXJhbXMgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUmVjb3JkaW5nUGFyYW1ldGVycyBleHRlbmRzIFJlY29yZFJlc3VtZVRpbWVyUGFyYW1ldGVycywgUmVQb3J0UGFyYW1ldGVycyB7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVzZXJSZWNvcmRpbmdQYXJhbXM6IFVzZXJSZWNvcmRpbmdQYXJhbXM7XG4gIHNvY2tldDogU29ja2V0O1xuICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGNvbmZpcm1lZFRvUmVjb3JkOiBib29sZWFuO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nO1xuICB2aWRlb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgYXVkaW9BbHJlYWR5T246IGJvb2xlYW47XG4gIHJlY29yZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkUmVzdW1lZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcmVjb3JkQ2hhbmdlU2Vjb25kczogbnVtYmVyO1xuICBwYXVzZVJlY29yZENvdW50OiBudW1iZXI7XG4gIHN0YXJ0UmVwb3J0OiBib29sZWFuO1xuICBlbmRSZXBvcnQ6IGJvb2xlYW47XG4gIGNhblJlY29yZDogYm9vbGVhbjtcbiAgY2FuUGF1c2VSZXN1bWU6IGJvb2xlYW47XG4gIHVwZGF0ZUNhblBhdXNlUmVzdW1lOiAoY2FuUGF1c2VSZXN1bWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQ6IChjb3VudDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IChjbGVhcmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRQYXVzZWQ6IChwYXVzZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZFJlc3VtZWQ6IChyZXN1bWVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTdGFydFJlcG9ydDogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVFbmRSZXBvcnQ6IChlbmQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUNhblJlY29yZDogKGNhblJlY29yZDogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBNZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVQb3J0OiBSZVBvcnRUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFVwZGF0ZVJlY29yZGluZ1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVSZWNvcmRpbmdPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogVXBkYXRlUmVjb3JkaW5nUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgVXBkYXRlUmVjb3JkaW5nVHlwZSA9IChvcHRpb25zOiBVcGRhdGVSZWNvcmRpbmdPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXBkYXRlUmVjb3JkaW5nIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBDaGVja1BhdXNlU3RhdGVTZXJ2aWNlOiBDaGVja1BhdXNlU3RhdGUsXG4gICAgcHJpdmF0ZSBDaGVja1Jlc3VtZVN0YXRlU2VydmljZTogQ2hlY2tSZXN1bWVTdGF0ZSxcbiAgICBwcml2YXRlIFJlY29yZFBhdXNlVGltZXJTZXJ2aWNlOiBSZWNvcmRQYXVzZVRpbWVyLFxuICAgIHByaXZhdGUgUmVjb3JkUmVzdW1lVGltZXJTZXJ2aWNlOiBSZWNvcmRSZXN1bWVUaW1lcixcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSByZWNvcmRpbmcgc3RhdGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7VXBkYXRlUmVjb3JkaW5nT3B0aW9uc30gcGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB1cGRhdGluZyB0aGUgcmVjb3JkaW5nIHN0YXRlLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcmVjb3JkaW5nIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHdoZXJlIHRoZSByZWNvcmRpbmcgaXMgdGFraW5nIHBsYWNlLlxuICAgKiBAcHJvcGVydHkge2FueX0gdXNlclJlY29yZGluZ1BhcmFtcyAtIFBhcmFtZXRlcnMgcmVsYXRlZCB0byB0aGUgdXNlcidzIHJlY29yZGluZyBzZXR0aW5ncy5cbiAgICogQHByb3BlcnR5IHthbnl9IHNvY2tldCAtIFRoZSBzb2NrZXQgY29ubmVjdGlvbiB1c2VkIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcmVjb3JkaW5nIG1vZGFsLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGNvbmZpcm1lZFRvUmVjb3JkIC0gSW5kaWNhdGVzIGlmIHRoZSB1c2VyIGhhcyBjb25maXJtZWQgdG8gc3RhcnQgcmVjb3JkaW5nLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBzaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gcmVjb3JkaW5nTWVkaWFPcHRpb25zIC0gVGhlIG1lZGlhIG9wdGlvbnMgZm9yIHJlY29yZGluZyAoZS5nLiwgXCJ2aWRlb1wiLCBcImF1ZGlvXCIpLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHZpZGVvQWxyZWFkeU9uIC0gSW5kaWNhdGVzIGlmIHRoZSB2aWRlbyBpcyBhbHJlYWR5IHR1cm5lZCBvbi5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBhdWRpb0FscmVhZHlPbiAtIEluZGljYXRlcyBpZiB0aGUgYXVkaW8gaXMgYWxyZWFkeSB0dXJuZWQgb24uXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVjb3JkU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlY29yZFBhdXNlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGlzIHBhdXNlZC5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSByZWNvcmRSZXN1bWVkIC0gSW5kaWNhdGVzIGlmIHRoZSByZWNvcmRpbmcgaGFzIHJlc3VtZWQuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVjb3JkU3RvcHBlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGhhcyBzdG9wcGVkLlxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcmVjb3JkQ2hhbmdlU2Vjb25kcyAtIFRoZSBpbnRlcnZhbCBpbiBzZWNvbmRzIGZvciBjaGFuZ2luZyB0aGUgcmVjb3JkaW5nIHN0YXRlLlxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcGF1c2VSZWNvcmRDb3VudCAtIFRoZSBjb3VudCBvZiBwYXVzZXMgZHVyaW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc3RhcnRSZXBvcnQgLSBJbmRpY2F0ZXMgaWYgdGhlIHN0YXJ0IHJlcG9ydCBpcyBhY3RpdmUuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZW5kUmVwb3J0IC0gSW5kaWNhdGVzIGlmIHRoZSBlbmQgcmVwb3J0IGlzIGFjdGl2ZS5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBjYW5SZWNvcmQgLSBJbmRpY2F0ZXMgaWYgcmVjb3JkaW5nIGlzIGFsbG93ZWQuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gY2FuUGF1c2VSZXN1bWUgLSBJbmRpY2F0ZXMgaWYgcGF1c2luZyBhbmQgcmVzdW1pbmcgdGhlIHJlY29yZGluZyBpcyBhbGxvd2VkLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVDYW5QYXVzZVJlc3VtZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcGF1c2UvcmVzdW1lIHN0YXRlLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVQYXVzZVJlY29yZENvdW50IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwYXVzZSByZWNvcmQgY291bnQuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUNsZWFyZWRUb1JlY29yZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY2xlYXJlZC10by1yZWNvcmQgc3RhdGUuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVJlY29yZFBhdXNlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkIHBhdXNlZCBzdGF0ZS5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlUmVjb3JkUmVzdW1lZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkIHJlc3VtZWQgc3RhdGUuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVN0YXJ0UmVwb3J0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzdGFydCByZXBvcnQgc3RhdGUuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUVuZFJlcG9ydCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZW5kIHJlcG9ydCBzdGF0ZS5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlQ2FuUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjYW4gcmVjb3JkIHN0YXRlLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSByZVBvcnQgLSBGdW5jdGlvbiB0byBoYW5kbGUgcmVwb3J0aW5nLlxuICAgKi9cblxuICB1cGRhdGVSZWNvcmRpbmcgPSBhc3luYyAoeyBwYXJhbWV0ZXJzIH06IFVwZGF0ZVJlY29yZGluZ09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgcm9vbU5hbWUsXG4gICAgICB1c2VyUmVjb3JkaW5nUGFyYW1zLFxuICAgICAgc29ja2V0LFxuICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUsXG4gICAgICBjb25maXJtZWRUb1JlY29yZCxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgYXVkaW9BbHJlYWR5T24sXG4gICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgcmVjb3JkUGF1c2VkLFxuICAgICAgcmVjb3JkUmVzdW1lZCxcbiAgICAgIHJlY29yZFN0b3BwZWQsXG4gICAgICByZWNvcmRDaGFuZ2VTZWNvbmRzLFxuICAgICAgcGF1c2VSZWNvcmRDb3VudCxcbiAgICAgIHN0YXJ0UmVwb3J0LFxuICAgICAgZW5kUmVwb3J0LFxuICAgICAgY2FuUmVjb3JkLFxuXG4gICAgICB1cGRhdGVDYW5QYXVzZVJlc3VtZSxcbiAgICAgIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQsXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQsXG4gICAgICB1cGRhdGVSZWNvcmRQYXVzZWQsXG4gICAgICB1cGRhdGVSZWNvcmRSZXN1bWVkLFxuICAgICAgdXBkYXRlU3RhcnRSZXBvcnQsXG4gICAgICB1cGRhdGVFbmRSZXBvcnQsXG4gICAgICB1cGRhdGVDYW5SZWNvcmQsXG5cbiAgICAgIC8vbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICAvLyBjaGVja1BhdXNlU3RhdGUsXG4gICAgICAvLyBjaGVja1Jlc3VtZVN0YXRlLFxuICAgICAgcmVQb3J0LFxuICAgICAgLy8gcmVjb3JkUGF1c2VUaW1lcixcbiAgICAgIC8vIHJlY29yZFJlc3VtZVRpbWVyLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgLy8gQ2hlY2sgaWYgcmVjb3JkaW5nIGlzIGNvbmZpcm1lZCBiZWZvcmUgc3RhcnRpbmdcbiAgICBpZiAocmVjb3JkU3RvcHBlZCkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnUmVjb3JkaW5nIGhhcyBhbHJlYWR5IHN0b3BwZWQnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgcmVjb3JkaW5nTWVkaWFPcHRpb25zIGZvciB2aWRlb1xuICAgIGlmIChyZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT09ICd2aWRlbycgJiYgIXZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgbXVzdCB0dXJuIG9uIHlvdXIgdmlkZW8gYmVmb3JlIHlvdSBjYW4gc3RhcnQgcmVjb3JkaW5nJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgcmVjb3JkaW5nTWVkaWFPcHRpb25zIGZvciBhdWRpb1xuICAgIGlmIChyZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT09ICdhdWRpbycgJiYgIWF1ZGlvQWxyZWFkeU9uKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgbXVzdCB0dXJuIG9uIHlvdXIgYXVkaW8gYmVmb3JlIHlvdSBjYW4gc3RhcnQgcmVjb3JkaW5nJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVjb3JkU3RhcnRlZCAmJiAhcmVjb3JkUGF1c2VkICYmICFyZWNvcmRTdG9wcGVkKSB7XG4gICAgICBsZXQgcHJvY2VlZCA9IGZhbHNlO1xuXG4gICAgICBwcm9jZWVkID0gYXdhaXQgdGhpcy5DaGVja1BhdXNlU3RhdGVTZXJ2aWNlLmNoZWNrUGF1c2VTdGF0ZSh7XG4gICAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogcGFyYW1ldGVyc1sncmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdCddLFxuICAgICAgICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0OiBwYXJhbWV0ZXJzWydyZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0J10sXG4gICAgICAgIHBhdXNlUmVjb3JkQ291bnQsXG4gICAgICAgIHNob3dBbGVydCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXByb2NlZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmVjb3JkID0gdGhpcy5SZWNvcmRQYXVzZVRpbWVyU2VydmljZS5yZWNvcmRQYXVzZVRpbWVyKHtcbiAgICAgICAgc3RvcDogZmFsc2UsXG4gICAgICAgIGlzVGltZXJSdW5uaW5nOiBwYXJhbWV0ZXJzLmlzVGltZXJSdW5uaW5nLFxuICAgICAgICBjYW5QYXVzZVJlc3VtZTogcGFyYW1ldGVycy5jYW5QYXVzZVJlc3VtZSxcbiAgICAgICAgc2hvd0FsZXJ0LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZWNvcmQpIHtcbiAgICAgICAgbGV0IGFjdGlvbiA9ICdwYXVzZVJlY29yZCc7XG5cbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIHsgcm9vbU5hbWUgfSxcbiAgICAgICAgICAgIGFzeW5jICh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MsXG4gICAgICAgICAgICAgIHJlYXNvbixcbiAgICAgICAgICAgICAgcmVjb3JkU3RhdGUsXG4gICAgICAgICAgICAgIHBhdXNlQ291bnQsXG4gICAgICAgICAgICB9OiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgICAgICAgICAgIHJlYXNvbjogc3RyaW5nO1xuICAgICAgICAgICAgICByZWNvcmRTdGF0ZTogc3RyaW5nO1xuICAgICAgICAgICAgICBwYXVzZUNvdW50OiBudW1iZXI7XG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgIHBhdXNlUmVjb3JkQ291bnQgPSBwYXVzZUNvdW50O1xuICAgICAgICAgICAgICB1cGRhdGVQYXVzZVJlY29yZENvdW50KHBhdXNlUmVjb3JkQ291bnQpO1xuXG4gICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRSZXBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbmRSZXBvcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlY29yZFBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhcnRSZXBvcnQoc3RhcnRSZXBvcnQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUVuZFJlcG9ydChlbmRSZXBvcnQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVJlY29yZFBhdXNlZChyZWNvcmRQYXVzZWQpO1xuXG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1JlY29yZGluZyBwYXVzZWQnLFxuICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgdG8gZmFsc2VcbiAgICAgICAgICAgICAgICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVDYW5QYXVzZVJlc3VtZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9LCByZWNvcmRDaGFuZ2VTZWNvbmRzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVhc29uTWVzc2FnZSA9IGBSZWNvcmRpbmcgUGF1c2UgRmFpbGVkOiAke3JlYXNvbn07IHRoZSBjdXJyZW50IHN0YXRlIGlzOiAke3JlY29yZFN0YXRlfWA7XG5cbiAgICAgICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZWFzb25NZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZWNvcmRTdGFydGVkICYmIHJlY29yZFBhdXNlZCAmJiAhcmVjb3JkU3RvcHBlZCkge1xuICAgICAgaWYgKCFjb25maXJtZWRUb1JlY29yZCkge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBtdXN0IGNsaWNrIGNvbmZpcm0gYmVmb3JlIHlvdSBjYW4gc3RhcnQgcmVjb3JkaW5nJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgcHJvY2VlZCA9IGZhbHNlO1xuXG4gICAgICBwcm9jZWVkID0gYXdhaXQgdGhpcy5DaGVja1Jlc3VtZVN0YXRlU2VydmljZS5jaGVja1Jlc3VtZVN0YXRlKHtcbiAgICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgICAgICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0OiBwYXJhbWV0ZXJzWydyZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0J10sXG4gICAgICAgIHJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ6IHBhcmFtZXRlcnNbJ3JlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQnXSxcbiAgICAgICAgcGF1c2VSZWNvcmRDb3VudCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXByb2NlZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmVzdW1lID0gYXdhaXQgdGhpcy5SZWNvcmRSZXN1bWVUaW1lclNlcnZpY2UucmVjb3JkUmVzdW1lVGltZXIoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgaWYgKHJlc3VtZSkge1xuICAgICAgICAvLyBTZXQgY2xlYXJlZFRvUmVjb3JkIHRvIHRydWVcbiAgICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkKHRydWUpO1xuXG4gICAgICAgIGxldCBhY3Rpb24gPSAnc3RhcnRSZWNvcmQnO1xuICAgICAgICBpZiAocmVjb3JkU3RhcnRlZCAmJiByZWNvcmRQYXVzZWQgJiYgIXJlY29yZFJlc3VtZWQgJiYgIXJlY29yZFN0b3BwZWQpIHtcbiAgICAgICAgICBhY3Rpb24gPSAncmVzdW1lUmVjb3JkJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3Rpb24gPSAnc3RhcnRSZWNvcmQnO1xuICAgICAgICB9XG4gICAgICAgIGFjdGlvbiA9ICdyZXN1bWVSZWNvcmQnO1xuXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgc29ja2V0LmVtaXQoXG4gICAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgICB7IHJvb21OYW1lLCB1c2VyUmVjb3JkaW5nUGFyYW1zIH0sXG4gICAgICAgICAgICBhc3luYyAoe1xuICAgICAgICAgICAgICBzdWNjZXNzLFxuICAgICAgICAgICAgICByZWFzb24sXG4gICAgICAgICAgICB9OiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgICAgICAgICAgIHJlYXNvbjogc3RyaW5nO1xuICAgICAgICAgICAgICByZWNvcmRTdGF0ZTogc3RyaW5nO1xuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJlY29yZFBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJlY29yZFJlc3VtZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVJlY29yZFBhdXNlZChyZWNvcmRQYXVzZWQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVJlY29yZFJlc3VtZWQocmVjb3JkUmVzdW1lZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnc3RhcnRSZWNvcmQnKSB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCByZVBvcnQoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZWNvcmRSZXN1bWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHJlUG9ydCh7IHJlc3RhcnQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBSZWNvcmRpbmcgY291bGQgbm90IHN0YXJ0IC0gJHtyZWFzb259YCxcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjYW5SZWNvcmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0YXJ0UmVwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZW5kUmVwb3J0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZUNhblJlY29yZChjYW5SZWNvcmQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXJ0UmVwb3J0KHN0YXJ0UmVwb3J0KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVFbmRSZXBvcnQoZW5kUmVwb3J0KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2V0IGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlIHRvIGZhbHNlXG4gICAgICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB1cGRhdGVDYW5QYXVzZVJlc3VtZSh0cnVlKTtcbiAgICAgICAgfSwgcmVjb3JkQ2hhbmdlU2Vjb25kcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19