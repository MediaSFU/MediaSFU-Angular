import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Responds to incoming requests by updating the request list and emitting a response to the server.
 *
 * @param {RespondToRequestsOptions} options - The options for responding to requests.
 * @param {Socket} options.socket - The socket instance used to emit the response.
 * @param {Request} options.request - The request object containing details of the request.
 * @param {Function} options.updateRequestList - The function to update the request list.
 * @param {Request[]} options.requestList - The current list of requests.
 * @param {string} options.action - The action to be taken on the request.
 * @param {string} options.roomName - The name of the room to which the response should be emitted.
 *
 * @returns {Promise<void>} A promise that resolves when the response has been emitted.
 *
 * @remarks
 * This method filters out the request that is being responded to from the current request list,
 * updates the list, and emits the response to the server using the provided socket.
 * It ensures that the state of the requests is accurately reflected in the application.
 *
 * @example
 * ```typescript
 * const options: RespondToRequestsOptions = {
 *   socket: socketInstance,
 *   request: {
 *     id: 'request_id',
 *     name: 'Request Name',
 *     icon: 'request_icon'
 *   },
 *   updateRequestList: (newRequestList) => {
 *     console.log('Updated request list:', newRequestList);
 *   },
 *   requestList: currentRequestList,
 *   action: 'accept',
 *   roomName: 'Room 1',
 * };
 *
 * const respondToRequestsService = new RespondToRequests();
 * await respondToRequestsService.respondToRequests(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uZC10by1yZXF1ZXN0cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVxdWVzdHMtbWV0aG9kcy9yZXNwb25kLXRvLXJlcXVlc3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFnQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQU1ILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7Ozs7Ozs7Ozs7OztPQVlHO0lBRUgsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQ3RCLE1BQU0sRUFDTixPQUFPLEVBQ1AsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxHQUNpQjtRQUN6QixvREFBb0Q7UUFDcEQsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ3hELE9BQU8sQ0FBQyxDQUNOLFFBQVEsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUU7Z0JBQzFCLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUk7Z0JBQzlCLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWxDLHNDQUFzQztRQUN0QyxJQUFJLGVBQWUsR0FBb0I7WUFDckMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUM7UUFFRixtQ0FBbUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7dUdBN0NVLGlCQUFpQjsyR0FBakIsaUJBQWlCLGNBRmhCLE1BQU07OzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFJlcXVlc3QsIFJlcXVlc3RSZXNwb25zZSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uZFRvUmVxdWVzdHNPcHRpb25zIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHVwZGF0ZVJlcXVlc3RMaXN0OiAobmV3UmVxdWVzdExpc3Q6IFJlcXVlc3RbXSkgPT4gdm9pZDtcbiAgcmVxdWVzdExpc3Q6IFJlcXVlc3RbXTtcbiAgYWN0aW9uOiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlc3BvbmRUb1JlcXVlc3RzVHlwZSA9IChvcHRpb25zOiBSZXNwb25kVG9SZXF1ZXN0c09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogUmVzcG9uZHMgdG8gaW5jb21pbmcgcmVxdWVzdHMgYnkgdXBkYXRpbmcgdGhlIHJlcXVlc3QgbGlzdCBhbmQgZW1pdHRpbmcgYSByZXNwb25zZSB0byB0aGUgc2VydmVyLlxuICpcbiAqIEBwYXJhbSB7UmVzcG9uZFRvUmVxdWVzdHNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlc3BvbmRpbmcgdG8gcmVxdWVzdHMuXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHVzZWQgdG8gZW1pdCB0aGUgcmVzcG9uc2UuXG4gKiBAcGFyYW0ge1JlcXVlc3R9IG9wdGlvbnMucmVxdWVzdCAtIFRoZSByZXF1ZXN0IG9iamVjdCBjb250YWluaW5nIGRldGFpbHMgb2YgdGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVJlcXVlc3RMaXN0IC0gVGhlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBsaXN0LlxuICogQHBhcmFtIHtSZXF1ZXN0W119IG9wdGlvbnMucmVxdWVzdExpc3QgLSBUaGUgY3VycmVudCBsaXN0IG9mIHJlcXVlc3RzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYWN0aW9uIC0gVGhlIGFjdGlvbiB0byBiZSB0YWtlbiBvbiB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gdG8gd2hpY2ggdGhlIHJlc3BvbnNlIHNob3VsZCBiZSBlbWl0dGVkLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZXNwb25zZSBoYXMgYmVlbiBlbWl0dGVkLlxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGlzIG1ldGhvZCBmaWx0ZXJzIG91dCB0aGUgcmVxdWVzdCB0aGF0IGlzIGJlaW5nIHJlc3BvbmRlZCB0byBmcm9tIHRoZSBjdXJyZW50IHJlcXVlc3QgbGlzdCxcbiAqIHVwZGF0ZXMgdGhlIGxpc3QsIGFuZCBlbWl0cyB0aGUgcmVzcG9uc2UgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgcHJvdmlkZWQgc29ja2V0LlxuICogSXQgZW5zdXJlcyB0aGF0IHRoZSBzdGF0ZSBvZiB0aGUgcmVxdWVzdHMgaXMgYWNjdXJhdGVseSByZWZsZWN0ZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBSZXNwb25kVG9SZXF1ZXN0c09wdGlvbnMgPSB7XG4gKiAgIHNvY2tldDogc29ja2V0SW5zdGFuY2UsXG4gKiAgIHJlcXVlc3Q6IHtcbiAqICAgICBpZDogJ3JlcXVlc3RfaWQnLFxuICogICAgIG5hbWU6ICdSZXF1ZXN0IE5hbWUnLFxuICogICAgIGljb246ICdyZXF1ZXN0X2ljb24nXG4gKiAgIH0sXG4gKiAgIHVwZGF0ZVJlcXVlc3RMaXN0OiAobmV3UmVxdWVzdExpc3QpID0+IHtcbiAqICAgICBjb25zb2xlLmxvZygnVXBkYXRlZCByZXF1ZXN0IGxpc3Q6JywgbmV3UmVxdWVzdExpc3QpO1xuICogICB9LFxuICogICByZXF1ZXN0TGlzdDogY3VycmVudFJlcXVlc3RMaXN0LFxuICogICBhY3Rpb246ICdhY2NlcHQnLFxuICogICByb29tTmFtZTogJ1Jvb20gMScsXG4gKiB9O1xuICpcbiAqIGNvbnN0IHJlc3BvbmRUb1JlcXVlc3RzU2VydmljZSA9IG5ldyBSZXNwb25kVG9SZXF1ZXN0cygpO1xuICogYXdhaXQgcmVzcG9uZFRvUmVxdWVzdHNTZXJ2aWNlLnJlc3BvbmRUb1JlcXVlc3RzKG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVzcG9uZFRvUmVxdWVzdHMge1xuICAvKipcbiAgICogUmVzcG9uZHMgdG8gaW5jb21pbmcgcmVxdWVzdHMgYnkgdXBkYXRpbmcgdGhlIHJlcXVlc3QgbGlzdCBhbmQgZW1pdHRpbmcgYSByZXNwb25zZSB0byB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZXNwb25kaW5nIHRvIHJlcXVlc3RzLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHVzZWQgdG8gZW1pdCB0aGUgcmVzcG9uc2UuXG4gICAqIEBwYXJhbSB7UmVxdWVzdH0gb3B0aW9ucy5yZXF1ZXN0IC0gVGhlIHJlcXVlc3Qgb2JqZWN0IGNvbnRhaW5pbmcgZGV0YWlscyBvZiB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVSZXF1ZXN0TGlzdCAtIFRoZSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgbGlzdC5cbiAgICogQHBhcmFtIHtSZXF1ZXN0W119IG9wdGlvbnMucmVxdWVzdExpc3QgLSBUaGUgY3VycmVudCBsaXN0IG9mIHJlcXVlc3RzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hY3Rpb24gLSBUaGUgYWN0aW9uIHRvIGJlIHRha2VuIG9uIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHRvIHdoaWNoIHRoZSByZXNwb25zZSBzaG91bGQgYmUgZW1pdHRlZC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJlc3BvbnNlIGhhcyBiZWVuIGVtaXR0ZWQuXG4gICAqL1xuXG4gIGFzeW5jIHJlc3BvbmRUb1JlcXVlc3RzKHtcbiAgICBzb2NrZXQsXG4gICAgcmVxdWVzdCxcbiAgICB1cGRhdGVSZXF1ZXN0TGlzdCxcbiAgICByZXF1ZXN0TGlzdCxcbiAgICBhY3Rpb24sXG4gICAgcm9vbU5hbWUsXG4gIH06IFJlc3BvbmRUb1JlcXVlc3RzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIEZpbHRlciBvdXQgdGhlIHJlcXVlc3QgdGhhdCBpcyBiZWluZyByZXNwb25kZWQgdG9cbiAgICBsZXQgbmV3UmVxdWVzdExpc3QgPSByZXF1ZXN0TGlzdC5maWx0ZXIoKHJlcXVlc3RfOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiAhKFxuICAgICAgICByZXF1ZXN0Xy5pZCA9PT0gcmVxdWVzdC5pZCAmJlxuICAgICAgICByZXF1ZXN0Xy5pY29uID09PSByZXF1ZXN0Lmljb24gJiZcbiAgICAgICAgcmVxdWVzdF8ubmFtZSA9PT0gcmVxdWVzdC5uYW1lXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSByZXF1ZXN0IGxpc3RcbiAgICB1cGRhdGVSZXF1ZXN0TGlzdChuZXdSZXF1ZXN0TGlzdCk7XG5cbiAgICAvLyBQcmVwYXJlIHRoZSByZXF1ZXN0IHJlc3BvbnNlIG9iamVjdFxuICAgIGxldCByZXF1ZXN0UmVzcG9uc2U6IFJlcXVlc3RSZXNwb25zZSA9IHtcbiAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgbmFtZTogcmVxdWVzdC5uYW1lLFxuICAgICAgdHlwZTogcmVxdWVzdC5pY29uLFxuICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgfTtcblxuICAgIC8vIEVtaXQgdGhlIHJlc3BvbnNlIHZpYSB0aGUgc29ja2V0XG4gICAgc29ja2V0LmVtaXQoJ3VwZGF0ZVVzZXJvZlJlcXVlc3RTdGF0dXMnLCB7IHJlcXVlc3RSZXNwb25zZSwgcm9vbU5hbWUgfSk7XG4gIH1cbn1cbiJdfQ==