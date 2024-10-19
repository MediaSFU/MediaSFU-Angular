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
  ConsumeSocket,
  CoHostResponsibility,
  WaitingRoomParticipant,
} from '../../@types/types';

export interface AllMembersParameters
  extends ReorderStreamsParameters,
    ConnectIpsParameters,
    OnScreenChangesParameters {
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

  // mediasfu functions
  onScreenChanges: OnScreenChangesType;
  connectIps: ConnectIpsType;
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

// Export the type definition for the function
export type AllMembersType = (options: AllMembersOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class AllMembers {
  /**
   * allMembers - A method for handling various tasks related to participant management and UI updates.
   * @param {Object} params - The parameters passed to the allMembers method.
   * @param {Array} params.members - The array of participant members.
   * @param {Array} params.requestss - The array of requests.
   * @param {boolean} params.coHoste - The co-host state.
   * @param {boolean} params.coHostRes - The co-host responsibility state.
   * @param {Object} params.parameters - The object containing parameters for the allMembers method.
   * @param {Array} params.consume_sockets - The array of consume sockets.
   * @param {string} params.apiUserName - The API username.
   * @param {string} params.apiKey - The API key.
   * @param {string} params.apiToken - The API token.
   * @returns {void} - No return value.
   */

  allMembers = async ({
    members,
    requestss,
    coHoste,
    coHostRes,
    parameters,
    consume_sockets,
    apiUserName,
    apiKey,
    apiToken,
  }: AllMembersOptions): Promise<void> => {
    let {
      participantsAll,
      participants,
      dispActiveNames,
      requestList,
      coHost,
      coHostResponsibility,
      lock_screen,
      firstAll,
      membersReceived,
      roomRecvIPs,
      deferScreenReceived,
      screenId,
      shareScreenStarted,
      meetingDisplayType,
      hostFirstSwitch,
      waitingRoomList,
      islevel,
      updateParticipantsAll,
      updateParticipants,
      updateRequestList,
      updateCoHost,
      updateCoHostResponsibility,
      updateFirstAll,
      updateMembersReceived,
      updateDeferScreenReceived,
      updateShareScreenStarted,
      updateHostFirstSwitch,
      updateConsume_sockets,
      updateRoomRecvIPs,
      updateIsLoadingModalVisible,
      updateTotalReqWait,

      onScreenChanges,
      connectIps,
      reorderStreams,
      sleep,
    } = parameters;

    // Filter out the participant that isBanned == true or isSuspended == true
    participantsAll = members.map((participant) => ({
      isBanned: participant.isBanned,
      isSuspended: participant.isSuspended,
      name: participant.name,
      audioID: participant.audioID,
      videoID: participant.videoID,
    }));
    updateParticipantsAll(participantsAll);

    participants = members.filter(
      (participant) => !participant.isBanned && !participant.isSuspended,
    );
    updateParticipants(participants);

    // Check if dispActiveNames is not empty and contains the name of the participant that is not in the participants array
    if (dispActiveNames.length > 0) {
      let dispActiveNames_ = dispActiveNames.filter(
        (name: string) => !participants.map((participant: any) => participant.name).includes(name),
      );
      if (dispActiveNames_.length > 0) {
        await reorderStreams({ add: false, screenChanged: true, parameters });
      }
    }

    // Operations to update the UI; make sure we are connected to the server before updating the UI
    if (!membersReceived) {
      if (roomRecvIPs.length < 1) {
        // Keep checking every 0.01s
        let checkIPs = setInterval(async () => {
          if (roomRecvIPs.length > 0) {
            clearInterval(checkIPs);

            if (deferScreenReceived && screenId != null) {
              shareScreenStarted = true;
              updateShareScreenStarted(shareScreenStarted);
            }

            const [sockets_, ips_] = await connectIps({
              consume_sockets,
              remIP: roomRecvIPs,
              parameters,
              apiUserName,
              apiKey,
              apiToken,
            });

            if (sockets_ && ips_) {
              updateConsume_sockets(sockets_);
              updateRoomRecvIPs(ips_);
            }

            membersReceived = true;
            updateMembersReceived(membersReceived);

            await sleep({ ms: 250 });
            updateIsLoadingModalVisible(false);
            deferScreenReceived = false;
            updateDeferScreenReceived(deferScreenReceived);
          }
        }, 10);
      } else {
        const [sockets_, ips_] = await connectIps({
          consume_sockets,
          remIP: roomRecvIPs,
          parameters,
          apiUserName,
          apiKey,
          apiToken,
        });

        if (sockets_ && ips_) {
          updateConsume_sockets(sockets_);
          updateRoomRecvIPs(ips_);
        }
        membersReceived = true;
        updateMembersReceived(membersReceived);

        if (deferScreenReceived && screenId != null) {
          shareScreenStarted = true;
          updateShareScreenStarted(shareScreenStarted);
        }

        await sleep({ ms: 250 });
        updateIsLoadingModalVisible(false);
        deferScreenReceived = false;
        updateDeferScreenReceived(deferScreenReceived);
      }
    } else {
      if (screenId != null) {
        let host = participants.find(
          (participant: any) => participant.ScreenID == screenId && participant.ScreenOn == true,
        );
        if (deferScreenReceived && screenId != null && host) {
          shareScreenStarted = true;
          updateShareScreenStarted(shareScreenStarted);
        }
      }
    }

    // Return requests for only ids that are in the participants array and update the count badge
    requestList = requestss.filter((request) =>
      participants.some((participant: any) => participant.id == request.id),
    );
    updateRequestList(requestList);

    updateTotalReqWait(requestList.length + waitingRoomList.length);

    if (coHoste !== undefined && coHoste !== null) {
      coHost = coHoste;
    }
    updateCoHost(coHost);
    if (coHostRes) {
      coHostResponsibility = coHostRes;
    }
    updateCoHostResponsibility(coHostResponsibility);

    try {
      if (!lock_screen && !firstAll) {
        await onScreenChanges({ parameters });

        if (meetingDisplayType != 'all') {
          firstAll = true;
          updateFirstAll(firstAll);
        }
      } else {
        if (islevel == '2') {
          if (!hostFirstSwitch) {
            await onScreenChanges({ parameters });
            hostFirstSwitch = true; // Get self display
            updateHostFirstSwitch(hostFirstSwitch);
          }
        }
      }
    } catch (error) {
      console.log('allMembers OnScreen', error);
    }
  };
}
