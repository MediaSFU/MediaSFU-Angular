import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
import { Socket } from 'socket.io-client';
import { stopRecording as sharedStopRecording } from 'mediasfu-shared';

export interface StopRecordingParameters {
  roomName: string;
  socket: Socket;
  localSocket?: Socket;
  showAlert?: ShowAlert;
  startReport: boolean;
  endReport: boolean;
  recordStarted: boolean;
  recordPaused: boolean;
  recordStopped: boolean;
  updateRecordPaused: (paused: boolean) => void;
  updateRecordStopped: (stopped: boolean) => void;
  updateStartReport: (startReport: boolean) => void;
  updateEndReport: (endReport: boolean) => void;
  updateShowRecordButtons: (show: boolean) => void;
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  recordingMediaOptions: string;
  captureCanvasStream: (options: { parameters: any; start?: boolean }) => void;
  getUpdatedAllParams: () => StopRecordingParameters;
  [key: string]: any;
}

export interface StopRecordingOptions {
  parameters: StopRecordingParameters;
}

export type StopRecordingType = (options: StopRecordingOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class StopRecording {
  async stopRecording({ parameters }: StopRecordingOptions): Promise<void> {
    await sharedStopRecording(
      { parameters } as unknown as Parameters<typeof sharedStopRecording>[0],
    );
  }
}
