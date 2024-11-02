import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Launches the recording process based on various conditions and updates the UI accordingly.
 *
 * @param {LaunchRecordingOptions} options - The options for launching the recording.
 * @param {Function} options.updateIsRecordingModalVisible - Function to update the visibility of the recording modal.
 * @param {boolean} options.isRecordingModalVisible - Indicates if the recording modal is currently visible.
 * @param {Function} [options.showAlert] - Optional function to show an alert message.
 * @param {boolean} options.stopLaunchRecord - Indicates if the recording launch should be stopped.
 * @param {boolean} options.canLaunchRecord - Indicates if the recording can be launched.
 * @param {boolean} options.recordingAudioSupport - Indicates if audio recording is supported.
 * @param {boolean} options.recordingVideoSupport - Indicates if video recording is supported.
 * @param {Function} options.updateCanRecord - Function to update the recording capability.
 * @param {Function} options.updateClearedToRecord - Function to update the cleared-to-record status.
 * @param {boolean} options.recordStarted - Indicates if the recording has started.
 * @param {boolean} options.recordPaused - Indicates if the recording is paused.
 * @param {boolean} options.localUIMode - Indicates if the local UI mode is active.
 *
 * @returns {void}
 *
 * @throws Will show an alert if:
 * - The recording has already ended or the user is not allowed to record.
 * - The recording initiation is not allowed due to insufficient permissions.
 * - The recording is currently running and cannot be reconfigured unless paused.
 *
 * @example
 * ```typescript
 * const options: LaunchRecordingOptions = {
 *   updateIsRecordingModalVisible: (visible) => { /* update visibility logic *\/ },
 *   isRecordingModalVisible: false,
 *   showAlert: (alert) => { /* show alert logic *\/ },
 *   stopLaunchRecord: false,
 *   canLaunchRecord: true,
 *   recordingAudioSupport: true,
 *   recordingVideoSupport: true,
 *   updateCanRecord: (canRecord) => { /* update record capability *\/ },
 *   updateClearedToRecord: (cleared) => { /* update cleared status *\/ },
 *   recordStarted: false,
 *   recordPaused: false,
 *   localUIMode: false,
 * };
 * launchRecording(options);
 * ```
 */
