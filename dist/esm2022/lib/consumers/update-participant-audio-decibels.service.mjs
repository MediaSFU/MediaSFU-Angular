import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Updates or adds a participant's audio decibel data in the array.
 *
 * This method checks if a participant's name exists in the audio decibels array.
 * If it does, it updates the participant's `averageLoudness`; otherwise, it adds a new entry.
 * After modification, it calls `updateAudioDecibels` to apply the changes to the array.
 *
 * @param {UpdateParticipantAudioDecibelsOptions} options - The options for updating participant audio decibels.
 * @param {string} options.name - The name of the participant.
 * @param {number} options.averageLoudness - The current average loudness of the participant.
 * @param {AudioDecibels[]} options.audioDecibels - The array of current audio decibel entries.
 * @param {Function} options.updateAudioDecibels - The function to update the audio decibels array.
 *
 * @returns {void} - This function does not return a value.
 *
 * @example
 * ```typescript
 * const audioDecibels = [
 *   { name: 'Alice', averageLoudness: -10 },
 *   { name: 'Bob', averageLoudness: -12 },
 * ];
 *
 * const updateAudioDecibels = (newDecibels) => {
 *   console.log('Updated audio decibels:', newDecibels);
 * };
 *
 * const updateService = new UpdateParticipantAudioDecibels();
 *
 * // Update existing participant
 * updateService.updateParticipantAudioDecibels({
 *   name: 'Alice',
 *   averageLoudness: -8,
 *   audioDecibels,
 *   updateAudioDecibels,
 * });
 *
 * // Add a new participant
 * updateService.updateParticipantAudioDecibels({
 *   name: 'Charlie',
 *   averageLoudness: -15,
 *   audioDecibels,
 *   updateAudioDecibels,
 * });
 * ```
 */
