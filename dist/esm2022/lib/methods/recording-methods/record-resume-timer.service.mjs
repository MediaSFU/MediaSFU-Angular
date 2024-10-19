import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./record-update-timer.service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXJlc3VtZS10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvcmVjb3JkLXJlc3VtZS10aW1lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQTZCM0MsTUFBTSxPQUFPLGlCQUFpQjtJQUNSO0lBQXBCLFlBQW9CLHdCQUEyQztRQUEzQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO0lBQUcsQ0FBQztJQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBRUgsaUJBQWlCLEdBQUcsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUE0QixFQUFvQixFQUFFO1FBQ3ZGLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLEVBQ0YsY0FBYyxFQUNkLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixTQUFTLEVBQ1QscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6QixvQkFBb0IsRUFDcEIsb0JBQW9CO1FBRXBCLG9CQUFvQjtRQUNwQixxQkFBcUI7VUFDdEIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3RDLGVBQWUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLGlCQUFpQixHQUFHLElBQUksQ0FBQyxDQUFDLG9EQUFvRDtZQUN2SCxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2QyxtQkFBbUIsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNyQyxvREFBb0Q7Z0JBQ3BELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDOUMsaUJBQWlCLEVBQUUsaUJBQWlCO29CQUNwQyxlQUFlLEVBQUUsZUFBZTtvQkFDaEMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLHlCQUF5QixDQUFDO29CQUM5RCwyQkFBMkIsRUFBRSxVQUFVLENBQUMsNkJBQTZCLENBQUM7aUJBQ3ZFLENBQUMsQ0FBQztnQkFFSCxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztnQkFFbkMsNEVBQTRFO2dCQUM1RSxJQUNFLFVBQVUsQ0FBQyxjQUFjLENBQUM7b0JBQzFCLFVBQVUsQ0FBQyxlQUFlLENBQUM7b0JBQzNCLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO29CQUM1QixVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUM5QixDQUFDO29CQUNELElBQUksbUJBQW1CLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ2hDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNyQyxDQUFDO29CQUNELHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUN2QixvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDckMsY0FBYyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCx5QkFBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQy9DLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDdEIsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLGtEQUFrRDtZQUMxRSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7YUFBTSxDQUFDO1lBQ04sU0FBUyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUNMLHdGQUF3RjthQUMzRixDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBeEZTLGlCQUFpQjsyR0FBakIsaUJBQWlCLGNBRmhCLE1BQU07OzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgUmVjb3JkVXBkYXRlVGltZXIgfSBmcm9tICcuL3JlY29yZC11cGRhdGUtdGltZXIuc2VydmljZSc7XG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZFJlc3VtZVRpbWVyUGFyYW1ldGVycyB7XG4gIGlzVGltZXJSdW5uaW5nOiBib29sZWFuO1xuICBjYW5QYXVzZVJlc3VtZTogYm9vbGVhbjtcbiAgcmVjb3JkRWxhcHNlZFRpbWU6IG51bWJlcjtcbiAgcmVjb3JkU3RhcnRUaW1lOiBudW1iZXI7XG4gIHJlY29yZFRpbWVySW50ZXJ2YWw/OiBOb2RlSlMuVGltZW91dCB8IG51bGw7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lOiAodGltZTogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsOiAoaW50ZXJ2YWw6IE5vZGVKUy5UaW1lb3V0IHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlSXNUaW1lclJ1bm5pbmc6IChpc1J1bm5pbmc6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUNhblBhdXNlUmVzdW1lOiAoY2FuUGF1c2U6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUmVjb3JkUmVzdW1lVGltZXJQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjb3JkUmVzdW1lVGltZXJPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogUmVjb3JkUmVzdW1lVGltZXJQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZWNvcmRSZXN1bWVUaW1lclR5cGUgPSAob3B0aW9uczogUmVjb3JkUmVzdW1lVGltZXJPcHRpb25zKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVjb3JkUmVzdW1lVGltZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIFJlY29yZFVwZGF0ZVRpbWVyU2VydmljZTogUmVjb3JkVXBkYXRlVGltZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlc3VtZXMgdGhlIHJlY29yZGluZyB0aW1lciBpZiBpdCBpcyBub3QgYWxyZWFkeSBydW5uaW5nIGFuZCBjYW4gYmUgcGF1c2VkL3Jlc3VtZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkUmVzdW1lVGltZXJPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlc3VtaW5nIHRoZSByZWNvcmRpbmcgdGltZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIHJlY29yZGluZyB0aW1lci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5pc1RpbWVyUnVubmluZyAtIEluZGljYXRlcyBpZiB0aGUgdGltZXIgaXMgY3VycmVudGx5IHJ1bm5pbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNhblBhdXNlUmVzdW1lIC0gSW5kaWNhdGVzIGlmIHRoZSB0aW1lciBjYW4gYmUgcGF1c2VkL3Jlc3VtZWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkRWxhcHNlZFRpbWUgLSBUaGUgZWxhcHNlZCByZWNvcmRpbmcgdGltZSBpbiBzZWNvbmRzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0YXJ0VGltZSAtIFRoZSBzdGFydCB0aW1lIG9mIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFRpbWVySW50ZXJ2YWwgLSBUaGUgaW50ZXJ2YWwgSUQgZm9yIHRoZSByZWNvcmRpbmcgdGltZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFuIGFsZXJ0IG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRTdGFydFRpbWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZGluZyBzdGFydCB0aW1lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkaW5nIHRpbWVyIGludGVydmFsLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSXNUaW1lclJ1bm5pbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHRpbWVyIHJ1bm5pbmcgc3RhdHVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2FuUGF1c2VSZXN1bWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHBhdXNlL3Jlc3VtZSBzdGF0dXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSAtIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgdGltZXIgd2FzIHN1Y2Nlc3NmdWxseSByZXN1bWVkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAqL1xuXG4gIHJlY29yZFJlc3VtZVRpbWVyID0gYXN5bmMgKHsgcGFyYW1ldGVycyB9OiBSZWNvcmRSZXN1bWVUaW1lck9wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgaXNUaW1lclJ1bm5pbmcsXG4gICAgICBjYW5QYXVzZVJlc3VtZSxcbiAgICAgIHJlY29yZEVsYXBzZWRUaW1lLFxuICAgICAgcmVjb3JkU3RhcnRUaW1lLFxuICAgICAgcmVjb3JkVGltZXJJbnRlcnZhbCxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0VGltZSxcbiAgICAgIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwsXG4gICAgICB1cGRhdGVJc1RpbWVyUnVubmluZyxcbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lLFxuXG4gICAgICAvL21lZGlhc2Z1IEZ1bmN0aW9uc1xuICAgICAgLy8gcmVjb3JkVXBkYXRlVGltZXIsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBpZiAoIWlzVGltZXJSdW5uaW5nICYmIGNhblBhdXNlUmVzdW1lKSB7XG4gICAgICByZWNvcmRTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHJlY29yZEVsYXBzZWRUaW1lICogMTAwMDsgLy8gQ2FsY3VsYXRlIHRoZSBzdGFydGluZyB0aW1lIGJhc2VkIG9uIGVsYXBzZWQgdGltZVxuICAgICAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lKHJlY29yZFN0YXJ0VGltZSk7XG4gICAgICByZWNvcmRUaW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHRpbWVyIGV2ZXJ5IHNlY29uZCAoMTAwMCBtaWxsaXNlY29uZHMpXG4gICAgICAgIHRoaXMuUmVjb3JkVXBkYXRlVGltZXJTZXJ2aWNlLnJlY29yZFVwZGF0ZVRpbWVyKHtcbiAgICAgICAgICByZWNvcmRFbGFwc2VkVGltZTogcmVjb3JkRWxhcHNlZFRpbWUsXG4gICAgICAgICAgcmVjb3JkU3RhcnRUaW1lOiByZWNvcmRTdGFydFRpbWUsXG4gICAgICAgICAgdXBkYXRlUmVjb3JkRWxhcHNlZFRpbWU6IHBhcmFtZXRlcnNbJ3VwZGF0ZVJlY29yZEVsYXBzZWRUaW1lJ10sXG4gICAgICAgICAgdXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiBwYXJhbWV0ZXJzWyd1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUnXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgICAvLyBDaGVjayBpZiByZWNvcmRpbmcgaXMgcGF1c2VkIG9yIHN0b3BwZWQsIGFuZCBjbG9zZSB0aGUgaW50ZXJ2YWwgaWYgbmVlZGVkXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwYXJhbWV0ZXJzWydyZWNvcmRQYXVzZWQnXSB8fFxuICAgICAgICAgIHBhcmFtZXRlcnNbJ3JlY29yZFN0b3BwZWQnXSB8fFxuICAgICAgICAgIHBhcmFtZXRlcnNbJ3Jvb21OYW1lJ10gPT0gJycgfHxcbiAgICAgICAgICBwYXJhbWV0ZXJzWydyb29tTmFtZSddID09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHJlY29yZFRpbWVySW50ZXJ2YWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWNvcmRUaW1lckludGVydmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbChudWxsKTtcbiAgICAgICAgICBpc1RpbWVyUnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgIHVwZGF0ZUlzVGltZXJSdW5uaW5nKGlzVGltZXJSdW5uaW5nKTtcbiAgICAgICAgICBjYW5QYXVzZVJlc3VtZSA9IGZhbHNlO1xuICAgICAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lKGNhblBhdXNlUmVzdW1lKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsKHJlY29yZFRpbWVySW50ZXJ2YWwpO1xuICAgICAgaXNUaW1lclJ1bm5pbmcgPSB0cnVlO1xuICAgICAgdXBkYXRlSXNUaW1lclJ1bm5pbmcoaXNUaW1lclJ1bm5pbmcpO1xuICAgICAgY2FuUGF1c2VSZXN1bWUgPSBmYWxzZTsgLy8gRGlzYWJsZSBwYXVzZS9yZXN1bWUgYWN0aW9ucyB1bnRpbCBwYXVzZWQgYWdhaW5cbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lKGNhblBhdXNlUmVzdW1lKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICdDYW4gb25seSBwYXVzZSBvciByZXN1bWUgYWZ0ZXIgMTUgc2Vjb25kcyBvZiBzdGFydGluZyBvciBwYXVzaW5nIG9yIHJlc3VtaW5nIHJlY29yZGluZycsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59XG4iXX0=