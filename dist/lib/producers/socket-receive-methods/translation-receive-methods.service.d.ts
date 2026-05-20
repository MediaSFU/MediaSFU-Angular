import type { TranslationChannelsAvailableOptions, TranslationConfigUpdatedOptions, TranslationErrorOptions, TranslationLanguageSetOptions, TranslationMemberStateOptions, TranslationProducerClosedOptions, TranslationProducerReadyOptions, TranslationRoomConfigOptions, TranslationSpeakerOutputChangedOptions, TranslationSubscribedOptions, TranslationTranscriptOptions, TranslationUnsubscribedOptions } from 'mediasfu-shared';
import * as i0 from "@angular/core";
export type { LanguageEntry, LanguageMode, LiveSubtitle, TranslationChannelsAvailableData, TranslationChannelsAvailableOptions, TranslationConfigUpdatedData, TranslationConfigUpdatedOptions, TranslationErrorData, TranslationErrorOptions, TranslationLanguageSetData, TranslationLanguageSetOptions, TranslationMemberStateData, TranslationMemberStateOptions, TranslationProducerClosedData, TranslationProducerClosedOptions, TranslationProducerMap, TranslationProducerReadyData, TranslationProducerReadyOptions, TranslationRoomConfig, TranslationRoomConfigData, TranslationRoomConfigOptions, TranslationSpeakerOutputChangedData, TranslationSpeakerOutputChangedOptions, TranslationSubscribedData, TranslationSubscribedOptions, TranslationTranscriptData, TranslationTranscriptOptions, TranslationUnsubscribedData, TranslationUnsubscribedOptions, } from 'mediasfu-shared';
export { createLiveSubtitle, isSubtitleExpired } from 'mediasfu-shared';
export declare class TranslationReceiveMethods {
    translationRoomConfig(options: TranslationRoomConfigOptions): Promise<void>;
    translationConfigUpdated(options: TranslationConfigUpdatedOptions): Promise<void>;
    translationLanguageSet(options: TranslationLanguageSetOptions): Promise<void>;
    translationSubscribed(options: TranslationSubscribedOptions): Promise<void>;
    translationUnsubscribed(options: TranslationUnsubscribedOptions): Promise<void>;
    translationProducerReady(options: TranslationProducerReadyOptions): Promise<void>;
    translationProducerClosed(options: TranslationProducerClosedOptions): Promise<void>;
    translationChannelsAvailable(options: TranslationChannelsAvailableOptions): Promise<void>;
    translationMemberState(options: TranslationMemberStateOptions): Promise<void>;
    translationError(options: TranslationErrorOptions): Promise<void>;
    translationTranscript(options: TranslationTranscriptOptions): Promise<void>;
    translationSpeakerOutputChanged(options: TranslationSpeakerOutputChangedOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslationReceiveMethods, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TranslationReceiveMethods>;
}
