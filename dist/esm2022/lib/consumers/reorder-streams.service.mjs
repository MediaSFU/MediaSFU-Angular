/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ReorderStreams {
    /**
     * Reorders the video streams based on the provided options and updates the UI accordingly.
     *
     * @param {Object} options - The options for reordering streams.
     * @param {boolean} [options.add=false] - Whether to add new streams or not.
     * @param {boolean} [options.screenChanged=false] - Whether the screen has changed or not.
     * @param {ReorderStreamsOptions} options.parameters - The parameters required for reordering streams.
     *
     * @returns {Promise<void>} A promise that resolves when the reordering is complete.
     *
     * @typedef {Object} ReorderStreamsOptions
     * @property {Function} getUpdatedAllParams - Function to get updated parameters.
     * @property {Array} allVideoStreams - Array of all video streams.
     * @property {Array} participants - Array of participants.
     * @property {Array} oldAllStreams - Array of old streams.
     * @property {string} screenId - ID of the screen.
     * @property {string} adminVidID - ID of the admin video.
     * @property {Array} newLimitedStreams - Array of new limited streams.
     * @property {Array} newLimitedStreamsIDs - Array of new limited stream IDs.
     * @property {Array} activeSounds - Array of active sounds.
     * @property {string} screenShareIDStream - ID of the screen share stream.
     * @property {string} screenShareNameStream - Name of the screen share stream.
     * @property {string} adminIDStream - ID of the admin stream.
     * @property {string} adminNameStream - Name of the admin stream.
     * @property {Function} updateNewLimitedStreams - Function to update new limited streams.
     * @property {Function} updateNewLimitedStreamsIDs - Function to update new limited stream IDs.
     * @property {Function} updateActiveSounds - Function to update active sounds.
     * @property {Function} updateScreenShareIDStream - Function to update screen share ID stream.
     * @property {Function} updateScreenShareNameStream - Function to update screen share name stream.
     * @property {Function} updateAdminIDStream - Function to update admin ID stream.
     * @property {Function} updateAdminNameStream - Function to update admin name stream.
     * @property {Function} updateYouYouStream - Function to update YouYou stream.
     * @property {Function} changeVids - Function to reflect changes on the UI.
     */
    reorderStreams = async ({ add = false, screenChanged = false, parameters, }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { allVideoStreams, participants, oldAllStreams, screenId, adminVidID, newLimitedStreams, newLimitedStreamsIDs, activeSounds, screenShareIDStream, screenShareNameStream, adminIDStream, adminNameStream, updateNewLimitedStreams, updateNewLimitedStreamsIDs, updateActiveSounds, updateScreenShareIDStream, updateScreenShareNameStream, updateAdminIDStream, updateAdminNameStream, updateYouYouStream, 
        //mediasfu functions
        changeVids, } = parameters;
        // function to reorder streams on the ui
        if (!add) {
            newLimitedStreams = [];
            newLimitedStreamsIDs = [];
            activeSounds = [];
        }
        const youyou = allVideoStreams.filter((stream) => stream.producerId === 'youyou');
        const admin = participants.filter((participant) => participant.islevel === '2');
        if (admin.length > 0) {
            adminVidID = admin[0].videoID;
        }
        else {
            adminVidID = '';
        }
        if (adminVidID) {
            const adminStream = allVideoStreams.find((stream) => stream.producerId === adminVidID);
            if (!add) {
                newLimitedStreams = [...newLimitedStreams, ...youyou];
                newLimitedStreamsIDs = [
                    ...newLimitedStreamsIDs,
                    ...youyou.map((stream) => stream.producerId),
                ];
            }
            else {
                const youyouStream = newLimitedStreams.find((stream) => stream.producerId === 'youyou');
                if (!youyouStream) {
                    newLimitedStreams = [...newLimitedStreams, ...youyou];
                    newLimitedStreamsIDs = [
                        ...newLimitedStreamsIDs,
                        ...youyou.map((stream) => stream.producerId),
                    ];
                }
            }
            if (adminStream) {
                adminIDStream = adminVidID;
                if (!add) {
                    newLimitedStreams = [...newLimitedStreams, adminStream];
                    newLimitedStreamsIDs = [...newLimitedStreamsIDs, adminStream.producerId];
                }
                else {
                    const adminStreamer = newLimitedStreams.find((stream) => stream.producerId === adminVidID);
                    if (!adminStreamer) {
                        newLimitedStreams = [...newLimitedStreams, adminStream];
                        newLimitedStreamsIDs = [...newLimitedStreamsIDs, adminStream.producerId];
                    }
                }
            }
            else {
                const oldAdminStream = oldAllStreams.find((stream) => stream.producerId === adminVidID);
                if (oldAdminStream) {
                    //add it to the allVideoStream
                    adminIDStream = adminVidID;
                    adminNameStream = admin[0].name;
                    if (!add) {
                        newLimitedStreams = [...newLimitedStreams, oldAdminStream];
                        newLimitedStreamsIDs = [...newLimitedStreamsIDs, oldAdminStream.producerId];
                    }
                    else {
                        const adminStreamer = newLimitedStreams.find((stream) => stream.producerId === adminVidID);
                        if (!adminStreamer) {
                            newLimitedStreams = [...newLimitedStreams, oldAdminStream];
                            newLimitedStreamsIDs = [...newLimitedStreamsIDs, oldAdminStream.producerId];
                        }
                    }
                }
            }
            const screenParticipant = participants.filter((participant) => participant.ScreenID === screenId);
            if (screenParticipant.length > 0) {
                const screenParticipantVidID = screenParticipant[0].videoID;
                const screenParticipantVidID_ = newLimitedStreams.filter((stream) => stream.producerId === screenParticipantVidID);
                if (screenParticipantVidID_?.length < 1 && screenParticipantVidID) {
                    screenShareIDStream = screenParticipantVidID;
                    screenShareNameStream = screenParticipant[0].name;
                    const screenParticipantVidID__ = allVideoStreams.filter((stream) => stream.producerId === screenParticipantVidID);
                    newLimitedStreams = [...newLimitedStreams, ...screenParticipantVidID__];
                    newLimitedStreamsIDs = [
                        ...newLimitedStreamsIDs,
                        ...screenParticipantVidID__.map((stream) => stream.producerId),
                    ];
                }
            }
        }
        else {
            if (!add) {
                newLimitedStreams = [...newLimitedStreams, ...youyou];
                newLimitedStreamsIDs = [
                    ...newLimitedStreamsIDs,
                    ...youyou.map((stream) => stream.producerId),
                ];
            }
            else {
                const youyouStream = newLimitedStreams.find((stream) => stream.producerId === 'youyou');
                if (!youyouStream) {
                    newLimitedStreams = [...newLimitedStreams, ...youyou];
                    newLimitedStreamsIDs = [
                        ...newLimitedStreamsIDs,
                        ...youyou.map((stream) => stream.producerId),
                    ];
                }
            }
            const screenParticipant = participants.filter((participant) => participant.ScreenID === screenId);
            if (screenParticipant.length > 0) {
                const screenParticipantVidID = screenParticipant[0].videoID;
                const screenParticipantVidID_ = newLimitedStreams.filter((stream) => stream.producerId === screenParticipantVidID);
                if (screenParticipantVidID_?.length < 1 && screenParticipantVidID) {
                    screenShareIDStream = screenParticipantVidID;
                    screenShareNameStream = screenParticipant[0].name;
                    const screenParticipantVidID__ = allVideoStreams.filter((stream) => stream.producerId === screenParticipantVidID);
                    newLimitedStreams = [...newLimitedStreams, ...screenParticipantVidID__];
                    newLimitedStreamsIDs = [
                        ...newLimitedStreamsIDs,
                        ...screenParticipantVidID__.map((stream) => stream.producerId),
                    ];
                }
            }
        }
        updateNewLimitedStreams(newLimitedStreams);
        updateNewLimitedStreamsIDs(newLimitedStreamsIDs);
        updateActiveSounds(activeSounds);
        updateScreenShareIDStream(screenShareIDStream);
        updateScreenShareNameStream(screenShareNameStream);
        updateAdminIDStream(adminIDStream);
        updateAdminNameStream(adminNameStream);
        updateYouYouStream(youyou);
        //reflect the changes on the ui
        await changeVids({ screenChanged, parameters });
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReorderStreams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReorderStreams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReorderStreams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlci1zdHJlYW1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3Jlb3JkZXItc3RyZWFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZEQUE2RDtBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTBDM0MsTUFBTSxPQUFPLGNBQWM7SUFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlDRztJQUVILGNBQWMsR0FBRyxLQUFLLEVBQUUsRUFDdEIsR0FBRyxHQUFHLEtBQUssRUFDWCxhQUFhLEdBQUcsS0FBSyxFQUNyQixVQUFVLEdBQ1ksRUFBaUIsRUFBRTtRQUN6QyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFFbkMsSUFBSSxFQUNGLGVBQWUsRUFDZixZQUFZLEVBQ1osYUFBYSxFQUNiLFFBQVEsRUFDUixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsZUFBZSxFQUNmLHVCQUF1QixFQUN2QiwwQkFBMEIsRUFDMUIsa0JBQWtCLEVBQ2xCLHlCQUF5QixFQUN6QiwyQkFBMkIsRUFDM0IsbUJBQW1CLEVBQ25CLHFCQUFxQixFQUNyQixrQkFBa0I7UUFFbEIsb0JBQW9CO1FBQ3BCLFVBQVUsR0FDWCxHQUFHLFVBQVUsQ0FBQztRQUVmLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDVCxpQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFDdkIsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1lBQzFCLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FB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LGlCQUFpQixDQUFDLENBQUM7UUFDM0MsMEJBQTBCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNqRCxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyx5QkFBeUIsQ0FBQyxtQkFBb0IsQ0FBQyxDQUFDO1FBQ2hELDJCQUEyQixDQUFDLHFCQUFzQixDQUFDLENBQUM7UUFDcEQsbUJBQW1CLENBQUMsYUFBYyxDQUFDLENBQUM7UUFDcEMscUJBQXFCLENBQUMsZUFBZ0IsQ0FBQyxDQUFDO1FBQ3hDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNCLCtCQUErQjtRQUMvQixNQUFNLFVBQVUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQzt1R0FsT1MsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCwgU3RyZWFtLCBDaGFuZ2VWaWRzUGFyYW1ldGVycywgQ2hhbmdlVmlkc1R5cGUgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyBleHRlbmRzIENoYW5nZVZpZHNQYXJhbWV0ZXJzIHtcbiAgYWxsVmlkZW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgb2xkQWxsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBzY3JlZW5JZD86IHN0cmluZztcbiAgYWRtaW5WaWRJRD86IHN0cmluZztcbiAgbmV3TGltaXRlZFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgbmV3TGltaXRlZFN0cmVhbXNJRHM6IHN0cmluZ1tdO1xuICBhY3RpdmVTb3VuZHM6IHN0cmluZ1tdO1xuICBzY3JlZW5TaGFyZUlEU3RyZWFtPzogc3RyaW5nO1xuICBzY3JlZW5TaGFyZU5hbWVTdHJlYW0/OiBzdHJpbmc7XG4gIGFkbWluSURTdHJlYW0/OiBzdHJpbmc7XG4gIGFkbWluTmFtZVN0cmVhbT86IHN0cmluZztcbiAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXM6IChzdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG4gIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzOiAoaWRzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQWN0aXZlU291bmRzOiAoc291bmRzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbTogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbTogKG5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQWRtaW5JRFN0cmVhbTogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUFkbWluTmFtZVN0cmVhbTogKG5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlWW91WW91U3RyZWFtOiAoc3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjaGFuZ2VWaWRzOiBDaGFuZ2VWaWRzVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlclN0cmVhbXNPcHRpb25zIHtcbiAgYWRkPzogYm9vbGVhbjtcbiAgc2NyZWVuQ2hhbmdlZD86IGJvb2xlYW47XG4gIHBhcmFtZXRlcnM6IFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycztcbn1cblxuZXhwb3J0IHR5cGUgUmVvcmRlclN0cmVhbXNUeXBlID0gKG9wdGlvbnM6IFJlb3JkZXJTdHJlYW1zT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlb3JkZXJTdHJlYW1zIHtcbiAgLyoqXG4gICAqIFJlb3JkZXJzIHRoZSB2aWRlbyBzdHJlYW1zIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zIGFuZCB1cGRhdGVzIHRoZSBVSSBhY2NvcmRpbmdseS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVvcmRlcmluZyBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmFkZD1mYWxzZV0gLSBXaGV0aGVyIHRvIGFkZCBuZXcgc3RyZWFtcyBvciBub3QuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc2NyZWVuQ2hhbmdlZD1mYWxzZV0gLSBXaGV0aGVyIHRoZSBzY3JlZW4gaGFzIGNoYW5nZWQgb3Igbm90LlxuICAgKiBAcGFyYW0ge1Jlb3JkZXJTdHJlYW1zT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHJlb3JkZXJpbmcgc3RyZWFtcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJlb3JkZXJpbmcgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IFJlb3JkZXJTdHJlYW1zT3B0aW9uc1xuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBnZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gYWxsVmlkZW9TdHJlYW1zIC0gQXJyYXkgb2YgYWxsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHBhcnRpY2lwYW50cyAtIEFycmF5IG9mIHBhcnRpY2lwYW50cy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gb2xkQWxsU3RyZWFtcyAtIEFycmF5IG9mIG9sZCBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gc2NyZWVuSWQgLSBJRCBvZiB0aGUgc2NyZWVuLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gYWRtaW5WaWRJRCAtIElEIG9mIHRoZSBhZG1pbiB2aWRlby5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gbmV3TGltaXRlZFN0cmVhbXMgLSBBcnJheSBvZiBuZXcgbGltaXRlZCBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBuZXdMaW1pdGVkU3RyZWFtc0lEcyAtIEFycmF5IG9mIG5ldyBsaW1pdGVkIHN0cmVhbSBJRHMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGFjdGl2ZVNvdW5kcyAtIEFycmF5IG9mIGFjdGl2ZSBzb3VuZHMuXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzY3JlZW5TaGFyZUlEU3RyZWFtIC0gSUQgb2YgdGhlIHNjcmVlbiBzaGFyZSBzdHJlYW0uXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzY3JlZW5TaGFyZU5hbWVTdHJlYW0gLSBOYW1lIG9mIHRoZSBzY3JlZW4gc2hhcmUgc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gYWRtaW5JRFN0cmVhbSAtIElEIG9mIHRoZSBhZG1pbiBzdHJlYW0uXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhZG1pbk5hbWVTdHJlYW0gLSBOYW1lIG9mIHRoZSBhZG1pbiBzdHJlYW0uXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG5ldyBsaW1pdGVkIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG5ldyBsaW1pdGVkIHN0cmVhbSBJRHMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUFjdGl2ZVNvdW5kcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhY3RpdmUgc291bmRzLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHNjcmVlbiBzaGFyZSBJRCBzdHJlYW0uXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzY3JlZW4gc2hhcmUgbmFtZSBzdHJlYW0uXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUFkbWluSURTdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgYWRtaW4gSUQgc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVBZG1pbk5hbWVTdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgYWRtaW4gbmFtZSBzdHJlYW0uXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVlvdVlvdVN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBZb3VZb3Ugc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBjaGFuZ2VWaWRzIC0gRnVuY3Rpb24gdG8gcmVmbGVjdCBjaGFuZ2VzIG9uIHRoZSBVSS5cbiAgICovXG5cbiAgcmVvcmRlclN0cmVhbXMgPSBhc3luYyAoe1xuICAgIGFkZCA9IGZhbHNlLFxuICAgIHNjcmVlbkNoYW5nZWQgPSBmYWxzZSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBSZW9yZGVyU3RyZWFtc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgYWxsVmlkZW9TdHJlYW1zLFxuICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgb2xkQWxsU3RyZWFtcyxcbiAgICAgIHNjcmVlbklkLFxuICAgICAgYWRtaW5WaWRJRCxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICBhY3RpdmVTb3VuZHMsXG4gICAgICBzY3JlZW5TaGFyZUlEU3RyZWFtLFxuICAgICAgc2NyZWVuU2hhcmVOYW1lU3RyZWFtLFxuICAgICAgYWRtaW5JRFN0cmVhbSxcbiAgICAgIGFkbWluTmFtZVN0cmVhbSxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICB1cGRhdGVBY3RpdmVTb3VuZHMsXG4gICAgICB1cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtLFxuICAgICAgdXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtLFxuICAgICAgdXBkYXRlQWRtaW5JRFN0cmVhbSxcbiAgICAgIHVwZGF0ZUFkbWluTmFtZVN0cmVhbSxcbiAgICAgIHVwZGF0ZVlvdVlvdVN0cmVhbSxcblxuICAgICAgLy9tZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIGNoYW5nZVZpZHMsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBmdW5jdGlvbiB0byByZW9yZGVyIHN0cmVhbXMgb24gdGhlIHVpXG4gICAgaWYgKCFhZGQpIHtcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gW107XG4gICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IFtdO1xuICAgICAgYWN0aXZlU291bmRzID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgeW91eW91ID0gYWxsVmlkZW9TdHJlYW1zLmZpbHRlcigoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gJ3lvdXlvdScpO1xuICAgIGNvbnN0IGFkbWluID0gcGFydGljaXBhbnRzLmZpbHRlcigocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LmlzbGV2ZWwgPT09ICcyJyk7XG5cbiAgICBpZiAoYWRtaW4ubGVuZ3RoID4gMCkge1xuICAgICAgYWRtaW5WaWRJRCA9IGFkbWluWzBdLnZpZGVvSUQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkbWluVmlkSUQgPSAnJztcbiAgICB9XG5cbiAgICBpZiAoYWRtaW5WaWRJRCkge1xuICAgICAgY29uc3QgYWRtaW5TdHJlYW0gPSBhbGxWaWRlb1N0cmVhbXMuZmluZCgoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gYWRtaW5WaWRJRCk7XG5cbiAgICAgIGlmICghYWRkKSB7XG4gICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCAuLi55b3V5b3VdO1xuICAgICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IFtcbiAgICAgICAgICAuLi5uZXdMaW1pdGVkU3RyZWFtc0lEcyxcbiAgICAgICAgICAuLi55b3V5b3UubWFwKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkKSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHlvdXlvdVN0cmVhbSA9IG5ld0xpbWl0ZWRTdHJlYW1zLmZpbmQoKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09ICd5b3V5b3UnKTtcblxuICAgICAgICBpZiAoIXlvdXlvdVN0cmVhbSkge1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCAuLi55b3V5b3VdO1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gW1xuICAgICAgICAgICAgLi4ubmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICAgICAgICAuLi55b3V5b3UubWFwKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZG1pblN0cmVhbSkge1xuICAgICAgICBhZG1pbklEU3RyZWFtID0gYWRtaW5WaWRJRDtcblxuICAgICAgICBpZiAoIWFkZCkge1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCBhZG1pblN0cmVhbV07XG4gICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXNJRHMsIGFkbWluU3RyZWFtLnByb2R1Y2VySWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGFkbWluU3RyZWFtZXIgPSBuZXdMaW1pdGVkU3RyZWFtcy5maW5kKFxuICAgICAgICAgICAgKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09IGFkbWluVmlkSUQsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmICghYWRtaW5TdHJlYW1lcikge1xuICAgICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXMsIGFkbWluU3RyZWFtXTtcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zSURzLCBhZG1pblN0cmVhbS5wcm9kdWNlcklkXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9sZEFkbWluU3RyZWFtID0gb2xkQWxsU3RyZWFtcy5maW5kKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSBhZG1pblZpZElEKTtcblxuICAgICAgICBpZiAob2xkQWRtaW5TdHJlYW0pIHtcbiAgICAgICAgICAvL2FkZCBpdCB0byB0aGUgYWxsVmlkZW9TdHJlYW1cblxuICAgICAgICAgIGFkbWluSURTdHJlYW0gPSBhZG1pblZpZElEO1xuICAgICAgICAgIGFkbWluTmFtZVN0cmVhbSA9IGFkbWluWzBdLm5hbWU7XG5cbiAgICAgICAgICBpZiAoIWFkZCkge1xuICAgICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXMsIG9sZEFkbWluU3RyZWFtXTtcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zSURzLCBvbGRBZG1pblN0cmVhbS5wcm9kdWNlcklkXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYWRtaW5TdHJlYW1lciA9IG5ld0xpbWl0ZWRTdHJlYW1zLmZpbmQoXG4gICAgICAgICAgICAgIChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSBhZG1pblZpZElELFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKCFhZG1pblN0cmVhbWVyKSB7XG4gICAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCBvbGRBZG1pblN0cmVhbV07XG4gICAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zSURzLCBvbGRBZG1pblN0cmVhbS5wcm9kdWNlcklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2NyZWVuUGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmlsdGVyKFxuICAgICAgICAocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LlNjcmVlbklEID09PSBzY3JlZW5JZCxcbiAgICAgICk7XG5cbiAgICAgIGlmIChzY3JlZW5QYXJ0aWNpcGFudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHNjcmVlblBhcnRpY2lwYW50VmlkSUQgPSBzY3JlZW5QYXJ0aWNpcGFudFswXS52aWRlb0lEO1xuICAgICAgICBjb25zdCBzY3JlZW5QYXJ0aWNpcGFudFZpZElEXyA9IG5ld0xpbWl0ZWRTdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gc2NyZWVuUGFydGljaXBhbnRWaWRJRCxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoc2NyZWVuUGFydGljaXBhbnRWaWRJRF8/Lmxlbmd0aCA8IDEgJiYgc2NyZWVuUGFydGljaXBhbnRWaWRJRCkge1xuICAgICAgICAgIHNjcmVlblNoYXJlSURTdHJlYW0gPSBzY3JlZW5QYXJ0aWNpcGFudFZpZElEO1xuICAgICAgICAgIHNjcmVlblNoYXJlTmFtZVN0cmVhbSA9IHNjcmVlblBhcnRpY2lwYW50WzBdLm5hbWU7XG4gICAgICAgICAgY29uc3Qgc2NyZWVuUGFydGljaXBhbnRWaWRJRF9fID0gYWxsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgIChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSBzY3JlZW5QYXJ0aWNpcGFudFZpZElELFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXMsIC4uLnNjcmVlblBhcnRpY2lwYW50VmlkSURfX107XG4gICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBbXG4gICAgICAgICAgICAuLi5uZXdMaW1pdGVkU3RyZWFtc0lEcyxcbiAgICAgICAgICAgIC4uLnNjcmVlblBhcnRpY2lwYW50VmlkSURfXy5tYXAoKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQpLFxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFhZGQpIHtcbiAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXMsIC4uLnlvdXlvdV07XG4gICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gW1xuICAgICAgICAgIC4uLm5ld0xpbWl0ZWRTdHJlYW1zSURzLFxuICAgICAgICAgIC4uLnlvdXlvdS5tYXAoKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQpLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgeW91eW91U3RyZWFtID0gbmV3TGltaXRlZFN0cmVhbXMuZmluZCgoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gJ3lvdXlvdScpO1xuXG4gICAgICAgIGlmICgheW91eW91U3RyZWFtKSB7XG4gICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXMsIC4uLnlvdXlvdV07XG4gICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBbXG4gICAgICAgICAgICAuLi5uZXdMaW1pdGVkU3RyZWFtc0lEcyxcbiAgICAgICAgICAgIC4uLnlvdXlvdS5tYXAoKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQpLFxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2NyZWVuUGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmlsdGVyKFxuICAgICAgICAocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LlNjcmVlbklEID09PSBzY3JlZW5JZCxcbiAgICAgICk7XG5cbiAgICAgIGlmIChzY3JlZW5QYXJ0aWNpcGFudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHNjcmVlblBhcnRpY2lwYW50VmlkSUQgPSBzY3JlZW5QYXJ0aWNpcGFudFswXS52aWRlb0lEO1xuICAgICAgICBjb25zdCBzY3JlZW5QYXJ0aWNpcGFudFZpZElEXyA9IG5ld0xpbWl0ZWRTdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gc2NyZWVuUGFydGljaXBhbnRWaWRJRCxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoc2NyZWVuUGFydGljaXBhbnRWaWRJRF8/Lmxlbmd0aCA8IDEgJiYgc2NyZWVuUGFydGljaXBhbnRWaWRJRCkge1xuICAgICAgICAgIHNjcmVlblNoYXJlSURTdHJlYW0gPSBzY3JlZW5QYXJ0aWNpcGFudFZpZElEO1xuICAgICAgICAgIHNjcmVlblNoYXJlTmFtZVN0cmVhbSA9IHNjcmVlblBhcnRpY2lwYW50WzBdLm5hbWU7XG4gICAgICAgICAgY29uc3Qgc2NyZWVuUGFydGljaXBhbnRWaWRJRF9fID0gYWxsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgIChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSBzY3JlZW5QYXJ0aWNpcGFudFZpZElELFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXMsIC4uLnNjcmVlblBhcnRpY2lwYW50VmlkSURfX107XG4gICAgICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBbXG4gICAgICAgICAgICAuLi5uZXdMaW1pdGVkU3RyZWFtc0lEcyxcbiAgICAgICAgICAgIC4uLnNjcmVlblBhcnRpY2lwYW50VmlkSURfXy5tYXAoKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQpLFxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyhuZXdMaW1pdGVkU3RyZWFtcyk7XG4gICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHMobmV3TGltaXRlZFN0cmVhbXNJRHMpO1xuICAgIHVwZGF0ZUFjdGl2ZVNvdW5kcyhhY3RpdmVTb3VuZHMpO1xuICAgIHVwZGF0ZVNjcmVlblNoYXJlSURTdHJlYW0oc2NyZWVuU2hhcmVJRFN0cmVhbSEpO1xuICAgIHVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbShzY3JlZW5TaGFyZU5hbWVTdHJlYW0hKTtcbiAgICB1cGRhdGVBZG1pbklEU3RyZWFtKGFkbWluSURTdHJlYW0hKTtcbiAgICB1cGRhdGVBZG1pbk5hbWVTdHJlYW0oYWRtaW5OYW1lU3RyZWFtISk7XG4gICAgdXBkYXRlWW91WW91U3RyZWFtKHlvdXlvdSk7XG5cbiAgICAvL3JlZmxlY3QgdGhlIGNoYW5nZXMgb24gdGhlIHVpXG4gICAgYXdhaXQgY2hhbmdlVmlkcyh7IHNjcmVlbkNoYW5nZWQsIHBhcmFtZXRlcnMgfSk7XG4gIH07XG59XG4iXX0=