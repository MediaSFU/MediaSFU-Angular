import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
import { recordResumeTimer as sharedRecordResumeTimer } from 'mediasfu-shared';

export interface RecordResumeTimerParameters {
  isTimerRunning: boolean;
  canPauseResume: boolean;
  recordElapsedTime: number;
  recordStartTime: number;
  recordTimerInterval?: NodeJS.Timeout | null;
  showAlert?: ShowAlert;
  updateRecordStartTime: (time: number) => void;
  updateRecordTimerInterval: (interval: NodeJS.Timeout | null) => void;
  updateIsTimerRunning: (isRunning: boolean) => void;
  updateCanPauseResume: (canPause: boolean) => void;
  getUpdatedAllParams: () => RecordResumeTimerParameters;
  [key: string]: any;
}

export interface RecordResumeTimerOptions {
  parameters: RecordResumeTimerParameters;
}

export type RecordResumeTimerType = (options: RecordResumeTimerOptions) => Promise<boolean>;

@Injectable({
  providedIn: 'root',
})
export class RecordResumeTimer {
  recordResumeTimer = async ({ parameters }: RecordResumeTimerOptions): Promise<boolean> => {
    return sharedRecordResumeTimer(
      { parameters } as unknown as Parameters<typeof sharedRecordResumeTimer>[0],
    );
  };
}
