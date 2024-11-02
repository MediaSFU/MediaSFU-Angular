import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./record-update-timer.service";
/**
 * Resumes the recording timer if it is not already running and can be paused/resumed.
 *
 * @param {RecordResumeTimerOptions} options - The options for resuming the recording timer.
 * @param {Object} options.parameters - The parameters for the recording timer.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {boolean} options.parameters.isTimerRunning - Indicates if the timer is currently running.
 * @param {boolean} options.parameters.canPauseResume - Indicates if the timer can be paused/resumed.
 * @param {number} options.parameters.recordElapsedTime - The elapsed recording time in seconds.
 * @param {number} options.parameters.recordStartTime - The start time of the recording.
 * @param {NodeJS.Timeout | null} options.parameters.recordTimerInterval - The interval ID for the recording timer.
 * @param {Function} options.parameters.showAlert - Function to show an alert message.
 * @param {Function} options.parameters.updateRecordStartTime - Function to update the recording start time.
 * @param {Function} options.parameters.updateRecordTimerInterval - Function to update the recording timer interval.
 * @param {Function} options.parameters.updateIsTimerRunning - Function to update the timer running status.
 * @param {Function} options.parameters.updateCanPauseResume - Function to update the pause/resume status.
 *
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the timer was successfully resumed, otherwise false.
 *
 * @throws Will show an alert if the timer cannot be resumed due to conditions not being met.
 *
 * @example
 * ```typescript
 * const options: RecordResumeTimerOptions = {
 *   parameters: {
 *     isTimerRunning: false,
 *     canPauseResume: true,
 *     recordElapsedTime: 10,
 *     recordStartTime: Date.now(),
 *     recordTimerInterval: null,
 *     showAlert: (alert) => { },
 *     updateRecordStartTime: (time) => { },
 *     updateRecordTimerInterval: (interval) => { },
 *     updateIsTimerRunning: (isRunning) => { },
 *     updateCanPauseResume: (canPause) => {  },
 *     getUpdatedAllParams: () => ({  }),
 *   },
 * };
 * const canResume = await recordResumeTimer(options);
 * if (canResume) {
 *   // proceed with the resumed recording
 * }
 * ```
 */
