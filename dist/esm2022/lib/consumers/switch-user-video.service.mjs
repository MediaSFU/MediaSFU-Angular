import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../methods/stream-methods/click-video.service";
export class SwitchUserVideo {
    ClickVideoService;
    constructor(ClickVideoService) {
        this.ClickVideoService = ClickVideoService;
    }
    /**
     * Switches the user's video input device based on the provided options.
     *
     * @param {SwitchUserVideoOptions} options - The options for switching the user's video.
     * @param {string} options.videoPreference - The preferred video input device ID.
     * @param {boolean} options.checkoff - Flag indicating whether to turn off the video.
     * @param {Object} options.parameters - Additional parameters required for switching the video.
     * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the room is audio-only.
     * @param {number} options.parameters.frameRate - The desired frame rate for the video.
     * @param {Object} options.parameters.vidCons - Video constraints such as width and height.
     * @param {string} options.parameters.prevVideoInputDevice - The previous video input device ID.
     * @param {Function} options.parameters.showAlert - Function to show alerts to the user.
     * @param {boolean} options.parameters.hasCameraPermission - Indicates if the user has camera permission.
     * @param {Function} options.parameters.updateVideoSwitching - Function to update video switching state.
     * @param {Function} options.parameters.updateUserDefaultVideoInputDevice - Function to update the default video input device.
     * @param {Function} options.parameters.requestPermissionCamera - Function to request camera permission.
     * @param {Function} options.parameters.streamSuccessVideo - Function to handle successful video stream.
     * @param {Function} options.parameters.sleep - Function to pause execution for a specified duration.
     * @param {Function} options.parameters.checkMediaPermission - Function to check media permissions.
     *
     * @returns {Promise<void>} A promise that resolves when the video input device has been switched.
     *
     * @throws Will throw an error if switching the video input device fails.
     */
    switchUserVideo = async ({ videoPreference, checkoff, parameters, }) => {
        let { audioOnlyRoom, frameRate, vidCons, prevVideoInputDevice, userDefaultVideoInputDevice, showAlert, hasCameraPermission, updateVideoSwitching, updateUserDefaultVideoInputDevice, 
        // mediasfu functions
        requestPermissionCamera, streamSuccessVideo, sleep, checkMediaPermission, } = parameters;
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
                await updateVideoSwitching(true);
                await sleep(500);
                await updateVideoSwitching(false);
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
            let mediaConstraints = {};
            if (vidCons && vidCons.width && vidCons.height) {
                mediaConstraints = {
                    video: {
                        deviceId: { exact: videoPreference },
                        ...vidCons,
                        frameRate: { ideal: frameRate },
                    },
                    audio: false,
                };
            }
            else {
                mediaConstraints = {
                    video: {
                        deviceId: { exact: videoPreference },
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
                // Handle errors and revert to the previous video input device
                userDefaultVideoInputDevice = prevVideoInputDevice;
                updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);
                showAlert?.({
                    message: 'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
                    type: 'danger',
                    duration: 3000,
                });
            });
        }
        catch (error) {
            // Handle unexpected errors and revert to the previous video input device
            userDefaultVideoInputDevice = prevVideoInputDevice;
            updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);
            showAlert?.({
                message: 'Error switching; not accessible, might need to turn off your video and turn it back on after switching.',
                type: 'danger',
                duration: 3000,
            });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserVideo, deps: [{ token: i1.ClickVideo }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserVideo, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserVideo, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.ClickVideo }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXVzZXItdmlkZW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3dpdGNoLXVzZXItdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUE4QzNDLE1BQU0sT0FBTyxlQUFlO0lBQ047SUFBcEIsWUFBb0IsaUJBQTZCO1FBQTdCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBWTtJQUFHLENBQUM7SUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsZUFBZSxHQUFHLEtBQUssRUFBRSxFQUN2QixlQUFlLEVBQ2YsUUFBUSxFQUNSLFVBQVUsR0FLWCxFQUFpQixFQUFFO1FBQ2xCLElBQUksRUFDRixhQUFhLEVBQ2IsU0FBUyxFQUNULE9BQU8sRUFDUCxvQkFBb0IsRUFDcEIsMkJBQTJCLEVBQzNCLFNBQVMsRUFDVCxtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLGlDQUFpQztRQUVqQyxxQkFBcUI7UUFDckIsdUJBQXVCLEVBQ3ZCLGtCQUFrQixFQUNsQixLQUFLLEVBQ0wsb0JBQW9CLEdBQ3JCLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxDQUFDO1lBQ0gsbUNBQW1DO1lBQ25DLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ2xCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSx3REFBd0Q7b0JBQ2pFLElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFFSCxPQUFPO1lBQ1QsQ0FBQztZQUVELHFGQUFxRjtZQUNyRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUVELDBCQUEwQjtZQUMxQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO29CQUN6QixJQUFJLFlBQVksR0FBRyxNQUFNLHVCQUF1QixFQUFFLENBQUM7b0JBQ25ELElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUMvQixTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQ0wsK0ZBQStGOzRCQUNqRyxJQUFJLEVBQUUsUUFBUTs0QkFDZCxRQUFRLEVBQUUsSUFBSTt5QkFDZixDQUFDLENBQUM7d0JBRUgsT0FBTztvQkFDVCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsSUFBSSxnQkFBZ0IsR0FBUSxFQUFFLENBQUM7WUFFL0IsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQy9DLGdCQUFnQixHQUFHO29CQUNqQixLQUFLLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRTt3QkFDcEMsR0FBRyxPQUFPO3dCQUNWLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7cUJBQ2hDO29CQUNELEtBQUssRUFBRSxLQUFLO2lCQUNiLENBQUM7WUFDSixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sZ0JBQWdCLEdBQUc7b0JBQ2pCLEtBQUssRUFBRTt3QkFDTCxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO3dCQUNwQyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO3FCQUNoQztvQkFDRCxLQUFLLEVBQUUsS0FBSztpQkFDYixDQUFDO1lBQ0osQ0FBQztZQUVELDhDQUE4QztZQUM5QyxNQUFNLFNBQVMsQ0FBQyxZQUFZO2lCQUN6QixZQUFZLENBQUMsZ0JBQWdCLENBQUM7aUJBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBbUIsRUFBRSxFQUFFO2dCQUNsQyxNQUFNLGtCQUFrQixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDaEIsOERBQThEO2dCQUM5RCwyQkFBMkIsR0FBRyxvQkFBb0IsQ0FBQztnQkFDbkQsaUNBQWlDLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFFL0QsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUNMLHlHQUF5RztvQkFDM0csSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLHlFQUF5RTtZQUN6RSwyQkFBMkIsR0FBRyxvQkFBb0IsQ0FBQztZQUNuRCxpQ0FBaUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBRS9ELFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFDTCx5R0FBeUc7Z0JBQzNHLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E5SVMsZUFBZTsyR0FBZixlQUFlLGNBRmQsTUFBTTs7MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbGlja1ZpZGVvLCBDbGlja1ZpZGVvUGFyYW1ldGVycyB9IGZyb20gJy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stdmlkZW8uc2VydmljZSc7XG5pbXBvcnQge1xuICBTaG93QWxlcnQsXG4gIFZpZENvbnMsXG4gIFJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhVHlwZSxcbiAgU3RyZWFtU3VjY2Vzc1ZpZGVvVHlwZSxcbiAgU2xlZXBUeXBlLFxuICBTdHJlYW1TdWNjZXNzVmlkZW9QYXJhbWV0ZXJzLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaFVzZXJWaWRlb1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBTdHJlYW1TdWNjZXNzVmlkZW9QYXJhbWV0ZXJzLFxuICAgIENsaWNrVmlkZW9QYXJhbWV0ZXJzIHtcbiAgYXVkaW9Pbmx5Um9vbTogYm9vbGVhbjtcbiAgZnJhbWVSYXRlOiBudW1iZXI7XG4gIHZpZENvbnM6IFZpZENvbnM7XG4gIHByZXZWaWRlb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGhhc0NhbWVyYVBlcm1pc3Npb246IGJvb2xlYW47XG4gIHVwZGF0ZVZpZGVvU3dpdGNoaW5nOiAoc3RhdGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogKGRldmljZUlkOiBzdHJpbmcpID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWEgZnVuY3Rpb25zXG4gIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhOiBSZXF1ZXN0UGVybWlzc2lvbkNhbWVyYVR5cGU7XG4gIHN0cmVhbVN1Y2Nlc3NWaWRlbzogU3RyZWFtU3VjY2Vzc1ZpZGVvVHlwZTtcbiAgc2xlZXA6IFNsZWVwVHlwZTtcbiAgY2hlY2tNZWRpYVBlcm1pc3Npb246IGJvb2xlYW47XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gU3dpdGNoVXNlclZpZGVvUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaFVzZXJWaWRlb09wdGlvbnMge1xuICB2aWRlb1ByZWZlcmVuY2U6IHN0cmluZztcbiAgY2hlY2tvZmY6IGJvb2xlYW47XG4gIHBhcmFtZXRlcnM6IFN3aXRjaFVzZXJWaWRlb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN3aXRjaFVzZXJWaWRlb1R5cGUgPSAob3B0aW9uczogU3dpdGNoVXNlclZpZGVvT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN3aXRjaFVzZXJWaWRlbyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgQ2xpY2tWaWRlb1NlcnZpY2U6IENsaWNrVmlkZW8pIHt9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRoZSB1c2VyJ3MgdmlkZW8gaW5wdXQgZGV2aWNlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge1N3aXRjaFVzZXJWaWRlb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3dpdGNoaW5nIHRoZSB1c2VyJ3MgdmlkZW8uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnZpZGVvUHJlZmVyZW5jZSAtIFRoZSBwcmVmZXJyZWQgdmlkZW8gaW5wdXQgZGV2aWNlIElELlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuY2hlY2tvZmYgLSBGbGFnIGluZGljYXRpbmcgd2hldGhlciB0byB0dXJuIG9mZiB0aGUgdmlkZW8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHN3aXRjaGluZyB0aGUgdmlkZW8uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvT25seVJvb20gLSBJbmRpY2F0ZXMgaWYgdGhlIHJvb20gaXMgYXVkaW8tb25seS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5mcmFtZVJhdGUgLSBUaGUgZGVzaXJlZCBmcmFtZSByYXRlIGZvciB0aGUgdmlkZW8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMudmlkQ29ucyAtIFZpZGVvIGNvbnN0cmFpbnRzIHN1Y2ggYXMgd2lkdGggYW5kIGhlaWdodC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2VmlkZW9JbnB1dERldmljZSAtIFRoZSBwcmV2aW91cyB2aWRlbyBpbnB1dCBkZXZpY2UgSUQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0cyB0byB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuaGFzQ2FtZXJhUGVybWlzc2lvbiAtIEluZGljYXRlcyBpZiB0aGUgdXNlciBoYXMgY2FtZXJhIHBlcm1pc3Npb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVWaWRlb1N3aXRjaGluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB2aWRlbyBzd2l0Y2hpbmcgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGRlZmF1bHQgdmlkZW8gaW5wdXQgZGV2aWNlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVxdWVzdFBlcm1pc3Npb25DYW1lcmEgLSBGdW5jdGlvbiB0byByZXF1ZXN0IGNhbWVyYSBwZXJtaXNzaW9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc3RyZWFtU3VjY2Vzc1ZpZGVvIC0gRnVuY3Rpb24gdG8gaGFuZGxlIHN1Y2Nlc3NmdWwgdmlkZW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBGdW5jdGlvbiB0byBwYXVzZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIGR1cmF0aW9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY2hlY2tNZWRpYVBlcm1pc3Npb24gLSBGdW5jdGlvbiB0byBjaGVjayBtZWRpYSBwZXJtaXNzaW9ucy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHZpZGVvIGlucHV0IGRldmljZSBoYXMgYmVlbiBzd2l0Y2hlZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHN3aXRjaGluZyB0aGUgdmlkZW8gaW5wdXQgZGV2aWNlIGZhaWxzLlxuICAgKi9cbiAgc3dpdGNoVXNlclZpZGVvID0gYXN5bmMgKHtcbiAgICB2aWRlb1ByZWZlcmVuY2UsXG4gICAgY2hlY2tvZmYsXG4gICAgcGFyYW1ldGVycyxcbiAgfToge1xuICAgIHZpZGVvUHJlZmVyZW5jZTogc3RyaW5nO1xuICAgIGNoZWNrb2ZmOiBib29sZWFuO1xuICAgIHBhcmFtZXRlcnM6IGFueTtcbiAgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7XG4gICAgICBhdWRpb09ubHlSb29tLFxuICAgICAgZnJhbWVSYXRlLFxuICAgICAgdmlkQ29ucyxcbiAgICAgIHByZXZWaWRlb0lucHV0RGV2aWNlLFxuICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLFxuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgaGFzQ2FtZXJhUGVybWlzc2lvbixcbiAgICAgIHVwZGF0ZVZpZGVvU3dpdGNoaW5nLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLFxuXG4gICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhLFxuICAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvLFxuICAgICAgc2xlZXAsXG4gICAgICBjaGVja01lZGlhUGVybWlzc2lvbixcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIHRyeSB7XG4gICAgICAvLyBDaGVjayBpZiBpdCdzIGFuIGF1ZGlvLW9ubHkgcm9vbVxuICAgICAgaWYgKGF1ZGlvT25seVJvb20pIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgY2Fubm90IHR1cm4gb24geW91ciBjYW1lcmEgaW4gYW4gYXVkaW8tb25seSBldmVudC4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGNoZWNrb2ZmIGlzIG5vdCB0cnVlLCB0cmlnZ2VyIGEgY2xpY2sgb24gdGhlIHZpZGVvIGJ1dHRvbiB0byB0dXJuIG9mZiB0aGUgdmlkZW9cbiAgICAgIGlmICghY2hlY2tvZmYpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5DbGlja1ZpZGVvU2VydmljZS5jbGlja1ZpZGVvKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgYXdhaXQgdXBkYXRlVmlkZW9Td2l0Y2hpbmcodHJ1ZSk7XG4gICAgICAgIGF3YWl0IHNsZWVwKDUwMCk7XG4gICAgICAgIGF3YWl0IHVwZGF0ZVZpZGVvU3dpdGNoaW5nKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgY2FtZXJhIHBlcm1pc3Npb25cbiAgICAgIGlmICghaGFzQ2FtZXJhUGVybWlzc2lvbikge1xuICAgICAgICBpZiAoY2hlY2tNZWRpYVBlcm1pc3Npb24pIHtcbiAgICAgICAgICBsZXQgc3RhdHVzQ2FtZXJhID0gYXdhaXQgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmEoKTtcbiAgICAgICAgICBpZiAoc3RhdHVzQ2FtZXJhICE9PSAnZ3JhbnRlZCcpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAnQWxsb3cgYWNjZXNzIHRvIHlvdXIgY2FtZXJhIG9yIGNoZWNrIGlmIHlvdXIgY2FtZXJhIGlzIG5vdCBiZWluZyB1c2VkIGJ5IGFub3RoZXIgYXBwbGljYXRpb24uJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IG1lZGlhQ29uc3RyYWludHM6IGFueSA9IHt9O1xuXG4gICAgICBpZiAodmlkQ29ucyAmJiB2aWRDb25zLndpZHRoICYmIHZpZENvbnMuaGVpZ2h0KSB7XG4gICAgICAgIG1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgIGRldmljZUlkOiB7IGV4YWN0OiB2aWRlb1ByZWZlcmVuY2UgfSxcbiAgICAgICAgICAgIC4uLnZpZENvbnMsXG4gICAgICAgICAgICBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVkaWFDb25zdHJhaW50cyA9IHtcbiAgICAgICAgICB2aWRlbzoge1xuICAgICAgICAgICAgZGV2aWNlSWQ6IHsgZXhhY3Q6IHZpZGVvUHJlZmVyZW5jZSB9LFxuICAgICAgICAgICAgZnJhbWVSYXRlOiB7IGlkZWFsOiBmcmFtZVJhdGUgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHVzZXIgbWVkaWEgd2l0aCB0aGUgZGVmaW5lZCBjb25zdHJhaW50c1xuICAgICAgYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAuZ2V0VXNlck1lZGlhKG1lZGlhQ29uc3RyYWludHMpXG4gICAgICAgIC50aGVuKGFzeW5jIChzdHJlYW06IE1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgYXdhaXQgc3RyZWFtU3VjY2Vzc1ZpZGVvKHsgc3RyZWFtLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIC8vIEhhbmRsZSBlcnJvcnMgYW5kIHJldmVydCB0byB0aGUgcHJldmlvdXMgdmlkZW8gaW5wdXQgZGV2aWNlXG4gICAgICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlID0gcHJldlZpZGVvSW5wdXREZXZpY2U7XG4gICAgICAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlKHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSk7XG5cbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAnRXJyb3Igc3dpdGNoaW5nOyBub3QgYWNjZXNzaWJsZSwgbWlnaHQgbmVlZCB0byB0dXJuIG9mZiB5b3VyIHZpZGVvIGFuZCB0dXJuIGl0IGJhY2sgb24gYWZ0ZXIgc3dpdGNoaW5nLicsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gSGFuZGxlIHVuZXhwZWN0ZWQgZXJyb3JzIGFuZCByZXZlcnQgdG8gdGhlIHByZXZpb3VzIHZpZGVvIGlucHV0IGRldmljZVxuICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlID0gcHJldlZpZGVvSW5wdXREZXZpY2U7XG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UodXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlKTtcblxuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICdFcnJvciBzd2l0Y2hpbmc7IG5vdCBhY2Nlc3NpYmxlLCBtaWdodCBuZWVkIHRvIHR1cm4gb2ZmIHlvdXIgdmlkZW8gYW5kIHR1cm4gaXQgYmFjayBvbiBhZnRlciBzd2l0Y2hpbmcuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19