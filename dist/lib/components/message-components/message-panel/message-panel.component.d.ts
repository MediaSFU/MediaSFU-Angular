import { OnInit, OnChanges } from '@angular/core';
import { SendMessageOptions } from '../../../methods/message-methods/send-message.service';
import { CoHostResponsibility, EventType, Message, Participant, ShowAlert } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface MessagePanelOptions {
    messages: Message[];
    messagesLength: number;
    type: string;
    username: string;
    onSendMessagePress: (options: SendMessageOptions) => Promise<void>;
    focusedInput: boolean;
    showAlert?: ShowAlert;
    eventType: EventType;
    member: string;
    islevel: string;
    startDirectMessage: boolean;
    updateStartDirectMessage: (start: boolean) => void;
    directMessageDetails: Participant | null;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    coHostResponsibility: CoHostResponsibility[];
    coHost: string;
    roomName: string;
    socket: Socket;
    chatSetting: string;
}
export type MessagePanelType = (options: MessagePanelOptions) => HTMLElement;
/**
 * @fileoverview MessagePanel component for handling message interactions in the MediaSFU-Angular application.
 *
 * @component
 * @selector app-message-panel
 * @templateUrl ./message-panel.component.html
 * @styleUrls ['./message-panel.component.css']
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @description
 * The MessagePanel component is responsible for displaying and managing messages in a chat interface.
 * It supports both group and direct messaging, and includes various input properties to customize its behavior.
 *
 * @property {Array<any>} messages - Array of messages to be displayed.
 * @property {number} messagesLength - The length of the messages array.
 * @property {string} type - The type of chat, either 'group' or 'direct'.
 * @property {string} username - The username of the current user.
 * @property {(options: SendMessageOptions) => Promise<void>} onSendMessagePress - Function to handle sending messages.
 * @property {string} backgroundColor - Background color of the message panel.
 * @property {boolean} focusedInput - Indicates if the input field is focused.
 * @property {EventType} eventType - The type of event, e.g., 'webinar'.
 * @property {string} member - The member associated with the chat.
 * @property {string} islevel - The level of the user.
 * @property {boolean} startDirectMessage - Indicates if a direct message should be started.
 * @property {(start: boolean) => void} updateStartDirectMessage - Function to update the startDirectMessage state.
 * @property {Participant | null} directMessageDetails - Details of the participant for direct messaging.
 * @property {(participant: Participant | null) => void} updateDirectMessageDetails - Function to update directMessageDetails.
 * @property {CoHostResponsibility[]} coHostResponsibility - Array of co-host responsibilities.
 * @property {string} coHost - The co-host of the chat.
 * @property {string} roomName - The name of the chat room.
 * @property {Socket} socket - The socket connection for real-time communication.
 * @property {string} chatSetting - Settings for the chat.
 * @property {ShowAlert} [showAlert] - Optional function to show alerts.
 *
 * @property {IconDefinition} faPaperPlane - FontAwesome icon for paper plane.
 * @property {IconDefinition} faReply - FontAwesome icon for reply.
 *
 * @property {any} replyInfo - Information about the reply.
 * @property {string | null} senderId - ID of the sender.
 * @property {string} directMessageText - Text of the direct message.
 * @property {string} groupMessageText - Text of the group message.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method defaultSendMessage - Default implementation for sending a message.
 * @method handleTextInputChange - Handles changes in the text input field.
 * @method openReplyInput - Opens the reply input for a specific sender.
 * @method handleSendButton - Handles the send button click event.
 *
 * @example
 * ```html
 * <app-message-panel
 *   [messages]="chatMessages"
 *   [messagesLength]="chatMessages.length"
 *   [type]="'group'"
 *   [username]="'JohnDoe'"
 *   [onSendMessagePress]="sendMessage"
 *   [focusedInput]="true"
 *   [eventType]="'webinar'"
 *   [member]="'JohnDoe'"
 *   [islevel]="'2'"
 *   [startDirectMessage]="false"
 *   [updateStartDirectMessage]="updateDirectMessageStart"
 *   [directMessageDetails]="selectedParticipant"
 *   [updateDirectMessageDetails]="updateParticipantDetails"
 *   [coHostResponsibility]="coHostRoles"
 *   [coHost]="'coHost123'"
 *   [roomName]="'RoomName'"
 *   [socket]="chatSocket"
 *   [chatSetting]="'enabled'"
 * ></app-message-panel>
 * ```
 */
export declare class MessagePanel implements OnInit, OnChanges {
    messages: Array<any>;
    messagesLength: number;
    type: string;
    username: string;
    onSendMessagePress: (options: SendMessageOptions) => Promise<void>;
    backgroundColor: string;
    focusedInput: boolean;
    eventType: EventType;
    member: string;
    islevel: string;
    startDirectMessage: boolean;
    updateStartDirectMessage: (start: boolean) => void;
    directMessageDetails: Participant | null;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    coHostResponsibility: CoHostResponsibility[];
    coHost: string;
    roomName: string;
    socket: Socket;
    chatSetting: string;
    showAlert?: ShowAlert;
    faPaperPlane: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faReply: import("@fortawesome/fontawesome-common-types").IconDefinition;
    replyInfo: any;
    senderId: string | null;
    directMessageText: string;
    groupMessageText: string;
    ngOnInit(): void;
    defaultSendMessage(): Promise<void>;
    handleTextInputChange(event: Event): void;
    ngOnChanges(): void;
    openReplyInput(senderId: string): void;
    handleSendButton(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessagePanel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessagePanel, "app-message-panel", never, { "messages": { "alias": "messages"; "required": false; }; "messagesLength": { "alias": "messagesLength"; "required": false; }; "type": { "alias": "type"; "required": false; }; "username": { "alias": "username"; "required": false; }; "onSendMessagePress": { "alias": "onSendMessagePress"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "focusedInput": { "alias": "focusedInput"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "member": { "alias": "member"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "startDirectMessage": { "alias": "startDirectMessage"; "required": false; }; "updateStartDirectMessage": { "alias": "updateStartDirectMessage"; "required": false; }; "directMessageDetails": { "alias": "directMessageDetails"; "required": false; }; "updateDirectMessageDetails": { "alias": "updateDirectMessageDetails"; "required": false; }; "coHostResponsibility": { "alias": "coHostResponsibility"; "required": false; }; "coHost": { "alias": "coHost"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "chatSetting": { "alias": "chatSetting"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; }, {}, never, never, true, never>;
}
