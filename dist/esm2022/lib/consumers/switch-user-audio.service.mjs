import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXVzZXItYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3dpdGNoLXVzZXItYXVkaW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWtDM0MsTUFBTSxPQUFPLGVBQWU7SUFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQTBCO1FBQzNFLElBQUksRUFDRiwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBQ3BCLFNBQVMsRUFDVCxrQkFBa0IsRUFDbEIsaUNBQWlDO1FBRWpDLGtCQUFrQjtRQUNsQix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLG9CQUFvQixHQUNyQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksQ0FBQztZQUNILHVDQUF1QztZQUN2QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO29CQUN6QixJQUFJLFNBQVMsR0FBRyxNQUFNLHNCQUFzQixFQUFFLENBQUM7b0JBQy9DLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUM1QixTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQ0wsdUdBQXVHOzRCQUN6RyxJQUFJLEVBQUUsUUFBUTs0QkFDZCxRQUFRLEVBQUUsSUFBSTt5QkFDZixDQUFDLENBQUM7d0JBRUgsT0FBTztvQkFDVCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsSUFBSSxnQkFBZ0IsR0FBMkI7Z0JBQzdDLEtBQUssRUFBRTtvQkFDTCxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO29CQUNwQyxnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixlQUFlLEVBQUUsS0FBSztpQkFDdkI7Z0JBQ0QsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDO1lBRUYsb0RBQW9EO1lBQ3BELE1BQU0sU0FBUyxDQUFDLFlBQVk7aUJBQ3pCLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFtQixFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sd0JBQXdCLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDViw4REFBOEQ7Z0JBQzlELDJCQUEyQixHQUFHLG9CQUFvQixDQUFDO2dCQUNuRCxpQ0FBaUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUUvRCxTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsa0VBQWtFO29CQUMzRSxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YseUVBQXlFO1lBQ3pFLDJCQUEyQixHQUFHLG9CQUFvQixDQUFDO1lBQ25ELGlDQUFpQyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFL0QsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLGtFQUFrRTtnQkFDM0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQzt1R0F6RlUsZUFBZTsyR0FBZixlQUFlLGNBRmQsTUFBTTs7MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBTaG93QWxlcnQsXG4gIFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaFR5cGUsXG4gIFJlcXVlc3RQZXJtaXNzaW9uQXVkaW9UeXBlLFxuICBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hQYXJhbWV0ZXJzLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaFVzZXJBdWRpb1BhcmFtZXRlcnMgZXh0ZW5kcyBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2hQYXJhbWV0ZXJzIHtcbiAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHByZXZBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgaGFzQXVkaW9QZXJtaXNzaW9uOiBib29sZWFuO1xuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IChkZXZpY2VJZDogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaFR5cGU7XG4gIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW86IFJlcXVlc3RQZXJtaXNzaW9uQXVkaW9UeXBlO1xuICBjaGVja01lZGlhUGVybWlzc2lvbjogYm9vbGVhbjtcblxuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVXNlckF1ZGlvT3B0aW9ucyB7XG4gIGF1ZGlvUHJlZmVyZW5jZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBTd2l0Y2hVc2VyQXVkaW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTd2l0Y2hVc2VyQXVkaW9UeXBlID0gKG9wdGlvbnM6IFN3aXRjaFVzZXJBdWRpb09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTd2l0Y2hVc2VyQXVkaW8ge1xuICAvKipcbiAgICogU3dpdGNoZXMgdGhlIHVzZXIncyBhdWRpbyBpbnB1dCBkZXZpY2UgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGF1ZGlvIHByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7U3dpdGNoVXNlckF1ZGlvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzd2l0Y2hpbmcgdGhlIHVzZXIncyBhdWRpbyBpbnB1dCBkZXZpY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmF1ZGlvUHJlZmVyZW5jZSAtIFRoZSBwcmVmZXJyZWQgYXVkaW8gaW5wdXQgZGV2aWNlIElELlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzd2l0Y2hpbmcgdGhlIGF1ZGlvIGlucHV0IGRldmljZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2QXVkaW9JbnB1dERldmljZSAtIFRoZSBwcmV2aW91cyBhdWRpbyBpbnB1dCBkZXZpY2UgSUQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5oYXNBdWRpb1Blcm1pc3Npb24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgaGFzIGdyYW50ZWQgYXVkaW8gcGVybWlzc2lvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdXNlcidzIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoIC0gRnVuY3Rpb24gdG8gaGFuZGxlIHN1Y2Nlc3NmdWwgYXVkaW8gc3RyZWFtIHN3aXRjaC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlcXVlc3RQZXJtaXNzaW9uQXVkaW8gLSBGdW5jdGlvbiB0byByZXF1ZXN0IGF1ZGlvIHBlcm1pc3Npb24gZnJvbSB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoZWNrTWVkaWFQZXJtaXNzaW9uIC0gRnVuY3Rpb24gdG8gY2hlY2sgaWYgbWVkaWEgcGVybWlzc2lvbiBpcyBncmFudGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXVkaW8gaW5wdXQgZGV2aWNlIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBzd2l0Y2hlZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBhdWRpbyBpbnB1dCBkZXZpY2UgY2Fubm90IGJlIGFjY2Vzc2VkIG9yIGlmIHRoZXJlIGlzIGFuIHVuZXhwZWN0ZWQgZXJyb3IuXG4gICAqL1xuICBhc3luYyBzd2l0Y2hVc2VyQXVkaW8oeyBhdWRpb1ByZWZlcmVuY2UsIHBhcmFtZXRlcnMgfTogU3dpdGNoVXNlckF1ZGlvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB7XG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UsXG4gICAgICBwcmV2QXVkaW9JbnB1dERldmljZSxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIGhhc0F1ZGlvUGVybWlzc2lvbixcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSxcblxuICAgICAgLy8gbWVkaWEgZnVuY3Rpb25zXG4gICAgICBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2gsXG4gICAgICByZXF1ZXN0UGVybWlzc2lvbkF1ZGlvLFxuICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb24sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICB0cnkge1xuICAgICAgLy8gQ2hlY2sgaWYgYXVkaW8gcGVybWlzc2lvbiBpcyBncmFudGVkXG4gICAgICBpZiAoIWhhc0F1ZGlvUGVybWlzc2lvbikge1xuICAgICAgICBpZiAoY2hlY2tNZWRpYVBlcm1pc3Npb24pIHtcbiAgICAgICAgICBsZXQgc3RhdHVzTWljID0gYXdhaXQgcmVxdWVzdFBlcm1pc3Npb25BdWRpbygpO1xuICAgICAgICAgIGlmIChzdGF0dXNNaWMgIT09ICdncmFudGVkJykge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICdBbGxvdyBhY2Nlc3MgdG8geW91ciBtaWNyb3Bob25lIG9yIGNoZWNrIGlmIHlvdXIgbWljcm9waG9uZSBpcyBub3QgYmVpbmcgdXNlZCBieSBhbm90aGVyIGFwcGxpY2F0aW9uLicsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBtZWRpYUNvbnN0cmFpbnRzOiBNZWRpYVN0cmVhbUNvbnN0cmFpbnRzID0ge1xuICAgICAgICBhdWRpbzoge1xuICAgICAgICAgIGRldmljZUlkOiB7IGV4YWN0OiBhdWRpb1ByZWZlcmVuY2UgfSxcbiAgICAgICAgICBlY2hvQ2FuY2VsbGF0aW9uOiBmYWxzZSxcbiAgICAgICAgICBub2lzZVN1cHByZXNzaW9uOiBmYWxzZSxcbiAgICAgICAgICBhdXRvR2FpbkNvbnRyb2w6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB2aWRlbzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgICAvLyBHZXQgdXNlciBtZWRpYSB3aXRoIHRoZSBkZWZpbmVkIGF1ZGlvIGNvbnN0cmFpbnRzXG4gICAgICBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAgIC5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cylcbiAgICAgICAgLnRoZW4oYXN5bmMgKHN0cmVhbTogTWVkaWFTdHJlYW0pID0+IHtcbiAgICAgICAgICBhd2FpdCBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2goeyBzdHJlYW0sIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgLy8gSGFuZGxlIGVycm9ycyBhbmQgcmV2ZXJ0IHRvIHRoZSBwcmV2aW91cyBhdWRpbyBpbnB1dCBkZXZpY2VcbiAgICAgICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSBwcmV2QXVkaW9JbnB1dERldmljZTtcbiAgICAgICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UodXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKTtcblxuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdFcnJvciBzd2l0Y2hpbmc7IHRoZSBzcGVjaWZpZWQgbWljcm9waG9uZSBjb3VsZCBub3QgYmUgYWNjZXNzZWQuJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBIYW5kbGUgdW5leHBlY3RlZCBlcnJvcnMgYW5kIHJldmVydCB0byB0aGUgcHJldmlvdXMgYXVkaW8gaW5wdXQgZGV2aWNlXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSBwcmV2QXVkaW9JbnB1dERldmljZTtcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSh1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UpO1xuXG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdFcnJvciBzd2l0Y2hpbmc7IHRoZSBzcGVjaWZpZWQgbWljcm9waG9uZSBjb3VsZCBub3QgYmUgYWNjZXNzZWQuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=