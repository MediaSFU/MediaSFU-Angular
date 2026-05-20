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
export declare class AllMembersRest {
    allMembersRest(options: AllMembersRestOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AllMembersRest, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AllMembersRest>;
}
