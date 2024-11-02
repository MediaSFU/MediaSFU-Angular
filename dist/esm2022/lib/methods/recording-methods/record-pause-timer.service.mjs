import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Controls the pause and resume functionality of a recording timer.
 *
 * @param {RecordPauseTimerOptions} options - The options for controlling the timer.
 * @param {boolean} [options.stop=false] - Indicates whether to stop the timer.
 * @param {boolean} options.isTimerRunning - Indicates if the timer is currently running.
 * @param {boolean} options.canPauseResume - Indicates if the timer can be paused or resumed.
 * @param {Function} [options.showAlert] - Optional function to show an alert message.
 * @returns {boolean} - Returns true if the timer can be paused or resumed, otherwise false.
 *
 * @throws Will show an alert message if:
 * - The timer cannot be stopped, paused, or resumed due to not meeting the required time condition.
 *
 * @example
 * ```typescript
 * const options: RecordPauseTimerOptions = {
 *   stop: false,
 *   isTimerRunning: true,
 *   canPauseResume: true,
 *   showAlert: (alert) => {  },
 * };
 * const canPause = recordPauseTimer(options);
 * if (canPause) {
 *   // proceed with pausing or resuming the recording
 * }
 * ```
 */
export class RecordPauseTimer {
    /**
     * Controls the pause and resume functionality of a recording timer.
     *
     * @param {Object} options - The options for controlling the timer.
     * @param {boolean} [options.stop=false] - Indicates whether to stop the timer.
     * @param {Object} options.parameters - The parameters for the timer control.
     * @param {boolean} options.parameters.isTimerRunning - Indicates if the timer is currently running.
     * @param {boolean} options.parameters.canPauseResume - Indicates if the timer can be paused or resumed.
     * @param {Function} [options.parameters.showAlert] - Optional function to show an alert message.
     * @returns {boolean} - Returns true if the timer can be paused or resumed, otherwise false.
     */
    recordPauseTimer = ({ stop = false, isTimerRunning, canPauseResume, showAlert, }) => {
        // Ensure the timer is running and pause/resume actions are allowed
        if (isTimerRunning && canPauseResume) {
            return true;
        }
        else {
            const message = stop
                ? 'Can only stop after 15 seconds of starting or pausing or resuming recording'
                : 'Can only pause or resume after 15 seconds of starting or pausing or resuming recording';
            showAlert?.({
                message,
                type: 'danger',
            });
            return false;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordPauseTimer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordPauseTimer, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordPauseTimer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXBhdXNlLXRpbWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9yZWNvcmQtcGF1c2UtdGltZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFNSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7Ozs7O09BVUc7SUFFSCxnQkFBZ0IsR0FBRyxDQUFDLEVBQ2xCLElBQUksR0FBRyxLQUFLLEVBQ1osY0FBYyxFQUNkLGNBQWMsRUFDZCxTQUFTLEdBQ2UsRUFBVyxFQUFFO1FBQ3JDLG1FQUFtRTtRQUNuRSxJQUFJLGNBQWMsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSTtnQkFDbEIsQ0FBQyxDQUFDLDZFQUE2RTtnQkFDL0UsQ0FBQyxDQUFDLHdGQUF3RixDQUFDO1lBQzdGLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7YUFDZixDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBaENTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZFBhdXNlVGltZXJPcHRpb25zIHtcbiAgc3RvcD86IGJvb2xlYW47XG4gIGlzVGltZXJSdW5uaW5nOiBib29sZWFuO1xuICBjYW5QYXVzZVJlc3VtZTogYm9vbGVhbjtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xufVxuXG4vLyBleHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZWNvcmRQYXVzZVRpbWVyVHlwZSA9IChvcHRpb25zOiBSZWNvcmRQYXVzZVRpbWVyT3B0aW9ucykgPT4gYm9vbGVhbjtcblxuLyoqXG4gKiBDb250cm9scyB0aGUgcGF1c2UgYW5kIHJlc3VtZSBmdW5jdGlvbmFsaXR5IG9mIGEgcmVjb3JkaW5nIHRpbWVyLlxuICpcbiAqIEBwYXJhbSB7UmVjb3JkUGF1c2VUaW1lck9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29udHJvbGxpbmcgdGhlIHRpbWVyLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zdG9wPWZhbHNlXSAtIEluZGljYXRlcyB3aGV0aGVyIHRvIHN0b3AgdGhlIHRpbWVyLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzVGltZXJSdW5uaW5nIC0gSW5kaWNhdGVzIGlmIHRoZSB0aW1lciBpcyBjdXJyZW50bHkgcnVubmluZy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jYW5QYXVzZVJlc3VtZSAtIEluZGljYXRlcyBpZiB0aGUgdGltZXIgY2FuIGJlIHBhdXNlZCBvciByZXN1bWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSAtIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGltZXIgY2FuIGJlIHBhdXNlZCBvciByZXN1bWVkLCBvdGhlcndpc2UgZmFsc2UuXG4gKlxuICogQHRocm93cyBXaWxsIHNob3cgYW4gYWxlcnQgbWVzc2FnZSBpZjpcbiAqIC0gVGhlIHRpbWVyIGNhbm5vdCBiZSBzdG9wcGVkLCBwYXVzZWQsIG9yIHJlc3VtZWQgZHVlIHRvIG5vdCBtZWV0aW5nIHRoZSByZXF1aXJlZCB0aW1lIGNvbmRpdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9uczogUmVjb3JkUGF1c2VUaW1lck9wdGlvbnMgPSB7XG4gKiAgIHN0b3A6IGZhbHNlLFxuICogICBpc1RpbWVyUnVubmluZzogdHJ1ZSxcbiAqICAgY2FuUGF1c2VSZXN1bWU6IHRydWUsXG4gKiAgIHNob3dBbGVydDogKGFsZXJ0KSA9PiB7ICB9LFxuICogfTtcbiAqIGNvbnN0IGNhblBhdXNlID0gcmVjb3JkUGF1c2VUaW1lcihvcHRpb25zKTtcbiAqIGlmIChjYW5QYXVzZSkge1xuICogICAvLyBwcm9jZWVkIHdpdGggcGF1c2luZyBvciByZXN1bWluZyB0aGUgcmVjb3JkaW5nXG4gKiB9XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZWNvcmRQYXVzZVRpbWVyIHtcbiAgLyoqXG4gICAqIENvbnRyb2xzIHRoZSBwYXVzZSBhbmQgcmVzdW1lIGZ1bmN0aW9uYWxpdHkgb2YgYSByZWNvcmRpbmcgdGltZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbnRyb2xsaW5nIHRoZSB0aW1lci5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zdG9wPWZhbHNlXSAtIEluZGljYXRlcyB3aGV0aGVyIHRvIHN0b3AgdGhlIHRpbWVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSB0aW1lciBjb250cm9sLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5pc1RpbWVyUnVubmluZyAtIEluZGljYXRlcyBpZiB0aGUgdGltZXIgaXMgY3VycmVudGx5IHJ1bm5pbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNhblBhdXNlUmVzdW1lIC0gSW5kaWNhdGVzIGlmIHRoZSB0aW1lciBjYW4gYmUgcGF1c2VkIG9yIHJlc3VtZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gUmV0dXJucyB0cnVlIGlmIHRoZSB0aW1lciBjYW4gYmUgcGF1c2VkIG9yIHJlc3VtZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICovXG5cbiAgcmVjb3JkUGF1c2VUaW1lciA9ICh7XG4gICAgc3RvcCA9IGZhbHNlLFxuICAgIGlzVGltZXJSdW5uaW5nLFxuICAgIGNhblBhdXNlUmVzdW1lLFxuICAgIHNob3dBbGVydCxcbiAgfTogUmVjb3JkUGF1c2VUaW1lck9wdGlvbnMpOiBib29sZWFuID0+IHtcbiAgICAvLyBFbnN1cmUgdGhlIHRpbWVyIGlzIHJ1bm5pbmcgYW5kIHBhdXNlL3Jlc3VtZSBhY3Rpb25zIGFyZSBhbGxvd2VkXG4gICAgaWYgKGlzVGltZXJSdW5uaW5nICYmIGNhblBhdXNlUmVzdW1lKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHN0b3BcbiAgICAgICAgPyAnQ2FuIG9ubHkgc3RvcCBhZnRlciAxNSBzZWNvbmRzIG9mIHN0YXJ0aW5nIG9yIHBhdXNpbmcgb3IgcmVzdW1pbmcgcmVjb3JkaW5nJ1xuICAgICAgICA6ICdDYW4gb25seSBwYXVzZSBvciByZXN1bWUgYWZ0ZXIgMTUgc2Vjb25kcyBvZiBzdGFydGluZyBvciBwYXVzaW5nIG9yIHJlc3VtaW5nIHJlY29yZGluZyc7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIl19