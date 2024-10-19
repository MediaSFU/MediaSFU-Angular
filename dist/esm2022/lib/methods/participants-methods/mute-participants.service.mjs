import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MuteParticipants {
    /**
     * Mutes a participant in a media session if certain conditions are met.
     *
     * @param {Object} options - The options for muting participants.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
     * @param {Object} options.participant - The participant to be muted.
     * @param {Object} options.member - The current member attempting to mute.
     * @param {string} options.islevel - The level of the current member.
     * @param {Function} [options.showAlert] - Optional function to show alerts.
     * @param {Object} options.coHost - The co-host information.
     * @param {string} options.roomName - The name of the room.
     *
     * @returns {Promise<void>} A promise that resolves when the participant is muted.
     *
     * @throws Will log an error if there is an issue accessing co-host responsibilities.
     */
    async muteParticipants({ socket, coHostResponsibility, participant, member, islevel, showAlert, coHost, roomName, }) {
        let mediaValue = false;
        try {
            mediaValue = coHostResponsibility.find((item) => item.name === 'media')?.value ?? false;
        }
        catch (error) {
            console.error(error);
        }
        if (islevel === '2' || (coHost === member && mediaValue === true)) {
            if (!participant.muted && participant.islevel !== '2') {
                const participantId = participant.id;
                socket.emit('controlMedia', {
                    participantId,
                    participantName: participant.name,
                    type: 'all',
                    roomName,
                });
            }
        }
        else {
            showAlert?.({
                message: 'You are not allowed to mute other participants',
                type: 'danger',
                duration: 3000,
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MuteParticipants, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MuteParticipants, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MuteParticipants, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0ZS1wYXJ0aWNpcGFudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL211dGUtcGFydGljaXBhbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFvQjNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFFSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFDckIsTUFBTSxFQUNOLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsR0FDZ0I7UUFDeEIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXZCLElBQUksQ0FBQztZQUNILFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUMxRixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUVELElBQUksT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDdEQsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQzFCLGFBQWE7b0JBQ2IsZUFBZSxFQUFFLFdBQVcsQ0FBQyxJQUFJO29CQUNqQyxJQUFJLEVBQUUsS0FBSztvQkFDWCxRQUFRO2lCQUNULENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxnREFBZ0Q7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7dUdBdERVLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgUGFydGljaXBhbnQsIENvSG9zdFJlc3BvbnNpYmlsaXR5LCBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBNdXRlUGFydGljaXBhbnRzT3B0aW9ucyB7XG4gIHNvY2tldDogU29ja2V0O1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50O1xuICBtZW1iZXI6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGNvSG9zdDogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBNdXRlUGFydGljaXBhbnRzVHlwZSA9IChvcHRpb25zOiBNdXRlUGFydGljaXBhbnRzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE11dGVQYXJ0aWNpcGFudHMge1xuICAvKipcbiAgICogTXV0ZXMgYSBwYXJ0aWNpcGFudCBpbiBhIG1lZGlhIHNlc3Npb24gaWYgY2VydGFpbiBjb25kaXRpb25zIGFyZSBtZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIG11dGluZyBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY29Ib3N0UmVzcG9uc2liaWxpdHkgLSBMaXN0IG9mIGNvLWhvc3QgcmVzcG9uc2liaWxpdGllcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFydGljaXBhbnQgLSBUaGUgcGFydGljaXBhbnQgdG8gYmUgbXV0ZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLm1lbWJlciAtIFRoZSBjdXJyZW50IG1lbWJlciBhdHRlbXB0aW5nIHRvIG11dGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIGN1cnJlbnQgbWVtYmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNvSG9zdCAtIFRoZSBjby1ob3N0IGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcGFydGljaXBhbnQgaXMgbXV0ZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgYWNjZXNzaW5nIGNvLWhvc3QgcmVzcG9uc2liaWxpdGllcy5cbiAgICovXG5cbiAgYXN5bmMgbXV0ZVBhcnRpY2lwYW50cyh7XG4gICAgc29ja2V0LFxuICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgIHBhcnRpY2lwYW50LFxuICAgIG1lbWJlcixcbiAgICBpc2xldmVsLFxuICAgIHNob3dBbGVydCxcbiAgICBjb0hvc3QsXG4gICAgcm9vbU5hbWUsXG4gIH06IE11dGVQYXJ0aWNpcGFudHNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IG1lZGlhVmFsdWUgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICBtZWRpYVZhbHVlID0gY29Ib3N0UmVzcG9uc2liaWxpdHkuZmluZCgoaXRlbSkgPT4gaXRlbS5uYW1lID09PSAnbWVkaWEnKT8udmFsdWUgPz8gZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChpc2xldmVsID09PSAnMicgfHwgKGNvSG9zdCA9PT0gbWVtYmVyICYmIG1lZGlhVmFsdWUgPT09IHRydWUpKSB7XG4gICAgICBpZiAoIXBhcnRpY2lwYW50Lm11dGVkICYmIHBhcnRpY2lwYW50LmlzbGV2ZWwgIT09ICcyJykge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGFudElkID0gcGFydGljaXBhbnQuaWQ7XG4gICAgICAgIHNvY2tldC5lbWl0KCdjb250cm9sTWVkaWEnLCB7XG4gICAgICAgICAgcGFydGljaXBhbnRJZCxcbiAgICAgICAgICBwYXJ0aWNpcGFudE5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgdHlwZTogJ2FsbCcsXG4gICAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIG11dGUgb3RoZXIgcGFydGljaXBhbnRzJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=