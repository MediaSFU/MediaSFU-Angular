import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the switching of the audio stream upon successful stream connection.
 *
 * This method updates the audio producer, manages the transport connections,
 * and ensures that the UI reflects the current audio state after switching devices.
 *
 * @param {StreamSuccessAudioSwitchOptions} options - The options for the stream success audio switch.
 * @param {MediaStream} options.stream - The new media stream with the switched audio device.
 * @param {Object} options.parameters - The parameters required for the audio switch.
 * @param {Producer | null} options.parameters.audioProducer - The current audio producer.
 * @param {Socket} options.parameters.socket - The socket connection.
 * @param {string} options.parameters.roomName - The name of the room for the connection.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream.
 * @param {MediaStream | null} options.parameters.localStreamAudio - The local audio stream.
 * @param {ProducerOptions} options.parameters.audioParams - The audio parameters for the producer.
 * @param {boolean} options.parameters.audioPaused - Indicates if the audio is currently paused.
 * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio was already active.
 * @param {boolean} options.parameters.transportCreated - Indicates if the transport has been created.
 * @param {ProducerCodecOptions} [options.parameters.audioParamse] - Additional audio parameters.
 * @param {string} options.parameters.defAudioID - The default audio device ID.
 * @param {string} options.parameters.userDefaultAudioInputDevice - The user default audio input device.
 * @param {string} options.parameters.hostLabel - The label of the host for the session.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window needs to be updated.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video stream is active.
 * @param {string} options.parameters.islevel - The level of the user in the session.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer state.
 * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
 * @param {Function} options.parameters.updateAudioParams - Function to update the audio parameters.
 * @param {Function} options.parameters.updateDefAudioID - Function to update the default audio device ID.
 * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user default audio input device.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {Function} options.parameters.sleep - Function to pause execution for a specified time.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for audio.
 * @param {Function} options.parameters.connectSendTransportAudio - Function to connect the send transport for audio.
 *
 * @returns {Promise<void>} A promise that resolves when the audio switch is complete.
 *
 * @throws {Error} Throws an error if there is an issue during the audio stream switch process.
 *
 * @example
 * await streamSuccessAudioSwitch({
 *   stream: newStream,
 *   parameters: {
 *     audioProducer: currentAudioProducer,
 *     socket: socketInstance,
 *     roomName: 'exampleRoom',
 *     // other parameters...
 *   },
 * });
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXN1Y2Nlc3MtYXVkaW8tc3dpdGNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLWF1ZGlvLXN3aXRjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBc0UzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9ERztBQU1ILE1BQU0sT0FBTyx3QkFBd0I7SUFDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9DRztJQUVILEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxFQUM3QixNQUFNLEVBQ04sVUFBVSxHQUNzQjtRQUNoQyxJQUFJLEVBQ0YsYUFBYSxFQUNiLE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsV0FBVyxFQUNYLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLFVBQVUsRUFDViwyQkFBMkIsRUFDM0IsU0FBUyxFQUNULGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsT0FBTyxFQUNQLFdBQVcsRUFDWCxNQUFNLEVBQ04sbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGlDQUFpQyxFQUNqQyxzQkFBc0I7UUFFdEIscUJBQXFCO1FBQ3JCLEtBQUssRUFDTCxvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLHlCQUF5QixHQUMxQixHQUFHLFVBQVUsQ0FBQztRQUVmLHNDQUFzQztRQUN0QyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFD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QUFDO1lBQy9FLENBQUM7UUFDSCxDQUFDO1FBRUQsd0VBQXdFO1FBQ3hFLElBQUksQ0FBQyxjQUFjLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDNUIsK0ZBQStGO2dCQUMvRixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzVELGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQkFDekIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7dUdBbEtVLHdCQUF3QjsyR0FBeEIsd0JBQXdCLGNBRnZCLE1BQU07OzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9kdWNlciwgUHJvZHVjZXJDb2RlY09wdGlvbnMsIFByb2R1Y2VyT3B0aW9ucyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZSxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlLFxuICBTbGVlcFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgc3VjY2VzcyBvZiBzd2l0Y2hpbmcgYXVkaW8gZGV2aWNlcyBpbiBhIHN0cmVhbWluZyBjb250ZXh0LlxuICogQGFzeW5jXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0IGNvbnRhaW5pbmcgbmVjZXNzYXJ5IHZhcmlhYmxlcy5cbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IHN0cmVhbSAtIFRoZSBuZXcgTWVkaWFTdHJlYW0gd2l0aCB0aGUgc3dpdGNoZWQgYXVkaW8gZGV2aWNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gICAgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMge1xuICBhdWRpb1Byb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG4gIHNvY2tldDogU29ja2V0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICBsb2NhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBsb2NhbFN0cmVhbUF1ZGlvOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIGF1ZGlvUGFyYW1zOiBQcm9kdWNlck9wdGlvbnM7XG4gIGF1ZGlvUGF1c2VkOiBib29sZWFuO1xuICBhdWRpb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgdHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbjtcbiAgYXVkaW9QYXJhbXNlPzogUHJvZHVjZXJDb2RlY09wdGlvbnM7XG4gIGRlZkF1ZGlvSUQ6IHN0cmluZztcbiAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIGhvc3RMYWJlbDogc3RyaW5nO1xuICB1cGRhdGVNYWluV2luZG93OiBib29sZWFuO1xuICB2aWRlb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBsb2NrX3NjcmVlbjogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xuXG4gIHVwZGF0ZUF1ZGlvUHJvZHVjZXI6IChhdWRpb1Byb2R1Y2VyOiBQcm9kdWNlciB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtOiAobG9jYWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlQXVkaW9QYXJhbXM6IChhdWRpb1BhcmFtczogUHJvZHVjZXJPcHRpb25zKSA9PiB2b2lkO1xuICB1cGRhdGVEZWZBdWRpb0lEOiAoZGVmQXVkaW9JRDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6ICh1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHNsZWVwOiBTbGVlcFR5cGU7XG4gIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGU7XG4gIGNyZWF0ZVNlbmRUcmFuc3BvcnQ6IENyZWF0ZVNlbmRUcmFuc3BvcnRUeXBlO1xuICBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoT3B0aW9ucyB7XG4gIHN0cmVhbTogTWVkaWFTdHJlYW07XG4gIHBhcmFtZXRlcnM6IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaFR5cGUgPSAoXG4gIG9wdGlvbnM6IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaE9wdGlvbnMsXG4pID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgc3dpdGNoaW5nIG9mIHRoZSBhdWRpbyBzdHJlYW0gdXBvbiBzdWNjZXNzZnVsIHN0cmVhbSBjb25uZWN0aW9uLlxuICpcbiAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgdGhlIGF1ZGlvIHByb2R1Y2VyLCBtYW5hZ2VzIHRoZSB0cmFuc3BvcnQgY29ubmVjdGlvbnMsXG4gKiBhbmQgZW5zdXJlcyB0aGF0IHRoZSBVSSByZWZsZWN0cyB0aGUgY3VycmVudCBhdWRpbyBzdGF0ZSBhZnRlciBzd2l0Y2hpbmcgZGV2aWNlcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIHN0cmVhbSBzdWNjZXNzIGF1ZGlvIHN3aXRjaC5cbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMuc3RyZWFtIC0gVGhlIG5ldyBtZWRpYSBzdHJlYW0gd2l0aCB0aGUgc3dpdGNoZWQgYXVkaW8gZGV2aWNlLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciB0aGUgYXVkaW8gc3dpdGNoLlxuICogQHBhcmFtIHtQcm9kdWNlciB8IG51bGx9IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb1Byb2R1Y2VyIC0gVGhlIGN1cnJlbnQgYXVkaW8gcHJvZHVjZXIuXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgY29ubmVjdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSBmb3IgdGhlIGNvbm5lY3Rpb24uXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtIHwgbnVsbH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtIC0gVGhlIGxvY2FsIG1lZGlhIHN0cmVhbS5cbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW0gfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1BdWRpbyAtIFRoZSBsb2NhbCBhdWRpbyBzdHJlYW0uXG4gKiBAcGFyYW0ge1Byb2R1Y2VyT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUGFyYW1zIC0gVGhlIGF1ZGlvIHBhcmFtZXRlcnMgZm9yIHRoZSBwcm9kdWNlci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUGF1c2VkIC0gSW5kaWNhdGVzIGlmIHRoZSBhdWRpbyBpcyBjdXJyZW50bHkgcGF1c2VkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIGF1ZGlvIHdhcyBhbHJlYWR5IGFjdGl2ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHRyYW5zcG9ydCBoYXMgYmVlbiBjcmVhdGVkLlxuICogQHBhcmFtIHtQcm9kdWNlckNvZGVjT3B0aW9uc30gW29wdGlvbnMucGFyYW1ldGVycy5hdWRpb1BhcmFtc2VdIC0gQWRkaXRpb25hbCBhdWRpbyBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5kZWZBdWRpb0lEIC0gVGhlIGRlZmF1bHQgYXVkaW8gZGV2aWNlIElELlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy51c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgLSBUaGUgdXNlciBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIG9mIHRoZSBob3N0IGZvciB0aGUgc2Vzc2lvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5XaW5kb3cgLSBJbmRpY2F0ZXMgaWYgdGhlIG1haW4gd2luZG93IG5lZWRzIHRvIGJlIHVwZGF0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb0FscmVhZHlPbiAtIEluZGljYXRlcyBpZiB0aGUgdmlkZW8gc3RyZWFtIGlzIGFjdGl2ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgdXNlciBpbiB0aGUgc2Vzc2lvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgc2hhcmVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUF1ZGlvUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIHByb2R1Y2VyIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2FsU3RyZWFtIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBsb2NhbCBzdHJlYW0uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9QYXJhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRGVmQXVkaW9JRCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZGVmYXVsdCBhdWRpbyBkZXZpY2UgSUQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB1c2VyIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNsZWVwIC0gRnVuY3Rpb24gdG8gcGF1c2UgZXhlY3V0aW9uIGZvciBhIHNwZWNpZmllZCB0aW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXBvcHVsYXRlVXNlck1lZGlhIC0gRnVuY3Rpb24gdG8gcHJlcG9wdWxhdGUgdXNlciBtZWRpYS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jcmVhdGVTZW5kVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gY3JlYXRlIGEgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gLSBGdW5jdGlvbiB0byBjb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8uXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGF1ZGlvIHN3aXRjaCBpcyBjb21wbGV0ZS5cbiAqXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGR1cmluZyB0aGUgYXVkaW8gc3RyZWFtIHN3aXRjaCBwcm9jZXNzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBhd2FpdCBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2goe1xuICogICBzdHJlYW06IG5ld1N0cmVhbSxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIGF1ZGlvUHJvZHVjZXI6IGN1cnJlbnRBdWRpb1Byb2R1Y2VyLFxuICogICAgIHNvY2tldDogc29ja2V0SW5zdGFuY2UsXG4gKiAgICAgcm9vbU5hbWU6ICdleGFtcGxlUm9vbScsXG4gKiAgICAgLy8gb3RoZXIgcGFyYW1ldGVycy4uLlxuICogICB9LFxuICogfSk7XG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHN3aXRjaGluZyBvZiB0aGUgYXVkaW8gc3RyZWFtIHVwb24gc3VjY2Vzc2Z1bCBzdHJlYW0gY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIHN0cmVhbSBzdWNjZXNzIGF1ZGlvIHN3aXRjaC5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5zdHJlYW0gLSBUaGUgbmV3IG1lZGlhIHN0cmVhbS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciB0aGUgYXVkaW8gc3dpdGNoLlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyfSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Qcm9kdWNlciAtIFRoZSBjdXJyZW50IGF1ZGlvIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgY29ubmVjdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW0gLSBUaGUgbG9jYWwgbWVkaWEgc3RyZWFtLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1BdWRpbyAtIFRoZSBsb2NhbCBhdWRpbyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9QYXJhbXMgLSBUaGUgYXVkaW8gcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9QYXVzZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIGF1ZGlvIGlzIHBhdXNlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIGF1ZGlvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHRyYW5zcG9ydCBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUGFyYW1zZSAtIEFkZGl0aW9uYWwgYXVkaW8gcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5kZWZBdWRpb0lEIC0gVGhlIGRlZmF1bHQgYXVkaW8gZGV2aWNlIElELlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIFRoZSB1c2VyIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIFRoZSBob3N0IGxhYmVsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gSW5kaWNhdGVzIGlmIHRoZSBtYWluIHdpbmRvdyBzaG91bGQgYmUgdXBkYXRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBwYXJ0aWNpcGFudCdzIGxldmVsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5sb2NrX3NjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGxvY2tlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgc2hhcmVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9Qcm9kdWNlciAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW8gcHJvZHVjZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9QYXJhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVEZWZBdWRpb0lEIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBkZWZhdWx0IGF1ZGlvIGRldmljZSBJRC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdXNlciBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBGdW5jdGlvbiB0byBwYXVzZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIHRpbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jcmVhdGVTZW5kVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gY3JlYXRlIGEgc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIC0gRnVuY3Rpb24gdG8gY29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXVkaW8gc3dpdGNoIGlzIGNvbXBsZXRlLlxuICAgKi9cblxuICBhc3luYyBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2goe1xuICAgIHN0cmVhbSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHtcbiAgICAgIGF1ZGlvUHJvZHVjZXIsXG4gICAgICBzb2NrZXQsXG4gICAgICByb29tTmFtZSxcbiAgICAgIGxvY2FsU3RyZWFtLFxuICAgICAgbG9jYWxTdHJlYW1BdWRpbyxcbiAgICAgIGF1ZGlvUGFyYW1zLFxuICAgICAgYXVkaW9QYXVzZWQsXG4gICAgICBhdWRpb0FscmVhZHlPbixcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICBhdWRpb1BhcmFtc2UsXG4gICAgICBkZWZBdWRpb0lELFxuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLFxuICAgICAgaG9zdExhYmVsLFxuICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgc2hhcmVkLFxuICAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcixcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtLFxuICAgICAgdXBkYXRlQXVkaW9QYXJhbXMsXG4gICAgICB1cGRhdGVEZWZBdWRpb0lELFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcblxuICAgICAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICBzbGVlcCxcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgY3JlYXRlU2VuZFRyYW5zcG9ydCxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBHZXQgdGhlIG5ldyBkZWZhdWx0IGF1ZGlvIGRldmljZSBJRFxuICAgIGxldCBuZXdEZWZBdWRpb0lEID0gc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS5kZXZpY2VJZDtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBhdWRpbyBkZXZpY2UgaGFzIGNoYW5nZWRcbiAgICBpZiAobmV3RGVmQXVkaW9JRCAhPSBkZWZBdWRpb0lEKSB7XG4gICAgICAvLyBDbG9zZSB0aGUgY3VycmVudCBhdWRpb1Byb2R1Y2VyXG4gICAgICBpZiAoYXVkaW9Qcm9kdWNlcikge1xuICAgICAgICBhdWRpb1Byb2R1Y2VyLmNsb3NlKCk7XG4gICAgICAgIHVwZGF0ZUF1ZGlvUHJvZHVjZXIoYXVkaW9Qcm9kdWNlcik7XG4gICAgICB9XG5cbiAgICAgIC8vIEVtaXQgYSBwYXVzZVByb2R1Y2VyTWVkaWEgZXZlbnQgdG8gcGF1c2UgdGhlIGF1ZGlvIG1lZGlhXG4gICAgICBzb2NrZXQuZW1pdCgncGF1c2VQcm9kdWNlck1lZGlhJywgeyBtZWRpYVRhZzogJ2F1ZGlvJywgcm9vbU5hbWU6IHJvb21OYW1lLCBmb3JjZTogdHJ1ZSB9KTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBsb2NhbFN0cmVhbUF1ZGlvIHdpdGggdGhlIG5ldyBhdWRpbyB0cmFja3NcbiAgICAgIGxvY2FsU3RyZWFtQXVkaW8gPSBzdHJlYW07XG5cbiAgICAgIC8vIElmIGxvY2FsU3RyZWFtIGlzIG51bGwsIGNyZWF0ZSBhIG5ldyBNZWRpYVN0cmVhbSB3aXRoIHRoZSBuZXcgYXVkaW8gdHJhY2tcbiAgICAgIGlmIChsb2NhbFN0cmVhbSA9PSBudWxsKSB7XG4gICAgICAgIGxvY2FsU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKFtsb2NhbFN0cmVhbUF1ZGlvLmdldEF1ZGlvVHJhY2tzKClbMF1dKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXhpc3RpbmcgYXVkaW8gdHJhY2tzIGZyb20gbG9jYWxTdHJlYW0gYW5kIGFkZCB0aGUgbmV3IGF1ZGlvIHRyYWNrXG4gICAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkuZm9yRWFjaCgodHJhY2s6IE1lZGlhU3RyZWFtVHJhY2spID0+IHtcbiAgICAgICAgICBsb2NhbFN0cmVhbT8ucmVtb3ZlVHJhY2sodHJhY2spO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxTdHJlYW0uYWRkVHJhY2sobG9jYWxTdHJlYW1BdWRpby5nZXRBdWRpb1RyYWNrcygpWzBdKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGxvY2FsU3RyZWFtXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG5cbiAgICAgIC8vIEdldCB0aGUgbmV3IGRlZmF1bHQgYXVkaW8gZGV2aWNlIElEIGZyb20gdGhlIG5ldyBhdWRpbyB0cmFja1xuICAgICAgY29uc3QgYXVkaW9UcmFja2VkID0gbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXTtcbiAgICAgIGRlZkF1ZGlvSUQgPSBhdWRpb1RyYWNrZWQuZ2V0U2V0dGluZ3MoKS5kZXZpY2VJZCA/PyAnJztcbiAgICAgIHVwZGF0ZURlZkF1ZGlvSUQoZGVmQXVkaW9JRCk7XG5cbiAgICAgIC8vIFVwZGF0ZSB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2VcbiAgICAgIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSA9IGRlZkF1ZGlvSUQ7XG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UodXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKTtcblxuICAgICAgLy8gVXBkYXRlIGF1ZGlvUGFyYW1zIHdpdGggdGhlIG5ldyBhdWRpbyB0cmFja1xuICAgICAgYXVkaW9QYXJhbXMgPSB7IHRyYWNrOiBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLCAuLi5hdWRpb1BhcmFtc2UgfTtcbiAgICAgIHVwZGF0ZUF1ZGlvUGFyYW1zKGF1ZGlvUGFyYW1zKTtcblxuICAgICAgLy8gU2xlZXAgZm9yIDUwMCBtaWxsaXNlY29uZHNcbiAgICAgIGF3YWl0IHNsZWVwKHsgbXM6IDUwMCB9KTtcblxuICAgICAgLy8gQ3JlYXRlIGEgbmV3IHNlbmQgdHJhbnNwb3J0IGlmIG5vdCBjcmVhdGVkLCBvdGhlcndpc2UsIGNvbm5lY3QgdGhlIGV4aXN0aW5nIHRyYW5zcG9ydFxuICAgICAgaWYgKCF0cmFuc3BvcnRDcmVhdGVkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgY3JlYXRlU2VuZFRyYW5zcG9ydCh7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIGF1ZGlvUGFyYW1zOiBhdWRpb1BhcmFtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRpb246ICdhdWRpbycsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgc2VuZCB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvKHtcbiAgICAgICAgICBhdWRpb1BhcmFtcyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYXVkaW8gaXMgcGF1c2VkIGFuZCBub3QgYWxyZWFkeSBvbiwgcGF1c2UgdGhlIGF1ZGlvUHJvZHVjZXIgYW5kIGVtaXQgYSBwYXVzZVByb2R1Y2VyTWVkaWEgZXZlbnRcbiAgICAgIGlmIChhdWRpb1BhdXNlZCAmJiAhYXVkaW9BbHJlYWR5T24pIHtcbiAgICAgICAgYXVkaW9Qcm9kdWNlcj8ucGF1c2UoKTtcbiAgICAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcihhdWRpb1Byb2R1Y2VyKTtcbiAgICAgICAgc29ja2V0LmVtaXQoJ3BhdXNlUHJvZHVjZXJNZWRpYScsIHsgbWVkaWFUYWc6ICdhdWRpbycsIHJvb21OYW1lOiByb29tTmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIFVJIGJhc2VkIG9uIHRoZSBwYXJ0aWNpcGFudCdzIGxldmVsIGFuZCBzY3JlZW4gbG9jayBzdGF0dXNcbiAgICBpZiAoIXZpZGVvQWxyZWFkeU9uICYmIGlzbGV2ZWwgPT09ICcyJykge1xuICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhc2hhcmVkKSB7XG4gICAgICAgIC8vIFNldCB1cGRhdGVNYWluV2luZG93IHRvIHRydWUsIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEsIGFuZCBzZXQgdXBkYXRlTWFpbldpbmRvdyBiYWNrIHRvIGZhbHNlXG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19