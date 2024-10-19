import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy10aW1lLXJlbWFpbmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctdGltZS1yZW1haW5pbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWUzQyxNQUFNLE9BQU8sb0JBQW9CO0lBQy9COzs7Ozs7OztPQVFHO0lBQ0gsb0JBQW9CLEdBQUcsS0FBSyxFQUFFLEVBQzVCLGFBQWEsRUFDYixTQUFTLEVBQ1QsU0FBUyxHQUNtQixFQUFpQixFQUFFO1FBQy9DLDJFQUEyRTtRQUMzRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNELE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxPQUFPLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFOUUsNERBQTREO1FBQzVELElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSx5QkFBeUIsbUJBQW1CLFdBQVc7Z0JBQ2hFLElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E1QlMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50VHlwZSwgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBNZWV0aW5nVGltZVJlbWFpbmluZ09wdGlvbnMge1xuICB0aW1lUmVtYWluaW5nOiBudW1iZXI7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIE1lZXRpbmdUaW1lUmVtYWluaW5nVHlwZSA9IChvcHRpb25zOiBNZWV0aW5nVGltZVJlbWFpbmluZ09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNZWV0aW5nVGltZVJlbWFpbmluZyB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSByZW1haW5pbmcgdGltZSBmb3IgYSBtZWV0aW5nIGFuZCBzaG93cyBhbiBhbGVydCBpZiB0aGUgZXZlbnQgdHlwZSBpcyBub3QgJ2NoYXQnLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgbWVldGluZyB0aW1lIHJlbWFpbmluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMudGltZVJlbWFpbmluZyAtIFRoZSByZW1haW5pbmcgdGltZSBpbiBtaWxsaXNlY29uZHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gVGhlIGZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgdGhlIGV2ZW50LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgbWVldGluZ1RpbWVSZW1haW5pbmcgPSBhc3luYyAoe1xuICAgIHRpbWVSZW1haW5pbmcsXG4gICAgc2hvd0FsZXJ0LFxuICAgIGV2ZW50VHlwZSxcbiAgfTogTWVldGluZ1RpbWVSZW1haW5pbmdPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gQ29udmVydCB0aW1lIGZyb20gbWlsbGlzZWNvbmRzIHRvIHJlYWRhYmxlIGZvcm1hdCBvZiBtaW51dGVzIGFuZCBzZWNvbmRzXG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodGltZVJlbWFpbmluZyAvIDYwMDAwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcigodGltZVJlbWFpbmluZyAlIDYwMDAwKSAvIDEwMDApO1xuICAgIGNvbnN0IHRpbWVSZW1haW5pbmdTdHJpbmcgPSBgJHttaW51dGVzfToke3NlY29uZHMgPCAxMCA/ICcwJyA6ICcnfSR7c2Vjb25kc31gO1xuXG4gICAgLy8gU2hvdyBhbGVydCB3aXRoIHRpbWUgcmVtYWluaW5nIGlmIGV2ZW50VHlwZSBpcyBub3QgJ2NoYXQnXG4gICAgaWYgKGV2ZW50VHlwZSAhPT0gJ2NoYXQnKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6IGBUaGUgZXZlbnQgd2lsbCBlbmQgaW4gJHt0aW1lUmVtYWluaW5nU3RyaW5nfSBtaW51dGVzLmAsXG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=