import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle banning a participant from the session.
 *
 * @class
 * @name BanParticipant
 * @description This service provides a method to remove a participant from active lists and update the session's participant array, followed by reordering the streams.
 *
 * @method
 * banParticipant
 * @async
 * @param {BanParticipantOptions} options - The options for banning a participant.
 * @param {string} options.name - The name of the participant to be banned.
 * @param {BanParticipantParameters} options.parameters - Parameters required for the banning operation.
 * @param {string[]} options.parameters.activeNames - Array of active participant names.
 * @param {string[]} options.parameters.dispActiveNames - Array of display participant names.
 * @param {Participant[]} options.parameters.participants - Array of current session participants.
 * @param {Function} options.parameters.updateParticipants - Function to update the participants array.
 * @param {Function} options.parameters.reorderStreams - Function to reorder the streams after removing the participant.
 *
 * @returns {Promise<void>} A promise that resolves when the participant has been banned and streams reordered.
 *
 * @example
 * ```typescript
 * const banParticipantService = new BanParticipant();
 * await banParticipantService.banParticipant({
 *   name: 'John Doe',
 *   parameters: {
 *     activeNames: ['John Doe', 'Jane Smith'],
 *     dispActiveNames: ['John Doe', 'Jane Smith'],
 *     participants: [{ name: 'John Doe', isBanned: false }, { name: 'Jane Smith', isBanned: false }],
 *     updateParticipants: (updated) => console.log(updated),
 *     reorderStreams: async () => { }
 *   }
 * });
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLXBhcnRpY2lwYW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYmFuLXBhcnRpY2lwYW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFzQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQU1ILE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQXlCLEVBQWlCLEVBQUU7UUFDcEYsTUFBTSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxHQUN0RixVQUFVLENBQUM7UUFFYixtRUFBbUU7UUFDbkUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqRSxnRUFBZ0U7WUFDaEUsTUFBTSxtQkFBbUIsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUM3QyxDQUFDLFdBQXdCLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUN4RCxDQUFDO1lBRUYsZ0NBQWdDO1lBQ2hDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFeEMsNENBQTRDO1lBQzVDLE1BQU0sY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FqQ1MsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCwgUmVvcmRlclN0cmVhbXNUeXBlLCBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhblBhcnRpY2lwYW50UGFyYW1ldGVycyBleHRlbmRzIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIGFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgZGlzcEFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYW5QYXJ0aWNpcGFudE9wdGlvbnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IEJhblBhcnRpY2lwYW50UGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQmFuUGFydGljaXBhbnRUeXBlID0gKG9wdGlvbnM6IEJhblBhcnRpY2lwYW50T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGhhbmRsZSBiYW5uaW5nIGEgcGFydGljaXBhbnQgZnJvbSB0aGUgc2Vzc2lvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBuYW1lIEJhblBhcnRpY2lwYW50XG4gKiBAZGVzY3JpcHRpb24gVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIGEgbWV0aG9kIHRvIHJlbW92ZSBhIHBhcnRpY2lwYW50IGZyb20gYWN0aXZlIGxpc3RzIGFuZCB1cGRhdGUgdGhlIHNlc3Npb24ncyBwYXJ0aWNpcGFudCBhcnJheSwgZm9sbG93ZWQgYnkgcmVvcmRlcmluZyB0aGUgc3RyZWFtcy5cbiAqXG4gKiBAbWV0aG9kXG4gKiBiYW5QYXJ0aWNpcGFudFxuICogQGFzeW5jXG4gKiBAcGFyYW0ge0JhblBhcnRpY2lwYW50T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBiYW5uaW5nIGEgcGFydGljaXBhbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IHRvIGJlIGJhbm5lZC5cbiAqIEBwYXJhbSB7QmFuUGFydGljaXBhbnRQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBQYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciB0aGUgYmFubmluZyBvcGVyYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMuYWN0aXZlTmFtZXMgLSBBcnJheSBvZiBhY3RpdmUgcGFydGljaXBhbnQgbmFtZXMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMuZGlzcEFjdGl2ZU5hbWVzIC0gQXJyYXkgb2YgZGlzcGxheSBwYXJ0aWNpcGFudCBuYW1lcy5cbiAqIEBwYXJhbSB7UGFydGljaXBhbnRbXX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyAtIEFycmF5IG9mIGN1cnJlbnQgc2Vzc2lvbiBwYXJ0aWNpcGFudHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUGFydGljaXBhbnRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwYXJ0aWNpcGFudHMgYXJyYXkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVvcmRlclN0cmVhbXMgLSBGdW5jdGlvbiB0byByZW9yZGVyIHRoZSBzdHJlYW1zIGFmdGVyIHJlbW92aW5nIHRoZSBwYXJ0aWNpcGFudC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcGFydGljaXBhbnQgaGFzIGJlZW4gYmFubmVkIGFuZCBzdHJlYW1zIHJlb3JkZXJlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgYmFuUGFydGljaXBhbnRTZXJ2aWNlID0gbmV3IEJhblBhcnRpY2lwYW50KCk7XG4gKiBhd2FpdCBiYW5QYXJ0aWNpcGFudFNlcnZpY2UuYmFuUGFydGljaXBhbnQoe1xuICogICBuYW1lOiAnSm9obiBEb2UnLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgYWN0aXZlTmFtZXM6IFsnSm9obiBEb2UnLCAnSmFuZSBTbWl0aCddLFxuICogICAgIGRpc3BBY3RpdmVOYW1lczogWydKb2huIERvZScsICdKYW5lIFNtaXRoJ10sXG4gKiAgICAgcGFydGljaXBhbnRzOiBbeyBuYW1lOiAnSm9obiBEb2UnLCBpc0Jhbm5lZDogZmFsc2UgfSwgeyBuYW1lOiAnSmFuZSBTbWl0aCcsIGlzQmFubmVkOiBmYWxzZSB9XSxcbiAqICAgICB1cGRhdGVQYXJ0aWNpcGFudHM6ICh1cGRhdGVkKSA9PiBjb25zb2xlLmxvZyh1cGRhdGVkKSxcbiAqICAgICByZW9yZGVyU3RyZWFtczogYXN5bmMgKCkgPT4geyB9XG4gKiAgIH1cbiAqIH0pO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQmFuUGFydGljaXBhbnQge1xuICAvKipcbiAgICogQmFucyBhIHBhcnRpY2lwYW50IGZyb20gdGhlIHNlc3Npb24gYnkgcmVtb3ZpbmcgdGhlbSBmcm9tIHRoZSBhY3RpdmUgYW5kIGRpc3BsYXkgbmFtZXMgYXJyYXlzLFxuICAgKiB1cGRhdGluZyB0aGUgcGFydGljaXBhbnRzIGxpc3QsIGFuZCByZW9yZGVyaW5nIHRoZSBzdHJlYW1zLlxuICAgKlxuICAgKiBAcGFyYW0ge0JhblBhcnRpY2lwYW50T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBiYW5uaW5nIGEgcGFydGljaXBhbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQgdG8gYmUgYmFubmVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIGJhbm5pbmcgdGhlIHBhcnRpY2lwYW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMuYWN0aXZlTmFtZXMgLSBUaGUgYXJyYXkgb2YgYWN0aXZlIHBhcnRpY2lwYW50IG5hbWVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMuZGlzcEFjdGl2ZU5hbWVzIC0gVGhlIGFycmF5IG9mIGRpc3BsYXkgcGFydGljaXBhbnQgbmFtZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgYXJyYXkgb2YgcGFydGljaXBhbnQgb2JqZWN0cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVBhcnRpY2lwYW50cyAtIFRoZSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHBhcnRpY2lwYW50cyBhcnJheS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlb3JkZXJTdHJlYW1zIC0gVGhlIGZ1bmN0aW9uIHRvIHJlb3JkZXIgdGhlIHN0cmVhbXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwYXJ0aWNpcGFudCBoYXMgYmVlbiBiYW5uZWQgYW5kIHN0cmVhbXMgcmVvcmRlcmVkLlxuICAgKi9cbiAgYmFuUGFydGljaXBhbnQgPSBhc3luYyAoeyBuYW1lLCBwYXJhbWV0ZXJzIH06IEJhblBhcnRpY2lwYW50T3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgYWN0aXZlTmFtZXMsIGRpc3BBY3RpdmVOYW1lcywgcGFydGljaXBhbnRzLCB1cGRhdGVQYXJ0aWNpcGFudHMsIHJlb3JkZXJTdHJlYW1zIH0gPVxuICAgICAgcGFyYW1ldGVycztcblxuICAgIC8vIENoZWNrIGlmIHRoZSBwYXJ0aWNpcGFudCBpcyBpbiB0aGUgYWN0aXZlIG9yIGRpc3BsYXkgbmFtZXMgYXJyYXlcbiAgICBpZiAoYWN0aXZlTmFtZXMuaW5jbHVkZXMobmFtZSkgfHwgZGlzcEFjdGl2ZU5hbWVzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSBiYW5uZWQgcGFydGljaXBhbnQgZnJvbSB0aGUgcGFydGljaXBhbnRzIGFycmF5XG4gICAgICBjb25zdCB1cGRhdGVkUGFydGljaXBhbnRzID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgICAgKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSAhPT0gbmFtZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgcGFydGljaXBhbnRzIGFycmF5XG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHModXBkYXRlZFBhcnRpY2lwYW50cyk7XG5cbiAgICAgIC8vIFJlb3JkZXIgc3RyZWFtcyBhZnRlciBwYXJ0aWNpcGFudCByZW1vdmFsXG4gICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgfVxuICB9O1xufVxuIl19