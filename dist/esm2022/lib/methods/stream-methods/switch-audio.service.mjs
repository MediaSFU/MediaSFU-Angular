import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Switches the audio input device based on user preference.
 *
 * @param {SwitchAudioOptions} options - The options for switching the audio input.
 * @param {string} options.audioPreference - The ID of the preferred audio input device.
 * @param {SwitchAudioParameters} options.parameters - The parameters required for switching the audio.
 * @param {string} options.parameters.defAudioID - The default audio input device ID.
 * @param {string} options.parameters.userDefaultAudioInputDevice - The current default audio input device ID.
 * @param {string} options.parameters.prevAudioInputDevice - The previously used audio input device ID.
 * @param {Function} options.parameters.updateUserDefaultAudioInputDevice - Function to update the user's default audio input device.
 * @param {Function} options.parameters.updatePrevAudioInputDevice - Function to update the previous audio input device.
 * @param {Function} options.parameters.switchUserAudio - Function to switch the user's audio.
 *
 * @returns {Promise<void>} A promise that resolves when the audio input has been switched.
 *
 * @remarks
 * This function checks if the user's preferred audio device differs from the current default.
 * If so, it updates the previous audio device and the current default audio device.
 * It then calls the function to switch the user's audio.
 *
 * @example
 * ```typescript
 * const options: SwitchAudioOptions = {
 *   audioPreference: 'newAudioDeviceID',
 *   parameters: {
 *     defAudioID: 'defaultAudioDeviceID',
 *     userDefaultAudioInputDevice: 'currentAudioDeviceID',
 *     prevAudioInputDevice: '',
 *     updateUserDefaultAudioInputDevice: (deviceId) => console.log(`Updated to: ${deviceId}`),
 *     updatePrevAudioInputDevice: (deviceId) => console.log(`Previous device was: ${deviceId}`),
 *     switchUserAudio: async ({ audioPreference, parameters }) => {
 *       console.log(`Switching audio to: ${audioPreference}`);
 *     },
 *     getUpdatedAllParams: () => {
 *       return {
 *         defAudioID: 'defaultAudioDeviceID',
 *         userDefaultAudioInputDevice: 'currentAudioDeviceID',
 *         prevAudioInputDevice: '',
 *       };
 *     },
 *   },
 * };
 *
 * const switchAudioService = new SwitchAudio();
 * await switchAudioService.switchAudio(options);
 * ```
 */
