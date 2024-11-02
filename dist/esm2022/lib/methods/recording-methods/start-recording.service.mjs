import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./record-start-timer.service";
import * as i2 from "./record-resume-timer.service";
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
 *
 * @remarks
 * This method checks various conditions, such as whether the user has confirmed recording and whether audio or video is already on,
 * before starting the recording. It updates the recording state, manages socket communication, and handles whiteboard functionality if applicable.
 *
 * @example
 * ```typescript
 * const options: StartRecordingOptions = { parameters: someParameters };
 * const result = await startRecording(options);
 * if (result) {
 *   console.log('Recording started successfully.');
 * } else {
 *   console.log('Failed to start recording.');
 * }
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtcmVjb3JkaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9zdGFydC1yZWNvcmRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBMkQzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlERztBQU1ILE1BQU0sT0FBTyxjQUFjO0lBRWY7SUFDQTtJQUZWLFlBQ1UsdUJBQXlDLEVBQ3pDLHdCQUEyQztRQUQzQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQWtCO1FBQ3pDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBbUI7SUFDbEQsQ0FBQztJQUVKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0NHO0lBRUgsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBeUIsRUFBZ0MsRUFBRTtRQUM3RixVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFOUMsSUFBSSxFQUNGLFFBQVEsRUFDUixtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLDZCQUE2QixFQUM3QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULHFCQUFxQixFQUNyQixjQUFjLEVBQ2QsY0FBYyxFQUNkLGFBQWEsRUFDYixZQUFZLEVBQ1osYUFBYSxFQUNiLGFBQWEsRUFDYixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixlQUFlLEVBRWYsaUJBQWlCLEVBQ2pCLGVBQWU7UUFFZixvQkFBb0I7UUFDcEIsTUFBTSxFQUNOLG1CQUFtQixHQUNwQixHQUFHLFVBQVUsQ0FBQztRQUVmLGtEQUFrRDtRQUNsRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN2QixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsdURBQXVEO2dCQUNoRSxJQUFJLEVBQUUsUUFBUTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELDRDQUE0QztRQUM1QyxJQUFJLHFCQUFxQixLQUFLLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3pELFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSw0REFBNEQ7Z0JBQ3JFLElBQUksRUFBRSxRQUFRO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsNENBQTRDO1FBQzVDLElBQUkscUJBQXFCLEtBQUssT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDekQsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLDREQUE0RDtnQkFDckUsSUFBSSxFQUFFLFFBQVE7YUFDZixDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCw4QkFBOEI7UUFDOUIscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFNUIsSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDO1FBQzNCLElBQUksYUFBYSxJQUFJLFlBQVksSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3RFLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDMUIsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLEdBQUcsYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFdkIsTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQ1QsTUFBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLEVBQ2pDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQTBELEVBQUUsRUFBRTtnQkFDcEYsSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDWixhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUNyQixXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUNuQixTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUNsQixZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUNyQixVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUVsQixtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDbkMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9CLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDM0Isa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBRWpDLElBQUksTUFBTSxLQUFLLGFBQWEsRUFBRSxDQUFDO3dCQUM3QixNQUFNLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7d0JBQzdCLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDdEUsQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDNUMsTUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUN4RSxDQUFDO2dCQUNILENBQUM7cUJBQU0sQ0FBQztvQkFDTixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSwrQkFBK0IsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ2xGLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLFdBQVcsR0FBRyxLQUFLLENBQUM7b0JBQ3BCLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLFVBQVUsR0FBRyxLQUFLLENBQUM7b0JBRW5CLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDM0IsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9CLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFFRCxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDO1lBQ0gsSUFDRSxVQUFVO2dCQUNWLGlCQUFpQjtnQkFDakIsQ0FBQyxlQUFlO2dCQUNoQixxQkFBcUIsS0FBSyxPQUFPLEVBQ2pDLENBQUM7Z0JBQ0QsbUJBQW1CLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELHVDQUF1QztRQUN2Qyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDLENBQUM7dUdBbExTLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVjb3JkU3RhcnRUaW1lciB9IGZyb20gJy4vcmVjb3JkLXN0YXJ0LXRpbWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjb3JkUmVzdW1lVGltZXIsIFJlY29yZFJlc3VtZVRpbWVyUGFyYW1ldGVycyB9IGZyb20gJy4vcmVjb3JkLXJlc3VtZS10aW1lci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBSZVBvcnRUeXBlLFxuICBVc2VyUmVjb3JkaW5nUGFyYW1zLFxuICBDYXB0dXJlQ2FudmFzU3RyZWFtVHlwZSxcbiAgQ2FwdHVyZUNhbnZhc1N0cmVhbVBhcmFtZXRlcnMsXG4gIFJlUG9ydFBhcmFtZXRlcnMsXG4gIFNob3dBbGVydCxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGFydFJlY29yZGluZ1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBDYXB0dXJlQ2FudmFzU3RyZWFtUGFyYW1ldGVycyxcbiAgICBSZVBvcnRQYXJhbWV0ZXJzLFxuICAgIFJlY29yZFJlc3VtZVRpbWVyUGFyYW1ldGVycyB7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVzZXJSZWNvcmRpbmdQYXJhbXM6IFVzZXJSZWNvcmRpbmdQYXJhbXM7XG4gIHNvY2tldDogU29ja2V0O1xuICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGNvbmZpcm1lZFRvUmVjb3JkOiBib29sZWFuO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nO1xuICB2aWRlb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgYXVkaW9BbHJlYWR5T246IGJvb2xlYW47XG4gIHJlY29yZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkUmVzdW1lZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgc3RhcnRSZXBvcnQ6IGJvb2xlYW47XG4gIGVuZFJlcG9ydDogYm9vbGVhbjtcbiAgY2FuUmVjb3JkOiBib29sZWFuO1xuICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IChjbGVhcmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRTdGFydGVkOiAoc3RhcnRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkUGF1c2VkOiAocGF1c2VkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRSZXN1bWVkOiAocmVzdW1lZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU3RhcnRSZXBvcnQ6IChzdGFydGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVFbmRSZXBvcnQ6IChlbmRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ2FuUmVjb3JkOiAoY2FuUmVjb3JkOiBib29sZWFuKSA9PiB2b2lkO1xuICB3aGl0ZWJvYXJkU3RhcnRlZDogYm9vbGVhbjtcbiAgd2hpdGVib2FyZEVuZGVkOiBib29sZWFuO1xuXG4gIC8vIE1lZGlhc2Z1IGZ1bmN0aW9uc1xuICByZVBvcnQ6IFJlUG9ydFR5cGU7XG4gIGNhcHR1cmVDYW52YXNTdHJlYW06IENhcHR1cmVDYW52YXNTdHJlYW1UeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFN0YXJ0UmVjb3JkaW5nUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXJ0UmVjb3JkaW5nT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IFN0YXJ0UmVjb3JkaW5nUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3RhcnRSZWNvcmRpbmdUeXBlID0gKG9wdGlvbnM6IFN0YXJ0UmVjb3JkaW5nT3B0aW9ucykgPT4gUHJvbWlzZTxib29sZWFuIHwgdW5kZWZpbmVkPjtcblxuLyoqXG4gKiBTdGFydHMgdGhlIHJlY29yZGluZyBwcm9jZXNzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RhcnRSZWNvcmRpbmdPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0YXJ0aW5nIHRoZSByZWNvcmRpbmcuXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHN0YXJ0aW5nIHRoZSByZWNvcmRpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gd2hlcmUgcmVjb3JkaW5nIGlzIHRvIGJlIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJSZWNvcmRpbmdQYXJhbXMgLSBVc2VyLXNwZWNpZmljIHJlY29yZGluZyBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSByZWNvcmRpbmcgbW9kYWwuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5jb25maXJtZWRUb1JlY29yZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdXNlciBoYXMgY29uZmlybWVkIHRvIHJlY29yZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nTWVkaWFPcHRpb25zIC0gVGhlIG1lZGlhIG9wdGlvbnMgZm9yIHJlY29yZGluZyAoZS5nLiwgXCJ2aWRlb1wiLCBcImF1ZGlvXCIpLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb0FscmVhZHlPbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgYXVkaW8gaXMgYWxyZWFkeSBvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0YXJ0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyBoYXMgc3RhcnRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVjb3JkaW5nIGlzIHBhdXNlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFJlc3VtZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyBpcyByZXN1bWVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RvcHBlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVjb3JkaW5nIGlzIHN0b3BwZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zdGFydFJlcG9ydCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc3RhcnQgcmVwb3J0IGlzIGFjdGl2ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmVuZFJlcG9ydCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgZW5kIHJlcG9ydCBpcyBhY3RpdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5jYW5SZWNvcmQgLSBGbGFnIGluZGljYXRpbmcgaWYgcmVjb3JkaW5nIGlzIGFsbG93ZWQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjbGVhcmVkIHRvIHJlY29yZCBzdGF0dXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkU3RhcnRlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkIHN0YXJ0ZWQgc3RhdHVzLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFBhdXNlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkIHBhdXNlZCBzdGF0dXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkUmVzdW1lZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkIHJlc3VtZWQgc3RhdHVzLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVN0YXJ0UmVwb3J0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzdGFydCByZXBvcnQgc3RhdHVzLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUVuZFJlcG9ydCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZW5kIHJlcG9ydCBzdGF0dXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2FuUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjYW4gcmVjb3JkIHN0YXR1cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRTdGFydGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB3aGl0ZWJvYXJkIGhhcyBzdGFydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB3aGl0ZWJvYXJkIGhhcyBlbmRlZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byByZXBvcnQgdGhlIHJlY29yZGluZyBzdGF0dXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FwdHVyZUNhbnZhc1N0cmVhbSAtIEZ1bmN0aW9uIHRvIGNhcHR1cmUgdGhlIGNhbnZhcyBzdHJlYW0uXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbiB8IHVuZGVmaW5lZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyBhdHRlbXB0IHdhcyBzdWNjZXNzZnVsLCBvciB1bmRlZmluZWQgaWYgbm90IGFwcGxpY2FibGUuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoaXMgbWV0aG9kIGNoZWNrcyB2YXJpb3VzIGNvbmRpdGlvbnMsIHN1Y2ggYXMgd2hldGhlciB0aGUgdXNlciBoYXMgY29uZmlybWVkIHJlY29yZGluZyBhbmQgd2hldGhlciBhdWRpbyBvciB2aWRlbyBpcyBhbHJlYWR5IG9uLFxuICogYmVmb3JlIHN0YXJ0aW5nIHRoZSByZWNvcmRpbmcuIEl0IHVwZGF0ZXMgdGhlIHJlY29yZGluZyBzdGF0ZSwgbWFuYWdlcyBzb2NrZXQgY29tbXVuaWNhdGlvbiwgYW5kIGhhbmRsZXMgd2hpdGVib2FyZCBmdW5jdGlvbmFsaXR5IGlmIGFwcGxpY2FibGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IFN0YXJ0UmVjb3JkaW5nT3B0aW9ucyA9IHsgcGFyYW1ldGVyczogc29tZVBhcmFtZXRlcnMgfTtcbiAqIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN0YXJ0UmVjb3JkaW5nKG9wdGlvbnMpO1xuICogaWYgKHJlc3VsdCkge1xuICogICBjb25zb2xlLmxvZygnUmVjb3JkaW5nIHN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICogfSBlbHNlIHtcbiAqICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBzdGFydCByZWNvcmRpbmcuJyk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTdGFydFJlY29yZGluZyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgUmVjb3JkU3RhcnRUaW1lclNlcnZpY2U6IFJlY29yZFN0YXJ0VGltZXIsXG4gICAgcHJpdmF0ZSBSZWNvcmRSZXN1bWVUaW1lclNlcnZpY2U6IFJlY29yZFJlc3VtZVRpbWVyLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgcmVjb3JkaW5nIHByb2Nlc3MgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RhcnRSZWNvcmRpbmdPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0YXJ0aW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3RhcnRpbmcgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHdoZXJlIHJlY29yZGluZyBpcyB0byBiZSBzdGFydGVkLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJSZWNvcmRpbmdQYXJhbXMgLSBVc2VyLXNwZWNpZmljIHJlY29yZGluZyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcmVjb3JkaW5nIG1vZGFsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5jb25maXJtZWRUb1JlY29yZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdXNlciBoYXMgY29uZmlybWVkIHRvIHJlY29yZC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ01lZGlhT3B0aW9ucyAtIFRoZSBtZWRpYSBvcHRpb25zIGZvciByZWNvcmRpbmcgKGUuZy4sIFwidmlkZW9cIiwgXCJhdWRpb1wiKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvQWxyZWFkeU9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBhdWRpbyBpcyBhbHJlYWR5IG9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdGFydGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVjb3JkaW5nIGlzIHBhdXNlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVjb3JkaW5nIGlzIHJlc3VtZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0b3BwZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyBpcyBzdG9wcGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zdGFydFJlcG9ydCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc3RhcnQgcmVwb3J0IGlzIGFjdGl2ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZW5kUmVwb3J0IC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBlbmQgcmVwb3J0IGlzIGFjdGl2ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FuUmVjb3JkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHJlY29yZGluZyBpcyBhbGxvd2VkLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjbGVhcmVkIHRvIHJlY29yZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRTdGFydGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmQgc3RhcnRlZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRQYXVzZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZCBwYXVzZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkUmVzdW1lZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkIHJlc3VtZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU3RhcnRSZXBvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHN0YXJ0IHJlcG9ydCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVFbmRSZXBvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGVuZCByZXBvcnQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2FuUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjYW4gcmVjb3JkIHN0YXR1cy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHdoaXRlYm9hcmQgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRFbmRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgd2hpdGVib2FyZCBoYXMgZW5kZWQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byByZXBvcnQgdGhlIHJlY29yZGluZyBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jYXB0dXJlQ2FudmFzU3RyZWFtIC0gRnVuY3Rpb24gdG8gY2FwdHVyZSB0aGUgY2FudmFzIHN0cmVhbS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbiB8IHVuZGVmaW5lZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyBhdHRlbXB0IHdhcyBzdWNjZXNzZnVsLCBvciB1bmRlZmluZWQgaWYgbm90IGFwcGxpY2FibGUuXG4gICAqL1xuXG4gIHN0YXJ0UmVjb3JkaW5nID0gYXN5bmMgKHsgcGFyYW1ldGVycyB9OiBTdGFydFJlY29yZGluZ09wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4gfCB1bmRlZmluZWQ+ID0+IHtcbiAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgcm9vbU5hbWUsXG4gICAgICB1c2VyUmVjb3JkaW5nUGFyYW1zLFxuICAgICAgc29ja2V0LFxuICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUsXG4gICAgICBjb25maXJtZWRUb1JlY29yZCxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgYXVkaW9BbHJlYWR5T24sXG4gICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgcmVjb3JkUGF1c2VkLFxuICAgICAgcmVjb3JkUmVzdW1lZCxcbiAgICAgIHJlY29yZFN0b3BwZWQsXG4gICAgICBzdGFydFJlcG9ydCxcbiAgICAgIGVuZFJlcG9ydCxcbiAgICAgIGNhblJlY29yZCxcbiAgICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZCxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0ZWQsXG4gICAgICB1cGRhdGVSZWNvcmRQYXVzZWQsXG4gICAgICB1cGRhdGVSZWNvcmRSZXN1bWVkLFxuICAgICAgdXBkYXRlU3RhcnRSZXBvcnQsXG4gICAgICB1cGRhdGVFbmRSZXBvcnQsXG4gICAgICB1cGRhdGVDYW5SZWNvcmQsXG5cbiAgICAgIHdoaXRlYm9hcmRTdGFydGVkLFxuICAgICAgd2hpdGVib2FyZEVuZGVkLFxuXG4gICAgICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgcmVQb3J0LFxuICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbSxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIC8vIENoZWNrIGlmIHJlY29yZGluZyBpcyBjb25maXJtZWQgYmVmb3JlIHN0YXJ0aW5nXG4gICAgaWYgKCFjb25maXJtZWRUb1JlY29yZCkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IG11c3QgY2xpY2sgY29uZmlybSBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciByZWNvcmRpbmdNZWRpYU9wdGlvbnMgZm9yIHZpZGVvXG4gICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PT0gJ3ZpZGVvJyAmJiAhdmlkZW9BbHJlYWR5T24pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBtdXN0IHR1cm4gb24geW91ciB2aWRlbyBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciByZWNvcmRpbmdNZWRpYU9wdGlvbnMgZm9yIGF1ZGlvXG4gICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PT0gJ2F1ZGlvJyAmJiAhYXVkaW9BbHJlYWR5T24pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBtdXN0IHR1cm4gb24geW91ciBhdWRpbyBiZWZvcmUgeW91IGNhbiBzdGFydCByZWNvcmRpbmcnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFNldCBjbGVhcmVkVG9SZWNvcmQgdG8gdHJ1ZVxuICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZCh0cnVlKTtcblxuICAgIGxldCBhY3Rpb24gPSAnc3RhcnRSZWNvcmQnO1xuICAgIGlmIChyZWNvcmRTdGFydGVkICYmIHJlY29yZFBhdXNlZCAmJiAhcmVjb3JkUmVzdW1lZCAmJiAhcmVjb3JkU3RvcHBlZCkge1xuICAgICAgYWN0aW9uID0gJ3Jlc3VtZVJlY29yZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGlvbiA9ICdzdGFydFJlY29yZCc7XG4gICAgfVxuXG4gICAgbGV0IHJlY0F0dGVtcHQgPSBmYWxzZTtcblxuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICB7IHJvb21OYW1lLCB1c2VyUmVjb3JkaW5nUGFyYW1zIH0sXG4gICAgICAgIGFzeW5jICh7IHN1Y2Nlc3MsIHJlYXNvbiB9OiB7IHN1Y2Nlc3M6IGJvb2xlYW47IHJlYXNvbjogc3RyaW5nOyByZWNvcmRTdGF0ZTogYW55IH0pID0+IHtcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgcmVjb3JkU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBzdGFydFJlcG9ydCA9IHRydWU7XG4gICAgICAgICAgICBlbmRSZXBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJlY29yZFBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVjQXR0ZW1wdCA9IHRydWU7XG5cbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0ZWQocmVjb3JkU3RhcnRlZCk7XG4gICAgICAgICAgICB1cGRhdGVTdGFydFJlcG9ydChzdGFydFJlcG9ydCk7XG4gICAgICAgICAgICB1cGRhdGVFbmRSZXBvcnQoZW5kUmVwb3J0KTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZFBhdXNlZChyZWNvcmRQYXVzZWQpO1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnc3RhcnRSZWNvcmQnKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHJlUG9ydCh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuUmVjb3JkU3RhcnRUaW1lclNlcnZpY2UucmVjb3JkU3RhcnRUaW1lcih7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWNvcmRSZXN1bWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdXBkYXRlUmVjb3JkUmVzdW1lZChyZWNvcmRSZXN1bWVkKTtcbiAgICAgICAgICAgICAgYXdhaXQgcmVQb3J0KHsgcmVzdGFydDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5SZWNvcmRSZXN1bWVUaW1lclNlcnZpY2UucmVjb3JkUmVzdW1lVGltZXIoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6IGBSZWNvcmRpbmcgY291bGQgbm90IHN0YXJ0IC0gJHtyZWFzb259YCwgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgICAgICAgICBjYW5SZWNvcmQgPSB0cnVlO1xuICAgICAgICAgICAgc3RhcnRSZXBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGVuZFJlcG9ydCA9IHRydWU7XG4gICAgICAgICAgICByZWNBdHRlbXB0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHVwZGF0ZUNhblJlY29yZChjYW5SZWNvcmQpO1xuICAgICAgICAgICAgdXBkYXRlU3RhcnRSZXBvcnQoc3RhcnRSZXBvcnQpO1xuICAgICAgICAgICAgdXBkYXRlRW5kUmVwb3J0KGVuZFJlcG9ydCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIENhcHR1cmUgY2FudmFzIHN0cmVhbSBpZiByZWNvcmRpbmcgaXMgc3VjY2Vzc2Z1bCBhbmQgd2hpdGVib2FyZCBpcyBhY3RpdmVcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICByZWNBdHRlbXB0ICYmXG4gICAgICAgIHdoaXRlYm9hcmRTdGFydGVkICYmXG4gICAgICAgICF3aGl0ZWJvYXJkRW5kZWQgJiZcbiAgICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zID09PSAndmlkZW8nXG4gICAgICApIHtcbiAgICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbSh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjYXB0dXJpbmcgY2FudmFzIHN0cmVhbTonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgLy8gU2V0IGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlIHRvIGZhbHNlXG4gICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgcmV0dXJuIHJlY0F0dGVtcHQ7XG4gIH07XG59XG4iXX0=