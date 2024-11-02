import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the click event for toggling audio in a media session.
 *
 * @param {ClickAudioOptions} options - The parameters required for handling the audio click event.
 * @param {Object} options.parameters - The parameters for toggling audio.
 * @param {boolean} options.parameters.checkMediaPermission - Flag indicating whether to check media permission.
 * @param {boolean} options.parameters.hasAudioPermission - Flag indicating if the user has audio permission.
 * @param {boolean} options.parameters.audioPaused - Flag indicating if audio is paused.
 * @param {boolean} options.parameters.audioAlreadyOn - Flag indicating if audio is already turned on.
 * @param {boolean} options.parameters.audioOnlyRoom - Flag indicating if the room is audio-only.
 * @param {boolean} options.parameters.recordStarted - Flag indicating if recording has started.
 * @param {boolean} options.parameters.recordResumed - Flag indicating if recording has resumed.
 * @param {boolean} options.parameters.recordPaused - Flag indicating if recording is paused.
 * @param {boolean} options.parameters.recordStopped - Flag indicating if recording is stopped.
 * @param {string} options.parameters.recordingMediaOptions - Media options for recording (e.g., "video", "audio").
 * @param {string} options.parameters.islevel - User's level in the application.
 * @param {boolean} options.parameters.youAreCoHost - Flag indicating if the user is a co-host.
 * @param {boolean} options.parameters.adminRestrictSetting - Flag indicating if admin restrictions are set.
 * @param {string | null} options.parameters.audioRequestState - Current state of the audio request.
 * @param {number} options.parameters.audioRequestTime - Timestamp of the audio request.
 * @param {string} options.parameters.member - Current member's name.
 * @param {Socket} options.parameters.socket - The socket instance for communication.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {string} options.parameters.userDefaultAudioInputDevice - The default audio input device for the user.
 * @param {boolean} options.parameters.micAction - Flag indicating if the microphone action is in progress.
 * @param {MediaStream | null} options.parameters.localStream - The user's local media stream.
 * @param {string} options.parameters.audioSetting - Current audio setting.
 * @param {string} options.parameters.videoSetting - Current video setting.
 * @param {string} options.parameters.screenshareSetting - Current screenshare setting.
 * @param {string} options.parameters.chatSetting - Current chat setting.
 * @param {number} options.parameters.updateRequestIntervalSeconds - Interval for updating request states.
 * @param {Participant[]} options.parameters.participants - List of participants in the room.
 * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport has been created.
 * @param {boolean} options.parameters.transportCreatedAudio - Flag indicating if audio transport has been created.
 *
 * @returns {Promise<void>} A promise that resolves when the audio click event has been handled.
 *
 * @remarks
 * This function performs the following actions:
 * - If the event is audio-only, it shows an alert and exits.
 * - If the audio is already on, it handles the logic for turning it off, including checking recording states and permissions.
 * - If the audio is off, it checks for admin restrictions, user permissions, and handles the logic for turning the audio on.
 * - It updates various states and emits socket events as necessary.
 *
 * @example
 * ```typescript
 * const options: ClickAudioOptions = {
 *   parameters: {
 *     checkMediaPermission: true,
 *     hasAudioPermission: false,
 *     audioPaused: false,
 *     audioAlreadyOn: false,
 *     audioOnlyRoom: false,
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordPaused: false,
 *     recordStopped: false,
 *     recordingMediaOptions: 'audio',
 *     islevel: '1',
 *     youAreCoHost: false,
 *     adminRestrictSetting: false,
 *     audioRequestState: null,
 *     audioRequestTime: 0,
 *     member: 'John Doe',
 *     socket: socketInstance,
 *     roomName: 'exampleRoom',
 *     userDefaultAudioInputDevice: 'default',
 *     micAction: false,
 *     localStream: null,
 *     audioSetting: 'enabled',
 *     videoSetting: 'disabled',
 *     screenshareSetting: 'disabled',
 *     chatSetting: 'enabled',
 *     updateRequestIntervalSeconds: 30,
 *     participants: [],
 *     transportCreated: false,
 *     transportCreatedAudio: false,
 *     updateAudioAlreadyOn: (status) => console.log(status),
 *     updateAudioRequestState: (state) => console.log(state),
 *     updateAudioPaused: (status) => console.log(status),
 *     updateLocalStream: (stream) => console.log(stream),
 *     updateParticipants: (participants) => console.log(participants),
 *     updateTransportCreated: (status) => console.log(status),
 *     updateTransportCreatedAudio: (status) => console.log(status),
 *     updateMicAction: (action) => console.log(action),
 *     checkPermission: async () => 'granted',
 *     streamSuccessAudio: async () => console.log('Audio streaming success'),
 *     disconnectSendTransportAudio: async () => console.log('Audio transport disconnected'),
 *     requestPermissionAudio: async () => 'granted',
 *     resumeSendTransportAudio: async () => console.log('Audio transport resumed'),
 *   },
 * };
 *
 * const clickAudioService = new ClickAudio();
 * await clickAudioService.clickAudio(options);
 * ```
 */
