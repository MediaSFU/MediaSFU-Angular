import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Launches the media settings modal and updates the available audio and video input devices.
 *
 * This method checks the current visibility of the media settings modal and, if it is not visible,
 * retrieves the list of available audio and video input devices. It then updates the state with
 * these devices and opens the modal. If the modal is already visible, it closes the modal.
 *
 * @param {LaunchMediaSettingsOptions} options - The options for launching media settings.
 * @param {Function} options.updateIsMediaSettingsModalVisible - Function to update the visibility state of the media settings modal.
 * @param {boolean} options.isMediaSettingsModalVisible - Current visibility state of the media settings modal.
 * @param {MediaDeviceInfo[]} options.audioInputs - Array to store available audio input devices.
 * @param {MediaDeviceInfo[]} options.videoInputs - Array to store available video input devices.
 * @param {Function} options.updateAudioInputs - Function to update the available audio input devices.
 * @param {Function} options.updateVideoInputs - Function to update the available video input devices.
 * @returns {Promise<void>} A promise that resolves when the media settings have been updated.
 *
 * @example
 * ```typescript
 * const launchMediaSettingsService = new LaunchMediaSettings();
 * launchMediaSettingsService.launchMediaSettings({
 *   updateIsMediaSettingsModalVisible: (isVisible) => {
 *     console.log('Media settings modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isMediaSettingsModalVisible: false, // Initially not visible
 *   audioInputs: [],
 *   videoInputs: [],
 *   updateAudioInputs: (inputs) => {
 *     console.log('Available audio inputs:', inputs);
 *   },
 *   updateVideoInputs: (inputs) => {
 *     console.log('Available video inputs:', inputs);
 *   },
 * });
 * ```
 */
export class LaunchMediaSettings {
    /**
     * Launches the media settings modal and updates the available audio and video input devices.
     *
     * @param {Object} options - The options for launching media settings.
     * @param {Function} options.updateIsMediaSettingsModalVisible - Function to update the visibility state of the media settings modal.
     * @param {boolean} options.isMediaSettingsModalVisible - Current visibility state of the media settings modal.
     * @param {MediaDeviceInfo[]} options.audioInputs - Array to store available audio input devices.
     * @param {MediaDeviceInfo[]} options.videoInputs - Array to store available video input devices.
     * @param {Function} options.updateAudioInputs - Function to update the available audio input devices.
     * @param {Function} options.updateVideoInputs - Function to update the available video input devices.
     * @returns {Promise<void>} A promise that resolves when the media settings have been updated.
     */
    async launchMediaSettings({ updateIsMediaSettingsModalVisible, isMediaSettingsModalVisible, audioInputs, videoInputs, updateAudioInputs, updateVideoInputs, }) {
        // Check if media settings modal is not visible and update available audio and video input devices
        if (!isMediaSettingsModalVisible) {
            try {
                // Get the list of all available media devices
                const devices = await navigator.mediaDevices.enumerateDevices();
                // Filter the devices to get only audio and video input devices
                videoInputs = devices.filter((device) => device.kind === 'videoinput');
                audioInputs = devices.filter((device) => device.kind === 'audioinput');
                // Update the available audio and video input devices
                updateVideoInputs(videoInputs);
                updateAudioInputs(audioInputs);
                // Open the media settings modal
                updateIsMediaSettingsModalVisible(true);
            }
            catch (error) {
                // Open the media settings modal
                updateIsMediaSettingsModalVisible(true);
            }
        }
        else {
            // Close the media settings modal
            updateIsMediaSettingsModalVisible(false);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMediaSettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMediaSettings, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMediaSettings, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9tZWRpYS1zZXR0aW5ncy1tZXRob2RzL2xhdW5jaC1tZWRpYS1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBTUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7Ozs7Ozs7Ozs7T0FXRztJQUVILEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUN4QixpQ0FBaUMsRUFDakMsMkJBQTJCLEVBQzNCLFdBQVcsRUFDWCxXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLGlCQUFpQixHQUNVO1FBQzNCLGtHQUFrRztRQUNsRyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUM7Z0JBQ0gsOENBQThDO2dCQUM5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLFNBQVMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDaEUsK0RBQStEO2dCQUMvRCxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQXVCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUM7Z0JBQ3hGLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBdUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQztnQkFFeEYscURBQXFEO2dCQUNyRCxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDL0IsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRS9CLGdDQUFnQztnQkFDaEMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsZ0NBQWdDO2dCQUNoQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixpQ0FBaUM7WUFDakMsaUNBQWlDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNILENBQUM7dUdBN0NVLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoTWVkaWFTZXR0aW5nc09wdGlvbnMge1xuICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgYXVkaW9JbnB1dHM6IE1lZGlhRGV2aWNlSW5mb1tdO1xuICB2aWRlb0lucHV0czogTWVkaWFEZXZpY2VJbmZvW107XG4gIHVwZGF0ZUF1ZGlvSW5wdXRzOiAoaW5wdXRzOiBNZWRpYURldmljZUluZm9bXSkgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9JbnB1dHM6IChpbnB1dHM6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBMYXVuY2hNZWRpYVNldHRpbmdzVHlwZSA9IChvcHRpb25zOiBMYXVuY2hNZWRpYVNldHRpbmdzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBMYXVuY2hlcyB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWwgYW5kIHVwZGF0ZXMgdGhlIGF2YWlsYWJsZSBhdWRpbyBhbmQgdmlkZW8gaW5wdXQgZGV2aWNlcy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjaGVja3MgdGhlIGN1cnJlbnQgdmlzaWJpbGl0eSBvZiB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWwgYW5kLCBpZiBpdCBpcyBub3QgdmlzaWJsZSxcbiAqIHJldHJpZXZlcyB0aGUgbGlzdCBvZiBhdmFpbGFibGUgYXVkaW8gYW5kIHZpZGVvIGlucHV0IGRldmljZXMuIEl0IHRoZW4gdXBkYXRlcyB0aGUgc3RhdGUgd2l0aFxuICogdGhlc2UgZGV2aWNlcyBhbmQgb3BlbnMgdGhlIG1vZGFsLiBJZiB0aGUgbW9kYWwgaXMgYWxyZWFkeSB2aXNpYmxlLCBpdCBjbG9zZXMgdGhlIG1vZGFsLlxuICpcbiAqIEBwYXJhbSB7TGF1bmNoTWVkaWFTZXR0aW5nc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgbGF1bmNoaW5nIG1lZGlhIHNldHRpbmdzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lZGlhIHNldHRpbmdzIG1vZGFsLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSAtIEN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWwuXG4gKiBAcGFyYW0ge01lZGlhRGV2aWNlSW5mb1tdfSBvcHRpb25zLmF1ZGlvSW5wdXRzIC0gQXJyYXkgdG8gc3RvcmUgYXZhaWxhYmxlIGF1ZGlvIGlucHV0IGRldmljZXMuXG4gKiBAcGFyYW0ge01lZGlhRGV2aWNlSW5mb1tdfSBvcHRpb25zLnZpZGVvSW5wdXRzIC0gQXJyYXkgdG8gc3RvcmUgYXZhaWxhYmxlIHZpZGVvIGlucHV0IGRldmljZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUF1ZGlvSW5wdXRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdmFpbGFibGUgYXVkaW8gaW5wdXQgZGV2aWNlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlVmlkZW9JbnB1dHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF2YWlsYWJsZSB2aWRlbyBpbnB1dCBkZXZpY2VzLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lZGlhIHNldHRpbmdzIGhhdmUgYmVlbiB1cGRhdGVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBsYXVuY2hNZWRpYVNldHRpbmdzU2VydmljZSA9IG5ldyBMYXVuY2hNZWRpYVNldHRpbmdzKCk7XG4gKiBsYXVuY2hNZWRpYVNldHRpbmdzU2VydmljZS5sYXVuY2hNZWRpYVNldHRpbmdzKHtcbiAqICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coJ01lZGlhIHNldHRpbmdzIG1vZGFsIGlzIG5vdzonLCBpc1Zpc2libGUgPyAnVmlzaWJsZScgOiAnSGlkZGVuJyk7XG4gKiAgIH0sXG4gKiAgIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogZmFsc2UsIC8vIEluaXRpYWxseSBub3QgdmlzaWJsZVxuICogICBhdWRpb0lucHV0czogW10sXG4gKiAgIHZpZGVvSW5wdXRzOiBbXSxcbiAqICAgdXBkYXRlQXVkaW9JbnB1dHM6IChpbnB1dHMpID0+IHtcbiAqICAgICBjb25zb2xlLmxvZygnQXZhaWxhYmxlIGF1ZGlvIGlucHV0czonLCBpbnB1dHMpO1xuICogICB9LFxuICogICB1cGRhdGVWaWRlb0lucHV0czogKGlucHV0cykgPT4ge1xuICogICAgIGNvbnNvbGUubG9nKCdBdmFpbGFibGUgdmlkZW8gaW5wdXRzOicsIGlucHV0cyk7XG4gKiAgIH0sXG4gKiB9KTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaE1lZGlhU2V0dGluZ3Mge1xuICAvKipcbiAgICogTGF1bmNoZXMgdGhlIG1lZGlhIHNldHRpbmdzIG1vZGFsIGFuZCB1cGRhdGVzIHRoZSBhdmFpbGFibGUgYXVkaW8gYW5kIHZpZGVvIGlucHV0IGRldmljZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGxhdW5jaGluZyBtZWRpYSBzZXR0aW5ncy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lZGlhIHNldHRpbmdzIG1vZGFsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBtZWRpYSBzZXR0aW5ncyBtb2RhbC5cbiAgICogQHBhcmFtIHtNZWRpYURldmljZUluZm9bXX0gb3B0aW9ucy5hdWRpb0lucHV0cyAtIEFycmF5IHRvIHN0b3JlIGF2YWlsYWJsZSBhdWRpbyBpbnB1dCBkZXZpY2VzLlxuICAgKiBAcGFyYW0ge01lZGlhRGV2aWNlSW5mb1tdfSBvcHRpb25zLnZpZGVvSW5wdXRzIC0gQXJyYXkgdG8gc3RvcmUgYXZhaWxhYmxlIHZpZGVvIGlucHV0IGRldmljZXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQXVkaW9JbnB1dHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF2YWlsYWJsZSBhdWRpbyBpbnB1dCBkZXZpY2VzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVZpZGVvSW5wdXRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdmFpbGFibGUgdmlkZW8gaW5wdXQgZGV2aWNlcy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lZGlhIHNldHRpbmdzIGhhdmUgYmVlbiB1cGRhdGVkLlxuICAgKi9cblxuICBhc3luYyBsYXVuY2hNZWRpYVNldHRpbmdzKHtcbiAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUsXG4gICAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLFxuICAgIGF1ZGlvSW5wdXRzLFxuICAgIHZpZGVvSW5wdXRzLFxuICAgIHVwZGF0ZUF1ZGlvSW5wdXRzLFxuICAgIHVwZGF0ZVZpZGVvSW5wdXRzLFxuICB9OiBMYXVuY2hNZWRpYVNldHRpbmdzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIENoZWNrIGlmIG1lZGlhIHNldHRpbmdzIG1vZGFsIGlzIG5vdCB2aXNpYmxlIGFuZCB1cGRhdGUgYXZhaWxhYmxlIGF1ZGlvIGFuZCB2aWRlbyBpbnB1dCBkZXZpY2VzXG4gICAgaWYgKCFpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIEdldCB0aGUgbGlzdCBvZiBhbGwgYXZhaWxhYmxlIG1lZGlhIGRldmljZXNcbiAgICAgICAgY29uc3QgZGV2aWNlcyA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgICAgICAvLyBGaWx0ZXIgdGhlIGRldmljZXMgdG8gZ2V0IG9ubHkgYXVkaW8gYW5kIHZpZGVvIGlucHV0IGRldmljZXNcbiAgICAgICAgdmlkZW9JbnB1dHMgPSBkZXZpY2VzLmZpbHRlcigoZGV2aWNlOiBNZWRpYURldmljZUluZm8pID0+IGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcpO1xuICAgICAgICBhdWRpb0lucHV0cyA9IGRldmljZXMuZmlsdGVyKChkZXZpY2U6IE1lZGlhRGV2aWNlSW5mbykgPT4gZGV2aWNlLmtpbmQgPT09ICdhdWRpb2lucHV0Jyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBhdmFpbGFibGUgYXVkaW8gYW5kIHZpZGVvIGlucHV0IGRldmljZXNcbiAgICAgICAgdXBkYXRlVmlkZW9JbnB1dHModmlkZW9JbnB1dHMpO1xuICAgICAgICB1cGRhdGVBdWRpb0lucHV0cyhhdWRpb0lucHV0cyk7XG5cbiAgICAgICAgLy8gT3BlbiB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWxcbiAgICAgICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKHRydWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gT3BlbiB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWxcbiAgICAgICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDbG9zZSB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWxcbiAgICAgIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgfVxuICB9XG59XG4iXX0=