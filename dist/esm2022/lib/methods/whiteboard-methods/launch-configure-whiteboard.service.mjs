// whiteboard.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility of the configure whiteboard modal.
 *
 * @param {LaunchConfigureWhiteboardOptions} options - Options to control whiteboard configuration modal.
 * @param {Function} options.updateIsConfigureWhiteboardModalVisible - Function to update the modal's visibility state.
 * @param {boolean} options.isConfigureWhiteboardModalVisible - Current visibility state of the configure whiteboard modal.
 *
 * This function uses the current visibility state to toggle the whiteboard configuration modal on or off.
 *
 * @example
 * ```typescript
 * const launchService = new LaunchConfigureWhiteboard();
 * launchService.launchConfigureWhiteboard({
 *   updateIsConfigureWhiteboardModalVisible: (visible) => console.log('Modal Visible:', visible),
 *   isConfigureWhiteboardModalVisible: false
 * });
 * ```
 *
 * In this example, the modal visibility state is toggled, and the updated visibility state is logged.
 */
export class LaunchConfigureWhiteboard {
    /**
     * Toggles the visibility of the configure whiteboard modal.
     *
     * @param updateIsConfigureWhiteboardModalVisible - Function to update the visibility state of the configure whiteboard modal.
     * @param isConfigureWhiteboardModalVisible - Current visibility state of the configure whiteboard modal.
     */
    launchConfigureWhiteboard({ updateIsConfigureWhiteboardModalVisible, isConfigureWhiteboardModalVisible, }) {
        // Open or close the menu modal
        updateIsConfigureWhiteboardModalVisible(!isConfigureWhiteboardModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfigureWhiteboard, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfigureWhiteboard, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfigureWhiteboard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWNvbmZpZ3VyZS13aGl0ZWJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvbGF1bmNoLWNvbmZpZ3VyZS13aGl0ZWJvYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXdCO0FBQ3hCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBTUgsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQzs7Ozs7T0FLRztJQUVILHlCQUF5QixDQUFDLEVBQ3hCLHVDQUF1QyxFQUN2QyxpQ0FBaUMsR0FDQTtRQUNqQywrQkFBK0I7UUFDL0IsdUNBQXVDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7dUdBZFUseUJBQXlCOzJHQUF6Qix5QkFBeUIsY0FGeEIsTUFBTTs7MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHdoaXRlYm9hcmQuc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkT3B0aW9ucyB7XG4gIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZFR5cGUgPSAob3B0aW9uczogTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgY29uZmlndXJlIHdoaXRlYm9hcmQgbW9kYWwuXG4gKlxuICogQHBhcmFtIHtMYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkT3B0aW9uc30gb3B0aW9ucyAtIE9wdGlvbnMgdG8gY29udHJvbCB3aGl0ZWJvYXJkIGNvbmZpZ3VyYXRpb24gbW9kYWwuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbW9kYWwncyB2aXNpYmlsaXR5IHN0YXRlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSAtIEN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgY29uZmlndXJlIHdoaXRlYm9hcmQgbW9kYWwuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB1c2VzIHRoZSBjdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgdG8gdG9nZ2xlIHRoZSB3aGl0ZWJvYXJkIGNvbmZpZ3VyYXRpb24gbW9kYWwgb24gb3Igb2ZmLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBsYXVuY2hTZXJ2aWNlID0gbmV3IExhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmQoKTtcbiAqIGxhdW5jaFNlcnZpY2UubGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCh7XG4gKiAgIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogKHZpc2libGUpID0+IGNvbnNvbGUubG9nKCdNb2RhbCBWaXNpYmxlOicsIHZpc2libGUpLFxuICogICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6IGZhbHNlXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEluIHRoaXMgZXhhbXBsZSwgdGhlIG1vZGFsIHZpc2liaWxpdHkgc3RhdGUgaXMgdG9nZ2xlZCwgYW5kIHRoZSB1cGRhdGVkIHZpc2liaWxpdHkgc3RhdGUgaXMgbG9nZ2VkLlxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmQge1xuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgY29uZmlndXJlIHdoaXRlYm9hcmQgbW9kYWwuXG4gICAqXG4gICAqIEBwYXJhbSB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGNvbmZpZ3VyZSB3aGl0ZWJvYXJkIG1vZGFsLlxuICAgKiBAcGFyYW0gaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBjb25maWd1cmUgd2hpdGVib2FyZCBtb2RhbC5cbiAgICovXG5cbiAgbGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCh7XG4gICAgdXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLFxuICAgIGlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSxcbiAgfTogTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZE9wdGlvbnMpOiB2b2lkIHtcbiAgICAvLyBPcGVuIG9yIGNsb3NlIHRoZSBtZW51IG1vZGFsXG4gICAgdXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKCFpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUpO1xuICB9XG59XG4iXX0=