// display-settings.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility of the display settings modal.
 *
 * This method allows you to show or hide the display settings modal by updating its visibility state.
 *
 * @param {LaunchDisplaySettingsOptions} options - The options for launching the display settings.
 * @param {Function} options.updateIsDisplaySettingsModalVisible - Function to update the visibility state of the display settings modal.
 * @param {boolean} options.isDisplaySettingsModalVisible - Current visibility state of the display settings modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const options: LaunchDisplaySettingsOptions = {
 *   updateIsDisplaySettingsModalVisible: (isVisible) => console.log('Display settings modal is now:', isVisible),
 *   isDisplaySettingsModalVisible: false,
 * };
 *
 * const launchDisplaySettingsService = new LaunchDisplaySettings();
 * launchDisplaySettingsService.launchDisplaySettings(options);
 * ```
 */
export class LaunchDisplaySettings {
    /**
     * Toggles the visibility of the display settings modal.
     *
     * @param updateIsDisplaySettingsModalVisible - Function to update the visibility state of the display settings modal.
     * @param isDisplaySettingsModalVisible - Current visibility state of the display settings modal.
     */
    launchDisplaySettings({ updateIsDisplaySettingsModalVisible, isDisplaySettingsModalVisible, }) {
        // Toggle the visibility of the display settings modal.
        updateIsDisplaySettingsModalVisible(!isDisplaySettingsModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchDisplaySettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchDisplaySettings, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchDisplaySettings, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWRpc3BsYXktc2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2Rpc3BsYXktc2V0dGluZ3MtbWV0aG9kcy9sYXVuY2gtZGlzcGxheS1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhCQUE4QjtBQUM5QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBS0gsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQzs7Ozs7T0FLRztJQUVILHFCQUFxQixDQUFDLEVBQ3BCLG1DQUFtQyxFQUNuQyw2QkFBNkIsR0FDQTtRQUM3Qix1REFBdUQ7UUFDdkQsbUNBQW1DLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7dUdBZFUscUJBQXFCOzJHQUFyQixxQkFBcUIsY0FGcEIsTUFBTTs7MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGRpc3BsYXktc2V0dGluZ3Muc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExhdW5jaERpc3BsYXlTZXR0aW5nc09wdGlvbnMge1xuICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaERpc3BsYXlTZXR0aW5nc1R5cGUgPSAob3B0aW9uczogTGF1bmNoRGlzcGxheVNldHRpbmdzT3B0aW9ucykgPT4gdm9pZDtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBkaXNwbGF5IHNldHRpbmdzIG1vZGFsLlxuICpcbiAqIFRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gc2hvdyBvciBoaWRlIHRoZSBkaXNwbGF5IHNldHRpbmdzIG1vZGFsIGJ5IHVwZGF0aW5nIGl0cyB2aXNpYmlsaXR5IHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7TGF1bmNoRGlzcGxheVNldHRpbmdzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBsYXVuY2hpbmcgdGhlIGRpc3BsYXkgc2V0dGluZ3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBkaXNwbGF5IHNldHRpbmdzIG1vZGFsLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBkaXNwbGF5IHNldHRpbmdzIG1vZGFsLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBMYXVuY2hEaXNwbGF5U2V0dGluZ3NPcHRpb25zID0ge1xuICogICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZSkgPT4gY29uc29sZS5sb2coJ0Rpc3BsYXkgc2V0dGluZ3MgbW9kYWwgaXMgbm93OicsIGlzVmlzaWJsZSksXG4gKiAgIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiBmYWxzZSxcbiAqIH07XG4gKlxuICogY29uc3QgbGF1bmNoRGlzcGxheVNldHRpbmdzU2VydmljZSA9IG5ldyBMYXVuY2hEaXNwbGF5U2V0dGluZ3MoKTtcbiAqIGxhdW5jaERpc3BsYXlTZXR0aW5nc1NlcnZpY2UubGF1bmNoRGlzcGxheVNldHRpbmdzKG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaERpc3BsYXlTZXR0aW5ncyB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBkaXNwbGF5IHNldHRpbmdzIG1vZGFsLlxuICAgKlxuICAgKiBAcGFyYW0gdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGRpc3BsYXkgc2V0dGluZ3MgbW9kYWwuXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSAtIEN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgZGlzcGxheSBzZXR0aW5ncyBtb2RhbC5cbiAgICovXG5cbiAgbGF1bmNoRGlzcGxheVNldHRpbmdzKHtcbiAgICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSxcbiAgICBpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSxcbiAgfTogTGF1bmNoRGlzcGxheVNldHRpbmdzT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZGlzcGxheSBzZXR0aW5ncyBtb2RhbC5cbiAgICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSghaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUpO1xuICB9XG59XG4iXX0=