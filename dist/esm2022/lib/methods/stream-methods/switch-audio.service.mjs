import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLWF1ZGlvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9zd2l0Y2gtYXVkaW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTRCM0MsTUFBTSxPQUFPLFdBQVc7SUFDdEI7Ozs7O09BS0c7SUFFSCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBc0I7UUFDbkUsSUFBSSxFQUNGLFVBQVUsRUFDViwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBQ3BCLGlDQUFpQyxFQUNqQywwQkFBMEI7UUFFMUIsb0JBQW9CO1FBQ3BCLGVBQWUsR0FDaEIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLGVBQWUsS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUNuQyxvQkFBb0IsR0FBRywyQkFBMkIsQ0FBQztZQUNuRCwwQkFBMEIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2pELDJCQUEyQixHQUFHLGVBQWUsQ0FBQztZQUM5QyxpQ0FBaUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBRS9ELElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ2YsTUFBTSxlQUFlLENBQUMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN6RCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7dUdBOUJVLFdBQVc7MkdBQVgsV0FBVyxjQUZWLE1BQU07OzJGQUVQLFdBQVc7a0JBSHZCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3dpdGNoVXNlckF1ZGlvVHlwZSwgU3dpdGNoVXNlckF1ZGlvUGFyYW1ldGVycyB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoQXVkaW9QYXJhbWV0ZXJzIGV4dGVuZHMgU3dpdGNoVXNlckF1ZGlvUGFyYW1ldGVycyB7XG4gIGRlZkF1ZGlvSUQ6IHN0cmluZztcbiAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHByZXZBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogKGRldmljZUlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVByZXZBdWRpb0lucHV0RGV2aWNlOiAoZGV2aWNlSWQ6IHN0cmluZykgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc3dpdGNoVXNlckF1ZGlvOiBTd2l0Y2hVc2VyQXVkaW9UeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFN3aXRjaEF1ZGlvUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaEF1ZGlvT3B0aW9ucyB7XG4gIGF1ZGlvUHJlZmVyZW5jZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBTd2l0Y2hBdWRpb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN3aXRjaEF1ZGlvVHlwZSA9IChvcHRpb25zOiBTd2l0Y2hBdWRpb09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTd2l0Y2hBdWRpbyB7XG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0aGUgYXVkaW8gaW5wdXQgZGV2aWNlIGJhc2VkIG9uIHVzZXIgcHJlZmVyZW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtTd2l0Y2hBdWRpb1BhcmFtc30gb3B0aW9ucyAtIFRoZSBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG5cbiAgYXN5bmMgc3dpdGNoQXVkaW8oeyBhdWRpb1ByZWZlcmVuY2UsIHBhcmFtZXRlcnMgfTogU3dpdGNoQXVkaW9PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHtcbiAgICAgIGRlZkF1ZGlvSUQsXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UsXG4gICAgICBwcmV2QXVkaW9JbnB1dERldmljZSxcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSxcbiAgICAgIHVwZGF0ZVByZXZBdWRpb0lucHV0RGV2aWNlLFxuXG4gICAgICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgc3dpdGNoVXNlckF1ZGlvLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgaWYgKGF1ZGlvUHJlZmVyZW5jZSAhPT0gZGVmQXVkaW9JRCkge1xuICAgICAgcHJldkF1ZGlvSW5wdXREZXZpY2UgPSB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U7XG4gICAgICB1cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZShwcmV2QXVkaW9JbnB1dERldmljZSk7XG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSBhdWRpb1ByZWZlcmVuY2U7XG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UodXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlKTtcblxuICAgICAgaWYgKGRlZkF1ZGlvSUQpIHtcbiAgICAgICAgYXdhaXQgc3dpdGNoVXNlckF1ZGlvKHsgYXVkaW9QcmVmZXJlbmNlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19