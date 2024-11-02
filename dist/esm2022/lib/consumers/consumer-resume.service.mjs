import { Injectable } from '@angular/core';
import { MiniAudio } from '../components/display-components/mini-audio/mini-audio.component';
import { MiniAudioPlayer } from '../methods/utils/mini-audio-player/mini-audio-player.component';
import * as i0 from "@angular/core";
/**
 * Resumes a consumer, making it ready for use.
 *
 * @param {ConsumerResumeOptions} options - The options for resuming the consumer.
 * @param {MediaStreamTrack} options.track - The media stream track associated with the resumed consumer.
 * @param {string} options.kind - The type of media ('audio' or 'video') being resumed.
 * @param {string} options.remoteProducerId - The ID of the remote producer associated with the resumed consumer.
 * @param {ResumeParams} options.params - Additional parameters related to the resumed consumer.
 * @param {ConsumerResumeParameters} options.parameters - The parameters object containing various utility functions and state.
 * @param {Socket} options.nsock - The socket associated with the consumer.
 * @throws Will throw an error if an issue occurs during the consumer resumption.
 *
 * @example
 * ```typescript
 * const options = {
 *   track: mediaStreamTrack, // MediaStreamTrack to be resumed
 *   remoteProducerId: 'producer-id', // Remote producer ID
 *   params: {
 *     id: 'consumer-id',
 *     producerId: 'producer-id',
 *     kind: 'audio',
 *     rtpParameters: {},
 *   },
 *   parameters: consumerResumeParameters, // Parameters for the consumer
 *   nsock: socket, // Socket for communication
 * };
 *
 * consumerResume(options)
 *   .then(() => {
 *     console.log('Consumer resumed successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error resuming consumer:', error);
 *   });
 * ```
 */
