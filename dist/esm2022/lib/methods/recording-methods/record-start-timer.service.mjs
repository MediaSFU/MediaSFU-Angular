import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./record-update-timer.service";
export class RecordStartTimer {
    RecordUpdateTimerService;
    constructor(RecordUpdateTimerService) {
        this.RecordUpdateTimerService = RecordUpdateTimerService;
    }
    /**
     * Starts the recording timer.
     * @function
     * @param {RecordStartTimerOptions} options - The options object containing necessary variables and functions.
     */
    /**
     * Starts a recording timer and manages its state.
     *
     * @param {RecordStartTimerOptions} options - The options for starting the recording timer.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {number} options.parameters.recordStartTime - The start time of the recording.
     * @param {number | null} options.parameters.recordTimerInterval - The interval ID for the recording timer.
     * @param {boolean} options.parameters.isTimerRunning - Flag indicating if the timer is running.
     * @param {boolean} options.parameters.canPauseResume - Flag indicating if pause/resume actions are enabled.
     * @param {number} options.parameters.recordChangeSeconds - The time after which pause/resume actions are enabled.
     * @param {Function} options.parameters.updateRecordStartTime - Function to update the recording start time.
     * @param {Function} options.parameters.updateRecordTimerInterval - Function to update the recording timer interval.
     * @param {Function} options.parameters.updateIsTimerRunning - Function to update the timer running state.
     * @param {Function} options.parameters.updateCanPauseResume - Function to update the pause/resume state.
     *
     * @returns {Promise<void>} A promise that resolves when the timer is started.
     *
     * @remarks
     * This function initializes the recording start time and sets up an interval to update the timer every second.
     * It also manages the state of the timer, including enabling and disabling pause/resume actions.
     * The timer is stopped if the recording is paused, stopped, or if the room name is invalid.
     */
    recordStartTimer = async ({ parameters }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { recordStartTime, recordTimerInterval, isTimerRunning, canPauseResume, recordChangeSeconds, updateRecordStartTime, updateRecordTimerInterval, updateIsTimerRunning, updateCanPauseResume, } = parameters;
        /**
         * Utility function to enable pause/resume actions after a specified time.
         */
        function enablePauseResume() {
            canPauseResume = true;
            updateCanPauseResume(canPauseResume);
        }
        if (!isTimerRunning) {
            recordStartTime = new Date().getTime(); // Get the current timestamp
            updateRecordStartTime(recordStartTime);
            recordTimerInterval = setInterval(() => {
                // Update the timer every second (1000 milliseconds)
                this.RecordUpdateTimerService.recordUpdateTimer({
                    recordElapsedTime: parameters.recordElapsedTime,
                    recordStartTime: recordStartTime,
                    updateRecordElapsedTime: parameters.updateRecordElapsedTime,
                    updateRecordingProgressTime: parameters.updateRecordingProgressTime,
                });
                parameters = getUpdatedAllParams();
                // Check if recording is paused or stopped, and close the interval if needed
                if (parameters.recordPaused ||
                    parameters.recordStopped ||
                    parameters.roomName == '' ||
                    parameters.roomName == null) {
                    clearInterval(recordTimerInterval);
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
            canPauseResume = false; // Disable pause/resume actions initially
            updateCanPauseResume(canPauseResume);
            setTimeout(enablePauseResume, recordChangeSeconds); // Enable pause/resume actions after specified time
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordStartTimer, deps: [{ token: i1.RecordUpdateTimer }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordStartTimer, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordStartTimer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.RecordUpdateTimer }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXN0YXJ0LXRpbWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9yZWNvcmQtc3RhcnQtdGltZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFnQzNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDUDtJQUFwQixZQUFvQix3QkFBMkM7UUFBM0MsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFtQjtJQUFHLENBQUM7SUFFbkU7Ozs7T0FJRztJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFFSCxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQXVCLEVBQWlCLEVBQUU7UUFDOUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksRUFDRixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxjQUFjLEVBQ2QsbUJBQW1CLEVBRW5CLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIsb0JBQW9CLEVBQ3BCLG9CQUFvQixHQUNyQixHQUFHLFVBQVUsQ0FBQztRQUVmOztXQUVHO1FBQ0gsU0FBUyxpQkFBaUI7WUFDeEIsY0FBYyxHQUFHLElBQUksQ0FBQztZQUN0QixvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLGVBQWUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsNEJBQTRCO1lBQ3BFLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JDLG9EQUFvRDtnQkFDcEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDO29CQUM5QyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsaUJBQWlCO29CQUMvQyxlQUFlLEVBQUUsZUFBZTtvQkFDaEMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLHVCQUF1QjtvQkFDM0QsMkJBQTJCLEVBQUUsVUFBVSxDQUFDLDJCQUEyQjtpQkFDcEUsQ0FBQyxDQUFDO2dCQUVILFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO2dCQUVuQyw0RUFBNEU7Z0JBQzVFLElBQ0UsVUFBVSxDQUFDLFlBQVk7b0JBQ3ZCLFVBQVUsQ0FBQyxhQUFhO29CQUN4QixVQUFVLENBQUMsUUFBUSxJQUFJLEVBQUU7b0JBQ3pCLFVBQVUsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUMzQixDQUFDO29CQUNELGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNuQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEMsY0FBYyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3JDLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QseUJBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5Q0FBeUM7WUFDakUsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxtREFBbUQ7UUFDekcsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E1RlMsZ0JBQWdCOzJHQUFoQixnQkFBZ0IsY0FGZixNQUFNOzsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVjb3JkVXBkYXRlVGltZXIgfSBmcm9tICcuL3JlY29yZC11cGRhdGUtdGltZXIuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjb3JkU3RhcnRUaW1lclBhcmFtZXRlcnMge1xuICByZWNvcmRTdGFydFRpbWU6IG51bWJlcjtcbiAgcmVjb3JkVGltZXJJbnRlcnZhbD86IE5vZGVKUy5UaW1lb3V0IHwgbnVsbDtcbiAgaXNUaW1lclJ1bm5pbmc6IGJvb2xlYW47XG4gIGNhblBhdXNlUmVzdW1lOiBib29sZWFuO1xuICByZWNvcmRDaGFuZ2VTZWNvbmRzOiBudW1iZXI7XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcm9vbU5hbWU6IHN0cmluZyB8IG51bGw7XG4gIHVwZGF0ZVJlY29yZFN0YXJ0VGltZTogKHRpbWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbDogKGludGVydmFsOiBOb2RlSlMuVGltZW91dCB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzVGltZXJSdW5uaW5nOiAoaXNSdW5uaW5nOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDYW5QYXVzZVJlc3VtZTogKGNhblBhdXNlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIE1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBSZWNvcmRTdGFydFRpbWVyUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZFN0YXJ0VGltZXJPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogUmVjb3JkU3RhcnRUaW1lclBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlY29yZFN0YXJ0VGltZXJUeXBlID0gKG9wdGlvbnM6IFJlY29yZFN0YXJ0VGltZXJPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVjb3JkU3RhcnRUaW1lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgUmVjb3JkVXBkYXRlVGltZXJTZXJ2aWNlOiBSZWNvcmRVcGRhdGVUaW1lcikge31cblxuICAvKipcbiAgICogU3RhcnRzIHRoZSByZWNvcmRpbmcgdGltZXIuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1JlY29yZFN0YXJ0VGltZXJPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgbmVjZXNzYXJ5IHZhcmlhYmxlcyBhbmQgZnVuY3Rpb25zLlxuICAgKi9cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHJlY29yZGluZyB0aW1lciBhbmQgbWFuYWdlcyBpdHMgc3RhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVjb3JkU3RhcnRUaW1lck9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3RhcnRpbmcgdGhlIHJlY29yZGluZyB0aW1lci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0YXJ0VGltZSAtIFRoZSBzdGFydCB0aW1lIG9mIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFRpbWVySW50ZXJ2YWwgLSBUaGUgaW50ZXJ2YWwgSUQgZm9yIHRoZSByZWNvcmRpbmcgdGltZXIuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzVGltZXJSdW5uaW5nIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB0aW1lciBpcyBydW5uaW5nLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5jYW5QYXVzZVJlc3VtZSAtIEZsYWcgaW5kaWNhdGluZyBpZiBwYXVzZS9yZXN1bWUgYWN0aW9ucyBhcmUgZW5hYmxlZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRDaGFuZ2VTZWNvbmRzIC0gVGhlIHRpbWUgYWZ0ZXIgd2hpY2ggcGF1c2UvcmVzdW1lIGFjdGlvbnMgYXJlIGVuYWJsZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRTdGFydFRpbWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlY29yZGluZyBzdGFydCB0aW1lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkaW5nIHRpbWVyIGludGVydmFsLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSXNUaW1lclJ1bm5pbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHRpbWVyIHJ1bm5pbmcgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVDYW5QYXVzZVJlc3VtZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcGF1c2UvcmVzdW1lIHN0YXRlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgdGltZXIgaXMgc3RhcnRlZC5cbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgcmVjb3JkaW5nIHN0YXJ0IHRpbWUgYW5kIHNldHMgdXAgYW4gaW50ZXJ2YWwgdG8gdXBkYXRlIHRoZSB0aW1lciBldmVyeSBzZWNvbmQuXG4gICAqIEl0IGFsc28gbWFuYWdlcyB0aGUgc3RhdGUgb2YgdGhlIHRpbWVyLCBpbmNsdWRpbmcgZW5hYmxpbmcgYW5kIGRpc2FibGluZyBwYXVzZS9yZXN1bWUgYWN0aW9ucy5cbiAgICogVGhlIHRpbWVyIGlzIHN0b3BwZWQgaWYgdGhlIHJlY29yZGluZyBpcyBwYXVzZWQsIHN0b3BwZWQsIG9yIGlmIHRoZSByb29tIG5hbWUgaXMgaW52YWxpZC5cbiAgICovXG5cbiAgcmVjb3JkU3RhcnRUaW1lciA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogeyBwYXJhbWV0ZXJzOiBhbnkgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICByZWNvcmRTdGFydFRpbWUsXG4gICAgICByZWNvcmRUaW1lckludGVydmFsLFxuICAgICAgaXNUaW1lclJ1bm5pbmcsXG4gICAgICBjYW5QYXVzZVJlc3VtZSxcbiAgICAgIHJlY29yZENoYW5nZVNlY29uZHMsXG5cbiAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0VGltZSxcbiAgICAgIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwsXG4gICAgICB1cGRhdGVJc1RpbWVyUnVubmluZyxcbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBmdW5jdGlvbiB0byBlbmFibGUgcGF1c2UvcmVzdW1lIGFjdGlvbnMgYWZ0ZXIgYSBzcGVjaWZpZWQgdGltZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlbmFibGVQYXVzZVJlc3VtZSgpIHtcbiAgICAgIGNhblBhdXNlUmVzdW1lID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lKGNhblBhdXNlUmVzdW1lKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVGltZXJSdW5uaW5nKSB7XG4gICAgICByZWNvcmRTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWVzdGFtcFxuICAgICAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lKHJlY29yZFN0YXJ0VGltZSk7XG4gICAgICByZWNvcmRUaW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHRpbWVyIGV2ZXJ5IHNlY29uZCAoMTAwMCBtaWxsaXNlY29uZHMpXG4gICAgICAgIHRoaXMuUmVjb3JkVXBkYXRlVGltZXJTZXJ2aWNlLnJlY29yZFVwZGF0ZVRpbWVyKHtcbiAgICAgICAgICByZWNvcmRFbGFwc2VkVGltZTogcGFyYW1ldGVycy5yZWNvcmRFbGFwc2VkVGltZSxcbiAgICAgICAgICByZWNvcmRTdGFydFRpbWU6IHJlY29yZFN0YXJ0VGltZSxcbiAgICAgICAgICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZTogcGFyYW1ldGVycy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSxcbiAgICAgICAgICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLFxuICAgICAgICB9KTtcblxuICAgICAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHJlY29yZGluZyBpcyBwYXVzZWQgb3Igc3RvcHBlZCwgYW5kIGNsb3NlIHRoZSBpbnRlcnZhbCBpZiBuZWVkZWRcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBhcmFtZXRlcnMucmVjb3JkUGF1c2VkIHx8XG4gICAgICAgICAgcGFyYW1ldGVycy5yZWNvcmRTdG9wcGVkIHx8XG4gICAgICAgICAgcGFyYW1ldGVycy5yb29tTmFtZSA9PSAnJyB8fFxuICAgICAgICAgIHBhcmFtZXRlcnMucm9vbU5hbWUgPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHJlY29yZFRpbWVySW50ZXJ2YWwpO1xuICAgICAgICAgIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwobnVsbCk7XG4gICAgICAgICAgaXNUaW1lclJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICB1cGRhdGVJc1RpbWVyUnVubmluZyhpc1RpbWVyUnVubmluZyk7XG4gICAgICAgICAgY2FuUGF1c2VSZXN1bWUgPSBmYWxzZTtcbiAgICAgICAgICB1cGRhdGVDYW5QYXVzZVJlc3VtZShjYW5QYXVzZVJlc3VtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwMDApO1xuICAgICAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbChyZWNvcmRUaW1lckludGVydmFsKTtcbiAgICAgIGlzVGltZXJSdW5uaW5nID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZUlzVGltZXJSdW5uaW5nKGlzVGltZXJSdW5uaW5nKTtcbiAgICAgIGNhblBhdXNlUmVzdW1lID0gZmFsc2U7IC8vIERpc2FibGUgcGF1c2UvcmVzdW1lIGFjdGlvbnMgaW5pdGlhbGx5XG4gICAgICB1cGRhdGVDYW5QYXVzZVJlc3VtZShjYW5QYXVzZVJlc3VtZSk7XG4gICAgICBzZXRUaW1lb3V0KGVuYWJsZVBhdXNlUmVzdW1lLCByZWNvcmRDaGFuZ2VTZWNvbmRzKTsgLy8gRW5hYmxlIHBhdXNlL3Jlc3VtZSBhY3Rpb25zIGFmdGVyIHNwZWNpZmllZCB0aW1lXG4gICAgfVxuICB9O1xufVxuIl19