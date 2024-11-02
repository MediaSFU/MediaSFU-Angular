import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Modifies the display settings based on the provided parameters.
 *
 * This method updates the display settings for the meeting based on the participant's level,
 * recording status, and other conditions. It validates display types and shows alerts
 * when necessary. It also handles the display settings for breakout rooms.
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
 *
 * @example
 * ```typescript
 * const options: ModifyDisplaySettingsOptions = {
 *   parameters: {
 *     showAlert: (alert) => console.log(alert.message),
 *     meetingDisplayType: 'video',
 *     autoWave: true,
 *     forceFullDisplay: false,
 *     meetingVideoOptimized: true,
 *     islevel: '1',
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordStopped: false,
 *     recordPaused: false,
 *     recordingDisplayType: 'media',
 *     recordingVideoOptimized: false,
 *     prevForceFullDisplay: false,
 *     prevMeetingDisplayType: 'media',
 *     updateMeetingDisplayType: (type) => console.log('Updated display type:', type),
 *     updateAutoWave: (wave) => console.log('Updated auto wave:', wave),
 *     updateForceFullDisplay: (fullDisplay) => console.log('Updated force full display:', fullDisplay),
 *     updateMeetingVideoOptimized: (optimized) => console.log('Updated video optimization:', optimized),
 *     updatePrevForceFullDisplay: (fullDisplay) => console.log('Updated previous full display:', fullDisplay),
 *     updatePrevMeetingDisplayType: (type) => console.log('Updated previous display type:', type),
 *     updateIsDisplaySettingsModalVisible: (isVisible) => console.log('Display settings modal is now:', isVisible),
 *     updateFirstAll: (firstAll) => console.log('Updated first all:', firstAll),
 *     updateUpdateMainWindow: (update) => console.log('Updated main window:', update),
 *     breakOutRoomStarted: false,
 *     breakOutRoomEnded: false,
 *     onScreenChanges: async ({ changed, parameters }) => console.log('Screen changes:', changed),
 *   },
 * };
 *
 * const modifyDisplaySettingsService = new ModifyDisplaySettings();
 * await modifyDisplaySettingsService.modifyDisplaySettings(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWRpc3BsYXktc2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2Rpc3BsYXktc2V0dGluZ3MtbWV0aG9kcy9tb2RpZnktZGlzcGxheS1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBMkMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwRUc7QUFLSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQ0c7SUFFSCxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQWdDLEVBQWlCLEVBQUU7UUFDNUYsNkJBQTZCO1FBQzdCLElBQUksRUFDRixTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLE9BQU8sRUFDUCxhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QixvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLHdCQUF3QixFQUN4QixjQUFjLEVBQ2Qsc0JBQXNCLEVBQ3RCLDJCQUEyQixFQUMzQiwwQkFBMEIsRUFDMUIsNEJBQTRCLEVBQzVCLG1DQUFtQyxFQUNuQyxjQUFjLEVBQ2Qsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixpQkFBaUIsRUFDakIsZUFBZSxHQUNoQixHQUFHLFVBQVUsQ0FBQztRQUVmLHlCQUF5QjtRQUN6QixjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsc0JBQXNCLENBQUMsZ0JBQWdCLENB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UyxxQkFBcUI7MkdBQXJCLHFCQUFxQixjQUZwQixNQUFNOzsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycywgT25TY3JlZW5DaGFuZ2VzVHlwZSwgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2RpZnlEaXNwbGF5U2V0dGluZ3NQYXJhbWV0ZXJzIGV4dGVuZHMgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyB7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIGF1dG9XYXZlOiBib29sZWFuO1xuICBmb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuO1xuICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgcmVjb3JkU3RhcnRlZDogYm9vbGVhbjtcbiAgcmVjb3JkUmVzdW1lZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcmVjb3JkUGF1c2VkOiBib29sZWFuO1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJztcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIHByZXZGb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuO1xuICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZTogKGRpc3BsYXlUeXBlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUF1dG9XYXZlOiAoYXV0b1dhdmU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXk6IChmb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IChvcHRpbWl6ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5OiAoZm9yY2VGdWxsRGlzcGxheTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZTogKGRpc3BsYXlUeXBlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVGaXJzdEFsbDogKGZpcnN0QWxsOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodXBkYXRlOiBib29sZWFuKSA9PiB2b2lkO1xuICBicmVha091dFJvb21TdGFydGVkOiBib29sZWFuO1xuICBicmVha091dFJvb21FbmRlZDogYm9vbGVhbjtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXNUeXBlO1xuXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RpZnlEaXNwbGF5U2V0dGluZ3NPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogTW9kaWZ5RGlzcGxheVNldHRpbmdzUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTW9kaWZ5RGlzcGxheVNldHRpbmdzVHlwZSA9IChvcHRpb25zOiBNb2RpZnlEaXNwbGF5U2V0dGluZ3NPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIE1vZGlmaWVzIHRoZSBkaXNwbGF5IHNldHRpbmdzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICpcbiAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgdGhlIGRpc3BsYXkgc2V0dGluZ3MgZm9yIHRoZSBtZWV0aW5nIGJhc2VkIG9uIHRoZSBwYXJ0aWNpcGFudCdzIGxldmVsLFxuICogcmVjb3JkaW5nIHN0YXR1cywgYW5kIG90aGVyIGNvbmRpdGlvbnMuIEl0IHZhbGlkYXRlcyBkaXNwbGF5IHR5cGVzIGFuZCBzaG93cyBhbGVydHNcbiAqIHdoZW4gbmVjZXNzYXJ5LiBJdCBhbHNvIGhhbmRsZXMgdGhlIGRpc3BsYXkgc2V0dGluZ3MgZm9yIGJyZWFrb3V0IHJvb21zLlxuICpcbiAqIEBwYXJhbSB7TW9kaWZ5RGlzcGxheVNldHRpbmdzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGNvbnRhaW5pbmcgdGhlIHBhcmFtZXRlcnMgdG8gbW9kaWZ5IHRoZSBkaXNwbGF5IHNldHRpbmdzLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBtb2RpZnlpbmcgdGhlIGRpc3BsYXkgc2V0dGluZ3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVldGluZ0Rpc3BsYXlUeXBlIC0gVGhlIGN1cnJlbnQgbWVldGluZyBkaXNwbGF5IHR5cGUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hdXRvV2F2ZSAtIEZsYWcgaW5kaWNhdGluZyBpZiBhdXRvIHdhdmUgaXMgZW5hYmxlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZvcmNlRnVsbERpc3BsYXkgLSBGbGFnIGluZGljYXRpbmcgaWYgZnVsbCBkaXNwbGF5IGlzIGZvcmNlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lZXRpbmdWaWRlb09wdGltaXplZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgbWVldGluZyB2aWRlbyBpcyBvcHRpbWl6ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgY3VycmVudCBsZXZlbCBvZiB0aGUgbWVldGluZy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0YXJ0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgcmVjb3JkaW5nIGhhcyBzdGFydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaGFzIHJlc3VtZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdG9wcGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHJlY29yZGluZyBoYXMgc3RvcHBlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaXMgcGF1c2VkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdEaXNwbGF5VHlwZSAtIFRoZSBjdXJyZW50IHJlY29yZGluZyBkaXNwbGF5IHR5cGUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdWaWRlb09wdGltaXplZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVjb3JkaW5nIHZpZGVvIGlzIG9wdGltaXplZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldkZvcmNlRnVsbERpc3BsYXkgLSBUaGUgcHJldmlvdXMgZm9yY2UgZnVsbCBkaXNwbGF5IHZhbHVlLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlIC0gVGhlIHByZXZpb3VzIG1lZXRpbmcgZGlzcGxheSB0eXBlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWVldGluZyBkaXNwbGF5IHR5cGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXV0b1dhdmUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1dG8gd2F2ZSBzZXR0aW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUZvcmNlRnVsbERpc3BsYXkgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGZvcmNlIGZ1bGwgZGlzcGxheSBzZXR0aW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWVldGluZyB2aWRlbyBvcHRpbWl6YXRpb24gc2V0dGluZy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJldmlvdXMgZm9yY2UgZnVsbCBkaXNwbGF5IHNldHRpbmcuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJldmlvdXMgbWVldGluZyBkaXNwbGF5IHR5cGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGRpc3BsYXkgc2V0dGluZ3MgbW9kYWwuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRmlyc3RBbGwgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGZpcnN0IGFsbCBzZXR0aW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93LlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiBhIGJyZWFrb3V0IHJvb20gaGFzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5icmVha091dFJvb21FbmRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiBhIGJyZWFrb3V0IHJvb20gaGFzIGVuZGVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm9uU2NyZWVuQ2hhbmdlcyAtIEZ1bmN0aW9uIHRvIGhhbmRsZSBzY3JlZW4gY2hhbmdlcy5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzcGxheSBzZXR0aW5ncyBoYXZlIGJlZW4gbW9kaWZpZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IE1vZGlmeURpc3BsYXlTZXR0aW5nc09wdGlvbnMgPSB7XG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBzaG93QWxlcnQ6IChhbGVydCkgPT4gY29uc29sZS5sb2coYWxlcnQubWVzc2FnZSksXG4gKiAgICAgbWVldGluZ0Rpc3BsYXlUeXBlOiAndmlkZW8nLFxuICogICAgIGF1dG9XYXZlOiB0cnVlLFxuICogICAgIGZvcmNlRnVsbERpc3BsYXk6IGZhbHNlLFxuICogICAgIG1lZXRpbmdWaWRlb09wdGltaXplZDogdHJ1ZSxcbiAqICAgICBpc2xldmVsOiAnMScsXG4gKiAgICAgcmVjb3JkU3RhcnRlZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkUmVzdW1lZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkU3RvcHBlZDogZmFsc2UsXG4gKiAgICAgcmVjb3JkUGF1c2VkOiBmYWxzZSxcbiAqICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ21lZGlhJyxcbiAqICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZDogZmFsc2UsXG4gKiAgICAgcHJldkZvcmNlRnVsbERpc3BsYXk6IGZhbHNlLFxuICogICAgIHByZXZNZWV0aW5nRGlzcGxheVR5cGU6ICdtZWRpYScsXG4gKiAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlOiAodHlwZSkgPT4gY29uc29sZS5sb2coJ1VwZGF0ZWQgZGlzcGxheSB0eXBlOicsIHR5cGUpLFxuICogICAgIHVwZGF0ZUF1dG9XYXZlOiAod2F2ZSkgPT4gY29uc29sZS5sb2coJ1VwZGF0ZWQgYXV0byB3YXZlOicsIHdhdmUpLFxuICogICAgIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXk6IChmdWxsRGlzcGxheSkgPT4gY29uc29sZS5sb2coJ1VwZGF0ZWQgZm9yY2UgZnVsbCBkaXNwbGF5OicsIGZ1bGxEaXNwbGF5KSxcbiAqICAgICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IChvcHRpbWl6ZWQpID0+IGNvbnNvbGUubG9nKCdVcGRhdGVkIHZpZGVvIG9wdGltaXphdGlvbjonLCBvcHRpbWl6ZWQpLFxuICogICAgIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5OiAoZnVsbERpc3BsYXkpID0+IGNvbnNvbGUubG9nKCdVcGRhdGVkIHByZXZpb3VzIGZ1bGwgZGlzcGxheTonLCBmdWxsRGlzcGxheSksXG4gKiAgICAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZTogKHR5cGUpID0+IGNvbnNvbGUubG9nKCdVcGRhdGVkIHByZXZpb3VzIGRpc3BsYXkgdHlwZTonLCB0eXBlKSxcbiAqICAgICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZSkgPT4gY29uc29sZS5sb2coJ0Rpc3BsYXkgc2V0dGluZ3MgbW9kYWwgaXMgbm93OicsIGlzVmlzaWJsZSksXG4gKiAgICAgdXBkYXRlRmlyc3RBbGw6IChmaXJzdEFsbCkgPT4gY29uc29sZS5sb2coJ1VwZGF0ZWQgZmlyc3QgYWxsOicsIGZpcnN0QWxsKSxcbiAqICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodXBkYXRlKSA9PiBjb25zb2xlLmxvZygnVXBkYXRlZCBtYWluIHdpbmRvdzonLCB1cGRhdGUpLFxuICogICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IGZhbHNlLFxuICogICAgIGJyZWFrT3V0Um9vbUVuZGVkOiBmYWxzZSxcbiAqICAgICBvblNjcmVlbkNoYW5nZXM6IGFzeW5jICh7IGNoYW5nZWQsIHBhcmFtZXRlcnMgfSkgPT4gY29uc29sZS5sb2coJ1NjcmVlbiBjaGFuZ2VzOicsIGNoYW5nZWQpLFxuICogICB9LFxuICogfTtcbiAqXG4gKiBjb25zdCBtb2RpZnlEaXNwbGF5U2V0dGluZ3NTZXJ2aWNlID0gbmV3IE1vZGlmeURpc3BsYXlTZXR0aW5ncygpO1xuICogYXdhaXQgbW9kaWZ5RGlzcGxheVNldHRpbmdzU2VydmljZS5tb2RpZnlEaXNwbGF5U2V0dGluZ3Mob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTW9kaWZ5RGlzcGxheVNldHRpbmdzIHtcbiAgLyoqXG4gICAqIE1vZGlmaWVzIHRoZSBkaXNwbGF5IHNldHRpbmdzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge01vZGlmeURpc3BsYXlTZXR0aW5nc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBjb250YWluaW5nIHRoZSBwYXJhbWV0ZXJzIHRvIG1vZGlmeSB0aGUgZGlzcGxheSBzZXR0aW5ncy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBtb2RpZnlpbmcgdGhlIGRpc3BsYXkgc2V0dGluZ3MuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lZXRpbmdEaXNwbGF5VHlwZSAtIFRoZSBjdXJyZW50IG1lZXRpbmcgZGlzcGxheSB0eXBlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hdXRvV2F2ZSAtIEZsYWcgaW5kaWNhdGluZyBpZiBhdXRvIHdhdmUgaXMgZW5hYmxlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZm9yY2VGdWxsRGlzcGxheSAtIEZsYWcgaW5kaWNhdGluZyBpZiBmdWxsIGRpc3BsYXkgaXMgZm9yY2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5tZWV0aW5nVmlkZW9PcHRpbWl6ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIG1lZXRpbmcgdmlkZW8gaXMgb3B0aW1pemVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgY3VycmVudCBsZXZlbCBvZiB0aGUgbWVldGluZy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFJlc3VtZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgcmVjb3JkaW5nIGhhcyByZXN1bWVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdG9wcGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHJlY29yZGluZyBoYXMgc3RvcHBlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUGF1c2VkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHJlY29yZGluZyBpcyBwYXVzZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nRGlzcGxheVR5cGUgLSBUaGUgY3VycmVudCByZWNvcmRpbmcgZGlzcGxheSB0eXBlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdWaWRlb09wdGltaXplZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVjb3JkaW5nIHZpZGVvIGlzIG9wdGltaXplZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2Rm9yY2VGdWxsRGlzcGxheSAtIFRoZSBwcmV2aW91cyBmb3JjZSBmdWxsIGRpc3BsYXkgdmFsdWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldk1lZXRpbmdEaXNwbGF5VHlwZSAtIFRoZSBwcmV2aW91cyBtZWV0aW5nIGRpc3BsYXkgdHlwZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWVldGluZyBkaXNwbGF5IHR5cGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBdXRvV2F2ZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXV0byB3YXZlIHNldHRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVGb3JjZUZ1bGxEaXNwbGF5IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBmb3JjZSBmdWxsIGRpc3BsYXkgc2V0dGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWVldGluZyB2aWRlbyBvcHRpbWl6YXRpb24gc2V0dGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcmV2aW91cyBmb3JjZSBmdWxsIGRpc3BsYXkgc2V0dGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByZXZpb3VzIG1lZXRpbmcgZGlzcGxheSB0eXBlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGRpc3BsYXkgc2V0dGluZ3MgbW9kYWwuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVGaXJzdEFsbCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZmlyc3QgYWxsIHNldHRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiBhIGJyZWFrb3V0IHJvb20gaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbUVuZGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIGEgYnJlYWtvdXQgcm9vbSBoYXMgZW5kZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5vblNjcmVlbkNoYW5nZXMgLSBGdW5jdGlvbiB0byBoYW5kbGUgc2NyZWVuIGNoYW5nZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBkaXNwbGF5IHNldHRpbmdzIGhhdmUgYmVlbiBtb2RpZmllZC5cbiAgICovXG5cbiAgbW9kaWZ5RGlzcGxheVNldHRpbmdzID0gYXN5bmMgKHsgcGFyYW1ldGVycyB9OiBNb2RpZnlEaXNwbGF5U2V0dGluZ3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gRGVzdHJ1Y3R1cmUgdGhlIHBhcmFtZXRlcnNcbiAgICBsZXQge1xuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgYXV0b1dhdmUsXG4gICAgICBmb3JjZUZ1bGxEaXNwbGF5LFxuICAgICAgbWVldGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICByZWNvcmRSZXN1bWVkLFxuICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgIHJlY29yZFBhdXNlZCxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQsXG4gICAgICBwcmV2Rm9yY2VGdWxsRGlzcGxheSxcbiAgICAgIHByZXZNZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICB1cGRhdGVBdXRvV2F2ZSxcbiAgICAgIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXksXG4gICAgICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQsXG4gICAgICB1cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheSxcbiAgICAgIHVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSxcbiAgICAgIHVwZGF0ZUZpcnN0QWxsLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQsXG4gICAgICBicmVha091dFJvb21FbmRlZCxcbiAgICAgIG9uU2NyZWVuQ2hhbmdlcyxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIC8vIFVwZGF0ZSBwcmV2aW91cyBzdGF0ZXNcbiAgICB1cGRhdGVBdXRvV2F2ZShhdXRvV2F2ZSk7XG4gICAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheShmb3JjZUZ1bGxEaXNwbGF5KTtcblxuICAgIGlmIChpc2xldmVsID09PSAnMicgJiYgKHJlY29yZFN0YXJ0ZWQgfHwgcmVjb3JkUmVzdW1lZCkgJiYgIXJlY29yZFN0b3BwZWQgJiYgIXJlY29yZFBhdXNlZCkge1xuICAgICAgaWYgKFxuICAgICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJyAmJlxuICAgICAgICBtZWV0aW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycgJiZcbiAgICAgICAgbWVldGluZ1ZpZGVvT3B0aW1pemVkICYmXG4gICAgICAgICFyZWNvcmRpbmdWaWRlb09wdGltaXplZFxuICAgICAgKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgJ01lZXRpbmcgZGlzcGxheSB0eXBlIGNhbiBiZSBlaXRoZXIgdmlkZW8sIG1lZGlhLCBvciBhbGwgd2hlbiByZWNvcmRpbmcgZGlzcGxheSB0eXBlIGlzIG5vbi1vcHRpbWl6ZWQgdmlkZW8uJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFJlc2V0IHRvIHByZXZpb3VzIHZhbHVlcyBvciBoYW5kbGUgYXMgbmVlZGVkXG4gICAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSA9IHJlY29yZGluZ0Rpc3BsYXlUeXBlO1xuICAgICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUobWVldGluZ0Rpc3BsYXlUeXBlKTtcbiAgICAgICAgbWVldGluZ1ZpZGVvT3B0aW1pemVkID0gcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ7XG4gICAgICAgIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZChtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAnbWVkaWEnICYmIG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICdNZWV0aW5nIGRpc3BsYXkgdHlwZSBjYW4gYmUgZWl0aGVyIG1lZGlhIG9yIGFsbCB3aGVuIHJlY29yZGluZyBkaXNwbGF5IHR5cGUgaXMgbWVkaWEuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzZXQgdG8gcHJldmlvdXMgdmFsdWVzIG9yIGhhbmRsZSBhcyBuZWVkZWRcbiAgICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlID0gcmVjb3JkaW5nRGlzcGxheVR5cGU7XG4gICAgICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZShtZWV0aW5nRGlzcGxheVR5cGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZSA9PT0gJ2FsbCcgJiZcbiAgICAgICAgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJyB8fCBtZWV0aW5nRGlzcGxheVR5cGUgPT09ICdtZWRpYScpXG4gICAgICApIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdNZWV0aW5nIGRpc3BsYXkgdHlwZSBjYW4gYmUgb25seSBhbGwgd2hlbiByZWNvcmRpbmcgZGlzcGxheSB0eXBlIGlzIGFsbC4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gUmVzZXQgdG8gcHJldmlvdXMgdmFsdWVzIG9yIGhhbmRsZSBhcyBuZWVkZWRcbiAgICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlID0gcmVjb3JkaW5nRGlzcGxheVR5cGU7XG4gICAgICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZShtZWV0aW5nRGlzcGxheVR5cGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlKG1lZXRpbmdEaXNwbGF5VHlwZSk7XG4gICAgdXBkYXRlTWVldGluZ1ZpZGVvT3B0aW1pemVkKG1lZXRpbmdWaWRlb09wdGltaXplZCk7XG5cbiAgICAvLyBDbG9zZSB0aGUgbW9kYWwgb3IgcGVyZm9ybSBhZGRpdGlvbmFsIGFjdGlvbnNcbiAgICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG5cbiAgICBpZiAoXG4gICAgICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlICE9PSBtZWV0aW5nRGlzcGxheVR5cGUgfHxcbiAgICAgIHByZXZGb3JjZUZ1bGxEaXNwbGF5ICE9PSBmb3JjZUZ1bGxEaXNwbGF5XG4gICAgKSB7XG4gICAgICBpZiAoYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhYnJlYWtPdXRSb29tRW5kZWQgJiYgbWVldGluZ0Rpc3BsYXlUeXBlICE9PSAnYWxsJykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ0JyZWFrb3V0IHJvb20gaXMgYWN0aXZlLiBEaXNwbGF5IHR5cGUgY2FuIG9ubHkgYmUgYWxsLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIH0pO1xuICAgICAgICBtZWV0aW5nRGlzcGxheVR5cGUgPSBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlO1xuICAgICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUocHJldk1lZXRpbmdEaXNwbGF5VHlwZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlRmlyc3RBbGwobWVldGluZ0Rpc3BsYXlUeXBlICE9PSAnYWxsJyA/IHRydWUgOiBmYWxzZSk7XG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHRydWUpO1xuICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHtcbiAgICAgICAgY2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBtZWV0aW5nRGlzcGxheVR5cGUsIGZvcmNlRnVsbERpc3BsYXkgfSxcbiAgICAgIH0pO1xuICAgICAgdXBkYXRlUHJldkZvcmNlRnVsbERpc3BsYXkoZm9yY2VGdWxsRGlzcGxheSk7XG4gICAgICB1cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlKG1lZXRpbmdEaXNwbGF5VHlwZSk7XG4gICAgfVxuICB9O1xufVxuIl19