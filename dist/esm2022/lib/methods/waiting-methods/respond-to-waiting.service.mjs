import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the response to a participant in the waiting room, either allowing or denying their entry.
 *
 * @param {RespondToWaitingOptions} options - Options for handling the participant's entry request.
 * @param {string} options.participantId - Unique identifier for the participant.
 * @param {string} options.participantName - Name of the participant.
 * @param {Function} options.updateWaitingList - Function to update the waiting list by removing the responded participant.
 * @param {WaitingRoomParticipant[]} options.waitingList - Current list of participants in the waiting room.
 * @param {boolean | string} options.type - Indicates whether to allow ("true") or deny ("false") the participant's entry.
 * @param {string} options.roomName - The name of the room the participant is requesting to join.
 * @param {Socket} options.socket - The socket instance used to emit the response event.
 * @returns {Promise<void>} Resolves when the response has been processed.
 *
 * @example
 * ```typescript
 * const respondService = new RespondToWaiting();
 * respondService.respondToWaiting({
 *   participantId: '12345',
 *   participantName: 'John Doe',
 *   updateWaitingList: (newList) => console.log('Updated Waiting List:', newList),
 *   waitingList: currentWaitingList,
 *   type: 'true',
 *   roomName: 'Room1',
 *   socket: io('http://localhost:3000'),
 * });
 * ```
 *
 * In this example, the participant 'John Doe' is allowed to join 'Room1', and the updated waiting list is logged.
 */
