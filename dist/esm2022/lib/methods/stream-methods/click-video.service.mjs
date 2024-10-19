// click-video.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stdmlkZW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLXZpZGVvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBcUUzQyxNQUFNLE9BQU8sVUFBVTtJQUNyQjs7Ozs7T0FLRztJQUVILFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQXFCLEVBQWlCLEVBQUU7UUFDdEUsSUFBSSxFQUNGLG9CQUFvQixFQUNwQixtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLFlBQVksRUFDWixhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLE9BQU8sRUFDUCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsMkJBQTJCLEVBQzNCLGlCQUFpQixFQUNqQixPQUFPLEVBQ1AsU0FBUyxFQUNULFdBQVcsRUFDWCxXQUFXLEVBQ1gsWUFBWSxFQUNaLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLDRCQUE0QixFQUM1QixrQkFBa0IsRUFDbEIsU0FBUyxFQUNULG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLDRCQUE0QixFQUM1Qix1QkFBdUIsRUFDdkIsZUFBZSxHQUNoQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksYUFBYSxFQUFFLENBQUM7WUFDbEIsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLHdEQUF3RDtnQkFDakUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFD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QWtCLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDaEIsTUFBTSxTQUFTLENBQUMsWUFBWTt5QkFDekIsWUFBWSxDQUFDLG1CQUFtQixDQUFDO3lCQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQW1CLEVBQUUsRUFBRTt3QkFDbEMsTUFBTSxrQkFBa0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUNuRCxDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDVixTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQ0wsK0ZBQStGOzRCQUNqRyxJQUFJLEVBQUUsUUFBUTs0QkFDZCxRQUFRLEVBQUUsSUFBSTt5QkFDZixDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0EvTlMsVUFBVTsyR0FBVixVQUFVLGNBRlQsTUFBTTs7MkZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjbGljay12aWRlby5zZXJ2aWNlLnRzXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDaGVja1Blcm1pc3Npb25UeXBlLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1R5cGUsXG4gIFJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhVHlwZSxcbiAgU2hvd0FsZXJ0LFxuICBTdHJlYW1TdWNjZXNzVmlkZW9QYXJhbWV0ZXJzLFxuICBTdHJlYW1TdWNjZXNzVmlkZW9UeXBlLFxuICBWaWRDb25zLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpY2tWaWRlb1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyxcbiAgICBTdHJlYW1TdWNjZXNzVmlkZW9QYXJhbWV0ZXJzIHtcbiAgY2hlY2tNZWRpYVBlcm1pc3Npb246IGJvb2xlYW47XG4gIGhhc0NhbWVyYVBlcm1pc3Npb246IGJvb2xlYW47XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICBhdWRpb09ubHlSb29tOiBib29sZWFuO1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRSZXN1bWVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIHJlY29yZFN0b3BwZWQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHlvdUFyZUNvSG9zdDogYm9vbGVhbjtcbiAgYWRtaW5SZXN0cmljdFNldHRpbmc6IGJvb2xlYW47XG4gIHZpZGVvUmVxdWVzdFN0YXRlOiBzdHJpbmcgfCBudWxsO1xuICB2aWRlb1JlcXVlc3RUaW1lOiBudW1iZXI7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIGN1cnJlbnRGYWNpbmdNb2RlOiBzdHJpbmc7XG4gIHZpZENvbnM6IFZpZENvbnM7XG4gIGZyYW1lUmF0ZTogbnVtYmVyO1xuICB2aWRlb0FjdGlvbjogYm9vbGVhbjtcbiAgbG9jYWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgYXVkaW9TZXR0aW5nOiBzdHJpbmc7XG4gIHZpZGVvU2V0dGluZzogc3RyaW5nO1xuICBzY3JlZW5zaGFyZVNldHRpbmc6IHN0cmluZztcbiAgY2hhdFNldHRpbmc6IHN0cmluZztcbiAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kczogbnVtYmVyO1xuXG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgdXBkYXRlVmlkZW9BbHJlYWR5T246ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGU6IChzdGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVMb2NhbFN0cmVhbTogKHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuXG4gIHN0cmVhbVN1Y2Nlc3NWaWRlbzogU3RyZWFtU3VjY2Vzc1ZpZGVvVHlwZTtcbiAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1R5cGU7XG4gIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhOiBSZXF1ZXN0UGVybWlzc2lvbkNhbWVyYVR5cGU7XG4gIGNoZWNrUGVybWlzc2lvbjogQ2hlY2tQZXJtaXNzaW9uVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDbGlja1ZpZGVvUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENsaWNrVmlkZW9PcHRpb25zIHtcbiAgcGFyYW1ldGVyczogQ2xpY2tWaWRlb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENsaWNrVmlkZW9UeXBlID0gKG9wdGlvbnM6IENsaWNrVmlkZW9PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tWaWRlbyB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBjbGljayBldmVudCB0byB0b2dnbGUgdGhlIHBhcnRpY2lwYW50J3MgdmlkZW8gb24vb2ZmIGFuZCBtYW5hZ2VzIHZpZGVvIHBlcm1pc3Npb24gcmVxdWVzdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q2xpY2tWaWRlb1BhcmFtc30gb3B0aW9ucyAtIFRoZSBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG5cbiAgY2xpY2tWaWRlbyA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogQ2xpY2tWaWRlb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQge1xuICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb24sXG4gICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uLFxuICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICBhdWRpb09ubHlSb29tLFxuICAgICAgcmVjb3JkU3RhcnRlZCxcbiAgICAgIHJlY29yZFJlc3VtZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRTdG9wcGVkLFxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIHlvdUFyZUNvSG9zdCxcbiAgICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nLFxuICAgICAgdmlkZW9SZXF1ZXN0U3RhdGUsXG4gICAgICB2aWRlb1JlcXVlc3RUaW1lLFxuICAgICAgbWVtYmVyLFxuICAgICAgc29ja2V0LFxuICAgICAgcm9vbU5hbWUsXG4gICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UsXG4gICAgICBjdXJyZW50RmFjaW5nTW9kZSxcbiAgICAgIHZpZENvbnMsXG4gICAgICBmcmFtZVJhdGUsXG4gICAgICB2aWRlb0FjdGlvbixcbiAgICAgIGxvY2FsU3RyZWFtLFxuICAgICAgYXVkaW9TZXR0aW5nLFxuICAgICAgdmlkZW9TZXR0aW5nLFxuICAgICAgc2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgICAgY2hhdFNldHRpbmcsXG4gICAgICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzLFxuICAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvLFxuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T24sXG4gICAgICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhLFxuICAgICAgY2hlY2tQZXJtaXNzaW9uLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgaWYgKGF1ZGlvT25seVJvb20pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYSBpbiBhbiBhdWRpbyBvbmx5IGV2ZW50LicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICBpZiAoaXNsZXZlbCA9PT0gJzInICYmIChyZWNvcmRTdGFydGVkIHx8IHJlY29yZFJlc3VtZWQpKSB7XG4gICAgICAgIGlmICghKHJlY29yZFBhdXNlZCB8fCByZWNvcmRTdG9wcGVkKSAmJiByZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAnWW91IGNhbm5vdCB0dXJuIG9mZiB5b3VyIGNhbWVyYSB3aGlsZSByZWNvcmRpbmcgdmlkZW8sIHBsZWFzZSBwYXVzZSBvciBzdG9wIHJlY29yZGluZyBmaXJzdC4nLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2aWRlb0FscmVhZHlPbiA9IGZhbHNlO1xuICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T24odmlkZW9BbHJlYWR5T24pO1xuICAgICAgaWYgKGxvY2FsU3RyZWFtKSB7XG4gICAgICAgIGxvY2FsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW0obG9jYWxTdHJlYW0pO1xuICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZG1pblJlc3RyaWN0U2V0dGluZykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYS4gQWNjZXNzIGRlbmllZCBieSBob3N0LicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlc3BvbnNlID0gMjtcblxuICAgICAgaWYgKCF2aWRlb0FjdGlvbiAmJiBpc2xldmVsICE9PSAnMicgJiYgIXlvdUFyZUNvSG9zdCkge1xuICAgICAgICByZXNwb25zZSA9IGF3YWl0IGNoZWNrUGVybWlzc2lvbih7XG4gICAgICAgICAgcGVybWlzc2lvblR5cGU6ICd2aWRlb1NldHRpbmcnLFxuICAgICAgICAgIGF1ZGlvU2V0dGluZyxcbiAgICAgICAgICB2aWRlb1NldHRpbmcsXG4gICAgICAgICAgc2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgICAgICAgIGNoYXRTZXR0aW5nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3BvbnNlID09PSAxKSB7XG4gICAgICAgIGlmICh2aWRlb1JlcXVlc3RTdGF0ZSA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ0EgcmVxdWVzdCBpcyBwZW5kaW5nLiBQbGVhc2Ugd2FpdCBmb3IgdGhlIGhvc3QgdG8gcmVzcG9uZC4nLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICB2aWRlb1JlcXVlc3RTdGF0ZSA9PT0gJ3JlamVjdGVkJyAmJlxuICAgICAgICAgIERhdGUubm93KCkgLSB2aWRlb1JlcXVlc3RUaW1lIDwgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kc1xuICAgICAgICApIHtcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiBgQSByZXF1ZXN0IHdhcyByZWplY3RlZC4gUGxlYXNlIHdhaXQgZm9yICR7dXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kc30gc2Vjb25kcyBiZWZvcmUgc2VuZGluZyBhbm90aGVyIHJlcXVlc3QuYCxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1JlcXVlc3Qgc2VudCB0byBob3N0LicsXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcblxuICAgICAgICB2aWRlb1JlcXVlc3RTdGF0ZSA9ICdwZW5kaW5nJztcbiAgICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUodmlkZW9SZXF1ZXN0U3RhdGUpO1xuXG4gICAgICAgIGxldCB1c2VyUmVxdWVzdCA9IHsgaWQ6IHNvY2tldC5pZCwgbmFtZTogbWVtYmVyLCBpY29uOiAnZmEtdmlkZW8nIH07XG4gICAgICAgIHNvY2tldC5lbWl0KCdwYXJ0aWNpcGFudFJlcXVlc3QnLCB7IHVzZXJSZXF1ZXN0LCByb29tTmFtZSB9KTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UgPT09IDIpIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgY2Fubm90IHR1cm4gb24geW91ciBjYW1lcmEuIEFjY2VzcyBkZW5pZWQgYnkgaG9zdC4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzQ2FtZXJhUGVybWlzc2lvbikge1xuICAgICAgICAgIGlmIChjaGVja01lZGlhUGVybWlzc2lvbikge1xuICAgICAgICAgICAgbGV0IHN0YXR1c0NhbWVyYSA9IGF3YWl0IHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhKCk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzQ2FtZXJhICE9PSAnZ3JhbnRlZCcpIHtcbiAgICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAnQWxsb3cgYWNjZXNzIHRvIHlvdXIgY2FtZXJhIG9yIGNoZWNrIGlmIHlvdXIgY2FtZXJhIGlzIG5vdCBiZWluZyB1c2VkIGJ5IGFub3RoZXIgYXBwbGljYXRpb24uJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZWRpYUNvbnN0cmFpbnRzID0ge307XG4gICAgICAgIGxldCBhbHRNZWRpYUNvbnN0cmFpbnRzID0ge307XG4gICAgICAgIGlmICh1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UpIHtcbiAgICAgICAgICBpZiAodmlkQ29ucyAmJiB2aWRDb25zLndpZHRoICYmIHZpZENvbnMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICB2aWRlbzoge1xuICAgICAgICAgICAgICAgIGRldmljZUlkOiB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UsXG4gICAgICAgICAgICAgICAgZmFjaW5nTW9kZTogY3VycmVudEZhY2luZ01vZGUsXG4gICAgICAgICAgICAgICAgLi4udmlkQ29ucyxcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYWx0TWVkaWFDb25zdHJhaW50cyA9IHtcbiAgICAgICAgICAgICAgdmlkZW86IHsgLi4udmlkQ29ucywgZnJhbWVSYXRlOiB7IGlkZWFsOiBmcmFtZVJhdGUgfSB9LFxuICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICB2aWRlbzogeyAuLi52aWRDb25zLCBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9IH0sXG4gICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbHRNZWRpYUNvbnN0cmFpbnRzID0geyB2aWRlbzogeyBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9IH0sIGF1ZGlvOiBmYWxzZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlkQ29ucyAmJiB2aWRDb25zLndpZHRoICYmIHZpZENvbnMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICB2aWRlbzogeyAuLi52aWRDb25zLCBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9IH0sXG4gICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbHRNZWRpYUNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgICAgICB2aWRlbzogeyAuLi52aWRDb25zLCBmcmFtZVJhdGU6IHsgaWRlYWw6IGZyYW1lUmF0ZSB9IH0sXG4gICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMgPSB7IHZpZGVvOiB7IGZyYW1lUmF0ZTogeyBpZGVhbDogZnJhbWVSYXRlIH0gfSwgYXVkaW86IGZhbHNlIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgIC5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cylcbiAgICAgICAgICAudGhlbihhc3luYyAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgc3RyZWFtU3VjY2Vzc1ZpZGVvKHsgc3RyZWFtLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgICAgICAgLmdldFVzZXJNZWRpYShhbHRNZWRpYUNvbnN0cmFpbnRzKVxuICAgICAgICAgICAgICAudGhlbihhc3luYyAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHN0cmVhbVN1Y2Nlc3NWaWRlbyh7IHN0cmVhbSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICAgICAnQWxsb3cgYWNjZXNzIHRvIHlvdXIgY2FtZXJhIG9yIGNoZWNrIGlmIHlvdXIgY2FtZXJhIGlzIG5vdCBiZWluZyB1c2VkIGJ5IGFub3RoZXIgYXBwbGljYXRpb24uJyxcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==