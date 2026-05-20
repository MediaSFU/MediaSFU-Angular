import { Injectable } from '@angular/core';
import {
  findOriginalProducerForSpeaker as sharedFindOriginalProducerForSpeaker,
  getActiveTranslationConsumers as sharedGetActiveTranslationConsumers,
  isConsumingTranslationForSpeaker as sharedIsConsumingTranslationForSpeaker,
  isSpeakerInMyBreakoutRoom as sharedIsSpeakerInMyBreakoutRoom,
  pauseOriginalProducer as sharedPauseOriginalProducer,
  resumeOriginalProducer as sharedResumeOriginalProducer,
  stopConsumingTranslation as sharedStopConsumingTranslation,
  syncTranslationStateAfterBreakoutChange as sharedSyncTranslationStateAfterBreakoutChange,
} from 'mediasfu-shared';
import { Transport, BreakoutParticipant, Participant, EventType } from '../@types/types';

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

@Injectable({
  providedIn: 'root',
})
export class TranslationConsumerSwitch {
  isSpeakerInMyBreakoutRoom(
    speakerName: string,
    parameters: TranslationConsumerSwitchParameters
  ): boolean {
    return sharedIsSpeakerInMyBreakoutRoom(
      speakerName,
      parameters as unknown as Parameters<typeof sharedIsSpeakerInMyBreakoutRoom>[1],
    );
  }

  async pauseOriginalProducer({
    originalProducerId,
    speakerId,
    parameters,
  }: PauseOriginalProducerOptions): Promise<void> {
    return sharedPauseOriginalProducer({
      originalProducerId,
      speakerId,
      parameters,
    } as unknown as Parameters<typeof sharedPauseOriginalProducer>[0]) as Promise<void>;
  }

  async resumeOriginalProducer({
    originalProducerId,
    speakerId,
    parameters,
  }: ResumeOriginalProducerOptions): Promise<void> {
    return sharedResumeOriginalProducer({
      originalProducerId,
      speakerId,
      parameters,
    } as unknown as Parameters<typeof sharedResumeOriginalProducer>[0]) as Promise<void>;
  }

  isConsumingTranslationForSpeaker(
    speakerId: string,
    consumerTransports: Transport[],
    translationProducerMap: Map<string, { translationProducerId: string; originalProducerId: string; language: string }>
  ): { consuming: boolean; language?: string; translationProducerId?: string; originalProducerId?: string } {
    return sharedIsConsumingTranslationForSpeaker(
      speakerId,
      consumerTransports as unknown as Parameters<typeof sharedIsConsumingTranslationForSpeaker>[1],
      translationProducerMap
    ) as {
      consuming: boolean;
      language?: string;
      translationProducerId?: string;
      originalProducerId?: string;
    };
  }

  getActiveTranslationConsumers(
    translationProducerMap: Map<string, { translationProducerId: string; originalProducerId: string; language: string }>,
    consumerTransports: Transport[]
  ): Array<{ speakerId: string; translationProducerId: string; originalProducerId: string; language: string }> {
    return sharedGetActiveTranslationConsumers(
      translationProducerMap,
      consumerTransports as unknown as Parameters<typeof sharedGetActiveTranslationConsumers>[1]
    ) as Array<{
      speakerId: string;
      translationProducerId: string;
      originalProducerId: string;
      language: string;
    }>;
  }

  findOriginalProducerForSpeaker(
    speakerId: string,
    allAudioStreams: Array<{ producerId: string; name?: string; [key: string]: any }>
  ): string | null {
    return sharedFindOriginalProducerForSpeaker(speakerId, allAudioStreams);
  }

  async stopConsumingTranslation(options: StopConsumingTranslationOptions): Promise<string | null> {
    return sharedStopConsumingTranslation({
      ...options,
      parameters: options.parameters,
    } as unknown as Parameters<typeof sharedStopConsumingTranslation>[0]) as Promise<string | null>;
  }

  async syncTranslationStateAfterBreakoutChange(
    translationProducerMap: Record<string, Record<string, string>>,
    speakerIdByProducerId: Record<string, string>,
    parameters: TranslationConsumerSwitchParameters
  ): Promise<void> {
    return sharedSyncTranslationStateAfterBreakoutChange(
      translationProducerMap,
      speakerIdByProducerId,
      parameters as unknown as Parameters<typeof sharedSyncTranslationStateAfterBreakoutChange>[2]
    ) as Promise<void>;
  }
}
