import { Injectable } from '@angular/core';
import {
  Participant,
  Request,
  ReorderStreamsType,
  ReorderStreamsParameters,
  SleepType,
  ConnectIpsParameters,
  OnScreenChangesParameters,
  OnScreenChangesType,
  ConnectIpsType,
  ConnectLocalIpsType,
  ConnectLocalIpsParameters,
  ConsumeSocket,
  CoHostResponsibility,
  WaitingRoomParticipant,
} from '../../@types/types';
import { Socket } from 'socket.io-client';
import { allMembers as sharedAllMembers } from 'mediasfu-shared';

export interface AllMembersParameters
  extends ReorderStreamsParameters,
    ConnectIpsParameters,
    OnScreenChangesParameters,
    ConnectLocalIpsParameters {
  participantsAll: Participant[];
  participants: Participant[];
  dispActiveNames: string[];
  requestList: Request[];
  coHost: string;
  coHostResponsibility: CoHostResponsibility[];
  lock_screen: boolean;
  firstAll: boolean;
  membersReceived: boolean;
  roomRecvIPs: string[];
  deferScreenReceived: boolean;
  screenId?: string;
  shareScreenStarted: boolean;
  meetingDisplayType: string;
  hostFirstSwitch: boolean;
  waitingRoomList: WaitingRoomParticipant[];
  islevel: string;
  socket: Socket;
  updateParticipantsAll: (participantsAll: Participant[]) => void;
  updateParticipants: (participants: Participant[]) => void;
  updateRequestList: (requestList: Request[]) => void;
  updateCoHost: (coHost: string) => void;
  updateCoHostResponsibility: (coHostRes: CoHostResponsibility[]) => void;
  updateFirstAll: (firstAll: boolean) => void;
  updateMembersReceived: (membersReceived: boolean) => void;
  updateDeferScreenReceived: (deferScreenReceived: boolean) => void;
  updateShareScreenStarted: (shareScreenStarted: boolean) => void;
  updateHostFirstSwitch: (hostFirstSwitch: boolean) => void;
  updateConsume_sockets: (sockets: ConsumeSocket[]) => void;
  updateRoomRecvIPs: (ips: string[]) => void;
  updateIsLoadingModalVisible: (visible: boolean) => void;
  updateTotalReqWait: (total: number) => void;
  onScreenChanges: OnScreenChangesType;
  connectIps: ConnectIpsType;
  connectLocalIps?: ConnectLocalIpsType;
  sleep: SleepType;
  reorderStreams: ReorderStreamsType;
  getUpdatedAllParams: () => AllMembersParameters;
  [key: string]: any;
}

export interface AllMembersOptions {
  members: Participant[];
  requestss: Request[];
  coHoste: string;
  coHostRes: CoHostResponsibility[];
  parameters: AllMembersParameters;
  consume_sockets: ConsumeSocket[];
  apiUserName: string;
  apiKey: string;
  apiToken: string;
}

export type AllMembersType = (options: AllMembersOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class AllMembers {
  allMembers = async (options: AllMembersOptions): Promise<void> => {
    return sharedAllMembers(options);
  };
}
