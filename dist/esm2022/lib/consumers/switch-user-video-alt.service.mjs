import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../methods/stream-methods/click-video.service";
/**
 * Switches the user's video stream based on the provided video preference and other parameters.
 *
 * This method manages the process of switching the user's video input device,
 * checking permissions, and updating the relevant application state.
 * If the specified device is not accessible, it attempts to find an alternative.
 *
 * @param {SwitchUserVideoAltOptions} options - The options for switching the user's video.
 * @param {string} options.videoPreference - The preferred video input device ID.
 * @param {boolean} options.checkoff - A flag indicating whether to turn off the video before switching.
 * @param {SwitchUserVideoAltParameters} options.parameters - The parameters required for switching the video.
 * @param {Function} options.parameters.showAlert - Function to show alert messages to the user.
 * @param {boolean} options.parameters.hasCameraPermission - Flag indicating if the user has granted camera permission.
 * @param {Function} options.parameters.updateVideoSwitching - Function to update the video switching state.
 * @param {Function} options.parameters.requestPermissionCamera - Function to request camera permission from the user.
 * @param {Function} options.parameters.checkMediaPermission - Function to check if media permissions are granted.
 *
 * @returns {Promise<void>} A promise that resolves when the video switching is complete.
 *
 * @throws Will throw an error if the audio input device cannot be accessed or if there is an unexpected error.
 *
 * @example
 * await switchUserVideoAlt({
 *   videoPreference: 'user',
 *   checkoff: false,
 *   parameters: {
 *     hasCameraPermission: true,
 *     updateVideoSwitching: (state) => { /* update state *\/ },
 *     // other parameters...
 *   },
 * });
 */
