import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uZC10by13YWl0aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy93YWl0aW5nLW1ldGhvZHMvcmVzcG9uZC10by13YWl0aW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFvQjNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQ3JCLGFBQWEsRUFDYixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxJQUFJLEVBQ0osUUFBUSxFQUNSLE1BQU0sR0FDa0I7UUFDeEIsbURBQW1EO1FBQ25ELE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLENBQUM7UUFFbkYsMEJBQTBCO1FBQzFCLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWxDLE1BQU0sWUFBWSxHQUFHLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFekUsNEVBQTRFO1FBQzVFLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDL0IsYUFBYTtZQUNiLGVBQWU7WUFDZixJQUFJLEVBQUUsWUFBWTtZQUNsQixRQUFRO1NBQ1QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt1R0F0Q1UsZ0JBQWdCOzJHQUFoQixnQkFBZ0IsY0FGZixNQUFNOzsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBXYWl0aW5nUm9vbVBhcnRpY2lwYW50IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXNwb25kVG9XYWl0aW5nT3B0aW9ucyB7XG4gIHBhcnRpY2lwYW50SWQ6IHN0cmluZztcbiAgcGFydGljaXBhbnROYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZVdhaXRpbmdMaXN0OiAod2FpdGluZ0xpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcbiAgd2FpdGluZ0xpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcbiAgdHlwZTogc3RyaW5nIHwgYm9vbGVhbjtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlc3BvbmRUb1dhaXRpbmdUeXBlID0gKG9wdGlvbnM6IFJlc3BvbmRUb1dhaXRpbmdPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVzcG9uZFRvV2FpdGluZyB7XG4gIC8qKlxuICAgKiBSZXNwb25kcyB0byBhIHBhcnRpY2lwYW50IHdhaXRpbmcgdG8gam9pbiBhIHJvb20gYnkgZWl0aGVyIGFsbG93aW5nIG9yIGRlbnlpbmcgdGhlaXIgZW50cnkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlc3BvbmRpbmcgdG8gdGhlIHdhaXRpbmcgcGFydGljaXBhbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcnRpY2lwYW50SWQgLSBUaGUgSUQgb2YgdGhlIHBhcnRpY2lwYW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJ0aWNpcGFudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlV2FpdGluZ0xpc3QgLSBUaGUgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB3YWl0aW5nIGxpc3QuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMud2FpdGluZ0xpc3QgLSBUaGUgY3VycmVudCB3YWl0aW5nIGxpc3Qgb2YgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW4gfCBzdHJpbmd9IG9wdGlvbnMudHlwZSAtIFRoZSB0eXBlIG9mIHJlc3BvbnNlLCBlaXRoZXIgXCJ0cnVlXCIgb3IgXCJmYWxzZVwiLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHRvIGVtaXQgZXZlbnRzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZXNwb25zZSBoYXMgYmVlbiBwcm9jZXNzZWQuXG4gICAqL1xuICBhc3luYyByZXNwb25kVG9XYWl0aW5nKHtcbiAgICBwYXJ0aWNpcGFudElkLFxuICAgIHBhcnRpY2lwYW50TmFtZSxcbiAgICB1cGRhdGVXYWl0aW5nTGlzdCxcbiAgICB3YWl0aW5nTGlzdCxcbiAgICB0eXBlLFxuICAgIHJvb21OYW1lLFxuICAgIHNvY2tldCxcbiAgfTogUmVzcG9uZFRvV2FpdGluZ09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBGaWx0ZXIgb3V0IHRoZSBwYXJ0aWNpcGFudCBmcm9tIHRoZSB3YWl0aW5nIGxpc3RcbiAgICBjb25zdCBuZXdXYWl0aW5nTGlzdCA9IHdhaXRpbmdMaXN0LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lICE9PSBwYXJ0aWNpcGFudE5hbWUpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB3YWl0aW5nIGxpc3RcbiAgICB1cGRhdGVXYWl0aW5nTGlzdChuZXdXYWl0aW5nTGlzdCk7XG5cbiAgICBjb25zdCByZXNwb25zZVR5cGUgPSB0eXBlID09PSAndHJ1ZScgfHwgdHlwZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICAvLyBFbWl0IGFuIGV2ZW50IHRvIGFsbG93IG9yIGRlbnkgdGhlIHBhcnRpY2lwYW50IGJhc2VkIG9uIHRoZSByZXNwb25zZSB0eXBlXG4gICAgYXdhaXQgc29ja2V0LmVtaXQoJ2FsbG93VXNlckluJywge1xuICAgICAgcGFydGljaXBhbnRJZCxcbiAgICAgIHBhcnRpY2lwYW50TmFtZSxcbiAgICAgIHR5cGU6IHJlc3BvbnNlVHlwZSxcbiAgICAgIHJvb21OYW1lLFxuICAgIH0pO1xuICB9XG59XG4iXX0=