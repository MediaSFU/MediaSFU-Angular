import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class BanParticipant {
    /**
     * Bans a participant from the session by removing them from the active and display names arrays,
     * updating the participants list, and reordering the streams.
     *
     * @param {BanParticipantOptions} options - The options for banning a participant.
     * @param {string} options.name - The name of the participant to be banned.
     * @param {Object} options.parameters - The parameters required for banning the participant.
     * @param {string[]} options.parameters.activeNames - The array of active participant names.
     * @param {string[]} options.parameters.dispActiveNames - The array of display participant names.
     * @param {Object[]} options.parameters.participants - The array of participant objects.
     * @param {Function} options.parameters.updateParticipants - The function to update the participants array.
     * @param {Function} options.parameters.reorderStreams - The function to reorder the streams.
     *
     * @returns {Promise<void>} A promise that resolves when the participant has been banned and streams reordered.
     */
    banParticipant = async ({ name, parameters }) => {
        const { activeNames, dispActiveNames, participants, updateParticipants, reorderStreams } = parameters;
        // Check if the participant is in the active or display names array
        if (activeNames.includes(name) || dispActiveNames.includes(name)) {
            // Filter out the banned participant from the participants array
            const updatedParticipants = participants.filter((participant) => participant.name !== name);
            // Update the participants array
            updateParticipants(updatedParticipants);
            // Reorder streams after participant removal
            await reorderStreams({ add: false, screenChanged: true, parameters });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BanParticipant, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BanParticipant, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BanParticipant, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLXBhcnRpY2lwYW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYmFuLXBhcnRpY2lwYW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF5QjNDLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQXlCLEVBQWlCLEVBQUU7UUFDcEYsTUFBTSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxHQUN0RixVQUFVLENBQUM7UUFFYixtRUFBbUU7UUFDbkUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqRSxnRUFBZ0U7WUFDaEUsTUFBTSxtQkFBbUIsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUM3QyxDQUFDLFdBQXdCLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUN4RCxDQUFDO1lBRUYsZ0NBQWdDO1lBQ2hDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFeEMsNENBQTRDO1lBQzVDLE1BQU0sY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FqQ1MsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCwgUmVvcmRlclN0cmVhbXNUeXBlLCBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhblBhcnRpY2lwYW50UGFyYW1ldGVycyBleHRlbmRzIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIGFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgZGlzcEFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYW5QYXJ0aWNpcGFudE9wdGlvbnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IEJhblBhcnRpY2lwYW50UGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQmFuUGFydGljaXBhbnRUeXBlID0gKG9wdGlvbnM6IEJhblBhcnRpY2lwYW50T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEJhblBhcnRpY2lwYW50IHtcbiAgLyoqXG4gICAqIEJhbnMgYSBwYXJ0aWNpcGFudCBmcm9tIHRoZSBzZXNzaW9uIGJ5IHJlbW92aW5nIHRoZW0gZnJvbSB0aGUgYWN0aXZlIGFuZCBkaXNwbGF5IG5hbWVzIGFycmF5cyxcbiAgICogdXBkYXRpbmcgdGhlIHBhcnRpY2lwYW50cyBsaXN0LCBhbmQgcmVvcmRlcmluZyB0aGUgc3RyZWFtcy5cbiAgICpcbiAgICogQHBhcmFtIHtCYW5QYXJ0aWNpcGFudE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgYmFubmluZyBhIHBhcnRpY2lwYW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IHRvIGJlIGJhbm5lZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBiYW5uaW5nIHRoZSBwYXJ0aWNpcGFudC5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFjdGl2ZU5hbWVzIC0gVGhlIGFycmF5IG9mIGFjdGl2ZSBwYXJ0aWNpcGFudCBuYW1lcy5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRpc3BBY3RpdmVOYW1lcyAtIFRoZSBhcnJheSBvZiBkaXNwbGF5IHBhcnRpY2lwYW50IG5hbWVzLlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzIC0gVGhlIGFycmF5IG9mIHBhcnRpY2lwYW50IG9iamVjdHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQYXJ0aWNpcGFudHMgLSBUaGUgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwYXJ0aWNpcGFudHMgYXJyYXkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIFRoZSBmdW5jdGlvbiB0byByZW9yZGVyIHRoZSBzdHJlYW1zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcGFydGljaXBhbnQgaGFzIGJlZW4gYmFubmVkIGFuZCBzdHJlYW1zIHJlb3JkZXJlZC5cbiAgICovXG4gIGJhblBhcnRpY2lwYW50ID0gYXN5bmMgKHsgbmFtZSwgcGFyYW1ldGVycyB9OiBCYW5QYXJ0aWNpcGFudE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZU5hbWVzLCBkaXNwQWN0aXZlTmFtZXMsIHBhcnRpY2lwYW50cywgdXBkYXRlUGFydGljaXBhbnRzLCByZW9yZGVyU3RyZWFtcyB9ID1cbiAgICAgIHBhcmFtZXRlcnM7XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgcGFydGljaXBhbnQgaXMgaW4gdGhlIGFjdGl2ZSBvciBkaXNwbGF5IG5hbWVzIGFycmF5XG4gICAgaWYgKGFjdGl2ZU5hbWVzLmluY2x1ZGVzKG5hbWUpIHx8IGRpc3BBY3RpdmVOYW1lcy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgYmFubmVkIHBhcnRpY2lwYW50IGZyb20gdGhlIHBhcnRpY2lwYW50cyBhcnJheVxuICAgICAgY29uc3QgdXBkYXRlZFBhcnRpY2lwYW50cyA9IHBhcnRpY2lwYW50cy5maWx0ZXIoXG4gICAgICAgIChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50Lm5hbWUgIT09IG5hbWUsXG4gICAgICApO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIHBhcnRpY2lwYW50cyBhcnJheVxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzKHVwZGF0ZWRQYXJ0aWNpcGFudHMpO1xuXG4gICAgICAvLyBSZW9yZGVyIHN0cmVhbXMgYWZ0ZXIgcGFydGljaXBhbnQgcmVtb3ZhbFxuICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==