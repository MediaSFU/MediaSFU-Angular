/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Reorders the video streams based on the provided options and updates the UI accordingly.
 *
 * This method handles the logic for reordering streams in a video conferencing application,
 * managing the addition and arrangement of streams based on various conditions such as
 * participant roles, screen sharing status, and current streams.
 *
 * @param {ReorderStreamsOptions} options - The options for reordering streams.
 * @param {boolean} [options.add=false] - Whether to add new streams or not.
 * @param {boolean} [options.screenChanged=false] - Whether the screen has changed or not.
 * @param {ReorderStreamsParameters} options.parameters - The parameters required for reordering streams.
 * @param {Array<Stream | Participant>} options.parameters.allVideoStreams - Array of all video streams.
 * @param {Array<Participant>} options.parameters.participants - Array of participants.
 * @param {Array<Stream | Participant>} options.parameters.oldAllStreams - Array of old streams.
 * @param {string} [options.parameters.screenId] - ID of the screen.
 * @param {string} [options.parameters.adminVidID] - ID of the admin video.
 * @param {Array<Stream | Participant>} options.parameters.newLimitedStreams - Array of new limited streams.
 * @param {Array<string>} options.parameters.newLimitedStreamsIDs - Array of new limited stream IDs.
 * @param {Array<string>} options.parameters.activeSounds - Array of active sounds.
 * @param {string} [options.parameters.screenShareIDStream] - ID of the screen share stream.
 * @param {string} [options.parameters.screenShareNameStream] - Name of the screen share stream.
 * @param {string} [options.parameters.adminIDStream] - ID of the admin stream.
 * @param {string} [options.parameters.adminNameStream] - Name of the admin stream.
 * @param {Function} options.parameters.updateNewLimitedStreams - Function to update new limited streams.
 * @param {Function} options.parameters.updateNewLimitedStreamsIDs - Function to update new limited stream IDs.
 * @param {Function} options.parameters.updateActiveSounds - Function to update active sounds.
 * @param {Function} options.parameters.updateScreenShareIDStream - Function to update screen share ID stream.
 * @param {Function} options.parameters.updateScreenShareNameStream - Function to update screen share name stream.
 * @param {Function} options.parameters.updateAdminIDStream - Function to update admin ID stream.
 * @param {Function} options.parameters.updateAdminNameStream - Function to update admin name stream.
 * @param {Function} options.parameters.updateYouYouStream - Function to update YouYou stream.
 * @param {Function} options.parameters.changeVids - Function to reflect changes on the UI.
 *
 * @returns {Promise<void>} A promise that resolves when the reordering is complete.
 *
 * @throws Will throw an error if there is an issue during the reordering process.
 *
 * @example
 * ```typescript
 * await reorderStreams({
 *   add: true,
 *   screenChanged: false,
 *   parameters: {
 *     allVideoStreams: [...],
 *     participants: [...],
 *     oldAllStreams: [...],
 *     newLimitedStreams: [],
 *     newLimitedStreamsIDs: [],
 *     activeSounds: [],
 *     updateNewLimitedStreams: (streams) => { console.log(updated) },
 *     updateNewLimitedStreamsIDs: (ids) => { console.log(updated) },
 *     updateActiveSounds: (sounds) => { console.log(updated) },
 *     changeVids: async (options) => { },
 *     // ...other parameters
 *   },
 * });
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlci1zdHJlYW1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3Jlb3JkZXItc3RyZWFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZEQUE2RDtBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXVDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlERztBQU1ILE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQ0c7SUFFSCxjQUFjLEdBQUcsS0FBSyxFQUFFLEVBQ3RCLEdBQUcsR0FBRyxLQUFLLEVBQ1gsYUFBYSxHQUFHLEtBQUssRUFDckIsVUFBVSxHQUNZLEVBQWlCLEVBQUU7UUFDekMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksRUFDRixlQUFlLEVBQ2YsWUFBWSxFQUNaLGFBQWEsRUFDYixRQUFRLEVBQ1IsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixvQkFBb0IsRUFDcEIsWUFBWSxFQUNaLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsYUFBYSxFQUNiLGVBQWUsRUFDZix1QkFBdUIsRUFDdkIsMEJBQTBCLEVBQzFCLGtCQUFrQixFQUNsQix5QkFBeUIsRUFDekIsMkJBQTJCLEVBQzNCLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsa0JBQWtCO1FBRWxCLG9CQUFvQjtRQUNwQixVQUFVLEdBQ1gsR0FBRyxVQUFVLENBQUM7UUFFZix3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1QsaUJBQWlCLEdBQUcsRUFBRSxD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QVUsQ0FBQztxQkFDL0QsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNDLDBCQUEwQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMseUJBQXlCLENBQUMsbUJBQW9CLENBQUMsQ0FBQztRQUNoRCwyQkFBMkIsQ0FBQyxxQkFBc0IsQ0FBQyxDQUFDO1FBQ3BELG1CQUFtQixDQUFDLGFBQWMsQ0FBQyxDQUFDO1FBQ3BDLHFCQUFxQixDQUFDLGVBQWdCLENBQUMsQ0FBQztRQUN4QyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzQiwrQkFBK0I7UUFDL0IsTUFBTSxVQUFVLENBQUMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUM7dUdBbE9TLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFydGljaXBhbnQsIFN0cmVhbSwgQ2hhbmdlVmlkc1BhcmFtZXRlcnMsIENoYW5nZVZpZHNUeXBlIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMgZXh0ZW5kcyBDaGFuZ2VWaWRzUGFyYW1ldGVycyB7XG4gIGFsbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIG9sZEFsbFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgc2NyZWVuSWQ/OiBzdHJpbmc7XG4gIGFkbWluVmlkSUQ/OiBzdHJpbmc7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIG5ld0xpbWl0ZWRTdHJlYW1zSURzOiBzdHJpbmdbXTtcbiAgYWN0aXZlU291bmRzOiBzdHJpbmdbXTtcbiAgc2NyZWVuU2hhcmVJRFN0cmVhbT86IHN0cmluZztcbiAgc2NyZWVuU2hhcmVOYW1lU3RyZWFtPzogc3RyaW5nO1xuICBhZG1pbklEU3RyZWFtPzogc3RyaW5nO1xuICBhZG1pbk5hbWVTdHJlYW0/OiBzdHJpbmc7XG4gIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zOiAoc3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdKSA9PiB2b2lkO1xuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEczogKGlkczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUFjdGl2ZVNvdW5kczogKHNvdW5kczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlblNoYXJlSURTdHJlYW06IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW06IChuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUFkbWluSURTdHJlYW06IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVBZG1pbk5hbWVTdHJlYW06IChuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVlvdVlvdVN0cmVhbTogKHN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgY2hhbmdlVmlkczogQ2hhbmdlVmlkc1R5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJTdHJlYW1zT3B0aW9ucyB7XG4gIGFkZD86IGJvb2xlYW47XG4gIHNjcmVlbkNoYW5nZWQ/OiBib29sZWFuO1xuICBwYXJhbWV0ZXJzOiBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnM7XG59XG5cbmV4cG9ydCB0eXBlIFJlb3JkZXJTdHJlYW1zVHlwZSA9IChvcHRpb25zOiBSZW9yZGVyU3RyZWFtc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogUmVvcmRlcnMgdGhlIHZpZGVvIHN0cmVhbXMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMgYW5kIHVwZGF0ZXMgdGhlIFVJIGFjY29yZGluZ2x5LlxuICpcbiAqIFRoaXMgbWV0aG9kIGhhbmRsZXMgdGhlIGxvZ2ljIGZvciByZW9yZGVyaW5nIHN0cmVhbXMgaW4gYSB2aWRlbyBjb25mZXJlbmNpbmcgYXBwbGljYXRpb24sXG4gKiBtYW5hZ2luZyB0aGUgYWRkaXRpb24gYW5kIGFycmFuZ2VtZW50IG9mIHN0cmVhbXMgYmFzZWQgb24gdmFyaW91cyBjb25kaXRpb25zIHN1Y2ggYXNcbiAqIHBhcnRpY2lwYW50IHJvbGVzLCBzY3JlZW4gc2hhcmluZyBzdGF0dXMsIGFuZCBjdXJyZW50IHN0cmVhbXMuXG4gKlxuICogQHBhcmFtIHtSZW9yZGVyU3RyZWFtc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVvcmRlcmluZyBzdHJlYW1zLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hZGQ9ZmFsc2VdIC0gV2hldGhlciB0byBhZGQgbmV3IHN0cmVhbXMgb3Igbm90LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zY3JlZW5DaGFuZ2VkPWZhbHNlXSAtIFdoZXRoZXIgdGhlIHNjcmVlbiBoYXMgY2hhbmdlZCBvciBub3QuXG4gKiBAcGFyYW0ge1Jlb3JkZXJTdHJlYW1zUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHJlb3JkZXJpbmcgc3RyZWFtcy5cbiAqIEBwYXJhbSB7QXJyYXk8U3RyZWFtIHwgUGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMuYWxsVmlkZW9TdHJlYW1zIC0gQXJyYXkgb2YgYWxsIHZpZGVvIHN0cmVhbXMuXG4gKiBAcGFyYW0ge0FycmF5PFBhcnRpY2lwYW50Pn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyAtIEFycmF5IG9mIHBhcnRpY2lwYW50cy5cbiAqIEBwYXJhbSB7QXJyYXk8U3RyZWFtIHwgUGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMub2xkQWxsU3RyZWFtcyAtIEFycmF5IG9mIG9sZCBzdHJlYW1zLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuSWRdIC0gSUQgb2YgdGhlIHNjcmVlbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5wYXJhbWV0ZXJzLmFkbWluVmlkSURdIC0gSUQgb2YgdGhlIGFkbWluIHZpZGVvLlxuICogQHBhcmFtIHtBcnJheTxTdHJlYW0gfCBQYXJ0aWNpcGFudD59IG9wdGlvbnMucGFyYW1ldGVycy5uZXdMaW1pdGVkU3RyZWFtcyAtIEFycmF5IG9mIG5ldyBsaW1pdGVkIHN0cmVhbXMuXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG9wdGlvbnMucGFyYW1ldGVycy5uZXdMaW1pdGVkU3RyZWFtc0lEcyAtIEFycmF5IG9mIG5ldyBsaW1pdGVkIHN0cmVhbSBJRHMuXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG9wdGlvbnMucGFyYW1ldGVycy5hY3RpdmVTb3VuZHMgLSBBcnJheSBvZiBhY3RpdmUgc291bmRzLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuU2hhcmVJRFN0cmVhbV0gLSBJRCBvZiB0aGUgc2NyZWVuIHNoYXJlIHN0cmVhbS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlblNoYXJlTmFtZVN0cmVhbV0gLSBOYW1lIG9mIHRoZSBzY3JlZW4gc2hhcmUgc3RyZWFtLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBhcmFtZXRlcnMuYWRtaW5JRFN0cmVhbV0gLSBJRCBvZiB0aGUgYWRtaW4gc3RyZWFtLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBhcmFtZXRlcnMuYWRtaW5OYW1lU3RyZWFtXSAtIE5hbWUgb2YgdGhlIGFkbWluIHN0cmVhbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBuZXcgbGltaXRlZCBzdHJlYW1zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG5ldyBsaW1pdGVkIHN0cmVhbSBJRHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWN0aXZlU291bmRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFjdGl2ZSBzb3VuZHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzY3JlZW4gc2hhcmUgSUQgc3RyZWFtLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzY3JlZW4gc2hhcmUgbmFtZSBzdHJlYW0uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWRtaW5JRFN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhZG1pbiBJRCBzdHJlYW0uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWRtaW5OYW1lU3RyZWFtIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFkbWluIG5hbWUgc3RyZWFtLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVlvdVlvdVN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBZb3VZb3Ugc3RyZWFtLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoYW5nZVZpZHMgLSBGdW5jdGlvbiB0byByZWZsZWN0IGNoYW5nZXMgb24gdGhlIFVJLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZW9yZGVyaW5nIGlzIGNvbXBsZXRlLlxuICpcbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBkdXJpbmcgdGhlIHJlb3JkZXJpbmcgcHJvY2Vzcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogYXdhaXQgcmVvcmRlclN0cmVhbXMoe1xuICogICBhZGQ6IHRydWUsXG4gKiAgIHNjcmVlbkNoYW5nZWQ6IGZhbHNlLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgYWxsVmlkZW9TdHJlYW1zOiBbLi4uXSxcbiAqICAgICBwYXJ0aWNpcGFudHM6IFsuLi5dLFxuICogICAgIG9sZEFsbFN0cmVhbXM6IFsuLi5dLFxuICogICAgIG5ld0xpbWl0ZWRTdHJlYW1zOiBbXSxcbiAqICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEczogW10sXG4gKiAgICAgYWN0aXZlU291bmRzOiBbXSxcbiAqICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogKHN0cmVhbXMpID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAqICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEczogKGlkcykgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICogICAgIHVwZGF0ZUFjdGl2ZVNvdW5kczogKHNvdW5kcykgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICogICAgIGNoYW5nZVZpZHM6IGFzeW5jIChvcHRpb25zKSA9PiB7IH0sXG4gKiAgICAgLy8gLi4ub3RoZXIgcGFyYW1ldGVyc1xuICogICB9LFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyU3RyZWFtcyB7XG4gIC8qKlxuICAgKiBSZW9yZGVycyB0aGUgdmlkZW8gc3RyZWFtcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucyBhbmQgdXBkYXRlcyB0aGUgVUkgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlb3JkZXJpbmcgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hZGQ9ZmFsc2VdIC0gV2hldGhlciB0byBhZGQgbmV3IHN0cmVhbXMgb3Igbm90LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnNjcmVlbkNoYW5nZWQ9ZmFsc2VdIC0gV2hldGhlciB0aGUgc2NyZWVuIGhhcyBjaGFuZ2VkIG9yIG5vdC5cbiAgICogQHBhcmFtIHtSZW9yZGVyU3RyZWFtc09wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciByZW9yZGVyaW5nIHN0cmVhbXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZW9yZGVyaW5nIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBSZW9yZGVyU3RyZWFtc09wdGlvbnNcbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGFsbFZpZGVvU3RyZWFtcyAtIEFycmF5IG9mIGFsbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBwYXJ0aWNpcGFudHMgLSBBcnJheSBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IG9sZEFsbFN0cmVhbXMgLSBBcnJheSBvZiBvbGQgc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IHNjcmVlbklkIC0gSUQgb2YgdGhlIHNjcmVlbi5cbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGFkbWluVmlkSUQgLSBJRCBvZiB0aGUgYWRtaW4gdmlkZW8uXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IG5ld0xpbWl0ZWRTdHJlYW1zIC0gQXJyYXkgb2YgbmV3IGxpbWl0ZWQgc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gbmV3TGltaXRlZFN0cmVhbXNJRHMgLSBBcnJheSBvZiBuZXcgbGltaXRlZCBzdHJlYW0gSURzLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBhY3RpdmVTb3VuZHMgLSBBcnJheSBvZiBhY3RpdmUgc291bmRzLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gc2NyZWVuU2hhcmVJRFN0cmVhbSAtIElEIG9mIHRoZSBzY3JlZW4gc2hhcmUgc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gc2NyZWVuU2hhcmVOYW1lU3RyZWFtIC0gTmFtZSBvZiB0aGUgc2NyZWVuIHNoYXJlIHN0cmVhbS5cbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGFkbWluSURTdHJlYW0gLSBJRCBvZiB0aGUgYWRtaW4gc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gYWRtaW5OYW1lU3RyZWFtIC0gTmFtZSBvZiB0aGUgYWRtaW4gc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBuZXcgbGltaXRlZCBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBuZXcgbGltaXRlZCBzdHJlYW0gSURzLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVBY3RpdmVTb3VuZHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgYWN0aXZlIHNvdW5kcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzY3JlZW4gc2hhcmUgSUQgc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgc2NyZWVuIHNoYXJlIG5hbWUgc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVBZG1pbklEU3RyZWFtIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFkbWluIElEIHN0cmVhbS5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlQWRtaW5OYW1lU3RyZWFtIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFkbWluIG5hbWUgc3RyZWFtLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVZb3VZb3VTdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgWW91WW91IHN0cmVhbS5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gY2hhbmdlVmlkcyAtIEZ1bmN0aW9uIHRvIHJlZmxlY3QgY2hhbmdlcyBvbiB0aGUgVUkuXG4gICAqL1xuXG4gIHJlb3JkZXJTdHJlYW1zID0gYXN5bmMgKHtcbiAgICBhZGQgPSBmYWxzZSxcbiAgICBzY3JlZW5DaGFuZ2VkID0gZmFsc2UsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUmVvcmRlclN0cmVhbXNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIGFsbFZpZGVvU3RyZWFtcyxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgICBzY3JlZW5JZCxcbiAgICAgIGFkbWluVmlkSUQsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzLFxuICAgICAgYWN0aXZlU291bmRzLFxuICAgICAgc2NyZWVuU2hhcmVJRFN0cmVhbSxcbiAgICAgIHNjcmVlblNoYXJlTmFtZVN0cmVhbSxcbiAgICAgIGFkbWluSURTdHJlYW0sXG4gICAgICBhZG1pbk5hbWVTdHJlYW0sXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzLFxuICAgICAgdXBkYXRlQWN0aXZlU291bmRzLFxuICAgICAgdXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbSxcbiAgICAgIHVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbSxcbiAgICAgIHVwZGF0ZUFkbWluSURTdHJlYW0sXG4gICAgICB1cGRhdGVBZG1pbk5hbWVTdHJlYW0sXG4gICAgICB1cGRhdGVZb3VZb3VTdHJlYW0sXG5cbiAgICAgIC8vbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICBjaGFuZ2VWaWRzLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgLy8gZnVuY3Rpb24gdG8gcmVvcmRlciBzdHJlYW1zIG9uIHRoZSB1aVxuICAgIGlmICghYWRkKSB7XG4gICAgICBuZXdMaW1pdGVkU3RyZWFtcyA9IFtdO1xuICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBbXTtcbiAgICAgIGFjdGl2ZVNvdW5kcyA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHlvdXlvdSA9IGFsbFZpZGVvU3RyZWFtcy5maWx0ZXIoKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09ICd5b3V5b3UnKTtcbiAgICBjb25zdCBhZG1pbiA9IHBhcnRpY2lwYW50cy5maWx0ZXIoKHBhcnRpY2lwYW50KSA9PiBwYXJ0aWNpcGFudC5pc2xldmVsID09PSAnMicpO1xuXG4gICAgaWYgKGFkbWluLmxlbmd0aCA+IDApIHtcbiAgICAgIGFkbWluVmlkSUQgPSBhZG1pblswXS52aWRlb0lEO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZG1pblZpZElEID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGFkbWluVmlkSUQpIHtcbiAgICAgIGNvbnN0IGFkbWluU3RyZWFtID0gYWxsVmlkZW9TdHJlYW1zLmZpbmQoKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09IGFkbWluVmlkSUQpO1xuXG4gICAgICBpZiAoIWFkZCkge1xuICAgICAgICBuZXdMaW1pdGVkU3RyZWFtcyA9IFsuLi5uZXdMaW1pdGVkU3RyZWFtcywgLi4ueW91eW91XTtcbiAgICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBbXG4gICAgICAgICAgLi4ubmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICAgICAgLi4ueW91eW91Lm1hcCgoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCksXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB5b3V5b3VTdHJlYW0gPSBuZXdMaW1pdGVkU3RyZWFtcy5maW5kKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSAneW91eW91Jyk7XG5cbiAgICAgICAgaWYgKCF5b3V5b3VTdHJlYW0pIHtcbiAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtcyA9IFsuLi5uZXdMaW1pdGVkU3RyZWFtcywgLi4ueW91eW91XTtcbiAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IFtcbiAgICAgICAgICAgIC4uLm5ld0xpbWl0ZWRTdHJlYW1zSURzLFxuICAgICAgICAgICAgLi4ueW91eW91Lm1hcCgoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCksXG4gICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRtaW5TdHJlYW0pIHtcbiAgICAgICAgYWRtaW5JRFN0cmVhbSA9IGFkbWluVmlkSUQ7XG5cbiAgICAgICAgaWYgKCFhZGQpIHtcbiAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtcyA9IFsuLi5uZXdMaW1pdGVkU3RyZWFtcywgYWRtaW5TdHJlYW1dO1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zSURzLCBhZG1pblN0cmVhbS5wcm9kdWNlcklkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBhZG1pblN0cmVhbWVyID0gbmV3TGltaXRlZFN0cmVhbXMuZmluZChcbiAgICAgICAgICAgIChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSBhZG1pblZpZElELFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoIWFkbWluU3RyZWFtZXIpIHtcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCBhZG1pblN0cmVhbV07XG4gICAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IFsuLi5uZXdMaW1pdGVkU3RyZWFtc0lEcywgYWRtaW5TdHJlYW0ucHJvZHVjZXJJZF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvbGRBZG1pblN0cmVhbSA9IG9sZEFsbFN0cmVhbXMuZmluZCgoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gYWRtaW5WaWRJRCk7XG5cbiAgICAgICAgaWYgKG9sZEFkbWluU3RyZWFtKSB7XG4gICAgICAgICAgLy9hZGQgaXQgdG8gdGhlIGFsbFZpZGVvU3RyZWFtXG5cbiAgICAgICAgICBhZG1pbklEU3RyZWFtID0gYWRtaW5WaWRJRDtcbiAgICAgICAgICBhZG1pbk5hbWVTdHJlYW0gPSBhZG1pblswXS5uYW1lO1xuXG4gICAgICAgICAgaWYgKCFhZGQpIHtcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCBvbGRBZG1pblN0cmVhbV07XG4gICAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IFsuLi5uZXdMaW1pdGVkU3RyZWFtc0lEcywgb2xkQWRtaW5TdHJlYW0ucHJvZHVjZXJJZF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGFkbWluU3RyZWFtZXIgPSBuZXdMaW1pdGVkU3RyZWFtcy5maW5kKFxuICAgICAgICAgICAgICAoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gYWRtaW5WaWRJRCxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICghYWRtaW5TdHJlYW1lcikge1xuICAgICAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtcyA9IFsuLi5uZXdMaW1pdGVkU3RyZWFtcywgb2xkQWRtaW5TdHJlYW1dO1xuICAgICAgICAgICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IFsuLi5uZXdMaW1pdGVkU3RyZWFtc0lEcywgb2xkQWRtaW5TdHJlYW0ucHJvZHVjZXJJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNjcmVlblBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgICAgKHBhcnRpY2lwYW50KSA9PiBwYXJ0aWNpcGFudC5TY3JlZW5JRCA9PT0gc2NyZWVuSWQsXG4gICAgICApO1xuXG4gICAgICBpZiAoc2NyZWVuUGFydGljaXBhbnQubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBzY3JlZW5QYXJ0aWNpcGFudFZpZElEID0gc2NyZWVuUGFydGljaXBhbnRbMF0udmlkZW9JRDtcbiAgICAgICAgY29uc3Qgc2NyZWVuUGFydGljaXBhbnRWaWRJRF8gPSBuZXdMaW1pdGVkU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgICAgKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09IHNjcmVlblBhcnRpY2lwYW50VmlkSUQsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNjcmVlblBhcnRpY2lwYW50VmlkSURfPy5sZW5ndGggPCAxICYmIHNjcmVlblBhcnRpY2lwYW50VmlkSUQpIHtcbiAgICAgICAgICBzY3JlZW5TaGFyZUlEU3RyZWFtID0gc2NyZWVuUGFydGljaXBhbnRWaWRJRDtcbiAgICAgICAgICBzY3JlZW5TaGFyZU5hbWVTdHJlYW0gPSBzY3JlZW5QYXJ0aWNpcGFudFswXS5uYW1lO1xuICAgICAgICAgIGNvbnN0IHNjcmVlblBhcnRpY2lwYW50VmlkSURfXyA9IGFsbFZpZGVvU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgICAgICAoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gc2NyZWVuUGFydGljaXBhbnRWaWRJRCxcbiAgICAgICAgICApO1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCAuLi5zY3JlZW5QYXJ0aWNpcGFudFZpZElEX19dO1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gW1xuICAgICAgICAgICAgLi4ubmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICAgICAgICAuLi5zY3JlZW5QYXJ0aWNpcGFudFZpZElEX18ubWFwKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghYWRkKSB7XG4gICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCAuLi55b3V5b3VdO1xuICAgICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IFtcbiAgICAgICAgICAuLi5uZXdMaW1pdGVkU3RyZWFtc0lEcyxcbiAgICAgICAgICAuLi55b3V5b3UubWFwKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkKSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHlvdXlvdVN0cmVhbSA9IG5ld0xpbWl0ZWRTdHJlYW1zLmZpbmQoKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09ICd5b3V5b3UnKTtcblxuICAgICAgICBpZiAoIXlvdXlvdVN0cmVhbSkge1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCAuLi55b3V5b3VdO1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gW1xuICAgICAgICAgICAgLi4ubmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICAgICAgICAuLi55b3V5b3UubWFwKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNjcmVlblBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgICAgKHBhcnRpY2lwYW50KSA9PiBwYXJ0aWNpcGFudC5TY3JlZW5JRCA9PT0gc2NyZWVuSWQsXG4gICAgICApO1xuXG4gICAgICBpZiAoc2NyZWVuUGFydGljaXBhbnQubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBzY3JlZW5QYXJ0aWNpcGFudFZpZElEID0gc2NyZWVuUGFydGljaXBhbnRbMF0udmlkZW9JRDtcbiAgICAgICAgY29uc3Qgc2NyZWVuUGFydGljaXBhbnRWaWRJRF8gPSBuZXdMaW1pdGVkU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgICAgKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09IHNjcmVlblBhcnRpY2lwYW50VmlkSUQsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNjcmVlblBhcnRpY2lwYW50VmlkSURfPy5sZW5ndGggPCAxICYmIHNjcmVlblBhcnRpY2lwYW50VmlkSUQpIHtcbiAgICAgICAgICBzY3JlZW5TaGFyZUlEU3RyZWFtID0gc2NyZWVuUGFydGljaXBhbnRWaWRJRDtcbiAgICAgICAgICBzY3JlZW5TaGFyZU5hbWVTdHJlYW0gPSBzY3JlZW5QYXJ0aWNpcGFudFswXS5uYW1lO1xuICAgICAgICAgIGNvbnN0IHNjcmVlblBhcnRpY2lwYW50VmlkSURfXyA9IGFsbFZpZGVvU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgICAgICAoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gc2NyZWVuUGFydGljaXBhbnRWaWRJRCxcbiAgICAgICAgICApO1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zID0gWy4uLm5ld0xpbWl0ZWRTdHJlYW1zLCAuLi5zY3JlZW5QYXJ0aWNpcGFudFZpZElEX19dO1xuICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gW1xuICAgICAgICAgICAgLi4ubmV3TGltaXRlZFN0cmVhbXNJRHMsXG4gICAgICAgICAgICAuLi5zY3JlZW5QYXJ0aWNpcGFudFZpZElEX18ubWFwKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXMobmV3TGltaXRlZFN0cmVhbXMpO1xuICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzKG5ld0xpbWl0ZWRTdHJlYW1zSURzKTtcbiAgICB1cGRhdGVBY3RpdmVTb3VuZHMoYWN0aXZlU291bmRzKTtcbiAgICB1cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtKHNjcmVlblNoYXJlSURTdHJlYW0hKTtcbiAgICB1cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW0oc2NyZWVuU2hhcmVOYW1lU3RyZWFtISk7XG4gICAgdXBkYXRlQWRtaW5JRFN0cmVhbShhZG1pbklEU3RyZWFtISk7XG4gICAgdXBkYXRlQWRtaW5OYW1lU3RyZWFtKGFkbWluTmFtZVN0cmVhbSEpO1xuICAgIHVwZGF0ZVlvdVlvdVN0cmVhbSh5b3V5b3UpO1xuXG4gICAgLy9yZWZsZWN0IHRoZSBjaGFuZ2VzIG9uIHRoZSB1aVxuICAgIGF3YWl0IGNoYW5nZVZpZHMoeyBzY3JlZW5DaGFuZ2VkLCBwYXJhbWV0ZXJzIH0pO1xuICB9O1xufVxuIl19