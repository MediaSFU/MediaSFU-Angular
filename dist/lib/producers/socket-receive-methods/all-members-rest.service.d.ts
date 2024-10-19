import { Participant, CoHostResponsibility, OnScreenChangesType, OnScreenChangesParameters, Request, ConnectIpsParameters, ReorderStreamsParameters, ConnectIpsType, SleepType, ReorderStreamsType, Settings, ConsumeSocket } from '../../@types/types';
import * as i0 from "@angular/core";
export interface AllMembersRestParameters extends OnScreenChangesParameters, ConnectIpsParameters, ReorderStreamsParameters {
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
export type AllMembersRestType = (options: AllMembersRestOptions) => Promise<void>;
export declare class AllMembersRest {
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
    allMembersRest({ members, settings, coHoste, coHostRes, parameters, consume_sockets, apiUserName, apiKey, apiToken, }: AllMembersRestOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AllMembersRest, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AllMembersRest>;
}
