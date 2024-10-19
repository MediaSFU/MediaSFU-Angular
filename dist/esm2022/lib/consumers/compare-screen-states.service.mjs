import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZS1zY3JlZW4tc3RhdGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2NvbXBhcmUtc2NyZWVuLXN0YXRlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBNEIzQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUN4QixPQUFPLEdBQUcsS0FBSyxFQUNmLFVBQVUsR0FDaUI7UUFDM0IsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1lBRW5DLElBQUksRUFDRixvQkFBb0IsRUFDcEIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLE9BQU8sR0FDUixHQUFHLFVBQVUsQ0FBQztZQUVmLG1DQUFtQztZQUNuQyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNaLHVDQUF1QztnQkFDdkMsT0FBTztZQUNULENBQUM7WUFFRCwwREFBMEQ7WUFDMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDN0MsTUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QyxpQ0FBaUM7Z0JBQ2pDLE1BQU0sVUFBVSxHQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQTJCLENBQUMsSUFBSSxDQUNoRixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUMxRCxDQUFDO2dCQUVGLHlDQUF5QztnQkFDekMsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFDZix3REFBd0Q7b0JBQ3hELElBQUksb0JBQW9CLEtBQUssT0FBTyxJQUFJLHVCQUF1QixFQUFFLENBQUM7d0JBQ2hFLE1BQU0sT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO3dCQUM1RCxNQUFNO29CQUNSLENBQUM7b0JBQ0QsTUFBTSxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQzVELE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNILENBQUM7dUdBbEVVLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNjcmVlblN0YXRlLCBUcmlnZ2VyVHlwZSwgVHJpZ2dlclBhcmFtZXRlcnMgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmVTY3JlZW5TdGF0ZXNQYXJhbWV0ZXJzIGV4dGVuZHMgVHJpZ2dlclBhcmFtZXRlcnMge1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJztcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIHNjcmVlblN0YXRlczogU2NyZWVuU3RhdGVbXTtcbiAgcHJldlNjcmVlblN0YXRlczogU2NyZWVuU3RhdGVbXTtcbiAgYWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICB0cmlnZ2VyOiBUcmlnZ2VyVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ29tcGFyZVNjcmVlblN0YXRlc1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wYXJlU2NyZWVuU3RhdGVzT3B0aW9ucyB7XG4gIHJlc3RhcnQ/OiBib29sZWFuO1xuICBwYXJhbWV0ZXJzOiBDb21wYXJlU2NyZWVuU3RhdGVzUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29tcGFyZVNjcmVlblN0YXRlc1R5cGUgPSAob3B0aW9uczogQ29tcGFyZVNjcmVlblN0YXRlc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb21wYXJlU2NyZWVuU3RhdGVzIHtcbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSBjdXJyZW50IHNjcmVlbiBzdGF0ZXMgd2l0aCB0aGUgcHJldmlvdXMgc2NyZWVuIHN0YXRlcyBhbmQgdHJpZ2dlcnMgYWN0aW9ucyBiYXNlZCBvbiBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjb21wYXJpbmcgc2NyZWVuIHN0YXRlcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXN0YXJ0PWZhbHNlXSAtIFdoZXRoZXIgdG8gcmVzdGFydCB0aGUgY29tcGFyaXNvbiBwcm9jZXNzLlxuICAgKiBAcGFyYW0ge0NvbXBhcmVTY3JlZW5TdGF0ZXNPcHRpb25zfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIGNvbXBhcmlzb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRpbmdEaXNwbGF5VHlwZSAtIFRoZSB0eXBlIG9mIGRpc3BsYXkgYmVpbmcgcmVjb3JkZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlY29yZGluZ1ZpZGVvT3B0aW1pemVkIC0gV2hldGhlciB0aGUgcmVjb3JkaW5nIGlzIG9wdGltaXplZCBmb3IgdmlkZW8uXG4gICAqIEBwYXJhbSB7QXJyYXk8U2NyZWVuU3RhdGU+fSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuU3RhdGVzIC0gVGhlIGN1cnJlbnQgc2NyZWVuIHN0YXRlcy5cbiAgICogQHBhcmFtIHtBcnJheTxTY3JlZW5TdGF0ZT59IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2U2NyZWVuU3RhdGVzIC0gVGhlIHByZXZpb3VzIHNjcmVlbiBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFjdGl2ZU5hbWVzIC0gVGhlIGFjdGl2ZSBuYW1lcyBpbiB0aGUgY3VycmVudCBjb250ZXh0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudHJpZ2dlciAtIEZ1bmN0aW9uIHRvIHRyaWdnZXIgYWN0aW9ucyBiYXNlZCBvbiBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29tcGFyaXNvbiBhbmQgYW55IHRyaWdnZXJlZCBhY3Rpb25zIGFyZSBjb21wbGV0ZS5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIGxvZyBhbiBlcnJvciBtZXNzYWdlIGlmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIGNvbXBhcmlzb24gcHJvY2Vzcy5cbiAgICovXG4gIGFzeW5jIGNvbXBhcmVTY3JlZW5TdGF0ZXMoe1xuICAgIHJlc3RhcnQgPSBmYWxzZSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBDb21wYXJlU2NyZWVuU3RhdGVzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgbGV0IHtcbiAgICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGUsXG4gICAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgICBzY3JlZW5TdGF0ZXMsXG4gICAgICAgIHByZXZTY3JlZW5TdGF0ZXMsXG4gICAgICAgIGFjdGl2ZU5hbWVzLFxuICAgICAgICB0cmlnZ2VyLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIFJlc3RhcnQgdGhlIGNvbXBhcmlzb24gaWYgbmVlZGVkXG4gICAgICBpZiAocmVzdGFydCkge1xuICAgICAgICAvLyBQZXJmb3JtIG5lY2Vzc2FyeSBhY3Rpb25zIG9uIHJlc3RhcnRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDb21wYXJlIGVhY2gga2V5LXZhbHVlIHBhaXIgaW4gdGhlIHNjcmVlblN0YXRlcyBvYmplY3RzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmVlblN0YXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2NyZWVuU3RhdGUgPSBzY3JlZW5TdGF0ZXNbaV07XG4gICAgICAgIGNvbnN0IHByZXZTY3JlZW5TdGF0ZSA9IHByZXZTY3JlZW5TdGF0ZXNbaV07XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IGhhc0NoYW5nZWQgPSAoT2JqZWN0LmtleXMoY3VycmVudFNjcmVlblN0YXRlKSBhcyAoa2V5b2YgU2NyZWVuU3RhdGUpW10pLnNvbWUoXG4gICAgICAgICAgKGtleSkgPT4gY3VycmVudFNjcmVlblN0YXRlW2tleV0gIT09IHByZXZTY3JlZW5TdGF0ZVtrZXldLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFNpZ25hbCBjaGFuZ2UgaWYgYW55IHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgICAgIGlmIChoYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgLy8gUGVyZm9ybSBhY3Rpb25zIG9yIHRyaWdnZXIgZXZlbnRzIGJhc2VkIG9uIHRoZSBjaGFuZ2VcbiAgICAgICAgICBpZiAocmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycgJiYgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRyaWdnZXIoeyByZWZfQWN0aXZlTmFtZXM6IGFjdGl2ZU5hbWVzLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHRyaWdnZXIoeyByZWZfQWN0aXZlTmFtZXM6IGFjdGl2ZU5hbWVzLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjb21wYXJlU2NyZWVuU3RhdGVzIGVycm9yJywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19