export class SwitchUserVideoAlt {
    ClickVideoService;
    constructor(ClickVideoService) {
        this.ClickVideoService = ClickVideoService;
    }
    /**
     * Switches the user's video stream based on the provided video preference and other parameters.
     *
     * @param {Object} options - The options for switching the user's video.
     * @param {string} options.videoPreference - The preferred video facing mode (e.g., "user" or "environment").
     * @param {boolean} options.checkoff - A flag indicating whether to turn off the video before switching.
     * @param {SwitchUserVideoAltOptions} options.parameters - The parameters required for switching the video.
     *
     * @returns {Promise<void>} A promise that resolves when the video switching is complete.
     *
     * @throws Will throw an error if there is an issue with switching the video.
     */
    async switchUserVideoAlt({ videoPreference, checkoff, parameters, }) {
        let { getUpdatedAllParams } = parameters;
        let parameters_ = getUpdatedAllParams();
        let { audioOnlyRoom, frameRate, vidCons, showAlert, hasCameraPermission, updateVideoSwitching, updateCurrentFacingMode, 
        // mediasfu functions
        requestPermissionCamera, streamSuccessVideo, sleep, checkMediaPermission, } = parameters;
        let { currentFacingMode, prevFacingMode } = parameters_;
        try {
            // Check if it's an audio-only room
            if (audioOnlyRoom) {
                showAlert?.({
                    message: 'You cannot turn on your camera in an audio-only event.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
            // If checkoff is not true, trigger a click on the video button to turn off the video
            if (!checkoff) {
                await this.ClickVideoService.clickVideo({ parameters });
                updateVideoSwitching(true);
                await sleep({ ms: 500 });
                updateVideoSwitching(false);
            }
            // Check camera permission
            if (!hasCameraPermission) {
                if (checkMediaPermission) {
                    let statusCamera = await requestPermissionCamera();
                    if (statusCamera !== 'granted') {
                        showAlert?.({
                            message: 'Allow access to your camera or check if your camera is not being used by another application.',
                            type: 'danger',
                            duration: 3000,
                        });
                        return;
                    }
                }
            }
            // Enumerate video devices
            const videoDevices = await navigator.mediaDevices.enumerateDevices();
            // Define media constraints based on preferences and options
            let mediaConstraints = {};
            if (vidCons && vidCons.width && vidCons.height) {
                mediaConstraints = {
                    video: {
                        facingMode: { exact: videoPreference },
                        ...vidCons,
                        frameRate: { ideal: frameRate },
                    },
                    audio: false,
                };
            }
            else {
                mediaConstraints = {
                    video: {
                        facingMode: { exact: videoPreference },
                        frameRate: { ideal: frameRate },
                    },
                    audio: false,
                };
            }
            // Get user media with the defined constraints
            await navigator.mediaDevices
                .getUserMedia(mediaConstraints)
                .then(async (stream) => {
                await streamSuccessVideo({ stream, parameters });
            })
                .catch(async () => {
                let videoDevicesFront = [];
                // Filter video devices based on the preferred facing mode
                if (videoPreference === 'user') {
                    videoDevicesFront = videoDevices.filter((device) => device.label.includes('front') && device.kind === 'videoinput');
                }
                else {
                    videoDevicesFront = videoDevices.filter((device) => device.label.includes('back') && device.kind === 'videoinput');
                }
                if (videoDevicesFront.length > 0) {
                    videoDevicesFront.forEach((device) => {
                        if (device.kind === 'videoinput') {
                            let videoDeviceId = device.deviceId;
                            // Update media constraints with the specific video device
                            if (vidCons && vidCons.width && vidCons.height) {
                                mediaConstraints = {
                                    video: {
                                        deviceId: { exact: videoDeviceId },
                                        ...vidCons,
                                        frameRate: { ideal: frameRate },
                                    },
                                    audio: false,
                                };
                            }
                            else {
                                mediaConstraints = {
                                    video: {
                                        deviceId: { exact: videoDeviceId },
                                        frameRate: { ideal: frameRate },
                                    },
                                    audio: false,
                                };
                            }
                            // Try to get user media with the new constraints
                            navigator.mediaDevices
                                .getUserMedia(mediaConstraints)
                                .then(async (stream) => {
                                await streamSuccessVideo({ stream, parameters });
                            })
                                .catch(() => {
                                // If the current video device is the last one in the list, show the error; otherwise, try the next device
                                if (videoDeviceId === videoDevicesFront[videoDevicesFront.length - 1].deviceId) {
                                    currentFacingMode = prevFacingMode;
                                    updateCurrentFacingMode(currentFacingMode);
                                    showAlert?.({
                                        message: 'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
                                        type: 'danger',
                                        duration: 3000,
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    // Show error if no compatible video devices are found
                    currentFacingMode = prevFacingMode;
                    updateCurrentFacingMode(currentFacingMode);
                    showAlert?.({
                        message: 'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
                        type: 'danger',
                        duration: 3000,
                    });
                }
            });
        }
        catch (error) {
            // Handle any unexpected errors
            const videoDevices = await navigator.mediaDevices.enumerateDevices();
            let videoDevicesFront = [];
            if (videoPreference === 'user') {
                videoDevicesFront = videoDevices.filter((device) => device.label.includes('front') && device.kind === 'videoinput');
            }
            else {
                videoDevicesFront = videoDevices.filter((device) => device.label.includes('back') && device.kind === 'videoinput');
            }
            let mediaConstraints = {};
            if (videoDevicesFront.length > 0) {
                videoDevicesFront.forEach((device) => {
                    if (device.kind === 'videoinput') {
                        let videoDeviceId = device.deviceId;
                        if (vidCons && vidCons.width && vidCons.height) {
                            mediaConstraints = {
                                video: {
                                    deviceId: { exact: videoDeviceId },
                                    ...vidCons,
                                    frameRate: { ideal: frameRate },
                                },
                                audio: false,
                            };
                        }
                        else {
                            mediaConstraints = {
                                video: {
                                    deviceId: { exact: videoDeviceId },
                                    frameRate: { ideal: frameRate },
                                },
                                audio: false,
                            };
                        }
                        navigator.mediaDevices
                            .getUserMedia(mediaConstraints)
                            .then(async (stream) => {
                            await streamSuccessVideo({ stream, parameters });
                        })
                            .catch(() => {
                            // If current video device is the last one in the list, show the error; otherwise, try next device
                            if (videoDeviceId === videoDevicesFront[videoDevicesFront.length - 1].deviceId) {
                                currentFacingMode = prevFacingMode;
                                updateCurrentFacingMode(currentFacingMode);
                                showAlert?.({
                                    message: 'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
                                    type: 'danger',
                                    duration: 3000,
                                });
                            }
                        });
                    }
                });
            }
            else {
                currentFacingMode = prevFacingMode;
                updateCurrentFacingMode(currentFacingMode);
                showAlert?.({
                    message: 'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
                    type: 'danger',
                    duration: 3000,
                });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserVideoAlt, deps: [{ token: i1.ClickVideo }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserVideoAlt, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserVideoAlt, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.ClickVideo }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXVzZXItdmlkZW8tYWx0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3N3aXRjaC11c2VyLXZpZGVvLWFsdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQXlDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFNSCxNQUFNLE9BQU8sa0JBQWtCO0lBQ1Q7SUFBcEIsWUFBb0IsaUJBQTZCO1FBQTdCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBWTtJQUFHLENBQUM7SUFFckQ7Ozs7Ozs7Ozs7O09BV0c7SUFFSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFDdkIsZUFBZSxFQUNmLFFBQVEsRUFDUixVQUFVLEdBQ2dCO1FBQzFCLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxJQUFJLFdBQVcsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRXhDLElBQUksRUFDRixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQix1QkFBdUI7UUFFdkIscUJBQXFCO1FBQ3JCLHVCQUF1QixFQUN2QixrQkFBa0IsRUFDbEIsS0FBSyxFQUNMLG9CQUFvQixHQUNyQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsR0FBRyxXQUFXLENBQUM7UUFFeEQsSUFBSSxDQUFDO1lBQ0gsbUNBQW1DO1lBQ25DLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ2xCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSx3REFBd0Q7b0JBQ2pFLElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJ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NkJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTs0QkFDVixrR0FBa0c7NEJBQ2xHLElBQUksYUFBYSxLQUFLLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDL0UsaUJBQWlCLEdBQUcsY0FBYyxDQUFDO2dDQUNuQyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dDQUUzQyxTQUFTLEVBQUUsQ0FBQztvQ0FDVixPQUFPLEVBQ0wseUdBQXlHO29DQUMzRyxJQUFJLEVBQUUsUUFBUTtvQ0FDZCxRQUFRLEVBQUUsSUFBSTtpQ0FDZixDQUFDLENBQUM7NEJBQ0wsQ0FBQzt3QkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLGlCQUFpQixHQUFHLGNBQWMsQ0FBQztnQkFDbkMsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFFM0MsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUNMLHlHQUF5RztvQkFDM0csSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO3VHQXhRVSxrQkFBa0I7MkdBQWxCLGtCQUFrQixjQUZqQixNQUFNOzsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xpY2tWaWRlbywgQ2xpY2tWaWRlb1BhcmFtZXRlcnMgfSBmcm9tICcuLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgU2hvd0FsZXJ0LFxuICBWaWRDb25zLFxuICBSZXF1ZXN0UGVybWlzc2lvbkNhbWVyYVR5cGUsXG4gIFN0cmVhbVN1Y2Nlc3NWaWRlb1R5cGUsXG4gIFNsZWVwVHlwZSxcbiAgU3RyZWFtU3VjY2Vzc1ZpZGVvUGFyYW1ldGVycyxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTd2l0Y2hVc2VyVmlkZW9BbHRQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgU3RyZWFtU3VjY2Vzc1ZpZGVvUGFyYW1ldGVycyxcbiAgICBDbGlja1ZpZGVvUGFyYW1ldGVycyB7XG4gIGF1ZGlvT25seVJvb206IGJvb2xlYW47XG4gIGZyYW1lUmF0ZTogbnVtYmVyO1xuICB2aWRDb25zOiBWaWRDb25zO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGhhc0NhbWVyYVBlcm1pc3Npb246IGJvb2xlYW47XG4gIHVwZGF0ZVZpZGVvU3dpdGNoaW5nOiAoc3RhdGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlOiAobW9kZTogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYTogUmVxdWVzdFBlcm1pc3Npb25DYW1lcmFUeXBlO1xuICBzdHJlYW1TdWNjZXNzVmlkZW86IFN0cmVhbVN1Y2Nlc3NWaWRlb1R5cGU7XG4gIHNsZWVwOiBTbGVlcFR5cGU7XG4gIGNoZWNrTWVkaWFQZXJtaXNzaW9uOiBib29sZWFuO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBTd2l0Y2hVc2VyVmlkZW9BbHRQYXJhbWV0ZXJzO1xuXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTd2l0Y2hVc2VyVmlkZW9BbHRPcHRpb25zIHtcbiAgdmlkZW9QcmVmZXJlbmNlOiBzdHJpbmc7XG4gIGNoZWNrb2ZmOiBib29sZWFuO1xuICBwYXJhbWV0ZXJzOiBTd2l0Y2hVc2VyVmlkZW9BbHRQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTd2l0Y2hVc2VyVmlkZW9BbHRUeXBlID0gKG9wdGlvbnM6IFN3aXRjaFVzZXJWaWRlb0FsdE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU3dpdGNoZXMgdGhlIHVzZXIncyB2aWRlbyBzdHJlYW0gYmFzZWQgb24gdGhlIHByb3ZpZGVkIHZpZGVvIHByZWZlcmVuY2UgYW5kIG90aGVyIHBhcmFtZXRlcnMuXG4gKlxuICogVGhpcyBtZXRob2QgbWFuYWdlcyB0aGUgcHJvY2VzcyBvZiBzd2l0Y2hpbmcgdGhlIHVzZXIncyB2aWRlbyBpbnB1dCBkZXZpY2UsXG4gKiBjaGVja2luZyBwZXJtaXNzaW9ucywgYW5kIHVwZGF0aW5nIHRoZSByZWxldmFudCBhcHBsaWNhdGlvbiBzdGF0ZS5cbiAqIElmIHRoZSBzcGVjaWZpZWQgZGV2aWNlIGlzIG5vdCBhY2Nlc3NpYmxlLCBpdCBhdHRlbXB0cyB0byBmaW5kIGFuIGFsdGVybmF0aXZlLlxuICpcbiAqIEBwYXJhbSB7U3dpdGNoVXNlclZpZGVvQWx0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzd2l0Y2hpbmcgdGhlIHVzZXIncyB2aWRlby5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnZpZGVvUHJlZmVyZW5jZSAtIFRoZSBwcmVmZXJyZWQgdmlkZW8gaW5wdXQgZGV2aWNlIElELlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmNoZWNrb2ZmIC0gQSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0byB0dXJuIG9mZiB0aGUgdmlkZW8gYmVmb3JlIHN3aXRjaGluZy5cbiAqIEBwYXJhbSB7U3dpdGNoVXNlclZpZGVvQWx0UGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHN3aXRjaGluZyB0aGUgdmlkZW8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcyB0byB0aGUgdXNlci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmhhc0NhbWVyYVBlcm1pc3Npb24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgaGFzIGdyYW50ZWQgY2FtZXJhIHBlcm1pc3Npb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVmlkZW9Td2l0Y2hpbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpZGVvIHN3aXRjaGluZyBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZXF1ZXN0UGVybWlzc2lvbkNhbWVyYSAtIEZ1bmN0aW9uIHRvIHJlcXVlc3QgY2FtZXJhIHBlcm1pc3Npb24gZnJvbSB0aGUgdXNlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jaGVja01lZGlhUGVybWlzc2lvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIGlmIG1lZGlhIHBlcm1pc3Npb25zIGFyZSBncmFudGVkLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2aWRlbyBzd2l0Y2hpbmcgaXMgY29tcGxldGUuXG4gKlxuICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBhdWRpbyBpbnB1dCBkZXZpY2UgY2Fubm90IGJlIGFjY2Vzc2VkIG9yIGlmIHRoZXJlIGlzIGFuIHVuZXhwZWN0ZWQgZXJyb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIGF3YWl0IHN3aXRjaFVzZXJWaWRlb0FsdCh7XG4gKiAgIHZpZGVvUHJlZmVyZW5jZTogJ3VzZXInLFxuICogICBjaGVja29mZjogZmFsc2UsXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uOiB0cnVlLFxuICogICAgIHVwZGF0ZVZpZGVvU3dpdGNoaW5nOiAoc3RhdGUpID0+IHsgLyogdXBkYXRlIHN0YXRlICpcXC8gfSxcbiAqICAgICAvLyBvdGhlciBwYXJhbWV0ZXJzLi4uXG4gKiAgIH0sXG4gKiB9KTtcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTd2l0Y2hVc2VyVmlkZW9BbHQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIENsaWNrVmlkZW9TZXJ2aWNlOiBDbGlja1ZpZGVvKSB7fVxuXG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0aGUgdXNlcidzIHZpZGVvIHN0cmVhbSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgdmlkZW8gcHJlZmVyZW5jZSBhbmQgb3RoZXIgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3dpdGNoaW5nIHRoZSB1c2VyJ3MgdmlkZW8uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnZpZGVvUHJlZmVyZW5jZSAtIFRoZSBwcmVmZXJyZWQgdmlkZW8gZmFjaW5nIG1vZGUgKGUuZy4sIFwidXNlclwiIG9yIFwiZW52aXJvbm1lbnRcIikuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jaGVja29mZiAtIEEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gdHVybiBvZmYgdGhlIHZpZGVvIGJlZm9yZSBzd2l0Y2hpbmcuXG4gICAqIEBwYXJhbSB7U3dpdGNoVXNlclZpZGVvQWx0T3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHN3aXRjaGluZyB0aGUgdmlkZW8uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2aWRlbyBzd2l0Y2hpbmcgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSB3aXRoIHN3aXRjaGluZyB0aGUgdmlkZW8uXG4gICAqL1xuXG4gIGFzeW5jIHN3aXRjaFVzZXJWaWRlb0FsdCh7XG4gICAgdmlkZW9QcmVmZXJlbmNlLFxuICAgIGNoZWNrb2ZmLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IFN3aXRjaFVzZXJWaWRlb0FsdE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgIGxldCBwYXJhbWV0ZXJzXyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICBhdWRpb09ubHlSb29tLFxuICAgICAgZnJhbWVSYXRlLFxuICAgICAgdmlkQ29ucyxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIGhhc0NhbWVyYVBlcm1pc3Npb24sXG4gICAgICB1cGRhdGVWaWRlb1N3aXRjaGluZyxcbiAgICAgIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlLFxuXG4gICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhLFxuICAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvLFxuICAgICAgc2xlZXAsXG4gICAgICBjaGVja01lZGlhUGVybWlzc2lvbixcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxldCB7IGN1cnJlbnRGYWNpbmdNb2RlLCBwcmV2RmFjaW5nTW9kZSB9ID0gcGFyYW1ldGVyc187XG5cbiAgICB0cnkge1xuICAgICAgLy8gQ2hlY2sgaWYgaXQncyBhbiBhdWRpby1vbmx5IHJvb21cbiAgICAgIGlmIChhdWRpb09ubHlSb29tKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCB0dXJuIG9uIHlvdXIgY2FtZXJhIGluIGFuIGF1ZGlvLW9ubHkgZXZlbnQuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBjaGVja29mZiBpcyBub3QgdHJ1ZSwgdHJpZ2dlciBhIGNsaWNrIG9uIHRoZSB2aWRlbyBidXR0b24gdG8gdHVybiBvZmYgdGhlIHZpZGVvXG4gICAgICBpZiAoIWNoZWNrb2ZmKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuQ2xpY2tWaWRlb1NlcnZpY2UuY2xpY2tWaWRlbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIHVwZGF0ZVZpZGVvU3dpdGNoaW5nKHRydWUpO1xuICAgICAgICBhd2FpdCBzbGVlcCh7IG1zOiA1MDAgfSk7XG4gICAgICAgIHVwZGF0ZVZpZGVvU3dpdGNoaW5nKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgY2FtZXJhIHBlcm1pc3Npb25cbiAgICAgIGlmICghaGFzQ2FtZXJhUGVybWlzc2lvbikge1xuICAgICAgICBpZiAoY2hlY2tNZWRpYVBlcm1pc3Npb24pIHtcbiAgICAgICAgICBsZXQgc3RhdHVzQ2FtZXJhID0gYXdhaXQgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmEoKTtcblxuICAgICAgICAgIGlmIChzdGF0dXNDYW1lcmEgIT09ICdncmFudGVkJykge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICdBbGxvdyBhY2Nlc3MgdG8geW91ciBjYW1lcmEgb3IgY2hlY2sgaWYgeW91ciBjYW1lcmEgaXMgbm90IGJlaW5nIHVzZWQgYnkgYW5vdGhlciBhcHBsaWNhdGlvbi4nLFxuICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBFbnVtZXJhdGUgdmlkZW8gZGV2aWNlc1xuICAgICAgY29uc3QgdmlkZW9EZXZpY2VzID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG5cbiAgICAgIC8vIERlZmluZSBtZWRpYSBjb25zdHJhaW50cyBiYXNlZCBvbiBwcmVmZXJlbmNlcyBhbmQgb3B0aW9uc1xuICAgICAgbGV0IG1lZGlhQ29uc3RyYWludHM6IGFueSA9IHt9O1xuXG4gICAgICBpZiAodmlkQ29ucyAmJiB2aWRDb25zLndpZHRoICYmIHZpZENvbnMuaGVpZ2h0KSB7XG4gICAgICAgIG1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgIGZhY2luZ01vZGU6IHsgZXhhY3Q6IHZpZGVvUHJlZmVyZW5jZSB9LFxuICAgICAgICAgICAgLi4udmlkQ29ucyxcbiAgICAgICAgICAgIGZyYW1lUmF0ZTogeyBpZGVhbDogZnJhbWVSYXRlIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICBmYWNpbmdNb2RlOiB7IGV4YWN0OiB2aWRlb1ByZWZlcmVuY2UgfSxcbiAgICAgICAgICAgIGZyYW1lUmF0ZTogeyBpZGVhbDogZnJhbWVSYXRlIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB1c2VyIG1lZGlhIHdpdGggdGhlIGRlZmluZWQgY29uc3RyYWludHNcbiAgICAgIGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgLmdldFVzZXJNZWRpYShtZWRpYUNvbnN0cmFpbnRzKVxuICAgICAgICAudGhlbihhc3luYyAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0cmVhbVN1Y2Nlc3NWaWRlbyh7IHN0cmVhbSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsZXQgdmlkZW9EZXZpY2VzRnJvbnQgPSBbXTtcblxuICAgICAgICAgIC8vIEZpbHRlciB2aWRlbyBkZXZpY2VzIGJhc2VkIG9uIHRoZSBwcmVmZXJyZWQgZmFjaW5nIG1vZGVcbiAgICAgICAgICBpZiAodmlkZW9QcmVmZXJlbmNlID09PSAndXNlcicpIHtcbiAgICAgICAgICAgIHZpZGVvRGV2aWNlc0Zyb250ID0gdmlkZW9EZXZpY2VzLmZpbHRlcihcbiAgICAgICAgICAgICAgKGRldmljZTogTWVkaWFEZXZpY2VJbmZvKSA9PlxuICAgICAgICAgICAgICAgIGRldmljZS5sYWJlbC5pbmNsdWRlcygnZnJvbnQnKSAmJiBkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmlkZW9EZXZpY2VzRnJvbnQgPSB2aWRlb0RldmljZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAoZGV2aWNlOiBNZWRpYURldmljZUluZm8pID0+XG4gICAgICAgICAgICAgICAgZGV2aWNlLmxhYmVsLmluY2x1ZGVzKCdiYWNrJykgJiYgZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0JyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZpZGVvRGV2aWNlc0Zyb250Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZpZGVvRGV2aWNlc0Zyb250LmZvckVhY2goKGRldmljZTogTWVkaWFEZXZpY2VJbmZvKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvRGV2aWNlSWQgPSBkZXZpY2UuZGV2aWNlSWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgbWVkaWEgY29uc3RyYWludHMgd2l0aCB0aGUgc3BlY2lmaWMgdmlkZW8gZGV2aWNlXG4gICAgICAgICAgICAgICAgaWYgKHZpZENvbnMgJiYgdmlkQ29ucy53aWR0aCAmJiB2aWRDb25zLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgbWVkaWFDb25zdHJhaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VJZDogeyBleGFjdDogdmlkZW9EZXZpY2VJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgIC4uLnZpZENvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgZnJhbWVSYXRlOiB7IGlkZWFsOiBmcmFtZVJhdGUgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbWVkaWFDb25zdHJhaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VJZDogeyBleGFjdDogdmlkZW9EZXZpY2VJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgIGZyYW1lUmF0ZTogeyBpZGVhbDogZnJhbWVSYXRlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGdldCB1c2VyIG1lZGlhIHdpdGggdGhlIG5ldyBjb25zdHJhaW50c1xuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgICAgICAgICAgIC5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cylcbiAgICAgICAgICAgICAgICAgIC50aGVuKGFzeW5jIChzdHJlYW06IE1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHN0cmVhbVN1Y2Nlc3NWaWRlbyh7IHN0cmVhbSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY3VycmVudCB2aWRlbyBkZXZpY2UgaXMgdGhlIGxhc3Qgb25lIGluIHRoZSBsaXN0LCBzaG93IHRoZSBlcnJvcjsgb3RoZXJ3aXNlLCB0cnkgdGhlIG5leHQgZGV2aWNlXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICB2aWRlb0RldmljZUlkID09PSB2aWRlb0RldmljZXNGcm9udFt2aWRlb0RldmljZXNGcm9udC5sZW5ndGggLSAxXS5kZXZpY2VJZFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RmFjaW5nTW9kZSA9IHByZXZGYWNpbmdNb2RlO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlKGN1cnJlbnRGYWNpbmdNb2RlKTtcblxuICAgICAgICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICdFcnJvciBzd2l0Y2hpbmc7IG5vdCBhY2Nlc3NpYmxlLCBtaWdodCBuZWVkIHRvIHR1cm4gb2ZmIHlvdXIgdmlkZW8gYW5kIHR1cm4gaXQgYmFjayBvbiBhZnRlciBzd2l0Y2hpbmcuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU2hvdyBlcnJvciBpZiBubyBjb21wYXRpYmxlIHZpZGVvIGRldmljZXMgYXJlIGZvdW5kXG4gICAgICAgICAgICBjdXJyZW50RmFjaW5nTW9kZSA9IHByZXZGYWNpbmdNb2RlO1xuICAgICAgICAgICAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGUoY3VycmVudEZhY2luZ01vZGUpO1xuXG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgJ0Vycm9yIHN3aXRjaGluZzsgbm90IGFjY2Vzc2libGUsIG1pZ2h0IG5lZWQgdG8gdHVybiBvZmYgeW91ciB2aWRlbyBhbmQgdHVybiBpdCBiYWNrIG9uIGFmdGVyIHN3aXRjaGluZy4nLFxuICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBIYW5kbGUgYW55IHVuZXhwZWN0ZWQgZXJyb3JzXG4gICAgICBjb25zdCB2aWRlb0RldmljZXMgPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKTtcbiAgICAgIGxldCB2aWRlb0RldmljZXNGcm9udCA9IFtdO1xuICAgICAgaWYgKHZpZGVvUHJlZmVyZW5jZSA9PT0gJ3VzZXInKSB7XG4gICAgICAgIHZpZGVvRGV2aWNlc0Zyb250ID0gdmlkZW9EZXZpY2VzLmZpbHRlcihcbiAgICAgICAgICAoZGV2aWNlOiBNZWRpYURldmljZUluZm8pID0+XG4gICAgICAgICAgICBkZXZpY2UubGFiZWwuaW5jbHVkZXMoJ2Zyb250JykgJiYgZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0JyxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZGVvRGV2aWNlc0Zyb250ID0gdmlkZW9EZXZpY2VzLmZpbHRlcihcbiAgICAgICAgICAoZGV2aWNlOiBNZWRpYURldmljZUluZm8pID0+XG4gICAgICAgICAgICBkZXZpY2UubGFiZWwuaW5jbHVkZXMoJ2JhY2snKSAmJiBkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBsZXQgbWVkaWFDb25zdHJhaW50czogYW55ID0ge307XG5cbiAgICAgIGlmICh2aWRlb0RldmljZXNGcm9udC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZpZGVvRGV2aWNlc0Zyb250LmZvckVhY2goKGRldmljZTogTWVkaWFEZXZpY2VJbmZvKSA9PiB7XG4gICAgICAgICAgaWYgKGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcpIHtcbiAgICAgICAgICAgIGxldCB2aWRlb0RldmljZUlkID0gZGV2aWNlLmRldmljZUlkO1xuXG4gICAgICAgICAgICBpZiAodmlkQ29ucyAmJiB2aWRDb25zLndpZHRoICYmIHZpZENvbnMuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgICAgIGRldmljZUlkOiB7IGV4YWN0OiB2aWRlb0RldmljZUlkIH0sXG4gICAgICAgICAgICAgICAgICAuLi52aWRDb25zLFxuICAgICAgICAgICAgICAgICAgZnJhbWVSYXRlOiB7IGlkZWFsOiBmcmFtZVJhdGUgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgICAgIGRldmljZUlkOiB7IGV4YWN0OiB2aWRlb0RldmljZUlkIH0sXG4gICAgICAgICAgICAgICAgICBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAgICAgICAgIC5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cylcbiAgICAgICAgICAgICAgLnRoZW4oYXN5bmMgKHN0cmVhbTogTWVkaWFTdHJlYW0pID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzdHJlYW1TdWNjZXNzVmlkZW8oeyBzdHJlYW0sIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSWYgY3VycmVudCB2aWRlbyBkZXZpY2UgaXMgdGhlIGxhc3Qgb25lIGluIHRoZSBsaXN0LCBzaG93IHRoZSBlcnJvcjsgb3RoZXJ3aXNlLCB0cnkgbmV4dCBkZXZpY2VcbiAgICAgICAgICAgICAgICBpZiAodmlkZW9EZXZpY2VJZCA9PT0gdmlkZW9EZXZpY2VzRnJvbnRbdmlkZW9EZXZpY2VzRnJvbnQubGVuZ3RoIC0gMV0uZGV2aWNlSWQpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRGYWNpbmdNb2RlID0gcHJldkZhY2luZ01vZGU7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZShjdXJyZW50RmFjaW5nTW9kZSk7XG5cbiAgICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAgICAgICAnRXJyb3Igc3dpdGNoaW5nOyBub3QgYWNjZXNzaWJsZSwgbWlnaHQgbmVlZCB0byB0dXJuIG9mZiB5b3VyIHZpZGVvIGFuZCB0dXJuIGl0IGJhY2sgb24gYWZ0ZXIgc3dpdGNoaW5nLicsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRGYWNpbmdNb2RlID0gcHJldkZhY2luZ01vZGU7XG4gICAgICAgIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlKGN1cnJlbnRGYWNpbmdNb2RlKTtcblxuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICdFcnJvciBzd2l0Y2hpbmc7IG5vdCBhY2Nlc3NpYmxlLCBtaWdodCBuZWVkIHRvIHR1cm4gb2ZmIHlvdXIgdmlkZW8gYW5kIHR1cm4gaXQgYmFjayBvbiBhZnRlciBzd2l0Y2hpbmcuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=