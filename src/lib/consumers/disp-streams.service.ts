import { Injectable } from '@angular/core';
import { dispStreams as sharedDispStreams } from 'mediasfu-shared';

import {
  Stream,
  Participant,
  Transport,
  PrepopulateUserMediaParameters,
  PrepopulateUserMediaType,
  RePortParameters,
  RePortType,
  ProcessConsumerTransportsParameters,
  ProcessConsumerTransportsType,
  ResumePauseStreamsParameters,
  ResumePauseStreamsType,
  ReadjustParameters,
  ReadjustType,
  AddVideosGridType,
  AddVideosGridParameters,
  GetEstimateType,
  CheckGridType,
  ResumePauseAudioStreamsParameters,
  ResumePauseAudioStreamsType,
  GetEstimateParameters,
  EventType,
} from '../@types/types';

export interface DispStreamsParameters
  extends PrepopulateUserMediaParameters,
    RePortParameters,
    ProcessConsumerTransportsParameters,
    ResumePauseStreamsParameters,
    ReadjustParameters,
    ResumePauseAudioStreamsParameters,
    GetEstimateParameters,
    AddVideosGridParameters {
  consumerTransports: Transport[];
  streamNames: Stream[];
  audStreamNames: Stream[];
  participants: Participant[];
  ref_participants: Participant[];
  recordingDisplayType: 'video' | 'media' | 'all';
  recordingVideoOptimized: boolean;
  meetingDisplayType: string;
  meetingVideoOptimized: boolean;
  currentUserPage: number;
  hostLabel: string;
  mainHeightWidth: number;
  prevMainHeightWidth: number;
  prevDoPaginate: boolean;
  doPaginate: boolean;
  firstAll: boolean;
  shared: boolean;
  shareScreenStarted: boolean;
  shareEnded: boolean;
  oldAllStreams: (Stream | Participant)[];
  updateMainWindow: boolean;
  remoteProducerId?: string;
  activeNames: string[];
  dispActiveNames: string[];
  p_dispActiveNames: string[];
  nForReadjustRecord: number;
  first_round: boolean;
  lock_screen: boolean;
  chatRefStreams: (Stream | Participant)[];
  eventType: EventType;
  islevel: string;
  localStreamVideo: MediaStream | null;
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  keepBackground: boolean;
  virtualStream: MediaStream | null;
  updateActiveNames: (names: string[]) => void;
  updateDispActiveNames: (names: string[]) => void;
  updateLStreams: (streams: (Stream | Participant)[]) => void;
  updateChatRefStreams: (streams: (Stream | Participant)[]) => void;
  updateNForReadjustRecord: (n: number) => void;
  updateUpdateMainWindow: (value: boolean) => void;
  updateShowMiniView: (value: boolean) => void;
  prepopulateUserMedia: PrepopulateUserMediaType;
  rePort: RePortType;
  processConsumerTransports: ProcessConsumerTransportsType;
  resumePauseStreams: ResumePauseStreamsType;
  readjust: ReadjustType;
  addVideosGrid: AddVideosGridType;
  getEstimate: GetEstimateType;
  checkGrid: CheckGridType;
  resumePauseAudioStreams: ResumePauseAudioStreamsType;
  getUpdatedAllParams: () => DispStreamsParameters;
  [key: string]: any;
}

export interface DispStreamsOptions {
  lStreams: (Stream | Participant)[];
  ind: number;
  auto?: boolean;
  ChatSkip?: boolean;
  forChatCard?: any;
  forChatID?: any;
  parameters: DispStreamsParameters;
  breakRoom?: number;
  inBreakRoom?: boolean;
}

export type DispStreamsType = (options: DispStreamsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class DispStreams {
  async dispStreams({
    lStreams,
    ind,
    auto = false,
    ChatSkip = false,
    forChatCard,
    forChatID = null,
    parameters,
    breakRoom = -1,
    inBreakRoom = false,
  }: DispStreamsOptions): Promise<void> {
    return sharedDispStreams({
      lStreams,
      ind,
      auto,
      ChatSkip,
      forChatCard,
      forChatID,
      parameters,
      breakRoom,
      inBreakRoom,
    } as unknown as Parameters<typeof sharedDispStreams>[0]) as Promise<void>;
  }
}
