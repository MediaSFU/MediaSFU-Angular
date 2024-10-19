import { Injectable } from '@angular/core';
import { Message, Participant } from '../../@types/types';

export interface GenerateRandomMessagesOptions {
  participants: Participant[];
  member: string;
  coHost?: string;
  host: string;
  forChatBroadcast?: boolean;
}

// Export the type definition for the function
export type GenerateRandomMessagesType = (options: GenerateRandomMessagesOptions) => Message[];

@Injectable({
  providedIn: 'root',
})
export class GenerateRandomMessages {
  /**
   * Generates random messages for a given set of participants.
   *
   * @param {Object} options - The options for generating random messages.
   * @param {Array} options.participants - The list of participants.
   * @param {string} options.member - The member who is part of the chat.
   * @param {string} [options.coHost=""] - The co-host of the chat.
   * @param {string} options.host - The host of the chat.
   * @param {boolean} [options.forChatBroadcast=false] - Flag to indicate if the messages are for chat broadcast.
   * @returns {Message[]} An array of generated messages.
   */
  generateRandomMessages({
    participants,
    member,
    coHost = '',
    host,
    forChatBroadcast = false,
  }: GenerateRandomMessagesOptions): Message[] {
    const messages: Message[] = [];

    // Function to get a random participant other than the sender
    const getRandomReceiver = (sender: string): string => {
      const potentialReceivers = participants.filter((participant) => participant.name !== sender);
      const randomReceiver =
        potentialReceivers[Math.floor(Math.random() * potentialReceivers.length)];
      return randomReceiver.name || '';
    };

    // Force add messages for specific participants
    let refNames: string[] = [];
    if (forChatBroadcast) {
      refNames = [member, host];
    } else {
      if (coHost) {
        refNames = [
          member,
          coHost,
          host,
          ...participants
            .map((participant) => participant.name)
            .filter((name): name is string => name !== undefined),
        ];
      } else {
        refNames = [
          member,
          host,
          ...participants
            .map((participant) => participant.name)
            .filter((name): name is string => name !== undefined),
        ];
      }
    }

    // Return unique names for the refNames
    refNames = [...new Set(refNames)];

    // Generate messages
    let timeIncrement = 0;
    refNames.forEach((sender) => {
      // Send direct messages
      const directMessage: Message = {
        sender: sender,
        receivers: [getRandomReceiver(sender)],
        message: `Direct message from ${sender}`,
        timestamp: new Date(Date.now() + timeIncrement).toLocaleTimeString(),
        group: false,
      };

      messages.push(directMessage);

      // Send group messages
      const groupMessage: Message = {
        sender: sender,
        receivers: participants
          .map((participant) => participant.name)
          .filter((name): name is string => name !== undefined),
        message: `Group message from ${sender}`,
        timestamp: new Date(Date.now() + timeIncrement).toLocaleTimeString(),
        group: true,
      };
      messages.push(groupMessage);

      timeIncrement += 15000; // Increment time by 15 seconds for each message
    });

    return messages;
  }
}
