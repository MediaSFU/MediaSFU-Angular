import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Launches the breakout rooms by toggling the visibility of the breakout rooms modal.
 *
 * This method is used to show or hide the breakout rooms modal based on the current visibility state.
 *
 * @param {LaunchBreakoutRoomsOptions} options - The options object containing necessary variables and functions.
 * @param {Function} options.updateIsBreakoutRoomsModalVisible - Function to update the visibility state of the breakout rooms modal.
 * @param {boolean} options.isBreakoutRoomsModalVisible - Current visibility state of the breakout rooms modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const options: LaunchBreakoutRoomsOptions = {
 *   updateIsBreakoutRoomsModalVisible: (isVisible) => {
 *     console.log('Breakout Rooms Modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isBreakoutRoomsModalVisible: false,
 * };
 *
 * const launchBreakoutRoomsService = new LaunchBreakoutRooms();
 * launchBreakoutRoomsService.launchBreakoutRooms(options);
 * ```
 */
export class LaunchBreakoutRooms {
    /**
     * Launches the breakout rooms by toggling the visibility of the breakout rooms modal.
     *
     * @param updateIsBreakoutRoomsModalVisible - Function to update the visibility state of the breakout rooms modal.
     * @param isBreakoutRoomsModalVisible - Current visibility state of the breakout rooms modal.
     */
    launchBreakoutRooms({ updateIsBreakoutRoomsModalVisible, isBreakoutRoomsModalVisible, }) {
        updateIsBreakoutRoomsModalVisible(!isBreakoutRoomsModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBreakoutRooms, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBreakoutRooms, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBreakoutRooms, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWJyZWFrb3V0LXJvb21zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9icmVha291dC1yb29tLW1ldGhvZHMvbGF1bmNoLWJyZWFrb3V0LXJvb21zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFVM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBTUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7Ozs7T0FLRztJQUVILG1CQUFtQixDQUFDLEVBQ2xCLGlDQUFpQyxFQUNqQywyQkFBMkIsR0FDQTtRQUMzQixpQ0FBaUMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDbEUsQ0FBQzt1R0FiVSxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hCcmVha291dFJvb21zT3B0aW9ucyB7XG4gIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBMYXVuY2hCcmVha291dFJvb21zVHlwZSA9IChvcHRpb25zOiBMYXVuY2hCcmVha291dFJvb21zT3B0aW9ucykgPT4gdm9pZDtcblxuXG4vKipcbiAqIExhdW5jaGVzIHRoZSBicmVha291dCByb29tcyBieSB0b2dnbGluZyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgYnJlYWtvdXQgcm9vbXMgbW9kYWwuXG4gKlxuICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBzaG93IG9yIGhpZGUgdGhlIGJyZWFrb3V0IHJvb21zIG1vZGFsIGJhc2VkIG9uIHRoZSBjdXJyZW50IHZpc2liaWxpdHkgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtMYXVuY2hCcmVha291dFJvb21zT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIG5lY2Vzc2FyeSB2YXJpYWJsZXMgYW5kIGZ1bmN0aW9ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBicmVha291dCByb29tcyBtb2RhbC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGJyZWFrb3V0IHJvb21zIG1vZGFsLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBMYXVuY2hCcmVha291dFJvb21zT3B0aW9ucyA9IHtcbiAqICAgdXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coJ0JyZWFrb3V0IFJvb21zIE1vZGFsIGlzIG5vdzonLCBpc1Zpc2libGUgPyAnVmlzaWJsZScgOiAnSGlkZGVuJyk7XG4gKiAgIH0sXG4gKiAgIGlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogZmFsc2UsXG4gKiB9O1xuICpcbiAqIGNvbnN0IGxhdW5jaEJyZWFrb3V0Um9vbXNTZXJ2aWNlID0gbmV3IExhdW5jaEJyZWFrb3V0Um9vbXMoKTtcbiAqIGxhdW5jaEJyZWFrb3V0Um9vbXNTZXJ2aWNlLmxhdW5jaEJyZWFrb3V0Um9vbXMob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXVuY2hCcmVha291dFJvb21zIHtcbiAgLyoqXG4gICAqIExhdW5jaGVzIHRoZSBicmVha291dCByb29tcyBieSB0b2dnbGluZyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgYnJlYWtvdXQgcm9vbXMgbW9kYWwuXG4gICAqXG4gICAqIEBwYXJhbSB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGJyZWFrb3V0IHJvb21zIG1vZGFsLlxuICAgKiBAcGFyYW0gaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBicmVha291dCByb29tcyBtb2RhbC5cbiAgICovXG5cbiAgbGF1bmNoQnJlYWtvdXRSb29tcyh7XG4gICAgdXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLFxuICAgIGlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZSxcbiAgfTogTGF1bmNoQnJlYWtvdXRSb29tc09wdGlvbnMpOiB2b2lkIHtcbiAgICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUoIWlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==