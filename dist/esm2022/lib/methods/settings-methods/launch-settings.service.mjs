// settings.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchSettings {
    /**
     * Toggles the visibility state of the settings modal.
     *
     * @param {LaunchSettingsOptions} options - The options for launching settings.
     * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility state of the settings modal.
     * @param {boolean} options.isSettingsModalVisible - Current visibility state of the settings modal.
     * @returns {void}
     */
    launchSettings({ updateIsSettingsModalVisible, isSettingsModalVisible, }) {
        // Toggle the visibility of the display settings modal.
        updateIsSettingsModalVisible(!isSettingsModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchSettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchSettings, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchSettings, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXNldHRpbmdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zZXR0aW5ncy1tZXRob2RzL2xhdW5jaC1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFzQjtBQUV0QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQyxNQUFNLE9BQU8sY0FBYztJQUN6Qjs7Ozs7OztPQU9HO0lBRUgsY0FBYyxDQUFDLEVBQ2IsNEJBQTRCLEVBQzVCLHNCQUFzQixHQUNBO1FBQ3RCLHVEQUF1RDtRQUN2RCw0QkFBNEIsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDeEQsQ0FBQzt1R0FoQlUsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXR0aW5ncy5zZXJ2aWNlLnRzXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoU2V0dGluZ3NPcHRpb25zIHtcbiAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNTZXR0aW5nc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTGF1bmNoU2V0dGluZ3NUeXBlID0gKG9wdGlvbnM6IExhdW5jaFNldHRpbmdzT3B0aW9ucykgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaFNldHRpbmdzIHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHNldHRpbmdzIG1vZGFsLlxuICAgKlxuICAgKiBAcGFyYW0ge0xhdW5jaFNldHRpbmdzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBsYXVuY2hpbmcgc2V0dGluZ3MuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgc2V0dGluZ3MgbW9kYWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBzZXR0aW5ncyBtb2RhbC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG4gIGxhdW5jaFNldHRpbmdzKHtcbiAgICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlLFxuICAgIGlzU2V0dGluZ3NNb2RhbFZpc2libGUsXG4gIH06IExhdW5jaFNldHRpbmdzT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZGlzcGxheSBzZXR0aW5ncyBtb2RhbC5cbiAgICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlKCFpc1NldHRpbmdzTW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19