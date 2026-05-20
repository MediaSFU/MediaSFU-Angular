import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { trigger as sharedTrigger } from 'mediasfu-shared';
import { Participant, AutoAdjustType, ScreenState, EventType } from '../@types/types';

export interface TriggerParameters {
  socket: Socket;
  localSocket?: Socket;
  roomName: string;
  screenStates: ScreenState[];
  participants: Participant[];
  updateDateState?: number | null;
  lastUpdate: number | null;
  nForReadjust: number;
  eventType: EventType;
  shared: boolean;
  shareScreenStarted: boolean;
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  updateUpdateDateState: (timestamp: number | null) => void;
  updateLastUpdate: (lastUpdate: number | null) => void;
  updateNForReadjust: (nForReadjust: number) => void;

  // mediasfu functions
  autoAdjust: AutoAdjustType;

  getUpdatedAllParams: () => TriggerParameters;
  [key: string]: any;
}

export interface TriggerOptions {
  ref_ActiveNames: string[];
  parameters: TriggerParameters;
}

export type TriggerType = (options: TriggerOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class Trigger {
  async trigger({ ref_ActiveNames, parameters }: TriggerOptions): Promise<void> {
    return sharedTrigger({
      ref_ActiveNames,
      parameters: parameters as unknown as Parameters<typeof sharedTrigger>[0]['parameters'],
    }) as Promise<void>;
  }
}
