import { CoHostResponsibility, Participant, ShowAlert, MuteParticipantsOptions, MessageParticipantsOptions, RemoveParticipantsOptions } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface ParticipantListOptions {
    participants: Participant[];
    isBroadcast: boolean;
    onMuteParticipants: (options: MuteParticipantsOptions) => Promise<void>;
    onMessageParticipants: (options: MessageParticipantsOptions) => void;
    onRemoveParticipants: (options: RemoveParticipantsOptions) => void;
    socket: Socket;
    coHostResponsibility: CoHostResponsibility[];
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
    coHost: string;
    roomName: string;
    updateIsMessagesModalVisible: (isVisible: boolean) => void;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    updateStartDirectMessage: (start: boolean) => void;
    updateParticipants: (participants: Participant[]) => void;
}
export declare class ParticipantList {
    participants: Participant[];
    isBroadcast: boolean;
    onMuteParticipants: (options: MuteParticipantsOptions) => Promise<void>;
    onMessageParticipants: (options: MessageParticipantsOptions) => void;
    onRemoveParticipants: (options: RemoveParticipantsOptions) => Promise<void>;
    socket: Socket;
    coHostResponsibility: CoHostResponsibility[];
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
    coHost: string;
    roomName: string;
    updateIsMessagesModalVisible: (isVisible: boolean) => void;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    updateStartDirectMessage: (start: boolean) => void;
    updateParticipants: (participants: Participant[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantList, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticipantList, "app-participant-list", never, { "participants": { "alias": "participants"; "required": false; }; "isBroadcast": { "alias": "isBroadcast"; "required": false; }; "onMuteParticipants": { "alias": "onMuteParticipants"; "required": false; }; "onMessageParticipants": { "alias": "onMessageParticipants"; "required": false; }; "onRemoveParticipants": { "alias": "onRemoveParticipants"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "coHostResponsibility": { "alias": "coHostResponsibility"; "required": false; }; "member": { "alias": "member"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; "coHost": { "alias": "coHost"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "updateIsMessagesModalVisible": { "alias": "updateIsMessagesModalVisible"; "required": false; }; "updateDirectMessageDetails": { "alias": "updateDirectMessageDetails"; "required": false; }; "updateStartDirectMessage": { "alias": "updateStartDirectMessage"; "required": false; }; "updateParticipants": { "alias": "updateParticipants"; "required": false; }; }, {}, never, never, true, never>;
}
