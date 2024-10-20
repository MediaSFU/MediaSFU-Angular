import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RemoveParticipants {
    /**
     * Removes a participant from the room if the user has the appropriate permissions.
     *
     * @param {RemoveParticipantsOptions} options - The options for removing a participant.
     * @param {Array} options.coHostResponsibility - The responsibilities of the co-host.
     * @param {Object} options.participant - The participant to be removed.
     * @param {Object} options.member - The current member attempting to remove the participant.
     * @param {string} options.islevel - The level of the current member.
     * @param {Function} [options.showAlert] - Function to show an alert message.
     * @param {Object} options.coHost - The co-host information.
     * @param {Array} options.participants - The list of current participants.
     * @param {Object} options.socket - The socket instance for emitting events.
     * @param {string} options.roomName - The name of the room.
     * @param {Function} options.updateParticipants - Function to update the participants list.
     *
     * @returns {Promise<void>} - A promise that resolves when the participant is removed.
     */
    async removeParticipants({ coHostResponsibility, participant, member, islevel, showAlert, coHost, participants, socket, roomName, updateParticipants, }) {
        let participantsValue = false;
        try {
            participantsValue =
                coHostResponsibility.find((item) => item.name === 'participants')?.value ?? false;
        }
        catch (error) {
            participantsValue = false;
        }
        if (islevel === '2' || (coHost === member && participantsValue === true)) {
            if (participant.islevel !== '2') {
                const participantId = participant.id;
                // Emit a socket event to disconnect the user
                socket.emit('disconnectUserInitiate', {
                    member: participant.name,
                    roomName,
                    id: participantId,
                });
                // Remove the participant from the local array
                participants.splice(participants.findIndex((obj) => obj.name === participant.name), 1);
                // Update the participants array
                updateParticipants(participants);
            }
        }
        else {
            showAlert?.({
                message: 'You are not allowed to remove other participants',
                type: 'danger',
                duration: 3000,
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RemoveParticipants, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RemoveParticipants, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RemoveParticipants, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLXBhcnRpY2lwYW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcGFydGljaXBhbnRzLW1ldGhvZHMvcmVtb3ZlLXBhcnRpY2lwYW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBdUIzQyxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBRUgsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQ3ZCLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLGtCQUFrQixHQUNRO1FBQzFCLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRTlCLElBQUksQ0FBQztZQUNILGlCQUFpQjtnQkFDZixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUN0RixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDO1FBRUQsSUFBSSxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxpQkFBaUIsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3pFLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFFckMsNkNBQTZDO2dCQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO29CQUNwQyxNQUFNLEVBQUUsV0FBVyxDQUFDLElBQUk7b0JBQ3hCLFFBQVE7b0JBQ1IsRUFBRSxFQUFFLGFBQWE7aUJBQ2xCLENBQUMsQ0FBQztnQkFFSCw4Q0FBOEM7Z0JBQzlDLFlBQVksQ0FBQyxNQUFNLENBQ2pCLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxFQUNuRSxDQUFDLENBQ0YsQ0FBQztnQkFFRixnQ0FBZ0M7Z0JBQ2hDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25DLENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxrREFBa0Q7Z0JBQzNELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7dUdBbkVVLGtCQUFrQjsyR0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IENvSG9zdFJlc3BvbnNpYmlsaXR5LCBQYXJ0aWNpcGFudCwgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZW1vdmVQYXJ0aWNpcGFudHNPcHRpb25zIHtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudDtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBjb0hvc3Q6IHN0cmluZztcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgdXBkYXRlUGFydGljaXBhbnRzOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZW1vdmVQYXJ0aWNpcGFudHNUeXBlID0gKG9wdGlvbnM6IFJlbW92ZVBhcnRpY2lwYW50c09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZW1vdmVQYXJ0aWNpcGFudHMge1xuICAvKipcbiAgICogUmVtb3ZlcyBhIHBhcnRpY2lwYW50IGZyb20gdGhlIHJvb20gaWYgdGhlIHVzZXIgaGFzIHRoZSBhcHByb3ByaWF0ZSBwZXJtaXNzaW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtSZW1vdmVQYXJ0aWNpcGFudHNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlbW92aW5nIGEgcGFydGljaXBhbnQuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY29Ib3N0UmVzcG9uc2liaWxpdHkgLSBUaGUgcmVzcG9uc2liaWxpdGllcyBvZiB0aGUgY28taG9zdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFydGljaXBhbnQgLSBUaGUgcGFydGljaXBhbnQgdG8gYmUgcmVtb3ZlZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMubWVtYmVyIC0gVGhlIGN1cnJlbnQgbWVtYmVyIGF0dGVtcHRpbmcgdG8gcmVtb3ZlIHRoZSBwYXJ0aWNpcGFudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgY3VycmVudCBtZW1iZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnNob3dBbGVydF0gLSBGdW5jdGlvbiB0byBzaG93IGFuIGFsZXJ0IG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNvSG9zdCAtIFRoZSBjby1ob3N0IGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcnRpY2lwYW50cyAtIFRoZSBsaXN0IG9mIGN1cnJlbnQgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBlbWl0dGluZyBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlUGFydGljaXBhbnRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwYXJ0aWNpcGFudHMgbGlzdC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcGFydGljaXBhbnQgaXMgcmVtb3ZlZC5cbiAgICovXG5cbiAgYXN5bmMgcmVtb3ZlUGFydGljaXBhbnRzKHtcbiAgICBjb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICBwYXJ0aWNpcGFudCxcbiAgICBtZW1iZXIsXG4gICAgaXNsZXZlbCxcbiAgICBzaG93QWxlcnQsXG4gICAgY29Ib3N0LFxuICAgIHBhcnRpY2lwYW50cyxcbiAgICBzb2NrZXQsXG4gICAgcm9vbU5hbWUsXG4gICAgdXBkYXRlUGFydGljaXBhbnRzLFxuICB9OiBSZW1vdmVQYXJ0aWNpcGFudHNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHBhcnRpY2lwYW50c1ZhbHVlID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgcGFydGljaXBhbnRzVmFsdWUgPVxuICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eS5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09ICdwYXJ0aWNpcGFudHMnKT8udmFsdWUgPz8gZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHBhcnRpY2lwYW50c1ZhbHVlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzbGV2ZWwgPT09ICcyJyB8fCAoY29Ib3N0ID09PSBtZW1iZXIgJiYgcGFydGljaXBhbnRzVmFsdWUgPT09IHRydWUpKSB7XG4gICAgICBpZiAocGFydGljaXBhbnQuaXNsZXZlbCAhPT0gJzInKSB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2lwYW50SWQgPSBwYXJ0aWNpcGFudC5pZDtcblxuICAgICAgICAvLyBFbWl0IGEgc29ja2V0IGV2ZW50IHRvIGRpc2Nvbm5lY3QgdGhlIHVzZXJcbiAgICAgICAgc29ja2V0LmVtaXQoJ2Rpc2Nvbm5lY3RVc2VySW5pdGlhdGUnLCB7XG4gICAgICAgICAgbWVtYmVyOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgIHJvb21OYW1lLFxuICAgICAgICAgIGlkOiBwYXJ0aWNpcGFudElkLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIHBhcnRpY2lwYW50IGZyb20gdGhlIGxvY2FsIGFycmF5XG4gICAgICAgIHBhcnRpY2lwYW50cy5zcGxpY2UoXG4gICAgICAgICAgcGFydGljaXBhbnRzLmZpbmRJbmRleCgob2JqOiBhbnkpID0+IG9iai5uYW1lID09PSBwYXJ0aWNpcGFudC5uYW1lKSxcbiAgICAgICAgICAxLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcGFydGljaXBhbnRzIGFycmF5XG4gICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHJlbW92ZSBvdGhlciBwYXJ0aWNpcGFudHMnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==