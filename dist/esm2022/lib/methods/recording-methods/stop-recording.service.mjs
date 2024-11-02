import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./record-pause-timer.service";
/**
 * Stops the recording process based on the provided parameters.
 *
 * @param {StopRecordingOptions} options - The options for stopping the recording.
 * @param {Object} options.parameters - The parameters required for stopping the recording.
 * @param {string} options.parameters.roomName - The name of the room where the recording is being stopped.
 * @param {Socket} options.parameters.socket - The socket instance for communication.
 * @param {Function} options.parameters.showAlert - Function to show alerts.
 * @param {boolean} options.parameters.startReport - Flag indicating if the start report is active.
 * @param {boolean} options.parameters.endReport - Flag indicating if the end report is active.
 * @param {boolean} options.parameters.recordStarted - Flag indicating if the recording has started.
 * @param {boolean} options.parameters.recordPaused - Flag indicating if the recording is paused.
 * @param {boolean} options.parameters.recordStopped - Flag indicating if the recording is stopped.
 * @param {Function} options.parameters.updateRecordPaused - Function to update the record paused status.
 * @param {Function} options.parameters.updateRecordStopped - Function to update the record stopped status.
 * @param {Function} options.parameters.updateStartReport - Function to update the start report status.
 * @param {Function} options.parameters.updateEndReport - Function to update the end report status.
 * @param {Function} options.parameters.updateShowRecordButtons - Function to update the visibility of recording buttons.
 * @param {boolean} options.parameters.whiteboardStarted - Flag indicating if the whiteboard has started.
 * @param {boolean} options.parameters.whiteboardEnded - Flag indicating if the whiteboard has ended.
 * @param {string} options.parameters.recordingMediaOptions - The media options for recording (e.g., "video", "audio").
 * @param {Function} options.parameters.captureCanvasStream - Function to capture the canvas stream.
 *
 * @returns {Promise<void>} - A promise that resolves when the recording is stopped.
 *
 * @remarks
 * This method checks if the recording has started and is not already stopped.
 * It pauses the timer and emits a stop recording event via socket communication.
 * If successful, it updates the recording state and alerts the user.
 * Additionally, if the whiteboard feature is active, it captures the canvas stream.
 *
 * @example
 * ```typescript
 * const options: StopRecordingOptions = { parameters: someParameters };
 * await stopRecording(options);
 * console.log('Recording stopped successfully.');
 * ```
 */
