import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Switches the video input based on user preference and current state.
 *
 * @param {SwitchVideoAltOptions} options - The options for switching the video input.
 * @param {SwitchVideoAltParameters} options.parameters - The parameters required for switching the video input.
 * @param {boolean} options.parameters.recordStarted - Indicates if recording has started.
 * @param {boolean} options.parameters.recordResumed - Indicates if recording has resumed.
 * @param {boolean} options.parameters.recordStopped - Indicates if recording has stopped.
 * @param {boolean} options.parameters.recordPaused - Indicates if recording is paused.
 * @param {string} options.parameters.recordingMediaOptions - The current media options (e.g., "video").
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is currently on.
 * @param {string} options.parameters.currentFacingMode - The current facing mode of the camera (e.g., "environment").
 * @param {boolean} options.parameters.allowed - Indicates if the user is allowed to switch video.
 * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the current room is audio-only.
 * @param {Function} options.parameters.updateCurrentFacingMode - Function to update the current facing mode.
 * @param {Function} options.parameters.updateIsMediaSettingsModalVisible - Function to update the visibility of the media settings modal.
 * @param {Function} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {Function} options.parameters.switchUserVideoAlt - Function to switch the user's video input.
 *
 * @returns {Promise<void>} A promise that resolves when the video input has been switched.
 *
 * @remarks
 * This function checks if the user is allowed to switch the video input based on the current state,
 * and it shows alerts if there are any issues. If the video is already on, it cannot be switched until
 * it is turned off, and vice versa. The facing mode of the camera is toggled between "user" and "environment".
 *
 * @example
 * ```typescript
 * const options: SwitchVideoAltOptions = {
 *   parameters: {
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordStopped: false,
 *     recordPaused: false,
 *     recordingMediaOptions: 'video',
 *     videoAlreadyOn: true,
 *     currentFacingMode: 'user',
 *     allowed: true,
 *     audioOnlyRoom: false,
 *     updateCurrentFacingMode: (mode) => console.log(`Facing mode updated to: ${mode}`),
 *     updateIsMediaSettingsModalVisible: (isVisible) => console.log(`Media settings modal is now ${isVisible ? 'visible' : 'hidden'}`),
 *     switchUserVideoAlt: async ({ videoPreference }) => console.log(`Switched video to: ${videoPreference}`),
 *     getUpdatedAllParams: () => ({ }),
 *   },
 * };
 *
 * const switchVideoService = new SwitchVideoAlt();
 * await switchVideoService.switchVideoAlt(options);
 * ```
 */
