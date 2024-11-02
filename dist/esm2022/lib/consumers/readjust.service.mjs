import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Adjusts the layout parameters based on the provided options.
 *
 * This method calculates the layout dimensions and updates the main window size based on the current event type,
 * the number of participants, and whether screen sharing is active. It also manages the state transitions
 * to ensure that the UI reflects the correct configuration based on user interactions.
 *
 * @param {ReadjustOptions} options - The options for readjusting the layout.
 * @param {number} options.n - The number of participants or elements.
 * @param {number} options.state - The current state of the layout.
 * @param {Object} options.parameters - The parameters for the layout adjustment.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
 * @param {boolean} options.parameters.shared - Indicates if content is being shared.
 * @param {number} options.parameters.mainHeightWidth - The main height and width value.
 * @param {number} options.parameters.prevMainHeightWidth - The previous main height and width value.
 * @param {string} options.parameters.hostLabel - The label for the host.
 * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 *
 * @returns {Promise<void>} A promise that resolves when the layout adjustment is complete.
 *
 * @throws {Error} Throws an error if there is an issue updating the grid sizes.
 *
 * @example
 * ```typescript
 * const options = {
 *   n: 5,
 *   state: 0,
 *   parameters: {
 *     getUpdatedAllParams: () => updatedParams,
 *     eventType: 'conference',
 *     shareScreenStarted: false,
 *     shared: false,
 *     mainHeightWidth: 100,
 *     prevMainHeightWidth: 100,
 *     hostLabel: 'Host Name',
 *     first_round: false,
 *     lock_screen: false,
 *     updateMainHeightWidth: (value) => { console.log(updated) },
 *     prepopulateUserMedia: async ({ name, parameters }) => {  },
 *   },
 * };
 *
 * await readjust(options);
 * ```
 */
