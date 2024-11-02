import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles changes in screen events such as broadcast, chat, and conference.
 *
 * @param {OnScreenChangesOptions} options - The options for handling screen changes.
 * @param {boolean} [options.changed=false] - Indicates if the screen has changed.
 * @param {OnScreenChangesParameters} options.parameters - The parameters for handling screen changes.
 * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.addForBasic - Flag to add basic controls.
 * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
 * @param {Function} options.parameters.updateAddForBasic - Function to update the addForBasic flag.
 * @param {number} options.parameters.itemPageLimit - The limit for item pages.
 * @param {Function} options.parameters.updateItemPageLimit - Function to update the item page limit.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
 *
 * @returns {Promise<void>} A promise that resolves when the screen changes have been handled.
 *
 * @throws {Error} Throws an error if there is an issue handling screen changes.
 *
 * @example
 * ```typescript
 * const options = {
 *   changed: true,
 *   parameters: {
 *     eventType: 'broadcast',
 *     shareScreenStarted: false,
 *     shared: false,
 *     addForBasic: false,
 *     updateMainHeightWidth: (value) => { console.log(updated) },
 *     updateAddForBasic: (value) => { console.log(updated) },
 *     itemPageLimit: 1,
 *     updateItemPageLimit: (value) => { console.log(updated) },
 *     reorderStreams: async (params) => { },
 *   },
 * };
 *
 * await onScreenChanges(options);
 * ```
 */
