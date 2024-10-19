import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtvdXQtcm9vbS11cGRhdGVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9icmVha291dC1yb29tLW1ldGhvZHMvYnJlYWtvdXQtcm9vbS11cGRhdGVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFnRDNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Qkc7SUFFSCxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUE4QixFQUFpQixFQUFFO1FBQzlGLElBQUksQ0FBQztZQUNILFVBQVUsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUU5QyxJQUFJLEVBQ0YsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsT0FBTyxFQUNQLGVBQWUsRUFDZixZQUFZLEVBRVosbUJBQW1CLEVBQ25CLHlCQUF5QixFQUN6Qix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixrQkFBa0I7WUFFbEIsb0JBQW9CO1lBQ3BCLGVBQWUsRUFDZixNQUFNLEdBQ1AsR0FBRyxVQUFVLENBQUM7WUFFZixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDakIsb0VBQW9FO2dCQUNwRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBUSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sZUFBZSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRCxPQUFPO1lBQ1QsQ0FBQztZQUVELElBQUksT0FBTyxJQUFJLEdB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Q0FBQyxDQUFDO2dCQUNyRCxJQUFJLE9BQU8sSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDbkIsTUFBTSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsK0RBQStEO1FBQ2pFLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBNUhTLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCcmVha291dFBhcnRpY2lwYW50LFxuICBCcmVha291dFJvb21VcGRhdGVkRGF0YSxcbiAgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgT25TY3JlZW5DaGFuZ2VzVHlwZSxcbiAgUGFydGljaXBhbnQsXG4gIFJlUG9ydFBhcmFtZXRlcnMsXG4gIFJlUG9ydFR5cGUsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnJlYWtvdXRSb29tVXBkYXRlZFBhcmFtZXRlcnMgZXh0ZW5kcyBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLCBSZVBvcnRQYXJhbWV0ZXJzIHtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tRW5kZWQ6IGJvb2xlYW47XG4gIGJyZWFrb3V0Um9vbXM6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdO1xuICBob3N0TmV3Um9vbTogbnVtYmVyO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHBhcnRpY2lwYW50c0FsbDogUGFydGljaXBhbnRbXTtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBtZWV0aW5nRGlzcGxheVR5cGU6IHN0cmluZztcbiAgcHJldk1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICB1cGRhdGVCcmVha291dFJvb21zOiAocm9vbXM6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdKSA9PiB2b2lkO1xuICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkOiAoc3RhcnRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQ6IChlbmRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlSG9zdE5ld1Jvb206IChyb29tOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZTogKHR5cGU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUGFydGljaXBhbnRzQWxsOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG5cbiAgLy9tZWRpYXNmdSBmdW5jdGlvbnNcbiAgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXNUeXBlO1xuICByZVBvcnQ6IFJlUG9ydFR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQnJlYWtvdXRSb29tVXBkYXRlZFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCcmVha291dFJvb21VcGRhdGVkT3B0aW9ucyB7XG4gIGRhdGE6IEJyZWFrb3V0Um9vbVVwZGF0ZWREYXRhO1xuICBwYXJhbWV0ZXJzOiBCcmVha291dFJvb21VcGRhdGVkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQnJlYWtvdXRSb29tVXBkYXRlZFR5cGUgPSAob3B0aW9uczogQnJlYWtvdXRSb29tVXBkYXRlZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBCcmVha291dFJvb21VcGRhdGVkIHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHN0YXRlIG9mIGJyZWFrb3V0IHJvb21zIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkYXRhIGFuZCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBicmVha291dCByb29tcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgc3RhdGUgdXBkYXRlIGZ1bmN0aW9ucyBhbmQgb3RoZXIgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgYnJlYWtvdXQgcm9vbSBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tRW5kZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIGJyZWFrb3V0IHJvb20gaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMuYnJlYWtvdXRSb29tcyAtIFRoZSBsaXN0IG9mIGN1cnJlbnQgYnJlYWtvdXQgcm9vbXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdE5ld1Jvb20gLSBUaGUgSUQgb2YgdGhlIG5ldyByb29tIGZvciB0aGUgaG9zdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSBicmVha291dCByb29tLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzQWxsIC0gVGhlIGxpc3Qgb2YgYWxsIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyAtIFRoZSBsaXN0IG9mIHBhcnRpY2lwYW50cyB3aG8gYXJlIG5vdCBiYW5uZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVldGluZ0Rpc3BsYXlUeXBlIC0gVGhlIGN1cnJlbnQgZGlzcGxheSB0eXBlIG9mIHRoZSBtZWV0aW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUgLSBUaGUgcHJldmlvdXMgZGlzcGxheSB0eXBlIG9mIHRoZSBtZWV0aW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtvdXRSb29tcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYnJlYWtvdXQgcm9vbXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVCcmVha091dFJvb21TdGFydGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBicmVha291dCByb29tIHN0YXJ0ZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVCcmVha091dFJvb21FbmRlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYnJlYWtvdXQgcm9vbSBlbmRlZCBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUhvc3ROZXdSb29tIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBob3N0J3MgbmV3IHJvb20uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1lZXRpbmcgZGlzcGxheSB0eXBlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUGFydGljaXBhbnRzQWxsIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBsaXN0IG9mIGFsbCBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQYXJ0aWNpcGFudHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxpc3Qgb2YgcGFydGljaXBhbnRzIHdobyBhcmUgbm90IGJhbm5lZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm9uU2NyZWVuQ2hhbmdlcyAtIEZ1bmN0aW9uIHRvIGhhbmRsZSBzY3JlZW4gY2hhbmdlcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlUG9ydCAtIEZ1bmN0aW9uIHRvIGhhbmRsZSByZXBvcnRpbmcuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBicmVha291dCByb29tIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdXBkYXRlIHByb2Nlc3MgZmFpbHMuXG4gICAqL1xuXG4gIGJyZWFrb3V0Um9vbVVwZGF0ZWQgPSBhc3luYyAoeyBkYXRhLCBwYXJhbWV0ZXJzIH06IEJyZWFrb3V0Um9vbVVwZGF0ZWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgbGV0IHtcbiAgICAgICAgYnJlYWtPdXRSb29tU3RhcnRlZCxcbiAgICAgICAgYnJlYWtPdXRSb29tRW5kZWQsXG4gICAgICAgIGJyZWFrb3V0Um9vbXMsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICAgIHBhcnRpY2lwYW50c0FsbCxcbiAgICAgICAgcGFydGljaXBhbnRzLFxuXG4gICAgICAgIHVwZGF0ZUJyZWFrb3V0Um9vbXMsXG4gICAgICAgIHVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQsXG4gICAgICAgIHVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkLFxuICAgICAgICB1cGRhdGVIb3N0TmV3Um9vbSxcbiAgICAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICAgIHByZXZNZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbCxcbiAgICAgICAgdXBkYXRlUGFydGljaXBhbnRzLFxuXG4gICAgICAgIC8vbWVkaWFTZnUgZnVuY3Rpb25zXG4gICAgICAgIG9uU2NyZWVuQ2hhbmdlcyxcbiAgICAgICAgcmVQb3J0LFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIGlmIChkYXRhLmZvckhvc3QpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgdXBkYXRlSG9zdE5ld1Jvb20oZGF0YS5uZXdSb29tISk7XG4gICAgICAgIGF3YWl0IG9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInICYmIGRhdGEubWVtYmVycykge1xuICAgICAgICAvL2ZpbHRlciBvdXQgdGhlIHBhcnRpY2lwYW50IHRoYXQgaXNCYW5uZWQgPT0gdHJ1ZVxuICAgICAgICBwYXJ0aWNpcGFudHNBbGwgPSBkYXRhLm1lbWJlcnM7XG4gICAgICAgIC8vcmVtb3ZlIGV2ZXJ5IGZpZWxkIG90aGVyIHRoYW4gaXNCYW5uZWQgYW5kIG5hbWUgZnJvbSBwYXJ0aWNpcGFudHNBbGxcbiAgICAgICAgcGFydGljaXBhbnRzQWxsID0gZGF0YS5tZW1iZXJzLm1hcCgocGFydGljaXBhbnQpID0+ICh7XG4gICAgICAgICAgaXNCYW5uZWQ6IHBhcnRpY2lwYW50LmlzQmFubmVkLFxuICAgICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgYXVkaW9JRDogcGFydGljaXBhbnQuYXVkaW9JRCxcbiAgICAgICAgICB2aWRlb0lEOiBwYXJ0aWNpcGFudC52aWRlb0lELFxuICAgICAgICB9KSk7XG4gICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbChwYXJ0aWNpcGFudHNBbGwpO1xuXG4gICAgICAgIHBhcnRpY2lwYW50cyA9IGRhdGEubWVtYmVycy5maWx0ZXIoXG4gICAgICAgICAgKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQuaXNCYW5uZWQgPT0gZmFsc2UsXG4gICAgICAgICk7XG4gICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudHMpO1xuICAgICAgfVxuXG4gICAgICBicmVha291dFJvb21zID0gZGF0YS5icmVha291dFJvb21zIHx8IFtdO1xuICAgICAgdXBkYXRlQnJlYWtvdXRSb29tcyhicmVha291dFJvb21zKTtcblxuICAgICAgaWYgKGRhdGEuc3RhdHVzID09ICdzdGFydGVkJyAmJiAoYnJlYWtPdXRSb29tU3RhcnRlZCB8fCAhYnJlYWtPdXRSb29tRW5kZWQpKSB7XG4gICAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBicmVha091dFJvb21FbmRlZCA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkKHRydWUpO1xuICAgICAgICB1cGRhdGVCcmVha091dFJvb21FbmRlZChmYWxzZSk7XG4gICAgICAgIHByZXZNZWV0aW5nRGlzcGxheVR5cGUgPSBtZWV0aW5nRGlzcGxheVR5cGU7XG4gICAgICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgIT0gJ2FsbCcpIHtcbiAgICAgICAgICBtZWV0aW5nRGlzcGxheVR5cGUgPSAnYWxsJztcbiAgICAgICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUoJ2FsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IG9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIGlmIChpc2xldmVsID09ICcyJykge1xuICAgICAgICAgIGF3YWl0IHJlUG9ydCh7IHJlc3RhcnQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5zdGF0dXMgPT0gJ2VuZGVkJykge1xuICAgICAgICBicmVha091dFJvb21FbmRlZCA9IHRydWU7XG4gICAgICAgIHVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkKHRydWUpO1xuICAgICAgICBpZiAobWVldGluZ0Rpc3BsYXlUeXBlICE9IHByZXZNZWV0aW5nRGlzcGxheVR5cGUpIHtcbiAgICAgICAgICBtZWV0aW5nRGlzcGxheVR5cGUgPSBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlO1xuICAgICAgICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZShwcmV2TWVldGluZ0Rpc3BsYXlUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICBpZiAoaXNsZXZlbCA9PSAnMicpIHtcbiAgICAgICAgICBhd2FpdCByZVBvcnQoeyByZXN0YXJ0OiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRhdGEuc3RhdHVzID09ICdzdGFydGVkJyAmJiBicmVha091dFJvb21TdGFydGVkKSB7XG4gICAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBicmVha091dFJvb21FbmRlZCA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkKHRydWUpO1xuICAgICAgICB1cGRhdGVCcmVha091dFJvb21FbmRlZChmYWxzZSk7XG4gICAgICAgIGF3YWl0IG9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIGlmIChpc2xldmVsID09ICcyJykge1xuICAgICAgICAgIGF3YWl0IHJlUG9ydCh7IHJlc3RhcnQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnRXJyb3IgdXBkYXRpbmcgYnJlYWtvdXQgcm9vbTonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH07XG59XG4iXX0=