import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DisconnectUserSelf {
    /**
     * Disconnects the user from the specified room and bans them.
     *
     * @param {DisconnectUserSelfOptions} options - The options for disconnecting the user.
     * @param {Object} options.member - The member object representing the user to disconnect.
     * @param {string} options.roomName - The name of the room from which the user will be disconnected.
     * @param {Socket} options.socket - The socket instance used to emit the disconnection request.
     * @returns {Promise<void>} A promise that resolves when the disconnection request has been emitted.
     */
    disconnectUserSelf = async ({ member, roomName, socket, }) => {
        // Update that the user needs to be disconnected; this is initiated by the host when banning a user
        socket.emit('disconnectUser', { member, roomName, ban: true });
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectUserSelf, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectUserSelf, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectUserSelf, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC11c2VyLXNlbGYuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9kaXNjb25uZWN0LXVzZXItc2VsZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7Ozs7O09BUUc7SUFDSCxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsRUFDMUIsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEdBQ29CLEVBQWlCLEVBQUU7UUFDN0MsbUdBQW1HO1FBQ25HLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQzt1R0FqQlMsa0JBQWtCOzJHQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RVc2VyU2VsZk9wdGlvbnMge1xuICBtZW1iZXI6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIERpc2Nvbm5lY3RVc2VyU2VsZlR5cGUgPSAob3B0aW9uczogRGlzY29ubmVjdFVzZXJTZWxmT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEaXNjb25uZWN0VXNlclNlbGYge1xuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIHVzZXIgZnJvbSB0aGUgc3BlY2lmaWVkIHJvb20gYW5kIGJhbnMgdGhlbS5cbiAgICpcbiAgICogQHBhcmFtIHtEaXNjb25uZWN0VXNlclNlbGZPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGRpc2Nvbm5lY3RpbmcgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgdXNlciB0byBkaXNjb25uZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIGZyb20gd2hpY2ggdGhlIHVzZXIgd2lsbCBiZSBkaXNjb25uZWN0ZWQuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdXNlZCB0byBlbWl0IHRoZSBkaXNjb25uZWN0aW9uIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBkaXNjb25uZWN0aW9uIHJlcXVlc3QgaGFzIGJlZW4gZW1pdHRlZC5cbiAgICovXG4gIGRpc2Nvbm5lY3RVc2VyU2VsZiA9IGFzeW5jICh7XG4gICAgbWVtYmVyLFxuICAgIHJvb21OYW1lLFxuICAgIHNvY2tldCxcbiAgfTogRGlzY29ubmVjdFVzZXJTZWxmT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIFVwZGF0ZSB0aGF0IHRoZSB1c2VyIG5lZWRzIHRvIGJlIGRpc2Nvbm5lY3RlZDsgdGhpcyBpcyBpbml0aWF0ZWQgYnkgdGhlIGhvc3Qgd2hlbiBiYW5uaW5nIGEgdXNlclxuICAgIHNvY2tldC5lbWl0KCdkaXNjb25uZWN0VXNlcicsIHsgbWVtYmVyLCByb29tTmFtZSwgYmFuOiB0cnVlIH0pO1xuICB9O1xufVxuIl19