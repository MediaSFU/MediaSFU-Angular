import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RespondToRequests {
    /**
     * Responds to incoming requests by updating the request list and emitting a response to the server.
     *
     * @param {Object} options - The options for responding to requests.
     * @param {Socket} options.socket - The socket instance used to emit the response.
     * @param {Request} options.request - The request object containing details of the request.
     * @param {Function} options.updateRequestList - The function to update the request list.
     * @param {Request[]} options.requestList - The current list of requests.
     * @param {string} options.action - The action to be taken on the request.
     * @param {string} options.roomName - The name of the room to which the response should be emitted.
     *
     * @returns {Promise<void>} A promise that resolves when the response has been emitted.
     */
    async respondToRequests({ socket, request, updateRequestList, requestList, action, roomName, }) {
        // Filter out the request that is being responded to
        let newRequestList = requestList.filter((request_) => {
            return !(request_.id === request.id &&
                request_.icon === request.icon &&
                request_.name === request.name);
        });
        // Update the request list
        updateRequestList(newRequestList);
        // Prepare the request response object
        let requestResponse = {
            id: request.id,
            name: request.name,
            type: request.icon,
            action: action,
        };
        // Emit the response via the socket
        socket.emit('updateUserofRequestStatus', { requestResponse, roomName });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RespondToRequests, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RespondToRequests, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RespondToRequests, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uZC10by1yZXF1ZXN0cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVxdWVzdHMtbWV0aG9kcy9yZXNwb25kLXRvLXJlcXVlc3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFtQjNDLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7Ozs7Ozs7Ozs7OztPQVlHO0lBRUgsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQ3RCLE1BQU0sRUFDTixPQUFPLEVBQ1AsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxHQUNpQjtRQUN6QixvREFBb0Q7UUFDcEQsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ3hELE9BQU8sQ0FBQyxDQUNOLFFBQVEsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUU7Z0JBQzFCLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUk7Z0JBQzlCLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWxDLHNDQUFzQztRQUN0QyxJQUFJLGVBQWUsR0FBb0I7WUFDckMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUM7UUFFRixtQ0FBbUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7dUdBN0NVLGlCQUFpQjsyR0FBakIsaUJBQWlCLGNBRmhCLE1BQU07OzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFJlcXVlc3QsIFJlcXVlc3RSZXNwb25zZSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uZFRvUmVxdWVzdHNPcHRpb25zIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHVwZGF0ZVJlcXVlc3RMaXN0OiAobmV3UmVxdWVzdExpc3Q6IFJlcXVlc3RbXSkgPT4gdm9pZDtcbiAgcmVxdWVzdExpc3Q6IFJlcXVlc3RbXTtcbiAgYWN0aW9uOiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlc3BvbmRUb1JlcXVlc3RzVHlwZSA9IChvcHRpb25zOiBSZXNwb25kVG9SZXF1ZXN0c09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZXNwb25kVG9SZXF1ZXN0cyB7XG4gIC8qKlxuICAgKiBSZXNwb25kcyB0byBpbmNvbWluZyByZXF1ZXN0cyBieSB1cGRhdGluZyB0aGUgcmVxdWVzdCBsaXN0IGFuZCBlbWl0dGluZyBhIHJlc3BvbnNlIHRvIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlc3BvbmRpbmcgdG8gcmVxdWVzdHMuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdXNlZCB0byBlbWl0IHRoZSByZXNwb25zZS5cbiAgICogQHBhcmFtIHtSZXF1ZXN0fSBvcHRpb25zLnJlcXVlc3QgLSBUaGUgcmVxdWVzdCBvYmplY3QgY29udGFpbmluZyBkZXRhaWxzIG9mIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVJlcXVlc3RMaXN0IC0gVGhlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBsaXN0LlxuICAgKiBAcGFyYW0ge1JlcXVlc3RbXX0gb3B0aW9ucy5yZXF1ZXN0TGlzdCAtIFRoZSBjdXJyZW50IGxpc3Qgb2YgcmVxdWVzdHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFjdGlvbiAtIFRoZSBhY3Rpb24gdG8gYmUgdGFrZW4gb24gdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gdG8gd2hpY2ggdGhlIHJlc3BvbnNlIHNob3VsZCBiZSBlbWl0dGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcmVzcG9uc2UgaGFzIGJlZW4gZW1pdHRlZC5cbiAgICovXG5cbiAgYXN5bmMgcmVzcG9uZFRvUmVxdWVzdHMoe1xuICAgIHNvY2tldCxcbiAgICByZXF1ZXN0LFxuICAgIHVwZGF0ZVJlcXVlc3RMaXN0LFxuICAgIHJlcXVlc3RMaXN0LFxuICAgIGFjdGlvbixcbiAgICByb29tTmFtZSxcbiAgfTogUmVzcG9uZFRvUmVxdWVzdHNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gRmlsdGVyIG91dCB0aGUgcmVxdWVzdCB0aGF0IGlzIGJlaW5nIHJlc3BvbmRlZCB0b1xuICAgIGxldCBuZXdSZXF1ZXN0TGlzdCA9IHJlcXVlc3RMaXN0LmZpbHRlcigocmVxdWVzdF86IGFueSkgPT4ge1xuICAgICAgcmV0dXJuICEoXG4gICAgICAgIHJlcXVlc3RfLmlkID09PSByZXF1ZXN0LmlkICYmXG4gICAgICAgIHJlcXVlc3RfLmljb24gPT09IHJlcXVlc3QuaWNvbiAmJlxuICAgICAgICByZXF1ZXN0Xy5uYW1lID09PSByZXF1ZXN0Lm5hbWVcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHJlcXVlc3QgbGlzdFxuICAgIHVwZGF0ZVJlcXVlc3RMaXN0KG5ld1JlcXVlc3RMaXN0KTtcblxuICAgIC8vIFByZXBhcmUgdGhlIHJlcXVlc3QgcmVzcG9uc2Ugb2JqZWN0XG4gICAgbGV0IHJlcXVlc3RSZXNwb25zZTogUmVxdWVzdFJlc3BvbnNlID0ge1xuICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICBuYW1lOiByZXF1ZXN0Lm5hbWUsXG4gICAgICB0eXBlOiByZXF1ZXN0Lmljb24sXG4gICAgICBhY3Rpb246IGFjdGlvbixcbiAgICB9O1xuXG4gICAgLy8gRW1pdCB0aGUgcmVzcG9uc2UgdmlhIHRoZSBzb2NrZXRcbiAgICBzb2NrZXQuZW1pdCgndXBkYXRlVXNlcm9mUmVxdWVzdFN0YXR1cycsIHsgcmVxdWVzdFJlc3BvbnNlLCByb29tTmFtZSB9KTtcbiAgfVxufVxuIl19