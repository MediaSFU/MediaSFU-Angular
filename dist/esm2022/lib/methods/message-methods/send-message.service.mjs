import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Sends a message to the specified room.
 *
 * This method validates the message and its recipients, checks user permissions,
 * and then emits the message to the server via a socket connection. It also
 * handles alerting the user for any errors encountered during the process,
 * such as exceeding message limits or invalid input.
 *
 * @param {SendMessageOptions} options - The options for sending the message.
 * @param {string} options.member - The member sending the message.
 * @param {string} options.islevel - The level of the member.
 * @param {Function} options.showAlert - Function to show alert messages.
 * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
 * @param {string} options.coHost - The co-host of the room.
 * @param {string} options.chatSetting - Chat setting for the room.
 * @param {string} options.message - The message to be sent.
 * @param {string} options.roomName - The name of the room.
 * @param {number} options.messagesLength - The current number of messages in the room.
 * @param {Array} options.receivers - List of receivers for the message.
 * @param {boolean} options.group - Indicates if the message is for a group.
 * @param {string} options.sender - The sender of the message.
 * @param {Object} options.socket - The socket instance for emitting events.
 *
 * @returns {Promise<void>} A promise that resolves when the message is sent.
 *
 * @throws Will throw an error if the message count limit is exceeded.
 * @throws Will throw an error if the message, sender, or receivers are not valid.
 * @throws Will throw an error if the user is not allowed to send a message in the event room.
 *
 * @example
 * ```typescript
 * const sendMessageService = new SendMessage();
 * await sendMessageService.sendMessage({
 *   member: 'JohnDoe',
 *   islevel: '1',
 *   showAlert: (alert) => console.log(alert.message),
 *   coHostResponsibility: [],
 *   coHost: 'JaneDoe',
 *   chatSetting: 'allowed',
 *   message: 'Hello everyone!',
 *   roomName: 'Room1',
 *   messagesLength: 50,
 *   receivers: ['user1', 'user2'],
 *   group: true,
 *   sender: 'JohnDoe',
 *   socket: socketInstance,
 * });
 * ```
 */
