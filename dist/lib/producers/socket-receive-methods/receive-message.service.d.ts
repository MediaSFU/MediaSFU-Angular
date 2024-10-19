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
