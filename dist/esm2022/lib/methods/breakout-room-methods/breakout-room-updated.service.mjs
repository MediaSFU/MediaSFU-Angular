import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Updates the state of breakout rooms based on the provided data and parameters.
 *
 * This method handles changes in breakout rooms, updates the relevant state variables,
 * and triggers necessary UI updates based on the current status of the breakout rooms.
 *
 * @param {BreakoutRoomUpdatedOptions} options - The options object containing the data and parameters.
 * @param {BreakoutRoomUpdatedData} options.data - The data object containing information about the breakout rooms.
 * @param {BreakoutRoomUpdatedParameters} options.parameters - The parameters object containing various state update functions and other parameters.
 * @param {boolean} options.parameters.breakOutRoomStarted - Indicates if the breakout room has started.
 * @param {boolean} options.parameters.breakOutRoomEnded - Indicates if the breakout room has ended.
 * @param {Array<BreakoutParticipant[]>} options.parameters.breakoutRooms - The list of current breakout rooms.
 * @param {number} options.parameters.hostNewRoom - The ID of the new room for the host.
 * @param {string} options.parameters.islevel - The level of the breakout room (e.g., '2' for host).
 * @param {Array<Participant>} options.parameters.participantsAll - The list of all participants.
 * @param {Array<Participant>} options.parameters.participants - The list of participants who are not banned.
 * @param {string} options.parameters.meetingDisplayType - The current display type of the meeting.
 * @param {string} options.parameters.prevMeetingDisplayType - The previous display type of the meeting.
 * @param {Function} options.parameters.updateBreakoutRooms - Function to update the breakout rooms.
 * @param {Function} options.parameters.updateBreakOutRoomStarted - Function to update the breakout room started state.
 * @param {Function} options.parameters.updateBreakOutRoomEnded - Function to update the breakout room ended state.
 * @param {Function} options.parameters.updateHostNewRoom - Function to update the host's new room.
 * @param {Function} options.parameters.updateMeetingDisplayType - Function to update the meeting display type.
 * @param {Function} options.parameters.updateParticipantsAll - Function to update the list of all participants.
 * @param {Function} options.parameters.updateParticipants - Function to update the list of participants who are not banned.
 * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
 * @param {Function} options.parameters.rePort - Function to handle reporting.
 *
 * @returns {Promise<void>} A promise that resolves when the breakout room state has been updated.
 *
 * @throws Will throw an error if the update process fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   data: {
 *     forHost: true,
 *     newRoom: 3,
 *     status: 'started',
 *     members: [
 *       { name: 'user1', isBanned: false, audioID: 'audio1', videoID: 'video1' },
 *       { name: 'user2', isBanned: true, audioID: 'audio2', videoID: 'video2' },
 *     ],
 *     breakoutRooms: [[{ name: 'user1' }, { name: 'user2' }]],
 *   },
 *   parameters: {
 *     socket: socketInstance,
 *     roomName: 'mainRoom',
 *     screenStates: [{ mainScreenPerson: 'user1', mainScreenFilled: true, adminOnMainScreen: false }],
 *     participants: [{ name: 'admin', islevel: '2' }],
 *     breakOutRoomStarted: false,
 *     breakOutRoomEnded: false,
 *     hostNewRoom: 0,
 *     islevel: '2',
 *     participantsAll: [],
 *     updateBreakoutRooms: (rooms) => {},
 *     updateBreakOutRoomStarted: (started) => {},
 *     updateBreakOutRoomEnded: (ended) => {},
 *     updateHostNewRoom: (room) => {},
 *     updateMeetingDisplayType: (type) => {},
 *     updateParticipantsAll: (participants) => {},
 *     updateParticipants: (participants) => {},
 *     onScreenChanges: async () => {},
 *     rePort: async () => {},
 *   },
 * };
 *
 * const breakoutRoomService = new BreakoutRoomUpdated();
 * await breakoutRoomService.breakoutRoomUpdated(options);
 * ```
 */
export class BreakoutRoomUpdated {
    /**
     * Updates the state of breakout rooms based on the provided data and parameters.
     *
     * @param {Object} options - The options object.
     * @param {Object} options.data - The data object containing information about the breakout rooms.
     * @param {Object} options.parameters - The parameters object containing various state update functions and other parameters.
     * @param {boolean} options.parameters.breakOutRoomStarted - Indicates if the breakout room has started.
     * @param {boolean} options.parameters.breakOutRoomEnded - Indicates if the breakout room has ended.
     * @param {Array} options.parameters.breakoutRooms - The list of current breakout rooms.
     * @param {number} options.parameters.hostNewRoom - The ID of the new room for the host.
     * @param {string} options.parameters.islevel - The level of the breakout room.
     * @param {Array} options.parameters.participantsAll - The list of all participants.
     * @param {Array} options.parameters.participants - The list of participants who are not banned.
     * @param {string} options.parameters.meetingDisplayType - The current display type of the meeting.
     * @param {string} options.parameters.prevMeetingDisplayType - The previous display type of the meeting.
     * @param {Function} options.parameters.updateBreakoutRooms - Function to update the breakout rooms.
     * @param {Function} options.parameters.updateBreakOutRoomStarted - Function to update the breakout room started state.
     * @param {Function} options.parameters.updateBreakOutRoomEnded - Function to update the breakout room ended state.
     * @param {Function} options.parameters.updateHostNewRoom - Function to update the host's new room.
     * @param {Function} options.parameters.updateMeetingDisplayType - Function to update the meeting display type.
     * @param {Function} options.parameters.updateParticipantsAll - Function to update the list of all participants.
     * @param {Function} options.parameters.updateParticipants - Function to update the list of participants who are not banned.
     * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
     * @param {Function} options.parameters.rePort - Function to handle reporting.
     *
     * @returns {Promise<void>} A promise that resolves when the breakout room state has been updated.
     *
     * @throws Will throw an error if the update process fails.
     */
    breakoutRoomUpdated = async ({ data, parameters }) => {
        try {
            parameters = parameters.getUpdatedAllParams();
            let { breakOutRoomStarted, breakOutRoomEnded, breakoutRooms, islevel, participantsAll, participants, updateBreakoutRooms, updateBreakOutRoomStarted, updateBreakOutRoomEnded, updateHostNewRoom, updateMeetingDisplayType, meetingDisplayType, prevMeetingDisplayType, updateParticipantsAll, updateParticipants, 
            //mediaSfu functions
            onScreenChanges, rePort, } = parameters;
            if (data.forHost) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                updateHostNewRoom(data.newRoom);
                await onScreenChanges({ changed: true, parameters });
                return;
            }
            if (islevel == '2' && data.members) {
                //filter out the participant that isBanned == true
                participantsAll = data.members;
                //remove every field other than isBanned and name from participantsAll
                participantsAll = data.members.map((participant) => ({
                    isBanned: participant.isBanned,
                    name: participant.name,
                    audioID: participant.audioID,
                    videoID: participant.videoID,
                }));
                updateParticipantsAll(participantsAll);
                participants = data.members.filter((participant) => participant.isBanned == false);
                updateParticipants(participants);
            }
            breakoutRooms = data.breakoutRooms || [];
            updateBreakoutRooms(breakoutRooms);
            if (data.status == 'started' && (breakOutRoomStarted || !breakOutRoomEnded)) {
                breakOutRoomStarted = true;
                breakOutRoomEnded = false;
                updateBreakOutRoomStarted(true);
                updateBreakOutRoomEnded(false);
                prevMeetingDisplayType = meetingDisplayType;
                if (meetingDisplayType != 'all') {
                    meetingDisplayType = 'all';
                    updateMeetingDisplayType('all');
                }
                await onScreenChanges({ changed: true, parameters });
                if (islevel == '2') {
                    await rePort({ restart: true, parameters });
                }
            }
            else if (data.status == 'ended') {
                breakOutRoomEnded = true;
                updateBreakOutRoomEnded(true);
                if (meetingDisplayType != prevMeetingDisplayType) {
                    meetingDisplayType = prevMeetingDisplayType;
                    updateMeetingDisplayType(prevMeetingDisplayType);
                }
                await onScreenChanges({ changed: true, parameters });
                if (islevel == '2') {
                    await rePort({ restart: true, parameters });
                }
            }
            else if (data.status == 'started' && breakOutRoomStarted) {
                breakOutRoomStarted = true;
                breakOutRoomEnded = false;
                updateBreakOutRoomStarted(true);
                updateBreakOutRoomEnded(false);
                await onScreenChanges({ changed: true, parameters });
                if (islevel == '2') {
                    await rePort({ restart: true, parameters });
                }
            }
        }
        catch (error) {
            // console.log('Error updating breakout room:', error.message);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BreakoutRoomUpdated, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BreakoutRoomUpdated, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BreakoutRoomUpdated, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtvdXQtcm9vbS11cGRhdGVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9icmVha291dC1yb29tLW1ldGhvZHMvYnJlYWtvdXQtcm9vbS11cGRhdGVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUE2QzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0VHO0FBTUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRCRztJQUVILG1CQUFtQixHQUFHLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQThCLEVBQWlCLEVBQUU7UUFDOUYsSUFBSSxDQUFDO1lBQ0gsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRTlDLElBQUksRUFDRixtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixPQUFPLEVBQ1AsZUFBZSxFQUNmLFlBQVksRUFFWixtQkFBbUIsRUFDbkIseUJBQXlCLEVBQ3pCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLGtCQUFrQixFQUNsQixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLGtCQUFrQjtZQUVsQixvQkFBb0I7WUFDcEIsZUFBZSxFQUNmLE1BQU0sR0FDUCxHQUFHLFVBQVUsQ0FBQztZQUVmLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqQixvRUFBb0U7Z0JBQ3BFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFRLENBQUMsQ0FBQztnQkFDakMsTUFBTSxlQUFlLENBQUMsRUFBRSxPQUFP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dUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxlQUFlLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELElBQUksT0FBTyxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNuQixNQUFNLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQiwrREFBK0Q7UUFDakUsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E1SFMsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJyZWFrb3V0UGFydGljaXBhbnQsXG4gIEJyZWFrb3V0Um9vbVVwZGF0ZWREYXRhLFxuICBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICBPblNjcmVlbkNoYW5nZXNUeXBlLFxuICBQYXJ0aWNpcGFudCxcbiAgUmVQb3J0UGFyYW1ldGVycyxcbiAgUmVQb3J0VHlwZSxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBCcmVha291dFJvb21VcGRhdGVkUGFyYW1ldGVycyBleHRlbmRzIE9uU2NyZWVuQ2hhbmdlc1BhcmFtZXRlcnMsIFJlUG9ydFBhcmFtZXRlcnMge1xuICBicmVha091dFJvb21TdGFydGVkOiBib29sZWFuO1xuICBicmVha091dFJvb21FbmRlZDogYm9vbGVhbjtcbiAgYnJlYWtvdXRSb29tczogQnJlYWtvdXRQYXJ0aWNpcGFudFtdW107XG4gIGhvc3ROZXdSb29tOiBudW1iZXI7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgcGFydGljaXBhbnRzQWxsOiBQYXJ0aWNpcGFudFtdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIHVwZGF0ZUJyZWFrb3V0Um9vbXM6IChyb29tczogQnJlYWtvdXRQYXJ0aWNpcGFudFtdW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IChzdGFydGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVCcmVha091dFJvb21FbmRlZDogKGVuZGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVIb3N0TmV3Um9vbTogKHJvb206IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlOiAodHlwZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHNBbGw6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVBhcnRpY2lwYW50czogKHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcblxuICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICBvblNjcmVlbkNoYW5nZXM6IE9uU2NyZWVuQ2hhbmdlc1R5cGU7XG4gIHJlUG9ydDogUmVQb3J0VHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBCcmVha291dFJvb21VcGRhdGVkUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJyZWFrb3V0Um9vbVVwZGF0ZWRPcHRpb25zIHtcbiAgZGF0YTogQnJlYWtvdXRSb29tVXBkYXRlZERhdGE7XG4gIHBhcmFtZXRlcnM6IEJyZWFrb3V0Um9vbVVwZGF0ZWRQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBCcmVha291dFJvb21VcGRhdGVkVHlwZSA9IChvcHRpb25zOiBCcmVha291dFJvb21VcGRhdGVkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBzdGF0ZSBvZiBicmVha291dCByb29tcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGF0YSBhbmQgcGFyYW1ldGVycy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBoYW5kbGVzIGNoYW5nZXMgaW4gYnJlYWtvdXQgcm9vbXMsIHVwZGF0ZXMgdGhlIHJlbGV2YW50IHN0YXRlIHZhcmlhYmxlcyxcbiAqIGFuZCB0cmlnZ2VycyBuZWNlc3NhcnkgVUkgdXBkYXRlcyBiYXNlZCBvbiB0aGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIGJyZWFrb3V0IHJvb21zLlxuICpcbiAqIEBwYXJhbSB7QnJlYWtvdXRSb29tVXBkYXRlZE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyB0aGUgZGF0YSBhbmQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7QnJlYWtvdXRSb29tVXBkYXRlZERhdGF9IG9wdGlvbnMuZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBicmVha291dCByb29tcy5cbiAqIEBwYXJhbSB7QnJlYWtvdXRSb29tVXBkYXRlZFBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgc3RhdGUgdXBkYXRlIGZ1bmN0aW9ucyBhbmQgb3RoZXIgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIGJyZWFrb3V0IHJvb20gaGFzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5icmVha091dFJvb21FbmRlZCAtIEluZGljYXRlcyBpZiB0aGUgYnJlYWtvdXQgcm9vbSBoYXMgZW5kZWQuXG4gKiBAcGFyYW0ge0FycmF5PEJyZWFrb3V0UGFydGljaXBhbnRbXT59IG9wdGlvbnMucGFyYW1ldGVycy5icmVha291dFJvb21zIC0gVGhlIGxpc3Qgb2YgY3VycmVudCBicmVha291dCByb29tcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdE5ld1Jvb20gLSBUaGUgSUQgb2YgdGhlIG5ldyByb29tIGZvciB0aGUgaG9zdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgYnJlYWtvdXQgcm9vbSAoZS5nLiwgJzInIGZvciBob3N0KS5cbiAqIEBwYXJhbSB7QXJyYXk8UGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzQWxsIC0gVGhlIGxpc3Qgb2YgYWxsIHBhcnRpY2lwYW50cy5cbiAqIEBwYXJhbSB7QXJyYXk8UGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzIC0gVGhlIGxpc3Qgb2YgcGFydGljaXBhbnRzIHdobyBhcmUgbm90IGJhbm5lZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVldGluZ0Rpc3BsYXlUeXBlIC0gVGhlIGN1cnJlbnQgZGlzcGxheSB0eXBlIG9mIHRoZSBtZWV0aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlIC0gVGhlIHByZXZpb3VzIGRpc3BsYXkgdHlwZSBvZiB0aGUgbWVldGluZy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVCcmVha291dFJvb21zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBicmVha291dCByb29tcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVCcmVha091dFJvb21TdGFydGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBicmVha291dCByb29tIHN0YXJ0ZWQgc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtPdXRSb29tRW5kZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGJyZWFrb3V0IHJvb20gZW5kZWQgc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSG9zdE5ld1Jvb20gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGhvc3QncyBuZXcgcm9vbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1lZXRpbmcgZGlzcGxheSB0eXBlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVBhcnRpY2lwYW50c0FsbCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbGlzdCBvZiBhbGwgcGFydGljaXBhbnRzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVBhcnRpY2lwYW50cyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMgd2hvIGFyZSBub3QgYmFubmVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm9uU2NyZWVuQ2hhbmdlcyAtIEZ1bmN0aW9uIHRvIGhhbmRsZSBzY3JlZW4gY2hhbmdlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byBoYW5kbGUgcmVwb3J0aW5nLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBicmVha291dCByb29tIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKlxuICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSB1cGRhdGUgcHJvY2VzcyBmYWlscy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgZGF0YToge1xuICogICAgIGZvckhvc3Q6IHRydWUsXG4gKiAgICAgbmV3Um9vbTogMyxcbiAqICAgICBzdGF0dXM6ICdzdGFydGVkJyxcbiAqICAgICBtZW1iZXJzOiBbXG4gKiAgICAgICB7IG5hbWU6ICd1c2VyMScsIGlzQmFubmVkOiBmYWxzZSwgYXVkaW9JRDogJ2F1ZGlvMScsIHZpZGVvSUQ6ICd2aWRlbzEnIH0sXG4gKiAgICAgICB7IG5hbWU6ICd1c2VyMicsIGlzQmFubmVkOiB0cnVlLCBhdWRpb0lEOiAnYXVkaW8yJywgdmlkZW9JRDogJ3ZpZGVvMicgfSxcbiAqICAgICBdLFxuICogICAgIGJyZWFrb3V0Um9vbXM6IFtbeyBuYW1lOiAndXNlcjEnIH0sIHsgbmFtZTogJ3VzZXIyJyB9XV0sXG4gKiAgIH0sXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICogICAgIHJvb21OYW1lOiAnbWFpblJvb20nLFxuICogICAgIHNjcmVlblN0YXRlczogW3sgbWFpblNjcmVlblBlcnNvbjogJ3VzZXIxJywgbWFpblNjcmVlbkZpbGxlZDogdHJ1ZSwgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlIH1dLFxuICogICAgIHBhcnRpY2lwYW50czogW3sgbmFtZTogJ2FkbWluJywgaXNsZXZlbDogJzInIH1dLFxuICogICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IGZhbHNlLFxuICogICAgIGJyZWFrT3V0Um9vbUVuZGVkOiBmYWxzZSxcbiAqICAgICBob3N0TmV3Um9vbTogMCxcbiAqICAgICBpc2xldmVsOiAnMicsXG4gKiAgICAgcGFydGljaXBhbnRzQWxsOiBbXSxcbiAqICAgICB1cGRhdGVCcmVha291dFJvb21zOiAocm9vbXMpID0+IHt9LFxuICogICAgIHVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IChzdGFydGVkKSA9PiB7fSxcbiAqICAgICB1cGRhdGVCcmVha091dFJvb21FbmRlZDogKGVuZGVkKSA9PiB7fSxcbiAqICAgICB1cGRhdGVIb3N0TmV3Um9vbTogKHJvb20pID0+IHt9LFxuICogICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZTogKHR5cGUpID0+IHt9LFxuICogICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbDogKHBhcnRpY2lwYW50cykgPT4ge30sXG4gKiAgICAgdXBkYXRlUGFydGljaXBhbnRzOiAocGFydGljaXBhbnRzKSA9PiB7fSxcbiAqICAgICBvblNjcmVlbkNoYW5nZXM6IGFzeW5jICgpID0+IHt9LFxuICogICAgIHJlUG9ydDogYXN5bmMgKCkgPT4ge30sXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGNvbnN0IGJyZWFrb3V0Um9vbVNlcnZpY2UgPSBuZXcgQnJlYWtvdXRSb29tVXBkYXRlZCgpO1xuICogYXdhaXQgYnJlYWtvdXRSb29tU2VydmljZS5icmVha291dFJvb21VcGRhdGVkKG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQnJlYWtvdXRSb29tVXBkYXRlZCB7XG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBzdGF0ZSBvZiBicmVha291dCByb29tcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGF0YSBhbmQgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmRhdGEgLSBUaGUgZGF0YSBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYnJlYWtvdXQgcm9vbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBvYmplY3QgY29udGFpbmluZyB2YXJpb3VzIHN0YXRlIHVwZGF0ZSBmdW5jdGlvbnMgYW5kIG90aGVyIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIGJyZWFrb3V0IHJvb20gaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbUVuZGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBicmVha291dCByb29tIGhhcyBlbmRlZC5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrb3V0Um9vbXMgLSBUaGUgbGlzdCBvZiBjdXJyZW50IGJyZWFrb3V0IHJvb21zLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3ROZXdSb29tIC0gVGhlIElEIG9mIHRoZSBuZXcgcm9vbSBmb3IgdGhlIGhvc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgYnJlYWtvdXQgcm9vbS5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50c0FsbCAtIFRoZSBsaXN0IG9mIGFsbCBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMgd2hvIGFyZSBub3QgYmFubmVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lZXRpbmdEaXNwbGF5VHlwZSAtIFRoZSBjdXJyZW50IGRpc3BsYXkgdHlwZSBvZiB0aGUgbWVldGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlIC0gVGhlIHByZXZpb3VzIGRpc3BsYXkgdHlwZSBvZiB0aGUgbWVldGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUJyZWFrb3V0Um9vbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGJyZWFrb3V0IHJvb21zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYnJlYWtvdXQgcm9vbSBzdGFydGVkIHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtPdXRSb29tRW5kZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGJyZWFrb3V0IHJvb20gZW5kZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVIb3N0TmV3Um9vbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgaG9zdCdzIG5ldyByb29tLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtZWV0aW5nIGRpc3BsYXkgdHlwZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVBhcnRpY2lwYW50c0FsbCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbGlzdCBvZiBhbGwgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUGFydGljaXBhbnRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBsaXN0IG9mIHBhcnRpY2lwYW50cyB3aG8gYXJlIG5vdCBiYW5uZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5vblNjcmVlbkNoYW5nZXMgLSBGdW5jdGlvbiB0byBoYW5kbGUgc2NyZWVuIGNoYW5nZXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byBoYW5kbGUgcmVwb3J0aW5nLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYnJlYWtvdXQgcm9vbSBzdGF0ZSBoYXMgYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHVwZGF0ZSBwcm9jZXNzIGZhaWxzLlxuICAgKi9cblxuICBicmVha291dFJvb21VcGRhdGVkID0gYXN5bmMgKHsgZGF0YSwgcGFyYW1ldGVycyB9OiBCcmVha291dFJvb21VcGRhdGVkT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgIGxldCB7XG4gICAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQsXG4gICAgICAgIGJyZWFrT3V0Um9vbUVuZGVkLFxuICAgICAgICBicmVha291dFJvb21zLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBwYXJ0aWNpcGFudHNBbGwsXG4gICAgICAgIHBhcnRpY2lwYW50cyxcblxuICAgICAgICB1cGRhdGVCcmVha291dFJvb21zLFxuICAgICAgICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkLFxuICAgICAgICB1cGRhdGVCcmVha091dFJvb21FbmRlZCxcbiAgICAgICAgdXBkYXRlSG9zdE5ld1Jvb20sXG4gICAgICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZSxcbiAgICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgICB1cGRhdGVQYXJ0aWNpcGFudHNBbGwsXG4gICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50cyxcblxuICAgICAgICAvL21lZGlhU2Z1IGZ1bmN0aW9uc1xuICAgICAgICBvblNjcmVlbkNoYW5nZXMsXG4gICAgICAgIHJlUG9ydCxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICBpZiAoZGF0YS5mb3JIb3N0KSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgIHVwZGF0ZUhvc3ROZXdSb29tKGRhdGEubmV3Um9vbSEpO1xuICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc2xldmVsID09ICcyJyAmJiBkYXRhLm1lbWJlcnMpIHtcbiAgICAgICAgLy9maWx0ZXIgb3V0IHRoZSBwYXJ0aWNpcGFudCB0aGF0IGlzQmFubmVkID09IHRydWVcbiAgICAgICAgcGFydGljaXBhbnRzQWxsID0gZGF0YS5tZW1iZXJzO1xuICAgICAgICAvL3JlbW92ZSBldmVyeSBmaWVsZCBvdGhlciB0aGFuIGlzQmFubmVkIGFuZCBuYW1lIGZyb20gcGFydGljaXBhbnRzQWxsXG4gICAgICAgIHBhcnRpY2lwYW50c0FsbCA9IGRhdGEubWVtYmVycy5tYXAoKHBhcnRpY2lwYW50KSA9PiAoe1xuICAgICAgICAgIGlzQmFubmVkOiBwYXJ0aWNpcGFudC5pc0Jhbm5lZCxcbiAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgIGF1ZGlvSUQ6IHBhcnRpY2lwYW50LmF1ZGlvSUQsXG4gICAgICAgICAgdmlkZW9JRDogcGFydGljaXBhbnQudmlkZW9JRCxcbiAgICAgICAgfSkpO1xuICAgICAgICB1cGRhdGVQYXJ0aWNpcGFudHNBbGwocGFydGljaXBhbnRzQWxsKTtcblxuICAgICAgICBwYXJ0aWNpcGFudHMgPSBkYXRhLm1lbWJlcnMuZmlsdGVyKFxuICAgICAgICAgIChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LmlzQmFubmVkID09IGZhbHNlLFxuICAgICAgICApO1xuICAgICAgICB1cGRhdGVQYXJ0aWNpcGFudHMocGFydGljaXBhbnRzKTtcbiAgICAgIH1cblxuICAgICAgYnJlYWtvdXRSb29tcyA9IGRhdGEuYnJlYWtvdXRSb29tcyB8fCBbXTtcbiAgICAgIHVwZGF0ZUJyZWFrb3V0Um9vbXMoYnJlYWtvdXRSb29tcyk7XG5cbiAgICAgIGlmIChkYXRhLnN0YXR1cyA9PSAnc3RhcnRlZCcgJiYgKGJyZWFrT3V0Um9vbVN0YXJ0ZWQgfHwgIWJyZWFrT3V0Um9vbUVuZGVkKSkge1xuICAgICAgICBicmVha091dFJvb21TdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWtPdXRSb29tRW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZCh0cnVlKTtcbiAgICAgICAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQoZmFsc2UpO1xuICAgICAgICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlID0gbWVldGluZ0Rpc3BsYXlUeXBlO1xuICAgICAgICBpZiAobWVldGluZ0Rpc3BsYXlUeXBlICE9ICdhbGwnKSB7XG4gICAgICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlID0gJ2FsbCc7XG4gICAgICAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlKCdhbGwnKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICBpZiAoaXNsZXZlbCA9PSAnMicpIHtcbiAgICAgICAgICBhd2FpdCByZVBvcnQoeyByZXN0YXJ0OiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRhdGEuc3RhdHVzID09ICdlbmRlZCcpIHtcbiAgICAgICAgYnJlYWtPdXRSb29tRW5kZWQgPSB0cnVlO1xuICAgICAgICB1cGRhdGVCcmVha091dFJvb21FbmRlZCh0cnVlKTtcbiAgICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSAhPSBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlKSB7XG4gICAgICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlID0gcHJldk1lZXRpbmdEaXNwbGF5VHlwZTtcbiAgICAgICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUocHJldk1lZXRpbmdEaXNwbGF5VHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHsgY2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInKSB7XG4gICAgICAgICAgYXdhaXQgcmVQb3J0KHsgcmVzdGFydDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkYXRhLnN0YXR1cyA9PSAnc3RhcnRlZCcgJiYgYnJlYWtPdXRSb29tU3RhcnRlZCkge1xuICAgICAgICBicmVha091dFJvb21TdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWtPdXRSb29tRW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZCh0cnVlKTtcbiAgICAgICAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQoZmFsc2UpO1xuICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICBpZiAoaXNsZXZlbCA9PSAnMicpIHtcbiAgICAgICAgICBhd2FpdCByZVBvcnQoeyByZXN0YXJ0OiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ0Vycm9yIHVwZGF0aW5nIGJyZWFrb3V0IHJvb206JywgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9O1xufVxuIl19