import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CoHostResponsibility, EventType, Message, Participant, ShowAlert } from '../../../@types/types';
import { SendMessage, SendMessageOptions } from '../../../methods/message-methods/send-message.service';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface MessagesModalOptions {
    isMessagesModalVisible: boolean;
    onMessagesClose: () => void;
    onSendMessagePress?: (options: SendMessageOptions) => Promise<void>;
    messages: Message[];
    position?: string;
    backgroundColor?: string;
    activeTabBackgroundColor?: string;
    eventType: EventType;
    member: string;
    islevel: string;
    coHostResponsibility: CoHostResponsibility[];
    coHost: string;
    startDirectMessage: boolean;
    directMessageDetails: Participant | null;
    updateStartDirectMessage: (start: boolean) => void;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    showAlert?: ShowAlert;
    roomName: string;
    socket: Socket;
    chatSetting: string;
}
export type MessagesModalType = (options: MessagesModalOptions) => void;
export declare class MessagesModal implements OnInit, OnChanges {
    private SendMessageService;
    constructor(SendMessageService: SendMessage);
    isMessagesModalVisible: boolean;
    onMessagesClose: () => void;
    onSendMessagePress: (options: SendMessageOptions) => Promise<void>;
    messages: Message[];
    position: string;
    backgroundColor: string;
    activeTabBackgroundColor: string;
    eventType: EventType;
    member: string;
    islevel: string;
    coHostResponsibility: CoHostResponsibility[];
    coHost: string;
    startDirectMessage: boolean;
    directMessageDetails: Participant | null;
    updateStartDirectMessage: (start: boolean) => void;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    showAlert?: ShowAlert;
    roomName: string;
    socket: Socket;
    chatSetting: string;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    directMessages: Array<any>;
    groupMessages: Array<any>;
    activeTab: string;
    focusedInput: boolean;
    reRender: boolean;
    modalContainerStyle: any;
    modalContentStyle: any;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    switchToDirectTab(): void;
    switchToGroupTab(): void;
    populateMessages(): void;
    closeMessagesModal(): void;
    updateModalStyles(): void;
    getTabStyle(tab: string): {
        backgroundColor?: string | undefined;
        color?: string | undefined;
        borderRadius?: string | undefined;
        paddingRight: string;
        paddingLeft: string;
        paddingTop: string;
        paddingBottom: string;
        fontWeight: string;
        marginRight: string;
        marginLeft: string;
    };
    getButtonCloseStyle(): {
        marginLeft: string;
        padding: string;
        marginRight: string;
        paddingRight: string;
    };
    get styles(): {
        modalContent: {
            borderRadius: string;
            padding: string;
        };
        modalBody: {
            marginTop: string;
        };
        tabText: {
            paddingRight: string;
            paddingLeft: string;
            paddingTop: string;
            paddingBottom: string;
            fontWeight: string;
            marginRight: string;
            marginLeft: string;
        };
        activeTabText: {
            color: string;
            backgroundColor: string;
            borderRadius: string;
        };
        separator: {
            height: string;
            backgroundColor: string;
            marginVertical: string;
        };
        btnCloseMessages: {
            padding: string;
            marginRight: string;
            paddingRight: string;
        };
        icon: {
            fontSize: string;
            color: string;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<MessagesModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessagesModal, "app-messages-modal", never, { "isMessagesModalVisible": { "alias": "isMessagesModalVisible"; "required": false; }; "onMessagesClose": { "alias": "onMessagesClose"; "required": false; }; "onSendMessagePress": { "alias": "onSendMessagePress"; "required": false; }; "messages": { "alias": "messages"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "activeTabBackgroundColor": { "alias": "activeTabBackgroundColor"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "member": { "alias": "member"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "coHostResponsibility": { "alias": "coHostResponsibility"; "required": false; }; "coHost": { "alias": "coHost"; "required": false; }; "startDirectMessage": { "alias": "startDirectMessage"; "required": false; }; "directMessageDetails": { "alias": "directMessageDetails"; "required": false; }; "updateStartDirectMessage": { "alias": "updateStartDirectMessage"; "required": false; }; "updateDirectMessageDetails": { "alias": "updateDirectMessageDetails"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "chatSetting": { "alias": "chatSetting"; "required": false; }; }, {}, never, never, true, never>;
}
