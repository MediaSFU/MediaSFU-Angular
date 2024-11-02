import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Compares the current active names with the previous active names and triggers an action if there are changes.
 *
 * @param {CompareActiveNamesOptions} options - The options for comparing active names.
 * @param {boolean} [options.restart=false] - Whether to restart the comparison.
 * @param {CompareActiveNamesParameters} options.parameters - The parameters for the comparison.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {string[]} options.parameters.activeNames - The current active names.
 * @param {string[]} options.parameters.prevActiveNames - The previous active names.
 * @param {Function} options.parameters.updatePrevActiveNames - Function to update the previous active names.
 * @param {Function} options.parameters.trigger - Function to trigger an action when names change.
 *
 * @returns {Promise<void>} A promise that resolves when the comparison is complete.
 *
 * @throws Will log an error message if an error occurs during the comparison.
 *
 * @example
 * const options = {
 *   restart: false,
 *   parameters: {
 *     getUpdatedAllParams: () => { /* Logic to get updated parameters *\/ },
 *     activeNames: ['Alice', 'Bob'],
 *     prevActiveNames: ['Alice', 'Charlie'],
 *     updatePrevActiveNames: (names) => { /* Logic to update previous active names *\/ },
 *     trigger: async (data) => { /* Logic to handle the trigger *\/ },
 *   },
 * };
 *
 * await compareActiveNamesService.compareActiveNames(options);
 * // If 'Bob' is not in the previous active names, it will trigger the action.
 */
export class CompareActiveNames {
    /**
     * Compares the current active names with the previous active names and triggers an action if there are changes.
     *
     * @param {Object} options - The options for comparing active names.
     * @param {boolean} [options.restart=false] - Whether to restart the comparison.
     * @param {CompareActiveNamesOptions} options.parameters - The parameters for the comparison.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string[]} options.parameters.activeNames - The current active names.
     * @param {string[]} options.parameters.prevActiveNames - The previous active names.
     * @param {Function} options.parameters.updatePrevActiveNames - Function to update the previous active names.
     * @param {Function} options.parameters.trigger - Function to trigger an action when names change.
     *
     * @returns {Promise<void>} A promise that resolves when the comparison is complete.
     *
     * @throws Will log an error message if an error occurs during the comparison.
     */
    async compareActiveNames({ restart = false, parameters, }) {
        try {
            let { getUpdatedAllParams } = parameters;
            parameters = getUpdatedAllParams();
            let { activeNames, prevActiveNames, updatePrevActiveNames, trigger } = parameters;
            // Restart the comparison if needed
            if (restart) {
                await trigger({ ref_ActiveNames: activeNames, parameters });
                return;
            }
            // Array to track changes in activeNames
            let nameChanged = [];
            // Compare each name in activeNames
            for (let i = 0; i < activeNames.length; i++) {
                const currentName = activeNames[i];
                // Check if the name is present in prevActiveNames
                const hasNameChanged = !prevActiveNames.includes(currentName);
                if (hasNameChanged) {
                    nameChanged.push(true);
                    trigger({ ref_ActiveNames: activeNames, parameters });
                    break;
                }
            }
            // Count the number of true in nameChanged
            let count = nameChanged.filter((value) => value === true).length;
            if (count < 1) {
                // Check for new names in prevActiveNames
                for (let i = 0; i < prevActiveNames.length; i++) {
                    const currentName = prevActiveNames[i];
                    // Check if the name is present in activeNames
                    const hasNameChanged = !activeNames.includes(currentName);
                    // Signal change if the name is new
                    if (hasNameChanged) {
                        trigger({ ref_ActiveNames: activeNames, parameters });
                        break;
                    }
                }
            }
            // Update prevActiveNames with current activeNames
            prevActiveNames = [...activeNames];
            updatePrevActiveNames(prevActiveNames);
        }
        catch (error) {
            console.log('compareActiveNames error', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareActiveNames, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareActiveNames, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareActiveNames, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZS1hY3RpdmUtbmFtZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY29tcGFyZS1hY3RpdmUtbmFtZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXVCekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUtMLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQ3ZCLE9BQU8sR0FBRyxLQUFLLEVBQ2YsVUFBVSxHQUNnQjtRQUMxQixJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7WUFFbkMsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRWxGLG1DQUFtQztZQUNuQyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNaLE1BQU0sT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxPQUFPO1lBQ1QsQ0FBQztZQUVELHdDQUF3QztZQUN4QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsbUNBQW1DO1lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkMsa0RBQWtEO2dCQUNsRCxNQUFNLGNBQWMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRTlELElBQUksY0FBYyxFQUFFLENBQUM7b0JBQ25CLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDdEQsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztZQUVELDBDQUEwQztZQUMxQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBRWpFLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNkLHlDQUF5QztnQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDaEQsTUFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV2Qyw4Q0FBOEM7b0JBQzlDLE1BQU0sY0FBYyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFFMUQsbUNBQW1DO29CQUNuQyxJQUFJLGNBQWMsRUFBRSxDQUFDO3dCQUNuQixPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7d0JBQ3RELE1BQU07b0JBQ1IsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUVELGtEQUFrRDtZQUNsRCxlQUFlLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1lBQ25DLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRCxDQUFDO0lBQ0gsQ0FBQzt1R0EzRVUsa0JBQWtCOzJHQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyaWdnZXJUeXBlLCBUcmlnZ2VyUGFyYW1ldGVycyB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyZUFjdGl2ZU5hbWVzUGFyYW1ldGVycyBleHRlbmRzIFRyaWdnZXJQYXJhbWV0ZXJzIHtcbiAgYWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuICBwcmV2QWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuICB1cGRhdGVBY3RpdmVOYW1lczogKGFjdGl2ZU5hbWVzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlUHJldkFjdGl2ZU5hbWVzOiAocHJldkFjdGl2ZU5hbWVzOiBzdHJpbmdbXSkgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgdHJpZ2dlcjogVHJpZ2dlclR5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENvbXBhcmVBY3RpdmVOYW1lc1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wYXJlQWN0aXZlTmFtZXNPcHRpb25zIHtcbiAgcmVzdGFydD86IGJvb2xlYW47XG4gIHBhcmFtZXRlcnM6IENvbXBhcmVBY3RpdmVOYW1lc1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbXBhcmVBY3RpdmVOYW1lc1R5cGUgPSAob3B0aW9uczogQ29tcGFyZUFjdGl2ZU5hbWVzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ29tcGFyZXMgdGhlIGN1cnJlbnQgYWN0aXZlIG5hbWVzIHdpdGggdGhlIHByZXZpb3VzIGFjdGl2ZSBuYW1lcyBhbmQgdHJpZ2dlcnMgYW4gYWN0aW9uIGlmIHRoZXJlIGFyZSBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbXBhcmVBY3RpdmVOYW1lc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29tcGFyaW5nIGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXN0YXJ0PWZhbHNlXSAtIFdoZXRoZXIgdG8gcmVzdGFydCB0aGUgY29tcGFyaXNvbi5cbiAgICogQHBhcmFtIHtDb21wYXJlQWN0aXZlTmFtZXNQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIGNvbXBhcmlzb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFjdGl2ZU5hbWVzIC0gVGhlIGN1cnJlbnQgYWN0aXZlIG5hbWVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldkFjdGl2ZU5hbWVzIC0gVGhlIHByZXZpb3VzIGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVByZXZBY3RpdmVOYW1lcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJldmlvdXMgYWN0aXZlIG5hbWVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudHJpZ2dlciAtIEZ1bmN0aW9uIHRvIHRyaWdnZXIgYW4gYWN0aW9uIHdoZW4gbmFtZXMgY2hhbmdlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29tcGFyaXNvbiBpcyBjb21wbGV0ZS5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIGxvZyBhbiBlcnJvciBtZXNzYWdlIGlmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIGNvbXBhcmlzb24uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAqICAgcmVzdGFydDogZmFsc2UsXG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4geyAvKiBMb2dpYyB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzICpcXC8gfSxcbiAgICogICAgIGFjdGl2ZU5hbWVzOiBbJ0FsaWNlJywgJ0JvYiddLFxuICAgKiAgICAgcHJldkFjdGl2ZU5hbWVzOiBbJ0FsaWNlJywgJ0NoYXJsaWUnXSxcbiAgICogICAgIHVwZGF0ZVByZXZBY3RpdmVOYW1lczogKG5hbWVzKSA9PiB7IC8qIExvZ2ljIHRvIHVwZGF0ZSBwcmV2aW91cyBhY3RpdmUgbmFtZXMgKlxcLyB9LFxuICAgKiAgICAgdHJpZ2dlcjogYXN5bmMgKGRhdGEpID0+IHsgLyogTG9naWMgdG8gaGFuZGxlIHRoZSB0cmlnZ2VyICpcXC8gfSxcbiAgICogICB9LFxuICAgKiB9O1xuICAgKlxuICAgKiBhd2FpdCBjb21wYXJlQWN0aXZlTmFtZXNTZXJ2aWNlLmNvbXBhcmVBY3RpdmVOYW1lcyhvcHRpb25zKTtcbiAgICogLy8gSWYgJ0JvYicgaXMgbm90IGluIHRoZSBwcmV2aW91cyBhY3RpdmUgbmFtZXMsIGl0IHdpbGwgdHJpZ2dlciB0aGUgYWN0aW9uLlxuICAgKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbXBhcmVBY3RpdmVOYW1lcyB7XG4gIC8qKlxuICAgKiBDb21wYXJlcyB0aGUgY3VycmVudCBhY3RpdmUgbmFtZXMgd2l0aCB0aGUgcHJldmlvdXMgYWN0aXZlIG5hbWVzIGFuZCB0cmlnZ2VycyBhbiBhY3Rpb24gaWYgdGhlcmUgYXJlIGNoYW5nZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbXBhcmluZyBhY3RpdmUgbmFtZXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmVzdGFydD1mYWxzZV0gLSBXaGV0aGVyIHRvIHJlc3RhcnQgdGhlIGNvbXBhcmlzb24uXG4gICAqIEBwYXJhbSB7Q29tcGFyZUFjdGl2ZU5hbWVzT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBjb21wYXJpc29uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMucGFyYW1ldGVycy5hY3RpdmVOYW1lcyAtIFRoZSBjdXJyZW50IGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXZBY3RpdmVOYW1lcyAtIFRoZSBwcmV2aW91cyBhY3RpdmUgbmFtZXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcmV2QWN0aXZlTmFtZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByZXZpb3VzIGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyaWdnZXIgLSBGdW5jdGlvbiB0byB0cmlnZ2VyIGFuIGFjdGlvbiB3aGVuIG5hbWVzIGNoYW5nZS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvbXBhcmlzb24gaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBjb21wYXJpc29uLlxuICAgKi9cbiAgYXN5bmMgY29tcGFyZUFjdGl2ZU5hbWVzKHtcbiAgICByZXN0YXJ0ID0gZmFsc2UsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogQ29tcGFyZUFjdGl2ZU5hbWVzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgbGV0IHsgYWN0aXZlTmFtZXMsIHByZXZBY3RpdmVOYW1lcywgdXBkYXRlUHJldkFjdGl2ZU5hbWVzLCB0cmlnZ2VyIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBSZXN0YXJ0IHRoZSBjb21wYXJpc29uIGlmIG5lZWRlZFxuICAgICAgaWYgKHJlc3RhcnQpIHtcbiAgICAgICAgYXdhaXQgdHJpZ2dlcih7IHJlZl9BY3RpdmVOYW1lczogYWN0aXZlTmFtZXMsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQXJyYXkgdG8gdHJhY2sgY2hhbmdlcyBpbiBhY3RpdmVOYW1lc1xuICAgICAgbGV0IG5hbWVDaGFuZ2VkID0gW107XG5cbiAgICAgIC8vIENvbXBhcmUgZWFjaCBuYW1lIGluIGFjdGl2ZU5hbWVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZU5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID0gYWN0aXZlTmFtZXNbaV07XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIG5hbWUgaXMgcHJlc2VudCBpbiBwcmV2QWN0aXZlTmFtZXNcbiAgICAgICAgY29uc3QgaGFzTmFtZUNoYW5nZWQgPSAhcHJldkFjdGl2ZU5hbWVzLmluY2x1ZGVzKGN1cnJlbnROYW1lKTtcblxuICAgICAgICBpZiAoaGFzTmFtZUNoYW5nZWQpIHtcbiAgICAgICAgICBuYW1lQ2hhbmdlZC5wdXNoKHRydWUpO1xuICAgICAgICAgIHRyaWdnZXIoeyByZWZfQWN0aXZlTmFtZXM6IGFjdGl2ZU5hbWVzLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvdW50IHRoZSBudW1iZXIgb2YgdHJ1ZSBpbiBuYW1lQ2hhbmdlZFxuICAgICAgbGV0IGNvdW50ID0gbmFtZUNoYW5nZWQuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUgPT09IHRydWUpLmxlbmd0aDtcblxuICAgICAgaWYgKGNvdW50IDwgMSkge1xuICAgICAgICAvLyBDaGVjayBmb3IgbmV3IG5hbWVzIGluIHByZXZBY3RpdmVOYW1lc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZBY3RpdmVOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID0gcHJldkFjdGl2ZU5hbWVzW2ldO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIG5hbWUgaXMgcHJlc2VudCBpbiBhY3RpdmVOYW1lc1xuICAgICAgICAgIGNvbnN0IGhhc05hbWVDaGFuZ2VkID0gIWFjdGl2ZU5hbWVzLmluY2x1ZGVzKGN1cnJlbnROYW1lKTtcblxuICAgICAgICAgIC8vIFNpZ25hbCBjaGFuZ2UgaWYgdGhlIG5hbWUgaXMgbmV3XG4gICAgICAgICAgaWYgKGhhc05hbWVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0cmlnZ2VyKHsgcmVmX0FjdGl2ZU5hbWVzOiBhY3RpdmVOYW1lcywgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgcHJldkFjdGl2ZU5hbWVzIHdpdGggY3VycmVudCBhY3RpdmVOYW1lc1xuICAgICAgcHJldkFjdGl2ZU5hbWVzID0gWy4uLmFjdGl2ZU5hbWVzXTtcbiAgICAgIHVwZGF0ZVByZXZBY3RpdmVOYW1lcyhwcmV2QWN0aXZlTmFtZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnY29tcGFyZUFjdGl2ZU5hbWVzIGVycm9yJywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19