export class RecordResumeTimer {
    RecordUpdateTimerService;
    constructor(RecordUpdateTimerService) {
        this.RecordUpdateTimerService = RecordUpdateTimerService;
    }
    /**
     * Resumes the recording timer if it is not already running and can be paused/resumed.
     *
     * @param {RecordResumeTimerOptions} options - The options for resuming the recording timer.
     * @param {Object} options.parameters - The parameters for the recording timer.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {boolean} options.parameters.isTimerRunning - Indicates if the timer is currently running.
     * @param {boolean} options.parameters.canPauseResume - Indicates if the timer can be paused/resumed.
     * @param {number} options.parameters.recordElapsedTime - The elapsed recording time in seconds.
     * @param {number} options.parameters.recordStartTime - The start time of the recording.
     * @param {number | null} options.parameters.recordTimerInterval - The interval ID for the recording timer.
     * @param {Function} options.parameters.showAlert - Function to show an alert message.
     * @param {Function} options.parameters.updateRecordStartTime - Function to update the recording start time.
     * @param {Function} options.parameters.updateRecordTimerInterval - Function to update the recording timer interval.
     * @param {Function} options.parameters.updateIsTimerRunning - Function to update the timer running status.
     * @param {Function} options.parameters.updateCanPauseResume - Function to update the pause/resume status.
     *
     * @returns {Promise<boolean>} - Returns a promise that resolves to true if the timer was successfully resumed, otherwise false.
     */
    recordResumeTimer = async ({ parameters }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { isTimerRunning, canPauseResume, recordElapsedTime, recordStartTime, recordTimerInterval, showAlert, updateRecordStartTime, updateRecordTimerInterval, updateIsTimerRunning, updateCanPauseResume,
        //mediasfu Functions
        // recordUpdateTimer,
         } = parameters;
        if (!isTimerRunning && canPauseResume) {
            recordStartTime = new Date().getTime() - recordElapsedTime * 1000; // Calculate the starting time based on elapsed time
            updateRecordStartTime(recordStartTime);
            recordTimerInterval = setInterval(() => {
                // Update the timer every second (1000 milliseconds)
                this.RecordUpdateTimerService.recordUpdateTimer({
                    recordElapsedTime: recordElapsedTime,
                    recordStartTime: recordStartTime,
                    updateRecordElapsedTime: parameters['updateRecordElapsedTime'],
                    updateRecordingProgressTime: parameters['updateRecordingProgressTime'],
                });
                parameters = getUpdatedAllParams();
                // Check if recording is paused or stopped, and close the interval if needed
                if (parameters['recordPaused'] ||
                    parameters['recordStopped'] ||
                    parameters['roomName'] == '' ||
                    parameters['roomName'] == null) {
                    if (recordTimerInterval != null) {
                        clearInterval(recordTimerInterval);
                    }
                    updateRecordTimerInterval(null);
                    isTimerRunning = false;
                    updateIsTimerRunning(isTimerRunning);
                    canPauseResume = false;
                    updateCanPauseResume(canPauseResume);
                }
            }, 1000);
            updateRecordTimerInterval(recordTimerInterval);
            isTimerRunning = true;
            updateIsTimerRunning(isTimerRunning);
            canPauseResume = false; // Disable pause/resume actions until paused again
            updateCanPauseResume(canPauseResume);
            return true;
        }
        else {
            showAlert?.({
                type: 'danger',
                message: 'Can only pause or resume after 15 seconds of starting or pausing or resuming recording',
            });
            return false;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordResumeTimer, deps: [{ token: i1.RecordUpdateTimer }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordResumeTimer, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordResumeTimer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.RecordUpdateTimer }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXJlc3VtZS10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvcmVjb3JkLXJlc3VtZS10aW1lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQTBCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFNSCxNQUFNLE9BQU8saUJBQWlCO0lBQ1I7SUFBcEIsWUFBb0Isd0JBQTJDO1FBQTNDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBbUI7SUFBRyxDQUFDO0lBRW5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFFSCxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQTRCLEVBQW9CLEVBQUU7UUFDdkYsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksRUFDRixjQUFjLEVBQ2QsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLFNBQVMsRUFDVCxxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLG9CQUFvQixFQUNwQixvQkFBb0I7UUFFcEIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtVQUN0QixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxFQUFFLENBQUM7WUFDdEMsZUFBZSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUMsb0RBQW9EO1lBQ3ZILHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JDLG9EQUFvRDtnQkFDcEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDO29CQUM5QyxpQkFBaUIsRUFBRSxpQkFBaUI7b0JBQ3BDLGVBQWUsRUFBRSxlQUFlO29CQUNoQyx1QkFBdUIsRUFBRSxVQUFVLENBQUMseUJBQXlCLENBQUM7b0JBQzlELDJCQUEyQixFQUFFLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQztpQkFDdkUsQ0FBQyxDQUFDO2dCQUVILFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO2dCQUVuQyw0RUFBNEU7Z0JBQzVFLElBQ0UsVUFBVSxDQUFDLGNBQWMsQ0FBQztvQkFDMUIsVUFBVSxDQUFDLGVBQWUsQ0FBQztvQkFDM0IsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7b0JBQzVCLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQzlCLENBQUM7b0JBQ0QsSUFBSSxtQkFBbUIsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDaEMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ3JDLENBQUM7b0JBQ0QseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNyQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUN2QixvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztZQUNILENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULHlCQUF5QixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDL0MsY0FBYyxHQUFHLElBQUksQ0FBQztZQUN0QixvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsa0RBQWtEO1lBQzFFLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQzthQUFNLENBQUM7WUFDTixTQUFTLEVBQUUsQ0FBQztnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQ0wsd0ZBQXdGO2FBQzNGLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F4RlMsaUJBQWlCOzJHQUFqQixpQkFBaUIsY0FGaEIsTUFBTTs7MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBSZWNvcmRVcGRhdGVUaW1lciB9IGZyb20gJy4vcmVjb3JkLXVwZGF0ZS10aW1lci5zZXJ2aWNlJztcbmV4cG9ydCBpbnRlcmZhY2UgUmVjb3JkUmVzdW1lVGltZXJQYXJhbWV0ZXJzIHtcbiAgaXNUaW1lclJ1bm5pbmc6IGJvb2xlYW47XG4gIGNhblBhdXNlUmVzdW1lOiBib29sZWFuO1xuICByZWNvcmRFbGFwc2VkVGltZTogbnVtYmVyO1xuICByZWNvcmRTdGFydFRpbWU6IG51bWJlcjtcbiAgcmVjb3JkVGltZXJJbnRlcnZhbD86IE5vZGVKUy5UaW1lb3V0IHwgbnVsbDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICB1cGRhdGVSZWNvcmRTdGFydFRpbWU6ICh0aW1lOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWw6IChpbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVJc1RpbWVyUnVubmluZzogKGlzUnVubmluZzogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ2FuUGF1c2VSZXN1bWU6IChjYW5QYXVzZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBSZWNvcmRSZXN1bWVUaW1lclBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWNvcmRSZXN1bWVUaW1lck9wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBSZWNvcmRSZXN1bWVUaW1lclBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlY29yZFJlc3VtZVRpbWVyVHlwZSA9IChvcHRpb25zOiBSZWNvcmRSZXN1bWVUaW1lck9wdGlvbnMpID0+IFByb21pc2U8Ym9vbGVhbj47XG5cbi8qKlxuICogUmVzdW1lcyB0aGUgcmVjb3JkaW5nIHRpbWVyIGlmIGl0IGlzIG5vdCBhbHJlYWR5IHJ1bm5pbmcgYW5kIGNhbiBiZSBwYXVzZWQvcmVzdW1lZC5cbiAqXG4gKiBAcGFyYW0ge1JlY29yZFJlc3VtZVRpbWVyT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZXN1bWluZyB0aGUgcmVjb3JkaW5nIHRpbWVyLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgcmVjb3JkaW5nIHRpbWVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuaXNUaW1lclJ1bm5pbmcgLSBJbmRpY2F0ZXMgaWYgdGhlIHRpbWVyIGlzIGN1cnJlbnRseSBydW5uaW5nLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FuUGF1c2VSZXN1bWUgLSBJbmRpY2F0ZXMgaWYgdGhlIHRpbWVyIGNhbiBiZSBwYXVzZWQvcmVzdW1lZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkRWxhcHNlZFRpbWUgLSBUaGUgZWxhcHNlZCByZWNvcmRpbmcgdGltZSBpbiBzZWNvbmRzLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdGFydFRpbWUgLSBUaGUgc3RhcnQgdGltZSBvZiB0aGUgcmVjb3JkaW5nLlxuICogQHBhcmFtIHtOb2RlSlMuVGltZW91dCB8IG51bGx9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRUaW1lckludGVydmFsIC0gVGhlIGludGVydmFsIElEIGZvciB0aGUgcmVjb3JkaW5nIHRpbWVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRTdGFydFRpbWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZGluZyBzdGFydCB0aW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZGluZyB0aW1lciBpbnRlcnZhbC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc1RpbWVyUnVubmluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdGltZXIgcnVubmluZyBzdGF0dXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2FuUGF1c2VSZXN1bWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHBhdXNlL3Jlc3VtZSBzdGF0dXMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IC0gUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSB0aW1lciB3YXMgc3VjY2Vzc2Z1bGx5IHJlc3VtZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgc2hvdyBhbiBhbGVydCBpZiB0aGUgdGltZXIgY2Fubm90IGJlIHJlc3VtZWQgZHVlIHRvIGNvbmRpdGlvbnMgbm90IGJlaW5nIG1ldC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9uczogUmVjb3JkUmVzdW1lVGltZXJPcHRpb25zID0ge1xuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgaXNUaW1lclJ1bm5pbmc6IGZhbHNlLFxuICogICAgIGNhblBhdXNlUmVzdW1lOiB0cnVlLFxuICogICAgIHJlY29yZEVsYXBzZWRUaW1lOiAxMCxcbiAqICAgICByZWNvcmRTdGFydFRpbWU6IERhdGUubm93KCksXG4gKiAgICAgcmVjb3JkVGltZXJJbnRlcnZhbDogbnVsbCxcbiAqICAgICBzaG93QWxlcnQ6IChhbGVydCkgPT4geyB9LFxuICogICAgIHVwZGF0ZVJlY29yZFN0YXJ0VGltZTogKHRpbWUpID0+IHsgfSxcbiAqICAgICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsOiAoaW50ZXJ2YWwpID0+IHsgfSxcbiAqICAgICB1cGRhdGVJc1RpbWVyUnVubmluZzogKGlzUnVubmluZykgPT4geyB9LFxuICogICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lOiAoY2FuUGF1c2UpID0+IHsgIH0sXG4gKiAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gKHsgIH0pLFxuICogICB9LFxuICogfTtcbiAqIGNvbnN0IGNhblJlc3VtZSA9IGF3YWl0IHJlY29yZFJlc3VtZVRpbWVyKG9wdGlvbnMpO1xuICogaWYgKGNhblJlc3VtZSkge1xuICogICAvLyBwcm9jZWVkIHdpdGggdGhlIHJlc3VtZWQgcmVjb3JkaW5nXG4gKiB9XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZWNvcmRSZXN1bWVUaW1lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgUmVjb3JkVXBkYXRlVGltZXJTZXJ2aWNlOiBSZWNvcmRVcGRhdGVUaW1lcikge31cblxuICAvKipcbiAgICogUmVzdW1lcyB0aGUgcmVjb3JkaW5nIHRpbWVyIGlmIGl0IGlzIG5vdCBhbHJlYWR5IHJ1bm5pbmcgYW5kIGNhbiBiZSBwYXVzZWQvcmVzdW1lZC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRSZXN1bWVUaW1lck9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVzdW1pbmcgdGhlIHJlY29yZGluZyB0aW1lci5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgcmVjb3JkaW5nIHRpbWVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzVGltZXJSdW5uaW5nIC0gSW5kaWNhdGVzIGlmIHRoZSB0aW1lciBpcyBjdXJyZW50bHkgcnVubmluZy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FuUGF1c2VSZXN1bWUgLSBJbmRpY2F0ZXMgaWYgdGhlIHRpbWVyIGNhbiBiZSBwYXVzZWQvcmVzdW1lZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRFbGFwc2VkVGltZSAtIFRoZSBlbGFwc2VkIHJlY29yZGluZyB0aW1lIGluIHNlY29uZHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRUaW1lIC0gVGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkVGltZXJJbnRlcnZhbCAtIFRoZSBpbnRlcnZhbCBJRCBmb3IgdGhlIHJlY29yZGluZyB0aW1lci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFN0YXJ0VGltZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkaW5nIHN0YXJ0IHRpbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRUaW1lckludGVydmFsIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmRpbmcgdGltZXIgaW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc1RpbWVyUnVubmluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdGltZXIgcnVubmluZyBzdGF0dXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVDYW5QYXVzZVJlc3VtZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcGF1c2UvcmVzdW1lIHN0YXR1cy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IC0gUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSB0aW1lciB3YXMgc3VjY2Vzc2Z1bGx5IHJlc3VtZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICovXG5cbiAgcmVjb3JkUmVzdW1lVGltZXIgPSBhc3luYyAoeyBwYXJhbWV0ZXJzIH06IFJlY29yZFJlc3VtZVRpbWVyT3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICBpc1RpbWVyUnVubmluZyxcbiAgICAgIGNhblBhdXNlUmVzdW1lLFxuICAgICAgcmVjb3JkRWxhcHNlZFRpbWUsXG4gICAgICByZWNvcmRTdGFydFRpbWUsXG4gICAgICByZWNvcmRUaW1lckludGVydmFsLFxuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lLFxuICAgICAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbCxcbiAgICAgIHVwZGF0ZUlzVGltZXJSdW5uaW5nLFxuICAgICAgdXBkYXRlQ2FuUGF1c2VSZXN1bWUsXG5cbiAgICAgIC8vbWVkaWFzZnUgRnVuY3Rpb25zXG4gICAgICAvLyByZWNvcmRVcGRhdGVUaW1lcixcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGlmICghaXNUaW1lclJ1bm5pbmcgJiYgY2FuUGF1c2VSZXN1bWUpIHtcbiAgICAgIHJlY29yZFN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gcmVjb3JkRWxhcHNlZFRpbWUgKiAxMDAwOyAvLyBDYWxjdWxhdGUgdGhlIHN0YXJ0aW5nIHRpbWUgYmFzZWQgb24gZWxhcHNlZCB0aW1lXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydFRpbWUocmVjb3JkU3RhcnRUaW1lKTtcbiAgICAgIHJlY29yZFRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXIgZXZlcnkgc2Vjb25kICgxMDAwIG1pbGxpc2Vjb25kcylcbiAgICAgICAgdGhpcy5SZWNvcmRVcGRhdGVUaW1lclNlcnZpY2UucmVjb3JkVXBkYXRlVGltZXIoe1xuICAgICAgICAgIHJlY29yZEVsYXBzZWRUaW1lOiByZWNvcmRFbGFwc2VkVGltZSxcbiAgICAgICAgICByZWNvcmRTdGFydFRpbWU6IHJlY29yZFN0YXJ0VGltZSxcbiAgICAgICAgICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZTogcGFyYW1ldGVyc1sndXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUnXSxcbiAgICAgICAgICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHBhcmFtZXRlcnNbJ3VwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZSddLFxuICAgICAgICB9KTtcblxuICAgICAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHJlY29yZGluZyBpcyBwYXVzZWQgb3Igc3RvcHBlZCwgYW5kIGNsb3NlIHRoZSBpbnRlcnZhbCBpZiBuZWVkZWRcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBhcmFtZXRlcnNbJ3JlY29yZFBhdXNlZCddIHx8XG4gICAgICAgICAgcGFyYW1ldGVyc1sncmVjb3JkU3RvcHBlZCddIHx8XG4gICAgICAgICAgcGFyYW1ldGVyc1sncm9vbU5hbWUnXSA9PSAnJyB8fFxuICAgICAgICAgIHBhcmFtZXRlcnNbJ3Jvb21OYW1lJ10gPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAocmVjb3JkVGltZXJJbnRlcnZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHJlY29yZFRpbWVySW50ZXJ2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsKG51bGwpO1xuICAgICAgICAgIGlzVGltZXJSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgdXBkYXRlSXNUaW1lclJ1bm5pbmcoaXNUaW1lclJ1bm5pbmcpO1xuICAgICAgICAgIGNhblBhdXNlUmVzdW1lID0gZmFsc2U7XG4gICAgICAgICAgdXBkYXRlQ2FuUGF1c2VSZXN1bWUoY2FuUGF1c2VSZXN1bWUpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICAgIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwocmVjb3JkVGltZXJJbnRlcnZhbCk7XG4gICAgICBpc1RpbWVyUnVubmluZyA9IHRydWU7XG4gICAgICB1cGRhdGVJc1RpbWVyUnVubmluZyhpc1RpbWVyUnVubmluZyk7XG4gICAgICBjYW5QYXVzZVJlc3VtZSA9IGZhbHNlOyAvLyBEaXNhYmxlIHBhdXNlL3Jlc3VtZSBhY3Rpb25zIHVudGlsIHBhdXNlZCBhZ2FpblxuICAgICAgdXBkYXRlQ2FuUGF1c2VSZXN1bWUoY2FuUGF1c2VSZXN1bWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgJ0NhbiBvbmx5IHBhdXNlIG9yIHJlc3VtZSBhZnRlciAxNSBzZWNvbmRzIG9mIHN0YXJ0aW5nIG9yIHBhdXNpbmcgb3IgcmVzdW1pbmcgcmVjb3JkaW5nJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==