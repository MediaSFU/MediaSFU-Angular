import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Switches the user's audio input device based on the provided audio preference.
 *
 * This method checks for audio permissions, attempts to access the specified audio input device,
 * and updates the application's state accordingly. If the audio input device cannot be accessed,
 * it will revert to the previous audio input device.
 *
 * @param {SwitchUserAudioOptions} options - The options for switching the user's audio input device.
 * @param {string} options.audioPreference - The preferred audio input device ID.
 * @param {SwitchUserAudioParameters} options.parameters - Additional parameters required for switching the audio input device.
 * @param {string} options.parameters.prevAudioInputDevice - The previous audio input device ID.
 * @param {Function} options.parameters.showAlert - Function to show alert messages.
 * @param {boolean} options.parameters.hasAudioPermission - Flag indicating if the user has granted audio permission.
 * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user's default audio input device.
 * @param {Function} options.parameters.streamSuccessAudioSwitch - Function to handle successful audio stream switch.
 * @param {Function} options.parameters.requestPermissionAudio - Function to request audio permission from the user.
 * @param {Function} options.parameters.checkMediaPermission - Function to check if media permission is granted.
 *
 * @returns {Promise<void>} A promise that resolves when the audio input device has been successfully switched.
 *
 * @throws Will throw an error if the audio input device cannot be accessed or if there is an unexpected error.
 *
 * @example
 * await switchUserAudio({
 *   audioPreference: 'new-audio-device-id',
 *   parameters: {
 *     prevAudioInputDevice: 'previous-device-id',
 *     hasAudioPermission: true,
 *     updateUserDefaultAudioInputDevice: updateDeviceFunction,
 *     // other parameters...
 *   },
 * });
 */
