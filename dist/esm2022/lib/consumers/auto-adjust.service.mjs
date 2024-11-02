import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @service AutoAdjust
 * @description Service to auto-adjust layout values based on the event type, number of participants, and sharing conditions. Useful for dynamically adjusting UI elements in different event settings.
 *
 * @method autoAdjust
 * Dynamically calculates and adjusts layout values (e.g., grid columns) based on conditions such as event type, participant count, and sharing status.
 *
 * @param {AutoAdjustOptions} options - Configuration options for the auto-adjustment.
 * @param {number} options.n - Number of participants in the event.
 * @param {EventType} options.eventType - Type of event (e.g., 'broadcast', 'chat', 'conference').
 * @param {boolean} options.shareScreenStarted - Indicates whether screen sharing is active.
 * @param {boolean} options.shared - Indicates if another resource is currently shared.
 *
 * @returns {Promise<number[]>} A promise resolving to an array of two adjusted layout values.
 *
 * @example
 * ```typescript
 * const [primaryLayout, secondaryLayout] = await autoAdjustService.autoAdjust({
 *   n: 5,
 *   eventType: 'conference',
 *   shareScreenStarted: false,
 *   shared: false,
 * });
 * console.log(primaryLayout, secondaryLayout); // Adjusted layout values based on inputs
 * ```
 */