export class Readjust {
    /**
     * Adjusts the layout parameters based on the provided options.
     *
     * @param {ReadjustOptions} options - The options for readjusting the layout.
     * @param {number} options.n - The number of participants or elements.
     * @param {number} options.state - The current state of the layout.
     * @param {object} options.parameters - The parameters for the layout adjustment.
     * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.parameters.shared - Indicates if content is being shared.
     * @param {number} options.parameters.mainHeightWidth - The main height and width value.
     * @param {number} options.parameters.prevMainHeightWidth - The previous main height and width value.
     * @param {string} options.parameters.hostLabel - The label for the host.
     * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
     * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
     * @param {function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
     * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @returns {Promise<void>} A promise that resolves when the layout adjustment is complete.
     * @throws {Error} Throws an error if there is an issue updating the grid sizes.
     */
    readjust = async ({ n, state, parameters }) => {
        let { getUpdatedAllParams, prepopulateUserMedia } = parameters;
        parameters = getUpdatedAllParams();
        try {
            // Destructure parameters
            let { eventType, shareScreenStarted, shared, mainHeightWidth, prevMainHeightWidth, hostLabel, first_round, lock_screen, updateMainHeightWidth, } = parameters;
            if (state == 0) {
                prevMainHeightWidth = mainHeightWidth;
            }
            let val1 = 6;
            let val2 = 12 - val1;
            let cal1 = Math.floor((val1 / 12) * 100);
            let cal2 = 100 - cal1;
            if (eventType == 'broadcast') {
                val1 = 0;
                val2 = 12 - val1;
                if (n == 0) {
                    val1 = 0;
                    val2 = 12 - val1;
                }
            }
            else if (eventType == 'chat' ||
                (eventType == 'conference' && !(shareScreenStarted || shared))) {
                val1 = 12;
                val2 = 12 - val1;
            }
            else {
                if (shareScreenStarted || shared) {
                    val2 = 10;
                    val1 = 12 - val2;
                }
                else {
                    if (n == 0) {
                        val1 = 1;
                        val2 = 12 - val1;
                    }
                    else if (n >= 1 && n < 4) {
                        val1 = 4;
                        val2 = 12 - val1;
                    }
                    else if (n >= 4 && n < 6) {
                        val1 = 6;
                        val2 = 12 - val1;
                    }
                    else if (n >= 6 && n < 9) {
                        val1 = 6;
                        val2 = 12 - val1;
                    }
                    else if (n >= 9 && n < 12) {
                        val1 = 6;
                        val2 = 12 - val1;
                    }
                    else if (n >= 12 && n < 20) {
                        val1 = 8;
                        val2 = 12 - val1;
                    }
                    else if (n >= 20 && n < 50) {
                        val1 = 8;
                        val2 = 12 - val1;
                    }
                    else {
                        val1 = 10;
                        val2 = 12 - val1;
                    }
                }
            }
            if (state == 0) {
                mainHeightWidth = val2;
            }
            cal1 = Math.floor((val1 / 12) * 100);
            cal2 = 100 - cal1;
            updateMainHeightWidth(cal2);
            if (prevMainHeightWidth != mainHeightWidth) {
                if (!lock_screen && !shared) {
                    await prepopulateUserMedia({ name: hostLabel, parameters });
                }
                else {
                    if (!first_round) {
                        await prepopulateUserMedia({ name: hostLabel, parameters });
                    }
                }
            }
        }
        catch (error) {
            // Handle errors during the process of updating grid sizes
            console.log('Error updating grid sizes:', error.message);
            // throw error;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Readjust, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Readjust, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Readjust, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZGp1c3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvcmVhZGp1c3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWdDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpREc7QUFNSCxNQUFNLE9BQU8sUUFBUTtJQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxRQUFRLEdBQUcsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQW1CLEVBQWlCLEVBQUU7UUFDNUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQy9ELFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQztZQUNILHlCQUF5QjtZQUN6QixJQUFJLEVBQ0YsU0FBUyxFQUNULGtCQUFrQixFQUNsQixNQUFNLEVBQ04sZUFBZSxFQUNmLG1CQUFtQixFQUNuQixTQUFTLEVBQ1QsV0FBVyxFQUNYLFdBQVcsRUFDWCxxQkFBcUIsR0FDdEIsR0FBRyxVQUFVLENBQUM7WUFFZixJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDZixtQkFBbUIsR0FBRyxlQUFlLENBQUM7WUFDeEMsQ0FBQztZQUVELElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNiLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN6QyxJQUFJLElBQUksR0FBRyxHQUFH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LEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM1QixNQUFNLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNqQixNQUFNLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUM5RCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsMERBQTBEO1lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F2SFMsUUFBUTsyR0FBUixRQUFRLGNBRlAsTUFBTTs7MkZBRVAsUUFBUTtrQkFIcEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgRXZlbnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBSZWFkanVzdFBhcmFtZXRlcnMgZXh0ZW5kcyBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMge1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIG1haW5IZWlnaHRXaWR0aDogbnVtYmVyO1xuICBwcmV2TWFpbkhlaWdodFdpZHRoOiBudW1iZXI7XG4gIGhvc3RMYWJlbDogc3RyaW5nO1xuICBmaXJzdF9yb3VuZDogYm9vbGVhbjtcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFJlYWRqdXN0UGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRqdXN0T3B0aW9ucyB7XG4gIG46IG51bWJlcjtcbiAgc3RhdGU6IG51bWJlcjtcbiAgcGFyYW1ldGVyczogUmVhZGp1c3RQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZWFkanVzdFR5cGUgPSAob3B0aW9uczogUmVhZGp1c3RPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIEFkanVzdHMgdGhlIGxheW91dCBwYXJhbWV0ZXJzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICpcbiAqIFRoaXMgbWV0aG9kIGNhbGN1bGF0ZXMgdGhlIGxheW91dCBkaW1lbnNpb25zIGFuZCB1cGRhdGVzIHRoZSBtYWluIHdpbmRvdyBzaXplIGJhc2VkIG9uIHRoZSBjdXJyZW50IGV2ZW50IHR5cGUsXG4gKiB0aGUgbnVtYmVyIG9mIHBhcnRpY2lwYW50cywgYW5kIHdoZXRoZXIgc2NyZWVuIHNoYXJpbmcgaXMgYWN0aXZlLiBJdCBhbHNvIG1hbmFnZXMgdGhlIHN0YXRlIHRyYW5zaXRpb25zXG4gKiB0byBlbnN1cmUgdGhhdCB0aGUgVUkgcmVmbGVjdHMgdGhlIGNvcnJlY3QgY29uZmlndXJhdGlvbiBiYXNlZCBvbiB1c2VyIGludGVyYWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge1JlYWRqdXN0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZWFkanVzdGluZyB0aGUgbGF5b3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubiAtIFRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzIG9yIGVsZW1lbnRzLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuc3RhdGUgLSBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgbGF5b3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgbGF5b3V0IGFkanVzdG1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IChlLmcuLCBcImJyb2FkY2FzdFwiLCBcImNoYXRcIiwgXCJjb25mZXJlbmNlXCIpLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIGNvbnRlbnQgaXMgYmVpbmcgc2hhcmVkLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5tYWluSGVpZ2h0V2lkdGggLSBUaGUgbWFpbiBoZWlnaHQgYW5kIHdpZHRoIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2TWFpbkhlaWdodFdpZHRoIC0gVGhlIHByZXZpb3VzIG1haW4gaGVpZ2h0IGFuZCB3aWR0aCB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIGZvciB0aGUgaG9zdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZpcnN0X3JvdW5kIC0gSW5kaWNhdGVzIGlmIGl0IGlzIHRoZSBmaXJzdCByb3VuZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5IZWlnaHRXaWR0aCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiBoZWlnaHQgYW5kIHdpZHRoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXBvcHVsYXRlVXNlck1lZGlhIC0gRnVuY3Rpb24gdG8gcHJlcG9wdWxhdGUgdXNlciBtZWRpYS5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbGF5b3V0IGFkanVzdG1lbnQgaXMgY29tcGxldGUuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSB1cGRhdGluZyB0aGUgZ3JpZCBzaXplcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgbjogNSxcbiAqICAgc3RhdGU6IDAsXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiB1cGRhdGVkUGFyYW1zLFxuICogICAgIGV2ZW50VHlwZTogJ2NvbmZlcmVuY2UnLFxuICogICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogZmFsc2UsXG4gKiAgICAgc2hhcmVkOiBmYWxzZSxcbiAqICAgICBtYWluSGVpZ2h0V2lkdGg6IDEwMCxcbiAqICAgICBwcmV2TWFpbkhlaWdodFdpZHRoOiAxMDAsXG4gKiAgICAgaG9zdExhYmVsOiAnSG9zdCBOYW1lJyxcbiAqICAgICBmaXJzdF9yb3VuZDogZmFsc2UsXG4gKiAgICAgbG9ja19zY3JlZW46IGZhbHNlLFxuICogICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogKHZhbHVlKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gKiAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IGFzeW5jICh7IG5hbWUsIHBhcmFtZXRlcnMgfSkgPT4geyAgfSxcbiAqICAgfSxcbiAqIH07XG4gKlxuICogYXdhaXQgcmVhZGp1c3Qob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZWFkanVzdCB7XG4gIC8qKlxuICAgKiBBZGp1c3RzIHRoZSBsYXlvdXQgcGFyYW1ldGVycyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkanVzdE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVhZGp1c3RpbmcgdGhlIGxheW91dC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubiAtIFRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzIG9yIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5zdGF0ZSAtIFRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBsYXlvdXQuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIGxheW91dCBhZGp1c3RtZW50LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sIFwiYnJvYWRjYXN0XCIsIFwiY2hhdFwiLCBcImNvbmZlcmVuY2VcIikuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCAtIEluZGljYXRlcyBpZiBzY3JlZW4gc2hhcmluZyBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIGNvbnRlbnQgaXMgYmVpbmcgc2hhcmVkLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm1haW5IZWlnaHRXaWR0aCAtIFRoZSBtYWluIGhlaWdodCBhbmQgd2lkdGggdmFsdWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldk1haW5IZWlnaHRXaWR0aCAtIFRoZSBwcmV2aW91cyBtYWluIGhlaWdodCBhbmQgd2lkdGggdmFsdWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIGZvciB0aGUgaG9zdC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZmlyc3Rfcm91bmQgLSBJbmRpY2F0ZXMgaWYgaXQgaXMgdGhlIGZpcnN0IHJvdW5kLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5sb2NrX3NjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGxvY2tlZC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5IZWlnaHRXaWR0aCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiBoZWlnaHQgYW5kIHdpZHRoLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucHJlcG9wdWxhdGVVc2VyTWVkaWEgLSBGdW5jdGlvbiB0byBwcmVwb3B1bGF0ZSB1c2VyIG1lZGlhLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbGF5b3V0IGFkanVzdG1lbnQgaXMgY29tcGxldGUuXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgdXBkYXRpbmcgdGhlIGdyaWQgc2l6ZXMuXG4gICAqL1xuICByZWFkanVzdCA9IGFzeW5jICh7IG4sIHN0YXRlLCBwYXJhbWV0ZXJzIH06IFJlYWRqdXN0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMsIHByZXBvcHVsYXRlVXNlck1lZGlhIH0gPSBwYXJhbWV0ZXJzO1xuICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgbGV0IHtcbiAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgIHNoYXJlZCxcbiAgICAgICAgbWFpbkhlaWdodFdpZHRoLFxuICAgICAgICBwcmV2TWFpbkhlaWdodFdpZHRoLFxuICAgICAgICBob3N0TGFiZWwsXG4gICAgICAgIGZpcnN0X3JvdW5kLFxuICAgICAgICBsb2NrX3NjcmVlbixcbiAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIGlmIChzdGF0ZSA9PSAwKSB7XG4gICAgICAgIHByZXZNYWluSGVpZ2h0V2lkdGggPSBtYWluSGVpZ2h0V2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWwxID0gNjtcbiAgICAgIGxldCB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgbGV0IGNhbDEgPSBNYXRoLmZsb29yKCh2YWwxIC8gMTIpICogMTAwKTtcbiAgICAgIGxldCBjYWwyID0gMTAwIC0gY2FsMTtcblxuICAgICAgaWYgKGV2ZW50VHlwZSA9PSAnYnJvYWRjYXN0Jykge1xuICAgICAgICB2YWwxID0gMDtcbiAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcblxuICAgICAgICBpZiAobiA9PSAwKSB7XG4gICAgICAgICAgdmFsMSA9IDA7XG4gICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZXZlbnRUeXBlID09ICdjaGF0JyB8fFxuICAgICAgICAoZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJyAmJiAhKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpKVxuICAgICAgKSB7XG4gICAgICAgIHZhbDEgPSAxMjtcbiAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICAgICAgdmFsMiA9IDEwO1xuICAgICAgICAgIHZhbDEgPSAxMiAtIHZhbDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG4gPT0gMCkge1xuICAgICAgICAgICAgdmFsMSA9IDE7XG4gICAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICAgIH0gZWxzZSBpZiAobiA+PSAxICYmIG4gPCA0KSB7XG4gICAgICAgICAgICB2YWwxID0gNDtcbiAgICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgICAgfSBlbHNlIGlmIChuID49IDQgJiYgbiA8IDYpIHtcbiAgICAgICAgICAgIHZhbDEgPSA2O1xuICAgICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG4gPj0gNiAmJiBuIDwgOSkge1xuICAgICAgICAgICAgdmFsMSA9IDY7XG4gICAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICAgIH0gZWxzZSBpZiAobiA+PSA5ICYmIG4gPCAxMikge1xuICAgICAgICAgICAgdmFsMSA9IDY7XG4gICAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICAgIH0gZWxzZSBpZiAobiA+PSAxMiAmJiBuIDwgMjApIHtcbiAgICAgICAgICAgIHZhbDEgPSA4O1xuICAgICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG4gPj0gMjAgJiYgbiA8IDUwKSB7XG4gICAgICAgICAgICB2YWwxID0gODtcbiAgICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbDEgPSAxMDtcbiAgICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PSAwKSB7XG4gICAgICAgIG1haW5IZWlnaHRXaWR0aCA9IHZhbDI7XG4gICAgICB9XG5cbiAgICAgIGNhbDEgPSBNYXRoLmZsb29yKCh2YWwxIC8gMTIpICogMTAwKTtcbiAgICAgIGNhbDIgPSAxMDAgLSBjYWwxO1xuXG4gICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgoY2FsMik7XG5cbiAgICAgIGlmIChwcmV2TWFpbkhlaWdodFdpZHRoICE9IG1haW5IZWlnaHRXaWR0aCkge1xuICAgICAgICBpZiAoIWxvY2tfc2NyZWVuICYmICFzaGFyZWQpIHtcbiAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWZpcnN0X3JvdW5kKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgcHJvY2VzcyBvZiB1cGRhdGluZyBncmlkIHNpemVzXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgdXBkYXRpbmcgZ3JpZCBzaXplczonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIC8vIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==