export class LaunchRecording {
    /**
     * Launches the recording process based on various conditions and updates the UI accordingly.
     *
     * @param {Object} options - The options for launching the recording.
     * @param {Function} options.updateIsRecordingModalVisible - Function to update the visibility of the recording modal.
     * @param {boolean} options.isRecordingModalVisible - Indicates if the recording modal is currently visible.
     * @param {Function} options.showAlert - Function to show an alert message.
     * @param {boolean} options.stopLaunchRecord - Indicates if the recording launch should be stopped.
     * @param {boolean} options.canLaunchRecord - Indicates if the recording can be launched.
     * @param {boolean} options.recordingAudioSupport - Indicates if audio recording is supported.
     * @param {boolean} options.recordingVideoSupport - Indicates if video recording is supported.
     * @param {Function} options.updateCanRecord - Function to update the recording capability.
     * @param {Function} options.updateClearedToRecord - Function to update the cleared-to-record status.
     * @param {boolean} options.recordStarted - Indicates if the recording has started.
     * @param {boolean} options.recordPaused - Indicates if the recording is paused.
     * @param {boolean} options.localUIMode - Indicates if the local UI mode is active.
     *
     * @returns {void}
     */
    launchRecording({ updateIsRecordingModalVisible, isRecordingModalVisible, showAlert, stopLaunchRecord, canLaunchRecord, recordingAudioSupport, recordingVideoSupport, updateCanRecord, updateClearedToRecord, recordStarted, recordPaused, localUIMode, }) {
        // Check if recording is already launched
        if (!isRecordingModalVisible && stopLaunchRecord && !localUIMode) {
            showAlert?.({
                message: 'Recording has already ended or you are not allowed to record',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        // Check if recording initiation is allowed
        if (!isRecordingModalVisible && canLaunchRecord && !localUIMode) {
            // Check if both audio and video recording are not allowed
            if (!recordingAudioSupport && !recordingVideoSupport) {
                showAlert?.({
                    message: 'You are not allowed to record',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
            // update clearedToRecord to false
            updateClearedToRecord(false);
            // update canRecord to false
            updateCanRecord(false);
        }
        if (!isRecordingModalVisible && recordStarted) {
            if (!recordPaused) {
                showAlert?.({
                    message: 'You can only re-configure recording after pausing it',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        if (!isRecordingModalVisible &&
            !recordingAudioSupport &&
            !recordingVideoSupport &&
            !localUIMode) {
            showAlert?.({
                message: 'You are not allowed to record',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        // Update the visibility of the recording modal
        updateIsRecordingModalVisible(!isRecordingModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchRecording, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXJlY29yZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvbGF1bmNoLXJlY29yZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBdUIzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMENHO0FBTUgsTUFBTSxPQUFPLGVBQWU7SUFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUVILGVBQWUsQ0FBQyxFQUNkLDZCQUE2QixFQUM3Qix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGdCQUFnQixFQUNoQixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixZQUFZLEVBQ1osV0FBVyxHQUNZO1FBQ3ZCLHlDQUF5QztRQUN6QyxJQUFJLENBQUMsdUJBQXVCLElBQUksZ0JBQWdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqRSxTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsOERBQThEO2dCQUN2RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUVILE9BQU87UUFDVCxDQUFDO1FBRUQsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxlQUFlLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoRSwwREFBMEQ7WUFDMUQsSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDckQsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLCtCQUErQjtvQkFDeEMsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUVILE9BQU87WUFDVCxDQUFDO1lBRUQsa0NBQWtDO1lBQ2xDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLDRCQUE0QjtZQUM1QixlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUVELElBQUksQ0FBQyx1QkFBdUIsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ2xCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxzREFBc0Q7b0JBQy9ELElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFFSCxPQUFPO1lBQ1QsQ0FBQztRQUNILENBQUM7UUFFRCxJQUNFLENBQUMsdUJBQXVCO1lBQ3hCLENBQUMscUJBQXFCO1lBQ3RCLENBQUMscUJBQXFCO1lBQ3RCLENBQUMsV0FBVyxFQUNaLENBQUM7WUFDRCxTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsK0JBQStCO2dCQUN4QyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUVILE9BQU87UUFDVCxDQUFDO1FBRUQsK0NBQStDO1FBQy9DLDZCQUE2QixDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMxRCxDQUFDO3VHQTlGVSxlQUFlOzJHQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoUmVjb3JkaW5nT3B0aW9ucyB7XG4gIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgc3RvcExhdW5jaFJlY29yZDogYm9vbGVhbjtcbiAgY2FuTGF1bmNoUmVjb3JkOiBib29sZWFuO1xuICByZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ1ZpZGVvU3VwcG9ydDogYm9vbGVhbjtcbiAgdXBkYXRlQ2FuUmVjb3JkOiAoY2FuUmVjb3JkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IChjbGVhcmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIGxvY2FsVUlNb2RlOiBib29sZWFuO1xuXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTGF1bmNoUmVjb3JkaW5nVHlwZSA9IChvcHRpb25zOiBMYXVuY2hSZWNvcmRpbmdPcHRpb25zKSA9PiB2b2lkO1xuXG4vKipcbiAqIExhdW5jaGVzIHRoZSByZWNvcmRpbmcgcHJvY2VzcyBiYXNlZCBvbiB2YXJpb3VzIGNvbmRpdGlvbnMgYW5kIHVwZGF0ZXMgdGhlIFVJIGFjY29yZGluZ2x5LlxuICpcbiAqIEBwYXJhbSB7TGF1bmNoUmVjb3JkaW5nT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBsYXVuY2hpbmcgdGhlIHJlY29yZGluZy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHJlY29yZGluZyBtb2RhbC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZSAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIG1vZGFsIGlzIGN1cnJlbnRseSB2aXNpYmxlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zdG9wTGF1bmNoUmVjb3JkIC0gSW5kaWNhdGVzIGlmIHRoZSByZWNvcmRpbmcgbGF1bmNoIHNob3VsZCBiZSBzdG9wcGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmNhbkxhdW5jaFJlY29yZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGNhbiBiZSBsYXVuY2hlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQgLSBJbmRpY2F0ZXMgaWYgYXVkaW8gcmVjb3JkaW5nIGlzIHN1cHBvcnRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQgLSBJbmRpY2F0ZXMgaWYgdmlkZW8gcmVjb3JkaW5nIGlzIHN1cHBvcnRlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQ2FuUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmRpbmcgY2FwYWJpbGl0eS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjbGVhcmVkLXRvLXJlY29yZCBzdGF0dXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucmVjb3JkU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGhhcyBzdGFydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnJlY29yZFBhdXNlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGlzIHBhdXNlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5sb2NhbFVJTW9kZSAtIEluZGljYXRlcyBpZiB0aGUgbG9jYWwgVUkgbW9kZSBpcyBhY3RpdmUuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKlxuICogQHRocm93cyBXaWxsIHNob3cgYW4gYWxlcnQgaWY6XG4gKiAtIFRoZSByZWNvcmRpbmcgaGFzIGFscmVhZHkgZW5kZWQgb3IgdGhlIHVzZXIgaXMgbm90IGFsbG93ZWQgdG8gcmVjb3JkLlxuICogLSBUaGUgcmVjb3JkaW5nIGluaXRpYXRpb24gaXMgbm90IGFsbG93ZWQgZHVlIHRvIGluc3VmZmljaWVudCBwZXJtaXNzaW9ucy5cbiAqIC0gVGhlIHJlY29yZGluZyBpcyBjdXJyZW50bHkgcnVubmluZyBhbmQgY2Fubm90IGJlIHJlY29uZmlndXJlZCB1bmxlc3MgcGF1c2VkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBMYXVuY2hSZWNvcmRpbmdPcHRpb25zID0ge1xuICogICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGUpID0+IHsgLyogdXBkYXRlIHZpc2liaWxpdHkgbG9naWMgKlxcLyB9LFxuICogICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogZmFsc2UsXG4gKiAgIHNob3dBbGVydDogKGFsZXJ0KSA9PiB7IC8qIHNob3cgYWxlcnQgbG9naWMgKlxcLyB9LFxuICogICBzdG9wTGF1bmNoUmVjb3JkOiBmYWxzZSxcbiAqICAgY2FuTGF1bmNoUmVjb3JkOiB0cnVlLFxuICogICByZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRydWUsXG4gKiAgIHJlY29yZGluZ1ZpZGVvU3VwcG9ydDogdHJ1ZSxcbiAqICAgdXBkYXRlQ2FuUmVjb3JkOiAoY2FuUmVjb3JkKSA9PiB7IC8qIHVwZGF0ZSByZWNvcmQgY2FwYWJpbGl0eSAqXFwvIH0sXG4gKiAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZDogKGNsZWFyZWQpID0+IHsgLyogdXBkYXRlIGNsZWFyZWQgc3RhdHVzICpcXC8gfSxcbiAqICAgcmVjb3JkU3RhcnRlZDogZmFsc2UsXG4gKiAgIHJlY29yZFBhdXNlZDogZmFsc2UsXG4gKiAgIGxvY2FsVUlNb2RlOiBmYWxzZSxcbiAqIH07XG4gKiBsYXVuY2hSZWNvcmRpbmcob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXVuY2hSZWNvcmRpbmcge1xuICAvKipcbiAgICogTGF1bmNoZXMgdGhlIHJlY29yZGluZyBwcm9jZXNzIGJhc2VkIG9uIHZhcmlvdXMgY29uZGl0aW9ucyBhbmQgdXBkYXRlcyB0aGUgVUkgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGxhdW5jaGluZyB0aGUgcmVjb3JkaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSByZWNvcmRpbmcgbW9kYWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZSAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIG1vZGFsIGlzIGN1cnJlbnRseSB2aXNpYmxlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnN0b3BMYXVuY2hSZWNvcmQgLSBJbmRpY2F0ZXMgaWYgdGhlIHJlY29yZGluZyBsYXVuY2ggc2hvdWxkIGJlIHN0b3BwZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jYW5MYXVuY2hSZWNvcmQgLSBJbmRpY2F0ZXMgaWYgdGhlIHJlY29yZGluZyBjYW4gYmUgbGF1bmNoZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQgLSBJbmRpY2F0ZXMgaWYgYXVkaW8gcmVjb3JkaW5nIGlzIHN1cHBvcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnJlY29yZGluZ1ZpZGVvU3VwcG9ydCAtIEluZGljYXRlcyBpZiB2aWRlbyByZWNvcmRpbmcgaXMgc3VwcG9ydGVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUNhblJlY29yZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkaW5nIGNhcGFiaWxpdHkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjbGVhcmVkLXRvLXJlY29yZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWNvcmRTdGFydGVkIC0gSW5kaWNhdGVzIGlmIHRoZSByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWNvcmRQYXVzZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHJlY29yZGluZyBpcyBwYXVzZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5sb2NhbFVJTW9kZSAtIEluZGljYXRlcyBpZiB0aGUgbG9jYWwgVUkgbW9kZSBpcyBhY3RpdmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cblxuICBsYXVuY2hSZWNvcmRpbmcoe1xuICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLFxuICAgIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLFxuICAgIHNob3dBbGVydCxcbiAgICBzdG9wTGF1bmNoUmVjb3JkLFxuICAgIGNhbkxhdW5jaFJlY29yZCxcbiAgICByZWNvcmRpbmdBdWRpb1N1cHBvcnQsXG4gICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0LFxuICAgIHVwZGF0ZUNhblJlY29yZCxcbiAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQsXG4gICAgcmVjb3JkU3RhcnRlZCxcbiAgICByZWNvcmRQYXVzZWQsXG4gICAgbG9jYWxVSU1vZGUsXG4gIH06IExhdW5jaFJlY29yZGluZ09wdGlvbnMpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBpZiByZWNvcmRpbmcgaXMgYWxyZWFkeSBsYXVuY2hlZFxuICAgIGlmICghaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgJiYgc3RvcExhdW5jaFJlY29yZCAmJiAhbG9jYWxVSU1vZGUpIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1JlY29yZGluZyBoYXMgYWxyZWFkeSBlbmRlZCBvciB5b3UgYXJlIG5vdCBhbGxvd2VkIHRvIHJlY29yZCcsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgcmVjb3JkaW5nIGluaXRpYXRpb24gaXMgYWxsb3dlZFxuICAgIGlmICghaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgJiYgY2FuTGF1bmNoUmVjb3JkICYmICFsb2NhbFVJTW9kZSkge1xuICAgICAgLy8gQ2hlY2sgaWYgYm90aCBhdWRpbyBhbmQgdmlkZW8gcmVjb3JkaW5nIGFyZSBub3QgYWxsb3dlZFxuICAgICAgaWYgKCFyZWNvcmRpbmdBdWRpb1N1cHBvcnQgJiYgIXJlY29yZGluZ1ZpZGVvU3VwcG9ydCkge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gcmVjb3JkJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgY2xlYXJlZFRvUmVjb3JkIHRvIGZhbHNlXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQoZmFsc2UpO1xuICAgICAgLy8gdXBkYXRlIGNhblJlY29yZCB0byBmYWxzZVxuICAgICAgdXBkYXRlQ2FuUmVjb3JkKGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlICYmIHJlY29yZFN0YXJ0ZWQpIHtcbiAgICAgIGlmICghcmVjb3JkUGF1c2VkKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbiBvbmx5IHJlLWNvbmZpZ3VyZSByZWNvcmRpbmcgYWZ0ZXIgcGF1c2luZyBpdCcsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAhaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgJiZcbiAgICAgICFyZWNvcmRpbmdBdWRpb1N1cHBvcnQgJiZcbiAgICAgICFyZWNvcmRpbmdWaWRlb1N1cHBvcnQgJiZcbiAgICAgICFsb2NhbFVJTW9kZVxuICAgICkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byByZWNvcmQnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcmVjb3JkaW5nIG1vZGFsXG4gICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoIWlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19