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
