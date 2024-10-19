import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLW1lc3NhZ2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy9nZW5lcmF0ZS1yYW5kb20tbWVzc2FnZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWlCM0MsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQzs7Ozs7Ozs7OztPQVVHO0lBQ0gsc0JBQXNCLENBQUMsRUFDckIsWUFBWSxFQUNaLE1BQU0sRUFDTixNQUFNLEdBQUcsRUFBRSxFQUNYLElBQUksRUFDSixnQkFBZ0IsR0FBRyxLQUFLLEdBQ007UUFDOUIsTUFBTSxRQUFRLEdBQWMsRUFBRSxDQUFDO1FBRS9CLDZEQUE2RDtRQUM3RCxNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBYyxFQUFVLEVBQUU7WUFDbkQsTUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDO1lBQzdGLE1BQU0sY0FBYyxHQUNsQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE9BQU8sY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDO1FBRUYsK0NBQStDO1FBQy9DLElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUM1QixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDckIsUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDWCxRQUFRLEdBQUc7b0JBQ1QsTUFBTTtvQkFDTixNQUFNO29CQUNOLElBQUk7b0JBQ0osR0FBRyxZQUFZO3lCQUNaLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQzt5QkFDdEMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFrQixFQUFFLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztpQkFDeEQsQ0FBQztZQUNKLENBQUM7aUJBQU0sQ0FBQztnQkFDTixRQUFRLEdBQUc7b0JBQ1QsTUFBTTtvQkFDTixJQUFJO29CQUNKLEdBQUcsWUFBWTt5QkFDWixHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7eUJBQ3RDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBa0IsRUFBRSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7aUJBQ3hELENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUVELHVDQUF1QztRQUN2QyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFbEMsb0JBQW9CO1FBQ3BCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDMUIsdUJBQXVCO1lBQ3ZCLE1BQU0sYUFBYSxHQUFZO2dCQUM3QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLHVCQUF1QixNQUFNLEVBQUU7Z0JBQ3hDLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ3BFLEtBQUssRUFBRSxLQUFLO2FBQ2IsQ0FBQztZQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFN0Isc0JBQXNCO1lBQ3RCLE1BQU0sWUFBWSxHQUFZO2dCQUM1QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsWUFBWTtxQkFDcEIsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO3FCQUN0QyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQWtCLEVBQUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsc0JBQXNCLE1BQU0sRUFBRTtnQkFDdkMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxhQUFhLENBQUMsQ0FBQyxrQkFBa0IsRUFBRTtnQkFDcEUsS0FBSyxFQUFFLElBQUk7YUFDWixDQUFDO1lBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU1QixhQUFhLElBQUksS0FBSyxDQUFDLENBQUMsZ0RBQWdEO1FBQzFFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzt1R0F2RlUsc0JBQXNCOzJHQUF0QixzQkFBc0IsY0FGckIsTUFBTTs7MkZBRVAsc0JBQXNCO2tCQUhsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lc3NhZ2UsIFBhcnRpY2lwYW50IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZVJhbmRvbU1lc3NhZ2VzT3B0aW9ucyB7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGNvSG9zdD86IHN0cmluZztcbiAgaG9zdDogc3RyaW5nO1xuICBmb3JDaGF0QnJvYWRjYXN0PzogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgR2VuZXJhdGVSYW5kb21NZXNzYWdlc1R5cGUgPSAob3B0aW9uczogR2VuZXJhdGVSYW5kb21NZXNzYWdlc09wdGlvbnMpID0+IE1lc3NhZ2VbXTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVyYXRlUmFuZG9tTWVzc2FnZXMge1xuICAvKipcbiAgICogR2VuZXJhdGVzIHJhbmRvbSBtZXNzYWdlcyBmb3IgYSBnaXZlbiBzZXQgb2YgcGFydGljaXBhbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBnZW5lcmF0aW5nIHJhbmRvbSBtZXNzYWdlcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgd2hvIGlzIHBhcnQgb2YgdGhlIGNoYXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jb0hvc3Q9XCJcIl0gLSBUaGUgY28taG9zdCBvZiB0aGUgY2hhdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaG9zdCAtIFRoZSBob3N0IG9mIHRoZSBjaGF0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZvckNoYXRCcm9hZGNhc3Q9ZmFsc2VdIC0gRmxhZyB0byBpbmRpY2F0ZSBpZiB0aGUgbWVzc2FnZXMgYXJlIGZvciBjaGF0IGJyb2FkY2FzdC5cbiAgICogQHJldHVybnMge01lc3NhZ2VbXX0gQW4gYXJyYXkgb2YgZ2VuZXJhdGVkIG1lc3NhZ2VzLlxuICAgKi9cbiAgZ2VuZXJhdGVSYW5kb21NZXNzYWdlcyh7XG4gICAgcGFydGljaXBhbnRzLFxuICAgIG1lbWJlcixcbiAgICBjb0hvc3QgPSAnJyxcbiAgICBob3N0LFxuICAgIGZvckNoYXRCcm9hZGNhc3QgPSBmYWxzZSxcbiAgfTogR2VuZXJhdGVSYW5kb21NZXNzYWdlc09wdGlvbnMpOiBNZXNzYWdlW10ge1xuICAgIGNvbnN0IG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXTtcblxuICAgIC8vIEZ1bmN0aW9uIHRvIGdldCBhIHJhbmRvbSBwYXJ0aWNpcGFudCBvdGhlciB0aGFuIHRoZSBzZW5kZXJcbiAgICBjb25zdCBnZXRSYW5kb21SZWNlaXZlciA9IChzZW5kZXI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICBjb25zdCBwb3RlbnRpYWxSZWNlaXZlcnMgPSBwYXJ0aWNpcGFudHMuZmlsdGVyKChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSAhPT0gc2VuZGVyKTtcbiAgICAgIGNvbnN0IHJhbmRvbVJlY2VpdmVyID1cbiAgICAgICAgcG90ZW50aWFsUmVjZWl2ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvdGVudGlhbFJlY2VpdmVycy5sZW5ndGgpXTtcbiAgICAgIHJldHVybiByYW5kb21SZWNlaXZlci5uYW1lIHx8ICcnO1xuICAgIH07XG5cbiAgICAvLyBGb3JjZSBhZGQgbWVzc2FnZXMgZm9yIHNwZWNpZmljIHBhcnRpY2lwYW50c1xuICAgIGxldCByZWZOYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAoZm9yQ2hhdEJyb2FkY2FzdCkge1xuICAgICAgcmVmTmFtZXMgPSBbbWVtYmVyLCBob3N0XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvSG9zdCkge1xuICAgICAgICByZWZOYW1lcyA9IFtcbiAgICAgICAgICBtZW1iZXIsXG4gICAgICAgICAgY29Ib3N0LFxuICAgICAgICAgIGhvc3QsXG4gICAgICAgICAgLi4ucGFydGljaXBhbnRzXG4gICAgICAgICAgICAubWFwKChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSlcbiAgICAgICAgICAgIC5maWx0ZXIoKG5hbWUpOiBuYW1lIGlzIHN0cmluZyA9PiBuYW1lICE9PSB1bmRlZmluZWQpLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVmTmFtZXMgPSBbXG4gICAgICAgICAgbWVtYmVyLFxuICAgICAgICAgIGhvc3QsXG4gICAgICAgICAgLi4ucGFydGljaXBhbnRzXG4gICAgICAgICAgICAubWFwKChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSlcbiAgICAgICAgICAgIC5maWx0ZXIoKG5hbWUpOiBuYW1lIGlzIHN0cmluZyA9PiBuYW1lICE9PSB1bmRlZmluZWQpLFxuICAgICAgICBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiB1bmlxdWUgbmFtZXMgZm9yIHRoZSByZWZOYW1lc1xuICAgIHJlZk5hbWVzID0gWy4uLm5ldyBTZXQocmVmTmFtZXMpXTtcblxuICAgIC8vIEdlbmVyYXRlIG1lc3NhZ2VzXG4gICAgbGV0IHRpbWVJbmNyZW1lbnQgPSAwO1xuICAgIHJlZk5hbWVzLmZvckVhY2goKHNlbmRlcikgPT4ge1xuICAgICAgLy8gU2VuZCBkaXJlY3QgbWVzc2FnZXNcbiAgICAgIGNvbnN0IGRpcmVjdE1lc3NhZ2U6IE1lc3NhZ2UgPSB7XG4gICAgICAgIHNlbmRlcjogc2VuZGVyLFxuICAgICAgICByZWNlaXZlcnM6IFtnZXRSYW5kb21SZWNlaXZlcihzZW5kZXIpXSxcbiAgICAgICAgbWVzc2FnZTogYERpcmVjdCBtZXNzYWdlIGZyb20gJHtzZW5kZXJ9YCxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGltZUluY3JlbWVudCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgIGdyb3VwOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICAgIG1lc3NhZ2VzLnB1c2goZGlyZWN0TWVzc2FnZSk7XG5cbiAgICAgIC8vIFNlbmQgZ3JvdXAgbWVzc2FnZXNcbiAgICAgIGNvbnN0IGdyb3VwTWVzc2FnZTogTWVzc2FnZSA9IHtcbiAgICAgICAgc2VuZGVyOiBzZW5kZXIsXG4gICAgICAgIHJlY2VpdmVyczogcGFydGljaXBhbnRzXG4gICAgICAgICAgLm1hcCgocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50Lm5hbWUpXG4gICAgICAgICAgLmZpbHRlcigobmFtZSk6IG5hbWUgaXMgc3RyaW5nID0+IG5hbWUgIT09IHVuZGVmaW5lZCksXG4gICAgICAgIG1lc3NhZ2U6IGBHcm91cCBtZXNzYWdlIGZyb20gJHtzZW5kZXJ9YCxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGltZUluY3JlbWVudCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgIGdyb3VwOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VzLnB1c2goZ3JvdXBNZXNzYWdlKTtcblxuICAgICAgdGltZUluY3JlbWVudCArPSAxNTAwMDsgLy8gSW5jcmVtZW50IHRpbWUgYnkgMTUgc2Vjb25kcyBmb3IgZWFjaCBtZXNzYWdlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWVzc2FnZXM7XG4gIH1cbn1cbiJdfQ==