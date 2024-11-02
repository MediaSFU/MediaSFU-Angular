import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Checks if the recording can be paused based on the current pause count and the allowed pause limits.
 *
 * @param {CheckPauseStateOptions} options - The options for checking the pause state.
 * @param {string} options.recordingMediaOptions - The type of media being recorded ("video" or "audio").
 * @param {number} options.recordingVideoPausesLimit - The maximum number of pauses allowed for video recordings.
 * @param {number} options.recordingAudioPausesLimit - The maximum number of pauses allowed for audio recordings.
 * @param {number} options.pauseRecordCount - The current count of pauses that have been made.
 * @param {Function} [options.showAlert] - A function to show an alert message if the pause limit is reached.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the recording can be paused, otherwise `false`.
 *
 * @example
 * ```typescript
 * const checkPauseStateService = new CheckPauseState();
 * const canPause = await checkPauseStateService.checkPauseState({
 *   recordingMediaOptions: 'video',
 *   recordingVideoPausesLimit: 3,
 *   recordingAudioPausesLimit: 5,
 *   pauseRecordCount: 2,
 *   showAlert: (alert) => console.log(alert.message),
 * });
 * console.log('Can pause recording:', canPause);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stcGF1c2Utc3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2NoZWNrLXBhdXNlLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFlM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBTUgsTUFBTSxPQUFPLGVBQWU7SUFDMUI7Ozs7Ozs7Ozs7T0FVRztJQUVILGVBQWUsR0FBRyxLQUFLLEVBQUUsRUFDdkIscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsZ0JBQWdCLEVBQ2hCLFNBQVMsR0FDYyxFQUFvQixFQUFFO1FBQzdDLG9EQUFvRDtRQUNwRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxxQkFBcUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNyQyxTQUFTLEdBQUcseUJBQXlCLENBQUM7UUFDeEMsQ0FBQzthQUFNLENBQUM7WUFDTixTQUFTLEdBQUcseUJBQXlCLENBQUM7UUFDeEMsQ0FBQztRQUVELElBQUksZ0JBQWdCLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO2FBQU0sQ0FBQztZQUNOLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSwwRUFBMEU7Z0JBQ25GLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQXZDUyxlQUFlOzJHQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hlY2tQYXVzZVN0YXRlT3B0aW9ucyB7XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nOyAvLyBcInZpZGVvXCIgfCBcImF1ZGlvXCJcbiAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogbnVtYmVyO1xuICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0OiBudW1iZXI7XG4gIHBhdXNlUmVjb3JkQ291bnQ6IG51bWJlcjtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDaGVja1BhdXNlU3RhdGVUeXBlID0gKG9wdGlvbnM6IENoZWNrUGF1c2VTdGF0ZU9wdGlvbnMpID0+IFByb21pc2U8Ym9vbGVhbj47XG5cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHJlY29yZGluZyBjYW4gYmUgcGF1c2VkIGJhc2VkIG9uIHRoZSBjdXJyZW50IHBhdXNlIGNvdW50IGFuZCB0aGUgYWxsb3dlZCBwYXVzZSBsaW1pdHMuXG4gKlxuICogQHBhcmFtIHtDaGVja1BhdXNlU3RhdGVPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNoZWNraW5nIHRoZSBwYXVzZSBzdGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlY29yZGluZ01lZGlhT3B0aW9ucyAtIFRoZSB0eXBlIG9mIG1lZGlhIGJlaW5nIHJlY29yZGVkIChcInZpZGVvXCIgb3IgXCJhdWRpb1wiKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcGF1c2VzIGFsbG93ZWQgZm9yIHZpZGVvIHJlY29yZGluZ3MuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHBhdXNlcyBhbGxvd2VkIGZvciBhdWRpbyByZWNvcmRpbmdzLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGF1c2VSZWNvcmRDb3VudCAtIFRoZSBjdXJyZW50IGNvdW50IG9mIHBhdXNlcyB0aGF0IGhhdmUgYmVlbiBtYWRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIEEgZnVuY3Rpb24gdG8gc2hvdyBhbiBhbGVydCBtZXNzYWdlIGlmIHRoZSBwYXVzZSBsaW1pdCBpcyByZWFjaGVkLlxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGB0cnVlYCBpZiB0aGUgcmVjb3JkaW5nIGNhbiBiZSBwYXVzZWQsIG90aGVyd2lzZSBgZmFsc2VgLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBjaGVja1BhdXNlU3RhdGVTZXJ2aWNlID0gbmV3IENoZWNrUGF1c2VTdGF0ZSgpO1xuICogY29uc3QgY2FuUGF1c2UgPSBhd2FpdCBjaGVja1BhdXNlU3RhdGVTZXJ2aWNlLmNoZWNrUGF1c2VTdGF0ZSh7XG4gKiAgIHJlY29yZGluZ01lZGlhT3B0aW9uczogJ3ZpZGVvJyxcbiAqICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogMyxcbiAqICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogNSxcbiAqICAgcGF1c2VSZWNvcmRDb3VudDogMixcbiAqICAgc2hvd0FsZXJ0OiAoYWxlcnQpID0+IGNvbnNvbGUubG9nKGFsZXJ0Lm1lc3NhZ2UpLFxuICogfSk7XG4gKiBjb25zb2xlLmxvZygnQ2FuIHBhdXNlIHJlY29yZGluZzonLCBjYW5QYXVzZSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja1BhdXNlU3RhdGUge1xuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSByZWNvcmRpbmcgY2FuIGJlIHBhdXNlZCBiYXNlZCBvbiB0aGUgY3VycmVudCBwYXVzZSBjb3VudCBhbmQgdGhlIGFsbG93ZWQgcGF1c2UgbGltaXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjaGVja2luZyB0aGUgcGF1c2Ugc3RhdGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlY29yZGluZ01lZGlhT3B0aW9ucyAtIFRoZSB0eXBlIG9mIG1lZGlhIGJlaW5nIHJlY29yZGVkIChcInZpZGVvXCIgb3IgXCJhdWRpb1wiKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBwYXVzZXMgYWxsb3dlZCBmb3IgdmlkZW8gcmVjb3JkaW5ncy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBwYXVzZXMgYWxsb3dlZCBmb3IgYXVkaW8gcmVjb3JkaW5ncy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGF1c2VSZWNvcmRDb3VudCAtIFRoZSBjdXJyZW50IGNvdW50IG9mIHBhdXNlcyB0aGF0IGhhdmUgYmVlbiBtYWRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNob3dBbGVydCAtIEEgZnVuY3Rpb24gdG8gc2hvdyBhbiBhbGVydCBtZXNzYWdlIGlmIHRoZSBwYXVzZSBsaW1pdCBpcyByZWFjaGVkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBgdHJ1ZWAgaWYgdGhlIHJlY29yZGluZyBjYW4gYmUgcGF1c2VkLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAgICovXG5cbiAgY2hlY2tQYXVzZVN0YXRlID0gYXN5bmMgKHtcbiAgICByZWNvcmRpbmdNZWRpYU9wdGlvbnMsXG4gICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdCxcbiAgICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0LFxuICAgIHBhdXNlUmVjb3JkQ291bnQsXG4gICAgc2hvd0FsZXJ0LFxuICB9OiBDaGVja1BhdXNlU3RhdGVPcHRpb25zKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgLy8gZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIHVzZXIgY2FuIHBhdXNlIHJlY29yZGluZ1xuICAgIGxldCByZWZfbGltaXQgPSAwO1xuICAgIGlmIChyZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT0gJ3ZpZGVvJykge1xuICAgICAgcmVmX2xpbWl0ID0gcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmX2xpbWl0ID0gcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDtcbiAgICB9XG5cbiAgICBpZiAocGF1c2VSZWNvcmRDb3VudCA8IHJlZl9saW1pdCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBoYXZlIHJlYWNoZWQgdGhlIGxpbWl0IG9mIHBhdXNlcyAtIHlvdSBjYW4gY2hvb3NlIHRvIHN0b3AgcmVjb3JkaW5nLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIl19