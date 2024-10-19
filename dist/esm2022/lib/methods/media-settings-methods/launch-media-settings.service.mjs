import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9tZWRpYS1zZXR0aW5ncy1tZXRob2RzL2xhdW5jaC1tZWRpYS1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBaUIzQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7Ozs7OztPQVdHO0lBRUgsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQ3hCLGlDQUFpQyxFQUNqQywyQkFBMkIsRUFDM0IsV0FBVyxFQUNYLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ1U7UUFDM0Isa0dBQWtHO1FBQ2xHLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQztnQkFDSCw4Q0FBOEM7Z0JBQzlDLE1BQU0sT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNoRSwrREFBK0Q7Z0JBQy9ELFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBdUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQztnQkFDeEYsV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUF1QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDO2dCQUV4RixxREFBcUQ7Z0JBQ3JELGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMvQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFL0IsZ0NBQWdDO2dCQUNoQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixnQ0FBZ0M7Z0JBQ2hDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLGlDQUFpQztZQUNqQyxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0gsQ0FBQzt1R0E3Q1UsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hNZWRpYVNldHRpbmdzT3B0aW9ucyB7XG4gIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiBib29sZWFuO1xuICBhdWRpb0lucHV0czogTWVkaWFEZXZpY2VJbmZvW107XG4gIHZpZGVvSW5wdXRzOiBNZWRpYURldmljZUluZm9bXTtcbiAgdXBkYXRlQXVkaW9JbnB1dHM6IChpbnB1dHM6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb0lucHV0czogKGlucHV0czogTWVkaWFEZXZpY2VJbmZvW10pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaE1lZGlhU2V0dGluZ3NUeXBlID0gKG9wdGlvbnM6IExhdW5jaE1lZGlhU2V0dGluZ3NPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTGF1bmNoTWVkaWFTZXR0aW5ncyB7XG4gIC8qKlxuICAgKiBMYXVuY2hlcyB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWwgYW5kIHVwZGF0ZXMgdGhlIGF2YWlsYWJsZSBhdWRpbyBhbmQgdmlkZW8gaW5wdXQgZGV2aWNlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgbGF1bmNoaW5nIG1lZGlhIHNldHRpbmdzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lZGlhIHNldHRpbmdzIG1vZGFsLlxuICAgKiBAcGFyYW0ge01lZGlhRGV2aWNlSW5mb1tdfSBvcHRpb25zLmF1ZGlvSW5wdXRzIC0gQXJyYXkgdG8gc3RvcmUgYXZhaWxhYmxlIGF1ZGlvIGlucHV0IGRldmljZXMuXG4gICAqIEBwYXJhbSB7TWVkaWFEZXZpY2VJbmZvW119IG9wdGlvbnMudmlkZW9JbnB1dHMgLSBBcnJheSB0byBzdG9yZSBhdmFpbGFibGUgdmlkZW8gaW5wdXQgZGV2aWNlcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVBdWRpb0lucHV0cyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXZhaWxhYmxlIGF1ZGlvIGlucHV0IGRldmljZXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlVmlkZW9JbnB1dHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF2YWlsYWJsZSB2aWRlbyBpbnB1dCBkZXZpY2VzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVkaWEgc2V0dGluZ3MgaGF2ZSBiZWVuIHVwZGF0ZWQuXG4gICAqL1xuXG4gIGFzeW5jIGxhdW5jaE1lZGlhU2V0dGluZ3Moe1xuICAgIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSxcbiAgICBpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUsXG4gICAgYXVkaW9JbnB1dHMsXG4gICAgdmlkZW9JbnB1dHMsXG4gICAgdXBkYXRlQXVkaW9JbnB1dHMsXG4gICAgdXBkYXRlVmlkZW9JbnB1dHMsXG4gIH06IExhdW5jaE1lZGlhU2V0dGluZ3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gQ2hlY2sgaWYgbWVkaWEgc2V0dGluZ3MgbW9kYWwgaXMgbm90IHZpc2libGUgYW5kIHVwZGF0ZSBhdmFpbGFibGUgYXVkaW8gYW5kIHZpZGVvIGlucHV0IGRldmljZXNcbiAgICBpZiAoIWlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gR2V0IHRoZSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgbWVkaWEgZGV2aWNlc1xuICAgICAgICBjb25zdCBkZXZpY2VzID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG4gICAgICAgIC8vIEZpbHRlciB0aGUgZGV2aWNlcyB0byBnZXQgb25seSBhdWRpbyBhbmQgdmlkZW8gaW5wdXQgZGV2aWNlc1xuICAgICAgICB2aWRlb0lucHV0cyA9IGRldmljZXMuZmlsdGVyKChkZXZpY2U6IE1lZGlhRGV2aWNlSW5mbykgPT4gZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0Jyk7XG4gICAgICAgIGF1ZGlvSW5wdXRzID0gZGV2aWNlcy5maWx0ZXIoKGRldmljZTogTWVkaWFEZXZpY2VJbmZvKSA9PiBkZXZpY2Uua2luZCA9PT0gJ2F1ZGlvaW5wdXQnKTtcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIGF2YWlsYWJsZSBhdWRpbyBhbmQgdmlkZW8gaW5wdXQgZGV2aWNlc1xuICAgICAgICB1cGRhdGVWaWRlb0lucHV0cyh2aWRlb0lucHV0cyk7XG4gICAgICAgIHVwZGF0ZUF1ZGlvSW5wdXRzKGF1ZGlvSW5wdXRzKTtcblxuICAgICAgICAvLyBPcGVuIHRoZSBtZWRpYSBzZXR0aW5ncyBtb2RhbFxuICAgICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUodHJ1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBPcGVuIHRoZSBtZWRpYSBzZXR0aW5ncyBtb2RhbFxuICAgICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUodHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENsb3NlIHRoZSBtZWRpYSBzZXR0aW5ncyBtb2RhbFxuICAgICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==