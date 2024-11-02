import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Updates the interaction state based on the provided options and parameters.
 *
 * This method handles the updating of participant interactions based on the event type, screen sharing status,
 * and various other parameters. It manages the addition and removal of streams in the context of screen sharing
 * and video/audio management.
 *
 * @param {ReUpdateInterOptions} options - The options for updating the interaction.
 * @param {string} options.name - The name of the participant.
 * @param {boolean} [options.add=false] - Whether to add the participant to the interaction.
 * @param {boolean} [options.force=false] - Whether to force the update.
 * @param {number} [options.average=127] - The average value used for determining reorder intervals.
 * @param {ReUpdateInterParameters} options.parameters - The parameters for updating the interaction.
 * @param {number} options.parameters.screenPageLimit - The screen page limit.
 * @param {number} options.parameters.itemPageLimit - The item page limit.
 * @param {number} options.parameters.reorderInterval - The reorder interval.
 * @param {number} options.parameters.fastReorderInterval - The fast reorder interval.
 * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
 * @param {Array<Participant>} options.parameters.participants - The list of participants.
 * @param {Array<Stream | Participant>} options.parameters.allVideoStreams - The list of all video streams.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
 * @param {string} options.parameters.adminNameStream - The admin name stream.
 * @param {string} options.parameters.screenShareNameStream - The screen share name stream.
 * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
 * @param {boolean} options.parameters.sortAudioLoudness - Whether to sort audio by loudness.
 * @param {number} options.parameters.lastReorderTime - The last reorder time.
 * @param {Array<Stream | Participant>} options.parameters.newLimitedStreams - The list of new limited streams.
 * @param {Array<string>} options.parameters.newLimitedStreamsIDs - The list of new limited stream IDs.
 * @param {Array<string>} options.parameters.oldSoundIds - The list of old sound IDs.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
 * @param {Function} options.parameters.updateSortAudioLoudness - Function to update the audio loudness sorting.
 * @param {Function} options.parameters.updateLastReorderTime - Function to update the last reorder time.
 * @param {Function} options.parameters.updateNewLimitedStreams - Function to update the new limited streams.
 * @param {Function} options.parameters.updateNewLimitedStreamsIDs - Function to update the new limited stream IDs.
 * @param {Function} options.parameters.updateOldSoundIds - Function to update the old sound IDs.
 * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
 * @param {Function} options.parameters.changeVids - Function to change videos.
 *
 * @returns {Promise<void>} A promise that resolves when the interaction update is complete.
 *
 * @throws {Error} Throws an error if there is an issue during the interaction update.
 *
 * @example
 * ```typescript
 * const options = {
 *   name: 'John Doe',
 *   add: true,
 *   parameters: {
 *     screenPageLimit: 5,
 *     itemPageLimit: 10,
 *     reorderInterval: 1000,
 *     fastReorderInterval: 500,
 *     eventType: 'conference',
 *     participants: [...],
 *     allVideoStreams: [...],
 *     shared: false,
 *     shareScreenStarted: false,
 *     adminNameStream: 'Admin',
 *     screenShareNameStream: 'ScreenShare',
 *     updateMainWindow: true,
 *     sortAudioLoudness: false,
 *     lastReorderTime: Date.now(),
 *     newLimitedStreams: [],
 *     newLimitedStreamsIDs: [],
 *     oldSoundIds: [],
 *     updateUpdateMainWindow: (value) => { console.log(updated) },
 *     updateSortAudioLoudness: (value) => { console.log(updated) },
 *     updateLastReorderTime: (value) => { console.log(updated) },
 *     updateNewLimitedStreams: (streams) => { console.log(updated) },
 *     updateNewLimitedStreamsIDs: (ids) => { console.log(updated) },
 *     updateOldSoundIds: (ids) => { console.log(updated) },
 *     onScreenChanges: async (opts) => {  },
 *     reorderStreams: async (opts) => {  },
 *     changeVids: async (opts) => {  },
 *   },
 * };
 *
 * await reUpdateInter(options);
 * ```
 */
