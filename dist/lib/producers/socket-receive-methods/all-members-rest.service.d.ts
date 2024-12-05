import { Participant, CoHostResponsibility, OnScreenChangesType, OnScreenChangesParameters, Request, ConnectIpsParameters, ReorderStreamsParameters, ConnectIpsType, ConnectLocalIpsType, ConnectLocalIpsParameters, SleepType, ReorderStreamsType, Settings, ConsumeSocket } from '../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface AllMembersRestParameters extends OnScreenChangesParameters, ConnectIpsParameters, OnScreenChangesParameters, ConnectLocalIpsParameters, ReorderStreamsParameters {
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
    socket: Socket;
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
    connectLocalIps?: ConnectLocalIpsType;
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
 *     socket: mySocket,
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
