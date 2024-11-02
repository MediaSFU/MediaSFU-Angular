import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * GenerateRandomMessages - Service to generate random chat messages from participants.
 *
 * This service generates random direct and group messages based on participants and a given host setup,
 * with options to tailor messages for chat broadcast.
 *
 * @class
 * @name GenerateRandomMessages
 * @example
 * ```typescript
 * const generateRandomMessagesService = new GenerateRandomMessages();
 * const messages = generateRandomMessagesService.generateRandomMessages({
 *   participants: [
 *     { name: 'Alice' },
 *     { name: 'Bob' },
 *     { name: 'Charlie' }
 *   ],
 *   member: 'Alice',
 *   coHost: 'Bob',
 *   host: 'Charlie',
 *   forChatBroadcast: true
 * });
 * console.log(messages);
 * ```
 *
 * @param {Object} options - Options for generating random messages.
 * @param {Participant[]} options.participants - List of participants for message generation.
 * @param {string} options.member - The primary member in the chat.
 * @param {string} [options.coHost] - Optional co-host participant.
 * @param {string} options.host - The chat host.
 * @param {boolean} [options.forChatBroadcast=false] - Flag to indicate if messages are for chat broadcast.
 * @returns {Message[]} Array of randomly generated messages with direct and group messaging.
 */
