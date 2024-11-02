import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * StartShareScreen - Service to initiate screen sharing with configurable options for different environments.
 *
 * This service initiates the screen sharing process, handling both successful and failed attempts
 * and updating the shared state accordingly.
 *
 * @class
 * @name StartShareScreen
 * @example
 * ```typescript
 * const startShareScreenService = new StartShareScreen();
 * await startShareScreenService.startShareScreen({
 *   parameters: {
 *     shared: false,
 *     showAlert: (alert) => console.log(alert.message),
 *     updateShared: (shared) => console.log('Shared state:', shared),
 *     onWeb: true,
 *     targetWidth: 1920,
 *     targetHeight: 1080,
 *     streamSuccessScreen: async ({ stream }) => {
 *       // Handle the successful stream here
 *       console.log('Stream started:', stream);
 *     },
 *   },
 * });
 * ```
 *
 * @param {StartShareScreenOptions} options - The options for starting screen sharing.
 * @param {Object} options.parameters - The parameters controlling screen sharing behavior.
 * @param {boolean} options.parameters.shared - Indicates if the screen is currently shared.
 * @param {Function} options.parameters.showAlert - Function to display alerts.
 * @param {Function} options.parameters.updateShared - Function to update the shared state.
 * @param {boolean} options.parameters.onWeb - Indicates if the app is running in a web environment.
 * @param {number} [options.parameters.targetWidth=1280] - Optional width setting for shared screen resolution.
 * @param {number} [options.parameters.targetHeight=720] - Optional height setting for shared screen resolution.
 * @param {Function} options.parameters.streamSuccessScreen - Function to handle successful screen sharing.
 *
 * @method startShareScreen - Initiates the screen sharing process based on the provided parameters.
 * @returns {Promise<void>} Resolves when the screen sharing process is complete or fails.
 */
