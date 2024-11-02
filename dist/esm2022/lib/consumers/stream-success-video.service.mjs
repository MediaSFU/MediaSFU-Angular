import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Streams a video successfully by managing the local stream, updating parameters, and handling video transport.
 *
 * This method initiates the video streaming process by updating the local video stream with the new stream,
 * creating or connecting to the video transport, and notifying participants of the streaming status.
 *
 * @param {StreamSuccessVideoOptions} options - The options for streaming the video.
 * @param {MediaStream} options.stream - The media stream to be used for the video.
 * @param {StreamSuccessVideoParameters} options.parameters - The parameters required for streaming.
 * @param {Socket} options.parameters.socket - The socket instance for real-time communication.
 * @param {Participant[]} options.parameters.participants - The list of participants in the session.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream.
 * @param {boolean} options.parameters.transportCreated - Indicates if the transport has already been created.
 * @param {boolean} options.parameters.transportCreatedVideo - Indicates if the video transport has been created.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {boolean} options.parameters.videoAction - Indicates if a video action is being performed.
 * @param {ProducerOptions} options.parameters.videoParams - The parameters for the video producer.
 * @param {MediaStream | null} options.parameters.localStreamVideo - The local video stream.
 * @param {string} options.parameters.defVideoID - The default video device ID.
 * @param {string} options.parameters.userDefaultVideoInputDevice - The user's default video input device.
 * @param {ProducerOptions} options.parameters.params - Additional parameters for the producer.
 * @param {ProducerOptions} options.parameters.videoParamse - Additional parameters for the video.
 * @param {string} options.parameters.islevel - The level of the user (e.g., host, participant).
 * @param {string} options.parameters.member - The member's name in the session.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window should be updated.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {Function} options.parameters.showAlert - Function to show alert messages.
 * @param {Function} options.parameters.updateParticipants - Function to update the participants list.
 * @param {Function} options.parameters.updateTransportCreatedVideo - Function to update the transport creation state.
 * @param {Function} options.parameters.updateVideoAlreadyOn - Function to update the video status.
 * @param {Function} options.parameters.updateVideoAction - Function to update the video action state.
 * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
 * @param {Function} options.parameters.updateLocalStreamVideo - Function to update the local video stream.
 * @param {Function} options.parameters.updateUserDefaultVideoInputDevice - Function to update the default video input device.
 * @param {Function} options.parameters.updateCurrentFacingMode - Function to update the current facing mode.
 * @param {Function} options.parameters.updateDefVideoID - Function to update the default video device ID.
 * @param {Function} options.parameters.updateAllowed - Function to update the allowed state.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for video.
 * @param {Function} options.parameters.connectSendTransportVideo - Function to connect the send transport for video.
 * @param {Function} options.parameters.resumeSendTransportAudio - Function to resume audio transport.
 *
 * @returns {Promise<void>} A promise that resolves when the video has been successfully streamed.
 *
 * @throws {Error} Throws an error if there is an issue with streaming the video.
 *
 * @example
 * await streamSuccessVideo({
 *   stream: newVideoStream,
 *   parameters: {
 *     socket: socketInstance,
 *     localStream: null,
 *     // other parameters...
 *   },
 * });
 */
