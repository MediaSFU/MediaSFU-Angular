import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Switches the user's video device based on the provided video preference.
 *
 * @param {SwitchVideoOptions} options - The options for switching the video input.
 * @param {string} options.videoPreference - The preferred video device to switch to.
 * @param {SwitchVideoParameters} options.parameters - The parameters required for switching the video input.
 * @param {boolean} options.parameters.recordStarted - Indicates if recording has started.
 * @param {boolean} options.parameters.recordResumed - Indicates if recording has resumed.
 * @param {boolean} options.parameters.recordStopped - Indicates if recording has stopped.
 * @param {boolean} options.parameters.recordPaused - Indicates if recording is paused.
 * @param {string} options.parameters.recordingMediaOptions - The current media options (e.g., "video").
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is currently on.
 * @param {string} options.parameters.userDefaultVideoInputDevice - The default video input device for the user.
 * @param {string} options.parameters.defVideoID - The default video ID for the input device.
 * @param {boolean} options.parameters.allowed - Indicates if the user is allowed to switch video.
 * @param {Function} options.parameters.updateDefVideoID - Function to update the default video ID.
 * @param {Function} options.parameters.updatePrevVideoInputDevice - Function to update the previous video input device.
 * @param {Function} options.parameters.updateUserDefaultVideoInputDevice - Function to update the user’s default video input device.
 * @param {Function} options.parameters.updateIsMediaSettingsModalVisible - Function to update the visibility of the media settings modal.
 * @param {Function} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {Function} options.parameters.switchUserVideo - Function to switch the user's video input.
 *
 * @returns {Promise<void>} A promise that resolves when the video input has been switched.
 *
 * @remarks
 * This function checks if the user is allowed to switch the video input based on the current state,
 * and it shows alerts if there are any issues. If the video is already on, it cannot be switched until
 * it is turned off, and vice versa. The default video input device is updated if necessary.
 *
 * @example
 * ```typescript
 * const options: SwitchVideoOptions = {
 *   videoPreference: 'newDeviceId',
 *   parameters: {
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordStopped: false,
 *     recordPaused: false,
 *     recordingMediaOptions: 'video',
 *     videoAlreadyOn: true,
 *     userDefaultVideoInputDevice: 'currentDeviceId',
 *     defVideoID: 'defaultDeviceId',
 *     allowed: true,
 *     updateDefVideoID: (deviceId) => console.log(`Default video ID updated to: ${deviceId}`),
 *     updatePrevVideoInputDevice: (deviceId) => console.log(`Previous video input device updated to: ${deviceId}`),
 *     updateUserDefaultVideoInputDevice: (deviceId) => console.log(`User default video input device updated to: ${deviceId}`),
 *     updateIsMediaSettingsModalVisible: (isVisible) => console.log(`Media settings modal is now ${isVisible ? 'visible' : 'hidden'}`),
 *     switchUserVideo: async ({ videoPreference }) => console.log(`Switched video to: ${videoPreference}`),
 *     getUpdatedAllParams: () => ({ }),
 *   },
 * };
 *
 * const switchVideoService = new SwitchVideo();
 * await switchVideoService.switchVideo(options);
 * ```
 */
