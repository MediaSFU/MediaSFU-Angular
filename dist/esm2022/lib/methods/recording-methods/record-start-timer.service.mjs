import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./record-update-timer.service";
/**
 * Starts the recording timer and manages its state.
 *
 * @param {RecordStartTimerOptions} options - The options for starting the recording timer.
 * @param {Object} options.parameters - The parameters for the recording timer.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {number} options.parameters.recordStartTime - The start time of the recording.
 * @param {NodeJS.Timeout | null} options.parameters.recordTimerInterval - The interval ID for the recording timer.
 * @param {boolean} options.parameters.isTimerRunning - Flag indicating if the timer is currently running.
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
 *
 * @example
 * ```typescript
 * const options: RecordStartTimerOptions = {
 *   parameters: {
 *     recordStartTime: Date.now(),
 *     recordTimerInterval: null,
 *     isTimerRunning: false,
 *     canPauseResume: false,
 *     recordChangeSeconds: 15,
 *     recordPaused: false,
 *     recordStopped: false,
 *     roomName: 'room1',
 *     updateRecordStartTime: (time) => {  },
 *     updateRecordTimerInterval: (interval) => {  },
 *     updateIsTimerRunning: (isRunning) => { },
 *     updateCanPauseResume: (canPause) => {},
 *     getUpdatedAllParams: () => { },
 *   },
 * };
 * await recordStartTimer(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXN0YXJ0LXRpbWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9yZWNvcmQtc3RhcnQtdGltZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUE2QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUtILE1BQU0sT0FBTyxnQkFBZ0I7SUFDUDtJQUFwQixZQUFvQix3QkFBMkM7UUFBM0MsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFtQjtJQUFHLENBQUM7SUFFbkU7Ozs7T0FJRztJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFFSCxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQXVCLEVBQWlCLEVBQUU7UUFDOUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksRUFDRixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxjQUFjLEVBQ2QsbUJBQW1CLEVBRW5CLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIsb0JBQW9CLEVBQ3BCLG9CQUFvQixHQUNyQixHQUFHLFVBQVUsQ0FBQztRQUVmOztXQUVHO1FBQ0gsU0FBUyxpQkFBaUI7WUFDeEIsY0FBYyxHQUFHLElBQUksQ0FBQztZQUN0QixvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLGVBQWUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsNEJBQTRCO1lBQ3BFLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JDLG9EQUFvRDtnQkFDcEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDO29CQUM5QyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsaUJBQWlCO29CQUMvQyxlQUFlLEVBQUUsZUFBZTtvQkFDaEMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLHVCQUF1QjtvQkFDM0QsMkJBQTJCLEVBQUUsVUFBVSxDQUFDLDJCQUEyQjtpQkFDcEUsQ0FBQyxDQUFDO2dCQUVILFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO2dCQUVuQyw0RUFBNEU7Z0JBQzVFLElBQ0UsVUFBVSxDQUFDLFlBQVk7b0JBQ3ZCLFVBQVUsQ0FBQyxhQUFhO29CQUN4QixVQUFVLENBQUMsUUFBUSxJQUFJLEVBQUU7b0JBQ3pCLFVBQVUsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUMzQixDQUFDO29CQUNELGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNuQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEMsY0FBYyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3JDLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QseUJBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5Q0FBeUM7WUFDakUsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxtREFBbUQ7UUFDekcsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E1RlMsZ0JBQWdCOzJHQUFoQixnQkFBZ0IsY0FGZixNQUFNOzsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVjb3JkVXBkYXRlVGltZXIgfSBmcm9tICcuL3JlY29yZC11cGRhdGUtdGltZXIuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjb3JkU3RhcnRUaW1lclBhcmFtZXRlcnMge1xuICByZWNvcmRTdGFydFRpbWU6IG51bWJlcjtcbiAgcmVjb3JkVGltZXJJbnRlcnZhbD86IE5vZGVKUy5UaW1lb3V0IHwgbnVsbDtcbiAgaXNUaW1lclJ1bm5pbmc6IGJvb2xlYW47XG4gIGNhblBhdXNlUmVzdW1lOiBib29sZWFuO1xuICByZWNvcmRDaGFuZ2VTZWNvbmRzOiBudW1iZXI7XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcm9vbU5hbWU6IHN0cmluZyB8IG51bGw7XG4gIHVwZGF0ZVJlY29yZFN0YXJ0VGltZTogKHRpbWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbDogKGludGVydmFsOiBOb2RlSlMuVGltZW91dCB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzVGltZXJSdW5uaW5nOiAoaXNSdW5uaW5nOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDYW5QYXVzZVJlc3VtZTogKGNhblBhdXNlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIE1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBSZWNvcmRTdGFydFRpbWVyUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZFN0YXJ0VGltZXJPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogUmVjb3JkU3RhcnRUaW1lclBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlY29yZFN0YXJ0VGltZXJUeXBlID0gKG9wdGlvbnM6IFJlY29yZFN0YXJ0VGltZXJPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFN0YXJ0cyB0aGUgcmVjb3JkaW5nIHRpbWVyIGFuZCBtYW5hZ2VzIGl0cyBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge1JlY29yZFN0YXJ0VGltZXJPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0YXJ0aW5nIHRoZSByZWNvcmRpbmcgdGltZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSByZWNvcmRpbmcgdGltZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0YXJ0VGltZSAtIFRoZSBzdGFydCB0aW1lIG9mIHRoZSByZWNvcmRpbmcuXG4gKiBAcGFyYW0ge05vZGVKUy5UaW1lb3V0IHwgbnVsbH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFRpbWVySW50ZXJ2YWwgLSBUaGUgaW50ZXJ2YWwgSUQgZm9yIHRoZSByZWNvcmRpbmcgdGltZXIuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5pc1RpbWVyUnVubmluZyAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdGltZXIgaXMgY3VycmVudGx5IHJ1bm5pbmcuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5jYW5QYXVzZVJlc3VtZSAtIEZsYWcgaW5kaWNhdGluZyBpZiBwYXVzZS9yZXN1bWUgYWN0aW9ucyBhcmUgZW5hYmxlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkQ2hhbmdlU2Vjb25kcyAtIFRoZSB0aW1lIGFmdGVyIHdoaWNoIHBhdXNlL3Jlc3VtZSBhY3Rpb25zIGFyZSBlbmFibGVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFN0YXJ0VGltZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkaW5nIHN0YXJ0IHRpbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkaW5nIHRpbWVyIGludGVydmFsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUlzVGltZXJSdW5uaW5nIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB0aW1lciBydW5uaW5nIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUNhblBhdXNlUmVzdW1lIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwYXVzZS9yZXN1bWUgc3RhdGUuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHRpbWVyIGlzIHN0YXJ0ZWQuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIHJlY29yZGluZyBzdGFydCB0aW1lIGFuZCBzZXRzIHVwIGFuIGludGVydmFsIHRvIHVwZGF0ZSB0aGUgdGltZXIgZXZlcnkgc2Vjb25kLlxuICogSXQgYWxzbyBtYW5hZ2VzIHRoZSBzdGF0ZSBvZiB0aGUgdGltZXIsIGluY2x1ZGluZyBlbmFibGluZyBhbmQgZGlzYWJsaW5nIHBhdXNlL3Jlc3VtZSBhY3Rpb25zLlxuICogVGhlIHRpbWVyIGlzIHN0b3BwZWQgaWYgdGhlIHJlY29yZGluZyBpcyBwYXVzZWQsIHN0b3BwZWQsIG9yIGlmIHRoZSByb29tIG5hbWUgaXMgaW52YWxpZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9uczogUmVjb3JkU3RhcnRUaW1lck9wdGlvbnMgPSB7XG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICByZWNvcmRTdGFydFRpbWU6IERhdGUubm93KCksXG4gKiAgICAgcmVjb3JkVGltZXJJbnRlcnZhbDogbnVsbCxcbiAqICAgICBpc1RpbWVyUnVubmluZzogZmFsc2UsXG4gKiAgICAgY2FuUGF1c2VSZXN1bWU6IGZhbHNlLFxuICogICAgIHJlY29yZENoYW5nZVNlY29uZHM6IDE1LFxuICogICAgIHJlY29yZFBhdXNlZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkU3RvcHBlZDogZmFsc2UsXG4gKiAgICAgcm9vbU5hbWU6ICdyb29tMScsXG4gKiAgICAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lOiAodGltZSkgPT4geyAgfSxcbiAqICAgICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsOiAoaW50ZXJ2YWwpID0+IHsgIH0sXG4gKiAgICAgdXBkYXRlSXNUaW1lclJ1bm5pbmc6IChpc1J1bm5pbmcpID0+IHsgfSxcbiAqICAgICB1cGRhdGVDYW5QYXVzZVJlc3VtZTogKGNhblBhdXNlKSA9PiB7fSxcbiAqICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiB7IH0sXG4gKiAgIH0sXG4gKiB9O1xuICogYXdhaXQgcmVjb3JkU3RhcnRUaW1lcihvcHRpb25zKTtcbiAqIGBgYFxuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZWNvcmRTdGFydFRpbWVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBSZWNvcmRVcGRhdGVUaW1lclNlcnZpY2U6IFJlY29yZFVwZGF0ZVRpbWVyKSB7fVxuXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIHJlY29yZGluZyB0aW1lci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7UmVjb3JkU3RhcnRUaW1lck9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBuZWNlc3NhcnkgdmFyaWFibGVzIGFuZCBmdW5jdGlvbnMuXG4gICAqL1xuICAvKipcbiAgICogU3RhcnRzIGEgcmVjb3JkaW5nIHRpbWVyIGFuZCBtYW5hZ2VzIGl0cyBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRTdGFydFRpbWVyT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzdGFydGluZyB0aGUgcmVjb3JkaW5nIHRpbWVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRUaW1lIC0gVGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkVGltZXJJbnRlcnZhbCAtIFRoZSBpbnRlcnZhbCBJRCBmb3IgdGhlIHJlY29yZGluZyB0aW1lci5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuaXNUaW1lclJ1bm5pbmcgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHRpbWVyIGlzIHJ1bm5pbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNhblBhdXNlUmVzdW1lIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHBhdXNlL3Jlc3VtZSBhY3Rpb25zIGFyZSBlbmFibGVkLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZENoYW5nZVNlY29uZHMgLSBUaGUgdGltZSBhZnRlciB3aGljaCBwYXVzZS9yZXN1bWUgYWN0aW9ucyBhcmUgZW5hYmxlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFN0YXJ0VGltZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkaW5nIHN0YXJ0IHRpbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRUaW1lckludGVydmFsIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmRpbmcgdGltZXIgaW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc1RpbWVyUnVubmluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdGltZXIgcnVubmluZyBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUNhblBhdXNlUmVzdW1lIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwYXVzZS9yZXN1bWUgc3RhdGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB0aW1lciBpcyBzdGFydGVkLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSByZWNvcmRpbmcgc3RhcnQgdGltZSBhbmQgc2V0cyB1cCBhbiBpbnRlcnZhbCB0byB1cGRhdGUgdGhlIHRpbWVyIGV2ZXJ5IHNlY29uZC5cbiAgICogSXQgYWxzbyBtYW5hZ2VzIHRoZSBzdGF0ZSBvZiB0aGUgdGltZXIsIGluY2x1ZGluZyBlbmFibGluZyBhbmQgZGlzYWJsaW5nIHBhdXNlL3Jlc3VtZSBhY3Rpb25zLlxuICAgKiBUaGUgdGltZXIgaXMgc3RvcHBlZCBpZiB0aGUgcmVjb3JkaW5nIGlzIHBhdXNlZCwgc3RvcHBlZCwgb3IgaWYgdGhlIHJvb20gbmFtZSBpcyBpbnZhbGlkLlxuICAgKi9cblxuICByZWNvcmRTdGFydFRpbWVyID0gYXN5bmMgKHsgcGFyYW1ldGVycyB9OiB7IHBhcmFtZXRlcnM6IGFueSB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIHJlY29yZFN0YXJ0VGltZSxcbiAgICAgIHJlY29yZFRpbWVySW50ZXJ2YWwsXG4gICAgICBpc1RpbWVyUnVubmluZyxcbiAgICAgIGNhblBhdXNlUmVzdW1lLFxuICAgICAgcmVjb3JkQ2hhbmdlU2Vjb25kcyxcblxuICAgICAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lLFxuICAgICAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbCxcbiAgICAgIHVwZGF0ZUlzVGltZXJSdW5uaW5nLFxuICAgICAgdXBkYXRlQ2FuUGF1c2VSZXN1bWUsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGVuYWJsZSBwYXVzZS9yZXN1bWUgYWN0aW9ucyBhZnRlciBhIHNwZWNpZmllZCB0aW1lLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVuYWJsZVBhdXNlUmVzdW1lKCkge1xuICAgICAgY2FuUGF1c2VSZXN1bWUgPSB0cnVlO1xuICAgICAgdXBkYXRlQ2FuUGF1c2VSZXN1bWUoY2FuUGF1c2VSZXN1bWUpO1xuICAgIH1cblxuICAgIGlmICghaXNUaW1lclJ1bm5pbmcpIHtcbiAgICAgIHJlY29yZFN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyAvLyBHZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydFRpbWUocmVjb3JkU3RhcnRUaW1lKTtcbiAgICAgIHJlY29yZFRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXIgZXZlcnkgc2Vjb25kICgxMDAwIG1pbGxpc2Vjb25kcylcbiAgICAgICAgdGhpcy5SZWNvcmRVcGRhdGVUaW1lclNlcnZpY2UucmVjb3JkVXBkYXRlVGltZXIoe1xuICAgICAgICAgIHJlY29yZEVsYXBzZWRUaW1lOiBwYXJhbWV0ZXJzLnJlY29yZEVsYXBzZWRUaW1lLFxuICAgICAgICAgIHJlY29yZFN0YXJ0VGltZTogcmVjb3JkU3RhcnRUaW1lLFxuICAgICAgICAgIHVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lOiBwYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lLFxuICAgICAgICAgIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZTogcGFyYW1ldGVycy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgcmVjb3JkaW5nIGlzIHBhdXNlZCBvciBzdG9wcGVkLCBhbmQgY2xvc2UgdGhlIGludGVydmFsIGlmIG5lZWRlZFxuICAgICAgICBpZiAoXG4gICAgICAgICAgcGFyYW1ldGVycy5yZWNvcmRQYXVzZWQgfHxcbiAgICAgICAgICBwYXJhbWV0ZXJzLnJlY29yZFN0b3BwZWQgfHxcbiAgICAgICAgICBwYXJhbWV0ZXJzLnJvb21OYW1lID09ICcnIHx8XG4gICAgICAgICAgcGFyYW1ldGVycy5yb29tTmFtZSA9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVjb3JkVGltZXJJbnRlcnZhbCk7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbChudWxsKTtcbiAgICAgICAgICBpc1RpbWVyUnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgIHVwZGF0ZUlzVGltZXJSdW5uaW5nKGlzVGltZXJSdW5uaW5nKTtcbiAgICAgICAgICBjYW5QYXVzZVJlc3VtZSA9IGZhbHNlO1xuICAgICAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lKGNhblBhdXNlUmVzdW1lKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsKHJlY29yZFRpbWVySW50ZXJ2YWwpO1xuICAgICAgaXNUaW1lclJ1bm5pbmcgPSB0cnVlO1xuICAgICAgdXBkYXRlSXNUaW1lclJ1bm5pbmcoaXNUaW1lclJ1bm5pbmcpO1xuICAgICAgY2FuUGF1c2VSZXN1bWUgPSBmYWxzZTsgLy8gRGlzYWJsZSBwYXVzZS9yZXN1bWUgYWN0aW9ucyBpbml0aWFsbHlcbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lKGNhblBhdXNlUmVzdW1lKTtcbiAgICAgIHNldFRpbWVvdXQoZW5hYmxlUGF1c2VSZXN1bWUsIHJlY29yZENoYW5nZVNlY29uZHMpOyAvLyBFbmFibGUgcGF1c2UvcmVzdW1lIGFjdGlvbnMgYWZ0ZXIgc3BlY2lmaWVkIHRpbWVcbiAgICB9XG4gIH07XG59XG4iXX0=