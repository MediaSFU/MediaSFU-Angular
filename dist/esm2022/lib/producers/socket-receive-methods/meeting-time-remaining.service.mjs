import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle the remaining time for a meeting and display an alert if necessary.
 *
 * @class
 * @name MeetingTimeRemaining
 * @description
 * Manages the display of a time remaining alert for meetings, except when the event type is 'chat'.
 *
 * @method
 * meetingTimeRemaining
 *
 * @param {MeetingTimeRemainingOptions} options - Options for managing meeting time:
 *   - `timeRemaining` {number}: The remaining time in milliseconds.
 *   - `showAlert` {Function}: Optional function to display an alert message.
 *   - `eventType` {EventType}: The type of the event (e.g., "meeting", "broadcast", "chat").
 *
 * @returns {Promise<void>} Displays an alert with the remaining time for the meeting.
 *
 * @example
 * const options = {
 *   timeRemaining: 180000, // 3 minutes in milliseconds
 *   showAlert: (options) => console.log(options.message),
 *   eventType: 'meeting'
 * };
 * await meetingTimeRemainingService.meetingTimeRemaining(options);
 * // Output: Displays "The event will end in 3:00 minutes."
 */
export class MeetingTimeRemaining {
    /**
     * Handles the remaining time for a meeting and shows an alert if the event type is not 'chat'.
     *
     * @param {Object} options - The options for the meeting time remaining.
     * @param {number} options.timeRemaining - The remaining time in milliseconds.
     * @param {Function} options.showAlert - The function to show an alert message.
     * @param {string} options.eventType - The type of the event.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    meetingTimeRemaining = async ({ timeRemaining, showAlert, eventType, }) => {
        // Convert time from milliseconds to readable format of minutes and seconds
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);
        const timeRemainingString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        // Show alert with time remaining if eventType is not 'chat'
        if (eventType !== 'chat') {
            showAlert?.({
                message: `The event will end in ${timeRemainingString} minutes.`,
                type: 'success',
                duration: 3000,
            });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingTimeRemaining, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingTimeRemaining, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingTimeRemaining, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy10aW1lLXJlbWFpbmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctdGltZS1yZW1haW5pbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFNSCxNQUFNLE9BQU8sb0JBQW9CO0lBQy9COzs7Ozs7OztPQVFHO0lBQ0gsb0JBQW9CLEdBQUcsS0FBSyxFQUFFLEVBQzVCLGFBQWEsRUFDYixTQUFTLEVBQ1QsU0FBUyxHQUNtQixFQUFpQixFQUFFO1FBQy9DLDJFQUEyRTtRQUMzRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNELE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxPQUFPLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFOUUsNERBQTREO1FBQzVELElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSx5QkFBeUIsbUJBQW1CLFdBQVc7Z0JBQ2hFLElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E1QlMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50VHlwZSwgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBNZWV0aW5nVGltZVJlbWFpbmluZ09wdGlvbnMge1xuICB0aW1lUmVtYWluaW5nOiBudW1iZXI7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIE1lZXRpbmdUaW1lUmVtYWluaW5nVHlwZSA9IChvcHRpb25zOiBNZWV0aW5nVGltZVJlbWFpbmluZ09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VydmljZSB0byBoYW5kbGUgdGhlIHJlbWFpbmluZyB0aW1lIGZvciBhIG1lZXRpbmcgYW5kIGRpc3BsYXkgYW4gYWxlcnQgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgTWVldGluZ1RpbWVSZW1haW5pbmdcbiAqIEBkZXNjcmlwdGlvblxuICogTWFuYWdlcyB0aGUgZGlzcGxheSBvZiBhIHRpbWUgcmVtYWluaW5nIGFsZXJ0IGZvciBtZWV0aW5ncywgZXhjZXB0IHdoZW4gdGhlIGV2ZW50IHR5cGUgaXMgJ2NoYXQnLlxuICpcbiAqIEBtZXRob2RcbiAqIG1lZXRpbmdUaW1lUmVtYWluaW5nXG4gKlxuICogQHBhcmFtIHtNZWV0aW5nVGltZVJlbWFpbmluZ09wdGlvbnN9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBtYW5hZ2luZyBtZWV0aW5nIHRpbWU6XG4gKiAgIC0gYHRpbWVSZW1haW5pbmdgIHtudW1iZXJ9OiBUaGUgcmVtYWluaW5nIHRpbWUgaW4gbWlsbGlzZWNvbmRzLlxuICogICAtIGBzaG93QWxlcnRgIHtGdW5jdGlvbn06IE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYW4gYWxlcnQgbWVzc2FnZS5cbiAqICAgLSBgZXZlbnRUeXBlYCB7RXZlbnRUeXBlfTogVGhlIHR5cGUgb2YgdGhlIGV2ZW50IChlLmcuLCBcIm1lZXRpbmdcIiwgXCJicm9hZGNhc3RcIiwgXCJjaGF0XCIpLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBEaXNwbGF5cyBhbiBhbGVydCB3aXRoIHRoZSByZW1haW5pbmcgdGltZSBmb3IgdGhlIG1lZXRpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIHRpbWVSZW1haW5pbmc6IDE4MDAwMCwgLy8gMyBtaW51dGVzIGluIG1pbGxpc2Vjb25kc1xuICogICBzaG93QWxlcnQ6IChvcHRpb25zKSA9PiBjb25zb2xlLmxvZyhvcHRpb25zLm1lc3NhZ2UpLFxuICogICBldmVudFR5cGU6ICdtZWV0aW5nJ1xuICogfTtcbiAqIGF3YWl0IG1lZXRpbmdUaW1lUmVtYWluaW5nU2VydmljZS5tZWV0aW5nVGltZVJlbWFpbmluZyhvcHRpb25zKTtcbiAqIC8vIE91dHB1dDogRGlzcGxheXMgXCJUaGUgZXZlbnQgd2lsbCBlbmQgaW4gMzowMCBtaW51dGVzLlwiXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWVldGluZ1RpbWVSZW1haW5pbmcge1xuICAvKipcbiAgICogSGFuZGxlcyB0aGUgcmVtYWluaW5nIHRpbWUgZm9yIGEgbWVldGluZyBhbmQgc2hvd3MgYW4gYWxlcnQgaWYgdGhlIGV2ZW50IHR5cGUgaXMgbm90ICdjaGF0Jy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIG1lZXRpbmcgdGltZSByZW1haW5pbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnRpbWVSZW1haW5pbmcgLSBUaGUgcmVtYWluaW5nIHRpbWUgaW4gbWlsbGlzZWNvbmRzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNob3dBbGVydCAtIFRoZSBmdW5jdGlvbiB0byBzaG93IGFuIGFsZXJ0IG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIHRoZSBldmVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG4gIG1lZXRpbmdUaW1lUmVtYWluaW5nID0gYXN5bmMgKHtcbiAgICB0aW1lUmVtYWluaW5nLFxuICAgIHNob3dBbGVydCxcbiAgICBldmVudFR5cGUsXG4gIH06IE1lZXRpbmdUaW1lUmVtYWluaW5nT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIENvbnZlcnQgdGltZSBmcm9tIG1pbGxpc2Vjb25kcyB0byByZWFkYWJsZSBmb3JtYXQgb2YgbWludXRlcyBhbmQgc2Vjb25kc1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWVSZW1haW5pbmcgLyA2MDAwMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IoKHRpbWVSZW1haW5pbmcgJSA2MDAwMCkgLyAxMDAwKTtcbiAgICBjb25zdCB0aW1lUmVtYWluaW5nU3RyaW5nID0gYCR7bWludXRlc306JHtzZWNvbmRzIDwgMTAgPyAnMCcgOiAnJ30ke3NlY29uZHN9YDtcblxuICAgIC8vIFNob3cgYWxlcnQgd2l0aCB0aW1lIHJlbWFpbmluZyBpZiBldmVudFR5cGUgaXMgbm90ICdjaGF0J1xuICAgIGlmIChldmVudFR5cGUgIT09ICdjaGF0Jykge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiBgVGhlIGV2ZW50IHdpbGwgZW5kIGluICR7dGltZVJlbWFpbmluZ1N0cmluZ30gbWludXRlcy5gLFxuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19