import { Injectable, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * SoundPlayer service for playing a sound from a provided URL.
 *
 * @class SoundPlayer
 * @implements {OnInit}
 *
 * @example
 * ```typescript
 * const soundUrl = 'https://example.com/sound.mp3';
 * const soundPlayer = new SoundPlayer();
 * soundPlayer.playSound({ soundUrl });
 * ```
 *
 * ### Details
 * - **soundUrl**: URL to the sound file that will be played.
 * - **playSound**: Initiates the audio playback.
 * - **ngOnInit**: Automatically triggers sound playback if `soundUrl` is set.
 *
 * @param {SoundPlayerOptions} options - Contains the URL of the sound to play.
 * @returns {void} - No return; sound is played asynchronously.
 */
/**
 * Plays a sound from a given URL.
 * @class
 * @implements {OnInit}
 * @param {string} soundUrl - The URL of the sound to play.
 * @returns {void}
 * @example
 * const soundUrl = 'https://example.com/sound.mp3';
 * const soundPlayer = new SoundPlayer();
 * soundPlayer.playSound({ soundUrl });
 */
export class SoundPlayer {
    soundUrl;
    ngOnInit() {
        const shouldPlaySound = true;
        if (shouldPlaySound) {
            if (this.soundUrl) {
                this.playSound({ soundUrl: this.soundUrl });
            }
            else {
                console.log('Sound URL is not defined');
            }
        }
    }
    playSound({ soundUrl }) {
        const audio = new Audio(soundUrl);
        audio.play().catch((error) => console.error('Error playing sound:', error));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SoundPlayer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SoundPlayer, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SoundPlayer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], propDecorators: { soundUrl: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bmQtcGxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy9zb3VuZC1wbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7QUFRMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBT0g7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBQ2IsUUFBUSxDQUFxQjtJQUV0QyxRQUFRO1FBQ04sTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRTdCLElBQUksZUFBZSxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDOUMsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQXNCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO3VHQWxCVSxXQUFXOzJHQUFYLFdBQVcsY0FkVixNQUFNOzsyRkFjUCxXQUFXO2tCQWZ2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs4QkFjVSxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBTb3VuZFBsYXllck9wdGlvbnMge1xuICBzb3VuZFVybDogc3RyaW5nO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTb3VuZFBsYXllclR5cGUgPSAob3B0aW9uczogU291bmRQbGF5ZXJPcHRpb25zKSA9PiB2b2lkO1xuXG4vKipcbiAqIFNvdW5kUGxheWVyIHNlcnZpY2UgZm9yIHBsYXlpbmcgYSBzb3VuZCBmcm9tIGEgcHJvdmlkZWQgVVJMLlxuICpcbiAqIEBjbGFzcyBTb3VuZFBsYXllclxuICogQGltcGxlbWVudHMge09uSW5pdH1cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgc291bmRVcmwgPSAnaHR0cHM6Ly9leGFtcGxlLmNvbS9zb3VuZC5tcDMnO1xuICogY29uc3Qgc291bmRQbGF5ZXIgPSBuZXcgU291bmRQbGF5ZXIoKTtcbiAqIHNvdW5kUGxheWVyLnBsYXlTb3VuZCh7IHNvdW5kVXJsIH0pO1xuICogYGBgXG4gKlxuICogIyMjIERldGFpbHNcbiAqIC0gKipzb3VuZFVybCoqOiBVUkwgdG8gdGhlIHNvdW5kIGZpbGUgdGhhdCB3aWxsIGJlIHBsYXllZC5cbiAqIC0gKipwbGF5U291bmQqKjogSW5pdGlhdGVzIHRoZSBhdWRpbyBwbGF5YmFjay5cbiAqIC0gKipuZ09uSW5pdCoqOiBBdXRvbWF0aWNhbGx5IHRyaWdnZXJzIHNvdW5kIHBsYXliYWNrIGlmIGBzb3VuZFVybGAgaXMgc2V0LlxuICpcbiAqIEBwYXJhbSB7U291bmRQbGF5ZXJPcHRpb25zfSBvcHRpb25zIC0gQ29udGFpbnMgdGhlIFVSTCBvZiB0aGUgc291bmQgdG8gcGxheS5cbiAqIEByZXR1cm5zIHt2b2lkfSAtIE5vIHJldHVybjsgc291bmQgaXMgcGxheWVkIGFzeW5jaHJvbm91c2x5LlxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuXG4vKipcbiAqIFBsYXlzIGEgc291bmQgZnJvbSBhIGdpdmVuIFVSTC5cbiAqIEBjbGFzc1xuICogQGltcGxlbWVudHMge09uSW5pdH1cbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VuZFVybCAtIFRoZSBVUkwgb2YgdGhlIHNvdW5kIHRvIHBsYXkuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiBjb25zdCBzb3VuZFVybCA9ICdodHRwczovL2V4YW1wbGUuY29tL3NvdW5kLm1wMyc7XG4gKiBjb25zdCBzb3VuZFBsYXllciA9IG5ldyBTb3VuZFBsYXllcigpO1xuICogc291bmRQbGF5ZXIucGxheVNvdW5kKHsgc291bmRVcmwgfSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBTb3VuZFBsYXllciBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNvdW5kVXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3Qgc2hvdWxkUGxheVNvdW5kID0gdHJ1ZTtcblxuICAgIGlmIChzaG91bGRQbGF5U291bmQpIHtcbiAgICAgIGlmICh0aGlzLnNvdW5kVXJsKSB7XG4gICAgICAgIHRoaXMucGxheVNvdW5kKHsgc291bmRVcmw6IHRoaXMuc291bmRVcmwgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnU291bmQgVVJMIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGxheVNvdW5kKHsgc291bmRVcmwgfTogU291bmRQbGF5ZXJPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oc291bmRVcmwpO1xuICAgIGF1ZGlvLnBsYXkoKS5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBsYXlpbmcgc291bmQ6JywgZXJyb3IpKTtcbiAgfVxufVxuIl19