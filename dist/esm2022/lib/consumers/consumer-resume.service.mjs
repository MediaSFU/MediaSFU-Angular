import { Injectable } from '@angular/core';
import { MiniAudio } from '../components/display-components/mini-audio/mini-audio.component';
import { MiniAudioPlayer } from '../methods/utils/mini-audio-player/mini-audio-player.component';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3VtZXItcmVzdW1lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2NvbnN1bWVyLXJlc3VtZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQzs7QUF3RmpHLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUN0QixLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixVQUFVLEVBQ1YsS0FBSyxHQUNpQixFQUFpQixFQUFFO1FBQ3pDLElBQUksQ0FBQztZQUNILHlCQUF5QjtZQUN6QixVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFFOUMseUJBQXlCO1lBQ3pCLElBQUksRUFDRixPQUFPLEVBQ1AsZUFBZSxFQUNmLGVBQWUsRUFDZixXQUFXLEVBQ1gsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLFFBQVEsRUFDUixZQUFZLEVBQ1osU0FBUyxFQUNULGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFdBQVcsRUFDWCxhQUFhLEVBRWIsVUFBVSxFQUNWLGVBQWUsRUFDZixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDVixhQUFhLEVBQ2IsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGVBQWUsRUFFZixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIsb0JB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QUVELGdCQUFnQjtvQkFDaEIsSUFBSSxXQUFXLElBQUksTUFBTSxFQUFFLENBQUM7d0JBQzFCLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUVuQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ2pCLE1BQU0sY0FBYyxDQUFDO2dDQUNuQixHQUFHLEVBQUUsS0FBSztnQ0FDVixhQUFhLEVBQUUsSUFBSTtnQ0FDbkIsVUFBVSxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsZUFBZSxFQUFFOzZCQUMvQyxDQUFDLENBQUM7d0JBQ0wsQ0FBQztvQkFDSCxDQUFDO3lCQUFNLENBQUM7d0JBQ04sTUFBTSxjQUFjLENBQUM7NEJBQ25CLEdBQUcsRUFBRSxLQUFLOzRCQUNWLGFBQWEsRUFBRSxJQUFJOzRCQUNuQixVQUFVLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRSxlQUFlLEVBQUU7eUJBQy9DLENBQUMsQ0FBQztvQkFDTCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNDLGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E3WlMsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNaW5pQXVkaW8gfSBmcm9tICcuLi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9taW5pLWF1ZGlvL21pbmktYXVkaW8uY29tcG9uZW50JztcbmltcG9ydCB7IE1pbmlBdWRpb1BsYXllciB9IGZyb20gJy4uL21ldGhvZHMvdXRpbHMvbWluaS1hdWRpby1wbGF5ZXIvbWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFBhcnRpY2lwYW50LFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgU3RyZWFtLFxuICBFdmVudFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3VtZXJSZXN1bWVQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyB7XG4gIG5TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgYWxsQXVkaW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIGFsbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBzdHJlYW1OYW1lczogU3RyZWFtW107XG4gIGF1ZFN0cmVhbU5hbWVzOiBTdHJlYW1bXTtcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNjcmVlbklkPzogc3RyaW5nO1xuICBwYXJ0aWNpcGFudHM6IEFycmF5PFBhcnRpY2lwYW50PjtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBtYWluU2NyZWVuRmlsbGVkOiBib29sZWFuO1xuICBmaXJzdF9yb3VuZDogYm9vbGVhbjtcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIG9sZEFsbFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgYWRtaW5WaWRJRD86IHN0cmluZztcbiAgbWFpbkhlaWdodFdpZHRoOiBudW1iZXI7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBhdWRpb09ubHlTdHJlYW1zOiBBcnJheTxhbnk+O1xuICBnb3RBbGxWaWRzOiBib29sZWFuO1xuICBkZWZlcl9yZWNlaXZlOiBib29sZWFuO1xuICBmaXJzdEFsbDogYm9vbGVhbjtcbiAgcmVtb3RlU2NyZWVuU3RyZWFtOiBTdHJlYW1bXTtcbiAgaG9zdExhYmVsOiBzdHJpbmc7XG4gIHdoaXRlYm9hcmRTdGFydGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkRW5kZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQWxsQXVkaW9TdHJlYW1zOiAodmFsdWU6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zOiAodmFsdWU6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlU3RyZWFtTmFtZXM6ICh2YWx1ZTogU3RyZWFtW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZFN0cmVhbU5hbWVzOiAodmFsdWU6IFN0cmVhbVtdKSA9PiB2b2lkO1xuICB1cGRhdGVOU3RyZWFtOiAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlTWFpbkhlaWdodFdpZHRoOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlTG9ja19zY3JlZW46ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRmlyc3RBbGw6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtOiAodmFsdWU6IFN0cmVhbVtdKSA9PiB2b2lkO1xuICB1cGRhdGVPbGRBbGxTdHJlYW1zOiAodmFsdWU6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtczogKHZhbHVlOiBBcnJheTxhbnk+KSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlR290QWxsVmlkczogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5JZDogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZURlZmVyX3JlY2VpdmU6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDb25zdW1lclJlc3VtZVBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuaW50ZXJmYWNlIFJlc3VtZVBhcmFtcyB7XG4gIGlkOiBzdHJpbmc7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAga2luZDogc3RyaW5nO1xuICBydHBQYXJhbWV0ZXJzOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3VtZXJSZXN1bWVPcHRpb25zIHtcbiAgdHJhY2s6IE1lZGlhU3RyZWFtVHJhY2s7XG4gIGtpbmQ6IHN0cmluZztcbiAgcmVtb3RlUHJvZHVjZXJJZDogc3RyaW5nO1xuICBwYXJhbXM6IFJlc3VtZVBhcmFtcztcbiAgcGFyYW1ldGVyczogQ29uc3VtZXJSZXN1bWVQYXJhbWV0ZXJzO1xuICBuc29jazogU29ja2V0O1xufVxuXG4vL2V4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbnN1bWVyUmVzdW1lVHlwZSA9IChvcHRpb25zOiBDb25zdW1lclJlc3VtZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25zdW1lclJlc3VtZSB7XG4gIC8qKlxuICAgKiBSZXN1bWVzIGEgY29uc3VtZXIsIG1ha2luZyBpdCByZWFkeSBmb3IgdXNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbVRyYWNrfSBvcHRpb25zLnRyYWNrIC0gVGhlIG1lZGlhIHN0cmVhbSB0cmFjayBhc3NvY2lhdGVkIHdpdGggdGhlIHJlc3VtZWQgY29uc3VtZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmtpbmQgLSBUaGUgdHlwZSBvZiBtZWRpYSAoJ2F1ZGlvJyBvciAndmlkZW8nKSBiZWluZyByZXN1bWVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZW1vdGVQcm9kdWNlcklkIC0gVGhlIElEIG9mIHRoZSByZW1vdGUgcHJvZHVjZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSByZXN1bWVkIGNvbnN1bWVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbXMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgcmVsYXRlZCB0byB0aGUgcmVzdW1lZCBjb25zdW1lci5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMgYW5kIHN0YXRlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5uc29jayAtIFRoZSBzb2NrZXQgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb25zdW1lci5cbiAgICogQHRocm93cyBUaHJvd3MgYW4gZXJyb3IgaWYgYW4gaXNzdWUgb2NjdXJzIGR1cmluZyB0aGUgY29uc3VtZXIgcmVzdW1wdGlvbi5cbiAgICovXG4gIGNvbnN1bWVyUmVzdW1lID0gYXN5bmMgKHtcbiAgICB0cmFjayxcbiAgICByZW1vdGVQcm9kdWNlcklkLFxuICAgIHBhcmFtcyxcbiAgICBwYXJhbWV0ZXJzLFxuICAgIG5zb2NrLFxuICB9OiBDb25zdW1lclJlc3VtZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gR2V0IHVwZGF0ZWQgcGFyYW1ldGVyc1xuICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBsZXQge1xuICAgICAgICBuU3RyZWFtLFxuICAgICAgICBhbGxBdWRpb1N0cmVhbXMsXG4gICAgICAgIGFsbFZpZGVvU3RyZWFtcyxcbiAgICAgICAgc3RyZWFtTmFtZXMsXG4gICAgICAgIGF1ZFN0cmVhbU5hbWVzLFxuICAgICAgICB1cGRhdGVNYWluV2luZG93LFxuICAgICAgICBzaGFyZWQsXG4gICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgc2NyZWVuSWQsXG4gICAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICAgIG1haW5TY3JlZW5GaWxsZWQsXG4gICAgICAgIGZpcnN0X3JvdW5kLFxuICAgICAgICBsb2NrX3NjcmVlbixcbiAgICAgICAgb2xkQWxsU3RyZWFtcyxcblxuICAgICAgICBhZG1pblZpZElELFxuICAgICAgICBtYWluSGVpZ2h0V2lkdGgsXG4gICAgICAgIG1lbWJlcixcbiAgICAgICAgYXVkaW9Pbmx5U3RyZWFtcyxcbiAgICAgICAgZ290QWxsVmlkcyxcbiAgICAgICAgZGVmZXJfcmVjZWl2ZSxcbiAgICAgICAgZmlyc3RBbGwsXG4gICAgICAgIHJlbW90ZVNjcmVlblN0cmVhbSxcbiAgICAgICAgaG9zdExhYmVsLFxuICAgICAgICB3aGl0ZWJvYXJkU3RhcnRlZCxcbiAgICAgICAgd2hpdGVib2FyZEVuZGVkLFxuXG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtcyxcbiAgICAgICAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zLFxuICAgICAgICB1cGRhdGVTdHJlYW1OYW1lcyxcbiAgICAgICAgdXBkYXRlQXVkU3RyZWFtTmFtZXMsXG4gICAgICAgIHVwZGF0ZU5TdHJlYW0sXG4gICAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCxcbiAgICAgICAgdXBkYXRlTG9ja19zY3JlZW4sXG4gICAgICAgIHVwZGF0ZUZpcnN0QWxsLFxuICAgICAgICB1cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW0sXG4gICAgICAgIHVwZGF0ZU9sZEFsbFN0cmVhbXMsXG4gICAgICAgIHVwZGF0ZUF1ZGlvT25seVN0cmVhbXMsXG4gICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgdXBkYXRlR290QWxsVmlkcyxcbiAgICAgICAgdXBkYXRlU2NyZWVuSWQsXG4gICAgICAgIHVwZGF0ZURlZmVyX3JlY2VpdmUsXG5cbiAgICAgICAgLy9tZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIGlmIChwYXJhbXMua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAvLyBBdWRpbyByZXN1bWVkXG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHBhcnRpY2lwYW50IHdpdGggYXVkaW9JRCA9PSByZW1vdGVQcm9kdWNlcklkIGhhcyBhIHZhbGlkIHZpZGVvSURcbiAgICAgICAgbGV0IHBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbHRlcigocCkgPT4gcC5hdWRpb0lEID09PSByZW1vdGVQcm9kdWNlcklkKTtcbiAgICAgICAgbGV0IG5hbWVfXyA9IHBhcnRpY2lwYW50Lmxlbmd0aCA+IDAgPyBwYXJ0aWNpcGFudFswXS5uYW1lIHx8ICcnIDogJyc7XG5cbiAgICAgICAgaWYgKG5hbWVfXyA9PT0gbWVtYmVyKSByZXR1cm47XG5cbiAgICAgICAgLy9maW5kIGFueSBwYXJ0aWNpcGFudHMgd2l0aCBTY3JlZW5JRCBub3QgbnVsbCBhbmQgU2NyZWVuT24gPT0gdHJ1ZVxuICAgICAgICBsZXQgc2NyZWVuUGFydGljaXBhbnRfYWx0ID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgICAgICAocGFydGljaXBhbnQpID0+XG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5TY3JlZW5JRCAhPSBudWxsICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5TY3JlZW5PbiA9PSB0cnVlICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5TY3JlZW5JRCAhPSAnJyxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHNjcmVlblBhcnRpY2lwYW50X2FsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc2NyZWVuSWQgPSBzY3JlZW5QYXJ0aWNpcGFudF9hbHRbMF0uU2NyZWVuSUQ7XG4gICAgICAgICAgaWYgKHNjcmVlbklkKSB7XG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5JZChzY3JlZW5JZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghc2hhcmVkKSB7XG4gICAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHNoYXJlU2NyZWVuU3RhcnRlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh3aGl0ZWJvYXJkU3RhcnRlZCAmJiAhd2hpdGVib2FyZEVuZGVkKSB7XG4gICAgICAgICAgICAvLyB3aGl0ZWJvYXJkIGlzIGFjdGl2ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY3JlZW5JZCA9ICcnO1xuICAgICAgICAgICAgdXBkYXRlU2NyZWVuSWQoc2NyZWVuSWQpO1xuICAgICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNZWRpYSBkaXNwbGF5IGFuZCBVSSB1cGRhdGUgdG8gcHJpb3JpdGl6ZSBhdWRpby92aWRlb1xuICAgICAgICBuU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKFt0cmFja10pO1xuICAgICAgICB1cGRhdGVOU3RyZWFtKG5TdHJlYW0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBNaW5pQXVkaW9QbGF5ZXIgdHJhY2tcbiAgICAgICAgbGV0IG5UcmFjayA9IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE1pbmlBdWRpb1BsYXllcixcbiAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgIHN0cmVhbTogblN0cmVhbSA/IG5TdHJlYW0gOiBudWxsLFxuICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZDogcmVtb3RlUHJvZHVjZXJJZCxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXG4gICAgICAgICAgICBNaW5pQXVkaW9Db21wb25lbnQ6IE1pbmlBdWRpbyxcbiAgICAgICAgICAgIG1pbmlBdWRpb1Byb3BzOiB7XG4gICAgICAgICAgICAgIGN1c3RvbVN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogJ2dyYXknIH0sXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWVfXyxcbiAgICAgICAgICAgICAgc2hvd1dhdmVmb3JtOiB0cnVlLFxuICAgICAgICAgICAgICBvdmVybGF5UG9zaXRpb246ICd0b3BSaWdodCcsXG4gICAgICAgICAgICAgIGJhckNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIGltYWdlU291cmNlOiAnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL2xvZ28xOTIucG5nJyxcbiAgICAgICAgICAgICAgcm91bmRlZEltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBZGQgdG8gYXVkaW9Pbmx5U3RyZWFtcyBhcnJheVxuICAgICAgICBhdWRpb09ubHlTdHJlYW1zLnB1c2goblRyYWNrKTtcbiAgICAgICAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtcyhhdWRpb09ubHlTdHJlYW1zKTtcblxuICAgICAgICAvLyBBZGQgdG8gYWxsQXVkaW9TdHJlYW1zIGFycmF5OyBhZGQgcHJvZHVjZXJJZCwgc3RyZWFtXG4gICAgICAgIGFsbEF1ZGlvU3RyZWFtcyA9IFsuLi5hbGxBdWRpb1N0cmVhbXMsIHsgcHJvZHVjZXJJZDogcmVtb3RlUHJvZHVjZXJJZCwgc3RyZWFtOiBuU3RyZWFtIH1dO1xuICAgICAgICB1cGRhdGVBbGxBdWRpb1N0cmVhbXMoYWxsQXVkaW9TdHJlYW1zKTtcblxuICAgICAgICBsZXQgbmFtZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIG5hbWUgPSBwYXJ0aWNpcGFudFswXS5uYW1lO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgLy8gQWRkIHRvIGF1ZFN0cmVhbU5hbWVzIGFycmF5OyBhZGQgcHJvZHVjZXJJZCwgbmFtZVxuICAgICAgICAgIGF1ZFN0cmVhbU5hbWVzID0gWy4uLmF1ZFN0cmVhbU5hbWVzLCB7IHByb2R1Y2VySWQ6IHJlbW90ZVByb2R1Y2VySWQsIG5hbWU6IG5hbWVfXyB9XTtcbiAgICAgICAgICB1cGRhdGVBdWRTdHJlYW1OYW1lcyhhdWRTdHJlYW1OYW1lcyk7XG5cbiAgICAgICAgICBpZiAoIW1haW5TY3JlZW5GaWxsZWQgJiYgcGFydGljaXBhbnRbMF0uaXNsZXZlbCA9PT0gJzInKSB7XG4gICAgICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgICAgICAgIG5hbWU6IGhvc3RMYWJlbCxcbiAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBhdWRTdHJlYW1OYW1lcywgYWxsQXVkaW9TdHJlYW1zIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrcyBmb3IgZGlzcGxheSB0eXBlIGFuZCB1cGRhdGVzIHRoZSBVSVxuICAgICAgICBsZXQgY2hlY2tlcjtcbiAgICAgICAgbGV0IGFsdF9jaGVja2VyID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PSAndmlkZW8nKSB7XG4gICAgICAgICAgY2hlY2tlciA9XG4gICAgICAgICAgICBwYXJ0aWNpcGFudFswXS52aWRlb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgIHBhcnRpY2lwYW50WzBdLnZpZGVvSUQgIT0gJycgJiZcbiAgICAgICAgICAgIHBhcnRpY2lwYW50WzBdLnZpZGVvSUQgIT0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoZWNrZXIgPSB0cnVlO1xuICAgICAgICAgIGFsdF9jaGVja2VyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja2VyKSB7XG4gICAgICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgICAgIGlmICghYWx0X2NoZWNrZXIpIHtcbiAgICAgICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoe1xuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgYXVkU3RyZWFtTmFtZXMsIGFsbEF1ZGlvU3RyZWFtcyB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFsdF9jaGVja2VyICYmIG1lZXRpbmdEaXNwbGF5VHlwZSAhPSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHtcbiAgICAgICAgICAgICAgICBhZGQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNjcmVlbkNoYW5nZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBhdWRTdHJlYW1OYW1lcywgYWxsQXVkaW9TdHJlYW1zIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVmlkZW8gcmVzdW1lZFxuICAgICAgICBuU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKFt0cmFja10pO1xuICAgICAgICB1cGRhdGVOU3RyZWFtKG5TdHJlYW0pO1xuXG4gICAgICAgIC8vZmluZCBhbnkgcGFydGljaXBhbnRzIHdpdGggU2NyZWVuSUQgbm90IG51bGwgYW5kIFNjcmVlbk9uID09IHRydWVcbiAgICAgICAgbGV0IHNjcmVlblBhcnRpY2lwYW50X2FsdCA9IHBhcnRpY2lwYW50cy5maWx0ZXIoXG4gICAgICAgICAgKHBhcnRpY2lwYW50KSA9PlxuICAgICAgICAgICAgcGFydGljaXBhbnQuU2NyZWVuSUQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgcGFydGljaXBhbnQuU2NyZWVuT24gPT0gdHJ1ZSAmJlxuICAgICAgICAgICAgcGFydGljaXBhbnQuU2NyZWVuSUQgIT0gJycsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChzY3JlZW5QYXJ0aWNpcGFudF9hbHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHNjcmVlbklkID0gc2NyZWVuUGFydGljaXBhbnRfYWx0WzBdLlNjcmVlbklEO1xuICAgICAgICAgIGlmIChzY3JlZW5JZCkge1xuICAgICAgICAgICAgdXBkYXRlU2NyZWVuSWQoc2NyZWVuSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXNoYXJlZCkge1xuICAgICAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZChzaGFyZVNjcmVlblN0YXJ0ZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAod2hpdGVib2FyZFN0YXJ0ZWQgJiYgIXdoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgICAgICAgLy8gd2hpdGVib2FyZCBpcyBhY3RpdmVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NyZWVuSWQgPSAnJztcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlbklkKHNjcmVlbklkKTtcbiAgICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZChmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIGRpc3BsYXkgdHlwZSBhbmQgdXBkYXRlIHRoZSBVSVxuICAgICAgICBpZiAocmVtb3RlUHJvZHVjZXJJZCA9PSBzY3JlZW5JZCkge1xuICAgICAgICAgIC8vIFB1dCBvbiBtYWluIHNjcmVlbiBmb3Igc2NyZWVuIHNoYXJlXG4gICAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgICByZW1vdGVTY3JlZW5TdHJlYW0gPSBbeyBwcm9kdWNlcklkOiByZW1vdGVQcm9kdWNlcklkLCBzdHJlYW06IG5TdHJlYW0gfV07XG4gICAgICAgICAgdXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtKHJlbW90ZVNjcmVlblN0cmVhbSk7XG5cbiAgICAgICAgICBpZiAoZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJykge1xuICAgICAgICAgICAgaWYgKHNoYXJlZCB8fCBzaGFyZVNjcmVlblN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKG1haW5IZWlnaHRXaWR0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoKDg0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKG1haW5IZWlnaHRXaWR0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWxvY2tfc2NyZWVuKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHtcbiAgICAgICAgICAgICAgYWRkOiBmYWxzZSxcbiAgICAgICAgICAgICAgc2NyZWVuQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCByZW1vdGVTY3JlZW5TdHJlYW0sIGFsbFZpZGVvU3RyZWFtcyB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghZmlyc3Rfcm91bmQpIHtcbiAgICAgICAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoe1xuICAgICAgICAgICAgICAgIG5hbWU6IGhvc3RMYWJlbCxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgICAgICAuLi5wYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgcmVtb3RlU2NyZWVuU3RyZWFtLFxuICAgICAgICAgICAgICAgICAgYWxsVmlkZW9TdHJlYW1zLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7XG4gICAgICAgICAgICAgICAgYWRkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzY3JlZW5DaGFuZ2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICAgIC4uLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICByZW1vdGVTY3JlZW5TdHJlYW0sXG4gICAgICAgICAgICAgICAgICBhbGxWaWRlb1N0cmVhbXMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbG9ja19zY3JlZW4gPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZUxvY2tfc2NyZWVuKGxvY2tfc2NyZWVuKTtcbiAgICAgICAgICBmaXJzdEFsbCA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlRmlyc3RBbGwoZmlyc3RBbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE5vbi1zY3JlZW4gc2hhcmUgdmlkZW8gcmVzdW1lZFxuXG4gICAgICAgICAgLy8gT3BlcmF0aW9ucyB0byBhZGQgdmlkZW8gdG8gdGhlIFVJIChlaXRoZXIgbWFpbiBzY3JlZW4gb3IgbWluaSBzY3JlZW4pXG4gICAgICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIHRoZSBwYXJ0aWNpcGFudCB3aXRoIHZpZGVvSUQgPT0gcmVtb3RlUHJvZHVjZXJJZFxuICAgICAgICAgIGxldCBwYXJ0aWNpcGFudCA9IHBhcnRpY2lwYW50cy5maWx0ZXIoXG4gICAgICAgICAgICAocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LnZpZGVvSUQgPT0gcmVtb3RlUHJvZHVjZXJJZCxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcGFydGljaXBhbnQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgcGFydGljaXBhbnRbMF0ubmFtZSAhPSBudWxsICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudFswXS5uYW1lICE9ICcnICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudFswXS5uYW1lICE9IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGFydGljaXBhbnRbMF0ubmFtZSAhPT0gbWVtYmVyXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBhbGxWaWRlb1N0cmVhbXMgPSBbXG4gICAgICAgICAgICAgIC4uLmFsbFZpZGVvU3RyZWFtcyxcbiAgICAgICAgICAgICAgeyBwcm9kdWNlcklkOiByZW1vdGVQcm9kdWNlcklkLCBzdHJlYW06IG5TdHJlYW0sIHNvY2tldF86IG5zb2NrIH0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zKGFsbFZpZGVvU3RyZWFtcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcnRpY2lwYW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gcGFydGljaXBhbnRbMF0ubmFtZTtcbiAgICAgICAgICAgIHN0cmVhbU5hbWVzID0gWy4uLnN0cmVhbU5hbWVzLCB7IHByb2R1Y2VySWQ6IHJlbW90ZVByb2R1Y2VySWQsIG5hbWU6IG5hbWUgfHwgJycgfV07XG4gICAgICAgICAgICB1cGRhdGVTdHJlYW1OYW1lcyhzdHJlYW1OYW1lcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSWYgbm90IHNjcmVlbnNoYXJlLCBmaWx0ZXIgb3V0IHRoZSBzdHJlYW0gdGhhdCBiZWxvbmdzIHRvIHRoZSBwYXJ0aWNpcGFudCB3aXRoIGlzQWRtaW4gPSB0cnVlIGFuZCBpc2xldmVsID09ICcyJyAoaG9zdClcbiAgICAgICAgICAvLyBGaW5kIHRoZSBJRCBvZiB0aGUgcGFydGljaXBhbnQgd2l0aCBpc0FkbWluID0gdHJ1ZSBhbmQgaXNsZXZlbCA9PSAnMidcbiAgICAgICAgICBpZiAoIXNoYXJlU2NyZWVuU3RhcnRlZCkge1xuICAgICAgICAgICAgbGV0IGFkbWluID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgICAgICAgICAgKHBhcnRpY2lwYW50KSA9PiBwYXJ0aWNpcGFudC5pc0FkbWluID09IHRydWUgJiYgcGFydGljaXBhbnQuaXNsZXZlbCA9PSAnMicsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHZpZGVvIHN0cmVhbSB3aXRoIHByb2R1Y2VySWQgPT0gYWRtaW4uaWRcbiAgICAgICAgICAgIC8vIEdldCB0aGUgdmlkZW9JRCBvZiB0aGUgYWRtaW5cblxuICAgICAgICAgICAgaWYgKGFkbWluLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgYWRtaW5WaWRJRCA9IGFkbWluWzBdLnZpZGVvSUQ7XG5cbiAgICAgICAgICAgICAgaWYgKGFkbWluVmlkSUQgIT0gbnVsbCAmJiBhZG1pblZpZElEICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9sZEFsbFN0cmVhbXNfOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10gPSBbXTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgbGVuZ3RoIG9mIGFsbFZpZGVvU3RyZWFtcyBpcyA+IDBcbiAgICAgICAgICAgICAgICBpZiAob2xkQWxsU3RyZWFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBvbGRBbGxTdHJlYW1zXyA9IG9sZEFsbFN0cmVhbXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb2xkQWxsU3RyZWFtcyA9IGFsbFZpZGVvU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAoc3RyZWFtZSkgPT4gc3RyZWFtZS5wcm9kdWNlcklkID09IGFkbWluVmlkSUQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVPbGRBbGxTdHJlYW1zKG9sZEFsbFN0cmVhbXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9sZEFsbFN0cmVhbXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgb2xkQWxsU3RyZWFtcyA9IG9sZEFsbFN0cmVhbXNfO1xuICAgICAgICAgICAgICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtcyhvbGRBbGxTdHJlYW1zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhbGxWaWRlb1N0cmVhbXMgPSBhbGxWaWRlb1N0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgKHN0cmVhbWUpID0+IHN0cmVhbWUucHJvZHVjZXJJZCAhPSBhZG1pblZpZElELFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zKGFsbFZpZGVvU3RyZWFtcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVtb3RlUHJvZHVjZXJJZCA9PSBhZG1pblZpZElEKSB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBnb3RBbGxWaWRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdXBkYXRlR290QWxsVmlkcyhnb3RBbGxWaWRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZpZGVvSUQgaXMgZWl0aGVyIHRoYXQgb2YgdGhlIGFkbWluIG9yIHRoYXQgb2YgdGhlIHNjcmVlbiBwYXJ0aWNpcGFudFxuICAgICAgICAgICAgbGV0IHNjcmVlblBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgICAgICAgICAgKHBhcnRpY2lwYW50KSA9PiBwYXJ0aWNpcGFudC5TY3JlZW5JRCA9PSBzY3JlZW5JZCxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIFNlZSBpZiBwcm9kdWNlcklkIGlzIHRoYXQgb2YgYWRtaW4gdmlkZW9JRCBvciBzY3JlZW5QYXJ0aWNpcGFudCB2aWRlb0lEXG4gICAgICAgICAgICBsZXQgYWRtaW5WaWRJRDtcblxuICAgICAgICAgICAgbGV0IHNjcmVlblBhcnRpY2lwYW50VmlkSUQ7XG4gICAgICAgICAgICBpZiAoc2NyZWVuUGFydGljaXBhbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzY3JlZW5QYXJ0aWNpcGFudFZpZElEID0gc2NyZWVuUGFydGljaXBhbnRbMF0udmlkZW9JRDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoYWRtaW5WaWRJRCAhPSBudWxsICYmIGFkbWluVmlkSUQgIT0gJycpIHx8XG4gICAgICAgICAgICAgIChzY3JlZW5QYXJ0aWNpcGFudFZpZElEICE9IG51bGwgJiYgc2NyZWVuUGFydGljaXBhbnRWaWRJRCAhPSAnJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBpZiAoYWRtaW5WaWRJRCA9PSByZW1vdGVQcm9kdWNlcklkIHx8IHNjcmVlblBhcnRpY2lwYW50VmlkSUQgPT0gcmVtb3RlUHJvZHVjZXJJZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHtcbiAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgYWxsVmlkZW9TdHJlYW1zIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVXBkYXRlIHRoZSBVSVxuICAgICAgICAgIGlmIChsb2NrX3NjcmVlbiB8fCBzaGFyZWQpIHtcbiAgICAgICAgICAgIGRlZmVyX3JlY2VpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlRGVmZXJfcmVjZWl2ZShkZWZlcl9yZWNlaXZlKTtcblxuICAgICAgICAgICAgaWYgKCFmaXJzdF9yb3VuZCkge1xuICAgICAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7XG4gICAgICAgICAgICAgICAgYWRkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzY3JlZW5DaGFuZ2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgYWxsVmlkZW9TdHJlYW1zIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7XG4gICAgICAgICAgICAgIGFkZDogZmFsc2UsXG4gICAgICAgICAgICAgIHNjcmVlbkNoYW5nZWQ6IHRydWUsXG4gICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgYWxsVmlkZW9TdHJlYW1zIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2NvbnN1bWVyUmVzdW1lIGVycm9yJywgZXJyb3IpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xufVxuIl19