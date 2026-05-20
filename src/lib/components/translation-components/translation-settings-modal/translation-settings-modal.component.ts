import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClosedCaptioning,
  faHeadphones,
  faLanguage,
  faMicrophone,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

import { Participant, ShowAlert } from '../../../@types/types';
import { getLanguageName, getSupportedLanguages } from '../../../methods/utils/translation-languages.util';
import { TranslationRoomConfig } from '../../../producers/socket-receive-methods/translation-receive-methods.service';
import { ModernRenderMode, isEmbeddedRenderMode } from '../../../modern/utils/render-mode.utils';

export interface TranslationChannelAvailability {
  languages: string[];
  originalProducerId: string;
}

export interface TranslationSettingsModalOptions {
  isVisible: boolean;
  onClose: () => void;
  translationSupported: boolean;
  translationConfig: TranslationRoomConfig | null;
  member: string;
  islevel: string;
  audioProducerId: string | null;
  participants: Participant[];
  mySpokenLanguage: string;
  mySpokenLanguageEnabled: boolean;
  myDefaultOutputLanguage: string | null;
  myDefaultListenLanguage: string | null;
  listenPreferences: Map<string, string>;
  availableTranslationChannels: Map<string, TranslationChannelAvailability>;
  updateMySpokenLanguage: (lang: string) => void;
  updateMySpokenLanguageEnabled: (enabled: boolean) => void;
  updateMyDefaultOutputLanguage: (lang: string | null) => void;
  updateMyDefaultListenLanguage: (lang: string | null) => void;
  updateListenPreferences: (prefs: Map<string, string>) => void;
  socket: Socket;
  roomName: string;
  showAlert?: ShowAlert;
  showSubtitlesOnCards?: boolean;
  updateShowSubtitlesOnCards?: (value: boolean) => void;
  canUsePersonalTranslation?: boolean;
  personalTranslationUsername?: string;
}

@Component({
  selector: 'app-translation-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './translation-settings-modal.component.html',
  styleUrls: ['./translation-settings-modal.component.css'],
})
export class TranslationSettingsModal implements OnChanges {
  @Input() isVisible = false;
  @Input() onClose!: () => void;
  @Input() translationSupported = false;
  @Input() translationConfig: TranslationRoomConfig | null = null;
  @Input() member = '';
  @Input() islevel = '1';
  @Input() audioProducerId: string | null = null;
  @Input() participants: Participant[] = [];
  @Input() mySpokenLanguage = 'en';
  @Input() mySpokenLanguageEnabled = false;
  @Input() myDefaultOutputLanguage: string | null = null;
  @Input() myDefaultListenLanguage: string | null = null;
  @Input() listenPreferences: Map<string, string> = new Map();
  @Input() availableTranslationChannels: Map<string, TranslationChannelAvailability> = new Map();
  @Input() updateMySpokenLanguage!: (lang: string) => void;
  @Input() updateMySpokenLanguageEnabled!: (enabled: boolean) => void;
  @Input() updateMyDefaultOutputLanguage!: (lang: string | null) => void;
  @Input() updateMyDefaultListenLanguage!: (lang: string | null) => void;
  @Input() updateListenPreferences!: (prefs: Map<string, string>) => void;
  @Input() socket: Socket = {} as Socket;
  @Input() roomName = '';
  @Input() showAlert?: ShowAlert;
  @Input() showSubtitlesOnCards = true;
  @Input() updateShowSubtitlesOnCards?: (value: boolean) => void;
  @Input() canUsePersonalTranslation = false;
  @Input() personalTranslationUsername?: string;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() isDarkMode = false;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  readonly faTimes = faTimes;
  readonly faClosedCaptioning = faClosedCaptioning;
  readonly faHeadphones = faHeadphones;
  readonly faLanguage = faLanguage;
  readonly faMicrophone = faMicrophone;
  readonly originalAudioValue = '__original_audio__';

  activeTab: 'speaking' | 'listening' = 'speaking';
  localSpokenLanguage = 'en';
  localSpokenEnabled = false;
  localDefaultOutputLanguage = this.originalAudioValue;
  localDefaultListenLanguage = this.originalAudioValue;
  localListenPreferences = new Map<string, string>();
  perSpeakerMode = false;
  localShowSubtitlesOnCards = true;
  isSaving = false;

