import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcHBlZC1yZWNvcmRpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zdG9wcGVkLXJlY29yZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZTNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7O09BUUc7SUFDSCxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsRUFDeEIsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEdBQ2UsRUFBaUIsRUFBRTtRQUMzQyxJQUFJLENBQUM7WUFDSCxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDckIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLCtCQUErQixNQUFNLEdBQUc7b0JBQ2pELFFBQVEsRUFBRSxJQUFJO29CQUNkLElBQUksRUFBRSxRQUFRO2lCQUNmLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEQsNkVBQTZFO1FBQy9FLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBM0JTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcHBlZFJlY29yZGluZ09wdGlvbnMge1xuICBzdGF0ZTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTdG9wcGVkUmVjb3JkaW5nVHlwZSA9IChvcHRpb25zOiBTdG9wcGVkUmVjb3JkaW5nT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0b3BwZWRSZWNvcmRpbmcge1xuICAvKipcbiAgICogRGlzcGxheXMgYW4gYWxlcnQgbWVzc2FnZSB3aGVuIHRoZSByZWNvcmRpbmcgaGFzIHN0b3BwZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGRpc3BsYXlpbmcgdGhlIGFsZXJ0IG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnN0YXRlIC0gVGhlIHN0YXRlIG9mIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlYXNvbiAtIFRoZSByZWFzb24gZm9yIHN0b3BwaW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhbGVydCBtZXNzYWdlIGlzIGRpc3BsYXllZC5cbiAgICovXG4gIHN0b3BwZWRSZWNvcmRpbmcgPSBhc3luYyAoe1xuICAgIHN0YXRlLFxuICAgIHJlYXNvbixcbiAgICBzaG93QWxlcnQsXG4gIH06IFN0b3BwZWRSZWNvcmRpbmdPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gJ3N0b3AnKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiBgVGhlIHJlY29yZGluZyBoYXMgc3RvcHBlZCAtICR7cmVhc29ufS5gLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gc3RvcHBlZFJlY29yZGluZzogJywgZXJyb3IpO1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGRpc3BsYXkgdGhlIHJlY29yZGluZyBzdG9wcGVkIGFsZXJ0IG1lc3NhZ2UuXCIpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==