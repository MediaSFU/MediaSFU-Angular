import { Injectable } from '@angular/core';
import {
  Participant,
  PrepopulateUserMediaType,
  ReorderStreamsType,
  ReUpdateInterParameters,
  ReUpdateInterType,
  ReorderStreamsParameters,
  PrepopulateUserMediaParameters,
} from '../../@types/types';
import { producerMediaPaused as sharedProducerMediaPaused } from 'mediasfu-shared';

export interface ProducerMediaPausedParameters
  extends PrepopulateUserMediaParameters,
    ReorderStreamsParameters,
    ReUpdateInterParameters {
  activeSounds: string[];
  meetingDisplayType: string;
  meetingVideoOptimized: boolean;
  participants: Participant[];
  oldSoundIds: string[];
  shared: boolean;
  shareScreenStarted: boolean;
  updateMainWindow: boolean;
  hostLabel: string;
  islevel: string;
  updateActiveSounds: (activeSounds: string[]) => void;
  updateUpdateMainWindow: (updateMainWindow: boolean) => void;
  reorderStreams: ReorderStreamsType;
  prepopulateUserMedia: PrepopulateUserMediaType;
  reUpdateInter: ReUpdateInterType;
  getUpdatedAllParams: () => ProducerMediaPausedParameters;
  [key: string]: any;
}

export interface ProducerMediaPausedOptions {
  producerId: string;
  kind: 'audio' | 'video' | 'screenshare' | 'screen';
  name: string;
  parameters: ProducerMediaPausedParameters;
}

export type ProducerMediaPausedType = (options: ProducerMediaPausedOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ProducerMediaPaused {
  producerMediaPaused = async ({
    producerId,
    kind,
    name,
    parameters,
  }: ProducerMediaPausedOptions): Promise<void> => {
    return sharedProducerMediaPaused({
      producerId,
      kind,
      name,
      parameters,
    });
  };
}