export class UpdateParticipantAudioDecibels {
    /**
     * Updates the audio decibels for a participant.
     *
     * @param {Object} options - The options for updating participant audio decibels.
     * @param {string} options.name - The name of the participant.
     * @param {number} options.averageLoudness - The average loudness of the participant.
     * @param {Array<{ name: string, averageLoudness: number }>} options.audioDecibels - The array of audio decibels entries.
     * @param {Function} options.updateAudioDecibels - The function to update the audio decibels array.
     *
     * @returns {void}
     */
    updateParticipantAudioDecibels({ name, averageLoudness, audioDecibels, updateAudioDecibels, }) {
        // Function to update the audioDecibels array
        // Check if the entry already exists in audioDecibels
        const existingEntry = audioDecibels.find((entry) => entry.name === name);
        if (existingEntry) {
            // Entry exists, update the averageLoudness
            existingEntry.averageLoudness = averageLoudness;
        }
        else {
            // Entry doesn't exist, add a new entry to audioDecibels
            audioDecibels.push({ name, averageLoudness });
        }
        // Update the audioDecibels array
        updateAudioDecibels(audioDecibels);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateParticipantAudioDecibels, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateParticipantAudioDecibels, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateParticipantAudioDecibels, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhcnRpY2lwYW50LWF1ZGlvLWRlY2liZWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3VwZGF0ZS1wYXJ0aWNpcGFudC1hdWRpby1kZWNpYmVscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQU1ILE1BQU0sT0FBTyw4QkFBOEI7SUFDekM7Ozs7Ozs7Ozs7T0FVRztJQUVILDhCQUE4QixDQUFDLEVBQzdCLElBQUksRUFDSixlQUFlLEVBQ2YsYUFBYSxFQUNiLG1CQUFtQixHQUNtQjtRQUN0Qyw2Q0FBNkM7UUFDN0MscURBQXFEO1FBQ3JELE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFFOUUsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQiwyQ0FBMkM7WUFDM0MsYUFBYSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDbEQsQ0FBQzthQUFNLENBQUM7WUFDTix3REFBd0Q7WUFDeEQsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxpQ0FBaUM7UUFDakMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckMsQ0FBQzt1R0FqQ1UsOEJBQThCOzJHQUE5Qiw4QkFBOEIsY0FGN0IsTUFBTTs7MkZBRVAsOEJBQThCO2tCQUgxQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1ZGlvRGVjaWJlbHMgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHNPcHRpb25zIHtcbiAgbmFtZTogc3RyaW5nO1xuICBhdmVyYWdlTG91ZG5lc3M6IG51bWJlcjtcbiAgYXVkaW9EZWNpYmVsczogQXVkaW9EZWNpYmVsc1tdO1xuICB1cGRhdGVBdWRpb0RlY2liZWxzOiAoYXVkaW9EZWNpYmVsczogQXVkaW9EZWNpYmVsc1tdKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHNUeXBlID0gKFxuICBvcHRpb25zOiBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHNPcHRpb25zLFxuKSA9PiB2b2lkO1xuXG4vKipcbiAqIFVwZGF0ZXMgb3IgYWRkcyBhIHBhcnRpY2lwYW50J3MgYXVkaW8gZGVjaWJlbCBkYXRhIGluIHRoZSBhcnJheS5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjaGVja3MgaWYgYSBwYXJ0aWNpcGFudCdzIG5hbWUgZXhpc3RzIGluIHRoZSBhdWRpbyBkZWNpYmVscyBhcnJheS5cbiAqIElmIGl0IGRvZXMsIGl0IHVwZGF0ZXMgdGhlIHBhcnRpY2lwYW50J3MgYGF2ZXJhZ2VMb3VkbmVzc2A7IG90aGVyd2lzZSwgaXQgYWRkcyBhIG5ldyBlbnRyeS5cbiAqIEFmdGVyIG1vZGlmaWNhdGlvbiwgaXQgY2FsbHMgYHVwZGF0ZUF1ZGlvRGVjaWJlbHNgIHRvIGFwcGx5IHRoZSBjaGFuZ2VzIHRvIHRoZSBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge1VwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVsc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdXBkYXRpbmcgcGFydGljaXBhbnQgYXVkaW8gZGVjaWJlbHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50LlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuYXZlcmFnZUxvdWRuZXNzIC0gVGhlIGN1cnJlbnQgYXZlcmFnZSBsb3VkbmVzcyBvZiB0aGUgcGFydGljaXBhbnQuXG4gKiBAcGFyYW0ge0F1ZGlvRGVjaWJlbHNbXX0gb3B0aW9ucy5hdWRpb0RlY2liZWxzIC0gVGhlIGFycmF5IG9mIGN1cnJlbnQgYXVkaW8gZGVjaWJlbCBlbnRyaWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVBdWRpb0RlY2liZWxzIC0gVGhlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW8gZGVjaWJlbHMgYXJyYXkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9IC0gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCByZXR1cm4gYSB2YWx1ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgYXVkaW9EZWNpYmVscyA9IFtcbiAqICAgeyBuYW1lOiAnQWxpY2UnLCBhdmVyYWdlTG91ZG5lc3M6IC0xMCB9LFxuICogICB7IG5hbWU6ICdCb2InLCBhdmVyYWdlTG91ZG5lc3M6IC0xMiB9LFxuICogXTtcbiAqXG4gKiBjb25zdCB1cGRhdGVBdWRpb0RlY2liZWxzID0gKG5ld0RlY2liZWxzKSA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKCdVcGRhdGVkIGF1ZGlvIGRlY2liZWxzOicsIG5ld0RlY2liZWxzKTtcbiAqIH07XG4gKlxuICogY29uc3QgdXBkYXRlU2VydmljZSA9IG5ldyBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMoKTtcbiAqXG4gKiAvLyBVcGRhdGUgZXhpc3RpbmcgcGFydGljaXBhbnRcbiAqIHVwZGF0ZVNlcnZpY2UudXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzKHtcbiAqICAgbmFtZTogJ0FsaWNlJyxcbiAqICAgYXZlcmFnZUxvdWRuZXNzOiAtOCxcbiAqICAgYXVkaW9EZWNpYmVscyxcbiAqICAgdXBkYXRlQXVkaW9EZWNpYmVscyxcbiAqIH0pO1xuICpcbiAqIC8vIEFkZCBhIG5ldyBwYXJ0aWNpcGFudFxuICogdXBkYXRlU2VydmljZS51cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMoe1xuICogICBuYW1lOiAnQ2hhcmxpZScsXG4gKiAgIGF2ZXJhZ2VMb3VkbmVzczogLTE1LFxuICogICBhdWRpb0RlY2liZWxzLFxuICogICB1cGRhdGVBdWRpb0RlY2liZWxzLFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMge1xuICAvKipcbiAgICogVXBkYXRlcyB0aGUgYXVkaW8gZGVjaWJlbHMgZm9yIGEgcGFydGljaXBhbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHVwZGF0aW5nIHBhcnRpY2lwYW50IGF1ZGlvIGRlY2liZWxzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5hdmVyYWdlTG91ZG5lc3MgLSBUaGUgYXZlcmFnZSBsb3VkbmVzcyBvZiB0aGUgcGFydGljaXBhbnQuXG4gICAqIEBwYXJhbSB7QXJyYXk8eyBuYW1lOiBzdHJpbmcsIGF2ZXJhZ2VMb3VkbmVzczogbnVtYmVyIH0+fSBvcHRpb25zLmF1ZGlvRGVjaWJlbHMgLSBUaGUgYXJyYXkgb2YgYXVkaW8gZGVjaWJlbHMgZW50cmllcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVBdWRpb0RlY2liZWxzIC0gVGhlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW8gZGVjaWJlbHMgYXJyYXkuXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cblxuICB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMoe1xuICAgIG5hbWUsXG4gICAgYXZlcmFnZUxvdWRuZXNzLFxuICAgIGF1ZGlvRGVjaWJlbHMsXG4gICAgdXBkYXRlQXVkaW9EZWNpYmVscyxcbiAgfTogVXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW9EZWNpYmVscyBhcnJheVxuICAgIC8vIENoZWNrIGlmIHRoZSBlbnRyeSBhbHJlYWR5IGV4aXN0cyBpbiBhdWRpb0RlY2liZWxzXG4gICAgY29uc3QgZXhpc3RpbmdFbnRyeSA9IGF1ZGlvRGVjaWJlbHMuZmluZCgoZW50cnk6IGFueSkgPT4gZW50cnkubmFtZSA9PT0gbmFtZSk7XG5cbiAgICBpZiAoZXhpc3RpbmdFbnRyeSkge1xuICAgICAgLy8gRW50cnkgZXhpc3RzLCB1cGRhdGUgdGhlIGF2ZXJhZ2VMb3VkbmVzc1xuICAgICAgZXhpc3RpbmdFbnRyeS5hdmVyYWdlTG91ZG5lc3MgPSBhdmVyYWdlTG91ZG5lc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVudHJ5IGRvZXNuJ3QgZXhpc3QsIGFkZCBhIG5ldyBlbnRyeSB0byBhdWRpb0RlY2liZWxzXG4gICAgICBhdWRpb0RlY2liZWxzLnB1c2goeyBuYW1lLCBhdmVyYWdlTG91ZG5lc3MgfSk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBhdWRpb0RlY2liZWxzIGFycmF5XG4gICAgdXBkYXRlQXVkaW9EZWNpYmVscyhhdWRpb0RlY2liZWxzKTtcbiAgfVxufVxuIl19