export class ReUpdateInter {
    /**
     * Updates the interaction state based on the provided options and parameters.
     *
     * @param {ReUpdateInterOptions} options - The options for updating the interaction.
     * @param {string} options.name - The name of the participant.
     * @param {boolean} [options.add=false] - Whether to add the participant to the interaction.
     * @param {boolean} [options.force=false] - Whether to force the update.
     * @param {number} [options.average=127] - The average value used for determining reorder intervals.
     * @param {Object} options.parameters - The parameters for updating the interaction.
     * @param {number} options.parameters.screenPageLimit - The screen page limit.
     * @param {number} options.parameters.itemPageLimit - The item page limit.
     * @param {number} options.parameters.reorderInterval - The reorder interval.
     * @param {number} options.parameters.fastReorderInterval - The fast reorder interval.
     * @param {string} options.parameters.eventType - The type of event.
     * @param {Array} options.parameters.participants - The list of participants.
     * @param {Array} options.parameters.allVideoStreams - The list of all video streams.
     * @param {boolean} options.parameters.shared - Whether the screen is shared.
     * @param {boolean} options.parameters.shareScreenStarted - Whether screen sharing has started.
     * @param {string} options.parameters.adminNameStream - The admin name stream.
     * @param {string} options.parameters.screenShareNameStream - The screen share name stream.
     * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
     * @param {boolean} options.parameters.sortAudioLoudness - Whether to sort audio by loudness.
     * @param {number} options.parameters.lastReorderTime - The last reorder time.
     * @param {Array} options.parameters.newLimitedStreams - The list of new limited streams.
     * @param {Array} options.parameters.newLimitedStreamsIDs - The list of new limited stream IDs.
     * @param {Array} options.parameters.oldSoundIds - The list of old sound IDs.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {Function} options.parameters.updateSortAudioLoudness - Function to update the audio loudness sorting.
     * @param {Function} options.parameters.updateLastReorderTime - Function to update the last reorder time.
     * @param {Function} options.parameters.updateNewLimitedStreams - Function to update the new limited streams.
     * @param {Function} options.parameters.updateNewLimitedStreamsIDs - Function to update the new limited stream IDs.
     * @param {Function} options.parameters.updateOldSoundIds - Function to update the old sound IDs.
     * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
     * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
     * @param {Function} options.parameters.changeVids - Function to change videos.
     *
     * @returns {Promise<void>} A promise that resolves when the interaction update is complete.
     */
    reUpdateInter = async ({ name, add = false, force = false, average = 127, parameters, }) => {
        let { screenPageLimit, itemPageLimit, reorderInterval, fastReorderInterval, eventType, participants, allVideoStreams, shared, shareScreenStarted, adminNameStream, screenShareNameStream, updateMainWindow, sortAudioLoudness, lastReorderTime, newLimitedStreams, newLimitedStreamsIDs, oldSoundIds, updateUpdateMainWindow, updateSortAudioLoudness, updateLastReorderTime, updateNewLimitedStreams, updateNewLimitedStreamsIDs, updateOldSoundIds, onScreenChanges, reorderStreams, changeVids, } = parameters;
        if (eventType == 'broadcast' || eventType == 'chat') {
            return;
        }
        let refLimit = screenPageLimit - 1;
        if (shareScreenStarted || shared) {
            // Do something when screen is shared or screen share is started
        }
        else {
            refLimit = itemPageLimit - 1;
            if (add) {
                const currentTime = Date.now();
                if ((currentTime - lastReorderTime >= reorderInterval && average > 128.5) ||
                    (average > 130 && currentTime - lastReorderTime >= fastReorderInterval)) {
                    lastReorderTime = currentTime;
                    sortAudioLoudness = true;
                    if (eventType == 'conference') {
                        await onScreenChanges({ changed: true, parameters });
                    }
                    else {
                        await reorderStreams({ add: false, screenChanged: true, parameters });
                    }
                    sortAudioLoudness = false;
                    updateSortAudioLoudness(sortAudioLoudness);
                    updateUpdateMainWindow(updateMainWindow);
                    updateLastReorderTime(lastReorderTime);
                    return;
                }
            }
        }
        let videoID = null;
        if (shareScreenStarted || shared) {
            if (add) {
                const participant = participants.find((p) => p.name === name);
                videoID = participant?.videoID ?? null;
                if (!videoID) {
                    return;
                }
                if (!newLimitedStreamsIDs.includes(videoID)) {
                    //first check length of newLimitedStreams to not exceed refLimit, if so remove oldSoundID from newLimitedStreams
                    if (newLimitedStreams.length > refLimit) {
                        let oldoldSounds = [...oldSoundIds];
                        for (let i = 0; i < oldSoundIds.length; i++) {
                            if (newLimitedStreams.length > refLimit) {
                                // remove stream from newLimitedStreams
                                if (newLimitedStreams.length < screenPageLimit) {
                                    return;
                                }
                                const currentId = oldSoundIds[i];
                                if (currentId !== screenShareNameStream && currentId !== adminNameStream) {
                                    newLimitedStreams = newLimitedStreams.filter((stream) => stream.producerId !== currentId);
                                    newLimitedStreamsIDs = newLimitedStreamsIDs.filter((id) => id !== currentId);
                                    oldoldSounds = oldoldSounds.filter((id) => id !== currentId);
                                }
                            }
                        }
                        oldSoundIds = [...oldoldSounds];
                    }
                    const stream = allVideoStreams.find((s) => s.producerId === videoID);
                    if (stream && newLimitedStreams.length < screenPageLimit) {
                        newLimitedStreams.push(stream);
                        newLimitedStreamsIDs.push(videoID);
                        if (!oldSoundIds.includes(name)) {
                            oldSoundIds.push(name);
                        }
                        await changeVids({ screenChanged: true, parameters });
                    }
                }
            }
            else {
                if (!force) {
                    try {
                        // remove stream from newLimitedStreams
                        if (newLimitedStreams.length < screenPageLimit) {
                            return;
                        }
                        newLimitedStreams = newLimitedStreams.filter((stream) => stream.producerId != videoID);
                        newLimitedStreamsIDs = newLimitedStreamsIDs.filter((id) => id !== videoID);
                        oldSoundIds = oldSoundIds.filter((id) => id !== name);
                        await changeVids({ parameters });
                    }
                    catch {
                        /* handle error */
                    }
                }
                else {
                    const participant = participants.find((p) => p.name === name);
                    if (participant?.muted) {
                        try {
                            newLimitedStreams = newLimitedStreams.filter((stream) => stream.producerId !== videoID);
                            newLimitedStreamsIDs = newLimitedStreamsIDs.filter((id) => id !== videoID);
                            oldSoundIds = oldSoundIds.filter((id) => id !== name);
                            await changeVids({ parameters });
                        }
                        catch {
                            /* handle error */
                        }
                    }
                }
            }
            updateNewLimitedStreams(newLimitedStreams);
            updateNewLimitedStreamsIDs(newLimitedStreamsIDs);
            updateOldSoundIds(oldSoundIds);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReUpdateInter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReUpdateInter, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReUpdateInter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmUtdXBkYXRlLWludGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3JlLXVwZGF0ZS1pbnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBNEQzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUZHO0FBTUgsTUFBTSxPQUFPLGFBQWE7SUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQ0c7SUFFSCxhQUFhLEdBQUcsS0FBSyxFQUFFLEVBQ3JCLElBQUksRUFDSixHQUFHLEdBQUcsS0FBSyxFQUNYLEtBQUssR0FBRyxLQUFLLEVBQ2IsT0FBTyxHQUFHLEdBQUcsRUFDYixVQUFVLEdBQ1csRUFBaUIsRUFBRTtRQUN4QyxJQUFJLEVBQ0YsZUFBZSxFQUNmLGFBQWEsRUFDYixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLE1BQU0sRUFDTixrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDdkIsMEJBQTBCLEVBQzFCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsY0FBYyxFQUNkLFVBQVUsR0FDWCxHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksU0FBUyxJQUFJLFdBQVcsSUFBSSxTQUFTLElBQUksTUFBTSxFQUFFLENBQUM7WUFD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QywwQkFBMEIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2pELGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBN0xTLGFBQWE7MkdBQWIsYUFBYSxjQUZaLE1BQU07OzJGQUVQLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgUGFydGljaXBhbnQsXG4gIFN0cmVhbSxcbiAgT25TY3JlZW5DaGFuZ2VzVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBDaGFuZ2VWaWRzVHlwZSxcbiAgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBDaGFuZ2VWaWRzUGFyYW1ldGVycyxcbiAgRXZlbnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBSZVVwZGF0ZUludGVyUGFyYW1ldGVyc1xuICBleHRlbmRzIE9uU2NyZWVuQ2hhbmdlc1BhcmFtZXRlcnMsXG4gICAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIENoYW5nZVZpZHNQYXJhbWV0ZXJzIHtcbiAgc2NyZWVuUGFnZUxpbWl0OiBudW1iZXI7XG4gIGl0ZW1QYWdlTGltaXQ6IG51bWJlcjtcbiAgcmVvcmRlckludGVydmFsOiBudW1iZXI7XG4gIGZhc3RSZW9yZGVySW50ZXJ2YWw6IG51bWJlcjtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgYWxsVmlkZW9TdHJlYW1zOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW107XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBhZG1pbk5hbWVTdHJlYW0/OiBzdHJpbmc7XG4gIHNjcmVlblNoYXJlTmFtZVN0cmVhbT86IHN0cmluZztcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgc29ydEF1ZGlvTG91ZG5lc3M6IGJvb2xlYW47XG4gIGxhc3RSZW9yZGVyVGltZTogbnVtYmVyO1xuICBuZXdMaW1pdGVkU3RyZWFtczogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdO1xuICBuZXdMaW1pdGVkU3RyZWFtc0lEczogc3RyaW5nW107XG4gIG9sZFNvdW5kSWRzOiBzdHJpbmdbXTtcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzczogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVMYXN0UmVvcmRlclRpbWU6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogKHN0cmVhbXM6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4gdm9pZDtcbiAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHM6IChpZHM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICB1cGRhdGVPbGRTb3VuZElkczogKGlkczogc3RyaW5nW10pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIG9uU2NyZWVuQ2hhbmdlczogT25TY3JlZW5DaGFuZ2VzVHlwZTtcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcbiAgY2hhbmdlVmlkczogQ2hhbmdlVmlkc1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUmVVcGRhdGVJbnRlclBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZVVwZGF0ZUludGVyT3B0aW9ucyB7XG4gIG5hbWU6IHN0cmluZztcbiAgYWRkPzogYm9vbGVhbjtcbiAgZm9yY2U/OiBib29sZWFuO1xuICBhdmVyYWdlPzogbnVtYmVyO1xuICBwYXJhbWV0ZXJzOiBSZVVwZGF0ZUludGVyUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVVcGRhdGVJbnRlclR5cGUgPSAob3B0aW9uczogUmVVcGRhdGVJbnRlck9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgaW50ZXJhY3Rpb24gc3RhdGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMgYW5kIHBhcmFtZXRlcnMuXG4gKlxuICogVGhpcyBtZXRob2QgaGFuZGxlcyB0aGUgdXBkYXRpbmcgb2YgcGFydGljaXBhbnQgaW50ZXJhY3Rpb25zIGJhc2VkIG9uIHRoZSBldmVudCB0eXBlLCBzY3JlZW4gc2hhcmluZyBzdGF0dXMsXG4gKiBhbmQgdmFyaW91cyBvdGhlciBwYXJhbWV0ZXJzLiBJdCBtYW5hZ2VzIHRoZSBhZGRpdGlvbiBhbmQgcmVtb3ZhbCBvZiBzdHJlYW1zIGluIHRoZSBjb250ZXh0IG9mIHNjcmVlbiBzaGFyaW5nXG4gKiBhbmQgdmlkZW8vYXVkaW8gbWFuYWdlbWVudC5cbiAqXG4gKiBAcGFyYW0ge1JlVXBkYXRlSW50ZXJPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHVwZGF0aW5nIHRoZSBpbnRlcmFjdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmFkZD1mYWxzZV0gLSBXaGV0aGVyIHRvIGFkZCB0aGUgcGFydGljaXBhbnQgdG8gdGhlIGludGVyYWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JjZT1mYWxzZV0gLSBXaGV0aGVyIHRvIGZvcmNlIHRoZSB1cGRhdGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuYXZlcmFnZT0xMjddIC0gVGhlIGF2ZXJhZ2UgdmFsdWUgdXNlZCBmb3IgZGV0ZXJtaW5pbmcgcmVvcmRlciBpbnRlcnZhbHMuXG4gKiBAcGFyYW0ge1JlVXBkYXRlSW50ZXJQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdXBkYXRpbmcgdGhlIGludGVyYWN0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5QYWdlTGltaXQgLSBUaGUgc2NyZWVuIHBhZ2UgbGltaXQuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLml0ZW1QYWdlTGltaXQgLSBUaGUgaXRlbSBwYWdlIGxpbWl0LlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVySW50ZXJ2YWwgLSBUaGUgcmVvcmRlciBpbnRlcnZhbC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuZmFzdFJlb3JkZXJJbnRlcnZhbCAtIFRoZSBmYXN0IHJlb3JkZXIgaW50ZXJ2YWwuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IChlLmcuLCBcImJyb2FkY2FzdFwiLCBcImNoYXRcIiwgXCJjb25mZXJlbmNlXCIpLlxuICogQHBhcmFtIHtBcnJheTxQYXJ0aWNpcGFudD59IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gKiBAcGFyYW0ge0FycmF5PFN0cmVhbSB8IFBhcnRpY2lwYW50Pn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFsbFZpZGVvU3RyZWFtcyAtIFRoZSBsaXN0IG9mIGFsbCB2aWRlbyBzdHJlYW1zLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgc2hhcmVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pbk5hbWVTdHJlYW0gLSBUaGUgYWRtaW4gbmFtZSBzdHJlYW0uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlblNoYXJlTmFtZVN0cmVhbSAtIFRoZSBzY3JlZW4gc2hhcmUgbmFtZSBzdHJlYW0uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gV2hldGhlciB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93LlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc29ydEF1ZGlvTG91ZG5lc3MgLSBXaGV0aGVyIHRvIHNvcnQgYXVkaW8gYnkgbG91ZG5lc3MuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxhc3RSZW9yZGVyVGltZSAtIFRoZSBsYXN0IHJlb3JkZXIgdGltZS5cbiAqIEBwYXJhbSB7QXJyYXk8U3RyZWFtIHwgUGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMubmV3TGltaXRlZFN0cmVhbXMgLSBUaGUgbGlzdCBvZiBuZXcgbGltaXRlZCBzdHJlYW1zLlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBvcHRpb25zLnBhcmFtZXRlcnMubmV3TGltaXRlZFN0cmVhbXNJRHMgLSBUaGUgbGlzdCBvZiBuZXcgbGltaXRlZCBzdHJlYW0gSURzLlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBvcHRpb25zLnBhcmFtZXRlcnMub2xkU291bmRJZHMgLSBUaGUgbGlzdCBvZiBvbGQgc291bmQgSURzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBsb3VkbmVzcyBzb3J0aW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxhc3RSZW9yZGVyVGltZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbGFzdCByZW9yZGVyIHRpbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTmV3TGltaXRlZFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG5ldyBsaW1pdGVkIHN0cmVhbXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG5ldyBsaW1pdGVkIHN0cmVhbSBJRHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlT2xkU291bmRJZHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG9sZCBzb3VuZCBJRHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMub25TY3JlZW5DaGFuZ2VzIC0gRnVuY3Rpb24gdG8gaGFuZGxlIHNjcmVlbiBjaGFuZ2VzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlb3JkZXJTdHJlYW1zIC0gRnVuY3Rpb24gdG8gcmVvcmRlciBzdHJlYW1zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoYW5nZVZpZHMgLSBGdW5jdGlvbiB0byBjaGFuZ2UgdmlkZW9zLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBpbnRlcmFjdGlvbiB1cGRhdGUgaXMgY29tcGxldGUuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBkdXJpbmcgdGhlIGludGVyYWN0aW9uIHVwZGF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgbmFtZTogJ0pvaG4gRG9lJyxcbiAqICAgYWRkOiB0cnVlLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgc2NyZWVuUGFnZUxpbWl0OiA1LFxuICogICAgIGl0ZW1QYWdlTGltaXQ6IDEwLFxuICogICAgIHJlb3JkZXJJbnRlcnZhbDogMTAwMCxcbiAqICAgICBmYXN0UmVvcmRlckludGVydmFsOiA1MDAsXG4gKiAgICAgZXZlbnRUeXBlOiAnY29uZmVyZW5jZScsXG4gKiAgICAgcGFydGljaXBhbnRzOiBbLi4uXSxcbiAqICAgICBhbGxWaWRlb1N0cmVhbXM6IFsuLi5dLFxuICogICAgIHNoYXJlZDogZmFsc2UsXG4gKiAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiBmYWxzZSxcbiAqICAgICBhZG1pbk5hbWVTdHJlYW06ICdBZG1pbicsXG4gKiAgICAgc2NyZWVuU2hhcmVOYW1lU3RyZWFtOiAnU2NyZWVuU2hhcmUnLFxuICogICAgIHVwZGF0ZU1haW5XaW5kb3c6IHRydWUsXG4gKiAgICAgc29ydEF1ZGlvTG91ZG5lc3M6IGZhbHNlLFxuICogICAgIGxhc3RSZW9yZGVyVGltZTogRGF0ZS5ub3coKSxcbiAqICAgICBuZXdMaW1pdGVkU3RyZWFtczogW10sXG4gKiAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHM6IFtdLFxuICogICAgIG9sZFNvdW5kSWRzOiBbXSxcbiAqICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodmFsdWUpID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAqICAgICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzczogKHZhbHVlKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gKiAgICAgdXBkYXRlTGFzdFJlb3JkZXJUaW1lOiAodmFsdWUpID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAqICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogKHN0cmVhbXMpID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAqICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEczogKGlkcykgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICogICAgIHVwZGF0ZU9sZFNvdW5kSWRzOiAoaWRzKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gKiAgICAgb25TY3JlZW5DaGFuZ2VzOiBhc3luYyAob3B0cykgPT4geyAgfSxcbiAqICAgICByZW9yZGVyU3RyZWFtczogYXN5bmMgKG9wdHMpID0+IHsgIH0sXG4gKiAgICAgY2hhbmdlVmlkczogYXN5bmMgKG9wdHMpID0+IHsgIH0sXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGF3YWl0IHJlVXBkYXRlSW50ZXIob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZVVwZGF0ZUludGVyIHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGludGVyYWN0aW9uIHN0YXRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zIGFuZCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlVXBkYXRlSW50ZXJPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHVwZGF0aW5nIHRoZSBpbnRlcmFjdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXJ0aWNpcGFudC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hZGQ9ZmFsc2VdIC0gV2hldGhlciB0byBhZGQgdGhlIHBhcnRpY2lwYW50IHRvIHRoZSBpbnRlcmFjdGlvbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JjZT1mYWxzZV0gLSBXaGV0aGVyIHRvIGZvcmNlIHRoZSB1cGRhdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5hdmVyYWdlPTEyN10gLSBUaGUgYXZlcmFnZSB2YWx1ZSB1c2VkIGZvciBkZXRlcm1pbmluZyByZW9yZGVyIGludGVydmFscy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB1cGRhdGluZyB0aGUgaW50ZXJhY3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuUGFnZUxpbWl0IC0gVGhlIHNjcmVlbiBwYWdlIGxpbWl0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLml0ZW1QYWdlTGltaXQgLSBUaGUgaXRlbSBwYWdlIGxpbWl0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlb3JkZXJJbnRlcnZhbCAtIFRoZSByZW9yZGVyIGludGVydmFsLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZhc3RSZW9yZGVySW50ZXJ2YWwgLSBUaGUgZmFzdCByZW9yZGVyIGludGVydmFsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzIC0gVGhlIGxpc3Qgb2YgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMuYWxsVmlkZW9TdHJlYW1zIC0gVGhlIGxpc3Qgb2YgYWxsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIFdoZXRoZXIgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCAtIFdoZXRoZXIgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuYWRtaW5OYW1lU3RyZWFtIC0gVGhlIGFkbWluIG5hbWUgc3RyZWFtLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlblNoYXJlTmFtZVN0cmVhbSAtIFRoZSBzY3JlZW4gc2hhcmUgbmFtZSBzdHJlYW0uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5XaW5kb3cgLSBXaGV0aGVyIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvcnRBdWRpb0xvdWRuZXNzIC0gV2hldGhlciB0byBzb3J0IGF1ZGlvIGJ5IGxvdWRuZXNzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxhc3RSZW9yZGVyVGltZSAtIFRoZSBsYXN0IHJlb3JkZXIgdGltZS5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLm5ld0xpbWl0ZWRTdHJlYW1zIC0gVGhlIGxpc3Qgb2YgbmV3IGxpbWl0ZWQgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLm5ld0xpbWl0ZWRTdHJlYW1zSURzIC0gVGhlIGxpc3Qgb2YgbmV3IGxpbWl0ZWQgc3RyZWFtIElEcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLm9sZFNvdW5kSWRzIC0gVGhlIGxpc3Qgb2Ygb2xkIHNvdW5kIElEcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU29ydEF1ZGlvTG91ZG5lc3MgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIGxvdWRuZXNzIHNvcnRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMYXN0UmVvcmRlclRpbWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxhc3QgcmVvcmRlciB0aW1lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTmV3TGltaXRlZFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG5ldyBsaW1pdGVkIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbmV3IGxpbWl0ZWQgc3RyZWFtIElEcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU9sZFNvdW5kSWRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBvbGQgc291bmQgSURzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMub25TY3JlZW5DaGFuZ2VzIC0gRnVuY3Rpb24gdG8gaGFuZGxlIHNjcmVlbiBjaGFuZ2VzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVvcmRlclN0cmVhbXMgLSBGdW5jdGlvbiB0byByZW9yZGVyIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jaGFuZ2VWaWRzIC0gRnVuY3Rpb24gdG8gY2hhbmdlIHZpZGVvcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGludGVyYWN0aW9uIHVwZGF0ZSBpcyBjb21wbGV0ZS5cbiAgICovXG5cbiAgcmVVcGRhdGVJbnRlciA9IGFzeW5jICh7XG4gICAgbmFtZSxcbiAgICBhZGQgPSBmYWxzZSxcbiAgICBmb3JjZSA9IGZhbHNlLFxuICAgIGF2ZXJhZ2UgPSAxMjcsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUmVVcGRhdGVJbnRlck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQge1xuICAgICAgc2NyZWVuUGFnZUxpbWl0LFxuICAgICAgaXRlbVBhZ2VMaW1pdCxcbiAgICAgIHJlb3JkZXJJbnRlcnZhbCxcbiAgICAgIGZhc3RSZW9yZGVySW50ZXJ2YWwsXG4gICAgICBldmVudFR5cGUsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICBhbGxWaWRlb1N0cmVhbXMsXG4gICAgICBzaGFyZWQsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICBhZG1pbk5hbWVTdHJlYW0sXG4gICAgICBzY3JlZW5TaGFyZU5hbWVTdHJlYW0sXG4gICAgICB1cGRhdGVNYWluV2luZG93LFxuICAgICAgc29ydEF1ZGlvTG91ZG5lc3MsXG4gICAgICBsYXN0UmVvcmRlclRpbWUsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzLFxuICAgICAgb2xkU291bmRJZHMsXG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuICAgICAgdXBkYXRlU29ydEF1ZGlvTG91ZG5lc3MsXG4gICAgICB1cGRhdGVMYXN0UmVvcmRlclRpbWUsXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzLFxuICAgICAgdXBkYXRlT2xkU291bmRJZHMsXG4gICAgICBvblNjcmVlbkNoYW5nZXMsXG4gICAgICByZW9yZGVyU3RyZWFtcyxcbiAgICAgIGNoYW5nZVZpZHMsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBpZiAoZXZlbnRUeXBlID09ICdicm9hZGNhc3QnIHx8IGV2ZW50VHlwZSA9PSAnY2hhdCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcmVmTGltaXQgPSBzY3JlZW5QYWdlTGltaXQgLSAxO1xuXG4gICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIHNjcmVlbiBpcyBzaGFyZWQgb3Igc2NyZWVuIHNoYXJlIGlzIHN0YXJ0ZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmTGltaXQgPSBpdGVtUGFnZUxpbWl0IC0gMTtcblxuICAgICAgaWYgKGFkZCkge1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoY3VycmVudFRpbWUgLSBsYXN0UmVvcmRlclRpbWUgPj0gcmVvcmRlckludGVydmFsICYmIGF2ZXJhZ2UgPiAxMjguNSkgfHxcbiAgICAgICAgICAoYXZlcmFnZSA+IDEzMCAmJiBjdXJyZW50VGltZSAtIGxhc3RSZW9yZGVyVGltZSA+PSBmYXN0UmVvcmRlckludGVydmFsKVxuICAgICAgICApIHtcbiAgICAgICAgICBsYXN0UmVvcmRlclRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgICBzb3J0QXVkaW9Mb3VkbmVzcyA9IHRydWU7XG4gICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PSAnY29uZmVyZW5jZScpIHtcbiAgICAgICAgICAgIGF3YWl0IG9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc29ydEF1ZGlvTG91ZG5lc3MgPSBmYWxzZTtcblxuICAgICAgICAgIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzKHNvcnRBdWRpb0xvdWRuZXNzKTtcbiAgICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuICAgICAgICAgIHVwZGF0ZUxhc3RSZW9yZGVyVGltZShsYXN0UmVvcmRlclRpbWUpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHZpZGVvSUQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICBpZiAoYWRkKSB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbmQoKHApID0+IHAubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIHZpZGVvSUQgPSBwYXJ0aWNpcGFudD8udmlkZW9JRCA/PyBudWxsO1xuXG4gICAgICAgIGlmICghdmlkZW9JRCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmV3TGltaXRlZFN0cmVhbXNJRHMuaW5jbHVkZXModmlkZW9JRCkpIHtcbiAgICAgICAgICAvL2ZpcnN0IGNoZWNrIGxlbmd0aCBvZiBuZXdMaW1pdGVkU3RyZWFtcyB0byBub3QgZXhjZWVkIHJlZkxpbWl0LCBpZiBzbyByZW1vdmUgb2xkU291bmRJRCBmcm9tIG5ld0xpbWl0ZWRTdHJlYW1zXG4gICAgICAgICAgaWYgKG5ld0xpbWl0ZWRTdHJlYW1zLmxlbmd0aCA+IHJlZkxpbWl0KSB7XG4gICAgICAgICAgICBsZXQgb2xkb2xkU291bmRzID0gWy4uLm9sZFNvdW5kSWRzXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkU291bmRJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKG5ld0xpbWl0ZWRTdHJlYW1zLmxlbmd0aCA+IHJlZkxpbWl0KSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHN0cmVhbSBmcm9tIG5ld0xpbWl0ZWRTdHJlYW1zXG4gICAgICAgICAgICAgICAgaWYgKG5ld0xpbWl0ZWRTdHJlYW1zLmxlbmd0aCA8IHNjcmVlblBhZ2VMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50SWQgPSBvbGRTb3VuZElkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudElkICE9PSBzY3JlZW5TaGFyZU5hbWVTdHJlYW0gJiYgY3VycmVudElkICE9PSBhZG1pbk5hbWVTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gbmV3TGltaXRlZFN0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gY3VycmVudElkLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gbmV3TGltaXRlZFN0cmVhbXNJRHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGN1cnJlbnRJZCk7XG4gICAgICAgICAgICAgICAgICBvbGRvbGRTb3VuZHMgPSBvbGRvbGRTb3VuZHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGN1cnJlbnRJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGRTb3VuZElkcyA9IFsuLi5vbGRvbGRTb3VuZHNdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHN0cmVhbSA9IGFsbFZpZGVvU3RyZWFtcy5maW5kKChzKSA9PiBzLnByb2R1Y2VySWQgPT09IHZpZGVvSUQpO1xuICAgICAgICAgIGlmIChzdHJlYW0gJiYgbmV3TGltaXRlZFN0cmVhbXMubGVuZ3RoIDwgc2NyZWVuUGFnZUxpbWl0KSB7XG4gICAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcy5wdXNoKHZpZGVvSUQpO1xuICAgICAgICAgICAgaWYgKCFvbGRTb3VuZElkcy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgICBvbGRTb3VuZElkcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgY2hhbmdlVmlkcyh7IHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWZvcmNlKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBzdHJlYW0gZnJvbSBuZXdMaW1pdGVkU3RyZWFtc1xuICAgICAgICAgICAgaWYgKG5ld0xpbWl0ZWRTdHJlYW1zLmxlbmd0aCA8IHNjcmVlblBhZ2VMaW1pdCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtcyA9IG5ld0xpbWl0ZWRTdHJlYW1zLmZpbHRlcigoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCAhPSB2aWRlb0lEKTtcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gbmV3TGltaXRlZFN0cmVhbXNJRHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IHZpZGVvSUQpO1xuICAgICAgICAgICAgb2xkU291bmRJZHMgPSBvbGRTb3VuZElkcy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gbmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBjaGFuZ2VWaWRzKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJ0aWNpcGFudCA9IHBhcnRpY2lwYW50cy5maW5kKChwKSA9PiBwLm5hbWUgPT09IG5hbWUpO1xuICAgICAgICAgIGlmIChwYXJ0aWNpcGFudD8ubXV0ZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gbmV3TGltaXRlZFN0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkICE9PSB2aWRlb0lELFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IG5ld0xpbWl0ZWRTdHJlYW1zSURzLmZpbHRlcigoaWQpID0+IGlkICE9PSB2aWRlb0lEKTtcbiAgICAgICAgICAgICAgb2xkU291bmRJZHMgPSBvbGRTb3VuZElkcy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gbmFtZSk7XG4gICAgICAgICAgICAgIGF3YWl0IGNoYW5nZVZpZHMoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyhuZXdMaW1pdGVkU3RyZWFtcyk7XG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcyhuZXdMaW1pdGVkU3RyZWFtc0lEcyk7XG4gICAgICB1cGRhdGVPbGRTb3VuZElkcyhvbGRTb3VuZElkcyk7XG4gICAgfVxuICB9O1xufVxuIl19