import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Resumes the send transport for audio and updates the UI and audio producer state accordingly.
 *
 * This method is essential for resuming audio streaming after it has been paused.
 * It updates the application state and UI to reflect the current audio status.
 *
 * @param {ResumeSendTransportAudioOptions} options - The options for resuming the send transport.
 * @param {Object} options.parameters - The parameters required for resuming the send transport.
 * @param {Producer} options.parameters.audioProducer - The audio producer to be resumed.
 * @param {string} options.parameters.islevel - The level of the user (e.g., host).
 * @param {string} options.parameters.hostLabel - The label of the host.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer state.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 *
 * @returns {Promise<void>} A promise that resolves when the send transport is resumed and the UI is updated.
 *
 * @throws {Error} Throws an error if there is an issue during the process of resuming the audio send transport.
 *
 * @example
 * await resumeSendTransportAudio({
 *   parameters: {
 *     audioProducer: myAudioProducer,
 *     islevel: '2',
 *     hostLabel: 'Host',
 *     lock_screen: false,
 *     shared: false,
 *     updateAudioProducer: (producer) => { /* update producer state *\/ },
 *     updateUpdateMainWindow: (state) => { /* update main window state *\/ },
 *     prepopulateUserMedia: myPrepopulateFunction,
 *   },
 * });
 */
export class ResumeSendTransportAudio {
    /**
     * Resumes the send transport for audio and updates the UI and audio producer state accordingly.
     *
     * @param {ResumeSendTransportAudioOptions} options - The options for resuming the send transport.
     * @param {Object} options.parameters - The parameters required for resuming the send transport.
     * @param {Producer} options.parameters.audioProducer - The audio producer to be resumed.
     * @param {string} options.parameters.islevel - The level of the user.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer state.
     * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     *
     * @returns {Promise<void>} A promise that resolves when the send transport is resumed and the UI is updated.
     *
     * @throws {Error} Throws an error if there is an issue during the process of resuming the audio send transport.
     */
    async resumeSendTransportAudio({ parameters }) {
        try {
            let { audioProducer, islevel, updateMainWindow, hostLabel, lock_screen, shared, updateAudioProducer, videoAlreadyOn, updateUpdateMainWindow, prepopulateUserMedia, } = parameters;
            // Resume send transport for audio
            audioProducer?.resume();
            // Update the UI
            if (!videoAlreadyOn && islevel === '2') {
                if (!lock_screen && !shared) {
                    updateMainWindow = true;
                    updateUpdateMainWindow(updateMainWindow);
                    await prepopulateUserMedia({ name: hostLabel, parameters });
                    updateMainWindow = false;
                    updateUpdateMainWindow(updateMainWindow);
                }
            }
            // Update audio producer state
            updateAudioProducer(audioProducer);
        }
        catch (error) {
            // Handle errors during the process of resuming the audio send transport
            throw new Error(`Error during resuming audio send transport: ${error.message}`);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumeSendTransportAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumeSendTransportAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumeSendTransportAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3Jlc3VtZS1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBMkIzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFNSCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFFSCxLQUFLLENBQUMsd0JBQXdCLENBQUMsRUFBRSxVQUFVLEVBQW1DO1FBQzVFLElBQUksQ0FBQztZQUNILElBQUksRUFDRixhQUFhLEVBQ2IsT0FBTyxFQUNQLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsV0FBVyxFQUNYLE1BQU0sRUFDTixtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLHNCQUFzQixFQUN0QixvQkFBb0IsR0FDckIsR0FBRyxVQUFVLENBQUM7WUFFZixrQ0FBa0M7WUFDbEMsYUFBYSxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBRXhCLGdCQUFnQjtZQUNoQixJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM1QixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3pDLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQzVELGdCQUFnQixHQUFHLEtBQUssQ0FBQztvQkFDekIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztZQUNILENBQUM7WUFFRCw4QkFBOEI7WUFDOUIsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsd0VBQXdFO1lBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7SUFDSCxDQUFDO3VHQXhEVSx3QkFBd0I7MkdBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjZXIgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQgeyBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsIFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZSB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMgZXh0ZW5kcyBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMge1xuICBhdWRpb1Byb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgaG9zdExhYmVsOiBzdHJpbmc7XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiAoYXVkaW9Qcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb09wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW9UeXBlID0gKFxuICBvcHRpb25zOiBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zLFxuKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFJlc3VtZXMgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciBhdWRpbyBhbmQgdXBkYXRlcyB0aGUgVUkgYW5kIGF1ZGlvIHByb2R1Y2VyIHN0YXRlIGFjY29yZGluZ2x5LlxuICpcbiAqIFRoaXMgbWV0aG9kIGlzIGVzc2VudGlhbCBmb3IgcmVzdW1pbmcgYXVkaW8gc3RyZWFtaW5nIGFmdGVyIGl0IGhhcyBiZWVuIHBhdXNlZC5cbiAqIEl0IHVwZGF0ZXMgdGhlIGFwcGxpY2F0aW9uIHN0YXRlIGFuZCBVSSB0byByZWZsZWN0IHRoZSBjdXJyZW50IGF1ZGlvIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge1Jlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVzdW1pbmcgdGhlIHNlbmQgdHJhbnNwb3J0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciByZXN1bWluZyB0aGUgc2VuZCB0cmFuc3BvcnQuXG4gKiBAcGFyYW0ge1Byb2R1Y2VyfSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Qcm9kdWNlciAtIFRoZSBhdWRpbyBwcm9kdWNlciB0byBiZSByZXN1bWVkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSB1c2VyIChlLmcuLCBob3N0KS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIG9mIHRoZSBob3N0LlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubG9ja19zY3JlZW4gLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBsb2NrZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9Qcm9kdWNlciAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW8gcHJvZHVjZXIgc3RhdGUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb0FscmVhZHlPbiAtIEluZGljYXRlcyBpZiB0aGUgdmlkZW8gaXMgYWxyZWFkeSBvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNlbmQgdHJhbnNwb3J0IGlzIHJlc3VtZWQgYW5kIHRoZSBVSSBpcyB1cGRhdGVkLlxuICpcbiAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHJlc3VtaW5nIHRoZSBhdWRpbyBzZW5kIHRyYW5zcG9ydC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYXdhaXQgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvKHtcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIGF1ZGlvUHJvZHVjZXI6IG15QXVkaW9Qcm9kdWNlcixcbiAqICAgICBpc2xldmVsOiAnMicsXG4gKiAgICAgaG9zdExhYmVsOiAnSG9zdCcsXG4gKiAgICAgbG9ja19zY3JlZW46IGZhbHNlLFxuICogICAgIHNoYXJlZDogZmFsc2UsXG4gKiAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcjogKHByb2R1Y2VyKSA9PiB7IC8qIHVwZGF0ZSBwcm9kdWNlciBzdGF0ZSAqXFwvIH0sXG4gKiAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHN0YXRlKSA9PiB7IC8qIHVwZGF0ZSBtYWluIHdpbmRvdyBzdGF0ZSAqXFwvIH0sXG4gKiAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IG15UHJlcG9wdWxhdGVGdW5jdGlvbixcbiAqICAgfSxcbiAqIH0pO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyB7XG4gIC8qKlxuICAgKiBSZXN1bWVzIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8gYW5kIHVwZGF0ZXMgdGhlIFVJIGFuZCBhdWRpbyBwcm9kdWNlciBzdGF0ZSBhY2NvcmRpbmdseS5cbiAgICpcbiAgICogQHBhcmFtIHtSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlc3VtaW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciByZXN1bWluZyB0aGUgc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7UHJvZHVjZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb1Byb2R1Y2VyIC0gVGhlIGF1ZGlvIHByb2R1Y2VyIHRvIGJlIHJlc3VtZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ob3N0TGFiZWwgLSBUaGUgbGFiZWwgb2YgdGhlIGhvc3QuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBdWRpb1Byb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBwcm9kdWNlciBzdGF0ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXBvcHVsYXRlVXNlck1lZGlhIC0gRnVuY3Rpb24gdG8gcHJlcG9wdWxhdGUgdXNlciBtZWRpYS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNlbmQgdHJhbnNwb3J0IGlzIHJlc3VtZWQgYW5kIHRoZSBVSSBpcyB1cGRhdGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGR1cmluZyB0aGUgcHJvY2VzcyBvZiByZXN1bWluZyB0aGUgYXVkaW8gc2VuZCB0cmFuc3BvcnQuXG4gICAqL1xuXG4gIGFzeW5jIHJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyh7IHBhcmFtZXRlcnMgfTogUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQge1xuICAgICAgICBhdWRpb1Byb2R1Y2VyLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICB1cGRhdGVNYWluV2luZG93LFxuICAgICAgICBob3N0TGFiZWwsXG4gICAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgICBzaGFyZWQsXG4gICAgICAgIHVwZGF0ZUF1ZGlvUHJvZHVjZXIsXG4gICAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuICAgICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBSZXN1bWUgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvXG4gICAgICBhdWRpb1Byb2R1Y2VyPy5yZXN1bWUoKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBVSVxuICAgICAgaWYgKCF2aWRlb0FscmVhZHlPbiAmJiBpc2xldmVsID09PSAnMicpIHtcbiAgICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhc2hhcmVkKSB7XG4gICAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gZmFsc2U7XG4gICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgYXVkaW8gcHJvZHVjZXIgc3RhdGVcbiAgICAgIHVwZGF0ZUF1ZGlvUHJvZHVjZXIoYXVkaW9Qcm9kdWNlcik7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgLy8gSGFuZGxlIGVycm9ycyBkdXJpbmcgdGhlIHByb2Nlc3Mgb2YgcmVzdW1pbmcgdGhlIGF1ZGlvIHNlbmQgdHJhbnNwb3J0XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGR1cmluZyByZXN1bWluZyBhdWRpbyBzZW5kIHRyYW5zcG9ydDogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgIH1cbiAgfVxufVxuIl19