export class SendMessage {
    /**
     * Sends a message to the specified room.
     *
     * @param {Object} options - The options for sending the message.
     * @param {string} options.member - The member sending the message.
     * @param {string} options.islevel - The level of the member.
     * @param {Function} options.showAlert - Function to show alert messages.
     * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
     * @param {string} options.coHost - The co-host of the room.
     * @param {boolean} options.chatSetting - Chat setting for the room.
     * @param {string} options.message - The message to be sent.
     * @param {string} options.roomName - The name of the room.
     * @param {number} options.messagesLength - The current number of messages in the room.
     * @param {Array} options.receivers - List of receivers for the message.
     * @param {boolean} options.group - Indicates if the message is for a group.
     * @param {string} options.sender - The sender of the message.
     * @param {Object} options.socket - The socket instance for communication.
     *
     * @returns {Promise<void>} A promise that resolves when the message is sent.
     *
     * @throws Will throw an error if the message count limit is exceeded.
     * @throws Will throw an error if the message, sender, or receivers are not valid.
     * @throws Will throw an error if the user is not allowed to send a message in the event room.
     */
    async sendMessage({ member, islevel, showAlert, coHostResponsibility, coHost, chatSetting, message, roomName, messagesLength, receivers, group, sender, socket, }) {
        let chatValue = false;
        // Check message count limit based on the room type
        if ((messagesLength > 100 && roomName.startsWith('d')) ||
            (messagesLength > 500 && roomName.startsWith('s')) ||
            (messagesLength > 100000 && roomName.startsWith('p'))) {
            showAlert?.({
                message: 'You have reached the maximum number of messages allowed.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        // Validate message, sender, and receivers
        if (!message || !receivers || (!member && !sender)) {
            showAlert?.({
                message: 'Message is not valid.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        // Create the message object
        const messageObject = {
            sender: sender ? sender : member,
            receivers: receivers,
            message: message,
            timestamp: new Date().toLocaleTimeString(),
            group: group !== undefined && group !== null ? group : false,
        };
        try {
            // Check co-host responsibility for chat
            chatValue = coHostResponsibility.find((item) => item.name === 'chat')?.value ?? false;
        }
        catch (error) {
            console.error(error);
        }
        if (islevel === '2' || (coHost === member && chatValue === true)) {
            // Allow sending message
        }
        else {
            // Check if user is allowed to send a message in the event room
            if (!chatSetting) {
                showAlert?.({
                    message: 'You are not allowed to send a message in this event room',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        // Send the message to the server
        socket.emit('sendMessage', {
            messageObject: messageObject,
            roomName: roomName,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SendMessage, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SendMessage, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SendMessage, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1tZXNzYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9tZXNzYWdlLW1ldGhvZHMvc2VuZC1tZXNzYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF1QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnREc7QUFLSCxNQUFNLE9BQU8sV0FBVztJQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFFSCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQ2hCLE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNULG9CQUFvQixFQUNwQixNQUFNLEVBQ04sV0FBVyxFQUNYLE9BQU8sRUFDUCxRQUFRLEVBQ1IsY0FBYyxFQUNkLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sR0FDYTtRQUNuQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsbURBQW1EO1FBQ25ELElBQ0UsQ0FBQyxjQUFjLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxjQUFjLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxjQUFjLEdBQUcsTUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDckQsQ0FBQztZQUNELFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSwwREFBMEQ7Z0JBQ25FLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsT0FBTztRQUNULENBQUM7UUFFRCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNuRCxTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsNEJBQTRCO1FBQzVCLE1BQU0sYUFBYSxHQUFZO1lBQzdCLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNoQyxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQyxLQUFLLEVBQUUsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDN0QsQ0FBQztRQUVGLElBQUksQ0FBQztZQUNILHdDQUF3QztZQUN4QyxTQUFTLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDeEYsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxJQUFJLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pFLHdCQUF3QjtRQUMxQixDQUFDO2FBQU0sQ0FBQztZQUNOLCtEQUErRDtZQUMvRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2pCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSwwREFBMEQ7b0JBQ25FLElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxPQUFPO1lBQ1QsQ0FBQztRQUNILENBQUM7UUFFRCxpQ0FBaUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDekIsYUFBYSxFQUFFLGFBQWE7WUFDNUIsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt1R0F0R1UsV0FBVzsyR0FBWCxXQUFXLGNBRlYsTUFBTTs7MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IENvSG9zdFJlc3BvbnNpYmlsaXR5LCBNZXNzYWdlLCBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlbmRNZXNzYWdlT3B0aW9ucyB7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIGNvSG9zdDogc3RyaW5nO1xuICBjaGF0U2V0dGluZzogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIG1lc3NhZ2VzTGVuZ3RoOiBudW1iZXI7XG4gIHJlY2VpdmVyczogc3RyaW5nW107XG4gIGdyb3VwOiBib29sZWFuO1xuICBzZW5kZXI6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFNlbmRNZXNzYWdlVHlwZSA9IChvcHRpb25zOiBTZW5kTWVzc2FnZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgcm9vbS5cbiAqXG4gKiBUaGlzIG1ldGhvZCB2YWxpZGF0ZXMgdGhlIG1lc3NhZ2UgYW5kIGl0cyByZWNpcGllbnRzLCBjaGVja3MgdXNlciBwZXJtaXNzaW9ucyxcbiAqIGFuZCB0aGVuIGVtaXRzIHRoZSBtZXNzYWdlIHRvIHRoZSBzZXJ2ZXIgdmlhIGEgc29ja2V0IGNvbm5lY3Rpb24uIEl0IGFsc29cbiAqIGhhbmRsZXMgYWxlcnRpbmcgdGhlIHVzZXIgZm9yIGFueSBlcnJvcnMgZW5jb3VudGVyZWQgZHVyaW5nIHRoZSBwcm9jZXNzLFxuICogc3VjaCBhcyBleGNlZWRpbmcgbWVzc2FnZSBsaW1pdHMgb3IgaW52YWxpZCBpbnB1dC5cbiAqXG4gKiBAcGFyYW0ge1NlbmRNZXNzYWdlT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gVGhlIG1lbWJlciBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgbWVtYmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jb0hvc3RSZXNwb25zaWJpbGl0eSAtIExpc3Qgb2YgY28taG9zdCByZXNwb25zaWJpbGl0aWVzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29Ib3N0IC0gVGhlIGNvLWhvc3Qgb2YgdGhlIHJvb20uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jaGF0U2V0dGluZyAtIENoYXQgc2V0dGluZyBmb3IgdGhlIHJvb20uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZXNzYWdlIC0gVGhlIG1lc3NhZ2UgdG8gYmUgc2VudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5tZXNzYWdlc0xlbmd0aCAtIFRoZSBjdXJyZW50IG51bWJlciBvZiBtZXNzYWdlcyBpbiB0aGUgcm9vbS5cbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucmVjZWl2ZXJzIC0gTGlzdCBvZiByZWNlaXZlcnMgZm9yIHRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmdyb3VwIC0gSW5kaWNhdGVzIGlmIHRoZSBtZXNzYWdlIGlzIGZvciBhIGdyb3VwLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2VuZGVyIC0gVGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGVtaXR0aW5nIGV2ZW50cy5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVzc2FnZSBpcyBzZW50LlxuICpcbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgbWVzc2FnZSBjb3VudCBsaW1pdCBpcyBleGNlZWRlZC5cbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgbWVzc2FnZSwgc2VuZGVyLCBvciByZWNlaXZlcnMgYXJlIG5vdCB2YWxpZC5cbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdXNlciBpcyBub3QgYWxsb3dlZCB0byBzZW5kIGEgbWVzc2FnZSBpbiB0aGUgZXZlbnQgcm9vbS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgc2VuZE1lc3NhZ2VTZXJ2aWNlID0gbmV3IFNlbmRNZXNzYWdlKCk7XG4gKiBhd2FpdCBzZW5kTWVzc2FnZVNlcnZpY2Uuc2VuZE1lc3NhZ2Uoe1xuICogICBtZW1iZXI6ICdKb2huRG9lJyxcbiAqICAgaXNsZXZlbDogJzEnLFxuICogICBzaG93QWxlcnQ6IChhbGVydCkgPT4gY29uc29sZS5sb2coYWxlcnQubWVzc2FnZSksXG4gKiAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBbXSxcbiAqICAgY29Ib3N0OiAnSmFuZURvZScsXG4gKiAgIGNoYXRTZXR0aW5nOiAnYWxsb3dlZCcsXG4gKiAgIG1lc3NhZ2U6ICdIZWxsbyBldmVyeW9uZSEnLFxuICogICByb29tTmFtZTogJ1Jvb20xJyxcbiAqICAgbWVzc2FnZXNMZW5ndGg6IDUwLFxuICogICByZWNlaXZlcnM6IFsndXNlcjEnLCAndXNlcjInXSxcbiAqICAgZ3JvdXA6IHRydWUsXG4gKiAgIHNlbmRlcjogJ0pvaG5Eb2UnLFxuICogICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VuZE1lc3NhZ2Uge1xuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgcm9vbS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gVGhlIG1lbWJlciBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSBtZW1iZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jb0hvc3RSZXNwb25zaWJpbGl0eSAtIExpc3Qgb2YgY28taG9zdCByZXNwb25zaWJpbGl0aWVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb0hvc3QgLSBUaGUgY28taG9zdCBvZiB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmNoYXRTZXR0aW5nIC0gQ2hhdCBzZXR0aW5nIGZvciB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIGJlIHNlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm1lc3NhZ2VzTGVuZ3RoIC0gVGhlIGN1cnJlbnQgbnVtYmVyIG9mIG1lc3NhZ2VzIGluIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnJlY2VpdmVycyAtIExpc3Qgb2YgcmVjZWl2ZXJzIGZvciB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmdyb3VwIC0gSW5kaWNhdGVzIGlmIHRoZSBtZXNzYWdlIGlzIGZvciBhIGdyb3VwLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5zZW5kZXIgLSBUaGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVzc2FnZSBpcyBzZW50LlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIG1lc3NhZ2UgY291bnQgbGltaXQgaXMgZXhjZWVkZWQuXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgbWVzc2FnZSwgc2VuZGVyLCBvciByZWNlaXZlcnMgYXJlIG5vdCB2YWxpZC5cbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSB1c2VyIGlzIG5vdCBhbGxvd2VkIHRvIHNlbmQgYSBtZXNzYWdlIGluIHRoZSBldmVudCByb29tLlxuICAgKi9cblxuICBhc3luYyBzZW5kTWVzc2FnZSh7XG4gICAgbWVtYmVyLFxuICAgIGlzbGV2ZWwsXG4gICAgc2hvd0FsZXJ0LFxuICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgIGNvSG9zdCxcbiAgICBjaGF0U2V0dGluZyxcbiAgICBtZXNzYWdlLFxuICAgIHJvb21OYW1lLFxuICAgIG1lc3NhZ2VzTGVuZ3RoLFxuICAgIHJlY2VpdmVycyxcbiAgICBncm91cCxcbiAgICBzZW5kZXIsXG4gICAgc29ja2V0LFxuICB9OiBTZW5kTWVzc2FnZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgY2hhdFZhbHVlID0gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBtZXNzYWdlIGNvdW50IGxpbWl0IGJhc2VkIG9uIHRoZSByb29tIHR5cGVcbiAgICBpZiAoXG4gICAgICAobWVzc2FnZXNMZW5ndGggPiAxMDAgJiYgcm9vbU5hbWUuc3RhcnRzV2l0aCgnZCcpKSB8fFxuICAgICAgKG1lc3NhZ2VzTGVuZ3RoID4gNTAwICYmIHJvb21OYW1lLnN0YXJ0c1dpdGgoJ3MnKSkgfHxcbiAgICAgIChtZXNzYWdlc0xlbmd0aCA+IDEwMDAwMCAmJiByb29tTmFtZS5zdGFydHNXaXRoKCdwJykpXG4gICAgKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIG51bWJlciBvZiBtZXNzYWdlcyBhbGxvd2VkLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIG1lc3NhZ2UsIHNlbmRlciwgYW5kIHJlY2VpdmVyc1xuICAgIGlmICghbWVzc2FnZSB8fCAhcmVjZWl2ZXJzIHx8ICghbWVtYmVyICYmICFzZW5kZXIpKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdNZXNzYWdlIGlzIG5vdCB2YWxpZC4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIG1lc3NhZ2Ugb2JqZWN0XG4gICAgY29uc3QgbWVzc2FnZU9iamVjdDogTWVzc2FnZSA9IHtcbiAgICAgIHNlbmRlcjogc2VuZGVyID8gc2VuZGVyIDogbWVtYmVyLFxuICAgICAgcmVjZWl2ZXJzOiByZWNlaXZlcnMsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgZ3JvdXA6IGdyb3VwICE9PSB1bmRlZmluZWQgJiYgZ3JvdXAgIT09IG51bGwgPyBncm91cCA6IGZhbHNlLFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgLy8gQ2hlY2sgY28taG9zdCByZXNwb25zaWJpbGl0eSBmb3IgY2hhdFxuICAgICAgY2hhdFZhbHVlID0gY29Ib3N0UmVzcG9uc2liaWxpdHkuZmluZCgoaXRlbSkgPT4gaXRlbS5uYW1lID09PSAnY2hhdCcpPy52YWx1ZSA/PyBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKGlzbGV2ZWwgPT09ICcyJyB8fCAoY29Ib3N0ID09PSBtZW1iZXIgJiYgY2hhdFZhbHVlID09PSB0cnVlKSkge1xuICAgICAgLy8gQWxsb3cgc2VuZGluZyBtZXNzYWdlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENoZWNrIGlmIHVzZXIgaXMgYWxsb3dlZCB0byBzZW5kIGEgbWVzc2FnZSBpbiB0aGUgZXZlbnQgcm9vbVxuICAgICAgaWYgKCFjaGF0U2V0dGluZykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gc2VuZCBhIG1lc3NhZ2UgaW4gdGhpcyBldmVudCByb29tJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSBtZXNzYWdlIHRvIHRoZSBzZXJ2ZXJcbiAgICBzb2NrZXQuZW1pdCgnc2VuZE1lc3NhZ2UnLCB7XG4gICAgICBtZXNzYWdlT2JqZWN0OiBtZXNzYWdlT2JqZWN0LFxuICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLFxuICAgIH0pO1xuICB9XG59XG4iXX0=