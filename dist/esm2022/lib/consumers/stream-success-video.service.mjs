import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXN1Y2Nlc3MtdmlkZW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdGM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUM3Qjs7Ozs7Ozs7Ozs7T0FXRztJQUNILGtCQUFrQixHQUFHLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQTZCLEVBQWlCLEVBQUU7UUFDOUYsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQztZQUNILElBQUksRUFDRixNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGNBQWMsRUFDZCxXQUFXLEVBQ1gsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsMkJBQTJCLEVBQzNCLE1BQU0sRUFDTixZQUFZLEVBQ1osT0FBTyxFQUNQLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLE1BQU0sRUFDTixrQkFBa0IsRUFDbEIsT0FBTyxFQUNQLE9BQU8sRUFDUCxPQUFPLEVBQ1AsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGFBQWE7WUFFYixtQkFBbUI7WUFDbkIsMkJBQTJCLEVBQzNCLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLHNCQUFzQixFQUN0QixpQ0FBaUMsRUFDakMsdUJBQXVCLEVBQ3ZCLGdCQUFnQixFQUNoQixhQUFhLEVBQ2Isc0JBQXNCLEVBQ3RCLGtCQUFrQixFQUNs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Q2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FuUFMsa0JBQWtCOzJHQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERldmljZSwgUHJvZHVjZXJPcHRpb25zLCBQcm9kdWNlciwgUnRwQ29kZWNDYXBhYmlsaXR5IH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyxcbiAgUGFydGljaXBhbnQsXG4gIFNob3dBbGVydCxcbiAgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyxcbiAgU2xlZXBUeXBlLFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZSxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1R5cGUsXG4gIFJlb3JkZXJTdHJlYW1zVHlwZSxcbiAgVlBhcmFtc1R5cGUsXG4gIEhQYXJhbXNUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0cmVhbVN1Y2Nlc3NWaWRlb1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgICBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyxcbiAgICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBsb2NhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICB0cmFuc3BvcnRDcmVhdGVkOiBib29sZWFuO1xuICB0cmFuc3BvcnRDcmVhdGVkVmlkZW86IGJvb2xlYW47XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICB2aWRlb0FjdGlvbjogYm9vbGVhbjtcbiAgdmlkZW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgbG9jYWxTdHJlYW1WaWRlbzogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBkZWZWaWRlb0lEOiBzdHJpbmc7XG4gIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogc3RyaW5nO1xuICBwYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgdmlkZW9QYXJhbXNlPzogUHJvZHVjZXJPcHRpb25zO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICB1cGRhdGVNYWluV2luZG93OiBib29sZWFuO1xuICBsb2NrX3NjcmVlbjogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHZQYXJhbXM6IFZQYXJhbXNUeXBlO1xuICBoUGFyYW1zOiBIUGFyYW1zVHlwZTtcbiAgYWxsb3dlZDogYm9vbGVhbjtcbiAgY3VycmVudEZhY2luZ01vZGU6IHN0cmluZztcbiAgZGV2aWNlOiBEZXZpY2UgfCBudWxsO1xuICBrZWVwQmFja2dyb3VuZDogYm9vbGVhbjtcbiAgYXBwbGllZEJhY2tncm91bmQ6IGJvb2xlYW47XG4gIHZpZGVvUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcblxuICAvLyBVcGRhdGUgZnVuY3Rpb25zXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbzogKGNyZWF0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVZpZGVvQWxyZWFkeU9uOiAodmlkZW9PbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9BY3Rpb246ICh2aWRlb0FjdGlvbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTG9jYWxTdHJlYW06IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbzogKHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IChkZXZpY2U6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGU6IChtb2RlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZURlZlZpZGVvSUQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVBbGxvd2VkOiAoYWxsb3dlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVBhcnRpY2lwYW50czogKHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9QYXJhbXM6IChwYXJhbXM6IFByb2R1Y2VyT3B0aW9ucykgPT4gdm9pZDtcbiAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kOiAoYXV0b0NsaWNrOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcblxuICAvLyBNZWRpYSBmdW5jdGlvbnNcbiAgY3JlYXRlU2VuZFRyYW5zcG9ydDogQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGU7XG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86IENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9UeXBlO1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuICBzbGVlcDogU2xlZXBUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFN0cmVhbVN1Y2Nlc3NWaWRlb1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdHJlYW1TdWNjZXNzVmlkZW9PcHRpb25zIHtcbiAgc3RyZWFtOiBNZWRpYVN0cmVhbTtcbiAgcGFyYW1ldGVyczogU3RyZWFtU3VjY2Vzc1ZpZGVvUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3RyZWFtU3VjY2Vzc1ZpZGVvVHlwZSA9IChvcHRpb25zOiBTdHJlYW1TdWNjZXNzVmlkZW9PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RyZWFtU3VjY2Vzc1ZpZGVvIHtcbiAgLyoqXG4gICAqIFN0cmVhbXMgYSB2aWRlbyBzdWNjZXNzZnVsbHkgYnkgbWFuYWdpbmcgdGhlIGxvY2FsIHN0cmVhbSwgdXBkYXRpbmcgcGFyYW1ldGVycywgYW5kIGhhbmRsaW5nIHZpZGVvIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJlYW1TdWNjZXNzVmlkZW9PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0cmVhbWluZyB0aGUgdmlkZW8uXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMuc3RyZWFtIC0gVGhlIG1lZGlhIHN0cmVhbSB0byBiZSB1c2VkIGZvciB0aGUgdmlkZW8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3RyZWFtaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2aWRlbyBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgc3RyZWFtZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSB3aXRoIHN0cmVhbWluZyB0aGUgdmlkZW8uXG4gICAqL1xuICBzdHJlYW1TdWNjZXNzVmlkZW8gPSBhc3luYyAoeyBzdHJlYW0sIHBhcmFtZXRlcnMgfTogU3RyZWFtU3VjY2Vzc1ZpZGVvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQge1xuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgICAgbG9jYWxTdHJlYW0sXG4gICAgICAgIHRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICAgIHRyYW5zcG9ydENyZWF0ZWRWaWRlbyxcbiAgICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICAgIHZpZGVvQWN0aW9uLFxuICAgICAgICB2aWRlb1BhcmFtcyxcbiAgICAgICAgbG9jYWxTdHJlYW1WaWRlbyxcbiAgICAgICAgZGVmVmlkZW9JRCxcbiAgICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHZpZGVvUGFyYW1zZSxcbiAgICAgICAgaXNsZXZlbCxcbiAgICAgICAgbWVtYmVyLFxuICAgICAgICB1cGRhdGVNYWluV2luZG93LFxuICAgICAgICBsb2NrX3NjcmVlbixcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgIHZQYXJhbXMsXG4gICAgICAgIGhQYXJhbXMsXG4gICAgICAgIGFsbG93ZWQsXG4gICAgICAgIGN1cnJlbnRGYWNpbmdNb2RlLFxuICAgICAgICBkZXZpY2UsXG4gICAgICAgIGtlZXBCYWNrZ3JvdW5kLFxuICAgICAgICBhcHBsaWVkQmFja2dyb3VuZCxcbiAgICAgICAgdmlkZW9Qcm9kdWNlcixcblxuICAgICAgICAvLyB1cGRhdGUgZnVuY3Rpb25zXG4gICAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbyxcbiAgICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T24sXG4gICAgICAgIHVwZGF0ZVZpZGVvQWN0aW9uLFxuICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbSxcbiAgICAgICAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyxcbiAgICAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLFxuICAgICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZSxcbiAgICAgICAgdXBkYXRlRGVmVmlkZW9JRCxcbiAgICAgICAgdXBkYXRlQWxsb3dlZCxcbiAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgdXBkYXRlUGFydGljaXBhbnRzLFxuICAgICAgICB1cGRhdGVWaWRlb1BhcmFtcyxcbiAgICAgICAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLFxuICAgICAgICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kLFxuXG4gICAgICAgIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgICBjcmVhdGVTZW5kVHJhbnNwb3J0LFxuICAgICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvLFxuICAgICAgICBzaG93QWxlcnQsXG4gICAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgICBzbGVlcCxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICBsb2NhbFN0cmVhbVZpZGVvID0gc3RyZWFtO1xuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyhsb2NhbFN0cmVhbVZpZGVvKTtcblxuICAgICAgLy8gQWRkIHRoZSB2aWRlbyBzdHJlYW0gdHJhY2sgdG8gbG9jYWxTdHJlYW1cbiAgICAgIGlmIChsb2NhbFN0cmVhbSA9PSBudWxsKSB7XG4gICAgICAgIGxvY2FsU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKFtsb2NhbFN0cmVhbVZpZGVvLmdldFZpZGVvVHJhY2tzKClbMF1dKTtcbiAgICAgICAgdXBkYXRlTG9jYWxTdHJlYW0obG9jYWxTdHJlYW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCB2aWRlbyB0cmFja3MgdGhhdCBhcmUgY3VycmVudGx5IGluIHRoZSBsb2NhbFN0cmVhbVxuICAgICAgICBsb2NhbFN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrOiBNZWRpYVN0cmVhbVRyYWNrKSA9PiB7XG4gICAgICAgICAgbG9jYWxTdHJlYW0/LnJlbW92ZVRyYWNrKHRyYWNrKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCB0aGUgbmV3IHZpZGVvIHRyYWNrIHRvIHRoZSBsb2NhbFN0cmVhbVxuICAgICAgICBsb2NhbFN0cmVhbS5hZGRUcmFjayhsb2NhbFN0cmVhbVZpZGVvLmdldFZpZGVvVHJhY2tzKClbMF0pO1xuICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgdmlkZW8gdHJhY2sgc2V0dGluZ3NcbiAgICAgIGNvbnN0IHZpZGVvVHJhY2tlZCA9IGxvY2FsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XG4gICAgICBkZWZWaWRlb0lEID0gdmlkZW9UcmFja2VkLmdldFNldHRpbmdzKCkuZGV2aWNlSWQgPz8gJyc7XG4gICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPSBkZWZWaWRlb0lEO1xuICAgICAgY3VycmVudEZhY2luZ01vZGUgPSB2aWRlb1RyYWNrZWQuZ2V0U2V0dGluZ3MoKS5mYWNpbmdNb2RlID8/ICd1c2VyJztcblxuICAgICAgLy8gVXBkYXRlIHRoZSBzdGF0ZSB2YXJpYWJsZXNcbiAgICAgIGlmIChkZWZWaWRlb0lEKSB7XG4gICAgICAgIHVwZGF0ZURlZlZpZGVvSUQoZGVmVmlkZW9JRCk7XG4gICAgICB9XG4gICAgICBpZiAodXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlKSB7XG4gICAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSh1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRGYWNpbmdNb2RlKSB7XG4gICAgICAgIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlKGN1cnJlbnRGYWNpbmdNb2RlKTtcbiAgICAgIH1cblxuICAgICAgYWxsb3dlZCA9IHRydWU7XG4gICAgICB1cGRhdGVBbGxvd2VkKGFsbG93ZWQpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBBcHBseSB0aGUgdmlkZW8gY29uc3RyYWludHNcbiAgICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInKSB7XG4gICAgICAgICAgaWYgKCFzaGFyZWQgfHwgIXNoYXJlU2NyZWVuU3RhcnRlZCkge1xuICAgICAgICAgICAgcGFyYW1zID0gaFBhcmFtcztcbiAgICAgICAgICAgIHZpZGVvUGFyYW1zZSA9IHsgLi4ucGFyYW1zIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHZQYXJhbXM7XG4gICAgICAgICAgICB2aWRlb1BhcmFtc2UgPSB7IC4uLnBhcmFtcyB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJhbXMgPSB2UGFyYW1zO1xuICAgICAgICAgIHZpZGVvUGFyYW1zZSA9IHsgLi4ucGFyYW1zIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgVlA5IGNvZGVjIGZyb20gdGhlIHZpZGVvIGNvZGVjczsgc3VwcG9ydCBvbmx5IFZQOCBhbmQgSDI2NFxuICAgICAgICBsZXQgY29kZWMgPSBkZXZpY2U/LnJ0cENhcGFiaWxpdGllcz8uY29kZWNzPy5maWx0ZXIoXG4gICAgICAgICAgKGNvZGVjOiBSdHBDb2RlY0NhcGFiaWxpdHkpID0+XG4gICAgICAgICAgICBjb2RlYy5taW1lVHlwZS50b0xvd2VyQ2FzZSgpICE9PSAndmlkZW8vdnA5JyAmJiBjb2RlYy5raW5kID09PSAndmlkZW8nLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0cmFuc3BvcnQgaWYgbm90IGNyZWF0ZWQgZWxzZSBjb25uZWN0IHRyYW5zcG9ydFxuICAgICAgICBpZiAoY29kZWMgJiYgY29kZWMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZpZGVvUGFyYW1zID0ge1xuICAgICAgICAgICAgdHJhY2s6IGxvY2FsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0sXG4gICAgICAgICAgICAuLi52aWRlb1BhcmFtc2UsXG4gICAgICAgICAgICBjb2RlYzogY29kZWNbMF0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHN1aXRhYmxlIHZpZGVvIGNvZGVjIGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlVmlkZW9QYXJhbXModmlkZW9QYXJhbXMpO1xuXG4gICAgICAgIGlmIChrZWVwQmFja2dyb3VuZCAmJiBhcHBsaWVkQmFja2dyb3VuZCkge1xuICAgICAgICAgIHZpZGVvQWxyZWFkeU9uID0gdHJ1ZTtcbiAgICAgICAgICB1cGRhdGVWaWRlb0FscmVhZHlPbih2aWRlb0FscmVhZHlPbik7XG5cbiAgICAgICAgICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kKHRydWUpO1xuICAgICAgICAgIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICBhd2FpdCBzbGVlcCh7IG1zOiA1MDAgfSk7XG4gICAgICAgICAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXRyYW5zcG9ydENyZWF0ZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZVNlbmRUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICAgIC4uLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICB2aWRlb1BhcmFtczogdmlkZW9QYXJhbXMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb246ICd2aWRlbycsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNyZWF0aW5nIHNlbmQgdHJhbnNwb3J0OicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdmlkZW9Qcm9kdWNlcj8uY2xvc2UoKTtcbiAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7XG4gICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIHZpZGVvUGFyYW1zOiB2aWRlb1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgdmlkZW9BbHJlYWR5T24gc3RhdGVcbiAgICAgIHZpZGVvQWxyZWFkeU9uID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uKHZpZGVvQWxyZWFkeU9uKTtcblxuICAgICAgLy8gSWYgdXNlciByZXF1ZXN0ZWQgdG8gc2hhcmUgdmlkZW8sIHVwZGF0ZSB0aGUgdmlkZW9BY3Rpb24gc3RhdGVcbiAgICAgIGlmICh2aWRlb0FjdGlvbikge1xuICAgICAgICB2aWRlb0FjdGlvbiA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVWaWRlb0FjdGlvbih2aWRlb0FjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgZGlzcGxheSBzY3JlZW4gaWYgaG9zdFxuICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInKSB7XG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIHBhcnRpY2lwYW50cyBhcnJheSB0byByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICAgIHBhcnRpY2lwYW50cy5mb3JFYWNoKChwYXJ0aWNpcGFudDogYW55KSA9PiB7XG4gICAgICAgIGlmIChwYXJ0aWNpcGFudC5zb2NrZXRJZCA9PSBzb2NrZXQuaWQgJiYgcGFydGljaXBhbnQubmFtZSA9PSBtZW1iZXIpIHtcbiAgICAgICAgICBwYXJ0aWNpcGFudC52aWRlb09uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHMocGFydGljaXBhbnRzKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSB0cmFuc3BvcnQgY3JlYXRlZCBzdGF0ZVxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZFZpZGVvID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbyh0cmFuc3BvcnRDcmVhdGVkVmlkZW8pO1xuXG4gICAgICAvLyBSZXVwZGF0ZSB0aGUgc2NyZWVuIGRpc3BsYXlcbiAgICAgIGlmIChsb2NrX3NjcmVlbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHtcbiAgICAgICAgICAgIGFkZDogdHJ1ZSxcbiAgICAgICAgICAgIHNjcmVlbkNoYW5nZWQ6IHRydWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIHZpZGVvQWxyZWFkeU9uIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHJlb3JkZXJpbmcgc3RyZWFtcyB3aXRoIGxvY2sgc2NyZWVuOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7XG4gICAgICAgICAgICBhZGQ6IGZhbHNlLFxuICAgICAgICAgICAgc2NyZWVuQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgdmlkZW9BbHJlYWR5T24gfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcmVvcmRlcmluZyBzdHJlYW1zIHdpdGhvdXQgbG9jayBzY3JlZW46JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgY29uc3QgeyBzaG93QWxlcnQgfSA9IHBhcmFtZXRlcnM7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gc3RyZWFtU3VjY2Vzc1ZpZGVvOicsIGVycm9yKTtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19