import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXBhdXNlLXRpbWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9yZWNvcmQtcGF1c2UtdGltZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWUzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7Ozs7O09BVUc7SUFFSCxnQkFBZ0IsR0FBRyxDQUFDLEVBQ2xCLElBQUksR0FBRyxLQUFLLEVBQ1osY0FBYyxFQUNkLGNBQWMsRUFDZCxTQUFTLEdBQ2UsRUFBVyxFQUFFO1FBQ3JDLG1FQUFtRTtRQUNuRSxJQUFJLGNBQWMsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSTtnQkFDbEIsQ0FBQyxDQUFDLDZFQUE2RTtnQkFDL0UsQ0FBQyxDQUFDLHdGQUF3RixDQUFDO1lBQzdGLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7YUFDZixDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBaENTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZFBhdXNlVGltZXJPcHRpb25zIHtcbiAgc3RvcD86IGJvb2xlYW47XG4gIGlzVGltZXJSdW5uaW5nOiBib29sZWFuO1xuICBjYW5QYXVzZVJlc3VtZTogYm9vbGVhbjtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xufVxuXG4vLyBleHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZWNvcmRQYXVzZVRpbWVyVHlwZSA9IChvcHRpb25zOiBSZWNvcmRQYXVzZVRpbWVyT3B0aW9ucykgPT4gYm9vbGVhbjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlY29yZFBhdXNlVGltZXIge1xuICAvKipcbiAgICogQ29udHJvbHMgdGhlIHBhdXNlIGFuZCByZXN1bWUgZnVuY3Rpb25hbGl0eSBvZiBhIHJlY29yZGluZyB0aW1lci5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29udHJvbGxpbmcgdGhlIHRpbWVyLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnN0b3A9ZmFsc2VdIC0gSW5kaWNhdGVzIHdoZXRoZXIgdG8gc3RvcCB0aGUgdGltZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIHRpbWVyIGNvbnRyb2wuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzVGltZXJSdW5uaW5nIC0gSW5kaWNhdGVzIGlmIHRoZSB0aW1lciBpcyBjdXJyZW50bHkgcnVubmluZy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuY2FuUGF1c2VSZXN1bWUgLSBJbmRpY2F0ZXMgaWYgdGhlIHRpbWVyIGNhbiBiZSBwYXVzZWQgb3IgcmVzdW1lZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2hvdyBhbiBhbGVydCBtZXNzYWdlLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgdGhlIHRpbWVyIGNhbiBiZSBwYXVzZWQgb3IgcmVzdW1lZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgKi9cblxuICByZWNvcmRQYXVzZVRpbWVyID0gKHtcbiAgICBzdG9wID0gZmFsc2UsXG4gICAgaXNUaW1lclJ1bm5pbmcsXG4gICAgY2FuUGF1c2VSZXN1bWUsXG4gICAgc2hvd0FsZXJ0LFxuICB9OiBSZWNvcmRQYXVzZVRpbWVyT3B0aW9ucyk6IGJvb2xlYW4gPT4ge1xuICAgIC8vIEVuc3VyZSB0aGUgdGltZXIgaXMgcnVubmluZyBhbmQgcGF1c2UvcmVzdW1lIGFjdGlvbnMgYXJlIGFsbG93ZWRcbiAgICBpZiAoaXNUaW1lclJ1bm5pbmcgJiYgY2FuUGF1c2VSZXN1bWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gc3RvcFxuICAgICAgICA/ICdDYW4gb25seSBzdG9wIGFmdGVyIDE1IHNlY29uZHMgb2Ygc3RhcnRpbmcgb3IgcGF1c2luZyBvciByZXN1bWluZyByZWNvcmRpbmcnXG4gICAgICAgIDogJ0NhbiBvbmx5IHBhdXNlIG9yIHJlc3VtZSBhZnRlciAxNSBzZWNvbmRzIG9mIHN0YXJ0aW5nIG9yIHBhdXNpbmcgb3IgcmVzdW1pbmcgcmVjb3JkaW5nJztcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59XG4iXX0=