export class OnScreenChanges {
    /**
     * Handles changes in screen events such as broadcast, chat, and conference.
     *
     * @param {OnScreenChangesOptions} options - The options for handling screen changes.
     * @param {boolean} options.changed - Indicates if the screen has changed.
     * @param {object} options.parameters - The parameters for handling screen changes.
     * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {boolean} options.parameters.addForBasic - Flag to add basic controls.
     * @param {function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
     * @param {function} options.parameters.updateAddForBasic - Function to update the addForBasic flag.
     * @param {number} options.parameters.itemPageLimit - The limit for item pages.
     * @param {function} options.parameters.updateItemPageLimit - Function to update the item page limit.
     * @param {function} options.parameters.reorderStreams - Function to reorder streams.
     *
     * @returns {Promise<void>} A promise that resolves when the screen changes have been handled.
     *
     * @throws {Error} Throws an error if there is an issue handling screen changes.
     */
    onScreenChanges = async ({ changed = false, parameters, }) => {
        try {
            // Destructure parameters
            let { eventType, shareScreenStarted, shared, addForBasic, updateMainHeightWidth, updateAddForBasic, itemPageLimit, updateItemPageLimit, 
            // mediasfu functions
            reorderStreams, } = parameters;
            // Remove element with id 'controlButtons'
            addForBasic = false;
            updateAddForBasic(addForBasic);
            if (eventType == 'broadcast' || eventType == 'chat') {
                addForBasic = true;
                updateAddForBasic(addForBasic);
                itemPageLimit = eventType == 'broadcast' ? 1 : 2;
                updateItemPageLimit(itemPageLimit);
                updateMainHeightWidth(eventType == 'broadcast' ? 100 : 0);
            }
            else {
                if (eventType == 'conference' && !(shareScreenStarted || shared)) {
                    updateMainHeightWidth(0);
                }
            }
            // Update the mini cards grid
            await reorderStreams({ add: false, screenChanged: changed, parameters });
        }
        catch (error) {
            // Handle errors during the process of handling screen changes
            console.log('Error handling screen changes:', error.message);
            // throw error;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: OnScreenChanges, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: OnScreenChanges, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: OnScreenChanges, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tc2NyZWVuLWNoYW5nZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvb24tc2NyZWVuLWNoYW5nZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXlCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQU1ILE1BQU0sT0FBTyxlQUFlO0lBQzFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsZUFBZSxHQUFHLEtBQUssRUFBRSxFQUN2QixPQUFPLEdBQUcsS0FBSyxFQUNmLFVBQVUsR0FDYSxFQUFpQixFQUFFO1FBQzFDLElBQUksQ0FBQztZQUNILHlCQUF5QjtZQUN6QixJQUFJLEVBQ0YsU0FBUyxFQUNULGtCQUFrQixFQUNsQixNQUFNLEVBQ04sV0FBVyxFQUNYLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLG1CQUFtQjtZQUVuQixxQkFBcUI7WUFDckIsY0FBYyxHQUNmLEdBQUcsVUFBVSxDQUFDO1lBRWYsMENBQTBDO1lBQzFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDcEIsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFL0IsSUFBSSxTQUFTLElBQUksV0FBVyxJQUFJLFNBQVMsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDcEQsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDbkIsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRS9CLGFBQWEsR0FBRyxTQUFTLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ25DLHFCQUFxQixDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksU0FBUyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDakUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLENBQUM7WUFDSCxDQUFDO1lBRUQsNkJBQTZCO1lBQzdCLE1BQU0sY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsOERBQThEO1lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdELGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FqRVMsZUFBZTsyR0FBZixlQUFlLGNBRmQsTUFBTTs7MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZW9yZGVyU3RyZWFtc1R5cGUsIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycywgRXZlbnRUeXBlIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyBleHRlbmRzIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgYWRkRm9yQmFzaWM6IGJvb2xlYW47XG4gIHVwZGF0ZUFkZEZvckJhc2ljOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGl0ZW1QYWdlTGltaXQ6IG51bWJlcjtcbiAgdXBkYXRlSXRlbVBhZ2VMaW1pdDogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLy9tZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9uU2NyZWVuQ2hhbmdlc09wdGlvbnMge1xuICBjaGFuZ2VkPzogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgT25TY3JlZW5DaGFuZ2VzVHlwZSA9IChvcHRpb25zOiBPblNjcmVlbkNoYW5nZXNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIEhhbmRsZXMgY2hhbmdlcyBpbiBzY3JlZW4gZXZlbnRzIHN1Y2ggYXMgYnJvYWRjYXN0LCBjaGF0LCBhbmQgY29uZmVyZW5jZS5cbiAqXG4gKiBAcGFyYW0ge09uU2NyZWVuQ2hhbmdlc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaGFuZGxpbmcgc2NyZWVuIGNoYW5nZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNoYW5nZWQ9ZmFsc2VdIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaGFzIGNoYW5nZWQuXG4gKiBAcGFyYW0ge09uU2NyZWVuQ2hhbmdlc1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBoYW5kbGluZyBzY3JlZW4gY2hhbmdlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sIFwiYnJvYWRjYXN0XCIsIFwiY2hhdFwiLCBcImNvbmZlcmVuY2VcIikuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hZGRGb3JCYXNpYyAtIEZsYWcgdG8gYWRkIGJhc2ljIGNvbnRyb2xzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5IZWlnaHRXaWR0aCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiBoZWlnaHQgYW5kIHdpZHRoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUFkZEZvckJhc2ljIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhZGRGb3JCYXNpYyBmbGFnLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5pdGVtUGFnZUxpbWl0IC0gVGhlIGxpbWl0IGZvciBpdGVtIHBhZ2VzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUl0ZW1QYWdlTGltaXQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGl0ZW0gcGFnZSBsaW1pdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgc3RyZWFtcy5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2NyZWVuIGNoYW5nZXMgaGF2ZSBiZWVuIGhhbmRsZWQuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBoYW5kbGluZyBzY3JlZW4gY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgY2hhbmdlZDogdHJ1ZSxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIGV2ZW50VHlwZTogJ2Jyb2FkY2FzdCcsXG4gKiAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiBmYWxzZSxcbiAqICAgICBzaGFyZWQ6IGZhbHNlLFxuICogICAgIGFkZEZvckJhc2ljOiBmYWxzZSxcbiAqICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGg6ICh2YWx1ZSkgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICogICAgIHVwZGF0ZUFkZEZvckJhc2ljOiAodmFsdWUpID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAqICAgICBpdGVtUGFnZUxpbWl0OiAxLFxuICogICAgIHVwZGF0ZUl0ZW1QYWdlTGltaXQ6ICh2YWx1ZSkgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICogICAgIHJlb3JkZXJTdHJlYW1zOiBhc3luYyAocGFyYW1zKSA9PiB7IH0sXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGF3YWl0IG9uU2NyZWVuQ2hhbmdlcyhvcHRpb25zKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9uU2NyZWVuQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIGNoYW5nZXMgaW4gc2NyZWVuIGV2ZW50cyBzdWNoIGFzIGJyb2FkY2FzdCwgY2hhdCwgYW5kIGNvbmZlcmVuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T25TY3JlZW5DaGFuZ2VzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBoYW5kbGluZyBzY3JlZW4gY2hhbmdlcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmNoYW5nZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBoYXMgY2hhbmdlZC5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBoYW5kbGluZyBzY3JlZW4gY2hhbmdlcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgXCJicm9hZGNhc3RcIiwgXCJjaGF0XCIsIFwiY29uZmVyZW5jZVwiKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFkZEZvckJhc2ljIC0gRmxhZyB0byBhZGQgYmFzaWMgY29udHJvbHMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluSGVpZ2h0V2lkdGggLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gaGVpZ2h0IGFuZCB3aWR0aC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUFkZEZvckJhc2ljIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhZGRGb3JCYXNpYyBmbGFnLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLml0ZW1QYWdlTGltaXQgLSBUaGUgbGltaXQgZm9yIGl0ZW0gcGFnZXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJdGVtUGFnZUxpbWl0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBpdGVtIHBhZ2UgbGltaXQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgc3RyZWFtcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBjaGFuZ2VzIGhhdmUgYmVlbiBoYW5kbGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGhhbmRsaW5nIHNjcmVlbiBjaGFuZ2VzLlxuICAgKi9cbiAgb25TY3JlZW5DaGFuZ2VzID0gYXN5bmMgKHtcbiAgICBjaGFuZ2VkID0gZmFsc2UsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogT25TY3JlZW5DaGFuZ2VzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBsZXQge1xuICAgICAgICBldmVudFR5cGUsXG4gICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBhZGRGb3JCYXNpYyxcbiAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoLFxuICAgICAgICB1cGRhdGVBZGRGb3JCYXNpYyxcbiAgICAgICAgaXRlbVBhZ2VMaW1pdCxcbiAgICAgICAgdXBkYXRlSXRlbVBhZ2VMaW1pdCxcblxuICAgICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgd2l0aCBpZCAnY29udHJvbEJ1dHRvbnMnXG4gICAgICBhZGRGb3JCYXNpYyA9IGZhbHNlO1xuICAgICAgdXBkYXRlQWRkRm9yQmFzaWMoYWRkRm9yQmFzaWMpO1xuXG4gICAgICBpZiAoZXZlbnRUeXBlID09ICdicm9hZGNhc3QnIHx8IGV2ZW50VHlwZSA9PSAnY2hhdCcpIHtcbiAgICAgICAgYWRkRm9yQmFzaWMgPSB0cnVlO1xuICAgICAgICB1cGRhdGVBZGRGb3JCYXNpYyhhZGRGb3JCYXNpYyk7XG5cbiAgICAgICAgaXRlbVBhZ2VMaW1pdCA9IGV2ZW50VHlwZSA9PSAnYnJvYWRjYXN0JyA/IDEgOiAyO1xuICAgICAgICB1cGRhdGVJdGVtUGFnZUxpbWl0KGl0ZW1QYWdlTGltaXQpO1xuICAgICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgoZXZlbnRUeXBlID09ICdicm9hZGNhc3QnID8gMTAwIDogMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJyAmJiAhKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpKSB7XG4gICAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoKDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgbWluaSBjYXJkcyBncmlkXG4gICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IGNoYW5nZWQsIHBhcmFtZXRlcnMgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgLy8gSGFuZGxlIGVycm9ycyBkdXJpbmcgdGhlIHByb2Nlc3Mgb2YgaGFuZGxpbmcgc2NyZWVuIGNoYW5nZXNcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBoYW5kbGluZyBzY3JlZW4gY2hhbmdlczonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIC8vIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==