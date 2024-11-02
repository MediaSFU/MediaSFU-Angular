import { Injectable } from '@angular/core';

import {
  Participant,
  CoHostResponsibility,
  OnScreenChangesType,
  OnScreenChangesParameters,
  Request,
  ConnectIpsParameters,
  ReorderStreamsParameters,
  ConnectIpsType,
  SleepType,
  ReorderStreamsType,
  Settings,
  ConsumeSocket,
} from '../../@types/types';
export interface AllMembersRestParameters
  extends OnScreenChangesParameters,
    ConnectIpsParameters,
    ReorderStreamsParameters {
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
  audioSetting: string;
  videoSetting: string;
  screenshareSetting: string;
  chatSetting: string;

  updateParticipantsAll: (participantsAll: Participant[]) => void;
  updateParticipants: (participants: Participant[]) => void;
  updateRequestList: (requestList: Request[]) => void;
  updateCoHost: (coHost: string) => void;
  updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void;
  updateFirstAll: (firstAll: boolean) => void;
  updateMembersReceived: (membersReceived: boolean) => void;
  updateDeferScreenReceived: (deferScreenReceived: boolean) => void;
  updateShareScreenStarted: (shareScreenStarted: boolean) => void;
  updateAudioSetting: (audioSetting: string) => void;
  updateVideoSetting: (videoSetting: string) => void;
  updateScreenshareSetting: (screenshareSetting: string) => void;
  updateChatSetting: (chatSetting: string) => void;
  updateConsume_sockets: (consume_sockets: ConsumeSocket[]) => void;
  updateRoomRecvIPs: (ips: string[]) => void;
  updateIsLoadingModalVisible: (visible: boolean) => void;

  // mediasfu functions
  onScreenChanges: OnScreenChangesType;
  connectIps: ConnectIpsType;
  sleep: SleepType;
  reorderStreams: ReorderStreamsType;

  getUpdatedAllParams: () => AllMembersRestParameters;
  [key: string]: any;
}

export interface AllMembersRestOptions {
  members: Participant[];
  settings: Settings;
  coHoste?: string;
  coHostRes?: CoHostResponsibility[];
  parameters: AllMembersRestParameters;
  consume_sockets: ConsumeSocket[];
  apiUserName: string;
  apiKey: string;
  apiToken: string;
}

// Export the type definition for the function
export type AllMembersRestType = (options: AllMembersRestOptions) => Promise<void>;

