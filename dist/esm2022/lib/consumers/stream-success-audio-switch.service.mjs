import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class StreamSuccessAudioSwitch {
    /**
     * Handles the switching of the audio stream upon successful stream connection.
     *
     * @param {Object} options - The options for the stream success audio switch.
     * @param {MediaStream} options.stream - The new media stream.
     * @param {Object} options.parameters - The parameters required for the audio switch.
     * @param {Producer} options.parameters.audioProducer - The current audio producer.
     * @param {Socket} options.parameters.socket - The socket connection.
     * @param {string} options.parameters.roomName - The name of the room.
     * @param {MediaStream} options.parameters.localStream - The local media stream.
     * @param {MediaStream} options.parameters.localStreamAudio - The local audio stream.
     * @param {Object} options.parameters.audioParams - The audio parameters.
     * @param {boolean} options.parameters.audioPaused - Indicates if the audio is paused.
     * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already on.
     * @param {boolean} options.parameters.transportCreated - Indicates if the transport is created.
     * @param {Object} options.parameters.audioParamse - Additional audio parameters.
     * @param {string} options.parameters.defAudioID - The default audio device ID.
     * @param {string} options.parameters.userDefaultAudioInputDevice - The user default audio input device.
     * @param {string} options.parameters.hostLabel - The host label.
     * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window should be updated.
     * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
     * @param {string} options.parameters.islevel - The participant's level.
     * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer.
     * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
     * @param {Function} options.parameters.updateAudioParams - Function to update the audio parameters.
     * @param {Function} options.parameters.updateDefAudioID - Function to update the default audio device ID.
     * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user default audio input device.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {Function} options.parameters.sleep - Function to pause execution for a specified time.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @param {Function} options.parameters.createSendTransport - Function to create a send transport.
     * @param {Function} options.parameters.connectSendTransportAudio - Function to connect the send transport for audio.
     *
     * @returns {Promise<void>} A promise that resolves when the audio switch is complete.
     */
    async streamSuccessAudioSwitch({ stream, parameters, }) {
        let { audioProducer, socket, roomName, localStream, localStreamAudio, audioParams, audioPaused, audioAlreadyOn, transportCreated, audioParamse, defAudioID, userDefaultAudioInputDevice, hostLabel, updateMainWindow, videoAlreadyOn, islevel, lock_screen, shared, updateAudioProducer, updateLocalStream, updateAudioParams, updateDefAudioID, updateUserDefaultAudioInputDevice, updateUpdateMainWindow, 
        // mediasfu functions
        sleep, prepopulateUserMedia, createSendTransport, connectSendTransportAudio, } = parameters;
        // Get the new default audio device ID
        let newDefAudioID = stream.getAudioTracks()[0].getSettings().deviceId;
        // Check if the audio device has changed
        if (newDefAudioID != defAudioID) {
            // Close the current audioProducer
            if (audioProducer) {
                audioProducer.close();
                updateAudioProducer(audioProducer);
            }
            // Emit a pauseProducerMedia event to pause the audio media
            socket.emit('pauseProducerMedia', { mediaTag: 'audio', roomName: roomName, force: true });
            // Update the localStreamAudio with the new audio tracks
            localStreamAudio = stream;
            // If localStream is null, create a new MediaStream with the new audio track
            if (localStream == null) {
                localStream = new MediaStream([localStreamAudio.getAudioTracks()[0]]);
            }
            else {
                // Remove all existing audio tracks from localStream and add the new audio track
                localStream.getAudioTracks().forEach((track) => {
                    localStream?.removeTrack(track);
                });
                localStream.addTrack(localStreamAudio.getAudioTracks()[0]);
            }
            // Update localStream
            updateLocalStream(localStream);
            // Get the new default audio device ID from the new audio track
            const audioTracked = localStream.getAudioTracks()[0];
            defAudioID = audioTracked.getSettings().deviceId ?? '';
            updateDefAudioID(defAudioID);
            // Update userDefaultAudioInputDevice
            userDefaultAudioInputDevice = defAudioID;
            updateUserDefaultAudioInputDevice(userDefaultAudioInputDevice);
            // Update audioParams with the new audio track
            audioParams = { track: localStream.getAudioTracks()[0], ...audioParamse };
            updateAudioParams(audioParams);
            // Sleep for 500 milliseconds
            await sleep({ ms: 500 });
            // Create a new send transport if not created, otherwise, connect the existing transport
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
                await connectSendTransportAudio({
                    audioParams,
                    parameters,
                });
            }
            // If audio is paused and not already on, pause the audioProducer and emit a pauseProducerMedia event
            if (audioPaused && !audioAlreadyOn) {
                audioProducer?.pause();
                updateAudioProducer(audioProducer);
                socket.emit('pauseProducerMedia', { mediaTag: 'audio', roomName: roomName });
            }
        }
        // Update the UI based on the participant's level and screen lock status
        if (!videoAlreadyOn && islevel === '2') {
            if (!lock_screen && !shared) {
                // Set updateMainWindow to true, prepopulate user media, and set updateMainWindow back to false
                updateMainWindow = true;
                updateUpdateMainWindow(updateMainWindow);
                await prepopulateUserMedia({ name: hostLabel, parameters });
                updateMainWindow = false;
                updateUpdateMainWindow(updateMainWindow);
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessAudioSwitch, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessAudioSwitch, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessAudioSwitch, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXN1Y2Nlc3MtYXVkaW8tc3dpdGNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLWF1ZGlvLXN3aXRjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBeUUzQyxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQ0c7SUFFSCxLQUFLLENBQUMsd0JBQXdCLENBQUMsRUFDN0IsTUFBTSxFQUNOLFVBQVUsR0FDc0I7UUFDaEMsSUFBSSxFQUNGLGFBQWEsRUFDYixNQUFNLEVBQ04sUUFBUSxFQUNSLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFdBQVcsRUFDWCxjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixVQUFVLEVBQ1YsMkJBQTJCLEVBQzNCLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLE9BQU8sRUFDUCxXQUFXLEVBQ1gsTUFBTSxFQUNOLG1CQUFtQixFQUNuQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixpQ0FBaUMsRUFDakMsc0JBQXNCO1FBRXRCLHFCQUFxQjtRQUNyQixLQUFLLEVBQ0wsb0JBQW9CLEVBQ3BCLG1CQUFtQixFQUNuQix5QkFBeUIsR0FDMUIsR0FBRyxVQUFVLENBQUM7UUFFZixzQ0FBc0M7UUFDdEMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUV0RSx3Q0FBd0M7UUFDeEMsSUFBSSxhQUFhLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEMsa0NBQWtD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LE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzVCLCtGQUErRjtnQkFDL0YsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0MsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO3VHQWxLVSx3QkFBd0I7MkdBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjZXIsIFByb2R1Y2VyQ29kZWNPcHRpb25zLCBQcm9kdWNlck9wdGlvbnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7XG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlLFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGUsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvVHlwZSxcbiAgU2xlZXBUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG4vKipcbiAqIEhhbmRsZXMgdGhlIHN1Y2Nlc3Mgb2Ygc3dpdGNoaW5nIGF1ZGlvIGRldmljZXMgaW4gYSBzdHJlYW1pbmcgY29udGV4dC5cbiAqIEBhc3luY1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIG5lY2Vzc2FyeSB2YXJpYWJsZXMuXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBzdHJlYW0gLSBUaGUgbmV3IE1lZGlhU3RyZWFtIHdpdGggdGhlIHN3aXRjaGVkIGF1ZGlvIGRldmljZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICAgIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICAgIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzIHtcbiAgYXVkaW9Qcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgbG9jYWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgbG9jYWxTdHJlYW1BdWRpbzogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBhdWRpb1BhcmFtczogUHJvZHVjZXJPcHRpb25zO1xuICBhdWRpb1BhdXNlZDogYm9vbGVhbjtcbiAgYXVkaW9BbHJlYWR5T246IGJvb2xlYW47XG4gIHRyYW5zcG9ydENyZWF0ZWQ6IGJvb2xlYW47XG4gIGF1ZGlvUGFyYW1zZT86IFByb2R1Y2VyQ29kZWNPcHRpb25zO1xuICBkZWZBdWRpb0lEOiBzdHJpbmc7XG4gIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogc3RyaW5nO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgdmlkZW9BbHJlYWR5T246IGJvb2xlYW47XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcblxuICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiAoYXVkaW9Qcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVMb2NhbFN0cmVhbTogKGxvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZGlvUGFyYW1zOiAoYXVkaW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucykgPT4gdm9pZDtcbiAgdXBkYXRlRGVmQXVkaW9JRDogKGRlZkF1ZGlvSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiAodXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh1cGRhdGVNYWluV2luZG93OiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzbGVlcDogU2xlZXBUeXBlO1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZTtcbiAgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gU3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaE9wdGlvbnMge1xuICBzdHJlYW06IE1lZGlhU3RyZWFtO1xuICBwYXJhbWV0ZXJzOiBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hUeXBlID0gKFxuICBvcHRpb25zOiBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hPcHRpb25zLFxuKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHN3aXRjaGluZyBvZiB0aGUgYXVkaW8gc3RyZWFtIHVwb24gc3VjY2Vzc2Z1bCBzdHJlYW0gY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIHN0cmVhbSBzdWNjZXNzIGF1ZGlvIHN3aXRjaC5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5zdHJlYW0gLSBUaGUgbmV3IG1lZGlhIHN0cmVhbS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciB0aGUgYXVkaW8gc3dpdGNoLlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyfSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Qcm9kdWNlciAtIFRoZSBjdXJyZW50IGF1ZGlvIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgY29ubmVjdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW0gLSBUaGUgbG9jYWwgbWVkaWEgc3RyZWFtLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1BdWRpbyAtIFRoZSBsb2NhbCBhdWRpbyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9QYXJhbXMgLSBUaGUgYXVkaW8gcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9QYXVzZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIGF1ZGlvIGlzIHBhdXNlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIGF1ZGlvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHRyYW5zcG9ydCBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUGFyYW1zZSAtIEFkZGl0aW9uYWwgYXVkaW8gcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5kZWZBdWRpb0lEIC0gVGhlIGRlZmF1bHQgYXVkaW8gZGV2aWNlIElELlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIFRoZSB1c2VyIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIFRoZSBob3N0IGxhYmVsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gSW5kaWNhdGVzIGlmIHRoZSBtYWluIHdpbmRvdyBzaG91bGQgYmUgdXBkYXRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBwYXJ0aWNpcGFudCdzIGxldmVsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5sb2NrX3NjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGxvY2tlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgc2hhcmVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9Qcm9kdWNlciAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW8gcHJvZHVjZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9QYXJhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVEZWZBdWRpb0lEIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBkZWZhdWx0IGF1ZGlvIGRldmljZSBJRC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdXNlciBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBGdW5jdGlvbiB0byBwYXVzZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIHRpbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jcmVhdGVTZW5kVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gY3JlYXRlIGEgc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIC0gRnVuY3Rpb24gdG8gY29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXVkaW8gc3dpdGNoIGlzIGNvbXBsZXRlLlxuICAgKi9cblxuICBhc3luYyBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2goe1xuICAgIHN0cmVhbSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHtcbiAgICAgIGF1ZGlvUHJvZHVjZXIsXG4gICAgICBzb2NrZXQsXG4gICAgICByb29tTmFtZSxcbiAgICAgIGxvY2FsU3RyZWFtLFxuICAgICAgbG9jYWxTdHJlYW1BdWRpbyxcbiAgICAgIGF1ZGlvUGFyYW1zLFxuICAgICAgYXVkaW9QYXVzZWQsXG4gICAgICBhdWRpb0FscmVhZHlPbixcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICBhdWRpb1BhcmFtc2UsXG4gICAgICBkZWZBdWRpb0lELFxuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLFxuICAgICAgaG9zdExhYmVsLFxuICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgc2hhcmVkLFxuICAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcixcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtLFxuICAgICAgdXBkYXRlQXVkaW9QYXJhbXMsXG4gICAgICB1cGRhdGVEZWZBdWRpb0lELFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcblxuICAgICAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICBzbGVlcCxcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgY3JlYXRlU2VuZFRyYW5zcG9ydCxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBHZXQgdGhlIG5ldyBkZWZhdWx0IGF1ZGlvIGRldmljZSBJRFxuICAgIGxldCBuZXdEZWZBdWRpb0lEID0gc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS5kZXZpY2VJZDtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBhdWRpbyBkZXZpY2UgaGFzIGNoYW5nZWRcbiAgICBpZiAobmV3RGVmQXVkaW9JRCAhPSBkZWZBdWRpb0lEKSB7XG4gICAgICAvLyBDbG9zZSB0aGUgY3VycmVudCBhdWRpb1Byb2R1Y2VyXG4gICAgICBpZiAoYXVkaW9Qcm9kdWNlcikge1xuICAgICAgICBhdWRpb1Byb2R1Y2VyLmNsb3NlKCk7XG4gICAgICAgIHVwZGF0ZUF1ZGlvUHJvZHVjZXIoYXVkaW9Qcm9kdWNlcik7XG4gICAgICB9XG5cbiAgICAgIC8vIEVtaXQgYSBwYXVzZVByb2R1Y2VyTWVkaWEgZXZlbnQgdG8gcGF1c2UgdGhlIGF1ZGlvIG1lZGlhXG4gICAgICBzb2NrZXQuZW1pdCgncGF1c2VQcm9kdWNlck1lZGlhJywgeyBtZWRpYVRhZzogJ2F1ZGlvJywgcm9vbU5hbWU6IHJvb21OYW1lLCBmb3JjZTogdHJ1ZSB9KTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBsb2NhbFN0cmVhbUF1ZGlvIHdpdGggdGhlIG5ldyBhdWRpbyB0cmFja3NcbiAgICAgIGxvY2FsU3RyZWFtQXVkaW8gPSBzdHJlYW07XG5cbiAgICAgIC8vIElmIGxvY2FsU3RyZWFtIGlzIG51bGwsIGNyZWF0ZSBhIG5ldyBNZWRpYVN0cmVhbSB3aXRoIHRoZSBuZXcgYXVkaW8gdHJhY2tcbiAgICAgIGlmIChsb2NhbFN0cmVhbSA9PSBudWxsKSB7XG4gICAgICAgIGxvY2FsU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKFtsb2NhbFN0cmVhbUF1ZGlvLmdldEF1ZGlvVHJhY2tzKClbMF1dKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXhpc3RpbmcgYXVkaW8gdHJhY2tzIGZyb20gbG9jYWxTdHJlYW0gYW5kIGFkZCB0aGUgbmV3IGF1ZGlvIHRyYWNrXG4gICAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkuZm9yRWFjaCgodHJhY2s6IE1lZGlhU3RyZWFtVHJhY2spID0+IHtcbiAgICAgICAgICBsb2NhbFN0cmVhbT8ucmVtb3ZlVHJhY2sodHJhY2spO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxTdHJlYW0uYWRkVHJhY2sobG9jYWxTdHJlYW1BdWRpby5nZXRBdWRpb1RyYWNrcygpWzBdKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGxvY2FsU3RyZWFtXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG5cbiAgICAgIC8vIEdldCB0aGUgbmV3IGRlZmF1bHQgYXVkaW8gZGV2aWNlIElEIGZyb20gdGhlIG5ldyBhdWRpbyB0cmFja1xuICAgICAgY29uc3QgYXVkaW9UcmFja2VkID0gbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXTtcbiAgICAgIGRlZkF1ZGlvSUQgPSBhdWRpb1RyYWNrZWQuZ2V0U2V0dGluZ3MoKS5kZXZpY2VJZCA/PyAnJztcbiAgICAgIHVwZGF0ZURlZkF1ZGlvSUQoZGVmQXVkaW9JRCk7XG5cbiAgICAgIC8vIFVwZGF0ZSB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2VcbiAgICAgIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSA9IGRlZkF1ZGlvSUQ7XG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UodXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKTtcblxuICAgICAgLy8gVXBkYXRlIGF1ZGlvUGFyYW1zIHdpdGggdGhlIG5ldyBhdWRpbyB0cmFja1xuICAgICAgYXVkaW9QYXJhbXMgPSB7IHRyYWNrOiBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLCAuLi5hdWRpb1BhcmFtc2UgfTtcbiAgICAgIHVwZGF0ZUF1ZGlvUGFyYW1zKGF1ZGlvUGFyYW1zKTtcblxuICAgICAgLy8gU2xlZXAgZm9yIDUwMCBtaWxsaXNlY29uZHNcbiAgICAgIGF3YWl0IHNsZWVwKHsgbXM6IDUwMCB9KTtcblxuICAgICAgLy8gQ3JlYXRlIGEgbmV3IHNlbmQgdHJhbnNwb3J0IGlmIG5vdCBjcmVhdGVkLCBvdGhlcndpc2UsIGNvbm5lY3QgdGhlIGV4aXN0aW5nIHRyYW5zcG9ydFxuICAgICAgaWYgKCF0cmFuc3BvcnRDcmVhdGVkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgY3JlYXRlU2VuZFRyYW5zcG9ydCh7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIGF1ZGlvUGFyYW1zOiBhdWRpb1BhcmFtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRpb246ICdhdWRpbycsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgc2VuZCB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvKHtcbiAgICAgICAgICBhdWRpb1BhcmFtcyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYXVkaW8gaXMgcGF1c2VkIGFuZCBub3QgYWxyZWFkeSBvbiwgcGF1c2UgdGhlIGF1ZGlvUHJvZHVjZXIgYW5kIGVtaXQgYSBwYXVzZVByb2R1Y2VyTWVkaWEgZXZlbnRcbiAgICAgIGlmIChhdWRpb1BhdXNlZCAmJiAhYXVkaW9BbHJlYWR5T24pIHtcbiAgICAgICAgYXVkaW9Qcm9kdWNlcj8ucGF1c2UoKTtcbiAgICAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcihhdWRpb1Byb2R1Y2VyKTtcbiAgICAgICAgc29ja2V0LmVtaXQoJ3BhdXNlUHJvZHVjZXJNZWRpYScsIHsgbWVkaWFUYWc6ICdhdWRpbycsIHJvb21OYW1lOiByb29tTmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIFVJIGJhc2VkIG9uIHRoZSBwYXJ0aWNpcGFudCdzIGxldmVsIGFuZCBzY3JlZW4gbG9jayBzdGF0dXNcbiAgICBpZiAoIXZpZGVvQWxyZWFkeU9uICYmIGlzbGV2ZWwgPT09ICcyJykge1xuICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhc2hhcmVkKSB7XG4gICAgICAgIC8vIFNldCB1cGRhdGVNYWluV2luZG93IHRvIHRydWUsIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEsIGFuZCBzZXQgdXBkYXRlTWFpbldpbmRvdyBiYWNrIHRvIGZhbHNlXG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19