  readonly allLanguageOptions = getSupportedLanguages('en', true).map((language) => ({
    code: language.code,
    name: language.name,
  }));

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['isVisible'] && this.isVisibleState()) || changes['translationConfig']) {
      this.syncLocalState();
    }
  }

  isVisibleState(): boolean {
    return this.isEmbedded() || this.isVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  resolvedOverlayStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'static',
          inset: 'auto',
          width: '100%',
          height: '100%',
          minHeight: 0,
          background: 'transparent',
          padding: 0,
          zIndex: 'auto',
        }
      : {};

    return { ...baseStyle, ...(this.overlayStyle as Record<string, string | number> | undefined) };
  }

  resolvedContentStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          width: '100%',
          maxWidth: 'none',
          height: '100%',
          maxHeight: 'none',
          margin: 0,
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
        }
      : {};

    return { ...baseStyle, ...(this.contentStyle as Record<string, string | number> | undefined) };
  }

  get translationAvailable(): boolean {
    return this.translationSupported || this.canUsePersonalTranslation;
  }

  get spokenLanguageOptions(): Array<{ code: string; name: string }> {
    return this.filterLanguageOptions('spoken');
  }

  get listenLanguageOptions(): Array<{ code: string; name: string }> {
    return this.filterLanguageOptions('listen');
  }

  get listeningParticipants(): Participant[] {
    return this.participants.filter((participant) => participant.name && participant.name !== this.member);
  }

  syncLocalState(): void {
    this.activeTab = 'speaking';
    this.localSpokenLanguage = this.mySpokenLanguage || 'en';
    this.localSpokenEnabled = this.mySpokenLanguageEnabled;
    this.localDefaultOutputLanguage = this.myDefaultOutputLanguage ?? this.originalAudioValue;
    this.localDefaultListenLanguage = this.myDefaultListenLanguage ?? this.originalAudioValue;
    this.localListenPreferences = new Map(this.listenPreferences);
    this.perSpeakerMode = this.listenPreferences.size > 0 && !this.myDefaultListenLanguage;
    this.localShowSubtitlesOnCards = this.showSubtitlesOnCards;
  }

  closeModal(): void {
    this.onClose?.();
  }

  getLanguageLabel(code: string | null | undefined): string {
    if (!code || code === this.originalAudioValue) {
      return 'Original audio';
    }

    return getLanguageName(code);
  }

  getSpeakerName(participant: Participant): string {
    return participant.name || participant.id || 'Unknown participant';
  }

  getSpeakerSelection(participant: Participant): string {
    const speakerId = this.resolveSpeakerId(participant);
    return this.localListenPreferences.get(speakerId) || this.originalAudioValue;
  }

  getSpeakerOptions(participant: Participant): Array<{ code: string; name: string }> {
    const channel = this.getChannelAvailability(participant);
    if (!channel) {
      return [];
    }

    return channel.languages
      .map((code) => ({ code, name: getLanguageName(code) }))
      .sort((left, right) => left.name.localeCompare(right.name));
  }

  hasSpeakerOptions(participant: Participant): boolean {
    return this.getSpeakerOptions(participant).length > 0;
  }

  updateSpeakerPreference(participant: Participant, language: string): void {
    const speakerId = this.resolveSpeakerId(participant);
    const next = new Map(this.localListenPreferences);

    if (!speakerId) {
      return;
    }

    if (!language || language === this.originalAudioValue) {
      next.delete(speakerId);
    } else {
      next.set(speakerId, language);
    }

    this.localListenPreferences = next;
  }

  async saveSettings(): Promise<void> {
    if (!this.socket || !this.roomName) {
      return;
    }

    this.isSaving = true;

    try {
      const normalizedOutputLanguage = this.normalizeSelectableValue(this.localDefaultOutputLanguage);
      const normalizedListenLanguage = this.normalizeSelectableValue(this.localDefaultListenLanguage);

      const spokenChanged =
        this.localSpokenLanguage !== this.mySpokenLanguage ||
        this.localSpokenEnabled !== this.mySpokenLanguageEnabled ||
        normalizedOutputLanguage !== this.myDefaultOutputLanguage;

      if (spokenChanged) {
        this.socket.emit('translation:setMyLanguage', {
          roomName: this.roomName,
          language: this.localSpokenLanguage,
          defaultOutputLanguage: normalizedOutputLanguage,
          enabled: this.localSpokenEnabled,
          producerId: this.audioProducerId || undefined,
        });

        this.updateMySpokenLanguage(this.localSpokenLanguage);
        this.updateMySpokenLanguageEnabled(this.localSpokenEnabled);
        this.updateMyDefaultOutputLanguage(normalizedOutputLanguage);
      }

      if (!this.perSpeakerMode) {
        for (const [speakerId, language] of this.listenPreferences.entries()) {
          this.socket.emit('translation:unsubscribe', {
            roomName: this.roomName,
            speakerId,
            language,
          });
        }

        if (
          normalizedListenLanguage !== this.myDefaultListenLanguage ||
          this.listenPreferences.size > 0
        ) {
          this.socket.emit('translation:setDefaultListenLanguage', {
            roomName: this.roomName,
            language: normalizedListenLanguage,
          });

          this.updateMyDefaultListenLanguage(normalizedListenLanguage);
          this.updateListenPreferences(new Map());
        }
      } else {
        if (this.myDefaultListenLanguage !== null) {
          this.socket.emit('translation:setDefaultListenLanguage', {
            roomName: this.roomName,
            language: null,
          });
        }

        for (const [speakerId, language] of this.localListenPreferences.entries()) {
          const previousLanguage = this.listenPreferences.get(speakerId);
          if (previousLanguage !== language) {
            if (previousLanguage) {
              this.socket.emit('translation:unsubscribe', {
                roomName: this.roomName,
                speakerId,
                language: previousLanguage,
              });
            }

            this.socket.emit('translation:subscribe', {
              roomName: this.roomName,
              speakerId,
              language,
            });
          }
        }

        for (const [speakerId, language] of this.listenPreferences.entries()) {
          if (!this.localListenPreferences.has(speakerId)) {
            this.socket.emit('translation:unsubscribe', {
              roomName: this.roomName,
              speakerId,
              language,
            });
          }
        }

        this.updateMyDefaultListenLanguage(null);
        this.updateListenPreferences(new Map(this.localListenPreferences));
      }

      if (this.updateShowSubtitlesOnCards && this.localShowSubtitlesOnCards !== this.showSubtitlesOnCards) {
        this.updateShowSubtitlesOnCards(this.localShowSubtitlesOnCards);
      }

      this.showAlert?.({
        message: 'Translation settings saved',
        type: 'success',
        duration: 2000,
      });

      this.closeModal();
    } catch (error) {
      console.error('Failed to save translation settings:', error);
      this.showAlert?.({
        message: 'Failed to save translation settings',
        type: 'danger',
        duration: 3000,
      });
    } finally {
      this.isSaving = false;
    }
  }

  private filterLanguageOptions(kind: 'spoken' | 'listen'): Array<{ code: string; name: string }> {
    if (!this.translationConfig) {
      return this.allLanguageOptions;
    }

    const mode = kind === 'spoken'
      ? this.translationConfig.spokenLanguageMode
      : this.translationConfig.listenLanguageMode;

    const allowList = kind === 'spoken'
      ? this.translationConfig.allowedSpokenLanguages?.map((language) => language.code)
      : this.translationConfig.allowedListenLanguages?.map((language) => language.code);

    const blockList = kind === 'spoken'
      ? this.translationConfig.blockedSpokenLanguages
      : this.translationConfig.blockedListenLanguages;

    if (mode === 'allowlist' && allowList && allowList.length > 0) {
      return this.allLanguageOptions.filter((language) => allowList.includes(language.code));
    }

    if (mode === 'blocklist' && blockList && blockList.length > 0) {
      return this.allLanguageOptions.filter((language) => !blockList.includes(language.code));
    }

    return this.allLanguageOptions;
  }

  private normalizeSelectableValue(value: string | null): string | null {
    if (!value || value === this.originalAudioValue) {
      return null;
    }

    return value;
  }

  private getChannelAvailability(participant: Participant): TranslationChannelAvailability | undefined {
    for (const key of this.getParticipantKeys(participant)) {
      const channel = this.availableTranslationChannels.get(key);
      if (channel) {
        return channel;
      }
    }

    return undefined;
  }

  private resolveSpeakerId(participant: Participant): string {
    for (const key of this.getParticipantKeys(participant)) {
      if (this.availableTranslationChannels.has(key) || this.localListenPreferences.has(key) || this.listenPreferences.has(key)) {
        return key;
      }
    }

    return this.getParticipantKeys(participant)[0] || '';
  }

  private getParticipantKeys(participant: Participant): string[] {
    return Array.from(
      new Set(
        [participant.id, participant.name, participant.audioID]
          .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
      )
    );
  }
}
