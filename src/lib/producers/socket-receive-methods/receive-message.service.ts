import { Injectable } from '@angular/core';
import { EventType, Message, Participant } from '../../@types/types';

export interface ReceiveMessageOptions {
  message: Message;
  messages: Message[];
  participantsAll: Participant[];
  member: string;
  eventType: EventType;
  islevel: string;
  coHost: string;
  updateMessages: (messages: Message[]) => void;
  updateShowMessagesBadge: (showBadge: boolean) => void;
}

// Export the type definition for the function
export type ReceiveMessageType = (options: ReceiveMessageOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ReceiveMessage {
  /**
   * Receives and processes a message, updating the messages array and handling
   * various message types and events.
   *
   * @param {ReceiveMessageOptions} options - The options for receiving the message.
   * @param {Object} options.message - The message object containing sender, receivers, content, timestamp, and group.
   * @param {Function} options.getUpdatedAllParams - Function to get updated parameters.
   * @param {Array} options.messages - Array of current messages.
   * @param {Array} options.participantsAll - Array of all participants.
   * @param {string} options.member - The current member.
   * @param {string} options.eventType - The type of event (e.g., "broadcast", "chat").
   * @param {string} options.islevel - The level of the current member.
   * @param {string} options.coHost - The co-host of the event.
   * @param {Function} options.updateMessages - Function to update the messages array.
   * @param {Function} options.updateShowMessagesBadge - Function to update the visibility of the messages badge.
   *
   * @returns {Promise<void>} A promise that resolves when the message has been processed.
   */

  receiveMessage = async ({
    message,
    messages,
    participantsAll,
    member,
    eventType,
    islevel,
    coHost,
    updateMessages,
    updateShowMessagesBadge,
  }: ReceiveMessageOptions): Promise<void> => {
    // Add the received message to the messages array
    const { sender, receivers, message: content, timestamp, group } = message;
    let oldMessages = messages;
    messages = [...messages, { sender, receivers, message: content, timestamp, group }];

    // Filter out messages with banned senders in the participants array
    if (eventType !== 'broadcast' && eventType !== 'chat') {
      messages = messages.filter((message: Message) =>
        participantsAll.some(
          (participant: any) => participant.name === message.sender && !participant.isBanned,
        ),
      );
    } else {
      messages = messages.filter((message: Message) => {
        const participant = participantsAll.find(
          (participant: any) => participant.name === message.sender,
        );
        return !participant || !participant.isBanned;
      });
    }
    updateMessages(messages);

    // Separate group and direct messages
    const oldGroupMessages = oldMessages.filter((message: Message) => message.group);
    const oldDirectMessages = oldMessages.filter((message: Message) => !message.group);

    // Render and update counts for group messages
    const groupMessages = messages.filter((message: Message) => message.group);

    if (eventType !== 'broadcast' && eventType !== 'chat') {
      // Check if oldGroupMessages length is different from groupMessages length
      if (oldGroupMessages.length !== groupMessages.length) {
        // Identify new messages
        const newGroupMessages = groupMessages.filter(
          (message: Message) =>
            !oldGroupMessages.some(
              (oldMessage: Message) => oldMessage.timestamp === message.timestamp,
            ),
        );

        // Check if newGroupMessages sender is the member or receivers include the member
        const newGroupMessages2 = newGroupMessages.filter(
          (message: Message) => message.sender === member || message.receivers.includes(member),
        );

        // Check if member is the sender of any newGroupMessages
        const newGroupMessages3 = newGroupMessages2.filter(
          (message: Message) => message.sender === member,
        );

        // Check if member is the receiver of any newGroupMessages
        if (newGroupMessages.length > 0 && newGroupMessages.length !== newGroupMessages3.length) {
          updateShowMessagesBadge(true);
        }
      }
    }

    // Render and update counts for direct messages
    const directMessages = messages.filter((message: Message) => !message.group);

    if (eventType !== 'broadcast' && eventType !== 'chat') {
      // Check if oldDirectMessages length is different from directMessages length
      if (oldDirectMessages.length !== directMessages.length) {
        // Identify new direct messages
        const newDirectMessages = directMessages.filter(
          (message: Message) =>
            !oldDirectMessages.some(
              (oldMessage: Message) => oldMessage.timestamp === message.timestamp,
            ),
        );

        // Check if newDirectMessages sender is the member or receivers include the member
        const newDirectMessages2 = newDirectMessages.filter(
          (message: Message) => message.sender === member || message.receivers.includes(member),
        );

        // Check if member is the sender of any newDirectMessages
        const newDirectMessages3 = newDirectMessages2.filter(
          (message: Message) => message.sender === member,
        );

        if (
          (newDirectMessages.length > 0 && newDirectMessages2.length > 0) ||
          (newDirectMessages.length > 0 && islevel === '2') ||
          coHost === member
        ) {
          if (islevel === '2' || coHost === member) {
            if (newDirectMessages.length !== newDirectMessages3.length) {
              updateShowMessagesBadge(true);
            }
          } else {
            if (
              newDirectMessages2.length > 0 &&
              newDirectMessages.length !== newDirectMessages3.length
            ) {
              updateShowMessagesBadge(true);
            }
          }
        }
      }
    }
  };
}
