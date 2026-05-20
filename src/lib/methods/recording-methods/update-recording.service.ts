import { Injectable } from '@angular/core';
import { RePortParameters, RePortType, ShowAlert, UserRecordingParams } from '../../@types/types';
import { Socket } from 'socket.io-client';
import { updateRecording as sharedUpdateRecording } from 'mediasfu-shared';
import { RecordResumeTimerParameters } from './record-resume-timer.service';

export interface UpdateRecordingParameters extends RecordResumeTimerParameters, RePortParameters {
  roomName: string;
  userRecordingParams: UserRecordingParams;
  socket: Socket;
  localSocket?: Socket;
  updateIsRecordingModalVisible: (visible: boolean) => void;
  confirmedToRecord: boolean;
  showAlert?: ShowAlert;
  recordingMediaOptions: string;
  videoAlreadyOn: boolean;
  audioAlreadyOn: boolean;
  recordStarted: boolean;
  recordPaused: boolean;
  recordResumed: boolean;
  recordStopped: boolean;
  recordChangeSeconds: number;
  pauseRecordCount: number;
  startReport: boolean;
  endReport: boolean;
  canRecord: boolean;
  canPauseResume: boolean;
  updateCanPauseResume: (canPauseResume: boolean) => void;
  updatePauseRecordCount: (count: number) => void;
  updateClearedToRecord: (cleared: boolean) => void;
  updateRecordPaused: (paused: boolean) => void;
  updateRecordResumed: (resumed: boolean) => void;
  updateStartReport: (start: boolean) => void;
  updateEndReport: (end: boolean) => void;
  updateCanRecord: (canRecord: boolean) => void;
  rePort: RePortType;
  getUpdatedAllParams: () => UpdateRecordingParameters;
  [key: string]: any;
}

export interface UpdateRecordingOptions {
  parameters: UpdateRecordingParameters;
}

export type UpdateRecordingType = (options: UpdateRecordingOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class UpdateRecording {
  updateRecording = async ({ parameters }: UpdateRecordingOptions): Promise<void> => {
    await sharedUpdateRecording(
      { parameters } as unknown as Parameters<typeof sharedUpdateRecording>[0],
    );
  };
}
