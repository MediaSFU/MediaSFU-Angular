import { Injectable, Input, OnInit } from '@angular/core';
export interface SoundPlayerOptions {
  soundUrl: string;
}

// Export the type definition for the function
export type SoundPlayerType = (options: SoundPlayerOptions) => void;

@Injectable({
  providedIn: 'root',
})

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
export class SoundPlayer implements OnInit {
  @Input() soundUrl: string | undefined;

  ngOnInit(): void {
    const shouldPlaySound = true;

    if (shouldPlaySound) {
      if (this.soundUrl) {
        this.playSound({ soundUrl: this.soundUrl });
      } else {
        console.log('Sound URL is not defined');
      }
    }
  }

  playSound({ soundUrl }: SoundPlayerOptions): void {
    const audio = new Audio(soundUrl);
    audio.play().catch((error) => console.error('Error playing sound:', error));
  }
}
