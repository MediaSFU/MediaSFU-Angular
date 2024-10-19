import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ProducerMediaResumed {
    /**
     * Resumes media for a specific participant in a meeting.
     *
     * @param {ProducerMediaResumedOptions} options - The options for resuming media.
     * @param {string} options.name - The name of the participant whose media is to be resumed.
     * @param {Object} options.parameters - The parameters related to the meeting and participants.
     * @param {string} options.parameters.meetingDisplayType - The type of meeting display.
     * @param {Array} options.parameters.participants - The list of participants in the meeting.
     * @param {boolean} options.parameters.shared - Indicates if the screen is being shared.
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.parameters.mainScreenFilled - Indicates if the main screen is filled.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {Function} options.parameters.reorderStreams - Function to reorder the streams.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     *
     * @returns {Promise<void>} A promise that resolves when the media has been resumed.
     */
    producerMediaResumed = async ({ name, parameters, }) => {
        parameters = parameters.getUpdatedAllParams();
        let { meetingDisplayType, participants, shared, shareScreenStarted, updateMainWindow, mainScreenFilled, hostLabel, updateUpdateMainWindow, reorderStreams, prepopulateUserMedia, } = parameters;
        // Update to resume the audio only of a participant
        // name is the name of the participant
        // kind is the kind of media (always audio)
        // Operations to update UI to optimize interest levels
        const participant = participants.find((obj) => obj.name == name);
        if (!mainScreenFilled && participant?.islevel == '2') {
            updateMainWindow = true;
            updateUpdateMainWindow(updateMainWindow);
            await prepopulateUserMedia({ name: hostLabel, parameters });
            updateMainWindow = false;
            updateUpdateMainWindow(updateMainWindow);
        }
        let checker;
        if (meetingDisplayType == 'media') {
            checker = participant?.videoID != null && participant.videoID !== '';
            if (!checker && !(shareScreenStarted || shared)) {
                await reorderStreams({ add: false, screenChanged: true, parameters });
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaResumed, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaResumed, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaResumed, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXItbWVkaWEtcmVzdW1lZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLXJlc3VtZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdDM0MsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxvQkFBb0IsR0FBRyxLQUFLLEVBQUUsRUFDNUIsSUFBSSxFQUNKLFVBQVUsR0FDa0IsRUFBaUIsRUFBRTtRQUMvQyxVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFOUMsSUFBSSxFQUNGLGtCQUFrQixFQUNsQixZQUFZLEVBQ1osTUFBTSxFQUNOLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxzQkFBc0IsRUFDdEIsY0FBYyxFQUNkLG9CQUFvQixHQUNyQixHQUFHLFVBQVUsQ0FBQztRQUVmLG1EQUFtRDtRQUNuRCxzQ0FBc0M7UUFDdEMsMkNBQTJDO1FBRTNDLHNEQUFzRDtRQUN0RCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxXQUFXLEVBQUUsT0FBTyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3JELGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDNUQsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxrQkFBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNsQyxPQUFPLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFFckUsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsTUFBTSxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN4RSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E3RFMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJNZWRpYVJlc3VtZWRQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICAgIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBtYWluU2NyZWVuRmlsbGVkOiBib29sZWFuO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUHJvZHVjZXJNZWRpYVJlc3VtZWRQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJNZWRpYVJlc3VtZWRPcHRpb25zIHtcbiAgbmFtZTogc3RyaW5nO1xuICBraW5kOiAnYXVkaW8nO1xuICBwYXJhbWV0ZXJzOiBQcm9kdWNlck1lZGlhUmVzdW1lZFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFByb2R1Y2VyTWVkaWFSZXN1bWVkVHlwZSA9IChvcHRpb25zOiBQcm9kdWNlck1lZGlhUmVzdW1lZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWNlck1lZGlhUmVzdW1lZCB7XG4gIC8qKlxuICAgKiBSZXN1bWVzIG1lZGlhIGZvciBhIHNwZWNpZmljIHBhcnRpY2lwYW50IGluIGEgbWVldGluZy5cbiAgICpcbiAgICogQHBhcmFtIHtQcm9kdWNlck1lZGlhUmVzdW1lZE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVzdW1pbmcgbWVkaWEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQgd2hvc2UgbWVkaWEgaXMgdG8gYmUgcmVzdW1lZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlbGF0ZWQgdG8gdGhlIG1lZXRpbmcgYW5kIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZWV0aW5nRGlzcGxheVR5cGUgLSBUaGUgdHlwZSBvZiBtZWV0aW5nIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMgaW4gdGhlIG1lZXRpbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGJlaW5nIHNoYXJlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5tYWluU2NyZWVuRmlsbGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBtYWluIHNjcmVlbiBpcyBmaWxsZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIG9mIHRoZSBob3N0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgdGhlIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtZWRpYSBoYXMgYmVlbiByZXN1bWVkLlxuICAgKi9cbiAgcHJvZHVjZXJNZWRpYVJlc3VtZWQgPSBhc3luYyAoe1xuICAgIG5hbWUsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUHJvZHVjZXJNZWRpYVJlc3VtZWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIHNoYXJlZCxcbiAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICBtYWluU2NyZWVuRmlsbGVkLFxuICAgICAgaG9zdExhYmVsLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWEsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBVcGRhdGUgdG8gcmVzdW1lIHRoZSBhdWRpbyBvbmx5IG9mIGEgcGFydGljaXBhbnRcbiAgICAvLyBuYW1lIGlzIHRoZSBuYW1lIG9mIHRoZSBwYXJ0aWNpcGFudFxuICAgIC8vIGtpbmQgaXMgdGhlIGtpbmQgb2YgbWVkaWEgKGFsd2F5cyBhdWRpbylcblxuICAgIC8vIE9wZXJhdGlvbnMgdG8gdXBkYXRlIFVJIHRvIG9wdGltaXplIGludGVyZXN0IGxldmVsc1xuICAgIGNvbnN0IHBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmoubmFtZSA9PSBuYW1lKTtcblxuICAgIGlmICghbWFpblNjcmVlbkZpbGxlZCAmJiBwYXJ0aWNpcGFudD8uaXNsZXZlbCA9PSAnMicpIHtcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IGZhbHNlO1xuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tlcjtcbiAgICBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09ICdtZWRpYScpIHtcbiAgICAgIGNoZWNrZXIgPSBwYXJ0aWNpcGFudD8udmlkZW9JRCAhPSBudWxsICYmIHBhcnRpY2lwYW50LnZpZGVvSUQgIT09ICcnO1xuXG4gICAgICBpZiAoIWNoZWNrZXIgJiYgIShzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSkge1xuICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19