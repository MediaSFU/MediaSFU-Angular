import { Injectable, Input } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bmQtcGxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy9zb3VuZC1wbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7QUFZMUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBQ2IsUUFBUSxDQUFxQjtJQUV0QyxRQUFRO1FBQ04sTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRTdCLElBQUksZUFBZSxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDOUMsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQXNCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO3VHQWxCVSxXQUFXOzJHQUFYLFdBQVcsY0FkVixNQUFNOzsyRkFjUCxXQUFXO2tCQWZ2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs4QkFjVSxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBTb3VuZFBsYXllck9wdGlvbnMge1xuICBzb3VuZFVybDogc3RyaW5nO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTb3VuZFBsYXllclR5cGUgPSAob3B0aW9uczogU291bmRQbGF5ZXJPcHRpb25zKSA9PiB2b2lkO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5cbi8qKlxuICogUGxheXMgYSBzb3VuZCBmcm9tIGEgZ2l2ZW4gVVJMLlxuICogQGNsYXNzXG4gKiBAaW1wbGVtZW50cyB7T25Jbml0fVxuICogQHBhcmFtIHtzdHJpbmd9IHNvdW5kVXJsIC0gVGhlIFVSTCBvZiB0aGUgc291bmQgdG8gcGxheS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHNvdW5kVXJsID0gJ2h0dHBzOi8vZXhhbXBsZS5jb20vc291bmQubXAzJztcbiAqIGNvbnN0IHNvdW5kUGxheWVyID0gbmV3IFNvdW5kUGxheWVyKCk7XG4gKiBzb3VuZFBsYXllci5wbGF5U291bmQoeyBzb3VuZFVybCB9KTtcbiAqL1xuZXhwb3J0IGNsYXNzIFNvdW5kUGxheWVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc291bmRVcmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBzaG91bGRQbGF5U291bmQgPSB0cnVlO1xuXG4gICAgaWYgKHNob3VsZFBsYXlTb3VuZCkge1xuICAgICAgaWYgKHRoaXMuc291bmRVcmwpIHtcbiAgICAgICAgdGhpcy5wbGF5U291bmQoeyBzb3VuZFVybDogdGhpcy5zb3VuZFVybCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTb3VuZCBVUkwgaXMgbm90IGRlZmluZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5U291bmQoeyBzb3VuZFVybCB9OiBTb3VuZFBsYXllck9wdGlvbnMpOiB2b2lkIHtcbiAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbyhzb3VuZFVybCk7XG4gICAgYXVkaW8ucGxheSgpLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcGxheWluZyBzb3VuZDonLCBlcnJvcikpO1xuICB9XG59XG4iXX0=