import { Participant, Request, ReorderStreamsType, ReorderStreamsParameters, SleepType, ConnectIpsParameters, OnScreenChangesParameters, OnScreenChangesType, ConnectIpsType, ConsumeSocket, CoHostResponsibility, WaitingRoomParticipant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface AllMembersParameters extends ReorderStreamsParameters, ConnectIpsParameters, OnScreenChangesParameters {
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
export declare class AllMembers {
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
    allMembers: ({ members, requestss, coHoste, coHostRes, parameters, consume_sockets, apiUserName, apiKey, apiToken, }: AllMembersOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AllMembers, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AllMembers>;
}
