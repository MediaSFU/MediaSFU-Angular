import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtcmVxdWVzdGVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcGFydGljaXBhbnQtcmVxdWVzdGVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFpQjNDLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7T0FVRztJQUNILG9CQUFvQixHQUFHLEtBQUssRUFBRSxFQUM1QixXQUFXLEVBQ1gsV0FBVyxFQUNYLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsaUJBQWlCLEdBQ1csRUFBaUIsRUFBRTtRQUMvQywyQ0FBMkM7UUFDM0MsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFdEMsbUVBQW1FO1FBQ25FLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3BFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQzt1R0ExQlMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3QsIFdhaXRpbmdSb29tUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWNpcGFudFJlcXVlc3RlZE9wdGlvbnMge1xuICB1c2VyUmVxdWVzdDogUmVxdWVzdDtcblxuICByZXF1ZXN0TGlzdDogUmVxdWVzdFtdO1xuICB3YWl0aW5nUm9vbUxpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcbiAgdXBkYXRlVG90YWxSZXFXYWl0OiAoY291bnQ6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVxdWVzdExpc3Q6IChsaXN0OiBSZXF1ZXN0W10pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFBhcnRpY2lwYW50UmVxdWVzdGVkVHlwZSA9IChvcHRpb25zOiBQYXJ0aWNpcGFudFJlcXVlc3RlZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQYXJ0aWNpcGFudFJlcXVlc3RlZCB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgcGFydGljaXBhbnQncyByZXF1ZXN0IGJ5IGFkZGluZyBpdCB0byB0aGUgcmVxdWVzdCBsaXN0IGFuZCB1cGRhdGluZyB0aGUgdG90YWwgY291bnQgb2YgcmVxdWVzdHMgYW5kIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljaXBhbnRSZXF1ZXN0ZWRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGhhbmRsaW5nIHRoZSBwYXJ0aWNpcGFudCdzIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7VXNlclJlcXVlc3R9IG9wdGlvbnMudXNlclJlcXVlc3QgLSBUaGUgdXNlciByZXF1ZXN0IHRvIGJlIGFkZGVkIHRvIHRoZSByZXF1ZXN0IGxpc3QuXG4gICAqIEBwYXJhbSB7VXNlclJlcXVlc3RbXX0gb3B0aW9ucy5yZXF1ZXN0TGlzdCAtIFRoZSBjdXJyZW50IGxpc3Qgb2YgdXNlciByZXF1ZXN0cy5cbiAgICogQHBhcmFtIHtVc2VyUmVxdWVzdFtdfSBvcHRpb25zLndhaXRpbmdSb29tTGlzdCAtIFRoZSBjdXJyZW50IGxpc3Qgb2YgcGFydGljaXBhbnRzIGluIHRoZSB3YWl0aW5nIHJvb20uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlVG90YWxSZXFXYWl0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB0b3RhbCBjb3VudCBvZiByZXF1ZXN0cyBhbmQgd2FpdGluZyByb29tIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVSZXF1ZXN0TGlzdCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBsaXN0LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcGFydGljaXBhbnQncyByZXF1ZXN0IGhhcyBiZWVuIGhhbmRsZWQuXG4gICAqL1xuICBwYXJ0aWNpcGFudFJlcXVlc3RlZCA9IGFzeW5jICh7XG4gICAgdXNlclJlcXVlc3QsXG4gICAgcmVxdWVzdExpc3QsXG4gICAgd2FpdGluZ1Jvb21MaXN0LFxuICAgIHVwZGF0ZVRvdGFsUmVxV2FpdCxcbiAgICB1cGRhdGVSZXF1ZXN0TGlzdCxcbiAgfTogUGFydGljaXBhbnRSZXF1ZXN0ZWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gQWRkIHRoZSB1c2VyIHJlcXVlc3QgdG8gdGhlIHJlcXVlc3QgbGlzdFxuICAgIGNvbnN0IHVwZGF0ZWRSZXF1ZXN0TGlzdCA9IFsuLi5yZXF1ZXN0TGlzdCwgdXNlclJlcXVlc3RdO1xuICAgIHVwZGF0ZVJlcXVlc3RMaXN0KHVwZGF0ZWRSZXF1ZXN0TGlzdCk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHRvdGFsIGNvdW50IG9mIHJlcXVlc3RzIGFuZCB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzXG4gICAgY29uc3QgcmVxQ291bnQgPSB1cGRhdGVkUmVxdWVzdExpc3QubGVuZ3RoICsgd2FpdGluZ1Jvb21MaXN0Lmxlbmd0aDtcbiAgICB1cGRhdGVUb3RhbFJlcVdhaXQocmVxQ291bnQpO1xuICB9O1xufVxuIl19