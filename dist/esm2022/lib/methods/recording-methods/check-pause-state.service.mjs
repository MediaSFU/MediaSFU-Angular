import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CheckPauseState {
    /**
     * Checks if the recording can be paused based on the current pause count and the allowed pause limits.
     *
     * @param {Object} options - The options for checking the pause state.
     * @param {string} options.recordingMediaOptions - The type of media being recorded ("video" or "audio").
     * @param {number} options.recordingVideoPausesLimit - The maximum number of pauses allowed for video recordings.
     * @param {number} options.recordingAudioPausesLimit - The maximum number of pauses allowed for audio recordings.
     * @param {number} options.pauseRecordCount - The current count of pauses that have been made.
     * @param {Function} options.showAlert - A function to show an alert message if the pause limit is reached.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the recording can be paused, otherwise `false`.
     */
    checkPauseState = async ({ recordingMediaOptions, recordingVideoPausesLimit, recordingAudioPausesLimit, pauseRecordCount, showAlert, }) => {
        // function to check if the user can pause recording
        let ref_limit = 0;
        if (recordingMediaOptions == 'video') {
            ref_limit = recordingVideoPausesLimit;
        }
        else {
            ref_limit = recordingAudioPausesLimit;
        }
        if (pauseRecordCount < ref_limit) {
            return true;
        }
        else {
            showAlert?.({
                message: 'You have reached the limit of pauses - you can choose to stop recording.',
                type: 'danger',
                duration: 3000,
            });
            return false;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckPauseState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckPauseState, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckPauseState, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stcGF1c2Utc3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2NoZWNrLXBhdXNlLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFpQjNDLE1BQU0sT0FBTyxlQUFlO0lBQzFCOzs7Ozs7Ozs7O09BVUc7SUFFSCxlQUFlLEdBQUcsS0FBSyxFQUFFLEVBQ3ZCLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIseUJBQXlCLEVBQ3pCLGdCQUFnQixFQUNoQixTQUFTLEdBQ2MsRUFBb0IsRUFBRTtRQUM3QyxvREFBb0Q7UUFDcEQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUkscUJBQXFCLElBQUksT0FBTyxFQUFFLENBQUM7WUFDckMsU0FBUyxHQUFHLHlCQUF5QixDQUFDO1FBQ3hDLENBQUM7YUFBTSxDQUFDO1lBQ04sU0FBUyxHQUFHLHlCQUF5QixDQUFDO1FBQ3hDLENBQUM7UUFFRCxJQUFJLGdCQUFnQixHQUFHLFNBQVMsRUFBRSxDQUFDO1lBQ2pDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQzthQUFNLENBQUM7WUFDTixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsMEVBQTBFO2dCQUNuRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUVILE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F2Q1MsZUFBZTsyR0FBZixlQUFlLGNBRmQsTUFBTTs7MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENoZWNrUGF1c2VTdGF0ZU9wdGlvbnMge1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZzsgLy8gXCJ2aWRlb1wiIHwgXCJhdWRpb1wiXG4gIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IG51bWJlcjtcbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogbnVtYmVyO1xuICBwYXVzZVJlY29yZENvdW50OiBudW1iZXI7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ2hlY2tQYXVzZVN0YXRlVHlwZSA9IChvcHRpb25zOiBDaGVja1BhdXNlU3RhdGVPcHRpb25zKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tQYXVzZVN0YXRlIHtcbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgcmVjb3JkaW5nIGNhbiBiZSBwYXVzZWQgYmFzZWQgb24gdGhlIGN1cnJlbnQgcGF1c2UgY291bnQgYW5kIHRoZSBhbGxvd2VkIHBhdXNlIGxpbWl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY2hlY2tpbmcgdGhlIHBhdXNlIHN0YXRlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUaGUgdHlwZSBvZiBtZWRpYSBiZWluZyByZWNvcmRlZCAoXCJ2aWRlb1wiIG9yIFwiYXVkaW9cIikuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcGF1c2VzIGFsbG93ZWQgZm9yIHZpZGVvIHJlY29yZGluZ3MuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcGF1c2VzIGFsbG93ZWQgZm9yIGF1ZGlvIHJlY29yZGluZ3MuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhdXNlUmVjb3JkQ291bnQgLSBUaGUgY3VycmVudCBjb3VudCBvZiBwYXVzZXMgdGhhdCBoYXZlIGJlZW4gbWFkZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zaG93QWxlcnQgLSBBIGZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZSBpZiB0aGUgcGF1c2UgbGltaXQgaXMgcmVhY2hlZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYHRydWVgIGlmIHRoZSByZWNvcmRpbmcgY2FuIGJlIHBhdXNlZCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gICAqL1xuXG4gIGNoZWNrUGF1c2VTdGF0ZSA9IGFzeW5jICh7XG4gICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQsXG4gICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCxcbiAgICBwYXVzZVJlY29yZENvdW50LFxuICAgIHNob3dBbGVydCxcbiAgfTogQ2hlY2tQYXVzZVN0YXRlT3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIC8vIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSB1c2VyIGNhbiBwYXVzZSByZWNvcmRpbmdcbiAgICBsZXQgcmVmX2xpbWl0ID0gMDtcbiAgICBpZiAocmVjb3JkaW5nTWVkaWFPcHRpb25zID09ICd2aWRlbycpIHtcbiAgICAgIHJlZl9saW1pdCA9IHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlZl9saW1pdCA9IHJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ7XG4gICAgfVxuXG4gICAgaWYgKHBhdXNlUmVjb3JkQ291bnQgPCByZWZfbGltaXQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgaGF2ZSByZWFjaGVkIHRoZSBsaW1pdCBvZiBwYXVzZXMgLSB5b3UgY2FuIGNob29zZSB0byBzdG9wIHJlY29yZGluZy4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==