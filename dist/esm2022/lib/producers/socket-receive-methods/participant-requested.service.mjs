import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle participant requests in an event's waiting room.
 *
 * @class
 * @name ParticipantRequested
 * @description
 * Manages participant requests by adding new requests to the list and updating the total count of requests and waiting room participants.
 *
 * @method
 * participantRequested
 *
 * @param {ParticipantRequestedOptions} options - Contains request information and update functions:
 *   - `userRequest` {Request}: The new request from a participant.
 *   - `requestList` {Request[]}: The current list of requests.
 *   - `waitingRoomList` {WaitingRoomParticipant[]}: The list of participants in the waiting room.
 *   - `updateTotalReqWait` {Function}: Function to update the total count of requests and waiting room participants.
 *   - `updateRequestList` {Function}: Function to update the request list.
 *
 * @returns {Promise<void>} Updates the request list and total request count.
 *
 * @example
 * const options = {
 *   userRequest: { id: '123', name: 'John Doe', icon: 'fa-user', username: 'johndoe' },
 *   requestList: existingRequests,
 *   waitingRoomList: waitingParticipants,
 *   updateTotalReqWait: (count) => console.log(`Total requests: ${count}`),
 *   updateRequestList: (list) => console.log('Updated request list', list)
 * };
 * await participantRequestedService.participantRequested(options);
 * // Adds "John Doe" to request list and updates the total count.
 */
