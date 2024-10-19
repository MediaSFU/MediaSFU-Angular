import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXJlY29yZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvbGF1bmNoLXJlY29yZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBMEIzQyxNQUFNLE9BQU8sZUFBZTtJQUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBRUgsZUFBZSxDQUFDLEVBQ2QsNkJBQTZCLEVBQzdCLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFlBQVksRUFDWixXQUFXLEdBQ1k7UUFDdkIseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pFLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSw4REFBOEQ7Z0JBQ3ZFLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsT0FBTztRQUNULENBQUM7UUFFRCwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLHVCQUF1QixJQUFJLGVBQWUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hFLDBEQUEwRDtZQUMxRCxJQUFJLENBQUMscUJBQXFCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUNyRCxTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsK0JBQStCO29CQUN4QyxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7Z0JBRUgsT0FBTztZQUNULENBQUM7WUFFRCxrQ0FBa0M7WUFDbEMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsNEJBQTRCO1lBQzVCLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBRUQsSUFBSSxDQUFDLHVCQUF1QixJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDbEIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLHNEQUFzRDtvQkFDL0QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUVILE9BQU87WUFDVCxDQUFDO1FBQ0gsQ0FBQztRQUVELElBQ0UsQ0FBQyx1QkFBdUI7WUFDeEIsQ0FBQyxxQkFBcUI7WUFDdEIsQ0FBQyxxQkFBcUI7WUFDdEIsQ0FBQyxXQUFXLEVBQ1osQ0FBQztZQUNELFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSwrQkFBK0I7Z0JBQ3hDLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsT0FBTztRQUNULENBQUM7UUFFRCwrQ0FBK0M7UUFDL0MsNkJBQTZCLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzFELENBQUM7dUdBOUZVLGVBQWU7MkdBQWYsZUFBZSxjQUZkLE1BQU07OzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hSZWNvcmRpbmdPcHRpb25zIHtcbiAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6ICh2aXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBzdG9wTGF1bmNoUmVjb3JkOiBib29sZWFuO1xuICBjYW5MYXVuY2hSZWNvcmQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ0F1ZGlvU3VwcG9ydDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiBib29sZWFuO1xuICB1cGRhdGVDYW5SZWNvcmQ6IChjYW5SZWNvcmQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUNsZWFyZWRUb1JlY29yZDogKGNsZWFyZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHJlY29yZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgbG9jYWxVSU1vZGU6IGJvb2xlYW47XG5cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBMYXVuY2hSZWNvcmRpbmdUeXBlID0gKG9wdGlvbnM6IExhdW5jaFJlY29yZGluZ09wdGlvbnMpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXVuY2hSZWNvcmRpbmcge1xuICAvKipcbiAgICogTGF1bmNoZXMgdGhlIHJlY29yZGluZyBwcm9jZXNzIGJhc2VkIG9uIHZhcmlvdXMgY29uZGl0aW9ucyBhbmQgdXBkYXRlcyB0aGUgVUkgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGxhdW5jaGluZyB0aGUgcmVjb3JkaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSByZWNvcmRpbmcgbW9kYWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZSAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIG1vZGFsIGlzIGN1cnJlbnRseSB2aXNpYmxlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnN0b3BMYXVuY2hSZWNvcmQgLSBJbmRpY2F0ZXMgaWYgdGhlIHJlY29yZGluZyBsYXVuY2ggc2hvdWxkIGJlIHN0b3BwZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jYW5MYXVuY2hSZWNvcmQgLSBJbmRpY2F0ZXMgaWYgdGhlIHJlY29yZGluZyBjYW4gYmUgbGF1bmNoZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQgLSBJbmRpY2F0ZXMgaWYgYXVkaW8gcmVjb3JkaW5nIGlzIHN1cHBvcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnJlY29yZGluZ1ZpZGVvU3VwcG9ydCAtIEluZGljYXRlcyBpZiB2aWRlbyByZWNvcmRpbmcgaXMgc3VwcG9ydGVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUNhblJlY29yZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVjb3JkaW5nIGNhcGFiaWxpdHkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjbGVhcmVkLXRvLXJlY29yZCBzdGF0dXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWNvcmRTdGFydGVkIC0gSW5kaWNhdGVzIGlmIHRoZSByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWNvcmRQYXVzZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHJlY29yZGluZyBpcyBwYXVzZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5sb2NhbFVJTW9kZSAtIEluZGljYXRlcyBpZiB0aGUgbG9jYWwgVUkgbW9kZSBpcyBhY3RpdmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cblxuICBsYXVuY2hSZWNvcmRpbmcoe1xuICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLFxuICAgIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLFxuICAgIHNob3dBbGVydCxcbiAgICBzdG9wTGF1bmNoUmVjb3JkLFxuICAgIGNhbkxhdW5jaFJlY29yZCxcbiAgICByZWNvcmRpbmdBdWRpb1N1cHBvcnQsXG4gICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0LFxuICAgIHVwZGF0ZUNhblJlY29yZCxcbiAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQsXG4gICAgcmVjb3JkU3RhcnRlZCxcbiAgICByZWNvcmRQYXVzZWQsXG4gICAgbG9jYWxVSU1vZGUsXG4gIH06IExhdW5jaFJlY29yZGluZ09wdGlvbnMpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBpZiByZWNvcmRpbmcgaXMgYWxyZWFkeSBsYXVuY2hlZFxuICAgIGlmICghaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgJiYgc3RvcExhdW5jaFJlY29yZCAmJiAhbG9jYWxVSU1vZGUpIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1JlY29yZGluZyBoYXMgYWxyZWFkeSBlbmRlZCBvciB5b3UgYXJlIG5vdCBhbGxvd2VkIHRvIHJlY29yZCcsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgcmVjb3JkaW5nIGluaXRpYXRpb24gaXMgYWxsb3dlZFxuICAgIGlmICghaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgJiYgY2FuTGF1bmNoUmVjb3JkICYmICFsb2NhbFVJTW9kZSkge1xuICAgICAgLy8gQ2hlY2sgaWYgYm90aCBhdWRpbyBhbmQgdmlkZW8gcmVjb3JkaW5nIGFyZSBub3QgYWxsb3dlZFxuICAgICAgaWYgKCFyZWNvcmRpbmdBdWRpb1N1cHBvcnQgJiYgIXJlY29yZGluZ1ZpZGVvU3VwcG9ydCkge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gcmVjb3JkJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgY2xlYXJlZFRvUmVjb3JkIHRvIGZhbHNlXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQoZmFsc2UpO1xuICAgICAgLy8gdXBkYXRlIGNhblJlY29yZCB0byBmYWxzZVxuICAgICAgdXBkYXRlQ2FuUmVjb3JkKGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlICYmIHJlY29yZFN0YXJ0ZWQpIHtcbiAgICAgIGlmICghcmVjb3JkUGF1c2VkKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbiBvbmx5IHJlLWNvbmZpZ3VyZSByZWNvcmRpbmcgYWZ0ZXIgcGF1c2luZyBpdCcsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAhaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgJiZcbiAgICAgICFyZWNvcmRpbmdBdWRpb1N1cHBvcnQgJiZcbiAgICAgICFyZWNvcmRpbmdWaWRlb1N1cHBvcnQgJiZcbiAgICAgICFsb2NhbFVJTW9kZVxuICAgICkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byByZWNvcmQnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcmVjb3JkaW5nIG1vZGFsXG4gICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoIWlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19