import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle self-disconnection and banning of a user from a room.
 *
 * @class
 * @name DisconnectUserSelf
 * @description This service manages the disconnection of a user from a specified room and initiates a ban on the user.
 *
 * @method
 * disconnectUserSelf
 * @async
 * @param {DisconnectUserSelfOptions} options - The options required to disconnect the user.
 * @param {string} options.member - The identifier of the member to be disconnected.
 * @param {string} options.roomName - The name of the room from which the user will be disconnected.
 * @param {Socket} options.socket - The socket instance used to emit the disconnection and ban request.
 * @returns {Promise<void>} A promise that resolves when the disconnection request is sent to the server.
 *
 * @example
 * const disconnectUserSelfOptions = {
 *   member: 'user123',
 *   roomName: 'room456',
 *   socket: mySocketInstance
 * };
 * await disconnectUserSelfService.disconnectUserSelf(disconnectUserSelfOptions);
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC11c2VyLXNlbGYuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9kaXNjb25uZWN0LXVzZXItc2VsZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUlILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7Ozs7O09BUUc7SUFDSCxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsRUFDMUIsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEdBQ29CLEVBQWlCLEVBQUU7UUFDN0MsbUdBQW1HO1FBQ25HLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQzt1R0FqQlMsa0JBQWtCOzJHQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RVc2VyU2VsZk9wdGlvbnMge1xuICBtZW1iZXI6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIERpc2Nvbm5lY3RVc2VyU2VsZlR5cGUgPSAob3B0aW9uczogRGlzY29ubmVjdFVzZXJTZWxmT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGhhbmRsZSBzZWxmLWRpc2Nvbm5lY3Rpb24gYW5kIGJhbm5pbmcgb2YgYSB1c2VyIGZyb20gYSByb29tLlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgRGlzY29ubmVjdFVzZXJTZWxmXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBzZXJ2aWNlIG1hbmFnZXMgdGhlIGRpc2Nvbm5lY3Rpb24gb2YgYSB1c2VyIGZyb20gYSBzcGVjaWZpZWQgcm9vbSBhbmQgaW5pdGlhdGVzIGEgYmFuIG9uIHRoZSB1c2VyLlxuICpcbiAqIEBtZXRob2RcbiAqIGRpc2Nvbm5lY3RVc2VyU2VsZlxuICogQGFzeW5jXG4gKiBAcGFyYW0ge0Rpc2Nvbm5lY3RVc2VyU2VsZk9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyByZXF1aXJlZCB0byBkaXNjb25uZWN0IHRoZSB1c2VyLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gVGhlIGlkZW50aWZpZXIgb2YgdGhlIG1lbWJlciB0byBiZSBkaXNjb25uZWN0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIGZyb20gd2hpY2ggdGhlIHVzZXIgd2lsbCBiZSBkaXNjb25uZWN0ZWQuXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHVzZWQgdG8gZW1pdCB0aGUgZGlzY29ubmVjdGlvbiBhbmQgYmFuIHJlcXVlc3QuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzY29ubmVjdGlvbiByZXF1ZXN0IGlzIHNlbnQgdG8gdGhlIHNlcnZlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgZGlzY29ubmVjdFVzZXJTZWxmT3B0aW9ucyA9IHtcbiAqICAgbWVtYmVyOiAndXNlcjEyMycsXG4gKiAgIHJvb21OYW1lOiAncm9vbTQ1NicsXG4gKiAgIHNvY2tldDogbXlTb2NrZXRJbnN0YW5jZVxuICogfTtcbiAqIGF3YWl0IGRpc2Nvbm5lY3RVc2VyU2VsZlNlcnZpY2UuZGlzY29ubmVjdFVzZXJTZWxmKGRpc2Nvbm5lY3RVc2VyU2VsZk9wdGlvbnMpO1xuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRGlzY29ubmVjdFVzZXJTZWxmIHtcbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSB1c2VyIGZyb20gdGhlIHNwZWNpZmllZCByb29tIGFuZCBiYW5zIHRoZW0uXG4gICAqXG4gICAqIEBwYXJhbSB7RGlzY29ubmVjdFVzZXJTZWxmT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBkaXNjb25uZWN0aW5nIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHVzZXIgdG8gZGlzY29ubmVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSBmcm9tIHdoaWNoIHRoZSB1c2VyIHdpbGwgYmUgZGlzY29ubmVjdGVkLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHVzZWQgdG8gZW1pdCB0aGUgZGlzY29ubmVjdGlvbiByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzY29ubmVjdGlvbiByZXF1ZXN0IGhhcyBiZWVuIGVtaXR0ZWQuXG4gICAqL1xuICBkaXNjb25uZWN0VXNlclNlbGYgPSBhc3luYyAoe1xuICAgIG1lbWJlcixcbiAgICByb29tTmFtZSxcbiAgICBzb2NrZXQsXG4gIH06IERpc2Nvbm5lY3RVc2VyU2VsZk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBVcGRhdGUgdGhhdCB0aGUgdXNlciBuZWVkcyB0byBiZSBkaXNjb25uZWN0ZWQ7IHRoaXMgaXMgaW5pdGlhdGVkIGJ5IHRoZSBob3N0IHdoZW4gYmFubmluZyBhIHVzZXJcbiAgICBzb2NrZXQuZW1pdCgnZGlzY29ubmVjdFVzZXInLCB7IG1lbWJlciwgcm9vbU5hbWUsIGJhbjogdHJ1ZSB9KTtcbiAgfTtcbn1cbiJdfQ==