/**
 * Manages participant settings and UI updates, including connecting IPs, reordering streams,
 * updating settings, and handling participant display based on various session parameters.
 *
 * @async
 * @param {AllMembersRestOptions} options - Parameters for managing members.
 * @param {Participant[]} options.members - The array of participant objects.
 * @param {Settings} options.settings - The session settings for audio, video, screenshare, and chat.
 * @param {string} [options.coHoste] - The current co-host name.
 * @param {CoHostResponsibility[]} [options.coHostRes] - The responsibilities assigned to the co-host.
 * @param {AllMembersRestParameters} options.parameters - Additional parameters for managing members and UI updates.
 * @param {ConsumeSocket[]} options.consume_sockets - Array of sockets for participant communication.
 * @param {string} options.apiUserName - API username for authentication.
 * @param {string} options.apiKey - API key for authentication.
 * @param {string} options.apiToken - API token for authentication.
 *
 * @returns {Promise<void>} A promise that resolves when updates and changes for members are completed.
 *
 * @example
 * ```typescript
 * const allMembersRestService = new AllMembersRest();
 * await allMembersRestService.allMembersRest({
 *   members: [{ name: 'John', isBanned: false, isSuspended: false, audioID: '123', videoID: '456' }],
 *   settings: ['enabled', 'HD', 'allowed', 'public'],
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
 *     audioSetting: '',
 *     videoSetting: '',
 *     screenshareSetting: '',
 *     chatSetting: '',
 *     updateParticipantsAll: (participantsAll) => console.log(participantsAll),
 *     updateParticipants: (participants) => console.log(participants),
 *     updateRequestList: (requestList) => console.log(requestList),
 *     updateCoHost: (coHost) => console.log(coHost),
 *     updateCoHostResponsibility: (coHostRes) => console.log(coHostRes),
 *     updateFirstAll: (firstAll) => console.log(firstAll),
 *     updateMembersReceived: (membersReceived) => console.log(membersReceived),
 *     updateDeferScreenReceived: (deferScreenReceived) => console.log(deferScreenReceived),
 *     updateShareScreenStarted: (shareScreenStarted) => console.log(shareScreenStarted),
 *     updateAudioSetting: (audioSetting) => console.log(audioSetting),
 *     updateVideoSetting: (videoSetting) => console.log(videoSetting),
 *     updateScreenshareSetting: (screenshareSetting) => console.log(screenshareSetting),
 *     updateChatSetting: (chatSetting) => console.log(chatSetting),
 *     updateConsume_sockets: (sockets) => console.log(sockets),
 *     updateRoomRecvIPs: (ips) => console.log(ips),
 *     updateIsLoadingModalVisible: (visible) => console.log(visible),
 *     onScreenChanges: (params) => console.log('onScreenChanges called with', params),
 *     connectIps: async (params) => [['socket1'], ['ip1']],
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
export class AllMembersRest {
  /**
   * Handles various tasks related to participant management and UI updates.
   * @param {Object} params - The parameters passed to the allMembersRest method.
   * @param {Array} params.members - The array of participant members.
   * @param {Array} params.settings - The array of settings.
   * @param {boolean} params.coHoste - The co-host state.
   * @param {boolean} params.coHostRes - The co-host responsibility state.
   * @param {Object} params.parameters - The object containing parameters for the allMembersRest method.
   * @param {Array} params.consume_sockets - The array of consume sockets.
   * @param {string} params.apiUserName - The API username.
   * @param {string} params.apiKey - The API key.
   * @param {string} params.apiToken - The API token.
   * @returns {void} - No return value.
   */
  async allMembersRest({
    members,
    settings,
    coHoste,
    coHostRes,
    parameters,
    consume_sockets,
    apiUserName,
    apiKey,
    apiToken,
  }: AllMembersRestOptions): Promise<void> {
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
      audioSetting,
      videoSetting,
      screenshareSetting,
      chatSetting,
      updateParticipantsAll,
      updateParticipants,
      updateRequestList,
      updateCoHost,
      updateCoHostResponsibility,
      updateFirstAll,
      updateMembersReceived,
      updateDeferScreenReceived,
      updateShareScreenStarted,
      updateAudioSetting,
      updateVideoSetting,
      updateScreenshareSetting,
      updateChatSetting,
      updateConsume_sockets,
      updateRoomRecvIPs,
      updateIsLoadingModalVisible,

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
      if (dispActiveNames_.length > 0 && membersReceived) {
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
    let requests = requestList;
    requestList = requests.filter((request: any) =>
      participants.some((participant: any) => participant.id == request.id),
    );
    updateRequestList(requestList);

    if (coHoste !== undefined && coHoste !== null) {
      coHost = coHoste;
    }
    if (coHost !== undefined && coHost !== null) {
      updateCoHost(coHost);
    }
    if (coHostRes !== undefined && coHostRes !== null) {
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
      }
    } catch (error) {
      console.log('allMembersRest OnScreen', error);
    }

    try {
      if (membersReceived) {
        audioSetting = settings[0];
        videoSetting = settings[1];
        screenshareSetting = settings[2];
        chatSetting = settings[3];

        updateAudioSetting(audioSetting);
        updateVideoSetting(videoSetting);
        updateScreenshareSetting(screenshareSetting);
        updateChatSetting(chatSetting);
      }
    } catch (error) {
      console.log('allMembersRest Settings', error);
    }
  }
}
