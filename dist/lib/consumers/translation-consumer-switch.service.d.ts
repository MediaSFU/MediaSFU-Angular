import { Transport, BreakoutParticipant, Participant, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface TranslationConsumerSwitchParameters {
    consumerTransports: Transport[];
    roomName: string;
    member: string;
    updateConsumerTransports: (transports: Transport[]) => void;
    breakOutRoomStarted?: boolean;
    breakOutRoomEnded?: boolean;
    breakoutRooms?: BreakoutParticipant[][];
    limitedBreakRoom?: BreakoutParticipant[];
    participants?: Participant[];
    ref_participants?: Participant[];
    islevel?: string;
    eventType?: EventType;
    hostNewRoom?: number;
    [key: string]: any;
}
export interface PauseOriginalProducerOptions {
    originalProducerId: string;
    speakerId?: string;
    parameters: TranslationConsumerSwitchParameters;
}
export interface ResumeOriginalProducerOptions {
    originalProducerId: string;
    speakerId?: string;
    parameters: TranslationConsumerSwitchParameters;
}
export interface StopConsumingTranslationOptions {
    speakerId?: string;
    language: string;
    translationProducerMap: Record<string, Record<string, string>>;
    parameters: TranslationConsumerSwitchParameters;
}
export declare class TranslationConsumerSwitch {
    isSpeakerInMyBreakoutRoom(speakerName: string, parameters: TranslationConsumerSwitchParameters): boolean;
    pauseOriginalProducer({ originalProducerId, speakerId, parameters, }: PauseOriginalProducerOptions): Promise<void>;
    resumeOriginalProducer({ originalProducerId, speakerId, parameters, }: ResumeOriginalProducerOptions): Promise<void>;
    isConsumingTranslationForSpeaker(speakerId: string, consumerTransports: Transport[], translationProducerMap: Map<string, {
        translationProducerId: string;
        originalProducerId: string;
        language: string;
    }>): {
        consuming: boolean;
        language?: string;
        translationProducerId?: string;
        originalProducerId?: string;
    };
    getActiveTranslationConsumers(translationProducerMap: Map<string, {
        translationProducerId: string;
        originalProducerId: string;
        language: string;
    }>, consumerTransports: Transport[]): Array<{
        speakerId: string;
        translationProducerId: string;
        originalProducerId: string;
        language: string;
    }>;
    findOriginalProducerForSpeaker(speakerId: string, allAudioStreams: Array<{
        producerId: string;
        name?: string;
        [key: string]: any;
    }>): string | null;
    stopConsumingTranslation(options: StopConsumingTranslationOptions): Promise<string | null>;
    syncTranslationStateAfterBreakoutChange(translationProducerMap: Record<string, Record<string, string>>, speakerIdByProducerId: Record<string, string>, parameters: TranslationConsumerSwitchParameters): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslationConsumerSwitch, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TranslationConsumerSwitch>;
}
