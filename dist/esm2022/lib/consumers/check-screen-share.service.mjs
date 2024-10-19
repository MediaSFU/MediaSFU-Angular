import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CheckScreenShare {
    /**
     * Checks the current screen sharing status and either stops or requests screen sharing based on the provided parameters.
     *
     * @param {CheckScreenShareOptions} options - The options for checking screen share.
     * @param {Object} options.parameters - The parameters for screen sharing.
     * @param {boolean} options.parameters.shared - Indicates if the screen is currently being shared.
     * @param {Function} [options.parameters.showAlert] - Function to show alerts.
     * @param {boolean} options.parameters.whiteboardStarted - Indicates if the whiteboard session has started.
     * @param {boolean} options.parameters.whiteboardEnded - Indicates if the whiteboard session has ended.
     * @param {boolean} options.parameters.breakOutRoomStarted - Indicates if the breakout room session has started.
     * @param {boolean} options.parameters.breakOutRoomEnded - Indicates if the breakout room session has ended.
     * @param {Function} options.parameters.stopShareScreen - Function to stop screen sharing.
     * @param {Function} options.parameters.requestScreenShare - Function to request screen sharing.
     *
     * @returns {Promise<void>} A promise that resolves when the screen sharing status has been checked and the appropriate action has been taken.
     *
     * @throws Will log an error message if an error occurs during the process.
     */
    checkScreenShare = async ({ parameters }) => {
        try {
            const { shared, showAlert, whiteboardStarted, whiteboardEnded, breakOutRoomStarted, breakOutRoomEnded, 
            // mediasfu functions
            stopShareScreen, requestScreenShare, } = parameters;
            // Stop screen share if already shared or request screen share if not shared
            if (shared) {
                if (whiteboardStarted && !whiteboardEnded) {
                    showAlert?.({
                        message: 'Screen share is not allowed when whiteboard is active',
                        type: 'danger',
                    });
                    return;
                }
                await stopShareScreen({ parameters });
            }
            else {
                // Can't share if breakout room is active
                if (breakOutRoomStarted && !breakOutRoomEnded) {
                    showAlert?.({
                        message: 'Screen share is not allowed when breakout room is active',
                        type: 'danger',
                    });
                    return;
                }
                if (whiteboardStarted && !whiteboardEnded) {
                    showAlert?.({
                        message: 'Screen share is not allowed when whiteboard is active',
                        type: 'danger',
                    });
                    return;
                }
                await requestScreenShare({ parameters });
            }
        }
        catch (error) {
            console.log('checkScreenShare error', error);
            // throw error;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckScreenShare, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckScreenShare, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckScreenShare, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2NoZWNrLXNjcmVlbi1zaGFyZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBb0MzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBMkIsRUFBaUIsRUFBRTtRQUNsRixJQUFJLENBQUM7WUFDSCxNQUFNLEVBQ0osTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixpQkFBaUI7WUFFakIscUJBQXFCO1lBQ3JCLGVBQWUsRUFDZixrQkFBa0IsR0FDbkIsR0FBRyxVQUFVLENBQUM7WUFFZiw0RUFBNEU7WUFDNUUsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDWCxJQUFJLGlCQUFpQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQzFDLFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSx1REFBdUQ7d0JBQ2hFLElBQUksRUFBRSxRQUFRO3FCQUNmLENBQUMsQ0FBQztvQkFDSCxPQUFPO2dCQUNULENBQUM7Z0JBQ0QsTUFBTSxlQUFlLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7aUJBQU0sQ0FBQztnQkFDTix5Q0FBeUM7Z0JBQ3pDLElBQUksbUJBQW1CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUM5QyxTQUFTLEVBQUUsQ0FBQzt3QkFDVixPQUFPLEVBQUUsMERBQTBEO3dCQUNuRSxJQUFJLEVBQUUsUUFBUTtxQkFDZixDQUFDLENBQUM7b0JBQ0gsT0FBTztnQkFDVCxDQUFDO2dCQUVELElBQUksaUJBQWlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDMUMsU0FBUyxFQUFFLENBQUM7d0JBQ1YsT0FBTyxFQUFFLHVEQUF1RDt3QkFDaEUsSUFBSSxFQUFFLFFBQVE7cUJBQ2YsQ0FBQyxDQUFDO29CQUNILE9BQU87Z0JBQ1QsQ0FBQztnQkFDRCxNQUFNLGtCQUFrQixDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FuRVMsZ0JBQWdCOzJHQUFoQixnQkFBZ0IsY0FGZixNQUFNOzsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU3RvcFNoYXJlU2NyZWVuVHlwZSxcbiAgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyxcbiAgUmVxdWVzdFNjcmVlblNoYXJlVHlwZSxcbiAgUmVxdWVzdFNjcmVlblNoYXJlUGFyYW1ldGVycyxcbiAgU2hvd0FsZXJ0LFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBDaGVja1NjcmVlblNoYXJlUGFyYW1ldGVyc1xuICBleHRlbmRzIFN0b3BTaGFyZVNjcmVlblBhcmFtZXRlcnMsXG4gICAgUmVxdWVzdFNjcmVlblNoYXJlUGFyYW1ldGVycyB7XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgd2hpdGVib2FyZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHdoaXRlYm9hcmRFbmRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tRW5kZWQ6IGJvb2xlYW47XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcblxuICAvLyBNZWRpYXNmdSBmdW5jdGlvbnNcbiAgc3RvcFNoYXJlU2NyZWVuOiBTdG9wU2hhcmVTY3JlZW5UeXBlO1xuICByZXF1ZXN0U2NyZWVuU2hhcmU6IFJlcXVlc3RTY3JlZW5TaGFyZVR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ2hlY2tTY3JlZW5TaGFyZVBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGVja1NjcmVlblNoYXJlT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IENoZWNrU2NyZWVuU2hhcmVQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDaGVja1NjcmVlblNoYXJlVHlwZSA9IChvcHRpb25zOiBDaGVja1NjcmVlblNoYXJlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrU2NyZWVuU2hhcmUge1xuICAvKipcbiAgICogQ2hlY2tzIHRoZSBjdXJyZW50IHNjcmVlbiBzaGFyaW5nIHN0YXR1cyBhbmQgZWl0aGVyIHN0b3BzIG9yIHJlcXVlc3RzIHNjcmVlbiBzaGFyaW5nIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge0NoZWNrU2NyZWVuU2hhcmVPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNoZWNraW5nIHNjcmVlbiBzaGFyZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgY3VycmVudGx5IGJlaW5nIHNoYXJlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnRdIC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRTdGFydGVkIC0gSW5kaWNhdGVzIGlmIHRoZSB3aGl0ZWJvYXJkIHNlc3Npb24gaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRFbmRlZCAtIEluZGljYXRlcyBpZiB0aGUgd2hpdGVib2FyZCBzZXNzaW9uIGhhcyBlbmRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgYnJlYWtvdXQgcm9vbSBzZXNzaW9uIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5icmVha091dFJvb21FbmRlZCAtIEluZGljYXRlcyBpZiB0aGUgYnJlYWtvdXQgcm9vbSBzZXNzaW9uIGhhcyBlbmRlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0b3BTaGFyZVNjcmVlbiAtIEZ1bmN0aW9uIHRvIHN0b3Agc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZXF1ZXN0U2NyZWVuU2hhcmUgLSBGdW5jdGlvbiB0byByZXF1ZXN0IHNjcmVlbiBzaGFyaW5nLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2NyZWVuIHNoYXJpbmcgc3RhdHVzIGhhcyBiZWVuIGNoZWNrZWQgYW5kIHRoZSBhcHByb3ByaWF0ZSBhY3Rpb24gaGFzIGJlZW4gdGFrZW4uXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBwcm9jZXNzLlxuICAgKi9cbiAgY2hlY2tTY3JlZW5TaGFyZSA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogQ2hlY2tTY3JlZW5TaGFyZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzaGFyZWQsXG4gICAgICAgIHNob3dBbGVydCxcbiAgICAgICAgd2hpdGVib2FyZFN0YXJ0ZWQsXG4gICAgICAgIHdoaXRlYm9hcmRFbmRlZCxcbiAgICAgICAgYnJlYWtPdXRSb29tU3RhcnRlZCxcbiAgICAgICAgYnJlYWtPdXRSb29tRW5kZWQsXG5cbiAgICAgICAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICAgIHN0b3BTaGFyZVNjcmVlbixcbiAgICAgICAgcmVxdWVzdFNjcmVlblNoYXJlLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIFN0b3Agc2NyZWVuIHNoYXJlIGlmIGFscmVhZHkgc2hhcmVkIG9yIHJlcXVlc3Qgc2NyZWVuIHNoYXJlIGlmIG5vdCBzaGFyZWRcbiAgICAgIGlmIChzaGFyZWQpIHtcbiAgICAgICAgaWYgKHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnU2NyZWVuIHNoYXJlIGlzIG5vdCBhbGxvd2VkIHdoZW4gd2hpdGVib2FyZCBpcyBhY3RpdmUnLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHN0b3BTaGFyZVNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDYW4ndCBzaGFyZSBpZiBicmVha291dCByb29tIGlzIGFjdGl2ZVxuICAgICAgICBpZiAoYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhYnJlYWtPdXRSb29tRW5kZWQpIHtcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnU2NyZWVuIHNoYXJlIGlzIG5vdCBhbGxvd2VkIHdoZW4gYnJlYWtvdXQgcm9vbSBpcyBhY3RpdmUnLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnU2NyZWVuIHNoYXJlIGlzIG5vdCBhbGxvd2VkIHdoZW4gd2hpdGVib2FyZCBpcyBhY3RpdmUnLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHJlcXVlc3RTY3JlZW5TaGFyZSh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjaGVja1NjcmVlblNoYXJlIGVycm9yJywgZXJyb3IpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xufVxuIl19