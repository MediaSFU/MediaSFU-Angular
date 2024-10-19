import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ModifyDisplaySettings {
    /**
     * Modifies the display settings based on the provided parameters.
     *
     * @param {ModifyDisplaySettingsOptions} options - The options containing the parameters to modify the display settings.
     * @param {Object} options.parameters - The parameters for modifying the display settings.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {string} options.parameters.meetingDisplayType - The current meeting display type.
     * @param {boolean} options.parameters.autoWave - Flag indicating if auto wave is enabled.
     * @param {boolean} options.parameters.forceFullDisplay - Flag indicating if full display is forced.
     * @param {boolean} options.parameters.meetingVideoOptimized - Flag indicating if the meeting video is optimized.
     * @param {string} options.parameters.islevel - The current level of the meeting.
     * @param {boolean} options.parameters.recordStarted - Flag indicating if recording has started.
     * @param {boolean} options.parameters.recordResumed - Flag indicating if recording has resumed.
     * @param {boolean} options.parameters.recordStopped - Flag indicating if recording has stopped.
     * @param {boolean} options.parameters.recordPaused - Flag indicating if recording is paused.
     * @param {string} options.parameters.recordingDisplayType - The current recording display type.
     * @param {boolean} options.parameters.recordingVideoOptimized - Flag indicating if the recording video is optimized.
     * @param {string} options.parameters.prevForceFullDisplay - The previous force full display value.
     * @param {string} options.parameters.prevMeetingDisplayType - The previous meeting display type.
     * @param {Function} options.parameters.updateMeetingDisplayType - Function to update the meeting display type.
     * @param {Function} options.parameters.updateAutoWave - Function to update the auto wave setting.
     * @param {Function} options.parameters.updateForceFullDisplay - Function to update the force full display setting.
     * @param {Function} options.parameters.updateMeetingVideoOptimized - Function to update the meeting video optimization setting.
     * @param {Function} options.parameters.updatePrevForceFullDisplay - Function to update the previous force full display setting.
     * @param {Function} options.parameters.updatePrevMeetingDisplayType - Function to update the previous meeting display type.
     * @param {Function} options.parameters.updateIsDisplaySettingsModalVisible - Function to update the visibility of the display settings modal.
     * @param {Function} options.parameters.updateFirstAll - Function to update the first all setting.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {boolean} options.parameters.breakOutRoomStarted - Flag indicating if a breakout room has started.
     * @param {boolean} options.parameters.breakOutRoomEnded - Flag indicating if a breakout room has ended.
     * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
     *
     * @returns {Promise<void>} A promise that resolves when the display settings have been modified.
     */
    modifyDisplaySettings = async ({ parameters }) => {
        // Destructure the parameters
        let { showAlert, meetingDisplayType, autoWave, forceFullDisplay, meetingVideoOptimized, islevel, recordStarted, recordResumed, recordStopped, recordPaused, recordingDisplayType, recordingVideoOptimized, prevForceFullDisplay, prevMeetingDisplayType, updateMeetingDisplayType, updateAutoWave, updateForceFullDisplay, updateMeetingVideoOptimized, updatePrevForceFullDisplay, updatePrevMeetingDisplayType, updateIsDisplaySettingsModalVisible, updateFirstAll, updateUpdateMainWindow, breakOutRoomStarted, breakOutRoomEnded, onScreenChanges, } = parameters;
        // Update previous states
        updateAutoWave(autoWave);
        updateForceFullDisplay(forceFullDisplay);
        if (islevel === '2' && (recordStarted || recordResumed) && !recordStopped && !recordPaused) {
            if (recordingDisplayType === 'video' &&
                meetingDisplayType === 'video' &&
                meetingVideoOptimized &&
                !recordingVideoOptimized) {
                showAlert?.({
                    message: 'Meeting display type can be either video, media, or all when recording display type is non-optimized video.',
                    type: 'danger',
                    duration: 3000,
                });
                // Reset to previous values or handle as needed
                meetingDisplayType = recordingDisplayType;
                updateMeetingDisplayType(meetingDisplayType);
                meetingVideoOptimized = recordingVideoOptimized;
                updateMeetingVideoOptimized(meetingVideoOptimized);
                return;
            }
            else if (recordingDisplayType === 'media' && meetingDisplayType === 'video') {
                showAlert?.({
                    message: 'Meeting display type can be either media or all when recording display type is media.',
                    type: 'danger',
                    duration: 3000,
                });
                // Reset to previous values or handle as needed
                meetingDisplayType = recordingDisplayType;
                updateMeetingDisplayType(meetingDisplayType);
                return;
            }
            else if (recordingDisplayType === 'all' &&
                (meetingDisplayType === 'video' || meetingDisplayType === 'media')) {
                showAlert?.({
                    message: 'Meeting display type can be only all when recording display type is all.',
                    type: 'danger',
                    duration: 3000,
                });
                // Reset to previous values or handle as needed
                meetingDisplayType = recordingDisplayType;
                updateMeetingDisplayType(meetingDisplayType);
                return;
            }
        }
        updateMeetingDisplayType(meetingDisplayType);
        updateMeetingVideoOptimized(meetingVideoOptimized);
        // Close the modal or perform additional actions
        updateIsDisplaySettingsModalVisible(false);
        if (prevMeetingDisplayType !== meetingDisplayType ||
            prevForceFullDisplay !== forceFullDisplay) {
            if (breakOutRoomStarted && !breakOutRoomEnded && meetingDisplayType !== 'all') {
                showAlert?.({
                    message: 'Breakout room is active. Display type can only be all.',
                    type: 'danger',
                });
                meetingDisplayType = prevMeetingDisplayType;
                updateMeetingDisplayType(prevMeetingDisplayType);
                return;
            }
            updateFirstAll(meetingDisplayType !== 'all' ? true : false);
            updateUpdateMainWindow(true);
            await onScreenChanges({
                changed: true,
                parameters: { ...parameters, meetingDisplayType, forceFullDisplay },
            });
            updatePrevForceFullDisplay(forceFullDisplay);
            updatePrevMeetingDisplayType(meetingDisplayType);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifyDisplaySettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifyDisplaySettings, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifyDisplaySettings, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWRpc3BsYXktc2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2Rpc3BsYXktc2V0dGluZ3MtbWV0aG9kcy9tb2RpZnktZGlzcGxheS1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBNkMzQyxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQ0c7SUFFSCxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQWdDLEVBQWlCLEVBQUU7UUFDNUYsNkJBQTZCO1FBQzdCLElBQUksRUFDRixTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLE9BQU8sRUFDUCxhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QixvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLHdCQUF3QixFQUN4QixjQUFjLEVBQ2Qsc0JBQXNCLEVBQ3RCLDJCQUEyQixFQUMzQiwwQkFBMEIsRUFDMUIsNEJBQTRCLEVBQzVCLG1DQUFtQyxFQUNuQyxjQUFjLEVBQ2Qsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixpQkFBaUIsRUFDakIsZUFBZSxHQUNoQixHQUFHLFVBQVUsQ0FBQztRQUVmLHlCQUF5QjtRQUN6QixjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV6QyxJQUFJLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUks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QU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycywgT25TY3JlZW5DaGFuZ2VzVHlwZSwgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2RpZnlEaXNwbGF5U2V0dGluZ3NQYXJhbWV0ZXJzIGV4dGVuZHMgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyB7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIGF1dG9XYXZlOiBib29sZWFuO1xuICBmb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuO1xuICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgcmVjb3JkU3RhcnRlZDogYm9vbGVhbjtcbiAgcmVjb3JkUmVzdW1lZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcmVjb3JkUGF1c2VkOiBib29sZWFuO1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJztcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIHByZXZGb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuO1xuICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZTogKGRpc3BsYXlUeXBlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUF1dG9XYXZlOiAoYXV0b1dhdmU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXk6IChmb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IChvcHRpbWl6ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5OiAoZm9yY2VGdWxsRGlzcGxheTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZTogKGRpc3BsYXlUeXBlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVGaXJzdEFsbDogKGZpcnN0QWxsOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodXBkYXRlOiBib29sZWFuKSA9PiB2b2lkO1xuICBicmVha091dFJvb21TdGFydGVkOiBib29sZWFuO1xuICBicmVha091dFJvb21FbmRlZDogYm9vbGVhbjtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXNUeXBlO1xuXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RpZnlEaXNwbGF5U2V0dGluZ3NPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogTW9kaWZ5RGlzcGxheVNldHRpbmdzUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTW9kaWZ5RGlzcGxheVNldHRpbmdzVHlwZSA9IChvcHRpb25zOiBNb2RpZnlEaXNwbGF5U2V0dGluZ3NPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE1vZGlmeURpc3BsYXlTZXR0aW5ncyB7XG4gIC8qKlxuICAgKiBNb2RpZmllcyB0aGUgZGlzcGxheSBzZXR0aW5ncyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtNb2RpZnlEaXNwbGF5U2V0dGluZ3NPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgY29udGFpbmluZyB0aGUgcGFyYW1ldGVycyB0byBtb2RpZnkgdGhlIGRpc3BsYXkgc2V0dGluZ3MuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgbW9kaWZ5aW5nIHRoZSBkaXNwbGF5IHNldHRpbmdzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZWV0aW5nRGlzcGxheVR5cGUgLSBUaGUgY3VycmVudCBtZWV0aW5nIGRpc3BsYXkgdHlwZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXV0b1dhdmUgLSBGbGFnIGluZGljYXRpbmcgaWYgYXV0byB3YXZlIGlzIGVuYWJsZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZvcmNlRnVsbERpc3BsYXkgLSBGbGFnIGluZGljYXRpbmcgaWYgZnVsbCBkaXNwbGF5IGlzIGZvcmNlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubWVldGluZ1ZpZGVvT3B0aW1pemVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBtZWV0aW5nIHZpZGVvIGlzIG9wdGltaXplZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGN1cnJlbnQgbGV2ZWwgb2YgdGhlIG1lZXRpbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0YXJ0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgcmVjb3JkaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRSZXN1bWVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHJlY29yZGluZyBoYXMgcmVzdW1lZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RvcHBlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaGFzIHN0b3BwZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaXMgcGF1c2VkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ0Rpc3BsYXlUeXBlIC0gVGhlIGN1cnJlbnQgcmVjb3JkaW5nIGRpc3BsYXkgdHlwZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlY29yZGluZyB2aWRlbyBpcyBvcHRpbWl6ZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldkZvcmNlRnVsbERpc3BsYXkgLSBUaGUgcHJldmlvdXMgZm9yY2UgZnVsbCBkaXNwbGF5IHZhbHVlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUgLSBUaGUgcHJldmlvdXMgbWVldGluZyBkaXNwbGF5IHR5cGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1lZXRpbmcgZGlzcGxheSB0eXBlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXV0b1dhdmUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1dG8gd2F2ZSBzZXR0aW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRm9yY2VGdWxsRGlzcGxheSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZm9yY2UgZnVsbCBkaXNwbGF5IHNldHRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1lZXRpbmcgdmlkZW8gb3B0aW1pemF0aW9uIHNldHRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJldmlvdXMgZm9yY2UgZnVsbCBkaXNwbGF5IHNldHRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcmV2aW91cyBtZWV0aW5nIGRpc3BsYXkgdHlwZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBkaXNwbGF5IHNldHRpbmdzIG1vZGFsLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRmlyc3RBbGwgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGZpcnN0IGFsbCBzZXR0aW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgYSBicmVha291dCByb29tIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5icmVha091dFJvb21FbmRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiBhIGJyZWFrb3V0IHJvb20gaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMub25TY3JlZW5DaGFuZ2VzIC0gRnVuY3Rpb24gdG8gaGFuZGxlIHNjcmVlbiBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzcGxheSBzZXR0aW5ncyBoYXZlIGJlZW4gbW9kaWZpZWQuXG4gICAqL1xuXG4gIG1vZGlmeURpc3BsYXlTZXR0aW5ncyA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogTW9kaWZ5RGlzcGxheVNldHRpbmdzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIERlc3RydWN0dXJlIHRoZSBwYXJhbWV0ZXJzXG4gICAgbGV0IHtcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSxcbiAgICAgIGF1dG9XYXZlLFxuICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgIG1lZXRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIGlzbGV2ZWwsXG4gICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgcmVjb3JkUmVzdW1lZCxcbiAgICAgIHJlY29yZFN0b3BwZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgcHJldkZvcmNlRnVsbERpc3BsYXksXG4gICAgICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgdXBkYXRlQXV0b1dhdmUsXG4gICAgICB1cGRhdGVGb3JjZUZ1bGxEaXNwbGF5LFxuICAgICAgdXBkYXRlTWVldGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgdXBkYXRlUHJldkZvcmNlRnVsbERpc3BsYXksXG4gICAgICB1cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUsXG4gICAgICB1cGRhdGVGaXJzdEFsbCxcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICBicmVha091dFJvb21TdGFydGVkLFxuICAgICAgYnJlYWtPdXRSb29tRW5kZWQsXG4gICAgICBvblNjcmVlbkNoYW5nZXMsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBVcGRhdGUgcHJldmlvdXMgc3RhdGVzXG4gICAgdXBkYXRlQXV0b1dhdmUoYXV0b1dhdmUpO1xuICAgIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXkoZm9yY2VGdWxsRGlzcGxheSk7XG5cbiAgICBpZiAoaXNsZXZlbCA9PT0gJzInICYmIChyZWNvcmRTdGFydGVkIHx8IHJlY29yZFJlc3VtZWQpICYmICFyZWNvcmRTdG9wcGVkICYmICFyZWNvcmRQYXVzZWQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycgJiZcbiAgICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlID09PSAndmlkZW8nICYmXG4gICAgICAgIG1lZXRpbmdWaWRlb09wdGltaXplZCAmJlxuICAgICAgICAhcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWRcbiAgICAgICkge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICdNZWV0aW5nIGRpc3BsYXkgdHlwZSBjYW4gYmUgZWl0aGVyIHZpZGVvLCBtZWRpYSwgb3IgYWxsIHdoZW4gcmVjb3JkaW5nIGRpc3BsYXkgdHlwZSBpcyBub24tb3B0aW1pemVkIHZpZGVvLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBSZXNldCB0byBwcmV2aW91cyB2YWx1ZXMgb3IgaGFuZGxlIGFzIG5lZWRlZFxuICAgICAgICBtZWV0aW5nRGlzcGxheVR5cGUgPSByZWNvcmRpbmdEaXNwbGF5VHlwZTtcbiAgICAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlKG1lZXRpbmdEaXNwbGF5VHlwZSk7XG4gICAgICAgIG1lZXRpbmdWaWRlb09wdGltaXplZCA9IHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkO1xuICAgICAgICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQobWVldGluZ1ZpZGVvT3B0aW1pemVkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmRpbmdEaXNwbGF5VHlwZSA9PT0gJ21lZGlhJyAmJiBtZWV0aW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAnTWVldGluZyBkaXNwbGF5IHR5cGUgY2FuIGJlIGVpdGhlciBtZWRpYSBvciBhbGwgd2hlbiByZWNvcmRpbmcgZGlzcGxheSB0eXBlIGlzIG1lZGlhLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc2V0IHRvIHByZXZpb3VzIHZhbHVlcyBvciBoYW5kbGUgYXMgbmVlZGVkXG4gICAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSA9IHJlY29yZGluZ0Rpc3BsYXlUeXBlO1xuICAgICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUobWVldGluZ0Rpc3BsYXlUeXBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICdhbGwnICYmXG4gICAgICAgIChtZWV0aW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycgfHwgbWVldGluZ0Rpc3BsYXlUeXBlID09PSAnbWVkaWEnKVxuICAgICAgKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnTWVldGluZyBkaXNwbGF5IHR5cGUgY2FuIGJlIG9ubHkgYWxsIHdoZW4gcmVjb3JkaW5nIGRpc3BsYXkgdHlwZSBpcyBhbGwuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFJlc2V0IHRvIHByZXZpb3VzIHZhbHVlcyBvciBoYW5kbGUgYXMgbmVlZGVkXG4gICAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSA9IHJlY29yZGluZ0Rpc3BsYXlUeXBlO1xuICAgICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUobWVldGluZ0Rpc3BsYXlUeXBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZShtZWV0aW5nRGlzcGxheVR5cGUpO1xuICAgIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZChtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpO1xuXG4gICAgLy8gQ2xvc2UgdGhlIG1vZGFsIG9yIHBlcmZvcm0gYWRkaXRpb25hbCBhY3Rpb25zXG4gICAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgaWYgKFxuICAgICAgcHJldk1lZXRpbmdEaXNwbGF5VHlwZSAhPT0gbWVldGluZ0Rpc3BsYXlUeXBlIHx8XG4gICAgICBwcmV2Rm9yY2VGdWxsRGlzcGxheSAhPT0gZm9yY2VGdWxsRGlzcGxheVxuICAgICkge1xuICAgICAgaWYgKGJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgIWJyZWFrT3V0Um9vbUVuZGVkICYmIG1lZXRpbmdEaXNwbGF5VHlwZSAhPT0gJ2FsbCcpIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdCcmVha291dCByb29tIGlzIGFjdGl2ZS4gRGlzcGxheSB0eXBlIGNhbiBvbmx5IGJlIGFsbC4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICB9KTtcbiAgICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlID0gcHJldk1lZXRpbmdEaXNwbGF5VHlwZTtcbiAgICAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlKHByZXZNZWV0aW5nRGlzcGxheVR5cGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZUZpcnN0QWxsKG1lZXRpbmdEaXNwbGF5VHlwZSAhPT0gJ2FsbCcgPyB0cnVlIDogZmFsc2UpO1xuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh0cnVlKTtcbiAgICAgIGF3YWl0IG9uU2NyZWVuQ2hhbmdlcyh7XG4gICAgICAgIGNoYW5nZWQ6IHRydWUsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgbWVldGluZ0Rpc3BsYXlUeXBlLCBmb3JjZUZ1bGxEaXNwbGF5IH0sXG4gICAgICB9KTtcbiAgICAgIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5KGZvcmNlRnVsbERpc3BsYXkpO1xuICAgICAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZShtZWV0aW5nRGlzcGxheVR5cGUpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==