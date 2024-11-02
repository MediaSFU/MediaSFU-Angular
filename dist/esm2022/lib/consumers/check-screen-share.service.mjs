import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
 *
 * @example
 * const options = {
 *   parameters: {
 *     shared: false,
 *     whiteboardStarted: false,
 *     whiteboardEnded: false,
 *     breakOutRoomStarted: false,
 *     breakOutRoomEnded: false,
 *     stopShareScreen: async () => { /* Logic to stop screen sharing *\/ },
 *     requestScreenShare: async () => { /* Logic to request screen sharing *\/ },
 *     showAlert: (alert) => { console.log(alert.message); },
 *   },
 * };
 *
 * await checkScreenShareService.checkScreenShare(options);
 * // Output: Logic to request screen sharing will be executed.
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2NoZWNrLXNjcmVlbi1zaGFyZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBaUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQU1MLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUEyQixFQUFpQixFQUFFO1FBQ2xGLElBQUksQ0FBQztZQUNILE1BQU0sRUFDSixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLGlCQUFpQjtZQUVqQixxQkFBcUI7WUFDckIsZUFBZSxFQUNmLGtCQUFrQixHQUNuQixHQUFHLFVBQVUsQ0FBQztZQUVmLDRFQUE0RTtZQUM1RSxJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNYLElBQUksaUJBQWlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDMUMsU0FBUyxFQUFFLENBQUM7d0JBQ1YsT0FBTyxFQUFFLHVEQUF1RDt3QkFDaEUsSUFBSSxFQUFFLFFBQVE7cUJBQ2YsQ0FBQyxDQUFDO29CQUNILE9BQU87Z0JBQ1QsQ0FBQztnQkFDRCxNQUFNLGVBQWUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDeEMsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLHlDQUF5QztnQkFDekMsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQzlDLFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSwwREFBMEQ7d0JBQ25FLElBQUksRUFBRSxRQUFRO3FCQUNmLENBQUMsQ0FBQztvQkFDSCxPQUFPO2dCQUNULENBQUM7Z0JBRUQsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUMxQyxTQUFTLEVBQUUsQ0FBQzt3QkFDVixPQUFPLEVBQUUsdURBQXVEO3dCQUNoRSxJQUFJLEVBQUUsUUFBUTtxQkFDZixDQUFDLENBQUM7b0JBQ0gsT0FBTztnQkFDVCxDQUFDO2dCQUNELE1BQU0sa0JBQWtCLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsZUFBZTtRQUNqQixDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQW5FUyxnQkFBZ0I7MkdBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBTdG9wU2hhcmVTY3JlZW5UeXBlLFxuICBTdG9wU2hhcmVTY3JlZW5QYXJhbWV0ZXJzLFxuICBSZXF1ZXN0U2NyZWVuU2hhcmVUeXBlLFxuICBSZXF1ZXN0U2NyZWVuU2hhcmVQYXJhbWV0ZXJzLFxuICBTaG93QWxlcnQsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIENoZWNrU2NyZWVuU2hhcmVQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyxcbiAgICBSZXF1ZXN0U2NyZWVuU2hhcmVQYXJhbWV0ZXJzIHtcbiAgc2hhcmVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkU3RhcnRlZDogYm9vbGVhbjtcbiAgd2hpdGVib2FyZEVuZGVkOiBib29sZWFuO1xuICBicmVha091dFJvb21TdGFydGVkOiBib29sZWFuO1xuICBicmVha091dFJvb21FbmRlZDogYm9vbGVhbjtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuXG4gIC8vIE1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzdG9wU2hhcmVTY3JlZW46IFN0b3BTaGFyZVNjcmVlblR5cGU7XG4gIHJlcXVlc3RTY3JlZW5TaGFyZTogUmVxdWVzdFNjcmVlblNoYXJlVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDaGVja1NjcmVlblNoYXJlUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoZWNrU2NyZWVuU2hhcmVPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogQ2hlY2tTY3JlZW5TaGFyZVBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENoZWNrU2NyZWVuU2hhcmVUeXBlID0gKG9wdGlvbnM6IENoZWNrU2NyZWVuU2hhcmVPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGN1cnJlbnQgc2NyZWVuIHNoYXJpbmcgc3RhdHVzIGFuZCBlaXRoZXIgc3RvcHMgb3IgcmVxdWVzdHMgc2NyZWVuIHNoYXJpbmcgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hlY2tTY3JlZW5TaGFyZU9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY2hlY2tpbmcgc2NyZWVuIHNoYXJlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHNjcmVlbiBzaGFyaW5nLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBjdXJyZW50bHkgYmVpbmcgc2hhcmVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydF0gLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0cy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHdoaXRlYm9hcmQgc2Vzc2lvbiBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkIC0gSW5kaWNhdGVzIGlmIHRoZSB3aGl0ZWJvYXJkIHNlc3Npb24gaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5icmVha091dFJvb21TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBicmVha291dCByb29tIHNlc3Npb24gaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbUVuZGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBicmVha291dCByb29tIHNlc3Npb24gaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc3RvcFNoYXJlU2NyZWVuIC0gRnVuY3Rpb24gdG8gc3RvcCBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlcXVlc3RTY3JlZW5TaGFyZSAtIEZ1bmN0aW9uIHRvIHJlcXVlc3Qgc2NyZWVuIHNoYXJpbmcuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gc2hhcmluZyBzdGF0dXMgaGFzIGJlZW4gY2hlY2tlZCBhbmQgdGhlIGFwcHJvcHJpYXRlIGFjdGlvbiBoYXMgYmVlbiB0YWtlbi5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIGxvZyBhbiBlcnJvciBtZXNzYWdlIGlmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIHByb2Nlc3MuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgc2hhcmVkOiBmYWxzZSxcbiAgICogICAgIHdoaXRlYm9hcmRTdGFydGVkOiBmYWxzZSxcbiAgICogICAgIHdoaXRlYm9hcmRFbmRlZDogZmFsc2UsXG4gICAqICAgICBicmVha091dFJvb21TdGFydGVkOiBmYWxzZSxcbiAgICogICAgIGJyZWFrT3V0Um9vbUVuZGVkOiBmYWxzZSxcbiAgICogICAgIHN0b3BTaGFyZVNjcmVlbjogYXN5bmMgKCkgPT4geyAvKiBMb2dpYyB0byBzdG9wIHNjcmVlbiBzaGFyaW5nICpcXC8gfSxcbiAgICogICAgIHJlcXVlc3RTY3JlZW5TaGFyZTogYXN5bmMgKCkgPT4geyAvKiBMb2dpYyB0byByZXF1ZXN0IHNjcmVlbiBzaGFyaW5nICpcXC8gfSxcbiAgICogICAgIHNob3dBbGVydDogKGFsZXJ0KSA9PiB7IGNvbnNvbGUubG9nKGFsZXJ0Lm1lc3NhZ2UpOyB9LFxuICAgKiAgIH0sXG4gICAqIH07XG4gICAqXG4gICAqIGF3YWl0IGNoZWNrU2NyZWVuU2hhcmVTZXJ2aWNlLmNoZWNrU2NyZWVuU2hhcmUob3B0aW9ucyk7XG4gICAqIC8vIE91dHB1dDogTG9naWMgdG8gcmVxdWVzdCBzY3JlZW4gc2hhcmluZyB3aWxsIGJlIGV4ZWN1dGVkLlxuICAgKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tTY3JlZW5TaGFyZSB7XG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGN1cnJlbnQgc2NyZWVuIHNoYXJpbmcgc3RhdHVzIGFuZCBlaXRoZXIgc3RvcHMgb3IgcmVxdWVzdHMgc2NyZWVuIHNoYXJpbmcgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hlY2tTY3JlZW5TaGFyZU9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY2hlY2tpbmcgc2NyZWVuIHNoYXJlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHNjcmVlbiBzaGFyaW5nLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBjdXJyZW50bHkgYmVpbmcgc2hhcmVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydF0gLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0cy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHdoaXRlYm9hcmQgc2Vzc2lvbiBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkIC0gSW5kaWNhdGVzIGlmIHRoZSB3aGl0ZWJvYXJkIHNlc3Npb24gaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5icmVha091dFJvb21TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBicmVha291dCByb29tIHNlc3Npb24gaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbUVuZGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBicmVha291dCByb29tIHNlc3Npb24gaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc3RvcFNoYXJlU2NyZWVuIC0gRnVuY3Rpb24gdG8gc3RvcCBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlcXVlc3RTY3JlZW5TaGFyZSAtIEZ1bmN0aW9uIHRvIHJlcXVlc3Qgc2NyZWVuIHNoYXJpbmcuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gc2hhcmluZyBzdGF0dXMgaGFzIGJlZW4gY2hlY2tlZCBhbmQgdGhlIGFwcHJvcHJpYXRlIGFjdGlvbiBoYXMgYmVlbiB0YWtlbi5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIGxvZyBhbiBlcnJvciBtZXNzYWdlIGlmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIHByb2Nlc3MuXG4gICAqL1xuICBjaGVja1NjcmVlblNoYXJlID0gYXN5bmMgKHsgcGFyYW1ldGVycyB9OiBDaGVja1NjcmVlblNoYXJlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHNoYXJlZCxcbiAgICAgICAgc2hvd0FsZXJ0LFxuICAgICAgICB3aGl0ZWJvYXJkU3RhcnRlZCxcbiAgICAgICAgd2hpdGVib2FyZEVuZGVkLFxuICAgICAgICBicmVha091dFJvb21TdGFydGVkLFxuICAgICAgICBicmVha091dFJvb21FbmRlZCxcblxuICAgICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgICAgc3RvcFNoYXJlU2NyZWVuLFxuICAgICAgICByZXF1ZXN0U2NyZWVuU2hhcmUsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gU3RvcCBzY3JlZW4gc2hhcmUgaWYgYWxyZWFkeSBzaGFyZWQgb3IgcmVxdWVzdCBzY3JlZW4gc2hhcmUgaWYgbm90IHNoYXJlZFxuICAgICAgaWYgKHNoYXJlZCkge1xuICAgICAgICBpZiAod2hpdGVib2FyZFN0YXJ0ZWQgJiYgIXdoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdTY3JlZW4gc2hhcmUgaXMgbm90IGFsbG93ZWQgd2hlbiB3aGl0ZWJvYXJkIGlzIGFjdGl2ZScsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgc3RvcFNoYXJlU2NyZWVuKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENhbid0IHNoYXJlIGlmIGJyZWFrb3V0IHJvb20gaXMgYWN0aXZlXG4gICAgICAgIGlmIChicmVha091dFJvb21TdGFydGVkICYmICFicmVha091dFJvb21FbmRlZCkge1xuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdTY3JlZW4gc2hhcmUgaXMgbm90IGFsbG93ZWQgd2hlbiBicmVha291dCByb29tIGlzIGFjdGl2ZScsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2hpdGVib2FyZFN0YXJ0ZWQgJiYgIXdoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdTY3JlZW4gc2hhcmUgaXMgbm90IGFsbG93ZWQgd2hlbiB3aGl0ZWJvYXJkIGlzIGFjdGl2ZScsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgcmVxdWVzdFNjcmVlblNoYXJlKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2NoZWNrU2NyZWVuU2hhcmUgZXJyb3InLCBlcnJvcik7XG4gICAgICAvLyB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG59XG4iXX0=