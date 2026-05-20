import { LiveSubtitle } from '../producers/socket-receive-methods/translation-receive-methods.service';
import * as i0 from "@angular/core";
export declare class LiveSubtitleService {
    private liveSubtitlesSubject;
    private showSubtitlesOnCardsSubject;
    liveSubtitles$: import("rxjs").Observable<Map<string, LiveSubtitle>>;
    showSubtitlesOnCards$: import("rxjs").Observable<boolean>;
    setLiveSubtitles(subtitles: Map<string, LiveSubtitle>): void;
    getLiveSubtitles(): Map<string, LiveSubtitle>;
    setShowSubtitlesOnCards(show: boolean): void;
    getShowSubtitlesOnCards(): boolean;
    getSubtitleForSpeaker(speakerId: string, speakerName: string): LiveSubtitle | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<LiveSubtitleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LiveSubtitleService>;
}