export class SwitchAudio {
    /**
     * Switches the audio input device based on user preference.
     *
     * @param {SwitchAudioParams} options - The function parameters.
     * @returns {Promise<void>}
     */
    async switchAudio({ audioPreference, parameters }) {
        let { defAudioID, userDefaultAudioInputDevice, prevAudioInputDevice, updateUserDefaultAudioInputDevice, updatePrevAudioInputDevice, 
        //mediasfu functions
        switchUserAudio, } = parameters;
        if (audioPreference !== defAudioID) {
            prevAudioInputDevice = userDefaultAudioInputDevice;
            updatePrevAudioInputDevice(prevAudioInputDevice);
            userDefaultAudioInputDevice = audioPreference;
            updateUserDefaultAudioInputDevice(userDefaultAudioInputDevice);
            if (defAudioID) {
                await switchUserAudio({ audioPreference, parameters });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLWF1ZGlvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9zd2l0Y2gtYXVkaW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXlCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Q0c7QUFLSCxNQUFNLE9BQU8sV0FBVztJQUN0Qjs7Ozs7T0FLRztJQUVILEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFzQjtRQUNuRSxJQUFJLEVBQ0YsVUFBVSxFQUNWLDJCQUEyQixFQUMzQixvQkFBb0IsRUFDcEIsaUNBQWlDLEVBQ2pDLDBCQUEwQjtRQUUxQixvQkFBb0I7UUFDcEIsZUFBZSxHQUNoQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksZUFBZSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ25DLG9CQUFvQixHQUFHLDJCQUEyQixDQUFDO1lBQ25ELDBCQUEwQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDakQsMkJBQTJCLEdBQUcsZUFBZSxDQUFDO1lBQzlDLGlDQUFpQyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFL0QsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDZixNQUFNLGVBQWUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzt1R0E5QlUsV0FBVzsyR0FBWCxXQUFXLGNBRlYsTUFBTTs7MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyQXVkaW9UeXBlLCBTd2l0Y2hVc2VyQXVkaW9QYXJhbWV0ZXJzIH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTd2l0Y2hBdWRpb1BhcmFtZXRlcnMgZXh0ZW5kcyBTd2l0Y2hVc2VyQXVkaW9QYXJhbWV0ZXJzIHtcbiAgZGVmQXVkaW9JRDogc3RyaW5nO1xuICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHN0cmluZztcbiAgcHJldkF1ZGlvSW5wdXREZXZpY2U6IHN0cmluZztcbiAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiAoZGV2aWNlSWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2U6IChkZXZpY2VJZDogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzd2l0Y2hVc2VyQXVkaW86IFN3aXRjaFVzZXJBdWRpb1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gU3dpdGNoQXVkaW9QYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoQXVkaW9PcHRpb25zIHtcbiAgYXVkaW9QcmVmZXJlbmNlOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IFN3aXRjaEF1ZGlvUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3dpdGNoQXVkaW9UeXBlID0gKG9wdGlvbnM6IFN3aXRjaEF1ZGlvT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTd2l0Y2hlcyB0aGUgYXVkaW8gaW5wdXQgZGV2aWNlIGJhc2VkIG9uIHVzZXIgcHJlZmVyZW5jZS5cbiAqXG4gKiBAcGFyYW0ge1N3aXRjaEF1ZGlvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzd2l0Y2hpbmcgdGhlIGF1ZGlvIGlucHV0LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXVkaW9QcmVmZXJlbmNlIC0gVGhlIElEIG9mIHRoZSBwcmVmZXJyZWQgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICogQHBhcmFtIHtTd2l0Y2hBdWRpb1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzd2l0Y2hpbmcgdGhlIGF1ZGlvLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5kZWZBdWRpb0lEIC0gVGhlIGRlZmF1bHQgYXVkaW8gaW5wdXQgZGV2aWNlIElELlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy51c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgLSBUaGUgY3VycmVudCBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZSBJRC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldkF1ZGlvSW5wdXREZXZpY2UgLSBUaGUgcHJldmlvdXNseSB1c2VkIGF1ZGlvIGlucHV0IGRldmljZSBJRC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHVzZXIncyBkZWZhdWx0IGF1ZGlvIGlucHV0IGRldmljZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJldmlvdXMgYXVkaW8gaW5wdXQgZGV2aWNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN3aXRjaFVzZXJBdWRpbyAtIEZ1bmN0aW9uIHRvIHN3aXRjaCB0aGUgdXNlcidzIGF1ZGlvLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhdWRpbyBpbnB1dCBoYXMgYmVlbiBzd2l0Y2hlZC5cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIHVzZXIncyBwcmVmZXJyZWQgYXVkaW8gZGV2aWNlIGRpZmZlcnMgZnJvbSB0aGUgY3VycmVudCBkZWZhdWx0LlxuICogSWYgc28sIGl0IHVwZGF0ZXMgdGhlIHByZXZpb3VzIGF1ZGlvIGRldmljZSBhbmQgdGhlIGN1cnJlbnQgZGVmYXVsdCBhdWRpbyBkZXZpY2UuXG4gKiBJdCB0aGVuIGNhbGxzIHRoZSBmdW5jdGlvbiB0byBzd2l0Y2ggdGhlIHVzZXIncyBhdWRpby5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9uczogU3dpdGNoQXVkaW9PcHRpb25zID0ge1xuICogICBhdWRpb1ByZWZlcmVuY2U6ICduZXdBdWRpb0RldmljZUlEJyxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIGRlZkF1ZGlvSUQ6ICdkZWZhdWx0QXVkaW9EZXZpY2VJRCcsXG4gKiAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiAnY3VycmVudEF1ZGlvRGV2aWNlSUQnLFxuICogICAgIHByZXZBdWRpb0lucHV0RGV2aWNlOiAnJyxcbiAqICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IChkZXZpY2VJZCkgPT4gY29uc29sZS5sb2coYFVwZGF0ZWQgdG86ICR7ZGV2aWNlSWR9YCksXG4gKiAgICAgdXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2U6IChkZXZpY2VJZCkgPT4gY29uc29sZS5sb2coYFByZXZpb3VzIGRldmljZSB3YXM6ICR7ZGV2aWNlSWR9YCksXG4gKiAgICAgc3dpdGNoVXNlckF1ZGlvOiBhc3luYyAoeyBhdWRpb1ByZWZlcmVuY2UsIHBhcmFtZXRlcnMgfSkgPT4ge1xuICogICAgICAgY29uc29sZS5sb2coYFN3aXRjaGluZyBhdWRpbyB0bzogJHthdWRpb1ByZWZlcmVuY2V9YCk7XG4gKiAgICAgfSxcbiAqICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiB7XG4gKiAgICAgICByZXR1cm4ge1xuICogICAgICAgICBkZWZBdWRpb0lEOiAnZGVmYXVsdEF1ZGlvRGV2aWNlSUQnLFxuICogICAgICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6ICdjdXJyZW50QXVkaW9EZXZpY2VJRCcsXG4gKiAgICAgICAgIHByZXZBdWRpb0lucHV0RGV2aWNlOiAnJyxcbiAqICAgICAgIH07XG4gKiAgICAgfSxcbiAqICAgfSxcbiAqIH07XG4gKlxuICogY29uc3Qgc3dpdGNoQXVkaW9TZXJ2aWNlID0gbmV3IFN3aXRjaEF1ZGlvKCk7XG4gKiBhd2FpdCBzd2l0Y2hBdWRpb1NlcnZpY2Uuc3dpdGNoQXVkaW8ob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3dpdGNoQXVkaW8ge1xuICAvKipcbiAgICogU3dpdGNoZXMgdGhlIGF1ZGlvIGlucHV0IGRldmljZSBiYXNlZCBvbiB1c2VyIHByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7U3dpdGNoQXVkaW9QYXJhbXN9IG9wdGlvbnMgLSBUaGUgZnVuY3Rpb24gcGFyYW1ldGVycy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuXG4gIGFzeW5jIHN3aXRjaEF1ZGlvKHsgYXVkaW9QcmVmZXJlbmNlLCBwYXJhbWV0ZXJzIH06IFN3aXRjaEF1ZGlvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB7XG4gICAgICBkZWZBdWRpb0lELFxuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLFxuICAgICAgcHJldkF1ZGlvSW5wdXREZXZpY2UsXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UsXG4gICAgICB1cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZSxcblxuICAgICAgLy9tZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIHN3aXRjaFVzZXJBdWRpbyxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGlmIChhdWRpb1ByZWZlcmVuY2UgIT09IGRlZkF1ZGlvSUQpIHtcbiAgICAgIHByZXZBdWRpb0lucHV0RGV2aWNlID0gdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlO1xuICAgICAgdXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2UocHJldkF1ZGlvSW5wdXREZXZpY2UpO1xuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlID0gYXVkaW9QcmVmZXJlbmNlO1xuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSk7XG5cbiAgICAgIGlmIChkZWZBdWRpb0lEKSB7XG4gICAgICAgIGF3YWl0IHN3aXRjaFVzZXJBdWRpbyh7IGF1ZGlvUHJlZmVyZW5jZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==