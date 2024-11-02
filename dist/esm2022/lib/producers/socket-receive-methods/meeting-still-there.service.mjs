import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle the "still there?" check in a meeting by showing a confirmation modal.
 *
 * @class
 * @name MeetingStillThere
 * @description
 * This service provides a method to display a "still there?" confirmation modal to check if participants are still active in the meeting.
 *
 * @method
 * meetingStillThere
 *
 * @param {MeetingStillThereOptions} options - Options for managing the modal visibility:
 *   - `updateIsConfirmHereModalVisible` {Function}: Function to set the visibility of the "still there?" confirmation modal.
 *
 * @returns {Promise<void>} Updates modal visibility when checking if the user is still present.
 *
 * @example
 * const options = {
 *   updateIsConfirmHereModalVisible: (isVisible) => console.log(`Modal visibility: ${isVisible}`),
 * };
 * meetingStillThereService.meetingStillThere(options);
 * // Output: Sets and logs modal visibility to true
 */
export class MeetingStillThere {
    /**
     * Handles the "still there?" meeting check by updating the visibility of the confirmation modal.
     *
     * @param {Object} options - The options for the meeting still there check.
     * @param {Function} options.updateIsConfirmHereModalVisible - Function to update the visibility of the "still there?" modal.
     * @returns {Promise<void>} A promise that resolves when the modal visibility is updated.
     */
    meetingStillThere = ({ updateIsConfirmHereModalVisible }) => {
        // Update the visibility of the "still there?" modal
        updateIsConfirmHereModalVisible(true);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingStillThere, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingStillThere, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingStillThere, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1zdGlsbC10aGVyZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctc3RpbGwtdGhlcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVEzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUtILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7Ozs7OztPQU1HO0lBQ0gsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFLCtCQUErQixFQUE0QixFQUFRLEVBQUU7UUFDMUYsb0RBQW9EO1FBQ3BELCtCQUErQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQzt1R0FYUyxpQkFBaUI7MkdBQWpCLGlCQUFpQixjQUZoQixNQUFNOzsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBNZWV0aW5nU3RpbGxUaGVyZU9wdGlvbnMge1xuICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBNZWV0aW5nU3RpbGxUaGVyZVR5cGUgPSAob3B0aW9uczogTWVldGluZ1N0aWxsVGhlcmVPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaGFuZGxlIHRoZSBcInN0aWxsIHRoZXJlP1wiIGNoZWNrIGluIGEgbWVldGluZyBieSBzaG93aW5nIGEgY29uZmlybWF0aW9uIG1vZGFsLlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgTWVldGluZ1N0aWxsVGhlcmVcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIGEgbWV0aG9kIHRvIGRpc3BsYXkgYSBcInN0aWxsIHRoZXJlP1wiIGNvbmZpcm1hdGlvbiBtb2RhbCB0byBjaGVjayBpZiBwYXJ0aWNpcGFudHMgYXJlIHN0aWxsIGFjdGl2ZSBpbiB0aGUgbWVldGluZy5cbiAqXG4gKiBAbWV0aG9kXG4gKiBtZWV0aW5nU3RpbGxUaGVyZVxuICpcbiAqIEBwYXJhbSB7TWVldGluZ1N0aWxsVGhlcmVPcHRpb25zfSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgbWFuYWdpbmcgdGhlIG1vZGFsIHZpc2liaWxpdHk6XG4gKiAgIC0gYHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGVgIHtGdW5jdGlvbn06IEZ1bmN0aW9uIHRvIHNldCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgXCJzdGlsbCB0aGVyZT9cIiBjb25maXJtYXRpb24gbW9kYWwuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFVwZGF0ZXMgbW9kYWwgdmlzaWJpbGl0eSB3aGVuIGNoZWNraW5nIGlmIHRoZSB1c2VyIGlzIHN0aWxsIHByZXNlbnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGU6IChpc1Zpc2libGUpID0+IGNvbnNvbGUubG9nKGBNb2RhbCB2aXNpYmlsaXR5OiAke2lzVmlzaWJsZX1gKSxcbiAqIH07XG4gKiBtZWV0aW5nU3RpbGxUaGVyZVNlcnZpY2UubWVldGluZ1N0aWxsVGhlcmUob3B0aW9ucyk7XG4gKiAvLyBPdXRwdXQ6IFNldHMgYW5kIGxvZ3MgbW9kYWwgdmlzaWJpbGl0eSB0byB0cnVlXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE1lZXRpbmdTdGlsbFRoZXJlIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIFwic3RpbGwgdGhlcmU/XCIgbWVldGluZyBjaGVjayBieSB1cGRhdGluZyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgY29uZmlybWF0aW9uIG1vZGFsLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgbWVldGluZyBzdGlsbCB0aGVyZSBjaGVjay5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBcInN0aWxsIHRoZXJlP1wiIG1vZGFsLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbW9kYWwgdmlzaWJpbGl0eSBpcyB1cGRhdGVkLlxuICAgKi9cbiAgbWVldGluZ1N0aWxsVGhlcmUgPSAoeyB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlIH06IE1lZXRpbmdTdGlsbFRoZXJlT3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgIC8vIFVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgXCJzdGlsbCB0aGVyZT9cIiBtb2RhbFxuICAgIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUodHJ1ZSk7XG4gIH07XG59XG4iXX0=