export class RespondToWaiting {
    /**
     * Responds to a participant waiting to join a room by either allowing or denying their entry.
     *
     * @param {Object} options - The options for responding to the waiting participant.
     * @param {string} options.participantId - The ID of the participant.
     * @param {string} options.participantName - The name of the participant.
     * @param {Function} options.updateWaitingList - The function to update the waiting list.
     * @param {Array} options.waitingList - The current waiting list of participants.
     * @param {boolean | string} options.type - The type of response, either "true" or "false".
     * @param {string} options.roomName - The name of the room.
     * @param {Object} options.socket - The socket instance to emit events.
     * @returns {Promise<void>} - A promise that resolves when the response has been processed.
     */
    async respondToWaiting({ participantId, participantName, updateWaitingList, waitingList, type, roomName, socket, }) {
        // Filter out the participant from the waiting list
        const newWaitingList = waitingList.filter((item) => item.name !== participantName);
        // Update the waiting list
        updateWaitingList(newWaitingList);
        const responseType = type === 'true' || type === true ? 'true' : 'false';
        // Emit an event to allow or deny the participant based on the response type
        await socket.emit('allowUserIn', {
            participantId,
            participantName,
            type: responseType,
            roomName,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RespondToWaiting, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RespondToWaiting, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RespondToWaiting, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uZC10by13YWl0aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy93YWl0aW5nLW1ldGhvZHMvcmVzcG9uZC10by13YWl0aW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFpQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBTUgsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQjs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFDckIsYUFBYSxFQUNiLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsV0FBVyxFQUNYLElBQUksRUFDSixRQUFRLEVBQ1IsTUFBTSxHQUNrQjtRQUN4QixtREFBbUQ7UUFDbkQsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsQ0FBQztRQUVuRiwwQkFBMEI7UUFDMUIsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUV6RSw0RUFBNEU7UUFDNUUsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMvQixhQUFhO1lBQ2IsZUFBZTtZQUNmLElBQUksRUFBRSxZQUFZO1lBQ2xCLFFBQVE7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO3VHQXRDVSxnQkFBZ0I7MkdBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFdhaXRpbmdSb29tUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3BvbmRUb1dhaXRpbmdPcHRpb25zIHtcbiAgcGFydGljaXBhbnRJZDogc3RyaW5nO1xuICBwYXJ0aWNpcGFudE5hbWU6IHN0cmluZztcbiAgdXBkYXRlV2FpdGluZ0xpc3Q6ICh3YWl0aW5nTGlzdDogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB3YWl0aW5nTGlzdDogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdO1xuICB0eXBlOiBzdHJpbmcgfCBib29sZWFuO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVzcG9uZFRvV2FpdGluZ1R5cGUgPSAob3B0aW9uczogUmVzcG9uZFRvV2FpdGluZ09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgcmVzcG9uc2UgdG8gYSBwYXJ0aWNpcGFudCBpbiB0aGUgd2FpdGluZyByb29tLCBlaXRoZXIgYWxsb3dpbmcgb3IgZGVueWluZyB0aGVpciBlbnRyeS5cbiAqXG4gKiBAcGFyYW0ge1Jlc3BvbmRUb1dhaXRpbmdPcHRpb25zfSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgaGFuZGxpbmcgdGhlIHBhcnRpY2lwYW50J3MgZW50cnkgcmVxdWVzdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcnRpY2lwYW50SWQgLSBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIHBhcnRpY2lwYW50LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFydGljaXBhbnROYW1lIC0gTmFtZSBvZiB0aGUgcGFydGljaXBhbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVdhaXRpbmdMaXN0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB3YWl0aW5nIGxpc3QgYnkgcmVtb3ZpbmcgdGhlIHJlc3BvbmRlZCBwYXJ0aWNpcGFudC5cbiAqIEBwYXJhbSB7V2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdfSBvcHRpb25zLndhaXRpbmdMaXN0IC0gQ3VycmVudCBsaXN0IG9mIHBhcnRpY2lwYW50cyBpbiB0aGUgd2FpdGluZyByb29tLlxuICogQHBhcmFtIHtib29sZWFuIHwgc3RyaW5nfSBvcHRpb25zLnR5cGUgLSBJbmRpY2F0ZXMgd2hldGhlciB0byBhbGxvdyAoXCJ0cnVlXCIpIG9yIGRlbnkgKFwiZmFsc2VcIikgdGhlIHBhcnRpY2lwYW50J3MgZW50cnkuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHRoZSBwYXJ0aWNpcGFudCBpcyByZXF1ZXN0aW5nIHRvIGpvaW4uXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHVzZWQgdG8gZW1pdCB0aGUgcmVzcG9uc2UgZXZlbnQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmVzb2x2ZXMgd2hlbiB0aGUgcmVzcG9uc2UgaGFzIGJlZW4gcHJvY2Vzc2VkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCByZXNwb25kU2VydmljZSA9IG5ldyBSZXNwb25kVG9XYWl0aW5nKCk7XG4gKiByZXNwb25kU2VydmljZS5yZXNwb25kVG9XYWl0aW5nKHtcbiAqICAgcGFydGljaXBhbnRJZDogJzEyMzQ1JyxcbiAqICAgcGFydGljaXBhbnROYW1lOiAnSm9obiBEb2UnLFxuICogICB1cGRhdGVXYWl0aW5nTGlzdDogKG5ld0xpc3QpID0+IGNvbnNvbGUubG9nKCdVcGRhdGVkIFdhaXRpbmcgTGlzdDonLCBuZXdMaXN0KSxcbiAqICAgd2FpdGluZ0xpc3Q6IGN1cnJlbnRXYWl0aW5nTGlzdCxcbiAqICAgdHlwZTogJ3RydWUnLFxuICogICByb29tTmFtZTogJ1Jvb20xJyxcbiAqICAgc29ja2V0OiBpbygnaHR0cDovL2xvY2FsaG9zdDozMDAwJyksXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEluIHRoaXMgZXhhbXBsZSwgdGhlIHBhcnRpY2lwYW50ICdKb2huIERvZScgaXMgYWxsb3dlZCB0byBqb2luICdSb29tMScsIGFuZCB0aGUgdXBkYXRlZCB3YWl0aW5nIGxpc3QgaXMgbG9nZ2VkLlxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlc3BvbmRUb1dhaXRpbmcge1xuICAvKipcbiAgICogUmVzcG9uZHMgdG8gYSBwYXJ0aWNpcGFudCB3YWl0aW5nIHRvIGpvaW4gYSByb29tIGJ5IGVpdGhlciBhbGxvd2luZyBvciBkZW55aW5nIHRoZWlyIGVudHJ5LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZXNwb25kaW5nIHRvIHRoZSB3YWl0aW5nIHBhcnRpY2lwYW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJ0aWNpcGFudElkIC0gVGhlIElEIG9mIHRoZSBwYXJ0aWNpcGFudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFydGljaXBhbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVdhaXRpbmdMaXN0IC0gVGhlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgd2FpdGluZyBsaXN0LlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLndhaXRpbmdMaXN0IC0gVGhlIGN1cnJlbnQgd2FpdGluZyBsaXN0IG9mIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtib29sZWFuIHwgc3RyaW5nfSBvcHRpb25zLnR5cGUgLSBUaGUgdHlwZSBvZiByZXNwb25zZSwgZWl0aGVyIFwidHJ1ZVwiIG9yIFwiZmFsc2VcIi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSB0byBlbWl0IGV2ZW50cy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcmVzcG9uc2UgaGFzIGJlZW4gcHJvY2Vzc2VkLlxuICAgKi9cbiAgYXN5bmMgcmVzcG9uZFRvV2FpdGluZyh7XG4gICAgcGFydGljaXBhbnRJZCxcbiAgICBwYXJ0aWNpcGFudE5hbWUsXG4gICAgdXBkYXRlV2FpdGluZ0xpc3QsXG4gICAgd2FpdGluZ0xpc3QsXG4gICAgdHlwZSxcbiAgICByb29tTmFtZSxcbiAgICBzb2NrZXQsXG4gIH06IFJlc3BvbmRUb1dhaXRpbmdPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gRmlsdGVyIG91dCB0aGUgcGFydGljaXBhbnQgZnJvbSB0aGUgd2FpdGluZyBsaXN0XG4gICAgY29uc3QgbmV3V2FpdGluZ0xpc3QgPSB3YWl0aW5nTGlzdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubmFtZSAhPT0gcGFydGljaXBhbnROYW1lKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgd2FpdGluZyBsaXN0XG4gICAgdXBkYXRlV2FpdGluZ0xpc3QobmV3V2FpdGluZ0xpc3QpO1xuXG4gICAgY29uc3QgcmVzcG9uc2VUeXBlID0gdHlwZSA9PT0gJ3RydWUnIHx8IHR5cGUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgLy8gRW1pdCBhbiBldmVudCB0byBhbGxvdyBvciBkZW55IHRoZSBwYXJ0aWNpcGFudCBiYXNlZCBvbiB0aGUgcmVzcG9uc2UgdHlwZVxuICAgIGF3YWl0IHNvY2tldC5lbWl0KCdhbGxvd1VzZXJJbicsIHtcbiAgICAgIHBhcnRpY2lwYW50SWQsXG4gICAgICBwYXJ0aWNpcGFudE5hbWUsXG4gICAgICB0eXBlOiByZXNwb25zZVR5cGUsXG4gICAgICByb29tTmFtZSxcbiAgICB9KTtcbiAgfVxufVxuIl19