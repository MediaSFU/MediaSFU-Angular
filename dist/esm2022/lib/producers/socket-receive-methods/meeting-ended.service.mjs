import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle the end of a meeting, including showing an alert and redirecting the user.
 *
 * @class
 * @name MeetingEnded
 * @description
 * This service provides a method to display a notification when a meeting ends and redirects the user to a specified URL or handles other post-meeting actions.
 *
 * @method
 * meetingEnded
 *
 * @param {MeetingEndedOptions} options - Options for handling the meeting end:
 *   - `showAlert` {Function}: Optional function to display an alert message.
 *   - `redirectURL` {string}: URL to redirect to after the meeting ends.
 *   - `onWeb` {boolean}: Specifies if the application is running on the web.
 *   - `eventType` {string}: Specifies the type of event ending the meeting.
 *
 * @returns {Promise<void>} Completes meeting end handling by displaying an alert and performing a redirect.
 *
 * @example
 * const options = {
 *   showAlert: (options) => console.log(options.message),
 *   redirectURL: 'https://example.com/home',
 *   onWeb: true,
 *   eventType: 'webinar',
 * };
 * meetingEndedService.meetingEnded(options);
 * // Displays alert and redirects to specified URL
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1lbmRlZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctZW5kZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQU1ILE1BQU0sT0FBTyxZQUFZO0lBQ3ZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLEdBQUcsS0FBSyxFQUFFLEVBQ3BCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFNBQVMsR0FDVyxFQUFpQixFQUFFO1FBQ3ZDLHNHQUFzRztRQUN0RyxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUN6QixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsNEVBQTRFO2dCQUNyRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLEtBQUssSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUN6QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUNyQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDWCxDQUFDO2FBQU0sQ0FBQztZQUNOLHFCQUFxQjtZQUNyQiw0QkFBNEI7WUFDNUIsWUFBWTtRQUNkLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBcENTLFlBQVk7MkdBQVosWUFBWSxjQUZYLE1BQU07OzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRUeXBlLCBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lZXRpbmdFbmRlZE9wdGlvbnMge1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHJlZGlyZWN0VVJMPzogc3RyaW5nO1xuICBvbldlYjogYm9vbGVhbjtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIHVwZGF0ZVZhbGlkYXRlZD86IChpc1ZhbGlkOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBNZWV0aW5nRW5kZWRUeXBlID0gKG9wdGlvbnM6IE1lZXRpbmdFbmRlZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VydmljZSB0byBoYW5kbGUgdGhlIGVuZCBvZiBhIG1lZXRpbmcsIGluY2x1ZGluZyBzaG93aW5nIGFuIGFsZXJ0IGFuZCByZWRpcmVjdGluZyB0aGUgdXNlci5cbiAqXG4gKiBAY2xhc3NcbiAqIEBuYW1lIE1lZXRpbmdFbmRlZFxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIHNlcnZpY2UgcHJvdmlkZXMgYSBtZXRob2QgdG8gZGlzcGxheSBhIG5vdGlmaWNhdGlvbiB3aGVuIGEgbWVldGluZyBlbmRzIGFuZCByZWRpcmVjdHMgdGhlIHVzZXIgdG8gYSBzcGVjaWZpZWQgVVJMIG9yIGhhbmRsZXMgb3RoZXIgcG9zdC1tZWV0aW5nIGFjdGlvbnMuXG4gKlxuICogQG1ldGhvZFxuICogbWVldGluZ0VuZGVkXG4gKlxuICogQHBhcmFtIHtNZWV0aW5nRW5kZWRPcHRpb25zfSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgaGFuZGxpbmcgdGhlIG1lZXRpbmcgZW5kOlxuICogICAtIGBzaG93QWxlcnRgIHtGdW5jdGlvbn06IE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYW4gYWxlcnQgbWVzc2FnZS5cbiAqICAgLSBgcmVkaXJlY3RVUkxgIHtzdHJpbmd9OiBVUkwgdG8gcmVkaXJlY3QgdG8gYWZ0ZXIgdGhlIG1lZXRpbmcgZW5kcy5cbiAqICAgLSBgb25XZWJgIHtib29sZWFufTogU3BlY2lmaWVzIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyBydW5uaW5nIG9uIHRoZSB3ZWIuXG4gKiAgIC0gYGV2ZW50VHlwZWAge3N0cmluZ306IFNwZWNpZmllcyB0aGUgdHlwZSBvZiBldmVudCBlbmRpbmcgdGhlIG1lZXRpbmcuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IENvbXBsZXRlcyBtZWV0aW5nIGVuZCBoYW5kbGluZyBieSBkaXNwbGF5aW5nIGFuIGFsZXJ0IGFuZCBwZXJmb3JtaW5nIGEgcmVkaXJlY3QuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIHNob3dBbGVydDogKG9wdGlvbnMpID0+IGNvbnNvbGUubG9nKG9wdGlvbnMubWVzc2FnZSksXG4gKiAgIHJlZGlyZWN0VVJMOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9ob21lJyxcbiAqICAgb25XZWI6IHRydWUsXG4gKiAgIGV2ZW50VHlwZTogJ3dlYmluYXInLFxuICogfTtcbiAqIG1lZXRpbmdFbmRlZFNlcnZpY2UubWVldGluZ0VuZGVkKG9wdGlvbnMpO1xuICogLy8gRGlzcGxheXMgYWxlcnQgYW5kIHJlZGlyZWN0cyB0byBzcGVjaWZpZWQgVVJMXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWVldGluZ0VuZGVkIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiBhIG1lZXRpbmcgYnkgc2hvd2luZyBhbiBhbGVydCBhbmQgcmVkaXJlY3RpbmcgdGhlIHVzZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7TWVldGluZ0VuZGVkT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBoYW5kbGluZyB0aGUgbWVldGluZyBlbmQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbiBhbGVydCBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZWRpcmVjdFVSTCAtIFVSTCB0byByZWRpcmVjdCB0byBhZnRlciB0aGUgbWVldGluZyBlbmRzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMub25XZWIgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgb24gdGhlIHdlYi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuZXZlbnRUeXBlIC0gVHlwZSBvZiB0aGUgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIG1lZXRpbmcgZW5kLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVldGluZyBlbmQgaGFuZGxpbmcgaXMgY29tcGxldGUuXG4gICAqL1xuICBtZWV0aW5nRW5kZWQgPSBhc3luYyAoe1xuICAgIHNob3dBbGVydCxcbiAgICByZWRpcmVjdFVSTCxcbiAgICBvbldlYixcbiAgICBldmVudFR5cGUsXG4gIH06IE1lZXRpbmdFbmRlZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBTaG93IGFuIGFsZXJ0IHRoYXQgdGhlIG1lZXRpbmcgaGFzIGVuZGVkIGFuZCB3YWl0IGZvciAyIHNlY29uZHMgYmVmb3JlIHJlZGlyZWN0aW5nIHRvIHRoZSBob21lIHBhZ2VcbiAgICBpZiAoZXZlbnRUeXBlICE9PSAnY2hhdCcpIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1RoZSBldmVudCBoYXMgZW5kZWQuIFlvdSB3aWxsIGJlIHJlZGlyZWN0ZWQgdG8gdGhlIGhvbWUgcGFnZSBpbiAyIHNlY29uZHMuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9uV2ViICYmIHJlZGlyZWN0VVJMKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVSTDtcbiAgICAgIH0sIDIwMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vICAgdXBkYXRlVmFsaWRhdGVkKGZhbHNlKTtcbiAgICAgIC8vIH0sIDIwMDApO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==