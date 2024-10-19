import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { CoHostResponsibility, Message, ShowAlert } from '../../@types/types';

export interface SendMessageOptions {
  member: string;
  islevel: string;
  showAlert?: ShowAlert;
  coHostResponsibility: CoHostResponsibility[];
  coHost: string;
  chatSetting: string;
  message: string;
  roomName: string;
  messagesLength: number;
  receivers: string[];
  group: boolean;
  sender: string;
  socket: Socket;
}

// Export the type definition for the function
export type SendMessageType = (options: SendMessageOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class SendMessage {
  /**
   * Sends a message to the specified room.
   *
   * @param {Object} options - The options for sending the message.
   * @param {string} options.member - The member sending the message.
   * @param {string} options.islevel - The level of the member.
   * @param {Function} options.showAlert - Function to show alert messages.
   * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
   * @param {string} options.coHost - The co-host of the room.
   * @param {boolean} options.chatSetting - Chat setting for the room.
   * @param {string} options.message - The message to be sent.
   * @param {string} options.roomName - The name of the room.
   * @param {number} options.messagesLength - The current number of messages in the room.
   * @param {Array} options.receivers - List of receivers for the message.
   * @param {boolean} options.group - Indicates if the message is for a group.
   * @param {string} options.sender - The sender of the message.
   * @param {Object} options.socket - The socket instance for communication.
   *
   * @returns {Promise<void>} A promise that resolves when the message is sent.
   *
   * @throws Will throw an error if the message count limit is exceeded.
   * @throws Will throw an error if the message, sender, or receivers are not valid.
   * @throws Will throw an error if the user is not allowed to send a message in the event room.
   */

  async sendMessage({
    member,
    islevel,
    showAlert,
    coHostResponsibility,
    coHost,
    chatSetting,
    message,
    roomName,
    messagesLength,
    receivers,
    group,
    sender,
    socket,
  }: SendMessageOptions): Promise<void> {
    let chatValue = false;

    // Check message count limit based on the room type
    if (
      (messagesLength > 100 && roomName.startsWith('d')) ||
      (messagesLength > 500 && roomName.startsWith('s')) ||
      (messagesLength > 100000 && roomName.startsWith('p'))
    ) {
      showAlert?.({
        message: 'You have reached the maximum number of messages allowed.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    // Validate message, sender, and receivers
    if (!message || !receivers || (!member && !sender)) {
      showAlert?.({
        message: 'Message is not valid.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    // Create the message object
    const messageObject: Message = {
      sender: sender ? sender : member,
      receivers: receivers,
      message: message,
      timestamp: new Date().toLocaleTimeString(),
      group: group !== undefined && group !== null ? group : false,
    };

    try {
      // Check co-host responsibility for chat
      chatValue = coHostResponsibility.find((item) => item.name === 'chat')?.value ?? false;
    } catch (error) {
      console.error(error);
    }

    if (islevel === '2' || (coHost === member && chatValue === true)) {
      // Allow sending message
    } else {
      // Check if user is allowed to send a message in the event room
      if (!chatSetting) {
        showAlert?.({
          message: 'You are not allowed to send a message in this event room',
          type: 'danger',
          duration: 3000,
        });
        return;
      }
    }

    // Send the message to the server
    socket.emit('sendMessage', {
      messageObject: messageObject,
      roomName: roomName,
    });
  }
}
