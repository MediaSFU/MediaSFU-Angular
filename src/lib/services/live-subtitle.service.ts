import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LiveSubtitle } from '../producers/socket-receive-methods/translation-receive-methods.service';

@Injectable({
  providedIn: 'root',
})
export class LiveSubtitleService {
  private liveSubtitlesSubject = new BehaviorSubject<Map<string, LiveSubtitle>>(new Map());
  private showSubtitlesOnCardsSubject = new BehaviorSubject<boolean>(true);

  liveSubtitles$ = this.liveSubtitlesSubject.asObservable();
  showSubtitlesOnCards$ = this.showSubtitlesOnCardsSubject.asObservable();

  setLiveSubtitles(subtitles: Map<string, LiveSubtitle>): void {
    this.liveSubtitlesSubject.next(subtitles);
  }

  getLiveSubtitles(): Map<string, LiveSubtitle> {
    return this.liveSubtitlesSubject.getValue();
  }

  setShowSubtitlesOnCards(show: boolean): void {
    this.showSubtitlesOnCardsSubject.next(show);
  }

  getShowSubtitlesOnCards(): boolean {
    return this.showSubtitlesOnCardsSubject.getValue();
  }

  getSubtitleForSpeaker(speakerId: string, speakerName: string): LiveSubtitle | null {
    const subtitles = this.liveSubtitlesSubject.getValue();
    
    if (speakerId && subtitles.has(speakerId)) {
      return subtitles.get(speakerId) || null;
    }
    
    if (speakerName && subtitles.has(speakerName)) {
      return subtitles.get(speakerName) || null;
    }
    
    return null;
  }
}
