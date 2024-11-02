import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle updating the list and count of waiting room participants.
 *
 * @class
 * @name AllWaitingRoomMembers
 * @description This service updates the waiting room participants list and the total count of participants waiting to join.
 *
 * @method
 * @async
 * @name allWaitingRoomMembers
 * @param {AllWaitingRoomMembersOptions} options - The options for updating the waiting room data.
 * @param {WaitingRoomParticipant[]} options.waitingParticipants - An array of participants currently in the waiting room.
 * @param {Function} options.updateWaitingRoomList - Function to update the waiting room participants list.
 * @param {Function} options.updateTotalReqWait - Function to update the total count of waiting room participants.
 *
 * @returns {Promise<void>} A promise that resolves when the updates to the waiting room data are complete.
 *
 * @example
 * ```typescript
 * const allWaitingRoomMembersService = new AllWaitingRoomMembers();
 * await allWaitingRoomMembersService.allWaitingRoomMembers({
 *   waitingParticipants: [{ name: 'John Doe', isApproved: false }],
 *   updateWaitingRoomList: (participants) => console.log(participants),
 *   updateTotalReqWait: (total) => console.log(`Total requests: ${total}`)
 * });
 * ```
 */
export class AllWaitingRoomMembers {
    /**
     * Updates the waiting room participants list and the total count of waiting room participants.
     *
     * @param {Object} options - The options object.
     * @param {Array} options.waitingParticipants - An array of participants currently in the waiting room.
     * @param {Function} options.updateWaitingRoomList - A function to update the waiting room participants list.
     * @param {Function} options.updateTotalReqWait - A function to update the total count of waiting room participants.
     * @returns {Promise<void>} A promise that resolves when the updates are complete.
     */
    allWaitingRoomMembers = async ({ waitingParticipants, updateWaitingRoomList, updateTotalReqWait, }) => {
        // Calculate the total number of waiting room participants
        const totalReqs = waitingParticipants.length;
        // Update the waiting room participants list
        updateWaitingRoomList(waitingParticipants);
        // Update the total count of waiting room participants
        updateTotalReqWait(totalReqs);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllWaitingRoomMembers, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllWaitingRoomMembers, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllWaitingRoomMembers, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLXdhaXRpbmctcm9vbS1tZW1iZXJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYWxsLXdhaXRpbmctcm9vbS1tZW1iZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFXM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBS0gsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQzs7Ozs7Ozs7T0FRRztJQUNILHFCQUFxQixHQUFHLEtBQUssRUFBRSxFQUM3QixtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLGtCQUFrQixHQUNXLEVBQWlCLEVBQUU7UUFDaEQsMERBQTBEO1FBQzFELE1BQU0sU0FBUyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztRQUU3Qyw0Q0FBNEM7UUFDNUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUUzQyxzREFBc0Q7UUFDdEQsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO3VHQXZCUyxxQkFBcUI7MkdBQXJCLHFCQUFxQixjQUZwQixNQUFNOzsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIEFsbFdhaXRpbmdSb29tTWVtYmVyc09wdGlvbnMge1xuICB3YWl0aW5nUGFydGljaXBhbnRzOiBXYWl0aW5nUm9vbVBhcnRpY2lwYW50W107XG4gIHVwZGF0ZVdhaXRpbmdSb29tTGlzdDogKHBhcnRpY2lwYW50czogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVUb3RhbFJlcVdhaXQ6ICh0b3RhbFJlcXM6IG51bWJlcikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQWxsV2FpdGluZ1Jvb21NZW1iZXJzVHlwZSA9IChvcHRpb25zOiBBbGxXYWl0aW5nUm9vbU1lbWJlcnNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaGFuZGxlIHVwZGF0aW5nIHRoZSBsaXN0IGFuZCBjb3VudCBvZiB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzLlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgQWxsV2FpdGluZ1Jvb21NZW1iZXJzXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBzZXJ2aWNlIHVwZGF0ZXMgdGhlIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMgbGlzdCBhbmQgdGhlIHRvdGFsIGNvdW50IG9mIHBhcnRpY2lwYW50cyB3YWl0aW5nIHRvIGpvaW4uXG4gKlxuICogQG1ldGhvZFxuICogQGFzeW5jXG4gKiBAbmFtZSBhbGxXYWl0aW5nUm9vbU1lbWJlcnNcbiAqIEBwYXJhbSB7QWxsV2FpdGluZ1Jvb21NZW1iZXJzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB1cGRhdGluZyB0aGUgd2FpdGluZyByb29tIGRhdGEuXG4gKiBAcGFyYW0ge1dhaXRpbmdSb29tUGFydGljaXBhbnRbXX0gb3B0aW9ucy53YWl0aW5nUGFydGljaXBhbnRzIC0gQW4gYXJyYXkgb2YgcGFydGljaXBhbnRzIGN1cnJlbnRseSBpbiB0aGUgd2FpdGluZyByb29tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVXYWl0aW5nUm9vbUxpc3QgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMgbGlzdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlVG90YWxSZXFXYWl0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB0b3RhbCBjb3VudCBvZiB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB1cGRhdGVzIHRvIHRoZSB3YWl0aW5nIHJvb20gZGF0YSBhcmUgY29tcGxldGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGFsbFdhaXRpbmdSb29tTWVtYmVyc1NlcnZpY2UgPSBuZXcgQWxsV2FpdGluZ1Jvb21NZW1iZXJzKCk7XG4gKiBhd2FpdCBhbGxXYWl0aW5nUm9vbU1lbWJlcnNTZXJ2aWNlLmFsbFdhaXRpbmdSb29tTWVtYmVycyh7XG4gKiAgIHdhaXRpbmdQYXJ0aWNpcGFudHM6IFt7IG5hbWU6ICdKb2huIERvZScsIGlzQXBwcm92ZWQ6IGZhbHNlIH1dLFxuICogICB1cGRhdGVXYWl0aW5nUm9vbUxpc3Q6IChwYXJ0aWNpcGFudHMpID0+IGNvbnNvbGUubG9nKHBhcnRpY2lwYW50cyksXG4gKiAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogKHRvdGFsKSA9PiBjb25zb2xlLmxvZyhgVG90YWwgcmVxdWVzdHM6ICR7dG90YWx9YClcbiAqIH0pO1xuICogYGBgXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFsbFdhaXRpbmdSb29tTWVtYmVycyB7XG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzIGxpc3QgYW5kIHRoZSB0b3RhbCBjb3VudCBvZiB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy53YWl0aW5nUGFydGljaXBhbnRzIC0gQW4gYXJyYXkgb2YgcGFydGljaXBhbnRzIGN1cnJlbnRseSBpbiB0aGUgd2FpdGluZyByb29tLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVdhaXRpbmdSb29tTGlzdCAtIEEgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzIGxpc3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlVG90YWxSZXFXYWl0IC0gQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHRvdGFsIGNvdW50IG9mIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB1cGRhdGVzIGFyZSBjb21wbGV0ZS5cbiAgICovXG4gIGFsbFdhaXRpbmdSb29tTWVtYmVycyA9IGFzeW5jICh7XG4gICAgd2FpdGluZ1BhcnRpY2lwYW50cyxcbiAgICB1cGRhdGVXYWl0aW5nUm9vbUxpc3QsXG4gICAgdXBkYXRlVG90YWxSZXFXYWl0LFxuICB9OiBBbGxXYWl0aW5nUm9vbU1lbWJlcnNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSB0b3RhbCBudW1iZXIgb2Ygd2FpdGluZyByb29tIHBhcnRpY2lwYW50c1xuICAgIGNvbnN0IHRvdGFsUmVxcyA9IHdhaXRpbmdQYXJ0aWNpcGFudHMubGVuZ3RoO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzIGxpc3RcbiAgICB1cGRhdGVXYWl0aW5nUm9vbUxpc3Qod2FpdGluZ1BhcnRpY2lwYW50cyk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHRvdGFsIGNvdW50IG9mIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHNcbiAgICB1cGRhdGVUb3RhbFJlcVdhaXQodG90YWxSZXFzKTtcbiAgfTtcbn1cbiJdfQ==