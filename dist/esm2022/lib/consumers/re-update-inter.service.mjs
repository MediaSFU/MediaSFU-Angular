import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmUtdXBkYXRlLWludGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3JlLXVwZGF0ZS1pbnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBK0QzQyxNQUFNLE9BQU8sYUFBYTtJQUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFDRztJQUVILGFBQWEsR0FBRyxLQUFLLEVBQUUsRUFDckIsSUFBSSxFQUNKLEdBQUcsR0FBRyxLQUFLLEVBQ1gsS0FBSyxHQUFHLEtBQUssRUFDYixPQUFPLEdBQUcsR0FBRyxFQUNiLFVBQVUsR0FDVyxFQUFpQixFQUFFO1FBQ3hDLElBQUksRUFDRixlQUFlLEVBQ2YsYUFBYSxFQUNiLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsTUFBTSxFQUNOLGtCQUFrQixFQUNsQixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixvQkFBb0IsRUFDcEIsV0FBVyxFQUNYLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QiwwQkFBMEIsRUFDMUIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixjQUFjLEVBQ2QsVUFBVSxHQUNYLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxTQUFTLElBQUksV0FBVyxJQUFJLFNBQVMsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNwRCxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksUUFBUSxHQUFHLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFFbkMsSUFBSSxrQkFBa0IsSUFBSSxNQUFNLEVBQUUs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R0E3TFMsYUFBYTsyR0FBYixhQUFhLGNBRlosTUFBTTs7MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBQYXJ0aWNpcGFudCxcbiAgU3RyZWFtLFxuICBPblNjcmVlbkNoYW5nZXNUeXBlLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG4gIENoYW5nZVZpZHNUeXBlLFxuICBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIENoYW5nZVZpZHNQYXJhbWV0ZXJzLFxuICBFdmVudFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFJlVXBkYXRlSW50ZXJQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gICAgQ2hhbmdlVmlkc1BhcmFtZXRlcnMge1xuICBzY3JlZW5QYWdlTGltaXQ6IG51bWJlcjtcbiAgaXRlbVBhZ2VMaW1pdDogbnVtYmVyO1xuICByZW9yZGVySW50ZXJ2YWw6IG51bWJlcjtcbiAgZmFzdFJlb3JkZXJJbnRlcnZhbDogbnVtYmVyO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBhbGxWaWRlb1N0cmVhbXM6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXTtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIGFkbWluTmFtZVN0cmVhbT86IHN0cmluZztcbiAgc2NyZWVuU2hhcmVOYW1lU3RyZWFtPzogc3RyaW5nO1xuICB1cGRhdGVNYWluV2luZG93OiBib29sZWFuO1xuICBzb3J0QXVkaW9Mb3VkbmVzczogYm9vbGVhbjtcbiAgbGFzdFJlb3JkZXJUaW1lOiBudW1iZXI7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW107XG4gIG5ld0xpbWl0ZWRTdHJlYW1zSURzOiBzdHJpbmdbXTtcbiAgb2xkU291bmRJZHM6IHN0cmluZ1tdO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUxhc3RSZW9yZGVyVGltZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zOiAoc3RyZWFtczogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB2b2lkO1xuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEczogKGlkczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZU9sZFNvdW5kSWRzOiAoaWRzOiBzdHJpbmdbXSkgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXNUeXBlO1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuICBjaGFuZ2VWaWRzOiBDaGFuZ2VWaWRzVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBSZVVwZGF0ZUludGVyUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlVXBkYXRlSW50ZXJPcHRpb25zIHtcbiAgbmFtZTogc3RyaW5nO1xuICBhZGQ/OiBib29sZWFuO1xuICBmb3JjZT86IGJvb2xlYW47XG4gIGF2ZXJhZ2U/OiBudW1iZXI7XG4gIHBhcmFtZXRlcnM6IFJlVXBkYXRlSW50ZXJQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZVVwZGF0ZUludGVyVHlwZSA9IChvcHRpb25zOiBSZVVwZGF0ZUludGVyT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlVXBkYXRlSW50ZXIge1xuICAvKipcbiAgICogVXBkYXRlcyB0aGUgaW50ZXJhY3Rpb24gc3RhdGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMgYW5kIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVVcGRhdGVJbnRlck9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdXBkYXRpbmcgdGhlIGludGVyYWN0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmFkZD1mYWxzZV0gLSBXaGV0aGVyIHRvIGFkZCB0aGUgcGFydGljaXBhbnQgdG8gdGhlIGludGVyYWN0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZvcmNlPWZhbHNlXSAtIFdoZXRoZXIgdG8gZm9yY2UgdGhlIHVwZGF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmF2ZXJhZ2U9MTI3XSAtIFRoZSBhdmVyYWdlIHZhbHVlIHVzZWQgZm9yIGRldGVybWluaW5nIHJlb3JkZXIgaW50ZXJ2YWxzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHVwZGF0aW5nIHRoZSBpbnRlcmFjdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5QYWdlTGltaXQgLSBUaGUgc2NyZWVuIHBhZ2UgbGltaXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuaXRlbVBhZ2VMaW1pdCAtIFRoZSBpdGVtIHBhZ2UgbGltaXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucmVvcmRlckludGVydmFsIC0gVGhlIHJlb3JkZXIgaW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuZmFzdFJlb3JkZXJJbnRlcnZhbCAtIFRoZSBmYXN0IHJlb3JkZXIgaW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5hbGxWaWRlb1N0cmVhbXMgLSBUaGUgbGlzdCBvZiBhbGwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gV2hldGhlciB0aGUgc2NyZWVuIGlzIHNoYXJlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gV2hldGhlciBzY3JlZW4gc2hhcmluZyBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pbk5hbWVTdHJlYW0gLSBUaGUgYWRtaW4gbmFtZSBzdHJlYW0uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuU2hhcmVOYW1lU3RyZWFtIC0gVGhlIHNjcmVlbiBzaGFyZSBuYW1lIHN0cmVhbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIFdoZXRoZXIgdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc29ydEF1ZGlvTG91ZG5lc3MgLSBXaGV0aGVyIHRvIHNvcnQgYXVkaW8gYnkgbG91ZG5lc3MuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMubGFzdFJlb3JkZXJUaW1lIC0gVGhlIGxhc3QgcmVvcmRlciB0aW1lLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMubmV3TGltaXRlZFN0cmVhbXMgLSBUaGUgbGlzdCBvZiBuZXcgbGltaXRlZCBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMubmV3TGltaXRlZFN0cmVhbXNJRHMgLSBUaGUgbGlzdCBvZiBuZXcgbGltaXRlZCBzdHJlYW0gSURzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMub2xkU291bmRJZHMgLSBUaGUgbGlzdCBvZiBvbGQgc291bmQgSURzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW8gbG91ZG5lc3Mgc29ydGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxhc3RSZW9yZGVyVGltZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbGFzdCByZW9yZGVyIHRpbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbmV3IGxpbWl0ZWQgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBuZXcgbGltaXRlZCBzdHJlYW0gSURzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlT2xkU291bmRJZHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG9sZCBzb3VuZCBJRHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5vblNjcmVlbkNoYW5nZXMgLSBGdW5jdGlvbiB0byBoYW5kbGUgc2NyZWVuIGNoYW5nZXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoYW5nZVZpZHMgLSBGdW5jdGlvbiB0byBjaGFuZ2UgdmlkZW9zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgaW50ZXJhY3Rpb24gdXBkYXRlIGlzIGNvbXBsZXRlLlxuICAgKi9cblxuICByZVVwZGF0ZUludGVyID0gYXN5bmMgKHtcbiAgICBuYW1lLFxuICAgIGFkZCA9IGZhbHNlLFxuICAgIGZvcmNlID0gZmFsc2UsXG4gICAgYXZlcmFnZSA9IDEyNyxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBSZVVwZGF0ZUludGVyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7XG4gICAgICBzY3JlZW5QYWdlTGltaXQsXG4gICAgICBpdGVtUGFnZUxpbWl0LFxuICAgICAgcmVvcmRlckludGVydmFsLFxuICAgICAgZmFzdFJlb3JkZXJJbnRlcnZhbCxcbiAgICAgIGV2ZW50VHlwZSxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIGFsbFZpZGVvU3RyZWFtcyxcbiAgICAgIHNoYXJlZCxcbiAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgIGFkbWluTmFtZVN0cmVhbSxcbiAgICAgIHNjcmVlblNoYXJlTmFtZVN0cmVhbSxcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICBzb3J0QXVkaW9Mb3VkbmVzcyxcbiAgICAgIGxhc3RSZW9yZGVyVGltZSxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICBvbGRTb3VuZElkcyxcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcyxcbiAgICAgIHVwZGF0ZUxhc3RSZW9yZGVyVGltZSxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICB1cGRhdGVPbGRTb3VuZElkcyxcbiAgICAgIG9uU2NyZWVuQ2hhbmdlcyxcbiAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgY2hhbmdlVmlkcyxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGlmIChldmVudFR5cGUgPT0gJ2Jyb2FkY2FzdCcgfHwgZXZlbnRUeXBlID09ICdjaGF0Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCByZWZMaW1pdCA9IHNjcmVlblBhZ2VMaW1pdCAtIDE7XG5cbiAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgLy8gRG8gc29tZXRoaW5nIHdoZW4gc2NyZWVuIGlzIHNoYXJlZCBvciBzY3JlZW4gc2hhcmUgaXMgc3RhcnRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZWZMaW1pdCA9IGl0ZW1QYWdlTGltaXQgLSAxO1xuXG4gICAgICBpZiAoYWRkKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjdXJyZW50VGltZSAtIGxhc3RSZW9yZGVyVGltZSA+PSByZW9yZGVySW50ZXJ2YWwgJiYgYXZlcmFnZSA+IDEyOC41KSB8fFxuICAgICAgICAgIChhdmVyYWdlID4gMTMwICYmIGN1cnJlbnRUaW1lIC0gbGFzdFJlb3JkZXJUaW1lID49IGZhc3RSZW9yZGVySW50ZXJ2YWwpXG4gICAgICAgICkge1xuICAgICAgICAgIGxhc3RSZW9yZGVyVGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICAgIHNvcnRBdWRpb0xvdWRuZXNzID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJykge1xuICAgICAgICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHsgY2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzb3J0QXVkaW9Mb3VkbmVzcyA9IGZhbHNlO1xuXG4gICAgICAgICAgdXBkYXRlU29ydEF1ZGlvTG91ZG5lc3Moc29ydEF1ZGlvTG91ZG5lc3MpO1xuICAgICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgICAgdXBkYXRlTGFzdFJlb3JkZXJUaW1lKGxhc3RSZW9yZGVyVGltZSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdmlkZW9JRDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZCgocCkgPT4gcC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgdmlkZW9JRCA9IHBhcnRpY2lwYW50Py52aWRlb0lEID8/IG51bGw7XG5cbiAgICAgICAgaWYgKCF2aWRlb0lEKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFuZXdMaW1pdGVkU3RyZWFtc0lEcy5pbmNsdWRlcyh2aWRlb0lEKSkge1xuICAgICAgICAgIC8vZmlyc3QgY2hlY2sgbGVuZ3RoIG9mIG5ld0xpbWl0ZWRTdHJlYW1zIHRvIG5vdCBleGNlZWQgcmVmTGltaXQsIGlmIHNvIHJlbW92ZSBvbGRTb3VuZElEIGZyb20gbmV3TGltaXRlZFN0cmVhbXNcbiAgICAgICAgICBpZiAobmV3TGltaXRlZFN0cmVhbXMubGVuZ3RoID4gcmVmTGltaXQpIHtcbiAgICAgICAgICAgIGxldCBvbGRvbGRTb3VuZHMgPSBbLi4ub2xkU291bmRJZHNdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRTb3VuZElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBpZiAobmV3TGltaXRlZFN0cmVhbXMubGVuZ3RoID4gcmVmTGltaXQpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3RyZWFtIGZyb20gbmV3TGltaXRlZFN0cmVhbXNcbiAgICAgICAgICAgICAgICBpZiAobmV3TGltaXRlZFN0cmVhbXMubGVuZ3RoIDwgc2NyZWVuUGFnZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJZCA9IG9sZFNvdW5kSWRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SWQgIT09IHNjcmVlblNoYXJlTmFtZVN0cmVhbSAmJiBjdXJyZW50SWQgIT09IGFkbWluTmFtZVN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBuZXdMaW1pdGVkU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkICE9PSBjdXJyZW50SWQsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBuZXdMaW1pdGVkU3RyZWFtc0lEcy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gY3VycmVudElkKTtcbiAgICAgICAgICAgICAgICAgIG9sZG9sZFNvdW5kcyA9IG9sZG9sZFNvdW5kcy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gY3VycmVudElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9sZFNvdW5kSWRzID0gWy4uLm9sZG9sZFNvdW5kc107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc3RyZWFtID0gYWxsVmlkZW9TdHJlYW1zLmZpbmQoKHMpID0+IHMucHJvZHVjZXJJZCA9PT0gdmlkZW9JRCk7XG4gICAgICAgICAgaWYgKHN0cmVhbSAmJiBuZXdMaW1pdGVkU3RyZWFtcy5sZW5ndGggPCBzY3JlZW5QYWdlTGltaXQpIHtcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzLnB1c2godmlkZW9JRCk7XG4gICAgICAgICAgICBpZiAoIW9sZFNvdW5kSWRzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgIG9sZFNvdW5kSWRzLnB1c2gobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBjaGFuZ2VWaWRzKHsgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghZm9yY2UpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHN0cmVhbSBmcm9tIG5ld0xpbWl0ZWRTdHJlYW1zXG4gICAgICAgICAgICBpZiAobmV3TGltaXRlZFN0cmVhbXMubGVuZ3RoIDwgc2NyZWVuUGFnZUxpbWl0KSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gbmV3TGltaXRlZFN0cmVhbXMuZmlsdGVyKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkICE9IHZpZGVvSUQpO1xuICAgICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBuZXdMaW1pdGVkU3RyZWFtc0lEcy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gdmlkZW9JRCk7XG4gICAgICAgICAgICBvbGRTb3VuZElkcyA9IG9sZFNvdW5kSWRzLmZpbHRlcigoaWQpID0+IGlkICE9PSBuYW1lKTtcbiAgICAgICAgICAgIGF3YWl0IGNoYW5nZVZpZHMoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbmQoKHApID0+IHAubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgaWYgKHBhcnRpY2lwYW50Py5tdXRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBuZXdMaW1pdGVkU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgIT09IHZpZGVvSUQsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gbmV3TGltaXRlZFN0cmVhbXNJRHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IHZpZGVvSUQpO1xuICAgICAgICAgICAgICBvbGRTb3VuZElkcyA9IG9sZFNvdW5kSWRzLmZpbHRlcigoaWQpID0+IGlkICE9PSBuYW1lKTtcbiAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlVmlkcyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zKG5ld0xpbWl0ZWRTdHJlYW1zKTtcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzKG5ld0xpbWl0ZWRTdHJlYW1zSURzKTtcbiAgICAgIHVwZGF0ZU9sZFNvdW5kSWRzKG9sZFNvdW5kSWRzKTtcbiAgICB9XG4gIH07XG59XG4iXX0=