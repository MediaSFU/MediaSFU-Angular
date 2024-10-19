import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1tZXNzYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9tZXNzYWdlLW1ldGhvZHMvc2VuZC1tZXNzYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEwQjNDLE1BQU0sT0FBTyxXQUFXO0lBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUVILEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDaEIsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1Qsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixXQUFXLEVBQ1gsT0FBTyxFQUNQLFFBQVEsRUFDUixjQUFjLEVBQ2QsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxHQUNhO1FBQ25CLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixtREFBbUQ7UUFDbkQsSUFDRSxDQUFDLGNBQWMsR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxDQUFDLGNBQWMsR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxDQUFDLGNBQWMsR0FBRyxNQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNyRCxDQUFDO1lBQ0QsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLDBEQUEwRDtnQkFDbkUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFDSCxPQUFPO1FBQ1QsQ0FBQztRQUVELDBDQUEwQztRQUMxQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ25ELFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsT0FBTztRQUNULENBQUM7UUFFRCw0QkFBNEI7UUFDNUIsTUFBTSxhQUFhLEdBQVk7WUFDN0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ2hDLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFFO1lBQzFDLEtBQUssRUFBRSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSztTQUM3RCxDQUFDO1FBRUYsSUFBSSxDQUFDO1lBQ0gsd0NBQXdDO1lBQ3hDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUN4RixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUVELElBQUksT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakUsd0JBQXdCO1FBQzFCLENBQUM7YUFBTSxDQUFDO1lBQ04sK0RBQStEO1lBQy9ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDakIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLDBEQUEwRDtvQkFDbkUsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUNILE9BQU87WUFDVCxDQUFDO1FBQ0gsQ0FBQztRQUVELGlDQUFpQztRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN6QixhQUFhLEVBQUUsYUFBYTtZQUM1QixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO3VHQXRHVSxXQUFXOzJHQUFYLFdBQVcsY0FGVixNQUFNOzsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgQ29Ib3N0UmVzcG9uc2liaWxpdHksIE1lc3NhZ2UsIFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VuZE1lc3NhZ2VPcHRpb25zIHtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIGNoYXRTZXR0aW5nOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgbWVzc2FnZXNMZW5ndGg6IG51bWJlcjtcbiAgcmVjZWl2ZXJzOiBzdHJpbmdbXTtcbiAgZ3JvdXA6IGJvb2xlYW47XG4gIHNlbmRlcjogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU2VuZE1lc3NhZ2VUeXBlID0gKG9wdGlvbnM6IFNlbmRNZXNzYWdlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlbmRNZXNzYWdlIHtcbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIHJvb20uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHNlbmRpbmcgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgbWVtYmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYWxlcnQgbWVzc2FnZXMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY29Ib3N0UmVzcG9uc2liaWxpdHkgLSBMaXN0IG9mIGNvLWhvc3QgcmVzcG9uc2liaWxpdGllcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29Ib3N0IC0gVGhlIGNvLWhvc3Qgb2YgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jaGF0U2V0dGluZyAtIENoYXQgc2V0dGluZyBmb3IgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBiZSBzZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5tZXNzYWdlc0xlbmd0aCAtIFRoZSBjdXJyZW50IG51bWJlciBvZiBtZXNzYWdlcyBpbiB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5yZWNlaXZlcnMgLSBMaXN0IG9mIHJlY2VpdmVycyBmb3IgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5ncm91cCAtIEluZGljYXRlcyBpZiB0aGUgbWVzc2FnZSBpcyBmb3IgYSBncm91cC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2VuZGVyIC0gVGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lc3NhZ2UgaXMgc2VudC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBtZXNzYWdlIGNvdW50IGxpbWl0IGlzIGV4Y2VlZGVkLlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIG1lc3NhZ2UsIHNlbmRlciwgb3IgcmVjZWl2ZXJzIGFyZSBub3QgdmFsaWQuXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdXNlciBpcyBub3QgYWxsb3dlZCB0byBzZW5kIGEgbWVzc2FnZSBpbiB0aGUgZXZlbnQgcm9vbS5cbiAgICovXG5cbiAgYXN5bmMgc2VuZE1lc3NhZ2Uoe1xuICAgIG1lbWJlcixcbiAgICBpc2xldmVsLFxuICAgIHNob3dBbGVydCxcbiAgICBjb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICBjb0hvc3QsXG4gICAgY2hhdFNldHRpbmcsXG4gICAgbWVzc2FnZSxcbiAgICByb29tTmFtZSxcbiAgICBtZXNzYWdlc0xlbmd0aCxcbiAgICByZWNlaXZlcnMsXG4gICAgZ3JvdXAsXG4gICAgc2VuZGVyLFxuICAgIHNvY2tldCxcbiAgfTogU2VuZE1lc3NhZ2VPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IGNoYXRWYWx1ZSA9IGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgbWVzc2FnZSBjb3VudCBsaW1pdCBiYXNlZCBvbiB0aGUgcm9vbSB0eXBlXG4gICAgaWYgKFxuICAgICAgKG1lc3NhZ2VzTGVuZ3RoID4gMTAwICYmIHJvb21OYW1lLnN0YXJ0c1dpdGgoJ2QnKSkgfHxcbiAgICAgIChtZXNzYWdlc0xlbmd0aCA+IDUwMCAmJiByb29tTmFtZS5zdGFydHNXaXRoKCdzJykpIHx8XG4gICAgICAobWVzc2FnZXNMZW5ndGggPiAxMDAwMDAgJiYgcm9vbU5hbWUuc3RhcnRzV2l0aCgncCcpKVxuICAgICkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBudW1iZXIgb2YgbWVzc2FnZXMgYWxsb3dlZC4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBtZXNzYWdlLCBzZW5kZXIsIGFuZCByZWNlaXZlcnNcbiAgICBpZiAoIW1lc3NhZ2UgfHwgIXJlY2VpdmVycyB8fCAoIW1lbWJlciAmJiAhc2VuZGVyKSkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnTWVzc2FnZSBpcyBub3QgdmFsaWQuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBtZXNzYWdlIG9iamVjdFxuICAgIGNvbnN0IG1lc3NhZ2VPYmplY3Q6IE1lc3NhZ2UgPSB7XG4gICAgICBzZW5kZXI6IHNlbmRlciA/IHNlbmRlciA6IG1lbWJlcixcbiAgICAgIHJlY2VpdmVyczogcmVjZWl2ZXJzLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgIGdyb3VwOiBncm91cCAhPT0gdW5kZWZpbmVkICYmIGdyb3VwICE9PSBudWxsID8gZ3JvdXAgOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIENoZWNrIGNvLWhvc3QgcmVzcG9uc2liaWxpdHkgZm9yIGNoYXRcbiAgICAgIGNoYXRWYWx1ZSA9IGNvSG9zdFJlc3BvbnNpYmlsaXR5LmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gJ2NoYXQnKT8udmFsdWUgPz8gZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChpc2xldmVsID09PSAnMicgfHwgKGNvSG9zdCA9PT0gbWVtYmVyICYmIGNoYXRWYWx1ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgIC8vIEFsbG93IHNlbmRpbmcgbWVzc2FnZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDaGVjayBpZiB1c2VyIGlzIGFsbG93ZWQgdG8gc2VuZCBhIG1lc3NhZ2UgaW4gdGhlIGV2ZW50IHJvb21cbiAgICAgIGlmICghY2hhdFNldHRpbmcpIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHNlbmQgYSBtZXNzYWdlIGluIHRoaXMgZXZlbnQgcm9vbScsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgbWVzc2FnZSB0byB0aGUgc2VydmVyXG4gICAgc29ja2V0LmVtaXQoJ3NlbmRNZXNzYWdlJywge1xuICAgICAgbWVzc2FnZU9iamVjdDogbWVzc2FnZU9iamVjdCxcbiAgICAgIHJvb21OYW1lOiByb29tTmFtZSxcbiAgICB9KTtcbiAgfVxufVxuIl19