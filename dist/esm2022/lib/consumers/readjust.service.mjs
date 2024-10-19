import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZGp1c3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvcmVhZGp1c3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQW1DM0MsTUFBTSxPQUFPLFFBQVE7SUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsUUFBUSxHQUFHLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFtQixFQUFpQixFQUFFO1FBQzVFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUMvRCxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxFQUNGLFNBQVMsRUFDVCxrQkFBa0IsRUFDbEIsTUFBTSxFQUNOLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsU0FBUyxFQUNULFdBQVcsRUFDWCxXQUFXLEVBQ1gscUJBQXFCLEdBQ3RCLEdBQUcsVUFBVSxDQUFDO1lBRWYsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2YsbUJBQW1CLEdBQUcsZUFBZSxDQUFDO1lBQ3hDLENBQUM7WUFFRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7WUFDYixJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDekMsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLFNBQVMsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDN0Is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QkFDNUIsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDakIsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDOUQsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLDBEQUEwRDtZQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6RCxlQUFlO1FBQ2pCLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBdkhTLFFBQVE7MkdBQVIsUUFBUSxjQUZQLE1BQU07OzJGQUVQLFFBQVE7a0JBSHBCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gIEV2ZW50VHlwZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgUmVhZGp1c3RQYXJhbWV0ZXJzIGV4dGVuZHMgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzIHtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIHNoYXJlU2NyZWVuU3RhcnRlZDogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBtYWluSGVpZ2h0V2lkdGg6IG51bWJlcjtcbiAgcHJldk1haW5IZWlnaHRXaWR0aDogbnVtYmVyO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgZmlyc3Rfcm91bmQ6IGJvb2xlYW47XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICB1cGRhdGVNYWluSGVpZ2h0V2lkdGg6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBSZWFkanVzdFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkanVzdE9wdGlvbnMge1xuICBuOiBudW1iZXI7XG4gIHN0YXRlOiBudW1iZXI7XG4gIHBhcmFtZXRlcnM6IFJlYWRqdXN0UGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVhZGp1c3RUeXBlID0gKG9wdGlvbnM6IFJlYWRqdXN0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlYWRqdXN0IHtcbiAgLyoqXG4gICAqIEFkanVzdHMgdGhlIGxheW91dCBwYXJhbWV0ZXJzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRqdXN0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZWFkanVzdGluZyB0aGUgbGF5b3V0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5uIC0gVGhlIG51bWJlciBvZiBwYXJ0aWNpcGFudHMgb3IgZWxlbWVudHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnN0YXRlIC0gVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGxheW91dC5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgbGF5b3V0IGFkanVzdG1lbnQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgXCJicm9hZGNhc3RcIiwgXCJjaGF0XCIsIFwiY29uZmVyZW5jZVwiKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgY29udGVudCBpcyBiZWluZyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMubWFpbkhlaWdodFdpZHRoIC0gVGhlIG1haW4gaGVpZ2h0IGFuZCB3aWR0aCB2YWx1ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2TWFpbkhlaWdodFdpZHRoIC0gVGhlIHByZXZpb3VzIG1haW4gaGVpZ2h0IGFuZCB3aWR0aCB2YWx1ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ob3N0TGFiZWwgLSBUaGUgbGFiZWwgZm9yIHRoZSBob3N0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5maXJzdF9yb3VuZCAtIEluZGljYXRlcyBpZiBpdCBpcyB0aGUgZmlyc3Qgcm91bmQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbkhlaWdodFdpZHRoIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIGhlaWdodCBhbmQgd2lkdGguXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBsYXlvdXQgYWRqdXN0bWVudCBpcyBjb21wbGV0ZS5cbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSB1cGRhdGluZyB0aGUgZ3JpZCBzaXplcy5cbiAgICovXG4gIHJlYWRqdXN0ID0gYXN5bmMgKHsgbiwgc3RhdGUsIHBhcmFtZXRlcnMgfTogUmVhZGp1c3RPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcywgcHJlcG9wdWxhdGVVc2VyTWVkaWEgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBsZXQge1xuICAgICAgICBldmVudFR5cGUsXG4gICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBtYWluSGVpZ2h0V2lkdGgsXG4gICAgICAgIHByZXZNYWluSGVpZ2h0V2lkdGgsXG4gICAgICAgIGhvc3RMYWJlbCxcbiAgICAgICAgZmlyc3Rfcm91bmQsXG4gICAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgaWYgKHN0YXRlID09IDApIHtcbiAgICAgICAgcHJldk1haW5IZWlnaHRXaWR0aCA9IG1haW5IZWlnaHRXaWR0aDtcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbDEgPSA2O1xuICAgICAgbGV0IHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICBsZXQgY2FsMSA9IE1hdGguZmxvb3IoKHZhbDEgLyAxMikgKiAxMDApO1xuICAgICAgbGV0IGNhbDIgPSAxMDAgLSBjYWwxO1xuXG4gICAgICBpZiAoZXZlbnRUeXBlID09ICdicm9hZGNhc3QnKSB7XG4gICAgICAgIHZhbDEgPSAwO1xuICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuXG4gICAgICAgIGlmIChuID09IDApIHtcbiAgICAgICAgICB2YWwxID0gMDtcbiAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBldmVudFR5cGUgPT0gJ2NoYXQnIHx8XG4gICAgICAgIChldmVudFR5cGUgPT0gJ2NvbmZlcmVuY2UnICYmICEoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkpXG4gICAgICApIHtcbiAgICAgICAgdmFsMSA9IDEyO1xuICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgICB2YWwyID0gMTA7XG4gICAgICAgICAgdmFsMSA9IDEyIC0gdmFsMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobiA9PSAwKSB7XG4gICAgICAgICAgICB2YWwxID0gMTtcbiAgICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgICAgfSBlbHNlIGlmIChuID49IDEgJiYgbiA8IDQpIHtcbiAgICAgICAgICAgIHZhbDEgPSA0O1xuICAgICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG4gPj0gNCAmJiBuIDwgNikge1xuICAgICAgICAgICAgdmFsMSA9IDY7XG4gICAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICAgIH0gZWxzZSBpZiAobiA+PSA2ICYmIG4gPCA5KSB7XG4gICAgICAgICAgICB2YWwxID0gNjtcbiAgICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgICAgfSBlbHNlIGlmIChuID49IDkgJiYgbiA8IDEyKSB7XG4gICAgICAgICAgICB2YWwxID0gNjtcbiAgICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgICAgfSBlbHNlIGlmIChuID49IDEyICYmIG4gPCAyMCkge1xuICAgICAgICAgICAgdmFsMSA9IDg7XG4gICAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICAgIH0gZWxzZSBpZiAobiA+PSAyMCAmJiBuIDwgNTApIHtcbiAgICAgICAgICAgIHZhbDEgPSA4O1xuICAgICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsMSA9IDEwO1xuICAgICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09IDApIHtcbiAgICAgICAgbWFpbkhlaWdodFdpZHRoID0gdmFsMjtcbiAgICAgIH1cblxuICAgICAgY2FsMSA9IE1hdGguZmxvb3IoKHZhbDEgLyAxMikgKiAxMDApO1xuICAgICAgY2FsMiA9IDEwMCAtIGNhbDE7XG5cbiAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aChjYWwyKTtcblxuICAgICAgaWYgKHByZXZNYWluSGVpZ2h0V2lkdGggIT0gbWFpbkhlaWdodFdpZHRoKSB7XG4gICAgICAgIGlmICghbG9ja19zY3JlZW4gJiYgIXNoYXJlZCkge1xuICAgICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghZmlyc3Rfcm91bmQpIHtcbiAgICAgICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHVwZGF0aW5nIGdyaWQgc2l6ZXNcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB1cGRhdGluZyBncmlkIHNpemVzOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xufVxuIl19