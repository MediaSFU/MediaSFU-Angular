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

  // mediasfu functions
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

// Export the type definition for the function
export type AllMembersType = (options: AllMembersOptions) => Promise<void>;

/**
 * Manages participant-related operations, including updates for participant lists, requests, co-host settings,
 * and other session details. This method filters out banned and suspended participants, reorders streams,
 * connects IPs, and updates the UI.
 *
 * @async
 * @param {AllMembersOptions} options - Parameters for managing all members.
 * @param {Participant[]} options.members - The array of participant objects.
 * @param {Request[]} options.requestss - The list of requests from participants.
 * @param {string} options.coHoste - The current co-host name.
 * @param {CoHostResponsibility[]} options.coHostRes - The responsibilities assigned to the co-host.
 * @param {AllMembersParameters} options.parameters - Additional parameters for member management and UI updates.
 * @param {ConsumeSocket[]} options.consume_sockets - Array of sockets for participant communication.
 * @param {string} options.apiUserName - API username for authentication.
 * @param {string} options.apiKey - API key for authentication.
 * @param {string} options.apiToken - API token for authentication.
 *
 * @returns {Promise<void>} A promise that resolves when all members have been processed and updates are complete.
 *
 * @example
 * ```typescript
 * const allMembersService = new AllMembers();
 * await allMembersService.allMembers({
 *   members: [{ name: 'John', isBanned: false, isSuspended: false, audioID: '123', videoID: '456' }],
 *   requestss: [{ id: '1', name: 'Jane', type: 'fa-microphone' }],
 *   coHoste: 'Jane',
 *   coHostRes: ['manage-chat'],
 *   parameters: {
 *     participantsAll: [],
 *     participants: [],
 *     dispActiveNames: ['John'],
 *     requestList: [],
 *     coHost: '',
 *     coHostResponsibility: [],
 *     lock_screen: false,
 *     firstAll: false,
 *     membersReceived: false,
 *     roomRecvIPs: [],
 *     deferScreenReceived: false,
 *     screenId: null,
 *     shareScreenStarted: false,
 *     meetingDisplayType: 'grid',
 *     hostFirstSwitch: false,
 *     waitingRoomList: [],
 *     islevel: '1',
 *     socket: socket,
 *     updateParticipantsAll: (participantsAll) => console.log(participantsAll),
 *     updateParticipants: (participants) => console.log(participants),
 *     updateRequestList: (requestList) => console.log(requestList),
 *     updateCoHost: (coHost) => console.log(coHost),
 *     updateCoHostResponsibility: (coHostRes) => console.log(coHostRes),
 *     updateFirstAll: (firstAll) => console.log(firstAll),
 *     updateMembersReceived: (membersReceived) => console.log(membersReceived),
 *     updateDeferScreenReceived: (deferScreenReceived) => console.log(deferScreenReceived),
 *     updateShareScreenStarted: (shareScreenStarted) => console.log(shareScreenStarted),
 *     updateHostFirstSwitch: (hostFirstSwitch) => console.log(hostFirstSwitch),
 *     updateConsume_sockets: (sockets) => console.log(sockets),
 *     updateRoomRecvIPs: (ips) => console.log(ips),
 *     updateIsLoadingModalVisible: (visible) => console.log(visible),
 *     updateTotalReqWait: (total) => console.log(total),
 *     onScreenChanges: (params) => console.log('onScreenChanges called with', params),
 *     connectIps: async (params) => [['socket1'], ['ip1']],
 *     connectLocalIps: async (params) => [['socket1'], ['ip1']],
 *     sleep: async ({ ms }) => new Promise((resolve) => setTimeout(resolve, ms)),
 *     reorderStreams: async (params) => console.log('reorderStreams called with', params),
 *   },
 *   consume_sockets: [{ socketId: 'abc123' }],
 *   apiUserName: 'testUser',
 *   apiKey: 'apiKeyExample',
 *   apiToken: 'apiTokenExample',
 * });
 * ```
 */


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
      socket,
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
      connectLocalIps,
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

    // check to expect no roomRecvIPs for local instance
    let onLocal = false;
    if (roomRecvIPs.length === 1 && roomRecvIPs[0] === "none") {
      onLocal = true;
    }

    // Operations to update the UI; make sure we are connected to the server before updating the UI
    if (!membersReceived && !onLocal) {
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

    if (onLocal && !membersReceived) {
      if (connectLocalIps) {
        await connectLocalIps({ socket: socket, parameters });
      }
      await sleep({ ms: 100 });
      updateIsLoadingModalVisible(false);
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
