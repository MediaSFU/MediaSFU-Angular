import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export interface SoundPlayerOptions {
    soundUrl: string;
}
export type SoundPlayerType = (options: SoundPlayerOptions) => void;
export declare class SoundPlayer implements OnInit {
    soundUrl: string | undefined;
    ngOnInit(): void;
    playSound({ soundUrl }: SoundPlayerOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SoundPlayer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SoundPlayer>;
}
