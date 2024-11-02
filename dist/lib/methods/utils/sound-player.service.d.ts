import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export interface SoundPlayerOptions {
    soundUrl: string;
}
export type SoundPlayerType = (options: SoundPlayerOptions) => void;
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
export declare class SoundPlayer implements OnInit {
    soundUrl: string | undefined;
    ngOnInit(): void;
    playSound({ soundUrl }: SoundPlayerOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SoundPlayer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SoundPlayer>;
}