export class SwitchUserAudio {
    /**
     * Switches the user's audio input device based on the provided audio preference.
     *
     * @param {SwitchUserAudioOptions} options - The options for switching the user's audio input device.
     * @param {string} options.audioPreference - The preferred audio input device ID.
     * @param {Object} options.parameters - Additional parameters required for switching the audio input device.
     * @param {string} options.parameters.prevAudioInputDevice - The previous audio input device ID.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {boolean} options.parameters.hasAudioPermission - Flag indicating if the user has granted audio permission.
     * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user's default audio input device.
     * @param {Function} options.parameters.streamSuccessAudioSwitch - Function to handle successful audio stream switch.
     * @param {Function} options.parameters.requestPermissionAudio - Function to request audio permission from the user.
     * @param {Function} options.parameters.checkMediaPermission - Function to check if media permission is granted.
     *
     * @returns {Promise<void>} A promise that resolves when the audio input device has been successfully switched.
     *
     * @throws Will throw an error if the audio input device cannot be accessed or if there is an unexpected error.
     */
    async switchUserAudio({ audioPreference, parameters }) {
        let { userDefaultAudioInputDevice, prevAudioInputDevice, showAlert, hasAudioPermission, updateUserDefaultAudioInputDevice, 
        // media functions
        streamSuccessAudioSwitch, requestPermissionAudio, checkMediaPermission, } = parameters;
        try {
            // Check if audio permission is granted
            if (!hasAudioPermission) {
                if (checkMediaPermission) {
                    let statusMic = await requestPermissionAudio();
                    if (statusMic !== 'granted') {
                        showAlert?.({
                            message: 'Allow access to your microphone or check if your microphone is not being used by another application.',
                            type: 'danger',
                            duration: 3000,
                        });
                        return;
                    }
                }
            }
            let mediaConstraints = {
                audio: {
                    deviceId: { exact: audioPreference },
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                },
                video: false,
            };
            // Get user media with the defined audio constraints
            await navigator.mediaDevices
                .getUserMedia(mediaConstraints)
                .then(async (stream) => {
                await streamSuccessAudioSwitch({ stream, parameters });
            })
                .catch(() => {
                // Handle errors and revert to the previous audio input device
                userDefaultAudioInputDevice = prevAudioInputDevice;
                updateUserDefaultAudioInputDevice(userDefaultAudioInputDevice);
                showAlert?.({
                    message: 'Error switching; the specified microphone could not be accessed.',
                    type: 'danger',
                    duration: 3000,
                });
            });
        }
        catch (error) {
            // Handle unexpected errors and revert to the previous audio input device
            userDefaultAudioInputDevice = prevAudioInputDevice;
            updateUserDefaultAudioInputDevice(userDefaultAudioInputDevice);
            showAlert?.({
                message: 'Error switching; the specified microphone could not be accessed.',
                type: 'danger',
                duration: 3000,
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchUserAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXVzZXItYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3dpdGNoLXVzZXItYXVkaW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWdDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBTUgsTUFBTSxPQUFPLGVBQWU7SUFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQTBCO1FBQzNFLElBQUksRUFDRiwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBQ3BCLFNBQVMsRUFDVCxrQkFBa0IsRUFDbEIsaUNBQWlDO1FBRWpDLGtCQUFrQjtRQUNsQix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLG9CQUFvQixHQUNyQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksQ0FBQztZQUNILHVDQUF1QztZQUN2QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO29CQUN6QixJQUFJLFNBQVMsR0FBRyxNQUFNLHNCQUFzQixFQUFFLENBQUM7b0JBQy9DLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUM1QixTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQ0wsdUdBQXVHOzRCQUN6RyxJQUFJLEVBQUUsUUFBUTs0QkFDZCxRQUFRLEVBQUUsSUFBSTt5QkFDZixDQUFDLENBQUM7d0JBRUgsT0FBTztvQkFDVCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsSUFBSSxnQkFBZ0IsR0FBMkI7Z0JBQzdDLEtBQUssRUFBRTtvQkFDTCxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO29CQUNwQyxnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixlQUFlLEVBQUUsS0FBSztpQkFDdkI7Z0JBQ0QsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDO1lBRUYsb0RBQW9EO1lBQ3BELE1BQU0sU0FBUyxDQUFDLFlBQVk7aUJBQ3pCLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFtQixFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sd0JBQXdCLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDViw4REFBOEQ7Z0JBQzlELDJCQUEyQixHQUFHLG9CQUFvQixDQUFDO2dCQUNuRCxpQ0FBaUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUUvRCxTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsa0VBQWtFO29CQUMzRSxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YseUVBQXlFO1lBQ3pFLDJCQUEyQixHQUFHLG9CQUFvQixDQUFDO1lBQ25ELGlDQUFpQyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFL0QsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLGtFQUFrRTtnQkFDM0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQzt1R0F6RlUsZUFBZTsyR0FBZixlQUFlLGNBRmQsTUFBTTs7MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBTaG93QWxlcnQsXG4gIFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaFR5cGUsXG4gIFJlcXVlc3RQZXJtaXNzaW9uQXVkaW9UeXBlLFxuICBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hQYXJhbWV0ZXJzLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaFVzZXJBdWRpb1BhcmFtZXRlcnMgZXh0ZW5kcyBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hQYXJhbWV0ZXJzIHtcbiAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHByZXZBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgaGFzQXVkaW9QZXJtaXNzaW9uOiBib29sZWFuO1xuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IChkZXZpY2VJZDogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaFR5cGU7XG4gIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW86IFJlcXVlc3RQZXJtaXNzaW9uQXVkaW9UeXBlO1xuICBjaGVja01lZGlhUGVybWlzc2lvbjogYm9vbGVhbjtcblxuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVXNlckF1ZGlvT3B0aW9ucyB7XG4gIGF1ZGlvUHJlZmVyZW5jZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBTd2l0Y2hVc2VyQXVkaW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTd2l0Y2hVc2VyQXVkaW9UeXBlID0gKG9wdGlvbnM6IFN3aXRjaFVzZXJBdWRpb09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cblxuLyoqXG4gKiBTd2l0Y2hlcyB0aGUgdXNlcidzIGF1ZGlvIGlucHV0IGRldmljZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgYXVkaW8gcHJlZmVyZW5jZS5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjaGVja3MgZm9yIGF1ZGlvIHBlcm1pc3Npb25zLCBhdHRlbXB0cyB0byBhY2Nlc3MgdGhlIHNwZWNpZmllZCBhdWRpbyBpbnB1dCBkZXZpY2UsXG4gKiBhbmQgdXBkYXRlcyB0aGUgYXBwbGljYXRpb24ncyBzdGF0ZSBhY2NvcmRpbmdseS4gSWYgdGhlIGF1ZGlvIGlucHV0IGRldmljZSBjYW5ub3QgYmUgYWNjZXNzZWQsXG4gKiBpdCB3aWxsIHJldmVydCB0byB0aGUgcHJldmlvdXMgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICpcbiAqIEBwYXJhbSB7U3dpdGNoVXNlckF1ZGlvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzd2l0Y2hpbmcgdGhlIHVzZXIncyBhdWRpbyBpbnB1dCBkZXZpY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hdWRpb1ByZWZlcmVuY2UgLSBUaGUgcHJlZmVycmVkIGF1ZGlvIGlucHV0IGRldmljZSBJRC5cbiAqIEBwYXJhbSB7U3dpdGNoVXNlckF1ZGlvUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzd2l0Y2hpbmcgdGhlIGF1ZGlvIGlucHV0IGRldmljZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldkF1ZGlvSW5wdXREZXZpY2UgLSBUaGUgcHJldmlvdXMgYXVkaW8gaW5wdXQgZGV2aWNlIElELlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYWxlcnQgbWVzc2FnZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5oYXNBdWRpb1Blcm1pc3Npb24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgaGFzIGdyYW50ZWQgYXVkaW8gcGVybWlzc2lvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHVzZXIncyBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2ggLSBGdW5jdGlvbiB0byBoYW5kbGUgc3VjY2Vzc2Z1bCBhdWRpbyBzdHJlYW0gc3dpdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlcXVlc3RQZXJtaXNzaW9uQXVkaW8gLSBGdW5jdGlvbiB0byByZXF1ZXN0IGF1ZGlvIHBlcm1pc3Npb24gZnJvbSB0aGUgdXNlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jaGVja01lZGlhUGVybWlzc2lvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIGlmIG1lZGlhIHBlcm1pc3Npb24gaXMgZ3JhbnRlZC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXVkaW8gaW5wdXQgZGV2aWNlIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBzd2l0Y2hlZC5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGF1ZGlvIGlucHV0IGRldmljZSBjYW5ub3QgYmUgYWNjZXNzZWQgb3IgaWYgdGhlcmUgaXMgYW4gdW5leHBlY3RlZCBlcnJvci5cbiAqXG4gKiBAZXhhbXBsZVxuICogYXdhaXQgc3dpdGNoVXNlckF1ZGlvKHtcbiAqICAgYXVkaW9QcmVmZXJlbmNlOiAnbmV3LWF1ZGlvLWRldmljZS1pZCcsXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBwcmV2QXVkaW9JbnB1dERldmljZTogJ3ByZXZpb3VzLWRldmljZS1pZCcsXG4gKiAgICAgaGFzQXVkaW9QZXJtaXNzaW9uOiB0cnVlLFxuICogICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogdXBkYXRlRGV2aWNlRnVuY3Rpb24sXG4gKiAgICAgLy8gb3RoZXIgcGFyYW1ldGVycy4uLlxuICogICB9LFxuICogfSk7XG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3dpdGNoVXNlckF1ZGlvIHtcbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRoZSB1c2VyJ3MgYXVkaW8gaW5wdXQgZGV2aWNlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBhdWRpbyBwcmVmZXJlbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N3aXRjaFVzZXJBdWRpb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3dpdGNoaW5nIHRoZSB1c2VyJ3MgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hdWRpb1ByZWZlcmVuY2UgLSBUaGUgcHJlZmVycmVkIGF1ZGlvIGlucHV0IGRldmljZSBJRC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc3dpdGNoaW5nIHRoZSBhdWRpbyBpbnB1dCBkZXZpY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldkF1ZGlvSW5wdXREZXZpY2UgLSBUaGUgcHJldmlvdXMgYXVkaW8gaW5wdXQgZGV2aWNlIElELlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuaGFzQXVkaW9QZXJtaXNzaW9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIGhhcyBncmFudGVkIGF1ZGlvIHBlcm1pc3Npb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHVzZXIncyBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCAtIEZ1bmN0aW9uIHRvIGhhbmRsZSBzdWNjZXNzZnVsIGF1ZGlvIHN0cmVhbSBzd2l0Y2guXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZXF1ZXN0UGVybWlzc2lvbkF1ZGlvIC0gRnVuY3Rpb24gdG8gcmVxdWVzdCBhdWRpbyBwZXJtaXNzaW9uIGZyb20gdGhlIHVzZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jaGVja01lZGlhUGVybWlzc2lvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIGlmIG1lZGlhIHBlcm1pc3Npb24gaXMgZ3JhbnRlZC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGF1ZGlvIGlucHV0IGRldmljZSBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgc3dpdGNoZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgYXVkaW8gaW5wdXQgZGV2aWNlIGNhbm5vdCBiZSBhY2Nlc3NlZCBvciBpZiB0aGVyZSBpcyBhbiB1bmV4cGVjdGVkIGVycm9yLlxuICAgKi9cbiAgYXN5bmMgc3dpdGNoVXNlckF1ZGlvKHsgYXVkaW9QcmVmZXJlbmNlLCBwYXJhbWV0ZXJzIH06IFN3aXRjaFVzZXJBdWRpb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQge1xuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLFxuICAgICAgcHJldkF1ZGlvSW5wdXREZXZpY2UsXG4gICAgICBzaG93QWxlcnQsXG4gICAgICBoYXNBdWRpb1Blcm1pc3Npb24sXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UsXG5cbiAgICAgIC8vIG1lZGlhIGZ1bmN0aW9uc1xuICAgICAgc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoLFxuICAgICAgcmVxdWVzdFBlcm1pc3Npb25BdWRpbyxcbiAgICAgIGNoZWNrTWVkaWFQZXJtaXNzaW9uLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIENoZWNrIGlmIGF1ZGlvIHBlcm1pc3Npb24gaXMgZ3JhbnRlZFxuICAgICAgaWYgKCFoYXNBdWRpb1Blcm1pc3Npb24pIHtcbiAgICAgICAgaWYgKGNoZWNrTWVkaWFQZXJtaXNzaW9uKSB7XG4gICAgICAgICAgbGV0IHN0YXR1c01pYyA9IGF3YWl0IHJlcXVlc3RQZXJtaXNzaW9uQXVkaW8oKTtcbiAgICAgICAgICBpZiAoc3RhdHVzTWljICE9PSAnZ3JhbnRlZCcpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAnQWxsb3cgYWNjZXNzIHRvIHlvdXIgbWljcm9waG9uZSBvciBjaGVjayBpZiB5b3VyIG1pY3JvcGhvbmUgaXMgbm90IGJlaW5nIHVzZWQgYnkgYW5vdGhlciBhcHBsaWNhdGlvbi4nLFxuICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgbWVkaWFDb25zdHJhaW50czogTWVkaWFTdHJlYW1Db25zdHJhaW50cyA9IHtcbiAgICAgICAgYXVkaW86IHtcbiAgICAgICAgICBkZXZpY2VJZDogeyBleGFjdDogYXVkaW9QcmVmZXJlbmNlIH0sXG4gICAgICAgICAgZWNob0NhbmNlbGxhdGlvbjogZmFsc2UsXG4gICAgICAgICAgbm9pc2VTdXBwcmVzc2lvbjogZmFsc2UsXG4gICAgICAgICAgYXV0b0dhaW5Db250cm9sOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgdmlkZW86IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgLy8gR2V0IHVzZXIgbWVkaWEgd2l0aCB0aGUgZGVmaW5lZCBhdWRpbyBjb25zdHJhaW50c1xuICAgICAgYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAuZ2V0VXNlck1lZGlhKG1lZGlhQ29uc3RyYWludHMpXG4gICAgICAgIC50aGVuKGFzeW5jIChzdHJlYW06IE1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgYXdhaXQgc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoKHsgc3RyZWFtLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIC8vIEhhbmRsZSBlcnJvcnMgYW5kIHJldmVydCB0byB0aGUgcHJldmlvdXMgYXVkaW8gaW5wdXQgZGV2aWNlXG4gICAgICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlID0gcHJldkF1ZGlvSW5wdXREZXZpY2U7XG4gICAgICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSk7XG5cbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnRXJyb3Igc3dpdGNoaW5nOyB0aGUgc3BlY2lmaWVkIG1pY3JvcGhvbmUgY291bGQgbm90IGJlIGFjY2Vzc2VkLicsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gSGFuZGxlIHVuZXhwZWN0ZWQgZXJyb3JzIGFuZCByZXZlcnQgdG8gdGhlIHByZXZpb3VzIGF1ZGlvIGlucHV0IGRldmljZVxuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlID0gcHJldkF1ZGlvSW5wdXREZXZpY2U7XG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UodXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKTtcblxuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnRXJyb3Igc3dpdGNoaW5nOyB0aGUgc3BlY2lmaWVkIG1pY3JvcGhvbmUgY291bGQgbm90IGJlIGFjY2Vzc2VkLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19