import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SwitchVideo {
    /**
     * Switches the user's video device based on the provided video preference.
     *
     * @param {SwitchVideoParams} options - The function parameters.
     */
    async switchVideo({ videoPreference, parameters }) {
        let { recordStarted, recordResumed, recordStopped, recordPaused, recordingMediaOptions, videoAlreadyOn, userDefaultVideoInputDevice, defVideoID, allowed, updateDefVideoID, updatePrevVideoInputDevice, updateUserDefaultVideoInputDevice, updateIsMediaSettingsModalVisible, 
        //mediasfu functions
        showAlert, switchUserVideo, } = parameters;
        // Check if recording is in progress and whether the selected video device is the default one
        let checkoff = false;
        if ((recordStarted || recordResumed) && !recordStopped && !recordPaused) {
            if (recordingMediaOptions === 'video') {
                checkoff = true;
            }
        }
        // Check camera access permission
        if (!allowed) {
            showAlert?.({
                message: 'Allow access to your camera by starting it for the first time.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        // Check video state and display appropriate alert messages
        if (checkoff) {
            if (videoAlreadyOn) {
                showAlert?.({
                    message: 'Please turn off your video before switching.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        else {
            if (!videoAlreadyOn) {
                showAlert?.({
                    message: 'Please turn on your video before switching.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        // Set default video ID if not already set
        if (!defVideoID) {
            defVideoID = userDefaultVideoInputDevice ?? 'default';
            updateDefVideoID(defVideoID);
        }
        // Switch video only if the selected video device is different from the default
        if (videoPreference !== defVideoID) {
            const prevVideoInputDevice = userDefaultVideoInputDevice;
            updatePrevVideoInputDevice(prevVideoInputDevice);
            userDefaultVideoInputDevice = videoPreference;
            updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);
            if (defVideoID) {
                updateIsMediaSettingsModalVisible(false);
                await switchUserVideo({ videoPreference, checkoff, parameters });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideo, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideo, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideo, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXZpZGVvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9zd2l0Y2gtdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQW9DM0MsTUFBTSxPQUFPLFdBQVc7SUFDdEI7Ozs7T0FJRztJQUVILEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFzQjtRQUNuRSxJQUFJLEVBQ0YsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsWUFBWSxFQUNaLHFCQUFxQixFQUNyQixjQUFjLEVBQ2QsMkJBQTJCLEVBQzNCLFVBQVUsRUFDVixPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLDBCQUEwQixFQUMxQixpQ0FBaUMsRUFDakMsaUNBQWlDO1FBRWpDLG9CQUFvQjtRQUNwQixTQUFTLEVBQ1QsZUFBZSxHQUNoQixHQUFHLFVBQVUsQ0FBQztRQUVmLDZGQUE2RjtRQUM3RixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hFLElBQUkscUJBQXFCLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQ3RDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQztRQUNILENBQUM7UUFFRCxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2IsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLGdFQUFnRTtnQkFDekUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFDSCxPQUFPO1FBQ1QsQ0FBQztRQUVELDJEQUEyRDtRQUMzRCxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ2IsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLDhDQUE4QztvQkFDdkQsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUNILE9BQU87WUFDVCxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3BCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSw2Q0FBNkM7b0JBQ3RELElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxPQUFPO1lBQ1QsQ0FBQztRQUNILENBQUM7UUFFRCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hCLFVBQVUsR0FBRywyQkFBMkIsSUFBSSxTQUFTLENBQUM7WUFDdEQsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVELCtFQUErRTtRQUMvRSxJQUFJLGVBQWUsS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUNuQyxNQUFNLG9CQUFvQixHQUFHLDJCQUEyQixDQUFDO1lBQ3pELDBCQUEwQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFakQsMkJBQTJCLEdBQUcsZUFBZSxDQUFDO1lBQzlDLGlDQUFpQyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFL0QsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDZixpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsTUFBTSxlQUFlLENBQUMsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDbkUsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO3VHQXRGVSxXQUFXOzJHQUFYLFdBQVcsY0FGVixNQUFNOzsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCwgU3dpdGNoVXNlclZpZGVvUGFyYW1ldGVycywgU3dpdGNoVXNlclZpZGVvVHlwZSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoVmlkZW9QYXJhbWV0ZXJzIGV4dGVuZHMgU3dpdGNoVXNlclZpZGVvUGFyYW1ldGVycyB7XG4gIHJlY29yZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHJlY29yZFJlc3VtZWQ6IGJvb2xlYW47XG4gIHJlY29yZFN0b3BwZWQ6IGJvb2xlYW47XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiBzdHJpbmc7XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IHN0cmluZztcbiAgZGVmVmlkZW9JRDogc3RyaW5nO1xuICBhbGxvd2VkOiBib29sZWFuO1xuICB1cGRhdGVEZWZWaWRlb0lEOiAoZGV2aWNlSWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2U6IChkZXZpY2VJZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IChkZXZpY2VJZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcblxuICAvLyBNZWRpYXNmdSBmdW5jdGlvbnNcbiAgc3dpdGNoVXNlclZpZGVvOiBTd2l0Y2hVc2VyVmlkZW9UeXBlO1xuXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTd2l0Y2hWaWRlb09wdGlvbnMge1xuICB2aWRlb1ByZWZlcmVuY2U6IHN0cmluZztcbiAgcGFyYW1ldGVyczogU3dpdGNoVmlkZW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTd2l0Y2hWaWRlb1R5cGUgPSAob3B0aW9uczogU3dpdGNoVmlkZW9PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3dpdGNoVmlkZW8ge1xuICAvKipcbiAgICogU3dpdGNoZXMgdGhlIHVzZXIncyB2aWRlbyBkZXZpY2UgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHZpZGVvIHByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7U3dpdGNoVmlkZW9QYXJhbXN9IG9wdGlvbnMgLSBUaGUgZnVuY3Rpb24gcGFyYW1ldGVycy5cbiAgICovXG5cbiAgYXN5bmMgc3dpdGNoVmlkZW8oeyB2aWRlb1ByZWZlcmVuY2UsIHBhcmFtZXRlcnMgfTogU3dpdGNoVmlkZW9PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHtcbiAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICByZWNvcmRSZXN1bWVkLFxuICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgIHJlY29yZFBhdXNlZCxcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLFxuICAgICAgZGVmVmlkZW9JRCxcbiAgICAgIGFsbG93ZWQsXG4gICAgICB1cGRhdGVEZWZWaWRlb0lELFxuICAgICAgdXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2UsXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UsXG4gICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUsXG5cbiAgICAgIC8vbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICBzaG93QWxlcnQsXG4gICAgICBzd2l0Y2hVc2VyVmlkZW8sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBDaGVjayBpZiByZWNvcmRpbmcgaXMgaW4gcHJvZ3Jlc3MgYW5kIHdoZXRoZXIgdGhlIHNlbGVjdGVkIHZpZGVvIGRldmljZSBpcyB0aGUgZGVmYXVsdCBvbmVcbiAgICBsZXQgY2hlY2tvZmYgPSBmYWxzZTtcbiAgICBpZiAoKHJlY29yZFN0YXJ0ZWQgfHwgcmVjb3JkUmVzdW1lZCkgJiYgIXJlY29yZFN0b3BwZWQgJiYgIXJlY29yZFBhdXNlZCkge1xuICAgICAgaWYgKHJlY29yZGluZ01lZGlhT3B0aW9ucyA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBjaGVja29mZiA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgY2FtZXJhIGFjY2VzcyBwZXJtaXNzaW9uXG4gICAgaWYgKCFhbGxvd2VkKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdBbGxvdyBhY2Nlc3MgdG8geW91ciBjYW1lcmEgYnkgc3RhcnRpbmcgaXQgZm9yIHRoZSBmaXJzdCB0aW1lLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHZpZGVvIHN0YXRlIGFuZCBkaXNwbGF5IGFwcHJvcHJpYXRlIGFsZXJ0IG1lc3NhZ2VzXG4gICAgaWYgKGNoZWNrb2ZmKSB7XG4gICAgICBpZiAodmlkZW9BbHJlYWR5T24pIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgdHVybiBvZmYgeW91ciB2aWRlbyBiZWZvcmUgc3dpdGNoaW5nLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdmlkZW9BbHJlYWR5T24pIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgdHVybiBvbiB5b3VyIHZpZGVvIGJlZm9yZSBzd2l0Y2hpbmcuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgZGVmYXVsdCB2aWRlbyBJRCBpZiBub3QgYWxyZWFkeSBzZXRcbiAgICBpZiAoIWRlZlZpZGVvSUQpIHtcbiAgICAgIGRlZlZpZGVvSUQgPSB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPz8gJ2RlZmF1bHQnO1xuICAgICAgdXBkYXRlRGVmVmlkZW9JRChkZWZWaWRlb0lEKTtcbiAgICB9XG5cbiAgICAvLyBTd2l0Y2ggdmlkZW8gb25seSBpZiB0aGUgc2VsZWN0ZWQgdmlkZW8gZGV2aWNlIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBkZWZhdWx0XG4gICAgaWYgKHZpZGVvUHJlZmVyZW5jZSAhPT0gZGVmVmlkZW9JRCkge1xuICAgICAgY29uc3QgcHJldlZpZGVvSW5wdXREZXZpY2UgPSB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U7XG4gICAgICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZShwcmV2VmlkZW9JbnB1dERldmljZSk7XG5cbiAgICAgIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSA9IHZpZGVvUHJlZmVyZW5jZTtcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSh1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UpO1xuXG4gICAgICBpZiAoZGVmVmlkZW9JRCkge1xuICAgICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICBhd2FpdCBzd2l0Y2hVc2VyVmlkZW8oeyB2aWRlb1ByZWZlcmVuY2UsIGNoZWNrb2ZmLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19