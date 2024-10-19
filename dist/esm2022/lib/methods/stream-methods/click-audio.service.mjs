import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLWF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFpRjNDLE1BQU0sT0FBTyxVQUFVO0lBQ3JCOzs7Ozs7Ozs7Ozs7O09BYUc7SUFFSCxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFxQjtRQUNoRCxJQUFJLEVBQ0Ysb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsY0FBYyxFQUNkLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLFlBQVksRUFDWixhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLE9BQU8sRUFDUCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsMkJBQTJCLEVBQzNCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsWUFBWSxFQUNaLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLDRCQUE0QixFQUM1QixZQUFZLEVBQ1osU0FBUyxFQUNULGdCQUFnQixFQUNoQixxQkFBcUIsRUFFckIsb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixzQkFBc0IsRUFDdEIsMkJBQTJCLEVBQzNCLGVBQWUsRUFFZixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0Qix3QkFBd0IsRUFDeEIsNEJBQTRCLEdBQzdCLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixTQUFTLEVBQUUsQ0FBQztnQkFD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SyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNyQixTQUFTLEVBQUUsQ0FBQztnQ0FDVixPQUFPLEVBQ0wsdUdBQXVHO2dDQUN6RyxJQUFJLEVBQUUsUUFBUTtnQ0FDZCxRQUFRLEVBQUUsSUFBSTs2QkFDZixDQUFDLENBQUM7d0JBQ0wsQ0FBQztvQkFDSCxDQUFDO29CQUNELE1BQU07Z0JBRVIsUUFBUTtZQUNWLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzt1R0F4T1UsVUFBVTsyR0FBVixVQUFVLGNBRlQsTUFBTTs7MkZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDaGVja1Blcm1pc3Npb25UeXBlLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1R5cGUsXG4gIFBhcnRpY2lwYW50LFxuICBSZXF1ZXN0UGVybWlzc2lvbkF1ZGlvVHlwZSxcbiAgUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyxcbiAgUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvVHlwZSxcbiAgU2hvd0FsZXJ0LFxuICBTdHJlYW1TdWNjZXNzQXVkaW9QYXJhbWV0ZXJzLFxuICBTdHJlYW1TdWNjZXNzQXVkaW9UeXBlLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuZXhwb3J0IGludGVyZmFjZSBDbGlja0F1ZGlvUGFyYW1ldGVyc1xuICBleHRlbmRzIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzLFxuICAgIFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gICAgU3RyZWFtU3VjY2Vzc0F1ZGlvUGFyYW1ldGVycyB7XG4gIGNoZWNrTWVkaWFQZXJtaXNzaW9uOiBib29sZWFuO1xuICBoYXNBdWRpb1Blcm1pc3Npb246IGJvb2xlYW47XG4gIGF1ZGlvUGF1c2VkOiBib29sZWFuO1xuICBhdWRpb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgYXVkaW9Pbmx5Um9vbTogYm9vbGVhbjtcbiAgcmVjb3JkU3RhcnRlZDogYm9vbGVhbjtcbiAgcmVjb3JkUmVzdW1lZDogYm9vbGVhbjtcbiAgcmVjb3JkUGF1c2VkOiBib29sZWFuO1xuICByZWNvcmRTdG9wcGVkOiBib29sZWFuO1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICB5b3VBcmVDb0hvc3Q6IGJvb2xlYW47XG4gIGFkbWluUmVzdHJpY3RTZXR0aW5nOiBib29sZWFuO1xuICBhdWRpb1JlcXVlc3RTdGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgYXVkaW9SZXF1ZXN0VGltZTogbnVtYmVyO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogc3RyaW5nO1xuICBtaWNBY3Rpb246IGJvb2xlYW47XG4gIGxvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIGF1ZGlvU2V0dGluZzogc3RyaW5nO1xuICB2aWRlb1NldHRpbmc6IHN0cmluZztcbiAgc2NyZWVuc2hhcmVTZXR0aW5nOiBzdHJpbmc7XG4gIGNoYXRTZXR0aW5nOiBzdHJpbmc7XG4gIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHM6IG51bWJlcjtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICB0cmFuc3BvcnRDcmVhdGVkOiBib29sZWFuO1xuICB0cmFuc3BvcnRDcmVhdGVkQXVkaW86IGJvb2xlYW47XG5cbiAgdXBkYXRlQXVkaW9BbHJlYWR5T246IChzdGF0dXM6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlOiAoc3RhdGU6IHN0cmluZyB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZGlvUGF1c2VkOiAoc3RhdHVzOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVMb2NhbFN0cmVhbTogKHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQ6IChzdGF0dXM6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbzogKHN0YXR1czogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTWljQWN0aW9uOiAoYWN0aW9uOiBib29sZWFuKSA9PiB2b2lkO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNoZWNrUGVybWlzc2lvbjogQ2hlY2tQZXJtaXNzaW9uVHlwZTtcbiAgc3RyZWFtU3VjY2Vzc0F1ZGlvOiBTdHJlYW1TdWNjZXNzQXVkaW9UeXBlO1xuICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvVHlwZTtcbiAgcmVxdWVzdFBlcm1pc3Npb25BdWRpbzogUmVxdWVzdFBlcm1pc3Npb25BdWRpb1R5cGU7XG4gIHJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbzogUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDbGlja0F1ZGlvUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENsaWNrQXVkaW9PcHRpb25zIHtcbiAgcGFyYW1ldGVyczogQ2xpY2tBdWRpb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENsaWNrQXVkaW9UeXBlID0gKG9wdGlvbnM6IENsaWNrQXVkaW9PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tBdWRpbyB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBjbGljayBldmVudCBmb3IgdG9nZ2xpbmcgYXVkaW8gaW4gYSBtZWRpYSBzZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0NsaWNrQXVkaW9PcHRpb25zfSBwYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIGhhbmRsaW5nIHRoZSBhdWRpbyBjbGljayBldmVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGF1ZGlvIGNsaWNrIGV2ZW50IGhhcyBiZWVuIGhhbmRsZWQuXG4gICAqXG4gICAqIFRoZSBmdW5jdGlvbiBwZXJmb3JtcyB0aGUgZm9sbG93aW5nIGFjdGlvbnM6XG4gICAqIC0gSWYgdGhlIGV2ZW50IGlzIGF1ZGlvLW9ubHksIGl0IHNob3dzIGFuIGFsZXJ0IGFuZCBleGl0cy5cbiAgICogLSBJZiB0aGUgYXVkaW8gaXMgYWxyZWFkeSBvbiwgaXQgaGFuZGxlcyB0aGUgbG9naWMgZm9yIHR1cm5pbmcgaXQgb2ZmLCBpbmNsdWRpbmcgY2hlY2tpbmcgcmVjb3JkaW5nIHN0YXRlcyBhbmQgcGVybWlzc2lvbnMuXG4gICAqIC0gSWYgdGhlIGF1ZGlvIGlzIG9mZiwgaXQgY2hlY2tzIGZvciBhZG1pbiByZXN0cmljdGlvbnMsIHVzZXIgcGVybWlzc2lvbnMsIGFuZCBoYW5kbGVzIHRoZSBsb2dpYyBmb3IgdHVybmluZyB0aGUgYXVkaW8gb24uXG4gICAqIC0gSXQgdXBkYXRlcyB2YXJpb3VzIHN0YXRlcyBhbmQgZW1pdHMgc29ja2V0IGV2ZW50cyBhcyBuZWNlc3NhcnkuXG4gICAqXG4gICAqIFRoZSBmdW5jdGlvbiBtYWtlcyB1c2Ugb2Ygc2V2ZXJhbCBoZWxwZXIgZnVuY3Rpb25zIGFuZCBzdGF0ZSB1cGRhdGUgZnVuY3Rpb25zIHBhc3NlZCBpbiB0aHJvdWdoIHRoZSBwYXJhbWV0ZXJzLlxuICAgKi9cblxuICBhc3luYyBjbGlja0F1ZGlvKHsgcGFyYW1ldGVycyB9OiBDbGlja0F1ZGlvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB7XG4gICAgICBjaGVja01lZGlhUGVybWlzc2lvbixcbiAgICAgIGhhc0F1ZGlvUGVybWlzc2lvbixcbiAgICAgIGF1ZGlvUGF1c2VkLFxuICAgICAgYXVkaW9BbHJlYWR5T24sXG4gICAgICBhdWRpb09ubHlSb29tLFxuICAgICAgcmVjb3JkU3RhcnRlZCxcbiAgICAgIHJlY29yZFJlc3VtZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRTdG9wcGVkLFxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIHlvdUFyZUNvSG9zdCxcbiAgICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nLFxuICAgICAgYXVkaW9SZXF1ZXN0U3RhdGUsXG4gICAgICBhdWRpb1JlcXVlc3RUaW1lLFxuICAgICAgbWVtYmVyLFxuICAgICAgc29ja2V0LFxuICAgICAgcm9vbU5hbWUsXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UsXG4gICAgICBtaWNBY3Rpb24sXG4gICAgICBsb2NhbFN0cmVhbSxcbiAgICAgIGF1ZGlvU2V0dGluZyxcbiAgICAgIHZpZGVvU2V0dGluZyxcbiAgICAgIHNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICAgIGNoYXRTZXR0aW5nLFxuICAgICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkQXVkaW8sXG5cbiAgICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uLFxuICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGUsXG4gICAgICB1cGRhdGVBdWRpb1BhdXNlZCxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzLFxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZCxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbyxcbiAgICAgIHVwZGF0ZU1pY0FjdGlvbixcblxuICAgICAgY2hlY2tQZXJtaXNzaW9uLFxuICAgICAgc3RyZWFtU3VjY2Vzc0F1ZGlvLFxuICAgICAgcmVxdWVzdFBlcm1pc3Npb25BdWRpbyxcbiAgICAgIHJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBpZiAoYXVkaW9Pbmx5Um9vbSkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCB0dXJuIG9uIHlvdXIgY2FtZXJhIGluIGFuIGF1ZGlvLW9ubHkgZXZlbnQuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGF1ZGlvQWxyZWFkeU9uKSB7XG4gICAgICBpZiAoaXNsZXZlbCA9PT0gJzInICYmIChyZWNvcmRTdGFydGVkIHx8IHJlY29yZFJlc3VtZWQpKSB7XG4gICAgICAgIGlmICghKHJlY29yZFBhdXNlZCB8fCByZWNvcmRTdG9wcGVkKSkge1xuICAgICAgICAgIGlmIChyZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAnWW91IGNhbm5vdCB0dXJuIG9mZiB5b3VyIGF1ZGlvIHdoaWxlIHJlY29yZGluZywgcGxlYXNlIHBhdXNlIG9yIHN0b3AgcmVjb3JkaW5nIGZpcnN0LicsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhdWRpb0FscmVhZHlPbiA9IGZhbHNlO1xuICAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T24oYXVkaW9BbHJlYWR5T24pO1xuICAgICAgaWYgKGxvY2FsU3RyZWFtKSB7XG4gICAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW0obG9jYWxTdHJlYW0pO1xuICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyh7IHBhcmFtZXRlcnMgfSk7IC8vZGlzY29ubmVjdCBmdW5jdGlvbiBoZXJlIGFjdHVhbGwgY2FsbHMgYXVkaW9Qcm9kdWNlci5wYXVzZSgpIGluc3RlYWQgb2YgY2xvc2UoKSBhcyBpbiBtZWRpYXNmdVxuICAgICAgYXVkaW9QYXVzZWQgPSB0cnVlO1xuICAgICAgdXBkYXRlQXVkaW9QYXVzZWQoYXVkaW9QYXVzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRtaW5SZXN0cmljdFNldHRpbmcpIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgY2Fubm90IHR1cm4gb24geW91ciBtaWNyb3Bob25lLiBBY2Nlc3MgZGVuaWVkIGJ5IGhvc3QuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlc3BvbnNlID0gMjtcbiAgICAgIGlmICghbWljQWN0aW9uICYmIGlzbGV2ZWwgIT09ICcyJyAmJiAheW91QXJlQ29Ib3N0KSB7XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgY2hlY2tQZXJtaXNzaW9uKHtcbiAgICAgICAgICBwZXJtaXNzaW9uVHlwZTogJ2F1ZGlvU2V0dGluZycsXG4gICAgICAgICAgYXVkaW9TZXR0aW5nLFxuICAgICAgICAgIHZpZGVvU2V0dGluZyxcbiAgICAgICAgICBzY3JlZW5zaGFyZVNldHRpbmcsXG4gICAgICAgICAgY2hhdFNldHRpbmcsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzcG9uc2UgPSAwO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHJlc3BvbnNlKSB7XG4gICAgICAgIGNhc2UgMToge1xuICAgICAgICAgIGlmIChhdWRpb1JlcXVlc3RTdGF0ZSA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdBIHJlcXVlc3QgaXMgcGVuZGluZy4gUGxlYXNlIHdhaXQgZm9yIHRoZSBob3N0IHRvIHJlc3BvbmQuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1JlcXVlc3Qgc2VudCB0byBob3N0LicsXG4gICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGF1ZGlvUmVxdWVzdFN0YXRlID0gJ3BlbmRpbmcnO1xuICAgICAgICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlKGF1ZGlvUmVxdWVzdFN0YXRlKTtcbiAgICAgICAgICAvL2NyZWF0ZSBhIHJlcXVlc3QgYW5kIGFkZCB0byB0aGUgcmVxdWVzdCBsaXN0IGFuZCBzZW5kIHRvIGhvc3RcblxuICAgICAgICAgIGNvbnN0IHVzZXJSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgaWQ6IHNvY2tldC5pZCxcbiAgICAgICAgICAgIG5hbWU6IG1lbWJlcixcbiAgICAgICAgICAgIGljb246ICdmYS1taWNyb3Bob25lJyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHNvY2tldC5lbWl0KCdwYXJ0aWNpcGFudFJlcXVlc3QnLCB7IHVzZXJSZXF1ZXN0LCByb29tTmFtZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBhdWRpb1JlcXVlc3RTdGF0ZSA9PT0gJ3JlamVjdGVkJyAmJlxuICAgICAgICAgICAgRGF0ZS5ub3coKSAtIGF1ZGlvUmVxdWVzdFRpbWUgPCB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzICogMTAwMFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOiBgQSByZXF1ZXN0IHdhcyByZWplY3RlZC4gUGxlYXNlIHdhaXQgZm9yICR7dXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kc30gc2Vjb25kcyBiZWZvcmUgc2VuZGluZyBhbm90aGVyIHJlcXVlc3QuYCxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAvL2FsbG93XG5cbiAgICAgICAgICBpZiAoYXVkaW9QYXVzZWQpIHtcbiAgICAgICAgICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgICAgICAgICBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T24odHJ1ZSk7XG4gICAgICAgICAgICBhd2FpdCByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3Jlc3VtZVByb2R1Y2VyQXVkaW8nLCB7IG1lZGlhVGFnOiAnYXVkaW8nLCByb29tTmFtZSB9KTtcblxuICAgICAgICAgICAgdXBkYXRlTG9jYWxTdHJlYW0obG9jYWxTdHJlYW0pO1xuICAgICAgICAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T24oYXVkaW9BbHJlYWR5T24pO1xuXG4gICAgICAgICAgICBpZiAobWljQWN0aW9uID09IHRydWUpIHtcbiAgICAgICAgICAgICAgbWljQWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgIHVwZGF0ZU1pY0FjdGlvbihtaWNBY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJ0aWNpcGFudHMuZm9yRWFjaCgocGFydGljaXBhbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHBhcnRpY2lwYW50Wydzb2NrZXRJZCddID09PSBzb2NrZXQuaWQgJiYgcGFydGljaXBhbnQubmFtZSA9PT0gbWVtYmVyKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQubXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1cGRhdGVQYXJ0aWNpcGFudHMocGFydGljaXBhbnRzKTtcblxuICAgICAgICAgICAgdHJhbnNwb3J0Q3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkKHRyYW5zcG9ydENyZWF0ZWQpO1xuXG4gICAgICAgICAgICB0cmFuc3BvcnRDcmVhdGVkQXVkaW8gPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvKHRyYW5zcG9ydENyZWF0ZWRBdWRpbyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzQXVkaW9QZXJtaXNzaW9uICYmIGNoZWNrTWVkaWFQZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0YXR1c01pYyA9IGF3YWl0IHJlcXVlc3RQZXJtaXNzaW9uQXVkaW8oKTtcbiAgICAgICAgICAgICAgaWYgKHN0YXR1c01pYyAhPT0gJ2dyYW50ZWQnKSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAgICAgJ0FsbG93IGFjY2VzcyB0byB5b3VyIG1pY3JvcGhvbmUgb3IgY2hlY2sgaWYgeW91ciBtaWNyb3Bob25lIGlzIG5vdCBiZWluZyB1c2VkIGJ5IGFub3RoZXIgYXBwbGljYXRpb24uJyxcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1lZGlhQ29uc3RyYWludHMgPSB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2VcbiAgICAgICAgICAgICAgPyB7IGF1ZGlvOiB7IGRldmljZUlkOiB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgfSwgdmlkZW86IGZhbHNlIH1cbiAgICAgICAgICAgICAgOiB7IGF1ZGlvOiB0cnVlLCB2aWRlbzogZmFsc2UgfTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cyk7XG4gICAgICAgICAgICAgIGF3YWl0IHN0cmVhbVN1Y2Nlc3NBdWRpbyh7IHN0cmVhbSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAgICdBbGxvdyBhY2Nlc3MgdG8geW91ciBtaWNyb3Bob25lIG9yIGNoZWNrIGlmIHlvdXIgbWljcm9waG9uZSBpcyBub3QgYmVpbmcgdXNlZCBieSBhbm90aGVyIGFwcGxpY2F0aW9uLicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19