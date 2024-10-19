import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RecordUpdateTimer {
    /**
     * Updates the recording timer and progress time.
     * @function
     * @param {RecordUpdateTimerOptions} options - The options object containing necessary variables and functions.
     */
    /**
     * Updates the recording timer by calculating the elapsed time since the recording started
     * and formatting it in HH:MM:SS format.
     *
     * @param {Object} options - The options object.
     * @param {number} options.recordElapsedTime - The elapsed recording time in seconds.
     * @param {number} options.recordStartTime - The timestamp when the recording started.
     * @param {Function} options.updateRecordElapsedTime - Callback to update the elapsed recording time.
     * @param {Function} options.updateRecordingProgressTime - Callback to update the formatted recording time.
     * @returns {void}
     */
    recordUpdateTimer({ recordElapsedTime, recordStartTime, updateRecordElapsedTime, updateRecordingProgressTime, }) {
        /**
         * Utility function to pad single-digit numbers with leading zeros.
         * @param {number} number - The number to pad.
         * @returns {string} The padded number as a string.
         */
        function padNumber(number) {
            return number.toString().padStart(2, '0');
        }
        const currentTime = new Date().getTime(); // Get the current timestamp
        recordElapsedTime = Math.floor((currentTime - recordStartTime) / 1000); // Calculate the elapsed time in seconds
        updateRecordElapsedTime(recordElapsedTime);
        // Format the time in HH:MM:SS format
        const hours = Math.floor(recordElapsedTime / 3600);
        const minutes = Math.floor((recordElapsedTime % 3600) / 60);
        const seconds = recordElapsedTime % 60;
        const formattedTime = padNumber(hours) + ':' + padNumber(minutes) + ':' + padNumber(seconds);
        updateRecordingProgressTime(formattedTime);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordUpdateTimer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordUpdateTimer, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordUpdateTimer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXVwZGF0ZS10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvcmVjb3JkLXVwZGF0ZS10aW1lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYzNDLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7Ozs7T0FJRztJQUNIOzs7Ozs7Ozs7O09BVUc7SUFFSCxpQkFBaUIsQ0FBQyxFQUNoQixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLHVCQUF1QixFQUN2QiwyQkFBMkIsR0FDRjtRQUN6Qjs7OztXQUlHO1FBQ0gsU0FBUyxTQUFTLENBQUMsTUFBYztZQUMvQixPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsNEJBQTRCO1FBQ3RFLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx3Q0FBd0M7UUFDaEgsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUzQyxxQ0FBcUM7UUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDNUQsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0YsMkJBQTJCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0MsQ0FBQzt1R0E1Q1UsaUJBQWlCOzJHQUFqQixpQkFBaUIsY0FGaEIsTUFBTTs7MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgUmVjb3JkVXBkYXRlVGltZXJPcHRpb25zIHtcbiAgcmVjb3JkRWxhcHNlZFRpbWU6IG51bWJlcjtcbiAgcmVjb3JkU3RhcnRUaW1lOiBudW1iZXI7XG4gIHVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lOiAoZWxhcHNlZFRpbWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiAoZm9ybWF0dGVkVGltZTogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZWNvcmRVcGRhdGVUaW1lclR5cGUgPSAob3B0aW9uczogUmVjb3JkVXBkYXRlVGltZXJPcHRpb25zKSA9PiB2b2lkO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVjb3JkVXBkYXRlVGltZXIge1xuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcmVjb3JkaW5nIHRpbWVyIGFuZCBwcm9ncmVzcyB0aW1lLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtSZWNvcmRVcGRhdGVUaW1lck9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBuZWNlc3NhcnkgdmFyaWFibGVzIGFuZCBmdW5jdGlvbnMuXG4gICAqL1xuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcmVjb3JkaW5nIHRpbWVyIGJ5IGNhbGN1bGF0aW5nIHRoZSBlbGFwc2VkIHRpbWUgc2luY2UgdGhlIHJlY29yZGluZyBzdGFydGVkXG4gICAqIGFuZCBmb3JtYXR0aW5nIGl0IGluIEhIOk1NOlNTIGZvcm1hdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJlY29yZEVsYXBzZWRUaW1lIC0gVGhlIGVsYXBzZWQgcmVjb3JkaW5nIHRpbWUgaW4gc2Vjb25kcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucmVjb3JkU3RhcnRUaW1lIC0gVGhlIHRpbWVzdGFtcCB3aGVuIHRoZSByZWNvcmRpbmcgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSAtIENhbGxiYWNrIHRvIHVwZGF0ZSB0aGUgZWxhcHNlZCByZWNvcmRpbmcgdGltZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUgLSBDYWxsYmFjayB0byB1cGRhdGUgdGhlIGZvcm1hdHRlZCByZWNvcmRpbmcgdGltZS5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG4gIHJlY29yZFVwZGF0ZVRpbWVyKHtcbiAgICByZWNvcmRFbGFwc2VkVGltZSxcbiAgICByZWNvcmRTdGFydFRpbWUsXG4gICAgdXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUsXG4gICAgdXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLFxuICB9OiBSZWNvcmRVcGRhdGVUaW1lck9wdGlvbnMpOiB2b2lkIHtcbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIHBhZCBzaW5nbGUtZGlnaXQgbnVtYmVycyB3aXRoIGxlYWRpbmcgemVyb3MuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIFRoZSBudW1iZXIgdG8gcGFkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYWRkZWQgbnVtYmVyIGFzIGEgc3RyaW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBhZE51bWJlcihudW1iZXI6IG51bWJlcikge1xuICAgICAgcmV0dXJuIG51bWJlci50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWVzdGFtcFxuICAgIHJlY29yZEVsYXBzZWRUaW1lID0gTWF0aC5mbG9vcigoY3VycmVudFRpbWUgLSByZWNvcmRTdGFydFRpbWUpIC8gMTAwMCk7IC8vIENhbGN1bGF0ZSB0aGUgZWxhcHNlZCB0aW1lIGluIHNlY29uZHNcbiAgICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZShyZWNvcmRFbGFwc2VkVGltZSk7XG5cbiAgICAvLyBGb3JtYXQgdGhlIHRpbWUgaW4gSEg6TU06U1MgZm9ybWF0XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHJlY29yZEVsYXBzZWRUaW1lIC8gMzYwMCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHJlY29yZEVsYXBzZWRUaW1lICUgMzYwMCkgLyA2MCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHJlY29yZEVsYXBzZWRUaW1lICUgNjA7XG4gICAgY29uc3QgZm9ybWF0dGVkVGltZSA9IHBhZE51bWJlcihob3VycykgKyAnOicgKyBwYWROdW1iZXIobWludXRlcykgKyAnOicgKyBwYWROdW1iZXIoc2Vjb25kcyk7XG5cbiAgICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUoZm9ybWF0dGVkVGltZSk7XG4gIH1cbn1cbiJdfQ==