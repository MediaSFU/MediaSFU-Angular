import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Mutes a participant in a media session if certain conditions are met.
 *
 * This method checks the current user's level and their co-host responsibilities
 * to determine if they are allowed to mute a specified participant. If allowed,
 * the method emits a socket event to mute the participant. If not allowed, an alert
 * is displayed.
 *
 * @param {MuteParticipantsOptions} options - The options for muting participants.
 * @param {Socket} options.socket - The socket instance for communication.
 * @param {CoHostResponsibility[]} options.coHostResponsibility - List of co-host responsibilities.
 * @param {Participant} options.participant - The participant to be muted.
 * @param {string} options.member - The current member attempting to mute.
 * @param {string} options.islevel - The level of the current member.
 * @param {Function} [options.showAlert] - Optional function to show alerts.
 * @param {string} options.coHost - The co-host information.
 * @param {string} options.roomName - The name of the room.
 *
 * @returns {Promise<void>} A promise that resolves when the participant is muted.
 *
 * @throws Will log an error if there is an issue accessing co-host responsibilities.
 *
 * @example
 * ```typescript
 * const muteService = new MuteParticipants();
 * muteService.muteParticipants({
 *   socket: socketInstance,
 *   coHostResponsibility: [{ name: 'media', value: true }],
 *   participant: { id: '123', name: 'John', islevel: '1', muted: false },
 *   member: 'Alice',
 *   islevel: '1',
 *   showAlert: ({ message, type }) => {
 *     console.log(`Alert: ${message} - Type: ${type}`);
 *   },
 *   coHost: 'Bob',
 *   roomName: 'room1',
 * });
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0ZS1wYXJ0aWNpcGFudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL211dGUtcGFydGljaXBhbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFpQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQU1ILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFFSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFDckIsTUFBTSxFQUNOLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsR0FDZ0I7UUFDeEIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXZCLElBQUksQ0FBQztZQUNILFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUMxRixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUVELElBQUksT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDdEQsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQzFCLGFBQWE7b0JBQ2IsZUFBZSxFQUFFLFdBQVcsQ0FBQyxJQUFJO29CQUNqQyxJQUFJLEVBQUUsS0FBSztvQkFDWCxRQUFRO2lCQUNULENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxnREFBZ0Q7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7dUdBdERVLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgUGFydGljaXBhbnQsIENvSG9zdFJlc3BvbnNpYmlsaXR5LCBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBNdXRlUGFydGljaXBhbnRzT3B0aW9ucyB7XG4gIHNvY2tldDogU29ja2V0O1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50O1xuICBtZW1iZXI6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGNvSG9zdDogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBNdXRlUGFydGljaXBhbnRzVHlwZSA9IChvcHRpb25zOiBNdXRlUGFydGljaXBhbnRzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBNdXRlcyBhIHBhcnRpY2lwYW50IGluIGEgbWVkaWEgc2Vzc2lvbiBpZiBjZXJ0YWluIGNvbmRpdGlvbnMgYXJlIG1ldC5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjaGVja3MgdGhlIGN1cnJlbnQgdXNlcidzIGxldmVsIGFuZCB0aGVpciBjby1ob3N0IHJlc3BvbnNpYmlsaXRpZXNcbiAqIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBhbGxvd2VkIHRvIG11dGUgYSBzcGVjaWZpZWQgcGFydGljaXBhbnQuIElmIGFsbG93ZWQsXG4gKiB0aGUgbWV0aG9kIGVtaXRzIGEgc29ja2V0IGV2ZW50IHRvIG11dGUgdGhlIHBhcnRpY2lwYW50LiBJZiBub3QgYWxsb3dlZCwgYW4gYWxlcnRcbiAqIGlzIGRpc3BsYXllZC5cbiAqXG4gKiBAcGFyYW0ge011dGVQYXJ0aWNpcGFudHNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIG11dGluZyBwYXJ0aWNpcGFudHMuXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICogQHBhcmFtIHtDb0hvc3RSZXNwb25zaWJpbGl0eVtdfSBvcHRpb25zLmNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gTGlzdCBvZiBjby1ob3N0IHJlc3BvbnNpYmlsaXRpZXMuXG4gKiBAcGFyYW0ge1BhcnRpY2lwYW50fSBvcHRpb25zLnBhcnRpY2lwYW50IC0gVGhlIHBhcnRpY2lwYW50IHRvIGJlIG11dGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gVGhlIGN1cnJlbnQgbWVtYmVyIGF0dGVtcHRpbmcgdG8gbXV0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIGN1cnJlbnQgbWVtYmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29Ib3N0IC0gVGhlIGNvLWhvc3QgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwYXJ0aWNpcGFudCBpcyBtdXRlZC5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGFjY2Vzc2luZyBjby1ob3N0IHJlc3BvbnNpYmlsaXRpZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG11dGVTZXJ2aWNlID0gbmV3IE11dGVQYXJ0aWNpcGFudHMoKTtcbiAqIG11dGVTZXJ2aWNlLm11dGVQYXJ0aWNpcGFudHMoe1xuICogICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICogICBjb0hvc3RSZXNwb25zaWJpbGl0eTogW3sgbmFtZTogJ21lZGlhJywgdmFsdWU6IHRydWUgfV0sXG4gKiAgIHBhcnRpY2lwYW50OiB7IGlkOiAnMTIzJywgbmFtZTogJ0pvaG4nLCBpc2xldmVsOiAnMScsIG11dGVkOiBmYWxzZSB9LFxuICogICBtZW1iZXI6ICdBbGljZScsXG4gKiAgIGlzbGV2ZWw6ICcxJyxcbiAqICAgc2hvd0FsZXJ0OiAoeyBtZXNzYWdlLCB0eXBlIH0pID0+IHtcbiAqICAgICBjb25zb2xlLmxvZyhgQWxlcnQ6ICR7bWVzc2FnZX0gLSBUeXBlOiAke3R5cGV9YCk7XG4gKiAgIH0sXG4gKiAgIGNvSG9zdDogJ0JvYicsXG4gKiAgIHJvb21OYW1lOiAncm9vbTEnLFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNdXRlUGFydGljaXBhbnRzIHtcbiAgLyoqXG4gICAqIE11dGVzIGEgcGFydGljaXBhbnQgaW4gYSBtZWRpYSBzZXNzaW9uIGlmIGNlcnRhaW4gY29uZGl0aW9ucyBhcmUgbWV0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBtdXRpbmcgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gTGlzdCBvZiBjby1ob3N0IHJlc3BvbnNpYmlsaXRpZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcnRpY2lwYW50IC0gVGhlIHBhcnRpY2lwYW50IHRvIGJlIG11dGVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5tZW1iZXIgLSBUaGUgY3VycmVudCBtZW1iZXIgYXR0ZW1wdGluZyB0byBtdXRlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSBjdXJyZW50IG1lbWJlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jb0hvc3QgLSBUaGUgY28taG9zdCBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHBhcnRpY2lwYW50IGlzIG11dGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGFjY2Vzc2luZyBjby1ob3N0IHJlc3BvbnNpYmlsaXRpZXMuXG4gICAqL1xuXG4gIGFzeW5jIG11dGVQYXJ0aWNpcGFudHMoe1xuICAgIHNvY2tldCxcbiAgICBjb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICBwYXJ0aWNpcGFudCxcbiAgICBtZW1iZXIsXG4gICAgaXNsZXZlbCxcbiAgICBzaG93QWxlcnQsXG4gICAgY29Ib3N0LFxuICAgIHJvb21OYW1lLFxuICB9OiBNdXRlUGFydGljaXBhbnRzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBtZWRpYVZhbHVlID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgbWVkaWFWYWx1ZSA9IGNvSG9zdFJlc3BvbnNpYmlsaXR5LmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gJ21lZGlhJyk/LnZhbHVlID8/IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG5cbiAgICBpZiAoaXNsZXZlbCA9PT0gJzInIHx8IChjb0hvc3QgPT09IG1lbWJlciAmJiBtZWRpYVZhbHVlID09PSB0cnVlKSkge1xuICAgICAgaWYgKCFwYXJ0aWNpcGFudC5tdXRlZCAmJiBwYXJ0aWNpcGFudC5pc2xldmVsICE9PSAnMicpIHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnRJZCA9IHBhcnRpY2lwYW50LmlkO1xuICAgICAgICBzb2NrZXQuZW1pdCgnY29udHJvbE1lZGlhJywge1xuICAgICAgICAgIHBhcnRpY2lwYW50SWQsXG4gICAgICAgICAgcGFydGljaXBhbnROYW1lOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgIHR5cGU6ICdhbGwnLFxuICAgICAgICAgIHJvb21OYW1lLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byBtdXRlIG90aGVyIHBhcnRpY2lwYW50cycsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19