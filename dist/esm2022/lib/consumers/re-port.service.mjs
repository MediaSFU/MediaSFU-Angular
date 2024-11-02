import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * RePort function that handles the reporting logic based on the provided parameters.
 *
 * This method checks the current state of the recording process and updates the screen states
 * accordingly. It also compares active names and screen states based on the provided parameters.
 *
 * @param {RePortOptions} options - The options for the rePort function.
 * @param {boolean} [options.restart=false] - Flag indicating whether to restart the process.
 * @param {RePortParameters} options.parameters - The parameters object containing various states and functions.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {string} options.parameters.islevel - The current level of the process.
 * @param {string} options.parameters.mainScreenPerson - The person on the main screen.
 * @param {boolean} options.parameters.adminOnMainScreen - Flag indicating if admin is on the main screen.
 * @param {boolean} options.parameters.mainScreenFilled - Flag indicating if the main screen is filled.
 * @param {boolean} options.parameters.recordStarted - Flag indicating if recording has started.
 * @param {boolean} options.parameters.recordStopped - Flag indicating if recording has stopped.
 * @param {boolean} options.parameters.recordPaused - Flag indicating if recording is paused.
 * @param {boolean} options.parameters.recordResumed - Flag indicating if recording has resumed.
 * @param {Array<ScreenState>} options.parameters.screenStates - Array of current screen states.
 * @param {Function} options.parameters.updateScreenStates - Function to update the current screen states.
 * @param {Function} options.parameters.updatePrevScreenStates - Function to update the previous screen states.
 * @param {Function} options.parameters.compareActiveNames - Function to compare active names.
 * @param {Function} options.parameters.compareScreenStates - Function to compare screen states.
 *
 * @returns {Promise<void>} A promise that resolves when the reporting process is complete.
 *
 * @throws {Error} Throws an error if there is an issue during the reporting process.
 *
 * @example
 * ```typescript
 * const options = {
 *   restart: false,
 *   parameters: {
 *     islevel: '1',
 *     mainScreenPerson: 'John Doe',
 *     adminOnMainScreen: false,
 *     mainScreenFilled: true,
 *     recordStarted: true,
 *     screenStates: [],
 *     updateScreenStates: (states) => { console.log(updated) },
 *     compareActiveNames: async (opts) => {  },
 *     compareScreenStates: async (opts) => {  },
 *   },
 * };
 *
 * await rePort(options);
 * ```
 */