export class StreamSuccessVideo {
    /**
     * Streams a video successfully by managing the local stream, updating parameters, and handling video transport.
     *
     * @param {StreamSuccessVideoOptions} options - The options for streaming the video.
     * @param {MediaStream} options.stream - The media stream to be used for the video.
     * @param {Object} options.parameters - The parameters required for streaming.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     *
     * @returns {Promise<void>} A promise that resolves when the video has been successfully streamed.
     *
     * @throws Will throw an error if there is an issue with streaming the video.
     */
    streamSuccessVideo = async ({ stream, parameters }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        try {
            let { socket, participants, localStream, transportCreated, transportCreatedVideo, videoAlreadyOn, videoAction, videoParams, localStreamVideo, defVideoID, userDefaultVideoInputDevice, params, videoParamse, islevel, member, updateMainWindow, lock_screen, shared, shareScreenStarted, vParams, hParams, allowed, currentFacingMode, device, keepBackground, appliedBackground, videoProducer, 
            // update functions
            updateTransportCreatedVideo, updateVideoAlreadyOn, updateVideoAction, updateLocalStream, updateLocalStreamVideo, updateUserDefaultVideoInputDevice, updateCurrentFacingMode, updateDefVideoID, updateAllowed, updateUpdateMainWindow, updateParticipants, updateVideoParams, updateIsBackgroundModalVisible, updateAutoClickBackground, 
            // mediasfu functions
            createSendTransport, connectSendTransportVideo, showAlert, reorderStreams, sleep, } = parameters;
            localStreamVideo = stream;
            updateLocalStreamVideo(localStreamVideo);
            // Add the video stream track to localStream
            if (localStream == null) {
                localStream = new MediaStream([localStreamVideo.getVideoTracks()[0]]);
                updateLocalStream(localStream);
            }
            else {
                // Remove all video tracks that are currently in the localStream
                localStream.getVideoTracks().forEach((track) => {
                    localStream?.removeTrack(track);
                });
                // Add the new video track to the localStream
                localStream.addTrack(localStreamVideo.getVideoTracks()[0]);
                updateLocalStream(localStream);
            }
            // Get the video track settings
            const videoTracked = localStream.getVideoTracks()[0];
            defVideoID = videoTracked.getSettings().deviceId ?? '';
            userDefaultVideoInputDevice = defVideoID;
            currentFacingMode = videoTracked.getSettings().facingMode ?? 'user';
            // Update the state variables
            if (defVideoID) {
                updateDefVideoID(defVideoID);
            }
            if (userDefaultVideoInputDevice) {
                updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);
            }
            if (currentFacingMode) {
                updateCurrentFacingMode(currentFacingMode);
            }
            allowed = true;
            updateAllowed(allowed);
            try {
                // Apply the video constraints
                if (islevel == '2') {
                    if (!shared || !shareScreenStarted) {
                        params = hParams;
                        videoParamse = { ...params };
                    }
                    else {
                        params = vParams;
                        videoParamse = { ...params };
                    }
                }
                else {
                    params = vParams;
                    videoParamse = { ...params };
                }
                // Remove VP9 codec from the video codecs; support only VP8 and H264
                let codec = device?.rtpCapabilities?.codecs?.filter((codec) => codec.mimeType.toLowerCase() !== 'video/vp9' && codec.kind === 'video');
                // Create transport if not created else connect transport
                if (codec && codec.length > 0) {
                    videoParams = {
                        track: localStream.getVideoTracks()[0],
                        ...videoParamse,
                        codec: codec[0],
                    };
                }
                else {
                    throw new Error('No suitable video codec found');
                }
                updateVideoParams(videoParams);
                if (keepBackground && appliedBackground) {
                    videoAlreadyOn = true;
                    updateVideoAlreadyOn(videoAlreadyOn);
                    updateAutoClickBackground(true);
                    updateIsBackgroundModalVisible(true);
                    await sleep({ ms: 500 });
                    updateIsBackgroundModalVisible(false);
                    updateAutoClickBackground(false);
                }
                else {
                    if (!transportCreated) {
                        try {
                            await createSendTransport({
                                parameters: {
                                    ...parameters,
                                    videoParams: videoParams,
                                },
                                option: 'video',
                            });
                        }
                        catch (error) {
                            console.log('Error creating send transport:', error);
                        }
                    }
                    else {
                        try {
                            videoProducer?.close();
                            await sleep({ ms: 500 });
                        }
                        catch {
                            /* handle error */
                        }
                        await connectSendTransportVideo({
                            parameters: parameters,
                            videoParams: videoParams,
                        });
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
            // Update the videoAlreadyOn state
            videoAlreadyOn = true;
            updateVideoAlreadyOn(videoAlreadyOn);
            // If user requested to share video, update the videoAction state
            if (videoAction) {
                videoAction = false;
                updateVideoAction(videoAction);
            }
            // Update the display screen if host
            if (islevel == '2') {
                updateMainWindow = true;
                updateUpdateMainWindow(updateMainWindow);
            }
            // Update the participants array to reflect the change
            participants.forEach((participant) => {
                if (participant.socketId == socket.id && participant.name == member) {
                    participant.videoOn = true;
                }
            });
            updateParticipants(participants);
            // Update the transport created state
            transportCreatedVideo = true;
            updateTransportCreatedVideo(transportCreatedVideo);
            // Reupdate the screen display
            if (lock_screen) {
                try {
                    await reorderStreams({
                        add: true,
                        screenChanged: true,
                        parameters: { ...parameters, videoAlreadyOn },
                    });
                }
                catch (error) {
                    console.log('Error reordering streams with lock screen:', error);
                }
            }
            else {
                try {
                    await reorderStreams({
                        add: false,
                        screenChanged: true,
                        parameters: { ...parameters, videoAlreadyOn },
                    });
                }
                catch (error) {
                    console.log('Error reordering streams without lock screen:', error);
                }
            }
        }
        catch (error) {
            const { showAlert } = parameters;
            console.log('Error in streamSuccessVideo:', error);
            showAlert?.({
                message: error.message,
                type: 'danger',
                duration: 3000,
            });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessVideo, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessVideo, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessVideo, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXN1Y2Nlc3MtdmlkZW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXFGM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlERztBQUtILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUE2QixFQUFpQixFQUFFO1FBQzlGLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQ0YsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLHFCQUFxQixFQUNyQixjQUFjLEVBQ2QsV0FBVyxFQUNYLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLDJCQUEyQixFQUMzQixNQUFNLEVBQ04sWUFBWSxFQUNaLE9BQU8sRUFDUCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxFQUNQLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sY0FBYyxFQUNkLGlCQUFpQixFQUNqQixhQUFhO1lBRWIsbUJBQW1CO1lBQ25CLDJCQUEyQixFQUMzQixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIsaUNBQWlD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TyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBblBTLGtCQUFrQjsyR0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZXZpY2UsIFByb2R1Y2VyT3B0aW9ucywgUHJvZHVjZXIsIFJ0cENvZGVjQ2FwYWJpbGl0eSB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gIFBhcnRpY2lwYW50LFxuICBTaG93QWxlcnQsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFNsZWVwVHlwZSxcbiAgQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGUsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9UeXBlLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG4gIFZQYXJhbXNUeXBlLFxuICBIUGFyYW1zVHlwZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTdHJlYW1TdWNjZXNzVmlkZW9QYXJhbWV0ZXJzXG4gIGV4dGVuZHMgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gICAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgbG9jYWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgdHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbjtcbiAgdHJhbnNwb3J0Q3JlYXRlZFZpZGVvOiBib29sZWFuO1xuICB2aWRlb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgdmlkZW9BY3Rpb246IGJvb2xlYW47XG4gIHZpZGVvUGFyYW1zOiBQcm9kdWNlck9wdGlvbnM7XG4gIGxvY2FsU3RyZWFtVmlkZW86IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgZGVmVmlkZW9JRDogc3RyaW5nO1xuICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IHN0cmluZztcbiAgcGFyYW1zOiBQcm9kdWNlck9wdGlvbnM7XG4gIHZpZGVvUGFyYW1zZT86IFByb2R1Y2VyT3B0aW9ucztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICB2UGFyYW1zOiBWUGFyYW1zVHlwZTtcbiAgaFBhcmFtczogSFBhcmFtc1R5cGU7XG4gIGFsbG93ZWQ6IGJvb2xlYW47XG4gIGN1cnJlbnRGYWNpbmdNb2RlOiBzdHJpbmc7XG4gIGRldmljZTogRGV2aWNlIHwgbnVsbDtcbiAga2VlcEJhY2tncm91bmQ6IGJvb2xlYW47XG4gIGFwcGxpZWRCYWNrZ3JvdW5kOiBib29sZWFuO1xuICB2aWRlb1Byb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG5cbiAgLy8gVXBkYXRlIGZ1bmN0aW9uc1xuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkVmlkZW86IChjcmVhdGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb0FscmVhZHlPbjogKHZpZGVvT246IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVZpZGVvQWN0aW9uOiAodmlkZW9BY3Rpb246IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtOiAoc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW86IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiAoZGV2aWNlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlOiAobW9kZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVEZWZWaWRlb0lEOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQWxsb3dlZDogKGFsbG93ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh1cGRhdGVNYWluV2luZG93OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVZpZGVvUGFyYW1zOiAocGFyYW1zOiBQcm9kdWNlck9wdGlvbnMpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZDogKGF1dG9DbGljazogYm9vbGVhbikgPT4gdm9pZDtcblxuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG5cbiAgLy8gTWVkaWEgZnVuY3Rpb25zXG4gIGNyZWF0ZVNlbmRUcmFuc3BvcnQ6IENyZWF0ZVNlbmRUcmFuc3BvcnRUeXBlO1xuICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZTtcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcbiAgc2xlZXA6IFNsZWVwVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBTdHJlYW1TdWNjZXNzVmlkZW9QYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyZWFtU3VjY2Vzc1ZpZGVvT3B0aW9ucyB7XG4gIHN0cmVhbTogTWVkaWFTdHJlYW07XG4gIHBhcmFtZXRlcnM6IFN0cmVhbVN1Y2Nlc3NWaWRlb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN0cmVhbVN1Y2Nlc3NWaWRlb1R5cGUgPSAob3B0aW9uczogU3RyZWFtU3VjY2Vzc1ZpZGVvT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTdHJlYW1zIGEgdmlkZW8gc3VjY2Vzc2Z1bGx5IGJ5IG1hbmFnaW5nIHRoZSBsb2NhbCBzdHJlYW0sIHVwZGF0aW5nIHBhcmFtZXRlcnMsIGFuZCBoYW5kbGluZyB2aWRlbyB0cmFuc3BvcnQuXG4gKlxuICogVGhpcyBtZXRob2QgaW5pdGlhdGVzIHRoZSB2aWRlbyBzdHJlYW1pbmcgcHJvY2VzcyBieSB1cGRhdGluZyB0aGUgbG9jYWwgdmlkZW8gc3RyZWFtIHdpdGggdGhlIG5ldyBzdHJlYW0sXG4gKiBjcmVhdGluZyBvciBjb25uZWN0aW5nIHRvIHRoZSB2aWRlbyB0cmFuc3BvcnQsIGFuZCBub3RpZnlpbmcgcGFydGljaXBhbnRzIG9mIHRoZSBzdHJlYW1pbmcgc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7U3RyZWFtU3VjY2Vzc1ZpZGVvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzdHJlYW1pbmcgdGhlIHZpZGVvLlxuICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5zdHJlYW0gLSBUaGUgbWVkaWEgc3RyZWFtIHRvIGJlIHVzZWQgZm9yIHRoZSB2aWRlby5cbiAqIEBwYXJhbSB7U3RyZWFtU3VjY2Vzc1ZpZGVvUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHN0cmVhbWluZy5cbiAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgcmVhbC10aW1lIGNvbW11bmljYXRpb24uXG4gKiBAcGFyYW0ge1BhcnRpY2lwYW50W119IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMgaW4gdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtIHwgbnVsbH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtIC0gVGhlIGxvY2FsIG1lZGlhIHN0cmVhbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHRyYW5zcG9ydCBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy50cmFuc3BvcnRDcmVhdGVkVmlkZW8gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIHRyYW5zcG9ydCBoYXMgYmVlbiBjcmVhdGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb0FjdGlvbiAtIEluZGljYXRlcyBpZiBhIHZpZGVvIGFjdGlvbiBpcyBiZWluZyBwZXJmb3JtZWQuXG4gKiBAcGFyYW0ge1Byb2R1Y2VyT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvUGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSB2aWRlbyBwcm9kdWNlci5cbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW0gfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1WaWRlbyAtIFRoZSBsb2NhbCB2aWRlbyBzdHJlYW0uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmRlZlZpZGVvSUQgLSBUaGUgZGVmYXVsdCB2aWRlbyBkZXZpY2UgSUQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSAtIFRoZSB1c2VyJ3MgZGVmYXVsdCB2aWRlbyBpbnB1dCBkZXZpY2UuXG4gKiBAcGFyYW0ge1Byb2R1Y2VyT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcmFtcyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHByb2R1Y2VyLlxuICogQHBhcmFtIHtQcm9kdWNlck9wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb1BhcmFtc2UgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSB2aWRlby5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgdXNlciAoZS5nLiwgaG9zdCwgcGFydGljaXBhbnQpLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyJ3MgbmFtZSBpbiB0aGUgc2Vzc2lvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5XaW5kb3cgLSBJbmRpY2F0ZXMgaWYgdGhlIG1haW4gd2luZG93IHNob3VsZCBiZSB1cGRhdGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubG9ja19zY3JlZW4gLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBsb2NrZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb0FscmVhZHlPbiAtIEluZGljYXRlcyBpZiB0aGUgdmlkZW8gaXMgYWxyZWFkeSBvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVBhcnRpY2lwYW50cyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcGFydGljaXBhbnRzIGxpc3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFZpZGVvIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB0cmFuc3BvcnQgY3JlYXRpb24gc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVmlkZW9BbHJlYWR5T24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpZGVvIHN0YXR1cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVWaWRlb0FjdGlvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlkZW8gYWN0aW9uIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2FsU3RyZWFtIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBsb2NhbCBzdHJlYW0uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1WaWRlbyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgdmlkZW8gc3RyZWFtLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZGVmYXVsdCB2aWRlbyBpbnB1dCBkZXZpY2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ3VycmVudEZhY2luZ01vZGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGN1cnJlbnQgZmFjaW5nIG1vZGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRGVmVmlkZW9JRCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZGVmYXVsdCB2aWRlbyBkZXZpY2UgSUQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWxsb3dlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYWxsb3dlZCBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jcmVhdGVTZW5kVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gY3JlYXRlIGEgc2VuZCB0cmFuc3BvcnQgZm9yIHZpZGVvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gLSBGdW5jdGlvbiB0byBjb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgdmlkZW8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvIC0gRnVuY3Rpb24gdG8gcmVzdW1lIGF1ZGlvIHRyYW5zcG9ydC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgdmlkZW8gaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IHN0cmVhbWVkLlxuICpcbiAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgd2l0aCBzdHJlYW1pbmcgdGhlIHZpZGVvLlxuICpcbiAqIEBleGFtcGxlXG4gKiBhd2FpdCBzdHJlYW1TdWNjZXNzVmlkZW8oe1xuICogICBzdHJlYW06IG5ld1ZpZGVvU3RyZWFtLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgc29ja2V0OiBzb2NrZXRJbnN0YW5jZSxcbiAqICAgICBsb2NhbFN0cmVhbTogbnVsbCxcbiAqICAgICAvLyBvdGhlciBwYXJhbWV0ZXJzLi4uXG4gKiAgIH0sXG4gKiB9KTtcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RyZWFtU3VjY2Vzc1ZpZGVvIHtcbiAgLyoqXG4gICAqIFN0cmVhbXMgYSB2aWRlbyBzdWNjZXNzZnVsbHkgYnkgbWFuYWdpbmcgdGhlIGxvY2FsIHN0cmVhbSwgdXBkYXRpbmcgcGFyYW1ldGVycywgYW5kIGhhbmRsaW5nIHZpZGVvIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJlYW1TdWNjZXNzVmlkZW9PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0cmVhbWluZyB0aGUgdmlkZW8uXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMuc3RyZWFtIC0gVGhlIG1lZGlhIHN0cmVhbSB0byBiZSB1c2VkIGZvciB0aGUgdmlkZW8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3RyZWFtaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2aWRlbyBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgc3RyZWFtZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSB3aXRoIHN0cmVhbWluZyB0aGUgdmlkZW8uXG4gICAqL1xuICBzdHJlYW1TdWNjZXNzVmlkZW8gPSBhc3luYyAoeyBzdHJlYW0sIHBhcmFtZXRlcnMgfTogU3RyZWFtU3VjY2Vzc1ZpZGVvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQge1xuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgICAgbG9jYWxTdHJlYW0sXG4gICAgICAgIHRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICAgIHRyYW5zcG9ydENyZWF0ZWRWaWRlbyxcbiAgICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICAgIHZpZGVvQWN0aW9uLFxuICAgICAgICB2aWRlb1BhcmFtcyxcbiAgICAgICAgbG9jYWxTdHJlYW1WaWRlbyxcbiAgICAgICAgZGVmVmlkZW9JRCxcbiAgICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHZpZGVvUGFyYW1zZSxcbiAgICAgICAgaXNsZXZlbCxcbiAgICAgICAgbWVtYmVyLFxuICAgICAgICB1cGRhdGVNYWluV2luZG93LFxuICAgICAgICBsb2NrX3NjcmVlbixcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgIHZQYXJhbXMsXG4gICAgICAgIGhQYXJhbXMsXG4gICAgICAgIGFsbG93ZWQsXG4gICAgICAgIGN1cnJlbnRGYWNpbmdNb2RlLFxuICAgICAgICBkZXZpY2UsXG4gICAgICAgIGtlZXBCYWNrZ3JvdW5kLFxuICAgICAgICBhcHBsaWVkQmFja2dyb3VuZCxcbiAgICAgICAgdmlkZW9Qcm9kdWNlcixcblxuICAgICAgICAvLyB1cGRhdGUgZnVuY3Rpb25zXG4gICAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbyxcbiAgICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T24sXG4gICAgICAgIHVwZGF0ZVZpZGVvQWN0aW9uLFxuICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbSxcbiAgICAgICAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyxcbiAgICAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLFxuICAgICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZSxcbiAgICAgICAgdXBkYXRlRGVmVmlkZW9JRCxcbiAgICAgICAgdXBkYXRlQWxsb3dlZCxcbiAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgdXBkYXRlUGFydGljaXBhbnRzLFxuICAgICAgICB1cGRhdGVWaWRlb1BhcmFtcyxcbiAgICAgICAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLFxuICAgICAgICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kLFxuXG4gICAgICAgIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgICBjcmVhdGVTZW5kVHJhbnNwb3J0LFxuICAgICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvLFxuICAgICAgICBzaG93QWxlcnQsXG4gICAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgICBzbGVlcCxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICBsb2NhbFN0cmVhbVZpZGVvID0gc3RyZWFtO1xuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyhsb2NhbFN0cmVhbVZpZGVvKTtcblxuICAgICAgLy8gQWRkIHRoZSB2aWRlbyBzdHJlYW0gdHJhY2sgdG8gbG9jYWxTdHJlYW1cbiAgICAgIGlmIChsb2NhbFN0cmVhbSA9PSBudWxsKSB7XG4gICAgICAgIGxvY2FsU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKFtsb2NhbFN0cmVhbVZpZGVvLmdldFZpZGVvVHJhY2tzKClbMF1dKTtcbiAgICAgICAgdXBkYXRlTG9jYWxTdHJlYW0obG9jYWxTdHJlYW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCB2aWRlbyB0cmFja3MgdGhhdCBhcmUgY3VycmVudGx5IGluIHRoZSBsb2NhbFN0cmVhbVxuICAgICAgICBsb2NhbFN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrOiBNZWRpYVN0cmVhbVRyYWNrKSA9PiB7XG4gICAgICAgICAgbG9jYWxTdHJlYW0/LnJlbW92ZVRyYWNrKHRyYWNrKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCB0aGUgbmV3IHZpZGVvIHRyYWNrIHRvIHRoZSBsb2NhbFN0cmVhbVxuICAgICAgICBsb2NhbFN0cmVhbS5hZGRUcmFjayhsb2NhbFN0cmVhbVZpZGVvLmdldFZpZGVvVHJhY2tzKClbMF0pO1xuICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgdmlkZW8gdHJhY2sgc2V0dGluZ3NcbiAgICAgIGNvbnN0IHZpZGVvVHJhY2tlZCA9IGxvY2FsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XG4gICAgICBkZWZWaWRlb0lEID0gdmlkZW9UcmFja2VkLmdldFNldHRpbmdzKCkuZGV2aWNlSWQgPz8gJyc7XG4gICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPSBkZWZWaWRlb0lEO1xuICAgICAgY3VycmVudEZhY2luZ01vZGUgPSB2aWRlb1RyYWNrZWQuZ2V0U2V0dGluZ3MoKS5mYWNpbmdNb2RlID8/ICd1c2VyJztcblxuICAgICAgLy8gVXBkYXRlIHRoZSBzdGF0ZSB2YXJpYWJsZXNcbiAgICAgIGlmIChkZWZWaWRlb0lEKSB7XG4gICAgICAgIHVwZGF0ZURlZlZpZGVvSUQoZGVmVmlkZW9JRCk7XG4gICAgICB9XG4gICAgICBpZiAodXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlKSB7XG4gICAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSh1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRGYWNpbmdNb2RlKSB7XG4gICAgICAgIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlKGN1cnJlbnRGYWNpbmdNb2RlKTtcbiAgICAgIH1cblxuICAgICAgYWxsb3dlZCA9IHRydWU7XG4gICAgICB1cGRhdGVBbGxvd2VkKGFsbG93ZWQpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBBcHBseSB0aGUgdmlkZW8gY29uc3RyYWludHNcbiAgICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInKSB7XG4gICAgICAgICAgaWYgKCFzaGFyZWQgfHwgIXNoYXJlU2NyZWVuU3RhcnRlZCkge1xuICAgICAgICAgICAgcGFyYW1zID0gaFBhcmFtcztcbiAgICAgICAgICAgIHZpZGVvUGFyYW1zZSA9IHsgLi4ucGFyYW1zIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHZQYXJhbXM7XG4gICAgICAgICAgICB2aWRlb1BhcmFtc2UgPSB7IC4uLnBhcmFtcyB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJhbXMgPSB2UGFyYW1zO1xuICAgICAgICAgIHZpZGVvUGFyYW1zZSA9IHsgLi4ucGFyYW1zIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgVlA5IGNvZGVjIGZyb20gdGhlIHZpZGVvIGNvZGVjczsgc3VwcG9ydCBvbmx5IFZQOCBhbmQgSDI2NFxuICAgICAgICBsZXQgY29kZWMgPSBkZXZpY2U/LnJ0cENhcGFiaWxpdGllcz8uY29kZWNzPy5maWx0ZXIoXG4gICAgICAgICAgKGNvZGVjOiBSdHBDb2RlY0NhcGFiaWxpdHkpID0+XG4gICAgICAgICAgICBjb2RlYy5taW1lVHlwZS50b0xvd2VyQ2FzZSgpICE9PSAndmlkZW8vdnA5JyAmJiBjb2RlYy5raW5kID09PSAndmlkZW8nLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0cmFuc3BvcnQgaWYgbm90IGNyZWF0ZWQgZWxzZSBjb25uZWN0IHRyYW5zcG9ydFxuICAgICAgICBpZiAoY29kZWMgJiYgY29kZWMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZpZGVvUGFyYW1zID0ge1xuICAgICAgICAgICAgdHJhY2s6IGxvY2FsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0sXG4gICAgICAgICAgICAuLi52aWRlb1BhcmFtc2UsXG4gICAgICAgICAgICBjb2RlYzogY29kZWNbMF0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHN1aXRhYmxlIHZpZGVvIGNvZGVjIGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlVmlkZW9QYXJhbXModmlkZW9QYXJhbXMpO1xuXG4gICAgICAgIGlmIChrZWVwQmFja2dyb3VuZCAmJiBhcHBsaWVkQmFja2dyb3VuZCkge1xuICAgICAgICAgIHZpZGVvQWxyZWFkeU9uID0gdHJ1ZTtcbiAgICAgICAgICB1cGRhdGVWaWRlb0FscmVhZHlPbih2aWRlb0FscmVhZHlPbik7XG5cbiAgICAgICAgICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kKHRydWUpO1xuICAgICAgICAgIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICBhd2FpdCBzbGVlcCh7IG1zOiA1MDAgfSk7XG4gICAgICAgICAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXRyYW5zcG9ydENyZWF0ZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZVNlbmRUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICAgIC4uLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICB2aWRlb1BhcmFtczogdmlkZW9QYXJhbXMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb246ICd2aWRlbycsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNyZWF0aW5nIHNlbmQgdHJhbnNwb3J0OicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdmlkZW9Qcm9kdWNlcj8uY2xvc2UoKTtcbiAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7XG4gICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIHZpZGVvUGFyYW1zOiB2aWRlb1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgdmlkZW9BbHJlYWR5T24gc3RhdGVcbiAgICAgIHZpZGVvQWxyZWFkeU9uID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uKHZpZGVvQWxyZWFkeU9uKTtcblxuICAgICAgLy8gSWYgdXNlciByZXF1ZXN0ZWQgdG8gc2hhcmUgdmlkZW8sIHVwZGF0ZSB0aGUgdmlkZW9BY3Rpb24gc3RhdGVcbiAgICAgIGlmICh2aWRlb0FjdGlvbikge1xuICAgICAgICB2aWRlb0FjdGlvbiA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVWaWRlb0FjdGlvbih2aWRlb0FjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgZGlzcGxheSBzY3JlZW4gaWYgaG9zdFxuICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInKSB7XG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIHBhcnRpY2lwYW50cyBhcnJheSB0byByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICAgIHBhcnRpY2lwYW50cy5mb3JFYWNoKChwYXJ0aWNpcGFudDogYW55KSA9PiB7XG4gICAgICAgIGlmIChwYXJ0aWNpcGFudC5zb2NrZXRJZCA9PSBzb2NrZXQuaWQgJiYgcGFydGljaXBhbnQubmFtZSA9PSBtZW1iZXIpIHtcbiAgICAgICAgICBwYXJ0aWNpcGFudC52aWRlb09uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHMocGFydGljaXBhbnRzKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSB0cmFuc3BvcnQgY3JlYXRlZCBzdGF0ZVxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZFZpZGVvID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbyh0cmFuc3BvcnRDcmVhdGVkVmlkZW8pO1xuXG4gICAgICAvLyBSZXVwZGF0ZSB0aGUgc2NyZWVuIGRpc3BsYXlcbiAgICAgIGlmIChsb2NrX3NjcmVlbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHtcbiAgICAgICAgICAgIGFkZDogdHJ1ZSxcbiAgICAgICAgICAgIHNjcmVlbkNoYW5nZWQ6IHRydWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIHZpZGVvQWxyZWFkeU9uIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHJlb3JkZXJpbmcgc3RyZWFtcyB3aXRoIGxvY2sgc2NyZWVuOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7XG4gICAgICAgICAgICBhZGQ6IGZhbHNlLFxuICAgICAgICAgICAgc2NyZWVuQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgdmlkZW9BbHJlYWR5T24gfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcmVvcmRlcmluZyBzdHJlYW1zIHdpdGhvdXQgbG9jayBzY3JlZW46JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgY29uc3QgeyBzaG93QWxlcnQgfSA9IHBhcmFtZXRlcnM7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gc3RyZWFtU3VjY2Vzc1ZpZGVvOicsIGVycm9yKTtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19