// click-video.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the click event to toggle the participant's video on/off and manages video permission requests.
 *
 * @param {ClickVideoOptions} options - The options for handling the video click event.
 * @param {ClickVideoParameters} options.parameters - The parameters required for the video action.
 * @param {boolean} options.parameters.checkMediaPermission - Indicates if media permission needs to be checked.
 * @param {boolean} options.parameters.hasCameraPermission - Indicates if camera permission has been granted.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is currently active.
 * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the current room is audio-only.
 * @param {boolean} options.parameters.recordStarted - Indicates if recording has started.
 * @param {boolean} options.parameters.recordResumed - Indicates if recording has resumed.
 * @param {boolean} options.parameters.recordPaused - Indicates if recording is paused.
 * @param {boolean} options.parameters.recordStopped - Indicates if recording is stopped.
 * @param {string} options.parameters.recordingMediaOptions - The media options for recording (e.g., "video", "audio").
 * @param {string} options.parameters.islevel - The participant's level.
 * @param {boolean} options.parameters.youAreCoHost - Indicates if the user is a co-host.
 * @param {boolean} options.parameters.adminRestrictSetting - Indicates if there are admin restrictions on video.
 * @param {string | null} options.parameters.videoRequestState - State of the video request.
 * @param {number} options.parameters.videoRequestTime - Timestamp of the video request.
 * @param {string} options.parameters.member - The participant's name.
 * @param {Socket} options.parameters.socket - The socket connection used for communication.
 * @param {string} options.parameters.roomName - The name of the room where the video is being toggled.
 * @param {string} options.parameters.userDefaultVideoInputDevice - The default video input device.
 * @param {string} options.parameters.currentFacingMode - The current facing mode of the camera.
 * @param {VidCons} options.parameters.vidCons - Video constraints for the stream.
 * @param {number} options.parameters.frameRate - Desired frame rate for the video.
 * @param {boolean} options.parameters.videoAction - Indicates if a video action is currently taking place.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream.
 * @param {string} options.parameters.audioSetting - The current audio setting.
 * @param {string} options.parameters.videoSetting - The current video setting.
 * @param {string} options.parameters.screenshareSetting - The current screenshare setting.
 * @param {string} options.parameters.chatSetting - The current chat setting.
 * @param {number} options.parameters.updateRequestIntervalSeconds - Interval time for updating request state.
 *
 * @returns {Promise<void>} A promise that resolves when the video action has been handled.
 *
 * @remarks
 * This function checks the current status of the video and handles the logic for starting or stopping the video stream.
 * It validates permissions and room settings before allowing the video to be activated or deactivated.
 *
 * @example
 * ```typescript
 * const options: ClickVideoOptions = {
 *   parameters: {
 *     checkMediaPermission: true,
 *     hasCameraPermission: false,
 *     videoAlreadyOn: false,
 *     audioOnlyRoom: false,
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordPaused: false,
 *     recordStopped: false,
 *     recordingMediaOptions: 'video',
 *     islevel: '1',
 *     youAreCoHost: false,
 *     adminRestrictSetting: false,
 *     videoRequestState: null,
 *     videoRequestTime: 0,
 *     member: 'John Doe',
 *     socket: socketInstance,
 *     roomName: 'myRoom',
 *     userDefaultVideoInputDevice: '',
 *     currentFacingMode: 'user',
 *     vidCons: { width: 1280, height: 720 },
 *     frameRate: 30,
 *     videoAction: false,
 *     localStream: null,
 *     audioSetting: 'on',
 *     videoSetting: 'on',
 *     screenshareSetting: 'off',
 *     chatSetting: 'allow',
 *     updateRequestIntervalSeconds: 30,
 *     showAlert: (alert) => console.log(alert.message),
 *     updateVideoAlreadyOn: (status) => console.log(`Video already on: ${status}`),
 *     updateVideoRequestState: (state) => console.log(`Video request state: ${state}`),
 *     updateLocalStream: (stream) => console.log('Local stream updated'),
 *     streamSuccessVideo: streamSuccessFunction,
 *     disconnectSendTransportVideo: disconnectFunction,
 *     requestPermissionCamera: requestPermissionFunction,
 *     checkPermission: checkPermissionFunction,
 *     getUpdatedAllParams: () => parameters,
 *   },
 * };
 *
 * const clickVideoService = new ClickVideo();
 * await clickVideoService.clickVideo(options);
 * ```
 */
