import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../methods/stream-methods/click-video.service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXVzZXItdmlkZW8tYWx0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3N3aXRjaC11c2VyLXZpZGVvLWFsdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQTRDM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUNUO0lBQXBCLFlBQW9CLGlCQUE2QjtRQUE3QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVk7SUFBRyxDQUFDO0lBRXJEOzs7Ozs7Ozs7OztPQVdHO0lBRUgsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQ3ZCLGVBQWUsRUFDZixRQUFRLEVBQ1IsVUFBVSxHQUNnQjtRQUMxQixJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDekMsSUFBSSxXQUFXLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUV4QyxJQUFJLEVBQ0YsYUFBYSxFQUNiLFNBQVMsRUFDVCxPQUFPLEVBQ1AsU0FBUyxFQUNULG1CQUFtQixFQUNuQixvQkFBb0IsRUFDcEIsdUJBQXVCO1FBRXZCLHFCQUFxQjtRQUNyQix1QkFBdUIsRUFDdkIsa0JBQWtCLEVBQ2xCLEtBQUssRUFDTCxvQkFBb0IsR0FDckIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLEdBQUcsV0FBVyxDQUFDO1FBRXhELElBQUksQ0FBQztZQUNILG1DQUFtQztZQUNuQyxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNsQixTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsd0RBQXdEO29CQUNqRSxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7Z0JBRUgsT0FBTztZQUNULENBQUM7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QUNsRyxJQUFJLGFBQWEsS0FBSyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQy9FLGlCQUFpQixHQUFHLGNBQWMsQ0FBQztnQ0FDbkMsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQ0FFM0MsU0FBUyxFQUFFLENBQUM7b0NBQ1YsT0FBTyxFQUNMLHlHQUF5RztvQ0FDM0csSUFBSSxFQUFFLFFBQVE7b0NBQ2QsUUFBUSxFQUFFLElBQUk7aUNBQ2YsQ0FBQyxDQUFDOzRCQUNMLENBQUM7d0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7aUJBQU0sQ0FBQztnQkFDTixpQkFBaUIsR0FBRyxjQUFjLENBQUM7Z0JBQ25DLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBRTNDLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFDTCx5R0FBeUc7b0JBQzNHLElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzt1R0F4UVUsa0JBQWtCOzJHQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsaWNrVmlkZW8sIENsaWNrVmlkZW9QYXJhbWV0ZXJzIH0gZnJvbSAnLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFNob3dBbGVydCxcbiAgVmlkQ29ucyxcbiAgUmVxdWVzdFBlcm1pc3Npb25DYW1lcmFUeXBlLFxuICBTdHJlYW1TdWNjZXNzVmlkZW9UeXBlLFxuICBTbGVlcFR5cGUsXG4gIFN0cmVhbVN1Y2Nlc3NWaWRlb1BhcmFtZXRlcnMsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVXNlclZpZGVvQWx0UGFyYW1ldGVyc1xuICBleHRlbmRzIFN0cmVhbVN1Y2Nlc3NWaWRlb1BhcmFtZXRlcnMsXG4gICAgQ2xpY2tWaWRlb1BhcmFtZXRlcnMge1xuICBhdWRpb09ubHlSb29tOiBib29sZWFuO1xuICBmcmFtZVJhdGU6IG51bWJlcjtcbiAgdmlkQ29uczogVmlkQ29ucztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBoYXNDYW1lcmFQZXJtaXNzaW9uOiBib29sZWFuO1xuICB1cGRhdGVWaWRlb1N3aXRjaGluZzogKHN0YXRlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZTogKG1vZGU6IHN0cmluZykgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmE6IFJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhVHlwZTtcbiAgc3RyZWFtU3VjY2Vzc1ZpZGVvOiBTdHJlYW1TdWNjZXNzVmlkZW9UeXBlO1xuICBzbGVlcDogU2xlZXBUeXBlO1xuICBjaGVja01lZGlhUGVybWlzc2lvbjogYm9vbGVhbjtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gU3dpdGNoVXNlclZpZGVvQWx0UGFyYW1ldGVycztcblxuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVXNlclZpZGVvQWx0T3B0aW9ucyB7XG4gIHZpZGVvUHJlZmVyZW5jZTogc3RyaW5nO1xuICBjaGVja29mZjogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogU3dpdGNoVXNlclZpZGVvQWx0UGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3dpdGNoVXNlclZpZGVvQWx0VHlwZSA9IChvcHRpb25zOiBTd2l0Y2hVc2VyVmlkZW9BbHRPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3dpdGNoVXNlclZpZGVvQWx0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBDbGlja1ZpZGVvU2VydmljZTogQ2xpY2tWaWRlbykge31cblxuICAvKipcbiAgICogU3dpdGNoZXMgdGhlIHVzZXIncyB2aWRlbyBzdHJlYW0gYmFzZWQgb24gdGhlIHByb3ZpZGVkIHZpZGVvIHByZWZlcmVuY2UgYW5kIG90aGVyIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN3aXRjaGluZyB0aGUgdXNlcidzIHZpZGVvLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy52aWRlb1ByZWZlcmVuY2UgLSBUaGUgcHJlZmVycmVkIHZpZGVvIGZhY2luZyBtb2RlIChlLmcuLCBcInVzZXJcIiBvciBcImVudmlyb25tZW50XCIpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuY2hlY2tvZmYgLSBBIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHR1cm4gb2ZmIHRoZSB2aWRlbyBiZWZvcmUgc3dpdGNoaW5nLlxuICAgKiBAcGFyYW0ge1N3aXRjaFVzZXJWaWRlb0FsdE9wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzd2l0Y2hpbmcgdGhlIHZpZGVvLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgdmlkZW8gc3dpdGNoaW5nIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgd2l0aCBzd2l0Y2hpbmcgdGhlIHZpZGVvLlxuICAgKi9cblxuICBhc3luYyBzd2l0Y2hVc2VyVmlkZW9BbHQoe1xuICAgIHZpZGVvUHJlZmVyZW5jZSxcbiAgICBjaGVja29mZixcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBTd2l0Y2hVc2VyVmlkZW9BbHRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBsZXQgcGFyYW1ldGVyc18gPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgYXVkaW9Pbmx5Um9vbSxcbiAgICAgIGZyYW1lUmF0ZSxcbiAgICAgIHZpZENvbnMsXG4gICAgICBzaG93QWxlcnQsXG4gICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uLFxuICAgICAgdXBkYXRlVmlkZW9Td2l0Y2hpbmcsXG4gICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZSxcblxuICAgICAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NWaWRlbyxcbiAgICAgIHNsZWVwLFxuICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb24sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBsZXQgeyBjdXJyZW50RmFjaW5nTW9kZSwgcHJldkZhY2luZ01vZGUgfSA9IHBhcmFtZXRlcnNfO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIENoZWNrIGlmIGl0J3MgYW4gYXVkaW8tb25seSByb29tXG4gICAgICBpZiAoYXVkaW9Pbmx5Um9vbSkge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYSBpbiBhbiBhdWRpby1vbmx5IGV2ZW50LicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgY2hlY2tvZmYgaXMgbm90IHRydWUsIHRyaWdnZXIgYSBjbGljayBvbiB0aGUgdmlkZW8gYnV0dG9uIHRvIHR1cm4gb2ZmIHRoZSB2aWRlb1xuICAgICAgaWYgKCFjaGVja29mZikge1xuICAgICAgICBhd2FpdCB0aGlzLkNsaWNrVmlkZW9TZXJ2aWNlLmNsaWNrVmlkZW8oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB1cGRhdGVWaWRlb1N3aXRjaGluZyh0cnVlKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgICAgICB1cGRhdGVWaWRlb1N3aXRjaGluZyhmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGNhbWVyYSBwZXJtaXNzaW9uXG4gICAgICBpZiAoIWhhc0NhbWVyYVBlcm1pc3Npb24pIHtcbiAgICAgICAgaWYgKGNoZWNrTWVkaWFQZXJtaXNzaW9uKSB7XG4gICAgICAgICAgbGV0IHN0YXR1c0NhbWVyYSA9IGF3YWl0IHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhKCk7XG5cbiAgICAgICAgICBpZiAoc3RhdHVzQ2FtZXJhICE9PSAnZ3JhbnRlZCcpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAnQWxsb3cgYWNjZXNzIHRvIHlvdXIgY2FtZXJhIG9yIGNoZWNrIGlmIHlvdXIgY2FtZXJhIGlzIG5vdCBiZWluZyB1c2VkIGJ5IGFub3RoZXIgYXBwbGljYXRpb24uJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRW51bWVyYXRlIHZpZGVvIGRldmljZXNcbiAgICAgIGNvbnN0IHZpZGVvRGV2aWNlcyA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuXG4gICAgICAvLyBEZWZpbmUgbWVkaWEgY29uc3RyYWludHMgYmFzZWQgb24gcHJlZmVyZW5jZXMgYW5kIG9wdGlvbnNcbiAgICAgIGxldCBtZWRpYUNvbnN0cmFpbnRzOiBhbnkgPSB7fTtcblxuICAgICAgaWYgKHZpZENvbnMgJiYgdmlkQ29ucy53aWR0aCAmJiB2aWRDb25zLmhlaWdodCkge1xuICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICBmYWNpbmdNb2RlOiB7IGV4YWN0OiB2aWRlb1ByZWZlcmVuY2UgfSxcbiAgICAgICAgICAgIC4uLnZpZENvbnMsXG4gICAgICAgICAgICBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVkaWFDb25zdHJhaW50cyA9IHtcbiAgICAgICAgICB2aWRlbzoge1xuICAgICAgICAgICAgZmFjaW5nTW9kZTogeyBleGFjdDogdmlkZW9QcmVmZXJlbmNlIH0sXG4gICAgICAgICAgICBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdXNlciBtZWRpYSB3aXRoIHRoZSBkZWZpbmVkIGNvbnN0cmFpbnRzXG4gICAgICBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAgIC5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cylcbiAgICAgICAgLnRoZW4oYXN5bmMgKHN0cmVhbTogTWVkaWFTdHJlYW0pID0+IHtcbiAgICAgICAgICBhd2FpdCBzdHJlYW1TdWNjZXNzVmlkZW8oeyBzdHJlYW0sIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgbGV0IHZpZGVvRGV2aWNlc0Zyb250ID0gW107XG5cbiAgICAgICAgICAvLyBGaWx0ZXIgdmlkZW8gZGV2aWNlcyBiYXNlZCBvbiB0aGUgcHJlZmVycmVkIGZhY2luZyBtb2RlXG4gICAgICAgICAgaWYgKHZpZGVvUHJlZmVyZW5jZSA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgICB2aWRlb0RldmljZXNGcm9udCA9IHZpZGVvRGV2aWNlcy5maWx0ZXIoXG4gICAgICAgICAgICAgIChkZXZpY2U6IE1lZGlhRGV2aWNlSW5mbykgPT5cbiAgICAgICAgICAgICAgICBkZXZpY2UubGFiZWwuaW5jbHVkZXMoJ2Zyb250JykgJiYgZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0JyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZGVvRGV2aWNlc0Zyb250ID0gdmlkZW9EZXZpY2VzLmZpbHRlcihcbiAgICAgICAgICAgICAgKGRldmljZTogTWVkaWFEZXZpY2VJbmZvKSA9PlxuICAgICAgICAgICAgICAgIGRldmljZS5sYWJlbC5pbmNsdWRlcygnYmFjaycpICYmIGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2aWRlb0RldmljZXNGcm9udC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2aWRlb0RldmljZXNGcm9udC5mb3JFYWNoKChkZXZpY2U6IE1lZGlhRGV2aWNlSW5mbykgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0Jykge1xuICAgICAgICAgICAgICAgIGxldCB2aWRlb0RldmljZUlkID0gZGV2aWNlLmRldmljZUlkO1xuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIG1lZGlhIGNvbnN0cmFpbnRzIHdpdGggdGhlIHNwZWNpZmljIHZpZGVvIGRldmljZVxuICAgICAgICAgICAgICAgIGlmICh2aWRDb25zICYmIHZpZENvbnMud2lkdGggJiYgdmlkQ29ucy5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZGV2aWNlSWQ6IHsgZXhhY3Q6IHZpZGVvRGV2aWNlSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAuLi52aWRDb25zLFxuICAgICAgICAgICAgICAgICAgICAgIGZyYW1lUmF0ZTogeyBpZGVhbDogZnJhbWVSYXRlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZGV2aWNlSWQ6IHsgZXhhY3Q6IHZpZGVvRGV2aWNlSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBnZXQgdXNlciBtZWRpYSB3aXRoIHRoZSBuZXcgY29uc3RyYWludHNcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAgICAgICAgICAgICAuZ2V0VXNlck1lZGlhKG1lZGlhQ29uc3RyYWludHMpXG4gICAgICAgICAgICAgICAgICAudGhlbihhc3luYyAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzdHJlYW1TdWNjZXNzVmlkZW8oeyBzdHJlYW0sIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgdmlkZW8gZGV2aWNlIGlzIHRoZSBsYXN0IG9uZSBpbiB0aGUgbGlzdCwgc2hvdyB0aGUgZXJyb3I7IG90aGVyd2lzZSwgdHJ5IHRoZSBuZXh0IGRldmljZVxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgdmlkZW9EZXZpY2VJZCA9PT0gdmlkZW9EZXZpY2VzRnJvbnRbdmlkZW9EZXZpY2VzRnJvbnQubGVuZ3RoIC0gMV0uZGV2aWNlSWRcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3VycmVudEZhY2luZ01vZGUgPSBwcmV2RmFjaW5nTW9kZTtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZShjdXJyZW50RmFjaW5nTW9kZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3Igc3dpdGNoaW5nOyBub3QgYWNjZXNzaWJsZSwgbWlnaHQgbmVlZCB0byB0dXJuIG9mZiB5b3VyIHZpZGVvIGFuZCB0dXJuIGl0IGJhY2sgb24gYWZ0ZXIgc3dpdGNoaW5nLicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNob3cgZXJyb3IgaWYgbm8gY29tcGF0aWJsZSB2aWRlbyBkZXZpY2VzIGFyZSBmb3VuZFxuICAgICAgICAgICAgY3VycmVudEZhY2luZ01vZGUgPSBwcmV2RmFjaW5nTW9kZTtcbiAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlKGN1cnJlbnRGYWNpbmdNb2RlKTtcblxuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICdFcnJvciBzd2l0Y2hpbmc7IG5vdCBhY2Nlc3NpYmxlLCBtaWdodCBuZWVkIHRvIHR1cm4gb2ZmIHlvdXIgdmlkZW8gYW5kIHR1cm4gaXQgYmFjayBvbiBhZnRlciBzd2l0Y2hpbmcuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gSGFuZGxlIGFueSB1bmV4cGVjdGVkIGVycm9yc1xuICAgICAgY29uc3QgdmlkZW9EZXZpY2VzID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG4gICAgICBsZXQgdmlkZW9EZXZpY2VzRnJvbnQgPSBbXTtcbiAgICAgIGlmICh2aWRlb1ByZWZlcmVuY2UgPT09ICd1c2VyJykge1xuICAgICAgICB2aWRlb0RldmljZXNGcm9udCA9IHZpZGVvRGV2aWNlcy5maWx0ZXIoXG4gICAgICAgICAgKGRldmljZTogTWVkaWFEZXZpY2VJbmZvKSA9PlxuICAgICAgICAgICAgZGV2aWNlLmxhYmVsLmluY2x1ZGVzKCdmcm9udCcpICYmIGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2aWRlb0RldmljZXNGcm9udCA9IHZpZGVvRGV2aWNlcy5maWx0ZXIoXG4gICAgICAgICAgKGRldmljZTogTWVkaWFEZXZpY2VJbmZvKSA9PlxuICAgICAgICAgICAgZGV2aWNlLmxhYmVsLmluY2x1ZGVzKCdiYWNrJykgJiYgZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0JyxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgbGV0IG1lZGlhQ29uc3RyYWludHM6IGFueSA9IHt9O1xuXG4gICAgICBpZiAodmlkZW9EZXZpY2VzRnJvbnQubGVuZ3RoID4gMCkge1xuICAgICAgICB2aWRlb0RldmljZXNGcm9udC5mb3JFYWNoKChkZXZpY2U6IE1lZGlhRGV2aWNlSW5mbykgPT4ge1xuICAgICAgICAgIGlmIChkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnKSB7XG4gICAgICAgICAgICBsZXQgdmlkZW9EZXZpY2VJZCA9IGRldmljZS5kZXZpY2VJZDtcblxuICAgICAgICAgICAgaWYgKHZpZENvbnMgJiYgdmlkQ29ucy53aWR0aCAmJiB2aWRDb25zLmhlaWdodCkge1xuICAgICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICAgICAgICBkZXZpY2VJZDogeyBleGFjdDogdmlkZW9EZXZpY2VJZCB9LFxuICAgICAgICAgICAgICAgICAgLi4udmlkQ29ucyxcbiAgICAgICAgICAgICAgICAgIGZyYW1lUmF0ZTogeyBpZGVhbDogZnJhbWVSYXRlIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICAgICAgICBkZXZpY2VJZDogeyBleGFjdDogdmlkZW9EZXZpY2VJZCB9LFxuICAgICAgICAgICAgICAgICAgZnJhbWVSYXRlOiB7IGlkZWFsOiBmcmFtZVJhdGUgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgICAgICAuZ2V0VXNlck1lZGlhKG1lZGlhQ29uc3RyYWludHMpXG4gICAgICAgICAgICAgIC50aGVuKGFzeW5jIChzdHJlYW06IE1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc3RyZWFtU3VjY2Vzc1ZpZGVvKHsgc3RyZWFtLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIElmIGN1cnJlbnQgdmlkZW8gZGV2aWNlIGlzIHRoZSBsYXN0IG9uZSBpbiB0aGUgbGlzdCwgc2hvdyB0aGUgZXJyb3I7IG90aGVyd2lzZSwgdHJ5IG5leHQgZGV2aWNlXG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvRGV2aWNlSWQgPT09IHZpZGVvRGV2aWNlc0Zyb250W3ZpZGVvRGV2aWNlc0Zyb250Lmxlbmd0aCAtIDFdLmRldmljZUlkKSB7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50RmFjaW5nTW9kZSA9IHByZXZGYWNpbmdNb2RlO1xuICAgICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGUoY3VycmVudEZhY2luZ01vZGUpO1xuXG4gICAgICAgICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgJ0Vycm9yIHN3aXRjaGluZzsgbm90IGFjY2Vzc2libGUsIG1pZ2h0IG5lZWQgdG8gdHVybiBvZmYgeW91ciB2aWRlbyBhbmQgdHVybiBpdCBiYWNrIG9uIGFmdGVyIHN3aXRjaGluZy4nLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50RmFjaW5nTW9kZSA9IHByZXZGYWNpbmdNb2RlO1xuICAgICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZShjdXJyZW50RmFjaW5nTW9kZSk7XG5cbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAnRXJyb3Igc3dpdGNoaW5nOyBub3QgYWNjZXNzaWJsZSwgbWlnaHQgbmVlZCB0byB0dXJuIG9mZiB5b3VyIHZpZGVvIGFuZCB0dXJuIGl0IGJhY2sgb24gYWZ0ZXIgc3dpdGNoaW5nLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19