export class SwitchVideo {
    /**
     * Switches the user's video device based on the provided video preference.
     *
     * @param {SwitchVideoParams} options - The function parameters.
     */
    async switchVideo({ videoPreference, parameters }) {
        let { recordStarted, recordResumed, recordStopped, recordPaused, recordingMediaOptions, videoAlreadyOn, userDefaultVideoInputDevice, defVideoID, allowed, updateDefVideoID, updatePrevVideoInputDevice, updateUserDefaultVideoInputDevice, updateIsMediaSettingsModalVisible, 
        //mediasfu functions
        showAlert, switchUserVideo, } = parameters;
        // Check if recording is in progress and whether the selected video device is the default one
        let checkoff = false;
        if ((recordStarted || recordResumed) && !recordStopped && !recordPaused) {
            if (recordingMediaOptions === 'video') {
                checkoff = true;
            }
        }
        // Check camera access permission
        if (!allowed) {
            showAlert?.({
                message: 'Allow access to your camera by starting it for the first time.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        // Check video state and display appropriate alert messages
        if (checkoff) {
            if (videoAlreadyOn) {
                showAlert?.({
                    message: 'Please turn off your video before switching.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        else {
            if (!videoAlreadyOn) {
                showAlert?.({
                    message: 'Please turn on your video before switching.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        // Set default video ID if not already set
        if (!defVideoID) {
            defVideoID = userDefaultVideoInputDevice ?? 'default';
            updateDefVideoID(defVideoID);
        }
        // Switch video only if the selected video device is different from the default
        if (videoPreference !== defVideoID) {
            const prevVideoInputDevice = userDefaultVideoInputDevice;
            updatePrevVideoInputDevice(prevVideoInputDevice);
            userDefaultVideoInputDevice = videoPreference;
            updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);
            if (defVideoID) {
                updateIsMediaSettingsModalVisible(false);
                await switchUserVideo({ videoPreference, checkoff, parameters });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideo, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideo, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideo, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXZpZGVvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9zd2l0Y2gtdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWlDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1REc7QUFLSCxNQUFNLE9BQU8sV0FBVztJQUN0Qjs7OztPQUlHO0lBRUgsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQXNCO1FBQ25FLElBQUksRUFDRixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLGNBQWMsRUFDZCwyQkFBMkIsRUFDM0IsVUFBVSxFQUNWLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsMEJBQTBCLEVBQzFCLGlDQUFpQyxFQUNqQyxpQ0FBaUM7UUFFakMsb0JBQW9CO1FBQ3BCLFNBQVMsRUFDVCxlQUFlLEdBQ2hCLEdBQUcsVUFBVSxDQUFDO1FBRWYsNkZBQTZGO1FBQzdGLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEUsSUFBSSxxQkFBcUIsS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDdEMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNsQixDQUFDO1FBQ0gsQ0FBQztRQUVELGlDQUFpQztRQUNqQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDYixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsZ0VBQWdFO2dCQUN6RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsMkRBQTJEO1FBQzNELElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsOENBQThDO29CQUN2RCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7Z0JBQ0gsT0FBTztZQUNULENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDcEIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLDZDQUE2QztvQkFDdEQsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUNILE9BQU87WUFDVCxDQUFDO1FBQ0gsQ0FBQztRQUVELDBDQUEwQztRQUMxQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEIsVUFBVSxHQUFHLDJCQUEyQixJQUFJLFNBQVMsQ0FBQztZQUN0RCxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsK0VBQStFO1FBQy9FLElBQUksZUFBZSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ25DLE1BQU0sb0JBQW9CLEdBQUcsMkJBQTJCLENBQUM7WUFDekQsMEJBQTBCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVqRCwyQkFBMkIsR0FBRyxlQUFlLENBQUM7WUFDOUMsaUNBQWlDLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUUvRCxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUNmLGlDQUFpQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLGVBQWUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUNuRSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7dUdBdEZVLFdBQVc7MkdBQVgsV0FBVyxjQUZWLE1BQU07OzJGQUVQLFdBQVc7a0JBSHZCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0LCBTd2l0Y2hVc2VyVmlkZW9QYXJhbWV0ZXJzLCBTd2l0Y2hVc2VyVmlkZW9UeXBlIH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTd2l0Y2hWaWRlb1BhcmFtZXRlcnMgZXh0ZW5kcyBTd2l0Y2hVc2VyVmlkZW9QYXJhbWV0ZXJzIHtcbiAgcmVjb3JkU3RhcnRlZDogYm9vbGVhbjtcbiAgcmVjb3JkUmVzdW1lZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcmVjb3JkUGF1c2VkOiBib29sZWFuO1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZztcbiAgdmlkZW9BbHJlYWR5T246IGJvb2xlYW47XG4gIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogc3RyaW5nO1xuICBkZWZWaWRlb0lEOiBzdHJpbmc7XG4gIGFsbG93ZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZURlZlZpZGVvSUQ6IChkZXZpY2VJZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZTogKGRldmljZUlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogKGRldmljZUlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuXG4gIC8vIE1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzd2l0Y2hVc2VyVmlkZW86IFN3aXRjaFVzZXJWaWRlb1R5cGU7XG5cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaFZpZGVvT3B0aW9ucyB7XG4gIHZpZGVvUHJlZmVyZW5jZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBTd2l0Y2hWaWRlb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN3aXRjaFZpZGVvVHlwZSA9IChvcHRpb25zOiBTd2l0Y2hWaWRlb09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU3dpdGNoZXMgdGhlIHVzZXIncyB2aWRlbyBkZXZpY2UgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHZpZGVvIHByZWZlcmVuY2UuXG4gKlxuICogQHBhcmFtIHtTd2l0Y2hWaWRlb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3dpdGNoaW5nIHRoZSB2aWRlbyBpbnB1dC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnZpZGVvUHJlZmVyZW5jZSAtIFRoZSBwcmVmZXJyZWQgdmlkZW8gZGV2aWNlIHRvIHN3aXRjaCB0by5cbiAqIEBwYXJhbSB7U3dpdGNoVmlkZW9QYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3dpdGNoaW5nIHRoZSB2aWRlbyBpbnB1dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgcmVjb3JkaW5nIGhhcyBzdGFydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZCAtIEluZGljYXRlcyBpZiByZWNvcmRpbmcgaGFzIHJlc3VtZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdG9wcGVkIC0gSW5kaWNhdGVzIGlmIHJlY29yZGluZyBoYXMgc3RvcHBlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEluZGljYXRlcyBpZiByZWNvcmRpbmcgaXMgcGF1c2VkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUaGUgY3VycmVudCBtZWRpYSBvcHRpb25zIChlLmcuLCBcInZpZGVvXCIpLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGN1cnJlbnRseSBvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMudXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlIC0gVGhlIGRlZmF1bHQgdmlkZW8gaW5wdXQgZGV2aWNlIGZvciB0aGUgdXNlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZGVmVmlkZW9JRCAtIFRoZSBkZWZhdWx0IHZpZGVvIElEIGZvciB0aGUgaW5wdXQgZGV2aWNlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYWxsb3dlZCAtIEluZGljYXRlcyBpZiB0aGUgdXNlciBpcyBhbGxvd2VkIHRvIHN3aXRjaCB2aWRlby5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVEZWZWaWRlb0lEIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBkZWZhdWx0IHZpZGVvIElELlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVByZXZWaWRlb0lucHV0RGV2aWNlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcmV2aW91cyB2aWRlbyBpbnB1dCBkZXZpY2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB1c2Vy4oCZcyBkZWZhdWx0IHZpZGVvIGlucHV0IGRldmljZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1lZGlhIHNldHRpbmdzIG1vZGFsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zd2l0Y2hVc2VyVmlkZW8gLSBGdW5jdGlvbiB0byBzd2l0Y2ggdGhlIHVzZXIncyB2aWRlbyBpbnB1dC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgdmlkZW8gaW5wdXQgaGFzIGJlZW4gc3dpdGNoZWQuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSB1c2VyIGlzIGFsbG93ZWQgdG8gc3dpdGNoIHRoZSB2aWRlbyBpbnB1dCBiYXNlZCBvbiB0aGUgY3VycmVudCBzdGF0ZSxcbiAqIGFuZCBpdCBzaG93cyBhbGVydHMgaWYgdGhlcmUgYXJlIGFueSBpc3N1ZXMuIElmIHRoZSB2aWRlbyBpcyBhbHJlYWR5IG9uLCBpdCBjYW5ub3QgYmUgc3dpdGNoZWQgdW50aWxcbiAqIGl0IGlzIHR1cm5lZCBvZmYsIGFuZCB2aWNlIHZlcnNhLiBUaGUgZGVmYXVsdCB2aWRlbyBpbnB1dCBkZXZpY2UgaXMgdXBkYXRlZCBpZiBuZWNlc3NhcnkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IFN3aXRjaFZpZGVvT3B0aW9ucyA9IHtcbiAqICAgdmlkZW9QcmVmZXJlbmNlOiAnbmV3RGV2aWNlSWQnLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgcmVjb3JkU3RhcnRlZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkUmVzdW1lZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkU3RvcHBlZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkUGF1c2VkOiBmYWxzZSxcbiAqICAgICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6ICd2aWRlbycsXG4gKiAgICAgdmlkZW9BbHJlYWR5T246IHRydWUsXG4gKiAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiAnY3VycmVudERldmljZUlkJyxcbiAqICAgICBkZWZWaWRlb0lEOiAnZGVmYXVsdERldmljZUlkJyxcbiAqICAgICBhbGxvd2VkOiB0cnVlLFxuICogICAgIHVwZGF0ZURlZlZpZGVvSUQ6IChkZXZpY2VJZCkgPT4gY29uc29sZS5sb2coYERlZmF1bHQgdmlkZW8gSUQgdXBkYXRlZCB0bzogJHtkZXZpY2VJZH1gKSxcbiAqICAgICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZTogKGRldmljZUlkKSA9PiBjb25zb2xlLmxvZyhgUHJldmlvdXMgdmlkZW8gaW5wdXQgZGV2aWNlIHVwZGF0ZWQgdG86ICR7ZGV2aWNlSWR9YCksXG4gKiAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiAoZGV2aWNlSWQpID0+IGNvbnNvbGUubG9nKGBVc2VyIGRlZmF1bHQgdmlkZW8gaW5wdXQgZGV2aWNlIHVwZGF0ZWQgdG86ICR7ZGV2aWNlSWR9YCksXG4gKiAgICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiBjb25zb2xlLmxvZyhgTWVkaWEgc2V0dGluZ3MgbW9kYWwgaXMgbm93ICR7aXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbid9YCksXG4gKiAgICAgc3dpdGNoVXNlclZpZGVvOiBhc3luYyAoeyB2aWRlb1ByZWZlcmVuY2UgfSkgPT4gY29uc29sZS5sb2coYFN3aXRjaGVkIHZpZGVvIHRvOiAke3ZpZGVvUHJlZmVyZW5jZX1gKSxcbiAqICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiAoeyB9KSxcbiAqICAgfSxcbiAqIH07XG4gKlxuICogY29uc3Qgc3dpdGNoVmlkZW9TZXJ2aWNlID0gbmV3IFN3aXRjaFZpZGVvKCk7XG4gKiBhd2FpdCBzd2l0Y2hWaWRlb1NlcnZpY2Uuc3dpdGNoVmlkZW8ob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3dpdGNoVmlkZW8ge1xuICAvKipcbiAgICogU3dpdGNoZXMgdGhlIHVzZXIncyB2aWRlbyBkZXZpY2UgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHZpZGVvIHByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7U3dpdGNoVmlkZW9QYXJhbXN9IG9wdGlvbnMgLSBUaGUgZnVuY3Rpb24gcGFyYW1ldGVycy5cbiAgICovXG5cbiAgYXN5bmMgc3dpdGNoVmlkZW8oeyB2aWRlb1ByZWZlcmVuY2UsIHBhcmFtZXRlcnMgfTogU3dpdGNoVmlkZW9PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHtcbiAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICByZWNvcmRSZXN1bWVkLFxuICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgIHJlY29yZFBhdXNlZCxcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLFxuICAgICAgZGVmVmlkZW9JRCxcbiAgICAgIGFsbG93ZWQsXG4gICAgICB1cGRhdGVEZWZWaWRlb0lELFxuICAgICAgdXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2UsXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UsXG4gICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUsXG5cbiAgICAgIC8vbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICBzaG93QWxlcnQsXG4gICAgICBzd2l0Y2hVc2VyVmlkZW8sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBDaGVjayBpZiByZWNvcmRpbmcgaXMgaW4gcHJvZ3Jlc3MgYW5kIHdoZXRoZXIgdGhlIHNlbGVjdGVkIHZpZGVvIGRldmljZSBpcyB0aGUgZGVmYXVsdCBvbmVcbiAgICBsZXQgY2hlY2tvZmYgPSBmYWxzZTtcbiAgICBpZiAoKHJlY29yZFN0YXJ0ZWQgfHwgcmVjb3JkUmVzdW1lZCkgJiYgIXJlY29yZFN0b3BwZWQgJiYgIXJlY29yZFBhdXNlZCkge1xuICAgICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBjaGVja29mZiA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgY2FtZXJhIGFjY2VzcyBwZXJtaXNzaW9uXG4gICAgaWYgKCFhbGxvd2VkKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdBbGxvdyBhY2Nlc3MgdG8geW91ciBjYW1lcmEgYnkgc3RhcnRpbmcgaXQgZm9yIHRoZSBmaXJzdCB0aW1lLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHZpZGVvIHN0YXRlIGFuZCBkaXNwbGF5IGFwcHJvcHJpYXRlIGFsZXJ0IG1lc3NhZ2VzXG4gICAgaWYgKGNoZWNrb2ZmKSB7XG4gICAgICBpZiAodmlkZW9BbHJlYWR5T24pIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgdHVybiBvZmYgeW91ciB2aWRlbyBiZWZvcmUgc3dpdGNoaW5nLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdmlkZW9BbHJlYWR5T24pIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgdHVybiBvbiB5b3VyIHZpZGVvIGJlZm9yZSBzd2l0Y2hpbmcuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgZGVmYXVsdCB2aWRlbyBJRCBpZiBub3QgYWxyZWFkeSBzZXRcbiAgICBpZiAoIWRlZlZpZGVvSUQpIHtcbiAgICAgIGRlZlZpZGVvSUQgPSB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPz8gJ2RlZmF1bHQnO1xuICAgICAgdXBkYXRlRGVmVmlkZW9JRChkZWZWaWRlb0lEKTtcbiAgICB9XG5cbiAgICAvLyBTd2l0Y2ggdmlkZW8gb25seSBpZiB0aGUgc2VsZWN0ZWQgdmlkZW8gZGV2aWNlIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBkZWZhdWx0XG4gICAgaWYgKHZpZGVvUHJlZmVyZW5jZSAhPT0gZGVmVmlkZW9JRCkge1xuICAgICAgY29uc3QgcHJldlZpZGVvSW5wdXREZXZpY2UgPSB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U7XG4gICAgICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZShwcmV2VmlkZW9JbnB1dERldmljZSk7XG5cbiAgICAgIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSA9IHZpZGVvUHJlZmVyZW5jZTtcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSh1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UpO1xuXG4gICAgICBpZiAoZGVmVmlkZW9JRCkge1xuICAgICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICBhd2FpdCBzd2l0Y2hVc2VyVmlkZW8oeyB2aWRlb1ByZWZlcmVuY2UsIGNoZWNrb2ZmLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19