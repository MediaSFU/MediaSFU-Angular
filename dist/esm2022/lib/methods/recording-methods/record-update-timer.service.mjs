import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
 *
 * @remarks
 * This function calculates the elapsed time since the recording started and formats it into
 * a string in HH:MM:SS format. It updates both the elapsed time in seconds and the formatted
 * time via the provided callback functions.
 *
 * @example
 * ```typescript
 * const options: RecordUpdateTimerOptions = {
 *   recordElapsedTime: 0,
 *   recordStartTime: Date.now(),
 *   updateRecordElapsedTime: (elapsedTime) => { console.log(`Elapsed Time: ${elapsedTime} seconds`); },
 *   updateRecordingProgressTime: (formattedTime) => { console.log(`Formatted Time: ${formattedTime}`); },
 * };
 * recordUpdateTimer(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXVwZGF0ZS10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvcmVjb3JkLXVwZGF0ZS10aW1lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBVzNDOzs7O0dBSUc7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFNSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCOzs7O09BSUc7SUFDSDs7Ozs7Ozs7OztPQVVHO0lBRUgsaUJBQWlCLENBQUMsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZix1QkFBdUIsRUFDdkIsMkJBQTJCLEdBQ0Y7UUFDekI7Ozs7V0FJRztRQUNILFNBQVMsU0FBUyxDQUFDLE1BQWM7WUFDL0IsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QjtRQUN0RSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsd0NBQXdDO1FBQ2hILHVCQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFM0MscUNBQXFDO1FBQ3JDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sT0FBTyxHQUFHLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdGLDJCQUEyQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7dUdBNUNVLGlCQUFpQjsyR0FBakIsaUJBQWlCLGNBRmhCLE1BQU07OzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZFVwZGF0ZVRpbWVyT3B0aW9ucyB7XG4gIHJlY29yZEVsYXBzZWRUaW1lOiBudW1iZXI7XG4gIHJlY29yZFN0YXJ0VGltZTogbnVtYmVyO1xuICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZTogKGVsYXBzZWRUaW1lOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZTogKGZvcm1hdHRlZFRpbWU6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVjb3JkVXBkYXRlVGltZXJUeXBlID0gKG9wdGlvbnM6IFJlY29yZFVwZGF0ZVRpbWVyT3B0aW9ucykgPT4gdm9pZDtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSByZWNvcmRpbmcgdGltZXIgYW5kIHByb2dyZXNzIHRpbWUuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7UmVjb3JkVXBkYXRlVGltZXJPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgbmVjZXNzYXJ5IHZhcmlhYmxlcyBhbmQgZnVuY3Rpb25zLlxuICovXG5cbi8qKlxuICogVXBkYXRlcyB0aGUgcmVjb3JkaW5nIHRpbWVyIGJ5IGNhbGN1bGF0aW5nIHRoZSBlbGFwc2VkIHRpbWUgc2luY2UgdGhlIHJlY29yZGluZyBzdGFydGVkXG4gKiBhbmQgZm9ybWF0dGluZyBpdCBpbiBISDpNTTpTUyBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yZWNvcmRFbGFwc2VkVGltZSAtIFRoZSBlbGFwc2VkIHJlY29yZGluZyB0aW1lIGluIHNlY29uZHMuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yZWNvcmRTdGFydFRpbWUgLSBUaGUgdGltZXN0YW1wIHdoZW4gdGhlIHJlY29yZGluZyBzdGFydGVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSAtIENhbGxiYWNrIHRvIHVwZGF0ZSB0aGUgZWxhcHNlZCByZWNvcmRpbmcgdGltZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lIC0gQ2FsbGJhY2sgdG8gdXBkYXRlIHRoZSBmb3JtYXR0ZWQgcmVjb3JkaW5nIHRpbWUuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBmdW5jdGlvbiBjYWxjdWxhdGVzIHRoZSBlbGFwc2VkIHRpbWUgc2luY2UgdGhlIHJlY29yZGluZyBzdGFydGVkIGFuZCBmb3JtYXRzIGl0IGludG9cbiAqIGEgc3RyaW5nIGluIEhIOk1NOlNTIGZvcm1hdC4gSXQgdXBkYXRlcyBib3RoIHRoZSBlbGFwc2VkIHRpbWUgaW4gc2Vjb25kcyBhbmQgdGhlIGZvcm1hdHRlZFxuICogdGltZSB2aWEgdGhlIHByb3ZpZGVkIGNhbGxiYWNrIGZ1bmN0aW9ucy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9uczogUmVjb3JkVXBkYXRlVGltZXJPcHRpb25zID0ge1xuICogICByZWNvcmRFbGFwc2VkVGltZTogMCxcbiAqICAgcmVjb3JkU3RhcnRUaW1lOiBEYXRlLm5vdygpLFxuICogICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZTogKGVsYXBzZWRUaW1lKSA9PiB7IGNvbnNvbGUubG9nKGBFbGFwc2VkIFRpbWU6ICR7ZWxhcHNlZFRpbWV9IHNlY29uZHNgKTsgfSxcbiAqICAgdXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiAoZm9ybWF0dGVkVGltZSkgPT4geyBjb25zb2xlLmxvZyhgRm9ybWF0dGVkIFRpbWU6ICR7Zm9ybWF0dGVkVGltZX1gKTsgfSxcbiAqIH07XG4gKiByZWNvcmRVcGRhdGVUaW1lcihvcHRpb25zKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlY29yZFVwZGF0ZVRpbWVyIHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHJlY29yZGluZyB0aW1lciBhbmQgcHJvZ3Jlc3MgdGltZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7UmVjb3JkVXBkYXRlVGltZXJPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgbmVjZXNzYXJ5IHZhcmlhYmxlcyBhbmQgZnVuY3Rpb25zLlxuICAgKi9cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHJlY29yZGluZyB0aW1lciBieSBjYWxjdWxhdGluZyB0aGUgZWxhcHNlZCB0aW1lIHNpbmNlIHRoZSByZWNvcmRpbmcgc3RhcnRlZFxuICAgKiBhbmQgZm9ybWF0dGluZyBpdCBpbiBISDpNTTpTUyBmb3JtYXQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yZWNvcmRFbGFwc2VkVGltZSAtIFRoZSBlbGFwc2VkIHJlY29yZGluZyB0aW1lIGluIHNlY29uZHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJlY29yZFN0YXJ0VGltZSAtIFRoZSB0aW1lc3RhbXAgd2hlbiB0aGUgcmVjb3JkaW5nIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUgLSBDYWxsYmFjayB0byB1cGRhdGUgdGhlIGVsYXBzZWQgcmVjb3JkaW5nIHRpbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lIC0gQ2FsbGJhY2sgdG8gdXBkYXRlIHRoZSBmb3JtYXR0ZWQgcmVjb3JkaW5nIHRpbWUuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cblxuICByZWNvcmRVcGRhdGVUaW1lcih7XG4gICAgcmVjb3JkRWxhcHNlZFRpbWUsXG4gICAgcmVjb3JkU3RhcnRUaW1lLFxuICAgIHVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lLFxuICAgIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZSxcbiAgfTogUmVjb3JkVXBkYXRlVGltZXJPcHRpb25zKTogdm9pZCB7XG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBmdW5jdGlvbiB0byBwYWQgc2luZ2xlLWRpZ2l0IG51bWJlcnMgd2l0aCBsZWFkaW5nIHplcm9zLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSBUaGUgbnVtYmVyIHRvIHBhZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGFkZGVkIG51bWJlciBhcyBhIHN0cmluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwYWROdW1iZXIobnVtYmVyOiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBudW1iZXIudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7IC8vIEdldCB0aGUgY3VycmVudCB0aW1lc3RhbXBcbiAgICByZWNvcmRFbGFwc2VkVGltZSA9IE1hdGguZmxvb3IoKGN1cnJlbnRUaW1lIC0gcmVjb3JkU3RhcnRUaW1lKSAvIDEwMDApOyAvLyBDYWxjdWxhdGUgdGhlIGVsYXBzZWQgdGltZSBpbiBzZWNvbmRzXG4gICAgdXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUocmVjb3JkRWxhcHNlZFRpbWUpO1xuXG4gICAgLy8gRm9ybWF0IHRoZSB0aW1lIGluIEhIOk1NOlNTIGZvcm1hdFxuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihyZWNvcmRFbGFwc2VkVGltZSAvIDM2MDApO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChyZWNvcmRFbGFwc2VkVGltZSAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSByZWNvcmRFbGFwc2VkVGltZSAlIDYwO1xuICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBwYWROdW1iZXIoaG91cnMpICsgJzonICsgcGFkTnVtYmVyKG1pbnV0ZXMpICsgJzonICsgcGFkTnVtYmVyKHNlY29uZHMpO1xuXG4gICAgdXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lKGZvcm1hdHRlZFRpbWUpO1xuICB9XG59XG4iXX0=