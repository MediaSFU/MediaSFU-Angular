import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service for receiving and processing messages, including handling group and direct messages, filtering banned senders, and updating message states.
 *
 * @class
 * @name ReceiveMessage
 * @description Manages incoming messages, appends them to the existing messages array, filters out banned senders, and updates message badge visibility as needed.
 *
 * @method
 * receiveMessage
 *
 * @param {ReceiveMessageOptions} options - Options for handling a received message:
 *   - `message` {Message}: The new message object to process.
 *   - `messages` {Message[]}: The current list of messages.
 *   - `participantsAll` {Participant[]}: All participants in the chat.
 *   - `member` {string}: The current member's name.
 *   - `eventType` {EventType}: The type of event (e.g., "broadcast" or "chat").
 *   - `islevel` {string}: The level of the current user.
 *   - `coHost` {string}: The name of the co-host.
 *   - `updateMessages` {Function}: A function to update the messages list.
 *   - `updateShowMessagesBadge` {Function}: A function to toggle the visibility of the message badge.
 *
 * @returns {Promise<void>} Resolves when the message processing and updates are complete.
 *
 * @example
 * const message = { sender: 'Alice', receivers: ['Bob'], message: 'Hello!', timestamp: Date.now(), group: false };
 * const options = {
 *   message,
 *   messages: [],
 *   participantsAll: [{ name: 'Alice' }, { name: 'Bob' }],
 *   member: 'Bob',
 *   eventType: 'chat',
 *   islevel: '1',
 *   coHost: 'Charlie',
 *   updateMessages: (updatedMessages) => console.log('Messages updated:', updatedMessages),
 *   updateShowMessagesBadge: (show) => console.log('Show badge:', show)
 * };
 * receiveMessageService.receiveMessage(options);
 */
