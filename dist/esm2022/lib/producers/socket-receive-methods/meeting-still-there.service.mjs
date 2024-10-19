import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1zdGlsbC10aGVyZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctc3RpbGwtdGhlcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVUzQyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCOzs7Ozs7T0FNRztJQUNILGlCQUFpQixHQUFHLENBQUMsRUFBRSwrQkFBK0IsRUFBNEIsRUFBUSxFQUFFO1FBQzFGLG9EQUFvRDtRQUNwRCwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7dUdBWFMsaUJBQWlCOzJHQUFqQixpQkFBaUIsY0FGaEIsTUFBTTs7MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTWVldGluZ1N0aWxsVGhlcmVPcHRpb25zIHtcbiAgdXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTWVldGluZ1N0aWxsVGhlcmVUeXBlID0gKG9wdGlvbnM6IE1lZXRpbmdTdGlsbFRoZXJlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNZWV0aW5nU3RpbGxUaGVyZSB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBcInN0aWxsIHRoZXJlP1wiIG1lZXRpbmcgY2hlY2sgYnkgdXBkYXRpbmcgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGNvbmZpcm1hdGlvbiBtb2RhbC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIG1lZXRpbmcgc3RpbGwgdGhlcmUgY2hlY2suXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgXCJzdGlsbCB0aGVyZT9cIiBtb2RhbC5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1vZGFsIHZpc2liaWxpdHkgaXMgdXBkYXRlZC5cbiAgICovXG4gIG1lZXRpbmdTdGlsbFRoZXJlID0gKHsgdXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSB9OiBNZWV0aW5nU3RpbGxUaGVyZU9wdGlvbnMpOiB2b2lkID0+IHtcbiAgICAvLyBVcGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIFwic3RpbGwgdGhlcmU/XCIgbW9kYWxcbiAgICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlKHRydWUpO1xuICB9O1xufVxuIl19