export class SwitchVideoAlt {
    async switchVideoAlt({ parameters }) {
        let { recordStarted, recordResumed, recordStopped, recordPaused, recordingMediaOptions, videoAlreadyOn, currentFacingMode, allowed, audioOnlyRoom, updateCurrentFacingMode, updateIsMediaSettingsModalVisible, showAlert, 
        //media functions
        switchUserVideoAlt, } = parameters;
        if (audioOnlyRoom) {
            showAlert?.({
                message: 'You cannot turn on your camera in an audio-only event.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        let checkoff = false;
        if ((recordStarted || recordResumed) &&
            !recordStopped &&
            !recordPaused &&
            recordingMediaOptions === 'video') {
            checkoff = true;
        }
        if (!allowed) {
            showAlert?.({
                message: 'Allow access to your camera by starting it for the first time.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
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
        // Camera switching logic here
        let newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
        updateCurrentFacingMode(newFacingMode);
        updateIsMediaSettingsModalVisible(false);
        await switchUserVideoAlt({ videoPreference: newFacingMode, checkoff, parameters });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideoAlt, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideoAlt, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideoAlt, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXZpZGVvLWFsdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvc3dpdGNoLXZpZGVvLWFsdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBaUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlERztBQUtILE1BQU0sT0FBTyxjQUFjO0lBQ3pCLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQXlCO1FBQ3hELElBQUksRUFDRixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsT0FBTyxFQUNQLGFBQWEsRUFDYix1QkFBdUIsRUFDdkIsaUNBQWlDLEVBRWpDLFNBQVM7UUFFVCxpQkFBaUI7UUFDakIsa0JBQWtCLEdBQ25CLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsd0RBQXdEO2dCQUNqRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQ0UsQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDO1lBQ2hDLENBQUMsYUFBYTtZQUNkLENBQUMsWUFBWTtZQUNiLHFCQUFxQixLQUFLLE9BQU8sRUFDakMsQ0FBQztZQUNELFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDbEIsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxnRUFBZ0U7Z0JBQ3pFLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ2IsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLDhDQUE4QztvQkFDdkQsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUNILE9BQU87WUFDVCxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3BCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSw2Q0FBNkM7b0JBQ3RELElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxPQUFPO1lBQ1QsQ0FBQztRQUNILENBQUM7UUFFRCw4QkFBOEI7UUFDOUIsSUFBSSxhQUFhLEdBQUcsaUJBQWlCLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUVqRix1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QyxNQUFNLGtCQUFrQixDQUFDLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNyRixDQUFDO3VHQTVFVSxjQUFjOzJHQUFkLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCwgU3dpdGNoVXNlclZpZGVvQWx0VHlwZSwgU3dpdGNoVXNlclZpZGVvUGFyYW1ldGVycyB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVmlkZW9BbHRQYXJhbWV0ZXJzIGV4dGVuZHMgU3dpdGNoVXNlclZpZGVvUGFyYW1ldGVycyB7XG4gIHJlY29yZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHJlY29yZFJlc3VtZWQ6IGJvb2xlYW47XG4gIHJlY29yZFN0b3BwZWQ6IGJvb2xlYW47XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiBzdHJpbmc7XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICBjdXJyZW50RmFjaW5nTW9kZTogc3RyaW5nO1xuICBwcmV2RmFjaW5nTW9kZTogc3RyaW5nO1xuICBhbGxvd2VkOiBib29sZWFuO1xuICBhdWRpb09ubHlSb29tOiBib29sZWFuO1xuICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZTogKG1vZGU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUHJldkZhY2luZ01vZGU6IChtb2RlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzd2l0Y2hVc2VyVmlkZW9BbHQ6IFN3aXRjaFVzZXJWaWRlb0FsdFR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gU3dpdGNoVmlkZW9BbHRQYXJhbWV0ZXJzO1xuICAvLyBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVmlkZW9BbHRPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogU3dpdGNoVmlkZW9BbHRQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTd2l0Y2hWaWRlb0FsdFR5cGUgPSAob3B0aW9uczogU3dpdGNoVmlkZW9BbHRPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFN3aXRjaGVzIHRoZSB2aWRlbyBpbnB1dCBiYXNlZCBvbiB1c2VyIHByZWZlcmVuY2UgYW5kIGN1cnJlbnQgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtTd2l0Y2hWaWRlb0FsdE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3dpdGNoaW5nIHRoZSB2aWRlbyBpbnB1dC5cbiAqIEBwYXJhbSB7U3dpdGNoVmlkZW9BbHRQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3dpdGNoaW5nIHRoZSB2aWRlbyBpbnB1dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgcmVjb3JkaW5nIGhhcyBzdGFydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZCAtIEluZGljYXRlcyBpZiByZWNvcmRpbmcgaGFzIHJlc3VtZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdG9wcGVkIC0gSW5kaWNhdGVzIGlmIHJlY29yZGluZyBoYXMgc3RvcHBlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEluZGljYXRlcyBpZiByZWNvcmRpbmcgaXMgcGF1c2VkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUaGUgY3VycmVudCBtZWRpYSBvcHRpb25zIChlLmcuLCBcInZpZGVvXCIpLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGN1cnJlbnRseSBvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuY3VycmVudEZhY2luZ01vZGUgLSBUaGUgY3VycmVudCBmYWNpbmcgbW9kZSBvZiB0aGUgY2FtZXJhIChlLmcuLCBcImVudmlyb25tZW50XCIpLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYWxsb3dlZCAtIEluZGljYXRlcyBpZiB0aGUgdXNlciBpcyBhbGxvd2VkIHRvIHN3aXRjaCB2aWRlby5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvT25seVJvb20gLSBJbmRpY2F0ZXMgaWYgdGhlIGN1cnJlbnQgcm9vbSBpcyBhdWRpby1vbmx5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjdXJyZW50IGZhY2luZyBtb2RlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWwuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN3aXRjaFVzZXJWaWRlb0FsdCAtIEZ1bmN0aW9uIHRvIHN3aXRjaCB0aGUgdXNlcidzIHZpZGVvIGlucHV0LlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2aWRlbyBpbnB1dCBoYXMgYmVlbiBzd2l0Y2hlZC5cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIHVzZXIgaXMgYWxsb3dlZCB0byBzd2l0Y2ggdGhlIHZpZGVvIGlucHV0IGJhc2VkIG9uIHRoZSBjdXJyZW50IHN0YXRlLFxuICogYW5kIGl0IHNob3dzIGFsZXJ0cyBpZiB0aGVyZSBhcmUgYW55IGlzc3Vlcy4gSWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24sIGl0IGNhbm5vdCBiZSBzd2l0Y2hlZCB1bnRpbFxuICogaXQgaXMgdHVybmVkIG9mZiwgYW5kIHZpY2UgdmVyc2EuIFRoZSBmYWNpbmcgbW9kZSBvZiB0aGUgY2FtZXJhIGlzIHRvZ2dsZWQgYmV0d2VlbiBcInVzZXJcIiBhbmQgXCJlbnZpcm9ubWVudFwiLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBTd2l0Y2hWaWRlb0FsdE9wdGlvbnMgPSB7XG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICByZWNvcmRTdGFydGVkOiBmYWxzZSxcbiAqICAgICByZWNvcmRSZXN1bWVkOiBmYWxzZSxcbiAqICAgICByZWNvcmRTdG9wcGVkOiBmYWxzZSxcbiAqICAgICByZWNvcmRQYXVzZWQ6IGZhbHNlLFxuICogICAgIHJlY29yZGluZ01lZGlhT3B0aW9uczogJ3ZpZGVvJyxcbiAqICAgICB2aWRlb0FscmVhZHlPbjogdHJ1ZSxcbiAqICAgICBjdXJyZW50RmFjaW5nTW9kZTogJ3VzZXInLFxuICogICAgIGFsbG93ZWQ6IHRydWUsXG4gKiAgICAgYXVkaW9Pbmx5Um9vbTogZmFsc2UsXG4gKiAgICAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGU6IChtb2RlKSA9PiBjb25zb2xlLmxvZyhgRmFjaW5nIG1vZGUgdXBkYXRlZCB0bzogJHttb2RlfWApLFxuICogICAgIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZSkgPT4gY29uc29sZS5sb2coYE1lZGlhIHNldHRpbmdzIG1vZGFsIGlzIG5vdyAke2lzVmlzaWJsZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nfWApLFxuICogICAgIHN3aXRjaFVzZXJWaWRlb0FsdDogYXN5bmMgKHsgdmlkZW9QcmVmZXJlbmNlIH0pID0+IGNvbnNvbGUubG9nKGBTd2l0Y2hlZCB2aWRlbyB0bzogJHt2aWRlb1ByZWZlcmVuY2V9YCksXG4gKiAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gKHsgfSksXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGNvbnN0IHN3aXRjaFZpZGVvU2VydmljZSA9IG5ldyBTd2l0Y2hWaWRlb0FsdCgpO1xuICogYXdhaXQgc3dpdGNoVmlkZW9TZXJ2aWNlLnN3aXRjaFZpZGVvQWx0KG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN3aXRjaFZpZGVvQWx0IHtcbiAgYXN5bmMgc3dpdGNoVmlkZW9BbHQoeyBwYXJhbWV0ZXJzIH06IFN3aXRjaFZpZGVvQWx0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB7XG4gICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgcmVjb3JkUmVzdW1lZCxcbiAgICAgIHJlY29yZFN0b3BwZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRpbmdNZWRpYU9wdGlvbnMsXG4gICAgICB2aWRlb0FscmVhZHlPbixcbiAgICAgIGN1cnJlbnRGYWNpbmdNb2RlLFxuICAgICAgYWxsb3dlZCxcbiAgICAgIGF1ZGlvT25seVJvb20sXG4gICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZSxcbiAgICAgIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSxcblxuICAgICAgc2hvd0FsZXJ0LFxuXG4gICAgICAvL21lZGlhIGZ1bmN0aW9uc1xuICAgICAgc3dpdGNoVXNlclZpZGVvQWx0LFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgaWYgKGF1ZGlvT25seVJvb20pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYSBpbiBhbiBhdWRpby1vbmx5IGV2ZW50LicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjaGVja29mZiA9IGZhbHNlO1xuICAgIGlmIChcbiAgICAgIChyZWNvcmRTdGFydGVkIHx8IHJlY29yZFJlc3VtZWQpICYmXG4gICAgICAhcmVjb3JkU3RvcHBlZCAmJlxuICAgICAgIXJlY29yZFBhdXNlZCAmJlxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zID09PSAndmlkZW8nXG4gICAgKSB7XG4gICAgICBjaGVja29mZiA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFhbGxvd2VkKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdBbGxvdyBhY2Nlc3MgdG8geW91ciBjYW1lcmEgYnkgc3RhcnRpbmcgaXQgZm9yIHRoZSBmaXJzdCB0aW1lLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGVja29mZikge1xuICAgICAgaWYgKHZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIHR1cm4gb2ZmIHlvdXIgdmlkZW8gYmVmb3JlIHN3aXRjaGluZy4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIHR1cm4gb24geW91ciB2aWRlbyBiZWZvcmUgc3dpdGNoaW5nLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FtZXJhIHN3aXRjaGluZyBsb2dpYyBoZXJlXG4gICAgbGV0IG5ld0ZhY2luZ01vZGUgPSBjdXJyZW50RmFjaW5nTW9kZSA9PT0gJ2Vudmlyb25tZW50JyA/ICd1c2VyJyA6ICdlbnZpcm9ubWVudCc7XG5cbiAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZShuZXdGYWNpbmdNb2RlKTtcbiAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgYXdhaXQgc3dpdGNoVXNlclZpZGVvQWx0KHsgdmlkZW9QcmVmZXJlbmNlOiBuZXdGYWNpbmdNb2RlLCBjaGVja29mZiwgcGFyYW1ldGVycyB9KTtcbiAgfVxufVxuIl19