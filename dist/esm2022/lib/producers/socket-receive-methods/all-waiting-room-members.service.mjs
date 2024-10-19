import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLXdhaXRpbmctcm9vbS1tZW1iZXJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYWxsLXdhaXRpbmctcm9vbS1tZW1iZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFjM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQzs7Ozs7Ozs7T0FRRztJQUNILHFCQUFxQixHQUFHLEtBQUssRUFBRSxFQUM3QixtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLGtCQUFrQixHQUNXLEVBQWlCLEVBQUU7UUFDaEQsMERBQTBEO1FBQzFELE1BQU0sU0FBUyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztRQUU3Qyw0Q0FBNEM7UUFDNUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUUzQyxzREFBc0Q7UUFDdEQsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO3VHQXZCUyxxQkFBcUI7MkdBQXJCLHFCQUFxQixjQUZwQixNQUFNOzsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIEFsbFdhaXRpbmdSb29tTWVtYmVyc09wdGlvbnMge1xuICB3YWl0aW5nUGFydGljaXBhbnRzOiBXYWl0aW5nUm9vbVBhcnRpY2lwYW50W107XG4gIHVwZGF0ZVdhaXRpbmdSb29tTGlzdDogKHBhcnRpY2lwYW50czogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVUb3RhbFJlcVdhaXQ6ICh0b3RhbFJlcXM6IG51bWJlcikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQWxsV2FpdGluZ1Jvb21NZW1iZXJzVHlwZSA9IChvcHRpb25zOiBBbGxXYWl0aW5nUm9vbU1lbWJlcnNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWxsV2FpdGluZ1Jvb21NZW1iZXJzIHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMgbGlzdCBhbmQgdGhlIHRvdGFsIGNvdW50IG9mIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLndhaXRpbmdQYXJ0aWNpcGFudHMgLSBBbiBhcnJheSBvZiBwYXJ0aWNpcGFudHMgY3VycmVudGx5IGluIHRoZSB3YWl0aW5nIHJvb20uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlV2FpdGluZ1Jvb21MaXN0IC0gQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMgbGlzdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVUb3RhbFJlcVdhaXQgLSBBIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdG90YWwgY291bnQgb2Ygd2FpdGluZyByb29tIHBhcnRpY2lwYW50cy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHVwZGF0ZXMgYXJlIGNvbXBsZXRlLlxuICAgKi9cbiAgYWxsV2FpdGluZ1Jvb21NZW1iZXJzID0gYXN5bmMgKHtcbiAgICB3YWl0aW5nUGFydGljaXBhbnRzLFxuICAgIHVwZGF0ZVdhaXRpbmdSb29tTGlzdCxcbiAgICB1cGRhdGVUb3RhbFJlcVdhaXQsXG4gIH06IEFsbFdhaXRpbmdSb29tTWVtYmVyc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBDYWxjdWxhdGUgdGhlIHRvdGFsIG51bWJlciBvZiB3YWl0aW5nIHJvb20gcGFydGljaXBhbnRzXG4gICAgY29uc3QgdG90YWxSZXFzID0gd2FpdGluZ1BhcnRpY2lwYW50cy5sZW5ndGg7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHdhaXRpbmcgcm9vbSBwYXJ0aWNpcGFudHMgbGlzdFxuICAgIHVwZGF0ZVdhaXRpbmdSb29tTGlzdCh3YWl0aW5nUGFydGljaXBhbnRzKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgdG90YWwgY291bnQgb2Ygd2FpdGluZyByb29tIHBhcnRpY2lwYW50c1xuICAgIHVwZGF0ZVRvdGFsUmVxV2FpdCh0b3RhbFJlcXMpO1xuICB9O1xufVxuIl19