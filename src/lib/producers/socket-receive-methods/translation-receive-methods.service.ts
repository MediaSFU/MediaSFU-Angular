import { Injectable } from '@angular/core';
import {
  createLiveSubtitle,
  isSubtitleExpired,
  translationChannelsAvailable as sharedTranslationChannelsAvailable,
  translationConfigUpdated as sharedTranslationConfigUpdated,
  translationError as sharedTranslationError,
  translationLanguageSet as sharedTranslationLanguageSet,
  translationMemberState as sharedTranslationMemberState,
  translationProducerClosed as sharedTranslationProducerClosed,
  translationProducerReady as sharedTranslationProducerReady,
  translationRoomConfig as sharedTranslationRoomConfig,
  translationSpeakerOutputChanged as sharedTranslationSpeakerOutputChanged,
  translationSubscribed as sharedTranslationSubscribed,
  translationTranscript as sharedTranslationTranscript,
  translationUnsubscribed as sharedTranslationUnsubscribed,
} from 'mediasfu-shared';
import type {
  LanguageEntry,
  LanguageMode,
  LiveSubtitle,
  TranslationChannelsAvailableData,
  TranslationChannelsAvailableOptions,
  TranslationConfigUpdatedData,
  TranslationConfigUpdatedOptions,
  TranslationErrorData,
  TranslationErrorOptions,
  TranslationLanguageSetData,
  TranslationLanguageSetOptions,
  TranslationMemberStateData,
  TranslationMemberStateOptions,
  TranslationProducerClosedData,
  TranslationProducerClosedOptions,
  TranslationProducerMap,
  TranslationProducerReadyData,
  TranslationProducerReadyOptions,
  TranslationRoomConfig,
  TranslationRoomConfigData,
  TranslationRoomConfigOptions,
  TranslationSpeakerOutputChangedData,
  TranslationSpeakerOutputChangedOptions,
  TranslationSubscribedData,
  TranslationSubscribedOptions,
  TranslationTranscriptData,
  TranslationTranscriptOptions,
  TranslationUnsubscribedData,
  TranslationUnsubscribedOptions,
} from 'mediasfu-shared';

export type {
  LanguageEntry,
  LanguageMode,
  LiveSubtitle,
  TranslationChannelsAvailableData,
  TranslationChannelsAvailableOptions,
  TranslationConfigUpdatedData,
  TranslationConfigUpdatedOptions,
  TranslationErrorData,
  TranslationErrorOptions,
  TranslationLanguageSetData,
  TranslationLanguageSetOptions,
  TranslationMemberStateData,
  TranslationMemberStateOptions,
  TranslationProducerClosedData,
  TranslationProducerClosedOptions,
  TranslationProducerMap,
  TranslationProducerReadyData,
  TranslationProducerReadyOptions,
  TranslationRoomConfig,
  TranslationRoomConfigData,
  TranslationRoomConfigOptions,
  TranslationSpeakerOutputChangedData,
  TranslationSpeakerOutputChangedOptions,
  TranslationSubscribedData,
  TranslationSubscribedOptions,
  TranslationTranscriptData,
  TranslationTranscriptOptions,
  TranslationUnsubscribedData,
  TranslationUnsubscribedOptions,
} from 'mediasfu-shared';

export { createLiveSubtitle, isSubtitleExpired } from 'mediasfu-shared';

@Injectable({
  providedIn: 'root',
})
export class TranslationReceiveMethods {
  async translationRoomConfig(options: TranslationRoomConfigOptions): Promise<void> {
    return sharedTranslationRoomConfig(options);
  }

  async translationConfigUpdated(options: TranslationConfigUpdatedOptions): Promise<void> {
    return sharedTranslationConfigUpdated(options);
  }

  async translationLanguageSet(options: TranslationLanguageSetOptions): Promise<void> {
    return sharedTranslationLanguageSet(options);
  }

  async translationSubscribed(options: TranslationSubscribedOptions): Promise<void> {
    return sharedTranslationSubscribed(options);
  }

  async translationUnsubscribed(options: TranslationUnsubscribedOptions): Promise<void> {
    return sharedTranslationUnsubscribed(options);
  }

  async translationProducerReady(options: TranslationProducerReadyOptions): Promise<void> {
    return sharedTranslationProducerReady(options);
  }

  async translationProducerClosed(options: TranslationProducerClosedOptions): Promise<void> {
    return sharedTranslationProducerClosed(options);
  }

  async translationChannelsAvailable(options: TranslationChannelsAvailableOptions): Promise<void> {
    return sharedTranslationChannelsAvailable(options);
  }

  async translationMemberState(options: TranslationMemberStateOptions): Promise<void> {
    return sharedTranslationMemberState(options);
  }

  async translationError(options: TranslationErrorOptions): Promise<void> {
    return sharedTranslationError(options);
  }

  async translationTranscript(options: TranslationTranscriptOptions): Promise<void> {
    return sharedTranslationTranscript(options);
  }

  async translationSpeakerOutputChanged(options: TranslationSpeakerOutputChangedOptions): Promise<void> {
    return sharedTranslationSpeakerOutputChanged(options);
  }
}
