import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MeetingEnded {
    /**
     * Handles the end of a meeting by showing an alert and redirecting the user.
     *
     * @param {MeetingEndedOptions} options - The options for handling the meeting end.
     * @param {Function} options.showAlert - Function to show an alert message.
     * @param {string} options.redirectURL - URL to redirect to after the meeting ends.
     * @param {boolean} options.onWeb - Flag indicating if the application is running on the web.
     * @param {string} options.eventType - Type of the event that triggered the meeting end.
     *
     * @returns {Promise<void>} A promise that resolves when the meeting end handling is complete.
     */
    meetingEnded = async ({ showAlert, redirectURL, onWeb, eventType, }) => {
        // Show an alert that the meeting has ended and wait for 2 seconds before redirecting to the home page
        if (eventType !== 'chat') {
            showAlert?.({
                message: 'The event has ended. You will be redirected to the home page in 2 seconds.',
                type: 'danger',
                duration: 2000,
            });
        }
        if (onWeb && redirectURL) {
            setTimeout(() => {
                window.location.href = redirectURL;
            }, 2000);
        }
        else {
            // setTimeout(() => {
            //   updateValidated(false);
            // }, 2000);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingEnded, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingEnded, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingEnded, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1lbmRlZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctZW5kZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWlCM0MsTUFBTSxPQUFPLFlBQVk7SUFDdkI7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksR0FBRyxLQUFLLEVBQUUsRUFDcEIsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBQ0wsU0FBUyxHQUNXLEVBQWlCLEVBQUU7UUFDdkMsc0dBQXNHO1FBQ3RHLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSw0RUFBNEU7Z0JBQ3JGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksS0FBSyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ3pCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQ3JDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNYLENBQUM7YUFBTSxDQUFDO1lBQ04scUJBQXFCO1lBQ3JCLDRCQUE0QjtZQUM1QixZQUFZO1FBQ2QsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FwQ1MsWUFBWTsyR0FBWixZQUFZLGNBRlgsTUFBTTs7MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudFR5cGUsIFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVldGluZ0VuZGVkT3B0aW9ucyB7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgcmVkaXJlY3RVUkw/OiBzdHJpbmc7XG4gIG9uV2ViOiBib29sZWFuO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgdXBkYXRlVmFsaWRhdGVkPzogKGlzVmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIE1lZXRpbmdFbmRlZFR5cGUgPSAob3B0aW9uczogTWVldGluZ0VuZGVkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE1lZXRpbmdFbmRlZCB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgYSBtZWV0aW5nIGJ5IHNob3dpbmcgYW4gYWxlcnQgYW5kIHJlZGlyZWN0aW5nIHRoZSB1c2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge01lZXRpbmdFbmRlZE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaGFuZGxpbmcgdGhlIG1lZXRpbmcgZW5kLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVkaXJlY3RVUkwgLSBVUkwgdG8gcmVkaXJlY3QgdG8gYWZ0ZXIgdGhlIG1lZXRpbmcgZW5kcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLm9uV2ViIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyBydW5uaW5nIG9uIHRoZSB3ZWIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmV2ZW50VHlwZSAtIFR5cGUgb2YgdGhlIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBtZWV0aW5nIGVuZC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lZXRpbmcgZW5kIGhhbmRsaW5nIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgbWVldGluZ0VuZGVkID0gYXN5bmMgKHtcbiAgICBzaG93QWxlcnQsXG4gICAgcmVkaXJlY3RVUkwsXG4gICAgb25XZWIsXG4gICAgZXZlbnRUeXBlLFxuICB9OiBNZWV0aW5nRW5kZWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gU2hvdyBhbiBhbGVydCB0aGF0IHRoZSBtZWV0aW5nIGhhcyBlbmRlZCBhbmQgd2FpdCBmb3IgMiBzZWNvbmRzIGJlZm9yZSByZWRpcmVjdGluZyB0byB0aGUgaG9tZSBwYWdlXG4gICAgaWYgKGV2ZW50VHlwZSAhPT0gJ2NoYXQnKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgZXZlbnQgaGFzIGVuZGVkLiBZb3Ugd2lsbCBiZSByZWRpcmVjdGVkIHRvIHRoZSBob21lIHBhZ2UgaW4gMiBzZWNvbmRzLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvbldlYiAmJiByZWRpcmVjdFVSTCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVUkw7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyAgIHVwZGF0ZVZhbGlkYXRlZChmYWxzZSk7XG4gICAgICAvLyB9LCAyMDAwKTtcbiAgICB9XG4gIH07XG59XG4iXX0=