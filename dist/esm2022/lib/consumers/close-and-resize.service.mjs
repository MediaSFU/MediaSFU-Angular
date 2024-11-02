import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Closes and resizes the video and audio elements based on the provided options.
 *
 * @param {CloseAndResizeOptions} options - The options for closing and resizing.
 * @param {string} options.producerId - The ID of the producer.
 * @param {string} options.kind - The kind of media (audio, video, screenshare, or screen).
 * @param {object} options.parameters - The parameters for the operation.
 * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {Array} options.parameters.allAudioStreams - Array of all audio streams.
 * @param {Array} options.parameters.allVideoStreams - Array of all video streams.
 * @param {Array} options.parameters.activeNames - Array of active participant names.
 * @param {Array} options.parameters.participants - Array of participants.
 * @param {Array} options.parameters.streamNames - Array of stream names.
 * @param {string} options.parameters.recordingDisplayType - Type of recording display.
 * @param {boolean} options.parameters.recordingVideoOptimized - Whether recording is video optimized.
 * @param {string} options.parameters.adminIDStream - ID of the admin stream.
 * @param {Array} options.parameters.newLimitedStreams - Array of new limited streams.
 * @param {Array} options.parameters.newLimitedStreamsIDs - Array of new limited stream IDs.
 * @param {Array} options.parameters.oldAllStreams - Array of old all streams.
 * @param {boolean} options.parameters.shareScreenStarted - Whether screen sharing has started.
 * @param {boolean} options.parameters.shared - Whether sharing is active.
 * @param {string} options.parameters.meetingDisplayType - Type of meeting display.
 * @param {boolean} options.parameters.defer_receive - Whether to defer receiving.
 * @param {boolean} options.parameters.lock_screen - Whether the screen is locked.
 * @param {boolean} options.parameters.firstAll - Whether it is the first all.
 * @param {boolean} options.parameters.first_round - Whether it is the first round.
 * @param {boolean} options.parameters.gotAllVids - Whether all videos are received.
 * @param {string} options.parameters.eventType - Type of event.
 * @param {string} options.parameters.hostLabel - Label of the host.
 * @param {boolean} options.parameters.shareEnded - Whether sharing has ended.
 * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
 * @param {function} options.parameters.updateActiveNames - Function to update active names.
 * @param {function} options.parameters.updateAllAudioStreams - Function to update all audio streams.
 * @param {function} options.parameters.updateAllVideoStreams - Function to update all video streams.
 * @param {function} options.parameters.updateShareScreenStarted - Function to update share screen started status.
 * @param {function} options.parameters.updateUpdateMainWindow - Function to update main window status.
 * @param {function} options.parameters.updateNewLimitedStreams - Function to update new limited streams.
 * @param {function} options.parameters.updateOldAllStreams - Function to update old all streams.
 * @param {function} options.parameters.updateDefer_receive - Function to update defer receive status.
 * @param {function} options.parameters.updateMainHeightWidth - Function to update main height and width.
 * @param {function} options.parameters.updateShareEnded - Function to update share ended status.
 * @param {function} options.parameters.updateLock_screen - Function to update lock screen status.
 * @param {function} options.parameters.updateFirstAll - Function to update first all status.
 * @param {function} options.parameters.updateFirst_round - Function to update first round status.
 * @param {function} options.parameters.reorderStreams - Function to reorder streams.
 * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 * @param {function} options.parameters.getVideos - Function to get videos.
 * @param {function} options.parameters.rePort - Function to report.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @example
 * const options = {
 *   producerId: '12345',
 *   kind: 'video',
 *   parameters: {
 *     getUpdatedAllParams: () => { /* Logic to get updated parameters *\/ },
 *     allAudioStreams: [],
 *     allVideoStreams: [],
 *     activeNames: ['Participant1', 'Participant2'],
 *     participants: [],
 *     streamNames: [],
 *     recordingDisplayType: 'video',
 *     recordingVideoOptimized: true,
 *     adminIDStream: 'admin123',
 *     newLimitedStreams: [],
 *     newLimitedStreamsIDs: [],
 *     oldAllStreams: [],
 *     shareScreenStarted: false,
 *     shared: false,
 *     meetingDisplayType: 'media',
 *     defer_receive: false,
 *     lock_screen: false,
 *     firstAll: false,
 *     first_round: false,
 *     gotAllVids: false,
 *     eventType: 'conference',
 *     hostLabel: 'Host',
 *     shareEnded: false,
 *     updateMainWindow: false,
 *     updateActiveNames: (names) => { /* Logic to update active names *\/ },
 *     updateAllAudioStreams: (streams) => { /* Logic to update audio streams *\/ },
 *     updateShareScreenStarted: (status) => { /* Logic to update share screen status *\/ },
 *     updateUpdateMainWindow: (status) => { /* Logic to update main window status *\/ },
 *     updateNewLimitedStreams: (streams) => { /* Logic to update new limited streams *\/ },
 *     updateOldAllStreams: (streams) => { /* Logic to update old streams *\/ },
 *     updateDefer_receive: (status) => { /* Logic to update defer receive status *\/ },
 *     updateMainHeightWidth: (size) => { /* Logic to update main height and width *\/ },
 *     updateShareEnded: (status) => { /* Logic to update share ended status *\/ },
 *     updateLock_screen: (status) => { /* Logic to update lock screen status *\/ },
 *     updateFirstAll: (status) => { /* Logic to update first all status *\/ },
 *     updateFirst_round: (status) => { /* Logic to update first round status *\/ },
 *     reorderStreams: async () => { /* Logic to reorder streams *\/ },
 *     prepopulateUserMedia: async () => { /* Logic to prepopulate user media *\/ },
 *     getVideos: async () => { /* Logic to get videos *\/ },
 *     rePort: async () => { /* Logic to report *\/ },
 *   },
 * };
 *
 * await closeAndResizeService.closeAndResize(options);
 * // The operation will adjust the video and audio elements as per the given parameters.
 */
export class CloseAndResize {
    /**
     * Closes and resizes the video and audio elements based on the provided options.
     *
     * @param {CloseAndResizeOptions} options - The options for closing and resizing.
     * @param {string} options.producerId - The ID of the producer.
     * @param {string} options.kind - The kind of media (audio, video, screenshare, or screen).
     * @param {object} options.parameters - The parameters for the operation.
     * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {Array} options.parameters.allAudioStreams - Array of all audio streams.
     * @param {Array} options.parameters.allVideoStreams - Array of all video streams.
     * @param {Array} options.parameters.activeNames - Array of active participant names.
     * @param {Array} options.parameters.participants - Array of participants.
     * @param {Array} options.parameters.streamNames - Array of stream names.
     * @param {string} options.parameters.recordingDisplayType - Type of recording display.
     * @param {boolean} options.parameters.recordingVideoOptimized - Whether recording is video optimized.
     * @param {string} options.parameters.adminIDStream - ID of the admin stream.
     * @param {Array} options.parameters.newLimitedStreams - Array of new limited streams.
     * @param {Array} options.parameters.newLimitedStreamsIDs - Array of new limited stream IDs.
     * @param {Array} options.parameters.oldAllStreams - Array of old all streams.
     * @param {boolean} options.parameters.shareScreenStarted - Whether screen sharing has started.
     * @param {boolean} options.parameters.shared - Whether sharing is active.
     * @param {string} options.parameters.meetingDisplayType - Type of meeting display.
     * @param {boolean} options.parameters.defer_receive - Whether to defer receiving.
     * @param {boolean} options.parameters.lock_screen - Whether the screen is locked.
     * @param {boolean} options.parameters.firstAll - Whether it is the first all.
     * @param {boolean} options.parameters.first_round - Whether it is the first round.
     * @param {boolean} options.parameters.gotAllVids - Whether all videos are received.
     * @param {string} options.parameters.eventType - Type of event.
     * @param {string} options.parameters.hostLabel - Label of the host.
     * @param {boolean} options.parameters.shareEnded - Whether sharing has ended.
     * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
     * @param {function} options.parameters.updateActiveNames - Function to update active names.
     * @param {function} options.parameters.updateAllAudioStreams - Function to update all audio streams.
     * @param {function} options.parameters.updateAllVideoStreams - Function to update all video streams.
     * @param {function} options.parameters.updateShareScreenStarted - Function to update share screen started status.
     * @param {function} options.parameters.updateUpdateMainWindow - Function to update main window status.
     * @param {function} options.parameters.updateNewLimitedStreams - Function to update new limited streams.
     * @param {function} options.parameters.updateOldAllStreams - Function to update old all streams.
     * @param {function} options.parameters.updateDefer_receive - Function to update defer receive status.
     * @param {function} options.parameters.updateMainHeightWidth - Function to update main height and width.
     * @param {function} options.parameters.updateShareEnded - Function to update share ended status.
     * @param {function} options.parameters.updateLock_screen - Function to update lock screen status.
     * @param {function} options.parameters.updateFirstAll - Function to update first all status.
     * @param {function} options.parameters.updateFirst_round - Function to update first round status.
     * @param {function} options.parameters.reorderStreams - Function to reorder streams.
     * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @param {function} options.parameters.getVideos - Function to get videos.
     * @param {function} options.parameters.rePort - Function to report.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    closeAndResize = async ({ producerId, kind, parameters, }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { allAudioStreams, allVideoStreams, activeNames, participants, streamNames, recordingDisplayType, recordingVideoOptimized, adminIDStream, newLimitedStreams, newLimitedStreamsIDs, oldAllStreams, shareScreenStarted, shared, meetingDisplayType, defer_receive, lock_screen, firstAll, first_round, gotAllVids, eventType, hostLabel, shareEnded, updateMainWindow, updateActiveNames, updateAllAudioStreams, updateAllVideoStreams, updateShareScreenStarted, updateUpdateMainWindow, updateNewLimitedStreams, updateOldAllStreams, updateDefer_receive, updateMainHeightWidth, updateShareEnded, updateLock_screen, updateFirstAll, updateFirst_round, 
        //mediasfu functions
        reorderStreams, prepopulateUserMedia, getVideos, rePort, } = parameters;
        //function to close and resize the video and audio elements
        let participant;
        if (kind === 'audio') {
            //stop the audio by removing the miniAudio with id = producerId
            //remove the audio from the allAudioStreams array
            allAudioStreams = allAudioStreams.filter(function (audioStream) {
                return audioStream.producerId !== producerId;
            });
            updateAllAudioStreams(allAudioStreams);
            if (recordingDisplayType == 'video' && recordingVideoOptimized == true) {
                // do nothing
            }
            else {
                //get the name of the participant with the producerId
                participant = participants.find((obj) => obj.audioID === producerId);
                if (participant) {
                    //check if the participants videoID is not null or ""
                    if (participant.videoID !== null && participant.videoID !== '') {
                        // do nothing
                    }
                    else {
                        //remove the participant from the activeNames array
                        activeNames = activeNames.filter(function (name) {
                            return name !== participant?.name;
                        });
                        updateActiveNames(activeNames);
                    }
                }
            }
            let checker = false;
            let alt_checker = false;
            if (meetingDisplayType == 'video' && participant) {
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
                        await reorderStreams({ parameters });
                    }
                }
                else {
                    if (alt_checker && meetingDisplayType != 'video') {
                        await reorderStreams({ add: false, screenChanged: true, parameters });
                    }
                }
            }
        }
        else if (kind === 'video') {
            //update the video elements by removing the miniVideo with id = producerId
            //remove the video from the allVideoStreams array
            //check if producerId == adminidstream
            if (producerId == adminIDStream) {
                updateMainWindow = true;
                updateUpdateMainWindow(updateMainWindow);
            }
            try {
                allVideoStreams = allVideoStreams.filter(function (videoStream) {
                    return videoStream.producerId !== producerId;
                });
                updateAllVideoStreams(allVideoStreams);
                try {
                    //try remove it from oldVideoStreams
                    oldAllStreams = oldAllStreams.filter(function (videoStream) {
                        return videoStream.producerId !== producerId;
                    });
                    updateOldAllStreams(oldAllStreams);
                }
                catch {
                    /* handle error */
                }
                try {
                    //try remove it from newLimitedStreams
                    newLimitedStreams = newLimitedStreams.filter(function (videoStream) {
                        return videoStream.producerId !== producerId;
                    });
                    updateNewLimitedStreams(newLimitedStreams);
                }
                catch {
                    /* handle error */
                }
            }
            catch (error) {
                try {
                    //try remove it from oldVideoStreams
                    oldAllStreams = oldAllStreams.filter(function (videoStream) {
                        return videoStream.producerId !== producerId;
                    });
                    updateOldAllStreams(oldAllStreams);
                }
                catch {
                    /* handle error */
                }
            }
            try {
                //remove the participant from activeNames
                activeNames = activeNames.filter(function (name) {
                    //get the participant with the producerId
                    let participant = streamNames.find((obj) => obj.producerId === producerId);
                    return name !== (participant?.name ?? '');
                });
                updateActiveNames(activeNames);
            }
            catch {
                /* handle error */
            }
            if (lock_screen) {
                defer_receive = true;
                // check if the video is the one being displayed (i.e. (newLimitedStreamsIDs))
                if (newLimitedStreamsIDs.includes(producerId)) {
                    await prepopulateUserMedia({ name: hostLabel, parameters });
                    await reorderStreams({ add: false, screenChanged: true, parameters });
                }
            }
            else {
                await prepopulateUserMedia({ name: hostLabel, parameters });
                await reorderStreams({ add: false, screenChanged: true, parameters });
            }
        }
        else if (kind === 'screenshare' || kind === 'screen') {
            //update the video elements by removing the mainVideo with id = producerId
            updateMainWindow = true;
            //screenshare stuff
            shareScreenStarted = false;
            shareEnded = true;
            lock_screen = false;
            firstAll = false;
            first_round = false;
            updateUpdateMainWindow(updateMainWindow);
            updateShareScreenStarted(shareScreenStarted);
            updateShareEnded(shareEnded);
            updateLock_screen(lock_screen);
            updateFirstAll(firstAll);
            updateFirst_round(first_round);
            if (!gotAllVids || defer_receive) {
                defer_receive = false;
                updateDefer_receive(defer_receive);
                await getVideos({
                    participants,
                    allVideoStreams,
                    oldAllStreams,
                    updateAllVideoStreams,
                    updateOldAllStreams,
                });
                await rePort({ parameters });
            }
            if (eventType == 'conference') {
                updateMainHeightWidth(0);
            }
            await prepopulateUserMedia({ name: hostLabel, parameters });
            await reorderStreams({ add: false, screenChanged: true, parameters });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CloseAndResize, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CloseAndResize, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CloseAndResize, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2UtYW5kLXJlc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jbG9zZS1hbmQtcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF3RXpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFHRztBQUtMLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtERztJQUVILGNBQWMsR0FBRyxLQUFLLEVBQUUsRUFDdEIsVUFBVSxFQUNWLElBQUksRUFDSixVQUFVLEdBQ1ksRUFBaUIsRUFBRTtRQUN6QyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFFbkMsSUFBSSxFQUNGLGVBQWUsRUFDZixlQUFlLEVBQ2YsV0FBVyxFQUNYLFlBQVksRUFDWixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUNwQixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFdBQVcsRUFDWCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFVBQVUsRUFDVixTQUFTLEVBRVQsU0FBUyxFQUNULFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFFckIsd0JBQXdCLEVBQ3hCLHNCQUFzQixF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QUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBeFJTLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU3RyZWFtLFxuICBQYXJ0aWNpcGFudCxcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlLFxuICBHZXRWaWRlb3NUeXBlLFxuICBSZVBvcnRUeXBlLFxuICBSZVBvcnRQYXJhbWV0ZXJzLFxuICBFdmVudFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xvc2VBbmRSZXNpemVQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgICBSZVBvcnRQYXJhbWV0ZXJzIHtcbiAgYWxsQXVkaW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIGFsbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBhY3RpdmVOYW1lczogc3RyaW5nW107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgc3RyZWFtTmFtZXM6IFN0cmVhbVtdO1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJztcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIGFkbWluSURTdHJlYW0/OiBzdHJpbmc7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIG5ld0xpbWl0ZWRTdHJlYW1zSURzOiBzdHJpbmdbXTtcbiAgb2xkQWxsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIGRlZmVyX3JlY2VpdmU6IGJvb2xlYW47XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICBmaXJzdEFsbDogYm9vbGVhbjtcbiAgZmlyc3Rfcm91bmQ6IGJvb2xlYW47XG4gIGdvdEFsbFZpZHM6IGJvb2xlYW47XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgc2hhcmVFbmRlZDogYm9vbGVhbjtcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgdXBkYXRlQWN0aXZlTmFtZXM6IChhY3RpdmVOYW1lczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtczogKGFsbEF1ZGlvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IChzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh1cGRhdGVNYWluV2luZG93OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogKG5ld0xpbWl0ZWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG4gIHVwZGF0ZU9sZEFsbFN0cmVhbXM6IChvbGRBbGxTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG4gIHVwZGF0ZURlZmVyX3JlY2VpdmU6IChkZWZlcl9yZWNlaXZlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVNYWluSGVpZ2h0V2lkdGg6IChoZWlnaHRXaWR0aDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZUVuZGVkOiAoc2hhcmVFbmRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTG9ja19zY3JlZW46IChsb2NrX3NjcmVlbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRmlyc3RBbGw6IChmaXJzdEFsbDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRmlyc3Rfcm91bmQ6IChmaXJzdF9yb3VuZDogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcbiAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZTtcbiAgZ2V0VmlkZW9zOiBHZXRWaWRlb3NUeXBlO1xuICByZVBvcnQ6IFJlUG9ydFR5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENsb3NlQW5kUmVzaXplUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENsb3NlQW5kUmVzaXplT3B0aW9ucyB7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAga2luZDogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBDbG9zZUFuZFJlc2l6ZVBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENsb3NlQW5kUmVzaXplVHlwZSA9IChvcHRpb25zOiBDbG9zZUFuZFJlc2l6ZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENsb3NlcyBhbmQgcmVzaXplcyB0aGUgdmlkZW8gYW5kIGF1ZGlvIGVsZW1lbnRzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge0Nsb3NlQW5kUmVzaXplT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjbG9zaW5nIGFuZCByZXNpemluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucHJvZHVjZXJJZCAtIFRoZSBJRCBvZiB0aGUgcHJvZHVjZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmtpbmQgLSBUaGUga2luZCBvZiBtZWRpYSAoYXVkaW8sIHZpZGVvLCBzY3JlZW5zaGFyZSwgb3Igc2NyZWVuKS5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgb3BlcmF0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5hbGxBdWRpb1N0cmVhbXMgLSBBcnJheSBvZiBhbGwgYXVkaW8gc3RyZWFtcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFsbFZpZGVvU3RyZWFtcyAtIEFycmF5IG9mIGFsbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMuYWN0aXZlTmFtZXMgLSBBcnJheSBvZiBhY3RpdmUgcGFydGljaXBhbnQgbmFtZXMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBBcnJheSBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5zdHJlYW1OYW1lcyAtIEFycmF5IG9mIHN0cmVhbSBuYW1lcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdEaXNwbGF5VHlwZSAtIFR5cGUgb2YgcmVjb3JkaW5nIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ1ZpZGVvT3B0aW1pemVkIC0gV2hldGhlciByZWNvcmRpbmcgaXMgdmlkZW8gb3B0aW1pemVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmFkbWluSURTdHJlYW0gLSBJRCBvZiB0aGUgYWRtaW4gc3RyZWFtLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMubmV3TGltaXRlZFN0cmVhbXMgLSBBcnJheSBvZiBuZXcgbGltaXRlZCBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMubmV3TGltaXRlZFN0cmVhbXNJRHMgLSBBcnJheSBvZiBuZXcgbGltaXRlZCBzdHJlYW0gSURzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMub2xkQWxsU3RyZWFtcyAtIEFycmF5IG9mIG9sZCBhbGwgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gV2hldGhlciBzY3JlZW4gc2hhcmluZyBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gV2hldGhlciBzaGFyaW5nIGlzIGFjdGl2ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZWV0aW5nRGlzcGxheVR5cGUgLSBUeXBlIG9mIG1lZXRpbmcgZGlzcGxheS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZGVmZXJfcmVjZWl2ZSAtIFdoZXRoZXIgdG8gZGVmZXIgcmVjZWl2aW5nLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5sb2NrX3NjcmVlbiAtIFdoZXRoZXIgdGhlIHNjcmVlbiBpcyBsb2NrZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZpcnN0QWxsIC0gV2hldGhlciBpdCBpcyB0aGUgZmlyc3QgYWxsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5maXJzdF9yb3VuZCAtIFdoZXRoZXIgaXQgaXMgdGhlIGZpcnN0IHJvdW5kLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5nb3RBbGxWaWRzIC0gV2hldGhlciBhbGwgdmlkZW9zIGFyZSByZWNlaXZlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUeXBlIG9mIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIExhYmVsIG9mIHRoZSBob3N0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZUVuZGVkIC0gV2hldGhlciBzaGFyaW5nIGhhcyBlbmRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIFdoZXRoZXIgdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUFjdGl2ZU5hbWVzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUFsbEF1ZGlvU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhbGwgYXVkaW8gc3RyZWFtcy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUFsbFZpZGVvU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhbGwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzaGFyZSBzY3JlZW4gc3RhcnRlZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIG1haW4gd2luZG93IHN0YXR1cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG5ldyBsaW1pdGVkIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVPbGRBbGxTdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG9sZCBhbGwgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZURlZmVyX3JlY2VpdmUgLSBGdW5jdGlvbiB0byB1cGRhdGUgZGVmZXIgcmVjZWl2ZSBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluSGVpZ2h0V2lkdGggLSBGdW5jdGlvbiB0byB1cGRhdGUgbWFpbiBoZWlnaHQgYW5kIHdpZHRoLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVFbmRlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzaGFyZSBlbmRlZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMb2NrX3NjcmVlbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBsb2NrIHNjcmVlbiBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVGaXJzdEFsbCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBmaXJzdCBhbGwgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRmlyc3Rfcm91bmQgLSBGdW5jdGlvbiB0byB1cGRhdGUgZmlyc3Qgcm91bmQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVvcmRlclN0cmVhbXMgLSBGdW5jdGlvbiB0byByZW9yZGVyIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRWaWRlb3MgLSBGdW5jdGlvbiB0byBnZXQgdmlkZW9zLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVQb3J0IC0gRnVuY3Rpb24gdG8gcmVwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBvcHRpb25zID0ge1xuICAgKiAgIHByb2R1Y2VySWQ6ICcxMjM0NScsXG4gICAqICAga2luZDogJ3ZpZGVvJyxcbiAgICogICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiB7IC8qIExvZ2ljIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMgKlxcLyB9LFxuICAgKiAgICAgYWxsQXVkaW9TdHJlYW1zOiBbXSxcbiAgICogICAgIGFsbFZpZGVvU3RyZWFtczogW10sXG4gICAqICAgICBhY3RpdmVOYW1lczogWydQYXJ0aWNpcGFudDEnLCAnUGFydGljaXBhbnQyJ10sXG4gICAqICAgICBwYXJ0aWNpcGFudHM6IFtdLFxuICAgKiAgICAgc3RyZWFtTmFtZXM6IFtdLFxuICAgKiAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGU6ICd2aWRlbycsXG4gICAqICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZDogdHJ1ZSxcbiAgICogICAgIGFkbWluSURTdHJlYW06ICdhZG1pbjEyMycsXG4gICAqICAgICBuZXdMaW1pdGVkU3RyZWFtczogW10sXG4gICAqICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEczogW10sXG4gICAqICAgICBvbGRBbGxTdHJlYW1zOiBbXSxcbiAgICogICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogZmFsc2UsXG4gICAqICAgICBzaGFyZWQ6IGZhbHNlLFxuICAgKiAgICAgbWVldGluZ0Rpc3BsYXlUeXBlOiAnbWVkaWEnLFxuICAgKiAgICAgZGVmZXJfcmVjZWl2ZTogZmFsc2UsXG4gICAqICAgICBsb2NrX3NjcmVlbjogZmFsc2UsXG4gICAqICAgICBmaXJzdEFsbDogZmFsc2UsXG4gICAqICAgICBmaXJzdF9yb3VuZDogZmFsc2UsXG4gICAqICAgICBnb3RBbGxWaWRzOiBmYWxzZSxcbiAgICogICAgIGV2ZW50VHlwZTogJ2NvbmZlcmVuY2UnLFxuICAgKiAgICAgaG9zdExhYmVsOiAnSG9zdCcsXG4gICAqICAgICBzaGFyZUVuZGVkOiBmYWxzZSxcbiAgICogICAgIHVwZGF0ZU1haW5XaW5kb3c6IGZhbHNlLFxuICAgKiAgICAgdXBkYXRlQWN0aXZlTmFtZXM6IChuYW1lcykgPT4geyAvKiBMb2dpYyB0byB1cGRhdGUgYWN0aXZlIG5hbWVzICpcXC8gfSxcbiAgICogICAgIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtczogKHN0cmVhbXMpID0+IHsgLyogTG9naWMgdG8gdXBkYXRlIGF1ZGlvIHN0cmVhbXMgKlxcLyB9LFxuICAgKiAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiAoc3RhdHVzKSA9PiB7IC8qIExvZ2ljIHRvIHVwZGF0ZSBzaGFyZSBzY3JlZW4gc3RhdHVzICpcXC8gfSxcbiAgICogICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IChzdGF0dXMpID0+IHsgLyogTG9naWMgdG8gdXBkYXRlIG1haW4gd2luZG93IHN0YXR1cyAqXFwvIH0sXG4gICAqICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogKHN0cmVhbXMpID0+IHsgLyogTG9naWMgdG8gdXBkYXRlIG5ldyBsaW1pdGVkIHN0cmVhbXMgKlxcLyB9LFxuICAgKiAgICAgdXBkYXRlT2xkQWxsU3RyZWFtczogKHN0cmVhbXMpID0+IHsgLyogTG9naWMgdG8gdXBkYXRlIG9sZCBzdHJlYW1zICpcXC8gfSxcbiAgICogICAgIHVwZGF0ZURlZmVyX3JlY2VpdmU6IChzdGF0dXMpID0+IHsgLyogTG9naWMgdG8gdXBkYXRlIGRlZmVyIHJlY2VpdmUgc3RhdHVzICpcXC8gfSxcbiAgICogICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogKHNpemUpID0+IHsgLyogTG9naWMgdG8gdXBkYXRlIG1haW4gaGVpZ2h0IGFuZCB3aWR0aCAqXFwvIH0sXG4gICAqICAgICB1cGRhdGVTaGFyZUVuZGVkOiAoc3RhdHVzKSA9PiB7IC8qIExvZ2ljIHRvIHVwZGF0ZSBzaGFyZSBlbmRlZCBzdGF0dXMgKlxcLyB9LFxuICAgKiAgICAgdXBkYXRlTG9ja19zY3JlZW46IChzdGF0dXMpID0+IHsgLyogTG9naWMgdG8gdXBkYXRlIGxvY2sgc2NyZWVuIHN0YXR1cyAqXFwvIH0sXG4gICAqICAgICB1cGRhdGVGaXJzdEFsbDogKHN0YXR1cykgPT4geyAvKiBMb2dpYyB0byB1cGRhdGUgZmlyc3QgYWxsIHN0YXR1cyAqXFwvIH0sXG4gICAqICAgICB1cGRhdGVGaXJzdF9yb3VuZDogKHN0YXR1cykgPT4geyAvKiBMb2dpYyB0byB1cGRhdGUgZmlyc3Qgcm91bmQgc3RhdHVzICpcXC8gfSxcbiAgICogICAgIHJlb3JkZXJTdHJlYW1zOiBhc3luYyAoKSA9PiB7IC8qIExvZ2ljIHRvIHJlb3JkZXIgc3RyZWFtcyAqXFwvIH0sXG4gICAqICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogYXN5bmMgKCkgPT4geyAvKiBMb2dpYyB0byBwcmVwb3B1bGF0ZSB1c2VyIG1lZGlhICpcXC8gfSxcbiAgICogICAgIGdldFZpZGVvczogYXN5bmMgKCkgPT4geyAvKiBMb2dpYyB0byBnZXQgdmlkZW9zICpcXC8gfSxcbiAgICogICAgIHJlUG9ydDogYXN5bmMgKCkgPT4geyAvKiBMb2dpYyB0byByZXBvcnQgKlxcLyB9LFxuICAgKiAgIH0sXG4gICAqIH07XG4gICAqXG4gICAqIGF3YWl0IGNsb3NlQW5kUmVzaXplU2VydmljZS5jbG9zZUFuZFJlc2l6ZShvcHRpb25zKTtcbiAgICogLy8gVGhlIG9wZXJhdGlvbiB3aWxsIGFkanVzdCB0aGUgdmlkZW8gYW5kIGF1ZGlvIGVsZW1lbnRzIGFzIHBlciB0aGUgZ2l2ZW4gcGFyYW1ldGVycy5cbiAgICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDbG9zZUFuZFJlc2l6ZSB7XG4gIC8qKlxuICAgKiBDbG9zZXMgYW5kIHJlc2l6ZXMgdGhlIHZpZGVvIGFuZCBhdWRpbyBlbGVtZW50cyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtDbG9zZUFuZFJlc2l6ZU9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY2xvc2luZyBhbmQgcmVzaXppbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnByb2R1Y2VySWQgLSBUaGUgSUQgb2YgdGhlIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5raW5kIC0gVGhlIGtpbmQgb2YgbWVkaWEgKGF1ZGlvLCB2aWRlbywgc2NyZWVuc2hhcmUsIG9yIHNjcmVlbikuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIG9wZXJhdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMuYWxsQXVkaW9TdHJlYW1zIC0gQXJyYXkgb2YgYWxsIGF1ZGlvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5hbGxWaWRlb1N0cmVhbXMgLSBBcnJheSBvZiBhbGwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFjdGl2ZU5hbWVzIC0gQXJyYXkgb2YgYWN0aXZlIHBhcnRpY2lwYW50IG5hbWVzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzIC0gQXJyYXkgb2YgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMuc3RyZWFtTmFtZXMgLSBBcnJheSBvZiBzdHJlYW0gbmFtZXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nRGlzcGxheVR5cGUgLSBUeXBlIG9mIHJlY29yZGluZyBkaXNwbGF5LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdWaWRlb09wdGltaXplZCAtIFdoZXRoZXIgcmVjb3JkaW5nIGlzIHZpZGVvIG9wdGltaXplZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pbklEU3RyZWFtIC0gSUQgb2YgdGhlIGFkbWluIHN0cmVhbS5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLm5ld0xpbWl0ZWRTdHJlYW1zIC0gQXJyYXkgb2YgbmV3IGxpbWl0ZWQgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLm5ld0xpbWl0ZWRTdHJlYW1zSURzIC0gQXJyYXkgb2YgbmV3IGxpbWl0ZWQgc3RyZWFtIElEcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLm9sZEFsbFN0cmVhbXMgLSBBcnJheSBvZiBvbGQgYWxsIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCAtIFdoZXRoZXIgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIFdoZXRoZXIgc2hhcmluZyBpcyBhY3RpdmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVldGluZ0Rpc3BsYXlUeXBlIC0gVHlwZSBvZiBtZWV0aW5nIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRlZmVyX3JlY2VpdmUgLSBXaGV0aGVyIHRvIGRlZmVyIHJlY2VpdmluZy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubG9ja19zY3JlZW4gLSBXaGV0aGVyIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5maXJzdEFsbCAtIFdoZXRoZXIgaXQgaXMgdGhlIGZpcnN0IGFsbC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZmlyc3Rfcm91bmQgLSBXaGV0aGVyIGl0IGlzIHRoZSBmaXJzdCByb3VuZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZ290QWxsVmlkcyAtIFdoZXRoZXIgYWxsIHZpZGVvcyBhcmUgcmVjZWl2ZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVHlwZSBvZiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ob3N0TGFiZWwgLSBMYWJlbCBvZiB0aGUgaG9zdC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVFbmRlZCAtIFdoZXRoZXIgc2hhcmluZyBoYXMgZW5kZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5XaW5kb3cgLSBXaGV0aGVyIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBY3RpdmVOYW1lcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhY3RpdmUgbmFtZXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBbGxBdWRpb1N0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgYWxsIGF1ZGlvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBbGxWaWRlb1N0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgYWxsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgc2hhcmUgc2NyZWVuIHN0YXJ0ZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBtYWluIHdpbmRvdyBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBuZXcgbGltaXRlZCBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlT2xkQWxsU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBvbGQgYWxsIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVEZWZlcl9yZWNlaXZlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGRlZmVyIHJlY2VpdmUgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbkhlaWdodFdpZHRoIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG1haW4gaGVpZ2h0IGFuZCB3aWR0aC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXJlRW5kZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgc2hhcmUgZW5kZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9ja19zY3JlZW4gLSBGdW5jdGlvbiB0byB1cGRhdGUgbG9jayBzY3JlZW4gc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRmlyc3RBbGwgLSBGdW5jdGlvbiB0byB1cGRhdGUgZmlyc3QgYWxsIHN0YXR1cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUZpcnN0X3JvdW5kIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGZpcnN0IHJvdW5kIHN0YXR1cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlb3JkZXJTdHJlYW1zIC0gRnVuY3Rpb24gdG8gcmVvcmRlciBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucHJlcG9wdWxhdGVVc2VyTWVkaWEgLSBGdW5jdGlvbiB0byBwcmVwb3B1bGF0ZSB1c2VyIG1lZGlhLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VmlkZW9zIC0gRnVuY3Rpb24gdG8gZ2V0IHZpZGVvcy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlUG9ydCAtIEZ1bmN0aW9uIHRvIHJlcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG5cbiAgY2xvc2VBbmRSZXNpemUgPSBhc3luYyAoe1xuICAgIHByb2R1Y2VySWQsXG4gICAga2luZCxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBDbG9zZUFuZFJlc2l6ZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgYWxsQXVkaW9TdHJlYW1zLFxuICAgICAgYWxsVmlkZW9TdHJlYW1zLFxuICAgICAgYWN0aXZlTmFtZXMsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICBzdHJlYW1OYW1lcyxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQsXG4gICAgICBhZG1pbklEU3RyZWFtLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXMsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyxcbiAgICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICBzaGFyZWQsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICBkZWZlcl9yZWNlaXZlLFxuICAgICAgbG9ja19zY3JlZW4sXG4gICAgICBmaXJzdEFsbCxcbiAgICAgIGZpcnN0X3JvdW5kLFxuICAgICAgZ290QWxsVmlkcyxcbiAgICAgIGV2ZW50VHlwZSxcblxuICAgICAgaG9zdExhYmVsLFxuICAgICAgc2hhcmVFbmRlZCxcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICB1cGRhdGVBY3RpdmVOYW1lcyxcbiAgICAgIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtcyxcbiAgICAgIHVwZGF0ZUFsbFZpZGVvU3RyZWFtcyxcblxuICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtcyxcbiAgICAgIHVwZGF0ZURlZmVyX3JlY2VpdmUsXG4gICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgsXG4gICAgICB1cGRhdGVTaGFyZUVuZGVkLFxuICAgICAgdXBkYXRlTG9ja19zY3JlZW4sXG4gICAgICB1cGRhdGVGaXJzdEFsbCxcbiAgICAgIHVwZGF0ZUZpcnN0X3JvdW5kLFxuXG4gICAgICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICAgIGdldFZpZGVvcyxcbiAgICAgIHJlUG9ydCxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIC8vZnVuY3Rpb24gdG8gY2xvc2UgYW5kIHJlc2l6ZSB0aGUgdmlkZW8gYW5kIGF1ZGlvIGVsZW1lbnRzXG5cbiAgICBsZXQgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKGtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgIC8vc3RvcCB0aGUgYXVkaW8gYnkgcmVtb3ZpbmcgdGhlIG1pbmlBdWRpbyB3aXRoIGlkID0gcHJvZHVjZXJJZFxuXG4gICAgICAvL3JlbW92ZSB0aGUgYXVkaW8gZnJvbSB0aGUgYWxsQXVkaW9TdHJlYW1zIGFycmF5XG4gICAgICBhbGxBdWRpb1N0cmVhbXMgPSBhbGxBdWRpb1N0cmVhbXMuZmlsdGVyKGZ1bmN0aW9uIChhdWRpb1N0cmVhbSkge1xuICAgICAgICByZXR1cm4gYXVkaW9TdHJlYW0ucHJvZHVjZXJJZCAhPT0gcHJvZHVjZXJJZDtcbiAgICAgIH0pO1xuXG4gICAgICB1cGRhdGVBbGxBdWRpb1N0cmVhbXMoYWxsQXVkaW9TdHJlYW1zKTtcblxuICAgICAgaWYgKHJlY29yZGluZ0Rpc3BsYXlUeXBlID09ICd2aWRlbycgJiYgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgPT0gdHJ1ZSkge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2dldCB0aGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQgd2l0aCB0aGUgcHJvZHVjZXJJZFxuICAgICAgICBwYXJ0aWNpcGFudCA9IHBhcnRpY2lwYW50cy5maW5kKChvYmopID0+IG9iai5hdWRpb0lEID09PSBwcm9kdWNlcklkKTtcblxuICAgICAgICBpZiAocGFydGljaXBhbnQpIHtcbiAgICAgICAgICAvL2NoZWNrIGlmIHRoZSBwYXJ0aWNpcGFudHMgdmlkZW9JRCBpcyBub3QgbnVsbCBvciBcIlwiXG4gICAgICAgICAgaWYgKHBhcnRpY2lwYW50LnZpZGVvSUQgIT09IG51bGwgJiYgcGFydGljaXBhbnQudmlkZW9JRCAhPT0gJycpIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9yZW1vdmUgdGhlIHBhcnRpY2lwYW50IGZyb20gdGhlIGFjdGl2ZU5hbWVzIGFycmF5XG4gICAgICAgICAgICBhY3RpdmVOYW1lcyA9IGFjdGl2ZU5hbWVzLmZpbHRlcihmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gbmFtZSAhPT0gcGFydGljaXBhbnQ/Lm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hbWVzKGFjdGl2ZU5hbWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNoZWNrZXIgPSBmYWxzZTtcbiAgICAgIGxldCBhbHRfY2hlY2tlciA9IGZhbHNlO1xuXG4gICAgICBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09ICd2aWRlbycgJiYgcGFydGljaXBhbnQpIHtcbiAgICAgICAgY2hlY2tlciA9XG4gICAgICAgICAgcGFydGljaXBhbnRbMF0udmlkZW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgcGFydGljaXBhbnRbMF0udmlkZW9JRCAhPSAnJyAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50WzBdLnZpZGVvSUQgIT0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tlciA9IHRydWU7XG4gICAgICAgIGFsdF9jaGVja2VyID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoZWNrZXIpIHtcbiAgICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgICBpZiAoIWFsdF9jaGVja2VyKSB7XG4gICAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhbHRfY2hlY2tlciAmJiBtZWV0aW5nRGlzcGxheVR5cGUgIT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgLy91cGRhdGUgdGhlIHZpZGVvIGVsZW1lbnRzIGJ5IHJlbW92aW5nIHRoZSBtaW5pVmlkZW8gd2l0aCBpZCA9IHByb2R1Y2VySWRcbiAgICAgIC8vcmVtb3ZlIHRoZSB2aWRlbyBmcm9tIHRoZSBhbGxWaWRlb1N0cmVhbXMgYXJyYXlcblxuICAgICAgLy9jaGVjayBpZiBwcm9kdWNlcklkID09IGFkbWluaWRzdHJlYW1cbiAgICAgIGlmIChwcm9kdWNlcklkID09IGFkbWluSURTdHJlYW0pIHtcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGFsbFZpZGVvU3RyZWFtcyA9IGFsbFZpZGVvU3RyZWFtcy5maWx0ZXIoZnVuY3Rpb24gKHZpZGVvU3RyZWFtKSB7XG4gICAgICAgICAgcmV0dXJuIHZpZGVvU3RyZWFtLnByb2R1Y2VySWQgIT09IHByb2R1Y2VySWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVwZGF0ZUFsbFZpZGVvU3RyZWFtcyhhbGxWaWRlb1N0cmVhbXMpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy90cnkgcmVtb3ZlIGl0IGZyb20gb2xkVmlkZW9TdHJlYW1zXG4gICAgICAgICAgb2xkQWxsU3RyZWFtcyA9IG9sZEFsbFN0cmVhbXMuZmlsdGVyKGZ1bmN0aW9uICh2aWRlb1N0cmVhbSkge1xuICAgICAgICAgICAgcmV0dXJuIHZpZGVvU3RyZWFtLnByb2R1Y2VySWQgIT09IHByb2R1Y2VySWQ7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB1cGRhdGVPbGRBbGxTdHJlYW1zKG9sZEFsbFN0cmVhbXMpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy90cnkgcmVtb3ZlIGl0IGZyb20gbmV3TGltaXRlZFN0cmVhbXNcbiAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtcyA9IG5ld0xpbWl0ZWRTdHJlYW1zLmZpbHRlcihmdW5jdGlvbiAodmlkZW9TdHJlYW0pIHtcbiAgICAgICAgICAgIHJldHVybiB2aWRlb1N0cmVhbS5wcm9kdWNlcklkICE9PSBwcm9kdWNlcklkO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXMobmV3TGltaXRlZFN0cmVhbXMpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvL3RyeSByZW1vdmUgaXQgZnJvbSBvbGRWaWRlb1N0cmVhbXNcbiAgICAgICAgICBvbGRBbGxTdHJlYW1zID0gb2xkQWxsU3RyZWFtcy5maWx0ZXIoZnVuY3Rpb24gKHZpZGVvU3RyZWFtKSB7XG4gICAgICAgICAgICByZXR1cm4gdmlkZW9TdHJlYW0ucHJvZHVjZXJJZCAhPT0gcHJvZHVjZXJJZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cGRhdGVPbGRBbGxTdHJlYW1zKG9sZEFsbFN0cmVhbXMpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICAvL3JlbW92ZSB0aGUgcGFydGljaXBhbnQgZnJvbSBhY3RpdmVOYW1lc1xuICAgICAgICBhY3RpdmVOYW1lcyA9IGFjdGl2ZU5hbWVzLmZpbHRlcihmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIC8vZ2V0IHRoZSBwYXJ0aWNpcGFudCB3aXRoIHRoZSBwcm9kdWNlcklkXG4gICAgICAgICAgbGV0IHBhcnRpY2lwYW50ID0gc3RyZWFtTmFtZXMuZmluZCgob2JqKSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gcHJvZHVjZXJJZCk7XG5cbiAgICAgICAgICByZXR1cm4gbmFtZSAhPT0gKHBhcnRpY2lwYW50Py5uYW1lID8/ICcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXBkYXRlQWN0aXZlTmFtZXMoYWN0aXZlTmFtZXMpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgfVxuXG4gICAgICBpZiAobG9ja19zY3JlZW4pIHtcbiAgICAgICAgZGVmZXJfcmVjZWl2ZSA9IHRydWU7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSB2aWRlbyBpcyB0aGUgb25lIGJlaW5nIGRpc3BsYXllZCAoaS5lLiAobmV3TGltaXRlZFN0cmVhbXNJRHMpKVxuICAgICAgICBpZiAobmV3TGltaXRlZFN0cmVhbXNJRHMuaW5jbHVkZXMocHJvZHVjZXJJZCkpIHtcbiAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChraW5kID09PSAnc2NyZWVuc2hhcmUnIHx8IGtpbmQgPT09ICdzY3JlZW4nKSB7XG4gICAgICAvL3VwZGF0ZSB0aGUgdmlkZW8gZWxlbWVudHMgYnkgcmVtb3ZpbmcgdGhlIG1haW5WaWRlbyB3aXRoIGlkID0gcHJvZHVjZXJJZFxuICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG5cbiAgICAgIC8vc2NyZWVuc2hhcmUgc3R1ZmZcbiAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgc2hhcmVFbmRlZCA9IHRydWU7XG5cbiAgICAgIGxvY2tfc2NyZWVuID0gZmFsc2U7XG4gICAgICBmaXJzdEFsbCA9IGZhbHNlO1xuICAgICAgZmlyc3Rfcm91bmQgPSBmYWxzZTtcblxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZChzaGFyZVNjcmVlblN0YXJ0ZWQpO1xuICAgICAgdXBkYXRlU2hhcmVFbmRlZChzaGFyZUVuZGVkKTtcbiAgICAgIHVwZGF0ZUxvY2tfc2NyZWVuKGxvY2tfc2NyZWVuKTtcbiAgICAgIHVwZGF0ZUZpcnN0QWxsKGZpcnN0QWxsKTtcbiAgICAgIHVwZGF0ZUZpcnN0X3JvdW5kKGZpcnN0X3JvdW5kKTtcblxuICAgICAgaWYgKCFnb3RBbGxWaWRzIHx8IGRlZmVyX3JlY2VpdmUpIHtcbiAgICAgICAgZGVmZXJfcmVjZWl2ZSA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVEZWZlcl9yZWNlaXZlKGRlZmVyX3JlY2VpdmUpO1xuICAgICAgICBhd2FpdCBnZXRWaWRlb3Moe1xuICAgICAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgICAgICBhbGxWaWRlb1N0cmVhbXMsXG4gICAgICAgICAgb2xkQWxsU3RyZWFtcyxcbiAgICAgICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMsXG4gICAgICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHJlUG9ydCh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudFR5cGUgPT0gJ2NvbmZlcmVuY2UnKSB7XG4gICAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCgwKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgfVxuICB9O1xufVxuIl19