export class ParticipantRequested {
    /**
     * Handles a participant's request by adding it to the request list and updating the total count of requests and waiting room participants.
     *
     * @param {ParticipantRequestedOptions} options - The options for handling the participant's request.
     * @param {UserRequest} options.userRequest - The user request to be added to the request list.
     * @param {UserRequest[]} options.requestList - The current list of user requests.
     * @param {UserRequest[]} options.waitingRoomList - The current list of participants in the waiting room.
     * @param {Function} options.updateTotalReqWait - Function to update the total count of requests and waiting room participants.
     * @param {Function} options.updateRequestList - Function to update the request list.
     * @returns {Promise<void>} A promise that resolves when the participant's request has been handled.
     */
    participantRequested = async ({ userRequest, requestList, waitingRoomList, updateTotalReqWait, updateRequestList, }) => {
        // Add the user request to the request list
        const updatedRequestList = [...requestList, userRequest];
        updateRequestList(updatedRequestList);
        // Update the total count of requests and waiting room participants
        const reqCount = updatedRequestList.length + waitingRoomList.length;
        updateTotalReqWait(reqCount);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantRequested, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantRequested, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantRequested, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtcmVxdWVzdGVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcGFydGljaXBhbnQtcmVxdWVzdGVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFjM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQU1ILE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7T0FVRztJQUNILG9CQUFvQixHQUFHLEtBQUssRUFBRSxFQUM1QixXQUFXLEVBQ1gsV0FBVyxFQUNYLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsaUJBQWlCLEdBQ1csRUFBaUIsRUFBRTtRQUMvQywyQ0FBMkM7UUFDM0MsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFdEMsbUVBQW1FO1FBQ25FLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3BFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQzt1R0ExQlMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3QsIFdhaXRpbmdSb29tUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWNpcGFudFJlcXVlc3RlZE9wdGlvbnMge1xuICB1c2VyUmVxdWVzdDogUmVxdWVzdDtcblxuICByZXF1ZXN0TGlzdDogUmVxdWVzdFtdO1xuICB3YWl0aW5nUm9vbUxpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcbiAgdXBkYXRlVG90YWxSZXFXYWl0OiAoY291bnQ6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVxdWVzdExpc3Q6IChsaXN0OiBSZXF1ZXN0W10pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFBhcnRpY2lwYW50UmVxdWVzdGVkVHlwZSA9IChvcHRpb25zOiBQYXJ0aWNpcGFudFJlcXVlc3RlZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VydmljZSB0byBoYW5kbGUgcGFydGljaXBhbnQgcmVxdWVzdHMgaW4gYW4gZXZlbnQncyB3YWl0aW5nIHJvb20uXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBQYXJ0aWNpcGFudFJlcXVlc3RlZFxuICogQGRlc2NyaXB0aW9uXG4gKiBNYW5hZ2VzIHBhcnRpY2lwYW50IHJlcXVlc3RzIGJ5IGFkZGluZyBuZXcgcmVxdWVzdHMgdG8gdGhlIGxpc3QgYW5kIHVwZGF0aW5nIHRoZSB0b3RhbCBjb3VudCBvZiByZXF1ZXN0cyBhbmQgd2FpdGluZyByb29tIHBhcnRpY2lwYW50cy5cbiAqXG4gKiBAbWV0aG9kXG4gKiBwYXJ0aWNpcGFudFJlcXVlc3RlZFxuICpcbiAqIEBwYXJhbSB7UGFydGljaXBhbnRSZXF1ZXN0ZWRPcHRpb25zfSBvcHRpb25zIC0gQ29udGFpbnMgcmVxdWVzdCBpbmZvcm1hdGlvbiBhbmQgdXBkYXRlIGZ1bmN0aW9uczpcbiAqICAgLSBgdXNlclJlcXVlc3RgIHtSZXF1ZXN0fTogVGhlIG5ldyByZXF1ZXN0IGZyb20gYSBwYXJ0aWNpcGFudC5cbiAqICAgLSBgcmVxdWVzdExpc3RgIHtSZXF1ZXN0W119OiBUaGUgY3VycmVudCBsaXN0IG9mIHJlcXVlc3RzLlxuICogICAtIGB3YWl0aW5nUm9vbUxpc3RgIHtXYWl0aW5nUm9vbVBhcnRpY2lwYW50W119OiBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMgaW4gdGhlIHdhaXRpbmcgcm9vbS5cbiAqICAgLSBgdXBkYXRlVG90YWxSZXFXYWl0YCB7RnVuY3Rpb259OiBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHRvdGFsIGNvdW50IG9mIHJlcXVlc3RzIGFuZCB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzLlxuICogICAtIGB1cGRhdGVSZXF1ZXN0TGlzdGAge0Z1bmN0aW9ufTogRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGxpc3QuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFVwZGF0ZXMgdGhlIHJlcXVlc3QgbGlzdCBhbmQgdG90YWwgcmVxdWVzdCBjb3VudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgdXNlclJlcXVlc3Q6IHsgaWQ6ICcxMjMnLCBuYW1lOiAnSm9obiBEb2UnLCBpY29uOiAnZmEtdXNlcicsIHVzZXJuYW1lOiAnam9obmRvZScgfSxcbiAqICAgcmVxdWVzdExpc3Q6IGV4aXN0aW5nUmVxdWVzdHMsXG4gKiAgIHdhaXRpbmdSb29tTGlzdDogd2FpdGluZ1BhcnRpY2lwYW50cyxcbiAqICAgdXBkYXRlVG90YWxSZXFXYWl0OiAoY291bnQpID0+IGNvbnNvbGUubG9nKGBUb3RhbCByZXF1ZXN0czogJHtjb3VudH1gKSxcbiAqICAgdXBkYXRlUmVxdWVzdExpc3Q6IChsaXN0KSA9PiBjb25zb2xlLmxvZygnVXBkYXRlZCByZXF1ZXN0IGxpc3QnLCBsaXN0KVxuICogfTtcbiAqIGF3YWl0IHBhcnRpY2lwYW50UmVxdWVzdGVkU2VydmljZS5wYXJ0aWNpcGFudFJlcXVlc3RlZChvcHRpb25zKTtcbiAqIC8vIEFkZHMgXCJKb2huIERvZVwiIHRvIHJlcXVlc3QgbGlzdCBhbmQgdXBkYXRlcyB0aGUgdG90YWwgY291bnQuXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGFydGljaXBhbnRSZXF1ZXN0ZWQge1xuICAvKipcbiAgICogSGFuZGxlcyBhIHBhcnRpY2lwYW50J3MgcmVxdWVzdCBieSBhZGRpbmcgaXQgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdXBkYXRpbmcgdGhlIHRvdGFsIGNvdW50IG9mIHJlcXVlc3RzIGFuZCB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2lwYW50UmVxdWVzdGVkT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBoYW5kbGluZyB0aGUgcGFydGljaXBhbnQncyByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1VzZXJSZXF1ZXN0fSBvcHRpb25zLnVzZXJSZXF1ZXN0IC0gVGhlIHVzZXIgcmVxdWVzdCB0byBiZSBhZGRlZCB0byB0aGUgcmVxdWVzdCBsaXN0LlxuICAgKiBAcGFyYW0ge1VzZXJSZXF1ZXN0W119IG9wdGlvbnMucmVxdWVzdExpc3QgLSBUaGUgY3VycmVudCBsaXN0IG9mIHVzZXIgcmVxdWVzdHMuXG4gICAqIEBwYXJhbSB7VXNlclJlcXVlc3RbXX0gb3B0aW9ucy53YWl0aW5nUm9vbUxpc3QgLSBUaGUgY3VycmVudCBsaXN0IG9mIHBhcnRpY2lwYW50cyBpbiB0aGUgd2FpdGluZyByb29tLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVRvdGFsUmVxV2FpdCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdG90YWwgY291bnQgb2YgcmVxdWVzdHMgYW5kIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlUmVxdWVzdExpc3QgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgbGlzdC5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHBhcnRpY2lwYW50J3MgcmVxdWVzdCBoYXMgYmVlbiBoYW5kbGVkLlxuICAgKi9cbiAgcGFydGljaXBhbnRSZXF1ZXN0ZWQgPSBhc3luYyAoe1xuICAgIHVzZXJSZXF1ZXN0LFxuICAgIHJlcXVlc3RMaXN0LFxuICAgIHdhaXRpbmdSb29tTGlzdCxcbiAgICB1cGRhdGVUb3RhbFJlcVdhaXQsXG4gICAgdXBkYXRlUmVxdWVzdExpc3QsXG4gIH06IFBhcnRpY2lwYW50UmVxdWVzdGVkT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIEFkZCB0aGUgdXNlciByZXF1ZXN0IHRvIHRoZSByZXF1ZXN0IGxpc3RcbiAgICBjb25zdCB1cGRhdGVkUmVxdWVzdExpc3QgPSBbLi4ucmVxdWVzdExpc3QsIHVzZXJSZXF1ZXN0XTtcbiAgICB1cGRhdGVSZXF1ZXN0TGlzdCh1cGRhdGVkUmVxdWVzdExpc3QpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB0b3RhbCBjb3VudCBvZiByZXF1ZXN0cyBhbmQgd2FpdGluZyByb29tIHBhcnRpY2lwYW50c1xuICAgIGNvbnN0IHJlcUNvdW50ID0gdXBkYXRlZFJlcXVlc3RMaXN0Lmxlbmd0aCArIHdhaXRpbmdSb29tTGlzdC5sZW5ndGg7XG4gICAgdXBkYXRlVG90YWxSZXFXYWl0KHJlcUNvdW50KTtcbiAgfTtcbn1cbiJdfQ==