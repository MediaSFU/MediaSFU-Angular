import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./record-start-timer.service";
import * as i2 from "./record-resume-timer.service";
export class StartRecording {
    RecordStartTimerService;
    RecordResumeTimerService;
    constructor(RecordStartTimerService, RecordResumeTimerService) {
        this.RecordStartTimerService = RecordStartTimerService;
        this.RecordResumeTimerService = RecordResumeTimerService;
    }
    /**
     * Starts the recording process based on the provided parameters.
     *
     * @param {StartRecordingOptions} options - The options for starting the recording.
     * @param {object} options.parameters - The parameters required for starting the recording.
     * @param {string} options.parameters.roomName - The name of the room where recording is to be started.
     * @param {object} options.parameters.userRecordingParams - User-specific recording parameters.
     * @param {object} options.parameters.socket - The socket instance for communication.
     * @param {function} options.parameters.updateIsRecordingModalVisible - Function to update the visibility of the recording modal.
     * @param {boolean} options.parameters.confirmedToRecord - Flag indicating if the user has confirmed to record.
     * @param {function} options.parameters.showAlert - Function to show alerts.
     * @param {string} options.parameters.recordingMediaOptions - The media options for recording (e.g., "video", "audio").
     * @param {boolean} options.parameters.videoAlreadyOn - Flag indicating if the video is already on.
     * @param {boolean} options.parameters.audioAlreadyOn - Flag indicating if the audio is already on.
     * @param {boolean} options.parameters.recordStarted - Flag indicating if the recording has started.
     * @param {boolean} options.parameters.recordPaused - Flag indicating if the recording is paused.
     * @param {boolean} options.parameters.recordResumed - Flag indicating if the recording is resumed.
     * @param {boolean} options.parameters.recordStopped - Flag indicating if the recording is stopped.
     * @param {boolean} options.parameters.startReport - Flag indicating if the start report is active.
     * @param {boolean} options.parameters.endReport - Flag indicating if the end report is active.
     * @param {boolean} options.parameters.canRecord - Flag indicating if recording is allowed.
     * @param {function} options.parameters.updateClearedToRecord - Function to update the cleared to record status.
     * @param {function} options.parameters.updateRecordStarted - Function to update the record started status.
     * @param {function} options.parameters.updateRecordPaused - Function to update the record paused status.
     * @param {function} options.parameters.updateRecordResumed - Function to update the record resumed status.
     * @param {function} options.parameters.updateStartReport - Function to update the start report status.
     * @param {function} options.parameters.updateEndReport - Function to update the end report status.
     * @param {function} options.parameters.updateCanRecord - Function to update the can record status.
     * @param {boolean} options.parameters.whiteboardStarted - Flag indicating if the whiteboard has started.
     * @param {boolean} options.parameters.whiteboardEnded - Flag indicating if the whiteboard has ended.
     * @param {function} options.parameters.rePort - Function to report the recording status.
     * @param {function} options.parameters.captureCanvasStream - Function to capture the canvas stream.
     *
     * @returns {Promise<boolean | undefined>} - A promise that resolves to a boolean indicating if the recording attempt was successful, or undefined if not applicable.
     */
    startRecording = async ({ parameters }) => {
        parameters = parameters.getUpdatedAllParams();
        let { roomName, userRecordingParams, socket, updateIsRecordingModalVisible, confirmedToRecord, showAlert, recordingMediaOptions, videoAlreadyOn, audioAlreadyOn, recordStarted, recordPaused, recordResumed, recordStopped, startReport, endReport, canRecord, updateClearedToRecord, updateRecordStarted, updateRecordPaused, updateRecordResumed, updateStartReport, updateEndReport, updateCanRecord, whiteboardStarted, whiteboardEnded, 
        //mediasfu functions
        rePort, captureCanvasStream, } = parameters;
        // Check if recording is confirmed before starting
        if (!confirmedToRecord) {
            showAlert?.({
                message: 'You must click confirm before you can start recording',
                type: 'danger',
            });
            return false;
        }
        // Check for recordingMediaOptions for video
        if (recordingMediaOptions === 'video' && !videoAlreadyOn) {
            showAlert?.({
                message: 'You must turn on your video before you can start recording',
                type: 'danger',
            });
            return false;
        }
        // Check for recordingMediaOptions for audio
        if (recordingMediaOptions === 'audio' && !audioAlreadyOn) {
            showAlert?.({
                message: 'You must turn on your audio before you can start recording',
                type: 'danger',
            });
            return false;
        }
        // Set clearedToRecord to true
        updateClearedToRecord(true);
        let action = 'startRecord';
        if (recordStarted && recordPaused && !recordResumed && !recordStopped) {
            action = 'resumeRecord';
        }
        else {
            action = 'startRecord';
        }
        let recAttempt = false;
        await new Promise((resolve) => {
            socket.emit(action, { roomName, userRecordingParams }, async ({ success, reason }) => {
                if (success) {
                    recordStarted = true;
                    startReport = true;
                    endReport = false;
                    recordPaused = false;
                    recAttempt = true;
                    updateRecordStarted(recordStarted);
                    updateStartReport(startReport);
                    updateEndReport(endReport);
                    updateRecordPaused(recordPaused);
                    if (action === 'startRecord') {
                        await rePort({ parameters });
                        await this.RecordStartTimerService.recordStartTimer({ parameters });
                    }
                    else {
                        recordResumed = true;
                        updateRecordResumed(recordResumed);
                        await rePort({ restart: true, parameters });
                        await this.RecordResumeTimerService.recordResumeTimer({ parameters });
                    }
                }
                else {
                    showAlert?.({ message: `Recording could not start - ${reason}`, type: 'danger' });
                    canRecord = true;
                    startReport = false;
                    endReport = true;
                    recAttempt = false;
                    updateCanRecord(canRecord);
                    updateStartReport(startReport);
                    updateEndReport(endReport);
                }
                resolve();
            });
        });
        // Capture canvas stream if recording is successful and whiteboard is active
        try {
            if (recAttempt &&
                whiteboardStarted &&
                !whiteboardEnded &&
                recordingMediaOptions === 'video') {
                captureCanvasStream({ parameters });
            }
        }
        catch (error) {
            console.log('Error capturing canvas stream:', error);
        }
        // Set isRecordingModalVisible to false
        updateIsRecordingModalVisible(false);
        return recAttempt;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartRecording, deps: [{ token: i1.RecordStartTimer }, { token: i2.RecordResumeTimer }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.RecordStartTimer }, { type: i2.RecordResumeTimer }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtcmVjb3JkaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9zdGFydC1yZWNvcmRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBOEQzQyxNQUFNLE9BQU8sY0FBYztJQUVmO0lBQ0E7SUFGVixZQUNVLHVCQUF5QyxFQUN6Qyx3QkFBMkM7UUFEM0MsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFrQjtRQUN6Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO0lBQ2xELENBQUM7SUFFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtDRztJQUVILGNBQWMsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQXlCLEVBQWdDLEVBQUU7UUFDN0YsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTlDLElBQUksRUFDRixRQUFRLEVBQ1IsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTiw2QkFBNkIsRUFDN0IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxxQkFBcUIsRUFDckIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEVBQ2IsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsZUFBZSxFQUVmLGlCQUFpQixFQUNqQixlQUFlO1FBRWYsb0JBQW9CO1FBQ3BCLE1BQU0sRUFDTixtQkFBbUIsR0FDcEIsR0FBRyxVQUFVLENBQUM7UUFFZixrREFBa0Q7UUFDbEQsSUFBSSxDQUFD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QUVuQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzNCLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUMvQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLENBQUM7Z0JBRUQsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsNEVBQTRFO1FBQzVFLElBQUksQ0FBQztZQUNILElBQ0UsVUFBVTtnQkFDVixpQkFBaUI7Z0JBQ2pCLENBQUMsZUFBZTtnQkFDaEIscUJBQXFCLEtBQUssT0FBTyxFQUNqQyxDQUFDO2dCQUNELG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRCx1Q0FBdUM7UUFDdkMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckMsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQyxDQUFDO3VHQWxMUyxjQUFjOzJHQUFkLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlY29yZFN0YXJ0VGltZXIgfSBmcm9tICcuL3JlY29yZC1zdGFydC10aW1lci5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY29yZFJlc3VtZVRpbWVyLCBSZWNvcmRSZXN1bWVUaW1lclBhcmFtZXRlcnMgfSBmcm9tICcuL3JlY29yZC1yZXN1bWUtdGltZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgUmVQb3J0VHlwZSxcbiAgVXNlclJlY29yZGluZ1BhcmFtcyxcbiAgQ2FwdHVyZUNhbnZhc1N0cmVhbVR5cGUsXG4gIENhcHR1cmVDYW52YXNTdHJlYW1QYXJhbWV0ZXJzLFxuICBSZVBvcnRQYXJhbWV0ZXJzLFxuICBTaG93QWxlcnQsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRSZWNvcmRpbmdQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgQ2FwdHVyZUNhbnZhc1N0cmVhbVBhcmFtZXRlcnMsXG4gICAgUmVQb3J0UGFyYW1ldGVycyxcbiAgICBSZWNvcmRSZXN1bWVUaW1lclBhcmFtZXRlcnMge1xuICByb29tTmFtZTogc3RyaW5nO1xuICB1c2VyUmVjb3JkaW5nUGFyYW1zOiBVc2VyUmVjb3JkaW5nUGFyYW1zO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6ICh2aXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBjb25maXJtZWRUb1JlY29yZDogYm9vbGVhbjtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZztcbiAgdmlkZW9BbHJlYWR5T246IGJvb2xlYW47XG4gIGF1ZGlvQWxyZWFkeU9uOiBib29sZWFuO1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIHJlY29yZFJlc3VtZWQ6IGJvb2xlYW47XG4gIHJlY29yZFN0b3BwZWQ6IGJvb2xlYW47XG4gIHN0YXJ0UmVwb3J0OiBib29sZWFuO1xuICBlbmRSZXBvcnQ6IGJvb2xlYW47XG4gIGNhblJlY29yZDogYm9vbGVhbjtcbiAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkOiAoY2xlYXJlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkU3RhcnRlZDogKHN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZFBhdXNlZDogKHBhdXNlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkUmVzdW1lZDogKHJlc3VtZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVN0YXJ0UmVwb3J0OiAoc3RhcnRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRW5kUmVwb3J0OiAoZW5kZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUNhblJlY29yZDogKGNhblJlY29yZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgd2hpdGVib2FyZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHdoaXRlYm9hcmRFbmRlZDogYm9vbGVhbjtcblxuICAvLyBNZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVQb3J0OiBSZVBvcnRUeXBlO1xuICBjYXB0dXJlQ2FudmFzU3RyZWFtOiBDYXB0dXJlQ2FudmFzU3RyZWFtVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBTdGFydFJlY29yZGluZ1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFydFJlY29yZGluZ09wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBTdGFydFJlY29yZGluZ1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN0YXJ0UmVjb3JkaW5nVHlwZSA9IChvcHRpb25zOiBTdGFydFJlY29yZGluZ09wdGlvbnMpID0+IFByb21pc2U8Ym9vbGVhbiB8IHVuZGVmaW5lZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTdGFydFJlY29yZGluZyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgUmVjb3JkU3RhcnRUaW1lclNlcnZpY2U6IFJlY29yZFN0YXJ0VGltZXIsXG4gICAgcHJpdmF0ZSBSZWNvcmRSZXN1bWVUaW1lclNlcnZpY2U6IFJlY29yZFJlc3VtZVRpbWVyLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgcmVjb3JkaW5nIHByb2Nlc3MgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RhcnRSZWNvcmRpbmdPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0YXJ0aW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3RhcnRpbmcgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHdoZXJlIHJlY29yZGluZyBpcyB0byBiZSBzdGFydGVkLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJSZWNvcmRpbmdQYXJhbXMgLSBVc2VyLXNwZWNpZmljIHJlY29yZGluZyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcmVjb3JkaW5nIG1vZGFsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5jb25maXJtZWRUb1JlY29yZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdXNlciBoYXMgY29uZmlybWVkIHRvIHJlY29yZC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ01lZGlhT3B0aW9ucyAtIFRoZSBtZWRpYSBvcHRpb25zIGZvciByZWNvcmRpbmcgKGUuZy4sIFwidmlkZW9cIiwgXCJhdWRpb1wiKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvQWxyZWFkeU9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBhdWRpbyBpcyBhbHJlYWR5IG9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdGFydGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVjb3JkaW5nIGlzIHBhdXNlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVjb3JkaW5nIGlzIHJlc3VtZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0b3BwZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyBpcyBzdG9wcGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zdGFydFJlcG9ydCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc3RhcnQgcmVwb3J0IGlzIGFjdGl2ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZW5kUmVwb3J0IC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBlbmQgcmVwb3J0IGlzIGFjdGl2ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FuUmVjb3JkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHJlY29yZGluZyBpcyBhbGxvd2VkLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjbGVhcmVkIHRvIHJlY29yZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRTdGFydGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmQgc3RhcnRlZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRQYXVzZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZCBwYXVzZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkUmVzdW1lZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkIHJlc3VtZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU3RhcnRSZXBvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHN0YXJ0IHJlcG9ydCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVFbmRSZXBvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGVuZCByZXBvcnQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2FuUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjYW4gcmVjb3JkIHN0YXR1cy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHdoaXRlYm9hcmQgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRFbmRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgd2hpdGVib2FyZCBoYXMgZW5kZWQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byByZXBvcnQgdGhlIHJlY29yZGluZyBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jYXB0dXJlQ2FudmFzU3RyZWFtIC0gRnVuY3Rpb24gdG8gY2FwdHVyZSB0aGUgY2FudmFzIHN0cmVhbS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbiB8IHVuZGVmaW5lZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyBhdHRlbXB0IHdhcyBzdWNjZXNzZnVsLCBvciB1bmRlZmluZWQgaWYgbm90IGFwcGxpY2FibGUuXG4gICAqL1xuXG4gIHN0YXJ0UmVjb3JkaW5nID0gYXN5bmMgKHsgcGFyYW1ldGVycyB9OiBTdGFydFJlY29yZGluZ09wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4gfCB1bmRlZmluZWQ+ID0+IHtcbiAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgcm9vbU5hbWUsXG4gICAgICB1c2VyUmVjb3JkaW5nUGFyYW1zLFxuICAgICAgc29ja2V0LFxuICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUsXG4gICAgICBjb25maXJtZWRUb1JlY29yZCxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgYXVkaW9BbHJlYWR5T24sXG4gICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgcmVjb3JkUGF1c2VkLFxuICAgICAgcmVjb3JkUmVzdW1lZCxcbiAgICAgIHJlY29yZFN0b3BwZWQsXG4gICAgICBzdGFydFJlcG9ydCxcbiAgICAgIGVuZFJlcG9ydCxcbiAgICAgIGNhblJlY29yZCxcbiAgICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZCxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0ZWQsXG4gICAgICB1cGRhdGVSZWNvcmRQYXVzZWQsXG4gICAgICB1cGRhdGVSZWNvcmRSZXN1bWVkLFxuICAgICAgdXBkYXRlU3RhcnRSZXBvcnQsXG4gICAgICB1cGRhdGVFbmRSZXBvcnQsXG4gICAgICB1cGRhdGVDYW5SZWNvcmQsXG5cbiAgICAgIHdoaXRlYm9hcmRTdGFydGVkLFxuICAgICAgd2hpdGVib2FyZEVuZGVkLFxuXG4gICAgICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgcmVQb3J0LFxuICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbSxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIC8vIENoZWNrIGlmIHJlY29yZGluZyBpcyBjb25maXJtZWQgYmVmb3JlIHN0YXJ0aW5nXG4gICAgaWYgKCFjb25maXJtZWRUb1JlY29yZCkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IG11c3QgY2xpY2sgY29uZmlybSBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciByZWNvcmRpbmdNZWRpYU9wdGlvbnMgZm9yIHZpZGVvXG4gICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PT0gJ3ZpZGVvJyAmJiAhdmlkZW9BbHJlYWR5T24pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBtdXN0IHR1cm4gb24geW91ciB2aWRlbyBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciByZWNvcmRpbmdNZWRpYU9wdGlvbnMgZm9yIGF1ZGlvXG4gICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PT0gJ2F1ZGlvJyAmJiAhYXVkaW9BbHJlYWR5T24pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBtdXN0IHR1cm4gb24geW91ciBhdWRpbyBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFNldCBjbGVhcmVkVG9SZWNvcmQgdG8gdHJ1ZVxuICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZCh0cnVlKTtcblxuICAgIGxldCBhY3Rpb24gPSAnc3RhcnRSZWNvcmQnO1xuICAgIGlmIChyZWNvcmRTdGFydGVkICYmIHJlY29yZFBhdXNlZCAmJiAhcmVjb3JkUmVzdW1lZCAmJiAhcmVjb3JkU3RvcHBlZCkge1xuICAgICAgYWN0aW9uID0gJ3Jlc3VtZVJlY29yZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGlvbiA9ICdzdGFydFJlY29yZCc7XG4gICAgfVxuXG4gICAgbGV0IHJlY0F0dGVtcHQgPSBmYWxzZTtcblxuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICB7IHJvb21OYW1lLCB1c2VyUmVjb3JkaW5nUGFyYW1zIH0sXG4gICAgICAgIGFzeW5jICh7IHN1Y2Nlc3MsIHJlYXNvbiB9OiB7IHN1Y2Nlc3M6IGJvb2xlYW47IHJlYXNvbjogc3RyaW5nOyByZWNvcmRTdGF0ZTogYW55IH0pID0+IHtcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgcmVjb3JkU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBzdGFydFJlcG9ydCA9IHRydWU7XG4gICAgICAgICAgICBlbmRSZXBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJlY29yZFBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVjQXR0ZW1wdCA9IHRydWU7XG5cbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0ZWQocmVjb3JkU3RhcnRlZCk7XG4gICAgICAgICAgICB1cGRhdGVTdGFydFJlcG9ydChzdGFydFJlcG9ydCk7XG4gICAgICAgICAgICB1cGRhdGVFbmRSZXBvcnQoZW5kUmVwb3J0KTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZFBhdXNlZChyZWNvcmRQYXVzZWQpO1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnc3RhcnRSZWNvcmQnKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHJlUG9ydCh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuUmVjb3JkU3RhcnRUaW1lclNlcnZpY2UucmVjb3JkU3RhcnRUaW1lcih7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWNvcmRSZXN1bWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdXBkYXRlUmVjb3JkUmVzdW1lZChyZWNvcmRSZXN1bWVkKTtcbiAgICAgICAgICAgICAgYXdhaXQgcmVQb3J0KHsgcmVzdGFydDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5SZWNvcmRSZXN1bWVUaW1lclNlcnZpY2UucmVjb3JkUmVzdW1lVGltZXIoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6IGBSZWNvcmRpbmcgY291bGQgbm90IHN0YXJ0IC0gJHtyZWFzb259YCwgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgICAgICAgICBjYW5SZWNvcmQgPSB0cnVlO1xuICAgICAgICAgICAgc3RhcnRSZXBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGVuZFJlcG9ydCA9IHRydWU7XG4gICAgICAgICAgICByZWNBdHRlbXB0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHVwZGF0ZUNhblJlY29yZChjYW5SZWNvcmQpO1xuICAgICAgICAgICAgdXBkYXRlU3RhcnRSZXBvcnQoc3RhcnRSZXBvcnQpO1xuICAgICAgICAgICAgdXBkYXRlRW5kUmVwb3J0KGVuZFJlcG9ydCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIENhcHR1cmUgY2FudmFzIHN0cmVhbSBpZiByZWNvcmRpbmcgaXMgc3VjY2Vzc2Z1bCBhbmQgd2hpdGVib2FyZCBpcyBhY3RpdmVcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICByZWNBdHRlbXB0ICYmXG4gICAgICAgIHdoaXRlYm9hcmRTdGFydGVkICYmXG4gICAgICAgICF3aGl0ZWJvYXJkRW5kZWQgJiZcbiAgICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zID09PSAndmlkZW8nXG4gICAgICApIHtcbiAgICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbSh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjYXB0dXJpbmcgY2FudmFzIHN0cmVhbTonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgLy8gU2V0IGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlIHRvIGZhbHNlXG4gICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgcmV0dXJuIHJlY0F0dGVtcHQ7XG4gIH07XG59XG4iXX0=