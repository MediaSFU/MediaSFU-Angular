import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faPaperPlane, faReply } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SendMessageOptions } from '../../../methods/message-methods/send-message.service';
import {
  CoHostResponsibility,
  EventType,
  Message,
  Participant,
  ShowAlert,
} from '../../../@types/types';
import { Socket } from 'socket.io-client';

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

@Component({
    selector: 'app-message-panel',
    templateUrl: './message-panel.component.html',
    styleUrls: ['./message-panel.component.css'],
    imports: [CommonModule, FontAwesomeModule, FormsModule]
})
export class MessagePanel implements OnInit, OnChanges {
  @Input() messages: Array<any> = [];
  @Input() messagesLength = 0;
  @Input() type = 'group';
  @Input() username = '';
  @Input() onSendMessagePress!: (options: SendMessageOptions) => Promise<void>;
  @Input() backgroundColor = '#f5f5f5';
  @Input() focusedInput = false;
  @Input() eventType: EventType = 'webinar';
  @Input() member = '';
  @Input() islevel = '';
  @Input() startDirectMessage = false;
  @Input() updateStartDirectMessage!: (start: boolean) => void;
  @Input() directMessageDetails: Participant | null = null;
  @Input() updateDirectMessageDetails!: (participant: Participant | null) => void;
  @Input() coHostResponsibility: CoHostResponsibility[] = [];
  @Input() coHost = '';
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() chatSetting = '';
  @Input() showAlert?: ShowAlert;

  faPaperPlane = faPaperPlane;
  faReply = faReply;

  replyInfo: any = null;
  senderId: string | null = null;
  directMessageText = '';
  groupMessageText = '';

  ngOnInit() {
    if (!this.onSendMessagePress) {
      this.onSendMessagePress = this.defaultSendMessage.bind(this);
    }
  }

  defaultSendMessage(): Promise<void> {
    // Default send message implementation
    return Promise.resolve();
  }

  handleTextInputChange(event: Event) {
    const text = (event.target as HTMLInputElement).value;
    if (this.type === 'direct') {
      this.directMessageText = text;
    } else {
      this.groupMessageText = text;
    }
  }

  ngOnChanges() {
    if (this.startDirectMessage && this.directMessageDetails) {
      this.openReplyInput(this.directMessageDetails['name']);
    }
  }

  openReplyInput(senderId: string) {
    this.replyInfo = {
      text: 'Replying to: ',
      username: senderId,
    };
    this.senderId = senderId;
  }

  async handleSendButton() {
    const message = this.type === 'direct' ? this.directMessageText : this.groupMessageText;

    if (!message) {
      this.showAlert?.({ message: 'Please enter a message', type: 'danger' });
      return;
    }

    if (message.length > 350) {
      this.showAlert?.({ message: 'Message is too long.', type: 'danger' });
      return;
    }

    if (message.trim() === '') {
      this.showAlert?.({ message: 'Message cannot be empty.', type: 'danger' });
      return;
    }

    if (this.type === 'direct' && !this.senderId && this.islevel == '2') {
      this.showAlert?.({ message: 'Please select a user to send a message to.', type: 'danger' });
      return;
    }

    await this.onSendMessagePress({
      message,
      receivers: this.type === 'direct' && this.senderId ? [this.senderId] : [],
      group: this.type === 'group',
      messagesLength: this.messagesLength,
      member: this.member,
      sender: this.username,
      islevel: this.islevel,
      showAlert: this.showAlert,
      coHostResponsibility: this.coHostResponsibility,
      coHost: this.coHost,
      roomName: this.roomName,
      socket: this.socket,
      chatSetting: this.chatSetting,
    });

    if (this.type === 'direct') {
      this.directMessageText = '';
    } else {
      this.groupMessageText = '';
    }

    this.replyInfo = null;
    this.senderId = null;
  }
}