export class ConsumerResume {
    /**
     * Resumes a consumer, making it ready for use.
     *
     * @param {Object} options - The options object.
     * @param {MediaStreamTrack} options.track - The media stream track associated with the resumed consumer.
     * @param {string} options.kind - The type of media ('audio' or 'video') being resumed.
     * @param {string} options.remoteProducerId - The ID of the remote producer associated with the resumed consumer.
     * @param {Object} options.params - Additional parameters related to the resumed consumer.
     * @param {Object} options.parameters - The parameters object containing various utility functions and state.
     * @param {Object} options.nsock - The socket associated with the consumer.
     * @throws Throws an error if an issue occurs during the consumer resumption.
     */
    consumerResume = async ({ track, remoteProducerId, params, parameters, nsock, }) => {
        try {
            // Get updated parameters
            parameters = parameters.getUpdatedAllParams();
            // Destructure parameters
            let { nStream, allAudioStreams, allVideoStreams, streamNames, audStreamNames, updateMainWindow, shared, shareScreenStarted, screenId, participants, eventType, meetingDisplayType, mainScreenFilled, first_round, lock_screen, oldAllStreams, adminVidID, mainHeightWidth, member, audioOnlyStreams, gotAllVids, defer_receive, firstAll, remoteScreenStream, hostLabel, whiteboardStarted, whiteboardEnded, updateUpdateMainWindow, updateAllAudioStreams, updateAllVideoStreams, updateStreamNames, updateAudStreamNames, updateNStream, updateMainHeightWidth, updateLock_screen, updateFirstAll, updateRemoteScreenStream, updateOldAllStreams, updateAudioOnlyStreams, updateShareScreenStarted, updateGotAllVids, updateScreenId, updateDefer_receive, 
            //mediasfu functions
            reorderStreams, prepopulateUserMedia, } = parameters;
            if (params.kind === 'audio') {
                // Audio resumed
                // Check if the participant with audioID == remoteProducerId has a valid videoID
                let participant = participants.filter((p) => p.audioID === remoteProducerId);
                let name__ = participant.length > 0 ? participant[0].name || '' : '';
                if (name__ === member)
                    return;
                //find any participants with ScreenID not null and ScreenOn == true
                let screenParticipant_alt = participants.filter((participant) => participant.ScreenID != null &&
                    participant.ScreenOn == true &&
                    participant.ScreenID != '');
                if (screenParticipant_alt.length > 0) {
                    screenId = screenParticipant_alt[0].ScreenID;
                    if (screenId) {
                        updateScreenId(screenId);
                    }
                    if (!shared) {
                        shareScreenStarted = true;
                        updateShareScreenStarted(shareScreenStarted);
                    }
                }
                else {
                    if (whiteboardStarted && !whiteboardEnded) {
                        // whiteboard is active
                    }
                    else {
                        screenId = '';
                        updateScreenId(screenId);
                        updateShareScreenStarted(false);
                    }
                }
                // Media display and UI update to prioritize audio/video
                nStream = new MediaStream([track]);
                updateNStream(nStream);
                // Create MiniAudioPlayer track
                let nTrack = {
                    component: MiniAudioPlayer,
                    inputs: {
                        stream: nStream ? nStream : null,
                        remoteProducerId: remoteProducerId,
                        parameters: parameters,
                        MiniAudioComponent: MiniAudio,
                        miniAudioProps: {
                            customStyle: { backgroundColor: 'gray' },
                            name: name__,
                            showWaveform: true,
                            overlayPosition: 'topRight',
                            barColor: 'white',
                            textColor: 'white',
                            imageSource: 'https://mediasfu.com/images/logo192.png',
                            roundedImage: true,
                            imageStyle: {},
                        },
                    },
                };
                // Add to audioOnlyStreams array
                audioOnlyStreams.push(nTrack);
                updateAudioOnlyStreams(audioOnlyStreams);
                // Add to allAudioStreams array; add producerId, stream
                allAudioStreams = [...allAudioStreams, { producerId: remoteProducerId, stream: nStream }];
                updateAllAudioStreams(allAudioStreams);
                let name;
                try {
                    name = participant[0].name;
                }
                catch {
                    /* handle error */
                }
                if (name) {
                    // Add to audStreamNames array; add producerId, name
                    audStreamNames = [...audStreamNames, { producerId: remoteProducerId, name: name__ }];
                    updateAudStreamNames(audStreamNames);
                    if (!mainScreenFilled && participant[0].islevel === '2') {
                        updateMainWindow = true;
                        updateUpdateMainWindow(updateMainWindow);
                        await prepopulateUserMedia({
                            name: hostLabel,
                            parameters: { ...parameters, audStreamNames, allAudioStreams },
                        });
                        updateMainWindow = false;
                        updateUpdateMainWindow(updateMainWindow);
                    }
                }
                else {
                    return;
                }
                // Checks for display type and updates the UI
                let checker;
                let alt_checker = false;
                if (meetingDisplayType == 'video') {
                    checker =
                        participant[0].videoID != null &&
                            participant[0].videoID != '' &&
                            participant[0].videoID != undefined;
                }
                else {
                    checker = true;
                    alt_checker = true;
                }
                if (checker) {
                    if (shareScreenStarted || shared) {
                        if (!alt_checker) {
                            await reorderStreams({
                                parameters: { ...parameters, audStreamNames, allAudioStreams },
                            });
                        }
                    }
                    else {
                        if (alt_checker && meetingDisplayType != 'video') {
                            await reorderStreams({
                                add: false,
                                screenChanged: true,
                                parameters: { ...parameters, audStreamNames, allAudioStreams },
                            });
                        }
                    }
                }
            }
            else {
                // Video resumed
                nStream = new MediaStream([track]);
                updateNStream(nStream);
                //find any participants with ScreenID not null and ScreenOn == true
                let screenParticipant_alt = participants.filter((participant) => participant.ScreenID != null &&
                    participant.ScreenOn == true &&
                    participant.ScreenID != '');
                if (screenParticipant_alt.length > 0) {
                    screenId = screenParticipant_alt[0].ScreenID;
                    if (screenId) {
                        updateScreenId(screenId);
                    }
                    if (!shared) {
                        shareScreenStarted = true;
                        updateShareScreenStarted(shareScreenStarted);
                    }
                }
                else {
                    if (whiteboardStarted && !whiteboardEnded) {
                        // whiteboard is active
                    }
                    else {
                        screenId = '';
                        updateScreenId(screenId);
                        updateShareScreenStarted(false);
                    }
                }
                // Check for display type and update the UI
                if (remoteProducerId == screenId) {
                    // Put on main screen for screen share
                    updateMainWindow = true;
                    updateUpdateMainWindow(updateMainWindow);
                    remoteScreenStream = [{ producerId: remoteProducerId, stream: nStream }];
                    updateRemoteScreenStream(remoteScreenStream);
                    if (eventType == 'conference') {
                        if (shared || shareScreenStarted) {
                            if (mainHeightWidth == 0) {
                                updateMainHeightWidth(84);
                            }
                        }
                        else {
                            if (mainHeightWidth > 0) {
                                updateMainHeightWidth(0);
                            }
                        }
                    }
                    if (!lock_screen) {
                        await prepopulateUserMedia({ name: hostLabel, parameters });
                        await reorderStreams({
                            add: false,
                            screenChanged: true,
                            parameters: { ...parameters, remoteScreenStream, allVideoStreams },
                        });
                    }
                    else {
                        if (!first_round) {
                            await prepopulateUserMedia({
                                name: hostLabel,
                                parameters: {
                                    ...parameters,
                                    remoteScreenStream,
                                    allVideoStreams,
                                },
                            });
                            await reorderStreams({
                                add: false,
                                screenChanged: true,
                                parameters: {
                                    ...parameters,
                                    remoteScreenStream,
                                    allVideoStreams,
                                },
                            });
                        }
                    }
                    lock_screen = true;
                    updateLock_screen(lock_screen);
                    firstAll = true;
                    updateFirstAll(firstAll);
                }
                else {
                    // Non-screen share video resumed
                    // Operations to add video to the UI (either main screen or mini screen)
                    parameters = parameters.getUpdatedAllParams();
                    // Get the name of the participant with videoID == remoteProducerId
                    let participant = participants.filter((participant) => participant.videoID == remoteProducerId);
                    if (participant.length > 0 &&
                        participant[0].name != null &&
                        participant[0].name != '' &&
                        participant[0].name != undefined &&
                        participant[0].name !== member) {
                        allVideoStreams = [
                            ...allVideoStreams,
                            { producerId: remoteProducerId, stream: nStream, socket_: nsock },
                        ];
                        updateAllVideoStreams(allVideoStreams);
                    }
                    if (participant.length > 0) {
                        let name = participant[0].name;
                        streamNames = [...streamNames, { producerId: remoteProducerId, name: name || '' }];
                        updateStreamNames(streamNames);
                    }
                    // If not screenshare, filter out the stream that belongs to the participant with isAdmin = true and islevel == '2' (host)
                    // Find the ID of the participant with isAdmin = true and islevel == '2'
                    if (!shareScreenStarted) {
                        let admin = participants.filter((participant) => participant.isAdmin == true && participant.islevel == '2');
                        // Remove video stream with producerId == admin.id
                        // Get the videoID of the admin
                        if (admin.length > 0) {
                            adminVidID = admin[0].videoID;
                            if (adminVidID != null && adminVidID != '') {
                                let oldAllStreams_ = [];
                                // Check if the length of allVideoStreams is > 0
                                if (oldAllStreams.length > 0) {
                                    oldAllStreams_ = oldAllStreams;
                                }
                                oldAllStreams = allVideoStreams.filter((streame) => streame.producerId == adminVidID);
                                updateOldAllStreams(oldAllStreams);
                                if (oldAllStreams.length < 1) {
                                    oldAllStreams = oldAllStreams_;
                                    updateOldAllStreams(oldAllStreams);
                                }
                                allVideoStreams = allVideoStreams.filter((streame) => streame.producerId != adminVidID);
                                updateAllVideoStreams(allVideoStreams);
                                if (remoteProducerId == adminVidID) {
                                    updateMainWindow = true;
                                }
                            }
                            gotAllVids = true;
                            updateGotAllVids(gotAllVids);
                        }
                    }
                    else {
                        // Check if the videoID is either that of the admin or that of the screen participant
                        let screenParticipant = participants.filter((participant) => participant.ScreenID == screenId);
                        // See if producerId is that of admin videoID or screenParticipant videoID
                        let adminVidID;
                        let screenParticipantVidID;
                        if (screenParticipant.length > 0) {
                            screenParticipantVidID = screenParticipant[0].videoID;
                        }
                        if ((adminVidID != null && adminVidID != '') ||
                            (screenParticipantVidID != null && screenParticipantVidID != '')) {
                            if (adminVidID == remoteProducerId || screenParticipantVidID == remoteProducerId) {
                                await reorderStreams({
                                    parameters: { ...parameters, allVideoStreams },
                                });
                                return;
                            }
                        }
                    }
                    // Update the UI
                    if (lock_screen || shared) {
                        defer_receive = true;
                        updateDefer_receive(defer_receive);
                        if (!first_round) {
                            await reorderStreams({
                                add: false,
                                screenChanged: true,
                                parameters: { ...parameters, allVideoStreams },
                            });
                        }
                    }
                    else {
                        await reorderStreams({
                            add: false,
                            screenChanged: true,
                            parameters: { ...parameters, allVideoStreams },
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log('consumerResume error', error);
            // throw error;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConsumerResume, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConsumerResume, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConsumerResume, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3VtZXItcmVzdW1lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2NvbnN1bWVyLXJlc3VtZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQzs7QUFxRi9GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQU1MLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUN0QixLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixVQUFVLEVBQ1YsS0FBSyxHQUNpQixFQUFpQixFQUFFO1FBQ3pDLElBQUksQ0FBQztZQUNILHlCQUF5QjtZQUN6QixVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFFOUMseUJBQXlCO1lBQ3pCLElBQUksRUFDRixPQUFPLEVBQ1AsZUFBZSxFQUNmLGVBQWUsRUFDZixXQUFXLEVBQ1gsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLFFBQVEsRUFDUixZQUFZLEVBQ1osU0FBUyxFQUNULGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFdBQVcsRUFDWCxhQUFhLEVBRWIsVUFBVSxFQUNWLGVBQWUsRUFDZixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDVixhQUFhLEVBQ2IsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGVBQWUsRUFFZixzQkFBc0IsRUFD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Q0FDSCxPQUFPOzRCQUNULENBQUM7d0JBQ0gsQ0FBQztvQkFDSCxDQUFDO29CQUVELGdCQUFnQjtvQkFDaEIsSUFBSSxXQUFXLElBQUksTUFBTSxFQUFFLENBQUM7d0JBQzFCLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUVuQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ2pCLE1BQU0sY0FBYyxDQUFDO2dDQUNuQixHQUFHLEVBQUUsS0FBSztnQ0FDVixhQUFhLEVBQUUsSUFBSTtnQ0FDbkIsVUFBVSxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsZUFBZSxFQUFFOzZCQUMvQyxDQUFDLENBQUM7d0JBQ0wsQ0FBQztvQkFDSCxDQUFDO3lCQUFNLENBQUM7d0JBQ04sTUFBTSxjQUFjLENBQUM7NEJBQ25CLEdBQUcsRUFBRSxLQUFLOzRCQUNWLGFBQWEsRUFBRSxJQUFJOzRCQUNuQixVQUFVLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRSxlQUFlLEVBQUU7eUJBQy9DLENBQUMsQ0FBQztvQkFDTCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNDLGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E3WlMsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNaW5pQXVkaW8gfSBmcm9tICcuLi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9taW5pLWF1ZGlvL21pbmktYXVkaW8uY29tcG9uZW50JztcbmltcG9ydCB7IE1pbmlBdWRpb1BsYXllciB9IGZyb20gJy4uL21ldGhvZHMvdXRpbHMvbWluaS1hdWRpby1wbGF5ZXIvbWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFBhcnRpY2lwYW50LFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgU3RyZWFtLFxuICBFdmVudFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3VtZXJSZXN1bWVQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyB7XG4gIG5TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgYWxsQXVkaW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIGFsbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBzdHJlYW1OYW1lczogU3RyZWFtW107XG4gIGF1ZFN0cmVhbU5hbWVzOiBTdHJlYW1bXTtcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNjcmVlbklkPzogc3RyaW5nO1xuICBwYXJ0aWNpcGFudHM6IEFycmF5PFBhcnRpY2lwYW50PjtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBtYWluU2NyZWVuRmlsbGVkOiBib29sZWFuO1xuICBmaXJzdF9yb3VuZDogYm9vbGVhbjtcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIG9sZEFsbFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgYWRtaW5WaWRJRD86IHN0cmluZztcbiAgbWFpbkhlaWdodFdpZHRoOiBudW1iZXI7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBhdWRpb09ubHlTdHJlYW1zOiBBcnJheTxhbnk+O1xuICBnb3RBbGxWaWRzOiBib29sZWFuO1xuICBkZWZlcl9yZWNlaXZlOiBib29sZWFuO1xuICBmaXJzdEFsbDogYm9vbGVhbjtcbiAgcmVtb3RlU2NyZWVuU3RyZWFtOiBTdHJlYW1bXTtcbiAgaG9zdExhYmVsOiBzdHJpbmc7XG4gIHdoaXRlYm9hcmRTdGFydGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkRW5kZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQWxsQXVkaW9TdHJlYW1zOiAodmFsdWU6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zOiAodmFsdWU6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlU3RyZWFtTmFtZXM6ICh2YWx1ZTogU3RyZWFtW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZFN0cmVhbU5hbWVzOiAodmFsdWU6IFN0cmVhbVtdKSA9PiB2b2lkO1xuICB1cGRhdGVOU3RyZWFtOiAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlTWFpbkhlaWdodFdpZHRoOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlTG9ja19zY3JlZW46ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRmlyc3RBbGw6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtOiAodmFsdWU6IFN0cmVhbVtdKSA9PiB2b2lkO1xuICB1cGRhdGVPbGRBbGxTdHJlYW1zOiAodmFsdWU6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtczogKHZhbHVlOiBBcnJheTxhbnk+KSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlR290QWxsVmlkczogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5JZDogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZURlZmVyX3JlY2VpdmU6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDb25zdW1lclJlc3VtZVBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuaW50ZXJmYWNlIFJlc3VtZVBhcmFtcyB7XG4gIGlkOiBzdHJpbmc7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAga2luZDogc3RyaW5nO1xuICBydHBQYXJhbWV0ZXJzOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3VtZXJSZXN1bWVPcHRpb25zIHtcbiAgdHJhY2s6IE1lZGlhU3RyZWFtVHJhY2s7XG4gIGtpbmQ6IHN0cmluZztcbiAgcmVtb3RlUHJvZHVjZXJJZDogc3RyaW5nO1xuICBwYXJhbXM6IFJlc3VtZVBhcmFtcztcbiAgcGFyYW1ldGVyczogQ29uc3VtZXJSZXN1bWVQYXJhbWV0ZXJzO1xuICBuc29jazogU29ja2V0O1xufVxuXG4vL2V4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbnN1bWVyUmVzdW1lVHlwZSA9IChvcHRpb25zOiBDb25zdW1lclJlc3VtZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJlc3VtZXMgYSBjb25zdW1lciwgbWFraW5nIGl0IHJlYWR5IGZvciB1c2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uc3VtZXJSZXN1bWVPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlc3VtaW5nIHRoZSBjb25zdW1lci5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbVRyYWNrfSBvcHRpb25zLnRyYWNrIC0gVGhlIG1lZGlhIHN0cmVhbSB0cmFjayBhc3NvY2lhdGVkIHdpdGggdGhlIHJlc3VtZWQgY29uc3VtZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmtpbmQgLSBUaGUgdHlwZSBvZiBtZWRpYSAoJ2F1ZGlvJyBvciAndmlkZW8nKSBiZWluZyByZXN1bWVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZW1vdGVQcm9kdWNlcklkIC0gVGhlIElEIG9mIHRoZSByZW1vdGUgcHJvZHVjZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSByZXN1bWVkIGNvbnN1bWVyLlxuICAgKiBAcGFyYW0ge1Jlc3VtZVBhcmFtc30gb3B0aW9ucy5wYXJhbXMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgcmVsYXRlZCB0byB0aGUgcmVzdW1lZCBjb25zdW1lci5cbiAgICogQHBhcmFtIHtDb25zdW1lclJlc3VtZVBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMgYW5kIHN0YXRlLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5uc29jayAtIFRoZSBzb2NrZXQgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb25zdW1lci5cbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIGFuIGlzc3VlIG9jY3VycyBkdXJpbmcgdGhlIGNvbnN1bWVyIHJlc3VtcHRpb24uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgb3B0aW9ucyA9IHtcbiAgICogICB0cmFjazogbWVkaWFTdHJlYW1UcmFjaywgLy8gTWVkaWFTdHJlYW1UcmFjayB0byBiZSByZXN1bWVkXG4gICAqICAgcmVtb3RlUHJvZHVjZXJJZDogJ3Byb2R1Y2VyLWlkJywgLy8gUmVtb3RlIHByb2R1Y2VyIElEXG4gICAqICAgcGFyYW1zOiB7XG4gICAqICAgICBpZDogJ2NvbnN1bWVyLWlkJyxcbiAgICogICAgIHByb2R1Y2VySWQ6ICdwcm9kdWNlci1pZCcsXG4gICAqICAgICBraW5kOiAnYXVkaW8nLFxuICAgKiAgICAgcnRwUGFyYW1ldGVyczoge30sXG4gICAqICAgfSxcbiAgICogICBwYXJhbWV0ZXJzOiBjb25zdW1lclJlc3VtZVBhcmFtZXRlcnMsIC8vIFBhcmFtZXRlcnMgZm9yIHRoZSBjb25zdW1lclxuICAgKiAgIG5zb2NrOiBzb2NrZXQsIC8vIFNvY2tldCBmb3IgY29tbXVuaWNhdGlvblxuICAgKiB9O1xuICAgKlxuICAgKiBjb25zdW1lclJlc3VtZShvcHRpb25zKVxuICAgKiAgIC50aGVuKCgpID0+IHtcbiAgICogICAgIGNvbnNvbGUubG9nKCdDb25zdW1lciByZXN1bWVkIHN1Y2Nlc3NmdWxseScpO1xuICAgKiAgIH0pXG4gICAqICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgKiAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVzdW1pbmcgY29uc3VtZXI6JywgZXJyb3IpO1xuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbnN1bWVyUmVzdW1lIHtcbiAgLyoqXG4gICAqIFJlc3VtZXMgYSBjb25zdW1lciwgbWFraW5nIGl0IHJlYWR5IGZvciB1c2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtVHJhY2t9IG9wdGlvbnMudHJhY2sgLSBUaGUgbWVkaWEgc3RyZWFtIHRyYWNrIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVzdW1lZCBjb25zdW1lci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMua2luZCAtIFRoZSB0eXBlIG9mIG1lZGlhICgnYXVkaW8nIG9yICd2aWRlbycpIGJlaW5nIHJlc3VtZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlbW90ZVByb2R1Y2VySWQgLSBUaGUgSUQgb2YgdGhlIHJlbW90ZSBwcm9kdWNlciBhc3NvY2lhdGVkIHdpdGggdGhlIHJlc3VtZWQgY29uc3VtZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtcyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyByZWxhdGVkIHRvIHRoZSByZXN1bWVkIGNvbnN1bWVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0IGNvbnRhaW5pbmcgdmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucyBhbmQgc3RhdGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLm5zb2NrIC0gVGhlIHNvY2tldCBhc3NvY2lhdGVkIHdpdGggdGhlIGNvbnN1bWVyLlxuICAgKiBAdGhyb3dzIFRocm93cyBhbiBlcnJvciBpZiBhbiBpc3N1ZSBvY2N1cnMgZHVyaW5nIHRoZSBjb25zdW1lciByZXN1bXB0aW9uLlxuICAgKi9cbiAgY29uc3VtZXJSZXN1bWUgPSBhc3luYyAoe1xuICAgIHRyYWNrLFxuICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgcGFyYW1zLFxuICAgIHBhcmFtZXRlcnMsXG4gICAgbnNvY2ssXG4gIH06IENvbnN1bWVyUmVzdW1lT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgdXBkYXRlZCBwYXJhbWV0ZXJzXG4gICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgIC8vIERlc3RydWN0dXJlIHBhcmFtZXRlcnNcbiAgICAgIGxldCB7XG4gICAgICAgIG5TdHJlYW0sXG4gICAgICAgIGFsbEF1ZGlvU3RyZWFtcyxcbiAgICAgICAgYWxsVmlkZW9TdHJlYW1zLFxuICAgICAgICBzdHJlYW1OYW1lcyxcbiAgICAgICAgYXVkU3RyZWFtTmFtZXMsXG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIHNoYXJlZCxcbiAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgICBzY3JlZW5JZCxcbiAgICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgICBldmVudFR5cGUsXG4gICAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSxcbiAgICAgICAgbWFpblNjcmVlbkZpbGxlZCxcbiAgICAgICAgZmlyc3Rfcm91bmQsXG4gICAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgICBvbGRBbGxTdHJlYW1zLFxuXG4gICAgICAgIGFkbWluVmlkSUQsXG4gICAgICAgIG1haW5IZWlnaHRXaWR0aCxcbiAgICAgICAgbWVtYmVyLFxuICAgICAgICBhdWRpb09ubHlTdHJlYW1zLFxuICAgICAgICBnb3RBbGxWaWRzLFxuICAgICAgICBkZWZlcl9yZWNlaXZlLFxuICAgICAgICBmaXJzdEFsbCxcbiAgICAgICAgcmVtb3RlU2NyZWVuU3RyZWFtLFxuICAgICAgICBob3N0TGFiZWwsXG4gICAgICAgIHdoaXRlYm9hcmRTdGFydGVkLFxuICAgICAgICB3aGl0ZWJvYXJkRW5kZWQsXG5cbiAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgdXBkYXRlQWxsQXVkaW9TdHJlYW1zLFxuICAgICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMsXG4gICAgICAgIHVwZGF0ZVN0cmVhbU5hbWVzLFxuICAgICAgICB1cGRhdGVBdWRTdHJlYW1OYW1lcyxcbiAgICAgICAgdXBkYXRlTlN0cmVhbSxcbiAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoLFxuICAgICAgICB1cGRhdGVMb2NrX3NjcmVlbixcbiAgICAgICAgdXBkYXRlRmlyc3RBbGwsXG4gICAgICAgIHVwZGF0ZVJlbW90ZVNjcmVlblN0cmVhbSxcbiAgICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtcyxcbiAgICAgICAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtcyxcbiAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgICB1cGRhdGVHb3RBbGxWaWRzLFxuICAgICAgICB1cGRhdGVTY3JlZW5JZCxcbiAgICAgICAgdXBkYXRlRGVmZXJfcmVjZWl2ZSxcblxuICAgICAgICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgICByZW9yZGVyU3RyZWFtcyxcbiAgICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWEsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgaWYgKHBhcmFtcy5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgIC8vIEF1ZGlvIHJlc3VtZWRcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcGFydGljaXBhbnQgd2l0aCBhdWRpb0lEID09IHJlbW90ZVByb2R1Y2VySWQgaGFzIGEgdmFsaWQgdmlkZW9JRFxuICAgICAgICBsZXQgcGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmlsdGVyKChwKSA9PiBwLmF1ZGlvSUQgPT09IHJlbW90ZVByb2R1Y2VySWQpO1xuICAgICAgICBsZXQgbmFtZV9fID0gcGFydGljaXBhbnQubGVuZ3RoID4gMCA/IHBhcnRpY2lwYW50WzBdLm5hbWUgfHwgJycgOiAnJztcblxuICAgICAgICBpZiAobmFtZV9fID09PSBtZW1iZXIpIHJldHVybjtcblxuICAgICAgICAvL2ZpbmQgYW55IHBhcnRpY2lwYW50cyB3aXRoIFNjcmVlbklEIG5vdCBudWxsIGFuZCBTY3JlZW5PbiA9PSB0cnVlXG4gICAgICAgIGxldCBzY3JlZW5QYXJ0aWNpcGFudF9hbHQgPSBwYXJ0aWNpcGFudHMuZmlsdGVyKFxuICAgICAgICAgIChwYXJ0aWNpcGFudCkgPT5cbiAgICAgICAgICAgIHBhcnRpY2lwYW50LlNjcmVlbklEICE9IG51bGwgJiZcbiAgICAgICAgICAgIHBhcnRpY2lwYW50LlNjcmVlbk9uID09IHRydWUgJiZcbiAgICAgICAgICAgIHBhcnRpY2lwYW50LlNjcmVlbklEICE9ICcnLFxuICAgICAgICApO1xuICAgICAgICBpZiAoc2NyZWVuUGFydGljaXBhbnRfYWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzY3JlZW5JZCA9IHNjcmVlblBhcnRpY2lwYW50X2FsdFswXS5TY3JlZW5JRDtcbiAgICAgICAgICBpZiAoc2NyZWVuSWQpIHtcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlbklkKHNjcmVlbklkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFzaGFyZWQpIHtcbiAgICAgICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoc2hhcmVTY3JlZW5TdGFydGVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICAgIC8vIHdoaXRlYm9hcmQgaXMgYWN0aXZlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcmVlbklkID0gJyc7XG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5JZChzY3JlZW5JZCk7XG4gICAgICAgICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1lZGlhIGRpc3BsYXkgYW5kIFVJIHVwZGF0ZSB0byBwcmlvcml0aXplIGF1ZGlvL3ZpZGVvXG4gICAgICAgIG5TdHJlYW0gPSBuZXcgTWVkaWFTdHJlYW0oW3RyYWNrXSk7XG4gICAgICAgIHVwZGF0ZU5TdHJlYW0oblN0cmVhbSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIE1pbmlBdWRpb1BsYXllciB0cmFja1xuICAgICAgICBsZXQgblRyYWNrID0ge1xuICAgICAgICAgIGNvbXBvbmVudDogTWluaUF1ZGlvUGxheWVyLFxuICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgc3RyZWFtOiBuU3RyZWFtID8gblN0cmVhbSA6IG51bGwsXG4gICAgICAgICAgICByZW1vdGVQcm9kdWNlcklkOiByZW1vdGVQcm9kdWNlcklkLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogcGFyYW1ldGVycyxcbiAgICAgICAgICAgIE1pbmlBdWRpb0NvbXBvbmVudDogTWluaUF1ZGlvLFxuICAgICAgICAgICAgbWluaUF1ZGlvUHJvcHM6IHtcbiAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiAnZ3JheScgfSxcbiAgICAgICAgICAgICAgbmFtZTogbmFtZV9fLFxuICAgICAgICAgICAgICBzaG93V2F2ZWZvcm06IHRydWUsXG4gICAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbjogJ3RvcFJpZ2h0JyxcbiAgICAgICAgICAgICAgYmFyQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgaW1hZ2VTb3VyY2U6ICdodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvbG9nbzE5Mi5wbmcnLFxuICAgICAgICAgICAgICByb3VuZGVkSW1hZ2U6IHRydWUsXG4gICAgICAgICAgICAgIGltYWdlU3R5bGU6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFkZCB0byBhdWRpb09ubHlTdHJlYW1zIGFycmF5XG4gICAgICAgIGF1ZGlvT25seVN0cmVhbXMucHVzaChuVHJhY2spO1xuICAgICAgICB1cGRhdGVBdWRpb09ubHlTdHJlYW1zKGF1ZGlvT25seVN0cmVhbXMpO1xuXG4gICAgICAgIC8vIEFkZCB0byBhbGxBdWRpb1N0cmVhbXMgYXJyYXk7IGFkZCBwcm9kdWNlcklkLCBzdHJlYW1cbiAgICAgICAgYWxsQXVkaW9TdHJlYW1zID0gWy4uLmFsbEF1ZGlvU3RyZWFtcywgeyBwcm9kdWNlcklkOiByZW1vdGVQcm9kdWNlcklkLCBzdHJlYW06IG5TdHJlYW0gfV07XG4gICAgICAgIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtcyhhbGxBdWRpb1N0cmVhbXMpO1xuXG4gICAgICAgIGxldCBuYW1lO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbmFtZSA9IHBhcnRpY2lwYW50WzBdLm5hbWU7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAvLyBBZGQgdG8gYXVkU3RyZWFtTmFtZXMgYXJyYXk7IGFkZCBwcm9kdWNlcklkLCBuYW1lXG4gICAgICAgICAgYXVkU3RyZWFtTmFtZXMgPSBbLi4uYXVkU3RyZWFtTmFtZXMsIHsgcHJvZHVjZXJJZDogcmVtb3RlUHJvZHVjZXJJZCwgbmFtZTogbmFtZV9fIH1dO1xuICAgICAgICAgIHVwZGF0ZUF1ZFN0cmVhbU5hbWVzKGF1ZFN0cmVhbU5hbWVzKTtcblxuICAgICAgICAgIGlmICghbWFpblNjcmVlbkZpbGxlZCAmJiBwYXJ0aWNpcGFudFswXS5pc2xldmVsID09PSAnMicpIHtcbiAgICAgICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgICAgICAgbmFtZTogaG9zdExhYmVsLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIGF1ZFN0cmVhbU5hbWVzLCBhbGxBdWRpb1N0cmVhbXMgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IGZhbHNlO1xuICAgICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2tzIGZvciBkaXNwbGF5IHR5cGUgYW5kIHVwZGF0ZXMgdGhlIFVJXG4gICAgICAgIGxldCBjaGVja2VyO1xuICAgICAgICBsZXQgYWx0X2NoZWNrZXIgPSBmYWxzZTtcblxuICAgICAgICBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09ICd2aWRlbycpIHtcbiAgICAgICAgICBjaGVja2VyID1cbiAgICAgICAgICAgIHBhcnRpY2lwYW50WzBdLnZpZGVvSUQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgcGFydGljaXBhbnRbMF0udmlkZW9JRCAhPSAnJyAmJlxuICAgICAgICAgICAgcGFydGljaXBhbnRbMF0udmlkZW9JRCAhPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hlY2tlciA9IHRydWU7XG4gICAgICAgICAgYWx0X2NoZWNrZXIgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrZXIpIHtcbiAgICAgICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICAgICAgaWYgKCFhbHRfY2hlY2tlcikge1xuICAgICAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7XG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBhdWRTdHJlYW1OYW1lcywgYWxsQXVkaW9TdHJlYW1zIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWx0X2NoZWNrZXIgJiYgbWVldGluZ0Rpc3BsYXlUeXBlICE9ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoe1xuICAgICAgICAgICAgICAgIGFkZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2NyZWVuQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIGF1ZFN0cmVhbU5hbWVzLCBhbGxBdWRpb1N0cmVhbXMgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBWaWRlbyByZXN1bWVkXG4gICAgICAgIG5TdHJlYW0gPSBuZXcgTWVkaWFTdHJlYW0oW3RyYWNrXSk7XG4gICAgICAgIHVwZGF0ZU5TdHJlYW0oblN0cmVhbSk7XG5cbiAgICAgICAgLy9maW5kIGFueSBwYXJ0aWNpcGFudHMgd2l0aCBTY3JlZW5JRCBub3QgbnVsbCBhbmQgU2NyZWVuT24gPT0gdHJ1ZVxuICAgICAgICBsZXQgc2NyZWVuUGFydGljaXBhbnRfYWx0ID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgICAgICAocGFydGljaXBhbnQpID0+XG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5TY3JlZW5JRCAhPSBudWxsICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5TY3JlZW5PbiA9PSB0cnVlICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5TY3JlZW5JRCAhPSAnJyxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHNjcmVlblBhcnRpY2lwYW50X2FsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc2NyZWVuSWQgPSBzY3JlZW5QYXJ0aWNpcGFudF9hbHRbMF0uU2NyZWVuSUQ7XG4gICAgICAgICAgaWYgKHNjcmVlbklkKSB7XG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5JZChzY3JlZW5JZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghc2hhcmVkKSB7XG4gICAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHNoYXJlU2NyZWVuU3RhcnRlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh3aGl0ZWJvYXJkU3RhcnRlZCAmJiAhd2hpdGVib2FyZEVuZGVkKSB7XG4gICAgICAgICAgICAvLyB3aGl0ZWJvYXJkIGlzIGFjdGl2ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY3JlZW5JZCA9ICcnO1xuICAgICAgICAgICAgdXBkYXRlU2NyZWVuSWQoc2NyZWVuSWQpO1xuICAgICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBmb3IgZGlzcGxheSB0eXBlIGFuZCB1cGRhdGUgdGhlIFVJXG4gICAgICAgIGlmIChyZW1vdGVQcm9kdWNlcklkID09IHNjcmVlbklkKSB7XG4gICAgICAgICAgLy8gUHV0IG9uIG1haW4gc2NyZWVuIGZvciBzY3JlZW4gc2hhcmVcbiAgICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgICAgIHJlbW90ZVNjcmVlblN0cmVhbSA9IFt7IHByb2R1Y2VySWQ6IHJlbW90ZVByb2R1Y2VySWQsIHN0cmVhbTogblN0cmVhbSB9XTtcbiAgICAgICAgICB1cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW0ocmVtb3RlU2NyZWVuU3RyZWFtKTtcblxuICAgICAgICAgIGlmIChldmVudFR5cGUgPT0gJ2NvbmZlcmVuY2UnKSB7XG4gICAgICAgICAgICBpZiAoc2hhcmVkIHx8IHNoYXJlU2NyZWVuU3RhcnRlZCkge1xuICAgICAgICAgICAgICBpZiAobWFpbkhlaWdodFdpZHRoID09IDApIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgoODQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobWFpbkhlaWdodFdpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCgwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghbG9ja19zY3JlZW4pIHtcbiAgICAgICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoe1xuICAgICAgICAgICAgICBhZGQ6IGZhbHNlLFxuICAgICAgICAgICAgICBzY3JlZW5DaGFuZ2VkOiB0cnVlLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIHJlbW90ZVNjcmVlblN0cmVhbSwgYWxsVmlkZW9TdHJlYW1zIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFmaXJzdF9yb3VuZCkge1xuICAgICAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgICAgICAgICAgbmFtZTogaG9zdExhYmVsLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICAgIC4uLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICByZW1vdGVTY3JlZW5TdHJlYW0sXG4gICAgICAgICAgICAgICAgICBhbGxWaWRlb1N0cmVhbXMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHtcbiAgICAgICAgICAgICAgICBhZGQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNjcmVlbkNoYW5nZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAgICAgLi4ucGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIHJlbW90ZVNjcmVlblN0cmVhbSxcbiAgICAgICAgICAgICAgICAgIGFsbFZpZGVvU3RyZWFtcyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsb2NrX3NjcmVlbiA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlTG9ja19zY3JlZW4obG9ja19zY3JlZW4pO1xuICAgICAgICAgIGZpcnN0QWxsID0gdHJ1ZTtcbiAgICAgICAgICB1cGRhdGVGaXJzdEFsbChmaXJzdEFsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTm9uLXNjcmVlbiBzaGFyZSB2aWRlbyByZXN1bWVkXG5cbiAgICAgICAgICAvLyBPcGVyYXRpb25zIHRvIGFkZCB2aWRlbyB0byB0aGUgVUkgKGVpdGhlciBtYWluIHNjcmVlbiBvciBtaW5pIHNjcmVlbilcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgICAgICAvLyBHZXQgdGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IHdpdGggdmlkZW9JRCA9PSByZW1vdGVQcm9kdWNlcklkXG4gICAgICAgICAgbGV0IHBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgICAgICAgIChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQudmlkZW9JRCA9PSByZW1vdGVQcm9kdWNlcklkLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudFswXS5uYW1lICE9IG51bGwgJiZcbiAgICAgICAgICAgIHBhcnRpY2lwYW50WzBdLm5hbWUgIT0gJycgJiZcbiAgICAgICAgICAgIHBhcnRpY2lwYW50WzBdLm5hbWUgIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudFswXS5uYW1lICE9PSBtZW1iZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFsbFZpZGVvU3RyZWFtcyA9IFtcbiAgICAgICAgICAgICAgLi4uYWxsVmlkZW9TdHJlYW1zLFxuICAgICAgICAgICAgICB7IHByb2R1Y2VySWQ6IHJlbW90ZVByb2R1Y2VySWQsIHN0cmVhbTogblN0cmVhbSwgc29ja2V0XzogbnNvY2sgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMoYWxsVmlkZW9TdHJlYW1zKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFydGljaXBhbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBwYXJ0aWNpcGFudFswXS5uYW1lO1xuICAgICAgICAgICAgc3RyZWFtTmFtZXMgPSBbLi4uc3RyZWFtTmFtZXMsIHsgcHJvZHVjZXJJZDogcmVtb3RlUHJvZHVjZXJJZCwgbmFtZTogbmFtZSB8fCAnJyB9XTtcbiAgICAgICAgICAgIHVwZGF0ZVN0cmVhbU5hbWVzKHN0cmVhbU5hbWVzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiBub3Qgc2NyZWVuc2hhcmUsIGZpbHRlciBvdXQgdGhlIHN0cmVhbSB0aGF0IGJlbG9uZ3MgdG8gdGhlIHBhcnRpY2lwYW50IHdpdGggaXNBZG1pbiA9IHRydWUgYW5kIGlzbGV2ZWwgPT0gJzInIChob3N0KVxuICAgICAgICAgIC8vIEZpbmQgdGhlIElEIG9mIHRoZSBwYXJ0aWNpcGFudCB3aXRoIGlzQWRtaW4gPSB0cnVlIGFuZCBpc2xldmVsID09ICcyJ1xuICAgICAgICAgIGlmICghc2hhcmVTY3JlZW5TdGFydGVkKSB7XG4gICAgICAgICAgICBsZXQgYWRtaW4gPSBwYXJ0aWNpcGFudHMuZmlsdGVyKFxuICAgICAgICAgICAgICAocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LmlzQWRtaW4gPT0gdHJ1ZSAmJiBwYXJ0aWNpcGFudC5pc2xldmVsID09ICcyJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdmlkZW8gc3RyZWFtIHdpdGggcHJvZHVjZXJJZCA9PSBhZG1pbi5pZFxuICAgICAgICAgICAgLy8gR2V0IHRoZSB2aWRlb0lEIG9mIHRoZSBhZG1pblxuXG4gICAgICAgICAgICBpZiAoYWRtaW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBhZG1pblZpZElEID0gYWRtaW5bMF0udmlkZW9JRDtcblxuICAgICAgICAgICAgICBpZiAoYWRtaW5WaWRJRCAhPSBudWxsICYmIGFkbWluVmlkSUQgIT0gJycpIHtcbiAgICAgICAgICAgICAgICBsZXQgb2xkQWxsU3RyZWFtc186IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSA9IFtdO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBsZW5ndGggb2YgYWxsVmlkZW9TdHJlYW1zIGlzID4gMFxuICAgICAgICAgICAgICAgIGlmIChvbGRBbGxTdHJlYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIG9sZEFsbFN0cmVhbXNfID0gb2xkQWxsU3RyZWFtcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvbGRBbGxTdHJlYW1zID0gYWxsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgIChzdHJlYW1lKSA9PiBzdHJlYW1lLnByb2R1Y2VySWQgPT0gYWRtaW5WaWRJRCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU9sZEFsbFN0cmVhbXMob2xkQWxsU3RyZWFtcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAob2xkQWxsU3RyZWFtcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICBvbGRBbGxTdHJlYW1zID0gb2xkQWxsU3RyZWFtc187XG4gICAgICAgICAgICAgICAgICB1cGRhdGVPbGRBbGxTdHJlYW1zKG9sZEFsbFN0cmVhbXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFsbFZpZGVvU3RyZWFtcyA9IGFsbFZpZGVvU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAoc3RyZWFtZSkgPT4gc3RyZWFtZS5wcm9kdWNlcklkICE9IGFkbWluVmlkSUQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMoYWxsVmlkZW9TdHJlYW1zKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZW1vdGVQcm9kdWNlcklkID09IGFkbWluVmlkSUQpIHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGdvdEFsbFZpZHMgPSB0cnVlO1xuICAgICAgICAgICAgICB1cGRhdGVHb3RBbGxWaWRzKGdvdEFsbFZpZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmlkZW9JRCBpcyBlaXRoZXIgdGhhdCBvZiB0aGUgYWRtaW4gb3IgdGhhdCBvZiB0aGUgc2NyZWVuIHBhcnRpY2lwYW50XG4gICAgICAgICAgICBsZXQgc2NyZWVuUGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmlsdGVyKFxuICAgICAgICAgICAgICAocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LlNjcmVlbklEID09IHNjcmVlbklkLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gU2VlIGlmIHByb2R1Y2VySWQgaXMgdGhhdCBvZiBhZG1pbiB2aWRlb0lEIG9yIHNjcmVlblBhcnRpY2lwYW50IHZpZGVvSURcbiAgICAgICAgICAgIGxldCBhZG1pblZpZElEO1xuXG4gICAgICAgICAgICBsZXQgc2NyZWVuUGFydGljaXBhbnRWaWRJRDtcbiAgICAgICAgICAgIGlmIChzY3JlZW5QYXJ0aWNpcGFudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHNjcmVlblBhcnRpY2lwYW50VmlkSUQgPSBzY3JlZW5QYXJ0aWNpcGFudFswXS52aWRlb0lEO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChhZG1pblZpZElEICE9IG51bGwgJiYgYWRtaW5WaWRJRCAhPSAnJykgfHxcbiAgICAgICAgICAgICAgKHNjcmVlblBhcnRpY2lwYW50VmlkSUQgIT0gbnVsbCAmJiBzY3JlZW5QYXJ0aWNpcGFudFZpZElEICE9ICcnKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGlmIChhZG1pblZpZElEID09IHJlbW90ZVByb2R1Y2VySWQgfHwgc2NyZWVuUGFydGljaXBhbnRWaWRJRCA9PSByZW1vdGVQcm9kdWNlcklkKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoe1xuICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBhbGxWaWRlb1N0cmVhbXMgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBVcGRhdGUgdGhlIFVJXG4gICAgICAgICAgaWYgKGxvY2tfc2NyZWVuIHx8IHNoYXJlZCkge1xuICAgICAgICAgICAgZGVmZXJfcmVjZWl2ZSA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVEZWZlcl9yZWNlaXZlKGRlZmVyX3JlY2VpdmUpO1xuXG4gICAgICAgICAgICBpZiAoIWZpcnN0X3JvdW5kKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHtcbiAgICAgICAgICAgICAgICBhZGQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNjcmVlbkNoYW5nZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBhbGxWaWRlb1N0cmVhbXMgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHtcbiAgICAgICAgICAgICAgYWRkOiBmYWxzZSxcbiAgICAgICAgICAgICAgc2NyZWVuQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBhbGxWaWRlb1N0cmVhbXMgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnY29uc3VtZXJSZXN1bWUgZXJyb3InLCBlcnJvcik7XG4gICAgICAvLyB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG59XG4iXX0=