export class ReceiveMessage {
    /**
     * Receives and processes a message, updating the messages array and handling
     * various message types and events.
     *
     * @param {ReceiveMessageOptions} options - The options for receiving the message.
     * @param {Object} options.message - The message object containing sender, receivers, content, timestamp, and group.
     * @param {Function} options.getUpdatedAllParams - Function to get updated parameters.
     * @param {Array} options.messages - Array of current messages.
     * @param {Array} options.participantsAll - Array of all participants.
     * @param {string} options.member - The current member.
     * @param {string} options.eventType - The type of event (e.g., "broadcast", "chat").
     * @param {string} options.islevel - The level of the current member.
     * @param {string} options.coHost - The co-host of the event.
     * @param {Function} options.updateMessages - Function to update the messages array.
     * @param {Function} options.updateShowMessagesBadge - Function to update the visibility of the messages badge.
     *
     * @returns {Promise<void>} A promise that resolves when the message has been processed.
     */
    receiveMessage = async ({ message, messages, participantsAll, member, eventType, islevel, coHost, updateMessages, updateShowMessagesBadge, }) => {
        // Add the received message to the messages array
        const { sender, receivers, message: content, timestamp, group } = message;
        let oldMessages = messages;
        messages = [...messages, { sender, receivers, message: content, timestamp, group }];
        // Filter out messages with banned senders in the participants array
        if (eventType !== 'broadcast' && eventType !== 'chat') {
            messages = messages.filter((message) => participantsAll.some((participant) => participant.name === message.sender && !participant.isBanned));
        }
        else {
            messages = messages.filter((message) => {
                const participant = participantsAll.find((participant) => participant.name === message.sender);
                return !participant || !participant.isBanned;
            });
        }
        updateMessages(messages);
        // Separate group and direct messages
        const oldGroupMessages = oldMessages.filter((message) => message.group);
        const oldDirectMessages = oldMessages.filter((message) => !message.group);
        // Render and update counts for group messages
        const groupMessages = messages.filter((message) => message.group);
        if (eventType !== 'broadcast' && eventType !== 'chat') {
            // Check if oldGroupMessages length is different from groupMessages length
            if (oldGroupMessages.length !== groupMessages.length) {
                // Identify new messages
                const newGroupMessages = groupMessages.filter((message) => !oldGroupMessages.some((oldMessage) => oldMessage.timestamp === message.timestamp));
                // Check if newGroupMessages sender is the member or receivers include the member
                const newGroupMessages2 = newGroupMessages.filter((message) => message.sender === member || message.receivers.includes(member));
                // Check if member is the sender of any newGroupMessages
                const newGroupMessages3 = newGroupMessages2.filter((message) => message.sender === member);
                // Check if member is the receiver of any newGroupMessages
                if (newGroupMessages.length > 0 && newGroupMessages.length !== newGroupMessages3.length) {
                    updateShowMessagesBadge(true);
                }
            }
        }
        // Render and update counts for direct messages
        const directMessages = messages.filter((message) => !message.group);
        if (eventType !== 'broadcast' && eventType !== 'chat') {
            // Check if oldDirectMessages length is different from directMessages length
            if (oldDirectMessages.length !== directMessages.length) {
                // Identify new direct messages
                const newDirectMessages = directMessages.filter((message) => !oldDirectMessages.some((oldMessage) => oldMessage.timestamp === message.timestamp));
                // Check if newDirectMessages sender is the member or receivers include the member
                const newDirectMessages2 = newDirectMessages.filter((message) => message.sender === member || message.receivers.includes(member));
                // Check if member is the sender of any newDirectMessages
                const newDirectMessages3 = newDirectMessages2.filter((message) => message.sender === member);
                if ((newDirectMessages.length > 0 && newDirectMessages2.length > 0) ||
                    (newDirectMessages.length > 0 && islevel === '2') ||
                    coHost === member) {
                    if (islevel === '2' || coHost === member) {
                        if (newDirectMessages.length !== newDirectMessages3.length) {
                            updateShowMessagesBadge(true);
                        }
                    }
                    else {
                        if (newDirectMessages2.length > 0 &&
                            newDirectMessages.length !== newDirectMessages3.length) {
                            updateShowMessagesBadge(true);
                        }
                    }
                }
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveMessage, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveMessage, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveMessage, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZWl2ZS1tZXNzYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcmVjZWl2ZS1tZXNzYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFrQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBTUgsTUFBTSxPQUFPLGNBQWM7SUFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBRUgsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUN0QixPQUFPLEVBQ1AsUUFBUSxFQUNSLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEVBQ04sY0FBYyxFQUNkLHVCQUF1QixHQUNELEVBQWlCLEVBQUU7UUFDekMsaURBQWlEO1FBQ2pELE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUMxRSxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDM0IsUUFBUSxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFcEYsb0VBQW9FO1FBQ3BFLElBQUksU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDdEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFnQixFQUFFLEVBQUUsQ0FDOUMsZUFBZSxDQUFDLElBQUksQ0FDbEIsQ0FBQyxXQUFnQixFQUFF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QUNILENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQXBJUyxjQUFjOzJHQUFkLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50VHlwZSwgTWVzc2FnZSwgUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VpdmVNZXNzYWdlT3B0aW9ucyB7XG4gIG1lc3NhZ2U6IE1lc3NhZ2U7XG4gIG1lc3NhZ2VzOiBNZXNzYWdlW107XG4gIHBhcnRpY2lwYW50c0FsbDogUGFydGljaXBhbnRbXTtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIGNvSG9zdDogc3RyaW5nO1xuICB1cGRhdGVNZXNzYWdlczogKG1lc3NhZ2VzOiBNZXNzYWdlW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlOiAoc2hvd0JhZGdlOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZWNlaXZlTWVzc2FnZVR5cGUgPSAob3B0aW9uczogUmVjZWl2ZU1lc3NhZ2VPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgZm9yIHJlY2VpdmluZyBhbmQgcHJvY2Vzc2luZyBtZXNzYWdlcywgaW5jbHVkaW5nIGhhbmRsaW5nIGdyb3VwIGFuZCBkaXJlY3QgbWVzc2FnZXMsIGZpbHRlcmluZyBiYW5uZWQgc2VuZGVycywgYW5kIHVwZGF0aW5nIG1lc3NhZ2Ugc3RhdGVzLlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgUmVjZWl2ZU1lc3NhZ2VcbiAqIEBkZXNjcmlwdGlvbiBNYW5hZ2VzIGluY29taW5nIG1lc3NhZ2VzLCBhcHBlbmRzIHRoZW0gdG8gdGhlIGV4aXN0aW5nIG1lc3NhZ2VzIGFycmF5LCBmaWx0ZXJzIG91dCBiYW5uZWQgc2VuZGVycywgYW5kIHVwZGF0ZXMgbWVzc2FnZSBiYWRnZSB2aXNpYmlsaXR5IGFzIG5lZWRlZC5cbiAqXG4gKiBAbWV0aG9kXG4gKiByZWNlaXZlTWVzc2FnZVxuICpcbiAqIEBwYXJhbSB7UmVjZWl2ZU1lc3NhZ2VPcHRpb25zfSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgaGFuZGxpbmcgYSByZWNlaXZlZCBtZXNzYWdlOlxuICogICAtIGBtZXNzYWdlYCB7TWVzc2FnZX06IFRoZSBuZXcgbWVzc2FnZSBvYmplY3QgdG8gcHJvY2Vzcy5cbiAqICAgLSBgbWVzc2FnZXNgIHtNZXNzYWdlW119OiBUaGUgY3VycmVudCBsaXN0IG9mIG1lc3NhZ2VzLlxuICogICAtIGBwYXJ0aWNpcGFudHNBbGxgIHtQYXJ0aWNpcGFudFtdfTogQWxsIHBhcnRpY2lwYW50cyBpbiB0aGUgY2hhdC5cbiAqICAgLSBgbWVtYmVyYCB7c3RyaW5nfTogVGhlIGN1cnJlbnQgbWVtYmVyJ3MgbmFtZS5cbiAqICAgLSBgZXZlbnRUeXBlYCB7RXZlbnRUeXBlfTogVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sIFwiYnJvYWRjYXN0XCIgb3IgXCJjaGF0XCIpLlxuICogICAtIGBpc2xldmVsYCB7c3RyaW5nfTogVGhlIGxldmVsIG9mIHRoZSBjdXJyZW50IHVzZXIuXG4gKiAgIC0gYGNvSG9zdGAge3N0cmluZ306IFRoZSBuYW1lIG9mIHRoZSBjby1ob3N0LlxuICogICAtIGB1cGRhdGVNZXNzYWdlc2Age0Z1bmN0aW9ufTogQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1lc3NhZ2VzIGxpc3QuXG4gKiAgIC0gYHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlYCB7RnVuY3Rpb259OiBBIGZ1bmN0aW9uIHRvIHRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWVzc2FnZSBiYWRnZS5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmVzb2x2ZXMgd2hlbiB0aGUgbWVzc2FnZSBwcm9jZXNzaW5nIGFuZCB1cGRhdGVzIGFyZSBjb21wbGV0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgbWVzc2FnZSA9IHsgc2VuZGVyOiAnQWxpY2UnLCByZWNlaXZlcnM6IFsnQm9iJ10sIG1lc3NhZ2U6ICdIZWxsbyEnLCB0aW1lc3RhbXA6IERhdGUubm93KCksIGdyb3VwOiBmYWxzZSB9O1xuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgbWVzc2FnZSxcbiAqICAgbWVzc2FnZXM6IFtdLFxuICogICBwYXJ0aWNpcGFudHNBbGw6IFt7IG5hbWU6ICdBbGljZScgfSwgeyBuYW1lOiAnQm9iJyB9XSxcbiAqICAgbWVtYmVyOiAnQm9iJyxcbiAqICAgZXZlbnRUeXBlOiAnY2hhdCcsXG4gKiAgIGlzbGV2ZWw6ICcxJyxcbiAqICAgY29Ib3N0OiAnQ2hhcmxpZScsXG4gKiAgIHVwZGF0ZU1lc3NhZ2VzOiAodXBkYXRlZE1lc3NhZ2VzKSA9PiBjb25zb2xlLmxvZygnTWVzc2FnZXMgdXBkYXRlZDonLCB1cGRhdGVkTWVzc2FnZXMpLFxuICogICB1cGRhdGVTaG93TWVzc2FnZXNCYWRnZTogKHNob3cpID0+IGNvbnNvbGUubG9nKCdTaG93IGJhZGdlOicsIHNob3cpXG4gKiB9O1xuICogcmVjZWl2ZU1lc3NhZ2VTZXJ2aWNlLnJlY2VpdmVNZXNzYWdlKG9wdGlvbnMpO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlY2VpdmVNZXNzYWdlIHtcbiAgLyoqXG4gICAqIFJlY2VpdmVzIGFuZCBwcm9jZXNzZXMgYSBtZXNzYWdlLCB1cGRhdGluZyB0aGUgbWVzc2FnZXMgYXJyYXkgYW5kIGhhbmRsaW5nXG4gICAqIHZhcmlvdXMgbWVzc2FnZSB0eXBlcyBhbmQgZXZlbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY2VpdmVNZXNzYWdlT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZWNlaXZpbmcgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLm1lc3NhZ2UgLSBUaGUgbWVzc2FnZSBvYmplY3QgY29udGFpbmluZyBzZW5kZXIsIHJlY2VpdmVycywgY29udGVudCwgdGltZXN0YW1wLCBhbmQgZ3JvdXAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubWVzc2FnZXMgLSBBcnJheSBvZiBjdXJyZW50IG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcnRpY2lwYW50c0FsbCAtIEFycmF5IG9mIGFsbCBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBjdXJyZW50IG1lbWJlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sIFwiYnJvYWRjYXN0XCIsIFwiY2hhdFwiKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgY3VycmVudCBtZW1iZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvSG9zdCAtIFRoZSBjby1ob3N0IG9mIHRoZSBldmVudC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVNZXNzYWdlcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWVzc2FnZXMgYXJyYXkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1lc3NhZ2VzIGJhZGdlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVzc2FnZSBoYXMgYmVlbiBwcm9jZXNzZWQuXG4gICAqL1xuXG4gIHJlY2VpdmVNZXNzYWdlID0gYXN5bmMgKHtcbiAgICBtZXNzYWdlLFxuICAgIG1lc3NhZ2VzLFxuICAgIHBhcnRpY2lwYW50c0FsbCxcbiAgICBtZW1iZXIsXG4gICAgZXZlbnRUeXBlLFxuICAgIGlzbGV2ZWwsXG4gICAgY29Ib3N0LFxuICAgIHVwZGF0ZU1lc3NhZ2VzLFxuICAgIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlLFxuICB9OiBSZWNlaXZlTWVzc2FnZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBBZGQgdGhlIHJlY2VpdmVkIG1lc3NhZ2UgdG8gdGhlIG1lc3NhZ2VzIGFycmF5XG4gICAgY29uc3QgeyBzZW5kZXIsIHJlY2VpdmVycywgbWVzc2FnZTogY29udGVudCwgdGltZXN0YW1wLCBncm91cCB9ID0gbWVzc2FnZTtcbiAgICBsZXQgb2xkTWVzc2FnZXMgPSBtZXNzYWdlcztcbiAgICBtZXNzYWdlcyA9IFsuLi5tZXNzYWdlcywgeyBzZW5kZXIsIHJlY2VpdmVycywgbWVzc2FnZTogY29udGVudCwgdGltZXN0YW1wLCBncm91cCB9XTtcblxuICAgIC8vIEZpbHRlciBvdXQgbWVzc2FnZXMgd2l0aCBiYW5uZWQgc2VuZGVycyBpbiB0aGUgcGFydGljaXBhbnRzIGFycmF5XG4gICAgaWYgKGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgJiYgZXZlbnRUeXBlICE9PSAnY2hhdCcpIHtcbiAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKChtZXNzYWdlOiBNZXNzYWdlKSA9PlxuICAgICAgICBwYXJ0aWNpcGFudHNBbGwuc29tZShcbiAgICAgICAgICAocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQubmFtZSA9PT0gbWVzc2FnZS5zZW5kZXIgJiYgIXBhcnRpY2lwYW50LmlzQmFubmVkLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlcy5maWx0ZXIoKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHNBbGwuZmluZChcbiAgICAgICAgICAocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQubmFtZSA9PT0gbWVzc2FnZS5zZW5kZXIsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAhcGFydGljaXBhbnQgfHwgIXBhcnRpY2lwYW50LmlzQmFubmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcblxuICAgIC8vIFNlcGFyYXRlIGdyb3VwIGFuZCBkaXJlY3QgbWVzc2FnZXNcbiAgICBjb25zdCBvbGRHcm91cE1lc3NhZ2VzID0gb2xkTWVzc2FnZXMuZmlsdGVyKChtZXNzYWdlOiBNZXNzYWdlKSA9PiBtZXNzYWdlLmdyb3VwKTtcbiAgICBjb25zdCBvbGREaXJlY3RNZXNzYWdlcyA9IG9sZE1lc3NhZ2VzLmZpbHRlcigobWVzc2FnZTogTWVzc2FnZSkgPT4gIW1lc3NhZ2UuZ3JvdXApO1xuXG4gICAgLy8gUmVuZGVyIGFuZCB1cGRhdGUgY291bnRzIGZvciBncm91cCBtZXNzYWdlc1xuICAgIGNvbnN0IGdyb3VwTWVzc2FnZXMgPSBtZXNzYWdlcy5maWx0ZXIoKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IG1lc3NhZ2UuZ3JvdXApO1xuXG4gICAgaWYgKGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgJiYgZXZlbnRUeXBlICE9PSAnY2hhdCcpIHtcbiAgICAgIC8vIENoZWNrIGlmIG9sZEdyb3VwTWVzc2FnZXMgbGVuZ3RoIGlzIGRpZmZlcmVudCBmcm9tIGdyb3VwTWVzc2FnZXMgbGVuZ3RoXG4gICAgICBpZiAob2xkR3JvdXBNZXNzYWdlcy5sZW5ndGggIT09IGdyb3VwTWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIElkZW50aWZ5IG5ldyBtZXNzYWdlc1xuICAgICAgICBjb25zdCBuZXdHcm91cE1lc3NhZ2VzID0gZ3JvdXBNZXNzYWdlcy5maWx0ZXIoXG4gICAgICAgICAgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+XG4gICAgICAgICAgICAhb2xkR3JvdXBNZXNzYWdlcy5zb21lKFxuICAgICAgICAgICAgICAob2xkTWVzc2FnZTogTWVzc2FnZSkgPT4gb2xkTWVzc2FnZS50aW1lc3RhbXAgPT09IG1lc3NhZ2UudGltZXN0YW1wLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDaGVjayBpZiBuZXdHcm91cE1lc3NhZ2VzIHNlbmRlciBpcyB0aGUgbWVtYmVyIG9yIHJlY2VpdmVycyBpbmNsdWRlIHRoZSBtZW1iZXJcbiAgICAgICAgY29uc3QgbmV3R3JvdXBNZXNzYWdlczIgPSBuZXdHcm91cE1lc3NhZ2VzLmZpbHRlcihcbiAgICAgICAgICAobWVzc2FnZTogTWVzc2FnZSkgPT4gbWVzc2FnZS5zZW5kZXIgPT09IG1lbWJlciB8fCBtZXNzYWdlLnJlY2VpdmVycy5pbmNsdWRlcyhtZW1iZXIpLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIG1lbWJlciBpcyB0aGUgc2VuZGVyIG9mIGFueSBuZXdHcm91cE1lc3NhZ2VzXG4gICAgICAgIGNvbnN0IG5ld0dyb3VwTWVzc2FnZXMzID0gbmV3R3JvdXBNZXNzYWdlczIuZmlsdGVyKFxuICAgICAgICAgIChtZXNzYWdlOiBNZXNzYWdlKSA9PiBtZXNzYWdlLnNlbmRlciA9PT0gbWVtYmVyLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIG1lbWJlciBpcyB0aGUgcmVjZWl2ZXIgb2YgYW55IG5ld0dyb3VwTWVzc2FnZXNcbiAgICAgICAgaWYgKG5ld0dyb3VwTWVzc2FnZXMubGVuZ3RoID4gMCAmJiBuZXdHcm91cE1lc3NhZ2VzLmxlbmd0aCAhPT0gbmV3R3JvdXBNZXNzYWdlczMubGVuZ3RoKSB7XG4gICAgICAgICAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgYW5kIHVwZGF0ZSBjb3VudHMgZm9yIGRpcmVjdCBtZXNzYWdlc1xuICAgIGNvbnN0IGRpcmVjdE1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKChtZXNzYWdlOiBNZXNzYWdlKSA9PiAhbWVzc2FnZS5ncm91cCk7XG5cbiAgICBpZiAoZXZlbnRUeXBlICE9PSAnYnJvYWRjYXN0JyAmJiBldmVudFR5cGUgIT09ICdjaGF0Jykge1xuICAgICAgLy8gQ2hlY2sgaWYgb2xkRGlyZWN0TWVzc2FnZXMgbGVuZ3RoIGlzIGRpZmZlcmVudCBmcm9tIGRpcmVjdE1lc3NhZ2VzIGxlbmd0aFxuICAgICAgaWYgKG9sZERpcmVjdE1lc3NhZ2VzLmxlbmd0aCAhPT0gZGlyZWN0TWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIElkZW50aWZ5IG5ldyBkaXJlY3QgbWVzc2FnZXNcbiAgICAgICAgY29uc3QgbmV3RGlyZWN0TWVzc2FnZXMgPSBkaXJlY3RNZXNzYWdlcy5maWx0ZXIoXG4gICAgICAgICAgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+XG4gICAgICAgICAgICAhb2xkRGlyZWN0TWVzc2FnZXMuc29tZShcbiAgICAgICAgICAgICAgKG9sZE1lc3NhZ2U6IE1lc3NhZ2UpID0+IG9sZE1lc3NhZ2UudGltZXN0YW1wID09PSBtZXNzYWdlLnRpbWVzdGFtcCxcbiAgICAgICAgICAgICksXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgbmV3RGlyZWN0TWVzc2FnZXMgc2VuZGVyIGlzIHRoZSBtZW1iZXIgb3IgcmVjZWl2ZXJzIGluY2x1ZGUgdGhlIG1lbWJlclxuICAgICAgICBjb25zdCBuZXdEaXJlY3RNZXNzYWdlczIgPSBuZXdEaXJlY3RNZXNzYWdlcy5maWx0ZXIoXG4gICAgICAgICAgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IG1lc3NhZ2Uuc2VuZGVyID09PSBtZW1iZXIgfHwgbWVzc2FnZS5yZWNlaXZlcnMuaW5jbHVkZXMobWVtYmVyKSxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDaGVjayBpZiBtZW1iZXIgaXMgdGhlIHNlbmRlciBvZiBhbnkgbmV3RGlyZWN0TWVzc2FnZXNcbiAgICAgICAgY29uc3QgbmV3RGlyZWN0TWVzc2FnZXMzID0gbmV3RGlyZWN0TWVzc2FnZXMyLmZpbHRlcihcbiAgICAgICAgICAobWVzc2FnZTogTWVzc2FnZSkgPT4gbWVzc2FnZS5zZW5kZXIgPT09IG1lbWJlcixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKG5ld0RpcmVjdE1lc3NhZ2VzLmxlbmd0aCA+IDAgJiYgbmV3RGlyZWN0TWVzc2FnZXMyLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgKG5ld0RpcmVjdE1lc3NhZ2VzLmxlbmd0aCA+IDAgJiYgaXNsZXZlbCA9PT0gJzInKSB8fFxuICAgICAgICAgIGNvSG9zdCA9PT0gbWVtYmVyXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChpc2xldmVsID09PSAnMicgfHwgY29Ib3N0ID09PSBtZW1iZXIpIHtcbiAgICAgICAgICAgIGlmIChuZXdEaXJlY3RNZXNzYWdlcy5sZW5ndGggIT09IG5ld0RpcmVjdE1lc3NhZ2VzMy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbmV3RGlyZWN0TWVzc2FnZXMyLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgbmV3RGlyZWN0TWVzc2FnZXMubGVuZ3RoICE9PSBuZXdEaXJlY3RNZXNzYWdlczMubGVuZ3RoXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19