export class AutoAdjust {
    /**
     * Adjusts values based on the provided options.
     *
     * @param {AutoAdjustOptions} options - The options for auto adjustment.
     * @param {number} options.n - The number of participants.
     * @param {string} options.eventType - The type of event (e.g., 'broadcast', 'chat', 'conference').
     * @param {boolean} options.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.shared - Indicates if something is shared.
     *
     * @returns {Promise<number[]>} A promise that resolves to an array containing the adjusted values.
     */
    async autoAdjust({ n, eventType, shareScreenStarted, shared, }) {
        // Default values
        let val1 = 6;
        let val2 = 12 - val1;
        // Calculate percentage values
        // Adjust values based on eventType and other conditions
        if (eventType === 'broadcast') {
            val1 = 0;
            val2 = 12 - val1;
        }
        else if (eventType === 'chat' ||
            (eventType === 'conference' && !(shareScreenStarted || shared))) {
            val1 = 12;
            val2 = 12 - val1;
        }
        else {
            if (shareScreenStarted || shared) {
                val2 = 10;
                val1 = 12 - val2;
            }
            else {
                // Adjust values based on the number of participants (n)
                if (n === 0) {
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
        // Return an array with adjusted values
        return [val1, val2];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AutoAdjust, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AutoAdjust, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AutoAdjust, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1hZGp1c3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvYXV0by1hZGp1c3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQU1ILE1BQU0sT0FBTyxVQUFVO0lBQ3JCOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQ2YsQ0FBQyxFQUNELFNBQVMsRUFDVCxrQkFBa0IsRUFDbEIsTUFBTSxHQUNZO1FBQ2xCLGlCQUFpQjtRQUNqQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRXJCLDhCQUE4QjtRQUU5Qix3REFBd0Q7UUFDeEQsSUFBSSxTQUFTLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDOUIsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNULElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUM7YUFBTSxJQUNMLFNBQVMsS0FBSyxNQUFNO1lBQ3BCLENBQUMsU0FBUyxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLENBQUMsRUFDL0QsQ0FBQztZQUNELElBQUksR0FBRyxFQUFFLENBQUM7WUFDVixJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksa0JBQWtCLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDbkIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLHdEQUF3RDtnQkFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1osSUFBSSxHQUFHLENBQUMsQ0FBQztvQkFDVCxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUMzQixJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUNULElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixDQUFDO3FCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzNCLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7cUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxHQUFHLENBQUMsQ0FBQztvQkFDVCxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO29CQUM1QixJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUNULElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixDQUFDO3FCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7b0JBQzdCLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7cUJBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztvQkFDN0IsSUFBSSxHQUFHLENBQUMsQ0FBQztvQkFDVCxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ1YsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELHVDQUF1QztRQUN2QyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7dUdBdEVVLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRvQWRqdXN0T3B0aW9ucyB7XG4gIG46IG51bWJlcjtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIHNoYXJlU2NyZWVuU3RhcnRlZDogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBBdXRvQWRqdXN0VHlwZSA9IChvcHRpb25zOiBBdXRvQWRqdXN0T3B0aW9ucykgPT4gUHJvbWlzZTxudW1iZXJbXT47XG5cbi8qKlxuICogQHNlcnZpY2UgQXV0b0FkanVzdFxuICogQGRlc2NyaXB0aW9uIFNlcnZpY2UgdG8gYXV0by1hZGp1c3QgbGF5b3V0IHZhbHVlcyBiYXNlZCBvbiB0aGUgZXZlbnQgdHlwZSwgbnVtYmVyIG9mIHBhcnRpY2lwYW50cywgYW5kIHNoYXJpbmcgY29uZGl0aW9ucy4gVXNlZnVsIGZvciBkeW5hbWljYWxseSBhZGp1c3RpbmcgVUkgZWxlbWVudHMgaW4gZGlmZmVyZW50IGV2ZW50IHNldHRpbmdzLlxuICpcbiAqIEBtZXRob2QgYXV0b0FkanVzdFxuICogRHluYW1pY2FsbHkgY2FsY3VsYXRlcyBhbmQgYWRqdXN0cyBsYXlvdXQgdmFsdWVzIChlLmcuLCBncmlkIGNvbHVtbnMpIGJhc2VkIG9uIGNvbmRpdGlvbnMgc3VjaCBhcyBldmVudCB0eXBlLCBwYXJ0aWNpcGFudCBjb3VudCwgYW5kIHNoYXJpbmcgc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7QXV0b0FkanVzdE9wdGlvbnN9IG9wdGlvbnMgLSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBhdXRvLWFkanVzdG1lbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5uIC0gTnVtYmVyIG9mIHBhcnRpY2lwYW50cyBpbiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0V2ZW50VHlwZX0gb3B0aW9ucy5ldmVudFR5cGUgLSBUeXBlIG9mIGV2ZW50IChlLmcuLCAnYnJvYWRjYXN0JywgJ2NoYXQnLCAnY29uZmVyZW5jZScpLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnNoYXJlU2NyZWVuU3RhcnRlZCAtIEluZGljYXRlcyB3aGV0aGVyIHNjcmVlbiBzaGFyaW5nIGlzIGFjdGl2ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgYW5vdGhlciByZXNvdXJjZSBpcyBjdXJyZW50bHkgc2hhcmVkLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcltdPn0gQSBwcm9taXNlIHJlc29sdmluZyB0byBhbiBhcnJheSBvZiB0d28gYWRqdXN0ZWQgbGF5b3V0IHZhbHVlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgW3ByaW1hcnlMYXlvdXQsIHNlY29uZGFyeUxheW91dF0gPSBhd2FpdCBhdXRvQWRqdXN0U2VydmljZS5hdXRvQWRqdXN0KHtcbiAqICAgbjogNSxcbiAqICAgZXZlbnRUeXBlOiAnY29uZmVyZW5jZScsXG4gKiAgIHNoYXJlU2NyZWVuU3RhcnRlZDogZmFsc2UsXG4gKiAgIHNoYXJlZDogZmFsc2UsXG4gKiB9KTtcbiAqIGNvbnNvbGUubG9nKHByaW1hcnlMYXlvdXQsIHNlY29uZGFyeUxheW91dCk7IC8vIEFkanVzdGVkIGxheW91dCB2YWx1ZXMgYmFzZWQgb24gaW5wdXRzXG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRvQWRqdXN0IHtcbiAgLyoqXG4gICAqIEFkanVzdHMgdmFsdWVzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge0F1dG9BZGp1c3RPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGF1dG8gYWRqdXN0bWVudC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubiAtIFRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgJ2Jyb2FkY2FzdCcsICdjaGF0JywgJ2NvbmZlcmVuY2UnKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnNoYXJlU2NyZWVuU3RhcnRlZCAtIEluZGljYXRlcyBpZiBzY3JlZW4gc2hhcmluZyBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnNoYXJlZCAtIEluZGljYXRlcyBpZiBzb21ldGhpbmcgaXMgc2hhcmVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXJbXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGFkanVzdGVkIHZhbHVlcy5cbiAgICovXG4gIGFzeW5jIGF1dG9BZGp1c3Qoe1xuICAgIG4sXG4gICAgZXZlbnRUeXBlLFxuICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICBzaGFyZWQsXG4gIH06IEF1dG9BZGp1c3RPcHRpb25zKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICAgIC8vIERlZmF1bHQgdmFsdWVzXG4gICAgbGV0IHZhbDEgPSA2O1xuICAgIGxldCB2YWwyID0gMTIgLSB2YWwxO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHBlcmNlbnRhZ2UgdmFsdWVzXG5cbiAgICAvLyBBZGp1c3QgdmFsdWVzIGJhc2VkIG9uIGV2ZW50VHlwZSBhbmQgb3RoZXIgY29uZGl0aW9uc1xuICAgIGlmIChldmVudFR5cGUgPT09ICdicm9hZGNhc3QnKSB7XG4gICAgICB2YWwxID0gMDtcbiAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGV2ZW50VHlwZSA9PT0gJ2NoYXQnIHx8XG4gICAgICAoZXZlbnRUeXBlID09PSAnY29uZmVyZW5jZScgJiYgIShzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSlcbiAgICApIHtcbiAgICAgIHZhbDEgPSAxMjtcbiAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICAgIHZhbDIgPSAxMDtcbiAgICAgICAgdmFsMSA9IDEyIC0gdmFsMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFkanVzdCB2YWx1ZXMgYmFzZWQgb24gdGhlIG51bWJlciBvZiBwYXJ0aWNpcGFudHMgKG4pXG4gICAgICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgICAgdmFsMSA9IDE7XG4gICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgfSBlbHNlIGlmIChuID49IDEgJiYgbiA8IDQpIHtcbiAgICAgICAgICB2YWwxID0gNDtcbiAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICB9IGVsc2UgaWYgKG4gPj0gNCAmJiBuIDwgNikge1xuICAgICAgICAgIHZhbDEgPSA2O1xuICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgIH0gZWxzZSBpZiAobiA+PSA2ICYmIG4gPCA5KSB7XG4gICAgICAgICAgdmFsMSA9IDY7XG4gICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgfSBlbHNlIGlmIChuID49IDkgJiYgbiA8IDEyKSB7XG4gICAgICAgICAgdmFsMSA9IDY7XG4gICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgfSBlbHNlIGlmIChuID49IDEyICYmIG4gPCAyMCkge1xuICAgICAgICAgIHZhbDEgPSA4O1xuICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgIH0gZWxzZSBpZiAobiA+PSAyMCAmJiBuIDwgNTApIHtcbiAgICAgICAgICB2YWwxID0gODtcbiAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbDEgPSAxMDtcbiAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGFycmF5IHdpdGggYWRqdXN0ZWQgdmFsdWVzXG4gICAgcmV0dXJuIFt2YWwxLCB2YWwyXTtcbiAgfVxufVxuIl19