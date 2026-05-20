import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import {
  RePortType,
  UserRecordingParams,
  CaptureCanvasStreamType,
  CaptureCanvasStreamParameters,
  RePortParameters,
  ShowAlert,
} from '../../@types/types';
import { startRecording as sharedStartRecording } from 'mediasfu-shared';
import { RecordResumeTimerParameters } from './record-resume-timer.service';

export interface StartRecordingParameters
  extends CaptureCanvasStreamParameters,
    RePortParameters,
    RecordResumeTimerParameters {
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
  startReport: boolean;
  endReport: boolean;
  canRecord: boolean;
  updateClearedToRecord: (cleared: boolean) => void;
  updateRecordStarted: (started: boolean) => void;
  updateRecordPaused: (paused: boolean) => void;
  updateRecordResumed: (resumed: boolean) => void;
  updateStartReport: (started: boolean) => void;
  updateEndReport: (ended: boolean) => void;
  updateCanRecord: (canRecord: boolean) => void;
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  rePort: RePortType;
  captureCanvasStream: CaptureCanvasStreamType;
  getUpdatedAllParams: () => StartRecordingParameters;
  [key: string]: any;
}

export interface StartRecordingOptions {
  parameters: StartRecordingParameters;
}

export type StartRecordingType = (options: StartRecordingOptions) => Promise<boolean | undefined>;

@Injectable({
  providedIn: 'root',
})
export class StartRecording {
  startRecording = async ({ parameters }: StartRecordingOptions): Promise<boolean | undefined> => {
    return sharedStartRecording(
      { parameters } as unknown as Parameters<typeof sharedStartRecording>[0],
    );
  };
}