export class ClickVideo {
    /**
     * Handles the click event to toggle the participant's video on/off and manages video permission requests.
     *
     * @param {ClickVideoParams} options - The function parameters.
     * @returns {Promise<void>}
     */
    clickVideo = async ({ parameters }) => {
        let { checkMediaPermission, hasCameraPermission, videoAlreadyOn, audioOnlyRoom, recordStarted, recordResumed, recordPaused, recordStopped, recordingMediaOptions, islevel, youAreCoHost, adminRestrictSetting, videoRequestState, videoRequestTime, member, socket, roomName, userDefaultVideoInputDevice, currentFacingMode, vidCons, frameRate, videoAction, localStream, audioSetting, videoSetting, screenshareSetting, chatSetting, updateRequestIntervalSeconds, streamSuccessVideo, showAlert, updateVideoAlreadyOn, updateVideoRequestState, updateLocalStream, disconnectSendTransportVideo, requestPermissionCamera, checkPermission, } = parameters;
        if (audioOnlyRoom) {
            showAlert?.({
                message: 'You cannot turn on your camera in an audio only event.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        if (videoAlreadyOn) {
            if (islevel === '2' && (recordStarted || recordResumed)) {
                if (!(recordPaused || recordStopped) && recordingMediaOptions === 'video') {
                    showAlert?.({
                        message: 'You cannot turn off your camera while recording video, please pause or stop recording first.',
                        type: 'danger',
                        duration: 3000,
                    });
                    return;
                }
            }
            videoAlreadyOn = false;
            updateVideoAlreadyOn(videoAlreadyOn);
            if (localStream) {
                localStream.getVideoTracks()[0].enabled = false;
            }
            updateLocalStream(localStream);
            await disconnectSendTransportVideo({ parameters });
        }
        else {
            if (adminRestrictSetting) {
                showAlert?.({
                    message: 'You cannot turn on your camera. Access denied by host.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
            let response = 2;
            if (!videoAction && islevel !== '2' && !youAreCoHost) {
                response = await checkPermission({
                    permissionType: 'videoSetting',
                    audioSetting,
                    videoSetting,
                    screenshareSetting,
                    chatSetting,
                });
            }
            else {
                response = 0;
            }
            if (response === 1) {
                if (videoRequestState === 'pending') {
                    showAlert?.({
                        message: 'A request is pending. Please wait for the host to respond.',
                        type: 'danger',
                        duration: 3000,
                    });
                    return;
                }
                if (videoRequestState === 'rejected' &&
                    Date.now() - videoRequestTime < updateRequestIntervalSeconds) {
                    showAlert?.({
                        message: `A request was rejected. Please wait for ${updateRequestIntervalSeconds} seconds before sending another request.`,
                        type: 'danger',
                        duration: 3000,
                    });
                    return;
                }
                showAlert?.({
                    message: 'Request sent to host.',
                    type: 'success',
                    duration: 3000,
                });
                videoRequestState = 'pending';
                updateVideoRequestState(videoRequestState);
                let userRequest = { id: socket.id, name: member, icon: 'fa-video' };
                socket.emit('participantRequest', { userRequest, roomName });
            }
            else if (response === 2) {
                showAlert?.({
                    message: 'You cannot turn on your camera. Access denied by host.',
                    type: 'danger',
                    duration: 3000,
                });
            }
            else {
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
                let altMediaConstraints = {};
                if (userDefaultVideoInputDevice) {
                    if (vidCons && vidCons.width && vidCons.height) {
                        mediaConstraints = {
                            video: {
                                deviceId: userDefaultVideoInputDevice,
                                facingMode: currentFacingMode,
                                ...vidCons,
                                frameRate: { ideal: frameRate },
                            },
                            audio: false,
                        };
                        altMediaConstraints = {
                            video: { ...vidCons, frameRate: { ideal: frameRate } },
                            audio: false,
                        };
                    }
                    else {
                        mediaConstraints = {
                            video: { ...vidCons, frameRate: { ideal: frameRate } },
                            audio: false,
                        };
                        altMediaConstraints = { video: { frameRate: { ideal: frameRate } }, audio: false };
                    }
                }
                else {
                    if (vidCons && vidCons.width && vidCons.height) {
                        mediaConstraints = {
                            video: { ...vidCons, frameRate: { ideal: frameRate } },
                            audio: false,
                        };
                        altMediaConstraints = {
                            video: { ...vidCons, frameRate: { ideal: frameRate } },
                            audio: false,
                        };
                    }
                    else {
                        mediaConstraints = { video: { frameRate: { ideal: frameRate } }, audio: false };
                    }
                }
                await navigator.mediaDevices
                    .getUserMedia(mediaConstraints)
                    .then(async (stream) => {
                    await streamSuccessVideo({ stream, parameters });
                })
                    .catch(async () => {
                    await navigator.mediaDevices
                        .getUserMedia(altMediaConstraints)
                        .then(async (stream) => {
                        await streamSuccessVideo({ stream, parameters });
                    })
                        .catch(() => {
                        showAlert?.({
                            message: 'Allow access to your camera or check if your camera is not being used by another application.',
                            type: 'danger',
                            duration: 3000,
                        });
                    });
                });
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickVideo, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickVideo, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickVideo, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stdmlkZW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLXZpZGVvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBa0UzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUZHO0FBS0gsTUFBTSxPQUFPLFVBQVU7SUFDckI7Ozs7O09BS0c7SUFFSCxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFxQixFQUFpQixFQUFFO1FBQ3RFLElBQUksRUFDRixvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osYUFBYSxFQUNiLHFCQUFxQixFQUNyQixPQUFPLEVBQ1AsWUFBWSxFQUNaLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLDJCQUEyQixFQUMzQixpQkFBaUIsRUFDakIsT0FBTyxFQUNQLFNBQVMsRUFDVCxXQUFXLEVBQ1gsV0FBVyxFQUNYLFlBQVksRUFDWixZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCw0QkFBNEIsRUFDNUIsa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxvQkFBb0IsRUFDcEIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQiw0QkFBNEIsRUFDNUIsdUJBQXVCLEVBQ3ZCLGVBQWUsR0FDaEIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLGFBQWEsRUFBRSxDQUFD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Q0FBQyxZQUFZO3FCQUN6QixZQUFZLENBQUMsZ0JBQWdCLENBQUM7cUJBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBbUIsRUFBRSxFQUFFO29CQUNsQyxNQUFNLGtCQUFrQixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ2hCLE1BQU0sU0FBUyxDQUFDLFlBQVk7eUJBQ3pCLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQzt5QkFDakMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFtQixFQUFFLEVBQUU7d0JBQ2xDLE1BQU0sa0JBQWtCLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDbkQsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxHQUFHLEVBQUU7d0JBQ1YsU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUNMLCtGQUErRjs0QkFDakcsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsUUFBUSxFQUFFLElBQUk7eUJBQ2YsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7dUdBL05TLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY2xpY2stdmlkZW8uc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2hlY2tQZXJtaXNzaW9uVHlwZSxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9UeXBlLFxuICBSZXF1ZXN0UGVybWlzc2lvbkNhbWVyYVR5cGUsXG4gIFNob3dBbGVydCxcbiAgU3RyZWFtU3VjY2Vzc1ZpZGVvUGFyYW1ldGVycyxcbiAgU3RyZWFtU3VjY2Vzc1ZpZGVvVHlwZSxcbiAgVmlkQ29ucyxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsaWNrVmlkZW9QYXJhbWV0ZXJzXG4gIGV4dGVuZHMgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gICAgU3RyZWFtU3VjY2Vzc1ZpZGVvUGFyYW1ldGVycyB7XG4gIGNoZWNrTWVkaWFQZXJtaXNzaW9uOiBib29sZWFuO1xuICBoYXNDYW1lcmFQZXJtaXNzaW9uOiBib29sZWFuO1xuICB2aWRlb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgYXVkaW9Pbmx5Um9vbTogYm9vbGVhbjtcbiAgcmVjb3JkU3RhcnRlZDogYm9vbGVhbjtcbiAgcmVjb3JkUmVzdW1lZDogYm9vbGVhbjtcbiAgcmVjb3JkUGF1c2VkOiBib29sZWFuO1xuICByZWNvcmRTdG9wcGVkOiBib29sZWFuO1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICB5b3VBcmVDb0hvc3Q6IGJvb2xlYW47XG4gIGFkbWluUmVzdHJpY3RTZXR0aW5nOiBib29sZWFuO1xuICB2aWRlb1JlcXVlc3RTdGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgdmlkZW9SZXF1ZXN0VGltZTogbnVtYmVyO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogc3RyaW5nO1xuICBjdXJyZW50RmFjaW5nTW9kZTogc3RyaW5nO1xuICB2aWRDb25zOiBWaWRDb25zO1xuICBmcmFtZVJhdGU6IG51bWJlcjtcbiAgdmlkZW9BY3Rpb246IGJvb2xlYW47XG4gIGxvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIGF1ZGlvU2V0dGluZzogc3RyaW5nO1xuICB2aWRlb1NldHRpbmc6IHN0cmluZztcbiAgc2NyZWVuc2hhcmVTZXR0aW5nOiBzdHJpbmc7XG4gIGNoYXRTZXR0aW5nOiBzdHJpbmc7XG4gIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHM6IG51bWJlcjtcblxuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHVwZGF0ZVZpZGVvQWxyZWFkeU9uOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlOiAoc3RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlTG9jYWxTdHJlYW06IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcblxuICBzdHJlYW1TdWNjZXNzVmlkZW86IFN0cmVhbVN1Y2Nlc3NWaWRlb1R5cGU7XG4gIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9UeXBlO1xuICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYTogUmVxdWVzdFBlcm1pc3Npb25DYW1lcmFUeXBlO1xuICBjaGVja1Blcm1pc3Npb246IENoZWNrUGVybWlzc2lvblR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ2xpY2tWaWRlb1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbGlja1ZpZGVvT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IENsaWNrVmlkZW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDbGlja1ZpZGVvVHlwZSA9IChvcHRpb25zOiBDbGlja1ZpZGVvT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBIYW5kbGVzIHRoZSBjbGljayBldmVudCB0byB0b2dnbGUgdGhlIHBhcnRpY2lwYW50J3MgdmlkZW8gb24vb2ZmIGFuZCBtYW5hZ2VzIHZpZGVvIHBlcm1pc3Npb24gcmVxdWVzdHMuXG4gKlxuICogQHBhcmFtIHtDbGlja1ZpZGVvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBoYW5kbGluZyB0aGUgdmlkZW8gY2xpY2sgZXZlbnQuXG4gKiBAcGFyYW0ge0NsaWNrVmlkZW9QYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgdGhlIHZpZGVvIGFjdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoZWNrTWVkaWFQZXJtaXNzaW9uIC0gSW5kaWNhdGVzIGlmIG1lZGlhIHBlcm1pc3Npb24gbmVlZHMgdG8gYmUgY2hlY2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmhhc0NhbWVyYVBlcm1pc3Npb24gLSBJbmRpY2F0ZXMgaWYgY2FtZXJhIHBlcm1pc3Npb24gaGFzIGJlZW4gZ3JhbnRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvQWxyZWFkeU9uIC0gSW5kaWNhdGVzIGlmIHRoZSB2aWRlbyBpcyBjdXJyZW50bHkgYWN0aXZlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Pbmx5Um9vbSAtIEluZGljYXRlcyBpZiB0aGUgY3VycmVudCByb29tIGlzIGF1ZGlvLW9ubHkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdGFydGVkIC0gSW5kaWNhdGVzIGlmIHJlY29yZGluZyBoYXMgc3RhcnRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFJlc3VtZWQgLSBJbmRpY2F0ZXMgaWYgcmVjb3JkaW5nIGhhcyByZXN1bWVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUGF1c2VkIC0gSW5kaWNhdGVzIGlmIHJlY29yZGluZyBpcyBwYXVzZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdG9wcGVkIC0gSW5kaWNhdGVzIGlmIHJlY29yZGluZyBpcyBzdG9wcGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUaGUgbWVkaWEgb3B0aW9ucyBmb3IgcmVjb3JkaW5nIChlLmcuLCBcInZpZGVvXCIsIFwiYXVkaW9cIikuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgcGFydGljaXBhbnQncyBsZXZlbC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnlvdUFyZUNvSG9zdCAtIEluZGljYXRlcyBpZiB0aGUgdXNlciBpcyBhIGNvLWhvc3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pblJlc3RyaWN0U2V0dGluZyAtIEluZGljYXRlcyBpZiB0aGVyZSBhcmUgYWRtaW4gcmVzdHJpY3Rpb25zIG9uIHZpZGVvLlxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9SZXF1ZXN0U3RhdGUgLSBTdGF0ZSBvZiB0aGUgdmlkZW8gcmVxdWVzdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9SZXF1ZXN0VGltZSAtIFRpbWVzdGFtcCBvZiB0aGUgdmlkZW8gcmVxdWVzdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVtYmVyIC0gVGhlIHBhcnRpY2lwYW50J3MgbmFtZS5cbiAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBjb25uZWN0aW9uIHVzZWQgZm9yIGNvbW11bmljYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gd2hlcmUgdGhlIHZpZGVvIGlzIGJlaW5nIHRvZ2dsZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSAtIFRoZSBkZWZhdWx0IHZpZGVvIGlucHV0IGRldmljZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuY3VycmVudEZhY2luZ01vZGUgLSBUaGUgY3VycmVudCBmYWNpbmcgbW9kZSBvZiB0aGUgY2FtZXJhLlxuICogQHBhcmFtIHtWaWRDb25zfSBvcHRpb25zLnBhcmFtZXRlcnMudmlkQ29ucyAtIFZpZGVvIGNvbnN0cmFpbnRzIGZvciB0aGUgc3RyZWFtLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5mcmFtZVJhdGUgLSBEZXNpcmVkIGZyYW1lIHJhdGUgZm9yIHRoZSB2aWRlby5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvQWN0aW9uIC0gSW5kaWNhdGVzIGlmIGEgdmlkZW8gYWN0aW9uIGlzIGN1cnJlbnRseSB0YWtpbmcgcGxhY2UuXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtIHwgbnVsbH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtIC0gVGhlIGxvY2FsIG1lZGlhIHN0cmVhbS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9TZXR0aW5nIC0gVGhlIGN1cnJlbnQgYXVkaW8gc2V0dGluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9TZXR0aW5nIC0gVGhlIGN1cnJlbnQgdmlkZW8gc2V0dGluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuc2hhcmVTZXR0aW5nIC0gVGhlIGN1cnJlbnQgc2NyZWVuc2hhcmUgc2V0dGluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuY2hhdFNldHRpbmcgLSBUaGUgY3VycmVudCBjaGF0IHNldHRpbmcuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMgLSBJbnRlcnZhbCB0aW1lIGZvciB1cGRhdGluZyByZXF1ZXN0IHN0YXRlLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2aWRlbyBhY3Rpb24gaGFzIGJlZW4gaGFuZGxlZC5cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgdGhlIGN1cnJlbnQgc3RhdHVzIG9mIHRoZSB2aWRlbyBhbmQgaGFuZGxlcyB0aGUgbG9naWMgZm9yIHN0YXJ0aW5nIG9yIHN0b3BwaW5nIHRoZSB2aWRlbyBzdHJlYW0uXG4gKiBJdCB2YWxpZGF0ZXMgcGVybWlzc2lvbnMgYW5kIHJvb20gc2V0dGluZ3MgYmVmb3JlIGFsbG93aW5nIHRoZSB2aWRlbyB0byBiZSBhY3RpdmF0ZWQgb3IgZGVhY3RpdmF0ZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IENsaWNrVmlkZW9PcHRpb25zID0ge1xuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb246IHRydWUsXG4gKiAgICAgaGFzQ2FtZXJhUGVybWlzc2lvbjogZmFsc2UsXG4gKiAgICAgdmlkZW9BbHJlYWR5T246IGZhbHNlLFxuICogICAgIGF1ZGlvT25seVJvb206IGZhbHNlLFxuICogICAgIHJlY29yZFN0YXJ0ZWQ6IGZhbHNlLFxuICogICAgIHJlY29yZFJlc3VtZWQ6IGZhbHNlLFxuICogICAgIHJlY29yZFBhdXNlZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkU3RvcHBlZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiAndmlkZW8nLFxuICogICAgIGlzbGV2ZWw6ICcxJyxcbiAqICAgICB5b3VBcmVDb0hvc3Q6IGZhbHNlLFxuICogICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nOiBmYWxzZSxcbiAqICAgICB2aWRlb1JlcXVlc3RTdGF0ZTogbnVsbCxcbiAqICAgICB2aWRlb1JlcXVlc3RUaW1lOiAwLFxuICogICAgIG1lbWJlcjogJ0pvaG4gRG9lJyxcbiAqICAgICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICogICAgIHJvb21OYW1lOiAnbXlSb29tJyxcbiAqICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6ICcnLFxuICogICAgIGN1cnJlbnRGYWNpbmdNb2RlOiAndXNlcicsXG4gKiAgICAgdmlkQ29uczogeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA3MjAgfSxcbiAqICAgICBmcmFtZVJhdGU6IDMwLFxuICogICAgIHZpZGVvQWN0aW9uOiBmYWxzZSxcbiAqICAgICBsb2NhbFN0cmVhbTogbnVsbCxcbiAqICAgICBhdWRpb1NldHRpbmc6ICdvbicsXG4gKiAgICAgdmlkZW9TZXR0aW5nOiAnb24nLFxuICogICAgIHNjcmVlbnNoYXJlU2V0dGluZzogJ29mZicsXG4gKiAgICAgY2hhdFNldHRpbmc6ICdhbGxvdycsXG4gKiAgICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kczogMzAsXG4gKiAgICAgc2hvd0FsZXJ0OiAoYWxlcnQpID0+IGNvbnNvbGUubG9nKGFsZXJ0Lm1lc3NhZ2UpLFxuICogICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uOiAoc3RhdHVzKSA9PiBjb25zb2xlLmxvZyhgVmlkZW8gYWxyZWFkeSBvbjogJHtzdGF0dXN9YCksXG4gKiAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGU6IChzdGF0ZSkgPT4gY29uc29sZS5sb2coYFZpZGVvIHJlcXVlc3Qgc3RhdGU6ICR7c3RhdGV9YCksXG4gKiAgICAgdXBkYXRlTG9jYWxTdHJlYW06IChzdHJlYW0pID0+IGNvbnNvbGUubG9nKCdMb2NhbCBzdHJlYW0gdXBkYXRlZCcpLFxuICogICAgIHN0cmVhbVN1Y2Nlc3NWaWRlbzogc3RyZWFtU3VjY2Vzc0Z1bmN0aW9uLFxuICogICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86IGRpc2Nvbm5lY3RGdW5jdGlvbixcbiAqICAgICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYTogcmVxdWVzdFBlcm1pc3Npb25GdW5jdGlvbixcbiAqICAgICBjaGVja1Blcm1pc3Npb246IGNoZWNrUGVybWlzc2lvbkZ1bmN0aW9uLFxuICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHBhcmFtZXRlcnMsXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGNvbnN0IGNsaWNrVmlkZW9TZXJ2aWNlID0gbmV3IENsaWNrVmlkZW8oKTtcbiAqIGF3YWl0IGNsaWNrVmlkZW9TZXJ2aWNlLmNsaWNrVmlkZW8ob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tWaWRlbyB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBjbGljayBldmVudCB0byB0b2dnbGUgdGhlIHBhcnRpY2lwYW50J3MgdmlkZW8gb24vb2ZmIGFuZCBtYW5hZ2VzIHZpZGVvIHBlcm1pc3Npb24gcmVxdWVzdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q2xpY2tWaWRlb1BhcmFtc30gb3B0aW9ucyAtIFRoZSBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG5cbiAgY2xpY2tWaWRlbyA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogQ2xpY2tWaWRlb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQge1xuICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb24sXG4gICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uLFxuICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICBhdWRpb09ubHlSb29tLFxuICAgICAgcmVjb3JkU3RhcnRlZCxcbiAgICAgIHJlY29yZFJlc3VtZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRTdG9wcGVkLFxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIHlvdUFyZUNvSG9zdCxcbiAgICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nLFxuICAgICAgdmlkZW9SZXF1ZXN0U3RhdGUsXG4gICAgICB2aWRlb1JlcXVlc3RUaW1lLFxuICAgICAgbWVtYmVyLFxuICAgICAgc29ja2V0LFxuICAgICAgcm9vbU5hbWUsXG4gICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UsXG4gICAgICBjdXJyZW50RmFjaW5nTW9kZSxcbiAgICAgIHZpZENvbnMsXG4gICAgICBmcmFtZVJhdGUsXG4gICAgICB2aWRlb0FjdGlvbixcbiAgICAgIGxvY2FsU3RyZWFtLFxuICAgICAgYXVkaW9TZXR0aW5nLFxuICAgICAgdmlkZW9TZXR0aW5nLFxuICAgICAgc2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgICAgY2hhdFNldHRpbmcsXG4gICAgICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzLFxuICAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvLFxuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T24sXG4gICAgICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhLFxuICAgICAgY2hlY2tQZXJtaXNzaW9uLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgaWYgKGF1ZGlvT25seVJvb20pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYSBpbiBhbiBhdWRpbyBvbmx5IGV2ZW50LicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICBpZiAoaXNsZXZlbCA9PT0gJzInICYmIChyZWNvcmRTdGFydGVkIHx8IHJlY29yZFJlc3VtZWQpKSB7XG4gICAgICAgIGlmICghKHJlY29yZFBhdXNlZCB8fCByZWNvcmRTdG9wcGVkKSAmJiByZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAnWW91IGNhbm5vdCB0dXJuIG9mZiB5b3VyIGNhbWVyYSB3aGlsZSByZWNvcmRpbmcgdmlkZW8sIHBsZWFzZSBwYXVzZSBvciBzdG9wIHJlY29yZGluZyBmaXJzdC4nLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2aWRlb0FscmVhZHlPbiA9IGZhbHNlO1xuICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T24odmlkZW9BbHJlYWR5T24pO1xuICAgICAgaWYgKGxvY2FsU3RyZWFtKSB7XG4gICAgICAgIGxvY2FsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW0obG9jYWxTdHJlYW0pO1xuICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZG1pblJlc3RyaWN0U2V0dGluZykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYS4gQWNjZXNzIGRlbmllZCBieSBob3N0LicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlc3BvbnNlID0gMjtcblxuICAgICAgaWYgKCF2aWRlb0FjdGlvbiAmJiBpc2xldmVsICE9PSAnMicgJiYgIXlvdUFyZUNvSG9zdCkge1xuICAgICAgICByZXNwb25zZSA9IGF3YWl0IGNoZWNrUGVybWlzc2lvbih7XG4gICAgICAgICAgcGVybWlzc2lvblR5cGU6ICd2aWRlb1NldHRpbmcnLFxuICAgICAgICAgIGF1ZGlvU2V0dGluZyxcbiAgICAgICAgICB2aWRlb1NldHRpbmcsXG4gICAgICAgICAgc2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgICAgICAgIGNoYXRTZXR0aW5nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3BvbnNlID09PSAxKSB7XG4gICAgICAgIGlmICh2aWRlb1JlcXVlc3RTdGF0ZSA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ0EgcmVxdWVzdCBpcyBwZW5kaW5nLiBQbGVhc2Ugd2FpdCBmb3IgdGhlIGhvc3QgdG8gcmVzcG9uZC4nLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICB2aWRlb1JlcXVlc3RTdGF0ZSA9PT0gJ3JlamVjdGVkJyAmJlxuICAgICAgICAgIERhdGUubm93KCkgLSB2aWRlb1JlcXVlc3RUaW1lIDwgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kc1xuICAgICAgICApIHtcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiBgQSByZXF1ZXN0IHdhcyByZWplY3RlZC4gUGxlYXNlIHdhaXQgZm9yICR7dXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kc30gc2Vjb25kcyBiZWZvcmUgc2VuZGluZyBhbm90aGVyIHJlcXVlc3QuYCxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1JlcXVlc3Qgc2VudCB0byBob3N0LicsXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcblxuICAgICAgICB2aWRlb1JlcXVlc3RTdGF0ZSA9ICdwZW5kaW5nJztcbiAgICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUodmlkZW9SZXF1ZXN0U3RhdGUpO1xuXG4gICAgICAgIGxldCB1c2VyUmVxdWVzdCA9IHsgaWQ6IHNvY2tldC5pZCwgbmFtZTogbWVtYmVyLCBpY29uOiAnZmEtdmlkZW8nIH07XG4gICAgICAgIHNvY2tldC5lbWl0KCdwYXJ0aWNpcGFudFJlcXVlc3QnLCB7IHVzZXJSZXF1ZXN0LCByb29tTmFtZSB9KTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UgPT09IDIpIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgY2Fubm90IHR1cm4gb24geW91ciBjYW1lcmEuIEFjY2VzcyBkZW5pZWQgYnkgaG9zdC4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzQ2FtZXJhUGVybWlzc2lvbikge1xuICAgICAgICAgIGlmIChjaGVja01lZGlhUGVybWlzc2lvbikge1xuICAgICAgICAgICAgbGV0IHN0YXR1c0NhbWVyYSA9IGF3YWl0IHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhKCk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzQ2FtZXJhICE9PSAnZ3JhbnRlZCcpIHtcbiAgICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAnQWxsb3cgYWNjZXNzIHRvIHlvdXIgY2FtZXJhIG9yIGNoZWNrIGlmIHlvdXIgY2FtZXJhIGlzIG5vdCBiZWluZyB1c2VkIGJ5IGFub3RoZXIgYXBwbGljYXRpb24uJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZWRpYUNvbnN0cmFpbnRzID0ge307XG4gICAgICAgIGxldCBhbHRNZWRpYUNvbnN0cmFpbnRzID0ge307XG4gICAgICAgIGlmICh1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UpIHtcbiAgICAgICAgICBpZiAodmlkQ29ucyAmJiB2aWRDb25zLndpZHRoICYmIHZpZENvbnMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICB2aWRlbzoge1xuICAgICAgICAgICAgICAgIGRldmljZUlkOiB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UsXG4gICAgICAgICAgICAgICAgZmFjaW5nTW9kZTogY3VycmVudEZhY2luZ01vZGUsXG4gICAgICAgICAgICAgICAgLi4udmlkQ29ucyxcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYWx0TWVkaWFDb25zdHJhaW50cyA9IHtcbiAgICAgICAgICAgICAgdmlkZW86IHsgLi4udmlkQ29ucywgZnJhbWVSYXRlOiB7IGlkZWFsOiBmcmFtZVJhdGUgfSB9LFxuICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICB2aWRlbzogeyAuLi52aWRDb25zLCBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9IH0sXG4gICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbHRNZWRpYUNvbnN0cmFpbnRzID0geyB2aWRlbzogeyBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9IH0sIGF1ZGlvOiBmYWxzZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlkQ29ucyAmJiB2aWRDb25zLndpZHRoICYmIHZpZENvbnMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICB2aWRlbzogeyAuLi52aWRDb25zLCBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9IH0sXG4gICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbHRNZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICB2aWRlbzogeyAuLi52aWRDb25zLCBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9IH0sXG4gICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMgPSB7IHZpZGVvOiB7IGZyYW1lUmF0ZTogeyBpZGVhbDogZnJhbWVSYXRlIH0gfSwgYXVkaW86IGZhbHNlIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgIC5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cylcbiAgICAgICAgICAudGhlbihhc3luYyAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgc3RyZWFtU3VjY2Vzc1ZpZGVvKHsgc3RyZWFtLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgICAgICAgLmdldFVzZXJNZWRpYShhbHRNZWRpYUNvbnN0cmFpbnRzKVxuICAgICAgICAgICAgICAudGhlbihhc3luYyAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHN0cmVhbVN1Y2Nlc3NWaWRlbyh7IHN0cmVhbSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICAgICAnQWxsb3cgYWNjZXNzIHRvIHlvdXIgY2FtZXJhIG9yIGNoZWNrIGlmIHlvdXIgY2FtZXJhIGlzIG5vdCBiZWluZyB1c2VkIGJ5IGFub3RoZXIgYXBwbGljYXRpb24uJyxcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==