import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2UtYW5kLXJlc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jbG9zZS1hbmQtcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEwRTNDLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtERztJQUVILGNBQWMsR0FBRyxLQUFLLEVBQUUsRUFDdEIsVUFBVSxFQUNWLElBQUksRUFDSixVQUFVLEdBQ1ksRUFBaUIsRUFBRTtRQUN6QyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFFbkMsSUFBSSxFQUNGLGVBQWUsRUFDZixlQUFlLEVBQ2YsV0FBVyxFQUNYLFlBQVksRUFDWixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUNwQixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFdBQVcsRUFDWCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFVBQVUsRUFDVixTQUFTLEVBRVQsU0FBUyxFQUNULFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFFckIsd0JBQXdCLEVBQ3hCLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsaUJBQWlCO1FBRWpCLG9CQUFv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VSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU3RyZWFtLFxuICBQYXJ0aWNpcGFudCxcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlLFxuICBHZXRWaWRlb3NUeXBlLFxuICBSZVBvcnRUeXBlLFxuICBSZVBvcnRQYXJhbWV0ZXJzLFxuICBFdmVudFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xvc2VBbmRSZXNpemVQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgICBSZVBvcnRQYXJhbWV0ZXJzIHtcbiAgYWxsQXVkaW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIGFsbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBhY3RpdmVOYW1lczogc3RyaW5nW107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgc3RyZWFtTmFtZXM6IFN0cmVhbVtdO1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJztcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIGFkbWluSURTdHJlYW0/OiBzdHJpbmc7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIG5ld0xpbWl0ZWRTdHJlYW1zSURzOiBzdHJpbmdbXTtcbiAgb2xkQWxsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIGRlZmVyX3JlY2VpdmU6IGJvb2xlYW47XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICBmaXJzdEFsbDogYm9vbGVhbjtcbiAgZmlyc3Rfcm91bmQ6IGJvb2xlYW47XG4gIGdvdEFsbFZpZHM6IGJvb2xlYW47XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgc2hhcmVFbmRlZDogYm9vbGVhbjtcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgdXBkYXRlQWN0aXZlTmFtZXM6IChhY3RpdmVOYW1lczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtczogKGFsbEF1ZGlvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IChzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh1cGRhdGVNYWluV2luZG93OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogKG5ld0xpbWl0ZWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG4gIHVwZGF0ZU9sZEFsbFN0cmVhbXM6IChvbGRBbGxTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG4gIHVwZGF0ZURlZmVyX3JlY2VpdmU6IChkZWZlcl9yZWNlaXZlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVNYWluSGVpZ2h0V2lkdGg6IChoZWlnaHRXaWR0aDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZUVuZGVkOiAoc2hhcmVFbmRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTG9ja19zY3JlZW46IChsb2NrX3NjcmVlbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRmlyc3RBbGw6IChmaXJzdEFsbDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRmlyc3Rfcm91bmQ6IChmaXJzdF9yb3VuZDogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcbiAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZTtcbiAgZ2V0VmlkZW9zOiBHZXRWaWRlb3NUeXBlO1xuICByZVBvcnQ6IFJlUG9ydFR5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENsb3NlQW5kUmVzaXplUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENsb3NlQW5kUmVzaXplT3B0aW9ucyB7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAga2luZDogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBDbG9zZUFuZFJlc2l6ZVBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENsb3NlQW5kUmVzaXplVHlwZSA9IChvcHRpb25zOiBDbG9zZUFuZFJlc2l6ZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xvc2VBbmRSZXNpemUge1xuICAvKipcbiAgICogQ2xvc2VzIGFuZCByZXNpemVzIHRoZSB2aWRlbyBhbmQgYXVkaW8gZWxlbWVudHMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q2xvc2VBbmRSZXNpemVPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNsb3NpbmcgYW5kIHJlc2l6aW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wcm9kdWNlcklkIC0gVGhlIElEIG9mIHRoZSBwcm9kdWNlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMua2luZCAtIFRoZSBraW5kIG9mIG1lZGlhIChhdWRpbywgdmlkZW8sIHNjcmVlbnNoYXJlLCBvciBzY3JlZW4pLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBvcGVyYXRpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFsbEF1ZGlvU3RyZWFtcyAtIEFycmF5IG9mIGFsbCBhdWRpbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMuYWxsVmlkZW9TdHJlYW1zIC0gQXJyYXkgb2YgYWxsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5hY3RpdmVOYW1lcyAtIEFycmF5IG9mIGFjdGl2ZSBwYXJ0aWNpcGFudCBuYW1lcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyAtIEFycmF5IG9mIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0cmVhbU5hbWVzIC0gQXJyYXkgb2Ygc3RyZWFtIG5hbWVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ0Rpc3BsYXlUeXBlIC0gVHlwZSBvZiByZWNvcmRpbmcgZGlzcGxheS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgLSBXaGV0aGVyIHJlY29yZGluZyBpcyB2aWRlbyBvcHRpbWl6ZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuYWRtaW5JRFN0cmVhbSAtIElEIG9mIHRoZSBhZG1pbiBzdHJlYW0uXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5uZXdMaW1pdGVkU3RyZWFtcyAtIEFycmF5IG9mIG5ldyBsaW1pdGVkIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5uZXdMaW1pdGVkU3RyZWFtc0lEcyAtIEFycmF5IG9mIG5ldyBsaW1pdGVkIHN0cmVhbSBJRHMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5vbGRBbGxTdHJlYW1zIC0gQXJyYXkgb2Ygb2xkIGFsbCBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgLSBXaGV0aGVyIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBXaGV0aGVyIHNoYXJpbmcgaXMgYWN0aXZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lZXRpbmdEaXNwbGF5VHlwZSAtIFR5cGUgb2YgbWVldGluZyBkaXNwbGF5LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5kZWZlcl9yZWNlaXZlIC0gV2hldGhlciB0byBkZWZlciByZWNlaXZpbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gV2hldGhlciB0aGUgc2NyZWVuIGlzIGxvY2tlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZmlyc3RBbGwgLSBXaGV0aGVyIGl0IGlzIHRoZSBmaXJzdCBhbGwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZpcnN0X3JvdW5kIC0gV2hldGhlciBpdCBpcyB0aGUgZmlyc3Qgcm91bmQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdvdEFsbFZpZHMgLSBXaGV0aGVyIGFsbCB2aWRlb3MgYXJlIHJlY2VpdmVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmV2ZW50VHlwZSAtIFR5cGUgb2YgZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gTGFiZWwgb2YgdGhlIGhvc3QuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlRW5kZWQgLSBXaGV0aGVyIHNoYXJpbmcgaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gV2hldGhlciB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWN0aXZlTmFtZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgYWN0aXZlIG5hbWVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWxsQXVkaW9TdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFsbCBhdWRpbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWxsVmlkZW9TdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFsbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHNoYXJlIHNjcmVlbiBzdGFydGVkIHN0YXR1cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgbWFpbiB3aW5kb3cgc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTmV3TGltaXRlZFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgbmV3IGxpbWl0ZWQgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU9sZEFsbFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgb2xkIGFsbCBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRGVmZXJfcmVjZWl2ZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBkZWZlciByZWNlaXZlIHN0YXR1cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5IZWlnaHRXaWR0aCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBtYWluIGhlaWdodCBhbmQgd2lkdGguXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTaGFyZUVuZGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHNoYXJlIGVuZGVkIHN0YXR1cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2tfc2NyZWVuIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGxvY2sgc2NyZWVuIHN0YXR1cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUZpcnN0QWxsIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGZpcnN0IGFsbCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVGaXJzdF9yb3VuZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBmaXJzdCByb3VuZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXBvcHVsYXRlVXNlck1lZGlhIC0gRnVuY3Rpb24gdG8gcHJlcG9wdWxhdGUgdXNlciBtZWRpYS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFZpZGVvcyAtIEZ1bmN0aW9uIHRvIGdldCB2aWRlb3MuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byByZXBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAqL1xuXG4gIGNsb3NlQW5kUmVzaXplID0gYXN5bmMgKHtcbiAgICBwcm9kdWNlcklkLFxuICAgIGtpbmQsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogQ2xvc2VBbmRSZXNpemVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIGFsbEF1ZGlvU3RyZWFtcyxcbiAgICAgIGFsbFZpZGVvU3RyZWFtcyxcbiAgICAgIGFjdGl2ZU5hbWVzLFxuICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgc3RyZWFtTmFtZXMsXG4gICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgYWRtaW5JRFN0cmVhbSxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICBvbGRBbGxTdHJlYW1zLFxuICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgc2hhcmVkLFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgZGVmZXJfcmVjZWl2ZSxcbiAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgZmlyc3RBbGwsXG4gICAgICBmaXJzdF9yb3VuZCxcbiAgICAgIGdvdEFsbFZpZHMsXG4gICAgICBldmVudFR5cGUsXG5cbiAgICAgIGhvc3RMYWJlbCxcbiAgICAgIHNoYXJlRW5kZWQsXG4gICAgICB1cGRhdGVNYWluV2luZG93LFxuICAgICAgdXBkYXRlQWN0aXZlTmFtZXMsXG4gICAgICB1cGRhdGVBbGxBdWRpb1N0cmVhbXMsXG4gICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMsXG5cbiAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIHVwZGF0ZU9sZEFsbFN0cmVhbXMsXG4gICAgICB1cGRhdGVEZWZlcl9yZWNlaXZlLFxuICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoLFxuICAgICAgdXBkYXRlU2hhcmVFbmRlZCxcbiAgICAgIHVwZGF0ZUxvY2tfc2NyZWVuLFxuICAgICAgdXBkYXRlRmlyc3RBbGwsXG4gICAgICB1cGRhdGVGaXJzdF9yb3VuZCxcblxuICAgICAgLy9tZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWEsXG4gICAgICBnZXRWaWRlb3MsXG4gICAgICByZVBvcnQsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvL2Z1bmN0aW9uIHRvIGNsb3NlIGFuZCByZXNpemUgdGhlIHZpZGVvIGFuZCBhdWRpbyBlbGVtZW50c1xuXG4gICAgbGV0IHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChraW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAvL3N0b3AgdGhlIGF1ZGlvIGJ5IHJlbW92aW5nIHRoZSBtaW5pQXVkaW8gd2l0aCBpZCA9IHByb2R1Y2VySWRcblxuICAgICAgLy9yZW1vdmUgdGhlIGF1ZGlvIGZyb20gdGhlIGFsbEF1ZGlvU3RyZWFtcyBhcnJheVxuICAgICAgYWxsQXVkaW9TdHJlYW1zID0gYWxsQXVkaW9TdHJlYW1zLmZpbHRlcihmdW5jdGlvbiAoYXVkaW9TdHJlYW0pIHtcbiAgICAgICAgcmV0dXJuIGF1ZGlvU3RyZWFtLnByb2R1Y2VySWQgIT09IHByb2R1Y2VySWQ7XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlQWxsQXVkaW9TdHJlYW1zKGFsbEF1ZGlvU3RyZWFtcyk7XG5cbiAgICAgIGlmIChyZWNvcmRpbmdEaXNwbGF5VHlwZSA9PSAndmlkZW8nICYmIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkID09IHRydWUpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9nZXQgdGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IHdpdGggdGhlIHByb2R1Y2VySWRcbiAgICAgICAgcGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqKSA9PiBvYmouYXVkaW9JRCA9PT0gcHJvZHVjZXJJZCk7XG5cbiAgICAgICAgaWYgKHBhcnRpY2lwYW50KSB7XG4gICAgICAgICAgLy9jaGVjayBpZiB0aGUgcGFydGljaXBhbnRzIHZpZGVvSUQgaXMgbm90IG51bGwgb3IgXCJcIlxuICAgICAgICAgIGlmIChwYXJ0aWNpcGFudC52aWRlb0lEICE9PSBudWxsICYmIHBhcnRpY2lwYW50LnZpZGVvSUQgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBwYXJ0aWNpcGFudCBmcm9tIHRoZSBhY3RpdmVOYW1lcyBhcnJheVxuICAgICAgICAgICAgYWN0aXZlTmFtZXMgPSBhY3RpdmVOYW1lcy5maWx0ZXIoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgIT09IHBhcnRpY2lwYW50Py5uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYW1lcyhhY3RpdmVOYW1lcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjaGVja2VyID0gZmFsc2U7XG4gICAgICBsZXQgYWx0X2NoZWNrZXIgPSBmYWxzZTtcblxuICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PSAndmlkZW8nICYmIHBhcnRpY2lwYW50KSB7XG4gICAgICAgIGNoZWNrZXIgPVxuICAgICAgICAgIHBhcnRpY2lwYW50WzBdLnZpZGVvSUQgIT0gbnVsbCAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50WzBdLnZpZGVvSUQgIT0gJycgJiZcbiAgICAgICAgICBwYXJ0aWNpcGFudFswXS52aWRlb0lEICE9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrZXIgPSB0cnVlO1xuICAgICAgICBhbHRfY2hlY2tlciA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGVja2VyKSB7XG4gICAgICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICAgICAgaWYgKCFhbHRfY2hlY2tlcikge1xuICAgICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYWx0X2NoZWNrZXIgJiYgbWVldGluZ0Rpc3BsYXlUeXBlICE9ICd2aWRlbycpIHtcbiAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgIC8vdXBkYXRlIHRoZSB2aWRlbyBlbGVtZW50cyBieSByZW1vdmluZyB0aGUgbWluaVZpZGVvIHdpdGggaWQgPSBwcm9kdWNlcklkXG4gICAgICAvL3JlbW92ZSB0aGUgdmlkZW8gZnJvbSB0aGUgYWxsVmlkZW9TdHJlYW1zIGFycmF5XG5cbiAgICAgIC8vY2hlY2sgaWYgcHJvZHVjZXJJZCA9PSBhZG1pbmlkc3RyZWFtXG4gICAgICBpZiAocHJvZHVjZXJJZCA9PSBhZG1pbklEU3RyZWFtKSB7XG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBhbGxWaWRlb1N0cmVhbXMgPSBhbGxWaWRlb1N0cmVhbXMuZmlsdGVyKGZ1bmN0aW9uICh2aWRlb1N0cmVhbSkge1xuICAgICAgICAgIHJldHVybiB2aWRlb1N0cmVhbS5wcm9kdWNlcklkICE9PSBwcm9kdWNlcklkO1xuICAgICAgICB9KTtcblxuICAgICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMoYWxsVmlkZW9TdHJlYW1zKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vdHJ5IHJlbW92ZSBpdCBmcm9tIG9sZFZpZGVvU3RyZWFtc1xuICAgICAgICAgIG9sZEFsbFN0cmVhbXMgPSBvbGRBbGxTdHJlYW1zLmZpbHRlcihmdW5jdGlvbiAodmlkZW9TdHJlYW0pIHtcbiAgICAgICAgICAgIHJldHVybiB2aWRlb1N0cmVhbS5wcm9kdWNlcklkICE9PSBwcm9kdWNlcklkO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtcyhvbGRBbGxTdHJlYW1zKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vdHJ5IHJlbW92ZSBpdCBmcm9tIG5ld0xpbWl0ZWRTdHJlYW1zXG4gICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBuZXdMaW1pdGVkU3RyZWFtcy5maWx0ZXIoZnVuY3Rpb24gKHZpZGVvU3RyZWFtKSB7XG4gICAgICAgICAgICByZXR1cm4gdmlkZW9TdHJlYW0ucHJvZHVjZXJJZCAhPT0gcHJvZHVjZXJJZDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zKG5ld0xpbWl0ZWRTdHJlYW1zKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy90cnkgcmVtb3ZlIGl0IGZyb20gb2xkVmlkZW9TdHJlYW1zXG4gICAgICAgICAgb2xkQWxsU3RyZWFtcyA9IG9sZEFsbFN0cmVhbXMuZmlsdGVyKGZ1bmN0aW9uICh2aWRlb1N0cmVhbSkge1xuICAgICAgICAgICAgcmV0dXJuIHZpZGVvU3RyZWFtLnByb2R1Y2VySWQgIT09IHByb2R1Y2VySWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtcyhvbGRBbGxTdHJlYW1zKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy9yZW1vdmUgdGhlIHBhcnRpY2lwYW50IGZyb20gYWN0aXZlTmFtZXNcbiAgICAgICAgYWN0aXZlTmFtZXMgPSBhY3RpdmVOYW1lcy5maWx0ZXIoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAvL2dldCB0aGUgcGFydGljaXBhbnQgd2l0aCB0aGUgcHJvZHVjZXJJZFxuICAgICAgICAgIGxldCBwYXJ0aWNpcGFudCA9IHN0cmVhbU5hbWVzLmZpbmQoKG9iaikgPT4gb2JqLnByb2R1Y2VySWQgPT09IHByb2R1Y2VySWQpO1xuXG4gICAgICAgICAgcmV0dXJuIG5hbWUgIT09IChwYXJ0aWNpcGFudD8ubmFtZSA/PyAnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVwZGF0ZUFjdGl2ZU5hbWVzKGFjdGl2ZU5hbWVzKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cblxuICAgICAgaWYgKGxvY2tfc2NyZWVuKSB7XG4gICAgICAgIGRlZmVyX3JlY2VpdmUgPSB0cnVlO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgdmlkZW8gaXMgdGhlIG9uZSBiZWluZyBkaXNwbGF5ZWQgKGkuZS4gKG5ld0xpbWl0ZWRTdHJlYW1zSURzKSlcbiAgICAgICAgaWYgKG5ld0xpbWl0ZWRTdHJlYW1zSURzLmluY2x1ZGVzKHByb2R1Y2VySWQpKSB7XG4gICAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gJ3NjcmVlbnNoYXJlJyB8fCBraW5kID09PSAnc2NyZWVuJykge1xuICAgICAgLy91cGRhdGUgdGhlIHZpZGVvIGVsZW1lbnRzIGJ5IHJlbW92aW5nIHRoZSBtYWluVmlkZW8gd2l0aCBpZCA9IHByb2R1Y2VySWRcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuXG4gICAgICAvL3NjcmVlbnNoYXJlIHN0dWZmXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgIHNoYXJlRW5kZWQgPSB0cnVlO1xuXG4gICAgICBsb2NrX3NjcmVlbiA9IGZhbHNlO1xuICAgICAgZmlyc3RBbGwgPSBmYWxzZTtcbiAgICAgIGZpcnN0X3JvdW5kID0gZmFsc2U7XG5cbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoc2hhcmVTY3JlZW5TdGFydGVkKTtcbiAgICAgIHVwZGF0ZVNoYXJlRW5kZWQoc2hhcmVFbmRlZCk7XG4gICAgICB1cGRhdGVMb2NrX3NjcmVlbihsb2NrX3NjcmVlbik7XG4gICAgICB1cGRhdGVGaXJzdEFsbChmaXJzdEFsbCk7XG4gICAgICB1cGRhdGVGaXJzdF9yb3VuZChmaXJzdF9yb3VuZCk7XG5cbiAgICAgIGlmICghZ290QWxsVmlkcyB8fCBkZWZlcl9yZWNlaXZlKSB7XG4gICAgICAgIGRlZmVyX3JlY2VpdmUgPSBmYWxzZTtcbiAgICAgICAgdXBkYXRlRGVmZXJfcmVjZWl2ZShkZWZlcl9yZWNlaXZlKTtcbiAgICAgICAgYXdhaXQgZ2V0VmlkZW9zKHtcbiAgICAgICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICAgICAgYWxsVmlkZW9TdHJlYW1zLFxuICAgICAgICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgICAgICAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zLFxuICAgICAgICAgIHVwZGF0ZU9sZEFsbFN0cmVhbXMsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCByZVBvcnQoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJykge1xuICAgICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgoMCk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==