export class RePort {
    /**
     * RePort function that handles the reporting logic based on the provided parameters.
     *
     * @param {RePortOptions} options - The options for the rePort function.
     * @param {boolean} [options.restart=false] - Flag indicating whether to restart the process.
     * @param {Object} options.parameters - The parameters object containing various states and functions.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string} options.parameters.islevel - The current level of the process.
     * @param {string} options.parameters.mainScreenPerson - The person on the main screen.
     * @param {boolean} options.parameters.adminOnMainScreen - Flag indicating if admin is on the main screen.
     * @param {boolean} options.parameters.mainScreenFilled - Flag indicating if the main screen is filled.
     * @param {boolean} options.parameters.recordStarted - Flag indicating if recording has started.
     * @param {boolean} options.parameters.recordStopped - Flag indicating if recording has stopped.
     * @param {boolean} options.parameters.recordPaused - Flag indicating if recording is paused.
     * @param {boolean} options.parameters.recordResumed - Flag indicating if recording has resumed.
     * @param {Array} options.parameters.screenStates - Array of current screen states.
     * @param {Function} options.parameters.updateScreenStates - Function to update the current screen states.
     * @param {Function} options.parameters.updatePrevScreenStates - Function to update the previous screen states.
     * @param {Function} options.parameters.compareActiveNames - Function to compare active names.
     * @param {Function} options.parameters.compareScreenStates - Function to compare screen states.
     *
     * @returns {Promise<void>} A promise that resolves when the reporting process is complete.
     *
     * @throws {Error} Throws an error if there is an issue during the reporting process.
     */
    async rePort({ restart = false, parameters }) {
        const { getUpdatedAllParams } = parameters;
        const updatedParams = getUpdatedAllParams();
        const { islevel, mainScreenPerson, adminOnMainScreen, mainScreenFilled, recordStarted, recordStopped, recordPaused, recordResumed, screenStates, updateScreenStates, updatePrevScreenStates, compareActiveNames, compareScreenStates, } = updatedParams;
        try {
            if (recordStarted || recordResumed) {
                if (recordStopped || recordPaused) {
                    // Recording stopped or paused, do nothing
                }
                else {
                    if (islevel === '2') {
                        const prevScreenStatesCopy = [...screenStates];
                        updatePrevScreenStates(prevScreenStatesCopy);
                        const newScreenStates = [{ mainScreenPerson, adminOnMainScreen, mainScreenFilled }];
                        updateScreenStates(newScreenStates);
                        await compareActiveNames({ restart, parameters: updatedParams });
                        if (!restart) {
                            await compareScreenStates({ restart, parameters: updatedParams });
                        }
                    }
                }
            }
        }
        catch (error) {
            // Handle errors during the process of rePorting
            console.error('Error during rePorting: ', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RePort, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RePort, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RePort, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmUtcG9ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9yZS1wb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF5QzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStDRztBQUtILE1BQU0sT0FBTyxNQUFNO0lBQ2pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFFSCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxHQUFHLEtBQUssRUFBRSxVQUFVLEVBQWlCO1FBQ3pELE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUMzQyxNQUFNLGFBQWEsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRTVDLE1BQU0sRUFDSixPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osYUFBYSxFQUNiLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLGtCQUFrQixFQUNsQixtQkFBbUIsR0FDcEIsR0FBRyxhQUFhLENBQUM7UUFFbEIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxhQUFhLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ25DLElBQUksYUFBYSxJQUFJLFlBQVksRUFBRSxDQUFDO29CQUNsQywwQ0FBMEM7Z0JBQzVDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQzt3QkFDcEIsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7d0JBQy9DLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLENBQUM7d0JBRTdDLE1BQU0sZUFBZSxHQUFHLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7d0JBQ3BGLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUVwQyxNQUFNLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO3dCQUNqRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ2IsTUFBTSxtQkFBbUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQzt3QkFDcEUsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixnREFBZ0Q7WUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0gsQ0FBQzt1R0F0RVUsTUFBTTsyR0FBTixNQUFNLGNBRkwsTUFBTTs7MkZBRVAsTUFBTTtrQkFIbEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBTY3JlZW5TdGF0ZSxcbiAgQ29tcGFyZVNjcmVlblN0YXRlc1BhcmFtZXRlcnMsXG4gIENvbXBhcmVTY3JlZW5TdGF0ZXNUeXBlLFxuICBDb21wYXJlQWN0aXZlTmFtZXNQYXJhbWV0ZXJzLFxuICBDb21wYXJlQWN0aXZlTmFtZXNUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlUG9ydFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBDb21wYXJlU2NyZWVuU3RhdGVzUGFyYW1ldGVycyxcbiAgICBDb21wYXJlQWN0aXZlTmFtZXNQYXJhbWV0ZXJzIHtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtYWluU2NyZWVuUGVyc29uOiBzdHJpbmc7XG4gIGFkbWluT25NYWluU2NyZWVuOiBib29sZWFuO1xuICBtYWluU2NyZWVuRmlsbGVkOiBib29sZWFuO1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRTdG9wcGVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIHJlY29yZFJlc3VtZWQ6IGJvb2xlYW47XG4gIHNjcmVlblN0YXRlczogU2NyZWVuU3RhdGVbXTtcbiAgcHJldlNjcmVlblN0YXRlczogU2NyZWVuU3RhdGVbXTtcbiAgdXBkYXRlU2NyZWVuU3RhdGVzOiAoc3RhdGVzOiBTY3JlZW5TdGF0ZVtdKSA9PiB2b2lkO1xuICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzOiAoc3RhdGVzOiBTY3JlZW5TdGF0ZVtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjb21wYXJlQWN0aXZlTmFtZXM6IENvbXBhcmVBY3RpdmVOYW1lc1R5cGU7XG4gIGNvbXBhcmVTY3JlZW5TdGF0ZXM6IENvbXBhcmVTY3JlZW5TdGF0ZXNUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFJlUG9ydFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZVBvcnRPcHRpb25zIHtcbiAgcmVzdGFydD86IGJvb2xlYW47XG4gIHBhcmFtZXRlcnM6IFJlUG9ydFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlUG9ydFR5cGUgPSAob3B0aW9uczogUmVQb3J0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBSZVBvcnQgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIHRoZSByZXBvcnRpbmcgbG9naWMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gKlxuICogVGhpcyBtZXRob2QgY2hlY2tzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSByZWNvcmRpbmcgcHJvY2VzcyBhbmQgdXBkYXRlcyB0aGUgc2NyZWVuIHN0YXRlc1xuICogYWNjb3JkaW5nbHkuIEl0IGFsc28gY29tcGFyZXMgYWN0aXZlIG5hbWVzIGFuZCBzY3JlZW4gc3RhdGVzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7UmVQb3J0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgcmVQb3J0IGZ1bmN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXN0YXJ0PWZhbHNlXSAtIEZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHJlc3RhcnQgdGhlIHByb2Nlc3MuXG4gKiBAcGFyYW0ge1JlUG9ydFBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgc3RhdGVzIGFuZCBmdW5jdGlvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgY3VycmVudCBsZXZlbCBvZiB0aGUgcHJvY2Vzcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWFpblNjcmVlblBlcnNvbiAtIFRoZSBwZXJzb24gb24gdGhlIG1haW4gc2NyZWVuLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYWRtaW5Pbk1haW5TY3JlZW4gLSBGbGFnIGluZGljYXRpbmcgaWYgYWRtaW4gaXMgb24gdGhlIG1haW4gc2NyZWVuLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubWFpblNjcmVlbkZpbGxlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgbWFpbiBzY3JlZW4gaXMgZmlsbGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRTdG9wcGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHJlY29yZGluZyBoYXMgc3RvcHBlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaXMgcGF1c2VkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaGFzIHJlc3VtZWQuXG4gKiBAcGFyYW0ge0FycmF5PFNjcmVlblN0YXRlPn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlblN0YXRlcyAtIEFycmF5IG9mIGN1cnJlbnQgc2NyZWVuIHN0YXRlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5TdGF0ZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGN1cnJlbnQgc2NyZWVuIHN0YXRlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcmV2U2NyZWVuU3RhdGVzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcmV2aW91cyBzY3JlZW4gc3RhdGVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbXBhcmVBY3RpdmVOYW1lcyAtIEZ1bmN0aW9uIHRvIGNvbXBhcmUgYWN0aXZlIG5hbWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbXBhcmVTY3JlZW5TdGF0ZXMgLSBGdW5jdGlvbiB0byBjb21wYXJlIHNjcmVlbiBzdGF0ZXMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJlcG9ydGluZyBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICpcbiAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgZHVyaW5nIHRoZSByZXBvcnRpbmcgcHJvY2Vzcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgcmVzdGFydDogZmFsc2UsXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBpc2xldmVsOiAnMScsXG4gKiAgICAgbWFpblNjcmVlblBlcnNvbjogJ0pvaG4gRG9lJyxcbiAqICAgICBhZG1pbk9uTWFpblNjcmVlbjogZmFsc2UsXG4gKiAgICAgbWFpblNjcmVlbkZpbGxlZDogdHJ1ZSxcbiAqICAgICByZWNvcmRTdGFydGVkOiB0cnVlLFxuICogICAgIHNjcmVlblN0YXRlczogW10sXG4gKiAgICAgdXBkYXRlU2NyZWVuU3RhdGVzOiAoc3RhdGVzKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gKiAgICAgY29tcGFyZUFjdGl2ZU5hbWVzOiBhc3luYyAob3B0cykgPT4geyAgfSxcbiAqICAgICBjb21wYXJlU2NyZWVuU3RhdGVzOiBhc3luYyAob3B0cykgPT4geyAgfSxcbiAqICAgfSxcbiAqIH07XG4gKlxuICogYXdhaXQgcmVQb3J0KG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlUG9ydCB7XG4gIC8qKlxuICAgKiBSZVBvcnQgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIHRoZSByZXBvcnRpbmcgbG9naWMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVQb3J0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgcmVQb3J0IGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnJlc3RhcnQ9ZmFsc2VdIC0gRmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gcmVzdGFydCB0aGUgcHJvY2Vzcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgc3RhdGVzIGFuZCBmdW5jdGlvbnMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGN1cnJlbnQgbGV2ZWwgb2YgdGhlIHByb2Nlc3MuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWFpblNjcmVlblBlcnNvbiAtIFRoZSBwZXJzb24gb24gdGhlIG1haW4gc2NyZWVuLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pbk9uTWFpblNjcmVlbiAtIEZsYWcgaW5kaWNhdGluZyBpZiBhZG1pbiBpcyBvbiB0aGUgbWFpbiBzY3JlZW4uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5GaWxsZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIG1haW4gc2NyZWVuIGlzIGZpbGxlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZFN0b3BwZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgcmVjb3JkaW5nIGhhcyBzdG9wcGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRQYXVzZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgcmVjb3JkaW5nIGlzIHBhdXNlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZCAtIEZsYWcgaW5kaWNhdGluZyBpZiByZWNvcmRpbmcgaGFzIHJlc3VtZWQuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5TdGF0ZXMgLSBBcnJheSBvZiBjdXJyZW50IHNjcmVlbiBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5TdGF0ZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGN1cnJlbnQgc2NyZWVuIHN0YXRlcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVByZXZTY3JlZW5TdGF0ZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByZXZpb3VzIHNjcmVlbiBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jb21wYXJlQWN0aXZlTmFtZXMgLSBGdW5jdGlvbiB0byBjb21wYXJlIGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbXBhcmVTY3JlZW5TdGF0ZXMgLSBGdW5jdGlvbiB0byBjb21wYXJlIHNjcmVlbiBzdGF0ZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZXBvcnRpbmcgcHJvY2VzcyBpcyBjb21wbGV0ZS5cbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBkdXJpbmcgdGhlIHJlcG9ydGluZyBwcm9jZXNzLlxuICAgKi9cblxuICBhc3luYyByZVBvcnQoeyByZXN0YXJ0ID0gZmFsc2UsIHBhcmFtZXRlcnMgfTogUmVQb3J0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBjb25zdCB1cGRhdGVkUGFyYW1zID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgY29uc3Qge1xuICAgICAgaXNsZXZlbCxcbiAgICAgIG1haW5TY3JlZW5QZXJzb24sXG4gICAgICBhZG1pbk9uTWFpblNjcmVlbixcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQsXG4gICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgIHJlY29yZFBhdXNlZCxcbiAgICAgIHJlY29yZFJlc3VtZWQsXG4gICAgICBzY3JlZW5TdGF0ZXMsXG4gICAgICB1cGRhdGVTY3JlZW5TdGF0ZXMsXG4gICAgICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzLFxuICAgICAgY29tcGFyZUFjdGl2ZU5hbWVzLFxuICAgICAgY29tcGFyZVNjcmVlblN0YXRlcyxcbiAgICB9ID0gdXBkYXRlZFBhcmFtcztcblxuICAgIHRyeSB7XG4gICAgICBpZiAocmVjb3JkU3RhcnRlZCB8fCByZWNvcmRSZXN1bWVkKSB7XG4gICAgICAgIGlmIChyZWNvcmRTdG9wcGVkIHx8IHJlY29yZFBhdXNlZCkge1xuICAgICAgICAgIC8vIFJlY29yZGluZyBzdG9wcGVkIG9yIHBhdXNlZCwgZG8gbm90aGluZ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc2xldmVsID09PSAnMicpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZTY3JlZW5TdGF0ZXNDb3B5ID0gWy4uLnNjcmVlblN0YXRlc107XG4gICAgICAgICAgICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzKHByZXZTY3JlZW5TdGF0ZXNDb3B5KTtcblxuICAgICAgICAgICAgY29uc3QgbmV3U2NyZWVuU3RhdGVzID0gW3sgbWFpblNjcmVlblBlcnNvbiwgYWRtaW5Pbk1haW5TY3JlZW4sIG1haW5TY3JlZW5GaWxsZWQgfV07XG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5TdGF0ZXMobmV3U2NyZWVuU3RhdGVzKTtcblxuICAgICAgICAgICAgYXdhaXQgY29tcGFyZUFjdGl2ZU5hbWVzKHsgcmVzdGFydCwgcGFyYW1ldGVyczogdXBkYXRlZFBhcmFtcyB9KTtcbiAgICAgICAgICAgIGlmICghcmVzdGFydCkge1xuICAgICAgICAgICAgICBhd2FpdCBjb21wYXJlU2NyZWVuU3RhdGVzKHsgcmVzdGFydCwgcGFyYW1ldGVyczogdXBkYXRlZFBhcmFtcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gSGFuZGxlIGVycm9ycyBkdXJpbmcgdGhlIHByb2Nlc3Mgb2YgcmVQb3J0aW5nXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgcmVQb3J0aW5nOiAnLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=