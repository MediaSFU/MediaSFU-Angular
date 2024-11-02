import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
   * Compares the current screen states with the previous screen states and triggers actions based on changes.
   *
   * @param {CompareScreenStatesOptions} options - The options for comparing screen states.
   * @param {boolean} [options.restart=false] - Whether to restart the comparison process.
   * @param {CompareScreenStatesParameters} options.parameters - The parameters for the comparison.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {string} options.parameters.recordingDisplayType - The type of display being recorded.
   * @param {boolean} options.parameters.recordingVideoOptimized - Whether the recording is optimized for video.
   * @param {ScreenState[]} options.parameters.screenStates - The current screen states.
   * @param {ScreenState[]} options.parameters.prevScreenStates - The previous screen states.
   * @param {string[]} options.parameters.activeNames - The active names in the current context.
   * @param {Function} options.parameters.trigger - Function to trigger actions based on changes.
   *
   * @returns {Promise<void>} A promise that resolves when the comparison and any triggered actions are complete.
   *
   * @throws Will log an error message if an error occurs during the comparison process.
   *
   * @example
   * const options = {
   *   restart: false,
   *   parameters: {
   *     getUpdatedAllParams: () => { /* Logic to get updated parameters *\/ },
   *     recordingDisplayType: 'video',
   *     recordingVideoOptimized: true,
   *     screenStates: [{ state: 'active' }, { state: 'inactive' }],
   *     prevScreenStates: [{ state: 'inactive' }, { state: 'active' }],
   *     activeNames: ['Alice', 'Bob'],
   *     trigger: async (data) => { /* Logic to handle the trigger *\/ },
   *   },
   * };
   *
   * await compareScreenStatesService.compareScreenStates(options);
   * // If any screen state has changed, the trigger function will be called accordingly.
   */
export class CompareScreenStates {
    /**
     * Compares the current screen states with the previous screen states and triggers actions based on changes.
     *
     * @param {Object} options - The options for comparing screen states.
     * @param {boolean} [options.restart=false] - Whether to restart the comparison process.
     * @param {CompareScreenStatesOptions} options.parameters - The parameters for the comparison.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string} options.parameters.recordingDisplayType - The type of display being recorded.
     * @param {boolean} options.parameters.recordingVideoOptimized - Whether the recording is optimized for video.
     * @param {Array<ScreenState>} options.parameters.screenStates - The current screen states.
     * @param {Array<ScreenState>} options.parameters.prevScreenStates - The previous screen states.
     * @param {Array<string>} options.parameters.activeNames - The active names in the current context.
     * @param {Function} options.parameters.trigger - Function to trigger actions based on changes.
     *
     * @returns {Promise<void>} A promise that resolves when the comparison and any triggered actions are complete.
     *
     * @throws Will log an error message if an error occurs during the comparison process.
     */
    async compareScreenStates({ restart = false, parameters, }) {
        try {
            let { getUpdatedAllParams } = parameters;
            parameters = getUpdatedAllParams();
            let { recordingDisplayType, recordingVideoOptimized, screenStates, prevScreenStates, activeNames, trigger, } = parameters;
            // Restart the comparison if needed
            if (restart) {
                // Perform necessary actions on restart
                return;
            }
            // Compare each key-value pair in the screenStates objects
            for (let i = 0; i < screenStates.length; i++) {
                const currentScreenState = screenStates[i];
                const prevScreenState = prevScreenStates[i];
                // Check if any value has changed
                const hasChanged = Object.keys(currentScreenState).some((key) => currentScreenState[key] !== prevScreenState[key]);
                // Signal change if any value has changed
                if (hasChanged) {
                    // Perform actions or trigger events based on the change
                    if (recordingDisplayType === 'video' && recordingVideoOptimized) {
                        await trigger({ ref_ActiveNames: activeNames, parameters });
                        break;
                    }
                    await trigger({ ref_ActiveNames: activeNames, parameters });
                    break;
                }
            }
        }
        catch (error) {
            console.log('compareScreenStates error', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareScreenStates, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareScreenStates, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareScreenStates, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZS1zY3JlZW4tc3RhdGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2NvbXBhcmUtc2NyZWVuLXN0YXRlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBeUIzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWtDSztBQU1MLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQ3hCLE9BQU8sR0FBRyxLQUFLLEVBQ2YsVUFBVSxHQUNpQjtRQUMzQixJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7WUFFbkMsSUFBSSxFQUNGLG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsT0FBTyxHQUNSLEdBQUcsVUFBVSxDQUFDO1lBRWYsbUNBQW1DO1lBQ25DLElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQ1osdUNBQXVDO2dCQUN2QyxPQUFPO1lBQ1QsQ0FBQztZQUVELDBEQUEwRDtZQUMxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUM3QyxNQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVDLGlDQUFpQztnQkFDakMsTUFBTSxVQUFVLEdBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBMkIsQ0FBQyxJQUFJLENBQ2hGLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQzFELENBQUM7Z0JBRUYseUNBQXlDO2dCQUN6QyxJQUFJLFVBQVUsRUFBRSxDQUFDO29CQUNmLHdEQUF3RDtvQkFDeEQsSUFBSSxvQkFBb0IsS0FBSyxPQUFPLElBQUksdUJBQXVCLEVBQUUsQ0FBQzt3QkFDaEUsTUFBTSxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7d0JBQzVELE1BQU07b0JBQ1IsQ0FBQztvQkFDRCxNQUFNLE9BQU8sQ0FBQyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDNUQsTUFBTTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDO0lBQ0gsQ0FBQzt1R0FsRVUsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU2NyZWVuU3RhdGUsIFRyaWdnZXJUeXBlLCBUcmlnZ2VyUGFyYW1ldGVycyB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyZVNjcmVlblN0YXRlc1BhcmFtZXRlcnMgZXh0ZW5kcyBUcmlnZ2VyUGFyYW1ldGVycyB7XG4gIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiAndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnO1xuICByZWNvcmRpbmdWaWRlb09wdGltaXplZDogYm9vbGVhbjtcbiAgc2NyZWVuU3RhdGVzOiBTY3JlZW5TdGF0ZVtdO1xuICBwcmV2U2NyZWVuU3RhdGVzOiBTY3JlZW5TdGF0ZVtdO1xuICBhY3RpdmVOYW1lczogc3RyaW5nW107XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHRyaWdnZXI6IFRyaWdnZXJUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDb21wYXJlU2NyZWVuU3RhdGVzUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmVTY3JlZW5TdGF0ZXNPcHRpb25zIHtcbiAgcmVzdGFydD86IGJvb2xlYW47XG4gIHBhcmFtZXRlcnM6IENvbXBhcmVTY3JlZW5TdGF0ZXNQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDb21wYXJlU2NyZWVuU3RhdGVzVHlwZSA9IChvcHRpb25zOiBDb21wYXJlU2NyZWVuU3RhdGVzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gICAqIENvbXBhcmVzIHRoZSBjdXJyZW50IHNjcmVlbiBzdGF0ZXMgd2l0aCB0aGUgcHJldmlvdXMgc2NyZWVuIHN0YXRlcyBhbmQgdHJpZ2dlcnMgYWN0aW9ucyBiYXNlZCBvbiBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbXBhcmVTY3JlZW5TdGF0ZXNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbXBhcmluZyBzY3JlZW4gc3RhdGVzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnJlc3RhcnQ9ZmFsc2VdIC0gV2hldGhlciB0byByZXN0YXJ0IHRoZSBjb21wYXJpc29uIHByb2Nlc3MuXG4gICAqIEBwYXJhbSB7Q29tcGFyZVNjcmVlblN0YXRlc1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgY29tcGFyaXNvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ0Rpc3BsYXlUeXBlIC0gVGhlIHR5cGUgb2YgZGlzcGxheSBiZWluZyByZWNvcmRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgLSBXaGV0aGVyIHRoZSByZWNvcmRpbmcgaXMgb3B0aW1pemVkIGZvciB2aWRlby5cbiAgICogQHBhcmFtIHtTY3JlZW5TdGF0ZVtdfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuU3RhdGVzIC0gVGhlIGN1cnJlbnQgc2NyZWVuIHN0YXRlcy5cbiAgICogQHBhcmFtIHtTY3JlZW5TdGF0ZVtdfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldlNjcmVlblN0YXRlcyAtIFRoZSBwcmV2aW91cyBzY3JlZW4gc3RhdGVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMuYWN0aXZlTmFtZXMgLSBUaGUgYWN0aXZlIG5hbWVzIGluIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy50cmlnZ2VyIC0gRnVuY3Rpb24gdG8gdHJpZ2dlciBhY3Rpb25zIGJhc2VkIG9uIGNoYW5nZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjb21wYXJpc29uIGFuZCBhbnkgdHJpZ2dlcmVkIGFjdGlvbnMgYXJlIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIG1lc3NhZ2UgaWYgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgY29tcGFyaXNvbiBwcm9jZXNzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBvcHRpb25zID0ge1xuICAgKiAgIHJlc3RhcnQ6IGZhbHNlLFxuICAgKiAgIHBhcmFtZXRlcnM6IHtcbiAgICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHsgLyogTG9naWMgdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycyAqXFwvIH0sXG4gICAqICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ3ZpZGVvJyxcbiAgICogICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiB0cnVlLFxuICAgKiAgICAgc2NyZWVuU3RhdGVzOiBbeyBzdGF0ZTogJ2FjdGl2ZScgfSwgeyBzdGF0ZTogJ2luYWN0aXZlJyB9XSxcbiAgICogICAgIHByZXZTY3JlZW5TdGF0ZXM6IFt7IHN0YXRlOiAnaW5hY3RpdmUnIH0sIHsgc3RhdGU6ICdhY3RpdmUnIH1dLFxuICAgKiAgICAgYWN0aXZlTmFtZXM6IFsnQWxpY2UnLCAnQm9iJ10sXG4gICAqICAgICB0cmlnZ2VyOiBhc3luYyAoZGF0YSkgPT4geyAvKiBMb2dpYyB0byBoYW5kbGUgdGhlIHRyaWdnZXIgKlxcLyB9LFxuICAgKiAgIH0sXG4gICAqIH07XG4gICAqXG4gICAqIGF3YWl0IGNvbXBhcmVTY3JlZW5TdGF0ZXNTZXJ2aWNlLmNvbXBhcmVTY3JlZW5TdGF0ZXMob3B0aW9ucyk7XG4gICAqIC8vIElmIGFueSBzY3JlZW4gc3RhdGUgaGFzIGNoYW5nZWQsIHRoZSB0cmlnZ2VyIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFjY29yZGluZ2x5LlxuICAgKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcGFyZVNjcmVlblN0YXRlcyB7XG4gIC8qKlxuICAgKiBDb21wYXJlcyB0aGUgY3VycmVudCBzY3JlZW4gc3RhdGVzIHdpdGggdGhlIHByZXZpb3VzIHNjcmVlbiBzdGF0ZXMgYW5kIHRyaWdnZXJzIGFjdGlvbnMgYmFzZWQgb24gY2hhbmdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29tcGFyaW5nIHNjcmVlbiBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmVzdGFydD1mYWxzZV0gLSBXaGV0aGVyIHRvIHJlc3RhcnQgdGhlIGNvbXBhcmlzb24gcHJvY2Vzcy5cbiAgICogQHBhcmFtIHtDb21wYXJlU2NyZWVuU3RhdGVzT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBjb21wYXJpc29uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkaW5nRGlzcGxheVR5cGUgLSBUaGUgdHlwZSBvZiBkaXNwbGF5IGJlaW5nIHJlY29yZGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdWaWRlb09wdGltaXplZCAtIFdoZXRoZXIgdGhlIHJlY29yZGluZyBpcyBvcHRpbWl6ZWQgZm9yIHZpZGVvLlxuICAgKiBAcGFyYW0ge0FycmF5PFNjcmVlblN0YXRlPn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlblN0YXRlcyAtIFRoZSBjdXJyZW50IHNjcmVlbiBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U2NyZWVuU3RhdGU+fSBvcHRpb25zLnBhcmFtZXRlcnMucHJldlNjcmVlblN0YXRlcyAtIFRoZSBwcmV2aW91cyBzY3JlZW4gc3RhdGVzLlxuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG9wdGlvbnMucGFyYW1ldGVycy5hY3RpdmVOYW1lcyAtIFRoZSBhY3RpdmUgbmFtZXMgaW4gdGhlIGN1cnJlbnQgY29udGV4dC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyaWdnZXIgLSBGdW5jdGlvbiB0byB0cmlnZ2VyIGFjdGlvbnMgYmFzZWQgb24gY2hhbmdlcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvbXBhcmlzb24gYW5kIGFueSB0cmlnZ2VyZWQgYWN0aW9ucyBhcmUgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBjb21wYXJpc29uIHByb2Nlc3MuXG4gICAqL1xuICBhc3luYyBjb21wYXJlU2NyZWVuU3RhdGVzKHtcbiAgICByZXN0YXJ0ID0gZmFsc2UsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogQ29tcGFyZVNjcmVlblN0YXRlc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgIGxldCB7XG4gICAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgICAgc2NyZWVuU3RhdGVzLFxuICAgICAgICBwcmV2U2NyZWVuU3RhdGVzLFxuICAgICAgICBhY3RpdmVOYW1lcyxcbiAgICAgICAgdHJpZ2dlcixcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBSZXN0YXJ0IHRoZSBjb21wYXJpc29uIGlmIG5lZWRlZFxuICAgICAgaWYgKHJlc3RhcnQpIHtcbiAgICAgICAgLy8gUGVyZm9ybSBuZWNlc3NhcnkgYWN0aW9ucyBvbiByZXN0YXJ0XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ29tcGFyZSBlYWNoIGtleS12YWx1ZSBwYWlyIGluIHRoZSBzY3JlZW5TdGF0ZXMgb2JqZWN0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JlZW5TdGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNjcmVlblN0YXRlID0gc2NyZWVuU3RhdGVzW2ldO1xuICAgICAgICBjb25zdCBwcmV2U2NyZWVuU3RhdGUgPSBwcmV2U2NyZWVuU3RhdGVzW2ldO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGFueSB2YWx1ZSBoYXMgY2hhbmdlZFxuICAgICAgICBjb25zdCBoYXNDaGFuZ2VkID0gKE9iamVjdC5rZXlzKGN1cnJlbnRTY3JlZW5TdGF0ZSkgYXMgKGtleW9mIFNjcmVlblN0YXRlKVtdKS5zb21lKFxuICAgICAgICAgIChrZXkpID0+IGN1cnJlbnRTY3JlZW5TdGF0ZVtrZXldICE9PSBwcmV2U2NyZWVuU3RhdGVba2V5XSxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBTaWduYWwgY2hhbmdlIGlmIGFueSB2YWx1ZSBoYXMgY2hhbmdlZFxuICAgICAgICBpZiAoaGFzQ2hhbmdlZCkge1xuICAgICAgICAgIC8vIFBlcmZvcm0gYWN0aW9ucyBvciB0cmlnZ2VyIGV2ZW50cyBiYXNlZCBvbiB0aGUgY2hhbmdlXG4gICAgICAgICAgaWYgKHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAndmlkZW8nICYmIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkKSB7XG4gICAgICAgICAgICBhd2FpdCB0cmlnZ2VyKHsgcmVmX0FjdGl2ZU5hbWVzOiBhY3RpdmVOYW1lcywgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCB0cmlnZ2VyKHsgcmVmX0FjdGl2ZU5hbWVzOiBhY3RpdmVOYW1lcywgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnY29tcGFyZVNjcmVlblN0YXRlcyBlcnJvcicsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==