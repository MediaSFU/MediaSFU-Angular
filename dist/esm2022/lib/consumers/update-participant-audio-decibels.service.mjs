import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhcnRpY2lwYW50LWF1ZGlvLWRlY2liZWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3VwZGF0ZS1wYXJ0aWNpcGFudC1hdWRpby1kZWNpYmVscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBaUIzQyxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDOzs7Ozs7Ozs7O09BVUc7SUFFSCw4QkFBOEIsQ0FBQyxFQUM3QixJQUFJLEVBQ0osZUFBZSxFQUNmLGFBQWEsRUFDYixtQkFBbUIsR0FDbUI7UUFDdEMsNkNBQTZDO1FBQzdDLHFEQUFxRDtRQUNyRCxNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO1FBRTlFLElBQUksYUFBYSxFQUFFLENBQUM7WUFDbEIsMkNBQTJDO1lBQzNDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ2xELENBQUM7YUFBTSxDQUFDO1lBQ04sd0RBQXdEO1lBQ3hELGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsaUNBQWlDO1FBQ2pDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7dUdBakNVLDhCQUE4QjsyR0FBOUIsOEJBQThCLGNBRjdCLE1BQU07OzJGQUVQLDhCQUE4QjtrQkFIMUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdWRpb0RlY2liZWxzIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzT3B0aW9ucyB7XG4gIG5hbWU6IHN0cmluZztcbiAgYXZlcmFnZUxvdWRuZXNzOiBudW1iZXI7XG4gIGF1ZGlvRGVjaWJlbHM6IEF1ZGlvRGVjaWJlbHNbXTtcbiAgdXBkYXRlQXVkaW9EZWNpYmVsczogKGF1ZGlvRGVjaWJlbHM6IEF1ZGlvRGVjaWJlbHNbXSkgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgVXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzVHlwZSA9IChcbiAgb3B0aW9uczogVXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzT3B0aW9ucyxcbikgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyB7XG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBhdWRpbyBkZWNpYmVscyBmb3IgYSBwYXJ0aWNpcGFudC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdXBkYXRpbmcgcGFydGljaXBhbnQgYXVkaW8gZGVjaWJlbHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmF2ZXJhZ2VMb3VkbmVzcyAtIFRoZSBhdmVyYWdlIGxvdWRuZXNzIG9mIHRoZSBwYXJ0aWNpcGFudC5cbiAgICogQHBhcmFtIHtBcnJheTx7IG5hbWU6IHN0cmluZywgYXZlcmFnZUxvdWRuZXNzOiBudW1iZXIgfT59IG9wdGlvbnMuYXVkaW9EZWNpYmVscyAtIFRoZSBhcnJheSBvZiBhdWRpbyBkZWNpYmVscyBlbnRyaWVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUF1ZGlvRGVjaWJlbHMgLSBUaGUgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBkZWNpYmVscyBhcnJheS5cbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyh7XG4gICAgbmFtZSxcbiAgICBhdmVyYWdlTG91ZG5lc3MsXG4gICAgYXVkaW9EZWNpYmVscyxcbiAgICB1cGRhdGVBdWRpb0RlY2liZWxzLFxuICB9OiBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHNPcHRpb25zKTogdm9pZCB7XG4gICAgLy8gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpb0RlY2liZWxzIGFycmF5XG4gICAgLy8gQ2hlY2sgaWYgdGhlIGVudHJ5IGFscmVhZHkgZXhpc3RzIGluIGF1ZGlvRGVjaWJlbHNcbiAgICBjb25zdCBleGlzdGluZ0VudHJ5ID0gYXVkaW9EZWNpYmVscy5maW5kKChlbnRyeTogYW55KSA9PiBlbnRyeS5uYW1lID09PSBuYW1lKTtcblxuICAgIGlmIChleGlzdGluZ0VudHJ5KSB7XG4gICAgICAvLyBFbnRyeSBleGlzdHMsIHVwZGF0ZSB0aGUgYXZlcmFnZUxvdWRuZXNzXG4gICAgICBleGlzdGluZ0VudHJ5LmF2ZXJhZ2VMb3VkbmVzcyA9IGF2ZXJhZ2VMb3VkbmVzcztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRW50cnkgZG9lc24ndCBleGlzdCwgYWRkIGEgbmV3IGVudHJ5IHRvIGF1ZGlvRGVjaWJlbHNcbiAgICAgIGF1ZGlvRGVjaWJlbHMucHVzaCh7IG5hbWUsIGF2ZXJhZ2VMb3VkbmVzcyB9KTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGF1ZGlvRGVjaWJlbHMgYXJyYXlcbiAgICB1cGRhdGVBdWRpb0RlY2liZWxzKGF1ZGlvRGVjaWJlbHMpO1xuICB9XG59XG4iXX0=