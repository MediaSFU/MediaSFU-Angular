import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the successful streaming of audio by setting up the necessary transports and updating the relevant states.
 *
 * This method updates the local media stream with the new audio track, manages the transport connection,
 * and updates the participants' states to reflect changes in audio settings.
 *
 * @param {StreamSuccessAudioOptions} options - The options for streaming success audio.
 * @param {MediaStream} options.stream - The media stream containing the audio track.
 * @param {StreamSuccessAudioParameters} options.parameters - The parameters required for setting up the audio stream.
 * @param {Socket} options.parameters.socket - The socket connection for real-time communication.
 * @param {Participant[]} options.parameters.participants - The list of participants in the session.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream that includes video and audio tracks.
 * @param {boolean} options.parameters.transportCreated - Indicates if the audio transport has been created.
 * @param {boolean} options.parameters.transportCreatedAudio - Indicates if the audio transport has been created.
 * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already active.
 * @param {boolean} options.parameters.micAction - Indicates the microphone action state.
 * @param {ProducerOptions} options.parameters.audioParams - The current audio parameters for the producer.
 * @param {MediaStream | null} options.parameters.localStreamAudio - The local audio stream.
 * @param {string} options.parameters.defAudioID - The default audio device ID for the stream.
 * @param {string} options.parameters.userDefaultAudioInputDevice - The user default audio input device.
 * @param {ProducerOptions} options.parameters.params - Additional parameters for the producer.
 * @param {ProducerOptions} [options.parameters.audioParamse] - Additional audio parameters.
 * @param {ProducerOptions} options.parameters.aParams - Producer parameters for the audio.
 * @param {string} options.parameters.hostLabel - The label of the host for this session.
 * @param {string} options.parameters.islevel - The participant's level (e.g., admin, regular user).
 * @param {string} options.parameters.member - The member name for identification.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window needs to be updated.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked for participants.
 * @param {boolean} options.parameters.shared - Indicates if the screen is currently shared.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video stream is currently active.
 * @param {ShowAlert} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {Function} options.parameters.updateParticipants - Function to update the list of participants.
 * @param {Function} options.parameters.updateTransportCreated - Function to update the audio transport created status.
 * @param {Function} options.parameters.updateTransportCreatedAudio - Function to update the audio transport created status.
 * @param {Function} options.parameters.updateAudioAlreadyOn - Function to update the audio active status.
 * @param {Function} options.parameters.updateMicAction - Function to update the microphone action state.
 * @param {Function} options.parameters.updateAudioParams - Function to update the audio parameters.
 * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
 * @param {Function} options.parameters.updateLocalStreamAudio - Function to update the local audio stream.
 * @param {Function} options.parameters.updateDefAudioID - Function to update the default audio device ID.
 * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the default audio input device.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window status.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for audio.
 * @param {Function} options.parameters.connectSendTransportAudio - Function to connect the send transport for audio.
 * @param {Function} options.parameters.resumeSendTransportAudio - Function to resume the send transport for audio.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media based on current settings.
 *
 * @returns {Promise<void>} A promise that resolves when the audio streaming setup is complete.
 *
 * @throws {Error} Throws an error if there is an issue during the audio stream setup.
 *
 * @example
 * await streamSuccessAudio({
 *   stream: newAudioStream,
 *   parameters: {
 *     socket: socketInstance,
 *     participants: participantList,
 *     // other parameters...
 *   },
 * });
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXN1Y2Nlc3MtYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtYXVkaW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXlFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRERztBQUtILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNENHO0lBRUgsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBNkI7UUFDeEUsSUFBSSxFQUNGLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNYLGdCQUFnQixFQUNoQixxQkFBcUIsRUFDckIsY0FBYyxFQUNkLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDViwyQkFBMkIsRUFDM0IsTUFBTSxFQUNOLFlBQVksRUFDWixPQUFPLEVBQ1AsU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxNQUFNLEVBQ04sY0FBYyxFQUNkLFNBQVM7UUFFVCxtQkFBbUI7UUFDbkIsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0QiwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLHNCQUFzQixFQUN0QixnQkFBZ0IsRUFDaEIsaUNBQWlDLEVBQ2pDLHNCQUFzQjtRQUV0QixxQkFBcUI7UUFDckIsbUJBQW1CLEVBQ25CLHlCQUF5QixFQUN6Qix3QkFBd0IsRUFDeEIsb0JB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QUFHLEtBQUssQ0FBQztZQUM1QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVqQyxxQ0FBcUM7UUFDckMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUM3QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pDLDJCQUEyQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFbkQsa0NBQWtDO1FBQ2xDLElBQUksY0FBYyxJQUFJLEtBQUssSUFBSSxPQUFPLElBQUksR0FBRyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM1QixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzVELGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQkFDekIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7dUdBdExVLGtCQUFrQjsyR0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gIFNob3dBbGVydCxcbiAgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzLFxuICBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRUeXBlLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvVHlwZSxcbiAgUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvVHlwZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IFByb2R1Y2VyT3B0aW9ucyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgU3RyZWFtU3VjY2Vzc0F1ZGlvUGFyYW1ldGVyc1xuICBleHRlbmRzIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICAgIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzLFxuICAgIFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gICAgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgbG9jYWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgdHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbjtcbiAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiBib29sZWFuO1xuICBhdWRpb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgbWljQWN0aW9uOiBib29sZWFuO1xuICBhdWRpb1BhcmFtczogUHJvZHVjZXJPcHRpb25zO1xuICBsb2NhbFN0cmVhbUF1ZGlvOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIGRlZkF1ZGlvSUQ6IHN0cmluZztcbiAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHBhcmFtczogUHJvZHVjZXJPcHRpb25zO1xuICBhdWRpb1BhcmFtc2U/OiBQcm9kdWNlck9wdGlvbnM7XG4gIGFQYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgaG9zdExhYmVsOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkOiAodHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiAodHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVBdWRpb0FscmVhZHlPbjogKGF1ZGlvQWxyZWFkeU9uOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVNaWNBY3Rpb246IChtaWNBY3Rpb246IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZGlvUGFyYW1zOiAoYXVkaW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucykgPT4gdm9pZDtcbiAgdXBkYXRlTG9jYWxTdHJlYW06IChsb2NhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVMb2NhbFN0cmVhbUF1ZGlvOiAobG9jYWxTdHJlYW1BdWRpbzogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVEZWZBdWRpb0lEOiAoZGVmQXVkaW9JRDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6ICh1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNyZWF0ZVNlbmRUcmFuc3BvcnQ6IENyZWF0ZVNlbmRUcmFuc3BvcnRUeXBlO1xuICBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvVHlwZTtcbiAgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvOiBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW9UeXBlO1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFN0cmVhbVN1Y2Nlc3NBdWRpb1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdHJlYW1TdWNjZXNzQXVkaW9PcHRpb25zIHtcbiAgc3RyZWFtOiBNZWRpYVN0cmVhbTtcbiAgcGFyYW1ldGVyczogU3RyZWFtU3VjY2Vzc0F1ZGlvUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3RyZWFtU3VjY2Vzc0F1ZGlvVHlwZSA9IChvcHRpb25zOiBTdHJlYW1TdWNjZXNzQXVkaW9PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIEhhbmRsZXMgdGhlIHN1Y2Nlc3NmdWwgc3RyZWFtaW5nIG9mIGF1ZGlvIGJ5IHNldHRpbmcgdXAgdGhlIG5lY2Vzc2FyeSB0cmFuc3BvcnRzIGFuZCB1cGRhdGluZyB0aGUgcmVsZXZhbnQgc3RhdGVzLlxuICpcbiAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgdGhlIGxvY2FsIG1lZGlhIHN0cmVhbSB3aXRoIHRoZSBuZXcgYXVkaW8gdHJhY2ssIG1hbmFnZXMgdGhlIHRyYW5zcG9ydCBjb25uZWN0aW9uLFxuICogYW5kIHVwZGF0ZXMgdGhlIHBhcnRpY2lwYW50cycgc3RhdGVzIHRvIHJlZmxlY3QgY2hhbmdlcyBpbiBhdWRpbyBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmVhbVN1Y2Nlc3NBdWRpb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3RyZWFtaW5nIHN1Y2Nlc3MgYXVkaW8uXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnN0cmVhbSAtIFRoZSBtZWRpYSBzdHJlYW0gY29udGFpbmluZyB0aGUgYXVkaW8gdHJhY2suXG4gKiBAcGFyYW0ge1N0cmVhbVN1Y2Nlc3NBdWRpb1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzZXR0aW5nIHVwIHRoZSBhdWRpbyBzdHJlYW0uXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgY29ubmVjdGlvbiBmb3IgcmVhbC10aW1lIGNvbW11bmljYXRpb24uXG4gKiBAcGFyYW0ge1BhcnRpY2lwYW50W119IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMgaW4gdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtIHwgbnVsbH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtIC0gVGhlIGxvY2FsIG1lZGlhIHN0cmVhbSB0aGF0IGluY2x1ZGVzIHZpZGVvIGFuZCBhdWRpbyB0cmFja3MuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy50cmFuc3BvcnRDcmVhdGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBhdWRpbyB0cmFuc3BvcnQgaGFzIGJlZW4gY3JlYXRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWRBdWRpbyAtIEluZGljYXRlcyBpZiB0aGUgYXVkaW8gdHJhbnNwb3J0IGhhcyBiZWVuIGNyZWF0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb0FscmVhZHlPbiAtIEluZGljYXRlcyBpZiB0aGUgYXVkaW8gaXMgYWxyZWFkeSBhY3RpdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5taWNBY3Rpb24gLSBJbmRpY2F0ZXMgdGhlIG1pY3JvcGhvbmUgYWN0aW9uIHN0YXRlLlxuICogQHBhcmFtIHtQcm9kdWNlck9wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb1BhcmFtcyAtIFRoZSBjdXJyZW50IGF1ZGlvIHBhcmFtZXRlcnMgZm9yIHRoZSBwcm9kdWNlci5cbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW0gfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1BdWRpbyAtIFRoZSBsb2NhbCBhdWRpbyBzdHJlYW0uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmRlZkF1ZGlvSUQgLSBUaGUgZGVmYXVsdCBhdWRpbyBkZXZpY2UgSUQgZm9yIHRoZSBzdHJlYW0uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIFRoZSB1c2VyIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICogQHBhcmFtIHtQcm9kdWNlck9wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycy5wYXJhbXMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBwcm9kdWNlci5cbiAqIEBwYXJhbSB7UHJvZHVjZXJPcHRpb25zfSBbb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUGFyYW1zZV0gLSBBZGRpdGlvbmFsIGF1ZGlvIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1Byb2R1Y2VyT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzLmFQYXJhbXMgLSBQcm9kdWNlciBwYXJhbWV0ZXJzIGZvciB0aGUgYXVkaW8uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIFRoZSBsYWJlbCBvZiB0aGUgaG9zdCBmb3IgdGhpcyBzZXNzaW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIHBhcnRpY2lwYW50J3MgbGV2ZWwgKGUuZy4sIGFkbWluLCByZWd1bGFyIHVzZXIpLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIG5hbWUgZm9yIGlkZW50aWZpY2F0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEluZGljYXRlcyBpZiB0aGUgbWFpbiB3aW5kb3cgbmVlZHMgdG8gYmUgdXBkYXRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkIGZvciBwYXJ0aWNpcGFudHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBjdXJyZW50bHkgc2hhcmVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIHN0cmVhbSBpcyBjdXJyZW50bHkgYWN0aXZlLlxuICogQHBhcmFtIHtTaG93QWxlcnR9IFtvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnQgbWVzc2FnZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUGFydGljaXBhbnRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBsaXN0IG9mIHBhcnRpY2lwYW50cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyB0cmFuc3BvcnQgY3JlYXRlZCBzdGF0dXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyB0cmFuc3BvcnQgY3JlYXRlZCBzdGF0dXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9BbHJlYWR5T24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIGFjdGl2ZSBzdGF0dXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWljQWN0aW9uIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtaWNyb3Bob25lIGFjdGlvbiBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBdWRpb1BhcmFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW8gcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgc3RyZWFtLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2FsU3RyZWFtQXVkaW8gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxvY2FsIGF1ZGlvIHN0cmVhbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVEZWZBdWRpb0lEIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBkZWZhdWx0IGF1ZGlvIGRldmljZSBJRC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHN0YXR1cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jcmVhdGVTZW5kVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gY3JlYXRlIGEgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gLSBGdW5jdGlvbiB0byBjb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvIC0gRnVuY3Rpb24gdG8gcmVzdW1lIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucHJlcG9wdWxhdGVVc2VyTWVkaWEgLSBGdW5jdGlvbiB0byBwcmVwb3B1bGF0ZSB1c2VyIG1lZGlhIGJhc2VkIG9uIGN1cnJlbnQgc2V0dGluZ3MuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGF1ZGlvIHN0cmVhbWluZyBzZXR1cCBpcyBjb21wbGV0ZS5cbiAqXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGR1cmluZyB0aGUgYXVkaW8gc3RyZWFtIHNldHVwLlxuICpcbiAqIEBleGFtcGxlXG4gKiBhd2FpdCBzdHJlYW1TdWNjZXNzQXVkaW8oe1xuICogICBzdHJlYW06IG5ld0F1ZGlvU3RyZWFtLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgc29ja2V0OiBzb2NrZXRJbnN0YW5jZSxcbiAqICAgICBwYXJ0aWNpcGFudHM6IHBhcnRpY2lwYW50TGlzdCxcbiAqICAgICAvLyBvdGhlciBwYXJhbWV0ZXJzLi4uXG4gKiAgIH0sXG4gKiB9KTtcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RyZWFtU3VjY2Vzc0F1ZGlvIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHN1Y2Nlc3NmdWwgc3RyZWFtaW5nIG9mIGF1ZGlvIGJ5IHNldHRpbmcgdXAgdGhlIG5lY2Vzc2FyeSB0cmFuc3BvcnRzIGFuZCB1cGRhdGluZyB0aGUgcmVsZXZhbnQgc3RhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzdHJlYW1pbmcgc3VjY2VzcyBhdWRpby5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5zdHJlYW0gLSBUaGUgbWVkaWEgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIGF1ZGlvIHRyYWNrLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHNldHRpbmcgdXAgdGhlIGF1ZGlvIHN0cmVhbS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy5zb2NrZXQgLSBUaGUgc29ja2V0IGNvbm5lY3Rpb24uXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbSAtIFRoZSBsb2NhbCBtZWRpYSBzdHJlYW0uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHRyYW5zcG9ydCBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy50cmFuc3BvcnRDcmVhdGVkQXVkaW8gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIGF1ZGlvIHRyYW5zcG9ydCBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb0FscmVhZHlPbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgYXVkaW8gaXMgYWxyZWFkeSBvbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubWljQWN0aW9uIC0gRmxhZyBpbmRpY2F0aW5nIHRoZSBtaWNyb3Bob25lIGFjdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb1BhcmFtcyAtIFRoZSBhdWRpbyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1BdWRpbyAtIFRoZSBsb2NhbCBhdWRpbyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZGVmQXVkaW9JRCAtIFRoZSBkZWZhdWx0IGF1ZGlvIGRldmljZSBJRC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy51c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgLSBUaGUgdXNlciBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy5wYXJhbXMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9QYXJhbXNlIC0gQWRkaXRpb25hbCBhdWRpbyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFQYXJhbXMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGF1ZGlvLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIFRoZSBsYWJlbCBvZiB0aGUgaG9zdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lbWJlciAtIFRoZSBtZW1iZXIgbmFtZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgbWFpbiB3aW5kb3cgc2hvdWxkIGJlIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvQWxyZWFkeU9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB2aWRlbyBpcyBhbHJlYWR5IG9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVBhcnRpY2lwYW50cyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRyYW5zcG9ydCBjcmVhdGVkIGZsYWcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW8gLSBGdW5jdGlvbiB0byB1cGRhdGUgYXVkaW8gdHJhbnNwb3J0IGNyZWF0ZWQgZmxhZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUF1ZGlvQWxyZWFkeU9uIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGF1ZGlvIGFscmVhZHkgb24gZmxhZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1pY0FjdGlvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBtaWNyb3Bob25lIGFjdGlvbiBmbGFnLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9QYXJhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgYXVkaW8gcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2FsU3RyZWFtIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGxvY2FsIHN0cmVhbS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2FsU3RyZWFtQXVkaW8gLSBGdW5jdGlvbiB0byB1cGRhdGUgbG9jYWwgYXVkaW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRGVmQXVkaW9JRCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBkZWZhdWx0IGF1ZGlvIGRldmljZSBJRC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB1c2VyIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBtYWluIHdpbmRvdyBmbGFnLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY3JlYXRlU2VuZFRyYW5zcG9ydCAtIEZ1bmN0aW9uIHRvIGNyZWF0ZSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gLSBGdW5jdGlvbiB0byBjb25uZWN0IHNlbmQgdHJhbnNwb3J0IGF1ZGlvLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvIC0gRnVuY3Rpb24gdG8gcmVzdW1lIHNlbmQgdHJhbnNwb3J0IGF1ZGlvLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucHJlcG9wdWxhdGVVc2VyTWVkaWEgLSBGdW5jdGlvbiB0byBwcmVwb3B1bGF0ZSB1c2VyIG1lZGlhLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXVkaW8gc3RyZWFtaW5nIHNldHVwIGlzIGNvbXBsZXRlLlxuICAgKi9cblxuICBhc3luYyBzdHJlYW1TdWNjZXNzQXVkaW8oeyBzdHJlYW0sIHBhcmFtZXRlcnMgfTogU3RyZWFtU3VjY2Vzc0F1ZGlvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB7XG4gICAgICBzb2NrZXQsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICBsb2NhbFN0cmVhbSxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkQXVkaW8sXG4gICAgICBhdWRpb0FscmVhZHlPbixcbiAgICAgIG1pY0FjdGlvbixcbiAgICAgIGF1ZGlvUGFyYW1zLFxuICAgICAgbG9jYWxTdHJlYW1BdWRpbyxcbiAgICAgIGRlZkF1ZGlvSUQsXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UsXG4gICAgICBwYXJhbXMsXG4gICAgICBhdWRpb1BhcmFtc2UsXG4gICAgICBhUGFyYW1zLFxuICAgICAgaG9zdExhYmVsLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIG1lbWJlcixcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICBsb2NrX3NjcmVlbixcbiAgICAgIHNoYXJlZCxcbiAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgc2hvd0FsZXJ0LFxuXG4gICAgICAvLyB1cGRhdGUgZnVuY3Rpb25zXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHMsXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkLFxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLFxuICAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T24sXG4gICAgICB1cGRhdGVNaWNBY3Rpb24sXG4gICAgICB1cGRhdGVBdWRpb1BhcmFtcyxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1BdWRpbyxcbiAgICAgIHVwZGF0ZURlZkF1ZGlvSUQsXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UsXG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuXG4gICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIGNyZWF0ZVNlbmRUcmFuc3BvcnQsXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgICAgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWEsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBsb2NhbFN0cmVhbUF1ZGlvID0gc3RyZWFtO1xuICAgIHVwZGF0ZUxvY2FsU3RyZWFtQXVkaW8obG9jYWxTdHJlYW1BdWRpbyk7XG5cbiAgICAvLyBBZGQgdGhlIGF1ZGlvIHN0cmVhbSB0cmFjayB0byB0aGUgbG9jYWxTdHJlYW1cbiAgICBpZiAobG9jYWxTdHJlYW0gPT0gbnVsbCkge1xuICAgICAgbG9jYWxTdHJlYW0gPSBuZXcgTWVkaWFTdHJlYW0oW2xvY2FsU3RyZWFtQXVkaW8uZ2V0QXVkaW9UcmFja3MoKVswXV0pO1xuICAgICAgdXBkYXRlTG9jYWxTdHJlYW0obG9jYWxTdHJlYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0cmVhbS5hZGRUcmFjayhsb2NhbFN0cmVhbUF1ZGlvLmdldEF1ZGlvVHJhY2tzKClbMF0pO1xuICAgICAgdXBkYXRlTG9jYWxTdHJlYW0obG9jYWxTdHJlYW0pO1xuICAgIH1cblxuICAgIGNvbnN0IGF1ZGlvVHJhY2tlZCA9IGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF07XG4gICAgZGVmQXVkaW9JRCA9IGF1ZGlvVHJhY2tlZC5nZXRTZXR0aW5ncygpLmRldmljZUlkIHx8ICcnO1xuICAgIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSA9IGRlZkF1ZGlvSUQ7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHN0YXRlIHZhcmlhYmxlc1xuICAgIHVwZGF0ZURlZkF1ZGlvSUQoZGVmQXVkaW9JRCk7XG4gICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSk7XG5cbiAgICB0cnkge1xuICAgICAgcGFyYW1zID0gYVBhcmFtcztcbiAgICAgIGF1ZGlvUGFyYW1zZSA9IHsgLi4ucGFyYW1zIH07XG5cbiAgICAgIGF1ZGlvUGFyYW1zID0geyB0cmFjazogbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXSwgLi4uYXVkaW9QYXJhbXNlIH07XG4gICAgICB1cGRhdGVBdWRpb1BhcmFtcyhhdWRpb1BhcmFtcyk7XG5cbiAgICAgIC8vIENyZWF0ZSB0cmFuc3BvcnQgaWYgbm90IGNyZWF0ZWQgZWxzZSBjb25uZWN0IHRyYW5zcG9ydFxuICAgICAgaWYgKCF0cmFuc3BvcnRDcmVhdGVkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgY3JlYXRlU2VuZFRyYW5zcG9ydCh7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIGF1ZGlvUGFyYW1zOiBhdWRpb1BhcmFtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRpb246ICdhdWRpbycsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgc2VuZCB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRyYW5zcG9ydENyZWF0ZWRBdWRpbykge1xuICAgICAgICAgIGF3YWl0IGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8oe1xuICAgICAgICAgICAgYXVkaW9QYXJhbXMsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0aGUgcGFydGljaXBhbnRzIGFycmF5IHRvIHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGF1ZGlvQWxyZWFkeU9uID0gdHJ1ZTtcbiAgICB1cGRhdGVBdWRpb0FscmVhZHlPbihhdWRpb0FscmVhZHlPbik7XG5cbiAgICBpZiAobWljQWN0aW9uKSB7XG4gICAgICBtaWNBY3Rpb24gPSBmYWxzZTtcbiAgICAgIHVwZGF0ZU1pY0FjdGlvbihtaWNBY3Rpb24pO1xuICAgIH1cblxuICAgIHBhcnRpY2lwYW50cy5mb3JFYWNoKChwYXJ0aWNpcGFudDogYW55KSA9PiB7XG4gICAgICBpZiAocGFydGljaXBhbnQuc29ja2V0SWQgPT0gc29ja2V0LmlkICYmIHBhcnRpY2lwYW50Lm5hbWUgPT0gbWVtYmVyKSB7XG4gICAgICAgIHBhcnRpY2lwYW50Lm11dGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdXBkYXRlUGFydGljaXBhbnRzKHBhcnRpY2lwYW50cyk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHRyYW5zcG9ydCBjcmVhdGVkIHN0YXRlXG4gICAgdHJhbnNwb3J0Q3JlYXRlZCA9IHRydWU7XG4gICAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvID0gdHJ1ZTtcbiAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkKHRyYW5zcG9ydENyZWF0ZWQpO1xuICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbyh0cmFuc3BvcnRDcmVhdGVkQXVkaW8pO1xuXG4gICAgLy8gUmV1cGRhdGUgc2NyZWVuIGRpc3BsYXkgaWYgaG9zdFxuICAgIGlmICh2aWRlb0FscmVhZHlPbiA9PSBmYWxzZSAmJiBpc2xldmVsID09ICcyJykge1xuICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhc2hhcmVkKSB7XG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19