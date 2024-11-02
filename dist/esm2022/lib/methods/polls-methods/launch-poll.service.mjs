import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility of the poll modal.
 *
 * @param {LaunchPollOptions} options - The options object containing necessary variables and functions.
 * @param {Function} options.updateIsPollModalVisible - Function to update the visibility state of the poll modal.
 * @param {boolean} options.isPollModalVisible - Current visibility state of the poll modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const launchPollService = new LaunchPoll();
 * launchPollService.launchPoll({
 *   updateIsPollModalVisible: (isVisible) => {
 *     console.log('Poll modal visibility:', isVisible);
 *   },
 *   isPollModalVisible: false,
 * });
 * ```
 */
export class LaunchPoll {
    /**
     * Toggles the visibility of the poll modal.
     * @function
     * @param {Object} options - The options object containing necessary variables and functions.
     * @param {Function} options.updateIsPollModalVisible - Function to update the visibility state of the poll modal.
     * @param {boolean} options.isPollModalVisible - Current visibility state of the poll modal.
     */
    launchPoll({ updateIsPollModalVisible, isPollModalVisible }) {
        updateIsPollModalVisible(!isPollModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchPoll, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchPoll, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchPoll, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXBvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3BvbGxzLW1ldGhvZHMvbGF1bmNoLXBvbGwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQU1ILE1BQU0sT0FBTyxVQUFVO0lBQ3JCOzs7Ozs7T0FNRztJQUVILFVBQVUsQ0FBQyxFQUFFLHdCQUF3QixFQUFFLGtCQUFrQixFQUFxQjtRQUM1RSx3QkFBd0IsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDaEQsQ0FBQzt1R0FYVSxVQUFVOzJHQUFWLFVBQVUsY0FGVCxNQUFNOzsyRkFFUCxVQUFVO2tCQUh0QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoUG9sbE9wdGlvbnMge1xuICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzUG9sbE1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTGF1bmNoUG9sbFR5cGUgPSAob3B0aW9uczogTGF1bmNoUG9sbE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcG9sbCBtb2RhbC5cbiAqXG4gKiBAcGFyYW0ge0xhdW5jaFBvbGxPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgbmVjZXNzYXJ5IHZhcmlhYmxlcyBhbmQgZnVuY3Rpb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHBvbGwgbW9kYWwuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNQb2xsTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBwb2xsIG1vZGFsLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBsYXVuY2hQb2xsU2VydmljZSA9IG5ldyBMYXVuY2hQb2xsKCk7XG4gKiBsYXVuY2hQb2xsU2VydmljZS5sYXVuY2hQb2xsKHtcbiAqICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coJ1BvbGwgbW9kYWwgdmlzaWJpbGl0eTonLCBpc1Zpc2libGUpO1xuICogICB9LFxuICogICBpc1BvbGxNb2RhbFZpc2libGU6IGZhbHNlLFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXVuY2hQb2xsIHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHBvbGwgbW9kYWwuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIG5lY2Vzc2FyeSB2YXJpYWJsZXMgYW5kIGZ1bmN0aW9ucy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHBvbGwgbW9kYWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1BvbGxNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHBvbGwgbW9kYWwuXG4gICAqL1xuXG4gIGxhdW5jaFBvbGwoeyB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGUsIGlzUG9sbE1vZGFsVmlzaWJsZSB9OiBMYXVuY2hQb2xsT3B0aW9ucyk6IHZvaWQge1xuICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSghaXNQb2xsTW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19