export class GenerateRandomMessages {
    /**
     * Generates random messages for a given set of participants.
     *
     * @param {Object} options - The options for generating random messages.
     * @param {Array} options.participants - The list of participants.
     * @param {string} options.member - The member who is part of the chat.
     * @param {string} [options.coHost=""] - The co-host of the chat.
     * @param {string} options.host - The host of the chat.
     * @param {boolean} [options.forChatBroadcast=false] - Flag to indicate if the messages are for chat broadcast.
     * @returns {Message[]} An array of generated messages.
     */
    generateRandomMessages({ participants, member, coHost = '', host, forChatBroadcast = false, }) {
        const messages = [];
        // Function to get a random participant other than the sender
        const getRandomReceiver = (sender) => {
            const potentialReceivers = participants.filter((participant) => participant.name !== sender);
            const randomReceiver = potentialReceivers[Math.floor(Math.random() * potentialReceivers.length)];
            return randomReceiver.name || '';
        };
        // Force add messages for specific participants
        let refNames = [];
        if (forChatBroadcast) {
            refNames = [member, host];
        }
        else {
            if (coHost) {
                refNames = [
                    member,
                    coHost,
                    host,
                    ...participants
                        .map((participant) => participant.name)
                        .filter((name) => name !== undefined),
                ];
            }
            else {
                refNames = [
                    member,
                    host,
                    ...participants
                        .map((participant) => participant.name)
                        .filter((name) => name !== undefined),
                ];
            }
        }
        // Return unique names for the refNames
        refNames = [...new Set(refNames)];
        // Generate messages
        let timeIncrement = 0;
        refNames.forEach((sender) => {
            // Send direct messages
            const directMessage = {
                sender: sender,
                receivers: [getRandomReceiver(sender)],
                message: `Direct message from ${sender}`,
                timestamp: new Date(Date.now() + timeIncrement).toLocaleTimeString(),
                group: false,
            };
            messages.push(directMessage);
            // Send group messages
            const groupMessage = {
                sender: sender,
                receivers: participants
                    .map((participant) => participant.name)
                    .filter((name) => name !== undefined),
                message: `Group message from ${sender}`,
                timestamp: new Date(Date.now() + timeIncrement).toLocaleTimeString(),
                group: true,
            };
            messages.push(groupMessage);
            timeIncrement += 15000; // Increment time by 15 seconds for each message
        });
        return messages;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomMessages, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomMessages, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomMessages, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLW1lc3NhZ2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy9nZW5lcmF0ZS1yYW5kb20tbWVzc2FnZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFPSCxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDOzs7Ozs7Ozs7O09BVUc7SUFDSCxzQkFBc0IsQ0FBQyxFQUNyQixZQUFZLEVBQ1osTUFBTSxFQUNOLE1BQU0sR0FBRyxFQUFFLEVBQ1gsSUFBSSxFQUNKLGdCQUFnQixHQUFHLEtBQUssR0FDTTtRQUM5QixNQUFNLFFBQVEsR0FBYyxFQUFFLENBQUM7UUFFL0IsNkRBQTZEO1FBQzdELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFjLEVBQVUsRUFBRTtZQUNuRCxNQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUM7WUFDN0YsTUFBTSxjQUFjLEdBQ2xCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUM7UUFFRiwrQ0FBK0M7UUFDL0MsSUFBSSxRQUFRLEdBQWEsRUFBRSxDQUFDO1FBQzVCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUNyQixRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNYLFFBQVEsR0FBRztvQkFDVCxNQUFNO29CQUNOLE1BQU07b0JBQ04sSUFBSTtvQkFDSixHQUFHLFlBQVk7eUJBQ1osR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO3lCQUN0QyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQWtCLEVBQUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO2lCQUN4RCxDQUFDO1lBQ0osQ0FBQztpQkFBTSxDQUFDO2dCQUNOLFFBQVEsR0FBRztvQkFDVCxNQUFNO29CQUNOLElBQUk7b0JBQ0osR0FBRyxZQUFZO3lCQUNaLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQzt5QkFDdEMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFrQixFQUFFLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztpQkFDeEQsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDO1FBRUQsdUNBQXVDO1FBQ3ZDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVsQyxvQkFBb0I7UUFDcEIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMxQix1QkFBdUI7WUFDdkIsTUFBTSxhQUFhLEdBQVk7Z0JBQzdCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QyxPQUFPLEVBQUUsdUJBQXVCLE1BQU0sRUFBRTtnQkFDeEMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxhQUFhLENBQUMsQ0FBQyxrQkFBa0IsRUFBRTtnQkFDcEUsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDO1lBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU3QixzQkFBc0I7WUFDdEIsTUFBTSxZQUFZLEdBQVk7Z0JBQzVCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFNBQVMsRUFBRSxZQUFZO3FCQUNwQixHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7cUJBQ3RDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBa0IsRUFBRSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7Z0JBQ3ZELE9BQU8sRUFBRSxzQkFBc0IsTUFBTSxFQUFFO2dCQUN2QyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxDQUFDLGtCQUFrQixFQUFFO2dCQUNwRSxLQUFLLEVBQUUsSUFBSTthQUNaLENBQUM7WUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTVCLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQyxnREFBZ0Q7UUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO3VHQXZGVSxzQkFBc0I7MkdBQXRCLHNCQUFzQixjQUZyQixNQUFNOzsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVzc2FnZSwgUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlUmFuZG9tTWVzc2FnZXNPcHRpb25zIHtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBtZW1iZXI6IHN0cmluZztcbiAgY29Ib3N0Pzogc3RyaW5nO1xuICBob3N0OiBzdHJpbmc7XG4gIGZvckNoYXRCcm9hZGNhc3Q/OiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBHZW5lcmF0ZVJhbmRvbU1lc3NhZ2VzVHlwZSA9IChvcHRpb25zOiBHZW5lcmF0ZVJhbmRvbU1lc3NhZ2VzT3B0aW9ucykgPT4gTWVzc2FnZVtdO1xuXG4vKipcbiAqIEdlbmVyYXRlUmFuZG9tTWVzc2FnZXMgLSBTZXJ2aWNlIHRvIGdlbmVyYXRlIHJhbmRvbSBjaGF0IG1lc3NhZ2VzIGZyb20gcGFydGljaXBhbnRzLlxuICpcbiAqIFRoaXMgc2VydmljZSBnZW5lcmF0ZXMgcmFuZG9tIGRpcmVjdCBhbmQgZ3JvdXAgbWVzc2FnZXMgYmFzZWQgb24gcGFydGljaXBhbnRzIGFuZCBhIGdpdmVuIGhvc3Qgc2V0dXAsXG4gKiB3aXRoIG9wdGlvbnMgdG8gdGFpbG9yIG1lc3NhZ2VzIGZvciBjaGF0IGJyb2FkY2FzdC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBuYW1lIEdlbmVyYXRlUmFuZG9tTWVzc2FnZXNcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBnZW5lcmF0ZVJhbmRvbU1lc3NhZ2VzU2VydmljZSA9IG5ldyBHZW5lcmF0ZVJhbmRvbU1lc3NhZ2VzKCk7XG4gKiBjb25zdCBtZXNzYWdlcyA9IGdlbmVyYXRlUmFuZG9tTWVzc2FnZXNTZXJ2aWNlLmdlbmVyYXRlUmFuZG9tTWVzc2FnZXMoe1xuICogICBwYXJ0aWNpcGFudHM6IFtcbiAqICAgICB7IG5hbWU6ICdBbGljZScgfSxcbiAqICAgICB7IG5hbWU6ICdCb2InIH0sXG4gKiAgICAgeyBuYW1lOiAnQ2hhcmxpZScgfVxuICogICBdLFxuICogICBtZW1iZXI6ICdBbGljZScsXG4gKiAgIGNvSG9zdDogJ0JvYicsXG4gKiAgIGhvc3Q6ICdDaGFybGllJyxcbiAqICAgZm9yQ2hhdEJyb2FkY2FzdDogdHJ1ZVxuICogfSk7XG4gKiBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGdlbmVyYXRpbmcgcmFuZG9tIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtQYXJ0aWNpcGFudFtdfSBvcHRpb25zLnBhcnRpY2lwYW50cyAtIExpc3Qgb2YgcGFydGljaXBhbnRzIGZvciBtZXNzYWdlIGdlbmVyYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgcHJpbWFyeSBtZW1iZXIgaW4gdGhlIGNoYXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY29Ib3N0XSAtIE9wdGlvbmFsIGNvLWhvc3QgcGFydGljaXBhbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5ob3N0IC0gVGhlIGNoYXQgaG9zdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZm9yQ2hhdEJyb2FkY2FzdD1mYWxzZV0gLSBGbGFnIHRvIGluZGljYXRlIGlmIG1lc3NhZ2VzIGFyZSBmb3IgY2hhdCBicm9hZGNhc3QuXG4gKiBAcmV0dXJucyB7TWVzc2FnZVtdfSBBcnJheSBvZiByYW5kb21seSBnZW5lcmF0ZWQgbWVzc2FnZXMgd2l0aCBkaXJlY3QgYW5kIGdyb3VwIG1lc3NhZ2luZy5cbiAqL1xuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVyYXRlUmFuZG9tTWVzc2FnZXMge1xuICAvKipcbiAgICogR2VuZXJhdGVzIHJhbmRvbSBtZXNzYWdlcyBmb3IgYSBnaXZlbiBzZXQgb2YgcGFydGljaXBhbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBnZW5lcmF0aW5nIHJhbmRvbSBtZXNzYWdlcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgd2hvIGlzIHBhcnQgb2YgdGhlIGNoYXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jb0hvc3Q9XCJcIl0gLSBUaGUgY28taG9zdCBvZiB0aGUgY2hhdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaG9zdCAtIFRoZSBob3N0IG9mIHRoZSBjaGF0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZvckNoYXRCcm9hZGNhc3Q9ZmFsc2VdIC0gRmxhZyB0byBpbmRpY2F0ZSBpZiB0aGUgbWVzc2FnZXMgYXJlIGZvciBjaGF0IGJyb2FkY2FzdC5cbiAgICogQHJldHVybnMge01lc3NhZ2VbXX0gQW4gYXJyYXkgb2YgZ2VuZXJhdGVkIG1lc3NhZ2VzLlxuICAgKi9cbiAgZ2VuZXJhdGVSYW5kb21NZXNzYWdlcyh7XG4gICAgcGFydGljaXBhbnRzLFxuICAgIG1lbWJlcixcbiAgICBjb0hvc3QgPSAnJyxcbiAgICBob3N0LFxuICAgIGZvckNoYXRCcm9hZGNhc3QgPSBmYWxzZSxcbiAgfTogR2VuZXJhdGVSYW5kb21NZXNzYWdlc09wdGlvbnMpOiBNZXNzYWdlW10ge1xuICAgIGNvbnN0IG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXTtcblxuICAgIC8vIEZ1bmN0aW9uIHRvIGdldCBhIHJhbmRvbSBwYXJ0aWNpcGFudCBvdGhlciB0aGFuIHRoZSBzZW5kZXJcbiAgICBjb25zdCBnZXRSYW5kb21SZWNlaXZlciA9IChzZW5kZXI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICBjb25zdCBwb3RlbnRpYWxSZWNlaXZlcnMgPSBwYXJ0aWNpcGFudHMuZmlsdGVyKChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSAhPT0gc2VuZGVyKTtcbiAgICAgIGNvbnN0IHJhbmRvbVJlY2VpdmVyID1cbiAgICAgICAgcG90ZW50aWFsUmVjZWl2ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvdGVudGlhbFJlY2VpdmVycy5sZW5ndGgpXTtcbiAgICAgIHJldHVybiByYW5kb21SZWNlaXZlci5uYW1lIHx8ICcnO1xuICAgIH07XG5cbiAgICAvLyBGb3JjZSBhZGQgbWVzc2FnZXMgZm9yIHNwZWNpZmljIHBhcnRpY2lwYW50c1xuICAgIGxldCByZWZOYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAoZm9yQ2hhdEJyb2FkY2FzdCkge1xuICAgICAgcmVmTmFtZXMgPSBbbWVtYmVyLCBob3N0XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvSG9zdCkge1xuICAgICAgICByZWZOYW1lcyA9IFtcbiAgICAgICAgICBtZW1iZXIsXG4gICAgICAgICAgY29Ib3N0LFxuICAgICAgICAgIGhvc3QsXG4gICAgICAgICAgLi4ucGFydGljaXBhbnRzXG4gICAgICAgICAgICAubWFwKChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSlcbiAgICAgICAgICAgIC5maWx0ZXIoKG5hbWUpOiBuYW1lIGlzIHN0cmluZyA9PiBuYW1lICE9PSB1bmRlZmluZWQpLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVmTmFtZXMgPSBbXG4gICAgICAgICAgbWVtYmVyLFxuICAgICAgICAgIGhvc3QsXG4gICAgICAgICAgLi4ucGFydGljaXBhbnRzXG4gICAgICAgICAgICAubWFwKChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSlcbiAgICAgICAgICAgIC5maWx0ZXIoKG5hbWUpOiBuYW1lIGlzIHN0cmluZyA9PiBuYW1lICE9PSB1bmRlZmluZWQpLFxuICAgICAgICBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiB1bmlxdWUgbmFtZXMgZm9yIHRoZSByZWZOYW1lc1xuICAgIHJlZk5hbWVzID0gWy4uLm5ldyBTZXQocmVmTmFtZXMpXTtcblxuICAgIC8vIEdlbmVyYXRlIG1lc3NhZ2VzXG4gICAgbGV0IHRpbWVJbmNyZW1lbnQgPSAwO1xuICAgIHJlZk5hbWVzLmZvckVhY2goKHNlbmRlcikgPT4ge1xuICAgICAgLy8gU2VuZCBkaXJlY3QgbWVzc2FnZXNcbiAgICAgIGNvbnN0IGRpcmVjdE1lc3NhZ2U6IE1lc3NhZ2UgPSB7XG4gICAgICAgIHNlbmRlcjogc2VuZGVyLFxuICAgICAgICByZWNlaXZlcnM6IFtnZXRSYW5kb21SZWNlaXZlcihzZW5kZXIpXSxcbiAgICAgICAgbWVzc2FnZTogYERpcmVjdCBtZXNzYWdlIGZyb20gJHtzZW5kZXJ9YCxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGltZUluY3JlbWVudCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgIGdyb3VwOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICAgIG1lc3NhZ2VzLnB1c2goZGlyZWN0TWVzc2FnZSk7XG5cbiAgICAgIC8vIFNlbmQgZ3JvdXAgbWVzc2FnZXNcbiAgICAgIGNvbnN0IGdyb3VwTWVzc2FnZTogTWVzc2FnZSA9IHtcbiAgICAgICAgc2VuZGVyOiBzZW5kZXIsXG4gICAgICAgIHJlY2VpdmVyczogcGFydGljaXBhbnRzXG4gICAgICAgICAgLm1hcCgocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50Lm5hbWUpXG4gICAgICAgICAgLmZpbHRlcigobmFtZSk6IG5hbWUgaXMgc3RyaW5nID0+IG5hbWUgIT09IHVuZGVmaW5lZCksXG4gICAgICAgIG1lc3NhZ2U6IGBHcm91cCBtZXNzYWdlIGZyb20gJHtzZW5kZXJ9YCxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGltZUluY3JlbWVudCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgIGdyb3VwOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VzLnB1c2goZ3JvdXBNZXNzYWdlKTtcblxuICAgICAgdGltZUluY3JlbWVudCArPSAxNTAwMDsgLy8gSW5jcmVtZW50IHRpbWUgYnkgMTUgc2Vjb25kcyBmb3IgZWFjaCBtZXNzYWdlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWVzc2FnZXM7XG4gIH1cbn1cbiJdfQ==