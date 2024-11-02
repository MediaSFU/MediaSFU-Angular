import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle resuming media for a specific participant in a meeting.
 *
 * @class
 * @name ProducerMediaResumed
 * @description Resumes media (audio only) for a participant and updates the meeting display based on the meeting layout and participant status.
 *
 * @method
 * producerMediaResumed
 *
 * @param {ProducerMediaResumedOptions} options - Options to control media resumption:
 *   - `name` {string}: Name of the participant whose media is to be resumed.
 *   - `parameters` {ProducerMediaResumedParameters}: Meeting and participant-specific configurations.
 *      - `meetingDisplayType` {string}: Type of meeting display (e.g., "media").
 *      - `participants` {Participant[]}: List of participants in the meeting.
 *      - `shared` {boolean}: Indicates if the screen is currently shared.
 *      - `shareScreenStarted` {boolean}: Indicates if screen sharing has started.
 *      - `mainScreenFilled` {boolean}: Indicates if the main screen is filled.
 *      - `hostLabel` {string}: Label or name of the host.
 *      - `updateUpdateMainWindow` {Function}: Function to update the main window display.
 *      - `reorderStreams` {Function}: Function to manage stream ordering when display changes.
 *      - `prepopulateUserMedia` {Function}: Function to preload user media for the main screen.
 *
 * @returns {Promise<void>} Resolves when media for the specified participant has resumed.
 *
 * @example
 * const options = {
 *   name: 'Participant A',
 *   parameters: {
 *     meetingDisplayType: 'media',
 *     participants: [...],
 *     shared: false,
 *     shareScreenStarted: false,
 *     mainScreenFilled: false,
 *     hostLabel: 'Host',
 *     updateUpdateMainWindow: (updateMainWindow) => { ... },
 *     reorderStreams: ({ add, screenChanged, parameters }) => { ... },
 *     prepopulateUserMedia: ({ name, parameters }) => { ... }
 *   }
 * };
 *
 * producerMediaResumedService.producerMediaResumed(options)
 *   .then(() => console.log('Media resumed'))
 *   .catch(error => console.error('Error:', error));
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXItbWVkaWEtcmVzdW1lZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLXJlc3VtZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXFDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNENHO0FBTUgsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxvQkFBb0IsR0FBRyxLQUFLLEVBQUUsRUFDNUIsSUFBSSxFQUNKLFVBQVUsR0FDa0IsRUFBaUIsRUFBRTtRQUMvQyxVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFOUMsSUFBSSxFQUNGLGtCQUFrQixFQUNsQixZQUFZLEVBQ1osTUFBTSxFQUNOLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxzQkFBc0IsRUFDdEIsY0FBYyxFQUNkLG9CQUFvQixHQUNyQixHQUFHLFVBQVUsQ0FBQztRQUVmLG1EQUFtRDtRQUNuRCxzQ0FBc0M7UUFDdEMsMkNBQTJDO1FBRTNDLHNEQUFzRDtRQUN0RCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxXQUFXLEVBQUUsT0FBTyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3JELGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDNUQsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxrQkFBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNsQyxPQUFPLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFFckUsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsTUFBTSxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN4RSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E3RFMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJNZWRpYVJlc3VtZWRQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICAgIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBtYWluU2NyZWVuRmlsbGVkOiBib29sZWFuO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUHJvZHVjZXJNZWRpYVJlc3VtZWRQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJNZWRpYVJlc3VtZWRPcHRpb25zIHtcbiAgbmFtZTogc3RyaW5nO1xuICBraW5kOiAnYXVkaW8nO1xuICBwYXJhbWV0ZXJzOiBQcm9kdWNlck1lZGlhUmVzdW1lZFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFByb2R1Y2VyTWVkaWFSZXN1bWVkVHlwZSA9IChvcHRpb25zOiBQcm9kdWNlck1lZGlhUmVzdW1lZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VydmljZSB0byBoYW5kbGUgcmVzdW1pbmcgbWVkaWEgZm9yIGEgc3BlY2lmaWMgcGFydGljaXBhbnQgaW4gYSBtZWV0aW5nLlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgUHJvZHVjZXJNZWRpYVJlc3VtZWRcbiAqIEBkZXNjcmlwdGlvbiBSZXN1bWVzIG1lZGlhIChhdWRpbyBvbmx5KSBmb3IgYSBwYXJ0aWNpcGFudCBhbmQgdXBkYXRlcyB0aGUgbWVldGluZyBkaXNwbGF5IGJhc2VkIG9uIHRoZSBtZWV0aW5nIGxheW91dCBhbmQgcGFydGljaXBhbnQgc3RhdHVzLlxuICpcbiAqIEBtZXRob2RcbiAqIHByb2R1Y2VyTWVkaWFSZXN1bWVkXG4gKlxuICogQHBhcmFtIHtQcm9kdWNlck1lZGlhUmVzdW1lZE9wdGlvbnN9IG9wdGlvbnMgLSBPcHRpb25zIHRvIGNvbnRyb2wgbWVkaWEgcmVzdW1wdGlvbjpcbiAqICAgLSBgbmFtZWAge3N0cmluZ306IE5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IHdob3NlIG1lZGlhIGlzIHRvIGJlIHJlc3VtZWQuXG4gKiAgIC0gYHBhcmFtZXRlcnNgIHtQcm9kdWNlck1lZGlhUmVzdW1lZFBhcmFtZXRlcnN9OiBNZWV0aW5nIGFuZCBwYXJ0aWNpcGFudC1zcGVjaWZpYyBjb25maWd1cmF0aW9ucy5cbiAqICAgICAgLSBgbWVldGluZ0Rpc3BsYXlUeXBlYCB7c3RyaW5nfTogVHlwZSBvZiBtZWV0aW5nIGRpc3BsYXkgKGUuZy4sIFwibWVkaWFcIikuXG4gKiAgICAgIC0gYHBhcnRpY2lwYW50c2Age1BhcnRpY2lwYW50W119OiBMaXN0IG9mIHBhcnRpY2lwYW50cyBpbiB0aGUgbWVldGluZy5cbiAqICAgICAgLSBgc2hhcmVkYCB7Ym9vbGVhbn06IEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGN1cnJlbnRseSBzaGFyZWQuXG4gKiAgICAgIC0gYHNoYXJlU2NyZWVuU3RhcnRlZGAge2Jvb2xlYW59OiBJbmRpY2F0ZXMgaWYgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gKiAgICAgIC0gYG1haW5TY3JlZW5GaWxsZWRgIHtib29sZWFufTogSW5kaWNhdGVzIGlmIHRoZSBtYWluIHNjcmVlbiBpcyBmaWxsZWQuXG4gKiAgICAgIC0gYGhvc3RMYWJlbGAge3N0cmluZ306IExhYmVsIG9yIG5hbWUgb2YgdGhlIGhvc3QuXG4gKiAgICAgIC0gYHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3dgIHtGdW5jdGlvbn06IEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgZGlzcGxheS5cbiAqICAgICAgLSBgcmVvcmRlclN0cmVhbXNgIHtGdW5jdGlvbn06IEZ1bmN0aW9uIHRvIG1hbmFnZSBzdHJlYW0gb3JkZXJpbmcgd2hlbiBkaXNwbGF5IGNoYW5nZXMuXG4gKiAgICAgIC0gYHByZXBvcHVsYXRlVXNlck1lZGlhYCB7RnVuY3Rpb259OiBGdW5jdGlvbiB0byBwcmVsb2FkIHVzZXIgbWVkaWEgZm9yIHRoZSBtYWluIHNjcmVlbi5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmVzb2x2ZXMgd2hlbiBtZWRpYSBmb3IgdGhlIHNwZWNpZmllZCBwYXJ0aWNpcGFudCBoYXMgcmVzdW1lZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgbmFtZTogJ1BhcnRpY2lwYW50IEEnLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgbWVldGluZ0Rpc3BsYXlUeXBlOiAnbWVkaWEnLFxuICogICAgIHBhcnRpY2lwYW50czogWy4uLl0sXG4gKiAgICAgc2hhcmVkOiBmYWxzZSxcbiAqICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGZhbHNlLFxuICogICAgIG1haW5TY3JlZW5GaWxsZWQ6IGZhbHNlLFxuICogICAgIGhvc3RMYWJlbDogJ0hvc3QnLFxuICogICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh1cGRhdGVNYWluV2luZG93KSA9PiB7IC4uLiB9LFxuICogICAgIHJlb3JkZXJTdHJlYW1zOiAoeyBhZGQsIHNjcmVlbkNoYW5nZWQsIHBhcmFtZXRlcnMgfSkgPT4geyAuLi4gfSxcbiAqICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogKHsgbmFtZSwgcGFyYW1ldGVycyB9KSA9PiB7IC4uLiB9XG4gKiAgIH1cbiAqIH07XG4gKlxuICogcHJvZHVjZXJNZWRpYVJlc3VtZWRTZXJ2aWNlLnByb2R1Y2VyTWVkaWFSZXN1bWVkKG9wdGlvbnMpXG4gKiAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdNZWRpYSByZXN1bWVkJykpXG4gKiAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcikpO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y2VyTWVkaWFSZXN1bWVkIHtcbiAgLyoqXG4gICAqIFJlc3VtZXMgbWVkaWEgZm9yIGEgc3BlY2lmaWMgcGFydGljaXBhbnQgaW4gYSBtZWV0aW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyTWVkaWFSZXN1bWVkT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZXN1bWluZyBtZWRpYS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXJ0aWNpcGFudCB3aG9zZSBtZWRpYSBpcyB0byBiZSByZXN1bWVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVsYXRlZCB0byB0aGUgbWVldGluZyBhbmQgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lZXRpbmdEaXNwbGF5VHlwZSAtIFRoZSB0eXBlIG9mIG1lZXRpbmcgZGlzcGxheS5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyAtIFRoZSBsaXN0IG9mIHBhcnRpY2lwYW50cyBpbiB0aGUgbWVldGluZy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgYmVpbmcgc2hhcmVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5GaWxsZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIG1haW4gc2NyZWVuIGlzIGZpbGxlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ob3N0TGFiZWwgLSBUaGUgbGFiZWwgb2YgdGhlIGhvc3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlb3JkZXJTdHJlYW1zIC0gRnVuY3Rpb24gdG8gcmVvcmRlciB0aGUgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXBvcHVsYXRlVXNlck1lZGlhIC0gRnVuY3Rpb24gdG8gcHJlcG9wdWxhdGUgdXNlciBtZWRpYS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lZGlhIGhhcyBiZWVuIHJlc3VtZWQuXG4gICAqL1xuICBwcm9kdWNlck1lZGlhUmVzdW1lZCA9IGFzeW5jICh7XG4gICAgbmFtZSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBQcm9kdWNlck1lZGlhUmVzdW1lZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgc2hhcmVkLFxuICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQsXG4gICAgICBob3N0TGFiZWwsXG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIC8vIFVwZGF0ZSB0byByZXN1bWUgdGhlIGF1ZGlvIG9ubHkgb2YgYSBwYXJ0aWNpcGFudFxuICAgIC8vIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50XG4gICAgLy8ga2luZCBpcyB0aGUga2luZCBvZiBtZWRpYSAoYWx3YXlzIGF1ZGlvKVxuXG4gICAgLy8gT3BlcmF0aW9ucyB0byB1cGRhdGUgVUkgdG8gb3B0aW1pemUgaW50ZXJlc3QgbGV2ZWxzXG4gICAgY29uc3QgcGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai5uYW1lID09IG5hbWUpO1xuXG4gICAgaWYgKCFtYWluU2NyZWVuRmlsbGVkICYmIHBhcnRpY2lwYW50Py5pc2xldmVsID09ICcyJykge1xuICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICB1cGRhdGVNYWluV2luZG93ID0gZmFsc2U7XG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgIH1cblxuICAgIGxldCBjaGVja2VyO1xuICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgPT0gJ21lZGlhJykge1xuICAgICAgY2hlY2tlciA9IHBhcnRpY2lwYW50Py52aWRlb0lEICE9IG51bGwgJiYgcGFydGljaXBhbnQudmlkZW9JRCAhPT0gJyc7XG5cbiAgICAgIGlmICghY2hlY2tlciAmJiAhKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpKSB7XG4gICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=