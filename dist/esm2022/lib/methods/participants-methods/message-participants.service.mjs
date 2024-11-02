import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Sends a direct message to a participant if certain conditions are met.
 *
 * This method checks the current user's level and their co-host responsibilities
 * to determine if they are allowed to send a direct message to a specified participant.
 * If the user has the appropriate permissions, the method updates the direct message
 * details and opens the messages modal. If the user is not allowed to send the message,
 * an alert is displayed.
 *
 * @param {MessageParticipantsOptions} options - The options for sending a message to a participant.
 * @param {CoHostResponsibility[]} options.coHostResponsibility - Array of responsibilities assigned to the co-host.
 * @param {Participant} options.participant - The participant to whom the message is to be sent.
 * @param {string} options.member - The current member attempting to send the message.
 * @param {string} options.islevel - The level of the current member.
 * @param {Function} [options.showAlert] - Function to show an alert message if the message cannot be sent.
 * @param {string} options.coHost - The co-host member.
 * @param {Function} options.updateIsMessagesModalVisible - Function to update the visibility of the messages modal.
 * @param {Function} options.updateDirectMessageDetails - Function to update the details of the direct message.
 * @param {Function} options.updateStartDirectMessage - Function to start the direct message.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const messageService = new MessageParticipants();
 * messageService.messageParticipants({
 *   coHostResponsibility: [{ name: 'chat', value: true }],
 *   participant: { name: 'John', islevel: '1' },
 *   member: 'Alice',
 *   islevel: '1',
 *   showAlert: ({ message, type, duration }) => {
 *     console.log(`Alert: ${message} - Type: ${type} - Duration: ${duration}`);
 *   },
 *   coHost: 'Bob',
 *   updateIsMessagesModalVisible: (isVisible) => {
 *     console.log(`Messages modal is now ${isVisible ? 'visible' : 'hidden'}`);
 *   },
 *   updateDirectMessageDetails: (participant) => {
 *     console.log(`Direct messaging: ${participant.name}`);
 *   },
 *   updateStartDirectMessage: (start) => {
 *     console.log(`Direct messaging started: ${start}`);
 *   },
 * });
 * ```
 */
export class MessageParticipants {
    /**
     * Sends a direct message to a participant if certain conditions are met.
     *s
     * @param coHostResponsibility - Array of responsibilities assigned to the co-host.
     * @param participant - The participant to whom the message is to be sent.
     * @param member - The current member attempting to send the message.
     * @param islevel - The level of the current member.
     * @param showAlert - Function to show an alert message.
     * @param coHost - The co-host member.
     * @param updateIsMessagesModalVisible - Function to update the visibility of the messages modal.
     * @param updateDirectMessageDetails - Function to update the details of the direct message.
     * @param updateStartDirectMessage - Function to start the direct message.
     *
     * @returns void
     */
    messageParticipants({ coHostResponsibility, participant, member, islevel, showAlert, coHost, updateIsMessagesModalVisible, updateDirectMessageDetails, updateStartDirectMessage, }) {
        let chatValue = false;
        try {
            chatValue = coHostResponsibility.find((item) => item.name === 'chat')?.value ?? false;
        }
        catch (error) {
            console.error(error);
        }
        if (islevel === '2' || (coHost === member && chatValue === true)) {
            if (participant.islevel !== '2') {
                updateDirectMessageDetails(participant);
                updateStartDirectMessage(true);
                updateIsMessagesModalVisible(true);
            }
        }
        else {
            showAlert?.({
                message: 'You are not allowed to send this message',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessageParticipants, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessageParticipants, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessageParticipants, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1wYXJ0aWNpcGFudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL21lc3NhZ2UtcGFydGljaXBhbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFpQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q0c7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsbUJBQW1CLENBQUMsRUFDbEIsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDVCxNQUFNLEVBQ04sNEJBQTRCLEVBQzVCLDBCQUEwQixFQUMxQix3QkFBd0IsR0FDRztRQUMzQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxDQUFDO1lBQ0gsU0FBUyxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDO1FBQ3hGLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBSSxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqRSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN4Qyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLDBDQUEwQztnQkFDbkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFFSCxPQUFPO1FBQ1QsQ0FBQztJQUNILENBQUM7dUdBbERVLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCwgQ29Ib3N0UmVzcG9uc2liaWxpdHksIFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VQYXJ0aWNpcGFudHNPcHRpb25zIHtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudDtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBjb0hvc3Q6IHN0cmluZztcbiAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHM6IChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2U6IChzdGFydDogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTWVzc2FnZVBhcnRpY2lwYW50c1R5cGUgPSAob3B0aW9uczogTWVzc2FnZVBhcnRpY2lwYW50c09wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogU2VuZHMgYSBkaXJlY3QgbWVzc2FnZSB0byBhIHBhcnRpY2lwYW50IGlmIGNlcnRhaW4gY29uZGl0aW9ucyBhcmUgbWV0LlxuICpcbiAqIFRoaXMgbWV0aG9kIGNoZWNrcyB0aGUgY3VycmVudCB1c2VyJ3MgbGV2ZWwgYW5kIHRoZWlyIGNvLWhvc3QgcmVzcG9uc2liaWxpdGllc1xuICogdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGFsbG93ZWQgdG8gc2VuZCBhIGRpcmVjdCBtZXNzYWdlIHRvIGEgc3BlY2lmaWVkIHBhcnRpY2lwYW50LlxuICogSWYgdGhlIHVzZXIgaGFzIHRoZSBhcHByb3ByaWF0ZSBwZXJtaXNzaW9ucywgdGhlIG1ldGhvZCB1cGRhdGVzIHRoZSBkaXJlY3QgbWVzc2FnZVxuICogZGV0YWlscyBhbmQgb3BlbnMgdGhlIG1lc3NhZ2VzIG1vZGFsLiBJZiB0aGUgdXNlciBpcyBub3QgYWxsb3dlZCB0byBzZW5kIHRoZSBtZXNzYWdlLFxuICogYW4gYWxlcnQgaXMgZGlzcGxheWVkLlxuICpcbiAqIEBwYXJhbSB7TWVzc2FnZVBhcnRpY2lwYW50c09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc2VuZGluZyBhIG1lc3NhZ2UgdG8gYSBwYXJ0aWNpcGFudC5cbiAqIEBwYXJhbSB7Q29Ib3N0UmVzcG9uc2liaWxpdHlbXX0gb3B0aW9ucy5jb0hvc3RSZXNwb25zaWJpbGl0eSAtIEFycmF5IG9mIHJlc3BvbnNpYmlsaXRpZXMgYXNzaWduZWQgdG8gdGhlIGNvLWhvc3QuXG4gKiBAcGFyYW0ge1BhcnRpY2lwYW50fSBvcHRpb25zLnBhcnRpY2lwYW50IC0gVGhlIHBhcnRpY2lwYW50IHRvIHdob20gdGhlIG1lc3NhZ2UgaXMgdG8gYmUgc2VudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBjdXJyZW50IG1lbWJlciBhdHRlbXB0aW5nIHRvIHNlbmQgdGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSBjdXJyZW50IG1lbWJlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnNob3dBbGVydF0gLSBGdW5jdGlvbiB0byBzaG93IGFuIGFsZXJ0IG1lc3NhZ2UgaWYgdGhlIG1lc3NhZ2UgY2Fubm90IGJlIHNlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb0hvc3QgLSBUaGUgY28taG9zdCBtZW1iZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZGV0YWlscyBvZiB0aGUgZGlyZWN0IG1lc3NhZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSAtIEZ1bmN0aW9uIHRvIHN0YXJ0IHRoZSBkaXJlY3QgbWVzc2FnZS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgbWVzc2FnZVNlcnZpY2UgPSBuZXcgTWVzc2FnZVBhcnRpY2lwYW50cygpO1xuICogbWVzc2FnZVNlcnZpY2UubWVzc2FnZVBhcnRpY2lwYW50cyh7XG4gKiAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBbeyBuYW1lOiAnY2hhdCcsIHZhbHVlOiB0cnVlIH1dLFxuICogICBwYXJ0aWNpcGFudDogeyBuYW1lOiAnSm9obicsIGlzbGV2ZWw6ICcxJyB9LFxuICogICBtZW1iZXI6ICdBbGljZScsXG4gKiAgIGlzbGV2ZWw6ICcxJyxcbiAqICAgc2hvd0FsZXJ0OiAoeyBtZXNzYWdlLCB0eXBlLCBkdXJhdGlvbiB9KSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coYEFsZXJ0OiAke21lc3NhZ2V9IC0gVHlwZTogJHt0eXBlfSAtIER1cmF0aW9uOiAke2R1cmF0aW9ufWApO1xuICogICB9LFxuICogICBjb0hvc3Q6ICdCb2InLFxuICogICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coYE1lc3NhZ2VzIG1vZGFsIGlzIG5vdyAke2lzVmlzaWJsZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nfWApO1xuICogICB9LFxuICogICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogKHBhcnRpY2lwYW50KSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coYERpcmVjdCBtZXNzYWdpbmc6ICR7cGFydGljaXBhbnQubmFtZX1gKTtcbiAqICAgfSxcbiAqICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiAoc3RhcnQpID0+IHtcbiAqICAgICBjb25zb2xlLmxvZyhgRGlyZWN0IG1lc3NhZ2luZyBzdGFydGVkOiAke3N0YXJ0fWApO1xuICogICB9LFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlUGFydGljaXBhbnRzIHtcbiAgLyoqXG4gICAqIFNlbmRzIGEgZGlyZWN0IG1lc3NhZ2UgdG8gYSBwYXJ0aWNpcGFudCBpZiBjZXJ0YWluIGNvbmRpdGlvbnMgYXJlIG1ldC5cbiAgICpzXG4gICAqIEBwYXJhbSBjb0hvc3RSZXNwb25zaWJpbGl0eSAtIEFycmF5IG9mIHJlc3BvbnNpYmlsaXRpZXMgYXNzaWduZWQgdG8gdGhlIGNvLWhvc3QuXG4gICAqIEBwYXJhbSBwYXJ0aWNpcGFudCAtIFRoZSBwYXJ0aWNpcGFudCB0byB3aG9tIHRoZSBtZXNzYWdlIGlzIHRvIGJlIHNlbnQuXG4gICAqIEBwYXJhbSBtZW1iZXIgLSBUaGUgY3VycmVudCBtZW1iZXIgYXR0ZW1wdGluZyB0byBzZW5kIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgY3VycmVudCBtZW1iZXIuXG4gICAqIEBwYXJhbSBzaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFuIGFsZXJ0IG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBjb0hvc3QgLSBUaGUgY28taG9zdCBtZW1iZXIuXG4gICAqIEBwYXJhbSB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtZXNzYWdlcyBtb2RhbC5cbiAgICogQHBhcmFtIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBkZXRhaWxzIG9mIHRoZSBkaXJlY3QgbWVzc2FnZS5cbiAgICogQHBhcmFtIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSAtIEZ1bmN0aW9uIHRvIHN0YXJ0IHRoZSBkaXJlY3QgbWVzc2FnZS5cbiAgICpcbiAgICogQHJldHVybnMgdm9pZFxuICAgKi9cbiAgbWVzc2FnZVBhcnRpY2lwYW50cyh7XG4gICAgY29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgcGFydGljaXBhbnQsXG4gICAgbWVtYmVyLFxuICAgIGlzbGV2ZWwsXG4gICAgc2hvd0FsZXJ0LFxuICAgIGNvSG9zdCxcbiAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLFxuICAgIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzLFxuICAgIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSxcbiAgfTogTWVzc2FnZVBhcnRpY2lwYW50c09wdGlvbnMpOiB2b2lkIHtcbiAgICBsZXQgY2hhdFZhbHVlID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgY2hhdFZhbHVlID0gY29Ib3N0UmVzcG9uc2liaWxpdHkuZmluZCgoaXRlbSkgPT4gaXRlbS5uYW1lID09PSAnY2hhdCcpPy52YWx1ZSA/PyBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKGlzbGV2ZWwgPT09ICcyJyB8fCAoY29Ib3N0ID09PSBtZW1iZXIgJiYgY2hhdFZhbHVlID09PSB0cnVlKSkge1xuICAgICAgaWYgKHBhcnRpY2lwYW50LmlzbGV2ZWwgIT09ICcyJykge1xuICAgICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscyhwYXJ0aWNpcGFudCk7XG4gICAgICAgIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSh0cnVlKTtcbiAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byBzZW5kIHRoaXMgbWVzc2FnZScsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG59XG4iXX0=