import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tc2NyZWVuLWNoYW5nZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvb24tc2NyZWVuLWNoYW5nZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTRCM0MsTUFBTSxPQUFPLGVBQWU7SUFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxlQUFlLEdBQUcsS0FBSyxFQUFFLEVBQ3ZCLE9BQU8sR0FBRyxLQUFLLEVBQ2YsVUFBVSxHQUNhLEVBQWlCLEVBQUU7UUFDMUMsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLElBQUksRUFDRixTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixXQUFXLEVBQ1gscUJBQXFCLEVBQ3JCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsbUJBQW1CO1lBRW5CLHFCQUFxQjtZQUNyQixjQUFjLEdBQ2YsR0FBRyxVQUFVLENBQUM7WUFFZiwwQ0FBMEM7WUFDMUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUvQixJQUFJLFNBQVMsSUFBSSxXQUFXLElBQUksU0FBUyxJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNwRCxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFL0IsYUFBYSxHQUFHLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbkMscUJBQXFCLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxTQUFTLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUNqRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztZQUNILENBQUM7WUFFRCw2QkFBNkI7WUFDN0IsTUFBTSxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQiw4REFBOEQ7WUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsZUFBZTtRQUNqQixDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQWpFUyxlQUFlOzJHQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlb3JkZXJTdHJlYW1zVHlwZSwgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLCBFdmVudFR5cGUgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzIGV4dGVuZHMgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzIHtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIHNoYXJlU2NyZWVuU3RhcnRlZDogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBhZGRGb3JCYXNpYzogYm9vbGVhbjtcbiAgdXBkYXRlQWRkRm9yQmFzaWM6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXRlbVBhZ2VMaW1pdDogbnVtYmVyO1xuICB1cGRhdGVJdGVtUGFnZUxpbWl0OiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlTWFpbkhlaWdodFdpZHRoOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcblxuICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT25TY3JlZW5DaGFuZ2VzT3B0aW9ucyB7XG4gIGNoYW5nZWQ/OiBib29sZWFuO1xuICBwYXJhbWV0ZXJzOiBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBPblNjcmVlbkNoYW5nZXNUeXBlID0gKG9wdGlvbnM6IE9uU2NyZWVuQ2hhbmdlc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPblNjcmVlbkNoYW5nZXMge1xuICAvKipcbiAgICogSGFuZGxlcyBjaGFuZ2VzIGluIHNjcmVlbiBldmVudHMgc3VjaCBhcyBicm9hZGNhc3QsIGNoYXQsIGFuZCBjb25mZXJlbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09uU2NyZWVuQ2hhbmdlc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaGFuZGxpbmcgc2NyZWVuIGNoYW5nZXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jaGFuZ2VkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaGFzIGNoYW5nZWQuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgaGFuZGxpbmcgc2NyZWVuIGNoYW5nZXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sIFwiYnJvYWRjYXN0XCIsIFwiY2hhdFwiLCBcImNvbmZlcmVuY2VcIikuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCAtIEluZGljYXRlcyBpZiBzY3JlZW4gc2hhcmluZyBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgc2hhcmVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hZGRGb3JCYXNpYyAtIEZsYWcgdG8gYWRkIGJhc2ljIGNvbnRyb2xzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbkhlaWdodFdpZHRoIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIGhlaWdodCBhbmQgd2lkdGguXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBZGRGb3JCYXNpYyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYWRkRm9yQmFzaWMgZmxhZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5pdGVtUGFnZUxpbWl0IC0gVGhlIGxpbWl0IGZvciBpdGVtIHBhZ2VzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSXRlbVBhZ2VMaW1pdCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgaXRlbSBwYWdlIGxpbWl0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVvcmRlclN0cmVhbXMgLSBGdW5jdGlvbiB0byByZW9yZGVyIHN0cmVhbXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gY2hhbmdlcyBoYXZlIGJlZW4gaGFuZGxlZC5cbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBoYW5kbGluZyBzY3JlZW4gY2hhbmdlcy5cbiAgICovXG4gIG9uU2NyZWVuQ2hhbmdlcyA9IGFzeW5jICh7XG4gICAgY2hhbmdlZCA9IGZhbHNlLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IE9uU2NyZWVuQ2hhbmdlc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgbGV0IHtcbiAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgIHNoYXJlZCxcbiAgICAgICAgYWRkRm9yQmFzaWMsXG4gICAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCxcbiAgICAgICAgdXBkYXRlQWRkRm9yQmFzaWMsXG4gICAgICAgIGl0ZW1QYWdlTGltaXQsXG4gICAgICAgIHVwZGF0ZUl0ZW1QYWdlTGltaXQsXG5cbiAgICAgICAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIFJlbW92ZSBlbGVtZW50IHdpdGggaWQgJ2NvbnRyb2xCdXR0b25zJ1xuICAgICAgYWRkRm9yQmFzaWMgPSBmYWxzZTtcbiAgICAgIHVwZGF0ZUFkZEZvckJhc2ljKGFkZEZvckJhc2ljKTtcblxuICAgICAgaWYgKGV2ZW50VHlwZSA9PSAnYnJvYWRjYXN0JyB8fCBldmVudFR5cGUgPT0gJ2NoYXQnKSB7XG4gICAgICAgIGFkZEZvckJhc2ljID0gdHJ1ZTtcbiAgICAgICAgdXBkYXRlQWRkRm9yQmFzaWMoYWRkRm9yQmFzaWMpO1xuXG4gICAgICAgIGl0ZW1QYWdlTGltaXQgPSBldmVudFR5cGUgPT0gJ2Jyb2FkY2FzdCcgPyAxIDogMjtcbiAgICAgICAgdXBkYXRlSXRlbVBhZ2VMaW1pdChpdGVtUGFnZUxpbWl0KTtcbiAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoKGV2ZW50VHlwZSA9PSAnYnJvYWRjYXN0JyA/IDEwMCA6IDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PSAnY29uZmVyZW5jZScgJiYgIShzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSkge1xuICAgICAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCgwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIG1pbmkgY2FyZHMgZ3JpZFxuICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiBjaGFuZ2VkLCBwYXJhbWV0ZXJzIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIGhhbmRsaW5nIHNjcmVlbiBjaGFuZ2VzXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaGFuZGxpbmcgc2NyZWVuIGNoYW5nZXM6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAvLyB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG59XG4iXX0=