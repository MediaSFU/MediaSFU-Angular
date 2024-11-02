// settings.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility state of the settings modal.
 *
 * @param {LaunchSettingsOptions} options - The options for launching settings.
 * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility state of the settings modal.
 * @param {boolean} options.isSettingsModalVisible - Current visibility state of the settings modal.
 * @returns {void}
 *
 * @remarks
 * This method toggles the current visibility state of the settings modal.
 * If the modal is currently visible, it will be hidden, and vice versa.
 *
 * @example
 * ```typescript
 * const options: LaunchSettingsOptions = {
 *   updateIsSettingsModalVisible: (isVisible) => {
 *     console.log('Settings modal visibility:', isVisible);
 *   },
 *   isSettingsModalVisible: false,
 * };
 *
 * const launchSettingsService = new LaunchSettings();
 * launchSettingsService.launchSettings(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXNldHRpbmdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zZXR0aW5ncy1tZXRob2RzL2xhdW5jaC1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFzQjtBQUV0QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBTUgsTUFBTSxPQUFPLGNBQWM7SUFDekI7Ozs7Ozs7T0FPRztJQUVILGNBQWMsQ0FBQyxFQUNiLDRCQUE0QixFQUM1QixzQkFBc0IsR0FDQTtRQUN0Qix1REFBdUQ7UUFDdkQsNEJBQTRCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3hELENBQUM7dUdBaEJVLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2V0dGluZ3Muc2VydmljZS50c1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIExhdW5jaFNldHRpbmdzT3B0aW9ucyB7XG4gIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzU2V0dGluZ3NNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaFNldHRpbmdzVHlwZSA9IChvcHRpb25zOiBMYXVuY2hTZXR0aW5nc09wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgc2V0dGluZ3MgbW9kYWwuXG4gKlxuICogQHBhcmFtIHtMYXVuY2hTZXR0aW5nc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgbGF1bmNoaW5nIHNldHRpbmdzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBzZXR0aW5ncyBtb2RhbC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBzZXR0aW5ncyBtb2RhbC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGlzIG1ldGhvZCB0b2dnbGVzIHRoZSBjdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHNldHRpbmdzIG1vZGFsLlxuICogSWYgdGhlIG1vZGFsIGlzIGN1cnJlbnRseSB2aXNpYmxlLCBpdCB3aWxsIGJlIGhpZGRlbiwgYW5kIHZpY2UgdmVyc2EuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IExhdW5jaFNldHRpbmdzT3B0aW9ucyA9IHtcbiAqICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZSkgPT4ge1xuICogICAgIGNvbnNvbGUubG9nKCdTZXR0aW5ncyBtb2RhbCB2aXNpYmlsaXR5OicsIGlzVmlzaWJsZSk7XG4gKiAgIH0sXG4gKiAgIGlzU2V0dGluZ3NNb2RhbFZpc2libGU6IGZhbHNlLFxuICogfTtcbiAqXG4gKiBjb25zdCBsYXVuY2hTZXR0aW5nc1NlcnZpY2UgPSBuZXcgTGF1bmNoU2V0dGluZ3MoKTtcbiAqIGxhdW5jaFNldHRpbmdzU2VydmljZS5sYXVuY2hTZXR0aW5ncyhvcHRpb25zKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaFNldHRpbmdzIHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHNldHRpbmdzIG1vZGFsLlxuICAgKlxuICAgKiBAcGFyYW0ge0xhdW5jaFNldHRpbmdzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBsYXVuY2hpbmcgc2V0dGluZ3MuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgc2V0dGluZ3MgbW9kYWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBzZXR0aW5ncyBtb2RhbC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG4gIGxhdW5jaFNldHRpbmdzKHtcbiAgICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlLFxuICAgIGlzU2V0dGluZ3NNb2RhbFZpc2libGUsXG4gIH06IExhdW5jaFNldHRpbmdzT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZGlzcGxheSBzZXR0aW5ncyBtb2RhbC5cbiAgICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlKCFpc1NldHRpbmdzTW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19