export class StopRecording {
    RecordPauseTimerService;
    constructor(RecordPauseTimerService) {
        this.RecordPauseTimerService = RecordPauseTimerService;
    }
    async stopRecording({ parameters }) {
        let { roomName, socket, showAlert, startReport, endReport, recordStarted, recordPaused, recordStopped, updateRecordPaused, updateRecordStopped, updateStartReport, updateEndReport, updateShowRecordButtons, whiteboardStarted, whiteboardEnded, recordingMediaOptions, 
        //mediasfu functions
        captureCanvasStream, } = parameters;
        let recAttempt;
        if (recordStarted && !recordStopped) {
            let stop = await this.RecordPauseTimerService.recordPauseTimer({
                stop: true,
                isTimerRunning: parameters['isTimerRunning'],
                canPauseResume: parameters['canPauseResume'],
                showAlert: parameters.showAlert,
            });
            if (stop) {
                let action = 'stopRecord';
                await new Promise((resolve) => {
                    socket.emit(action, { roomName }, ({ success, reason, recordState, }) => {
                        if (success) {
                            startReport = false;
                            endReport = true;
                            recordPaused = false;
                            recordStopped = true;
                            recAttempt = true;
                            updateStartReport(startReport);
                            updateEndReport(endReport);
                            updateRecordPaused(recordPaused);
                            updateRecordStopped(recordStopped);
                            showAlert?.({ message: 'Recording Stopped', type: 'success' });
                            updateShowRecordButtons(false);
                        }
                        else {
                            let reasonMessage = `Recording Stop Failed: ${reason}; the recording is currently ${recordState}`;
                            showAlert?.({ message: reasonMessage, type: 'danger' });
                            recAttempt = false;
                        }
                        resolve();
                    });
                });
                try {
                    if (recAttempt && whiteboardStarted && !whiteboardEnded) {
                        if (recordingMediaOptions === 'video') {
                            captureCanvasStream({ parameters, start: false });
                        }
                    }
                }
                catch (error) {
                    console.log('Error capturing canvas stream:', error);
                }
            }
            else {
                return;
            }
        }
        else {
            showAlert?.({ message: 'Recording is not started yet or already stopped', type: 'danger' });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopRecording, deps: [{ token: i1.RecordPauseTimer }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.RecordPauseTimer }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC1yZWNvcmRpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL3N0b3AtcmVjb3JkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBbUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQU1ILE1BQU0sT0FBTyxhQUFhO0lBQ0o7SUFBcEIsWUFBb0IsdUJBQXlDO1FBQXpDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBa0I7SUFBRyxDQUFDO0lBRWpFLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQXdCO1FBQ3RELElBQUksRUFDRixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGFBQWEsRUFDYixZQUFZLEVBQ1osYUFBYSxFQUNiLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZix1QkFBdUIsRUFFdkIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixxQkFBcUI7UUFFckIsb0JBQW9CO1FBQ3BCLG1CQUFtQixHQUNwQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksVUFBVSxDQUFDO1FBRWYsSUFBSSxhQUFhLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNwQyxJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsY0FBYyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDNUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDNUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTO2FBQ2hDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1QsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDO2dCQUUxQixNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQ1QsTUFBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEVBQ1osQ0FBQyxFQUNDLE9BQU8sRUFDUCxNQUFNLEVBQ04sV0FBVyxHQUtaLEVBQUUsRUFBRTt3QkFDSCxJQUFJLE9BQU8sRUFBRSxDQUFDOzRCQUNaLFdBQVcsR0FBRyxLQUFLLENBQUM7NEJBQ3BCLFNBQVMsR0FBRyxJQUFJLENBQUM7NEJBQ2pCLFlBQVksR0FBRyxLQUFLLENBQUM7NEJBQ3JCLGFBQWEsR0FBRyxJQUFJLENBQUM7NEJBQ3JCLFVBQVUsR0FBRyxJQUFJLENBQUM7NEJBRWxCLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUMvQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzNCLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUNqQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDbkMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7NEJBQy9ELHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNqQyxDQUFDOzZCQUFNLENBQUM7NEJBQ04sSUFBSSxhQUFhLEdBQUcsMEJBQTBCLE1BQU0sZ0NBQWdDLFdBQVcsRUFBRSxDQUFDOzRCQUNsRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7NEJBQ3hELFVBQVUsR0FBRyxLQUFLLENBQUM7d0JBQ3JCLENBQUM7d0JBRUQsT0FBTyxFQUFFLENBQUM7b0JBQ1osQ0FBQyxDQUNGLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDO29CQUNILElBQUksVUFBVSxJQUFJLGlCQUFpQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7d0JBQ3hELElBQUkscUJBQXFCLEtBQUssT0FBTyxFQUFFLENBQUM7NEJBQ3RDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRCxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTztZQUNULENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlEQUFpRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLENBQUM7SUFDSCxDQUFDO3VHQTVGVSxhQUFhOzJHQUFiLGFBQWEsY0FGWixNQUFNOzsyRkFFUCxhQUFhO2tCQUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlY29yZFBhdXNlVGltZXIgfSBmcm9tICcuL3JlY29yZC1wYXVzZS10aW1lci5zZXJ2aWNlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcFJlY29yZGluZ1BhcmFtZXRlcnMge1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IGFueTtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBzdGFydFJlcG9ydDogYm9vbGVhbjtcbiAgZW5kUmVwb3J0OiBib29sZWFuO1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIHJlY29yZFN0b3BwZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZVJlY29yZFBhdXNlZDogKHBhdXNlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkU3RvcHBlZDogKHN0b3BwZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVN0YXJ0UmVwb3J0OiAoc3RhcnRSZXBvcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUVuZFJlcG9ydDogKGVuZFJlcG9ydDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnM6IChzaG93OiBib29sZWFuKSA9PiB2b2lkO1xuICB3aGl0ZWJvYXJkU3RhcnRlZDogYm9vbGVhbjtcbiAgd2hpdGVib2FyZEVuZGVkOiBib29sZWFuO1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZztcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgY2FwdHVyZUNhbnZhc1N0cmVhbTogKG9wdGlvbnM6IHsgcGFyYW1ldGVyczogYW55OyBzdGFydD86IGJvb2xlYW4gfSkgPT4gdm9pZDtcblxuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcFJlY29yZGluZ09wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBTdG9wUmVjb3JkaW5nUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3RvcFJlY29yZGluZ1R5cGUgPSAob3B0aW9uczogU3RvcFJlY29yZGluZ09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU3RvcHMgdGhlIHJlY29yZGluZyBwcm9jZXNzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RvcFJlY29yZGluZ09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3RvcHBpbmcgdGhlIHJlY29yZGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3RvcHBpbmcgdGhlIHJlY29yZGluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB3aGVyZSB0aGUgcmVjb3JkaW5nIGlzIGJlaW5nIHN0b3BwZWQuXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zdGFydFJlcG9ydCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc3RhcnQgcmVwb3J0IGlzIGFjdGl2ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmVuZFJlcG9ydCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgZW5kIHJlcG9ydCBpcyBhY3RpdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdGFydGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRQYXVzZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyBpcyBwYXVzZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdG9wcGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSByZWNvcmRpbmcgaXMgc3RvcHBlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRQYXVzZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZCBwYXVzZWQgc3RhdHVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFN0b3BwZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZCBzdG9wcGVkIHN0YXR1cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTdGFydFJlcG9ydCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RhcnQgcmVwb3J0IHN0YXR1cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVFbmRSZXBvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGVuZCByZXBvcnQgc3RhdHVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHJlY29yZGluZyBidXR0b25zLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHdoaXRlYm9hcmQgaGFzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy53aGl0ZWJvYXJkRW5kZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHdoaXRlYm9hcmQgaGFzIGVuZGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUaGUgbWVkaWEgb3B0aW9ucyBmb3IgcmVjb3JkaW5nIChlLmcuLCBcInZpZGVvXCIsIFwiYXVkaW9cIikuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FwdHVyZUNhbnZhc1N0cmVhbSAtIEZ1bmN0aW9uIHRvIGNhcHR1cmUgdGhlIGNhbnZhcyBzdHJlYW0uXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcmVjb3JkaW5nIGlzIHN0b3BwZWQuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoaXMgbWV0aG9kIGNoZWNrcyBpZiB0aGUgcmVjb3JkaW5nIGhhcyBzdGFydGVkIGFuZCBpcyBub3QgYWxyZWFkeSBzdG9wcGVkLlxuICogSXQgcGF1c2VzIHRoZSB0aW1lciBhbmQgZW1pdHMgYSBzdG9wIHJlY29yZGluZyBldmVudCB2aWEgc29ja2V0IGNvbW11bmljYXRpb24uXG4gKiBJZiBzdWNjZXNzZnVsLCBpdCB1cGRhdGVzIHRoZSByZWNvcmRpbmcgc3RhdGUgYW5kIGFsZXJ0cyB0aGUgdXNlci5cbiAqIEFkZGl0aW9uYWxseSwgaWYgdGhlIHdoaXRlYm9hcmQgZmVhdHVyZSBpcyBhY3RpdmUsIGl0IGNhcHR1cmVzIHRoZSBjYW52YXMgc3RyZWFtLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBTdG9wUmVjb3JkaW5nT3B0aW9ucyA9IHsgcGFyYW1ldGVyczogc29tZVBhcmFtZXRlcnMgfTtcbiAqIGF3YWl0IHN0b3BSZWNvcmRpbmcob3B0aW9ucyk7XG4gKiBjb25zb2xlLmxvZygnUmVjb3JkaW5nIHN0b3BwZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RvcFJlY29yZGluZyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgUmVjb3JkUGF1c2VUaW1lclNlcnZpY2U6IFJlY29yZFBhdXNlVGltZXIpIHt9XG5cbiAgYXN5bmMgc3RvcFJlY29yZGluZyh7IHBhcmFtZXRlcnMgfTogU3RvcFJlY29yZGluZ09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQge1xuICAgICAgcm9vbU5hbWUsXG4gICAgICBzb2NrZXQsXG4gICAgICBzaG93QWxlcnQsXG4gICAgICBzdGFydFJlcG9ydCxcbiAgICAgIGVuZFJlcG9ydCxcbiAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRTdG9wcGVkLFxuICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkLFxuICAgICAgdXBkYXRlUmVjb3JkU3RvcHBlZCxcbiAgICAgIHVwZGF0ZVN0YXJ0UmVwb3J0LFxuICAgICAgdXBkYXRlRW5kUmVwb3J0LFxuICAgICAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMsXG5cbiAgICAgIHdoaXRlYm9hcmRTdGFydGVkLFxuICAgICAgd2hpdGVib2FyZEVuZGVkLFxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuXG4gICAgICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbSxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxldCByZWNBdHRlbXB0O1xuXG4gICAgaWYgKHJlY29yZFN0YXJ0ZWQgJiYgIXJlY29yZFN0b3BwZWQpIHtcbiAgICAgIGxldCBzdG9wID0gYXdhaXQgdGhpcy5SZWNvcmRQYXVzZVRpbWVyU2VydmljZS5yZWNvcmRQYXVzZVRpbWVyKHtcbiAgICAgICAgc3RvcDogdHJ1ZSxcbiAgICAgICAgaXNUaW1lclJ1bm5pbmc6IHBhcmFtZXRlcnNbJ2lzVGltZXJSdW5uaW5nJ10sXG4gICAgICAgIGNhblBhdXNlUmVzdW1lOiBwYXJhbWV0ZXJzWydjYW5QYXVzZVJlc3VtZSddLFxuICAgICAgICBzaG93QWxlcnQ6IHBhcmFtZXRlcnMuc2hvd0FsZXJ0LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdG9wKSB7XG4gICAgICAgIGxldCBhY3Rpb24gPSAnc3RvcFJlY29yZCc7XG5cbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIHsgcm9vbU5hbWUgfSxcbiAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MsXG4gICAgICAgICAgICAgIHJlYXNvbixcbiAgICAgICAgICAgICAgcmVjb3JkU3RhdGUsXG4gICAgICAgICAgICB9OiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgICAgICAgICAgIHJlYXNvbjogc3RyaW5nO1xuICAgICAgICAgICAgICByZWNvcmRTdGF0ZTogc3RyaW5nO1xuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHN0YXJ0UmVwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZW5kUmVwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWNvcmRQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZWNvcmRTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWNBdHRlbXB0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXJ0UmVwb3J0KHN0YXJ0UmVwb3J0KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVFbmRSZXBvcnQoZW5kUmVwb3J0KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVSZWNvcmRQYXVzZWQocmVjb3JkUGF1c2VkKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVSZWNvcmRTdG9wcGVkKHJlY29yZFN0b3BwZWQpO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHsgbWVzc2FnZTogJ1JlY29yZGluZyBTdG9wcGVkJywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKGZhbHNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVhc29uTWVzc2FnZSA9IGBSZWNvcmRpbmcgU3RvcCBGYWlsZWQ6ICR7cmVhc29ufTsgdGhlIHJlY29yZGluZyBpcyBjdXJyZW50bHkgJHtyZWNvcmRTdGF0ZX1gO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHsgbWVzc2FnZTogcmVhc29uTWVzc2FnZSwgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgICAgICAgICAgICAgcmVjQXR0ZW1wdCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChyZWNBdHRlbXB0ICYmIHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICAgIGlmIChyZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbSh7IHBhcmFtZXRlcnMsIHN0YXJ0OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNhcHR1cmluZyBjYW52YXMgc3RyZWFtOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdSZWNvcmRpbmcgaXMgbm90IHN0YXJ0ZWQgeWV0IG9yIGFscmVhZHkgc3RvcHBlZCcsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgIH1cbiAgfVxufVxuIl19