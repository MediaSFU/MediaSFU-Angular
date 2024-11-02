import { EventType, Message, Participant } from '../../@types/types';
import * as i0 from "@angular/core";
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
export type ReceiveMessageType = (options: ReceiveMessageOptions) => Promise<void>;
/**
 * Service for receiving and processing messages, including handling group and direct messages, filtering banned senders, and updating message states.
 *
 * @class
 * @name ReceiveMessage
 * @description Manages incoming messages, appends them to the existing messages array, filters out banned senders, and updates message badge visibility as needed.
 *
 * @method
 * receiveMessage
 *
 * @param {ReceiveMessageOptions} options - Options for handling a received message:
 *   - `message` {Message}: The new message object to process.
 *   - `messages` {Message[]}: The current list of messages.
 *   - `participantsAll` {Participant[]}: All participants in the chat.
 *   - `member` {string}: The current member's name.
 *   - `eventType` {EventType}: The type of event (e.g., "broadcast" or "chat").
 *   - `islevel` {string}: The level of the current user.
 *   - `coHost` {string}: The name of the co-host.
 *   - `updateMessages` {Function}: A function to update the messages list.
 *   - `updateShowMessagesBadge` {Function}: A function to toggle the visibility of the message badge.
 *
 * @returns {Promise<void>} Resolves when the message processing and updates are complete.
 *
 * @example
 * const message = { sender: 'Alice', receivers: ['Bob'], message: 'Hello!', timestamp: Date.now(), group: false };
 * const options = {
 *   message,
 *   messages: [],
 *   participantsAll: [{ name: 'Alice' }, { name: 'Bob' }],
 *   member: 'Bob',
 *   eventType: 'chat',
 *   islevel: '1',
 *   coHost: 'Charlie',
 *   updateMessages: (updatedMessages) => console.log('Messages updated:', updatedMessages),
 *   updateShowMessagesBadge: (show) => console.log('Show badge:', show)
 * };
 * receiveMessageService.receiveMessage(options);
 */
export declare class ReceiveMessage {
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
    receiveMessage: ({ message, messages, participantsAll, member, eventType, islevel, coHost, updateMessages, updateShowMessagesBadge, }: ReceiveMessageOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReceiveMessage, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReceiveMessage>;
}