export class ClickAudio {
    /**
     * Handles the click event for toggling audio in a media session.
     *
     * @param {ClickAudioOptions} parameters - The parameters required for handling the audio click event.
     * @returns {Promise<void>} A promise that resolves when the audio click event has been handled.
     *
     * The function performs the following actions:
     * - If the event is audio-only, it shows an alert and exits.
     * - If the audio is already on, it handles the logic for turning it off, including checking recording states and permissions.
     * - If the audio is off, it checks for admin restrictions, user permissions, and handles the logic for turning the audio on.
     * - It updates various states and emits socket events as necessary.
     *
     * The function makes use of several helper functions and state update functions passed in through the parameters.
     */
    async clickAudio({ parameters }) {
        let { checkMediaPermission, hasAudioPermission, audioPaused, audioAlreadyOn, audioOnlyRoom, recordStarted, recordResumed, recordPaused, recordStopped, recordingMediaOptions, islevel, youAreCoHost, adminRestrictSetting, audioRequestState, audioRequestTime, member, socket, roomName, userDefaultAudioInputDevice, micAction, localStream, audioSetting, videoSetting, screenshareSetting, chatSetting, updateRequestIntervalSeconds, participants, showAlert, transportCreated, transportCreatedAudio, updateAudioAlreadyOn, updateAudioRequestState, updateAudioPaused, updateLocalStream, updateParticipants, updateTransportCreated, updateTransportCreatedAudio, updateMicAction, checkPermission, streamSuccessAudio, requestPermissionAudio, resumeSendTransportAudio, disconnectSendTransportAudio, } = parameters;
        if (audioOnlyRoom) {
            showAlert?.({
                message: 'You cannot turn on your camera in an audio-only event.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        if (audioAlreadyOn) {
            if (islevel === '2' && (recordStarted || recordResumed)) {
                if (!(recordPaused || recordStopped)) {
                    if (recordingMediaOptions === 'audio') {
                        showAlert?.({
                            message: 'You cannot turn off your audio while recording, please pause or stop recording first.',
                            type: 'danger',
                            duration: 3000,
                        });
                        return;
                    }
                }
            }
            audioAlreadyOn = false;
            updateAudioAlreadyOn(audioAlreadyOn);
            if (localStream) {
                localStream.getAudioTracks()[0].enabled = false;
            }
            updateLocalStream(localStream);
            await disconnectSendTransportAudio({ parameters }); //disconnect function here actuall calls audioProducer.pause() instead of close() as in mediasfu
            audioPaused = true;
            updateAudioPaused(audioPaused);
        }
        else {
            if (adminRestrictSetting) {
                showAlert?.({
                    message: 'You cannot turn on your microphone. Access denied by host.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
            let response = 2;
            if (!micAction && islevel !== '2' && !youAreCoHost) {
                response = await checkPermission({
                    permissionType: 'audioSetting',
                    audioSetting,
                    videoSetting,
                    screenshareSetting,
                    chatSetting,
                });
            }
            else {
                response = 0;
            }
            switch (response) {
                case 1: {
                    if (audioRequestState === 'pending') {
                        showAlert?.({
                            message: 'A request is pending. Please wait for the host to respond.',
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
                    audioRequestState = 'pending';
                    updateAudioRequestState(audioRequestState);
                    //create a request and add to the request list and send to host
                    const userRequest = {
                        id: socket.id,
                        name: member,
                        icon: 'fa-microphone',
                    };
                    socket.emit('participantRequest', { userRequest, roomName });
                    break;
                }
                case 2:
                    if (audioRequestState === 'rejected' &&
                        Date.now() - audioRequestTime < updateRequestIntervalSeconds * 1000) {
                        showAlert?.({
                            message: `A request was rejected. Please wait for ${updateRequestIntervalSeconds} seconds before sending another request.`,
                            type: 'danger',
                            duration: 3000,
                        });
                        return;
                    }
                    break;
                case 0:
                    //allow
                    if (audioPaused) {
                        if (localStream) {
                            localStream.getAudioTracks()[0].enabled = true;
                        }
                        updateAudioAlreadyOn(true);
                        await resumeSendTransportAudio({ parameters });
                        socket.emit('resumeProducerAudio', { mediaTag: 'audio', roomName });
                        updateLocalStream(localStream);
                        updateAudioAlreadyOn(audioAlreadyOn);
                        if (micAction == true) {
                            micAction = false;
                            updateMicAction(micAction);
                        }
                        participants.forEach((participant) => {
                            if (participant['socketId'] === socket.id && participant.name === member) {
                                participant.muted = false;
                            }
                        });
                        updateParticipants(participants);
                        transportCreated = true;
                        updateTransportCreated(transportCreated);
                        transportCreatedAudio = true;
                        updateTransportCreatedAudio(transportCreatedAudio);
                    }
                    else {
                        if (!hasAudioPermission && checkMediaPermission) {
                            const statusMic = await requestPermissionAudio();
                            if (statusMic !== 'granted') {
                                showAlert?.({
                                    message: 'Allow access to your microphone or check if your microphone is not being used by another application.',
                                    type: 'danger',
                                    duration: 3000,
                                });
                                return;
                            }
                        }
                        const mediaConstraints = userDefaultAudioInputDevice
                            ? { audio: { deviceId: userDefaultAudioInputDevice }, video: false }
                            : { audio: true, video: false };
                        try {
                            const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
                            await streamSuccessAudio({ stream, parameters });
                        }
                        catch (error) {
                            console.error(error);
                            showAlert?.({
                                message: 'Allow access to your microphone or check if your microphone is not being used by another application.',
                                type: 'danger',
                                duration: 3000,
                            });
                        }
                    }
                    break;
                default:
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLWF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUE4RTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnR0c7QUFLSCxNQUFNLE9BQU8sVUFBVTtJQUNyQjs7Ozs7Ozs7Ozs7OztPQWFHO0lBRUgsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBcUI7UUFDaEQsSUFBSSxFQUNGLG9CQUFvQixFQUNwQixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLGNBQWMsRUFDZCxhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osYUFBYSxFQUNiLHFCQUFxQixFQUNyQixPQUFPLEVBQ1AsWUFBWSxFQUNaLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLDJCQUEyQixFQUMzQixTQUFTLEVBQ1QsV0FBVyxFQUNYLFlBQVksRUFDWixZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCw0QkFBNEIsRUFDNUIsWUFBWSxFQUNaLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIscUJBQXFCLEVBRXJCLG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLDJCQUEyQixFQUMzQixlQUFlLEVBRWYsZUFBZSxFQUNmLGtCQUFrQixFQUNs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TSxrQkFBa0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDO3dCQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7NEJBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDckIsU0FBUyxFQUFFLENBQUM7Z0NBQ1YsT0FBTyxFQUNMLHVHQUF1RztnQ0FDekcsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsUUFBUSxFQUFFLElBQUk7NkJBQ2YsQ0FBQyxDQUFDO3dCQUNMLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxNQUFNO2dCQUVSLFFBQVE7WUFDVixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7dUdBeE9VLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2hlY2tQZXJtaXNzaW9uVHlwZSxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlLFxuICBQYXJ0aWNpcGFudCxcbiAgUmVxdWVzdFBlcm1pc3Npb25BdWRpb1R5cGUsXG4gIFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gIFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb1R5cGUsXG4gIFNob3dBbGVydCxcbiAgU3RyZWFtU3VjY2Vzc0F1ZGlvUGFyYW1ldGVycyxcbiAgU3RyZWFtU3VjY2Vzc0F1ZGlvVHlwZSxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpY2tBdWRpb1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyxcbiAgICBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzLFxuICAgIFN0cmVhbVN1Y2Nlc3NBdWRpb1BhcmFtZXRlcnMge1xuICBjaGVja01lZGlhUGVybWlzc2lvbjogYm9vbGVhbjtcbiAgaGFzQXVkaW9QZXJtaXNzaW9uOiBib29sZWFuO1xuICBhdWRpb1BhdXNlZDogYm9vbGVhbjtcbiAgYXVkaW9BbHJlYWR5T246IGJvb2xlYW47XG4gIGF1ZGlvT25seVJvb206IGJvb2xlYW47XG4gIHJlY29yZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHJlY29yZFJlc3VtZWQ6IGJvb2xlYW47XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgeW91QXJlQ29Ib3N0OiBib29sZWFuO1xuICBhZG1pblJlc3RyaWN0U2V0dGluZzogYm9vbGVhbjtcbiAgYXVkaW9SZXF1ZXN0U3RhdGU6IHN0cmluZyB8IG51bGw7XG4gIGF1ZGlvUmVxdWVzdFRpbWU6IG51bWJlcjtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNvY2tldDogU29ja2V0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHN0cmluZztcbiAgbWljQWN0aW9uOiBib29sZWFuO1xuICBsb2NhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBhdWRpb1NldHRpbmc6IHN0cmluZztcbiAgdmlkZW9TZXR0aW5nOiBzdHJpbmc7XG4gIHNjcmVlbnNoYXJlU2V0dGluZzogc3RyaW5nO1xuICBjaGF0U2V0dGluZzogc3RyaW5nO1xuICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiBudW1iZXI7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgdHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbjtcbiAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiBib29sZWFuO1xuXG4gIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uOiAoc3RhdHVzOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogKHN0YXRlOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVBdWRpb1BhdXNlZDogKHN0YXR1czogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTG9jYWxTdHJlYW06IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlUGFydGljaXBhbnRzOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkOiAoc3RhdHVzOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW86IChzdGF0dXM6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZU1pY0FjdGlvbjogKGFjdGlvbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjaGVja1Blcm1pc3Npb246IENoZWNrUGVybWlzc2lvblR5cGU7XG4gIHN0cmVhbVN1Y2Nlc3NBdWRpbzogU3RyZWFtU3VjY2Vzc0F1ZGlvVHlwZTtcbiAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1R5cGU7XG4gIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW86IFJlcXVlc3RQZXJtaXNzaW9uQXVkaW9UeXBlO1xuICByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86IFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ2xpY2tBdWRpb1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbGlja0F1ZGlvT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IENsaWNrQXVkaW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDbGlja0F1ZGlvVHlwZSA9IChvcHRpb25zOiBDbGlja0F1ZGlvT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBIYW5kbGVzIHRoZSBjbGljayBldmVudCBmb3IgdG9nZ2xpbmcgYXVkaW8gaW4gYSBtZWRpYSBzZXNzaW9uLlxuICpcbiAqIEBwYXJhbSB7Q2xpY2tBdWRpb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgaGFuZGxpbmcgdGhlIGF1ZGlvIGNsaWNrIGV2ZW50LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0b2dnbGluZyBhdWRpby5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoZWNrTWVkaWFQZXJtaXNzaW9uIC0gRmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gY2hlY2sgbWVkaWEgcGVybWlzc2lvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmhhc0F1ZGlvUGVybWlzc2lvbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdXNlciBoYXMgYXVkaW8gcGVybWlzc2lvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUGF1c2VkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIGF1ZGlvIGlzIHBhdXNlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvQWxyZWFkeU9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIGF1ZGlvIGlzIGFscmVhZHkgdHVybmVkIG9uLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Pbmx5Um9vbSAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcm9vbSBpcyBhdWRpby1vbmx5LlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRSZXN1bWVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHJlY29yZGluZyBoYXMgcmVzdW1lZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaXMgcGF1c2VkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RvcHBlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaXMgc3RvcHBlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nTWVkaWFPcHRpb25zIC0gTWVkaWEgb3B0aW9ucyBmb3IgcmVjb3JkaW5nIChlLmcuLCBcInZpZGVvXCIsIFwiYXVkaW9cIikuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBVc2VyJ3MgbGV2ZWwgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMueW91QXJlQ29Ib3N0IC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIGlzIGEgY28taG9zdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFkbWluUmVzdHJpY3RTZXR0aW5nIC0gRmxhZyBpbmRpY2F0aW5nIGlmIGFkbWluIHJlc3RyaWN0aW9ucyBhcmUgc2V0LlxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9SZXF1ZXN0U3RhdGUgLSBDdXJyZW50IHN0YXRlIG9mIHRoZSBhdWRpbyByZXF1ZXN0LlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb1JlcXVlc3RUaW1lIC0gVGltZXN0YW1wIG9mIHRoZSBhdWRpbyByZXF1ZXN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBDdXJyZW50IG1lbWJlcidzIG5hbWUuXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIFRoZSBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZSBmb3IgdGhlIHVzZXIuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5taWNBY3Rpb24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIG1pY3JvcGhvbmUgYWN0aW9uIGlzIGluIHByb2dyZXNzLlxuICogQHBhcmFtIHtNZWRpYVN0cmVhbSB8IG51bGx9IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbSAtIFRoZSB1c2VyJ3MgbG9jYWwgbWVkaWEgc3RyZWFtLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb1NldHRpbmcgLSBDdXJyZW50IGF1ZGlvIHNldHRpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvU2V0dGluZyAtIEN1cnJlbnQgdmlkZW8gc2V0dGluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuc2hhcmVTZXR0aW5nIC0gQ3VycmVudCBzY3JlZW5zaGFyZSBzZXR0aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5jaGF0U2V0dGluZyAtIEN1cnJlbnQgY2hhdCBzZXR0aW5nLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzIC0gSW50ZXJ2YWwgZm9yIHVwZGF0aW5nIHJlcXVlc3Qgc3RhdGVzLlxuICogQHBhcmFtIHtQYXJ0aWNpcGFudFtdfSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzIC0gTGlzdCBvZiBwYXJ0aWNpcGFudHMgaW4gdGhlIHJvb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy50cmFuc3BvcnRDcmVhdGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB0cmFuc3BvcnQgaGFzIGJlZW4gY3JlYXRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWRBdWRpbyAtIEZsYWcgaW5kaWNhdGluZyBpZiBhdWRpbyB0cmFuc3BvcnQgaGFzIGJlZW4gY3JlYXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXVkaW8gY2xpY2sgZXZlbnQgaGFzIGJlZW4gaGFuZGxlZC5cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBmdW5jdGlvbiBwZXJmb3JtcyB0aGUgZm9sbG93aW5nIGFjdGlvbnM6XG4gKiAtIElmIHRoZSBldmVudCBpcyBhdWRpby1vbmx5LCBpdCBzaG93cyBhbiBhbGVydCBhbmQgZXhpdHMuXG4gKiAtIElmIHRoZSBhdWRpbyBpcyBhbHJlYWR5IG9uLCBpdCBoYW5kbGVzIHRoZSBsb2dpYyBmb3IgdHVybmluZyBpdCBvZmYsIGluY2x1ZGluZyBjaGVja2luZyByZWNvcmRpbmcgc3RhdGVzIGFuZCBwZXJtaXNzaW9ucy5cbiAqIC0gSWYgdGhlIGF1ZGlvIGlzIG9mZiwgaXQgY2hlY2tzIGZvciBhZG1pbiByZXN0cmljdGlvbnMsIHVzZXIgcGVybWlzc2lvbnMsIGFuZCBoYW5kbGVzIHRoZSBsb2dpYyBmb3IgdHVybmluZyB0aGUgYXVkaW8gb24uXG4gKiAtIEl0IHVwZGF0ZXMgdmFyaW91cyBzdGF0ZXMgYW5kIGVtaXRzIHNvY2tldCBldmVudHMgYXMgbmVjZXNzYXJ5LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBDbGlja0F1ZGlvT3B0aW9ucyA9IHtcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIGNoZWNrTWVkaWFQZXJtaXNzaW9uOiB0cnVlLFxuICogICAgIGhhc0F1ZGlvUGVybWlzc2lvbjogZmFsc2UsXG4gKiAgICAgYXVkaW9QYXVzZWQ6IGZhbHNlLFxuICogICAgIGF1ZGlvQWxyZWFkeU9uOiBmYWxzZSxcbiAqICAgICBhdWRpb09ubHlSb29tOiBmYWxzZSxcbiAqICAgICByZWNvcmRTdGFydGVkOiBmYWxzZSxcbiAqICAgICByZWNvcmRSZXN1bWVkOiBmYWxzZSxcbiAqICAgICByZWNvcmRQYXVzZWQ6IGZhbHNlLFxuICogICAgIHJlY29yZFN0b3BwZWQ6IGZhbHNlLFxuICogICAgIHJlY29yZGluZ01lZGlhT3B0aW9uczogJ2F1ZGlvJyxcbiAqICAgICBpc2xldmVsOiAnMScsXG4gKiAgICAgeW91QXJlQ29Ib3N0OiBmYWxzZSxcbiAqICAgICBhZG1pblJlc3RyaWN0U2V0dGluZzogZmFsc2UsXG4gKiAgICAgYXVkaW9SZXF1ZXN0U3RhdGU6IG51bGwsXG4gKiAgICAgYXVkaW9SZXF1ZXN0VGltZTogMCxcbiAqICAgICBtZW1iZXI6ICdKb2huIERvZScsXG4gKiAgICAgc29ja2V0OiBzb2NrZXRJbnN0YW5jZSxcbiAqICAgICByb29tTmFtZTogJ2V4YW1wbGVSb29tJyxcbiAqICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6ICdkZWZhdWx0JyxcbiAqICAgICBtaWNBY3Rpb246IGZhbHNlLFxuICogICAgIGxvY2FsU3RyZWFtOiBudWxsLFxuICogICAgIGF1ZGlvU2V0dGluZzogJ2VuYWJsZWQnLFxuICogICAgIHZpZGVvU2V0dGluZzogJ2Rpc2FibGVkJyxcbiAqICAgICBzY3JlZW5zaGFyZVNldHRpbmc6ICdkaXNhYmxlZCcsXG4gKiAgICAgY2hhdFNldHRpbmc6ICdlbmFibGVkJyxcbiAqICAgICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiAzMCxcbiAqICAgICBwYXJ0aWNpcGFudHM6IFtdLFxuICogICAgIHRyYW5zcG9ydENyZWF0ZWQ6IGZhbHNlLFxuICogICAgIHRyYW5zcG9ydENyZWF0ZWRBdWRpbzogZmFsc2UsXG4gKiAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T246IChzdGF0dXMpID0+IGNvbnNvbGUubG9nKHN0YXR1cyksXG4gKiAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGU6IChzdGF0ZSkgPT4gY29uc29sZS5sb2coc3RhdGUpLFxuICogICAgIHVwZGF0ZUF1ZGlvUGF1c2VkOiAoc3RhdHVzKSA9PiBjb25zb2xlLmxvZyhzdGF0dXMpLFxuICogICAgIHVwZGF0ZUxvY2FsU3RyZWFtOiAoc3RyZWFtKSA9PiBjb25zb2xlLmxvZyhzdHJlYW0pLFxuICogICAgIHVwZGF0ZVBhcnRpY2lwYW50czogKHBhcnRpY2lwYW50cykgPT4gY29uc29sZS5sb2cocGFydGljaXBhbnRzKSxcbiAqICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkOiAoc3RhdHVzKSA9PiBjb25zb2xlLmxvZyhzdGF0dXMpLFxuICogICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbzogKHN0YXR1cykgPT4gY29uc29sZS5sb2coc3RhdHVzKSxcbiAqICAgICB1cGRhdGVNaWNBY3Rpb246IChhY3Rpb24pID0+IGNvbnNvbGUubG9nKGFjdGlvbiksXG4gKiAgICAgY2hlY2tQZXJtaXNzaW9uOiBhc3luYyAoKSA9PiAnZ3JhbnRlZCcsXG4gKiAgICAgc3RyZWFtU3VjY2Vzc0F1ZGlvOiBhc3luYyAoKSA9PiBjb25zb2xlLmxvZygnQXVkaW8gc3RyZWFtaW5nIHN1Y2Nlc3MnKSxcbiAqICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBhc3luYyAoKSA9PiBjb25zb2xlLmxvZygnQXVkaW8gdHJhbnNwb3J0IGRpc2Nvbm5lY3RlZCcpLFxuICogICAgIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW86IGFzeW5jICgpID0+ICdncmFudGVkJyxcbiAqICAgICByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86IGFzeW5jICgpID0+IGNvbnNvbGUubG9nKCdBdWRpbyB0cmFuc3BvcnQgcmVzdW1lZCcpLFxuICogICB9LFxuICogfTtcbiAqXG4gKiBjb25zdCBjbGlja0F1ZGlvU2VydmljZSA9IG5ldyBDbGlja0F1ZGlvKCk7XG4gKiBhd2FpdCBjbGlja0F1ZGlvU2VydmljZS5jbGlja0F1ZGlvKG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrQXVkaW8ge1xuICAvKipcbiAgICogSGFuZGxlcyB0aGUgY2xpY2sgZXZlbnQgZm9yIHRvZ2dsaW5nIGF1ZGlvIGluIGEgbWVkaWEgc2Vzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIHtDbGlja0F1ZGlvT3B0aW9uc30gcGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBoYW5kbGluZyB0aGUgYXVkaW8gY2xpY2sgZXZlbnQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhdWRpbyBjbGljayBldmVudCBoYXMgYmVlbiBoYW5kbGVkLlxuICAgKlxuICAgKiBUaGUgZnVuY3Rpb24gcGVyZm9ybXMgdGhlIGZvbGxvd2luZyBhY3Rpb25zOlxuICAgKiAtIElmIHRoZSBldmVudCBpcyBhdWRpby1vbmx5LCBpdCBzaG93cyBhbiBhbGVydCBhbmQgZXhpdHMuXG4gICAqIC0gSWYgdGhlIGF1ZGlvIGlzIGFscmVhZHkgb24sIGl0IGhhbmRsZXMgdGhlIGxvZ2ljIGZvciB0dXJuaW5nIGl0IG9mZiwgaW5jbHVkaW5nIGNoZWNraW5nIHJlY29yZGluZyBzdGF0ZXMgYW5kIHBlcm1pc3Npb25zLlxuICAgKiAtIElmIHRoZSBhdWRpbyBpcyBvZmYsIGl0IGNoZWNrcyBmb3IgYWRtaW4gcmVzdHJpY3Rpb25zLCB1c2VyIHBlcm1pc3Npb25zLCBhbmQgaGFuZGxlcyB0aGUgbG9naWMgZm9yIHR1cm5pbmcgdGhlIGF1ZGlvIG9uLlxuICAgKiAtIEl0IHVwZGF0ZXMgdmFyaW91cyBzdGF0ZXMgYW5kIGVtaXRzIHNvY2tldCBldmVudHMgYXMgbmVjZXNzYXJ5LlxuICAgKlxuICAgKiBUaGUgZnVuY3Rpb24gbWFrZXMgdXNlIG9mIHNldmVyYWwgaGVscGVyIGZ1bmN0aW9ucyBhbmQgc3RhdGUgdXBkYXRlIGZ1bmN0aW9ucyBwYXNzZWQgaW4gdGhyb3VnaCB0aGUgcGFyYW1ldGVycy5cbiAgICovXG5cbiAgYXN5bmMgY2xpY2tBdWRpbyh7IHBhcmFtZXRlcnMgfTogQ2xpY2tBdWRpb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQge1xuICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb24sXG4gICAgICBoYXNBdWRpb1Blcm1pc3Npb24sXG4gICAgICBhdWRpb1BhdXNlZCxcbiAgICAgIGF1ZGlvQWxyZWFkeU9uLFxuICAgICAgYXVkaW9Pbmx5Um9vbSxcbiAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICByZWNvcmRSZXN1bWVkLFxuICAgICAgcmVjb3JkUGF1c2VkLFxuICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIGlzbGV2ZWwsXG4gICAgICB5b3VBcmVDb0hvc3QsXG4gICAgICBhZG1pblJlc3RyaWN0U2V0dGluZyxcbiAgICAgIGF1ZGlvUmVxdWVzdFN0YXRlLFxuICAgICAgYXVkaW9SZXF1ZXN0VGltZSxcbiAgICAgIG1lbWJlcixcbiAgICAgIHNvY2tldCxcbiAgICAgIHJvb21OYW1lLFxuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLFxuICAgICAgbWljQWN0aW9uLFxuICAgICAgbG9jYWxTdHJlYW0sXG4gICAgICBhdWRpb1NldHRpbmcsXG4gICAgICB2aWRlb1NldHRpbmcsXG4gICAgICBzY3JlZW5zaGFyZVNldHRpbmcsXG4gICAgICBjaGF0U2V0dGluZyxcbiAgICAgIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICBzaG93QWxlcnQsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLFxuXG4gICAgICB1cGRhdGVBdWRpb0FscmVhZHlPbixcbiAgICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlLFxuICAgICAgdXBkYXRlQXVkaW9QYXVzZWQsXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50cyxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW8sXG4gICAgICB1cGRhdGVNaWNBY3Rpb24sXG5cbiAgICAgIGNoZWNrUGVybWlzc2lvbixcbiAgICAgIHN0cmVhbVN1Y2Nlc3NBdWRpbyxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW8sXG4gICAgICByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgaWYgKGF1ZGlvT25seVJvb20pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYSBpbiBhbiBhdWRpby1vbmx5IGV2ZW50LicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChhdWRpb0FscmVhZHlPbikge1xuICAgICAgaWYgKGlzbGV2ZWwgPT09ICcyJyAmJiAocmVjb3JkU3RhcnRlZCB8fCByZWNvcmRSZXN1bWVkKSkge1xuICAgICAgICBpZiAoIShyZWNvcmRQYXVzZWQgfHwgcmVjb3JkU3RvcHBlZCkpIHtcbiAgICAgICAgICBpZiAocmVjb3JkaW5nTWVkaWFPcHRpb25zID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgJ1lvdSBjYW5ub3QgdHVybiBvZmYgeW91ciBhdWRpbyB3aGlsZSByZWNvcmRpbmcsIHBsZWFzZSBwYXVzZSBvciBzdG9wIHJlY29yZGluZyBmaXJzdC4nLFxuICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXVkaW9BbHJlYWR5T24gPSBmYWxzZTtcbiAgICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uKGF1ZGlvQWxyZWFkeU9uKTtcbiAgICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgICBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtKGxvY2FsU3RyZWFtKTtcbiAgICAgIGF3YWl0IGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8oeyBwYXJhbWV0ZXJzIH0pOyAvL2Rpc2Nvbm5lY3QgZnVuY3Rpb24gaGVyZSBhY3R1YWxsIGNhbGxzIGF1ZGlvUHJvZHVjZXIucGF1c2UoKSBpbnN0ZWFkIG9mIGNsb3NlKCkgYXMgaW4gbWVkaWFzZnVcbiAgICAgIGF1ZGlvUGF1c2VkID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZUF1ZGlvUGF1c2VkKGF1ZGlvUGF1c2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFkbWluUmVzdHJpY3RTZXR0aW5nKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCB0dXJuIG9uIHlvdXIgbWljcm9waG9uZS4gQWNjZXNzIGRlbmllZCBieSBob3N0LicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCByZXNwb25zZSA9IDI7XG4gICAgICBpZiAoIW1pY0FjdGlvbiAmJiBpc2xldmVsICE9PSAnMicgJiYgIXlvdUFyZUNvSG9zdCkge1xuICAgICAgICByZXNwb25zZSA9IGF3YWl0IGNoZWNrUGVybWlzc2lvbih7XG4gICAgICAgICAgcGVybWlzc2lvblR5cGU6ICdhdWRpb1NldHRpbmcnLFxuICAgICAgICAgIGF1ZGlvU2V0dGluZyxcbiAgICAgICAgICB2aWRlb1NldHRpbmcsXG4gICAgICAgICAgc2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgICAgICAgIGNoYXRTZXR0aW5nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlID0gMDtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChyZXNwb25zZSkge1xuICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICBpZiAoYXVkaW9SZXF1ZXN0U3RhdGUgPT09ICdwZW5kaW5nJykge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnQSByZXF1ZXN0IGlzIHBlbmRpbmcuIFBsZWFzZSB3YWl0IGZvciB0aGUgaG9zdCB0byByZXNwb25kLicsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdSZXF1ZXN0IHNlbnQgdG8gaG9zdC4nLFxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhdWRpb1JlcXVlc3RTdGF0ZSA9ICdwZW5kaW5nJztcbiAgICAgICAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZShhdWRpb1JlcXVlc3RTdGF0ZSk7XG4gICAgICAgICAgLy9jcmVhdGUgYSByZXF1ZXN0IGFuZCBhZGQgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgc2VuZCB0byBob3N0XG5cbiAgICAgICAgICBjb25zdCB1c2VyUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGlkOiBzb2NrZXQuaWQsXG4gICAgICAgICAgICBuYW1lOiBtZW1iZXIsXG4gICAgICAgICAgICBpY29uOiAnZmEtbWljcm9waG9uZScsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBzb2NrZXQuZW1pdCgncGFydGljaXBhbnRSZXF1ZXN0JywgeyB1c2VyUmVxdWVzdCwgcm9vbU5hbWUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYXVkaW9SZXF1ZXN0U3RhdGUgPT09ICdyZWplY3RlZCcgJiZcbiAgICAgICAgICAgIERhdGUubm93KCkgLSBhdWRpb1JlcXVlc3RUaW1lIDwgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyAqIDEwMDBcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogYEEgcmVxdWVzdCB3YXMgcmVqZWN0ZWQuIFBsZWFzZSB3YWl0IGZvciAke3VwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHN9IHNlY29uZHMgYmVmb3JlIHNlbmRpbmcgYW5vdGhlciByZXF1ZXN0LmAsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgLy9hbGxvd1xuXG4gICAgICAgICAgaWYgKGF1ZGlvUGF1c2VkKSB7XG4gICAgICAgICAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgICAgICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uKHRydWUpO1xuICAgICAgICAgICAgYXdhaXQgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdyZXN1bWVQcm9kdWNlckF1ZGlvJywgeyBtZWRpYVRhZzogJ2F1ZGlvJywgcm9vbU5hbWUgfSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtKGxvY2FsU3RyZWFtKTtcbiAgICAgICAgICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uKGF1ZGlvQWxyZWFkeU9uKTtcblxuICAgICAgICAgICAgaWYgKG1pY0FjdGlvbiA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgIG1pY0FjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICB1cGRhdGVNaWNBY3Rpb24obWljQWN0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFydGljaXBhbnRzLmZvckVhY2goKHBhcnRpY2lwYW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChwYXJ0aWNpcGFudFsnc29ja2V0SWQnXSA9PT0gc29ja2V0LmlkICYmIHBhcnRpY2lwYW50Lm5hbWUgPT09IG1lbWJlcikge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50Lm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXBkYXRlUGFydGljaXBhbnRzKHBhcnRpY2lwYW50cyk7XG5cbiAgICAgICAgICAgIHRyYW5zcG9ydENyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZCh0cmFuc3BvcnRDcmVhdGVkKTtcblxuICAgICAgICAgICAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvID0gdHJ1ZTtcbiAgICAgICAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbyh0cmFuc3BvcnRDcmVhdGVkQXVkaW8pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0F1ZGlvUGVybWlzc2lvbiAmJiBjaGVja01lZGlhUGVybWlzc2lvbikge1xuICAgICAgICAgICAgICBjb25zdCBzdGF0dXNNaWMgPSBhd2FpdCByZXF1ZXN0UGVybWlzc2lvbkF1ZGlvKCk7XG4gICAgICAgICAgICAgIGlmIChzdGF0dXNNaWMgIT09ICdncmFudGVkJykge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAgICdBbGxvdyBhY2Nlc3MgdG8geW91ciBtaWNyb3Bob25lIG9yIGNoZWNrIGlmIHlvdXIgbWljcm9waG9uZSBpcyBub3QgYmVpbmcgdXNlZCBieSBhbm90aGVyIGFwcGxpY2F0aW9uLicsXG4gICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtZWRpYUNvbnN0cmFpbnRzID0gdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlXG4gICAgICAgICAgICAgID8geyBhdWRpbzogeyBkZXZpY2VJZDogdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlIH0sIHZpZGVvOiBmYWxzZSB9XG4gICAgICAgICAgICAgIDogeyBhdWRpbzogdHJ1ZSwgdmlkZW86IGZhbHNlIH07XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKG1lZGlhQ29uc3RyYWludHMpO1xuICAgICAgICAgICAgICBhd2FpdCBzdHJlYW1TdWNjZXNzQXVkaW8oeyBzdHJlYW0sIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAnQWxsb3cgYWNjZXNzIHRvIHlvdXIgbWljcm9waG9uZSBvciBjaGVjayBpZiB5b3VyIG1pY3JvcGhvbmUgaXMgbm90IGJlaW5nIHVzZWQgYnkgYW5vdGhlciBhcHBsaWNhdGlvbi4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==