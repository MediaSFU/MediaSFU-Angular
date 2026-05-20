import { Injectable } from '@angular/core';
import { Stream, Participant, Transport, SleepType } from '../@types/types';
import { processConsumerTransports as sharedProcessConsumerTransports } from 'mediasfu-shared';

export interface ProcessConsumerTransportsParameters {
  remoteScreenStream: Stream[];
  oldAllStreams: (Stream | Participant)[];
  newLimitedStreams: (Stream | Participant)[];

  // mediasfu functions
  sleep: SleepType;
  getUpdatedAllParams: () => ProcessConsumerTransportsParameters;
  [key: string]: any;
}

export interface ProcessConsumerTransportsOptions {
  consumerTransports: Transport[];
  lStreams_: (Stream | Participant)[];
  parameters: ProcessConsumerTransportsParameters;
}

export type ProcessConsumerTransportsType = (
  options: ProcessConsumerTransportsOptions,
) => Promise<void>;

/**
 * @service ProcessConsumerTransports
 * @description Service adapter for the shared consumer transport pause/resume orchestration.
 */
@Injectable({
  providedIn: 'root',
})
export class ProcessConsumerTransports {
  async processConsumerTransports({
    consumerTransports,
    lStreams_,
    parameters,
  }: ProcessConsumerTransportsOptions): Promise<void> {
    return sharedProcessConsumerTransports({
      consumerTransports,
      lStreams_,
      parameters,
    } as unknown as Parameters<typeof sharedProcessConsumerTransports>[0]) as Promise<void>;
  }
}
