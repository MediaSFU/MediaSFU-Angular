import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Checks if the recording can be resumed based on the media type and pause limits.
 *
 * @param {CheckResumeStateOptions} options - The options for checking resume state.
 * @param {string} options.recordingMediaOptions - The type of media being recorded ("video" or "audio").
 * @param {number} options.recordingVideoPausesLimit - The maximum number of pauses allowed for video recording.
 * @param {number} options.recordingAudioPausesLimit - The maximum number of pauses allowed for audio recording.
 * @param {number} options.pauseRecordCount - The current number of pauses that have occurred.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the recording can be resumed.
 *
 * @example
 * ```typescript
 * const checkResumeStateService = new CheckResumeState();
 * const canResume = await checkResumeStateService.checkResumeState({
 *   recordingMediaOptions: 'audio',
 *   recordingVideoPausesLimit: 3,
 *   recordingAudioPausesLimit: 5,
 *   pauseRecordCount: 2,
 * });
 * console.log('Can resume recording:', canResume);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stcmVzdW1lLXN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9jaGVjay1yZXN1bWUtc3RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVczQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBTUgsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQjs7Ozs7Ozs7O09BU0c7SUFFSCxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsRUFDeEIscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsZ0JBQWdCLEdBQ1EsRUFBb0IsRUFBRTtRQUM5QyxxREFBcUQ7UUFDckQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUkscUJBQXFCLElBQUksT0FBTyxFQUFFLENBQUM7WUFDckMsU0FBUyxHQUFHLHlCQUF5QixDQUFDO1FBQ3hDLENBQUM7YUFBTSxDQUFDO1lBQ04sU0FBUyxHQUFHLHlCQUF5QixDQUFDO1FBQ3hDLENBQUM7UUFFRCxPQUFPLGdCQUFnQixJQUFJLFNBQVMsQ0FBQztJQUN2QyxDQUFDLENBQUM7dUdBM0JTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgQ2hlY2tSZXN1bWVTdGF0ZU9wdGlvbnMge1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHN0cmluZzsgLy8gJ3ZpZGVvJyBvciAnYXVkaW8nXG4gIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IG51bWJlcjtcbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogbnVtYmVyO1xuICBwYXVzZVJlY29yZENvdW50OiBudW1iZXI7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENoZWNrUmVzdW1lU3RhdGVUeXBlID0gKG9wdGlvbnM6IENoZWNrUmVzdW1lU3RhdGVPcHRpb25zKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcmVjb3JkaW5nIGNhbiBiZSByZXN1bWVkIGJhc2VkIG9uIHRoZSBtZWRpYSB0eXBlIGFuZCBwYXVzZSBsaW1pdHMuXG4gKlxuICogQHBhcmFtIHtDaGVja1Jlc3VtZVN0YXRlT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjaGVja2luZyByZXN1bWUgc3RhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUaGUgdHlwZSBvZiBtZWRpYSBiZWluZyByZWNvcmRlZCAoXCJ2aWRlb1wiIG9yIFwiYXVkaW9cIikuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHBhdXNlcyBhbGxvd2VkIGZvciB2aWRlbyByZWNvcmRpbmcuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHBhdXNlcyBhbGxvd2VkIGZvciBhdWRpbyByZWNvcmRpbmcuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXVzZVJlY29yZENvdW50IC0gVGhlIGN1cnJlbnQgbnVtYmVyIG9mIHBhdXNlcyB0aGF0IGhhdmUgb2NjdXJyZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgcmVjb3JkaW5nIGNhbiBiZSByZXN1bWVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBjaGVja1Jlc3VtZVN0YXRlU2VydmljZSA9IG5ldyBDaGVja1Jlc3VtZVN0YXRlKCk7XG4gKiBjb25zdCBjYW5SZXN1bWUgPSBhd2FpdCBjaGVja1Jlc3VtZVN0YXRlU2VydmljZS5jaGVja1Jlc3VtZVN0YXRlKHtcbiAqICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiAnYXVkaW8nLFxuICogICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0OiAzLFxuICogICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0OiA1LFxuICogICBwYXVzZVJlY29yZENvdW50OiAyLFxuICogfSk7XG4gKiBjb25zb2xlLmxvZygnQ2FuIHJlc3VtZSByZWNvcmRpbmc6JywgY2FuUmVzdW1lKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrUmVzdW1lU3RhdGUge1xuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSByZWNvcmRpbmcgY2FuIGJlIHJlc3VtZWQgYmFzZWQgb24gdGhlIG1lZGlhIHR5cGUgYW5kIHBhdXNlIGxpbWl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY2hlY2tpbmcgcmVzdW1lIHN0YXRlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgLSBUaGUgdHlwZSBvZiBtZWRpYSBiZWluZyByZWNvcmRlZCAoXCJ2aWRlb1wiIG9yIFwiYXVkaW9cIikuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcGF1c2VzIGFsbG93ZWQgZm9yIHZpZGVvIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBwYXVzZXMgYWxsb3dlZCBmb3IgYXVkaW8gcmVjb3JkaW5nLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXVzZVJlY29yZENvdW50IC0gVGhlIGN1cnJlbnQgbnVtYmVyIG9mIHBhdXNlcyB0aGF0IGhhdmUgb2NjdXJyZWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHJlY29yZGluZyBjYW4gYmUgcmVzdW1lZC5cbiAgICovXG5cbiAgY2hlY2tSZXN1bWVTdGF0ZSA9IGFzeW5jICh7XG4gICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICAgIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQsXG4gICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCxcbiAgICBwYXVzZVJlY29yZENvdW50LFxuICB9OiBDaGVja1Jlc3VtZVN0YXRlT3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIC8vIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSB1c2VyIGNhbiByZXN1bWUgcmVjb3JkaW5nXG4gICAgbGV0IHJlZl9saW1pdCA9IDA7XG4gICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PSAndmlkZW8nKSB7XG4gICAgICByZWZfbGltaXQgPSByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZWZfbGltaXQgPSByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0O1xuICAgIH1cblxuICAgIHJldHVybiBwYXVzZVJlY29yZENvdW50IDw9IHJlZl9saW1pdDtcbiAgfTtcbn1cbiJdfQ==