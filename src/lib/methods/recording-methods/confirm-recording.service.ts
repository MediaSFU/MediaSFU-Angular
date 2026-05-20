import { Injectable } from '@angular/core';
import { confirmRecording as sharedConfirmRecording } from 'mediasfu-shared';
import {
  ShowAlert,
  EventType,
  UserRecordingParams,
} from '../../@types/types';

export interface ConfirmRecordingParameters {
  showAlert?: ShowAlert;
  recordingMediaOptions: string;
  recordingAudioOptions: string;
  recordingVideoOptions: string;
  recordingVideoType: string;
  recordingDisplayType: 'video' | 'media' | 'all';
  recordingNameTags: boolean;
  recordingBackgroundColor: string;
  recordingNameTagsColor: string;
  recordingOrientationVideo: string;
  recordingAddHLS: boolean;
  recordingAddText: boolean;
  recordingCustomText: string;
  recordingCustomTextPosition: string;
  recordingCustomTextColor: string;
  meetingDisplayType: string;
  recordingVideoParticipantsFullRoomSupport: boolean;
  recordingAllParticipantsSupport: boolean;
  recordingVideoParticipantsSupport: boolean;
  recordingSupportForOtherOrientation: boolean;
  recordingPreferredOrientation: string;
  recordingMultiFormatsSupport: boolean;
  recordingVideoOptimized: boolean;
  recordingAllParticipantsFullRoomSupport: boolean;
  meetingVideoOptimized: boolean;
  eventType: EventType;
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  updateRecordingDisplayType: (value: 'video' | 'media' | 'all') => void;
  updateRecordingVideoOptimized: (value: boolean) => void;
  updateUserRecordingParams: (params: UserRecordingParams) => void;
  updateConfirmedToRecord: (value: boolean) => void;
  getUpdatedAllParams: () => ConfirmRecordingParameters;
  [key: string]: any;
}

export interface ConfirmRecordingOptions {
  parameters: ConfirmRecordingParameters;
}

export type ConfirmRecordingType = (options: ConfirmRecordingOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ConfirmRecording {
  confirmRecording = async ({ parameters }: ConfirmRecordingOptions): Promise<void> => {
    await sharedConfirmRecording(
      { parameters } as unknown as Parameters<typeof sharedConfirmRecording>[0],
    );
  };
}