export class StartShareScreen {
    /**
     * Starts the screen sharing process.
     *
     * @param {StartShareScreenOptions} options - The options for starting screen sharing.
     * @param {Object} options.parameters - The parameters for screen sharing.
     * @param {boolean} options.parameters.shared - Indicates if the screen is currently being shared.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {Function} options.parameters.updateShared - Function to update the shared state.
     * @param {boolean} options.parameters.onWeb - Indicates if the application is running on a web platform.
     * @param {number} [options.parameters.targetWidth] - The target width for screen sharing.
     * @param {number} [options.parameters.targetHeight] - The target height for screen sharing.
     * @param {Function} options.parameters.streamSuccessScreen - Function to handle successful screen sharing.
     *
     * @returns {Promise<void>} A promise that resolves when the screen sharing process is complete.
     *
     * @throws Will log an error message if there is an issue starting the screen share.
     */
    startShareScreen = async ({ parameters }) => {
        // start screen share function
        // attempt to start screen share and return true if successful
        let { shared, showAlert, updateShared, onWeb, targetWidth = 1280, targetHeight = 720, streamSuccessScreen, } = parameters;
        try {
            if (!onWeb) {
                showAlert?.({
                    message: 'You cannot share screen while on mobile',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
            if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                shared = true;
                await navigator.mediaDevices
                    .getDisplayMedia({
                    video: {
                        width: targetWidth,
                        height: targetHeight,
                        frameRate: 30,
                    },
                    audio: false,
                })
                    .then(async (stream) => {
                    await streamSuccessScreen({ stream, parameters });
                })
                    .catch(async () => {
                    shared = false;
                    showAlert?.({
                        message: 'Could not share screen, check and retry',
                        type: 'danger',
                        duration: 3000,
                    });
                });
            }
            else {
                showAlert?.({
                    message: 'Could not share screen, check and retry',
                    type: 'danger',
                    duration: 3000,
                });
            }
            // update the shared variable
            updateShared(shared);
        }
        catch (error) {
            console.log('Error starting screen share', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartShareScreen, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartShareScreen, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartShareScreen, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtc2hhcmUtc2NyZWVuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3N0YXJ0LXNoYXJlLXNjcmVlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBcUIzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBTUgsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBMkIsRUFBaUIsRUFBRTtRQUNsRiw4QkFBOEI7UUFDOUIsOERBQThEO1FBRTlELElBQUksRUFDRixNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxHQUFHLElBQUksRUFDbEIsWUFBWSxHQUFHLEdBQUcsRUFDbEIsbUJBQW1CLEdBQ3BCLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNYLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSx5Q0FBeUM7b0JBQ2xELElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxPQUFPO1lBQ1QsQ0FBQztZQUVELElBQUksU0FBUyxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNyRSxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLE1BQU0sU0FBUyxDQUFDLFlBQVk7cUJBQ3pCLGVBQWUsQ0FBQztvQkFDZixLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLFdBQVc7d0JBQ2xCLE1BQU0sRUFBRSxZQUFZO3dCQUNwQixTQUFTLEVBQUUsRUFBRTtxQkFDZDtvQkFDRCxLQUFLLEVBQUUsS0FBSztpQkFDYixDQUFDO3FCQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBbUIsRUFBRSxFQUFFO29CQUNsQyxNQUFNLG1CQUFtQixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ2hCLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQ2YsU0FBUyxFQUFFLENBQUM7d0JBQ1YsT0FBTyxFQUFFLHlDQUF5Qzt3QkFDbEQsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsUUFBUSxFQUFFLElBQUk7cUJBQ2YsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSx5Q0FBeUM7b0JBQ2xELElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCw2QkFBNkI7WUFDN0IsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTdFUyxnQkFBZ0I7MkdBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzU2NyZWVuVHlwZSwgU3RyZWFtU3VjY2Vzc1NjcmVlblBhcmFtZXRlcnMsIFNob3dBbGVydCB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFN0YXJ0U2hhcmVTY3JlZW5QYXJhbWV0ZXJzIGV4dGVuZHMgU3RyZWFtU3VjY2Vzc1NjcmVlblBhcmFtZXRlcnMge1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgdXBkYXRlU2hhcmVkOiAoc2hhcmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICBvbldlYjogYm9vbGVhbjtcbiAgdGFyZ2V0V2lkdGg/OiBudW1iZXI7XG4gIHRhcmdldEhlaWdodD86IG51bWJlcjtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc3RyZWFtU3VjY2Vzc1NjcmVlbjogU3RyZWFtU3VjY2Vzc1NjcmVlblR5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFydFNoYXJlU2NyZWVuT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IFN0YXJ0U2hhcmVTY3JlZW5QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTdGFydFNoYXJlU2NyZWVuVHlwZSA9IChvcHRpb25zOiBTdGFydFNoYXJlU2NyZWVuT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcbi8qKlxuICogU3RhcnRTaGFyZVNjcmVlbiAtIFNlcnZpY2UgdG8gaW5pdGlhdGUgc2NyZWVuIHNoYXJpbmcgd2l0aCBjb25maWd1cmFibGUgb3B0aW9ucyBmb3IgZGlmZmVyZW50IGVudmlyb25tZW50cy5cbiAqXG4gKiBUaGlzIHNlcnZpY2UgaW5pdGlhdGVzIHRoZSBzY3JlZW4gc2hhcmluZyBwcm9jZXNzLCBoYW5kbGluZyBib3RoIHN1Y2Nlc3NmdWwgYW5kIGZhaWxlZCBhdHRlbXB0c1xuICogYW5kIHVwZGF0aW5nIHRoZSBzaGFyZWQgc3RhdGUgYWNjb3JkaW5nbHkuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBTdGFydFNoYXJlU2NyZWVuXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgc3RhcnRTaGFyZVNjcmVlblNlcnZpY2UgPSBuZXcgU3RhcnRTaGFyZVNjcmVlbigpO1xuICogYXdhaXQgc3RhcnRTaGFyZVNjcmVlblNlcnZpY2Uuc3RhcnRTaGFyZVNjcmVlbih7XG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBzaGFyZWQ6IGZhbHNlLFxuICogICAgIHNob3dBbGVydDogKGFsZXJ0KSA9PiBjb25zb2xlLmxvZyhhbGVydC5tZXNzYWdlKSxcbiAqICAgICB1cGRhdGVTaGFyZWQ6IChzaGFyZWQpID0+IGNvbnNvbGUubG9nKCdTaGFyZWQgc3RhdGU6Jywgc2hhcmVkKSxcbiAqICAgICBvbldlYjogdHJ1ZSxcbiAqICAgICB0YXJnZXRXaWR0aDogMTkyMCxcbiAqICAgICB0YXJnZXRIZWlnaHQ6IDEwODAsXG4gKiAgICAgc3RyZWFtU3VjY2Vzc1NjcmVlbjogYXN5bmMgKHsgc3RyZWFtIH0pID0+IHtcbiAqICAgICAgIC8vIEhhbmRsZSB0aGUgc3VjY2Vzc2Z1bCBzdHJlYW0gaGVyZVxuICogICAgICAgY29uc29sZS5sb2coJ1N0cmVhbSBzdGFydGVkOicsIHN0cmVhbSk7XG4gKiAgICAgfSxcbiAqICAgfSxcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdGFydFNoYXJlU2NyZWVuT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzdGFydGluZyBzY3JlZW4gc2hhcmluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBjb250cm9sbGluZyBzY3JlZW4gc2hhcmluZyBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGN1cnJlbnRseSBzaGFyZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gZGlzcGxheSBhbGVydHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzaGFyZWQgc3RhdGUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5vbldlYiAtIEluZGljYXRlcyBpZiB0aGUgYXBwIGlzIHJ1bm5pbmcgaW4gYSB3ZWIgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMucGFyYW1ldGVycy50YXJnZXRXaWR0aD0xMjgwXSAtIE9wdGlvbmFsIHdpZHRoIHNldHRpbmcgZm9yIHNoYXJlZCBzY3JlZW4gcmVzb2x1dGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnRhcmdldEhlaWdodD03MjBdIC0gT3B0aW9uYWwgaGVpZ2h0IHNldHRpbmcgZm9yIHNoYXJlZCBzY3JlZW4gcmVzb2x1dGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zdHJlYW1TdWNjZXNzU2NyZWVuIC0gRnVuY3Rpb24gdG8gaGFuZGxlIHN1Y2Nlc3NmdWwgc2NyZWVuIHNoYXJpbmcuXG4gKlxuICogQG1ldGhvZCBzdGFydFNoYXJlU2NyZWVuIC0gSW5pdGlhdGVzIHRoZSBzY3JlZW4gc2hhcmluZyBwcm9jZXNzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBzaGFyaW5nIHByb2Nlc3MgaXMgY29tcGxldGUgb3IgZmFpbHMuXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RhcnRTaGFyZVNjcmVlbiB7XG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIHNjcmVlbiBzaGFyaW5nIHByb2Nlc3MuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RhcnRTaGFyZVNjcmVlbk9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3RhcnRpbmcgc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3Igc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGN1cnJlbnRseSBiZWluZyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzaGFyZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm9uV2ViIC0gSW5kaWNhdGVzIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyBydW5uaW5nIG9uIGEgd2ViIHBsYXRmb3JtLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMucGFyYW1ldGVycy50YXJnZXRXaWR0aF0gLSBUaGUgdGFyZ2V0IHdpZHRoIGZvciBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnBhcmFtZXRlcnMudGFyZ2V0SGVpZ2h0XSAtIFRoZSB0YXJnZXQgaGVpZ2h0IGZvciBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0cmVhbVN1Y2Nlc3NTY3JlZW4gLSBGdW5jdGlvbiB0byBoYW5kbGUgc3VjY2Vzc2Z1bCBzY3JlZW4gc2hhcmluZy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBzaGFyaW5nIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBzdGFydGluZyB0aGUgc2NyZWVuIHNoYXJlLlxuICAgKi9cbiAgc3RhcnRTaGFyZVNjcmVlbiA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogU3RhcnRTaGFyZVNjcmVlbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBzdGFydCBzY3JlZW4gc2hhcmUgZnVuY3Rpb25cbiAgICAvLyBhdHRlbXB0IHRvIHN0YXJ0IHNjcmVlbiBzaGFyZSBhbmQgcmV0dXJuIHRydWUgaWYgc3VjY2Vzc2Z1bFxuXG4gICAgbGV0IHtcbiAgICAgIHNoYXJlZCxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIHVwZGF0ZVNoYXJlZCxcbiAgICAgIG9uV2ViLFxuICAgICAgdGFyZ2V0V2lkdGggPSAxMjgwLFxuICAgICAgdGFyZ2V0SGVpZ2h0ID0gNzIwLFxuICAgICAgc3RyZWFtU3VjY2Vzc1NjcmVlbixcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIW9uV2ViKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCBzaGFyZSBzY3JlZW4gd2hpbGUgb24gbW9iaWxlJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXREaXNwbGF5TWVkaWEpIHtcbiAgICAgICAgc2hhcmVkID0gdHJ1ZTtcbiAgICAgICAgYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgIC5nZXREaXNwbGF5TWVkaWEoe1xuICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgd2lkdGg6IHRhcmdldFdpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHRhcmdldEhlaWdodCxcbiAgICAgICAgICAgICAgZnJhbWVSYXRlOiAzMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihhc3luYyAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgc3RyZWFtU3VjY2Vzc1NjcmVlbih7IHN0cmVhbSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBzaGFyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ0NvdWxkIG5vdCBzaGFyZSBzY3JlZW4sIGNoZWNrIGFuZCByZXRyeScsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdDb3VsZCBub3Qgc2hhcmUgc2NyZWVuLCBjaGVjayBhbmQgcmV0cnknLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIHRoZSBzaGFyZWQgdmFyaWFibGVcbiAgICAgIHVwZGF0ZVNoYXJlZChzaGFyZWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3Igc3RhcnRpbmcgc2NyZWVuIHNoYXJlJywgZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==