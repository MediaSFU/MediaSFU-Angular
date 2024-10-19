import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class StreamSuccessAudio {
    /**
     * Handles the successful streaming of audio by setting up the necessary transports and updating the relevant states.
     *
     * @param {Object} options - The options for streaming success audio.
     * @param {MediaStream} options.stream - The media stream containing the audio track.
     * @param {Object} options.parameters - The parameters required for setting up the audio stream.
     * @param {Object} options.parameters.socket - The socket connection.
     * @param {Array} options.parameters.participants - The list of participants.
     * @param {MediaStream} options.parameters.localStream - The local media stream.
     * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is created.
     * @param {boolean} options.parameters.transportCreatedAudio - Flag indicating if the audio transport is created.
     * @param {boolean} options.parameters.audioAlreadyOn - Flag indicating if the audio is already on.
     * @param {boolean} options.parameters.micAction - Flag indicating the microphone action.
     * @param {Object} options.parameters.audioParams - The audio parameters.
     * @param {MediaStream} options.parameters.localStreamAudio - The local audio stream.
     * @param {string} options.parameters.defAudioID - The default audio device ID.
     * @param {string} options.parameters.userDefaultAudioInputDevice - The user default audio input device.
     * @param {Object} options.parameters.params - Additional parameters.
     * @param {Object} options.parameters.audioParamse - Additional audio parameters.
     * @param {Object} options.parameters.aParams - Additional parameters for audio.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {string} options.parameters.islevel - The level of the user.
     * @param {string} options.parameters.member - The member name.
     * @param {boolean} options.parameters.updateMainWindow - Flag indicating if the main window should be updated.
     * @param {boolean} options.parameters.lock_screen - Flag indicating if the screen is locked.
     * @param {boolean} options.parameters.shared - Flag indicating if the screen is shared.
     * @param {boolean} options.parameters.videoAlreadyOn - Flag indicating if the video is already on.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {Function} options.parameters.updateParticipants - Function to update participants.
     * @param {Function} options.parameters.updateTransportCreated - Function to update transport created flag.
     * @param {Function} options.parameters.updateTransportCreatedAudio - Function to update audio transport created flag.
     * @param {Function} options.parameters.updateAudioAlreadyOn - Function to update audio already on flag.
     * @param {Function} options.parameters.updateMicAction - Function to update microphone action flag.
     * @param {Function} options.parameters.updateAudioParams - Function to update audio parameters.
     * @param {Function} options.parameters.updateLocalStream - Function to update local stream.
     * @param {Function} options.parameters.updateLocalStreamAudio - Function to update local audio stream.
     * @param {Function} options.parameters.updateDefAudioID - Function to update default audio device ID.
     * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update user default audio input device.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update main window flag.
     * @param {Function} options.parameters.createSendTransport - Function to create send transport.
     * @param {Function} options.parameters.connectSendTransportAudio - Function to connect send transport audio.
     * @param {Function} options.parameters.resumeSendTransportAudio - Function to resume send transport audio.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @returns {Promise<void>} A promise that resolves when the audio streaming setup is complete.
     */
    async streamSuccessAudio({ stream, parameters }) {
        let { socket, participants, localStream, transportCreated, transportCreatedAudio, audioAlreadyOn, micAction, audioParams, localStreamAudio, defAudioID, userDefaultAudioInputDevice, params, audioParamse, aParams, hostLabel, islevel, member, updateMainWindow, lock_screen, shared, videoAlreadyOn, showAlert, 
        // update functions
        updateParticipants, updateTransportCreated, updateTransportCreatedAudio, updateAudioAlreadyOn, updateMicAction, updateAudioParams, updateLocalStream, updateLocalStreamAudio, updateDefAudioID, updateUserDefaultAudioInputDevice, updateUpdateMainWindow, 
        // mediasfu functions
        createSendTransport, connectSendTransportAudio, resumeSendTransportAudio, prepopulateUserMedia, } = parameters;
        localStreamAudio = stream;
        updateLocalStreamAudio(localStreamAudio);
        // Add the audio stream track to the localStream
        if (localStream == null) {
            localStream = new MediaStream([localStreamAudio.getAudioTracks()[0]]);
            updateLocalStream(localStream);
        }
        else {
            localStream.addTrack(localStreamAudio.getAudioTracks()[0]);
            updateLocalStream(localStream);
        }
        const audioTracked = localStream.getAudioTracks()[0];
        defAudioID = audioTracked.getSettings().deviceId || '';
        userDefaultAudioInputDevice = defAudioID;
        // Update the state variables
        updateDefAudioID(defAudioID);
        updateUserDefaultAudioInputDevice(userDefaultAudioInputDevice);
        try {
            params = aParams;
            audioParamse = { ...params };
            audioParams = { track: localStream.getAudioTracks()[0], ...audioParamse };
            updateAudioParams(audioParams);
            // Create transport if not created else connect transport
            if (!transportCreated) {
                try {
                    await createSendTransport({
                        parameters: {
                            ...parameters,
                            audioParams: audioParams,
                        },
                        option: 'audio',
                    });
                }
                catch (error) {
                    console.error('Error creating send transport:', error);
                }
            }
            else {
                if (!transportCreatedAudio) {
                    await connectSendTransportAudio({
                        audioParams,
                        parameters,
                    });
                }
                else {
                    await resumeSendTransportAudio({ parameters });
                }
            }
        }
        catch (error) {
            showAlert?.({
                message: error.message,
                type: 'danger',
                duration: 3000,
            });
        }
        // Update the participants array to reflect the change
        audioAlreadyOn = true;
        updateAudioAlreadyOn(audioAlreadyOn);
        if (micAction) {
            micAction = false;
            updateMicAction(micAction);
        }
        participants.forEach((participant) => {
            if (participant.socketId == socket.id && participant.name == member) {
                participant.muted = false;
            }
        });
        updateParticipants(participants);
        // Update the transport created state
        transportCreated = true;
        transportCreatedAudio = true;
        updateTransportCreated(transportCreated);
        updateTransportCreatedAudio(transportCreatedAudio);
        // Reupdate screen display if host
        if (videoAlreadyOn == false && islevel == '2') {
            if (!lock_screen && !shared) {
                updateMainWindow = true;
                updateUpdateMainWindow(updateMainWindow);
                await prepopulateUserMedia({ name: hostLabel, parameters });
                updateMainWindow = false;
                updateUpdateMainWindow(updateMainWindow);
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXN1Y2Nlc3MtYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtYXVkaW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTRFM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Q0c7SUFFSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUE2QjtRQUN4RSxJQUFJLEVBQ0YsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLHFCQUFxQixFQUNyQixjQUFjLEVBQ2QsU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLDJCQUEyQixFQUMzQixNQUFNLEVBQ04sWUFBWSxFQUNaLE9BQU8sRUFDUCxTQUFTLEVBQ1QsT0FBTyxFQUNQLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLE1BQU0sRUFDTixjQUFjLEVBQ2QsU0FBUztRQUVULG1CQUFtQjtRQUNuQixrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLDJCQUEyQixFQUMzQixvQkFBb0IsRUFDcEIsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLGdCQUFnQixFQUNoQixpQ0FBaUMsRUFDakMsc0JBQXNCO1FBRXRCLHFCQUFxQjtRQUNyQixtQkFBbUIsRUFDbkIseUJBQXlCLEVBQ3pCLHdCQUF3QixFQUN4QixvQkFBb0IsR0FDckIsR0FBRyxVQUFVLENBQUM7UUFFZixnQkFBZ0IsR0FBRyxNQUFNLENBQUM7UUFDMUIsc0JBQXNCLENBQUMs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QyxDQUFDO1FBRWpDLHFDQUFxQztRQUNyQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekMsMkJBQTJCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVuRCxrQ0FBa0M7UUFDbEMsSUFBSSxjQUFjLElBQUksS0FBSyxJQUFJLE9BQU8sSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzVCLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDeEIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDekMsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDNUQsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzt1R0F0TFUsa0JBQWtCOzJHQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgUGFydGljaXBhbnQsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgU2hvd0FsZXJ0LFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gIFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZSxcbiAgQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGUsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlLFxuICBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW9UeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgUHJvZHVjZXJPcHRpb25zIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBTdHJlYW1TdWNjZXNzQXVkaW9QYXJhbWV0ZXJzXG4gIGV4dGVuZHMgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gICAgUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyxcbiAgICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBsb2NhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICB0cmFuc3BvcnRDcmVhdGVkOiBib29sZWFuO1xuICB0cmFuc3BvcnRDcmVhdGVkQXVkaW86IGJvb2xlYW47XG4gIGF1ZGlvQWxyZWFkeU9uOiBib29sZWFuO1xuICBtaWNBY3Rpb246IGJvb2xlYW47XG4gIGF1ZGlvUGFyYW1zOiBQcm9kdWNlck9wdGlvbnM7XG4gIGxvY2FsU3RyZWFtQXVkaW86IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgZGVmQXVkaW9JRDogc3RyaW5nO1xuICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHN0cmluZztcbiAgcGFyYW1zOiBQcm9kdWNlck9wdGlvbnM7XG4gIGF1ZGlvUGFyYW1zZT86IFByb2R1Y2VyT3B0aW9ucztcbiAgYVBhcmFtczogUHJvZHVjZXJPcHRpb25zO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgdmlkZW9BbHJlYWR5T246IGJvb2xlYW47XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQ6ICh0cmFuc3BvcnRDcmVhdGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW86ICh0cmFuc3BvcnRDcmVhdGVkQXVkaW86IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uOiAoYXVkaW9BbHJlYWR5T246IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZU1pY0FjdGlvbjogKG1pY0FjdGlvbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQXVkaW9QYXJhbXM6IChhdWRpb1BhcmFtczogUHJvZHVjZXJPcHRpb25zKSA9PiB2b2lkO1xuICB1cGRhdGVMb2NhbFN0cmVhbTogKGxvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtQXVkaW86IChsb2NhbFN0cmVhbUF1ZGlvOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZURlZkF1ZGlvSUQ6IChkZWZBdWRpb0lEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogKHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgY3JlYXRlU2VuZFRyYW5zcG9ydDogQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGU7XG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlO1xuICByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86IFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb1R5cGU7XG4gIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gU3RyZWFtU3VjY2Vzc0F1ZGlvUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0cmVhbVN1Y2Nlc3NBdWRpb09wdGlvbnMge1xuICBzdHJlYW06IE1lZGlhU3RyZWFtO1xuICBwYXJhbWV0ZXJzOiBTdHJlYW1TdWNjZXNzQXVkaW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTdHJlYW1TdWNjZXNzQXVkaW9UeXBlID0gKG9wdGlvbnM6IFN0cmVhbVN1Y2Nlc3NBdWRpb09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTdHJlYW1TdWNjZXNzQXVkaW8ge1xuICAvKipcbiAgICogSGFuZGxlcyB0aGUgc3VjY2Vzc2Z1bCBzdHJlYW1pbmcgb2YgYXVkaW8gYnkgc2V0dGluZyB1cCB0aGUgbmVjZXNzYXJ5IHRyYW5zcG9ydHMgYW5kIHVwZGF0aW5nIHRoZSByZWxldmFudCBzdGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0cmVhbWluZyBzdWNjZXNzIGF1ZGlvLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnN0cmVhbSAtIFRoZSBtZWRpYSBzdHJlYW0gY29udGFpbmluZyB0aGUgYXVkaW8gdHJhY2suXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc2V0dGluZyB1cCB0aGUgYXVkaW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgY29ubmVjdGlvbi5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyAtIFRoZSBsaXN0IG9mIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtIC0gVGhlIGxvY2FsIG1lZGlhIHN0cmVhbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudHJhbnNwb3J0Q3JlYXRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdHJhbnNwb3J0IGlzIGNyZWF0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWRBdWRpbyAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgYXVkaW8gdHJhbnNwb3J0IGlzIGNyZWF0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvQWxyZWFkeU9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBhdWRpbyBpcyBhbHJlYWR5IG9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5taWNBY3Rpb24gLSBGbGFnIGluZGljYXRpbmcgdGhlIG1pY3JvcGhvbmUgYWN0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUGFyYW1zIC0gVGhlIGF1ZGlvIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbUF1ZGlvIC0gVGhlIGxvY2FsIGF1ZGlvIHN0cmVhbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5kZWZBdWRpb0lEIC0gVGhlIGRlZmF1bHQgYXVkaW8gZGV2aWNlIElELlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIFRoZSB1c2VyIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcmFtcyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb1BhcmFtc2UgLSBBZGRpdGlvbmFsIGF1ZGlvIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMuYVBhcmFtcyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgYXVkaW8uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIG9mIHRoZSBob3N0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVtYmVyIC0gVGhlIG1lbWJlciBuYW1lLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBtYWluIHdpbmRvdyBzaG91bGQgYmUgdXBkYXRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubG9ja19zY3JlZW4gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHNjcmVlbiBpcyBsb2NrZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2NyZWVuIGlzIHNoYXJlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUGFydGljaXBhbnRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdHJhbnNwb3J0IGNyZWF0ZWQgZmxhZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhdWRpbyB0cmFuc3BvcnQgY3JlYXRlZCBmbGFnLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9BbHJlYWR5T24gLSBGdW5jdGlvbiB0byB1cGRhdGUgYXVkaW8gYWxyZWFkeSBvbiBmbGFnLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWljQWN0aW9uIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG1pY3JvcGhvbmUgYWN0aW9uIGZsYWcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBdWRpb1BhcmFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhdWRpbyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgbG9jYWwgc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1BdWRpbyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBsb2NhbCBhdWRpbyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVEZWZBdWRpb0lEIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGRlZmF1bHQgYXVkaW8gZGV2aWNlIElELlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHVzZXIgZGVmYXVsdCBhdWRpbyBpbnB1dCBkZXZpY2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIG1haW4gd2luZG93IGZsYWcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jcmVhdGVTZW5kVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gY3JlYXRlIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyAtIEZ1bmN0aW9uIHRvIGNvbm5lY3Qgc2VuZCB0cmFuc3BvcnQgYXVkaW8uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8gLSBGdW5jdGlvbiB0byByZXN1bWUgc2VuZCB0cmFuc3BvcnQgYXVkaW8uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhdWRpbyBzdHJlYW1pbmcgc2V0dXAgaXMgY29tcGxldGUuXG4gICAqL1xuXG4gIGFzeW5jIHN0cmVhbVN1Y2Nlc3NBdWRpbyh7IHN0cmVhbSwgcGFyYW1ldGVycyB9OiBTdHJlYW1TdWNjZXNzQXVkaW9PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHtcbiAgICAgIHNvY2tldCxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIGxvY2FsU3RyZWFtLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZCxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWRBdWRpbyxcbiAgICAgIGF1ZGlvQWxyZWFkeU9uLFxuICAgICAgbWljQWN0aW9uLFxuICAgICAgYXVkaW9QYXJhbXMsXG4gICAgICBsb2NhbFN0cmVhbUF1ZGlvLFxuICAgICAgZGVmQXVkaW9JRCxcbiAgICAgIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSxcbiAgICAgIHBhcmFtcyxcbiAgICAgIGF1ZGlvUGFyYW1zZSxcbiAgICAgIGFQYXJhbXMsXG4gICAgICBob3N0TGFiZWwsXG4gICAgICBpc2xldmVsLFxuICAgICAgbWVtYmVyLFxuICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgc2hhcmVkLFxuICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICBzaG93QWxlcnQsXG5cbiAgICAgIC8vIHVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50cyxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW8sXG4gICAgICB1cGRhdGVBdWRpb0FscmVhZHlPbixcbiAgICAgIHVwZGF0ZU1pY0FjdGlvbixcbiAgICAgIHVwZGF0ZUF1ZGlvUGFyYW1zLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW0sXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbUF1ZGlvLFxuICAgICAgdXBkYXRlRGVmQXVkaW9JRCxcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSxcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG5cbiAgICAgIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgY3JlYXRlU2VuZFRyYW5zcG9ydCxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgICByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxvY2FsU3RyZWFtQXVkaW8gPSBzdHJlYW07XG4gICAgdXBkYXRlTG9jYWxTdHJlYW1BdWRpbyhsb2NhbFN0cmVhbUF1ZGlvKTtcblxuICAgIC8vIEFkZCB0aGUgYXVkaW8gc3RyZWFtIHRyYWNrIHRvIHRoZSBsb2NhbFN0cmVhbVxuICAgIGlmIChsb2NhbFN0cmVhbSA9PSBudWxsKSB7XG4gICAgICBsb2NhbFN0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbShbbG9jYWxTdHJlYW1BdWRpby5nZXRBdWRpb1RyYWNrcygpWzBdXSk7XG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RyZWFtLmFkZFRyYWNrKGxvY2FsU3RyZWFtQXVkaW8uZ2V0QXVkaW9UcmFja3MoKVswXSk7XG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG4gICAgfVxuXG4gICAgY29uc3QgYXVkaW9UcmFja2VkID0gbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXTtcbiAgICBkZWZBdWRpb0lEID0gYXVkaW9UcmFja2VkLmdldFNldHRpbmdzKCkuZGV2aWNlSWQgfHwgJyc7XG4gICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlID0gZGVmQXVkaW9JRDtcblxuICAgIC8vIFVwZGF0ZSB0aGUgc3RhdGUgdmFyaWFibGVzXG4gICAgdXBkYXRlRGVmQXVkaW9JRChkZWZBdWRpb0lEKTtcbiAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UodXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKTtcblxuICAgIHRyeSB7XG4gICAgICBwYXJhbXMgPSBhUGFyYW1zO1xuICAgICAgYXVkaW9QYXJhbXNlID0geyAuLi5wYXJhbXMgfTtcblxuICAgICAgYXVkaW9QYXJhbXMgPSB7IHRyYWNrOiBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLCAuLi5hdWRpb1BhcmFtc2UgfTtcbiAgICAgIHVwZGF0ZUF1ZGlvUGFyYW1zKGF1ZGlvUGFyYW1zKTtcblxuICAgICAgLy8gQ3JlYXRlIHRyYW5zcG9ydCBpZiBub3QgY3JlYXRlZCBlbHNlIGNvbm5lY3QgdHJhbnNwb3J0XG4gICAgICBpZiAoIXRyYW5zcG9ydENyZWF0ZWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBjcmVhdGVTZW5kVHJhbnNwb3J0KHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgLi4ucGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgYXVkaW9QYXJhbXM6IGF1ZGlvUGFyYW1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbjogJ2F1ZGlvJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBzZW5kIHRyYW5zcG9ydDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvKSB7XG4gICAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyh7XG4gICAgICAgICAgICBhdWRpb1BhcmFtcyxcbiAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBwYXJ0aWNpcGFudHMgYXJyYXkgdG8gcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgYXVkaW9BbHJlYWR5T24gPSB0cnVlO1xuICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uKGF1ZGlvQWxyZWFkeU9uKTtcblxuICAgIGlmIChtaWNBY3Rpb24pIHtcbiAgICAgIG1pY0FjdGlvbiA9IGZhbHNlO1xuICAgICAgdXBkYXRlTWljQWN0aW9uKG1pY0FjdGlvbik7XG4gICAgfVxuXG4gICAgcGFydGljaXBhbnRzLmZvckVhY2goKHBhcnRpY2lwYW50OiBhbnkpID0+IHtcbiAgICAgIGlmIChwYXJ0aWNpcGFudC5zb2NrZXRJZCA9PSBzb2NrZXQuaWQgJiYgcGFydGljaXBhbnQubmFtZSA9PSBtZW1iZXIpIHtcbiAgICAgICAgcGFydGljaXBhbnQubXV0ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB1cGRhdGVQYXJ0aWNpcGFudHMocGFydGljaXBhbnRzKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgdHJhbnNwb3J0IGNyZWF0ZWQgc3RhdGVcbiAgICB0cmFuc3BvcnRDcmVhdGVkID0gdHJ1ZTtcbiAgICB0cmFuc3BvcnRDcmVhdGVkQXVkaW8gPSB0cnVlO1xuICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQodHJhbnNwb3J0Q3JlYXRlZCk7XG4gICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvKHRyYW5zcG9ydENyZWF0ZWRBdWRpbyk7XG5cbiAgICAvLyBSZXVwZGF0ZSBzY3JlZW4gZGlzcGxheSBpZiBob3N0XG4gICAgaWYgKHZpZGVvQWxyZWFkeU9uID09IGZhbHNlICYmIGlzbGV2ZWwgPT0gJzInKSB7XG4gICAgICBpZiAoIWxvY2tfc2NyZWVuICYmICFzaGFyZWQpIHtcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gZmFsc2U7XG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=