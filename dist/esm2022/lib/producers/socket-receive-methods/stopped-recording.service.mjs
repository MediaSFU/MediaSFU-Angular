import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to display an alert message when recording has stopped.
 *
 * @class
 * @name StoppedRecording
 * @description Provides a method to show an alert indicating that the recording has stopped.
 *
 * @method
 * stoppedRecording
 *
 * @param {StoppedRecordingOptions} options - Options for displaying the alert:
 *   - `state` {string}: The state of the recording, typically 'stop'.
 *   - `reason` {string}: The reason for stopping the recording.
 *   - `showAlert` {Function}: Optional function to show alert messages.
 *
 * @returns {Promise<void>} Resolves when the alert message has been displayed.
 *
 * @example
 * const options = {
 *   state: 'stop',
 *   reason: 'User ended recording',
 *   showAlert: ({ message, duration, type }) => console.log(message)
 * };
 * stoppedRecordingService.stoppedRecording(options);
 */
export class StoppedRecording {
    /**
     * Displays an alert message when the recording has stopped.
     *
     * @param {Object} options - The options for displaying the alert message.
     * @param {string} options.state - The state of the recording.
     * @param {string} options.reason - The reason for stopping the recording.
     * @param {Function} options.showAlert - Function to show alerts.
     * @returns {Promise<void>} A promise that resolves when the alert message is displayed.
     */
    stoppedRecording = async ({ state, reason, showAlert, }) => {
        try {
            if (state === 'stop') {
                showAlert?.({
                    message: `The recording has stopped - ${reason}.`,
                    duration: 3000,
                    type: 'danger',
                });
            }
        }
        catch (error) {
            console.error('Error in stoppedRecording: ', error);
            // throw new Error("Failed to display the recording stopped alert message.");
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StoppedRecording, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StoppedRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StoppedRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcHBlZC1yZWNvcmRpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zdG9wcGVkLXJlY29yZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFNSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7OztPQVFHO0lBQ0gsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEVBQ3hCLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxHQUNlLEVBQWlCLEVBQUU7UUFDM0MsSUFBSSxDQUFDO1lBQ0gsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQ3JCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSwrQkFBK0IsTUFBTSxHQUFHO29CQUNqRCxRQUFRLEVBQUUsSUFBSTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtpQkFDZixDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELDZFQUE2RTtRQUMvRSxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTNCUyxnQkFBZ0I7MkdBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3BwZWRSZWNvcmRpbmdPcHRpb25zIHtcbiAgc3RhdGU6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3RvcHBlZFJlY29yZGluZ1R5cGUgPSAob3B0aW9uczogU3RvcHBlZFJlY29yZGluZ09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VydmljZSB0byBkaXNwbGF5IGFuIGFsZXJ0IG1lc3NhZ2Ugd2hlbiByZWNvcmRpbmcgaGFzIHN0b3BwZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBTdG9wcGVkUmVjb3JkaW5nXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgYSBtZXRob2QgdG8gc2hvdyBhbiBhbGVydCBpbmRpY2F0aW5nIHRoYXQgdGhlIHJlY29yZGluZyBoYXMgc3RvcHBlZC5cbiAqXG4gKiBAbWV0aG9kXG4gKiBzdG9wcGVkUmVjb3JkaW5nXG4gKlxuICogQHBhcmFtIHtTdG9wcGVkUmVjb3JkaW5nT3B0aW9uc30gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGRpc3BsYXlpbmcgdGhlIGFsZXJ0OlxuICogICAtIGBzdGF0ZWAge3N0cmluZ306IFRoZSBzdGF0ZSBvZiB0aGUgcmVjb3JkaW5nLCB0eXBpY2FsbHkgJ3N0b3AnLlxuICogICAtIGByZWFzb25gIHtzdHJpbmd9OiBUaGUgcmVhc29uIGZvciBzdG9wcGluZyB0aGUgcmVjb3JkaW5nLlxuICogICAtIGBzaG93QWxlcnRgIHtGdW5jdGlvbn06IE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnQgbWVzc2FnZXMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIHdoZW4gdGhlIGFsZXJ0IG1lc3NhZ2UgaGFzIGJlZW4gZGlzcGxheWVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICBzdGF0ZTogJ3N0b3AnLFxuICogICByZWFzb246ICdVc2VyIGVuZGVkIHJlY29yZGluZycsXG4gKiAgIHNob3dBbGVydDogKHsgbWVzc2FnZSwgZHVyYXRpb24sIHR5cGUgfSkgPT4gY29uc29sZS5sb2cobWVzc2FnZSlcbiAqIH07XG4gKiBzdG9wcGVkUmVjb3JkaW5nU2VydmljZS5zdG9wcGVkUmVjb3JkaW5nKG9wdGlvbnMpO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0b3BwZWRSZWNvcmRpbmcge1xuICAvKipcbiAgICogRGlzcGxheXMgYW4gYWxlcnQgbWVzc2FnZSB3aGVuIHRoZSByZWNvcmRpbmcgaGFzIHN0b3BwZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGRpc3BsYXlpbmcgdGhlIGFsZXJ0IG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnN0YXRlIC0gVGhlIHN0YXRlIG9mIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlYXNvbiAtIFRoZSByZWFzb24gZm9yIHN0b3BwaW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhbGVydCBtZXNzYWdlIGlzIGRpc3BsYXllZC5cbiAgICovXG4gIHN0b3BwZWRSZWNvcmRpbmcgPSBhc3luYyAoe1xuICAgIHN0YXRlLFxuICAgIHJlYXNvbixcbiAgICBzaG93QWxlcnQsXG4gIH06IFN0b3BwZWRSZWNvcmRpbmdPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gJ3N0b3AnKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiBgVGhlIHJlY29yZGluZyBoYXMgc3RvcHBlZCAtICR7cmVhc29ufS5gLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gc3RvcHBlZFJlY29yZGluZzogJywgZXJyb3IpO1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGRpc3BsYXkgdGhlIHJlY29yZGluZyBzdG9wcGVkIGFsZXJ0IG1lc3NhZ2UuXCIpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==