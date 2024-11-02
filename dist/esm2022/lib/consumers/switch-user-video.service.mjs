import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../methods/stream-methods/click-video.service";
/**
 * Switches the user's video input device based on the provided options.
 *
 * This method checks permissions, enumerates available devices, and updates the
 * video stream based on user preferences. It also manages UI updates and alerts.
 *
 * @param {SwitchUserVideoOptions} options - The options for switching the user's video.
 * @param {string} options.videoPreference - The preferred video input device ID.
 * @param {boolean} options.checkoff - Flag indicating whether to turn off the video.
 * @param {SwitchUserVideoParameters} options.parameters - Additional parameters required for switching the video.
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
 * @returns {Promise<void>} A promise that resolves when the video input device has been successfully switched.
 *
 * @throws {Error} Throws an error if switching the video input device fails.
 *
 * @example
 * await switchUserVideo({
 *   videoPreference: 'user',
 *   checkoff: false,
 *   parameters: {
 *     audioOnlyRoom: false,
 *     frameRate: 30,
 *     vidCons: { width: 1280, height: 720 },
 *     prevVideoInputDevice: 'device-id',
 *     showAlert: myShowAlertFunction,
 *     hasCameraPermission: true,
 *     updateVideoSwitching: myUpdateFunction,
 *     updateUserDefaultVideoInputDevice: myUpdateFunction,
 *     requestPermissionCamera: myRequestPermissionFunction,
 *     streamSuccessVideo: myStreamSuccessFunction,
 *     sleep: mySleepFunction,
 *     checkMediaPermission: true,
 *   },
 * });
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXVzZXItdmlkZW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3dpdGNoLXVzZXItdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUEyQzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBTUgsTUFBTSxPQUFPLGVBQWU7SUFDTjtJQUFwQixZQUFvQixpQkFBNkI7UUFBN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFZO0lBQUcsQ0FBQztJQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxlQUFlLEdBQUcsS0FBSyxFQUFFLEVBQ3ZCLGVBQWUsRUFDZixRQUFRLEVBQ1IsVUFBVSxHQUtYLEVBQWlCLEVBQUU7UUFDbEIsSUFBSSxFQUNGLGFBQWEsRUFDYixTQUFTLEVBQ1QsT0FBTyxFQUNQLG9CQUFvQixFQUNwQiwyQkFBMkIsRUFDM0IsU0FBUyxFQUNULG1CQUFtQixFQUNuQixvQkFBb0IsRUFDcEIsaUNBQWlDO1FBRWpDLHFCQUFxQjtRQUNyQix1QkFBdUIsRUFDdkIsa0JBQWtCLEVBQ2xCLEtBQUssRUFDTCxvQkFBb0IsR0FDckIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLENBQUM7WUFDSCxtQ0FBbUM7WUFDbkMsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDbEIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLHdEQUF3RDtvQkFDakUsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUVILE9BQU87WUFDVCxDQUFDO1lBRUQscUZBQXFGO1lBQ3JGLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDZCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsTUFBTSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxDQUFDO1lBRUQsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLG9CQUFvQixFQUFFLENBQUM7b0JBQ3pCLElBQUksWUFBWSxHQUFHLE1BQU0sdUJBQXVCLEVBQUUsQ0FBQztvQkFDbkQsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFLENBQUM7d0JBQy9CLFNBQVMsRUFBRSxDQUFDOzRCQUNWLE9BQU8sRUFDTCwrRkFBK0Y7NEJBQ2pHLElBQUksRUFBRSxRQUFROzRCQUNkLFFBQVEsRUFBRSxJQUFJO3lCQUNmLENBQUMsQ0FBQzt3QkFFSCxPQUFPO29CQUNULENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLGdCQUFnQixHQUFRLEVBQUUsQ0FBQztZQUUvQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDL0MsZ0JBQWdCLEdBQUc7b0JBQ2pCLEtBQUssRUFBRTt3QkFDTCxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO3dCQUNwQyxHQUFHLE9BQU87d0JBQ1YsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtxQkFDaEM7b0JBQ0QsS0FBSyxFQUFFLEtBQUs7aUJBQ2IsQ0FBQztZQUNKLENBQUM7aUJBQU0sQ0FBQztnQkFDTixnQkFBZ0IsR0FBRztvQkFDakIsS0FBSyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUU7d0JBQ3BDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7cUJBQ2hDO29CQUNELEtBQUssRUFBRSxLQUFLO2lCQUNiLENBQUM7WUFDSixDQUFDO1lBRUQsOENBQThDO1lBQzlDLE1BQU0sU0FBUyxDQUFDLFlBQVk7aUJBQ3pCLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFtQixFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sa0JBQWtCLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNoQiw4REFBOEQ7Z0JBQzlELDJCQUEyQixHQUFHLG9CQUFvQixDQUFDO2dCQUNuRCxpQ0FBaUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUUvRCxTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQ0wseUdBQXlHO29CQUMzRyxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YseUVBQXlFO1lBQ3pFLDJCQUEyQixHQUFHLG9CQUFvQixDQUFDO1lBQ25ELGlDQUFpQyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFL0QsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUNMLHlHQUF5RztnQkFDM0csSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTlJUyxlQUFlOzJHQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsaWNrVmlkZW8sIENsaWNrVmlkZW9QYXJhbWV0ZXJzIH0gZnJvbSAnLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFNob3dBbGVydCxcbiAgVmlkQ29ucyxcbiAgUmVxdWVzdFBlcm1pc3Npb25DYW1lcmFUeXBlLFxuICBTdHJlYW1TdWNjZXNzVmlkZW9UeXBlLFxuICBTbGVlcFR5cGUsXG4gIFN0cmVhbVN1Y2Nlc3NWaWRlb1BhcmFtZXRlcnMsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVXNlclZpZGVvUGFyYW1ldGVyc1xuICBleHRlbmRzIFN0cmVhbVN1Y2Nlc3NWaWRlb1BhcmFtZXRlcnMsXG4gICAgQ2xpY2tWaWRlb1BhcmFtZXRlcnMge1xuICBhdWRpb09ubHlSb29tOiBib29sZWFuO1xuICBmcmFtZVJhdGU6IG51bWJlcjtcbiAgdmlkQ29uczogVmlkQ29ucztcbiAgcHJldlZpZGVvSW5wdXREZXZpY2U6IHN0cmluZztcbiAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgaGFzQ2FtZXJhUGVybWlzc2lvbjogYm9vbGVhbjtcbiAgdXBkYXRlVmlkZW9Td2l0Y2hpbmc6IChzdGF0ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiAoZGV2aWNlSWQ6IHN0cmluZykgPT4gdm9pZDtcblxuICAvLyBtZWRpYSBmdW5jdGlvbnNcbiAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmE6IFJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhVHlwZTtcbiAgc3RyZWFtU3VjY2Vzc1ZpZGVvOiBTdHJlYW1TdWNjZXNzVmlkZW9UeXBlO1xuICBzbGVlcDogU2xlZXBUeXBlO1xuICBjaGVja01lZGlhUGVybWlzc2lvbjogYm9vbGVhbjtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBTd2l0Y2hVc2VyVmlkZW9QYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVXNlclZpZGVvT3B0aW9ucyB7XG4gIHZpZGVvUHJlZmVyZW5jZTogc3RyaW5nO1xuICBjaGVja29mZjogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogU3dpdGNoVXNlclZpZGVvUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3dpdGNoVXNlclZpZGVvVHlwZSA9IChvcHRpb25zOiBTd2l0Y2hVc2VyVmlkZW9PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFN3aXRjaGVzIHRoZSB1c2VyJ3MgdmlkZW8gaW5wdXQgZGV2aWNlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICpcbiAqIFRoaXMgbWV0aG9kIGNoZWNrcyBwZXJtaXNzaW9ucywgZW51bWVyYXRlcyBhdmFpbGFibGUgZGV2aWNlcywgYW5kIHVwZGF0ZXMgdGhlXG4gKiB2aWRlbyBzdHJlYW0gYmFzZWQgb24gdXNlciBwcmVmZXJlbmNlcy4gSXQgYWxzbyBtYW5hZ2VzIFVJIHVwZGF0ZXMgYW5kIGFsZXJ0cy5cbiAqXG4gKiBAcGFyYW0ge1N3aXRjaFVzZXJWaWRlb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3dpdGNoaW5nIHRoZSB1c2VyJ3MgdmlkZW8uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy52aWRlb1ByZWZlcmVuY2UgLSBUaGUgcHJlZmVycmVkIHZpZGVvIGlucHV0IGRldmljZSBJRC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jaGVja29mZiAtIEZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHR1cm4gb2ZmIHRoZSB2aWRlby5cbiAqIEBwYXJhbSB7U3dpdGNoVXNlclZpZGVvUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzd2l0Y2hpbmcgdGhlIHZpZGVvLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Pbmx5Um9vbSAtIEluZGljYXRlcyBpZiB0aGUgcm9vbSBpcyBhdWRpby1vbmx5LlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5mcmFtZVJhdGUgLSBUaGUgZGVzaXJlZCBmcmFtZSByYXRlIGZvciB0aGUgdmlkZW8uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZENvbnMgLSBWaWRlbyBjb25zdHJhaW50cyBzdWNoIGFzIHdpZHRoIGFuZCBoZWlnaHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXZWaWRlb0lucHV0RGV2aWNlIC0gVGhlIHByZXZpb3VzIHZpZGVvIGlucHV0IGRldmljZSBJRC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0cyB0byB0aGUgdXNlci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmhhc0NhbWVyYVBlcm1pc3Npb24gLSBJbmRpY2F0ZXMgaWYgdGhlIHVzZXIgaGFzIGNhbWVyYSBwZXJtaXNzaW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVZpZGVvU3dpdGNoaW5nIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHZpZGVvIHN3aXRjaGluZyBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGRlZmF1bHQgdmlkZW8gaW5wdXQgZGV2aWNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhIC0gRnVuY3Rpb24gdG8gcmVxdWVzdCBjYW1lcmEgcGVybWlzc2lvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zdHJlYW1TdWNjZXNzVmlkZW8gLSBGdW5jdGlvbiB0byBoYW5kbGUgc3VjY2Vzc2Z1bCB2aWRlbyBzdHJlYW0uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBGdW5jdGlvbiB0byBwYXVzZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIGR1cmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoZWNrTWVkaWFQZXJtaXNzaW9uIC0gRnVuY3Rpb24gdG8gY2hlY2sgbWVkaWEgcGVybWlzc2lvbnMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHZpZGVvIGlucHV0IGRldmljZSBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgc3dpdGNoZWQuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBzd2l0Y2hpbmcgdGhlIHZpZGVvIGlucHV0IGRldmljZSBmYWlscy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYXdhaXQgc3dpdGNoVXNlclZpZGVvKHtcbiAqICAgdmlkZW9QcmVmZXJlbmNlOiAndXNlcicsXG4gKiAgIGNoZWNrb2ZmOiBmYWxzZSxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIGF1ZGlvT25seVJvb206IGZhbHNlLFxuICogICAgIGZyYW1lUmF0ZTogMzAsXG4gKiAgICAgdmlkQ29uczogeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA3MjAgfSxcbiAqICAgICBwcmV2VmlkZW9JbnB1dERldmljZTogJ2RldmljZS1pZCcsXG4gKiAgICAgc2hvd0FsZXJ0OiBteVNob3dBbGVydEZ1bmN0aW9uLFxuICogICAgIGhhc0NhbWVyYVBlcm1pc3Npb246IHRydWUsXG4gKiAgICAgdXBkYXRlVmlkZW9Td2l0Y2hpbmc6IG15VXBkYXRlRnVuY3Rpb24sXG4gKiAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiBteVVwZGF0ZUZ1bmN0aW9uLFxuICogICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhOiBteVJlcXVlc3RQZXJtaXNzaW9uRnVuY3Rpb24sXG4gKiAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvOiBteVN0cmVhbVN1Y2Nlc3NGdW5jdGlvbixcbiAqICAgICBzbGVlcDogbXlTbGVlcEZ1bmN0aW9uLFxuICogICAgIGNoZWNrTWVkaWFQZXJtaXNzaW9uOiB0cnVlLFxuICogICB9LFxuICogfSk7XG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3dpdGNoVXNlclZpZGVvIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBDbGlja1ZpZGVvU2VydmljZTogQ2xpY2tWaWRlbykge31cblxuICAvKipcbiAgICogU3dpdGNoZXMgdGhlIHVzZXIncyB2aWRlbyBpbnB1dCBkZXZpY2UgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3dpdGNoVXNlclZpZGVvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzd2l0Y2hpbmcgdGhlIHVzZXIncyB2aWRlby5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudmlkZW9QcmVmZXJlbmNlIC0gVGhlIHByZWZlcnJlZCB2aWRlbyBpbnB1dCBkZXZpY2UgSUQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jaGVja29mZiAtIEZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHR1cm4gb2ZmIHRoZSB2aWRlby5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3dpdGNoaW5nIHRoZSB2aWRlby5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Pbmx5Um9vbSAtIEluZGljYXRlcyBpZiB0aGUgcm9vbSBpcyBhdWRpby1vbmx5LlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZyYW1lUmF0ZSAtIFRoZSBkZXNpcmVkIGZyYW1lIHJhdGUgZm9yIHRoZSB2aWRlby5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy52aWRDb25zIC0gVmlkZW8gY29uc3RyYWludHMgc3VjaCBhcyB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXZWaWRlb0lucHV0RGV2aWNlIC0gVGhlIHByZXZpb3VzIHZpZGVvIGlucHV0IGRldmljZSBJRC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzIHRvIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5oYXNDYW1lcmFQZXJtaXNzaW9uIC0gSW5kaWNhdGVzIGlmIHRoZSB1c2VyIGhhcyBjYW1lcmEgcGVybWlzc2lvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVZpZGVvU3dpdGNoaW5nIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHZpZGVvIHN3aXRjaGluZyBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZGVmYXVsdCB2aWRlbyBpbnB1dCBkZXZpY2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZXF1ZXN0UGVybWlzc2lvbkNhbWVyYSAtIEZ1bmN0aW9uIHRvIHJlcXVlc3QgY2FtZXJhIHBlcm1pc3Npb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zdHJlYW1TdWNjZXNzVmlkZW8gLSBGdW5jdGlvbiB0byBoYW5kbGUgc3VjY2Vzc2Z1bCB2aWRlbyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zbGVlcCAtIEZ1bmN0aW9uIHRvIHBhdXNlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgZHVyYXRpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jaGVja01lZGlhUGVybWlzc2lvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIG1lZGlhIHBlcm1pc3Npb25zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgdmlkZW8gaW5wdXQgZGV2aWNlIGhhcyBiZWVuIHN3aXRjaGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgc3dpdGNoaW5nIHRoZSB2aWRlbyBpbnB1dCBkZXZpY2UgZmFpbHMuXG4gICAqL1xuICBzd2l0Y2hVc2VyVmlkZW8gPSBhc3luYyAoe1xuICAgIHZpZGVvUHJlZmVyZW5jZSxcbiAgICBjaGVja29mZixcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiB7XG4gICAgdmlkZW9QcmVmZXJlbmNlOiBzdHJpbmc7XG4gICAgY2hlY2tvZmY6IGJvb2xlYW47XG4gICAgcGFyYW1ldGVyczogYW55O1xuICB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHtcbiAgICAgIGF1ZGlvT25seVJvb20sXG4gICAgICBmcmFtZVJhdGUsXG4gICAgICB2aWRDb25zLFxuICAgICAgcHJldlZpZGVvSW5wdXREZXZpY2UsXG4gICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UsXG4gICAgICBzaG93QWxlcnQsXG4gICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uLFxuICAgICAgdXBkYXRlVmlkZW9Td2l0Y2hpbmcsXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UsXG5cbiAgICAgIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmEsXG4gICAgICBzdHJlYW1TdWNjZXNzVmlkZW8sXG4gICAgICBzbGVlcCxcbiAgICAgIGNoZWNrTWVkaWFQZXJtaXNzaW9uLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIENoZWNrIGlmIGl0J3MgYW4gYXVkaW8tb25seSByb29tXG4gICAgICBpZiAoYXVkaW9Pbmx5Um9vbSkge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYSBpbiBhbiBhdWRpby1vbmx5IGV2ZW50LicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgY2hlY2tvZmYgaXMgbm90IHRydWUsIHRyaWdnZXIgYSBjbGljayBvbiB0aGUgdmlkZW8gYnV0dG9uIHRvIHR1cm4gb2ZmIHRoZSB2aWRlb1xuICAgICAgaWYgKCFjaGVja29mZikge1xuICAgICAgICBhd2FpdCB0aGlzLkNsaWNrVmlkZW9TZXJ2aWNlLmNsaWNrVmlkZW8oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICBhd2FpdCB1cGRhdGVWaWRlb1N3aXRjaGluZyh0cnVlKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoNTAwKTtcbiAgICAgICAgYXdhaXQgdXBkYXRlVmlkZW9Td2l0Y2hpbmcoZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBjYW1lcmEgcGVybWlzc2lvblxuICAgICAgaWYgKCFoYXNDYW1lcmFQZXJtaXNzaW9uKSB7XG4gICAgICAgIGlmIChjaGVja01lZGlhUGVybWlzc2lvbikge1xuICAgICAgICAgIGxldCBzdGF0dXNDYW1lcmEgPSBhd2FpdCByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYSgpO1xuICAgICAgICAgIGlmIChzdGF0dXNDYW1lcmEgIT09ICdncmFudGVkJykge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICdBbGxvdyBhY2Nlc3MgdG8geW91ciBjYW1lcmEgb3IgY2hlY2sgaWYgeW91ciBjYW1lcmEgaXMgbm90IGJlaW5nIHVzZWQgYnkgYW5vdGhlciBhcHBsaWNhdGlvbi4nLFxuICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgbWVkaWFDb25zdHJhaW50czogYW55ID0ge307XG5cbiAgICAgIGlmICh2aWRDb25zICYmIHZpZENvbnMud2lkdGggJiYgdmlkQ29ucy5oZWlnaHQpIHtcbiAgICAgICAgbWVkaWFDb25zdHJhaW50cyA9IHtcbiAgICAgICAgICB2aWRlbzoge1xuICAgICAgICAgICAgZGV2aWNlSWQ6IHsgZXhhY3Q6IHZpZGVvUHJlZmVyZW5jZSB9LFxuICAgICAgICAgICAgLi4udmlkQ29ucyxcbiAgICAgICAgICAgIGZyYW1lUmF0ZTogeyBpZGVhbDogZnJhbWVSYXRlIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICBkZXZpY2VJZDogeyBleGFjdDogdmlkZW9QcmVmZXJlbmNlIH0sXG4gICAgICAgICAgICBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdXNlciBtZWRpYSB3aXRoIHRoZSBkZWZpbmVkIGNvbnN0cmFpbnRzXG4gICAgICBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAgIC5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cylcbiAgICAgICAgLnRoZW4oYXN5bmMgKHN0cmVhbTogTWVkaWFTdHJlYW0pID0+IHtcbiAgICAgICAgICBhd2FpdCBzdHJlYW1TdWNjZXNzVmlkZW8oeyBzdHJlYW0sIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgLy8gSGFuZGxlIGVycm9ycyBhbmQgcmV2ZXJ0IHRvIHRoZSBwcmV2aW91cyB2aWRlbyBpbnB1dCBkZXZpY2VcbiAgICAgICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPSBwcmV2VmlkZW9JbnB1dERldmljZTtcbiAgICAgICAgICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UodXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlKTtcblxuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICdFcnJvciBzd2l0Y2hpbmc7IG5vdCBhY2Nlc3NpYmxlLCBtaWdodCBuZWVkIHRvIHR1cm4gb2ZmIHlvdXIgdmlkZW8gYW5kIHR1cm4gaXQgYmFjayBvbiBhZnRlciBzd2l0Y2hpbmcuJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBIYW5kbGUgdW5leHBlY3RlZCBlcnJvcnMgYW5kIHJldmVydCB0byB0aGUgcHJldmlvdXMgdmlkZW8gaW5wdXQgZGV2aWNlXG4gICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPSBwcmV2VmlkZW9JbnB1dERldmljZTtcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSh1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UpO1xuXG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgJ0Vycm9yIHN3aXRjaGluZzsgbm90IGFjY2Vzc2libGUsIG1pZ2h0IG5lZWQgdG8gdHVybiBvZmYgeW91ciB2aWRlbyBhbmQgdHVybiBpdCBiYWNrIG9uIGFmdGVyIHN3aXRjaGluZy4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=