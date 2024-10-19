import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CheckResumeState {
    /**
     * Checks if the recording can be resumed based on the media type and pause limits.
     *
     * @param {Object} options - The options for checking resume state.
     * @param {string} options.recordingMediaOptions - The type of media being recorded ("video" or "audio").
     * @param {number} options.recordingVideoPausesLimit - The maximum number of pauses allowed for video recording.
     * @param {number} options.recordingAudioPausesLimit - The maximum number of pauses allowed for audio recording.
     * @param {number} options.pauseRecordCount - The current number of pauses that have occurred.
     * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the recording can be resumed.
     */
    checkResumeState = async ({ recordingMediaOptions, recordingVideoPausesLimit, recordingAudioPausesLimit, pauseRecordCount, }) => {
        // function to check if the user can resume recording
        let ref_limit = 0;
        if (recordingMediaOptions == 'video') {
            ref_limit = recordingVideoPausesLimit;
        }
        else {
            ref_limit = recordingAudioPausesLimit;
        }
        return pauseRecordCount <= ref_limit;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckResumeState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckResumeState, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckResumeState, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stcmVzdW1lLXN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9jaGVjay1yZXN1bWUtc3RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWMzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7Ozs7T0FTRztJQUVILGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUN4QixxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLHlCQUF5QixFQUN6QixnQkFBZ0IsR0FDUSxFQUFvQixFQUFFO1FBQzlDLHFEQUFxRDtRQUNyRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxxQkFBcUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNyQyxTQUFTLEdBQUcseUJBQXlCLENBQUM7UUFDeEMsQ0FBQzthQUFNLENBQUM7WUFDTixTQUFTLEdBQUcseUJBQXlCLENBQUM7UUFDeEMsQ0FBQztRQUVELE9BQU8sZ0JBQWdCLElBQUksU0FBUyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQzt1R0EzQlMsZ0JBQWdCOzJHQUFoQixnQkFBZ0IsY0FGZixNQUFNOzsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBDaGVja1Jlc3VtZVN0YXRlT3B0aW9ucyB7XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nOyAvLyAndmlkZW8nIG9yICdhdWRpbydcbiAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogbnVtYmVyO1xuICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0OiBudW1iZXI7XG4gIHBhdXNlUmVjb3JkQ291bnQ6IG51bWJlcjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ2hlY2tSZXN1bWVTdGF0ZVR5cGUgPSAob3B0aW9uczogQ2hlY2tSZXN1bWVTdGF0ZU9wdGlvbnMpID0+IFByb21pc2U8Ym9vbGVhbj47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja1Jlc3VtZVN0YXRlIHtcbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgcmVjb3JkaW5nIGNhbiBiZSByZXN1bWVkIGJhc2VkIG9uIHRoZSBtZWRpYSB0eXBlIGFuZCBwYXVzZSBsaW1pdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNoZWNraW5nIHJlc3VtZSBzdGF0ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVjb3JkaW5nTWVkaWFPcHRpb25zIC0gVGhlIHR5cGUgb2YgbWVkaWEgYmVpbmcgcmVjb3JkZWQgKFwidmlkZW9cIiBvciBcImF1ZGlvXCIpLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHBhdXNlcyBhbGxvd2VkIGZvciB2aWRlbyByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcGF1c2VzIGFsbG93ZWQgZm9yIGF1ZGlvIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGF1c2VSZWNvcmRDb3VudCAtIFRoZSBjdXJyZW50IG51bWJlciBvZiBwYXVzZXMgdGhhdCBoYXZlIG9jY3VycmVkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSByZWNvcmRpbmcgY2FuIGJlIHJlc3VtZWQuXG4gICAqL1xuXG4gIGNoZWNrUmVzdW1lU3RhdGUgPSBhc3luYyAoe1xuICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0LFxuICAgIHJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQsXG4gICAgcGF1c2VSZWNvcmRDb3VudCxcbiAgfTogQ2hlY2tSZXN1bWVTdGF0ZU9wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAvLyBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgdXNlciBjYW4gcmVzdW1lIHJlY29yZGluZ1xuICAgIGxldCByZWZfbGltaXQgPSAwO1xuICAgIGlmIChyZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT0gJ3ZpZGVvJykge1xuICAgICAgcmVmX2xpbWl0ID0gcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmX2xpbWl0ID0gcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF1c2VSZWNvcmRDb3VudCA8PSByZWZfbGltaXQ7XG4gIH07XG59XG4iXX0=