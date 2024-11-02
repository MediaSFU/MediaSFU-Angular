import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility of the background modal.
 *
 * This method updates the visibility state of the background modal by calling
 * the provided update function with the negation of the current visibility state.
 *
 * @param {LaunchBackgroundOptions} options - The options object containing necessary variables and functions.
 * @param {Function} options.updateIsBackgroundModalVisible - Function to update the visibility state of the background modal.
 * @param {boolean} options.isBackgroundModalVisible - Current visibility state of the background modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const options = {
 *   updateIsBackgroundModalVisible: (isVisible) => {
 *     console.log(`Background modal is now ${isVisible ? 'visible' : 'hidden'}.`);
 *   },
 *   isBackgroundModalVisible: false,
 * };
 *
 * const launchBackgroundService = new LaunchBackground();
 * launchBackgroundService.launchBackground(options);
 * ```
 */
export class LaunchBackground {
    /**
     * Toggles the visibility of the background modal.
     * @function
     * @param {Object} options - The options object containing necessary variables and functions.
     * @param {Function} options.updateIsBackgroundModalVisible - Function to update the visibility state of the background modal.
     * @param {boolean} options.isBackgroundModalVisible - Current visibility state of the background modal.
     */
    launchBackground({ updateIsBackgroundModalVisible, isBackgroundModalVisible, }) {
        updateIsBackgroundModalVisible(!isBackgroundModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBackground, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBackground, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBackground, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWJhY2tncm91bmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2JhY2tncm91bmQtbWV0aG9kcy9sYXVuY2gtYmFja2dyb3VuZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFLSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7T0FNRztJQUVILGdCQUFnQixDQUFDLEVBQ2YsOEJBQThCLEVBQzlCLHdCQUF3QixHQUNBO1FBQ3hCLDhCQUE4QixDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUM1RCxDQUFDO3VHQWRVLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoQmFja2dyb3VuZE9wdGlvbnMge1xuICB1cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTGF1bmNoQmFja2dyb3VuZFR5cGUgPSAob3B0aW9uczogTGF1bmNoQmFja2dyb3VuZE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgYmFja2dyb3VuZCBtb2RhbC5cbiAqXG4gKiBUaGlzIG1ldGhvZCB1cGRhdGVzIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBiYWNrZ3JvdW5kIG1vZGFsIGJ5IGNhbGxpbmdcbiAqIHRoZSBwcm92aWRlZCB1cGRhdGUgZnVuY3Rpb24gd2l0aCB0aGUgbmVnYXRpb24gb2YgdGhlIGN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0xhdW5jaEJhY2tncm91bmRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgbmVjZXNzYXJ5IHZhcmlhYmxlcyBhbmQgZnVuY3Rpb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGJhY2tncm91bmQgbW9kYWwuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBiYWNrZ3JvdW5kIG1vZGFsLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICB1cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGU6IChpc1Zpc2libGUpID0+IHtcbiAqICAgICBjb25zb2xlLmxvZyhgQmFja2dyb3VuZCBtb2RhbCBpcyBub3cgJHtpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJ30uYCk7XG4gKiAgIH0sXG4gKiAgIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogZmFsc2UsXG4gKiB9O1xuICpcbiAqIGNvbnN0IGxhdW5jaEJhY2tncm91bmRTZXJ2aWNlID0gbmV3IExhdW5jaEJhY2tncm91bmQoKTtcbiAqIGxhdW5jaEJhY2tncm91bmRTZXJ2aWNlLmxhdW5jaEJhY2tncm91bmQob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTGF1bmNoQmFja2dyb3VuZCB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBiYWNrZ3JvdW5kIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBuZWNlc3NhcnkgdmFyaWFibGVzIGFuZCBmdW5jdGlvbnMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBiYWNrZ3JvdW5kIG1vZGFsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBiYWNrZ3JvdW5kIG1vZGFsLlxuICAgKi9cblxuICBsYXVuY2hCYWNrZ3JvdW5kKHtcbiAgICB1cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUsXG4gICAgaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLFxuICB9OiBMYXVuY2hCYWNrZ3JvdW5kT3B0aW9ucyk6IHZvaWQge1xuICAgIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSghaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19